// Ajoute un lien complémentaire vers le calculateur multi-écoles sur les
// portraits de célébrités (analyse-*.astro), qui ne linkaient que vers la
// page cabalistique (déjà correcte, mais sans inviter à comparer les écoles).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../src/pages/blog');

const files = readdirSync(blogDir)
  .filter(f => f.startsWith('analyse-') && f.endsWith('.astro'))
  .map(f => path.join(blogDir, f));

let done = 0;
const skipped = [];

const pattern = /(\n(\s*)<p>🔢 Calculez[^<]*<a href="\/numerologie\/cabalistique\/"[^<]*<\/a>\.<\/p>\n)/;

for (const file of files) {
  let content = readFileSync(file, 'utf8');

  if (content.includes('/numerologie/calculateur/')) { skipped.push(path.basename(file) + ' (déjà présent)'); continue; }

  const match = content.match(pattern);
  if (!match) { skipped.push(path.basename(file) + ' (motif introuvable)'); continue; }

  const [fullMatch, , indent] = match;
  const newLine = `${indent}<p>🔮 Comparez avec les autres écoles sur le <a href="/numerologie/calculateur/" style="color:var(--gold);">calculateur multi-écoles</a>.</p>\n`;

  content = content.replace(fullMatch, fullMatch + newLine);
  writeFileSync(file, content, 'utf8');
  done++;
}

console.log(`Lien ajouté : ${done}`);
console.log(`Ignorés : ${skipped.length}`);
if (skipped.length) console.log(skipped.join('\n'));
