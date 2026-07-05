// scripts/verify-data.mjs — Garde-fou pré-build sur les données de tirage
// tarot (étape 12 du PRD audit-critique-ameliorations).
//
// Depuis l'étape 11, les moteurs d'interprétation tarot (public/js/tarot-
// {interp,rws-interp,thoth-interp}.js) sont réduits à des données + un appel
// à window.createTarotEngine(). Depuis l'étape 12, ces données elles-mêmes
// (CARD_DATA, SPREADS, PAIRS, TRIADS, FAMILIES) sont sorties du JS vers un
// fichier JSON dédié par deck (src/data/tarot-{marseille,rws,thoth}.json),
// injecté dans les pages par src/components/TarotDeckData.astro.
//
// Ce script vérifie, pour chaque fichier JSON :
//   1. qu'il ne contient AUCUNE clé dupliquée à quelque profondeur que ce
//      soit (JSON.parse ignore silencieusement les doublons — un risque
//      réel si les données sont un jour éditées à la main) ;
//   2. que le nombre d'entrées de CARD_DATA / SPREADS / PAIRS / TRIADS /
//      FAMILIES correspond exactement au nombre attendu (compté sur les
//      données réelles avant cette étape — voir EXPECTED_COUNTS) ;
//   3. que tous les champs obligatoires sont non vides (theme/shadow pour
//      CARD_DATA, intro/positions pour SPREADS, ids/label/text pour
//      PAIRS/TRIADS, ids/desc pour FAMILIES).
//
// Exécuté en pré-build : voir le script "build" dans package.json.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

/* ── 1. Détecteur de clés dupliquées, sensible à la profondeur ───────────
   JSON.parse ne signale jamais une clé répétée dans un même objet (il garde
   silencieusement la dernière valeur). On réimplémente donc un parseur JSON
   minimal qui lève une erreur dès qu'un objet contient deux fois la même
   clé, à N'IMPORTE QUEL niveau d'imbrication (CARD_DATA est plat, mais
   SPREADS.positions et les tableaux d'objets ne le sont pas — le scanner
   doit couvrir les deux cas). */
function assertNoDuplicateKeys(text, label) {
  let i = 0;
  const n = text.length;

  function error(msg) {
    // Calcule ligne/colonne pour un message exploitable.
    const upto = text.slice(0, i);
    const line = upto.split('\n').length;
    const col = i - upto.lastIndexOf('\n');
    throw new Error(`${label} : ${msg} (ligne ${line}, colonne ${col})`);
  }

  function skipWs() {
    while (i < n && /\s/.test(text[i])) i++;
  }

  function parseString() {
    if (text[i] !== '"') error('chaîne attendue');
    i++; // consomme "
    let out = '';
    while (i < n && text[i] !== '"') {
      if (text[i] === '\\') {
        out += text[i] + text[i + 1];
        i += 2;
      } else {
        out += text[i];
        i++;
      }
    }
    if (text[i] !== '"') error('chaîne non terminée');
    i++; // consomme "
    return out;
  }

  function parseValue() {
    skipWs();
    const c = text[i];
    if (c === '{') return parseObject();
    if (c === '[') return parseArray();
    if (c === '"') return parseString();
    if (c === 't') { i += 4; return true; }
    if (c === 'f') { i += 5; return false; }
    if (c === 'n') { i += 4; return null; }
    // nombre
    const start = i;
    while (i < n && /[-+0-9.eE]/.test(text[i])) i++;
    if (i === start) error(`valeur JSON inattendue "${c}"`);
    return Number(text.slice(start, i));
  }

  function parseObject() {
    i++; // consomme {
    const seenKeys = new Set();
    skipWs();
    if (text[i] === '}') { i++; return; }
    while (true) {
      skipWs();
      const key = parseString();
      if (seenKeys.has(key)) {
        error(`clé dupliquée "${key}" dans un objet`);
      }
      seenKeys.add(key);
      skipWs();
      if (text[i] !== ':') error(`":" attendu après la clé "${key}"`);
      i++; // consomme :
      parseValue();
      skipWs();
      if (text[i] === ',') { i++; continue; }
      if (text[i] === '}') { i++; break; }
      error('"," ou "}" attendu');
    }
  }

  function parseArray() {
    i++; // consomme [
    skipWs();
    if (text[i] === ']') { i++; return; }
    while (true) {
      parseValue();
      skipWs();
      if (text[i] === ',') { i++; continue; }
      if (text[i] === ']') { i++; break; }
      error('"," ou "]" attendu');
    }
  }

  parseValue();
}

