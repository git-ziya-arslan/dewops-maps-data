import { ENV } from '../utils/env.js';
import { httpJson, sleep } from '../utils/http.js';
import { CONFIG } from '../config/default.js';


const BASE = 'https://maps.googleapis.com/maps/api/place';


export async function textSearchOnce(query, pagetoken) {
const params = new URLSearchParams({
query,
key: ENV.GOOGLE_API_KEY
});
if (pagetoken) params.set('pagetoken', pagetoken);
const url = `${BASE}/textsearch/json?${params.toString()}`;
const data = await httpJson(url, { timeout: CONFIG.TIMEOUT_MS });
return data; // {results, next_page_token, status, ...}
}


export async function textSearchPaginated(query, pageLimit) {
let all = [];
let pages = 0;
let token = undefined;


do {
const resp = await textSearchOnce(query, token);
if (resp.status !== 'OK' && resp.status !== 'ZERO_RESULTS' && resp.status !== 'INVALID_REQUEST') {
throw new Error(`Google TextSearch error: ${resp.status}`);
}
if (Array.isArray(resp.results)) all.push(...resp.results);
pages += 1;
if (resp.next_page_token && pages < pageLimit) {
// Google requires ~2s delay before next_page_token becomes valid
await sleep(2000);
token = resp.next_page_token;
} else {
token = undefined;
}
} while (token && pages < pageLimit);


return { items: all, pages };
}


export async function details(place_id) {
const params = new URLSearchParams({
place_id,
fields: 'formatted_phone_number,website,formatted_address',
key: ENV.GOOGLE_API_KEY
});
const url = `${BASE}/details/json?${params.toString()}`;
const data = await httpJson(url, { timeout: CONFIG.TIMEOUT_MS });
if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
throw new Error(`Google Details error: ${data.status}`);
}
const r = data.result || {};
return {
phone: r.formatted_phone_number || '',
website: r.website || '',
formatted_address: r.formatted_address || ''
};
}
