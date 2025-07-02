
import React from 'react';
import { SearchBar } from './SearchBar';

interface HeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, isLoading }) => {
  return (
    <div className="text-center py-16 md:py-24">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-ai-teal via-ai-blue to-ai-purple">
        Upskill with AI-Powered Knowledge
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-text-secondary">
        Go from idea to expert with curated ebooks on AI, Product, and Engineering. 
        Find exactly what you need with our intelligent search.
      </p>
      <div className="mt-8 max-w-xl mx-auto">
        <SearchBar onSearch={onSearch} isLoading={isLoading} />
      </div>
       <p className="mt-4 text-sm text-text-muted">
        e.g., "How do I build an AI startup?" or "master product design"
      </p>
    </div>
  );
};
