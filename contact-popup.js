// contact-popup.js
// Gère l'ouverture du modal quand on clique sur #nav-contact,
// et les actions : ouvrir WhatsApp, ouvrir mailto, copier dans le presse-papier.

// =========== CONFIG ===========
// Remplace PHONE par ton numéro WhatsApp en format international (sans + ni espaces).
const PHONE = '21656025170'; // <- remplace par ton numéro réel ex: 33612345678
const RECEIVER_EMAIL = 'mohamedabdelhak816@gmail.com'; // déjà renseigné

// Texte par défaut pour WhatsApp (modifiable)
const WA_DEFAULT_TEXT = 'Bonjour, je souhaite en savoir plus sur vos services.';

// ==============================
(function () {
  // Détection mobile
  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  // Construire URL WhatsApp selon device
  function buildWhatsAppUrl(phone, text) {
    const encoded = encodeURIComponent(text || '');
    if (isMobile()) {
      return `whatsapp://send?phone=${phone}&text=${encoded}`;
    } else {
      return `https://wa.me/${phone}?text=${encoded}`;
    }
  }

  // Construire mailto
  function buildMailto(to, subject = '', body = '') {
    return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // Copier texte dans le presse-papier et indiquer succès via small feedback (simple)
  function copyToClipboard(text) {
    if (!navigator.clipboard) {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(textarea);
      return;
    }
    navigator.clipboard.writeText(text);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const navContact = document.getElementById('nav-contact');
    const modalEl = document.getElementById('contactModal');

    // Si modal ou navContact manquent, on quitte
    if (!modalEl) {
      console.warn('contactModal introuvable — collez le HTML du modal dans la page.');
      return;
    }

    // Initialise le contenu du modal (numéro et email)
    const waNumberEl = document.getElementById('contact-whatsapp-number');
    const emailEl = document.getElementById('contact-email');
    const waBtn = document.getElementById('contact-wa-btn');
    const waCopyBtn = document.getElementById('contact-wa-copy');
    const emailBtn = document.getElementById('contact-email-btn');
    const emailCopyBtn = document.getElementById('contact-email-copy');

    // Format d'affichage lisible (tu peux l'adapter)
    function formatPhoneDisplay(phone) {
      // tentative simple : +33 6 xx xx xx xx pour FR (si commence par 33)
      if (phone.startsWith('33') && phone.length === 11) {
        return '+' + phone.slice(0, 2) + ' ' + phone.slice(2, 3) + ' ' + phone.slice(3, 5) + ' ' + phone.slice(5, 7) + ' ' + phone.slice(7, 9) + ' ' + phone.slice(9);
      }
      return '+' + phone;
    }

    // Set values
    waNumberEl.textContent = formatPhoneDisplay(PHONE);
    emailEl.textContent = RECEIVER_EMAIL;

    // Ouvrir modal quand on clique sur le lien/navContact
    if (navContact) {
      navContact.addEventListener('click', function (e) {
        e.preventDefault();
        // Utilise Bootstrap modal API
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      });
    }

    // WhatsApp button
    if (waBtn) {
      waBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const url = buildWhatsAppUrl(PHONE, WA_DEFAULT_TEXT);
        // Ouvrir dans nouvel onglet (mobile ouvrira app)
        window.open(url, '_blank');
      });
    }

    // Copier WhatsApp
    if (waCopyBtn) {
      waCopyBtn.addEventListener('click', function () {
        copyToClipboard(PHONE);
        waCopyBtn.textContent = 'Copié';
        setTimeout(() => waCopyBtn.textContent = 'Copier', 1400);
      });
    }

    // Email button
    if (emailBtn) {
      emailBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const subject = 'Demande depuis le site — Répondo';
        const body = 'Bonjour,%0A%0AJe vous contacte depuis le site Répondo.%0A%0A--%0AEnvoyé depuis le site';
        const mailto = buildMailto(RECEIVER_EMAIL, subject, ''); // on laisse le corps vide ici
        // Ouvre la fenêtre de composition mail
        window.open(mailto, '_blank');
      });
    }

    // Copier email
    if (emailCopyBtn) {
      emailCopyBtn.addEventListener('click', function () {
        copyToClipboard(RECEIVER_EMAIL);
        emailCopyBtn.textContent = 'Copié';
        setTimeout(() => emailCopyBtn.textContent = 'Copier', 1400);
      });
    }

  });
})();