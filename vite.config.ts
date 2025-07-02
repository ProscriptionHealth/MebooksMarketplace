import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: false,
      allow: [".."],
    },
    host: "0.0.0.0",
    port: 5000,
    proxy: {
      // Proxy Python FastAPI vector search service
      "/api/vector": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/vector/, "/api"),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Vector search service proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying vector search request:', req.method, req.url);
          });
        }
      },
      // Health check for vector search service
      "/api/vector-health": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/vector-health/, "/health"),
      }
    }
  },
  optimizeDeps: {
    exclude: ["path-to-regexp"],
    force: true,
  },
  define: {
    // Make environment variables available to frontend
    'import.meta.env.VITE_VECTOR_SEARCH_ENABLED': JSON.stringify(
      process.env.VECTOR_SEARCH_SERVICE_URL || 'http://localhost:8000'
    )
  }
});