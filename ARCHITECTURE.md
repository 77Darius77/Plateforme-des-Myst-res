# Architecture V3 — Plateforme des Mystères

> **Vision :** Une constellation de sagesses ésotériques, chaque étoile étant une discipline avec ses propres branches.  
> **Design :** Dark-mode natif inspiré Linear, tendances 2026 (AI-enhanced, motion design, typographic statements, cinematic heroes)  
> **Stack :** HTML/CSS/JS pur — aucun framework, aucun AI builder, code artisanal premium  
> **Mise à jour :** 15 juin 2026 — intégration des Oracles + sous-pages + tendances 2026

---

## 0. Tendances Web Design 2026 — Ce qu'on applique

| Tendance | Application |
|----------|------------|
| **AI-Enhanced Creativity** | Calculateur intelligent, interprétations générées |
| **Dynamic Motion Design** | Animations scroll-driven, transitions fluides, micro-interactions |
| **Typographic Statements** | Inter oversized, JetBrains Mono pour les nombres, lettrage négatif |
| **Cinematic Heroes** | Full-bleed dark gradients, particules subtiles |
| **Exploratory Layouts** | Navigation par portails, découverte progressive |
| **Mixed Scroll Directions** | Horizontal pour les archétypes, vertical pour le contenu |
| **Dark Mode Natif** | Luminance stepping Linear, ombres ElevenLabs |
| **Zero AI Builder** | Code artisanal — pas de Wix/Framer/Webflow, pur HTML/CSS/JS |

---

## 1. Arborescence Complète

```
site/
├── index.html                              ← PORTAIL — toutes les disciplines
│
├── pages/
│   │
│   ├── numerologie/
│   │   ├── index.html                      ← Hub Numérologie
│   │   ├── cabalistique.html               ← Numérologie Cabalistique (Raúl Durán) ★ ACTIF
│   │   ├── pythagoricienne.html            ← Numérologie Pythagoricienne [FUTUR]
│   │   ├── chaldeenne.html                 ← Numérologie Chaldéenne [FUTUR]
│   │   ├── chinoise.html                   ← Numérologie Chinoise (Lo Shu) [FUTUR]
│   │   └── calculateur.html                ← Calculateur universel (?type=cabalistique)
│   │
│   ├── tarologie/
│   │   ├── index.html                      ← Hub Tarologie
│   │   ├── marseille.html                  ← Tarot de Marseille [FUTUR]
│   │   ├── rider-waite.html                ← Rider-Waite-Smith [FUTUR]
│   │   ├── thoth.html                      ← Tarot de Thoth [FUTUR]
│   │   ├── lenormand.html                  ← Petit Lenormand [FUTUR]
│   │   └── tirage.html                     ← Tirage interactif [FUTUR]
│   │
│   ├── astrologie/
│   │   ├── index.html                      ← Hub Astrologie
│   │   ├── tropicale.html                  ← Astrologie Tropicale [FUTUR]
│   │   ├── siderale.html                   ← Astrologie Sidérale [FUTUR]
│   │   ├── vedique.html                    ← Astrologie Védique (Jyotish) [FUTUR]
│   │   ├── chinoise.html                   ← Astrologie Chinoise [FUTUR]
│   │   └── theme-natal.html                ← Calculateur thème natal [FUTUR]
│   │
│   └── oracles/
│       ├── index.html                      ← Hub Oracles
│       ├── belline.html                    ← Oracle de Belline [FUTUR]
│       ├── ge.html                         ← Oracle Gé [FUTUR]
│       ├── runes.html                      ← Runes Nordiques [FUTUR]
│       ├── yi-king.html                    ← Yi King / I Ching [FUTUR]
│       └── tirage.html                     ← Tirage interactif [FUTUR]
│
├── blog/
│   ├── index.html                          ← Tous les articles
│   ├── reflexions-numerologie.html         ← ★ Réflexions philosophiques (reflexions.md)
│   ├── methode-raul-duran.html             ← ★ La méthode expliquée
│   ├── analyse-donald-trump.html           ← ★ Portrait numérologique
│   ├── guide-22-archetypes.html            ← Guide complet des archétypes
│   ├── ponts-numerologie-tarot.html        ← Numérologie & Tarot : les correspondances
│   └── 72-noms-dieu.html                   ← Initiation aux 72 Noms
│
├── assets/
│   ├── css/
│   │   ├── design-system.css               ← Variables, couleurs, typo, spacing
│   │   ├── components.css                  ← Boutons, cartes, inputs, badges
│   │   ├── layout.css                      ← Header, footer, grid, responsive
│   │   └── blog.css                        ← Style article (lecture longue)
│   ├── js/
│   │   ├── main.js                         ← Nav, thème, animations scroll
│   │   ├── calculateur.js                  ← Logique calculateur (partagé)
│   │   └── blog.js                         ← Progression lecture, temps estimé
│   └── images/
│       ├── infographie_22_archetypes.svg
│       ├── hero-bg.svg
│       └── favicon.svg
│
└── a-propos.html                           ← Crédits, sources, contact
```

