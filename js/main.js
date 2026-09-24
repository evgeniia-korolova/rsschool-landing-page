import { initTheme, setupThemeListeners } from './themes.js';
import BurgerMenu from './menu.js';

initTheme();

document.addEventListener('DOMContentLoaded', () => {
  setupThemeListeners('theme-btn');

  const mainMenu = new BurgerMenu({
    triggerSelector: '.burger-btn',
    targetSelector: '.header__nav',
    triggerIconActiveClass: 'active-ham',
    targetActiveClass: 'menu-open',
    linkSelector: '.header__menu-link',
    linkActiveClass: 'header__menu-link--active',
  });
});
