/**
 * Simple in-memory caching mechanism for analytics data
 * 
 * This provides a way to store expensive calculations or API results
 * with configurable expiration times to avoid repeated processing
 */

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

class AnalyticsCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  
  /**
   * Set a value in the cache with a specified TTL (time to live)
   * @param key The cache key
   * @param value The value to cache
   * @param ttl Time to live in milliseconds (default: 5 minutes)
   */
  set<T>(key: string, value: T, ttl: number = 5 * 60 * 1000): void {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data: value, expiry });
  }
  
  /**
   * Get a value from the cache
   * @param key The cache key
   * @returns The cached value or undefined if not found or expired
   */
  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return undefined;
    }
    
    // Check if entry has expired
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    
    return entry.data as T;
  }
  
  /**
   * Remove a specific item from the cache
   * @param key The cache key
   */
  remove(key: string): void {
    this.cache.delete(key);
  }
  
  /**
   * Clear all items from the cache
   */
  clear(): void {
    this.cache.clear();
  }
  
  /**
   * Remove all expired items from the cache
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
  }
  
  /**
   * Get the number of items in the cache
   */
  get size(): number {
    return this.cache.size;
  }
  
  /**
   * Get or set a cached value with a computation function
   * @param key The cache key
   * @param compute Function to compute the value if not in cache
   * @param ttl Time to live in milliseconds
   * @returns The cached or computed value
   */
  async getOrCompute<T>(
    key: string, 
    compute: () => Promise<T> | T, 
    ttl: number = 5 * 60 * 1000
  ): Promise<T> {
    const cachedValue = this.get<T>(key);
    
    if (cachedValue !== undefined) {
      return cachedValue;
    }
    
    const computedValue = await compute();
    this.set(key, computedValue, ttl);
    return computedValue;
  }
}

// Export a singleton instance
export const analyticsCache = new AnalyticsCache();