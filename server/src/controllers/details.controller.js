
import { details } from '../services/google.service.js';
import { Cache } from '../services/cache.service.js';


export async function detailsOne(req, res, next) {
try {
const place_id = String(req.query.place_id || '').trim();
if (!place_id) return res.status(400).json({ error: 'BAD_REQUEST', message: 'place_id is required' });
let det = Cache.get(place_id);
if (!det) {
det = await details(place_id);
Cache.set(place_id, det);
}
res.json(det);
} catch (err) {
next(err);
}
}