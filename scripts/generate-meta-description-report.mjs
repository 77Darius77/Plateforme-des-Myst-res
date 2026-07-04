// Étape 9.0 (PRD audit-critique) — Génère le rapport lisible
// docs/meta-descriptions-a-raccourcir.md à partir de la mesure produite par
// scripts/measure-meta-descriptions.mjs.
//
// LECTURE SEULE sur le site : ce script ne touche à aucun fichier .astro, ni
// à dist/. Il écrit uniquement docs/meta-descriptions-a-raccourcir.md.
//
// Découpage en 4 lots de 20 pages (9.1 à 9.4), tel que défini dans le PRD :
// lot 1 = rangs 1-20, lot 2 = 21-40, lot 3 = 41-60, lot 4 = 61-fin.
// Le nombre exact de pages >160 caractères est mesuré, pas supposé (le PRD
// annonce "~90" — ce script confirme le chiffre réel).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outFile = path.join(root, 'docs', 'meta-descriptions-a-raccourcir.md');
const LIMIT = 160;
const LOT_SIZE = 20;

const measureScript = path.join(__dirname, 'measure-meta-descriptions.mjs');
const raw = execFileSync('node', [measureScript], { cwd: root, encoding: 'utf-8', maxBuffer: 1024 * 1024 * 20 });
const result = JSON.parse(raw);

const { totalPages, overLimit, missingDescription, unresolvedSource } = result;

// Le PRD (étape 9.1-9.4) fige explicitement 4 lots de 20 pages, le 4e lot
// absorbant le reste (conçu à l'origine pour ~90 pages -> lot 4 = 61-90).
// On garde exactement 4 lots même si le compte réel diffère de 90 : les 3
// premiers lots restent des tranches de 20, le dernier va jusqu'à la fin de
// la liste triée, pour ne pas invalider le découpage déjà annoncé aux
// étapes suivantes.
function lotBounds(overLimitCount) {
  const bounds = [];
  for (let start = 1; start <= 3 * LOT_SIZE && start <= overLimitCount; start += LOT_SIZE) {
    const end = Math.min(start + LOT_SIZE - 1, overLimitCount);
    bounds.push([start, end]);
  }
  const lastEnd = bounds.length ? bounds[bounds.length - 1][1] : 0;
  if (lastEnd < overLimitCount) {
    bounds.push([lastEnd + 1, overLimitCount]);
  }
  return bounds;
}

function renderRow(rank, row) {
  return `| ${rank} | ${row.length} | \`${row.sourcePath}\` | ${row.description.replace(/\|/g, '\\|')} |`;
}

function renderLot([from, to]) {
  const slice = overLimit.slice(from - 1, to);
  const lines = [
    `### Lot ${from === 1 ? 1 : Math.floor((from - 1) / LOT_SIZE) + 1} — pages ${from} à ${to}`,
    '',
    '| # | Longueur | Fichier source | Meta description actuelle |',
    '|---|----------|-----------------|----------------------------|',
    ...slice.map((row, i) => renderRow(from + i, row)),
    '',
  ];
  return lines.join('\n');
}

const bounds = lotBounds(overLimit.length);

const header = `# Meta descriptions à raccourcir (>160 caractères)

Généré par \`scripts/generate-meta-description-report.mjs\` (qui appelle
\`scripts/measure-meta-descriptions.mjs\`) — Étape 9.0 du PRD
\`plans/plateforme-des-mysteres-audit-critique-ameliorations.md\`.

**Ce document est un rapport de mesure en lecture seule.** Aucune meta
description n'a été modifiée pour produire ce fichier. Le raccourcissement
éditorial (lots 9.1 à 9.4) est un travail ultérieur, page par page, avec
relecture humaine — voir l'anti-pattern documenté dans le PRD : ne pas
tronquer mécaniquement.

## Méthodologie

- Source des données : \`dist/**/*.html\` généré par \`npm run build\`, et non
  les fichiers \`.astro\` sources directement — la valeur de \`description\`
  passée à \`<Layout>\` peut être calculée (variables, concaténation), donc
  parser le HTML déjà rendu par Astro donne la valeur réellement publiée,
  sans avoir à réimplémenter l'évaluation des templates.
- Longueur mesurée en **caractères Unicode** (comptage par code point via
  \`[...string].length\`), pas en octets — important pour les caractères
  accentués français (é, è, à, ê, ù, ç, œ, …) qui prennent plusieurs octets en
  UTF-8 mais comptent pour 1 caractère.
- Le chemin \`.astro\` source est retrouvé par correspondance directe avec la
  route (le site n'a aucune route dynamique \`getStaticPaths\`/\`[slug]\`, donc
  \`dist/x/y/index.html\` correspond à \`src/pages/x/y.astro\` ou
  \`src/pages/x/y/index.astro\`).

## Résultat global

- Pages totales analysées (\`dist/**/*.html\`) : **${totalPages}**
- Pages sans balise \`<meta name="description">\` détectée : **${missingDescription.length}**${missingDescription.length ? '\n  - ' + missingDescription.join('\n  - ') : ''}
- Chemin source \`.astro\` non résolu : **${unresolvedSource.length}**${unresolvedSource.length ? '\n  - ' + unresolvedSource.join('\n  - ') : ''}
- **Pages dépassant 160 caractères : ${overLimit.length}** (le PRD annonçait "~90" — chiffre réel confirmé ci-dessus)

## Répartition en 4 lots (pour les étapes 9.1 à 9.4)

${bounds.map(([from, to], i) => `- Lot ${i + 1} (étape 9.${i + 1}) : pages ${from} à ${to} (${to - from + 1} pages)`).join('\n')}

---

${bounds.map(renderLot).join('\n')}
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, header, 'utf-8');
console.log(`Rapport écrit : ${path.relative(root, outFile)}`);
console.log(`Total pages analysées : ${totalPages}`);
console.log(`Pages >160 caractères : ${overLimit.length}`);
console.log(`Lots : ${bounds.map(([f, t]) => `${f}-${t}`).join(', ')}`);
