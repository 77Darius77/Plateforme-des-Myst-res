# Meta descriptions à raccourcir (>160 caractères)

Généré par `scripts/generate-meta-description-report.mjs` (qui appelle
`scripts/measure-meta-descriptions.mjs`) — Étape 9.0 du PRD
`plans/plateforme-des-mysteres-audit-critique-ameliorations.md`.

**Ce document est un rapport de mesure en lecture seule.** Aucune meta
description n'a été modifiée pour produire ce fichier. Le raccourcissement
éditorial (lots 9.1 à 9.4) est un travail ultérieur, page par page, avec
relecture humaine — voir l'anti-pattern documenté dans le PRD : ne pas
tronquer mécaniquement.

## Méthodologie

- Source des données : `dist/**/*.html` généré par `npm run build`, et non
  les fichiers `.astro` sources directement — la valeur de `description`
  passée à `<Layout>` peut être calculée (variables, concaténation), donc
  parser le HTML déjà rendu par Astro donne la valeur réellement publiée,
  sans avoir à réimplémenter l'évaluation des templates.
- Longueur mesurée en **caractères Unicode** (comptage par code point via
  `[...string].length`), pas en octets — important pour les caractères
  accentués français (é, è, à, ê, ù, ç, œ, …) qui prennent plusieurs octets en
  UTF-8 mais comptent pour 1 caractère.
- Le chemin `.astro` source est retrouvé par correspondance directe avec la
  route (le site n'a aucune route dynamique `getStaticPaths`/`[slug]`, donc
  `dist/x/y/index.html` correspond à `src/pages/x/y.astro` ou
  `src/pages/x/y/index.astro`).

## Résultat global

- Pages totales analysées (`dist/**/*.html`) : **146**
- Pages sans balise `<meta name="description">` détectée : **0**
- Chemin source `.astro` non résolu : **0**
- **Pages dépassant 160 caractères : 89** (le PRD annonçait "~90" — chiffre réel confirmé ci-dessus)

## Répartition en 4 lots (pour les étapes 9.1 à 9.4)

- Lot 1 (étape 9.1) : pages 1 à 20 (20 pages)
- Lot 2 (étape 9.2) : pages 21 à 40 (20 pages)
- Lot 3 (étape 9.3) : pages 41 à 60 (20 pages)
- Lot 4 (étape 9.4) : pages 61 à 89 (29 pages)

---

### Lot 1 — pages 1 à 20

