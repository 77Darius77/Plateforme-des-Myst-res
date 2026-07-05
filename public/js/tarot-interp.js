/* Moteur d'interprétation des tirages — Tarot de Marseille v2 */
window.tarotInterp = (function () {

  /* ── Données par arcane (CARD_DATA, SPREADS, PAIRS, TRIADS, FAMILIES) ────
     Externalisées dans src/data/tarot-marseille.json (étape 12 du PRD) et
     injectées de façon SYNCHRONE dans la page par le composant
     <TarotDeckData deck="marseille" /> sous forme de
     <script type="application/json" id="tarot-marseille-data">. On les lit
     ici via JSON.parse(textContent) — jamais via fetch(), pour éviter toute
     course entre le chargement des données et le clic utilisateur sur
     "Étaler le jeu" / une carte (voir commentaire dans TarotDeckData.astro).
     theme  : registre lumineux/actif (positions neutres et favorables)
     shadow : registre d'ombre (positions d'opposition, Maison VIII/XII)    */
  var DATA = {};
  try {
    var DATA_EL = document.getElementById('tarot-marseille-data');
    if (!DATA_EL) throw new Error('élément #tarot-marseille-data introuvable dans la page');
    DATA = JSON.parse(DATA_EL.textContent);
  } catch (e) {
    console.error('tarot-interp.js : impossible de charger les données du tirage —', e);
  }

  var CARD_DATA = DATA.cardData || {};
  var SPREADS   = DATA.spreads  || {};
  var PAIRS     = DATA.pairs    || [];
  var TRIADS    = DATA.triads   || [];
  var FAMILIES  = DATA.families || [];

  /* ── Moteur commun ──────────────────────────────────────────────────────── */
  return window.createTarotEngine({
    cardData: CARD_DATA,
    spreads: SPREADS,
    pairs: PAIRS,
    triads: TRIADS,
    families: FAMILIES,
    planesGlobal: 'tarotPlanes',
    passSpreadType: false,
    labels: {
      readingTitle: 'Lecture de votre tirage',
      triadsHeader: 'Constellation de 3 arcanes',
      pairsHeader: 'Résonances notables',
      synthesisHeader: 'Synthèse'
    },
    synthesis: {
      useFamilies: true,
      openings: {
        'trois-cartes': function (cards, api) {
          var f = cards[0], l = cards[2], m = cards[1];
          return 'Ce tirage trace un arc de <strong>' + f.name + '</strong> (' + api.getTheme(f, false) + ') jusqu\'à <strong>' + l.name + '</strong> (' + api.getTheme(l, false) + '). '
               + 'La carte du présent, <strong>' + m.name + '</strong>, est le pivot qui révèle comment passer de l\'origine à la destination. ';
        },
        'croix': function (cards, api) {
          var pour = cards[0], contre = cards[1], synth = cards[4];
          return 'Entre le soutien de <strong>' + pour.name + '</strong> (' + api.getTheme(pour, false) + ') et l\'obstacle de <strong>' + contre.name + '</strong> (' + api.getTheme(contre, true) + '), l\'énergie maîtresse est <strong>' + synth.name + '</strong> : ' + api.getTheme(synth, false) + '. ';
        },
        'ligne': function (cards, api) {
          var r = cards[0], c = cards[4];
          return 'La ligne narrative part des racines de <strong>' + r.name + '</strong> (' + api.getTheme(r, false) + ') et s\'achemine vers <strong>' + c.name + '</strong> (' + api.getTheme(c, false) + '). ';
        },
        'astrologique': function (cards, api) {
          return 'Ce tirage à douze maisons offre un panorama complet de vos énergies actuelles. ';
        }
      },
      triadPhrase: function (triads) {
        return 'La constellation <strong>' + triads[0].label + '</strong> est particulièrement significative : ' + triads[0].text + ' ';
      },
      pairPhrase: function (pairs) {
        var labels = pairs.slice(0, 2).map(function (p) { return p.label; }).join(' et ');
        return (pairs.length === 1 ? 'La résonance ' : 'Les résonances ') + labels + ' amplifient ce message. ';
      },
      closing: 'Ce tirage n\'est pas un verdict — c\'est une carte du territoire intérieur tel qu\'il se présente aujourd\'hui. Le libre arbitre reste votre boussole.'
    }
  });
})();
