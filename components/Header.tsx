import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface HeaderProps {
    onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };
    
  return (
    <header className="sticky top-0 z-50 bg-neural-bg/80 backdrop-blur-sm border-b border-neural-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center gap-2 text-xl font-bold text-text-primary hover:text-ai-teal transition-colors">
              <BookOpenIcon className="h-6 w-6 text-ai-teal" />
              Mebooks.ai
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group py-4 -my-4">
              <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors">
                About
                <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-neural-secondary rounded-md shadow-lg pt-4 pb-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
                <a href="/about/why-we-do" onClick={(e) => handleNavClick(e, '/about/why-we-do')} className="block px-4 py-2 text-sm text-text-secondary hover:bg-neural-tertiary hover:text-text-primary rounded-md">Why We Do It</a>
                <a href="/about/what-we-do" onClick={(e) => handleNavClick(e, '/about/what-we-do')} className="block px-4 py-2 text-sm text-text-secondary hover:bg-neural-tertiary hover:text-text-primary rounded-md">What We Do</a>
                <a href="/about/how-we-do" onClick={(e) => handleNavClick(e, '/about/how-we-do')} className="block px-4 py-2 text-sm text-text-secondary hover:bg-neural-tertiary hover:text-text-primary rounded-md">How We Do It</a>
              </div>
            </div>
            <a href="/how-it-works" onClick={(e) => handleNavClick(e, '/how-it-works')} className="text-text-secondary hover:text-text-primary transition-colors">How It Works</a>
            <a href="/authors" onClick={(e) => handleNavClick(e, '/authors')} className="text-text-secondary hover:text-text-primary transition-colors">Authors</a>
            <a href="/seekers" onClick={(e) => handleNavClick(e, '/seekers')} className="text-text-secondary hover:text-text-primary transition-colors">Seekers</a>
          </nav>
          <div className="flex items-center">
            <a href="#" className="bg-ai-teal text-neural-bg font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};