import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

export const Header = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-neural-bg/90 backdrop-blur-md border-b border-neural-tertiary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer" onClick={closeMobileMenu}>
            <BookOpenIcon className="w-8 h-8 text-ai-teal" />
            <span className="text-xl font-bold">
              <span className="text-ai-teal">me</span>
              <span className="text-text-primary">books</span>
              <span className="text-ai-blue">.ai</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsAboutDropdownOpen(true)}
              onMouseLeave={() => setIsAboutDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-text-secondary hover:text-ai-teal transition-colors">
                <span>About</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {isAboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-neural-secondary border border-neural-tertiary rounded-lg shadow-lg">
                  <Link 
                    href="/about/why-we-do" 
                    className="block px-4 py-2 text-text-secondary hover:text-ai-teal hover:bg-neural-tertiary transition-colors"
                  >
                    Why We Do
                  </Link>
                  <Link 
                    href="/about/what-we-do" 
                    className="block px-4 py-2 text-text-secondary hover:text-ai-teal hover:bg-neural-tertiary transition-colors"
                  >
                    What We Do
                  </Link>
                  <Link 
                    href="/about/how-we-do" 
                    className="block px-4 py-2 text-text-secondary hover:text-ai-teal hover:bg-neural-tertiary transition-colors"
                  >
                    How We Do
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/how-it-works" 
              className="text-text-secondary hover:text-ai-teal transition-colors"
            >
              How It Works
            </Link>
            <Link 
              href="/authors" 
              className="text-text-secondary hover:text-ai-teal transition-colors"
            >
              Authors
            </Link>
            <Link 
              href="/seekers" 
              className="text-text-secondary hover:text-ai-teal transition-colors"
            >
              Seekers
            </Link>
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
            <Link 
              href="/about/why-we-do" 
              className="block py-2 text-text-secondary hover:text-ai-teal"
              onClick={closeMobileMenu}
            >
              About - Why We Do
            </Link>
            <Link 
              href="/about/what-we-do" 
              className="block py-2 text-text-secondary hover:text-ai-teal"
              onClick={closeMobileMenu}
            >
              About - What We Do
            </Link>
            <Link 
              href="/about/how-we-do" 
              className="block py-2 text-text-secondary hover:text-ai-teal"
              onClick={closeMobileMenu}
            >
              About - How We Do
            </Link>
            <Link 
              href="/how-it-works" 
              className="block py-2 text-text-secondary hover:text-ai-teal"
              onClick={closeMobileMenu}
            >
              How It Works
            </Link>
            <Link 
              href="/authors" 
              className="block py-2 text-text-secondary hover:text-ai-teal"
              onClick={closeMobileMenu}
            >
              Authors
            </Link>
            <Link 
              href="/seekers" 
              className="block py-2 text-text-secondary hover:text-ai-teal"
              onClick={closeMobileMenu}
            >
              Seekers
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
