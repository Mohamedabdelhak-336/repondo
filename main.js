// main.js
// 1) Intercepte un formulaire et redirige l'utilisateur vers WhatsApp
//    Envoie dans le message : Nom + E‑mail (si présent) + Message
//    Configure ton numéro en haut (format international, sans + ni espaces)
// 2) Déclenche les animations d'entrée pour tous les éléments .fade-up et .btn-animate
// Place ce fichier dans assets/js/main.js ou à la racine et importe-le depuis index.html
(function () {
  // ========== CONFIG ==========
  const DEFAULT_PHONE = "+21656025170"; // <-- remplace par ton numéro (ex: 33xxxxxxxxx)
  const DEFAULT_TEXT = "Bonjour, j'ai une demande depuis le site."; // texte par défaut si message vide
  const INTERSECTION_THRESHOLD = 0.12; // pour l'IntersectionObserver
  // ============================

  // ======= Utils WhatsApp =======
  function isMobileBrowser() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  function buildWhatsAppUrl(phone, text) {
    const encoded = encodeURIComponent(text || "");
    if (isMobileBrowser()) {
      // deep link pour ouvrir l'app sur mobile
      return `whatsapp://send?phone=${phone}&text=${encoded}`;
    } else {
      // wa.me pour desktop (ouvre WhatsApp Web)
      return `https://wa.me/${phone}?text=${encoded}`;
    }
  }

  function findFormsToIntercept() {
    // On cible explicitement les formulaires avec l'attribut data-wa-form="true"
    return Array.from(document.querySelectorAll('form[data-wa-form="true"]'));
  }

  function getFieldValue(form, name) {
    const el = form.querySelector(`[name="${name}"]`);
    return el ? el.value.trim() : "";
  }

  function composeMessage(name, email, message) {
    // Compose un message lisible ; adapte le format si besoin
    let parts = [];
    if (name) parts.push(`Nom: ${name}`);
    if (email) parts.push(`E-mail: ${email}`);
    if (message) parts.push(`Message: ${message}`);
    const body = parts.length ? parts.join("\n") : DEFAULT_TEXT;
    return body;
  }

  function interceptForm(form) {
    form.addEventListener('submit', function (e) {
      // Empêche l'envoi normal si JS est actif
      e.preventDefault();

      // Récupère les valeurs (adapte les names si nécessaire)
      const name = getFieldValue(form, "name");
      const email = getFieldValue(form, "_replyto") || getFieldValue(form, "email");
      const message = getFieldValue(form, "message") || getFieldValue(form, "msg");

      // Compose le texte
      const text = composeMessage(name, email, message);

      // Numéro prioritairement pris depuis data-wa-phone sur le formulaire
      const phone = (form.getAttribute('data-wa-phone') || DEFAULT_PHONE).replace(/[^0-9]/g, "");

      // Construit l'URL et ouvre dans un nouvel onglet/fenêtre
      const url = buildWhatsAppUrl(phone, text);

      // Ouvre en _blank pour ne pas perdre la page
      window.open(url, '_blank');

      // Optionnel : si tu veux malgré tout envoyer les données au serveur (Formspree)
      // décommente la ligne suivante après un léger délai (permet d'ouvrir WhatsApp d'abord)
      // setTimeout(() => form.submit(), 600);
    });
  }

  // ======= Utils Animation (IntersectionObserver) =======
  function initAnimations() {
    const elements = document.querySelectorAll('.fade-up, .btn-animate');

    if (!elements.length) return;

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
      threshold: INTERSECTION_THRESHOLD
    });

    elements.forEach(el => observer.observe(el));
  }

  // ======= Initialisation unique après DOM ready =======
  document.addEventListener('DOMContentLoaded', function () {
    // 1) Initialisation animations
    initAnimations();

    // 2) Interception des formulaires WhatsApp
    const forms = findFormsToIntercept();
    if (forms.length) {
      forms.forEach(interceptForm);
    }

    // 3) Optionnel : amélioration des boutons / liens WhatsApp existants ayant data-wa-phone/data-wa-text
    document.querySelectorAll('a[data-wa-phone]').forEach(a => {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        const phone = (a.getAttribute('data-wa-phone') || DEFAULT_PHONE).replace(/[^0-9]/g, "");
        const textAttr = a.getAttribute('data-wa-text') || a.getAttribute('data-text') || "";
        const text = textAttr ? decodeURIComponent(textAttr) : DEFAULT_TEXT;
        const url = buildWhatsAppUrl(phone, text);
        window.open(url, '_blank');
      });
    });
  });
})();