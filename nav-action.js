
(function () {
  // ========== CONFIG ==========
  // Ton lien Calendly (déjà fourni) :
  const CALENDLY_URL = 'https://calendly.com/mohamedabdelhak816/30min';
  // Durée de scroll (ms)
  const SCROLL_DURATION = 500;
  // ==========================

  // Helper smooth scroll to element (avec focus)
  function smoothScrollTo(el, duration = SCROLL_DURATION) {
    if (!el) return;
    const start = window.pageYOffset;
    const targetRect = el.getBoundingClientRect();
    const target = start + targetRect.top - 24; // small offset from top
    const distance = target - start;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const time = timestamp - startTime;
      const percent = Math.min(time / duration, 1);
      const ease = percent < 0.5 ? 2 * percent * percent : -1 + (4 - 2 * percent) * percent; // easeInOutQuad-ish
      window.scrollTo(0, Math.round(start + distance * ease));
      if (time < duration) window.requestAnimationFrame(step);
      else {
        // set focus to first focusable input inside el
        const focusable = el.querySelector('input, textarea, button, [tabindex]:not([tabindex="-1"])');
        if (focusable) focusable.focus({ preventScroll: true });
      }
    }
    window.requestAnimationFrame(step);
  }

  // Detect mobile (for Calendly deep behavior we still use the popup widget)
  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const bookBtn = document.getElementById('nav-book');
    const contactLink = document.getElementById('nav-contact');

    // ---------- Réserver : Calendly popup ----------
    if (bookBtn) {
      bookBtn.addEventListener('click', function (e) {
        e.preventDefault();
        // Si Calendly widget est présent (script chargé), on ouvre le popup
        if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
          Calendly.initPopupWidget({ url: CALENDLY_URL });
        } else {
          // Fallback : ouvrir le lien Calendly dans un nouvel onglet
          window.open(CALENDLY_URL, '_blank', 'noopener');
        }
      });
    }

    // ---------- Contact : smooth scroll vers la section contact ----------
    if (contactLink) {
      contactLink.addEventListener('click', function (e) {
        // Si le lien est local vers #contact, on smooth scroll
        const href = contactLink.getAttribute('href') || '';
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.slice(1) || 'contact';
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            smoothScrollTo(targetEl, SCROLL_DURATION);
          } else {
            // fallback : jump
            window.location.hash = href;
          }
        }
      });
    }

    // ---------- Optionnel : suivi analytics (exemple) ----------
    // Si tu utilises gtag / analytics, décommente et adapte ci‑dessous :
    // bookBtn && bookBtn.addEventListener('click', () => gtag('event','click','book_demo',{ event_category:'CTA', event_label:'nav' }));
    // contactLink && contactLink.addEventListener('click', () => gtag('event','click','open_contact',{ event_category:'CTA', event_label:'nav' }));
  });
})();