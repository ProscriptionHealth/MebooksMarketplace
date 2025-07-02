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
10. [Vector Search Implementation](#vector-search-implementation)
11. [Development Guidelines](#development-guidelines)

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
- **Vector Search**: Google Vertex AI Vector Search with Sentence Transformers
- **Backend**: FastAPI with Python 3.11
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Routing**: Custom client-side routing implementation
- **Deployment**: Docker, Google Cloud Platform, Cloud Run

### Project Structure
```
app/
├── src/                    # Main source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # External service integrations
│   │   ├── geminiService.ts      # Google Gemini AI integration
│   │   └── vectorSearchService.ts # Vector search integration
│   ├── types.ts           # TypeScript type definitions
│   ├── constants.ts       # Application constants
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Application entry point
├── semantic_generator.py          # Python semantic processing service
├── vector_search_service.py       # Python vector search service
├── vector_search_api.py          # FastAPI REST API
├── requirements.txt              # Python dependencies
├── Dockerfile                    # Backend container
├── Dockerfile.frontend          # Frontend container
├── docker-compose.yml           # Local development setup
├── deploy.sh                    # GCP deployment script
├── env.example                  # Environment variables template
├── VECTOR_SEARCH_README.md      # Vector search documentation
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
import { vectorSearchService } from './vectorSearchService';          // Vector search integration

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

// Enhanced function using vector search for semantic ebook discovery
export async function findEbooksByTopics(topics: string[]): Promise<Ebook[]> {
  if (!topics || topics.length === 0) {
    return [];
  }

  console.log('Searching for topics:', topics);
  
  try {
    // Use vector search to find ebooks by topics
    const searchQuery = topics.join(' ');
    const vectorResults = await vectorSearchService.hybridSearch(searchQuery, {}, 20);
    
    // Convert vector results to Ebook format
    const ebooks: Ebook[] = vectorResults.map(result => ({
      id: result.ebook_id,
      title: result.title,
      description: result.semantic_summary,
      author: result.author,
      price: 0, // Will be fetched from database
      coverUrl: '', // Will be fetched from database
      category: result.category,
      complexity: result.complexity as any,
      frameworkTags: result.keywords,
      pageCount: 0, // Will be fetched from database
    }));
    
    return ebooks;
  } catch (error) {
    console.error('Vector search error:', error);
    return [];
  }
}
```

### src/services/vectorSearchService.ts - Vector Search Integration
```typescript
// Vector Search Service for Mebooks.ai Frontend
// Integrates with Python backend for semantic search

import { Ebook, GeminiSearchResponse } from '../types';

// Search result interface
export interface VectorSearchResult {
  ebook_id: string;
  title: string;
  author: string;
  category: string;
  complexity: string;
  similarity_score: number;
  relevant_chunks: string[];
  semantic_summary: string;
  keywords: string[];
}

// Search filters interface
export interface SearchFilters {
  category?: string;
  complexity?: string;
  author?: string;
  price_range?: {
    min: number;
    max: number;
  };
  frameworks?: string[];
}

// Search query interface
export interface SearchQuery {
  text: string;
  filters: SearchFilters;
  num_results: number;
  similarity_threshold: number;
}

// Vector search service class
export class VectorSearchService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_VECTOR_SEARCH_API_URL || 'http://localhost:8000';
    this.apiKey = process.env.REACT_APP_VECTOR_SEARCH_API_KEY || '';
  }

  // Generate headers for API requests
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
  }

  // Perform semantic search
  async searchEbooks(query: SearchQuery): Promise<VectorSearchResult[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/search`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const results = await response.json();
      return results.map((result: any) => ({
        ebook_id: result.ebook_id,
        title: result.title,
        author: result.author,
        category: result.category,
        complexity: result.complexity,
        similarity_score: result.similarity_score,
        relevant_chunks: result.relevant_chunks,
        semantic_summary: result.semantic_summary,
        keywords: result.keywords,
      }));
    } catch (error) {
      console.error('Vector search error:', error);
      throw new Error('Failed to perform semantic search');
    }
  }

  // Perform hybrid search (semantic + keyword)
  async hybridSearch(
    query: string,
    filters: SearchFilters = {},
    numResults: number = 10
  ): Promise<VectorSearchResult[]> {
    try {
      const searchQuery: SearchQuery = {
        text: query,
        filters,
        num_results: numResults,
        similarity_threshold: 0.5,
      };

      const response = await fetch(`${this.baseUrl}/api/hybrid-search`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(searchQuery),
      });

      if (!response.ok) {
        throw new Error(`Hybrid search failed: ${response.statusText}`);
      }

      const results = await response.json();
      return results.map((result: any) => ({
        ebook_id: result.ebook_id,
        title: result.title,
        author: result.author,
        category: result.category,
        complexity: result.complexity,
        similarity_score: result.similarity_score,
        relevant_chunks: result.relevant_chunks,
        semantic_summary: result.semantic_summary,
        keywords: result.keywords,
      }));
    } catch (error) {
      console.error('Hybrid search error:', error);
      throw new Error('Failed to perform hybrid search');
    }
  }

  // Get similar ebooks
  async getSimilarEbooks(ebookId: string, numResults: number = 5): Promise<VectorSearchResult[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/similar/${ebookId}?num_results=${numResults}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Similar ebooks search failed: ${response.statusText}`);
      }

      const results = await response.json();
      return results.map((result: any) => ({
        ebook_id: result.ebook_id,
        title: result.title,
        author: result.author,
        category: result.category,
        complexity: result.complexity,
        similarity_score: result.similarity_score,
        relevant_chunks: result.relevant_chunks,
        semantic_summary: result.semantic_summary,
        keywords: result.keywords,
      }));
    } catch (error) {
      console.error('Similar ebooks search error:', error);
      throw new Error('Failed to get similar ebooks');
    }
  }

  // Get personalized recommendations
  async getRecommendations(userId: string, numResults: number = 10): Promise<VectorSearchResult[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/recommendations/${userId}?num_results=${numResults}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Recommendations failed: ${response.statusText}`);
      }

      const results = await response.json();
      return results.map((result: any) => ({
        ebook_id: result.ebook_id,
        title: result.title,
        author: result.author,
        category: result.category,
        complexity: result.complexity,
        similarity_score: result.similarity_score,
        relevant_chunks: result.relevant_chunks,
        semantic_summary: result.semantic_summary,
        keywords: result.keywords,
      }));
    } catch (error) {
      console.error('Recommendations error:', error);
      throw new Error('Failed to get recommendations');
    }
  }

  // Get popular ebooks
  async getPopularEbooks(numResults: number = 10): Promise<VectorSearchResult[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/popular?num_results=${numResults}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Popular ebooks failed: ${response.statusText}`);
      }

      const results = await response.json();
      return results.map((result: any) => ({
        ebook_id: result.ebook_id,
        title: result.title,
        author: result.author,
        category: result.category,
        complexity: result.complexity,
        similarity_score: result.similarity_score,
        relevant_chunks: result.relevant_chunks,
        semantic_summary: result.semantic_summary,
        keywords: result.keywords,
      }));
    } catch (error) {
      console.error('Popular ebooks error:', error);
      throw new Error('Failed to get popular ebooks');
    }
  }

  // Search by category
  async searchByCategory(category: string, numResults: number = 20): Promise<VectorSearchResult[]> {
    try {
      const filters: SearchFilters = { category };
      const searchQuery: SearchQuery = {
        text: category,
        filters,
        num_results: numResults,
        similarity_threshold: 0.3,
      };

      return await this.searchEbooks(searchQuery);
    } catch (error) {
      console.error('Category search error:', error);
      throw new Error('Failed to search by category');
    }
  }

  // Search by complexity level
  async searchByComplexity(complexity: string, numResults: number = 20): Promise<VectorSearchResult[]> {
    try {
      const filters: SearchFilters = { complexity };
      const searchQuery: SearchQuery = {
        text: complexity,
        filters,
        num_results: numResults,
        similarity_threshold: 0.3,
      };

      return await this.searchEbooks(searchQuery);
    } catch (error) {
      console.error('Complexity search error:', error);
      throw new Error('Failed to search by complexity');
    }
  }

  // Advanced search with multiple filters
  async advancedSearch(
    query: string,
    filters: SearchFilters,
    numResults: number = 20
  ): Promise<VectorSearchResult[]> {
    try {
      const searchQuery: SearchQuery = {
        text: query,
        filters,
        num_results: numResults,
        similarity_threshold: 0.4,
      };

      return await this.searchEbooks(searchQuery);
    } catch (error) {
      console.error('Advanced search error:', error);
      throw new Error('Failed to perform advanced search');
    }
  }
}

// Create singleton instance
export const vectorSearchService = new VectorSearchService();

// Enhanced search function that combines Gemini analysis with vector search
export async function enhancedSearch(
  query: string,
  geminiResponse: GeminiSearchResponse | null = null
): Promise<Ebook[]> {
  try {
    // Use Gemini response topics if available, otherwise use the query directly
    const searchText = geminiResponse?.ebook_topics?.join(' ') || query;
    
    // Perform vector search
    const vectorResults = await vectorSearchService.hybridSearch(searchText, {}, 20);
    
    // Convert vector results to Ebook format
    const ebooks: Ebook[] = vectorResults.map(result => ({
      id: result.ebook_id,
      title: result.title,
      description: result.semantic_summary,
      author: result.author,
      price: 0, // Will be fetched from database
      coverUrl: '', // Will be fetched from database
      category: result.category,
      complexity: result.complexity as any,
      frameworkTags: result.keywords,
      pageCount: 0, // Will be fetched from database
    }));
    
    return ebooks;
  } catch (error) {
    console.error('Enhanced search error:', error);
    // Return empty array as fallback
    return [];
  }
}

// Export default instance
export default vectorSearchService;
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

## Vector Search Implementation

The vector search implementation provides comprehensive semantic search capabilities using Google Vertex AI Vector Search, enabling intelligent ebook discovery based on content meaning rather than just keywords.

### Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend│    │  FastAPI Backend │    │  Vertex AI      │
│                 │◄──►│                  │◄──►│  Vector Search  │
│  - Search UI    │    │  - REST API      │    │  - Embeddings   │
│  - Results      │    │  - Processing    │    │  - Index        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │  Google Cloud    │
                       │  - Storage       │
                       │  - BigQuery      │
                       │  - Vertex AI     │
                       └──────────────────┘
```

### semantic_generator.py - Core Semantic Processing Service

```python
"""
Mebooks.ai Semantic Generator Service
Generates semantic descriptions, keywords, and embeddings for uploaded ebooks
"""

import os
import json
import logging
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from pathlib import Path
import asyncio
from concurrent.futures import ThreadPoolExecutor

# Google Cloud and AI imports
import vertexai
from vertexai.language_models import TextGenerationModel
from vertexai.vision_models import ImageGenerationModel
from google.cloud import aiplatform
from google.cloud.aiplatform import MatchingEngineIndex, MatchingEngineIndexEndpoint
from google.cloud import storage

# Text processing imports
import PyPDF2
import fitz  # PyMuPDF
import re
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import nltk

# Embeddings and vector processing
import numpy as np
from sentence_transformers import SentenceTransformer
import hashlib

# Configuration
from dotenv import load_dotenv
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class EbookMetadata:
    """Ebook metadata structure"""
    id: str
    title: str
    author: str
    description: str
    category: str
    complexity: str
    page_count: int
    file_path: str
    file_type: str

@dataclass
class SemanticData:
    """Semantic data generated from ebook"""
    ebook_id: str
    keywords: List[str]
    semantic_summary: str
    technical_concepts: List[str]
    learning_objectives: List[str]
    prerequisites: List[str]
    target_audience: str
    difficulty_level: str
    estimated_reading_time: int
    embeddings: Dict[str, List[float]]
    chunks: List[Dict[str, Any]]

class TextChunker:
    """Handles text chunking for optimal embedding generation"""
    
    def __init__(self, chunk_size: int = 512, overlap: int = 50):
        self.chunk_size = chunk_size
        self.overlap = overlap
        self.lemmatizer = WordNetLemmatizer()
        
        # Download required NLTK data
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')
        
        try:
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('stopwords')
        
        try:
            nltk.data.find('corpora/wordnet')
        except LookupError:
            nltk.download('wordnet')
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text.strip())
        # Remove special characters but keep important ones
        text = re.sub(r'[^\w\s\.\,\!\?\;\:\-\(\)\[\]\{\}]', '', text)
        return text
    
    def chunk_text(self, text: str) -> List[str]:
        """Split text into overlapping chunks"""
        sentences = sent_tokenize(text)
        chunks = []
        current_chunk = ""
        
        for sentence in sentences:
            if len(current_chunk) + len(sentence) <= self.chunk_size:
                current_chunk += sentence + " "
            else:
                if current_chunk:
                    chunks.append(current_chunk.strip())
                current_chunk = sentence + " "
        
        if current_chunk:
            chunks.append(current_chunk.strip())
        
        return chunks
    
    def extract_keywords(self, text: str, max_keywords: int = 20) -> List[str]:
        """Extract keywords using TF-IDF and NLP techniques"""
        # Tokenize and clean
        words = word_tokenize(text.lower())
        stop_words = set(stopwords.words('english'))
        
        # Filter and lemmatize
        filtered_words = [
            self.lemmatizer.lemmatize(word) 
            for word in words 
            if word.isalnum() and word not in stop_words and len(word) > 2
        ]
        
        # Count frequencies
        word_freq = {}
        for word in filtered_words:
            word_freq[word] = word_freq.get(word, 0) + 1
        
        # Sort by frequency and return top keywords
        sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
        return [word for word, freq in sorted_words[:max_keywords]]

class EbookProcessor:
    """Processes ebook files and extracts content"""
    
    def __init__(self):
        self.supported_formats = ['.pdf', '.epub', '.txt']
    
    def extract_text_from_pdf(self, file_path: str) -> str:
        """Extract text from PDF file"""
        try:
            # Try PyMuPDF first (better for complex PDFs)
            doc = fitz.open(file_path)
            text = ""
            for page in doc:
                text += page.get_text()
            doc.close()
            return text
        except Exception as e:
            logger.warning(f"PyMuPDF failed, trying PyPDF2: {e}")
            try:
                # Fallback to PyPDF2
                with open(file_path, 'rb') as file:
                    pdf_reader = PyPDF2.PdfReader(file)
                    text = ""
                    for page in pdf_reader.pages:
                        text += page.extract_text()
                return text
            except Exception as e2:
                logger.error(f"Failed to extract text from PDF: {e2}")
                raise
    
    def extract_text_from_epub(self, file_path: str) -> str:
        """Extract text from EPUB file"""
        # Implementation for EPUB extraction
        # This would require additional libraries like ebooklib
        raise NotImplementedError("EPUB extraction not yet implemented")
    
    def extract_text_from_txt(self, file_path: str) -> str:
        """Extract text from TXT file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except Exception as e:
            logger.error(f"Failed to extract text from TXT: {e}")
            raise
    
    def extract_text(self, file_path: str) -> str:
        """Extract text from ebook file based on format"""
        file_ext = Path(file_path).suffix.lower()
        
        if file_ext not in self.supported_formats:
            raise ValueError(f"Unsupported file format: {file_ext}")
        
        if file_ext == '.pdf':
            return self.extract_text_from_pdf(file_path)
        elif file_ext == '.epub':
            return self.extract_text_from_epub(file_path)
        elif file_ext == '.txt':
            return self.extract_text_from_txt(file_path)
        else:
            raise ValueError(f"Unsupported file format: {file_ext}")

class LLMSemanticGenerator:
    """Generates semantic descriptions using LLMs"""
    
    def __init__(self, project_id: str, location: str = "us-central1"):
        self.project_id = project_id
        self.location = location
        
        # Initialize Vertex AI
        vertexai.init(project=project_id, location=location)
        
        # Initialize models
        self.text_model = TextGenerationModel.from_pretrained("text-bison@001")
        
        # Initialize embeddings model
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
    
    async def generate_semantic_summary(self, text: str, metadata: EbookMetadata) -> Dict[str, Any]:
        """Generate comprehensive semantic summary using LLM"""
        
        prompt = f"""
        Analyze this AI/tech ebook content and provide a comprehensive semantic summary.
        
        Ebook Title: {metadata.title}
        Author: {metadata.author}
        Category: {metadata.category}
        Complexity: {metadata.complexity}
        
        Content (first 2000 characters):
        {text[:2000]}...
        
        Please provide a JSON response with the following structure:
        {{
            "semantic_summary": "A detailed summary capturing the core concepts, methodologies, and value proposition",
            "technical_concepts": ["list", "of", "key", "technical", "concepts"],
            "learning_objectives": ["list", "of", "learning", "objectives"],
            "prerequisites": ["list", "of", "prerequisites"],
            "target_audience": "Description of ideal reader",
            "difficulty_level": "beginner/intermediate/advanced/expert",
            "estimated_reading_time_hours": 5,
            "key_insights": ["list", "of", "key", "insights"],
            "practical_applications": ["list", "of", "practical", "applications"]
        }}
        
        Focus on AI, machine learning, product management, and technical content.
        """
        
        try:
            response = self.text_model.predict(prompt)
            return json.loads(response.text)
        except Exception as e:
            logger.error(f"Failed to generate semantic summary: {e}")
            # Return fallback summary
            return {
                "semantic_summary": f"Comprehensive guide on {metadata.category} by {metadata.author}",
                "technical_concepts": [metadata.category],
                "learning_objectives": ["Master key concepts in " + metadata.category],
                "prerequisites": ["Basic understanding of technology"],
                "target_audience": "Technology professionals and learners",
                "difficulty_level": metadata.complexity,
                "estimated_reading_time_hours": 3,
                "key_insights": ["Practical knowledge in " + metadata.category],
                "practical_applications": ["Real-world implementation"]
            }
    
    def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for text chunks"""
        try:
            embeddings = self.embedding_model.encode(texts)
            return embeddings.tolist()
        except Exception as e:
            logger.error(f"Failed to generate embeddings: {e}")
            # Return zero embeddings as fallback
            return [[0.0] * 384] * len(texts)  # 384 is the dimension of all-MiniLM-L6-v2

class VertexAIVectorSearch:
    """Manages Vertex AI Vector Search operations"""
    
    def __init__(self, project_id: str, location: str = "us-central1"):
        self.project_id = project_id
        self.location = location
        self.index_name = "mebooks-ebooks-index"
        self.endpoint_name = "mebooks-search-endpoint"
        
        # Initialize Vertex AI
        aiplatform.init(project=project_id, location=location)
    
    def create_index(self, dimensions: int = 384) -> str:
        """Create Vector Search index"""
        try:
            index = MatchingEngineIndex.create_tree_ah_index(
                display_name=self.index_name,
                contents_delta_uri=f"gs://mebooks-vectors/{self.index_name}/contents",
                config={
                    "dimensions": dimensions,
                    "approximate_neighbors_count": 150,
                    "distance_measure_type": "COSINE_DISTANCE",
                    "algorithm_config": {
                        "tree_ah_config": {
                            "leaf_node_embedding_count": 500,
                            "leaf_nodes_to_search_percent": 10
                        }
                    }
                }
            )
            return index.name
        except Exception as e:
            logger.error(f"Failed to create index: {e}")
            raise
    
    def deploy_index(self, index_name: str) -> str:
        """Deploy index to endpoint"""
        try:
            index = MatchingEngineIndex(index_name=index_name)
            endpoint = index.deploy_index(
                display_name=self.endpoint_name,
                deployed_index_id=self.endpoint_name
            )
            return endpoint.name
        except Exception as e:
            logger.error(f"Failed to deploy index: {e}")
            raise
    
    def upsert_embeddings(self, index_name: str, embeddings: List[Dict[str, Any]]):
        """Upsert embeddings to index"""
        try:
            index = MatchingEngineIndex(index_name=index_name)
            index.upsert_embeddings(embeddings)
        except Exception as e:
            logger.error(f"Failed to upsert embeddings: {e}")
            raise
    
    def find_nearest_neighbors(self, index_name: str, query_embedding: List[float], 
                              num_neighbors: int = 10) -> List[Dict[str, Any]]:
        """Find nearest neighbors for query"""
        try:
            index = MatchingEngineIndex(index_name=index_name)
            response = index.find_nearest_neighbors(
                deployed_index_id=self.endpoint_name,
                queries=[query_embedding],
                num_neighbors=num_neighbors
            )
            return response
        except Exception as e:
            logger.error(f"Failed to find nearest neighbors: {e}")
            raise

class SemanticGeneratorService:
    """Main service for generating semantic data from ebooks"""
    
    def __init__(self, project_id: str, location: str = "us-central1"):
        self.project_id = project_id
        self.location = location
        
        # Initialize components
        self.chunker = TextChunker()
        self.processor = EbookProcessor()
        self.llm_generator = LLMSemanticGenerator(project_id, location)
        self.vector_search = VertexAIVectorSearch(project_id, location)
        
        # Initialize storage client
        self.storage_client = storage.Client(project=project_id)
    
    async def process_ebook(self, metadata: EbookMetadata) -> SemanticData:
        """Process ebook and generate semantic data"""
        logger.info(f"Processing ebook: {metadata.title}")
        
        try:
            # Extract text from ebook
            text = self.processor.extract_text(metadata.file_path)
            logger.info(f"Extracted {len(text)} characters from {metadata.title}")
            
            # Clean and chunk text
            cleaned_text = self.chunker.clean_text(text)
            chunks = self.chunker.chunk_text(cleaned_text)
            logger.info(f"Created {len(chunks)} chunks for {metadata.title}")
            
            # Extract keywords
            keywords = self.chunker.extract_keywords(cleaned_text)
            logger.info(f"Extracted {len(keywords)} keywords for {metadata.title}")
            
            # Generate semantic summary using LLM
            semantic_data = await self.llm_generator.generate_semantic_summary(
                cleaned_text, metadata
            )
            
            # Generate embeddings for chunks
            chunk_embeddings = self.llm_generator.generate_embeddings(chunks)
            
            # Generate embedding for full text summary
            summary_embedding = self.llm_generator.generate_embeddings([
                semantic_data["semantic_summary"]
            ])[0]
            
            # Prepare chunks with metadata
            chunk_data = []
            for i, (chunk, embedding) in enumerate(zip(chunks, chunk_embeddings)):
                chunk_data.append({
                    "id": f"{metadata.id}_chunk_{i}",
                    "ebook_id": metadata.id,
                    "content": chunk,
                    "embedding": embedding,
                    "chunk_index": i,
                    "metadata": {
                        "title": metadata.title,
                        "author": metadata.author,
                        "category": metadata.category,
                        "complexity": metadata.complexity
                    }
                })
            
            # Create semantic data object
            semantic_result = SemanticData(
                ebook_id=metadata.id,
                keywords=keywords,
                semantic_summary=semantic_data["semantic_summary"],
                technical_concepts=semantic_data["technical_concepts"],
                learning_objectives=semantic_data["learning_objectives"],
                prerequisites=semantic_data["prerequisites"],
                target_audience=semantic_data["target_audience"],
                difficulty_level=semantic_data["difficulty_level"],
                estimated_reading_time=semantic_data["estimated_reading_time_hours"],
                embeddings={
                    "summary": summary_embedding,
                    "chunks": chunk_embeddings
                },
                chunks=chunk_data
            )
            
            logger.info(f"Successfully processed {metadata.title}")
            return semantic_result
            
        except Exception as e:
            logger.error(f"Failed to process ebook {metadata.title}: {e}")
            raise
    
    async def store_semantic_data(self, semantic_data: SemanticData):
        """Store semantic data in vector database and metadata store"""
        try:
            # Store in Cloud Storage for backup
            bucket_name = f"mebooks-semantic-data-{self.project_id}"
            bucket = self.storage_client.bucket(bucket_name)
            
            # Store semantic metadata
            metadata_blob = bucket.blob(f"metadata/{semantic_data.ebook_id}.json")
            metadata_blob.upload_from_string(
                json.dumps({
                    "ebook_id": semantic_data.ebook_id,
                    "keywords": semantic_data.keywords,
                    "semantic_summary": semantic_data.semantic_summary,
                    "technical_concepts": semantic_data.technical_concepts,
                    "learning_objectives": semantic_data.learning_objectives,
                    "prerequisites": semantic_data.prerequisites,
                    "target_audience": semantic_data.target_audience,
                    "difficulty_level": semantic_data.difficulty_level,
                    "estimated_reading_time": semantic_data.estimated_reading_time
                }, indent=2),
                content_type='application/json'
            )
            
            # Store embeddings in vector database
            embeddings_data = []
            for chunk in semantic_data.chunks:
                embeddings_data.append({
                    "id": chunk["id"],
                    "embedding": chunk["embedding"],
                    "restricts": {
                        "ebook_id": semantic_data.ebook_id,
                        "category": chunk["metadata"]["category"],
                        "complexity": chunk["metadata"]["complexity"]
                    }
                })
            
            # Upsert to Vertex AI Vector Search
            self.vector_search.upsert_embeddings(
                self.vector_search.index_name,
                embeddings_data
            )
            
            logger.info(f"Stored semantic data for ebook {semantic_data.ebook_id}")
            
        except Exception as e:
            logger.error(f"Failed to store semantic data: {e}")
            raise
    
    async def search_ebooks(self, query: str, filters: Dict[str, Any] = None, 
                           num_results: int = 10) -> List[Dict[str, Any]]:
        """Search ebooks using semantic similarity"""
        try:
            # Generate query embedding
            query_embedding = self.llm_generator.generate_embeddings([query])[0]
            
            # Search vector database
            results = self.vector_search.find_nearest_neighbors(
                self.vector_search.index_name,
                query_embedding,
                num_results
            )
            
            # Process and filter results
            processed_results = []
            for result in results:
                # Apply filters if provided
                if filters:
                    if not self._matches_filters(result, filters):
                        continue
                
                processed_results.append({
                    "ebook_id": result["restricts"]["ebook_id"],
                    "score": result["distance"],
                    "chunk_content": result.get("content", ""),
                    "metadata": result["restricts"]
                })
            
            return processed_results
            
        except Exception as e:
            logger.error(f"Failed to search ebooks: {e}")
            raise
    
    def _matches_filters(self, result: Dict[str, Any], filters: Dict[str, Any]) -> bool:
        """Check if result matches provided filters"""
        for key, value in filters.items():
            if key in result.get("restricts", {}) and result["restricts"][key] != value:
                return False
        return True

# Example usage and CLI interface
async def main():
    """Main function for processing ebooks"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Process ebooks for semantic search")
    parser.add_argument("--project-id", required=True, help="Google Cloud Project ID")
    parser.add_argument("--file-path", required=True, help="Path to ebook file")
    parser.add_argument("--title", required=True, help="Ebook title")
    parser.add_argument("--author", required=True, help="Ebook author")
    parser.add_argument("--category", required=True, help="Ebook category")
    parser.add_argument("--complexity", required=True, help="Ebook complexity level")
    
    args = parser.parse_args()
    
    # Create metadata
    metadata = EbookMetadata(
        id=hashlib.md5(f"{args.title}_{args.author}".encode()).hexdigest(),
        title=args.title,
        author=args.author,
        description="",  # Will be generated
        category=args.category,
        complexity=args.complexity,
        page_count=0,  # Will be calculated
        file_path=args.file_path,
        file_type=Path(args.file_path).suffix.lower()
    )
    
    # Initialize service
    service = SemanticGeneratorService(args.project_id)
    
    # Process ebook
    semantic_data = await service.process_ebook(metadata)
    
    # Store semantic data
    await service.store_semantic_data(semantic_data)
    
    print(f"Successfully processed ebook: {metadata.title}")
    print(f"Generated {len(semantic_data.keywords)} keywords")
    print(f"Created {len(semantic_data.chunks)} chunks")
    print(f"Semantic summary: {semantic_data.semantic_summary[:200]}...")

if __name__ == "__main__":
    asyncio.run(main())
```

### vector_search_service.py - Vertex AI Vector Search Integration

```python
"""
Mebooks.ai Vector Search Service
Integrates with Vertex AI Vector Search for semantic ebook search
"""

import os
import json
import logging
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass
import asyncio
from datetime import datetime

# Google Cloud imports
from google.cloud import aiplatform
from google.cloud.aiplatform import MatchingEngineIndex, MatchingEngineIndexEndpoint
from google.cloud import storage
from google.cloud import bigquery

# AI and embeddings
from sentence_transformers import SentenceTransformer
import numpy as np

# Configuration
from dotenv import load_dotenv
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class SearchQuery:
    """Search query structure"""
    text: str
    filters: Dict[str, Any]
    num_results: int
    similarity_threshold: float

@dataclass
class SearchResult:
    """Search result structure"""
    ebook_id: str
    title: str
    author: str
    category: str
    complexity: str
    similarity_score: float
    relevant_chunks: List[str]
    semantic_summary: str
    keywords: List[str]

class VectorSearchService:
    """Manages Vertex AI Vector Search operations"""
    
    def __init__(self, project_id: str, location: str = "us-central1"):
        self.project_id = project_id
        self.location = location
        
        # Initialize Vertex AI
        aiplatform.init(project=project_id, location=location)
        
        # Initialize embeddings model
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Initialize clients
        self.storage_client = storage.Client(project=project_id)
        self.bigquery_client = bigquery.Client(project=project_id)
        
        # Index configuration
        self.index_name = "mebooks-ebooks-index"
        self.endpoint_name = "mebooks-search-endpoint"
        self.index_dimensions = 384  # all-MiniLM-L6-v2 dimension
        
        # Load index and endpoint
        self._load_index_and_endpoint()
    
    def _load_index_and_endpoint(self):
        """Load existing index and endpoint or create new ones"""
        try:
            # Try to load existing index
            self.index = MatchingEngineIndex(index_name=self.index_name)
            logger.info(f"Loaded existing index: {self.index_name}")
        except Exception as e:
            logger.warning(f"Index not found, will create new one: {e}")
            self.index = None
        
        try:
            # Try to load existing endpoint
            self.endpoint = MatchingEngineIndexEndpoint(
                index_endpoint_name=self.endpoint_name
            )
            logger.info(f"Loaded existing endpoint: {self.endpoint_name}")
        except Exception as e:
            logger.warning(f"Endpoint not found, will create new one: {e}")
            self.endpoint = None
    
    def create_index(self) -> str:
        """Create Vector Search index"""
        try:
            if self.index:
                logger.info("Index already exists")
                return self.index.name
            
            logger.info("Creating new Vector Search index...")
            
            # Create index configuration
            index_config = {
                "dimensions": self.index_dimensions,
                "approximate_neighbors_count": 150,
                "distance_measure_type": "COSINE_DISTANCE",
                "algorithm_config": {
                    "tree_ah_config": {
                        "leaf_node_embedding_count": 500,
                        "leaf_nodes_to_search_percent": 10
                    }
                }
            }
            
            # Create index
            self.index = MatchingEngineIndex.create_tree_ah_index(
                display_name=self.index_name,
                contents_delta_uri=f"gs://mebooks-vectors-{self.project_id}/{self.index_name}/contents",
                config=index_config
            )
            
            logger.info(f"Created index: {self.index.name}")
            return self.index.name
            
        except Exception as e:
            logger.error(f"Failed to create index: {e}")
            raise
    
    def deploy_index(self) -> str:
        """Deploy index to endpoint"""
        try:
            if not self.index:
                raise ValueError("Index not initialized")
            
            if self.endpoint:
                logger.info("Endpoint already exists")
                return self.endpoint.name
            
            logger.info("Deploying index to endpoint...")
            
            # Deploy index
            self.endpoint = self.index.deploy_index(
                display_name=self.endpoint_name,
                deployed_index_id=self.endpoint_name
            )
            
            logger.info(f"Deployed endpoint: {self.endpoint.name}")
            return self.endpoint.name
            
        except Exception as e:
            logger.error(f"Failed to deploy index: {e}")
            raise
    
    def upsert_embeddings(self, embeddings_data: List[Dict[str, Any]]):
        """Upsert embeddings to index"""
        try:
            if not self.index:
                raise ValueError("Index not initialized")
            
            logger.info(f"Upserting {len(embeddings_data)} embeddings...")
            
            # Prepare embeddings for upsert
            upsert_data = []
            for item in embeddings_data:
                upsert_data.append({
                    "id": item["id"],
                    "embedding": item["embedding"],
                    "restricts": item.get("restricts", {}),
                    "crowding_tag": item.get("crowding_tag", "")
                })
            
            # Upsert to index
            self.index.upsert_embeddings(upsert_data)
            
            logger.info("Successfully upserted embeddings")
            
        except Exception as e:
            logger.error(f"Failed to upsert embeddings: {e}")
            raise
    
    def generate_query_embedding(self, query: str) -> List[float]:
        """Generate embedding for search query"""
        try:
            embedding = self.embedding_model.encode([query])
            return embedding[0].tolist()
        except Exception as e:
            logger.error(f"Failed to generate query embedding: {e}")
            raise
    
    async def search(self, search_query: SearchQuery) -> List[SearchResult]:
        """Search ebooks using semantic similarity"""
        try:
            if not self.index or not self.endpoint:
                raise ValueError("Index or endpoint not initialized")
            
            logger.info(f"Searching for: {search_query.text}")
            
            # Generate query embedding
            query_embedding = self.generate_query_embedding(search_query.text)
            
            # Prepare search request
            search_request = {
                "deployed_index_id": self.endpoint_name,
                "queries": [query_embedding],
                "num_neighbors": search_query.num_results
            }
            
            # Add filters if provided
            if search_query.filters:
                search_request["filter"] = self._build_filter_expression(search_query.filters)
            
            # Perform search
            response = self.index.find_nearest_neighbors(**search_request)
            
            # Process results
            results = []
            for neighbor in response[0]:  # response[0] contains neighbors for first query
                if neighbor.distance < search_query.similarity_threshold:
                    continue
                
                # Get ebook metadata
                ebook_metadata = await self._get_ebook_metadata(neighbor.restricts["ebook_id"])
                
                if ebook_metadata:
                    result = SearchResult(
                        ebook_id=neighbor.restricts["ebook_id"],
                        title=ebook_metadata["title"],
                        author=ebook_metadata["author"],
                        category=neighbor.restricts["category"],
                        complexity=neighbor.restricts["complexity"],
                        similarity_score=neighbor.distance,
                        relevant_chunks=[neighbor.restricts.get("chunk_content", "")],
                        semantic_summary=ebook_metadata.get("semantic_summary", ""),
                        keywords=ebook_metadata.get("keywords", [])
                    )
                    results.append(result)
            
            # Sort by similarity score
            results.sort(key=lambda x: x.similarity_score, reverse=True)
            
            logger.info(f"Found {len(results)} results")
            return results
            
        except Exception as e:
            logger.error(f"Failed to search: {e}")
            raise
    
    def _build_filter_expression(self, filters: Dict[str, Any]) -> str:
        """Build filter expression for Vector Search"""
        filter_parts = []
        
        for key, value in filters.items():
            if isinstance(value, list):
                # Handle list values (e.g., multiple categories)
                filter_parts.append(f'"{key}" IN {json.dumps(value)}')
            else:
                # Handle single values
                filter_parts.append(f'"{key}" = "{value}"')
        
        return " AND ".join(filter_parts)
    
    async def _get_ebook_metadata(self, ebook_id: str) -> Optional[Dict[str, Any]]:
        """Get ebook metadata from storage"""
        try:
            bucket_name = f"mebooks-semantic-data-{self.project_id}"
            bucket = self.storage_client.bucket(bucket_name)
            
            # Get metadata from Cloud Storage
            blob = bucket.blob(f"metadata/{ebook_id}.json")
            if blob.exists():
                content = blob.download_as_text()
                return json.loads(content)
            
            return None
            
        except Exception as e:
            logger.error(f"Failed to get ebook metadata: {e}")
            return None
    
    async def hybrid_search(self, query: str, filters: Dict[str, Any] = None,
                           num_results: int = 10) -> List[SearchResult]:
        """Perform hybrid search combining semantic and keyword search"""
        try:
            # Semantic search
            semantic_query = SearchQuery(
                text=query,
                filters=filters or {},
                num_results=num_results,
                similarity_threshold=0.7
            )
            
            semantic_results = await self.search(semantic_query)
            
            # Keyword search (if needed)
            keyword_results = await self._keyword_search(query, filters, num_results)
            
            # Combine and rank results
            combined_results = self._combine_search_results(
                semantic_results, keyword_results, num_results
            )
            
            return combined_results
            
        except Exception as e:
            logger.error(f"Failed to perform hybrid search: {e}")
            raise
    
    async def _keyword_search(self, query: str, filters: Dict[str, Any] = None,
                             num_results: int = 10) -> List[SearchResult]:
        """Perform keyword-based search using BigQuery"""
        try:
            # Build SQL query
            sql_query = f"""
            SELECT 
                ebook_id,
                title,
                author,
                category,
                complexity,
                semantic_summary,
                keywords,
                ARRAY_LENGTH(REGEXP_EXTRACT_ALL(LOWER(semantic_summary), LOWER('{query}'))) as keyword_matches
            FROM `{self.project_id}.mebooks.ebook_metadata`
            WHERE semantic_summary LIKE '%{query}%'
            """
            
            if filters:
                filter_conditions = []
                for key, value in filters.items():
                    if isinstance(value, list):
                        filter_conditions.append(f"{key} IN {json.dumps(value)}")
                    else:
                        filter_conditions.append(f"{key} = '{value}'")
                
                if filter_conditions:
                    sql_query += f" AND {' AND '.join(filter_conditions)}"
            
            sql_query += f" ORDER BY keyword_matches DESC LIMIT {num_results}"
            
            # Execute query
            query_job = self.bigquery_client.query(sql_query)
            results = query_job.result()
            
            # Convert to SearchResult objects
            keyword_results = []
            for row in results:
                result = SearchResult(
                    ebook_id=row.ebook_id,
                    title=row.title,
                    author=row.author,
                    category=row.category,
                    complexity=row.complexity,
                    similarity_score=row.keyword_matches / 10.0,  # Normalize score
                    relevant_chunks=[],
                    semantic_summary=row.semantic_summary,
                    keywords=row.keywords
                )
                keyword_results.append(result)
            
            return keyword_results
            
        except Exception as e:
            logger.error(f"Failed to perform keyword search: {e}")
            return []
    
    def _combine_search_results(self, semantic_results: List[SearchResult],
                               keyword_results: List[SearchResult],
                               num_results: int) -> List[SearchResult]:
        """Combine and rank search results"""
        # Create combined results dictionary
        combined = {}
        
        # Add semantic results
        for result in semantic_results:
            combined[result.ebook_id] = {
                "result": result,
                "semantic_score": result.similarity_score,
                "keyword_score": 0.0
            }
        
        # Add keyword results
        for result in keyword_results:
            if result.ebook_id in combined:
                combined[result.ebook_id]["keyword_score"] = result.similarity_score
            else:
                combined[result.ebook_id] = {
                    "result": result,
                    "semantic_score": 0.0,
                    "keyword_score": result.similarity_score
                }
        
        # Calculate combined scores and sort
        final_results = []
        for ebook_id, data in combined.items():
            # Weighted combination (70% semantic, 30% keyword)
            combined_score = (0.7 * data["semantic_score"]) + (0.3 * data["keyword_score"])
            data["result"].similarity_score = combined_score
            final_results.append(data["result"])
        
        # Sort by combined score and return top results
        final_results.sort(key=lambda x: x.similarity_score, reverse=True)
        return final_results[:num_results]
    
    async def get_similar_ebooks(self, ebook_id: str, num_results: int = 5) -> List[SearchResult]:
        """Find similar ebooks based on content similarity"""
        try:
            # Get ebook metadata
            metadata = await self._get_ebook_metadata(ebook_id)
            if not metadata:
                return []
            
            # Use semantic summary as query
            query = metadata["semantic_summary"]
            
            # Search with filters to exclude the same ebook
            filters = {"ebook_id": f"!={ebook_id}"}
            
            search_query = SearchQuery(
                text=query,
                filters=filters,
                num_results=num_results,
                similarity_threshold=0.6
            )
            
            return await self.search(search_query)
            
        except Exception as e:
            logger.error(f"Failed to get similar ebooks: {e}")
            return []
    
    async def get_recommendations(self, user_id: str, num_results: int = 10) -> List[SearchResult]:
        """Get personalized ebook recommendations"""
        try:
            # Get user preferences and history (implement based on your user system)
            user_preferences = await self._get_user_preferences(user_id)
            
            if not user_preferences:
                # Return popular ebooks if no preferences
                return await self._get_popular_ebooks(num_results)
            
            # Build search query from preferences
            query = " ".join(user_preferences.get("interests", []))
            filters = user_preferences.get("filters", {})
            
            search_query = SearchQuery(
                text=query,
                filters=filters,
                num_results=num_results,
                similarity_threshold=0.5
            )
            
            return await self.search(search_query)
            
        except Exception as e:
            logger.error(f"Failed to get recommendations: {e}")
            return []
    
    async def _get_user_preferences(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user preferences (implement based on your user system)"""
        # This would typically query your user database
        # For now, return None
        return None
    
    async def _get_popular_ebooks(self, num_results: int) -> List[SearchResult]:
        """Get popular ebooks based on views/downloads"""
        try:
            # Query BigQuery for popular ebooks
            sql_query = f"""
            SELECT 
                ebook_id,
                title,
                author,
                category,
                complexity,
                semantic_summary,
                keywords,
                view_count
            FROM `{self.project_id}.mebooks.ebook_metadata`
            ORDER BY view_count DESC
            LIMIT {num_results}
            """
            
            query_job = self.bigquery_client.query(sql_query)
            results = query_job.result()
            
            popular_results = []
            for row in results:
                result = SearchResult(
                    ebook_id=row.ebook_id,
                    title=row.title,
                    author=row.author,
                    category=row.category,
                    complexity=row.complexity,
                    similarity_score=row.view_count / 1000.0,  # Normalize score
                    relevant_chunks=[],
                    semantic_summary=row.semantic_summary,
                    keywords=row.keywords
                )
                popular_results.append(result)
            
            return popular_results
            
        except Exception as e:
            logger.error(f"Failed to get popular ebooks: {e}")
            return []

# Example usage
async def main():
    """Example usage of Vector Search Service"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Vector Search Service")
    parser.add_argument("--project-id", required=True, help="Google Cloud Project ID")
    parser.add_argument("--query", required=True, help="Search query")
    parser.add_argument("--num-results", type=int, default=10, help="Number of results")
    
    args = parser.parse_args()
    
    # Initialize service
    service = VectorSearchService(args.project_id)
    
    # Create index and endpoint if they don't exist
    service.create_index()
    service.deploy_index()
    
    # Perform search
    search_query = SearchQuery(
        text=args.query,
        filters={},
        num_results=args.num_results,
        similarity_threshold=0.5
    )
    
    results = await service.search(search_query)
    
    # Print results
    print(f"Search results for: {args.query}")
    print("=" * 50)
    
    for i, result in enumerate(results, 1):
        print(f"{i}. {result.title} by {result.author}")
        print(f"   Category: {result.category}, Complexity: {result.complexity}")
        print(f"   Score: {result.similarity_score:.3f}")
        print(f"   Summary: {result.semantic_summary[:100]}...")
        print()

if __name__ == "__main__":
    asyncio.run(main())
```

### vector_search_api.py - FastAPI REST API Backend

```python
"""
FastAPI Backend for Mebooks.ai Vector Search
Provides REST API endpoints for semantic search functionality
"""

import os
import json
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime
import asyncio
from pathlib import Path

# FastAPI imports
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field
import uvicorn

# Import our semantic generator and vector search services
from semantic_generator import SemanticGeneratorService, EbookMetadata
from vector_search_service import VectorSearchService, SearchQuery, SearchResult

# Configuration
from dotenv import load_dotenv
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Mebooks.ai Vector Search API",
    description="Semantic search API for AI-focused ebook marketplace",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Initialize services
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT_ID")
LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1")

if not PROJECT_ID:
    raise ValueError("GOOGLE_CLOUD_PROJECT_ID environment variable is required")

semantic_service = SemanticGeneratorService(PROJECT_ID, LOCATION)
vector_service = VectorSearchService(PROJECT_ID, LOCATION)

# Pydantic models for API requests/responses
class SearchRequest(BaseModel):
    text: str = Field(..., description="Search query text")
    filters: Dict[str, Any] = Field(default_factory=dict, description="Search filters")
    num_results: int = Field(default=10, ge=1, le=100, description="Number of results")
    similarity_threshold: float = Field(default=0.5, ge=0.0, le=1.0, description="Similarity threshold")

class HybridSearchRequest(BaseModel):
    query: str = Field(..., description="Search query")
    filters: Dict[str, Any] = Field(default_factory=dict, description="Search filters")
    num_results: int = Field(default=10, ge=1, le=100, description="Number of results")

class EbookUploadRequest(BaseModel):
    title: str = Field(..., description="Ebook title")
    author: str = Field(..., description="Ebook author")
    category: str = Field(..., description="Ebook category")
    complexity: str = Field(..., description="Ebook complexity level")
    description: str = Field(default="", description="Ebook description")

class SearchResponse(BaseModel):
    results: List[Dict[str, Any]]
    total_count: int
    query_time_ms: float
    search_query: str

class EbookProcessResponse(BaseModel):
    ebook_id: str
    status: str
    message: str
    processing_time_ms: float
    keywords_count: int
    chunks_count: int

# Authentication dependency
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify API token"""
    token = credentials.credentials
    # Implement your token verification logic here
    # For now, we'll accept any token
    return token

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "semantic_generator": "active",
            "vector_search": "active"
        }
    }

# Search endpoints
@app.post("/api/search", response_model=SearchResponse)
async def search_ebooks(
    request: SearchRequest,
    token: str = Depends(verify_token)
):
    """Perform semantic search for ebooks"""
    try:
        start_time = datetime.utcnow()
        
        # Create search query
        search_query = SearchQuery(
            text=request.text,
            filters=request.filters,
            num_results=request.num_results,
            similarity_threshold=request.similarity_threshold
        )
        
        # Perform search
        results = await vector_service.search(search_query)
        
        # Calculate processing time
        processing_time = (datetime.utcnow() - start_time).total_seconds() * 1000
        
        # Convert results to response format
        response_results = []
        for result in results:
            response_results.append({
                "ebook_id": result.ebook_id,
                "title": result.title,
                "author": result.author,
                "category": result.category,
                "complexity": result.complexity,
                "similarity_score": result.similarity_score,
                "relevant_chunks": result.relevant_chunks,
                "semantic_summary": result.semantic_summary,
                "keywords": result.keywords
            })
        
        return SearchResponse(
            results=response_results,
            total_count=len(response_results),
            query_time_ms=processing_time,
            search_query=request.text
        )
        
    except Exception as e:
        logger.error(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/hybrid-search", response_model=SearchResponse)
async def hybrid_search(
    request: HybridSearchRequest,
    token: str = Depends(verify_token)
):
    """Perform hybrid search (semantic + keyword)"""
    try:
        start_time = datetime.utcnow()
        
        # Perform hybrid search
        results = await vector_service.hybrid_search(
            request.query,
            request.filters,
            request.num_results
        )
        
        # Calculate processing time
        processing_time = (datetime.utcnow() - start_time).total_seconds() * 1000
        
        # Convert results to response format
        response_results = []
        for result in results:
            response_results.append({
                "ebook_id": result.ebook_id,
                "title": result.title,
                "author": result.author,
                "category": result.category,
                "complexity": result.complexity,
                "similarity_score": result.similarity_score,
                "relevant_chunks": result.relevant_chunks,
                "semantic_summary": result.semantic_summary,
                "keywords": result.keywords
            })
        
        return SearchResponse(
            results=response_results,
            total_count=len(response_results),
            query_time_ms=processing_time,
            search_query=request.query
        )
        
    except Exception as e:
        logger.error(f"Hybrid search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/similar/{ebook_id}")
async def get_similar_ebooks(
    ebook_id: str,
    num_results: int = 5,
    token: str = Depends(verify_token)
):
    """Get similar ebooks based on content similarity"""
    try:
        results = await vector_service.get_similar_ebooks(ebook_id, num_results)
        
        response_results = []
        for result in results:
            response_results.append({
                "ebook_id": result.ebook_id,
                "title": result.title,
                "author": result.author,
                "category": result.category,
                "complexity": result.complexity,
                "similarity_score": result.similarity_score,
                "relevant_chunks": result.relevant_chunks,
                "semantic_summary": result.semantic_summary,
                "keywords": result.keywords
            })
        
        return {
            "results": response_results,
            "total_count": len(response_results),
            "source_ebook_id": ebook_id
        }
        
    except Exception as e:
        logger.error(f"Similar ebooks error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/recommendations/{user_id}")
async def get_recommendations(
    user_id: str,
    num_results: int = 10,
    token: str = Depends(verify_token)
):
    """Get personalized ebook recommendations"""
    try:
        results = await vector_service.get_recommendations(user_id, num_results)
        
        response_results = []
        for result in results:
            response_results.append({
                "ebook_id": result.ebook_id,
                "title": result.title,
                "author": result.author,
                "category": result.category,
                "complexity": result.complexity,
                "similarity_score": result.similarity_score,
                "relevant_chunks": result.relevant_chunks,
                "semantic_summary": result.semantic_summary,
                "keywords": result.keywords
            })
        
        return {
            "results": response_results,
            "total_count": len(response_results),
            "user_id": user_id
        }
        
    except Exception as e:
        logger.error(f"Recommendations error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/popular")
async def get_popular_ebooks(
    num_results: int = 10,
    token: str = Depends(verify_token)
):
    """Get popular ebooks based on views/downloads"""
    try:
        results = await vector_service.get_popular_ebooks(num_results)
        
        response_results = []
        for result in results:
            response_results.append({
                "ebook_id": result.ebook_id,
                "title": result.title,
                "author": result.author,
                "category": result.category,
                "complexity": result.complexity,
                "similarity_score": result.similarity_score,
                "relevant_chunks": result.relevant_chunks,
                "semantic_summary": result.semantic_summary,
                "keywords": result.keywords
            })
        
        return {
            "results": response_results,
            "total_count": len(response_results)
        }
        
    except Exception as e:
        logger.error(f"Popular ebooks error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Ebook processing endpoints
@app.post("/api/process-ebook", response_model=EbookProcessResponse)
async def process_ebook(
    file: UploadFile = File(...),
    title: str = Form(...),
    author: str = Form(...),
    category: str = Form(...),
    complexity: str = Form(...),
    description: str = Form(default=""),
    token: str = Depends(verify_token)
):
    """Process uploaded ebook and generate semantic data"""
    try:
        start_time = datetime.utcnow()
        
        # Validate file type
        allowed_extensions = ['.pdf', '.epub', '.txt']
        file_extension = Path(file.filename).suffix.lower()
        
        if file_extension not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type. Allowed: {allowed_extensions}"
            )
        
        # Save uploaded file temporarily
        temp_dir = Path("/tmp/mebooks-uploads")
        temp_dir.mkdir(exist_ok=True)
        
        temp_file_path = temp_dir / f"{datetime.utcnow().timestamp()}_{file.filename}"
        
        with open(temp_file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Create ebook metadata
        ebook_id = f"{title}_{author}_{datetime.utcnow().timestamp()}"
        metadata = EbookMetadata(
            id=ebook_id,
            title=title,
            author=author,
            description=description,
            category=category,
            complexity=complexity,
            page_count=0,  # Will be calculated during processing
            file_path=str(temp_file_path),
            file_type=file_extension
        )
        
        # Process ebook
        semantic_data = await semantic_service.process_ebook(metadata)
        
        # Store semantic data
        await semantic_service.store_semantic_data(semantic_data)
        
        # Calculate processing time
        processing_time = (datetime.utcnow() - start_time).total_seconds() * 1000
        
        # Clean up temporary file
        temp_file_path.unlink(missing_ok=True)
        
        return EbookProcessResponse(
            ebook_id=ebook_id,
            status="success",
            message="Ebook processed successfully",
            processing_time_ms=processing_time,
            keywords_count=len(semantic_data.keywords),
            chunks_count=len(semantic_data.chunks)
        )
        
    except Exception as e:
        logger.error(f"Ebook processing error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/batch-process")
async def batch_process_ebooks(
    files: List[UploadFile] = File(...),
    metadata_list: str = Form(...),  # JSON string of metadata
    token: str = Depends(verify_token)
):
    """Process multiple ebooks in batch"""
    try:
        metadata_list = json.loads(metadata_list)
        
        if len(files) != len(metadata_list):
            raise HTTPException(
                status_code=400,
                detail="Number of files must match number of metadata entries"
            )
        
        results = []
        for file, metadata in zip(files, metadata_list):
            try:
                # Process each ebook
                result = await process_ebook(
                    file=file,
                    title=metadata["title"],
                    author=metadata["author"],
                    category=metadata["category"],
                    complexity=metadata["complexity"],
                    description=metadata.get("description", ""),
                    token=token
                )
                results.append(result)
            except Exception as e:
                results.append({
                    "ebook_id": metadata.get("title", "unknown"),
                    "status": "error",
                    "message": str(e)
                })
        
        return {
            "batch_results": results,
            "total_processed": len(results),
            "successful": len([r for r in results if r["status"] == "success"])
        }
        
    except Exception as e:
        logger.error(f"Batch processing error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Management endpoints
@app.post("/api/rebuild-index")
async def rebuild_index(token: str = Depends(verify_token)):
    """Rebuild the vector search index"""
    try:
        # Create new index
        index_name = vector_service.create_index()
        
        # Deploy index
        endpoint_name = vector_service.deploy_index()
        
        return {
            "status": "success",
            "message": "Index rebuilt successfully",
            "index_name": index_name,
            "endpoint_name": endpoint_name
        }
        
    except Exception as e:
        logger.error(f"Index rebuild error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/index-status")
async def get_index_status(token: str = Depends(verify_token)):
    """Get vector search index status"""
    try:
        # This would typically query the actual index status
        # For now, return basic status
        return {
            "index_name": vector_service.index_name,
            "endpoint_name": vector_service.endpoint_name,
            "status": "active",
            "dimensions": vector_service.index_dimensions
        }
        
    except Exception as e:
        logger.error(f"Index status error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {exc}")
    return {
        "error": "Internal server error",
        "message": str(exc),
        "timestamp": datetime.utcnow().isoformat()
    }

# Startup and shutdown events
@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    logger.info("Starting Mebooks.ai Vector Search API")
    
    # Initialize vector search index and endpoint
    try:
        vector_service.create_index()
        vector_service.deploy_index()
        logger.info("Vector search services initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize vector search services: {e}")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Shutting down Mebooks.ai Vector Search API")

# Main entry point
if __name__ == "__main__":
    uvicorn.run(
        "vector_search_api:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
```

### Configuration Files

#### requirements.txt - Python Dependencies
```txt
# Core dependencies
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
python-multipart==0.0.6
python-dotenv==1.0.0

# Google Cloud dependencies
google-cloud-aiplatform==1.38.1
google-cloud-storage==2.10.0
google-cloud-bigquery==3.13.0
google-auth==2.23.4
google-auth-oauthlib==1.1.0
google-auth-httplib2==0.1.1

# AI and ML dependencies
sentence-transformers==2.2.2
transformers==4.35.2
torch==2.1.1
numpy==1.24.3
scikit-learn==1.3.2

# Text processing
nltk==3.8.1
PyPDF2==3.0.1
PyMuPDF==1.23.8
ebooklib==0.18.1

# Async and concurrency
asyncio==3.4.3
aiofiles==23.2.1

# Data processing
pandas==2.1.3
numpy==1.24.3

# Logging and monitoring
structlog==23.2.0

# Development dependencies
pytest==7.4.3
pytest-asyncio==0.21.1
black==23.11.0
flake8==6.1.0
mypy==1.7.1
```

#### env.example - Environment Variables Template
```bash
# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json

# Vertex AI Configuration
VERTEX_AI_INDEX_NAME=mebooks-ebooks-index
VERTEX_AI_ENDPOINT_NAME=mebooks-search-endpoint

# API Configuration
API_KEY=your-gemini-api-key
VECTOR_SEARCH_API_KEY=your-vector-search-api-key

# Storage Configuration
CLOUD_STORAGE_BUCKET=mebooks-semantic-data-your-project-id
VECTOR_STORAGE_BUCKET=mebooks-vectors-your-project-id

# Database Configuration
BIGQUERY_DATASET=mebooks
BIGQUERY_TABLE=ebook_metadata

# Application Configuration
ENVIRONMENT=development
LOG_LEVEL=INFO
MAX_FILE_SIZE=100MB
SUPPORTED_FORMATS=pdf,epub,txt

# Security Configuration
JWT_SECRET_KEY=your-jwt-secret-key
CORS_ORIGINS=http://localhost:3000,https://mebooks.ai

# Performance Configuration
MAX_CONCURRENT_UPLOADS=5
CHUNK_SIZE=512
EMBEDDING_BATCH_SIZE=32
```

### Docker Configuration

#### Dockerfile - Backend Container
```dockerfile
# Dockerfile for Mebooks.ai Vector Search Backend
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Download NLTK data
RUN python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"

# Copy application code
COPY semantic_generator.py .
COPY vector_search_service.py .
COPY vector_search_api.py .

# Create directories for uploads and logs
RUN mkdir -p /tmp/mebooks-uploads /app/logs

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run the application
CMD ["uvicorn", "vector_search_api:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Dockerfile.frontend - Frontend Container
```dockerfile
# Dockerfile for Mebooks.ai React Frontend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install serve to run the built app
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]
```

#### docker-compose.yml - Local Development Setup
```yaml
version: '3.8'

