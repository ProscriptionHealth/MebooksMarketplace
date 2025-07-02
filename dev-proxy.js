#!/usr/bin/env node
import { spawn } from 'child_process';
import { createServer } from 'http';
import httpProxy from 'http-proxy';

// Start Express server on port 5000
const expressServer = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

// Wait a moment for Express server to start
setTimeout(() => {
  // Create proxy server to route API calls
  const proxy = httpProxy.createProxyServer({});
  
  const proxyServer = createServer((req, res) => {
    if (req.url.startsWith('/api')) {
      // Proxy API calls to Express server
      proxy.web(req, res, { target: 'http://localhost:5000' });
    } else {
      // Let Vite handle everything else
      proxy.web(req, res, { target: 'http://localhost:5173' });
    }
  });
  
  proxyServer.listen(3000, () => {
    console.log('Proxy server listening on port 3000');
    console.log('API calls -> Express (port 5000)');
    console.log('Frontend -> Vite (port 5173)');
  });
}, 2000);

// Handle graceful shutdown
process.on('SIGINT', () => {
  expressServer.kill('SIGINT');
  process.exit(0);
});