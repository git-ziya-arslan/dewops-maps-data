const THEME_KEY = 'dewops:theme';      // 'dark' | 'light' | 'system'
const DUST_KEY  = 'dewops:dust';       // 'on' | 'off'

export function applyTheme(mode) {
  let final = mode;
  if (mode === 'system') {
    final = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', final);
  localStorage.setItem(THEME_KEY, mode);
}

export function toggleTheme() {
  const cur = localStorage.getItem(THEME_KEY) || 'system';
  applyTheme(cur === 'dark' ? 'light' : 'dark');
}

export function setTheme(mode) {
  applyTheme(mode); // 'dark' | 'light' | 'system'
}

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);
  const dust = localStorage.getItem(DUST_KEY) ?? 'on';
  setDust(dust !== 'off');
}

export function setDust(on) {
  document.body.classList.toggle('body-dust', !!on);
  localStorage.setItem(DUST_KEY, on ? 'on' : 'off');
}
