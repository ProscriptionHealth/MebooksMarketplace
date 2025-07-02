import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      service: "mebooks-ai"
    });
  });

  // Search endpoint for ebooks
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.query;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ 
          message: "Search query is required" 
        });
      }

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

  const httpServer = createServer(app);
  return httpServer;
}