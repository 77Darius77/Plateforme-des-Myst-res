// Génère public/llms-full.txt avec le contenu complet (texte) des 79 articles
// de blog, conformément à la convention llms-full.txt (contenu concaténé,
// pas un simple résumé). Conserve l'intro mission/méthodes existante.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../src/pages/blog');
const outFile = path.join(__dirname, '../public/llms-full.txt');

function htmlToText(html) {
  return html
    .replace(/<AffiliateBooks[\s\S]*?\/>/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<h2>/g, '\n## ').replace(/<\/h2>/g, '\n')
    .replace(/<h3>/g, '\n### ').replace(/<\/h3>/g, '\n')
    .replace(/<h4>/g, '\n#### ').replace(/<\/h4>/g, '\n')
    .replace(/<li>/g, '- ').replace(/<\/li>/g, '\n')
    .replace(/<blockquote>/g, '\n> ').replace(/<\/blockquote>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<\/p>/g, '\n')
    .replace(/<tr>/g, '\n').replace(/<\/tr>/g, '')
    .replace(/<t[hd]>/g, ' | ').replace(/<\/t[hd]>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&rsquo;/g, '’')
    .replace(/&eacute;/g, 'é')
    .replace(/&nbsp;/g, ' ')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const files = readdirSync(blogDir)
  .filter(f => f.endsWith('.astro') && f !== 'index.astro')
  .sort()
  .map(f => path.join(blogDir, f));

const articleSections = [];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const headlineMatch = content.match(/"headline":\s*"((?:[^"\\]|\\.)*)"/);
  const canonicalMatch = content.match(/canonicalPath="(blog\/[^"]+\/)"/);
  const articleMatch = content.match(/<article id="article" class="blog-article">([\s\S]*?)<\/article>/);

  if (!headlineMatch || !canonicalMatch || !articleMatch) {
    console.log(`Ignoré (structure inattendue) : ${path.basename(file)}`);
    continue;
  }

  const headline = headlineMatch[1].replace(/\\"/g, '"');
  const url = `https://plateforme-des-mysteres.com/${canonicalMatch[1]}`;
  const bodyText = htmlToText(articleMatch[1]);

  articleSections.push(`---\n\n# ${headline}\n\nURL: ${url}\n\n${bodyText}`);
}

const intro = `# Plateforme des Mystères — Documentation complète

## Mission
La Plateforme des Mystères rend les sagesses ésotériques accessibles gratuitement, sans publicité, sans inscription et sans collecte de données personnelles. Tous les calculateurs et tirages fonctionnent localement dans le navigateur.

L'auteur (BlaiseG.) explore les traditions numérologiques (cabalistique Raúl Durán, pythagoricienne, chaldéenne, chinoise), la tarologie (Marseille, Rider-Waite, Thoth, Lenormand), l'astrologie (tropicale, sidérale, védique, chinoise) et les oracles (Belline, Gé, Géomancie, Runes, Triade, Miroirs, Yi King).

## Méthodes de calcul

### Numérologie Cabalistique (Raúl Durán)
- **Chemin de vie** : réduction de la date de naissance (ex: 15/08/1990 → 1+5+0+8+1+9+9+0 = 33 → 3+3 = 6)
- **Ticún** : défi karmique à rectifier, calculé à partir de la date
- 22 archétypes hébraïques associés aux 22 lettres de l'alphabet hébreu
- Chaque archétype a une force (don) et une ombre (défi)

### Numérologie Pythagoricienne
- Table de correspondance A=1, B=2, ..., I=9, J=1, ...
- 5 nombres fondamentaux : Chemin de vie, Expression, Désir de l'Âme, Personnalité, Année personnelle
- Nombres maîtres 11, 22, 33

### Numérologie Chaldéenne
- Table 1-8 (le 9 est sacré, non attribué)
- Nombre de naissance et nombre du nom
- Vibrations planétaires babyloniennes

### Numérologie Chinoise
- Kua (nombre personnel basé sur l'année de naissance et le sexe)
- Grille Lo Shu (carré magique 3×3)
- Wu Xing (5 éléments), cycles Sheng et Ke
- Ba Zhai (8 maisons, directions favorables/défavorables)

## Outils interactifs disponibles
Le site propose 12+ calculateurs et tirages interactifs, tous exécutés côté client (JavaScript). Aucune donnée n'est envoyée au serveur.

## Produits
- Rapport d'Incarnation (10 €) : PDF 20+ pages personnalisé — numérologie, Lo Shu, Lenormand, tarot, astrologie, tikoun
- Guide Les 22 Archétypes (7 €) : PDF ~70 pages illustré — Tarot de Marseille, archétypes de Jung

## Transparence
- Site statique (Astro.js), hébergé sur Netlify
- Zéro tracking, zéro publicité, zéro cookie non essentiel
- Calculs 100% locaux (JavaScript dans le navigateur)
- Pas de compte utilisateur requis
- Licence Creative Commons BY-NC-SA pour le contenu original

## Blog — ${articleSections.length} articles (contenu complet ci-dessous)
`;

const full = intro + '\n' + articleSections.join('\n\n');
writeFileSync(outFile, full, 'utf8');
console.log(`llms-full.txt généré : ${articleSections.length} articles, ${(full.length / 1024).toFixed(0)} KB`);
