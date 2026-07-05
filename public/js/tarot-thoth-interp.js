/* ─────────────────────────────────────────────────────────────────────────
   tarot-thoth-interp.js — Moteur d'interprétation pour le Tarot de Thoth
   Tradition : Thoth Tarot (Aleister Crowley, Frieda Harris)
   ───────────────────────────────────────────────────────────────────────── */
window.tarotThothInterp = (function () {

  /* ── Données (CARD_DATA, SPREADS, PAIRS, TRIADS) ─────────────────────────
     Externalisées dans src/data/tarot-thoth.json (étape 12 du PRD), injectées
     de façon SYNCHRONE par <TarotDeckData deck="thoth" /> sous forme de
     <script type="application/json" id="tarot-thoth-data">, lues ici via
     JSON.parse(textContent) — jamais via fetch() (voir tarot-interp.js et
     TarotDeckData.astro pour la justification anti-course).

     Note : CARD_DATA inclut désormais directement les 14 clés 'P01'..'P14'
     (Pentacles) en plus des 14 clés 'D01'..'D14' (Disques) — valeurs
     identiques par carte. Avant cette étape, seules les clés 'D' étaient
     écrites en dur et une boucle dupliquait 'D' → 'P' à l'exécution
     ("au cas où" un appelant utiliserait le préfixe Pentacles). Cette
     duplication est maintenant un simple choix de données figé dans le
     JSON, ce qui donne un compte de 92 entrées pour Thoth contre 78 pour
     Rider-Waite-Smith (qui n'a que 'P', jamais 'D') — un écart volontaire,
     pas une anomalie ; voir scripts/verify-data.mjs (EXPECTED_COUNTS). */
  var DATA = {};
  try {
    var DATA_EL = document.getElementById('tarot-thoth-data');
    if (!DATA_EL) throw new Error('élément #tarot-thoth-data introuvable dans la page');
    DATA = JSON.parse(DATA_EL.textContent);
  } catch (e) {
    console.error('tarot-thoth-interp.js : impossible de charger les données du tirage —', e);
  }

  var CARD_DATA = DATA.cardData || {};
  var SPREADS   = DATA.spreads  || {};
  var PAIRS     = DATA.pairs    || [];
  var TRIADS    = DATA.triads   || [];

  /* ── Moteur commun ──────────────────────────────────────────────────────── */
  return window.createTarotEngine({
    cardData: CARD_DATA,
    spreads: SPREADS,
    pairs: PAIRS,
    triads: TRIADS,
    planesGlobal: 'tarotThothPlanes',
    passSpreadType: true,
    extraExports: { SPREADS: SPREADS },
    labels: {
      readingTitle: 'Lecture ésotérique Tarot de Thoth',
      triadsHeader: 'Triades Sacrées',
      pairsHeader: 'Harmonies Alchimiques',
      synthesisHeader: 'Synthèse Alchimique'
    },
    lens: {
      suitTransform: function (name) { return name === 'Pentacles' ? 'Disques' : name; },
      courtTransform: function (name) {
        if (name === 'Valet') return 'Princesse';
        if (name === 'Cavalier') return 'Prince';
        if (name === 'Roi') return 'Chevalier';
        return name;
      },
      verbeObject: 'la dynamique',
      suitRegister: 'dans le domaine du ',
      elementTransform: function (el) { return el === 'Terre' ? 'terre philosophique' : el.toLowerCase(); },
      majorSuffix: ' sur le plan du destin spirituel.',
      warnMsg: 'Erreur enrichissement Thoth:'
    },
    synthesis: {
      useFamilies: false,
      openings: {
        'arbre-de-vie': function (cards, api) {
          var kether = cards[0], malkuth = cards[9];
          return 'Le flux de votre manifestation spirituelle, initié à la Couronne par <strong>' + kether.name + '</strong>, trouve son incarnation finale dans le Royaume terrestre grâce à <strong>' + malkuth.name + '</strong>. ';
        },
        'etoile-de-david': function (cards, api) {
          var sun = cards[0], saturn = cards[6];
          return 'Votre identité consciente (Soleil) guidée par <strong>' + sun.name + '</strong> s\'harmonise avec les structures et limitations temporelles (Saturne) imposées par <strong>' + saturn.name + '</strong>. ';
        },
        'angle-mort': function (cards, api) {
          var light = cards[0], blind = cards[1];
          return 'Bien que vous affichiez au grand jour l\'énergie de <strong>' + light.name + '</strong>, votre entourage perçoit chez vous l\'influence cachée de <strong>' + blind.name + '</strong> (votre angle mort actuel). ';
        },
        'spirituel': function (cards, api) {
          var fire = cards[0], earth = cards[3];
          return 'La volonté ardente de vos projets (Feu) portée par <strong>' + fire.name + '</strong> doit s\'ancrer concrètement dans la matière (Terre) représentée par <strong>' + earth.name + '</strong>. ';
        }
      },
      triadPhrase: function (triads) {
        return 'La présence de la triade initiatique <strong>' + triads[0].label + '</strong> signale un alignement de destin exceptionnel : ' + triads[0].text + ' ';
      },
      pairPhrase: function (pairs) {
        return 'La résonance sacrée de la paire <strong>' + pairs[0].label + '</strong> enrichit votre lecture : ' + pairs[0].text + ' ';
      },
      closing: 'Le Tarot de Thoth d\'Aleister Crowley vous invite à regarder au-delà des apparences pour transmuter votre plomb intérieur en or philosophique.'
    }
  });
})();
