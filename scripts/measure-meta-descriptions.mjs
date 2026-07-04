// Étape 9.0 (PRD audit-critique) — Script de mesure en LECTURE SEULE.
// Objectif : mesurer la longueur (en caractères Unicode, pas en octets) de la
// balise <meta name="description"> de chaque page générée dans dist/, et
// lister toutes les pages dépassant 160 caractères pour préparer les lots
// éditoriaux 9.1-9.4 (raccourcissement manuel, hors périmètre de ce script).
//
// Ne modifie AUCUN fichier source ni généré. Ne fait aucune écriture, à
// l'exception du rapport docs/meta-descriptions-a-raccourcir.md produit par
// le script séparé (voir README en bas de fichier).
//
// Pourquoi parser dist/**/*.html plutôt que les .astro sources directement :
// - La valeur de `description` passée à <Layout> peut être un littéral,
//   mais peut aussi être construite via template literal / concaténation
//   (variables, conditions). Parser le HTML déjà généré par Astro donne la
//   valeur RÉELLEMENT rendue, sans avoir à réimplémenter l'évaluation JS/TS
//   des fichiers .astro. C'est donc plus robuste et plus fiable qu'un regex
//   sur les sources, au prix d'un `npm run build` préalable (déjà fait).
// - Le mapping dist -> src est simple ici car le site n'a AUCUNE route
//   dynamique (aucun getStaticPaths, aucun `[slug].astro`) : chaque page est
//   un fichier .astro statique, donc dist/<route>/index.html correspond
//   directement à src/pages/<route>.astro ou src/pages/<route>/index.astro.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');
const pagesDir = path.join(root, 'src', 'pages');

const LIMIT = 160;

/** Parcourt récursivement un dossier et retourne tous les fichiers .html */
function walkHtmlFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

/** Décode les entités HTML les plus courantes pouvant apparaître dans un attribut. */
function decodeHtmlEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/** Extrait le contenu de <meta name="description" content="..."> */
function extractDescription(html) {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
  if (!match) return null;
  return decodeHtmlEntities(match[1]);
}

/**
 * Déduit le chemin du fichier .astro source correspondant à un fichier dist.
 * Retourne un chemin relatif à la racine du projet, ou null si introuvable
 * (ne devrait pas arriver : le site n'a pas de routes dynamiques).
 */
function resolveSourcePath(distFile) {
  const relFromDist = path.relative(distDir, distFile); // ex: blog/analyse-adele/index.html ou 404.html
  let routePath = relFromDist;

  if (routePath === '404.html') {
    return candidateOrNull(['404.astro']);
  }
  if (routePath.endsWith(`${path.sep}index.html`)) {
    routePath = routePath.slice(0, -`${path.sep}index.html`.length); // ex: blog/analyse-adele, ou '' pour la racine
  } else if (routePath.endsWith('.html')) {
    routePath = routePath.slice(0, -'.html'.length);
  }

  if (routePath === '') {
    return candidateOrNull(['index.astro']);
  }

  return candidateOrNull([`${routePath}.astro`, path.join(routePath, 'index.astro')]);
}

function candidateOrNull(relativeCandidates) {
  for (const rel of relativeCandidates) {
    const abs = path.join(pagesDir, rel);
    if (fs.existsSync(abs)) {
      return path.relative(root, abs);
    }
  }
  return null;
}

function main() {
  if (!fs.existsSync(distDir)) {
    console.error('dist/ introuvable — lancez `npm run build` avant ce script.');
    process.exit(1);
  }

  const htmlFiles = walkHtmlFiles(distDir).sort();
  const rows = [];
  const missingDescription = [];
  const unresolvedSource = [];

  for (const distFile of htmlFiles) {
    const html = fs.readFileSync(distFile, 'utf-8');
    const description = extractDescription(html);
    const distRel = path.relative(root, distFile);

    if (description === null) {
      missingDescription.push(distRel);
      continue;
    }

    const sourcePath = resolveSourcePath(distFile);
    if (sourcePath === null) {
      unresolvedSource.push(distRel);
    }

    rows.push({
      distPath: distRel,
      sourcePath: sourcePath ?? '(introuvable)',
      length: [...description].length, // comptage par code point Unicode, pas par octet
      description,
    });
  }

  const overLimit = rows
    .filter((r) => r.length > LIMIT)
    .sort((a, b) => b.length - a.length);

  return { totalPages: htmlFiles.length, rows, overLimit, missingDescription, unresolvedSource };
}

const result = main();

// Sortie JSON sur stdout pour être consommée par le script de rapport.
process.stdout.write(JSON.stringify(result, null, 2));
