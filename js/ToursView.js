import TourCard from './TourCard.js';

class ToursView {
  constructor({ gridSelector, showMoreSelector }) {
    this.grid = document.querySelector(gridSelector);
    this.showMoreBtn = document.querySelector(showMoreSelector);
  }

  clearGrid() {
    if (this.grid) this.grid.innerHTML = '';
  }

  renderTours(toursList) {
    if (!this.grid) return;

    const fragment = document.createDocumentFragment();

    toursList.forEach((tourData) => {
      const cardInstance = new TourCard(tourData);
      const cardHtml = cardInstance.render();
      fragment.appendChild(cardHtml);
    });

    this.grid.appendChild(fragment);
  }

  toggleShowMoreButton(isVisible) {
    if (!this.showMoreBtn) return;
    this.showMoreBtn.style.display = isVisible ? 'block' : 'none';
  }
}

export default ToursView;
