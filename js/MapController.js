export class MapController {
  constructor(mapContainerSelector) {
    this.container = document.querySelector(mapContainerSelector);
    if (!this.container) return;

    this.init();
  }

  init() {
    this.container.addEventListener('click', (e) => {
      // Ищем маркер (это может быть <g>, <circle> или <path> с дата-атрибутом)
      const marker = e.target.closest('[data-category]');
      
      if (marker) {
        e.preventDefault();
        const category = marker.dataset.category;
        
        // Записываем категорию в хранилище
        localStorage.setItem('wanderlust_target_category', category);
        
        // Перенаправляем пользователя на каталог
        window.location.href = 'tours.html';
      }
    });
  }
}