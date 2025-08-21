
import './styles/main.css';
import { CONFIG } from './config.js';
import { i18nInit, setLang, applyI18n, t } from './utils/i18n.js';
import { initTheme, setTheme, setDust } from './utils/theme.js';
import { initBrand } from './ui/brand.js';
import { bindForm } from './ui/form.js';
import { renderTable } from './ui/table.js';
import { toast } from './ui/toast.js';
import { renderHistoryBar } from './ui/historybar.js';

import { setupExportButtons } from './ui/export.js';
import { setupHelp } from './ui/help.js';






// API
import { searchPlaces } from './api/client.js';

// Local history (session/device) util
import { History } from './utils/history.js';

let lastItems = [];

/** Formu payload ile doldurur */
function fillForm(p = {}) {
  const set = (id, v = '') => {
    const el = document.getElementById(id);
    if (el) el.value = v;
  };
  set('ulke', p.ulke);
  set('sehir', p.sehir);
  set('ilce', p.ilce);
  set('mahalle', p.mahalle);
  set('sektor', p.sektor);
  set('keyword', p.keyword);
}

/** Aramayı çalıştırır, tabloyu ve geçmişi günceller */
async function doSearch(payload) {
  toast('⏳ ' + t('ui.loading', 'Yükleniyor...'));
  const t0 = performance.now();

  const { items = [] } = await searchPlaces(payload);

  const took = Math.round(performance.now() - t0);
  lastItems = items.map(x => ({ ...x, sektor: payload.sektor || '' }));
  renderTable(lastItems);

  // local history (session/localStorage)
  History.save(payload, { count: lastItems.length, took });
  renderHistoryBar(onPickHistory); // çipleri yenile
}

/** Geçmişten seçilince akış */
function onPickHistory(payload) {
  fillForm(payload);
  doSearch(payload).catch(err => {
    console.error(err);
    toast('⚠️ ' + (err?.message || t('errors.unknown', 'Bilinmeyen hata')));
  });
}

/** Uygulamayı başlat */
async function bootstrap() {
  // i18n
  await i18nInit('tr');
  applyI18n();

  // Brand / footer
  initBrand();
   initTheme();
  // Geçmiş barını çiz
  renderHistoryBar(onPickHistory);
   const press = (el, on) => el && el.setAttribute('aria-pressed', on ? 'true' : 'false');
  const d  = document.getElementById('modeDark');
  const l  = document.getElementById('modeLight');
  const s  = document.getElementById('modeSystem');
  const on = document.getElementById('dustOn');
  const off= document.getElementById('dustOff');

  d?.addEventListener('click', ()=>{ setTheme('dark');   press(d,true);  press(l,false); press(s,false); });
  l?.addEventListener('click', ()=>{ setTheme('light');  press(l,true);  press(d,false); press(s,false); });
  s?.addEventListener('click', ()=>{ setTheme('system'); press(s,true);  press(d,false); press(l,false); });
  on?.addEventListener('click', ()=>{ setDust(true);  press(on,true);  press(off,false); });
  off?.addEventListener('click', ()=>{ setDust(false); press(off,true); press(on,false); });

  // Dil değiştirici
  const langSel = document.getElementById('langSwitcher');
  if (langSel) {
    langSel.addEventListener('change', (e) => {
      setLang(e.target.value).then(() => {
        applyI18n();
        renderHistoryBar(onPickHistory); // başlık & buton çevirileri güncellensin
      });
    });
  }

  // Form submit -> arama
  bindForm(async (payload) => {
    try {
      await doSearch(payload);
    } catch (err) {
      console.error(err);
      toast('⚠️ ' + (err?.message || t('errors.unknown', 'Bilinmeyen hata')));
    }
  });


  if (import.meta?.env?.MODE === 'development') {
    console.log('[DewOps] API_BASE =', CONFIG.API_BASE || '(aynı origin)');
  }
}
setupExportButtons();

setupHelp();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