/* ── 2. Validation de champs non vides ────────────────────────────────── */
function nonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function validateCardData(cardData, deckName, errors) {
  for (const [id, entry] of Object.entries(cardData)) {
    if (!entry || typeof entry !== 'object') {
      errors.push(`[${deckName}] CARD_DATA["${id}"] n'est pas un objet`);
      continue;
    }
    if (!nonEmptyString(entry.theme)) {
      errors.push(`[${deckName}] CARD_DATA["${id}"].theme est vide ou manquant`);
    }
    if (!nonEmptyString(entry.shadow)) {
      errors.push(`[${deckName}] CARD_DATA["${id}"].shadow est vide ou manquant`);
    }
  }
}

function validateSpreads(spreads, deckName, errors) {
  for (const [spreadType, cfg] of Object.entries(spreads)) {
    if (!nonEmptyString(cfg.intro)) {
      errors.push(`[${deckName}] SPREADS["${spreadType}"].intro est vide ou manquant`);
    }
    if (!Array.isArray(cfg.positions) || cfg.positions.length === 0) {
      errors.push(`[${deckName}] SPREADS["${spreadType}"].positions est vide ou manquant`);
      continue;
    }
    cfg.positions.forEach((pos, idx) => {
      if (!nonEmptyString(pos.name)) {
        errors.push(`[${deckName}] SPREADS["${spreadType}"].positions[${idx}].name est vide ou manquant`);
      }
      if (!nonEmptyString(pos.tpl)) {
        errors.push(`[${deckName}] SPREADS["${spreadType}"].positions[${idx}].tpl est vide ou manquant`);
      }
      if (typeof pos.shadow !== 'boolean') {
        errors.push(`[${deckName}] SPREADS["${spreadType}"].positions[${idx}].shadow doit être un booléen`);
      }
    });
  }
}

function validateCombo(list, deckName, fieldName, errors) {
  list.forEach((entry, idx) => {
    if (!Array.isArray(entry.ids) || entry.ids.length === 0) {
      errors.push(`[${deckName}] ${fieldName}[${idx}].ids est vide ou manquant`);
    }
    if (!nonEmptyString(entry.label)) {
      errors.push(`[${deckName}] ${fieldName}[${idx}].label est vide ou manquant`);
    }
    if (!nonEmptyString(entry.text)) {
      errors.push(`[${deckName}] ${fieldName}[${idx}].text est vide ou manquant`);
    }
  });
}

function validateFamilies(families, deckName, errors) {
  families.forEach((fam, idx) => {
    if (!Array.isArray(fam.ids) || fam.ids.length === 0) {
      errors.push(`[${deckName}] FAMILIES[${idx}].ids est vide ou manquant`);
    }
    if (!nonEmptyString(fam.desc)) {
      errors.push(`[${deckName}] FAMILIES[${idx}].desc est vide ou manquant`);
    }
  });
}

/* ── 3. Comptes attendus (constatés sur les données réelles avant l'étape 12,
   extraits par évaluation réelle des anciens fichiers *-interp.js via
   node:vm — voir le rapport de l'étape 12 pour la méthode). Toute variation
   fait échouer le build : soit une carte a disparu par erreur, soit c'est
   un changement voulu qui doit mettre à jour ce tableau EXPLICITEMENT. ──── */
