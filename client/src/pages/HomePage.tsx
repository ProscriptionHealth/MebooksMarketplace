import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { EbookList } from '@/components/EbookList';
import { analyzeSearchQuery, findEbooksByTopics } from '@/services/geminiService';
import { Ebook, GeminiSearchResponse } from '@/types';

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<Ebook[]>([]);
  const [geminiResponse, setGeminiResponse] = useState<GeminiSearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      // Analyze query with Gemini AI
      const response = await analyzeSearchQuery(query);
      setGeminiResponse(response);

      // Find ebooks based on topics
      const ebooks = await findEbooksByTopics(response.ebook_topics);
      setSearchResults(ebooks);
      setHasSearched(true);

      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('search-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      setGeminiResponse({
        search_summary: 'Search failed. Please try again.',
        ebook_topics: [],
        is_bundle_suggestion: false
      });
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <Hero onSearch={handleSearch} isSearching={isSearching} />
      
      {/* Search Results Section */}
      {hasSearched && (
        <div id="search-results" className="mt-16">
          <EbookList ebooks={searchResults} geminiResponse={geminiResponse} />
        </div>
      )}
    </div>
  );
}
