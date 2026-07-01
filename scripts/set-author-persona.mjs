// Uniformise l'auteur JSON-LD (Person) sur tous les articles de blog : "Plateforme
// des Mystères" (nom d'organisation) → "BlaiseG." (persona stable), et migre les
// 5 derniers articles encore en @type Organization vers Person.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../src/pages/blog');

const files = readdirSync(blogDir)
  .filter(f => f.endsWith('.astro') && f !== 'index.astro')
  .map(f => path.join(blogDir, f));

const PERSON_DESC = 'Explorateur des sagesses ésotériques — numérologie, tarot, astrologie, oracles.';

let singleLineCount = 0;
let migratedCount = 0;
let untouched = [];

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  const original = content;

  // Cas 1 : author Person single-line déjà présent
  const singleLinePattern = /"author": \{ "@type": "Person", "name": "Plateforme des Mystères"/;
  if (singleLinePattern.test(content)) {
    content = content.replace(singleLinePattern, '"author": { "@type": "Person", "name": "BlaiseG."');
    singleLineCount++;
  }

  // Cas 2 : author Organization multi-line (5 fichiers) → Person single-line
  const multiLinePattern = /"author": \{\s*"@type": "Organization",\s*"name": "Plateforme des Mystères"\s*\},/;
  if (multiLinePattern.test(content)) {
    content = content.replace(
      multiLinePattern,
      `"author": { "@type": "Person", "name": "BlaiseG.", "url": "https://plateforme-des-mysteres.com/a-propos/", "description": "${PERSON_DESC}" },`
    );
    migratedCount++;
  }

  if (content !== original) {
    writeFileSync(file, content, 'utf8');
  } else {
    untouched.push(path.basename(file));
  }
}

console.log(`Renommés (Person déjà présent) : ${singleLineCount}`);
console.log(`Migrés (Organization → Person) : ${migratedCount}`);
console.log(`Non touchés (à vérifier manuellement) : ${untouched.length}`);
if (untouched.length) console.log(untouched.join('\n'));
