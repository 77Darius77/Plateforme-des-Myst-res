// Ajoute la prop breadcrumb (BreadcrumbList JSON-LD, géré par Layout.astro)
// sur les 79 articles de blog qui n'en ont aucun : Accueil > Blog > [titre].
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../src/pages/blog');
const BASE = 'https://plateforme-des-mysteres.com';

const files = readdirSync(blogDir)
  .filter(f => f.endsWith('.astro') && f !== 'index.astro')
  .map(f => path.join(blogDir, f));

let done = 0;
const skipped = [];

for (const file of files) {
  let content = readFileSync(file, 'utf8');

  if (content.includes('breadcrumb=')) { skipped.push(path.basename(file) + ' (déjà présent)'); continue; }

  const headlineMatch = content.match(/"headline":\s*"((?:[^"\\]|\\.)*)"/);
  const canonicalMatch = content.match(/canonicalPath="(blog\/[^"]+\/)"/);
  const jsonLdPropMatch = content.match(/\n(\s*)jsonLd=\{jsonLd\}\n/);

  if (!headlineMatch || !canonicalMatch || !jsonLdPropMatch) {
    skipped.push(path.basename(file) + ' (structure inattendue)');
    continue;
  }

  const headline = headlineMatch[1].replace(/\\"/g, '"');
  const slug = canonicalMatch[1];
  const indent = jsonLdPropMatch[1];

  const breadcrumbProp =
`${indent}jsonLd={jsonLd}\n` +
`${indent}breadcrumb={[\n` +
`${indent}  { name: "Accueil", item: "${BASE}/" },\n` +
`${indent}  { name: "Blog", item: "${BASE}/blog/" },\n` +
`${indent}  { name: ${JSON.stringify(headline)}, item: "${BASE}/${slug}" }\n` +
`${indent}]}\n`;

  content = content.replace(jsonLdPropMatch[0], '\n' + breadcrumbProp);
  writeFileSync(file, content, 'utf8');
  done++;
}

console.log(`Breadcrumb ajouté : ${done}`);
console.log(`Ignorés : ${skipped.length}`);
if (skipped.length) console.log(skipped.join('\n'));
