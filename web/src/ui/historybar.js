import { $, $$ } from '../utils/dom.js';
import { History } from '../utils/history.js';
import { t } from '../utils/i18n.js';

export function renderHistoryBar(onPick) {
  const mount = $('#historyMount');
  if (!mount) return;

  const items = History.list(10);
  mount.innerHTML = '';

  // üst satır: başlık + mod seçici + temizle
  const top = document.createElement('div');
  top.className = 'historybar-top';

  const title = document.createElement('span');
  title.className = 'historybar-title';
  title.textContent = t('history.recent', 'Recent searches');

  const modeSel = document.createElement('select');
  modeSel.className = 'historybar-mode';
  const modes = [
    ['off',     t('history.mode.off', 'Do not save')],
    ['session', t('history.mode.session', 'Session')],
    ['device',  t('history.mode.device', 'Device')],
  ];
  const current = History.mode() || 'device';
  modes.forEach(([val,label]) => {
    const opt = document.createElement('option');
    opt.value = val; opt.textContent = label;
    if (val === current) opt.selected = true;
    modeSel.appendChild(opt);
  });
  modeSel.addEventListener('change', (e) => {
    History.setMode(e.target.value);
    renderHistoryBar(onPick); // yeniden çiz
  });

  const clearBtn = document.createElement('button');
  clearBtn.className = 'btn';
  clearBtn.textContent = t('history.clear', 'Clear');
  clearBtn.onclick = () => { History.clear(); renderHistoryBar(onPick); };

  top.appendChild(title);
  top.appendChild(modeSel);
  top.appendChild(clearBtn);
  mount.appendChild(top);

  // alt satır
  const wrap = document.createElement('div');
  wrap.className = 'historybar-chips';
  if (!items.length) {
    const empty = document.createElement('div');
    empty.className = 'historybar-empty';
    empty.textContent = t('history.empty', 'No recent searches yet');
    wrap.appendChild(empty);
  } else {
    items.forEach(it => {
      const chip = document.createElement('button');
      chip.className = 'chip chip-history';
      chip.title = new Date(it.ts).toLocaleString();
      chip.textContent = it.text || '(empty)';
      chip.onclick = () => onPick(it.payload);
      wrap.appendChild(chip);
    });
  }
  mount.appendChild(wrap);
}
