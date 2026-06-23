/* ── Moteur de calcul — Rapport d'Incarnation ──────────────────────────────
   Convention Y = voyelle (choix assumé, déterministe).
   Normalisation FR : accents retirés via NFD avant tout calcul sur le nom.
   Nombres maîtres : 11, 22, 33 — conservés à chaque palier de réduction.
   Méthode chemin de vie : composants (jour, mois, année réduits séparément).  */

// ── Table pythagoricienne ──────────────────────────────────────────────────
const LETTRE_VALEUR = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
};

const VOYELLES = new Set(['A','E','I','O','U','Y']);
const NOMBRES_MAITRES = new Set([11, 22, 33]);
const DETTES_KARMIQUES = new Set([13, 14, 16, 19]);

// ── Normalisation FR ───────────────────────────────────────────────────────
function normaliser(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

// ── Réduction numérologique ────────────────────────────────────────────────
// Retourne { valeur, intermediaires } pour détecter les dettes karmiques.
function reduire(n, plancher = 1) {
  const intermediaires = [];
  let v = Math.abs(Math.round(n));
  while (v > 9 && !NOMBRES_MAITRES.has(v)) {
    if (DETTES_KARMIQUES.has(v)) intermediaires.push(v);
    const suivant = String(v).split('').reduce((s, d) => s + Number(d), 0);
    v = suivant;
  }
  return { valeur: v, intermediaires };
}

// Réduction avec plancher 22 (pour les arcanes : on s'arrête à ≤ 22)
function reduireArcane(n) {
  let v = Math.abs(Math.round(n));
  while (v > 22) {
    v = String(v).split('').reduce((s, d) => s + Number(d), 0);
  }
  return v === 0 ? 22 : v;
}

// ── Chemin de vie (méthode composants) ────────────────────────────────────
function calculerCheminDeVie(jour, mois, annee) {
  const rJour  = reduire(jour);
  const rMois  = reduire(mois);
  const rAnnee = reduire(String(annee).split('').reduce((s, d) => s + Number(d), 0));

  const somme = rJour.valeur + rMois.valeur + rAnnee.valeur;
  const final = reduire(somme);

  const dettes = [...new Set([
    ...rJour.intermediaires,
    ...rMois.intermediaires,
    ...rAnnee.intermediaires,
    ...final.intermediaires,
  ])];

  return { valeur: final.valeur, dettes };
}

// ── Nombre d'expression, âme, personnalité ────────────────────────────────
function calculerNomComplet(prenom, nom) {
  const texte = normaliser(prenom + nom);
  const lettres = texte.split('').filter(c => LETTRE_VALEUR[c]);

  const toutes    = lettres.map(c => LETTRE_VALEUR[c]);
  const voyelles_ = lettres.filter(c => VOYELLES.has(c)).map(c => LETTRE_VALEUR[c]);
  const consonnes = lettres.filter(c => !VOYELLES.has(c)).map(c => LETTRE_VALEUR[c]);

  const somme = arr => arr.reduce((s, v) => s + v, 0);

  const rExpression  = reduire(somme(toutes));
  const rAme         = reduire(somme(voyelles_));
  const rPersonnalite = reduire(somme(consonnes));

  // Nombres absents (1-9 absents de toutes les lettres du nom)
  const presentsSet = new Set(toutes);
  const absents = [1,2,3,4,5,6,7,8,9].filter(n => !presentsSet.has(n));

  // Dettes karmiques (intermédiaires des trois réductions)
  const dettes = [...new Set([
    ...rExpression.intermediaires,
    ...rAme.intermediaires,
    ...rPersonnalite.intermediaires,
  ])];

  return {
    expression:   rExpression.valeur,
    ame:          rAme.valeur,
    personnalite: rPersonnalite.valeur,
    absents,
    dettes,
  };
}

// ── Année personnelle ──────────────────────────────────────────────────────
function calculerAnneePersonnelle(jour, mois, anneeGenerationRapport) {
  const rJour  = reduire(jour);
  const rMois  = reduire(mois);
  const rAnnee = reduire(String(anneeGenerationRapport).split('').reduce((s, d) => s + Number(d), 0));
  const somme  = rJour.valeur + rMois.valeur + rAnnee.valeur;
  return reduire(somme).valeur;
}

// ── Signe solaire ──────────────────────────────────────────────────────────
// Dates approximatives — note cuspide recommandée pour ±1 jour en bordure.
const SIGNES = [
  { nom: 'Capricorne',  element: 'Terre', modalite: 'Cardinal',  debut: [12,22], fin: [1,19]  },
  { nom: 'Verseau',     element: 'Air',   modalite: 'Fixe',      debut: [1,20],  fin: [2,18]  },
  { nom: 'Poissons',    element: 'Eau',   modalite: 'Mutable',   debut: [2,19],  fin: [3,20]  },
  { nom: 'Bélier',      element: 'Feu',   modalite: 'Cardinal',  debut: [3,21],  fin: [4,19]  },
  { nom: 'Taureau',     element: 'Terre', modalite: 'Fixe',      debut: [4,20],  fin: [5,20]  },
  { nom: 'Gémeaux',     element: 'Air',   modalite: 'Mutable',   debut: [5,21],  fin: [6,20]  },
  { nom: 'Cancer',      element: 'Eau',   modalite: 'Cardinal',  debut: [6,21],  fin: [7,22]  },
  { nom: 'Lion',        element: 'Feu',   modalite: 'Fixe',      debut: [7,23],  fin: [8,22]  },
  { nom: 'Vierge',      element: 'Terre', modalite: 'Mutable',   debut: [8,23],  fin: [9,22]  },
  { nom: 'Balance',     element: 'Air',   modalite: 'Cardinal',  debut: [9,23],  fin: [10,22] },
  { nom: 'Scorpion',    element: 'Eau',   modalite: 'Fixe',      debut: [10,23], fin: [11,21] },
  { nom: 'Sagittaire',  element: 'Feu',   modalite: 'Mutable',   debut: [11,22], fin: [12,21] },
  { nom: 'Capricorne',  element: 'Terre', modalite: 'Cardinal',  debut: [12,22], fin: [12,31] },
];

function calculerSigneSolaire(jour, mois) {
  for (const s of SIGNES) {
    const [dm, dj] = s.debut;
    const [fm, fj] = s.fin;
    if (dm === fm) {
      if (mois === dm && jour >= dj && jour <= fj) return s;
    } else if (dm > fm) {
      // Signe à cheval sur deux années (Capricorne)
      if ((mois === dm && jour >= dj) || (mois === fm && jour <= fj)) return s;
    } else {
      if ((mois === dm && jour >= dj) || (mois === fm && jour <= fj)) return s;
    }
  }
  // Fallback Capricorne
  return SIGNES[0];
}

// ── Arcanes (réutilise les clés de CARD_DATA) ─────────────────────────────
const NOMS_ARCANES = [
  'Le Fou',         // 0
  'Le Bateleur',    // 1
  'La Papesse',     // 2
  'L\'Impératrice', // 3
  'L\'Empereur',    // 4
  'Le Pape',        // 5
  'L\'Amoureux',    // 6
  'Le Chariot',     // 7
  'La Justice',     // 8
  'L\'Ermite',      // 9
  'La Roue',        // 10
  'La Force',       // 11
  'Le Pendu',       // 12
  'L\'Arcane XIII', // 13
  'La Tempérance',  // 14
  'Le Diable',      // 15
  'La Maison Dieu', // 16
  'L\'Étoile',      // 17
  'La Lune',        // 18
  'Le Soleil',      // 19
  'Le Jugement',    // 20
  'Le Monde',       // 21
];

function arcaneKey(n) {
  return String(n).padStart(2, '0');
}

function calculerArcanes(jour, mois, annee, anneeGenerationRapport) {
  // Arcane de vie : somme de tous les chiffres de la date, réduit à ≤ 22
  const sommeDate = String(jour).split('').concat(String(mois).split(''), String(annee).split(''))
    .reduce((s, d) => s + Number(d), 0);
  const arcaneVie = reduireArcane(sommeDate);

  // Arcane de l'année : jour + mois + année en cours, réduit à ≤ 22
  const sommeAnnee = String(jour).split('').concat(String(mois).split(''), String(anneeGenerationRapport).split(''))
    .reduce((s, d) => s + Number(d), 0);
  const arcaneAnnee = reduireArcane(sommeAnnee);

  return {
    vie:   { numero: arcaneVie,  nom: NOMS_ARCANES[arcaneVie]  || 'Le Fou', key: arcaneKey(arcaneVie)  },
    annee: { numero: arcaneAnnee, nom: NOMS_ARCANES[arcaneAnnee] || 'Le Fou', key: arcaneKey(arcaneAnnee) },
  };
}

// ── Point d'entrée principal ───────────────────────────────────────────────
export function calculerProfil(prenom, nom, dateNaissance) {
  const [jourStr, moisStr, anneeStr] = dateNaissance.split('/');
  const jour  = parseInt(jourStr,  10);
  const mois  = parseInt(moisStr,  10);
  const annee = parseInt(anneeStr, 10);
  const anneeActuelle = new Date().getFullYear();

  const cheminDeVie    = calculerCheminDeVie(jour, mois, annee);
  const nomComplet     = calculerNomComplet(prenom, nom);
  const anneePerso     = calculerAnneePersonnelle(jour, mois, anneeActuelle);
  const signe          = calculerSigneSolaire(jour, mois);
  const arcanes        = calculerArcanes(jour, mois, annee, anneeActuelle);

  // Fusion des dettes karmiques (toutes sources)
  const dettesKarmiques = [...new Set([
    ...cheminDeVie.dettes,
    ...nomComplet.dettes,
  ])];

  const planete    = calculerPlanete(cheminDeVie.valeur);
  const loShu      = calculerLoShu(jour, mois, annee);
  const lenormand  = tirerLenormand(jour, mois, annee);

  return {
    prenom,
    nom,
    dateNaissance,
    anneeRapport: anneeActuelle,

    // Numérologie
    cheminDeVie:    cheminDeVie.valeur,
    expression:     nomComplet.expression,
    ame:            nomComplet.ame,
    personnalite:   nomComplet.personnalite,
    anneePersonnelle: anneePerso,

    // Karmique
    nombresAbsents:   nomComplet.absents,
    dettesKarmiques,

    // Astrologie
    signe:    signe.nom,
    element:  signe.element,
    modalite: signe.modalite,

    // Tarot
    arcaneVie:   arcanes.vie,
    arcaneAnnee: arcanes.annee,

    // Planète
    planete,

    // Lo Shu
    loShu,

    // Lenormand
    lenormand,
  };
}

// ── Planète gouvernante ───────────────────────────────────────────────────
function calculerPlanete(cheminDeVie) {
  const MAP = {
    1:  { nom: 'Soleil',   symbole: '☉', element: 'Feu',   qualite: 'Yang',    polarite: 'Actif'   },
    2:  { nom: 'Lune',     symbole: '☽', element: 'Eau',   qualite: 'Yin',     polarite: 'Réceptif'},
    3:  { nom: 'Jupiter',  symbole: '♃', element: 'Feu',   qualite: 'Yang',    polarite: 'Expansif'},
    4:  { nom: 'Saturne',  symbole: '♄', element: 'Terre', qualite: 'Yin',     polarite: 'Structurant'},
    5:  { nom: 'Mercure',  symbole: '☿', element: 'Air',   qualite: 'Neutre',  polarite: 'Adaptable'},
    6:  { nom: 'Vénus',    symbole: '♀', element: 'Terre', qualite: 'Yin',     polarite: 'Harmonisant'},
    7:  { nom: 'Neptune',  symbole: '♆', element: 'Eau',   qualite: 'Yin',     polarite: 'Intuitif'},
    8:  { nom: 'Mars',     symbole: '♂', element: 'Feu',   qualite: 'Yang',    polarite: 'Conquérant'},
    9:  { nom: 'Mars/Jupiter', symbole: '♂♃', element: 'Feu', qualite: 'Yang', polarite: 'Universel'},
    11: { nom: 'Uranus',   symbole: '⛢', element: 'Air',   qualite: 'Yang',    polarite: 'Visionnaire'},
    22: { nom: 'Vulcain',  symbole: '⚒', element: 'Terre', qualite: 'Neutre',  polarite: 'Manifestant'},
    33: { nom: 'Neptune/Vénus', symbole: '♆♀', element: 'Eau', qualite: 'Yin', polarite: 'Compassionnel'},
  };
  return MAP[cheminDeVie] || MAP[1];
}

// ── Carré Lo Shu ─────────────────────────────────────────────────────────
function calculerLoShu(jour, mois, annee) {
  // Collecte tous les chiffres de la date
  const chiffres = `${String(jour).padStart(2,'0')}${String(mois).padStart(2,'0')}${annee}`
    .split('').map(Number).filter(n => n > 0);

  const grille = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0 };
  for (const c of chiffres) grille[c]++;

  // Positions Lo Shu (ligne par ligne, haut→bas) : 4,9,2 / 3,5,7 / 8,1,6
  const positions = [[4,9,2],[3,5,7],[8,1,6]];

  // Flèches de forces (séquences complètes présentes dans la grille)
  const FLECHES = [
    { nom: 'Volonté',      chiffres: [1,5,9], description: 'Détermination et direction claire' },
    { nom: 'Intuition',    chiffres: [3,5,7], description: 'Sensibilité et perception intérieure' },
    { nom: 'Intellect',    chiffres: [2,5,8], description: 'Analyse et mémoire développées' },
    { nom: 'Plan pratique',chiffres: [1,2,3], description: 'Organisation et méthode naturelles' },
    { nom: 'Ordre',        chiffres: [4,5,6], description: 'Équilibre émotionnel et harmonie' },
    { nom: 'Activité',     chiffres: [7,8,9], description: 'Énergie physique et capacité d\'action' },
    { nom: 'Matière',      chiffres: [1,4,7], description: 'Ancrage dans le concret et la durée' },
    { nom: 'Résilience',   chiffres: [3,6,9], description: 'Force face aux épreuves et rebond naturel' },
  ];

  const flechesPresentes  = FLECHES.filter(f => f.chiffres.every(c => grille[c] > 0));
  const flechesAbsentes   = FLECHES.filter(f => f.chiffres.some(c => grille[c] === 0));
  const nombresAbsents    = Object.keys(grille).map(Number).filter(n => grille[n] === 0);

  return { grille, positions, flechesPresentes, flechesAbsentes, nombresAbsents };
}

