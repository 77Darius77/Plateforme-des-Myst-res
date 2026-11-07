// En-têtes de sécurité (équivalent du [[headers]] for="/*" de netlify.toml).
// Le CSP dépasse la limite de 2000 caractères/ligne du fichier _headers : il est
// donc posé par le Worker. Les empreintes script-src sont générées à chaque build
// par scripts/generate-csp-hashes.mjs (worker/script-hashes.json).
import scriptHashes from './script-hashes.json';

const csp = [
  `script-src 'self' ${scriptHashes.map((h) => `'sha256-${h}'`).join(' ')}`,
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://api.gumroad.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

export const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=300",
  'Content-Security-Policy': csp,
};
