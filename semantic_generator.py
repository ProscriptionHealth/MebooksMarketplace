"""
Mebooks.ai Semantic Generator Service
Generates semantic descriptions, keywords, and embeddings for uploaded ebooks
"""

import os
import json
import logging
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from pathlib import Path
import asyncio
from concurrent.futures import ThreadPoolExecutor

# Google Cloud and AI imports
import vertexai
from vertexai.language_models import TextGenerationModel
from vertexai.vision_models import ImageGenerationModel
from google.cloud import aiplatform
from google.cloud.aiplatform import MatchingEngineIndex, MatchingEngineIndexEndpoint
from google.cloud import storage

# Text processing imports
import PyPDF2
import fitz  # PyMuPDF
import re
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import nltk

# Embeddings and vector processing
import numpy as np
from sentence_transformers import SentenceTransformer
import hashlib

# Configuration
from dotenv import load_dotenv
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class EbookMetadata:
    """Ebook metadata structure"""
    id: str
    title: str
    author: str
    description: str
    category: str
    complexity: str
    page_count: int
    file_path: str
    file_type: str

@dataclass
class SemanticData:
    """Semantic data generated from ebook"""
    ebook_id: str
    keywords: List[str]
    semantic_summary: str
    technical_concepts: List[str]
    learning_objectives: List[str]
    prerequisites: List[str]
    target_audience: str
    difficulty_level: str
    estimated_reading_time: int
    embeddings: Dict[str, List[float]]
    chunks: List[Dict[str, Any]]

class TextChunker:
    """Handles text chunking for optimal embedding generation"""
    
    def __init__(self, chunk_size: int = 512, overlap: int = 50):
        self.chunk_size = chunk_size
        self.overlap = overlap
        self.lemmatizer = WordNetLemmatizer()
        
        # Download required NLTK data
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')
        
        try:
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('stopwords')
        
        try:
            nltk.data.find('corpora/wordnet')
        except LookupError:
            nltk.download('wordnet')
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text.strip())
        # Remove special characters but keep important ones
        text = re.sub(r'[^\w\s\.\,\!\?\;\:\-\(\)\[\]\{\}]', '', text)
        return text
    
    def chunk_text(self, text: str) -> List[str]:
        """Split text into overlapping chunks"""
        sentences = sent_tokenize(text)
        chunks = []
        current_chunk = ""
        
        for sentence in sentences:
            if len(current_chunk) + len(sentence) <= self.chunk_size:
                current_chunk += sentence + " "
            else:
                if current_chunk:
                    chunks.append(current_chunk.strip())
                current_chunk = sentence + " "
        
        if current_chunk:
            chunks.append(current_chunk.strip())
        
        return chunks
    
    def extract_keywords(self, text: str, max_keywords: int = 20) -> List[str]:
        """Extract keywords using TF-IDF and NLP techniques"""
        # Tokenize and clean
        words = word_tokenize(text.lower())
        stop_words = set(stopwords.words('english'))
        
        # Filter and lemmatize
        filtered_words = [
            self.lemmatizer.lemmatize(word) 
            for word in words 
            if word.isalnum() and word not in stop_words and len(word) > 2
        ]
        
        # Count frequencies
        word_freq = {}
        for word in filtered_words:
            word_freq[word] = word_freq.get(word, 0) + 1
        
        # Sort by frequency and return top keywords
        sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
        return [word for word, freq in sorted_words[:max_keywords]]

