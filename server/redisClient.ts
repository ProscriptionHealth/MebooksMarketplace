/**
 * Redis Client Service for Mebooks.ai
 * Provides caching functionality for search results, ebook metadata, and session data
 */

import { createClient, RedisClientType } from 'redis';
import { Ebook } from '@shared/schema';

// Redis configuration
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const CACHE_TTL = {
  SEARCH_RESULTS: 300, // 5 minutes
  EBOOK_METADATA: 3600, // 1 hour
  VECTOR_SEARCH: 600, // 10 minutes
  SIMILAR_EBOOKS: 1800, // 30 minutes
  SERVICE_STATUS: 60, // 1 minute
};

export class RedisClientService {
  private client: RedisClientType;
  private isConnected: boolean = false;

  constructor() {
    this.client = createClient({
      url: REDIS_URL,
      socket: {
        reconnectStrategy: (retries: number) => {
          // Stop retrying after 3 attempts to avoid spam
          if (retries > 3) return false;
          return Math.min(retries * 1000, 3000);
        },
        connectTimeout: 5000,
      },
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.client.on('connect', () => {
      console.log('Redis: Connecting...');
    });

    this.client.on('ready', () => {
      console.log('Redis: Connected and ready');
      this.isConnected = true;
    });

    this.client.on('error', (error) => {
      console.warn('Redis: Connection error -', error.message);
      this.isConnected = false;
    });

    this.client.on('end', () => {
      console.log('Redis: Connection closed');
      this.isConnected = false;
    });
  }

  /**
   * Initialize Redis connection
   */
  async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      console.warn('Redis: Failed to connect -', error);
      this.isConnected = false;
    }
  }

  /**
   * Close Redis connection
   */
  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
      this.isConnected = false;
    } catch (error) {
      console.warn('Redis: Error during disconnect -', error);
    }
  }

  /**
   * Check if Redis is available
   */
  isAvailable(): boolean {
    return this.isConnected;
  }

  /**
   * Cache search results
   */
  async cacheSearchResults(query: string, results: Ebook[]): Promise<void> {
    if (!this.isConnected) return;

    try {
      const key = `search:${this.generateCacheKey(query)}`;
      await this.client.setEx(
        key,
        CACHE_TTL.SEARCH_RESULTS,
        JSON.stringify(results)
      );
    } catch (error) {
      console.warn('Redis: Failed to cache search results -', error);
    }
  }

  /**
   * Get cached search results
   */
  async getCachedSearchResults(query: string): Promise<Ebook[] | null> {
    if (!this.isConnected) return null;

    try {
      const key = `search:${this.generateCacheKey(query)}`;
      const cached = await this.client.get(key);
      
      if (cached) {
        return JSON.parse(cached) as Ebook[];
      }
      return null;
    } catch (error) {
      console.warn('Redis: Failed to get cached search results -', error);
      return null;
    }
  }

  /**
   * Cache vector search results
   */
  async cacheVectorSearchResults(query: string, results: Ebook[]): Promise<void> {
    if (!this.isConnected) return;

    try {
      const key = `vector:${this.generateCacheKey(query)}`;
      await this.client.setEx(
        key,
        CACHE_TTL.VECTOR_SEARCH,
        JSON.stringify(results)
      );
    } catch (error) {
      console.warn('Redis: Failed to cache vector search results -', error);
    }
  }

  /**
   * Get cached vector search results
   */
  async getCachedVectorSearchResults(query: string): Promise<Ebook[] | null> {
    if (!this.isConnected) return null;

    try {
      const key = `vector:${this.generateCacheKey(query)}`;
      const cached = await this.client.get(key);
      
      if (cached) {
        return JSON.parse(cached) as Ebook[];
      }
      return null;
    } catch (error) {
      console.warn('Redis: Failed to get cached vector search results -', error);
      return null;
    }
  }

  /**
   * Cache similar ebooks
   */
  async cacheSimilarEbooks(ebookId: string, similarEbooks: Ebook[]): Promise<void> {
    if (!this.isConnected) return;

    try {
      const key = `similar:${ebookId}`;
      await this.client.setEx(
        key,
        CACHE_TTL.SIMILAR_EBOOKS,
        JSON.stringify(similarEbooks)
      );
    } catch (error) {
      console.warn('Redis: Failed to cache similar ebooks -', error);
    }
  }

  /**
   * Get cached similar ebooks
   */
  async getCachedSimilarEbooks(ebookId: string): Promise<Ebook[] | null> {
    if (!this.isConnected) return null;

    try {
      const key = `similar:${ebookId}`;
      const cached = await this.client.get(key);
      
      if (cached) {
        return JSON.parse(cached) as Ebook[];
      }
      return null;
    } catch (error) {
      console.warn('Redis: Failed to get cached similar ebooks -', error);
      return null;
    }
  }

  /**
   * Cache service status
   */
  async cacheServiceStatus(service: string, status: any): Promise<void> {
    if (!this.isConnected) return;

    try {
      const key = `status:${service}`;
      await this.client.setEx(
        key,
        CACHE_TTL.SERVICE_STATUS,
        JSON.stringify(status)
      );
    } catch (error) {
      console.warn('Redis: Failed to cache service status -', error);
    }
  }

  /**
   * Get cached service status
   */
  async getCachedServiceStatus(service: string): Promise<any | null> {
    if (!this.isConnected) return null;

    try {
      const key = `status:${service}`;
      const cached = await this.client.get(key);
      
      if (cached) {
        return JSON.parse(cached);
      }
      return null;
    } catch (error) {
      console.warn('Redis: Failed to get cached service status -', error);
      return null;
    }
  }

  /**
   * Clear cache for a specific pattern
   */
  async clearCachePattern(pattern: string): Promise<void> {
    if (!this.isConnected) return;

    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      console.warn('Redis: Failed to clear cache pattern -', error);
    }
  }

  /**
   * Clear all cache
   */
  async clearAllCache(): Promise<void> {
    if (!this.isConnected) return;

    try {
      await this.client.flushDb();
    } catch (error) {
      console.warn('Redis: Failed to clear all cache -', error);
    }
  }

  /**
   * Get cache statistics
   */
  async getCacheStats(): Promise<{
    connected: boolean;
    keyCount: number;
    memoryUsage?: string;
    hits?: number;
    misses?: number;
  }> {
    if (!this.isConnected) {
      return { connected: false, keyCount: 0 };
    }

    try {
      const keyCount = await this.client.dbSize();
      const info = await this.client.info('memory');
      
      // Parse memory usage from info string
      const memoryMatch = info.match(/used_memory_human:(.+)/);
      const memoryUsage = memoryMatch ? memoryMatch[1].trim() : 'Unknown';

      return {
        connected: true,
        keyCount,
        memoryUsage,
      };
    } catch (error) {
      console.warn('Redis: Failed to get cache stats -', error);
      return { connected: this.isConnected, keyCount: 0 };
    }
  }

  /**
   * Generate a consistent cache key from a query string
   */
  private generateCacheKey(query: string): string {
    // Normalize query and create a hash-like key
    return query
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '')
      .substring(0, 50); // Limit key length
  }
}

// Export singleton instance
export const redisClient = new RedisClientService();