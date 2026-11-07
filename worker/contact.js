/* Formulaire de contact — remplace Netlify Forms.
   POST JSON { sujet, prenom, email, message, 'bot-field' } → email via Resend. */

import { json, escapeHtml, rateLimited, envoyerEmailResend } from './http.js';

const DESTINATAIRE = 'plateformedesmysteres@gmail.com';
const SUJETS = {
  question:   'Question sur une discipline',
  analyse:    "Demande d'analyse personnalisée",
  erreur:     'Signaler une erreur',
  suggestion: "Suggestion d'amélioration",
  autre:      'Autre',
};

export async function handleContact(request, env) {
  if (request.method !== 'POST') return json(405, { erreur: 'Méthode non autorisée.' });
  if (!env.RESEND_API_KEY)       return json(500, { erreur: 'Configuration serveur incomplète.' });
  if (await rateLimited(env, request, 'contact')) {
    return json(429, { erreur: 'Trop de requêtes. Réessayez dans une minute.' });
  }

  const raw = await request.text();
  if (raw.length > 8000) return json(413, { erreur: 'Requête trop volumineuse.' });

  let body;
  try { body = JSON.parse(raw || '{}'); }
  catch { return json(400, { erreur: 'Corps de requête invalide.' }); }

  // Honeypot : rejet silencieux
  if (body['bot-field']) return json(200, { message: 'Message envoyé.' });

  const sujet   = String(body.sujet   ?? '').trim();
  const prenom  = String(body.prenom  ?? '').trim();
  const email   = String(body.email   ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!SUJETS[sujet])                         return json(400, { erreur: 'Sujet invalide.' });
  if (!prenom || prenom.length > 80)          return json(400, { erreur: 'Prénom invalide.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
                                              return json(400, { erreur: 'Adresse email invalide.' });
  if (!message || message.length > 4000)      return json(400, { erreur: 'Message invalide.' });

  try {
    await envoyerEmailResend(env, {
      from:     'Plateforme des Mystères <onboarding@resend.dev>',
      to:       [DESTINATAIRE],
      reply_to: email,
      subject:  `[Contact] ${SUJETS[sujet]} — ${prenom}`.replace(/[\r\n]+/g, ' '),
      html: `
        <p><strong>Sujet :</strong> ${escapeHtml(SUJETS[sujet])}</p>
        <p><strong>Prénom :</strong> ${escapeHtml(prenom)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
    return json(200, { message: 'Message envoyé.' });
  } catch (err) {
    console.error('Contact :', err?.message || err);
    return json(500, { erreur: "Erreur lors de l'envoi." });
  }
}
