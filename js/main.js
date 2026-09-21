import { initTheme, setupThemeListeners } from './themes.js';

initTheme();

document.addEventListener('DOMContentLoaded', () => {
  setupThemeListeners('theme-btn');

  console.log('Wanderlust core modules initialized.');
});
