# Migration Netlify → Cloudflare Workers

Branche `cloudflare-migration`. `netlify.toml` et `netlify/functions/` sont conservés
tant que Netlify reste en ligne ; à supprimer après la bascule.

## Ce qui remplace quoi
| Netlify | Cloudflare |
|---|---|
| `publish = dist` | `assets.directory` (wrangler.jsonc) |
| Netlify Forms (`contact`) | `POST /api/contact` → Resend (worker/contact.js) |
| Function `generer-rapport` | `POST /api/generer-rapport` (worker/rapport.js) |
| Arcjet (shield/bot/5 req/10 min) | binding Rate Limiting : 5 req/min/IP |
| En-têtes de sécurité (`netlify.toml`) | worker/security-headers.js (CSP > 2000 car. : impossible dans `_headers`) |
| Cache `immutable` | `public/_headers` |
| Redirections `.html` → URL propre (301) | gérées nativement (`html_handling`) + 307→301 dans worker/index.js |
| 404 catch-all | `not_found_handling: "404-page"` |

## Déploiement
1. Cloudflare > Workers & Pages > Create > Import a repository (branche `cloudflare-migration`).
   Build : `npm run build` · Deploy : `npx wrangler deploy` · variable `NODE_VERSION=24`.
2. Secret : `npx wrangler secret put RESEND_API_KEY`.
3. Tester sur l'URL `*.workers.dev` (contact, rapport avec une vraie clé Gumroad).
4. Ajouter le domaine `plateforme-des-mysteres.com` (Custom Domain du Worker), puis couper Netlify.

## À savoir
- Le rapport PDF est généré dans le Worker (testé : 22 pages, ~0,4 s CPU local).
  Sur le plan gratuit, la limite CPU est de 10 ms/requête : prévoir le plan Workers Paid (5 $/mois).
- Les hachages sha256 du CSP sont repris tels quels : à régénérer si les scripts inline changent.
