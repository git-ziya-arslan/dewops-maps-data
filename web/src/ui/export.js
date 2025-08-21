import { getCurrentData } from './table.js';
import { t } from '../utils/i18n.js';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

  
pdfMake.vfs = pdfFonts.vfs;


function toRows(data) {
  const headers = [
    t('columns.isim'), t('columns.ulke'), t('columns.sehir'),
    t('columns.sektor'), t('columns.web'), t('columns.telefon')
  ];
  const body = (data || []).map(x => [
    x.isim || '', x.ulke || '', x.sehir || '',
    x.sektor || '', x.web || '', x.telefon || ''
  ]);
  return [headers, ...body];
}

function guardEmpty(data) {
  if (!data || !data.length) {
    alert(t('export.empty', 'Export için tablo boş.'));
    return true;
  }
  return false;
}

function onCopy() {
  const rows = toRows(getCurrentData());
  if (guardEmpty(rows.slice(1))) return;
  const tsv = rows.map(r => r.map(c => String(c).replace(/\t/g, ' ')).join('\t')).join('\n');
  navigator.clipboard.writeText(tsv).then(() => {
    // isteğe bağlı küçük bir toast gösterebilirsin
  });
}

function onExcel() {
  const rows = toRows(getCurrentData());
  if (guardEmpty(rows.slice(1))) return;
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, 'MapsData');
  XLSX.writeFile(wb, 'maps-data.xlsx');
}

function onPDF() {
  const rows = toRows(getCurrentData());
  if (guardEmpty(rows.slice(1))) return;
  const doc = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    defaultStyle: { fontSize: 10 },
    content: [
      { text: 'Maps Data', style: 'title', margin: [0,0,0,8] },
      {
        table: {
          headerRows: 1,
          widths: ['*','*','*','*','*','*'],
          body: rows
        },
        layout: 'lightHorizontalLines'
      }
    ],
    styles: {
      title: { fontSize: 14, bold: true }
    }
  };
  pdfMake.createPdf(doc).download('maps-data.pdf');
}

function onPrint() {
  const rows = toRows(getCurrentData());
  if (guardEmpty(rows.slice(1))) return;
  const html = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>Maps Data</title>
        <style>
          body{font:14px Inter, Arial, sans-serif;padding:24px}
          table{border-collapse:collapse;width:100%}
          th,td{border:1px solid #ddd;padding:8px;text-align:left}
          th{background:#f3f3f3}
        </style>
      </head>
      <body>
        <h2>Maps Data</h2>
        <table>
          <thead>
            <tr>${rows[0].map(h=>`<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${rows.slice(1).map(r=>`<tr>${r.map(c=>`<td>${c ?? ''}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
        <script>window.onload=()=>{window.print();setTimeout(()=>window.close(),100);};</script>
      </body>
    </html>`;
  const w = window.open('', '_blank');
  w.document.open(); w.document.write(html); w.document.close();
}

export function setupExportButtons() {
  const q = (id) => document.getElementById(id);
  q('btnCopy') ?.addEventListener('click', onCopy);
  q('btnExcel')?.addEventListener('click', onExcel);
  q('btnPDF')  ?.addEventListener('click', onPDF);
  q('btnPrint')?.addEventListener('click', onPrint);
}