| # | Longueur | Fichier source | Meta description actuelle |
|---|----------|-----------------|----------------------------|
| 1 | 270 | `src/pages/blog/analyse-marilyn-monroe.astro` | Analyse numérologique de Marilyn Monroe selon la méthode Raúl Durán : chemin de vie 7 (Le Mystère — la femme derrière l'icône), côté droit 18 (La Lune — le miroir des projections collectives), ticún 11 nombre maître (La Force) — la force requise pour survivre à l'image. |
| 2 | 267 | `src/pages/blog/analyse-sigmund-freud.astro` | Analyse numérologique de Sigmund Freud selon la méthode Raúl Durán : chemin de vie 4 (L'Empereur), côté droit 20 (Le Jugement), nombre central 5 (L'Hiérophante), ticún 9 (L'Ermite) — l'architecte solitaire de la psychanalyse et du réveil de la conscience occidentale. |
| 3 | 264 | `src/pages/blog/analyse-abraham-lincoln.astro` | Analyse numérologique d'Abraham Lincoln selon la méthode Raúl Durán : chemin de vie 5 (L'Hiérophante — la Proclamation d'Émancipation comme acte de légitimation morale), côté droit 18 (La Lune — l'intuition politique), ticún 4 (L'Empereur) — bâtir l'ordre nouveau. |
| 4 | 257 | `src/pages/blog/analyse-beethoven.astro` | Analyse numérologique de Ludwig van Beethoven selon la méthode Raúl Durán : chemin de vie 8 (La Justice), côté droit 15 (Le Diable — la surdité littérale), ticún 10 (La Roue de Fortune), guématrie 26 (YHVH) — la 9e Symphonie composée dans le silence absolu. |
| 5 | 251 | `src/pages/blog/analyse-barack-obama.astro` | Analyse numérologique de Barack Obama selon la méthode Raúl Durán : chemin de vie 11 (La Force — nombre maître, même archétype que Mozart), côté droit 17 (L'Étoile — 'Yes We Can'), nombre central 8 (La Justice), ticún 5 — le transmetteur d'une vision. |
| 6 | 244 | `src/pages/blog/analyse-cristiano-ronaldo.astro` | Analyse numérologique de Cristiano Ronaldo selon la méthode Raúl Durán : chemin de vie 12 (Le Pendu — l'excellence construite dans la suspension), double 5 dans les composants (L'Hiérophante), ticún 20 (Le Jugement — la soif de reconnaissance). |
| 7 | 241 | `src/pages/blog/analyse-albert-einstein.astro` | Analyse numérologique d'Albert Einstein selon la méthode Raúl Durán : chemin de vie 6 (Les Amoureux), côté droit 7 (Le Mystère), nombre central 3 (L'Impératrice), ticún 4 (L'Empereur) — le génie du choix de valeur et de la vision intérieure. |
| 8 | 239 | `src/pages/blog/analyse-leonard-de-vinci.astro` | Analyse numérologique de Léonard de Vinci selon la méthode Raúl Durán : chemin de vie 4 (L'Empereur), côté droit 12 (Le Pendu), double 4 (CDV + nombre central), ticún 1 (Le Bateleur), guématrie 22 (Le Joker maître) — le profil des profils. |
| 9 | 234 | `src/pages/blog/analyse-mahatma-gandhi.astro` | Analyse numérologique de Mahatma Gandhi selon la méthode Raúl Durán : chemin de vie 18 (La Lune — l'ahimsa comme force invisible), côté droit 6 (Les Amoureux — la satyagraha), ticún 2 (La Papesse) — la pureté des moyens comme méthode. |
| 10 | 231 | `src/pages/blog/analyse-lionel-messi.astro` | Analyse numérologique de Lionel Messi selon la méthode Raúl Durán : chemin de vie 19 (Le Soleil — la grâce naturelle), double 6 dans les composants (Les Amoureux), ticún 5 (L'Hiérophante) — le passeur de flamme du football mondial. |
| 11 | 230 | `src/pages/blog/analyse-mozart.astro` | Analyse numérologique de Wolfgang Amadeus Mozart selon la méthode Raúl Durán : chemin de vie 11 (La Force — nombre maître), côté droit 19 (Le Soleil), ticún 9 (L'Ermite) — le génie solaire dont la solitude est le défi fondamental. |
| 12 | 229 | `src/pages/blog/analyse-jeff-bezos.astro` | Analyse numérologique de Jeff Bezos selon la méthode Raúl Durán : chemin de vie 6 (Les Amoureux — le départ de Wall Street en 1994), côté droit 20 (Le Jugement), nombre central 1 (Le Bateleur), ticún 7 — la boussole à long terme. |
| 13 | 221 | `src/pages/blog/analyse-mark-zuckerberg.astro` | Analyse numérologique de Mark Zuckerberg selon la méthode Raúl Durán : chemin de vie 5 (L'Hiérophante), nombre maître 22 au côté droit (Le Joker), ticún 3 — le transmetteur universel et son épreuve de la création fertile. |
| 14 | 220 | `src/pages/blog/analyse-adele.astro` | Analyse numérologique d'Adele selon la méthode Raúl Durán : chemin de vie 18 (La Lune), double Hiérophante dans les composants, ticún 2 — la voix lunaire qui articule ce que des millions de personnes ne peuvent pas dire. |
| 15 | 219 | `src/pages/blog/analyse-muhammad-ali.astro` | Analyse numérologique de Muhammad Ali selon la méthode Raúl Durán : chemin de vie 7 (Le Mystère), La Maison-Dieu comme don, Le Bateleur au centre, ticún 22 (Le Joker) — la boussole inébranlable d'un champion hors norme. |
| 16 | 219 | `src/pages/blog/analyse-victor-hugo.astro` | Analyse numérologique de Victor Hugo selon la méthode Raúl Durán : chemin de vie 21 (Le Monde), nombre maître 11 (La Force), ticún 1 (Le Bateleur) — le double Le Monde, configuration rarissime de l'universel initiateur. |
| 17 | 217 | `src/pages/astrologie/vedique.astro` | Calculez votre thème astrologique védique traditionnel (Jyotish). Découvrez votre Lagna (Ascendant), votre Nakshatra lunaire de naissance, vos 12 Bhavas, et dressez votre calendrier de cycles de vie Vimshottari Dasha. |
| 18 | 214 | `src/pages/blog/kua-ba-zhai.astro` | Découvrez le Nombre Kua et le système Ba Zhai du Feng Shui : calcul pas à pas, groupes Est et Ouest, 4 directions favorables et défavorables, applications pratiques pour optimiser votre espace de vie et de travail. |
| 19 | 212 | `src/pages/blog/analyse-taylor-swift.astro` | Analyse numérologique de Taylor Swift selon la méthode Raúl Durán : chemin de vie 7 (Le Mystère), nombre central 12 (Le Pendu — la suspension des masters), ticún 8 (La Justice) — la quête des droits des artistes. |
| 20 | 212 | `src/pages/blog/pamela-colman-smith.astro` | Derrière les 78 cartes les plus célèbres du monde se cache une femme extraordinaire : illustratrice jamaïcaine, suffragette, membre de la Golden Dawn, et créatrice d'images qui ont façonné l'imaginaire collectif. |

### Lot 2 — pages 21 à 40

| # | Longueur | Fichier source | Meta description actuelle |
|---|----------|-----------------|----------------------------|
| 21 | 209 | `src/pages/blog/analyse-elvis-presley.astro` | Analyse numérologique d'Elvis Presley selon la méthode Raúl Durán : chemin de vie 9 (L'Ermite), La Lune comme don, Le Bateleur au centre, ticún 9 — configuration double rarissime, la solitude au cœur du règne. |
| 22 | 205 | `src/pages/blog/geomancie-astrologie.astro` | Les 16 figures géomantiques sont enracinées dans l'astrologie médiévale : planètes, signes, maisons. Comprendre ces correspondances éclaire chaque figure et ouvre des niveaux d'interprétation insoupçonnés. |
| 23 | 205 | `src/pages/blog/nombres-maitres.astro` | Les nombres maîtres 11, 22 et 33 en numérologie pythagoricienne ne sont pas des super-pouvoirs mais des contrats exigeants. Guide complet : signification, défis, exemples célèbres et perspectives croisées. |
| 24 | 205 | `src/pages/blog/tarot-astrologie.astro` | L'Empereur est Bélier, la Papesse est Lune, Le Monde est Saturne. Découvrez le système complet des correspondances entre les 22 arcanes majeurs, les signes du zodiaque et les planètes selon la Golden Dawn. |
| 25 | 204 | `src/pages/blog/lo-shu-fleches.astro` | Construisez votre grille Lo Shu personnelle à partir de votre date de naissance, décodez les absences karmiques, les surplus d'énergie et les 8 flèches de force et de faiblesse de la numérologie chinoise. |
| 26 | 204 | `src/pages/blog/thoth-crowley.astro` | Le tarot le plus complexe de l'histoire : 78 cartes peintes sur 5 ans par Lady Frieda Harris, guidées par l'occultiste Aleister Crowley. Alchimie, astrologie, kabbale et I Ching réunis en un seul système. |
| 27 | 203 | `src/pages/blog/analyse-volodymyr-zelensky.astro` | Analyse numérologique de Volodymyr Zelensky selon la méthode Raúl Durán : chemin de vie 15 (Le Diable — résistance), nombre central 1 (l'acteur devenu président), ticún 21 (Le Monde entier comme témoin). |
| 28 | 199 | `src/pages/blog/analyse-winston-churchill.astro` | Analyse numérologique de Winston Churchill selon la méthode Raúl Durán : chemin de vie 7 (Le Mystère — la voix solitaire des années 1930), nombre maître 11 (La Force), ticún 6 — le choix de mai 1940. |
| 29 | 198 | `src/pages/blog/compatibilite-astrologique.astro` | Bélier + Cancer = impossible ? Pas si simple. Vénus, Mars, Lune, Ascendant : les 5 niveaux de compatibilité qui font ou défont une relation, bien au-delà du classique « quels signes vont ensemble ». |
| 30 | 198 | `src/pages/blog/geomancie-africaine.astro` | L'Ifá des Yoruba du Nigeria et le Sikidy de Madagascar sont deux systèmes divinatoires binaires apparentés à la géomancie arabe. Un même alphabet de figures, des cosmologies profondément distinctes. |
| 31 | 197 | `src/pages/blog/tarot-marseille.astro` | Le plus ancien tarot divinatoire occidental : ses origines italiennes, sa structure en 3 septénaires, ses 22 arcanes majeurs, ses 4 suites, et la richesse inépuisable de son iconographie médiévale. |
| 32 | 196 | `src/pages/blog/methode-chaldeenne.astro` | Table 1–8, 9 sacré, 4 nombres fondamentaux (Actif, Destin, Naissance, Vie), nombres composés, vibrations planétaires. Le guide complet de la numérologie chaldéenne, héritée de l'ancienne Babylone. |
| 33 | 196 | `src/pages/blog/triade-soleil-lune.astro` | Votre signe solaire n'est que la surface : la Lune révèle votre monde intérieur, l'Ascendant votre personnage extérieur. Comprendre ces trois piliers transforme radicalement la lecture d'un thème. |
| 34 | 195 | `src/pages/blog/analyse-dalai-lama.astro` | Analyse numérologique de Tenzin Gyatso selon la méthode Raúl Durán : chemin de vie 4 (L'Empereur souverain sans territoire), côté droit 18 (La Lune — le monde intérieur), ticún 5 (L'Hiérophante). |
| 35 | 195 | `src/pages/numerologie/chinoise.astro` | Découvrez vos 3 nombres chinois : Nombre Kua (élément, direction, trigramme), Grille Lo Shu personnelle (forces et absences), Nombre de Vie. Calculateur gratuit fondé sur la tradition du Wu Xing. |
| 36 | 195 | `src/pages/numerologie/prenom.astro` | Découvrez les vibrations cachées de votre prénom : calculez votre Nombre Actif (mission d'âme), identifiez vos leçons karmiques (nombres manquants) et explorez vos mémoires transgénérationnelles. |
| 37 | 193 | `src/pages/blog/analyse-nelson-mandela.astro` | Analyse numérologique de Nelson Mandela selon la méthode Raúl Durán : chemin de vie 8 (La Justice), côté droit 19 (Le Soleil après 27 ans d'obscurité), ticún 6 — la réconciliation comme destin. |
| 38 | 193 | `src/pages/blog/geomancie-16-figures.astro` | Guide complet des 16 figures géomantiques : Via, Fortuna Major, Acquisitio, Laetitia... Leur pattern binaire, correspondance planétaire, élément et interprétation détaillée domaine par domaine. |
| 39 | 193 | `src/pages/blog/jyotish-introduction.astro` | Science de la lumière en sanskrit, le Jyotish est l'une des six disciplines sacrées du Vedanga. Plus qu'une astrologie, c'est une carte du karma, une boussole du dharma et une horloge de l'âme. |
| 40 | 193 | `src/pages/blog/oracle-belline.astro` | Créé par le voyant Edmond au XIXᵉ siècle et popularisé par Marcel Belline, cet oracle de 53 lames associe symboles planétaires, mythologie et psychologie dans un langage accessible et puissant. |

### Lot 3 — pages 41 à 60

| # | Longueur | Fichier source | Meta description actuelle |
|---|----------|-----------------|----------------------------|
| 41 | 192 | `src/pages/blog/analyse-charles-de-gaulle.astro` | Analyse numérologique du général de Gaulle selon la méthode Raúl Durán : deux nombres maîtres (22 et 11), chemin de vie 6 (Les Amoureux — le choix du 18 juin), ticún 7 — la boussole solitaire. |
| 42 | 192 | `src/pages/blog/nakshatras.astro` | Bien avant le zodiaque à 12 signes, les anciens rishis divisaient le ciel en 27 mansions de 13°20'. Chaque Nakshatra a son mythe, son animal, son dieu, et sa vibration unique dans votre thème. |
| 43 | 192 | `src/pages/blog/yi-king.astro` | Le plus vieux livre de sagesse au monde (3000 ans) n'est pas qu'un oracle : c'est une philosophie complète du changement. 64 hexagrammes pour naviguer les mutations de l'existence avec clarté. |
| 44 | 191 | `src/pages/blog/douze-ascendants.astro` | Bélier ascendant Balance ? Taureau ascendant Scorpion ? L'Ascendant n'est pas qu'un signe secondaire — c'est la clé de votre première impression, de votre style, et de votre rapport au monde. |
| 45 | 191 | `src/pages/blog/numerologie-couple.astro` | Chemin de Vie 1 et 7 : défi ou complément ? Apprenez à lire la compatibilité amoureuse avec les nombres de vie, d'expression et d'âme. Matrice 9x9, méthode cabalistique et Kua chinois inclus. |
| 46 | 190 | `src/pages/blog/methode-chinoise.astro` | Guide complet de la numérologie chinoise : origines du Lo Shu, les 5 éléments Wu Xing, calcul du Kua, grille Lo Shu personnelle et Nombre de Vie. Comprendre les trois lectures fondamentales. |
| 47 | 190 | `src/pages/numerologie/pythagoricienne.astro` | Calcule ton chemin de vie, nombre d'expression, désir de l'âme et personnalité selon la méthode pythagoricienne. 5 nombres fondamentaux, 12 vibrations, interprétation personnalisée. Gratuit. |
| 48 | 189 | `src/pages/blog/analyse-beyonce.astro` | Analyse numérologique de Beyoncé selon la méthode Raúl Durán : chemin de vie 5 (L'Hiérophante), côté droit 19 (Le Soleil), ticún 6 — la transmettrice solaire de la culture noire américaine. |
| 49 | 189 | `src/pages/blog/retour-saturne.astro` | Crise de la trentaine ou passage initiatique ? Quand Saturne revient à sa position natale, il sonne la cloche de l'âge adulte. Guide complet pour traverser cette transition avec conscience. |
| 50 | 187 | `src/pages/blog/geomancie.astro` | Des sables du Sahara aux cours d'Europe médiévale, la géomancie lit l'avenir dans des points tracés au hasard. 16 figures issues de 4 Mères engendrent une cartographie complète du destin. |
| 51 | 186 | `src/pages/blog/analyse-vladimir-poutine.astro` | Analyse numérologique de Vladimir Poutine selon la méthode Raúl Durán : chemin de vie 7 (Le Mystère), ticún 22 (Le Joker — l'archétype de la totalité indifférenciée), L'Étoile comme don. |
| 52 | 186 | `src/pages/blog/tarot-jung.astro` | Quand Carl Gustav Jung découvre le Tarot : archétypes de l'inconscient collectif, synchronicité, processus d'individuation. Comment un psychiatre suisse a légitimé la sagesse des cartes. |
| 53 | 186 | `src/pages/oracles/runes/etoile.astro` | Effectuez un tirage gratuit en Constellation Runique avec les Runes Nordiques. 7 runes pour un éclairage complet : centre, finances, sentiments, santé, travail, spiritualité et résultat. |
| 54 | 185 | `src/pages/blog/petit-lenormand.astro` | Ni tarot, ni oracle classique : le jeu de Mademoiselle Lenormand, voyante de Napoléon, dévoile ses 36 cartes aux symboles simples et puissants pour une lecture pragmatique du quotidien. |
| 55 | 185 | `src/pages/index.astro` | Explorez les sagesses ancestrales : numérologie cabalistique, tarologie, astrologie et oracles. Découvrez votre chemin de vie, votre ticún et les 22 archétypes. Sans pub, sans tracking. |
| 56 | 184 | `src/pages/oracles/geomancie.astro` | Consultez l'oracle de géomancie classique : 16 figures géomantiques issues de la tradition arabe (Ilm al-Raml) et hermétique. Tirage à 3 Figures, Croix géomantique, Étoile à 7 Figures. |
| 57 | 183 | `src/pages/blog/analyse-greta-thunberg.astro` | Analyse numérologique de Greta Thunberg selon la méthode Raúl Durán : chemin de vie 9 (L'Ermite), côté droit 5 (L'Hiérophante), ticún 1 — la solitaire qui a initié Fridays for Future. |
| 58 | 183 | `src/pages/blog/analyse-napoleon-bonaparte.astro` | Analyse numérologique de Napoléon Bonaparte selon la méthode Raúl Durán : chemin de vie 10 (La Roue du destin), L'Hiérophante, La Justice, ticún 2 — une vie de cycles et de paradoxes. |
| 59 | 182 | `src/pages/oracles/miroirs.astro` | Oracle des Miroirs : 53 cartes psychanalytiques créées par Dimitri d'Alfange d'Uvril, illustrées par Aurore Schmitt. Tirages gratuits : 3 cartes, Croix des Reflets, Tirage du Miroir. |
| 60 | 180 | `src/pages/blog/analyse-emmanuel-macron.astro` | Analyse numérologique d'Emmanuel Macron selon la méthode Raúl Durán : chemin de vie 12 (Le Pendu), double 12, ticún 3 — le paradoxe du président suspendu entre tous les contraires. |

### Lot 4 — pages 61 à 89

| # | Longueur | Fichier source | Meta description actuelle |
|---|----------|-----------------|----------------------------|
| 61 | 180 | `src/pages/blog/analyse-marie-curie.astro` | Analyse numérologique de Marie Curie selon la méthode Raúl Durán : deux nombres maîtres (11 et 22) dans la même date — chemin de vie 4, ticún 4, guématrie 31 (El, la force divine). |
| 62 | 179 | `src/pages/blog/analyse-nikola-tesla.astro` | Analyse numérologique de Nikola Tesla selon la méthode Raúl Durán : chemin de vie 10 (La Roue), côté droit 20 (Reconnaissance), ticún 3 — le paradoxe du génie sans reconnaissance. |
| 63 | 179 | `src/pages/blog/astrologie-tropicale.astro` | Bélier à Poissons, Soleil à Pluton, Maison I à XII : les trois piliers de l'astrologie occidentale expliqués avec clarté, pour comprendre ce qui fait la richesse d'un thème natal. |
| 64 | 179 | `src/pages/blog/vimshottari-dasha.astro` | Quand les planètes se relaient pour diriger votre vie : le système de périodes planétaires le plus précis du Jyotish, capable de dater vos grands événements de vie à l'année près. |
| 65 | 179 | `src/pages/oracles/index.astro` | Découvrez les 7 arts divinatoires : Oracle de Belline, Oracle Gé, Géomancie classique, Oracle de la Triade, Oracle des Miroirs, Runes nordiques et Yi King. Gratuit, sans tracking. |
| 66 | 178 | `src/pages/blog/pythagore-vs-cabalistique.astro` | Origines, tables, calculs, nombres révélés : comparaison approfondie entre la numérologie pythagoricienne et la numérologie cabalistique de Raúl Durán. Laquelle vous correspond ? |
| 67 | 178 | `src/pages/numerologie/chaldeenne.astro` | Découvre tes 4 nombres chaldéens — Actif, Destin, Naissance, Vie. Table 1–8 (le 9 est sacré), vibrations planétaires, nombres composés. Héritage des anciens Babyloniens. Gratuit. |
| 68 | 177 | `src/pages/blog/analyse-steve-jobs.astro` | Analyse numérologique de Steve Jobs selon la méthode Raúl Durán : chemin de vie 10 (La Roue de Fortune — renvoyé 1985, retourné 1997), ticún 12 (Le Pendu), guématrie 28 (Koach). |
| 69 | 177 | `src/pages/blog/nombres-composes-chaldeens.astro` | Tableau complet des 22 nombres composés chaldéens (10–31) avec symbolisme, polarité et interprétation. La double lecture intérieur/extérieur, unique à la tradition babylonienne. |
| 70 | 176 | `src/pages/blog/runes-futhark.astro` | 24 signes gravés sur bois, pierre ou os : le plus ancien alphabet germanique est aussi un puissant système divinatoire. Mythes, tirages et sagesse du Nord dans votre quotidien. |
| 71 | 176 | `src/pages/oracles/belline.astro` | Découvrez 4 méthodes de tirage de l'Oracle de Belline : le Tirage en Croix, le Tirage à 3 Cartes, la Ligne de Vie et la Coupe. Un oracle de 53 cartes créé par le voyant Edmond. |
| 72 | 175 | `src/pages/blog/astro-chinoise-wuxing.astro` | Au-delà des 12 animaux, le véritable moteur de l'astrologie chinoise est le cycle des 5 éléments (Wu Xing) combiné au Yin/Yang. Chaque signe cache 5 personnalités différentes. |
| 73 | 174 | `src/pages/astrologie/siderale.astro` | Calculez votre signe solaire et votre ascendant sidéraux réels avec la correction astronomique de l'Ayanamsa de Lahiri. Explorez l'astrologie stellaire et les constellations. |
| 74 | 174 | `src/pages/blog/astro-numerologie.astro` | Saturne et le nombre 8, Jupiter et le 3, Vénus et le 6 : les correspondances planètes-nombres sont anciennes et profondes. Apprenez à lire astrologie et numérologie ensemble. |
| 75 | 173 | `src/pages/blog/voyage-mat.astro` | De l'innocence du Fou à l'accomplissement du Monde : un cheminement spirituel en 22 étapes que chaque âme traverse, illustré par le plus célèbre jeu de cartes de l'Histoire. |
| 76 | 172 | `src/pages/blog/siderale-vs-tropicale.astro` | Pourquoi votre signe n'est pas le même dans les deux systèmes ? La précession des équinoxes, l'Ayanamsa de Lahiri, et ce que ce décalage révèle sur notre rapport au cosmos. |
| 77 | 171 | `src/pages/oracles/runes.astro` | Découvrez 3 méthodes de tirage des Runes Nordiques : le Tirage des Nornes, la Croix d'Yggdrasil et la Constellation Runique. 24 runes du Futhark Ancien pour la divination. |
| 78 | 170 | `src/pages/blog/ponts-numerologie-tarot.astro` | Les 22 arcanes majeurs du Tarot et les 22 archétypes de la numérologie cabalistique : mêmes lettres hébraïques, mêmes correspondances, deux langages pour une même vérité. |
| 79 | 168 | `src/pages/blog/oracle-triade.astro` | Un oracle contemporain structuré en trois cycles : la Matière, l'Âme et l'Esprit. 57 lames pour explorer son chemin d'évolution personnelle, du concret au transcendant. |
| 80 | 167 | `src/pages/astrologie/chinoise.astro` | Calculez votre signe animalier chinois, votre élément (Bois, Feu, Terre, Métal, Eau) et votre polarité Yin/Yang. Un système millénaire fondé sur le calendrier lunaire. |
| 81 | 167 | `src/pages/blog/oracle-miroirs.astro` | Chaque carte est un miroir : elle ne vous montre pas l'avenir — elle vous montre vous-même. Un oracle psychologique pour explorer les facettes cachées de votre psyché. |
| 82 | 167 | `src/pages/blog/quel-oracle-choisir.astro` | Belline, Géomancie, Triade, Miroirs, Runes ou Yi King : chaque oracle a sa personnalité, sa complexité, son usage. Comment choisir celui qui vous correspond vraiment ? |
| 83 | 167 | `src/pages/oracles/geomancie/croix.astro` | Tirage géomantique en Croix : 5 figures pour une analyse complète de votre situation. Situation, Soutien, Racines, Obstacle, Issue. Oracle des 16 figures géomantiques. |
| 84 | 167 | `src/pages/tarologie/lenormand.astro` | Découvrez le Petit Lenormand, 36 cartes pour la divination quotidienne. Effectuez des tirages en ligne : tirage quotidien, ligne du temps, carré de 9 et Grand Tableau. |
| 85 | 165 | `src/pages/blog/croix-celtique.astro` | Le tirage le plus emblématique du Rider-Waite-Smith, pas à pas : positions, significations, interactions. Un outil de diagnostic complet pour toute situation de vie. |
| 86 | 163 | `src/pages/oracles/geomancie/etoile.astro` | Tirage géomantique en Étoile à 7 figures pour une analyse complète : cœur, aspiration, fondation, passé, avenir, ressources intérieures et environnement extérieur. |
| 87 | 161 | `src/pages/blog/analyse-elon-musk.astro` | Analyse numérologique d'Elon Musk selon la méthode Raúl Durán : chemin de vie 7 (Le Mystère), côté droit 18 (La Lune), ticún 2 — entre génie lunaire et illusion. |
| 88 | 161 | `src/pages/blog/cinq-nombres-pythagoriciens.astro` | Chemin de vie, Expression, Désir de l'Âme, Personnalité, Année Personnelle : que révèle chacun et comment les lire ensemble pour une lecture numérique cohérente. |
| 89 | 161 | `src/pages/blog/yi-king-synchronicite.astro` | Carl Gustav Jung et sa rencontre avec le Yi King, qui l'a mené à formuler le principe de synchronicité — l'une des idées les plus révolutionnaires du XXᵉ siècle. |

