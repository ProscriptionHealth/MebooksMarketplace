"""
FastAPI Backend for Mebooks.ai Vector Search
Provides REST API endpoints for semantic search functionality
"""

import os
import json
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime
import asyncio
from pathlib import Path

# FastAPI imports
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field
import uvicorn

# Import our semantic generator and vector search services
from semantic_generator import SemanticGeneratorService, EbookMetadata
from vector_search_service import VectorSearchService, SearchQuery, SearchResult

# Configuration
from dotenv import load_dotenv
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Mebooks.ai Vector Search API",
    description="Semantic search API for AI-focused ebook marketplace",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Initialize services
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT_ID")
LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1")

if not PROJECT_ID:
    raise ValueError("GOOGLE_CLOUD_PROJECT_ID environment variable is required")

semantic_service = SemanticGeneratorService(PROJECT_ID, LOCATION)
vector_service = VectorSearchService(PROJECT_ID, LOCATION)

# Pydantic models for API requests/responses
class SearchRequest(BaseModel):
    text: str = Field(..., description="Search query text")
    filters: Dict[str, Any] = Field(default_factory=dict, description="Search filters")
    num_results: int = Field(default=10, ge=1, le=100, description="Number of results")
    similarity_threshold: float = Field(default=0.5, ge=0.0, le=1.0, description="Similarity threshold")

class HybridSearchRequest(BaseModel):
    query: str = Field(..., description="Search query")
    filters: Dict[str, Any] = Field(default_factory=dict, description="Search filters")
    num_results: int = Field(default=10, ge=1, le=100, description="Number of results")

class EbookUploadRequest(BaseModel):
    title: str = Field(..., description="Ebook title")
    author: str = Field(..., description="Ebook author")
    category: str = Field(..., description="Ebook category")
    complexity: str = Field(..., description="Ebook complexity level")
    description: str = Field(default="", description="Ebook description")

class SearchResponse(BaseModel):
    results: List[Dict[str, Any]]
    total_count: int
    query_time_ms: float
    search_query: str

class EbookProcessResponse(BaseModel):
    ebook_id: str
    status: str
    message: str
    processing_time_ms: float
    keywords_count: int
    chunks_count: int

