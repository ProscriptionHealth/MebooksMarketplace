
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GeminiSearchResponse, Ebook } from '../types';
import { ALL_EBOOKS } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = "gemini-2.5-flash-preview-04-17";

export async function analyzeSearchQuery(query: string): Promise<GeminiSearchResponse> {
  const prompt = `
    You are an intelligent assistant for "Mebooks.ai", an AI-focused ebook marketplace.
    A user is searching for ebooks with the query: "${query}".
    Analyze their intent and suggest what they are looking for. Your goal is to help them find the right books to upskill.

    Based on the query, return a JSON object with the following structure:
    {
      "search_summary": "A short, encouraging rephrasing of what the user is looking for. For example: 'Building your skills in AI-powered product creation.'",
      "ebook_topics": ["A list of relevant topics like 'AI Agents', 'Product Management', 'Tech AI Startups', 'Product Design', 'Tech Platforms', 'LLM', 'UX/UI', 'Data Science', 'Beginner', 'Advanced'. Choose up to 3 most relevant topics."],
      "is_bundle_suggestion": A boolean indicating if this query is a good candidate for a bundled collection of books. For example, a broad query like 'learn AI from scratch' is a good candidate.",
      "bundle_name": "If is_bundle_suggestion is true, suggest a cool, marketable name for the bundle. e.g., 'AI Zero-to-Hero Pack'. Otherwise, this should be an empty string."
    }

    Only return the raw JSON object. Do not wrap it in markdown.
  `;
  
  try {
     const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }

    return JSON.parse(jsonStr) as GeminiSearchResponse;
  } catch(e) {
      console.error("Failed to parse Gemini response:", e);
      throw new Error("Could not understand the search query. Please try rephrasing.");
  }
}

// Mock function to simulate fetching ebooks from a database based on topics
export function findEbooksByTopics(topics: string[]): Ebook[] {
  if (!topics || topics.length === 0) {
    return [];
  }

  const lowerCaseTopics = topics.map(t => t.toLowerCase());

  const results = ALL_EBOOKS.filter(ebook => {
    const ebookContent = `${ebook.title} ${ebook.category} ${ebook.description} ${ebook.frameworkTags.join(' ')} ${ebook.complexity}`.toLowerCase();
    return lowerCaseTopics.some(topic => ebookContent.includes(topic));
  });

  // A simple shuffle to make results seem more dynamic
  return results.sort(() => 0.5 - Math.random());
}
