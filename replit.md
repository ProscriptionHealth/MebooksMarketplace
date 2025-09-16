# Vebooks.ai - Educational Content Platform

## Overview
This is an AI-powered educational content creation platform built with React and TypeScript. It was successfully imported from GitHub and configured to run in the Replit environment.

## Project Status
- **Type**: Frontend-only React application
- **Status**: Successfully running in development mode
- **Port**: 5000 (configured for Replit)
- **Host**: 0.0.0.0 (allows Replit proxy)

## Architecture
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Routing**: Wouter for client-side routing
- **State Management**: React Query + React Context

## Recent Changes (Import Setup)
- Configured Vite to run on port 5000 with host 0.0.0.0 for Replit compatibility
- Updated package.json scripts to focus on frontend development
- Created missing page components that were referenced but not present
- Cleaned up TypeScript configuration to remove non-existent server references
- Set up deployment configuration for Replit autoscale
- Added missing tsconfig.node.json for Vite build process

## Project Structure
```
/
├── client/               # Frontend source code
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components and auth pages
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions
│   └── index.html        # HTML entry point
├── package.json          # Project dependencies and scripts
├── vite.config.ts        # Vite configuration (port 5000, client root)
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Development
- Run `npm run dev` to start the development server
- The application will be available on port 5000
- Hot module replacement is enabled for fast development

## Features
- AI-powered educational content creation
- Personalized learning experiences
- Multiple content types (books, videos, workbooks)
- User authentication and profiles
- Responsive design with dark/light themes
- Accessibility features

## User Preferences
- This is a frontend-focused educational platform
- Clean, modern UI design with emphasis on usability
- Component-based architecture for maintainability