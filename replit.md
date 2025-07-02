# Mebooks.ai - AI-Powered Ebook Marketplace

## Overview

Mebooks.ai is a specialized AI-focused ebook marketplace with a unique $0.25 flat-fee model. The platform serves AI practitioners, researchers, and knowledge seekers through sophisticated semantic search, semantic matching, and AI-powered content discovery. The core mission is to enable frictionless knowledge transfer between AI experts and practitioners while supporting authors with transparent, equitable monetization.

## System Architecture

### Frontend Architecture
- **Framework**: React 19.1.0 with TypeScript 5.7.2
- **Build Tool**: Vite 6.3.5 for fast development and optimized builds
- **Styling**: Tailwind CSS with custom AI-focused color palette
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks (useState, useEffect, useCallback) with TanStack Query for server state

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Caching**: Redis for search results, vector embeddings, and session data
- **API Design**: RESTful endpoints with JSON responses
- **Build**: ESBuild for server-side bundling

### UI Components
- **Component Library**: Radix UI primitives with shadcn/ui styling
- **Design System**: Custom design tokens with AI-themed colors (ai-teal, ai-blue, ai-purple, etc.)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Key Components

### Core Data Models
- **Users**: Authentication, roles (user/author/admin), Stripe integration
- **Ebooks**: Content metadata, pricing, categorization, complexity ratings
- **Orders**: Transaction tracking with $0.25 platform fee model
- **Categories**: Hierarchical organization of content

### Search and Discovery
- **AI-Powered Search**: Google Gemini 2.5 Flash integration for intelligent query analysis
- **Semantic Matching**: Topic extraction and content recommendation
- **Bundle Suggestions**: AI-driven learning path recommendations

### Content Management
- **File Storage**: Support for PDF/EPUB formats
- **Cover Images**: Unsplash integration for placeholder covers
- **Metadata**: Complexity ratings, prerequisites, framework tags

## Data Flow

1. **Search Query Processing**:
   - User input → Gemini AI analysis → Topic extraction → Database search → Results display

2. **Content Discovery**:
   - AI analyzes user intent → Matches against ebook metadata → Provides curated recommendations

3. **Purchase Flow**:
   - Content selection → $0.25 platform fee calculation → Payment processing → Access granted

4. **Author Publishing**:
   - Content upload → Metadata entry → AI-assisted categorization → Marketplace listing

## External Dependencies

### AI Services
- **Google Gemini AI**: Query analysis, content matching, and recommendation engine
- **API Integration**: @google/genai package for seamless AI functionality

### Database and Storage
- **Neon Database**: Serverless PostgreSQL for scalable data storage
- **Drizzle ORM**: Type-safe database queries and migrations
- **Connection Pool**: @neondatabase/serverless for optimized connections

### Payment Processing
- **Stripe Connect**: Multi-party payment system for author payouts
- **Platform Fee Model**: Fixed $0.25 fee per transaction

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Custom Design Tokens**: AI-themed color palette and typography

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for Replit development environment
- **Hot Reload**: Vite HMR for fast development iteration
- **Environment Variables**: DATABASE_URL and API keys management

### Production Build
- **Frontend**: Vite build with optimized assets
- **Backend**: ESBuild bundling for Node.js deployment
- **Static Assets**: Served from dist/public directory

### Database Management
- **Migrations**: Drizzle Kit for schema management
- **Push Deployment**: `npm run db:push` for schema updates

## Changelog

```
Changelog:
- July 2, 2025. Major dependency upgrades: React 19.1.0, Vite 6.3.5, TypeScript 5.7.2, integrated Redis caching system
- June 30, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```