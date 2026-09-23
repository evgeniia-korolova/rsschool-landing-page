class ToursModel {
  constructor() {
    this.tours = [];
    this.currentCategory = 'all';
  }

  async loadTours() {
    try {
      const response = await fetch('./data/tours.json');
      if (!response.ok) throw new Error('Network response was not ok');
      this.tours = await response.json();
      return this.tours;
    } catch (error) {
      console.error('Failed to load tours data:', error);
      return [];
    }
  }

  setCategory(category) {
    this.currentCategory = category;
  }

  getFilteredTours() {
    if (this.currentCategory === 'all') {
      return this.tours;
    }
    return this.tours.filter((tour) => tour.category === this.currentCategory);
  }
}

export default ToursModel;
