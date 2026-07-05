/* Moteur d'interprétation pour le Tarot Rider-Waite-Smith — Tarologie v1 */
window.tarotRwsInterp = (function () {

  /* ── Données (CARD_DATA, SPREADS, PAIRS, TRIADS) ─────────────────────────
     Externalisées dans src/data/tarot-rws.json (étape 12 du PRD), injectées
     de façon SYNCHRONE par <TarotDeckData deck="rws" /> sous forme de
     <script type="application/json" id="tarot-rws-data">, lues ici via
     JSON.parse(textContent) — jamais via fetch() (voir tarot-interp.js et
     TarotDeckData.astro pour la justification anti-course). */
  var DATA = {};
  try {
    var DATA_EL = document.getElementById('tarot-rws-data');
    if (!DATA_EL) throw new Error('élément #tarot-rws-data introuvable dans la page');
    DATA = JSON.parse(DATA_EL.textContent);
  } catch (e) {
    console.error('tarot-rws-interp.js : impossible de charger les données du tirage —', e);
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
    planesGlobal: 'tarotRwsPlanes',
    passSpreadType: true,
    labels: {
      readingTitle: 'Lecture symbolique Rider-Waite-Smith',
      triadsHeader: 'Triades Sacrées',
      pairsHeader: 'Harmonies de cartes',
      synthesisHeader: 'Synthèse du Tirage'
    },
    synthesis: {
      useFamilies: false,
      openings: {
        'croix-celtique': function (cards, api) {
          var sit = cards[0], outcome = cards[9];
          return 'Votre situation présente animée par <strong>' + sit.name + '</strong> trouve son dénouement logique et constructif à travers <strong>' + outcome.name + '</strong> (' + api.getTheme(outcome, false) + '). ';
        },
        'fer-a-cheval': function (cards, api) {
          var conseil = cards[5], issue = cards[6];
          return 'Pour avancer au mieux face à ce défi, le tirage conseille d\'incarner l\'énergie de <strong>' + conseil.name + '</strong> afin d\'ouvrir la voie vers <strong>' + issue.name + '</strong>. ';
        },
        'relation': function (cards, api) {
          var dynamic = cards[2], fut = cards[4];
          return 'La relation repose actuellement sur l\'échange de <strong>' + dynamic.name + '</strong>, avec un très bel horizon de croissance vers <strong>' + fut.name + '</strong>. ';
        },
        'spirituel': function (cards, api) {
          var mental = cards[1], spirit = cards[2];
          return 'Votre mental orienté vers <strong>' + mental.name + '</strong> doit s\'aligner avec les appels spirituels de <strong>' + spirit.name + '</strong>. ';
        }
      },
      triadPhrase: function (triads) {
        return 'La présence de la triade <strong>' + triads[0].label + '</strong> signale un alignement de destin exceptionnel : ' + triads[0].text + ' ';
      },
      pairPhrase: function (pairs) {
        return 'La résonance de <strong>' + pairs[0].label + '</strong> enrichit le tirage : ' + pairs[0].text + ' ';
      },
      closing: 'Les cartes du Rider-Waite-Smith révèlent vos paysages mentaux et spirituels pour éclairer votre libre arbitre.'
    }
  });
})();
