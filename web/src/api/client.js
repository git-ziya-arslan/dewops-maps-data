
import { CONFIG } from '../config.js';


export async function searchPlaces(payload) {
const url = `${CONFIG.API_BASE}/api/search`;
const res = await fetch(url, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload)
});
if (!res.ok) throw new Error(`HTTP ${res.status}`);
return res.json();
}