/**
 * Vector Search Bridge Service
 * Bridges Express.js backend to Python FastAPI vector search service
 */

import { Ebook } from "@shared/schema";

// Python FastAPI service configuration
const VECTOR_SEARCH_SERVICE_URL = process.env.VECTOR_SEARCH_SERVICE_URL || 'http://localhost:8000';

// Python SearchResult interface (matches Python dataclass)
interface PythonSearchResult {
  ebook_id: string;
  title: string;
  author: string;
  category: string;
  complexity: string;
  similarity_score: number;
  relevant_chunks: string[];
  semantic_summary: string;
  keywords: string[];
}

// Python search request interface
interface VectorSearchRequest {
  query: string;
  filters?: {
    category?: string[];
    complexity?: string[];
    author?: string[];
    min_price?: number;
    max_price?: number;
  };
  num_results?: number;
  similarity_threshold?: number;
}

export class VectorSearchBridge {
  private serviceUrl: string;
  private isServiceAvailable: boolean = false;

  constructor(serviceUrl: string = VECTOR_SEARCH_SERVICE_URL) {
    this.serviceUrl = serviceUrl;
  }

  /**
   * Check if Python vector search service is available
   */
  async checkServiceHealth(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${this.serviceUrl}/health`, {
        method: 'GET',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      this.isServiceAvailable = response.ok;
      return this.isServiceAvailable;
    } catch (error) {
      console.warn('Vector search service not available:', error);
      this.isServiceAvailable = false;
      return false;
    }
  }

  /**
   * Perform semantic search using Python vector search service
   */
  async semanticSearch(query: string, options: {
    category?: string[];
    complexity?: string[];
    numResults?: number;
    similarityThreshold?: number;
  } = {}): Promise<Ebook[]> {
    if (!this.isServiceAvailable) {
      await this.checkServiceHealth();
      if (!this.isServiceAvailable) {
        throw new Error('Vector search service is not available');
      }
    }

    try {
      const searchRequest: VectorSearchRequest = {
        query,
        filters: {
          category: options.category,
          complexity: options.complexity,
        },
        num_results: options.numResults || 20,
        similarity_threshold: options.similarityThreshold || 0.1,
      };

      const response = await fetch(`${this.serviceUrl}/api/search/semantic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchRequest),
      });

      if (!response.ok) {
        throw new Error(`Vector search failed: ${response.status} ${response.statusText}`);
      }

      const pythonResults: PythonSearchResult[] = await response.json();
      return pythonResults.map(this.convertPythonResultToEbook);
    } catch (error) {
      console.error('Semantic search error:', error);
      throw error;
    }
  }

  /**
   * Upload ebook for indexing in vector search
   */
  async indexEbook(ebookFile: Buffer, metadata: {
    title: string;
    author: string;
    category: string;
    complexity: string;
    description: string;
    keywords?: string[];
  }): Promise<{ success: boolean; ebook_id?: string; error?: string }> {
    if (!this.isServiceAvailable) {
      await this.checkServiceHealth();
      if (!this.isServiceAvailable) {
        throw new Error('Vector search service is not available');
      }
    }

    try {
      const formData = new FormData();
      formData.append('file', new Blob([new Uint8Array(ebookFile)]), `${metadata.title}.pdf`);
      formData.append('metadata', JSON.stringify(metadata));

      const response = await fetch(`${this.serviceUrl}/api/ebooks/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ebook indexing failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ebook indexing error:', error);
      throw error;
    }
  }

  /**
   * Get similar ebooks based on ebook ID
   */
  async getSimilarEbooks(ebookId: string, numResults: number = 10): Promise<Ebook[]> {
    if (!this.isServiceAvailable) {
      await this.checkServiceHealth();
      if (!this.isServiceAvailable) {
        throw new Error('Vector search service is not available');
      }
    }

    try {
      const response = await fetch(`${this.serviceUrl}/api/ebooks/${ebookId}/similar?num_results=${numResults}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Similar ebooks search failed: ${response.status} ${response.statusText}`);
      }

      const pythonResults: PythonSearchResult[] = await response.json();
      return pythonResults.map(this.convertPythonResultToEbook);
    } catch (error) {
      console.error('Similar ebooks search error:', error);
      throw error;
    }
  }

  /**
   * Convert Python SearchResult to Ebook interface
   */
  private convertPythonResultToEbook(pythonResult: PythonSearchResult): Ebook {
    return {
      id: parseInt(pythonResult.ebook_id) || 0,
      title: pythonResult.title,
      description: pythonResult.semantic_summary || `${pythonResult.title} - ${pythonResult.category}`,
      authorId: 1, // Default author ID - would need proper mapping
      price: "29.99", // Default price - would need proper mapping
      fileUrl: null,
      coverUrl: `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600`,
      category: pythonResult.category,
      complexity: pythonResult.complexity,
      prerequisites: [], // Would need to extract from semantic_summary or keywords
      frameworkTags: pythonResult.keywords || [],
      pageCount: 200, // Default page count - would need proper mapping
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Get service status and configuration
   */
  async getServiceStatus(): Promise<{
    available: boolean;
    url: string;
    version?: string;
    features?: string[];
  }> {
    const available = await this.checkServiceHealth();
    
    if (!available) {
      return {
        available: false,
        url: this.serviceUrl,
      };
    }

    try {
      const response = await fetch(`${this.serviceUrl}/api/info`);
      const info = response.ok ? await response.json() : {};
      
      return {
        available: true,
        url: this.serviceUrl,
        version: info.version,
        features: info.features,
      };
    } catch (error) {
      return {
        available: true,
        url: this.serviceUrl,
      };
    }
  }
}

// Export singleton instance
export const vectorSearchBridge = new VectorSearchBridge();