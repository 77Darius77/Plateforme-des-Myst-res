// postbuild.js — Minification des JS statiques vers dist/, puis garde-fou
// sur la longueur des meta descriptions (étape 9.5 du PRD audit-critique).

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { basename } from 'node:path';
import { minify } from 'terser';

const JS_DIRS = ['dist/assets/js', 'dist/js'];

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

for (const dir of JS_DIRS) {
  let files = [];
  try {
    files = execSync(`find "${dir}" -name "*.js" -type f 2>/dev/null || true`, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(f => f);
  } catch { continue; }

  for (const file of files) {
    const name = basename(file);
    if (name.endsWith('.min.js')) continue;

    const code = readFileSync(file, 'utf8');
    const sizeBefore = Buffer.byteLength(code, 'utf8');

    try {
      const result = await minify(code, {
        compress: { drop_console: false, passes: 2 },
        mangle: true,
        format: { comments: false },
      });

      if (result.code) {
        writeFileSync(file, result.code, 'utf8');
        const sizeAfter = Buffer.byteLength(result.code, 'utf8');
        totalBefore += sizeBefore;
        totalAfter += sizeAfter;
        count++;
        console.log(`  ✓ ${name.padEnd(28)} ${(sizeBefore/1024).toFixed(1)} KB → ${(sizeAfter/1024).toFixed(1)} KB (${((1-sizeAfter/sizeBefore)*100).toFixed(0)}%)`);
      }
    } catch (err) {
      console.warn(`  ⚠ ${name} : conservé (${err.message})`);
    }
  }
}

if (count > 0) {
  console.log(`\n  ✅ ${count} fichiers minifiés · ${(totalBefore/1024).toFixed(0)} KB → ${(totalAfter/1024).toFixed(0)} KB (${((1-totalAfter/totalBefore)*100).toFixed(0)}%)`);
} else {
  console.log('  ℹ Aucun fichier JS à minifier');
}

// ── Garde-fou : longueur des meta descriptions (étape 9.5) ────────────────
// Empêche toute régression future silencieuse : fait échouer le build si une
// page dépasse 160 caractères de meta description (tronquée par Google dans
// les résultats de recherche au-delà de cette limite).
const META_LIMIT = 160;
let metaFiles = [];
try {
  metaFiles = execSync('find dist -name "*.html" -type f', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);
} catch { /* dist introuvable, rien à vérifier */ }

const tooLong = [];
for (const file of metaFiles) {
  const html = readFileSync(file, 'utf8');
  const match = html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
  if (!match) continue;
  const description = match[1]
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  const length = [...description].length; // comptage par caractère Unicode, pas par octet
  if (length > META_LIMIT) tooLong.push({ file, length });
}

if (tooLong.length > 0) {
  console.error(`\n  ❌ ${tooLong.length} page(s) avec une meta description > ${META_LIMIT} caractères :`);
  for (const { file, length } of tooLong) {
    console.error(`     - ${file} (${length} caractères)`);
  }
  process.exit(1);
} else {
  console.log(`  ✅ Meta descriptions : ${metaFiles.length} pages vérifiées, toutes ≤ ${META_LIMIT} caractères`);
}
