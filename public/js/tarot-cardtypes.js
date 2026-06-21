/* ─────────────────────────────────────────────────────────────────────────
   tarot-cardtypes.js — Grille de lecture par type de carte
   Détermine le type (majeur/mineur), la suit (W/C/S/P), le numéro (1-14)
   et fournit des modificateurs de lecture adaptés.
   ───────────────────────────────────────────────────────────────────────── */
window.tarotCardTypes = (function () {

  /* ── Détection du type de carte ──────────────────────────────────────── */
  function getCardType(cardId) {
    if (!cardId) return { type: 'major', suit: null, num: null, isMajor: true, isCourt: false };

    /* Majeurs : 00 à 21 */
    var num = parseInt(cardId, 10);
    if (!isNaN(num) && num >= 0 && num <= 21) {
      return { type: 'major', suit: null, num: num, isMajor: true, isCourt: false };
    }

    /* Mineurs : W/C/S/P + 01-14 */
    var suit = cardId.charAt(0);
    var cardNum = parseInt(cardId.slice(1), 10);
    if ('WCSP'.indexOf(suit) !== -1 && cardNum >= 1 && cardNum <= 14) {
      var isCourt = cardNum >= 11;
      return {
        type: 'minor',
        suit: suit,
        num: cardNum,
        isMajor: false,
        isCourt: isCourt,
        isAce: cardNum === 1,
        isPip: cardNum >= 2 && cardNum <= 10
      };
    }

    return { type: 'major', suit: null, num: null, isMajor: true, isCourt: false };
  }

  /* ── Modificateurs par suit ──────────────────────────────────────────── */
  var SUIT_MODIFIERS = {
    W: {
      name: 'Bâtons',
      element: 'Feu',
      domaine: 'Action',
      verbe: 'enflamme',
      registre: 'énergie',
      intro: 'L\'énergie de feu de cette carte',
      conseil: 'Canalise cet élan sans le laisser se consumer',
      vocabulaire: ['élan', 'initiative', 'passion', 'créativité', 'feu intérieur', 'volonté', 'audace']
    },
    C: {
      name: 'Coupes',
      element: 'Eau',
      domaine: 'Émotion',
      verbe: 'touche',
      registre: 'cœur',
      intro: 'L\'énergie d\'eau de cette carte',
      conseil: 'Accueille ce qui monte du cœur sans le juger',
      vocabulaire: ['émotion', 'lien', 'amour', 'intuition', 'compassion', 'réceptivité', 'flux']
    },
    S: {
      name: 'Épées',
      element: 'Air',
      domaine: 'Mental',
      verbe: 'clarifie',
      registre: 'esprit',
      intro: 'L\'énergie d\'air de cette carte',
      conseil: 'Tranche avec lucidité, sans blesser inutilement',
      vocabulaire: ['clarté', 'vérité', 'décision', 'conflit', 'pensée', 'communication', 'tranchant']
    },
    P: {
      name: 'Pentacles',
      element: 'Terre',
      domaine: 'Matière',
      verbe: 'ancre',
      registre: 'corps',
      intro: 'L\'énergie de terre de cette carte',
      conseil: 'Incruste cette leçon dans le concret, pas seulement dans la tête',
      vocabulaire: ['ancrage', 'réalisation', 'patience', 'corps', 'ressources', 'concret', 'durée']
    }
  };

  /* ── Modificateurs par numéro ────────────────────────────────────────── */
  var NUMBER_MODIFIERS = {
    1:  { name: 'As',         essence: 'graine',         verbe: 'initie',     intro: 'Le potentiel pur qui demande à être cultivé' },
    2:  { name: 'Deux',       essence: 'dualité',        verbe: 'équilibre',  intro: 'Deux forces qui cherchent l\'harmonie' },
    3:  { name: 'Trois',      essence: 'expansion',      verbe: 'crée',       intro: 'Trois forces qui s\'unissent et engendrent' },
    4:  { name: 'Quatre',     essence: 'fondation',      verbe: 'stabilise',  intro: 'Quatre forces qui posent les bases' },
    5:  { name: 'Cinq',       essence: 'tension',        verbe: 'confronte',  intro: 'Cinq forces qui se heurtent et transforment' },
    6:  { name: 'Six',        essence: 'harmonie',       verbe: 'apaise',     intro: 'Six forces qui trouvent leur équilibre' },
    7:  { name: 'Sept',       essence: 'introspection',  verbe: 'interroge',  intro: 'Sept forces qui invitent au recul' },
    8:  { name: 'Huit',       essence: 'mouvement',      verbe: 'avance',     intro: 'Huit forces qui se mettent en marche' },
    9:  { name: 'Neuf',       essence: 'plénitude',      verbe: 'accomplit',  intro: 'Neuf forces proches de l\'accomplissement' },
    10: { name: 'Dix',        essence: 'cycle complet',  verbe: 'boucle',     intro: 'Dix forces qui ferment un cycle' },
    11: { name: 'Valet',      essence: 'curiosité',      verbe: 'apporte',    intro: 'Un message jeune et curieux à recevoir' },
    12: { name: 'Cavalier',   essence: 'mouvement rapide', verbe: 'fonce',    intro: 'Une action rapide, parfois impulsive' },
    13: { name: 'Reine',      essence: 'maturation',     verbe: 'nourrit',    intro: 'Une présence nourricière et intuitive' },
    14: { name: 'Roi',        essence: 'autorité',       verbe: 'gouverne',   intro: 'Une autorité accomplie et sage' }
  };

  /* ── Modificateur pour les Majeurs ───────────────────────────────────── */
  var MAJOR_MODIFIER = {
    name: 'Arcane Majeur',
    essence: 'archétype',
    verbe: 'marque',
    intro: 'L\'archétype de cette carte',
    conseil: 'Honore la leçon karmique que cet arcane porte',
    vocabulaire: ['destin', 'leçon de vie', 'archétype', 'tournant', 'transformation', 'marqueur']
  };

  /* ── API publique ─────────────────────────────────────────────────────── */

  function getSuitModifier(cardId) {
    var info = getCardType(cardId);
    if (info.suit && SUIT_MODIFIERS[info.suit]) {
      return SUIT_MODIFIERS[info.suit];
    }
    return null;
  }

  function getNumberModifier(cardId) {
    var info = getCardType(cardId);
    if (info.num && NUMBER_MODIFIERS[info.num]) {
      return NUMBER_MODIFIERS[info.num];
    }
    return null;
  }

  function getMajorModifier() {
    return MAJOR_MODIFIER;
  }

  /* Retourne un objet complet décrivant la carte */
  function describe(cardId) {
    var info = getCardType(cardId);
    var result = {
      info: info,
      suit: null,
      number: null,
      major: null
    };

    if (info.isMajor) {
      result.major = MAJOR_MODIFIER;
    } else {
      result.suit = SUIT_MODIFIERS[info.suit];
      result.number = NUMBER_MODIFIERS[info.num];
    }

    return result;
  }

  /* Génère un préfixe contextuel pour l'interprétation */
  function getReadingPrefix(cardId) {
    var info = getCardType(cardId);
    if (info.isMajor) {
      return 'L\'archétype de ';
    }
    var suit = SUIT_MODIFIERS[info.suit];
    var num = NUMBER_MODIFIERS[info.num];
    if (suit && num) {
      return 'Le ' + num.name + ' de ' + suit.name + ' — ';
    }
    return '';
  }

  /* Génère un suffixe contextuel pour l'interprétation */
  function getReadingSuffix(cardId) {
    var info = getCardType(cardId);
    if (info.isMajor) {
      return ' — marque ce moment d\'une empreinte karmique profonde.';
    }
    var suit = SUIT_MODIFIERS[info.suit];
    if (suit) {
      return ' — ' + suit.verbe + ' cette dimension dans le registre du ' + suit.element.toLowerCase() + '.';
    }
    return '';
  }

  return {
    getCardType: getCardType,
    getSuitModifier: getSuitModifier,
    getNumberModifier: getNumberModifier,
    getMajorModifier: getMajorModifier,
    describe: describe,
    getReadingPrefix: getReadingPrefix,
    getReadingSuffix: getReadingSuffix,
    SUIT_MODIFIERS: SUIT_MODIFIERS,
    NUMBER_MODIFIERS: NUMBER_MODIFIERS,
    MAJOR_MODIFIER: MAJOR_MODIFIER
  };
})();
