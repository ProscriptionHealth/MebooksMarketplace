# Mebooks.ai - AI-Powered Ebook Marketplace

This contains everything you need to run your Mebooks.ai app locally.

## Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

## Installation

### Option 1: Automatic Installation (Windows)
1. Double-click `install-dependencies.bat` or run `install-dependencies.ps1` in PowerShell
2. Follow the prompts

### Option 2: Manual Installation
1. Open terminal/command prompt in the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
2. Copy `env.example` to `.env.local` and fill in your API keys

## Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Troubleshooting

### Linter Errors
If you see TypeScript/linter errors about missing modules:
1. Make sure you've run `npm install`
2. Check that Node.js is properly installed
3. Try deleting `node_modules` and running `npm install` again

### Build Issues
If you encounter build issues:
1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install` again

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
