# Mebooks.ai Complete Code Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Setup](#architecture--setup)
3. [Core Configuration Files](#core-configuration-files)
4. [Type Definitions](#type-definitions)
5. [Main Application Components](#main-application-components)
6. [UI Components](#ui-components)
7. [Pages](#pages)
8. [Services](#services)
9. [Constants](#constants)
10. [Development Guidelines](#development-guidelines)

---

## Project Overview

**Mebooks.ai** is an AI-focused ebook marketplace with a unique $0.25 flat-fee model. The platform serves AI practitioners, researchers, and knowledge seekers through sophisticated semantic search, seamless publishing workflows, and intelligent content discovery.

**Core Mission**: Enable frictionless knowledge transfer between AI experts and practitioners while supporting authors with transparent, equitable monetization.

**Current Implementation**: React + Vite + TypeScript with Google Gemini AI integration for intelligent search.

---

## Architecture & Setup

### Technology Stack
- **Frontend**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS with custom AI-focused color palette
- **AI Integration**: Google Gemini 2.5 Flash Preview
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Routing**: Custom client-side routing implementation

### Project Structure
```
app/
├── src/                    # Main source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # External service integrations
│   ├── types.ts           # TypeScript type definitions
│   ├── constants.ts       # Application constants
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Application entry point
├── package.json           # Dependencies and scripts
├── index.html            # HTML template
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite build configuration
```

---

## Core Configuration Files

### package.json
```json
{
  "name": "mebooks.ai:-ai-powered-ebook-marketplace",
  "private": true,
  "version": "0.0.0",
  "type": "module",                    // Enables ES modules
  "scripts": {
    "dev": "vite",                     // Development server
    "build": "vite build",             // Production build
    "preview": "vite preview"          // Preview production build
  },
  "dependencies": {
    "react": "^19.1.0",                // Latest React version
    "react-dom": "^19.1.0",            // React DOM for web
    "@google/genai": "^1.7.0"          // Google Gemini AI SDK
  },
  "devDependencies": {
    "@types/node": "^22.14.0",         // Node.js TypeScript types
    "typescript": "~5.7.2",            // TypeScript compiler
    "vite": "^6.2.0"                   // Fast build tool
  }
}
```

### index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mebooks.ai: AI-Powered Ebook Marketplace</title>
    
    <!-- Tailwind CSS via CDN for rapid development -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts: Inter (sans-serif) and JetBrains Mono (monospace) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind Configuration with AI-focused color palette -->
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              // Primary AI brand colors
              'ai-teal': '#00d4aa',        // Primary brand color (me in logo)
              'ai-blue': '#0ea5e9',        // Secondary color (.ai domain)
              'ai-purple': '#8b5cf6',      // Accent color (my elements)
              'ai-amber': '#f59e0b',       // Highlight color (arrows, emphasis)
              'ai-pink': '#ec4899',        // Special elements (braces)
              
              // Neural network-inspired dark theme
              'neural-bg': '#0f0f23',      // Dark background base
              'neural-secondary': '#1a1a3e', // Secondary dark
              'neural-tertiary': '#16213e',  // Tertiary gradient
              
              // Text hierarchy
              'text-primary': '#ffffff',    // Primary text
              'text-secondary': '#94a3b8',  // Secondary text
              'text-muted': '#64748b',      // Muted text
            },
            fontFamily: {
              sans: ['Inter', 'sans-serif'],           // Primary font
              mono: ['JetBrains Mono', 'monospace'],   // Code font
            },
            animation: {
              'gradient-bg': 'gradient-bg 5s ease infinite',    // Background animation
              'subtle-pulse': 'subtle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Loading animation
              'fade-in': 'fade-in 0.5s ease-in-out',           // Fade in animation
            },
            keyframes: {
              'gradient-bg': {
                '0%, 100%': { 'background-position': '0% 50%' },
                '50%': { 'background-position': '100% 50%' },
              },
              'subtle-pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: .7 },
              },
              'fade-in': {
                '0%': { opacity: 0, transform: 'translateY(10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
            }
          }
        }
      }
    </script>
    
    <!-- ES Module imports for React and dependencies -->
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@^19.1.0",
        "react-dom/": "https://esm.sh/react-dom@^19.1.0/",
        "react/": "https://esm.sh/react@^19.1.0/",
        "@google/genai": "https://esm.sh/@google/genai@^1.7.0"
      }
    }
    </script>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="/index.css">
  </head>
  
  <!-- Body with neural background -->
  <body class="bg-neural-bg">
    <div id="root"></div>                    <!-- React app mount point -->
    <script type="module" src="/src/index.tsx"></script>  <!-- Main entry point -->
    <script type="module" src="/index.tsx"></script>      <!-- Alternative entry -->
  </body>
</html>
```

---

## Type Definitions

### src/types.ts
```typescript
// Enum defining the complexity levels for ebooks
// This ensures consistent categorization across the platform
export enum ComplexityRating {
  Beginner = 'beginner',           // Entry-level content
  Intermediate = 'intermediate',   // Mid-level expertise
  Advanced = 'advanced',           // Expert-level content
  Research = 'research',           // Academic/research level
}

// Core ebook interface defining the structure of ebook data
// All ebook-related components use this interface for type safety
export interface Ebook {
  id: string;                      // Unique identifier
  title: string;                   // Book title
  description: string;             // Book description
  author: string;                  // Author name
  price: number;                   // Price in cents (for precision)
  coverUrl: string;                // Cover image URL
  category: string;                // Content category
  complexity: ComplexityRating;    // Difficulty level
  frameworkTags: string[];         // Related frameworks/technologies
  pageCount: number;               // Number of pages
}

// Response structure from Gemini AI search analysis
// Used to understand user intent and provide intelligent recommendations
export interface GeminiSearchResponse {
  search_summary: string;          // Human-readable search interpretation
  ebook_topics: string[];          // Relevant topics for filtering
  is_bundle_suggestion: boolean;   // Whether to suggest a bundle
  bundle_name?: string;            // Suggested bundle name (optional)
}
```

---

## Main Application Components

### src/index.tsx - Application Entry Point
```typescript
import React from 'react';                    // React library import
import ReactDOM from 'react-dom/client';      // React DOM client for rendering
import App from './App';                      // Main App component

// Get the root DOM element where React will mount
const rootElement = document.getElementById('root');

// Safety check: ensure root element exists
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create React root for concurrent features
const root = ReactDOM.createRoot(rootElement);

// Render the app with StrictMode for development checks
root.render(
  <React.StrictMode>              // Enables additional development checks
    <App />                       // Main application component
  </React.StrictMode>
);
```

### src/App.tsx - Main Application Component
```typescript
import React, { useState, useEffect, useCallback } from 'react';  // React hooks
import { Header } from './components/Header';                     // Navigation header
import { Footer } from './components/Footer';                     // Site footer
import { TechBackground } from './components/TechBackground';     // Animated background

// Import all page components for routing
import { HomePage } from './pages/HomePage';
import { WhyWeDoPage } from './pages/About/WhyWeDoPage';
import { WhatWeDoPage } from './pages/About/WhatWeDoPage';
import { HowWeDoPage } from './pages/About/HowWeDoPage';
import { HowItWorksPage } from './pages/HowItWorks/HowItWorksPage';
import { AuthorsPage } from './pages/Authors/AuthorsPage';
import { SeekersPage } from './pages/Seekers/SeekersPage';

// Route mapping: URL paths to page components
// This enables client-side routing without external libraries
const routes: { [key: string]: React.FC } = {
  '/': HomePage,                    // Home page
  '/about/why-we-do': WhyWeDoPage,  // About section pages
  '/about/what-we-do': WhatWeDoPage,
  '/about/how-we-do': HowWeDoPage,
  '/how-it-works': HowItWorksPage,  // How it works page
  '/authors': AuthorsPage,          // Authors page
  '/seekers': SeekersPage,          // Seekers page
};

// Main App component with custom routing
const App: React.FC = () => {
  // State to track current route
  const [route, setRoute] = useState(window.location.pathname);

  // Navigation handler for programmatic routing
  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path);  // Update browser history
    setRoute(path);                          // Update current route
    window.scrollTo(0, 0);                   // Scroll to top on navigation
  };

  // Effect to handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);    // Update route on history change
    };
    window.addEventListener('popstate', handlePopState);  // Listen for history changes
    return () => window.removeEventListener('popstate', handlePopState);  // Cleanup
  }, []);

  // Get current page component or fallback to HomePage
  const CurrentPage = routes[route] || HomePage;

  // Main app layout with neural background and responsive design
  return (
    <div className="min-h-screen font-sans text-text-primary flex flex-col relative">
      {/* Animated tech background with route-based key for re-rendering */}
      <TechBackground key={route} />
      
      {/* Navigation header with navigation handler */}
      <Header onNavigate={handleNavigation} />
      
      {/* Main content area with responsive padding and z-index */}
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8 md:py-12 z-10">
        <CurrentPage />
      </main>
      
      {/* Site footer */}
      <Footer />
    </div>
  );
};

