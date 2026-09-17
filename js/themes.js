const THEME_KEY = 'travel-theme';

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
}


export function setupThemeListeners(buttonId) {
  const themeBtn = document.getElementById(buttonId);
  
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
}