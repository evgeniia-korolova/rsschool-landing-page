import BurgerMenu from './menu.js';

const categoriesMenu = new BurgerMenu({
  triggerSelector: '.tours-filter__toggle',
  targetSelector: '.tours-filter__body',
  triggerIconActiveClass: 'tours-filter__chevron--rotated', 
  targetActiveClass: 'tours-filter__body--open',
  linkSelector: '.filter-btn',
  linkActiveClass: 'filter-btn--active'
});
