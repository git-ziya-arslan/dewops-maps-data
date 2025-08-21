export const CONFIG = {
PAGE_LIMIT: parseInt(process.env.PAGE_LIMIT || '3', 10),
CONCURRENCY: parseInt(process.env.CONCURRENCY || '5', 10),
CACHE_TTL_SECONDS: parseInt(process.env.CACHE_TTL_SECONDS || '900', 10),
TIMEOUT_MS: 10000
};