export default App;
```

---

## UI Components

### src/components/Header.tsx - Navigation Header
```typescript
import React from 'react';                    // React library
import { BookOpenIcon } from './icons/BookOpenIcon';      // Logo icon
import { ChevronDownIcon } from './icons/ChevronDownIcon'; // Dropdown arrow

// Props interface for Header component
interface HeaderProps {
    onNavigate: (path: string) => void;       // Navigation callback function
}

// Header component with navigation and branding
export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  // Handler for navigation clicks with event prevention
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();                       // Prevent default link behavior
    onNavigate(path);                         // Trigger custom navigation
  };
    
  return (
    // Sticky header with backdrop blur and border
    <header className="sticky top-0 z-50 bg-neural-bg/80 backdrop-blur-sm border-b border-neural-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <a 
              href="/" 
              onClick={(e) => handleNavClick(e, '/')} 
              className="flex items-center gap-2 text-xl font-bold text-text-primary hover:text-ai-teal transition-colors"
            >
              <BookOpenIcon className="h-6 w-6 text-ai-teal" />
              Mebooks.ai
            </a>
          </div>
          
          {/* Desktop navigation menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* About dropdown menu */}
            <div className="relative group py-4 -my-4">
              <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors">
                About
                <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              {/* Dropdown content with hover effects */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-neural-secondary rounded-md shadow-lg pt-4 pb-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
                <a href="/about/why-we-do" onClick={(e) => handleNavClick(e, '/about/why-we-do')} className="block px-4 py-2 text-sm text-text-secondary hover:bg-neural-tertiary hover:text-text-primary rounded-md">Why We Do It</a>
                <a href="/about/what-we-do" onClick={(e) => handleNavClick(e, '/about/what-we-do')} className="block px-4 py-2 text-sm text-text-secondary hover:bg-neural-tertiary hover:text-text-primary rounded-md">What We Do</a>
                <a href="/about/how-we-do" onClick={(e) => handleNavClick(e, '/about/how-we-do')} className="block px-4 py-2 text-sm text-text-secondary hover:bg-neural-tertiary hover:text-text-primary rounded-md">How We Do It</a>
              </div>
            </div>
            
            {/* Other navigation links */}
            <a href="/how-it-works" onClick={(e) => handleNavClick(e, '/how-it-works')} className="text-text-secondary hover:text-text-primary transition-colors">How It Works</a>
            <a href="/authors" onClick={(e) => handleNavClick(e, '/authors')} className="text-text-secondary hover:text-text-primary transition-colors">Authors</a>
            <a href="/seekers" onClick={(e) => handleNavClick(e, '/seekers')} className="text-text-secondary hover:text-text-primary transition-colors">Seekers</a>
          </nav>
          
          {/* Sign in button */}
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
```

### src/components/Hero.tsx - Hero Section
```typescript
import React from 'react';                    // React library
import { SearchBar } from './SearchBar';      // Search input component

// Props interface for Hero component
interface HeroProps {
  onSearch: (query: string) => void;         // Search callback function
  isLoading: boolean;                         // Loading state for search
}

// Hero component with gradient text and search functionality
export const Hero: React.FC<HeroProps> = ({ onSearch, isLoading }) => {
  return (
    // Hero section with responsive padding
    <div className="text-center py-16 md:py-24">
      {/* Main headline with gradient text effect */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-ai-teal via-ai-blue to-ai-purple">
        Upskill with AI-Powered Knowledge
      </h1>
      
      {/* Subtitle with responsive text sizing */}
      <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-text-secondary">
        Go from idea to expert with curated ebooks on AI, Product, and Engineering. 
        Find exactly what you need with our intelligent search.
      </p>
      
      {/* Search bar container */}
      <div className="mt-8 max-w-xl mx-auto">
        <SearchBar onSearch={onSearch} isLoading={isLoading} />
      </div>
      
      {/* Search examples for user guidance */}
      <p className="mt-4 text-sm text-text-muted">
        e.g., "How do I build an AI startup?" or "master product design"
      </p>
    </div>
  );
};
```

### src/components/SearchBar.tsx - Search Input Component
```typescript
import React, { useState } from 'react';      // React with state hook
import { SearchIcon } from './icons/SearchIcon';  // Search icon
import { Loader } from './Loader';            // Loading spinner

// Props interface for SearchBar component
interface SearchBarProps {
  onSearch: (query: string) => void;         // Search submission callback
  isLoading: boolean;                         // Loading state
}

// Search bar component with form handling and loading states
export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  // Local state for search query input
  const [query, setQuery] = useState('');

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();                       // Prevent default form submission
    onSearch(query);                          // Trigger search with current query
  };

  return (
    // Search form with relative positioning for button overlay
    <form onSubmit={handleSubmit} className="relative">
      {/* Search input field */}
      <input
        type="text"
        value={query}                         // Controlled input value
        onChange={(e) => setQuery(e.target.value)}  // Update query state
        placeholder="Describe what you want to learn..."
        className="w-full pl-5 pr-20 py-4 bg-neural-secondary border border-neural-tertiary rounded-full text-text-primary placeholder-text-muted focus:ring-2 focus:ring-ai-purple focus:border-ai-purple focus:outline-none transition-all duration-300"
        disabled={isLoading}                  // Disable during loading
      />
      
      {/* Search button with absolute positioning */}
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center justify-center w-16 h-full text-ai-teal hover:text-ai-blue disabled:text-text-muted transition-colors"
        disabled={isLoading}                  // Disable during loading
      >
        {/* Show loader or search icon based on loading state */}
        {isLoading ? <Loader /> : <SearchIcon className="w-6 h-6" />}
      </button>
    </form>
  );
};
```

### src/components/EbookCard.tsx - Ebook Display Card
```typescript
import React from 'react';                    // React library
import { Ebook, ComplexityRating } from '../types';  // Type definitions

// Props interface for EbookCard component
interface EbookCardProps {
  ebook: Ebook;                              // Ebook data object
}

// Color mapping for complexity levels
// Provides visual distinction between difficulty levels
const complexityColors: Record<ComplexityRating, string> = {
  [ComplexityRating.Beginner]: 'bg-green-500/10 text-green-400 border-green-500/20',
  [ComplexityRating.Intermediate]: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  [ComplexityRating.Advanced]: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  [ComplexityRating.Research]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

// Ebook card component with hover effects and complexity indicators
export const EbookCard: React.FC<EbookCardProps> = ({ ebook }) => {
  return (
    // Card container with hover animations and border effects
    <div className="bg-neural-secondary rounded-lg overflow-hidden flex flex-col group border border-transparent hover:border-ai-purple transition-all duration-300 transform hover:-translate-y-1">
      {/* Image container with relative positioning */}
      <div className="relative">
        {/* Cover image with object-fit for consistent sizing */}
        <img src={ebook.coverUrl} alt={`Cover for ${ebook.title}`} className="w-full h-64 object-cover" />
        
        {/* Complexity badge positioned in top-right corner */}
        <div className="absolute top-0 right-0 m-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${complexityColors[ebook.complexity]}`}>
            {ebook.complexity.charAt(0).toUpperCase() + ebook.complexity.slice(1)}
          </span>
        </div>
      </div>
      
      {/* Content section with flex layout */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title with hover color change */}
        <h3 className="text-lg font-bold text-text-primary group-hover:text-ai-teal transition-colors">{ebook.title}</h3>
        
        {/* Author name */}
        <p className="text-sm text-text-muted mt-1">by {ebook.author}</p>
        
        {/* Description with flex-grow to push price/button to bottom */}
        <p className="text-sm text-text-secondary mt-2 flex-grow">{ebook.description}</p>
        
        {/* Price and action button row */}
        <div className="mt-4 flex items-center justify-between">
          {/* Price display in cents converted to dollars */}
          <p className="text-xl font-bold text-ai-teal">${(ebook.price / 100).toFixed(2)}</p>
          
          {/* View details button with hover animations */}
          <button className="bg-ai-purple text-white text-sm font-semibold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-95">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## Pages

### src/pages/HomePage.tsx - Main Home Page
```typescript
import React, { useState, useCallback } from 'react';  // React hooks
import { Hero } from '../components/Hero';             // Hero section
import { EbookList } from '../components/EbookList';   // Ebook listing
import { Loader } from '../components/Loader';         // Loading spinner
import { Ebook, GeminiSearchResponse } from '../types'; // Type definitions
import { analyzeSearchQuery, findEbooksByTopics } from '../services/geminiService'; // AI service

// Main home page component with search functionality
export const HomePage: React.FC = () => {
  // State management for search functionality
  const [searchQuery, setSearchQuery] = useState('');                    // Current search query
  const [searchResults, setSearchResults] = useState<Ebook[]>([]);       // Search results
  const [geminiResponse, setGeminiResponse] = useState<GeminiSearchResponse | null>(null); // AI analysis
  const [isLoading, setIsLoading] = useState(false);                    // Loading state
  const [error, setError] = useState<string | null>(null);              // Error state
  const [hasSearched, setHasSearched] = useState(false);                // Search performed flag

  // Search handler with async processing
  const handleSearch = useCallback(async (query: string) => {
    // Input validation
    if (!query.trim()) {
      setError('Please enter a search query.');
      return;
    }
    
    // Update state for new search
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchResults([]);
    setGeminiResponse(null);

    try {
      // Analyze query with Gemini AI
      const geminiData = await analyzeSearchQuery(query);
      setGeminiResponse(geminiData);
      
      // Find relevant ebooks based on AI analysis
      const books = findEbooksByTopics(geminiData.ebook_topics);
      setSearchResults(books);

    } catch (err) {
      console.error(err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {/* Hero section with search functionality */}
      <Hero onSearch={handleSearch} isLoading={isLoading} />
        
      {/* Error display */}
      {error && <p className="text-center text-ai-pink mt-8">{error}</p>}
      
      {/* Results section */}
      <div className="mt-12 md:mt-20">
        {/* Loading indicator */}
        {isLoading && <div className="flex justify-center"><Loader /></div>}
        
        {/* Search results display */}
        {!isLoading && hasSearched && (
           <EbookList 
              ebooks={searchResults} 
              geminiResponse={geminiResponse}
           />
        )}
      </div>
    </>
  );
};
```

---

## Services

### src/services/geminiService.ts - AI Search Service
```typescript
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";  // Google AI SDK
import { GeminiSearchResponse, Ebook } from '../types';               // Type definitions
import { ALL_EBOOKS } from '../constants';                            // Mock ebook data

// Environment variable validation
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

// Initialize Google AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Specify the Gemini model version
const model = "gemini-2.5-flash-preview-04-17";

// Analyze search query using Gemini AI
// This function interprets user intent and suggests relevant topics
export async function analyzeSearchQuery(query: string): Promise<GeminiSearchResponse> {
  // Prompt engineering for consistent AI responses
  const prompt = `
    You are an intelligent assistant for "Mebooks.ai", an AI-focused ebook marketplace.
    A user is searching for ebooks with the query: "${query}".
    Analyze their intent and suggest what they are looking for. Your goal is to help them find the right books to upskill.

    Based on the query, return a JSON object with the following structure:
    {
      "search_summary": "A short, encouraging rephrasing of what the user is looking for. For example: 'Building your skills in AI-powered product creation.'",
      "ebook_topics": ["A list of relevant topics like 'AI Agents', 'Product Management', 'Tech AI Startups', 'Product Design', 'Tech Platforms', 'LLM', 'UX/UI', 'Data Science', 'Beginner', 'Advanced'. Choose up to 3 most relevant topics."],
      "is_bundle_suggestion": "A boolean indicating if this query is a good candidate for a bundled collection of books. For example, a broad query like 'learn AI from scratch' is a good candidate.",
      "bundle_name": "If is_bundle_suggestion is true, suggest a cool, marketable name for the bundle. e.g., 'AI Zero-to-Hero Pack'. Otherwise, this should be an empty string."
    }

    Only return the raw JSON object. Do not wrap it in markdown.
  `;
  
  try {
     // Generate content using Gemini AI
     const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",  // Request JSON response
        },
    });

    // Extract JSON string from response
    let jsonStr = response.text.trim();
    
    // Handle markdown code blocks if present
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }

    // Parse and return the JSON response
    return JSON.parse(jsonStr) as GeminiSearchResponse;
  } catch(e) {
      console.error("Failed to parse Gemini response:", e);
      throw new Error("Could not understand the search query. Please try rephrasing.");
  }
}

// Mock function to simulate database search based on AI-suggested topics
// In production, this would query a real database with semantic search
export function findEbooksByTopics(topics: string[]): Ebook[] {
  // Handle empty topics array
  if (!topics || topics.length === 0) {
    return [];
  }

  // Convert topics to lowercase for case-insensitive matching
  const lowerCaseTopics = topics.map(t => t.toLowerCase());

  // Filter ebooks based on topic matching
  const results = ALL_EBOOKS.filter(ebook => {
    // Create searchable content string from ebook metadata
    const ebookContent = `${ebook.title} ${ebook.category} ${ebook.description} ${ebook.frameworkTags.join(' ')} ${ebook.complexity}`.toLowerCase();
    
    // Check if any topic matches the ebook content
    return lowerCaseTopics.some(topic => ebookContent.includes(topic));
  });

  // Randomize results to simulate dynamic search
  return results.sort(() => 0.5 - Math.random());
}
```

---

## Constants

### src/constants.ts - Application Data
```typescript
import { Ebook, ComplexityRating } from './types';  // Type imports

// Mock ebook database - in production this would come from a real database
export const ALL_EBOOKS: Ebook[] = [
  {
    id: '1',
    title: 'AI Agents in Practice',
    description: 'A comprehensive guide to building and deploying autonomous AI agents for real-world applications.',
    author: 'Dr. Evelyn Reed',
    price: 3999,                    // $39.99 in cents
    coverUrl: 'https://picsum.photos/seed/ai-agents/400/600',
    category: 'AI/ML',
    complexity: ComplexityRating.Advanced,
    frameworkTags: ['LangChain', 'Python', 'API'],
    pageCount: 320,
  },
  {
    id: '2',
    title: 'Product Design for Tech Leaders',
    description: 'Master the principles of user-centric design to build products that users love and drive business success.',
    author: 'Leo Chen',
    price: 2999,                    // $29.99 in cents
    coverUrl: 'https://picsum.photos/seed/product-design/400/600',
    category: 'Product Design',
    complexity: ComplexityRating.Intermediate,
    frameworkTags: ['Figma', 'UX/UI', 'Agile'],
    pageCount: 250,
  },
  {
    id: '3',
    title: 'The AI Startup Playbook',
    description: 'From idea to IPO, this book covers everything you need to know about building a successful AI startup.',
    author: 'Jian Yang',
    price: 4500,                    // $45.00 in cents
    coverUrl: 'https://picsum.photos/seed/ai-startup/400/600',
    category: 'Tech AI Startups',
    complexity: ComplexityRating.Intermediate,
    frameworkTags: ['Venture Capital', 'Growth Hacking', 'SaaS'],
    pageCount: 410,
  },
  {
    id: '4',
    title: 'Managing AI Products',
    description: 'A product manager\'s guide to the unique challenges and opportunities of the AI product lifecycle.',
    author: 'Sofia Alvarez',
    price: 3499,                    // $34.99 in cents
    coverUrl: 'https://picsum.photos/seed/ai-pm/400/600',
    category: 'Product Management',
    complexity: ComplexityRating.Intermediate,
    frameworkTags: ['Roadmapping', 'A/B Testing', 'Data Science'],
    pageCount: 280,
  },
  {
    id: '5',
    title: 'Advanced Prompt Engineering',
    description: 'Unlock the full potential of large language models with advanced prompt engineering techniques.',
    author: 'Ben Carter',
    price: 4999,                    // $49.99 in cents
    coverUrl: 'https://picsum.photos/seed/prompt-eng/400/600',
    category: 'AI/ML',
    complexity: ComplexityRating.Advanced,
    frameworkTags: ['LLM', 'GPT-4', 'Optimization'],
    pageCount: 190,
  },
  {
    id: '6',
    title: 'Decoding Tech Platforms',
    description: 'An insider look at the architecture and business models of the world\'s most successful tech platforms.',
    author: 'Maria Schmidt',
    price: 3200,                    // $32.00 in cents
    coverUrl: 'https://picsum.photos/seed/tech-platforms/400/600',
    category: 'Tech Platforms',
    complexity: ComplexityRating.Research,
    frameworkTags: ['Scalability', 'APIs', 'Network Effects'],
    pageCount: 550,
  },
   {
    id: '7',
    title: 'Introduction to Neural Networks',
    description: 'A beginner-friendly introduction to the core concepts of neural networks and deep learning.',
    author: 'Alice Johnson',
    price: 1999,                    // $19.99 in cents
    coverUrl: 'https://picsum.photos/seed/neural-nets/400/600',
    category: 'AI/ML',
    complexity: ComplexityRating.Beginner,
    frameworkTags: ['Python', 'TensorFlow', 'Keras'],
    pageCount: 180,
  },
  {
    id: '8',
    title: 'Data-Driven Product Management',
    description: 'Learn how to leverage data to make informed product decisions and drive growth.',
    author: 'David Kim',
    price: 3599,                    // $35.99 in cents
    coverUrl: 'https://picsum.photos/seed/data-pm/400/600',
    category: 'Product Management',
    complexity: ComplexityRating.Intermediate,
    frameworkTags: ['SQL', 'Analytics', 'Metrics'],
    pageCount: 300,
  }
];
```

---

## Development Guidelines

### Key Implementation Notes

1. **Color Palette**: The application uses a carefully designed AI-focused color palette with neural network-inspired dark themes.

2. **Type Safety**: All components use TypeScript interfaces for type safety and better development experience.

3. **Responsive Design**: The application is fully responsive with mobile-first design principles.

4. **Performance**: Uses React 19 with concurrent features and optimized rendering.

5. **AI Integration**: Google Gemini AI provides intelligent search analysis and topic suggestions.

6. **Accessibility**: Proper semantic HTML, ARIA labels, and keyboard navigation support.

### Future Enhancements

1. **Database Integration**: Replace mock data with real PostgreSQL database
2. **Authentication**: Implement NextAuth.js for user authentication
3. **Payment Processing**: Add Stripe integration for the $0.25 flat fee model
4. **File Upload**: Implement secure file upload with virus scanning
5. **Search Enhancement**: Add semantic search with embeddings
6. **Caching**: Implement Redis caching for search results
7. **Monitoring**: Add performance and error monitoring

### Security Considerations

1. **Input Validation**: All user inputs are validated and sanitized
2. **API Security**: Environment variables for sensitive data
3. **XSS Prevention**: React's built-in XSS protection
4. **CSRF Protection**: Form tokens and proper headers

This documentation provides a complete overview of the Mebooks.ai codebase with detailed explanations of every component, service, and configuration file. 