class EbookProcessor:
    """Processes ebook files and extracts content"""
    
    def __init__(self):
        self.supported_formats = ['.pdf', '.epub', '.txt']
    
    def extract_text_from_pdf(self, file_path: str) -> str:
        """Extract text from PDF file"""
        try:
            # Try PyMuPDF first (better for complex PDFs)
            doc = fitz.open(file_path)
            text = ""
            for page in doc:
                text += page.get_text()
            doc.close()
            return text
        except Exception as e:
            logger.warning(f"PyMuPDF failed, trying PyPDF2: {e}")
            try:
                # Fallback to PyPDF2
                with open(file_path, 'rb') as file:
                    pdf_reader = PyPDF2.PdfReader(file)
                    text = ""
                    for page in pdf_reader.pages:
                        text += page.extract_text()
                return text
            except Exception as e2:
                logger.error(f"Failed to extract text from PDF: {e2}")
                raise
    
    def extract_text_from_epub(self, file_path: str) -> str:
        """Extract text from EPUB file"""
        # Implementation for EPUB extraction
        # This would require additional libraries like ebooklib
        raise NotImplementedError("EPUB extraction not yet implemented")
    
    def extract_text_from_txt(self, file_path: str) -> str:
        """Extract text from TXT file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except Exception as e:
            logger.error(f"Failed to extract text from TXT: {e}")
            raise
    
    def extract_text(self, file_path: str) -> str:
        """Extract text from ebook file based on format"""
        file_ext = Path(file_path).suffix.lower()
        
        if file_ext not in self.supported_formats:
            raise ValueError(f"Unsupported file format: {file_ext}")
        
        if file_ext == '.pdf':
            return self.extract_text_from_pdf(file_path)
        elif file_ext == '.epub':
            return self.extract_text_from_epub(file_path)
        elif file_ext == '.txt':
            return self.extract_text_from_txt(file_path)
        else:
            raise ValueError(f"Unsupported file format: {file_ext}")

class LLMSemanticGenerator:
    """Generates semantic descriptions using LLMs"""
    
    def __init__(self, project_id: str, location: str = "us-central1"):
        self.project_id = project_id
        self.location = location
        
        # Initialize Vertex AI
        vertexai.init(project=project_id, location=location)
        
        # Initialize models
        self.text_model = TextGenerationModel.from_pretrained("text-bison@001")
        
        # Initialize embeddings model
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
    
    async def generate_semantic_summary(self, text: str, metadata: EbookMetadata) -> Dict[str, Any]:
        """Generate comprehensive semantic summary using LLM"""
        
        prompt = f"""
        Analyze this AI/tech ebook content and provide a comprehensive semantic summary.
        
        Ebook Title: {metadata.title}
        Author: {metadata.author}
        Category: {metadata.category}
        Complexity: {metadata.complexity}
        
        Content (first 2000 characters):
        {text[:2000]}...
        
        Please provide a JSON response with the following structure:
        {{
            "semantic_summary": "A detailed summary capturing the core concepts, methodologies, and value proposition",
            "technical_concepts": ["list", "of", "key", "technical", "concepts"],
            "learning_objectives": ["list", "of", "learning", "objectives"],
            "prerequisites": ["list", "of", "prerequisites"],
            "target_audience": "Description of ideal reader",
            "difficulty_level": "beginner/intermediate/advanced/expert",
            "estimated_reading_time_hours": 5,
            "key_insights": ["list", "of", "key", "insights"],
            "practical_applications": ["list", "of", "practical", "applications"]
        }}
        
        Focus on AI, machine learning, product management, and technical content.
        """
        
        try:
            response = self.text_model.predict(prompt)
            return json.loads(response.text)
        except Exception as e:
            logger.error(f"Failed to generate semantic summary: {e}")
            # Return fallback summary
            return {
                "semantic_summary": f"Comprehensive guide on {metadata.category} by {metadata.author}",
                "technical_concepts": [metadata.category],
                "learning_objectives": ["Master key concepts in " + metadata.category],
                "prerequisites": ["Basic understanding of technology"],
                "target_audience": "Technology professionals and learners",
                "difficulty_level": metadata.complexity,
                "estimated_reading_time_hours": 3,
                "key_insights": ["Practical knowledge in " + metadata.category],
                "practical_applications": ["Real-world implementation"]
            }
    
    def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for text chunks"""
        try:
            embeddings = self.embedding_model.encode(texts)
            return embeddings.tolist()
        except Exception as e:
            logger.error(f"Failed to generate embeddings: {e}")
            # Return zero embeddings as fallback
            return [[0.0] * 384] * len(texts)  # 384 is the dimension of all-MiniLM-L6-v2

