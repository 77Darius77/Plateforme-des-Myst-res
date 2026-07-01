# PRD — Plan de construction : corrections issues de l'audit critique (2026-07-02)

**Origine :** audit critique en 3 volets (frontend/UX, backend/technique, recherche concurrentielle) mené le 2026-07-02 sur le site "Plateforme des Mystères" (Astro, 146 pages, `/home/blaise/workspace/Numérologie/site`). ~65 constats bruts, synthétisés ci-dessous en **16 étapes** exécutables (v2 — révisée après revue contradictoire, voir "Historique des révisions" en fin de document).

**Pré-requis vérifiés (2026-07-02) :**
- Git 2.43.0, remote `origin` = `https://github.com/77Darius77/Plateforme-des-Myst-res.git`, branche par défaut `master`.
- `gh` CLI 2.45.0 authentifié (compte `77Darius77`).
- Aucun dossier `.github/workflows/` — pas de CI existante (étape 7 en crée une).
- Aucun dossier `plans/` avant ce fichier.

→ Workflow **branche + PR** possible pour chaque étape (git + gh disponibles). Voir note de permission ci-dessous.

**Note de permission (push/PR) :** pousser du code et ouvrir des PR sont des actions à confirmer explicitement par l'utilisateur à chaque lot, sauf autorisation globale donnée en amont. Chaque étape se termine par un point d'arrêt "confirmer avant push" — ne pas empiler plusieurs étapes non poussées sans validation.

**Positionnement du site à respecter :** gratuit, sans compte utilisateur, sans tracking publicitaire, sans pub. Les étapes de Tier 5 touchent au produit/positionnement et nécessitent un accord explicite de l'utilisateur avant implémentation — ce ne sont pas de simples corrections techniques. **Important (ajouté après revue) : l'étape 14 (analytics) est en Tier 5 précisément parce qu'elle entre en tension avec la promesse marketing "100% local · sans tracking"** que l'étape 1 renforce par ailleurs (retrait des hotlinks Wikimedia) — ne jamais implémenter 14 sans avoir aussi statué sur cette mention marketing.

---

## Protocole d'exécution standard (appliqué à CHAQUE étape ci-dessous)

1. **Recherche / Orchestration** — Cartographier précisément les fichiers concernés par un grep exhaustif incluant les `.js` qui injectent du HTML/classes dynamiquement (pas seulement les `.astro`/`.css` statiques). Si l'étape touche plus de ~5 fichiers indépendants ou nécessite une cartographie croisée, **déléguer cette cartographie à un sous-agent en lecture seule** (Agent tool, `general-purpose`), PUIS revérifier ses conclusions par grep direct avant d'agir dessus. **Le compte de fichiers concernés produit par cette cartographie fait foi — ne jamais fixer un nombre a priori dans une étape et s'y tenir aveuglément** (cf. révision de l'étape 3 ci-dessous, où un nombre codé en dur s'est révélé faux).
2. **Implémentation** — Modifications minimales, un commit logique à la fois. Ne jamais modifier un fichier partagé (`Layout.astro`, un CSS global, `Header.astro`) sans avoir listé au préalable TOUTES les pages qui le chargent.
3. **Vérification mécanique** (avant toute vérification visuelle, **obligatoire, jamais optionnelle même sur un changement qui semble mineur**) — Contrôle programmatique spécifique à l'étape : ex. "toutes les URLs d'images référencées existent en local", "le build Astro (`npm run build`, 146 pages) passe sans erreur", "aucune classe déplacée n'apparaît sur les pages qui ne devraient pas la charger".
4. **Vérification visuelle/fonctionnelle** (navigateur, `claude-in-chrome`) — Thème **clair ET sombre**, **interaction réelle**, sur au moins une page par domaine affecté. Pour les changements d'accessibilité : valider explicitement au clavier. **Pour tout changement pouvant bloquer silencieusement un script (CSP notamment) : lire la console navigateur (`read_console_messages`) à la recherche d'erreurs, pas seulement observer le rendu visuel.**
5. **Debug systématique si échec** — Invoquer `superpowers:systematic-debugging` plutôt que deviner un correctif.
6. **Commit + point d'arrêt** — Commit au format `<type>: <description>`. **Point d'arrêt : confirmer avec l'utilisateur avant tout push/PR.**

---

## Anti-patterns du projet (leçons vécues — ne pas reproduire)

