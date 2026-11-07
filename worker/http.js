export function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Limite de débit par IP (binding "ratelimits" de wrangler.jsonc).
// Retourne true si la requête doit être refusée.
export async function rateLimited(env, request, route) {
  if (!env.RATE_LIMITER) return false; // pas de binding (ex. tests locaux)
  const ip = request.headers.get('CF-Connecting-IP') || 'inconnue';
  const { success } = await env.RATE_LIMITER.limit({ key: `${route}:${ip}` });
  return !success;
}

export async function envoyerEmailResend(env, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Erreur Resend (${res.status}) : ${txt.slice(0, 200)}`);
  }
}
