/* ── Netlify Function : Générateur du Rapport d'Incarnation ───────────────
   POST /.netlify/functions/generer-rapport
   Body JSON : { prenom, nom, dateNaissance, email, licenseKey }
   Vars Netlify : GUMROAD_API_KEY, RESEND_API_KEY                          */

import { calculerProfil }    from './lib/calculs.js';
import { assemblerContenu }  from './lib/textes.js';
import { genererRapportPDF } from './lib/generateur-pdf.js';
import { Resend }            from 'resend';
import arcjet, { shield, detectBot, slidingWindow } from '@arcjet/node';

let aj = null;
if (process.env.ARCJET_KEY) {
  aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
      shield({ mode: 'LIVE' }),
      detectBot({
        mode: 'LIVE',
        allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:MONITOR', 'CATEGORY:PREVIEW'],
      }),
      slidingWindow({ mode: 'LIVE', interval: '10m', max: 5 }),
    ],
  });
} else {
  console.warn('ARCJET_KEY non définie — protection Arcjet désactivée');
}

const GUMROAD_PRODUCT_ID = 'faObuZYZEngNX_Pf9BKZFw=='; // product_id Gumroad

// ── Validation de la clé Gumroad (avec retry léger sur erreur réseau) ────
async function validerCleGumroad(licenseKey, tentativesRestantes = 2) {
  let res;
  try {
    res = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    new URLSearchParams({
        product_id:           GUMROAD_PRODUCT_ID,
        license_key:          licenseKey,
        increment_uses_count: 'true',
      }),
    });
  } catch (err) {
    if (tentativesRestantes > 0) {
      await new Promise((r) => setTimeout(r, 500));
      return validerCleGumroad(licenseKey, tentativesRestantes - 1);
    }
    console.error('Gumroad injoignable après retries:', err?.message || err);
    return { valide: false, raison: 'Service de vérification de licence indisponible. Réessayez dans un instant.' };
  }

  const data = await res.json();

  if (!data.success) {
    return { valide: false, raison: `Clé invalide (${data.message || 'erreur inconnue'})` };
  }
  if (data.uses > 3) {
    return { valide: false, raison: 'Cette clé a déjà été utilisée le nombre maximal de fois.' };
  }
  return { valide: true };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Envoi email avec PDF en pièce jointe ──────────────────────────────────
