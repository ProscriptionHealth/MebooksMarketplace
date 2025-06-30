// Complexity levels for ebooks
export enum ComplexityRating {
  Beginner = 'beginner',
  Intermediate = 'intermediate', 
  Advanced = 'advanced',
  Research = 'research',
}

// Core ebook interface
export interface Ebook {
  id: string;
  title: string;
  description: string;
  author: string;
  price: number; // in dollars
  coverUrl: string;
  category: string;
  complexity: ComplexityRating;
  frameworkTags: string[];
  pageCount: number;
}

// AI search response structure
export interface GeminiSearchResponse {
  search_summary: string;
  ebook_topics: string[];
  is_bundle_suggestion: boolean;
  bundle_name?: string;
}

// Constants
export const PLATFORM_FEE = 0.25; // $0.25 flat fee
