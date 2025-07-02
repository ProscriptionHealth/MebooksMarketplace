
import React, { useState } from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { Loader } from './Loader';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe what you want to learn..."
        className="w-full pl-5 pr-20 py-4 bg-neural-secondary border border-neural-tertiary rounded-full text-text-primary placeholder-text-muted focus:ring-2 focus:ring-ai-purple focus:border-ai-purple focus:outline-none transition-all duration-300"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center justify-center w-16 h-full text-ai-teal hover:text-ai-blue disabled:text-text-muted transition-colors"
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : <SearchIcon className="w-6 h-6" />}
      </button>
    </form>
  );
};
