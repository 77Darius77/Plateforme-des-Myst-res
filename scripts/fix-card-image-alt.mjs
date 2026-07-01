// Ajoute cardData.name comme attribut alt dynamique sur les images de cartes
// révélées (jusqu'ici alt="" figé, jamais rempli par le JS).
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const files = [
  'src/pages/oracles/belline/croix.astro',
  'src/pages/oracles/belline/trois-cartes.astro',
  'src/pages/oracles/belline/ligne.astro',
  'src/pages/oracles/belline/coupe.astro',
  'src/pages/tarologie/rider-waite/spirituel.astro',
  'src/pages/tarologie/rider-waite/relation.astro',
  'src/pages/tarologie/rider-waite/croix-celtique.astro',
  'src/pages/tarologie/rider-waite/fer-a-cheval.astro',
  'src/pages/tarologie/marseille/astrologique.astro',
  'src/pages/tarologie/marseille/trois-cartes.astro',
  'src/pages/tarologie/marseille/ligne.astro',
  'src/pages/tarologie/thoth/spirituel.astro',
  'src/pages/tarologie/thoth/arbre-de-vie.astro',
  'src/pages/tarologie/thoth/angle-mort.astro',
  'src/pages/tarologie/thoth/etoile-de-david.astro'
];

const pattern = /(document\.getElementById\(`img-\$\{i\}`\)\.src = cardData\.img;\n)/g;

let done = 0;
for (const rel of files) {
  const file = path.join(root, rel);
  let content = readFileSync(file, 'utf8');

  if (content.includes('.alt = cardData.name')) { console.log(`Déjà présent : ${rel}`); continue; }

  const matches = content.match(pattern);
  if (!matches) { console.log(`Ignoré (motif introuvable) : ${rel}`); continue; }

  content = content.replace(pattern, (m) => m + `            document.getElementById(\`img-\${i}\`).alt = cardData.name;\n`);
  writeFileSync(file, content, 'utf8');
  done++;
}

console.log(`alt dynamique ajouté : ${done}/${files.length}`);
