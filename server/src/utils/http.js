import fetch from 'cross-fetch';


export async function httpJson(url, { method = 'GET', timeout = 10000 } = {}) {
const controller = new AbortController();
const id = setTimeout(() => controller.abort(), timeout);
try {
const res = await fetch(url, { method, signal: controller.signal });
if (!res.ok) {
const text = await res.text();
throw new Error(`HTTP ${res.status} — ${text}`);
}
return await res.json();
} finally {
clearTimeout(id);
}
}


export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
