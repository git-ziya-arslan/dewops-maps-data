import { LRUCache } from 'lru-cache';
import { CONFIG } from '../config/default.js';

const cache = new LRUCache({
  max: 5000,
  ttl: CONFIG.CACHE_TTL_SECONDS * 1000
});

export const Cache = {
  get: (k) => cache.get(k),
  set: (k, v) => cache.set(k, v),
  has: (k) => cache.has(k)
};
