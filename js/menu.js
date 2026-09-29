const allInstances = [];

class BurgerMenu {
  constructor({
    triggerSelector,
    targetSelector,
    triggerIconActiveClass,
    targetActiveClass,
    linkSelector = null,
    linkActiveClass = null,
  }) {
    this.triggerEl = document.querySelector(triggerSelector);
    this.targetEl = document.querySelector(targetSelector);

    this.triggerIconActiveClass = triggerIconActiveClass;
    this.targetActiveClass = targetActiveClass;
    this.linkSelector = linkSelector;
    this.linkActiveClass = linkActiveClass;
    this.isOpen = false;

    if (!this.triggerEl || !this.targetEl) return;

    this.animatedIconEl =
      this.triggerEl.querySelector('.ham') || this.triggerEl;

    allInstances.push(this);
    this.init();

    this.handleKeyDownBound = this.handleKeyDown.bind(this);
  }

  init() {
    this.triggerEl.addEventListener('click', () => this.toggle());

    if (this.linkSelector) {
      const links = this.targetEl.querySelectorAll(this.linkSelector);

      links.forEach((link) => {
        link.addEventListener('click', () => {
          if (this.linkActiveClass) {
            links.forEach((l) => l.classList.remove(this.linkActiveClass));
            link.classList.add(this.linkActiveClass);
          }

          this.close();
        });
      });
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.targetEl.classList.toggle(this.targetActiveClass, this.isOpen);

    if (this.isOpen) {
      allInstances.forEach((instance) => {
        if (instance !== this) {
          instance.close();
        }
      });
    }

    if (this.animatedIconEl) {
      this.animatedIconEl.classList.toggle(
        this.triggerIconActiveClass,
        this.isOpen
      );
    }

    this.triggerEl.setAttribute(
      'aria-expanded',
      this.isOpen ? 'true' : 'false'
    );

    const anyOpen = allInstances.some((instance) => instance.isOpen);
    document.body.style.overflow = this.isOpen ? 'hidden' : '';

    if (this.isOpen) {
      document.body.addEventListener('keydown', this.handleKeyDownBound);
    } else {
      document.body.removeEventListener('keydown', this.handleKeyDownBound);
    }
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;

    this.targetEl.classList.remove(this.targetActiveClass);

    if (this.animatedIconEl) {
      this.animatedIconEl.classList.remove(
        this.triggerIconActiveClass,
        this.isOpen
      );
    }
    this.triggerEl.setAttribute('aria-expanded', 'false');
    const anyOpen = allInstances.some((instance) => instance.isOpen);
    document.body.style.overflow = anyOpen ? 'hidden' : '';

    document.body.removeEventListener('keydown', this.handleKeyDownBound);
  }

  handleKeyDown(event) {
    console.log(event);

    if (event.key === 'Escape') {
      this.close();
    }
  }
}

export default BurgerMenu;
