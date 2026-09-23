// this.matrix = [1, 0, 0, 1, 0, 0];


export class MapZoom {
  constructor(containerSelector, targetSelector) {
    this.container = document.querySelector(containerSelector);
    this.target = document.querySelector(targetSelector);
    
    if (!this.container || !this.target) return;

    // Матрица: [scaleX, skewY, skewX, scaleY, translateX, translateY]
    this.matrix = [1, 0, 0, 1, 0, 0];
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    
    this.config = {
      minScale: 1,
      maxScale: 4,
      step: 0.5 
    };

    this.init();
  }

  init() {    
    this.target.style.transformOrigin = 'center center';
    this.container.style.cursor = 'grab';
    
    const btnIn = this.container.querySelector('.map-btn--zoom-in');
    const btnOut = this.container.querySelector('.map-btn--zoom-out');

    if (btnIn) btnIn.addEventListener('click', () => this.changeZoom(this.config.step));
    if (btnOut) btnOut.addEventListener('click', () => this.changeZoom(-this.config.step));
    
    this.container.addEventListener('mousedown', (e) => this.startDrag(e));
    window.addEventListener('mousemove', (e) => this.drag(e));
    window.addEventListener('mouseup', () => this.stopDrag());
  }

  updateTransform(smooth = false) {
    this.target.style.transition = smooth ? 'transform 0.3s ease-out' : 'none';
    this.target.style.transform = `matrix(${this.matrix.join(',')})`;
  }

  changeZoom(direction) {
    const currentScale = this.matrix[0];
    let newScale = currentScale + direction;
    
    if (newScale < this.config.minScale) newScale = this.config.minScale;
    if (newScale > this.config.maxScale) newScale = this.config.maxScale;

    if (newScale === currentScale) return;
    
    this.matrix[0] = newScale; 
    this.matrix[3] = newScale; 

    if (newScale === 1) {
      this.matrix[4] = 0; 
      this.matrix[5] = 0; 
    }

    this.updateTransform(true); 
  }

  startDrag(e) {    
    if (e.target.closest('[data-category]') || e.target.closest('.map-btn')) return;
    
    this.isDragging = true;
    this.container.style.cursor = 'grabbing';    
    
    this.startX = e.clientX - this.matrix[4];
    this.startY = e.clientY - this.matrix[5];
  }

  drag(e) {
    if (!this.isDragging) return;
    if (this.matrix[0] === 1) return; 
    
    this.matrix[4] = e.clientX - this.startX;
    this.matrix[5] = e.clientY - this.startY;

    this.updateTransform(false);
  }

  stopDrag() {
    this.isDragging = false;
    this.container.style.cursor = 'grab';
  }
}