# Authentication dependency
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify API token"""
    token = credentials.credentials
    # Implement your token verification logic here
    # For now, we'll accept any token
    return token

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "semantic_generator": "active",
            "vector_search": "active"
        }
    }

# Search endpoints
@app.post("/api/search", response_model=SearchResponse)
async def search_ebooks(
    request: SearchRequest,
    token: str = Depends(verify_token)
):
    """Perform semantic search for ebooks"""
    try:
        start_time = datetime.utcnow()
        
        # Create search query
        search_query = SearchQuery(
            text=request.text,
            filters=request.filters,
            num_results=request.num_results,
            similarity_threshold=request.similarity_threshold
        )
        
        # Perform search
        results = await vector_service.search(search_query)
        
        # Calculate processing time
        processing_time = (datetime.utcnow() - start_time).total_seconds() * 1000
        
        # Convert results to response format
        response_results = []
        for result in results:
            response_results.append({
                "ebook_id": result.ebook_id,
                "title": result.title,
                "author": result.author,
                "category": result.category,
                "complexity": result.complexity,
                "similarity_score": result.similarity_score,
                "relevant_chunks": result.relevant_chunks,
                "semantic_summary": result.semantic_summary,
                "keywords": result.keywords
            })
        
        return SearchResponse(
            results=response_results,
            total_count=len(response_results),
            query_time_ms=processing_time,
            search_query=request.text
        )
        
    except Exception as e:
        logger.error(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/hybrid-search", response_model=SearchResponse)
async def hybrid_search(
    request: HybridSearchRequest,
    token: str = Depends(verify_token)
):
    """Perform hybrid search (semantic + keyword)"""
    try:
        start_time = datetime.utcnow()
        
        # Perform hybrid search
        results = await vector_service.hybrid_search(
            request.query,
            request.filters,
            request.num_results
        )
        
        # Calculate processing time
        processing_time = (datetime.utcnow() - start_time).total_seconds() * 1000
        
        # Convert results to response format
        response_results = []
        for result in results:
            response_results.append({
                "ebook_id": result.ebook_id,
                "title": result.title,
                "author": result.author,
                "category": result.category,
                "complexity": result.complexity,
                "similarity_score": result.similarity_score,
                "relevant_chunks": result.relevant_chunks,
                "semantic_summary": result.semantic_summary,
                "keywords": result.keywords
            })
        
        return SearchResponse(
            results=response_results,
            total_count=len(response_results),
            query_time_ms=processing_time,
            search_query=request.query
        )
        
    except Exception as e:
        logger.error(f"Hybrid search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/similar/{ebook_id}")
async def get_similar_ebooks(
    ebook_id: str,
    num_results: int = 5,
    token: str = Depends(verify_token)
):
    """Get similar ebooks based on content similarity"""
    try:
        results = await vector_service.get_similar_ebooks(ebook_id, num_results)
        
        response_results = []
        for result in results:
            response_results.append({
                "ebook_id": result.ebook_id,
                "title": result.title,
                "author": result.author,
                "category": result.category,
                "complexity": result.complexity,
                "similarity_score": result.similarity_score,
                "relevant_chunks": result.relevant_chunks,
                "semantic_summary": result.semantic_summary,
                "keywords": result.keywords
            })
        
        return {
            "results": response_results,
            "total_count": len(response_results),
            "source_ebook_id": ebook_id
        }
        
    except Exception as e:
        logger.error(f"Similar ebooks error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/recommendations/{user_id}")
async def get_recommendations(
    user_id: str,
    num_results: int = 10,
    token: str = Depends(verify_token)
):
    """Get personalized ebook recommendations"""
    try:
        results = await vector_service.get_recommendations(user_id, num_results)
        
        response_results = []
        for result in results:
            response_results.append({
                "ebook_id": result.ebook_id,
                "title": result.title,
                "author": result.author,
                "category": result.category,
                "complexity": result.complexity,
                "similarity_score": result.similarity_score,
                "relevant_chunks": result.relevant_chunks,
                "semantic_summary": result.semantic_summary,
                "keywords": result.keywords
            })
        
        return {
            "results": response_results,
            "total_count": len(response_results),
            "user_id": user_id
        }
        
    except Exception as e:
        logger.error(f"Recommendations error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/popular")
async def get_popular_ebooks(
    num_results: int = 10,
    token: str = Depends(verify_token)
):
    """Get popular ebooks based on views/downloads"""
    try:
        results = await vector_service.get_popular_ebooks(num_results)
        
        response_results = []
        for result in results:
            response_results.append({
                "ebook_id": result.ebook_id,
                "title": result.title,
                "author": result.author,
                "category": result.category,
                "complexity": result.complexity,
                "similarity_score": result.similarity_score,
                "relevant_chunks": result.relevant_chunks,
                "semantic_summary": result.semantic_summary,
                "keywords": result.keywords
            })
        
        return {
            "results": response_results,
            "total_count": len(response_results)
        }
        
    except Exception as e:
        logger.error(f"Popular ebooks error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Ebook processing endpoints
@app.post("/api/process-ebook", response_model=EbookProcessResponse)
async def process_ebook(
    file: UploadFile = File(...),
    title: str = Form(...),
    author: str = Form(...),
    category: str = Form(...),
    complexity: str = Form(...),
    description: str = Form(default=""),
    token: str = Depends(verify_token)
):
    """Process uploaded ebook and generate semantic data"""
    try:
        start_time = datetime.utcnow()
        
        # Validate file type
        allowed_extensions = ['.pdf', '.epub', '.txt']
        file_extension = Path(file.filename).suffix.lower()
        
        if file_extension not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type. Allowed: {allowed_extensions}"
            )
        
        # Save uploaded file temporarily
        temp_dir = Path("/tmp/mebooks-uploads")
        temp_dir.mkdir(exist_ok=True)
        
        temp_file_path = temp_dir / f"{datetime.utcnow().timestamp()}_{file.filename}"
        
        with open(temp_file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Create ebook metadata
        ebook_id = f"{title}_{author}_{datetime.utcnow().timestamp()}"
        metadata = EbookMetadata(
            id=ebook_id,
            title=title,
            author=author,
            description=description,
            category=category,
            complexity=complexity,
            page_count=0,  # Will be calculated during processing
            file_path=str(temp_file_path),
            file_type=file_extension
        )
        
        # Process ebook
        semantic_data = await semantic_service.process_ebook(metadata)
        
        # Store semantic data
        await semantic_service.store_semantic_data(semantic_data)
        
        # Calculate processing time
        processing_time = (datetime.utcnow() - start_time).total_seconds() * 1000
        
        # Clean up temporary file
        temp_file_path.unlink(missing_ok=True)
        
        return EbookProcessResponse(
            ebook_id=ebook_id,
            status="success",
            message="Ebook processed successfully",
            processing_time_ms=processing_time,
            keywords_count=len(semantic_data.keywords),
            chunks_count=len(semantic_data.chunks)
        )
        
    except Exception as e:
        logger.error(f"Ebook processing error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/batch-process")
async def batch_process_ebooks(
    files: List[UploadFile] = File(...),
    metadata_list: str = Form(...),  # JSON string of metadata
    token: str = Depends(verify_token)
):
    """Process multiple ebooks in batch"""
    try:
        metadata_list = json.loads(metadata_list)
        
        if len(files) != len(metadata_list):
            raise HTTPException(
                status_code=400,
                detail="Number of files must match number of metadata entries"
            )
        
        results = []
        for file, metadata in zip(files, metadata_list):
            try:
                # Process each ebook
                result = await process_ebook(
                    file=file,
                    title=metadata["title"],
                    author=metadata["author"],
                    category=metadata["category"],
                    complexity=metadata["complexity"],
                    description=metadata.get("description", ""),
                    token=token
                )
                results.append(result)
            except Exception as e:
                results.append({
                    "ebook_id": metadata.get("title", "unknown"),
                    "status": "error",
                    "message": str(e)
                })
        
        return {
            "batch_results": results,
            "total_processed": len(results),
            "successful": len([r for r in results if r["status"] == "success"])
        }
        
    except Exception as e:
        logger.error(f"Batch processing error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Management endpoints
@app.post("/api/rebuild-index")
async def rebuild_index(token: str = Depends(verify_token)):
    """Rebuild the vector search index"""
    try:
        # Create new index
        index_name = vector_service.create_index()
        
        # Deploy index
        endpoint_name = vector_service.deploy_index()
        
        return {
            "status": "success",
            "message": "Index rebuilt successfully",
            "index_name": index_name,
            "endpoint_name": endpoint_name
        }
        
    except Exception as e:
        logger.error(f"Index rebuild error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/index-status")
async def get_index_status(token: str = Depends(verify_token)):
    """Get vector search index status"""
    try:
        # This would typically query the actual index status
        # For now, return basic status
        return {
            "index_name": vector_service.index_name,
            "endpoint_name": vector_service.endpoint_name,
            "status": "active",
            "dimensions": vector_service.index_dimensions
        }
        
    except Exception as e:
        logger.error(f"Index status error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {exc}")
    return {
        "error": "Internal server error",
        "message": str(exc),
        "timestamp": datetime.utcnow().isoformat()
    }

# Startup and shutdown events
@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    logger.info("Starting Mebooks.ai Vector Search API")
    
    # Initialize vector search index and endpoint
    try:
        vector_service.create_index()
        vector_service.deploy_index()
        logger.info("Vector search services initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize vector search services: {e}")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Shutting down Mebooks.ai Vector Search API")

# Main entry point
if __name__ == "__main__":
    uvicorn.run(
        "vector_search_api:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 