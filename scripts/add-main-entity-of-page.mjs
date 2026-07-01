// Ajoute mainEntityOfPage (recommandé par Google pour BlogPosting/Article) sur
// les 79 articles de blog, juste après le champ "url" du JSON-LD.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../src/pages/blog');

const files = readdirSync(blogDir)
  .filter(f => f.endsWith('.astro') && f !== 'index.astro')
  .map(f => path.join(blogDir, f));

let done = 0;
const skipped = [];

for (const file of files) {
  let content = readFileSync(file, 'utf8');

  if (!content.includes('"@type": "BlogPosting"')) { skipped.push(path.basename(file) + ' (pas BlogPosting)'); continue; }
  if (content.includes('mainEntityOfPage')) { skipped.push(path.basename(file) + ' (déjà présent)'); continue; }

  const urlLineMatch = content.match(/(\n(\s*)"url": "(https:\/\/plateforme-des-mysteres\.com\/blog\/[^"]+)",\n)/);
  if (!urlLineMatch) { skipped.push(path.basename(file) + ' (url introuvable)'); continue; }

  const [fullMatch, , indent, url] = urlLineMatch;
  const replacement = fullMatch + `${indent}"mainEntityOfPage": { "@type": "WebPage", "@id": "${url}" },\n`;

  content = content.replace(fullMatch, replacement);
  writeFileSync(file, content, 'utf8');
  done++;
}

console.log(`mainEntityOfPage ajouté : ${done}`);
console.log(`Ignorés : ${skipped.length}`);
if (skipped.length) console.log(skipped.join('\n'));
