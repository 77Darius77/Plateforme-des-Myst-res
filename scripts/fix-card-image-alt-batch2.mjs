// Deuxième lot : alt dynamique sur les fichiers utilisant le pattern
// "imgEl.src = ..." (Triade, Miroirs, Gé, Runes, Yi King) plus la variante
// slotNum de marseille/croix.astro, non couverts par le premier script.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// [fichier, ligne exacte à trouver, ligne à insérer juste après]
const fixes = [
  ['src/pages/tarologie/marseille/croix.astro',
    'document.getElementById(`img-${slotNum}`).src = cardData.img;',
    'document.getElementById(`img-${slotNum}`).alt = cardData.name;'],
  ['src/pages/oracles/triade/croix.astro',
    'imgEl.src = `/images/oracles/triade/card_${cardData.id}.webp`;',
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/triade/pyramide.astro',
    'imgEl.src = `/images/oracles/triade/card_${cardData.id}.webp`;',
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/triade/trois-cartes.astro',
    'imgEl.src = `/images/oracles/triade/card_${cardData.id}.webp`;',
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/miroirs/croix.astro',
    "imgEl.src = `/images/oracles/miroirs/card_${String(cardNum).padStart(2, '0')}.webp`;",
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/miroirs/miroir.astro',
    "imgEl.src = `/images/oracles/miroirs/card_${String(cardNum).padStart(2, '0')}.webp`;",
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/miroirs/trois-cartes.astro',
    "imgEl.src = `/images/oracles/miroirs/card_${String(cardNum).padStart(2, '0')}.webp`;",
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/ge/croix.astro',
    "imgEl.src = `/images/oracles/ge/card_${String(cardNum).padStart(2, '0')}.webp`;",
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/ge/etoile.astro',
    "imgEl.src = `/images/oracles/ge/card_${String(cardNum).padStart(2, '0')}.webp`;",
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/ge/trois-cartes.astro',
    "imgEl.src = `/images/oracles/ge/card_${String(cardNum).padStart(2, '0')}.webp`;",
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/runes/croix.astro',
    "imgEl.src = '/images/oracles/runes/rune_' + String(cardNum).padStart(2, '0') + '.svg';",
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/runes/etoile.astro',
    "imgEl.src = '/images/oracles/runes/rune_' + String(cardNum).padStart(2, '0') + '.svg';",
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/runes/trois-runes.astro',
    "imgEl.src = '/images/oracles/runes/rune_' + String(cardNum).padStart(2, '0') + '.svg';",
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/yi-king/simple.astro',
    'imgEl.src = `/images/oracles/yi-king/hexagramme-${cardId}.svg`;',
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/yi-king/trois-hexagrammes.astro',
    'imgEl.src = `/images/oracles/yi-king/hexagramme-${cardId}.svg`;',
    'imgEl.alt = cardData.name;'],
  ['src/pages/oracles/yi-king/mutation.astro',
    'imgEl1.src = `/images/oracles/yi-king/hexagramme-${cardId1}.svg`;',
    'imgEl1.alt = cardData1.name;'],
  ['src/pages/oracles/yi-king/mutation.astro',
    'imgEl2.src = `/images/oracles/yi-king/hexagramme-${cardId2}.svg`;',
    'imgEl2.alt = cardData2.name;']
];

let done = 0;
for (const [rel, searchLine, insertLine] of fixes) {
  const file = path.join(root, rel);
  let content = readFileSync(file, 'utf8');

  const idx = content.indexOf(searchLine);
  if (idx === -1) { console.log(`Ignoré (introuvable) : ${rel} :: ${searchLine}`); continue; }
  if (content.includes(insertLine)) { console.log(`Déjà présent : ${rel} :: ${insertLine}`); continue; }

  const lineEnd = idx + searchLine.length;
  const lineStart = content.lastIndexOf('\n', idx) + 1;
  const indent = content.slice(lineStart, idx);

  content = content.slice(0, lineEnd) + '\n' + indent + insertLine + content.slice(lineEnd);
  writeFileSync(file, content, 'utf8');
  done++;
}

console.log(`Corrections appliquées : ${done}/${fixes.length}`);
