import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { vectorSearchBridge } from "./vectorSearchBridge";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      service: "mebooks-ai"
    });
  });

  // Search endpoint for ebooks (hybrid: vector search with fallback)
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.query;
      const useSemanticSearch = req.query.semantic === 'true';
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ 
          message: "Search query is required" 
        });
      }

      let results;

      // Try vector search first if requested or if available
      if (useSemanticSearch || await vectorSearchBridge.checkServiceHealth()) {
        try {
          results = await vectorSearchBridge.semanticSearch(query, {
            numResults: 20,
            similarityThreshold: 0.1
          });
          console.log(`Vector search returned ${results.length} results`);
        } catch (vectorError) {
          console.warn('Vector search failed, falling back to traditional search:', vectorError);
          results = await storage.searchEbooks(query);
        }
      } else {
        // Fallback to traditional search
        results = await storage.searchEbooks(query);
      }

      res.json(results);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ 
        message: "Search failed. Please try again." 
      });
    }
  });

  // Get all ebooks
  app.get("/api/ebooks", async (_req, res) => {
    try {
      const ebooks = await storage.getAllEbooks();
      res.json(ebooks);
    } catch (error) {
      console.error('Get ebooks error:', error);
      res.status(500).json({ 
        message: "Failed to fetch ebooks" 
      });
    }
  });

  // Get similar ebooks using vector search
  app.get("/api/ebooks/:id/similar", async (req, res) => {
    try {
      const ebookId = req.params.id;
      const numResults = parseInt(req.query.num_results as string) || 10;

      if (await vectorSearchBridge.checkServiceHealth()) {
        const similarEbooks = await vectorSearchBridge.getSimilarEbooks(ebookId, numResults);
        res.json(similarEbooks);
      } else {
        // Fallback: return random ebooks from same category
        const allEbooks = await storage.getAllEbooks();
        const currentEbook = await storage.getEbookById(ebookId);
        
        if (currentEbook) {
          const similarEbooks = allEbooks
            .filter(e => e.category === currentEbook.category && e.id !== currentEbook.id)
            .slice(0, numResults);
          res.json(similarEbooks);
        } else {
          res.json([]);
        }
      }
    } catch (error) {
      console.error('Similar ebooks error:', error);
      res.status(500).json({ 
        message: "Failed to fetch similar ebooks" 
      });
    }
  });

  // Vector search service status endpoint
  app.get("/api/search/status", async (_req, res) => {
    try {
      const status = await vectorSearchBridge.getServiceStatus();
      res.json(status);
    } catch (error) {
      console.error('Vector search status error:', error);
      res.status(500).json({ 
        message: "Failed to get search service status" 
      });
    }
  });

  // Upload ebook for vector indexing (for future use)
  app.post("/api/ebooks/upload", async (_req, res) => {
    try {
      // This would handle file upload and indexing
      // For now, return a placeholder response
      res.json({ 
        success: false, 
        message: "Vector search service integration required for ebook upload" 
      });
    } catch (error) {
      console.error('Ebook upload error:', error);
      res.status(500).json({ 
        message: "Failed to upload ebook" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}