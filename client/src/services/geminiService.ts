import { GeminiSearchResponse, Ebook, DbEbook } from '../types';

// Author lookup map (matches server)
const authors: Record<number, string> = {
  1: 'Dr. Sarah Chen',
  2: 'Prof. Michael Rodriguez', 
  3: 'Dr. Emma Thompson',
  4: 'Dr. James Park',
  5: 'Lisa Wang',
  6: 'Dr. Robert Kim'
};

// Convert database ebook to client ebook format
function convertDbEbookToClientEbook(dbEbook: DbEbook): Ebook {
  return {
    id: dbEbook.id.toString(),
    title: dbEbook.title,
    description: dbEbook.description,
    author: authors[dbEbook.authorId] || `Author ${dbEbook.authorId}`,
    price: parseFloat(dbEbook.price),
    coverUrl: dbEbook.coverUrl || '',
    category: dbEbook.category,
    complexity: dbEbook.complexity,
    frameworkTags: dbEbook.frameworkTags || [],
    pageCount: dbEbook.pageCount || 0
  };
}

// Mock implementation of Gemini AI service
// In production, this would use actual Google Gemini API
export async function analyzeSearchQuery(query: string): Promise<GeminiSearchResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // For now, use mock analysis
    // In production, this would call the actual Gemini API
    const topics = extractTopicsFromQuery(query);
    const isBundleSuggestion = topics.length > 2 || query.toLowerCase().includes('comprehensive') || query.toLowerCase().includes('complete');
    
    return {
      search_summary: `Found AI resources related to "${query}"`,
      ebook_topics: topics,
      is_bundle_suggestion: isBundleSuggestion,
      bundle_name: isBundleSuggestion ? `${capitalizeFirst(topics[0] || 'AI')} Learning Bundle` : undefined
    };
  } catch (error) {
    console.error('Gemini analysis failed:', error);
    throw new Error('Unable to analyze search query. Please try again.');
  }
}

// Database search function using backend API
export async function findEbooksByTopics(topics: string[]): Promise<Ebook[]> {
  try {
    // If no topics, get all ebooks
    if (topics.length === 0) {
      const response = await fetch('/api/ebooks');
      if (!response.ok) {
        throw new Error('Failed to fetch ebooks');
      }
      const dbEbooks: DbEbook[] = await response.json();
      return dbEbooks.map(convertDbEbookToClientEbook);
    }

    // Search for ebooks based on topics
    const searchQuery = topics.join(' ');
    const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
    if (!response.ok) {
      throw new Error('Failed to search ebooks');
    }
    const dbEbooks: DbEbook[] = await response.json();
    return dbEbooks.map(convertDbEbookToClientEbook);
  } catch (error) {
    console.error('Database search failed:', error);
    // Return empty array on error
    return [];
  }
}

// Helper function to extract topics from search query
function extractTopicsFromQuery(query: string): string[] {
  const keywords = query.toLowerCase().split(' ').filter(word => word.length > 2);
  
  // Map common terms to AI topics
  const topicMapping: Record<string, string> = {
    'machine': 'machine learning',
    'learning': 'machine learning',
    'neural': 'neural networks',
    'network': 'neural networks',
    'deep': 'deep learning',
    'tensorflow': 'tensorflow',
    'pytorch': 'pytorch',
    'python': 'python',
    'data': 'data science',
    'science': 'data science',
    'computer': 'computer vision',
    'vision': 'computer vision',
    'natural': 'natural language processing',
    'language': 'natural language processing',
    'nlp': 'natural language processing',
    'reinforcement': 'reinforcement learning',
    'ai': 'artificial intelligence',
    'artificial': 'artificial intelligence',
    'intelligence': 'artificial intelligence'
  };

  const topics = new Set<string>();
  
  keywords.forEach(keyword => {
    if (topicMapping[keyword]) {
      topics.add(topicMapping[keyword]);
    } else {
      topics.add(keyword);
    }
  });

  return Array.from(topics);
}

// Helper function to capitalize first letter
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// For production use with actual Gemini API:
/*
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" 
});

export async function analyzeSearchQuery(query: string): Promise<GeminiSearchResponse> {
  try {
    const systemPrompt = `You are an AI assistant that analyzes search queries for an ebook marketplace specializing in AI and machine learning content.

Analyze the user's search query and respond with JSON in this exact format:
{
  "search_summary": "A human-readable summary of what the user is looking for",
  "ebook_topics": ["array", "of", "relevant", "topics"],
  "is_bundle_suggestion": boolean,
  "bundle_name": "Optional bundle name if is_bundle_suggestion is true"
}

Consider bundle suggestions when the query implies comprehensive learning or multiple related topics.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            search_summary: { type: "string" },
            ebook_topics: { 
              type: "array",
              items: { type: "string" }
            },
            is_bundle_suggestion: { type: "boolean" },
            bundle_name: { type: "string" }
          },
          required: ["search_summary", "ebook_topics", "is_bundle_suggestion"]
        }
      },
      contents: query
    });

    const rawJson = response.text;
    if (rawJson) {
      return JSON.parse(rawJson);
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Unable to analyze search query. Please try again.');
  }
}
*/