---

## 2. Design System (synthèse)

### Palette — Dark Mode Natif

| Token | Hex | Rôle |
|-------|-----|------|
| `--bg-deepest` | `#020617` | Fond hero, landing |
| `--bg-deep` | `#08090a` | Fond principal |
| `--bg-panel` | `#0f1011` | Panneaux, nav |
| `--bg-surface` | `#191a1b` | Cartes |
| `--bg-hover` | `#1e293b` | Survol |
| `--gold` | `#fbbf24` | Accent principal ★ |
| `--emerald` | `#34d399` | Dons, forces |
| `--cyan` | `#22d3ee` | Liens, interactif |
| `--violet` | `#a78bfa` | Spirituel, mystique |
| `--rose` | `#fb7185` | Amour, avertissements |
| `--text-primary` | `#f7f8f8` | Texte |
| `--text-secondary` | `#d0d6e0` | Sous-texte |
| `--text-muted` | `#8a8f98` | Tertiaire |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Bordures fines |
| `--border-standard` | `rgba(255,255,255,0.08)` | Bordures |

### Typographie

| Niveau | Police | Taille | Graisse | Usage |
|--------|--------|--------|---------|-------|
| Hero | Inter | 56px | 600 | Landing title |
| H1 | Inter | 40px | 600 | Titre page |
| H2 | Inter | 28px | 500 | Titre section |
| H3 | Inter | 20px | 500 | Sous-titre |
| Body L | Inter | 18px | 400 | Article |
| Body | Inter | 16px | 400 | Standard |
| Caption | Inter | 14px | 400 | Meta |
| Mono | JetBrains Mono | 14px | 400 | Nombres |
| Overline | JetBrains Mono | 11px | 500 | Labels |

### Élévation

| Niveau | Traitement | Usage |
|--------|-----------|-------|
| Flat | Aucun shadow | Fond page |
| Subtle | `rgba(255,255,255,0.02)` bg | Surfaces secondaires |
| Card | `rgba(255,255,255,0.05)` bg + border | Cartes |
| Elevated | Multi-shadow stack | Modales |

---

## 3. Landing Page — Le Portail

```
┌──────────────────────────────────────────────────────────┐
│  HEADER (sticky, blur, border-bottom subtil)              │
│  ✦ Les Mystères  |  Numérologie  |  Tarologie  |         │
│  Astrologie  |  Oracles  |  Blog  |  À propos    [🌙/☀️] │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  HERO — Cinematic                                         │
│  Fond : dégradé deep + particules subtiles                │
│  « Les Mystères se révèlent à qui sait lire »             │
│  « Explorez les sagesses ancestrales à travers            │
│   leurs nombres, leurs symboles et leurs astres »         │
│  [CTA: Découvrir la Numérologie ✦]                        │
│                                                            │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  PORTAILS — 4 cartes de discipline                        │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────┐ │
│  │🔢 NUMÉRO-  │ │🃏 TAROLOGIE│ │⭐ ASTRO-   │ │🔮      │ │
│  │   LOGIE    │ │  4 traditions│ │   LOGIE   │ │ ORACLES│ │
│  │  4 écoles  │ │            │ │  4 systèmes│ │ 4 arts │ │
│  │ [Explorer] │ │ [Bientôt]  │ │ [Bientôt]  │ │[Bientôt]│ │
│  └────────────┘ └────────────┘ └────────────┘ └────────┘ │
│                                                            │
├──────────────────────────────────────────────────────────┤
│  DERNIERS ARTICLES — Grille 3 colonnes                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │ Réflexions   │ │ Méthode Raúl │ │ Portrait de  │      │
│  │ numérologie  │ │ Durán        │ │ Donald Trump │      │
│  │ 8 min · Blog │ │ 5 min · Blog │ │ 6 min · Blog │      │
│  └──────────────┘ └──────────────┘ └──────────────┘      │
├──────────────────────────────────────────────────────────┤
│  FOOTER                                                    │
│  Créé avec ♥ | Sources | Raúl Durán | Podcast Lo Grande   │
└──────────────────────────────────────────────────────────┘
```

