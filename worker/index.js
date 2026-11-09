/* ── Worker Cloudflare — Plateforme des Mystères ──────────────────────────
   - /api/contact          : formulaire de contact (remplace Netlify Forms)
   - /api/generer-rapport  : Rapport d'Incarnation (remplace la Netlify Function)
   - tout le reste         : fichiers statiques de dist/ + en-têtes de sécurité
   Secrets requis : RESEND_API_KEY (wrangler secret put RESEND_API_KEY)        */

import { handleContact } from './contact.js';
import { handleRapport } from './rapport.js';
import { SECURITY_HEADERS } from './security-headers.js';

function withSecurityHeaders(response) {
  const res = new Response(response.body, response);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.headers.set(k, v);
  return res;
}

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contact')         return withSecurityHeaders(await handleContact(request, env));
    if (pathname === '/api/generer-rapport') return withSecurityHeaders(await handleRapport(request, env));

    const asset = await env.ASSETS.fetch(request);

    // Netlify renvoyait des 301 (permanentes) pour /page.html → /page/ et
    // /page → /page/ ; Workers renvoie des 307 : on rétablit le 301 (SEO).
    if (asset.status === 307 && asset.headers.get('Location')) {
      return withSecurityHeaders(new Response(null, { status: 301, headers: asset.headers }));
    }
    return withSecurityHeaders(asset);
  },
};
