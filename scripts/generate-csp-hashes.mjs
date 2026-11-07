// Génère worker/script-hashes.json : empreintes SHA-256 de tous les <script> inline
// de dist/, pour le script-src du CSP (appliqué par worker/security-headers.js).
// Exécuté à chaque build (après astro build) : plus aucune liste de hachages à
// maintenir à la main, et un script modifié reste automatiquement autorisé.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

function* walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith('.html')) yield p;
  }
}

const hashes = new Set();
const re = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
for (const file of walk('dist')) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(re)) {
    if (/application\/ld\+json/i.test(m[1])) continue; // données, non exécutées
    hashes.add(createHash('sha256').update(m[2], 'utf8').digest('base64'));
  }
}
const sorted = [...hashes].sort();
writeFileSync('worker/script-hashes.json', JSON.stringify(sorted, null, 2) + '\n');
console.log(`  ✅ CSP : ${sorted.length} empreintes de scripts inline générées`);
