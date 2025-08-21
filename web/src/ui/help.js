
import { t } from '../utils/i18n.js';

let modal, firstFocus;

function template() {
  return `
  <div class="modal-backdrop" data-close="1" role="presentation"></div>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="helpTitle">
    <div class="modal-head">
      <h2 id="helpTitle">${t('help.title','Help')}</h2>
      <button class="icon-btn" id="helpClose" aria-label="${t('help.close','Close')}">✕</button>
    </div>
    <div class="modal-body">
      <section class="help-block">
        <h3>${t('help.quickstart.title','Quick start')}</h3>
        <ol>
          <li>${t('help.qs.1','Ülke/Şehir/İlçe/Sektör/Keyword alanlarını doldurun.')}</li>
          <li>${t('help.qs.2','Ara butonuna basın. Sonuçlar tabloda görünür.')}</li>
          <li>${t('help.qs.3','Copy / Excel / PDF / Print ile dışa aktarın.')}</li>
        </ol>
      </section>

      <section class="help-block">
        <h3>${t('help.apikey.title','API anahtarı')}</h3>
        <p>${t('help.apikey.desc','Sunucu tarafında .env dosyasında GOOGLE_API_KEY olarak saklanır. Tarayıcıya gönderilmez.')}</p>
      </section>

      <section class="help-block">
        <h3>${t('help.tips.title','İpuçları')}</h3>
        <ul>
          <li>${t('help.tips.1','Sorgular “sektör + keyword + mahalle + ilçe + şehir + ülke” biçiminde birleştirilir.')}</li>
          <li>${t('help.tips.2','Çok sonuç alırsanız anahtar kelimeyi daraltın veya şehri/ilçeyi ekleyin.')}</li>
          <li>${t('help.tips.3','REQUEST_DENIED: billing/anahtar kısıtlarını kontrol edin.')}</li>
        </ul>
      </section>

      <section class="help-block">
        <h3>${t('help.about.title','Hakkında')}</h3>
        <p>${t('help.about.desc','DewOps Maps Data — #11d137 aksanlı koyu tema. Açık kaynak, topluluk katkısına açık.')}</p>
        <p>
          <a href="https://dewops.com/?utm_source=mapsdata&utm_medium=app&utm_campaign=help_modal"
             target="_blank" rel="noopener">${t('help.link','Daha fazla bilgi')}</a>
        </p>
      </section>
    </div>
  </div>`;
}

function mount() {
  if (modal) return;
  modal = document.createElement('div');
  modal.id = 'helpModalRoot';
  modal.className = 'modal-root';
  modal.innerHTML = template();
  document.body.appendChild(modal);
}

export function openHelp() {
  mount();
  modal.style.display = 'block';
  document.body.classList.add('no-scroll');

  // events
  modal.addEventListener('click', backdropClose);
  document.getElementById('helpClose')?.addEventListener('click', closeHelp);
  document.addEventListener('keydown', escClose);

  // focus
  firstFocus = document.getElementById('helpClose');
  firstFocus?.focus();
}

export function closeHelp() {
  if (!modal) return;
  modal.style.display = 'none';
  document.body.classList.remove('no-scroll');
  modal.removeEventListener('click', backdropClose);
  document.removeEventListener('keydown', escClose);
}

function backdropClose(e) {
  if (e.target?.dataset?.close) closeHelp();
}
function escClose(e) {
  if (e.key === 'Escape') closeHelp();
}

export function setupHelp() {
  const btn = document.getElementById('btnHelp');
  btn?.addEventListener('click', openHelp);

  // Kısayol: F1 ve ?
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'F1') || (e.shiftKey && e.key === '/')) {
      e.preventDefault(); openHelp();
    }
  });
}

