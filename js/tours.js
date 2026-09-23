import BurgerMenu from './menu.js';
import ToursModel from './ToursModel.js';
import ToursView from './ToursView.js';
import TourModalView from './TourModalView.js';

class ToursController {
  constructor() {
    this.model = new ToursModel();
    this.view = new ToursView({
      gridSelector: '#tours-grid',
      showMoreSelector: '.show-more__btn',
    });

    this.modalView = new TourModalView('#tour-modal');

    this.cardsLimit = 6;
    this.renderedCount = 0;

    this.init();
  }

  async init() {
    this.initCategoriesMenu();

    this.updateLimitByScreenSize();

    const showMoreBtn = document.querySelector('.show-more__btn');
    if (showMoreBtn) showMoreBtn.disabled = true;

    await this.model.loadTours();

    if (showMoreBtn) showMoreBtn.disabled = false;

    this.renderCurrentState();

    this.bindEvents();
  }

  initCategoriesMenu() {
    new BurgerMenu({
      triggerSelector: '.tours-filter__toggle',
      targetSelector: '.tours-filter__body',
      triggerIconActiveClass: 'tours-filter__chevron--rotated',
      targetActiveClass: 'tours-filter__body--open',
      linkSelector: '.filter-btn',
      linkActiveClass: 'filter-btn--active',
    });
  }

  updateLimitByScreenSize() {
    const width = window.innerWidth;
    if (width > 1024) {
      this.cardsLimit = 6;
    } else if (width > 768) {
      this.cardsLimit = 4;
    } else {
      this.cardsLimit = 3;
    }
  }

  renderCurrentState(append = false) {
    const filteredTours = this.model.getFilteredTours();

    if (!append) {
      this.view.clearGrid();
      this.renderedCount = this.cardsLimit;
    } else {
      this.renderedCount += this.cardsLimit;
    }

    const toursToRender = filteredTours.slice(
      append ? this.renderedCount - this.cardsLimit : 0,
      this.renderedCount
    );

    this.view.renderTours(toursToRender);

    const hasMore = this.renderedCount < filteredTours.length;
    this.view.toggleShowMoreButton(hasMore);
  }

  bindEvents() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const selectedCategory = e.currentTarget.getAttribute('data-category');

        this.model.setCategory(selectedCategory);
        this.renderCurrentState(false);
      });
    });

    const showMoreBtn = document.querySelector('.show-more__btn');
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', () => {
        showMoreBtn.disabled = true;

        setTimeout(() => {
          this.renderCurrentState(true);
          showMoreBtn.disabled = false;
        }, 250);
      });
    }

    window.addEventListener('resize', () => {
      const oldLimit = this.cardsLimit;
      this.updateLimitByScreenSize();

      if (oldLimit !== this.cardsLimit) {
        this.renderCurrentState(false);
      }
    });

    if (this.view.grid) {
      this.view.grid.addEventListener('click', (e) => {
        // Ищем ближайшего предка с классом .tour-card, по которому кликнули
        const card = e.target.closest('.tour-card');
        if (!card) return;
    
        // Извлекаем ID тура из data-атрибута карточки
        const tourId = card.getAttribute('data-tour-id');
    
        // Находим чистые данные этого тура в Модели
        const tourData = this.model.tours.find(t => t.id === tourId);
    
        if (tourData) {
          // Отрисовываем контент внутри модалки и открываем её
          this.modalView.render(tourData);
          this.modalView.open();
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ToursController();
});