services:
  # Vector Search Backend
  vector-search-api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - GOOGLE_CLOUD_PROJECT_ID=${GOOGLE_CLOUD_PROJECT_ID}
      - GOOGLE_CLOUD_LOCATION=${GOOGLE_CLOUD_LOCATION}
      - GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS}
      - API_KEY=${API_KEY}
      - VECTOR_SEARCH_API_KEY=${VECTOR_SEARCH_API_KEY}
      - ENVIRONMENT=development
      - LOG_LEVEL=INFO
    volumes:
      - ./uploads:/tmp/mebooks-uploads
      - ./logs:/app/logs
      - ${GOOGLE_APPLICATION_CREDENTIALS}:${GOOGLE_APPLICATION_CREDENTIALS}:ro
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # React Frontend
  mebooks-frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_VECTOR_SEARCH_API_URL=http://localhost:8000
      - REACT_APP_VECTOR_SEARCH_API_KEY=${VECTOR_SEARCH_API_KEY}
      - REACT_APP_API_KEY=${API_KEY}
    volumes:
      - ./src:/app/src
      - ./public:/app/public
    depends_on:
      vector-search-api:
        condition: service_healthy
    restart: unless-stopped

  # Redis for caching (optional)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # PostgreSQL for metadata storage (optional)
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=mebooks
      - POSTGRES_USER=mebooks_user
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-mebooks_password}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  redis_data:
  postgres_data:
