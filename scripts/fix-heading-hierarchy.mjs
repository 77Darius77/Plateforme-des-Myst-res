// Corrige le saut H1→H3 (sans H2) sur les 15 pages de tirage : insère un H2
// invisible (.sr-only) juste après le sous-titre, landmark sémantique pour
// les moteurs et lecteurs d'écran, sans aucun impact visuel.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const files = [
  'src/pages/tarologie/marseille/croix.astro',
  'src/pages/tarologie/marseille/astrologique.astro',
  'src/pages/tarologie/marseille/ligne.astro',
  'src/pages/tarologie/marseille/trois-cartes.astro',
  'src/pages/tarologie/rider-waite/spirituel.astro',
  'src/pages/tarologie/rider-waite/relation.astro',
  'src/pages/tarologie/rider-waite/fer-a-cheval.astro',
  'src/pages/tarologie/rider-waite/croix-celtique.astro',
  'src/pages/tarologie/thoth/spirituel.astro',
  'src/pages/tarologie/thoth/arbre-de-vie.astro',
  'src/pages/tarologie/thoth/etoile-de-david.astro',
  'src/pages/tarologie/thoth/angle-mort.astro',
  'src/pages/oracles/yi-king/simple.astro',
  'src/pages/oracles/yi-king/mutation.astro',
  'src/pages/oracles/yi-king/trois-hexagrammes.astro'
];

let done = 0;
for (const rel of files) {
  const file = path.join(root, rel);
  let content = readFileSync(file, 'utf8');

  const subtitleMatch = content.match(/(\n(\s*)<p class="subtitle">[^<]*<\/p>\n)/);
  if (!subtitleMatch) { console.log(`Ignoré (motif introuvable) : ${rel}`); continue; }

  if (content.includes('sr-only')) { console.log(`Déjà présent : ${rel}`); continue; }

  const [fullMatch, , indent] = subtitleMatch;
  const insertion = fullMatch + `${indent}<h2 class="sr-only">Résultat du tirage</h2>\n`;
  content = content.replace(fullMatch, insertion);
  writeFileSync(file, content, 'utf8');
  done++;
}

console.log(`H2 sr-only inséré : ${done}/${files.length}`);