class VertexAIVectorSearch:
    """Manages Vertex AI Vector Search operations"""
    
    def __init__(self, project_id: str, location: str = "us-central1"):
        self.project_id = project_id
        self.location = location
        self.index_name = "mebooks-ebooks-index"
        self.endpoint_name = "mebooks-search-endpoint"
        
        # Initialize Vertex AI
        aiplatform.init(project=project_id, location=location)
    
    def create_index(self, dimensions: int = 384) -> str:
        """Create Vector Search index"""
        try:
            index = MatchingEngineIndex.create_tree_ah_index(
                display_name=self.index_name,
                contents_delta_uri=f"gs://mebooks-vectors/{self.index_name}/contents",
                config={
                    "dimensions": dimensions,
                    "approximate_neighbors_count": 150,
                    "distance_measure_type": "COSINE_DISTANCE",
                    "algorithm_config": {
                        "tree_ah_config": {
                            "leaf_node_embedding_count": 500,
                            "leaf_nodes_to_search_percent": 10
                        }
                    }
                }
            )
            return index.name
        except Exception as e:
            logger.error(f"Failed to create index: {e}")
            raise
    
    def deploy_index(self, index_name: str) -> str:
        """Deploy index to endpoint"""
        try:
            index = MatchingEngineIndex(index_name=index_name)
            endpoint = index.deploy_index(
                display_name=self.endpoint_name,
                deployed_index_id=self.endpoint_name
            )
            return endpoint.name
        except Exception as e:
            logger.error(f"Failed to deploy index: {e}")
            raise
    
    def upsert_embeddings(self, index_name: str, embeddings: List[Dict[str, Any]]):
        """Upsert embeddings to index"""
        try:
            index = MatchingEngineIndex(index_name=index_name)
            index.upsert_embeddings(embeddings)
        except Exception as e:
            logger.error(f"Failed to upsert embeddings: {e}")
            raise
    
    def find_nearest_neighbors(self, index_name: str, query_embedding: List[float], 
                              num_neighbors: int = 10) -> List[Dict[str, Any]]:
        """Find nearest neighbors for query"""
        try:
            index = MatchingEngineIndex(index_name=index_name)
            response = index.find_nearest_neighbors(
                deployed_index_id=self.endpoint_name,
                queries=[query_embedding],
                num_neighbors=num_neighbors
            )
            return response
        except Exception as e:
            logger.error(f"Failed to find nearest neighbors: {e}")
            raise

class SemanticGeneratorService:
    """Main service for generating semantic data from ebooks"""
    
    def __init__(self, project_id: str, location: str = "us-central1"):
        self.project_id = project_id
        self.location = location
        
        # Initialize components
        self.chunker = TextChunker()
        self.processor = EbookProcessor()
        self.llm_generator = LLMSemanticGenerator(project_id, location)
        self.vector_search = VertexAIVectorSearch(project_id, location)
        
        # Initialize storage client
        self.storage_client = storage.Client(project=project_id)
    
    async def process_ebook(self, metadata: EbookMetadata) -> SemanticData:
        """Process ebook and generate semantic data"""
        logger.info(f"Processing ebook: {metadata.title}")
        
        try:
            # Extract text from ebook
            text = self.processor.extract_text(metadata.file_path)
            logger.info(f"Extracted {len(text)} characters from {metadata.title}")
            
            # Clean and chunk text
            cleaned_text = self.chunker.clean_text(text)
            chunks = self.chunker.chunk_text(cleaned_text)
            logger.info(f"Created {len(chunks)} chunks for {metadata.title}")
            
            # Extract keywords
            keywords = self.chunker.extract_keywords(cleaned_text)
            logger.info(f"Extracted {len(keywords)} keywords for {metadata.title}")
            
            # Generate semantic summary using LLM
            semantic_data = await self.llm_generator.generate_semantic_summary(
                cleaned_text, metadata
            )
            
            # Generate embeddings for chunks
            chunk_embeddings = self.llm_generator.generate_embeddings(chunks)
            
            # Generate embedding for full text summary
            summary_embedding = self.llm_generator.generate_embeddings([
                semantic_data["semantic_summary"]
            ])[0]
            
            # Prepare chunks with metadata
            chunk_data = []
            for i, (chunk, embedding) in enumerate(zip(chunks, chunk_embeddings)):
                chunk_data.append({
                    "id": f"{metadata.id}_chunk_{i}",
                    "ebook_id": metadata.id,
                    "content": chunk,
                    "embedding": embedding,
                    "chunk_index": i,
                    "metadata": {
                        "title": metadata.title,
                        "author": metadata.author,
                        "category": metadata.category,
                        "complexity": metadata.complexity
                    }
                })
            
            # Create semantic data object
            semantic_result = SemanticData(
                ebook_id=metadata.id,
                keywords=keywords,
                semantic_summary=semantic_data["semantic_summary"],
                technical_concepts=semantic_data["technical_concepts"],
                learning_objectives=semantic_data["learning_objectives"],
                prerequisites=semantic_data["prerequisites"],
                target_audience=semantic_data["target_audience"],
                difficulty_level=semantic_data["difficulty_level"],
                estimated_reading_time=semantic_data["estimated_reading_time_hours"],
                embeddings={
                    "summary": summary_embedding,
                    "chunks": chunk_embeddings
                },
                chunks=chunk_data
            )
            
            logger.info(f"Successfully processed {metadata.title}")
            return semantic_result
            
        except Exception as e:
            logger.error(f"Failed to process ebook {metadata.title}: {e}")
            raise
    
    async def store_semantic_data(self, semantic_data: SemanticData):
        """Store semantic data in vector database and metadata store"""
        try:
            # Store in Cloud Storage for backup
            bucket_name = f"mebooks-semantic-data-{self.project_id}"
            bucket = self.storage_client.bucket(bucket_name)
            
            # Store semantic metadata
            metadata_blob = bucket.blob(f"metadata/{semantic_data.ebook_id}.json")
            metadata_blob.upload_from_string(
                json.dumps({
                    "ebook_id": semantic_data.ebook_id,
                    "keywords": semantic_data.keywords,
                    "semantic_summary": semantic_data.semantic_summary,
                    "technical_concepts": semantic_data.technical_concepts,
                    "learning_objectives": semantic_data.learning_objectives,
                    "prerequisites": semantic_data.prerequisites,
                    "target_audience": semantic_data.target_audience,
                    "difficulty_level": semantic_data.difficulty_level,
                    "estimated_reading_time": semantic_data.estimated_reading_time
                }, indent=2),
                content_type='application/json'
            )
            
            # Store embeddings in vector database
            embeddings_data = []
            for chunk in semantic_data.chunks:
                embeddings_data.append({
                    "id": chunk["id"],
                    "embedding": chunk["embedding"],
                    "restricts": {
                        "ebook_id": semantic_data.ebook_id,
                        "category": chunk["metadata"]["category"],
                        "complexity": chunk["metadata"]["complexity"]
                    }
                })
            
            # Upsert to Vertex AI Vector Search
            self.vector_search.upsert_embeddings(
                self.vector_search.index_name,
                embeddings_data
            )
            
            logger.info(f"Stored semantic data for ebook {semantic_data.ebook_id}")
            
        except Exception as e:
            logger.error(f"Failed to store semantic data: {e}")
            raise
    
    async def search_ebooks(self, query: str, filters: Dict[str, Any] = None, 
                           num_results: int = 10) -> List[Dict[str, Any]]:
        """Search ebooks using semantic similarity"""
        try:
            # Generate query embedding
            query_embedding = self.llm_generator.generate_embeddings([query])[0]
            
            # Search vector database
            results = self.vector_search.find_nearest_neighbors(
                self.vector_search.index_name,
                query_embedding,
                num_results
            )
            
            # Process and filter results
            processed_results = []
            for result in results:
                # Apply filters if provided
                if filters:
                    if not self._matches_filters(result, filters):
                        continue
                
                processed_results.append({
                    "ebook_id": result["restricts"]["ebook_id"],
                    "score": result["distance"],
                    "chunk_content": result.get("content", ""),
                    "metadata": result["restricts"]
                })
            
            return processed_results
            
        except Exception as e:
            logger.error(f"Failed to search ebooks: {e}")
            raise
    
    def _matches_filters(self, result: Dict[str, Any], filters: Dict[str, Any]) -> bool:
        """Check if result matches provided filters"""
        for key, value in filters.items():
            if key in result.get("restricts", {}) and result["restricts"][key] != value:
                return False
        return True

