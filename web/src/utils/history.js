// Basit, hafif, gizlilik dostu geçmiş tutucu.
// Modlar: 'off' | 'session' | 'device' (default: device)
// Depo: sessionStorage veya localStorage
const STORE_KEY = 'dewops:history:v1';
const MODE_KEY  = 'dewops:settings:historyMode';   // 'off' | 'session' | 'device'
const MAX_ITEMS = 20;                                // en fazla 20 kayıt
const TTL_DAYS  = 30;                                // 30 gün sonra buda

function storeForMode(mode) {
  return mode === 'session' ? sessionStorage : localStorage;
}
function getMode() {
  return localStorage.getItem(MODE_KEY) || 'device';
}
function setMode(v) {
  localStorage.setItem(MODE_KEY, v);
}
function now() { return Date.now(); }
function ttlMs() { return TTL_DAYS * 24 * 60 * 60 * 1000; }

function normalizePayload(p = {}) {
  // server’daki composeQuery ile uyumlu
  return [p.sektor, p.keyword, p.mahalle, p.ilce, p.sehir, p.ulke]
    .filter(Boolean).join(' ').trim().toLowerCase().replace(/\s+/g,' ');
}

function loadRaw(mode = getMode()) {
  try {
    const raw = storeForMode(mode).getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function saveRaw(list, mode = getMode()) {
  try { storeForMode(mode).setItem(STORE_KEY, JSON.stringify(list)); } catch {}
}

function prune(list) {
  const cutoff = now() - ttlMs();
  return list.filter(x => x.ts >= cutoff).slice(0, MAX_ITEMS);
}

export const History = {
  mode: getMode,
  setMode,

  list(limit = 10) {
    const list = prune(loadRaw());
    return list.slice(0, limit);
  },

  save(payload, meta = {}) {
    const mode = getMode();
    if (mode === 'off') return;
    const list = loadRaw(mode);
    const text = normalizePayload(payload);
    if (!text) return;

    // aynı sorgu başa alınır (dedupe)
    const filtered = list.filter(x => x.text !== text);
    filtered.unshift({
      text,
      ts: now(),
      payload,
      count: meta.count ?? 0,
      took: meta.took ?? 0
    });
    saveRaw(prune(filtered), mode);
  },

  clear() {
    storeForMode(getMode()).removeItem(STORE_KEY);
  }
};

