import { SearchBar } from './SearchBar';
import { MebooksLogo } from './MebooksLogo';

interface HeroProps {
  onSearch: (query: string) => Promise<void>;
  isSearching: boolean;
}

export const Hero = ({ onSearch, isSearching }: HeroProps) => {
  const searchExamples = [
    'machine learning fundamentals',
    'tensorflow tutorials', 
    'neural networks',
    'data science python'
  ];

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
            AI-Powered Ebook Marketplace
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto">
          Discover curated AI knowledge from industry experts. Only{' '}
          <span className="text-ai-amber font-bold">$0.25</span> platform fee per purchase.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={onSearch} isLoading={isSearching} />
        </div>

        {/* Search Examples */}
        <div className="max-w-2xl mx-auto">
          <p className="text-text-muted text-sm mb-4">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {searchExamples.map((example) => (
              <button
                key={example}
                onClick={() => handleExampleSearch(example)}
                className="px-3 py-1 bg-neural-secondary border border-neural-tertiary rounded-full text-text-secondary text-sm hover:border-ai-teal hover:text-ai-teal transition-colors"
              >
                {example.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
