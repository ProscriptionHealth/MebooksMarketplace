import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleDropdownEnter = (dropdownName: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(dropdownName);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // 200ms delay before closing
    setDropdownTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  return (
    <header className="sticky top-0 z-50 bg-neural-bg/90 backdrop-blur-md border-b border-neural-tertiary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer" onClick={closeMobileMenu}>
            <div style={{color: '#00d4aa'}}>
              <BookOpenIcon className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold">
              <span style={{color: '#00d4aa'}}>m</span>
              <span style={{color: '#f59e0b'}}>ebooks</span>
              <span style={{color: '#ec4899'}}>.ai</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('about')}
              onMouseLeave={handleDropdownLeave}
            >
              <button 
                className="flex items-center space-x-1 text-text-secondary hover:text-ai-teal transition-colors py-2 px-1"
                onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
              >
                <span>About</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'about' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-56 bg-neural-secondary/95 backdrop-blur-sm border border-neural-tertiary rounded-lg shadow-xl z-50"
                  onMouseEnter={() => handleDropdownEnter('about')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="py-2">
                    <Link 
                      href="/about/why-we-do" 
                      className="block px-6 py-3 text-sm text-text-secondary hover:text-ai-teal hover:bg-neural-tertiary/50 transition-all duration-200 cursor-pointer"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="flex items-center">
                        <span className="font-medium">Why We Do</span>
                      </div>
                      <span className="text-xs text-text-muted mt-1 block">Our mission and purpose</span>
                    </Link>
                    <Link 
                      href="/about/what-we-do" 
                      className="block px-6 py-3 text-sm text-text-secondary hover:text-ai-teal hover:bg-neural-tertiary/50 transition-all duration-200 cursor-pointer"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="flex items-center">
                        <span className="font-medium">What We Do</span>
                      </div>
                      <span className="text-xs text-text-muted mt-1 block">Our services and offerings</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Authors Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('authors')}
              onMouseLeave={handleDropdownLeave}
            >
              <button 
                className="flex items-center space-x-1 text-text-secondary hover:text-ai-teal transition-colors py-2 px-1"
                onClick={() => setActiveDropdown(activeDropdown === 'authors' ? null : 'authors')}
              >
                <span>Authors</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'authors' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'authors' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-56 bg-neural-secondary/95 backdrop-blur-sm border border-neural-tertiary rounded-lg shadow-xl z-50"
                  onMouseEnter={() => handleDropdownEnter('authors')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="py-2">
                    <Link 
                      href="/authors/sell-ebooks" 
                      className="block px-6 py-3 text-sm text-text-secondary hover:text-ai-teal hover:bg-neural-tertiary/50 transition-all duration-200 cursor-pointer"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="flex items-center">
                        <span className="font-medium">Sell Ebooks</span>
                      </div>
                      <span className="text-xs text-text-muted mt-1 block">Start earning from your expertise</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* How It Works Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('howItWorks')}
              onMouseLeave={handleDropdownLeave}
            >
              <button 
                className="flex items-center space-x-1 text-text-secondary hover:text-ai-teal transition-colors py-2 px-1"
                onClick={() => setActiveDropdown(activeDropdown === 'howItWorks' ? null : 'howItWorks')}
              >
                <span>How It Works</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'howItWorks' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'howItWorks' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-56 bg-neural-secondary/95 backdrop-blur-sm border border-neural-tertiary rounded-lg shadow-xl z-50"
                  onMouseEnter={() => handleDropdownEnter('howItWorks')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="py-2">
                    <Link 
                      href="/how-it-works/authors" 
                      className="block px-6 py-3 text-sm text-text-secondary hover:text-ai-teal hover:bg-neural-tertiary/50 transition-all duration-200 cursor-pointer"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="flex items-center">
                        <span className="font-medium">Authors</span>
                      </div>
                      <span className="text-xs text-text-muted mt-1 block">Publishing process explained</span>
                    </Link>
                    <Link 
                      href="/how-it-works/seekers" 
                      className="block px-6 py-3 text-sm text-text-secondary hover:text-ai-teal hover:bg-neural-tertiary/50 transition-all duration-200 cursor-pointer"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="flex items-center">
                        <span className="font-medium">Seekers</span>
                      </div>
                      <span className="text-xs text-text-muted mt-1 block">Finding and learning process</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Seekers Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('seekers')}
              onMouseLeave={handleDropdownLeave}
            >
              <button 
                className="flex items-center space-x-1 text-text-secondary hover:text-ai-teal transition-colors py-2 px-1"
                onClick={() => setActiveDropdown(activeDropdown === 'seekers' ? null : 'seekers')}
              >
                <span>Seekers</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'seekers' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'seekers' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-56 bg-neural-secondary/95 backdrop-blur-sm border border-neural-tertiary rounded-lg shadow-xl z-50"
                  onMouseEnter={() => handleDropdownEnter('seekers')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="py-2">
                    <Link 
                      href="/seekers/upskill" 
                      className="block px-6 py-3 text-sm text-text-secondary hover:text-ai-teal hover:bg-neural-tertiary/50 transition-all duration-200 cursor-pointer"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="flex items-center">
                        <span className="font-medium">UpSkill</span>
                      </div>
                      <span className="text-xs text-text-muted mt-1 block">Advance your career with curated learning</span>
                    </Link>
                    <Link 
                      href="/seekers/search" 
                      className="block px-6 py-3 text-sm text-text-secondary hover:text-ai-teal hover:bg-neural-tertiary/50 transition-all duration-200 cursor-pointer"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="flex items-center">
                        <span className="font-medium">Search</span>
                      </div>
                      <span className="text-xs text-text-muted mt-1 block">AI-powered knowledge discovery</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Sign In Button */}
          <button className="bg-ai-teal text-neural-bg px-4 py-2 rounded-lg font-semibold hover:bg-ai-teal/90 transition-colors">
            Sign In
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-text-secondary ml-4"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neural-secondary border-t border-neural-tertiary">
          <div className="px-4 py-2 space-y-2">
            <div className="py-2">
              <h3 className="text-sm font-semibold text-ai-teal mb-2">About</h3>
              <Link 
                href="/about/why-we-do" 
                className="block py-1 pl-4 text-text-secondary hover:text-ai-teal"
                onClick={closeMobileMenu}
              >
                Why We Do
              </Link>
              <Link 
                href="/about/what-we-do" 
                className="block py-1 pl-4 text-text-secondary hover:text-ai-teal"
                onClick={closeMobileMenu}
              >
                What We Do
              </Link>
            </div>
            
            <div className="py-2">
              <h3 className="text-sm font-semibold text-ai-teal mb-2">Authors</h3>
              <Link 
                href="/authors/sell-ebooks" 
                className="block py-1 pl-4 text-text-secondary hover:text-ai-teal"
                onClick={closeMobileMenu}
              >
                Sell Ebooks
              </Link>
            </div>
            
            <div className="py-2">
              <h3 className="text-sm font-semibold text-ai-teal mb-2">How It Works</h3>
              <Link 
                href="/how-it-works/authors" 
                className="block py-1 pl-4 text-text-secondary hover:text-ai-teal"
                onClick={closeMobileMenu}
              >
                Authors
              </Link>
              <Link 
                href="/how-it-works/seekers" 
                className="block py-1 pl-4 text-text-secondary hover:text-ai-teal"
                onClick={closeMobileMenu}
              >
                Seekers
              </Link>
            </div>
            
            <div className="py-2">
              <h3 className="text-sm font-semibold text-ai-teal mb-2">Seekers</h3>
              <Link 
                href="/seekers/upskill" 
                className="block py-1 pl-4 text-text-secondary hover:text-ai-teal"
                onClick={closeMobileMenu}
              >
                UpSkill
              </Link>
              <Link 
                href="/seekers/search" 
                className="block py-1 pl-4 text-text-secondary hover:text-ai-teal"
                onClick={closeMobileMenu}
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};