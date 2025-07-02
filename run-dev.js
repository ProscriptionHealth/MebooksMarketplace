#!/usr/bin/env node

// Set NODE_ENV to development if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// Import and run the server
import('./server/index.ts').catch(console.error);