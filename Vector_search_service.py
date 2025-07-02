"""
Mebooks.ai Vector Search Service
Integrates with Vertex AI Vector Search for semantic ebook search
"""

import os
import json
import logging
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass
import asyncio
from datetime import datetime

# Google Cloud imports
from google.cloud import aiplatform
from google.cloud.aiplatform import MatchingEngineIndex, MatchingEngineIndexEndpoint
from google.cloud import storage
from google.cloud import bigquery

# AI and embeddings
from sentence_transformers import SentenceTransformer
import numpy as np

# Configuration
from dotenv import load_dotenv
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class SearchQuery:
    """Search query structure"""
    text: str
    filters: Dict[str, Any]
    num_results: int
    similarity_threshold: float

@dataclass
class SearchResult:
    """Search result structure"""
    ebook_id: str
    title: str
    author: str
    category: str
    complexity: str
    similarity_score: float
    relevant_chunks: List[str]
    semantic_summary: str
    keywords: List[str]

class VectorSearchService:
    """Manages Vertex AI Vector Search operations"""

    def __init__(self, project_id: str, location: str = "us-central1"):
        self.project_id = project_id
        self.location = location

        # Initialize Vertex AI
        aiplatform.init(project=project_id, location=location)

        # Initialize embeddings model
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

        # Initialize clients
        self.storage_client = storage.Client(project=project_id)
        self.bigquery_client = bigquery.Client(project=project_id)

        # Index configuration
        self.index_name = "mebooks-ebooks-index"
        self.endpoint_name = "mebooks-search-endpoint"
        self.index_dimensions = 384  # all-MiniLM-L6-v2 dimension

        # Load index and endpoint
        self._load_index_and_endpoint()

    def _load_index_and_endpoint(self):
        """Load existing index and endpoint or create new ones"""
        try:
            # Try to load existing index
            self.index = MatchingEngineIndex(index_name=self.index_name)
            logger.info(f"Loaded existing index: {self.index_name}")
        except Exception as e:
            logger.warning(f"Index not found, will create new one: {e}")
            self.index = None

        try:
            # Try to load existing endpoint
            self.endpoint = MatchingEngineIndexEndpoint(
                index_endpoint_name=self.endpoint_name
            )
            logger.info(f"Loaded existing endpoint: {self.endpoint_name}")
        except Exception as e:
            logger.warning(f"Endpoint not found, will create new one: {e}")
            self.endpoint = None

    def create_index(self) -> str:
        """Create Vector Search index"""
        try:
            if self.index:
                logger.info("Index already exists")
                return self.index.name

            logger.info("Creating new Vector Search index...")

            # Create index configuration
            index_config = {
                "dimensions": self.index_dimensions,
                "approximate_neighbors_count": 150,
                "distance_measure_type": "COSINE_DISTANCE",
                "algorithm_config": {
                    "tree_ah_config": {
                        "leaf_node_embedding_count": 500,
                        "leaf_nodes_to_search_percent": 10
                    }
                }
            }

            # Create index
            self.index = MatchingEngineIndex.create_tree_ah_index(
                display_name=self.index_name,
                contents_delta_uri=f"gs://mebooks-vectors-{self.project_id}/{self.index_name}/contents",
                config=index_config
            )

            logger.info(f"Created index: {self.index.name}")
            return self.index.name

        except Exception as e:
            logger.error(f"Failed to create index: {e}")
            raise

    def deploy_index(self) -> str:
        """Deploy index to endpoint"""
        try:
            if not self.index:
                raise ValueError("Index not initialized")

            if self.endpoint:
                logger.info("Endpoint already exists")
                return self.endpoint.name

            logger.info("Deploying index to endpoint...")

            # Deploy index
            self.endpoint = self.index.deploy_index(
                display_name=self.endpoint_name,
                deployed_index_id=self.endpoint_name
            )

            logger.info(f"Deployed endpoint: {self.endpoint.name}")
            return self.endpoint.name

        except Exception as e:
            logger.error(f"Failed to deploy index: {e}")
            raise

    def upsert_embeddings(self, embeddings_data: List[Dict[str, Any]]):
        """Upsert embeddings to index"""
        try:
            if not self.index:
                raise ValueError("Index not initialized")

            logger.info(f"Upserting {len(embeddings_data)} embeddings...")

            # Prepare embeddings for upsert
            upsert_data = []
            for item in embeddings_data:
                upsert_data.append({
                    "id": item["id"],
                    "embedding": item["embedding"],
                    "restricts": item.get("restricts", {}),
                    "crowding_tag": item.get("crowding_tag", "")
                })

            # Upsert to index
            self.index.upsert_embeddings(upsert_data)

            logger.info("Successfully upserted embeddings")

        except Exception as e:
            logger.error(f"Failed to upsert embeddings: {e}")
            raise

    def generate_query_embedding(self, query: str) -> List[float]:
        """Generate embedding for search query"""
        try:
            embedding = self.embedding_model.encode([query])
            return embedding[0].tolist()
        except Exception as e:
            logger.error(f"Failed to generate query embedding: {e}")
            raise

    async def search(self, search_query: SearchQuery) -> List[SearchResult]:
        """Search ebooks using semantic similarity"""
        try:
            if not self.index or not self.endpoint:
                raise ValueError("Index or endpoint not initialized")

            logger.info(f"Searching for: {search_query.text}")

            # Generate query embedding
            query_embedding = self.generate_query_embedding(search_query.text)

            # Prepare search request
            search_request = {
                "deployed_index_id": self.endpoint_name,
                "queries": [query_embedding],
                "num_neighbors": search_query.num_results
            }

            # Add filters if provided
            if search_query.filters:
                search_request["filter"] = self._build_filter_expression(search_query.filters)

            # Perform search
            response = self.index.find_nearest_neighbors(**search_request)

            # Process results
            results = []
            for neighbor in response[0]:  # response[0] contains neighbors for first query
                if neighbor.distance < search_query.similarity_threshold:
                    continue

                # Get ebook metadata
                ebook_metadata = await self._get_ebook_metadata(neighbor.restricts["ebook_id"])

                if ebook_metadata:
                    result = SearchResult(
                        ebook_id=neighbor.restricts["ebook_id"],
                        title=ebook_metadata["title"],
                        author=ebook_metadata["author"],
                        category=neighbor.restricts["category"],
                        complexity=neighbor.restricts["complexity"],
                        similarity_score=neighbor.distance,
                        relevant_chunks=[neighbor.restricts.get("chunk_content", "")],
                        semantic_summary=ebook_metadata.get("semantic_summary", ""),
                        keywords=ebook_metadata.get("keywords", [])
                    )
                    results.append(result)

            # Sort by similarity score
            results.sort(key=lambda x: x.similarity_score, reverse=True)

            logger.info(f"Found {len(results)} results")
            return results

        except Exception as e:
            logger.error(f"Failed to search: {e}")
            raise

    def _build_filter_expression(self, filters: Dict[str, Any]) -> str:
        """Build filter expression for Vector Search"""
        filter_parts = []

        for key, value in filters.items():
            if isinstance(value, list):
                # Handle list values (e.g., multiple categories)
                filter_parts.append(f'"{key}" IN {json.dumps(value)}')
            else:
                # Handle single values
                filter_parts.append(f'"{key}" = "{value}"')

        return " AND ".join(filter_parts)

    async def _get_ebook_metadata(self, ebook_id: str) -> Optional[Dict[str, Any]]:
        """Get ebook metadata from storage"""
        try:
            bucket_name = f"mebooks-semantic-data-{self.project_id}"
            bucket = self.storage_client.bucket(bucket_name)

            # Get metadata from Cloud Storage
            blob = bucket.blob(f"metadata/{ebook_id}.json")
            if blob.exists():
                content = blob.download_as_text()
                return json.loads(content)

            return None

        except Exception as e:
            logger.error(f"Failed to get ebook metadata: {e}")
            return None

    async def hybrid_search(self, query: str, filters: Dict[str, Any] = None,
                           num_results: int = 10) -> List[SearchResult]:
        """Perform hybrid search combining semantic and keyword search"""
        try:
            # Semantic search
            semantic_query = SearchQuery(
                text=query,
                filters=filters or {},
                num_results=num_results,
                similarity_threshold=0.7
            )

            semantic_results = await self.search(semantic_query)

            # Keyword search (if needed)
            keyword_results = await self._keyword_search(query, filters, num_results)

            # Combine and rank results
            combined_results = self._combine_search_results(
                semantic_results, keyword_results, num_results
            )

            return combined_results

        except Exception as e:
            logger.error(f"Failed to perform hybrid search: {e}")
            raise

    async def _keyword_search(self, query: str, filters: Dict[str, Any] = None,
                             num_results: int = 10) -> List[SearchResult]:
        """Perform keyword-based search using BigQuery"""
        try:
            # Build SQL query
            sql_query = f"""
            SELECT 
                ebook_id,
                title,
                author,
                category,
                complexity,
                semantic_summary,
                keywords,
                ARRAY_LENGTH(REGEXP_EXTRACT_ALL(LOWER(semantic_summary), LOWER('{query}'))) as keyword_matches
            FROM `{self.project_id}.mebooks.ebook_metadata`
            WHERE semantic_summary LIKE '%{query}%'
            """

            if filters:
                filter_conditions = []
                for key, value in filters.items():
                    if isinstance(value, list):
                        filter_conditions.append(f"{key} IN {json.dumps(value)}")
                    else:
                        filter_conditions.append(f"{key} = '{value}'")

                if filter_conditions:
                    sql_query += f" AND {' AND '.join(filter_conditions)}"

            sql_query += f" ORDER BY keyword_matches DESC LIMIT {num_results}"

            # Execute query
            query_job = self.bigquery_client.query(sql_query)
            results = query_job.result()

            # Convert to SearchResult objects
            keyword_results = []
            for row in results:
                result = SearchResult(
                    ebook_id=row.ebook_id,
                    title=row.title,
                    author=row.author,
                    category=row.category,
                    complexity=row.complexity,
                    similarity_score=row.keyword_matches / 10.0,  # Normalize score
                    relevant_chunks=[],
                    semantic_summary=row.semantic_summary,
                    keywords=row.keywords
                )
                keyword_results.append(result)

            return keyword_results

        except Exception as e:
            logger.error(f"Failed to perform keyword search: {e}")
            return []

    def _combine_search_results(self, semantic_results: List[SearchResult],
                               keyword_results: List[SearchResult],
                               num_results: int) -> List[SearchResult]:
        """Combine and rank search results"""
        # Create combined results dictionary
        combined = {}

        # Add semantic results
        for result in semantic_results:
            combined[result.ebook_id] = {
                "result": result,
                "semantic_score": result.similarity_score,
                "keyword_score": 0.0
            }

        # Add keyword results
        for result in keyword_results:
            if result.ebook_id in combined:
                combined[result.ebook_id]["keyword_score"] = result.similarity_score
            else:
                combined[result.ebook_id] = {
                    "result": result,
                    "semantic_score": 0.0,
                    "keyword_score": result.similarity_score
                }

        # Calculate combined scores and sort
        final_results = []
        for ebook_id, data in combined.items():
            # Weighted combination (70% semantic, 30% keyword)
            combined_score = (0.7 * data["semantic_score"]) + (0.3 * data["keyword_score"])
            data["result"].similarity_score = combined_score
            final_results.append(data["result"])

        # Sort by combined score and return top results
        final_results.sort(key=lambda x: x.similarity_score, reverse=True)
        return final_results[:num_results]

    async def get_similar_ebooks(self, ebook_id: str, num_results: int = 5) -> List[SearchResult]:
        """Find similar ebooks based on content similarity"""
        try:
            # Get ebook metadata
            metadata = await self._get_ebook_metadata(ebook_id)
            if not metadata:
                return []

            # Use semantic summary as query
            query = metadata["semantic_summary"]

            # Search with filters to exclude the same ebook
            filters = {"ebook_id": f"!={ebook_id}"}

            search_query = SearchQuery(
                text=query,
                filters=filters,
                num_results=num_results,
                similarity_threshold=0.6
            )

            return await self.search(search_query)

        except Exception as e:
            logger.error(f"Failed to get similar ebooks: {e}")
            return []

    async def get_recommendations(self, user_id: str, num_results: int = 10) -> List[SearchResult]:
        """Get personalized ebook recommendations"""
        try:
            # Get user preferences and history (implement based on your user system)
            user_preferences = await self._get_user_preferences(user_id)

            if not user_preferences:
                # Return popular ebooks if no preferences
                return await self._get_popular_ebooks(num_results)

            # Build search query from preferences
            query = " ".join(user_preferences.get("interests", []))
            filters = user_preferences.get("filters", {})

            search_query = SearchQuery(
                text=query,
                filters=filters,
                num_results=num_results,
                similarity_threshold=0.5
            )

            return await self.search(search_query)

        except Exception as e:
            logger.error(f"Failed to get recommendations: {e}")
            return []

    async def _get_user_preferences(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user preferences (implement based on your user system)"""
        # This would typically query your user database
        # For now, return None
        return None

    async def _get_popular_ebooks(self, num_results: int) -> List[SearchResult]:
        """Get popular ebooks based on views/downloads"""
        try:
            # Query BigQuery for popular ebooks
            sql_query = f"""
            SELECT 
                ebook_id,
                title,
                author,
                category,
                complexity,
                semantic_summary,
                keywords,
                view_count
            FROM `{self.project_id}.mebooks.ebook_metadata`
            ORDER BY view_count DESC
            LIMIT {num_results}
            """

            query_job = self.bigquery_client.query(sql_query)
            results = query_job.result()

            popular_results = []
            for row in results:
                result = SearchResult(
                    ebook_id=row.ebook_id,
                    title=row.title,
                    author=row.author,
                    category=row.category,
                    complexity=row.complexity,
                    similarity_score=row.view_count / 1000.0,  # Normalize score
                    relevant_chunks=[],
                    semantic_summary=row.semantic_summary,
                    keywords=row.keywords
                )
                popular_results.append(result)

            return popular_results

        except Exception as e:
            logger.error(f"Failed to get popular ebooks: {e}")
            return []

# Example usage
async def main():
    """Example usage of Vector Search Service"""
    import argparse

    parser = argparse.ArgumentParser(description="Vector Search Service")
    parser.add_argument("--project-id", required=True, help="Google Cloud Project ID")
    parser.add_argument("--query", required=True, help="Search query")
    parser.add_argument("--num-results", type=int, default=10, help="Number of results")

    args = parser.parse_args()

    # Initialize service
    service = VectorSearchService(args.project_id)

    # Create index and endpoint if they don't exist
    service.create_index()
    service.deploy_index()

    # Perform search
    search_query = SearchQuery(
        text=args.query,
        filters={},
        num_results=args.num_results,
        similarity_threshold=0.5
    )

    results = await service.search(search_query)

    # Print results
    print(f"Search results for: {args.query}")
    print("=" * 50)

    for i, result in enumerate(results, 1):
        print(f"{i}. {result.title} by {result.author}")
        print(f"   Category: {result.category}, Complexity: {result.complexity}")
        print(f"   Score: {result.similarity_score:.3f}")
        print(f"   Summary: {result.semantic_summary[:100]}...")
        print()

if __name__ == "__main__":
    asyncio.run(main()) 