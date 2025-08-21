
let lang = 'tr';
let dict = {};


export async function i18nInit(initial = 'tr') {
lang = initial;
await loadDict(lang);
}


export async function setLang(newLang) {
lang = newLang;
await loadDict(lang);
applyI18n();
}


async function loadDict(l) {
dict = await import(`../i18n/${l}.json`);
dict = dict.default || dict;
}


export function t(key, fallback = '') {
return dict[key] || fallback || key;
}


export function applyI18n() {
document.querySelectorAll('[data-i18n]').forEach(el => {
el.textContent = t(el.getAttribute('data-i18n'));
});
document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
});
}