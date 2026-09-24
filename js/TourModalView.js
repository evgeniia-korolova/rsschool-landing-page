class TourModalView {
  constructor(modalSelector) {
    this.modal = document.querySelector(modalSelector);
    this.currentTour = null;
    this.selectedExcursions = new Set();
    this.includeTransfer = false;
    this.nightsCount = 1;
    this.guestsCount = 1;
  }

  getCategoryLabel(category) {
    const labels = {
      beach: 'Beach Resort',
      sightseeing: 'Sightseeing',
      exotic: 'Exotic Adventure',
      cruise: 'Cruise',
    };
    return labels[category] || category;
  }

  generateExcursionsHtml(excursions) {
    if (!excursions || excursions.length === 0) return '';

    return excursions
      .map((exc) => {
        return `
        <label class="tour-modal__label--checkbox">
          <input type="checkbox" class="modal-excursion-checkbox" data-exc-id="${exc.id}" data-exc-price="${exc.price}">
          <span>${exc.name} (+$${exc.price})</span>
        </label>
      `;
      })
      .join('');
  }

  render(tourData) {
    this.currentTour = tourData;
    this.selectedExcursions.clear();
    this.includeTransfer = false;
    this.nightsCount = tourData.durationNights;
    this.guestsCount = 1;

    const categoryLabel = this.getCategoryLabel(tourData.category);
    const initialTotalPrice = tourData.basePricePerNight * this.nightsCount;

    const excursionsListHtml = this.generateExcursionsHtml(tourData.excursions);

    const excursionsSectionHtml = excursionsListHtml
      ? `
        <div class="tour-modal__excursions-section">
          <p class="tour-modal__subheading">Add Extra Excursions:</p>
          <div class="tour-modal__excursions-list">
            ${excursionsListHtml}
          </div>
        </div>
      `
      : '';

    this.modal.innerHTML = `
      <button class="tour-modal__close-btn" aria-label="Close modal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div class="tour-modal__main-content">
        <h2 class="tour-modal__title">${tourData.title}</h2>
        <span class="tour-modal__category">${categoryLabel}</span>
        
        <p class="tour-modal__desc">${tourData.longDescription}</p>
        
        <div class="tour-modal__parameters">
          
          <!-- ПАРАМЕТР 1: ВЫБОР КОЛИЧЕСТВА НОЧЕЙ -->
          <div class="tour-modal__param-row">
            <label for="modal-nights" class="tour-modal__label">Duration (Nights):</label>
            <input type="number" id="modal-nights" class="tour-modal__input-nights" min="1" max="30" value="${this.nightsCount}">
          </div>

          <!-- ✨ ПАРАМЕТР 2: КОЛИЧЕСТВО ГОСТЕЙ -->
          <div class="tour-modal__param-row" style="margin-top: 4px;">
            <label for="modal-guests" class="tour-modal__label">Number of Guests:</label>
            <input type="number" id="modal-guests" class="tour-modal__input-nights" min="1" max="3" value="${this.guestsCount}">
          </div>

          <!-- ПАРАМЕТР 3: ВКЛЮЧЕНИЕ ТРАНСФЕРА -->
          <label class="tour-modal__label--checkbox">
            <input type="checkbox" id="modal-transfer" class="tour-modal__checkbox">
            <span>Include Private Transfer (+$${tourData.transferPricePerPerson} per person)</span>
          </label>

          <!-- ПАРАМЕТР 4: ДОПОЛНИТЕЛЬНЫЕ ЭКСКУРСИИ -->
          ${excursionsSectionHtml}
          
        </div>

        <!-- ФУТЕР МОДАЛКИ С ИТОГОВОЙ СТОИМОСТЬЮ -->
        <div class="tour-modal__footer">
          <div>
            <span class="tour-modal__price-label">Total Price:</span>
            <div class="tour-modal__price-value" id="modal-total-price">
              $${initialTotalPrice}
            </div>
          </div>
          <button class="show-more__btn" id="modal-book-btn">Book Tour</button>
        </div>
      </div>
    `;

    this.initEvents();
  }

  initEvents() {
    this.modal
      .querySelector('.tour-modal__close-btn')
      .addEventListener('click', () => this.close());

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    const nightsInput = this.modal.querySelector('#modal-nights');
    if (nightsInput) {
      nightsInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) val = 1;
        this.nightsCount = val;
        this.updateTotalPrice();
      });
    }

    const guestsInput = this.modal.querySelector('#modal-guests');
    if (guestsInput) {
      guestsInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) val = 1;
        this.guestsCount = val;
        this.updateTotalPrice();
      });
    }

    const transferCheck = this.modal.querySelector('#modal-transfer');
    if (transferCheck) {
      transferCheck.addEventListener('change', (e) => {
        this.includeTransfer = e.target.checked;
        this.updateTotalPrice();
      });
    }

    const excChecks = this.modal.querySelectorAll('.modal-excursion-checkbox');
    excChecks.forEach((check) => {
      check.addEventListener('change', () => this.updateTotalPrice());
    });

    this.modal
      .querySelector('#modal-book-btn')
      .addEventListener('click', () => this.showSuccessScreen());
  }

  updateTotalPrice() {
    let total =
      this.currentTour.basePricePerNight * this.currentTour.durationNights;

    if (this.includeTransfer) {
      total += this.currentTour.transferPricePerPerson * this.guestsCount;
    }

    const excChecks = this.modal.querySelectorAll('.modal-excursion-checkbox');
    excChecks.forEach((check) => {
      if (check.checked) {
        const perPersonPrice = parseFloat(check.getAttribute('data-exc-price'));
        total += perPersonPrice * this.guestsCount;
      }
    });

    const priceEl = this.modal.querySelector('#modal-total-price');
    if (priceEl) priceEl.textContent = `$${total}`;
  }

  // ✨ ЭКРАН УСПЕШНОГО ЗАКАЗА
  showSuccessScreen() {
    const mainContent = this.modal.querySelector('.tour-modal__main-content');
    const orderNumber = `WL-${Math.floor(100000 + Math.random() * 900000)}`;

    mainContent.innerHTML = `
      <div class="tour-modal__success-screen">
        <svg class="tour-modal__success-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 12px;">Booking Confirmed!</h3>
        <p style="color: var(--color-secondary); margin-bottom: 16px;">
          Thank you for choosing Wanderlust. Your adventure to <strong>${this.currentTour.title}</strong> is secured.
        </p>
        <div style="background-color: var(--bg-secondary); padding: 12px; border-radius: 8px; font-family: monospace; font-size: 1.1rem; margin-bottom: 24px;">
          Order ID: ${orderNumber}
        </div>
        <button class="show-more__btn" id="modal-success-close-btn" style="margin: 0 auto;">Great!</button>
      </div>
    `;

    const successCloseBtn = this.modal.querySelector(
      '#modal-success-close-btn'
    );
    successCloseBtn.addEventListener('click', () => this.close());
  }

  open() {
    this.modal.showModal();
  }

  close() {
    this.modal.close();
  }
}

export default TourModalView;
