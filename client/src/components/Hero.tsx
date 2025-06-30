import { SearchBar } from './SearchBar';
import { MebooksLogo } from './MebooksLogo';

interface HeroProps {
  onSearch: (query: string) => Promise<void>;
  isSearching: boolean;
}

export const Hero = ({ onSearch, isSearching }: HeroProps) => {
  const handleExampleSearch = (query: string) => {
    onSearch(query);
  };

  return (
    <div>
      <MebooksLogo />

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-ai-teal via-ai-blue to-ai-purple bg-clip-text text-transparent">
            Upskill with AI-Powered Knowledge
          </span>
        </h1>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={onSearch} isLoading={isSearching} />
        </div>

        {/* Search Examples */}
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-text-muted text-sm mb-4">e.g., "How do I build an AI startup?" or "master product design"</p>
        </div>

        {/* Description */}
        <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto">
          Go from idea to expert with curated ebooks on AI, Product, and Engineering. 
          Find exactly what you need with our intelligent search.
        </p>
      </div>
    </div>
  );
};
