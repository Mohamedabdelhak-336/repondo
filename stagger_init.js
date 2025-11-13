// Ajoute ce petit script après ton main.js ou intègre dans main.js.
// Il calcule et applique un délai CSS en fonction de l'attribut data-stagger,
// pour un effet staggered agréable quand IntersectionObserver déclenche .animate.

document.addEventListener('DOMContentLoaded', function () {
  const staggerElems = document.querySelectorAll('.fade-up[data-stagger]');
  staggerElems.forEach(el => {
    const n = parseFloat(el.getAttribute('data-stagger')) || 0;
    // délai = n * 0.12s (ajuste la règle si tu veux plus rapide/lent)
    const delay = (n * 0.12).toFixed(2) + 's';
    el.style.setProperty('--stagger', delay);
  });
});