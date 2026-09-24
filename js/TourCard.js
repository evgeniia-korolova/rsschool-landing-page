class TourCard {
  constructor(tourData) {
    this.data = tourData;
  }
  
  getCategoryLabel(category) {
    const labels = {
      beach: 'Beach Resort',
      sightseeing: 'Sightseeing',
      exotic: 'Exotic Adventure',
      cruise: 'Cruise'
    };
    return labels[category] || category;
  }

  render() {    
    const cardEl = document.createElement('article');
    cardEl.classList.add('tour-card');
    cardEl.setAttribute('data-tour-id', this.data.id);
    cardEl.setAttribute('data-category', this.data.category);
    
    cardEl.innerHTML = `
      <div class="tour-card__img-wrapper">
        <img src="${this.data.image}" alt="${this.data.title}" class="tour-card__img" loading="lazy">
      </div>

      <div class="tour-card__content">
        <div class="tour-card__meta">
          <span class="tour-card__category">${this.getCategoryLabel(this.data.category)}</span>
          <span class="tour-card__duration">${this.data.durationText}</span>
        </div>

        <h3 class="tour-card__title">${this.data.title}</h3>
        <p class="tour-card__desc">${this.data.shortDescription}</p>
        
        <div class="tour-card__price-box">
          <span class="tour-card__price-label">from</span>
          <span class="tour-card__price-value">$${this.data.basePricePerNight}</span>
          <span class="tour-card__price-unit">/ night</span>
        </div>
      </div>

      <div class="tour-card__footer">
        <div class="tour-card__rating">
          <svg class="tour-card__rating-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
          <span class="tour-card__rating-value">${this.data.rating}</span>
        </div>
        <button class="btn-open-modal" data-action="details">Book Now</button>
      </div>
    `;

    return cardEl;
  }
}

export default TourCard;