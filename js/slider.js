class TravelSlider {
  constructor({
    trackSelector,
    prevBtnSelector,
    nextBtnSelector,
    slideSelector,
    activeClass,
  }) {
    this.track = document.querySelector(trackSelector);
    this.prevBtn = document.querySelector(prevBtnSelector);
    this.nextBtn = document.querySelector(nextBtnSelector);
    this.slideSelector = slideSelector;
    this.activeClass = activeClass;

    this.isTransitioning = false;

    this.touchStartX = 0;
    this.touchEndX = 0;

    if (!this.track || !this.prevBtn || !this.nextBtn) return;

    this.init();
  }

  init() {
    this.track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

    this.nextBtn.addEventListener('click', () => this.next());
    this.prevBtn.addEventListener('click', () => this.prev());

    this.track.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleTouch();
    }, { passive: true });
  }

  handleTouch() {
    const swipeDistance = this.touchStartX - this.touchEndX;
    const minSwipeDistance = 50; 

    if (swipeDistance > minSwipeDistance) {      
      this.next();
    } else if (swipeDistance < -minSwipeDistance) {      
      this.prev();
    }
  }

  getShiftWidth() {
    const slides = this.track.querySelectorAll(this.slideSelector);
    if (slides.length < 2) return 0;

    const secondSlideWidth = slides[1].getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(this.track).gap) || 0;

    return secondSlideWidth + gap;
  }

  updateActiveClasses() {
    const slides = this.track.querySelectorAll(this.slideSelector);
    slides.forEach((slide, index) => {
      if (index === 0) {
        if (!slide.classList.contains(this.activeClass)) {
          requestAnimationFrame(() => {
            slide.classList.add(this.activeClass);
          });
        }
      } else {
        slide.classList.remove(this.activeClass);
      }
    });
  }

  next() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    const shift = this.getShiftWidth();

    this.track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    this.track.style.transform = `translateX(-${shift}px)`;

    setTimeout(() => {
      this.track.style.transition = 'none';

      const firstSlide = this.track.querySelector(this.slideSelector);
      this.track.appendChild(firstSlide);

      this.track.style.transform = 'translateX(0)';

      this.updateActiveClasses();

      this.isTransitioning = false;
    }, 400);
  }

  prev() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    const shift = this.getShiftWidth();
    const slides = this.track.querySelectorAll(this.slideSelector);
    const lastSlide = slides[slides.length - 1];

    this.track.style.transition = 'none';
    this.track.insertBefore(lastSlide, this.track.firstChild);

    this.track.style.transform = `translateX(-${shift}px)`;

    setTimeout(() => {
      this.track.style.transition =
        'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      this.track.style.transform = 'translateX(0)';

      this.updateActiveClasses();
    }, 20);

    setTimeout(() => {
      this.isTransitioning = false;
    }, 420);
  }
}

export default TravelSlider;
