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

      {/* Hero Title */}
      <div className="text-center mb-8 mt-12">
        <h1 className="text-2xl md:text-3xl font-bold">
          <span 
            className="bg-gradient-to-r from-ai-teal via-ai-blue to-ai-purple bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(to right, #00d4aa, #0ea5e9, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Upskill with AI-Powered Knowledge
          </span>
        </h1>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={onSearch} isLoading={isSearching} />
        </div>

        {/* Search Examples */}
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-text-muted text-sm mb-4">e.g., "How do I build an AI startup?" or "master product design"</p>
        </div>


      </div>
    </div>
  );
};
