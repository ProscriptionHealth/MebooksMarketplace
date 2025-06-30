import { useState, FormEvent } from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { Loader } from './Loader';

interface SearchBarProps {
  onSearch: (query: string) => Promise<void>;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await onSearch(query.trim());
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <textarea 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for AI ebooks, topics, or frameworks..."
        className="w-full px-6 py-4 pr-12 bg-neural-secondary border border-neural-tertiary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-ai-teal focus:ring-2 focus:ring-ai-teal/20 transition-all resize-none"
        style={{
          backgroundColor: '#1a1a3e',
          borderColor: '#16213e',
          color: '#ffffff',
          height: '80px'
        }}
        rows={3}
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
          }
        }}
      />
      <button 
        type="submit" 
        disabled={isLoading || !query.trim()}
        className="absolute right-3 top-4 text-ai-teal hover:text-ai-blue transition-colors disabled:opacity-50"
        style={{color: '#00d4aa'}}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <SearchIcon className="w-6 h-6" />
        )}
      </button>
    </form>
  );
};
