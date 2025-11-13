```markdown
# Répondo — Bots WhatsApp (Site vitrine)

Site vitrine statique (HTML/CSS/Bootstrap) pour le service freelance "Répondo" — création de bots WhatsApp (FAQ, RDV, lead, support).

Ce dépôt contient un template simple prêt à déployer sur GitHub Pages.

## Remplacer les placeholders
- TON_NUM → ton numéro au format international sans le + (ex : 33612345678 pour +33 6 12 34 56 78)
- FORMSPREE_ID → ton identifiant Formspree (inscris-toi sur https://formspree.io)
- CALENDLY_LINK → ton lien Calendly (ex : https://calendly.com/tonpseudo/30min)

## Déploiement sur GitHub Pages (gratuit)
1. Crée un repository public nommé `repondo` ou `username.github.io` si tu veux un site utilisateur.
2. Place les fichiers (index.html, README.md) à la racine.
3. Commit & push :
   ```
   git init
   git add .
   git commit -m "Initial site Répondo"
   git branch -M main
   git remote add origin https://github.com/<ton-utilisateur>/repondo.git
   git push -u origin main
   ```
4. Sur GitHub : Settings → Pages → Source → Branch `main` / folder `/root` → Save.
5. Ton site sera disponible à `https://<ton-utilisateur>.github.io/repondo` (ou `https://<ton-utilisateur>.github.io` si repo `username.github.io`).

## Utiliser un domaine personnalisé (gratuit via Student Pack)
- Si tu as un coupon Namecheap dans GitHub Student Pack, utilise-le pour obtenir un domaine gratuit 1 an.
- Alternative gratuite : Freenom (.tk, .ml, .ga, .cf, .gq). Attention à la fiabilité à long terme.
- Configure DNS :
  - Pour un sous-domaine `www` : CNAME → `username.github.io`
  - Pour domaine apex : ajoute A records selon la documentation GitHub Pages (vérifie les IP actuelles)
- Active HTTPS dans Settings → Pages → Enforce HTTPS.

## Formulaire de contact
- Option simple : Formspree (gratuit) — remplace FORMSPREE_ID dans index.html.
- Option avancée : backend + Mailgun/SendGrid (nécessite configuration payante après essais gratuits).

## Calendrier / RDV
- Option rapide : Calendly (plan gratuit) — coller le lien dans CALENDLY_LINK.
- Option personnalisée : intégrer Google Calendar via backend et OAuth (nécessite dev).

## WhatsApp
- Lien click-to-chat utilisé pour contact rapide (wa.me). Pour bots automatisés en production, tu devras ensuite configurer WhatsApp Business API via Twilio/360dialog/Meta.

## Liens utiles
- GitHub Pages : https://pages.github.com
- GitHub Student Pack : https://education.github.com/pack
- Formspree : https://formspree.io
- Calendly : https://calendly.com
- Documentation WhatsApp Cloud API : https://developers.facebook.com/docs/whatsapp

## Prochaine étape (je peux faire pour toi)
- Je peux remplir les placeholders (numéro WhatsApp, Formspree ID, Calendly) si tu me les fournis.
- Je peux te fournir les commandes exactes pour créer le repo via l'interface GitHub ou via `gh` CLI.
- Je peux aussi préparer un README plus complet ou des fichiers supplémentaires (CNAME, images, favicon).

```