---

## 4. Page Niche — Template Réutilisable

Chaque discipline a un **hub** (index.html) qui liste ses sous-écoles, et chaque sous-école a sa **page dédiée**.

### Hub (ex: numerologie/index.html)
```
┌────────────────────────────────────────────┐
│  BANNIÈRE DISCIPLINE                        │
│  🔢 Numérologie — La science des nombres    │
│  « Les nombres sont le langage de l'âme »   │
├────────────────────────────────────────────┤
│  ÉCOLES                                     │
│  ┌──────────────┐ ┌──────────────┐         │
│  │ Cabalistique ★│ │Pythagoricienne│         │
│  │ 22 archétypes │ │ Nombres 1-9  │         │
│  │ [Explorer]   │ │ [Bientôt]    │         │
│  └──────────────┘ └──────────────┘         │
│  ┌──────────────┐ ┌──────────────┐         │
│  │ Chaldéenne   │ │  Chinoise    │         │
│  │ 1-52 valeurs │ │ Carré Lo Shu │         │
│  │ [Bientôt]    │ │ [Bientôt]    │         │
│  └──────────────┘ └──────────────┘         │
├────────────────────────────────────────────┤
│  ARTICLES LIÉS                              │
└────────────────────────────────────────────┘
```

### Sous-école (ex: numerologie/cabalistique.html)
```
┌────────────────────────────────────────────┐
│  BANNIÈRE                                  │
│  Numérologie Cabalistique — Raúl Durán     │
├────────────────────────────────────────────┤
│  CALCULATEUR INLINE                        │
│  [JJ/MM/AAAA] [Révéler ✦]                  │
│  → Résultat instantané animé               │
│  → URL partageable (?date=...)             │
├────────────────────────────────────────────┤
│  CONTENU                                    │
│  - Qu'est-ce que la numérologie cabalistique│
│  - Les 22 archétypes (grille filtrable)    │
│  - Infographie SVG                          │
│  - La méthode                               │
├────────────────────────────────────────────┤
│  ARTICLES APPROFONDIS                       │
└────────────────────────────────────────────┘
```

---

## 5. Blog

### Page d'index
- Grille de cartes article (titre, extrait, date, temps de lecture, catégorie)
- Filtres par discipline
- Design aéré, typographique

### Page article
- Layout centré (max-width: 680px) — optimal pour la lecture
- Typographie : Inter 18px, line-height 1.8
- Barre de progression de lecture (top sticky)
- Callouts et citations stylisées (border-left gold)
- Temps de lecture estimé
- Articles liés en bas

---

## 6. Plan d'Exécution (Phases)

### Phase 1 — Fondations (maintenant)
- [ ] Créer `assets/css/design-system.css`
- [ ] Créer `assets/css/components.css`
- [ ] Créer `assets/css/layout.css`
- [ ] Créer `assets/js/main.js`
- [ ] Créer `assets/js/calculateur.js`

### Phase 2 — Landing Page
- [ ] Créer `index.html` (portail avec hero, 4 cartes disciplines, 3 articles)

### Phase 3 — Page Numérologie Active
- [ ] Créer `pages/numerologie/index.html` (hub)
- [ ] Créer `pages/numerologie/cabalistique.html` (page active avec calculateur)
- [ ] Créer `pages/numerologie/calculateur.html` (dédié)

### Phase 4 — Blog
- [ ] Créer `blog/index.html`
- [ ] Créer les 4 articles depuis nos fichiers existants
- [ ] Créer `assets/css/blog.css`

### Phase 5 — Stubs & Polish
- [ ] Créer les stubs "Bientôt" pour les autres hubs
- [ ] Favicon, meta tags, SEO, Open Graph
- [ ] Tests responsive

---

## 7. État Actuel vs Cible

| Élément | V1 (actuelle) | V3 (cible) |
|---------|--------------|------------|
| Structure | 1 page HTML | ~15 pages, 4 disciplines, arborescence |
| Calculateur | Section dans la page | Page dédiée + inline + URL share |
| Design | 1 fichier CSS inline | Design system modulaire 4 fichiers |
| Blog | Aucun | 7 articles, layout lecture premium |
| Extensibilité | Aucune | Chaque discipline peut s'étendre |
| Navigation | Ancres | Header sticky + fil d'Ariane |
| Oracles | ❌ Oubliés | ✅ Hub + 4 traditions |
| Thème | Dark uniquement | Dark + Light toggle |
| SEO | Zéro | Meta, OG, Schema.org |
