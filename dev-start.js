#!/usr/bin/env node
import { spawn } from 'child_process';

console.log('Starting Mebooks.ai on port 5000...');

// Start vite with correct port configuration
const vite = spawn('npx', ['vite', '--port', '5000', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

vite.on('error', (error) => {
  console.error('Failed to start Vite:', error);
  process.exit(1);
});

vite.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down Vite...');
  vite.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\nShutting down Vite...');
  vite.kill('SIGTERM');
});