- Ne jamais piloter une suppression/refactor CSS par un % de couverture DevTools : les classes injectées par JS, les états `:hover`/`:focus`, et les media queries échappent à un simple snapshot. Toujours grep exhaustif (`.astro` + `.js`).
- Ne jamais découper un CSS partagé par plage de lignes : les règles à sélecteurs groupés qui traversent plusieurs domaines doivent être dupliquées dans chaque fichier concerné ou remontées en global, jamais coupées à la ligne.
- Ne jamais écrire une sortie brute d'outil (`cat -n`/Read) directement dans un fichier — a déjà corrompu `layout.css` par le passé.
- Ne jamais raccourcir des meta descriptions en masse par script sans revue éditoriale.
- Ne pas ajouter de comptes utilisateurs, notifications push, tracking (même cookieless), ou funnel payant sans validation explicite — décision produit, pas technique.
- Toujours vérifier en clair ET en sombre avec interaction réelle.
- Ne jamais committer un changement touchant `Layout.astro` ou un CSS partagé sans avoir lancé `npm run build` sur le lot complet.
- **Ne jamais retirer une directive CSP (`'unsafe-inline'` notamment) sans énumération exhaustive préalable de tous les scripts/gestionnaires inline concernés, et sans vérifier la console navigateur (pas seulement les headers HTTP) après coup — un script bloqué par CSP échoue silencieusement à l'exécution.**
- **Ne jamais présenter un rollback comme "simple" pour un header propagé côté client avec une longue durée de cache (HSTS notamment) — certains changements restent en cache chez le visiteur bien après un revert serveur.**
- **Ne jamais numéroter un renvoi interne ("voir étape N") sans revérifier ce numéro après toute réorganisation du plan — cause d'erreur vécue lors de la première rédaction de ce document.**

---

## Résumé de parallélisation (régénéré et vérifié contre le corps du plan — 16 lignes pour 16 étapes)

| Étape | Fichiers principaux touchés | Parallélisable avec | Séquentielle après |
|---|---|---|---|
| 1 | `public/js/tarot*-data.js`, `public/images/tarot/` | 2,3,4,5,6,7,9,10 | — |
| 2 | `netlify/functions/*.js` | 1,3,4,5,6,7,9,10 | — |
| 3 | `src/pages/oracles/**`, `src/pages/tarologie/**`, `Layout.astro` (`#toast`) | 1,2 | — |
| 4 | mêmes fichiers oracles/tarologie que l'étape 3 (`.spread-card`) | 1,2 | après 3 (mêmes fichiers) |
| 5 | `src/components/Header.astro`, `layout.css` | 1,2,3,4,6 | avant 8a (Layout.astro touché par les deux, prudence) |
| 6 | `src/pages/oracles/**` (attributs img), `public/images/oracles/` | 1,2,5 | après 3,4 (mêmes fichiers `.astro`) |
| 7 (CI) | `.github/workflows/` (nouveau) | toutes | — |
| 8a | `netlify.toml`, `Layout.astro` (defer) | 1,2,9,10 | après 3 (Layout.astro) |
| 8b | `netlify.toml` (retrait `unsafe-inline`) | — | après 8a |
| 9 | ~90 fichiers `.astro` (meta description) | 1,2,3,4,5,6,7,8a,8b,10 | — |
| 10 | `design-system.css`, `components-astrologie.css` | 1,2,7,9 | — |
| 11 | `public/js/tarot-*-interp.js` | 1,2 | — |
| 12 | idem 11 + nouveaux `.json` + `scripts/verify-data.mjs` | — | après 11 |
| 13 | `src/pages/tarologie/lenormand.astro` → sous-dossier | 1,2 | après 11 **et** 12 (mêmes moteurs `tarot-lenormand-interp.js`) |
| 14 (Tier 5, gated) | `Layout.astro` (script analytics) | — | après 3, 8a, 15 (Layout.astro) — **validation produit requise** |
| 15 (Tier 5, gated) | `Layout.astro`/`main.js` (bouton partage) | — | après 3, 8a — **validation produit requise** |
| 16 (Tier 5, gated) | `index.astro`, `netlify/functions/` (newsletter) | — | après 13 — **validation produit requise** |

---

## TIER 0 — Contradictions à corriger en urgence

### Étape 1 — Rapatrier les 178 images Wikimedia en local

**Contexte :** `public/js/tarot-data.js` (22 réf.), `tarot-rws-data.js` (78 réf.), `tarot-thoth-data.js` (78 réf.) chargent les images de cartes via hotlink `https://commons.wikimedia.org/wiki/Special:FilePath/...`. Contredit "100% local · sans tracking" (`src/pages/index.astro`, `src/components/Footer.astro`). `belline-data.js` et `tarot-lenormand-data.js` hébergent déjà leurs images en local — reproduire ce pattern.

