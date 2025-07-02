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
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-12">
        <MebooksLogo />
      </div>

      {/* Hero Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">
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

      {/* Search Section */}
      <div className="w-full max-w-3xl mx-auto text-center">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={onSearch} isLoading={isSearching} />
        </div>

        {/* Search Examples */}
        <p className="text-text-muted text-sm">
          e.g., "How do I build an AI startup?" or "master product design"
        </p>
      </div>
    </div>
  );
};
