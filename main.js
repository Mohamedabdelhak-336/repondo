// Déclenche les animations d'entrée pour tous les éléments .fade-up et .btn-animate
// Place ce fichier dans assets/js/main.js et importe-le dans index.html (avant </body>)
document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.fade-up, .btn-animate');

  if (!('IntersectionObserver' in window)) {
    // fallback : animer tout directement
    elements.forEach(el => el.classList.add('animate'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  elements.forEach(el => observer.observe(el));
});