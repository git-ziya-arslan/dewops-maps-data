export function errorMiddleware(err, _req, res, _next) {
console.error('[ERROR]', err);
const status = 500;
res.status(status).json({ error: 'INTERNAL_ERROR', message: String(err.message || err) });
}
