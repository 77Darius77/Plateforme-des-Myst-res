// Régénère public/llms.txt avec la liste individuelle des 79 articles de
// blog (catégorisés), remplaçant la ligne unique "Blog — 76 articles".
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../src/pages/blog');
const outFile = path.join(__dirname, '../public/llms.txt');

const files = readdirSync(blogDir)
  .filter(f => f.endsWith('.astro') && f !== 'index.astro')
  .sort();

function categorize(filename) {
  if (filename.startsWith('analyse-')) return 'Portraits numérologiques';
  if (/^(methode-|nombres-|cinq-nombres-pythagoriciens|lo-shu-fleches|kua-ba-zhai|numerologie-couple|reflexions-numerologie|72-noms-dieu|pythagore-vs-cabalistique)/.test(filename)) return 'Numérologie — méthodes';
  if (/^(astro-|astrologie-|siderale-vs-tropicale|jyotish-introduction|nakshatras|vimshottari-dasha|douze-ascendants|retour-saturne|compatibilite-astrologique|triade-soleil-lune)/.test(filename)) return 'Astrologie';
  return 'Tarot & Oracles';
}

const categories = {
  'Portraits numérologiques': [],
  'Numérologie — méthodes': [],
  'Tarot & Oracles': [],
  'Astrologie': []
};

for (const f of files) {
  const filePath = path.join(blogDir, f);
  const content = readFileSync(filePath, 'utf8');
  const headlineMatch = content.match(/"headline":\s*"((?:[^"\\]|\\.)*)"/);
  const descMatch = content.match(/"description":\s*"((?:[^"\\]|\\.)*)"/);
  const canonicalMatch = content.match(/canonicalPath="(blog\/[^"]+\/)"/);
  if (!headlineMatch || !descMatch || !canonicalMatch) { console.log(`Ignoré : ${f}`); continue; }

  const headline = headlineMatch[1].replace(/\\"/g, '"');
  let desc = descMatch[1].replace(/\\"/g, '"');
  if (desc.length > 140) desc = desc.slice(0, 137).trimEnd() + '…';
  const url = `https://plateforme-des-mysteres.com/${canonicalMatch[1]}`;

  categories[categorize(f)].push(`- [${headline}](${url}): ${desc}`);
}

const blogSection = Object.entries(categories)
  .filter(([, items]) => items.length > 0)
  .map(([cat, items]) => `### ${cat}\n${items.join('\n')}`)
  .join('\n\n');

const total = Object.values(categories).reduce((sum, a) => sum + a.length, 0);

const original = readFileSync(outFile, 'utf8');
const updated = original.replace(
  /## Blog\n- \[Blog — \d+ articles\]\([^)]+\): [^\n]+\n/,
  `## Blog\n- [Blog — ${total} articles](https://plateforme-des-mysteres.com/blog/): Analyses, méthodes, portraits numérologiques, guides ésotériques.\n\n${blogSection}\n`
);

writeFileSync(outFile, updated, 'utf8');
console.log(`llms.txt mis à jour : ${total} articles listés individuellement.`);
