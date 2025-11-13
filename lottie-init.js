// lottie-init.js - lazy-load + debug logs
// Assure toi d'inclure : <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('hero-lottie');

  if (!player) {
    console.warn('lottie-init: player element #hero-lottie introuvable.');
    return;
  }

  // debug: verifier si le src est trouvé
  console.log('lottie-init: player trouvé, src=', player.getAttribute('src'));

  // Si prefers-reduced-motion -> ne pas autoplay
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    console.log('lottie-init: prefers-reduced-motion activé, animation désactivée.');
    try { player.stop(); } catch (e) { /* noop */ }
    player.style.display = 'none';
    return;
  }

  // Vérifier que le JSON peut être fetché (utile quand on ouvre en file://)
  const src = player.getAttribute('src');
  if (src) {
    fetch(src, { method: 'GET' })
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(json => {
        console.log('lottie-init: JSON Lottie chargé correctement (taille approx):', JSON.stringify(json).length, 'chars');
        // Lottie-player va gérer le rendu; on active l'observer ci-dessous
      })
      .catch(err => {
        console.error('lottie-init: impossible de charger', src, err);
        console.info('Si tu ouvres le fichier en file://, démarre un serveur local (ex: python -m http.server) ou utilise Live Server.');
      });
  }

  // IntersectionObserver pour démarrer quand visible
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          try {
            if (typeof player.play === 'function') {
              player.play();
              console.log('lottie-init: play() appelé sur player.');
            } else {
              console.warn('lottie-init: play() non disponible sur player.');
            }
          } catch (e) {
            console.error('lottie-init: erreur lors du play():', e);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    obs.observe(player);
  } else {
    // fallback : play immédiatement
    try {
      player.play();
      console.log('lottie-init: IntersectionObserver non disponible - play immédiat.');
    } catch (e) {
      console.error('lottie-init: erreur play fallback:', e);
    }
  }
});