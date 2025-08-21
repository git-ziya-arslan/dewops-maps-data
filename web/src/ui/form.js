
import { $, $$ } from '../utils/dom.js';


export function getFormPayload() {
return {
ulke: $('#ulke')?.value?.trim() || '',
sehir: $('#sehir')?.value?.trim() || '',
ilce: $('#ilce')?.value?.trim() || '',
mahalle: $('#mahalle')?.value?.trim() || '',
sektor: $('#sektor')?.value?.trim() || '',
keyword: $('#keyword')?.value?.trim() || ''
};
}


export function bindForm(onSubmit) {
const form = document.getElementById('searchForm');
form?.addEventListener('submit', (e) => {
e.preventDefault();
onSubmit(getFormPayload());
});
}