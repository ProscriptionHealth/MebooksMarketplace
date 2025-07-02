import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { EbookList } from '@/components/EbookList';
import { performEnhancedSearch } from '@/services/geminiService';
import { Ebook, GeminiSearchResponse } from '@/types';

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<Ebook[]>([]);
  const [geminiResponse, setGeminiResponse] = useState<GeminiSearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      // Use enhanced search which combines Gemini analysis with vector search
      const { geminiResponse, ebooks } = await performEnhancedSearch(query);
      setGeminiResponse(geminiResponse);
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
    <div>
      <div className="container mx-auto px-4 md:px-8" style={{minHeight: 'calc(100vh - 180px)'}}>
        <div className="flex flex-col justify-center" style={{minHeight: 'calc(100vh - 280px)'}}>
          <Hero onSearch={handleSearch} isSearching={isSearching} />
        </div>
      </div>
      
      {/* Search Results Section */}
      {hasSearched && (
        <div id="search-results" className="container mx-auto px-4 md:px-8 mt-16">
          <EbookList ebooks={searchResults} geminiResponse={geminiResponse} />
        </div>
      )}
    </div>
  );
}
