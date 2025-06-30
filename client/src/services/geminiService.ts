import { GeminiSearchResponse, Ebook } from '../types';
import { mockEbooks } from '../data/mockEbooks';

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

// Mock database search function
export async function findEbooksByTopics(topics: string[]): Promise<Ebook[]> {
  // Simulate database query delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (topics.length === 0) {
    return mockEbooks.slice(0, 6); // Return sample books
  }

  // Filter ebooks based on topics
  const filteredEbooks = mockEbooks.filter(ebook => {
    const searchableText = `${ebook.title} ${ebook.description} ${ebook.category} ${ebook.frameworkTags.join(' ')}`.toLowerCase();
    return topics.some(topic => searchableText.includes(topic.toLowerCase()));
  });

  // If no matches found, return some sample books
  return filteredEbooks.length > 0 ? filteredEbooks : mockEbooks.slice(0, 3);
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
