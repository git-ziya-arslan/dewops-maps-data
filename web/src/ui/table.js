//import { Grid } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';
import { CONFIG } from '../config.js';
import { Grid, h } from 'gridjs';
import { t } from '../utils/i18n.js';


let grid;
let lastData = [];

export function renderTable(items) {
  const mount = document.getElementById('tableMount');
  mount.innerHTML = '';

  lastData = Array.isArray(items) ? items : []; // <— güncel veri

  grid = new Grid({
    columns: [
      { id: 'isim',    name: t('columns.isim') },
      { id: 'ulke',    name: t('columns.ulke') },
      { id: 'sehir',   name: t('columns.sehir') },
      { id: 'sektor',  name: t('columns.sektor') },
      {
        id: 'web', name: t('columns.web'),
        formatter: (cell) => cell
          ? h('a', { href: cell, target: '_blank' }, t('table.visit'))
          : h('span', { className: 'chip chip-danger' }, t('table.no_web'))
      },
      {
        id: 'telefon', name: t('columns.telefon'),
        formatter: (cell) => cell
          ? h('a', { href: `tel:${cell}` }, cell)
          : h('span', { className: 'chip chip-danger' }, t('table.no_phone'))
      }
    ],
    data: lastData,
    pagination: { enabled: true, limit: CONFIG.PAGE_SIZE },
    fixedHeader: true,
    sort: true,
    search: false
  }).render(mount);
}

export function getCurrentData() {
  return lastData;
}