async function envoyerRapport(email, prenom, pdfBuffer, resendApiKey) {
  const resend = new Resend(resendApiKey);
  const prenomSafe = escapeHtml(prenom);

  const { error } = await resend.emails.send({
    from:    'Plateforme des Mystères <onboarding@resend.dev>',
    replyTo: 'plateformedesmysteres@gmail.com',
    to:      [email],
    subject: `✦ Votre Rapport d'Incarnation, ${prenomSafe}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#faf7f2;color:#1a1a2e">
        <div style="text-align:center;margin-bottom:28px">
          <p style="font-size:28px;color:#d4af37;margin:0">◈</p>
          <h1 style="font-size:22px;font-weight:700;margin:8px 0 4px">Votre Rapport d'Incarnation</h1>
          <p style="color:#6b7280;font-size:14px;margin:0">Plateforme des Mystères</p>
        </div>

        <p style="font-size:15px;line-height:1.7">Bonjour <strong>${prenomSafe}</strong>,</p>
        <p style="font-size:15px;line-height:1.7">
          Votre Rapport d'Incarnation personnalisé est prêt. Vous le trouverez en pièce jointe de cet email.
        </p>
        <p style="font-size:15px;line-height:1.7">Ce rapport croise :</p>
        <ul style="font-size:15px;line-height:1.9;padding-left:20px">
          <li><strong>Numérologie pythagoricienne</strong> — vos 5 nombres fondamentaux avec ombre et clés pratiques</li>
          <li><strong>Planète gouvernante</strong> — pont entre numérologie et astrologie</li>
          <li><strong>Tarot de Marseille</strong> — votre arcane de vie et de l'année</li>
          <li><strong>Astrologie solaire</strong> — votre signe, élément et modalité</li>
          <li><strong>Carré Lo Shu</strong> — grille géométrique de votre date de naissance</li>
          <li><strong>Carré de 9 Lenormand</strong> — tirage oracle en 9 cartes</li>
          <li><strong>Tikoun</strong> — vos leçons et dettes karmiques</li>
          <li><strong>Synthèse</strong> — convergences et tensions entre les disciplines</li>
        </ul>
        <p style="font-size:15px;line-height:1.7">
          Prenez le temps de le lire dans le calme, idéalement avec un carnet à portée de main.
        </p>

        <div style="border-top:1px solid #d4af37;margin:28px 0 20px;padding-top:16px;text-align:center">
          <p style="font-size:12px;color:#9ca3af;line-height:1.6">
            Ce rapport est personnel et confidentiel.<br>
            Il n'est ni un diagnostic médical, ni un conseil psychologique.<br>
            <a href="https://plateforme-des-mysteres.com" style="color:#d4af37">Plateforme des Mystères</a>
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename:    `Rapport-Incarnation-${prenom}.pdf`,
        content:     pdfBuffer.toString('base64'),
        contentType: 'application/pdf',
      },
    ],
  });

  if (error) throw new Error(`Erreur Resend : ${error.message}`);
}

// ── Validation des entrées ────────────────────────────────────────────────
function validerEntrees({ prenom, nom, dateNaissance, email, licenseKey }) {
  if (!prenom?.trim())              return 'Le prénom est requis.';
  if (prenom.trim().length > 60)    return 'Le prénom est trop long.';
  if (!nom?.trim())                 return 'Le nom est requis.';
  if (nom.trim().length > 100)      return 'Le nom est trop long.';
  if (!email?.includes('@'))        return 'L\'adresse email est invalide.';
  if (email.length > 200)           return 'L\'adresse email est trop longue.';
  if (!licenseKey?.trim())          return 'La clé de licence est requise.';
  if (licenseKey.trim().length > 100) return 'Clé de licence invalide.';

  const dateRe = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRe.test(dateNaissance)) return 'La date doit être au format JJ/MM/AAAA.';

  const [j, m, a] = dateNaissance.split('/').map(Number);
  if (m < 1 || m > 12 || j < 1 || j > 31 || a < 1900 || a > 2025) {
    return 'La date de naissance est invalide.';
  }
  return null;
}

// ── Handler principal ─────────────────────────────────────────────────────
export const handler = async (event, context) => {
  // CORS preflight : toujours répondu, même si la protection est mal configurée
  // (aucune donnée n'est exposée par une réponse à OPTIONS).
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin':  'https://plateforme-des-mysteres.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  // Fail-closed : en production, refuser tout traitement si Arcjet n'est pas
  // configuré plutôt que de continuer sans protection en silence (le CONTEXT
  // Netlify natif distingue production/deploy-preview/branch-deploy/dev — ne
  // jamais bloquer en dehors de production, où l'absence de clé est légitime).
  if (!aj && process.env.CONTEXT === 'production') {
    console.error('ARCJET_KEY manquante en production — requête refusée (fail-closed)');
    return {
      statusCode: 503,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://plateforme-des-mysteres.com',
      },
      body: JSON.stringify({ erreur: 'Service temporairement indisponible.' }),
    };
  }

  // Protection Arcjet : bouclier, détection bot, rate limit (5 req/10min)
  if (aj) {
    const decision = await aj.protect({
      ip: event.headers['x-forwarded-for'] || event.headers['client-ip'] || '127.0.0.1',
      method: event.httpMethod,
      headers: new Headers(event.headers),
      nextUrl: { pathname: event.path },
    });

    if (decision.isDenied()) {
      return {
        statusCode: decision.reason.isRateLimit() ? 429 : 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://plateforme-des-mysteres.com',
        },
        body: JSON.stringify({
          erreur: decision.reason.isRateLimit()
            ? 'Trop de requêtes. Réessayez dans quelques minutes.'
            : 'Accès refusé.',
        }),
      };
    }
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { erreur: 'Méthode non autorisée.' });
  }

  // Variables d'environnement
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY manquant');
    return json(500, { erreur: 'Configuration serveur incomplète.' });
  }

  // Limite de taille du body (5 Ko max)
  if (event.body && event.body.length > 5000) {
    return json(413, { erreur: 'Requête trop volumineuse.' });
  }

  // Parse body
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { erreur: 'Corps de requête invalide.' });
  }

  const { prenom, nom, dateNaissance, email, licenseKey, 'bot-field': botField } = body;

  // Honeypot : rejet silencieux si rempli
  if (botField) return json(200, { message: 'Traitement en cours.' });

  // Validation
  const erreurValidation = validerEntrees({ prenom, nom, dateNaissance, email, licenseKey });
  if (erreurValidation) return json(400, { erreur: erreurValidation });

  // Validation clé Gumroad
  const { valide, raison } = await validerCleGumroad(licenseKey.trim());
  if (!valide) return json(403, { erreur: raison });

  try {
    const profil  = calculerProfil(prenom.trim(), nom.trim(), dateNaissance.trim());
    const contenu = assemblerContenu(profil);
    const pdf     = await genererRapportPDF(profil, contenu);
    await envoyerRapport(email.trim(), prenom.trim(), pdf, RESEND_API_KEY);

    return json(200, {
      message: `Votre rapport a été envoyé à ${email}. Vérifiez aussi vos spams.`,
      prenom: prenom.trim(),
    });
  } catch (err) {
    console.error('Erreur génération rapport:', err?.message || err);
    console.error('Stack:', err?.stack);
    return json(500, { erreur: `Erreur interne : ${err?.message || 'inconnue'}` });
  }
};

function json(status, body) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://plateforme-des-mysteres.com',
    },
    body: JSON.stringify(body),
  };
}
