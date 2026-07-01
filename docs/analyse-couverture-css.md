# Analyse de Couverture CSS — 30 juin 2026

## Métriques par page

| Fichier CSS | Poids | Accueil | Cabalistique | Boutique |
|-------------|:-----:|:-------:|:------------:|:--------:|
| `design-system.css` | 15 KB | 60% | 60% | 57% |
| `components.css` | 41 KB | **3%** | ~20%* | **3%** |
| `layout.css` | 14 KB | 37% | 37% | 33% |
| CSS Astro page | ~25 KB | 66% | 66% | **95%** |
| **TOTAL** | ~100 KB | **25%** | ~35% | **23%** |

> *Sur cabalistique, les archétypes se chargent au clic — taux réel probablement >20%

## Plan d'extraction (sans risque visuel)

### Étape 1 — Identifier les sélecteurs utilisés par page
- Extraire la liste des sélecteurs de `components.css`
- Pour chaque page type, identifier ceux qui matchent des éléments

### Étape 2 — Créer des fichiers CSS par domaine
- `components-calculateur.css` → pages numérologie
- `components-oracles.css` → pages oracles
- `components-tarot.css` → pages tarologie
- `components-global.css` → sélecteurs vraiment globaux (header, footer, skip-link)

### Étape 3 — Validation visuelle page par page
- Modifier UNE page à la fois
- Faire une capture d'écran avant/après
- Vérifier sur desktop + mobile
- Commit après chaque page validée

### Étape 4 — Nettoyage
- Supprimer `components.css` original
- Vérifier toutes les pages une dernière fois

## Gain estimé
- Accueil : -35 KB CSS (41→6 KB)
- Boutique : -35 KB CSS (41→6 KB)
- Blog : -35 KB CSS (41→6 KB)
- Pages outils : -15 KB CSS (41→26 KB)
