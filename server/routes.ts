import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Search endpoint for ebooks
  app.get("/api/search", async (req, res) => {
    try {
      const { query } = req.query;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ 
          message: "Search query is required" 
        });
      }

      // In a real implementation, this would use the Gemini service
      // and search through a database of ebooks
      const results = await storage.searchEbooks(query);
      
      res.json(results);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ 
        message: "Search failed. Please try again." 
      });
    }
  });

  // Get all ebooks
  app.get("/api/ebooks", async (req, res) => {
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

  // Get ebook by ID
  app.get("/api/ebooks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const ebook = await storage.getEbookById(id);
      
      if (!ebook) {
        return res.status(404).json({ 
          message: "Ebook not found" 
        });
      }
      
      res.json(ebook);
    } catch (error) {
      console.error('Get ebook error:', error);
      res.status(500).json({ 
        message: "Failed to fetch ebook" 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      service: "mebooks-ai"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