# Example usage and CLI interface
async def main():
    """Main function for processing ebooks"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Process ebooks for semantic search")
    parser.add_argument("--project-id", required=True, help="Google Cloud Project ID")
    parser.add_argument("--file-path", required=True, help="Path to ebook file")
    parser.add_argument("--title", required=True, help="Ebook title")
    parser.add_argument("--author", required=True, help="Ebook author")
    parser.add_argument("--category", required=True, help="Ebook category")
    parser.add_argument("--complexity", required=True, help="Ebook complexity level")
    
    args = parser.parse_args()
    
    # Create metadata
    metadata = EbookMetadata(
        id=hashlib.md5(f"{args.title}_{args.author}".encode()).hexdigest(),
        title=args.title,
        author=args.author,
        description="",  # Will be generated
        category=args.category,
        complexity=args.complexity,
        page_count=0,  # Will be calculated
        file_path=args.file_path,
        file_type=Path(args.file_path).suffix.lower()
    )
    
    # Initialize service
    service = SemanticGeneratorService(args.project_id)
    
    # Process ebook
    semantic_data = await service.process_ebook(metadata)
    
    # Store semantic data
    await service.store_semantic_data(semantic_data)
    
    print(f"Successfully processed ebook: {metadata.title}")
    print(f"Generated {len(semantic_data.keywords)} keywords")
    print(f"Created {len(semantic_data.chunks)} chunks")
    print(f"Semantic summary: {semantic_data.semantic_summary[:200]}...")

if __name__ == "__main__":
    asyncio.run(main()) 