// ── Tirage Lenormand déterministe ─────────────────────────────────────────
function tirerLenormand(jour, mois, annee) {
  // Seed reproductible par date de naissance
  let seed = jour * 1000003 + mois * 10007 + annee * 31;
  function rand() {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return (seed >>> 0) / 0xffffffff;
  }

  // Tire 9 indices uniques parmi 36 cartes (indices 0-35)
  const pool = Array.from({ length: 36 }, (_, i) => i);
  const drawn = [];
  while (drawn.length < 9) {
    const idx = Math.floor(rand() * pool.length);
    drawn.push(pool.splice(idx, 1)[0]);
  }

  // Positions du Carré de 9
  const positions = [
    { id: drawn[0], pos: 1, label: 'Passé lointain',    zone: 'passe'   },
    { id: drawn[1], pos: 2, label: 'Passé récent',      zone: 'passe'   },
    { id: drawn[2], pos: 3, label: 'Point de bascule',  zone: 'passe'   },
    { id: drawn[3], pos: 4, label: 'Ressource intérieure', zone: 'present'},
    { id: drawn[4], pos: 5, label: 'Carte centrale',    zone: 'present' },
    { id: drawn[5], pos: 5, label: 'Dynamique externe', zone: 'present' },
    { id: drawn[6], pos: 7, label: 'Ce qui émerge',     zone: 'futur'   },
    { id: drawn[7], pos: 8, label: 'Invitation',        zone: 'futur'   },
    { id: drawn[8], pos: 9, label: 'Résultat possible', zone: 'futur'   },
  ];

  return { positions, indices: drawn };
}
