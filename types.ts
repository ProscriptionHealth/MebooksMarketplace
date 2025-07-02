
export enum ComplexityRating {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Research = 'research',
}

export interface Ebook {
  id: string;
  title: string;
  description: string;
  author: string;
  price: number; // in cents
  coverUrl: string;
  category: string;
  complexity: ComplexityRating;
  frameworkTags: string[];
  pageCount: number;
}

export interface GeminiSearchResponse {
  search_summary: string;
  ebook_topics: string[];
  is_bundle_suggestion: boolean;
  bundle_name?: string;
}