**Tâches :**
- [ ] Lister les 178 URLs Wikimedia exactes (grep `Special:FilePath` dans les 3 fichiers)
- [ ] Télécharger chaque image en local sous `public/images/tarot/{marseille,rider-waite,thoth}/`
- [ ] Remplacer les URLs par les chemins locaux
- [ ] Vérifier crédits/licence (domaine public, mais mentionner la source dans un commentaire de fichier ou une page de crédits)

**Vérification :**
- Mécanique : script confirmant l'absence de toute URL `commons.wikimedia.org` restante et l'existence physique de chaque chemin local référencé.
- Visuelle : tirage complet sur une page de chaque jeu (Marseille, Rider-Waite, Thoth), clair + sombre.
- `npm run build` complet sans erreur.

**Modèle recommandé :** défaut (sonnet).
**Rollback :** revert du commit, les anciennes URLs restent fonctionnelles entre-temps.

---

### Étape 2 — Sécuriser `test-pdf.js` et durcir `generer-rapport.js`

**Contexte :** `netlify/functions/test-pdf.js` génère un PDF à chaque appel public, sans Arcjet ni limite. `generer-rapport.js` dégrade silencieusement (log seulement) si `ARCJET_KEY` est absente.

**Tâches :**
- [ ] Supprimer/déplacer `test-pdf.js` hors de `netlify/functions/`
- [ ] Dans `generer-rapport.js` : retourner HTTP 503 si `ARCJET_KEY` est absente **et** que l'environnement est identifié comme production via la variable Netlify native `process.env.CONTEXT === 'production'` (ne jamais 503 en `deploy-preview`/`branch-deploy`/local, où l'absence de clé peut être légitime en dev)
- [ ] Ajouter un retry léger (1-2 tentatives) autour du `fetch` vers l'API Gumroad

**Vérification :**
- Mécanique : `curl` sur l'ancienne route `test-pdf` → 404 après déploiement. Simuler `CONTEXT=production` sans `ARCJET_KEY` en local → confirmer le 503. Simuler `CONTEXT=deploy-preview` sans `ARCJET_KEY` → confirmer l'absence de 503.
- **Fonctionnelle obligatoire du chemin nominal (pas "si disponible") :** tester le flux `rapport.astro` complet avec une clé de licence Gumroad valide — utiliser une clé de test dédiée ou mocker la réponse de l'API Gumroad si aucune sandbox n'est accessible, mais ne pas passer cette vérification sous silence : c'est l'unique flux qui génère du revenu sur le site.

**Modèle recommandé :** défaut (sonnet).
**Rollback :** revert — le endpoint de test n'a aucune valeur produit.

---

## TIER 1 — Le cœur de produit (tirages de cartes) cassé pour une partie des visiteurs

### Étape 3 — Accessibilité clavier + ARIA du tirage de cartes

