document.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    const scrollPosition = window.scrollY;
  
    if (scrollPosition > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; /* Adjust the transparency as needed */
    } else {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }
  });