const EXPECTED_COUNTS = {
  marseille: {
    file: 'src/data/tarot-marseille.json',
    cardData: 22,
    spreads: 4,
    positionsPerSpread: { 'trois-cartes': 3, 'croix': 5, 'ligne': 5, 'astrologique': 12 },
    pairs: 41,
    triads: 8,
    families: 3,
  },
  rws: {
    file: 'src/data/tarot-rws.json',
    cardData: 78,
    spreads: 4,
    positionsPerSpread: { 'croix-celtique': 10, 'fer-a-cheval': 7, 'relation': 5, 'spirituel': 3 },
    pairs: 5,
    triads: 2,
    families: 0, // pas de FAMILIES pour ce deck
  },
  thoth: {
    file: 'src/data/tarot-thoth.json',
    // 92 = 78 cartes littérales + 14 alias Pentacles 'P01'..'P14' dupliqués
    // depuis 'D01'..'D14' (Disques), désormais figés dans le JSON — voir la
    // note dans public/js/tarot-thoth-interp.js.
    cardData: 92,
    spreads: 4,
    positionsPerSpread: { 'arbre-de-vie': 10, 'etoile-de-david': 7, 'angle-mort': 4, 'spirituel': 4 },
    pairs: 4,
    triads: 1,
    families: 0, // pas de FAMILIES pour ce deck
  },
};

/* ── 4. Exécution ─────────────────────────────────────────────────────── */
const errors = [];

for (const [deckName, expected] of Object.entries(EXPECTED_COUNTS)) {
  const path = join(ROOT, expected.file);
  let text;
  try {
    text = readFileSync(path, 'utf8');
  } catch (e) {
    errors.push(`[${deckName}] impossible de lire ${expected.file} : ${e.message}`);
    continue;
  }

  // 4a. Pas de clé dupliquée, à toute profondeur.
  try {
    assertNoDuplicateKeys(text, deckName);
  } catch (e) {
    errors.push(e.message);
    continue; // JSON structurellement suspect : inutile de continuer sur ce fichier
  }

  // 4b. JSON valide et bien formé.
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    errors.push(`[${deckName}] JSON invalide dans ${expected.file} : ${e.message}`);
    continue;
  }

  const cardData = data.cardData || {};
  const spreads = data.spreads || {};
  const pairs = data.pairs || [];
  const triads = data.triads || [];
  const families = data.families || [];

  // 4c. Comptes exacts.
  const cardCount = Object.keys(cardData).length;
  if (cardCount !== expected.cardData) {
    errors.push(`[${deckName}] CARD_DATA compte ${cardCount} entrée(s), ${expected.cardData} attendue(s)`);
  }

  const spreadCount = Object.keys(spreads).length;
  if (spreadCount !== expected.spreads) {
    errors.push(`[${deckName}] SPREADS compte ${spreadCount} tirage(s), ${expected.spreads} attendu(s)`);
  }

  for (const [spreadType, expectedPositions] of Object.entries(expected.positionsPerSpread)) {
    const cfg = spreads[spreadType];
    if (!cfg) {
      errors.push(`[${deckName}] SPREADS["${spreadType}"] est manquant`);
      continue;
    }
    const actualPositions = (cfg.positions || []).length;
    if (actualPositions !== expectedPositions) {
      errors.push(`[${deckName}] SPREADS["${spreadType}"].positions compte ${actualPositions} position(s), ${expectedPositions} attendue(s)`);
    }
  }

  if (pairs.length !== expected.pairs) {
    errors.push(`[${deckName}] PAIRS compte ${pairs.length} entrée(s), ${expected.pairs} attendue(s)`);
  }
  if (triads.length !== expected.triads) {
    errors.push(`[${deckName}] TRIADS compte ${triads.length} entrée(s), ${expected.triads} attendue(s)`);
  }
  if (families.length !== expected.families) {
    errors.push(`[${deckName}] FAMILIES compte ${families.length} entrée(s), ${expected.families} attendue(s)`);
  }

  // 4d. Champs obligatoires non vides.
  validateCardData(cardData, deckName, errors);
  validateSpreads(spreads, deckName, errors);
  validateCombo(pairs, deckName, 'PAIRS', errors);
  validateCombo(triads, deckName, 'TRIADS', errors);
  validateFamilies(families, deckName, errors);
}

if (errors.length > 0) {
  console.error(`\n  ❌ verify-data.mjs : ${errors.length} erreur(s) détectée(s) dans les données de tirage tarot :\n`);
  for (const err of errors) {
    console.error(`     - ${err}`);
  }
  console.error('');
  process.exit(1);
} else {
  const decks = Object.keys(EXPECTED_COUNTS).length;
  console.log(`  ✅ verify-data.mjs : ${decks} fichiers de données tarot vérifiés (comptes exacts, aucune clé dupliquée, champs obligatoires non vides)`);
}