**Contexte :** les pages de tirage (oracles + tarologie, à l'exclusion de Lenormand qui suit une architecture différente traitée en étape 13) implémentent un fan de cartes cliquable sans `tabindex`, `role`, ni gestion `keydown`. Le pattern correct existe déjà dans `public/assets/js/pythagoricien.js`, dans la fonction qui gère la grille de vibrations (chercher les attributs `role="button"` / `tabindex="0"` + handler `keydown` Entrée/Espace — **se repérer sur le nom de fonction/classe `.archetype-card` et non sur un numéro de ligne, qui se périme au moindre edit**). Les cartes n'ont également aucun `aria-label` ("carte cachée, position N sur M").

**Tâches :**
- [ ] **Recherche déléguée à un sous-agent (lecture seule)** : lister exhaustivement, par comportement (pas par un unique nom de classe littéral), toutes les pages `.astro`/`.js` qui implémentent un fan de cartes cliquable dans `src/pages/oracles/**` et `src/pages/tarologie/**` (hors Lenormand, cf. étape 13). Un grep initial sur `.spread-card` seul est insuffisant (donne 31 fichiers avec cette classe précise, mais le nom de classe peut varier selon la page) — le sous-agent doit confirmer par lecture du JS de tirage, pas uniquement du CSS. **Le nombre de fichiers réellement concerné, tel que rapporté par ce sous-agent puis contre-vérifié, remplace toute estimation a priori et sert de base à la vérification finale.**
- [ ] Extraire le pattern clavier de `pythagoricien.js` en fonction utilitaire réutilisable si un module JS partagé existe déjà, sinon dupliquer consciemment (documenter pourquoi dans le commit)
- [ ] Appliquer `tabindex="0"`, `role="button"`, `aria-label` dynamique, handler `keydown` (Entrée/Espace → clic) sur chaque page identifiée par la recherche ci-dessus
- [ ] Ajouter `role="status" aria-live="polite"` sur `#toast` (`Layout.astro`) — **fichier partagé par les 146 pages, à séquencer avec les autres étapes qui le touchent (8a, 14, 15 — voir table de parallélisation)**

**Vérification :**
- Mécanique : grep post-implémentation confirmant `tabindex`/`role="button"` présents sur 100% des fichiers listés par la recherche (le nombre exact vient de cette recherche, pas d'un chiffre fixé dans ce document).
- Fonctionnelle : sur au moins une page par discipline concernée (Belline, Triade, Rider-Waite, Marseille — **pas Lenormand**, traité en étape 13), sélectionner les cartes **au clavier uniquement**, clair + sombre.

**Modèle recommandé :** le plus fort (opus) pour la conception du pattern réutilisable et la recherche exhaustive ; défaut pour la propagation mécanique une fois le pattern validé sur 2-3 pages pilotes.
**Rollback :** additif uniquement — risque de régression faible.

---

### Étape 4 — Rendre le tirage utilisable au tactile mobile

**Contexte :** le calcul d'espacement du fan de cartes ne s'adapte pas à la largeur d'écran ; sur mobile les cartes se chevauchent fortement, et l'effet "survol" qui les distingue sur desktop n'existe pas au toucher.

**Tâches :**
- [ ] Identifier le composant/pattern JS commun de calcul de fan (probablement dupliqué par jeu — vérifier d'abord s'il y a une fonction partagée)
- [ ] En dessous d'un breakpoint mobile (ex. 600px) : réduire dynamiquement le nombre de cartes visibles simultanément (pagination/scroll horizontal), ou remplacer le fan par une grille de dos de cartes plus grands
- [ ] Prototyper sur UNE page pilote (ex. Belline trois-cartes) avant de propager

**Vérification :**
- **Mécanique (obligatoire, ajoutée après revue — l'absence de vérification mécanique sur cette étape violait le protocole standard) :** via le navigateur, mesurer `getBoundingClientRect()` de chaque carte du fan à un viewport de 375px de large et asserter que la zone cliquable de chaque carte fait au moins 44×44px (cible tactile Apple/WCAG) et qu'aucune paire de cartes adjacentes ne se recouvre à plus de 30% de leur surface. `npm run build` sans erreur.
- Fonctionnelle (navigateur, viewport mobile ~375px) : sélectionner les cartes au tactile sur la page pilote, confirmer l'absence d'ambiguïté, puis propager et re-tester sur 1 page par discipline.

**Modèle recommandé :** le plus fort (opus) pour la conception ; défaut pour la propagation.
**Rollback :** l'ancien comportement desktop reste intact (modif ciblée sur le breakpoint mobile).
**Dépendance :** après l'étape 3 (mêmes fichiers `.spread-card`/JS de tirage).

---

### Étape 5 — Menu mobile du Header

**Contexte :** `src/components/Header.astro` n'a aucun repli responsive. Combiné à `overflow-x: hidden` sur `body`, le contenu peut être rogné hors du viewport sur mobile.

**Tâches :**
- [ ] Implémenter un menu burger en dessous de 768px dans `Header.astro` + `layout.css`
- [ ] S'assurer que le bouton de thème et tous les liens de nav restent accessibles dans le menu replié
- [ ] Vérifier le comportement clavier du menu (ouverture/fermeture, focus)

**Vérification :**
- **Mécanique (ajoutée après revue) :** `npm run build` (fichier partagé sur 146 pages) + grep confirmant la présence du toggle burger dans `Header.astro`.
- Fonctionnelle (viewport mobile) : sur 3-4 pages de disciplines différentes, ouvrir/fermer le menu, vérifier qu'aucun élément n'est rogné à 320px/375px/414px de large.

**Modèle recommandé :** défaut (sonnet).
**Rollback :** feature isolée dans `Header.astro`, revert simple.

---

### Étape 6 — Images de tirage responsive (`srcset`)

**Contexte :** les cartes Triade/Miroirs (1400×2294px, ~450-500 Ko) sont servies en pleine résolution pour un affichage de ~280px de large. Aucun `srcset`/`sizes` nulle part sur le site.

**Tâches :**
- [ ] Générer des variantes redimensionnées (ex. 300×490 pour le fan replié, 600×980 pour la carte révélée) via `cwebp`/`sharp`
- [ ] Ajouter `srcset`/`sizes` sur les balises `<img>` concernées (évaluer le coût d'une migration vers `astro:assets` avant de choisir)
- [ ] Prioriser Triade et Miroirs (22 Mo et 12 Mo)

**Vérification :**
- Mécanique : poids total transféré pour un tirage complet avant/après (`read_network_requests`), viser >70% de réduction.
- Visuelle : qualité inchangée desktop haute résolution ET mobile.

**Modèle recommandé :** défaut (sonnet).
**Rollback :** conserver les fichiers pleine résolution en fallback natif du navigateur.
**Dépendance :** après les étapes 3 et 4 (mêmes fichiers `.astro` de tirage).

---

## TIER 2 — Angle mort business (pilotage à l'aveugle)

### Étape 7 — CI minimale (GitHub Actions)

**Contexte :** aucun pipeline CI. Avec 146 pages et ~15 moteurs de calcul JS indépendants, rien ne garantit qu'un déploiement ne casse pas un calcul silencieusement.

**Tâches :**
- [ ] Créer `.github/workflows/build.yml` : `npm ci && npm run build` sur chaque push/PR vers `master`
- [ ] Ajouter une vérification de liens cassés sur `dist/` après build
- [ ] Une fois l'étape 12 faite, intégrer `scripts/verify-data.mjs` (voir étape 12) à ce pipeline

**Vérification :**
- Mécanique : ouvrir une PR de test et confirmer que le workflow s'exécute et passe ; introduire volontairement une erreur de build pour confirmer que le job échoue bien (test de non-régression du CI lui-même).

**Modèle recommandé :** défaut (sonnet).
**Rollback :** suppression du fichier workflow, aucun impact sur le site en production.

---

## TIER 3 — Gains rapides SEO / sécurité / performance

### Étape 8a — Durcissement sécurité : en-têtes additifs à faible risque

**Contexte :** `netlify.toml` manque HSTS. Le cache `immutable` est absent sur `/js/*` alors qu'il est déjà présent sur `/assets/js/*`. Les scripts injectés via `Layout.astro` n'ont pas `defer`.

**Tâches :**
- [ ] Ajouter HSTS **progressivement** : commencer par `Strict-Transport-Security: max-age=300` (5 minutes), vérifier en Netlify deploy preview, puis augmenter par paliers (1 jour → 1 mois → 1 an) sur plusieurs déploiements. **Ne pas ajouter `preload` à ce stade** — la soumission à la liste de préchargement des navigateurs est quasi irréversible et ne doit être envisagée qu'après plusieurs semaines de HSTS stable en production.
- [ ] Ajouter `object-src 'none'; base-uri 'self'; form-action 'self'` à la CSP existante (additif, sans risque de casser un script existant)
- [ ] Ajouter un bloc `[[headers]] for = "/js/*"` avec `Cache-Control: public, max-age=31536000, immutable`
- [ ] Ajouter `defer` sur tous les scripts injectés via la prop `scripts` de `Layout.astro`

**Vérification :**
- Mécanique : `curl -I` sur le site (preview Netlify) pour confirmer chaque header. `npm run build` + test manuel que le script anti-FOUC fonctionne toujours sans flash visuel.

**Modèle recommandé :** défaut (sonnet).
**Rollback :** **le HSTS n'est PAS un rollback instantané** — un `max-age` déjà envoyé reste en cache côté navigateur des visiteurs jusqu'à expiration, même après revert de `netlify.toml`. C'est précisément pourquoi le déploiement doit être progressif (`max-age=300` d'abord). Les autres en-têtes de cette étape (CSP additive, cache `/js/*`, `defer`) sont un revert simple.
**Dépendance :** après l'étape 3 (édite aussi `Layout.astro`).

---

### Étape 8b — Durcissement sécurité : retrait de `'unsafe-inline'` (CSP `script-src`)

**Contexte :** la CSP autorise `'unsafe-inline'` sur `script-src`, ce qui annule une grande partie de la protection XSS. **Ce retrait n'est pas un changement de "2-3 scripts" isolé : il bloque tout script inline ET tout gestionnaire d'événement inline (`onclick`, `on*`) sur l'ensemble des 146 pages** — traité en étape séparée de la 8a précisément parce que c'est le seul changement à haut risque du lot sécurité, et qu'un rollback grossier ne doit pas obliger à annuler aussi les en-têtes additifs sans risque.

**Tâches :**
- [ ] **Énumération exhaustive obligatoire avant toute suppression** : grep sur `dist/` (après build) de toutes les balises `<script>` sans attribut `src`, et de tous les attributs `on*=` (gestionnaires inline), sur les 146 pages — pas une estimation, un inventaire complet.
- [ ] Migrer chaque script inline recensé vers un hash SHA-256 statique calculé au build, ou un nonce généré par Astro
- [ ] Convertir les gestionnaires `on*=` inline recensés en `addEventListener` (un hash/nonce CSP ne couvre pas les attributs `on*` sans directive `unsafe-hashes` supplémentaire, à éviter si possible)
- [ ] Retirer `'unsafe-inline'` de `script-src` une fois l'inventaire entièrement traité

**Vérification :**
- Mécanique : le grep d'inventaire de la première tâche doit retourner zéro résultat après migration (aucun script/gestionnaire inline restant hors ceux couverts par hash/nonce).
- **Fonctionnelle critique (remplace un simple test anti-FOUC insuffisant) :** sur au moins une page de **chaque domaine** (numérologie, astrologie, tarologie, oracles, blog), en thème **clair ET sombre**, lire la **console du navigateur** (`read_console_messages`) à la recherche de toute violation CSP (`Refused to execute inline script...`). Une absence de violation console est la seule preuve fiable — un `curl -I` sur les headers ne détecte pas un script silencieusement bloqué.

**Modèle recommandé :** le plus fort (opus) — risque de régression silencieuse élevé si un script est oublié.
**Rollback :** revert de `netlify.toml` (retour à `'unsafe-inline'`) — réversible immédiatement côté serveur, contrairement à HSTS (étape 8a).
**Dépendance :** après l'étape 8a.

---

### Étape 9 — Raccourcir les meta descriptions >160 caractères

**Contexte :** 90 pages sur 146 dépassent 160 caractères, majoritairement les 79 portraits numérologiques de célébrités (`src/pages/blog/analyse-*.astro`). **Anti-pattern identifié en session précédente : ne pas tronquer mécaniquement.**

**Tâches (découpées en lots numérotés — chaque lot est une unité de travail complète et vérifiable indépendamment, pour qu'un agent à froid sache exactement où reprendre) :**
- [ ] 9.0 — Script de mesure (lecture seule) produisant la liste ordonnée des 90 pages avec longueur actuelle — sert de base à tous les lots suivants, ne modifie rien
- [ ] 9.1 — Lot 1 (pages 1 à 20 de la liste 9.0) : raccourcir à ~155 caractères avec relecture éditoriale, déplacer le détail vers l'intro de l'article
- [ ] 9.2 — Lot 2 (pages 21 à 40), même critère
- [ ] 9.3 — Lot 3 (pages 41 à 60)
- [ ] 9.4 — Lot 4 (pages 61 à 90)
- [ ] 9.5 — Script de longueur de meta description intégré au build (`postbuild.js`) pour prévenir toute régression future — à faire dès que possible, indépendamment de l'avancement des lots 9.1-9.4

**Vérification :**
- Chaque lot (9.1-9.4) : critère de complétion = toutes les pages du lot mesurent ≤160 caractères, relues par l'utilisateur avant commit du lot.
- 9.5 : le script de build détecte une meta >160 caractères introduite volontairement en test.

**Modèle recommandé :** défaut (sonnet) pour la mesure/script ; la reformulation éditoriale bénéficie d'une relecture humaine — ne pas committer un lot sans validation utilisateur, au moins sur le premier.
**Rollback :** changement de texte uniquement, revert trivial par lot.

---

### Étape 10 — Contraste WCAG et cohérence visuelle

**Contexte :** `--gold: #b4853b` en mode clair mesure 3.10:1 sur fond `#f6f8fb` (échec WCAG AA, seuil 4.5:1) — couleur d'accent la plus utilisée du site. `--text-muted: #64748b` en mode sombre mesure 4.16:1 (sous le seuil). `components-astrologie.css` (36 lignes, bordures en dur) est visiblement moins soigné que `components-numerologie.css` (tokens `var(--border)`).

**Tâches :**
- [ ] Foncer `--gold` en mode clair vers `~#8b6020` (vérifier si `--gold-dim`, déjà défini, peut être réutilisé) pour le texte uniquement, garder `#b4853b` pour fonds/bordures
- [ ] Ajuster `--text-muted` en mode sombre vers `~#7484a0`
- [ ] Aligner `components-astrologie.css` sur les tokens `var(--border)`/`var(--bg-card)` du reste du design system

**Vérification :**
- Mécanique : mesure de contraste programmatique sur les nouvelles valeurs, confirmer ≥4.5:1.
- Visuelle : comparaison avant/après sur pages numérologie (gold) et astrologie, clair + sombre.

**Modèle recommandé :** défaut (sonnet).
**Rollback :** changement de variables CSS uniquement, revert trivial.

---

## TIER 4 — Dette technique de fond

### Étape 11 — Mutualiser le moteur d'interprétation tarot

**Contexte :** `tarot-rws-interp.js`, `tarot-thoth-interp.js`, `tarot-lenormand-interp.js`, `tarot-interp.js` partagent des fonctions quasi identiques mot pour mot. Un bug logique doit actuellement être corrigé 4 fois.

**Tâches :**
- [ ] Diff précis des 4 fichiers pour confirmer l'étendue exacte de la duplication (déléguer à un sous-agent en lecture seule si le volume le justifie)
- [ ] Extraire un moteur commun `tarot-engine-core.js` paramétré par le nom du deck + config des libellés
- [ ] Ne garder par deck que les données (thèmes/ombres) + config de libellés
- [ ] Mettre à jour les imports/scripts inclus dans les pages `.astro` concernées

**Vérification :**
- Mécanique : diff des sorties générées par l'ancien et le nouveau moteur sur un jeu de tirages de test identiques (même seed). `npm run build` complet.
- Fonctionnelle : un tirage complet par deck (RWS, Thoth, Lenormand, Marseille), clair + sombre.

**Modèle recommandé :** le plus fort (opus) — refactor architectural sensible.
**Rollback :** garder les 4 anciens fichiers en parallèle jusqu'à validation complète sur les 4 decks.

---

### Étape 12 — Extraire le contenu interprétatif en JSON + validation de schéma

**Contexte :** les textes (`CARD_DATA`) sont des littéraux JS plutôt que du JSON, sans validation. Une faute de frappe dans une clé ne serait détectée qu'en production.

**Tâches :**
- [ ] Extraire `CARD_DATA` de chaque fichier `*-interp.js` (post-refactor étape 11) vers un `.json` dédié
- [ ] Charger via `fetch()`/import JSON dans le moteur commun
- [ ] Écrire `scripts/verify-data.mjs` (pré-build) : nombre d'entrées attendu par deck, champs obligatoires non vides, pas de clé dupliquée

**Vérification :**
- Mécanique : exécuter `verify-data.mjs`, confirmer qu'il détecte une erreur volontairement introduite (carte manquante, champ vide) avant de confirmer qu'il passe sur les données réelles.
- Intégrer ce script à la CI de l'étape 7 (renvoi corrigé : c'est bien cette étape 12, pas une autre).

**Modèle recommandé :** défaut (sonnet).
**Rollback :** trivial, changement de format de stockage uniquement.
**Dépendance :** après l'étape 11.

---

### Étape 13 — Harmoniser l'architecture Lenormand

**Contexte :** `src/pages/tarologie/lenormand.astro` (865 lignes, une seule page) diffère de tous les autres tarots (schéma hub + sous-pages : `marseille.astro` + `marseille/*.astro`, idem `rider-waite/`, `thoth/`).

**Tâches :**
- [ ] Découper `lenormand.astro` en `lenormand.astro` (hub) + `lenormand/{tirage-quotidien,ligne-du-temps,carre-de-neuf,grand-tableau}.astro`
- [ ] Reporter le SEO (meta, breadcrumb, JSON-LD) par sous-page
- [ ] Mettre en place les redirections 301 nécessaires depuis les anciennes ancres/URL (vérifier `netlify.toml`/`_redirects` — rappel de l'incident 2026-07-01 où `_redirects` avait neutralisé des redirections 301)
- [ ] Une fois cette restructuration terminée, appliquer l'accessibilité clavier de l'étape 3 aux nouvelles sous-pages Lenormand (elles en étaient exclues jusqu'ici, cf. étape 3)

**Vérification :**
- Mécanique : `npm run build`, vérifier les 4 nouvelles URLs, vérifier les redirections avec `curl -I`.
- Fonctionnelle : un tirage complet par méthode Lenormand, clair + sombre, y compris test clavier (cf. tâche ci-dessus).
- SEO : sitemap régénéré inclut les nouvelles URLs.

**Modèle recommandé :** le plus fort (opus) — restructuration de routing avec risque SEO.
**Rollback :** conserver `lenormand.astro` original accessible via redirection le temps de valider.
**Dépendance : après les étapes 11 ET 12 (mêmes moteurs d'interprétation `tarot-lenormand-interp.js`, qui seront mutualisés/déplacés par ces deux étapes — restructurer les pages avant ce refactor créerait un double travail conflictuel).**

---

## TIER 5 — Opportunités produit (validation utilisateur explicite requise avant toute implémentation)

Ces étapes ne sont pas des corrections de bugs — ce sont des choix de positionnement produit.

### Étape 14 — Analytics privacy-friendly

**Contexte :** aucun système d'analytics, même respectueux de la vie privée. Permettrait de piloter objectivement le site (pages populaires, taux de complétion des tirages, erreurs JS). **Point d'attention majeur : implémenter un analytics, même sans cookie, contredit directement la mention marketing "100% local · sans tracking" affichée sur l'accueil et le footer — la même mention que l'étape 1 renforce en retirant les hotlinks Wikimedia. Ne pas traiter cette étape comme un simple ajout technique : elle exige de statuer d'abord sur cette mention marketing (la retirer, la nuancer, ou renoncer à l'analytics).**

**Tâches (après accord utilisateur sur le point ci-dessus) :**
- [ ] Décider explicitement avec l'utilisateur : maintenir "sans tracking" et renoncer à l'analytics, OU nuancer la mention marketing (ex. "sans tracking publicitaire, analytics anonyme activé") et choisir un outil zéro-cookie/zéro-PII (Plausible Cloud payant, ou Umami self-hosted gratuit — arbitrage coût/hébergement à faire avec l'utilisateur)
- [ ] Si validé : ajouter le script dans `Layout.astro`, configurer 2-3 événements custom utiles

**Vérification :**
- Mécanique : absence de cookie posé (DevTools > Application > Cookies).
- Fonctionnelle : réception d'événements dans le dashboard après navigation de test.

**Modèle recommandé :** défaut (sonnet), une fois la décision produit actée.
**Rollback :** un seul script à retirer de `Layout.astro`.

---

### Étape 15 — Partage social des résultats de tirage/calcul

**Contexte :** le bouton "🔗 Partager cet article" (`public/assets/js/main.js`) n'existe que sur le blog, jamais sur un résultat de tirage/calcul.

**Tâches (après accord utilisateur) :**
- [ ] Concevoir le format de partage (image générée ? texte + lien ? capture d'écran ?)
- [ ] Ajouter un bouton de partage sur les blocs de résultat
- [ ] Vérifier l'absence de tracking dans le mécanisme de partage choisi

**Point d'arrêt produit :** proposer 2-3 maquettes/options avant tout code.

---

### Étape 16 — Tirage du jour transversal + newsletter opt-in

**Contexte :** le "Tirage Quotidien" existe déjà mais noyé dans le sélecteur Lenormand seul (restructuré en étape 13). Aucune capture d'email pour newsletter (Resend déjà en dépendance, usage transactionnel uniquement).

**Tâches (après accord utilisateur) :**
- [ ] Mettre en avant un tirage/thème du jour transversal sur l'accueil (sans compte requis)
- [ ] Ajouter un opt-in newsletter explicite et séparé (case non pré-cochée), via Resend Audiences

**Point d'arrêt produit :** valider le choix éditorial (contenu quotidien, fréquence newsletter) avant implémentation.
**Dépendance :** après l'étape 13 (le tirage du jour s'appuie sur la nouvelle sous-page Lenormand restructurée).

---

## Historique des révisions

- **v1 (2026-07-02)** : version initiale, 16 étapes rédigées mais table de parallélisation désynchronisée (écrite pour un schéma à 15 étapes jamais réconcilié), plusieurs renvois internes cassés.
- **v2 (2026-07-02)** : revue contradictoire par agent (modèle le plus fort) ayant identifié 2 défauts critiques et 9 majeurs — tous corrigés : table de parallélisation entièrement régénérée à partir du corps réel ; étape 9 (CSP) scindée en 8a/8b avec énumération exhaustive et vérification console obligatoire ; étape 2 (Gumroad) : test nominal rendu obligatoire + détection prod explicite ; étape 3 : nombre de fichiers codé en dur retiré au profit d'une recherche déléguée faisant foi, Lenormand exclu (traité en étape 13) ; étape 4 : vérification mécanique ajoutée (absente en v1) ; HSTS : déploiement progressif sans `preload` immédiat, rollback re-caractérisé comme non instantané ; étape "analytics" déplacée du Tier 2 vers le Tier 5 (contredisait le positionnement "sans tracking") ; dépendance manquante étape 13 → 11+12 ajoutée ; conflits `Layout.astro` (étapes 3, 8a, 14, 15) désormais tracés dans la table ; étape 9 (ex-10, meta descriptions) découpée en lots numérotés avec critère de complétion explicite par lot.

## Registre

- Plan enregistré : `plans/plateforme-des-mysteres-audit-critique-ameliorations.md`
- 16 étapes, 6 tiers (0-1 urgents/cœur produit, 2-4 techniques, 5 produit soumis à validation)
- Mémoire projet : `project_audit_2026-07-02.md` (pointeur + constats clés, ne pas relancer les 3 audits initiaux)
