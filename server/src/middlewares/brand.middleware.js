export function brandMiddleware(_req, res, next) {
res.setHeader('X-Powered-By', 'DewOps');
next();
}
