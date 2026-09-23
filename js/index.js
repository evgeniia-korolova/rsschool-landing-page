const initHeaderHighlight = () => {
  const currentHash = window.location.hash; 
  if (!currentHash) return; 

  const headerLinks = document.querySelectorAll('.header__menu-link');
  
  headerLinks.forEach(link => {
    link.classList.remove('header__menu-link--active');    
   
    if (link.getAttribute('href').includes(currentHash)) {
      link.classList.add('header__menu-link--active');
    }
  });
};

initHeaderHighlight();