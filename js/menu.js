const allInstances = [];

class BurgerMenu {
  constructor({
    triggerSelector,
    targetSelector,
    triggerIconActiveClass,
    targetActiveClass,
    linkSelector = null
  }) {
    this.triggerEl = document.querySelector(triggerSelector);
    this.targetEl = document.querySelector(targetSelector);

    this.triggerIconActiveClass = triggerIconActiveClass;
    this.targetActiveClass = targetActiveClass;
    this.linkSelector = linkSelector;
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
      
      links.forEach(link => {
        link.addEventListener('click', () => {
          this.close();
        });
      });
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.targetEl.classList.toggle(this.targetActiveClass, this.isOpen);

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

    document.body.style.overflow = this.isOpen ? "hidden" : "";

    if (this.isOpen) {
      document.body.addEventListener('keydown', this.handleKeyDownBound);
    } else {
      document.body.removeEventListener('keydown', this.handleKeyDownBound);
    }
  }

  close() {
    this.isOpen = false;
    
    this.targetEl.classList.remove(this.targetActiveClass, this.isOpen);

    if (this.animatedIconEl) {
      this.animatedIconEl.classList.remove(
        this.triggerIconActiveClass,
        this.isOpen
      );
    }
    this.triggerEl.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = "";

    document.body.removeEventListener('keydown', this.handleKeyDownBound);
  }

  handleKeyDown(event) {    
    console.log(event);
    
     if(event.key === "Escape") {
      this.close()
     }
  }
}

export default BurgerMenu;