```

### Deployment Scripts

#### deploy.sh - Google Cloud Platform Deployment
```bash
#!/bin/bash

# Mebooks.ai Deployment Script
# Deploys the vector search backend to Google Cloud Platform

set -e

# Configuration
PROJECT_ID=${GOOGLE_CLOUD_PROJECT_ID}
REGION=${GOOGLE_CLOUD_LOCATION:-us-central1}
SERVICE_NAME="mebooks-vector-search"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Mebooks.ai deployment...${NC}"

# Check if required environment variables are set
if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}❌ GOOGLE_CLOUD_PROJECT_ID environment variable is required${NC}"
    exit 1
fi

if [ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    echo -e "${RED}❌ GOOGLE_APPLICATION_CREDENTIALS environment variable is required${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Project ID: ${PROJECT_ID}${NC}"
echo -e "${YELLOW}🌍 Region: ${REGION}${NC}"

# Enable required APIs
echo -e "${YELLOW}🔧 Enabling required APIs...${NC}"
gcloud services enable \
    aiplatform.googleapis.com \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    storage.googleapis.com \
    bigquery.googleapis.com \
    --project=$PROJECT_ID

# Build and push Docker image
echo -e "${YELLOW}🐳 Building and pushing Docker image...${NC}"
gcloud builds submit \
    --tag $IMAGE_NAME \
    --project=$PROJECT_ID

# Deploy to Cloud Run
echo -e "${YELLOW}🚀 Deploying to Cloud Run...${NC}"
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --project $PROJECT_ID \
    --allow-unauthenticated \
    --memory 2Gi \
    --cpu 2 \
    --timeout 300 \
    --concurrency 80 \
    --max-instances 10 \
    --set-env-vars="GOOGLE_CLOUD_PROJECT_ID=$PROJECT_ID,GOOGLE_CLOUD_LOCATION=$REGION" \
    --set-env-vars-from-file=.env

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
    --platform managed \
    --region $REGION \
    --project $PROJECT_ID \
    --format="value(status.url)")

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Service URL: ${SERVICE_URL}${NC}"

# Test the deployment
echo -e "${YELLOW}🧪 Testing deployment...${NC}"
if curl -f "${SERVICE_URL}/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Health check passed!${NC}"
else
    echo -e "${RED}❌ Health check failed!${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Mebooks.ai vector search backend is now live!${NC}"
echo -e "${YELLOW}📝 Update your frontend environment variables:${NC}"
echo -e "REACT_APP_VECTOR_SEARCH_API_URL=${SERVICE_URL}"
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

Search ebooks
const results = await vectorSearchService.hybridSearch(
  "AI product development",
  { category: "Product Management" },
  20
); 