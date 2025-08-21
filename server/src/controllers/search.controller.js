import { textSearchPaginated, details as getDetails } from '../services/google.service.js';
import { CONFIG } from '../config/default.js';
import { Cache } from '../services/cache.service.js';
import { Metrics } from '../services/metrics.service.js';

function composeQuery({ ulke, sehir, ilce, mahalle, sektor, keyword }) {
  return [sektor, keyword, mahalle, ilce, sehir, ulke]
    .filter(Boolean)
    .join(' ')
    .trim();
}

function parseCountryCity(formatted_address = '') {
  // Basit virgül ayrıştırma: son parça ülke, ondan önceki genelde şehir
  const parts = formatted_address.split(',').map(s => s.trim());
  const ulke = parts.at(-1) || '';
  const sehir = parts.at(-2) || '';
  return { ulke, sehir };
}

async function fanoutDetails(results, concurrency) {
  const out = [];
  for (let i = 0; i < results.length; i += concurrency) {
    const slice = results.slice(i, i + concurrency);
    const chunk = await Promise.all(
      slice.map(async (r) => {
        const pid = r.place_id;
        let det = Cache.get(pid);
        if (!det) {
          det = await getDetails(pid);
          Cache.set(pid, det);
        }
        const { ulke, sehir } = parseCountryCity(det.formatted_address || r.formatted_address || '');
        return {
          isim: r.name || '',
          ulke,
          sehir,
          sektor: '', // istersen body.sektor koyabilirim
          web: det.website || '',
          telefon: det.phone || '',
          place_id: pid
        };
      })
    );
    out.push(...chunk);
  }
  return out;
}

export async function search(req, res, next) {
  try {
    Metrics.inc('search');
    const body = req.body || {};
    const query = composeQuery(body);

    // (opsiyonel guard)
    // if (!query) return res.json({ query, count: 0, items: [], meta: { pages: 0 } });

    const { items, pages } = await textSearchPaginated(query, CONFIG.PAGE_LIMIT);
    const normalized = await fanoutDetails(items, CONFIG.CONCURRENCY);

    const response = {
      query,
      count: normalized.length,
      items: normalized,
      meta: { pages }
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
}
