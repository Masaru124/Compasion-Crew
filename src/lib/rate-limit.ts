/**
 * In-memory rate limiter for server actions.
 * Tracks attempts by key (e.g. IP address) within a sliding time window.
 * Entries auto-expire after the window passes.
 *
 * NOTE: This resets on server restart and is per-instance only.
 * For production at scale, replace with Redis-backed rate limiting.
 */

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

// Periodic cleanup every 5 minutes
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [, store] of stores) {
      for (const [key, entry] of store) {
        if (now - entry.firstAttempt > 30 * 60 * 1000) {
          store.delete(key);
        }
      }
    }
  }, 5 * 60 * 1000);
  // Allow process to exit without waiting for this timer
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

/**
 * Creates a rate limiter instance with configurable limits.
 *
 * @param name - Unique name for this limiter (e.g. "login", "story-submit")
 * @param maxAttempts - Maximum number of attempts allowed within the window
 * @param windowMs - Time window in milliseconds
 */
export function createRateLimiter(name: string, maxAttempts: number, windowMs: number) {
  if (!stores.has(name)) {
    stores.set(name, new Map());
  }
  ensureCleanup();

  const store = stores.get(name)!;

  return {
    /**
     * Check if the given key has exceeded the rate limit.
     * If not exceeded, increments the counter.
     *
     * @param key - Identifier to rate limit (e.g. IP address)
     * @returns Object with `limited` boolean and `retryAfterMs` if limited
     */
    check(key: string): { limited: boolean; retryAfterMs?: number } {
      const now = Date.now();
      const entry = store.get(key);

      if (!entry) {
        store.set(key, { count: 1, firstAttempt: now });
        return { limited: false };
      }

      // Window has expired — reset
      if (now - entry.firstAttempt >= windowMs) {
        store.set(key, { count: 1, firstAttempt: now });
        return { limited: false };
      }

      // Within window — check count
      if (entry.count >= maxAttempts) {
        const retryAfterMs = windowMs - (now - entry.firstAttempt);
        return { limited: true, retryAfterMs };
      }

      // Increment and allow
      entry.count += 1;
      return { limited: false };
    },

    /**
     * Reset the rate limit for a given key (e.g. after successful login).
     */
    reset(key: string): void {
      store.delete(key);
    },
  };
}

// Pre-configured rate limiters
export const loginLimiter = createRateLimiter("login", 5, 15 * 60 * 1000); // 5 attempts per 15 min
export const storySubmitLimiter = createRateLimiter("story-submit", 5, 15 * 60 * 1000); // 5 per 15 min
