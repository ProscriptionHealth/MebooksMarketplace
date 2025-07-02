#!/usr/bin/env python3
"""
Startup script for Mebooks.ai Vector Search Service
This script starts the FastAPI server for vector search functionality
"""

import os
import sys
import uvicorn
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    """Start the vector search service"""
    
    # Configuration
    HOST = os.getenv("VECTOR_SEARCH_HOST", "0.0.0.0")
    PORT = int(os.getenv("VECTOR_SEARCH_PORT", "8000"))
    
    print(f"Starting Mebooks.ai Vector Search Service on {HOST}:{PORT}")
    print("This service provides semantic search capabilities for the ebook marketplace")
    
    try:
        # Start the FastAPI server
        uvicorn.run(
            "vector_search_api:app",
            host=HOST,
            port=PORT,
            reload=True,  # Enable auto-reload for development
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\nVector Search Service stopped by user")
    except Exception as e:
        print(f"Failed to start Vector Search Service: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()