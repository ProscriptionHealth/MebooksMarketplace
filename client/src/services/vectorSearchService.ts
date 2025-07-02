// Vector Search Service for Mebooks.ai Frontend
// Integrates with Express backend which bridges to Python vector search service

import { Ebook, GeminiSearchResponse } from '../types';

// Search result interface from vector search
export interface VectorSearchResult {
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

// Search filters interface
export interface SearchFilters {
  category?: string;
  complexity?: string;
  author?: string;
  price_range?: {
    min: number;
    max: number;
  };
  frameworks?: string[];
}

// Search query interface
export interface SearchQuery {
  text: string;
  filters: SearchFilters;
  num_results: number;
  similarity_threshold: number;
}

// Vector search service class
export class VectorSearchService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    // Use Vite environment variables and fallback to current Express backend
    this.baseUrl = import.meta.env.VITE_VECTOR_SEARCH_API_URL || window.location.origin;
    this.apiKey = import.meta.env.VITE_VECTOR_SEARCH_API_KEY || '';
  }

  // Generate headers for API requests
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Only add authorization if API key is provided
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    return headers;
  }

  // Check if vector search service is available
  async isServiceAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/search?query=test&semantic=true`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      return response.ok;
    } catch (error) {
      console.warn('Vector search service not available, falling back to traditional search');
      return false;
    }
  }

  // Perform semantic search via Express backend
  async searchEbooks(query: SearchQuery): Promise<VectorSearchResult[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/search?query=${encodeURIComponent(query.text)}&semantic=true`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const results = await response.json();
      
      // Convert results to VectorSearchResult format if they're not already
      return Array.isArray(results) ? results.map((result: any) => this.convertToVectorResult(result)) : [];
    } catch (error) {
      console.error('Vector search error:', error);
      throw new Error('Failed to perform semantic search');
    }
  }

  // Perform hybrid search (semantic + keyword) via Express backend
  async hybridSearch(
    query: string,
    filters: SearchFilters = {},
    numResults: number = 10
  ): Promise<VectorSearchResult[]> {
    try {
      // Try semantic search first, fallback to regular search
      let response;
      try {
        response = await fetch(`${this.baseUrl}/api/search?query=${encodeURIComponent(query)}&semantic=true`, {
          method: 'GET',
          headers: this.getHeaders(),
        });
      } catch (semanticError) {
        // Fallback to regular search
        response = await fetch(`${this.baseUrl}/api/search?query=${encodeURIComponent(query)}`, {
          method: 'GET',
          headers: this.getHeaders(),
        });
      }

      if (!response.ok) {
        throw new Error(`Hybrid search failed: ${response.statusText}`);
      }

      const results = await response.json();
      return Array.isArray(results) ? results.map((result: any) => this.convertToVectorResult(result)) : [];
    } catch (error) {
      console.error('Hybrid search error:', error);
      throw new Error('Failed to perform hybrid search');
    }
  }

  // Get similar ebooks via Express backend
  async getSimilarEbooks(ebookId: string, numResults: number = 5): Promise<VectorSearchResult[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ebooks/${ebookId}/similar?limit=${numResults}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Similar ebooks search failed: ${response.statusText}`);
      }

      const results = await response.json();
      return Array.isArray(results) ? results.map((result: any) => this.convertToVectorResult(result)) : [];
    } catch (error) {
      console.error('Similar ebooks search error:', error);
      // Return empty array as fallback
      return [];
    }
  }

  // Convert any result format to VectorSearchResult
  private convertToVectorResult(result: any): VectorSearchResult {
    return {
      ebook_id: result.ebook_id || result.id || '',
      title: result.title || '',
      author: result.author || '',
      category: result.category || '',
      complexity: result.complexity || '',
      similarity_score: result.similarity_score || 0,
      relevant_chunks: result.relevant_chunks || [],
      semantic_summary: result.semantic_summary || result.description || '',
      keywords: result.keywords || result.frameworkTags || [],
    };
  }

  // Search by category
  async searchByCategory(category: string, numResults: number = 20): Promise<VectorSearchResult[]> {
    try {
      const filters: SearchFilters = { category };
      const searchQuery: SearchQuery = {
        text: category,
        filters,
        num_results: numResults,
        similarity_threshold: 0.3,
      };

      return await this.searchEbooks(searchQuery);
    } catch (error) {
      console.error('Category search error:', error);
      return [];
    }
  }

  // Search by complexity level
  async searchByComplexity(complexity: string, numResults: number = 20): Promise<VectorSearchResult[]> {
    try {
      const filters: SearchFilters = { complexity };
      const searchQuery: SearchQuery = {
        text: complexity,
        filters,
        num_results: numResults,
        similarity_threshold: 0.3,
      };

      return await this.searchEbooks(searchQuery);
    } catch (error) {
      console.error('Complexity search error:', error);
      return [];
    }
  }

  // Advanced search with multiple filters
  async advancedSearch(
    query: string,
    filters: SearchFilters,
    numResults: number = 20
  ): Promise<VectorSearchResult[]> {
    try {
      const searchQuery: SearchQuery = {
        text: query,
        filters,
        num_results: numResults,
        similarity_threshold: 0.4,
      };

      return await this.searchEbooks(searchQuery);
    } catch (error) {
      console.error('Advanced search error:', error);
      return [];
    }
  }
}

// Create singleton instance
export const vectorSearchService = new VectorSearchService();

// Enhanced search function that combines Gemini analysis with vector search
export async function enhancedSearch(
  query: string,
  geminiResponse: GeminiSearchResponse | null = null
): Promise<Ebook[]> {
  try {
    // Use Gemini response topics if available, otherwise use the query directly
    const searchText = geminiResponse?.ebook_topics?.join(' ') || query;
    
    // Check if vector search is available
    const isVectorAvailable = await vectorSearchService.isServiceAvailable();
    
    let results: Ebook[] = [];
    
    if (isVectorAvailable) {
      // Perform vector search
      const vectorResults = await vectorSearchService.hybridSearch(searchText, {}, 20);
      
      // Convert vector results to Ebook format
      results = vectorResults.map(result => ({
        id: result.ebook_id,
        title: result.title,
        description: result.semantic_summary,
        author: result.author,
        price: 0, // Will be enriched from database
        coverUrl: '', // Will be enriched from database
        category: result.category,
        complexity: result.complexity as any,
        frameworkTags: result.keywords,
        pageCount: 0, // Will be enriched from database
      }));
    } else {
      // Fallback to traditional search via Express backend
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchText)}`);
      if (response.ok) {
        const dbResults = await response.json();
        results = Array.isArray(dbResults) ? dbResults : [];
      }
    }
    
    return results;
  } catch (error) {
    console.error('Enhanced search error:', error);
    // Fallback to empty array
    return [];
  }
}

// Export default instance
export default vectorSearchService;