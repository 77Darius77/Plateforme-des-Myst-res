/* ─────────────────────────────────────────────────────────────────────────
   tarot-engine-core.js — Moteur d'interprétation tarot mutualisé
   Fabrique commune aux jeux Marseille / Rider-Waite-Smith / Thoth.

   Usage (dans chaque fichier deck) :
     window.tarotXxxInterp = window.createTarotEngine({ ...config... });

   Le moteur possède la logique générique (getTheme, applyLens enrichi,
   détection de paires/triades/familles, échafaudage HTML de la lecture,
   lectures par plan). Chaque deck fournit UNIQUEMENT ses données
   (CARD_DATA, SPREADS, PAIRS, TRIADS, FAMILIES) et sa configuration de
   libellés / textes narratifs (labels, lens, synthesis).

   Chargement : ce script doit précéder le fichier deck-spécifique.
   ───────────────────────────────────────────────────────────────────────── */
window.createTarotEngine = function (config) {

  var CARD_DATA = config.cardData || {};
  var SPREADS   = config.spreads || {};
  var PAIRS     = config.pairs || [];
  var TRIADS    = config.triads || [];
  var FAMILIES  = config.families || null;

  var labels    = config.labels || {};
  var lens      = config.lens || {};
  var synthesis = config.synthesis || {};

  var planesGlobal   = config.planesGlobal;          // ex. 'tarotPlanes'
  var passSpreadType = !!config.passSpreadType;      // projectSpread(cards, plane[, spreadType])

  /* Fonctions de transformation optionnelles (identité par défaut). */
  function identity(x) { return x; }
  var suitTransform    = lens.suitTransform    || identity;
  var courtTransform   = lens.courtTransform   || identity;
  var elementTransform = lens.elementTransform || function (el) { return el.toLowerCase(); };
  var verbeObject      = lens.verbeObject      || 'ta situation';
  var suitRegister     = lens.suitRegister     || 'dans le registre du ';
  var majorSuffix      = (typeof lens.majorSuffix === 'string') ? lens.majorSuffix : ' avec la profondeur d\'un arcane majeur.';
  var warnMsg          = lens.warnMsg          || 'Erreur enrichissement tarot:';

  /* ── Utilitaires ────────────────────────────────────────────────────────── */

  function getTheme(card, useShadow) {
    var d = CARD_DATA[card.id];
    if (!d) return card.name;
    return useShadow ? d.shadow : d.theme;
  }

  function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function applyLens(pos, card) {
    var t = getTheme(card, !!pos.shadow);
    var text = pos.tpl.replace(/\{T\}/g, t).replace(/\{TC\}/g, cap(t));

    /* Enrichissement avec les modificateurs positionnels et de type */
    try {
      if (window.tarotPositions && window.tarotCardTypes) {
        var posMod = window.tarotPositions.getModifier(pos.name);
        var cardDesc = window.tarotCardTypes.describe(card.id);

        if (posMod && cardDesc) {
          /* Préfixe : intro positionnelle + type de carte */
          var prefix = '';
          if (posMod.intro) {
            prefix += posMod.intro + ' — ';
          }
          if (cardDesc.major) {
            prefix += 'l\'archétype du ' + card.name + ' ';
          } else if (cardDesc.suit && cardDesc.number) {
            var suitName = suitTransform(cardDesc.suit.name);
            var numName = courtTransform(cardDesc.number.name);
            prefix += 'le ' + numName + ' de ' + suitName + ' ';
          }

          /* Suffixe : verbe positionnel + élément */
          var suffix = '';
          if (posMod.verbe) {
            suffix += ' Cette carte ' + posMod.verbe + ' ' + verbeObject;
          }
          if (cardDesc.suit) {
            suffix += ' ' + suitRegister + elementTransform(cardDesc.suit.element) + '.';
          } else if (cardDesc.major) {
            suffix += majorSuffix;
          }

          if (prefix) text = cap(prefix) + ' : ' + text.charAt(0).toLowerCase() + text.slice(1);
          if (suffix) text += suffix;
        }
      }
    } catch (e) {
      /* En cas d'erreur, on garde le texte de base */
      console.warn(warnMsg, e);
    }

    return text;
  }

  function detectPairs(cards) {
    var ids = cards.map(function (c) { return c.id; });
    return PAIRS.filter(function (p) {
      return p.ids.every(function (id) { return ids.indexOf(id) !== -1; });
    }).slice(0, 4);
  }

  function detectTriads(cards) {
    var ids = cards.map(function (c) { return c.id; });
    return TRIADS.filter(function (t) {
      return t.ids.every(function (id) { return ids.indexOf(id) !== -1; });
    }).slice(0, 2);
  }

  function detectFamily(cards) {
    if (!FAMILIES) return null;
    var best = null, max = 0;
    FAMILIES.forEach(function (fam) {
      var n = cards.filter(function (c) { return fam.ids.indexOf(c.id) !== -1; }).length;
      if (n > max) { max = n; best = fam; }
    });
    return (best && max > Math.floor(cards.length / 3)) ? { desc: best.desc, count: max } : null;
  }

  /* API exposée aux fonctions narratives fournies par le deck. */
  var api = {
    getTheme: getTheme,
    cap: cap,
    detectFamily: detectFamily
  };

  /* ── Synthèse (assemblage générique, textes fournis par le deck) ──────────
     synthesis = {
       openings : { <spreadType>: function(cards, api) -> string },
       triadPhrase : function(triads) -> string,
       pairPhrase  : function(pairs)  -> string,
       closing     : string,
       useFamilies : bool
     }                                                                        */
  function buildSynthesis(cards, spreadType, pairs, triads) {
    var text = '';

    var openings = synthesis.openings || {};
    var opening = openings[spreadType];
    if (opening) { text = opening(cards, api); }

    if (synthesis.useFamilies) {
      var fam = detectFamily(cards);
      if (fam) { text += fam.desc + ' '; }
    }

    if (triads.length > 0 && synthesis.triadPhrase) {
      text += synthesis.triadPhrase(triads);
    } else if (pairs.length > 0 && synthesis.pairPhrase) {
      text += synthesis.pairPhrase(pairs);
    }

    text += (synthesis.closing || '');
    return text;
  }

  /* ── Générateur principal ────────────────────────────────────────────────── */

  function generateReading(spreadType, cards) {
    var cfg = SPREADS[spreadType];
    if (!cfg || !cards || !cards.length) return '';

    var pairs  = detectPairs(cards);
    var triads = detectTriads(cards);

    var html = '<div class="tr-section">'
      + '<div class="tr-header"><span class="tr-star">✦</span><h2 class="tr-title">' + labels.readingTitle + '</h2></div>'
      + '<p class="tr-intro">' + cfg.intro + '</p>'
      + '<div class="tr-divider"></div>';

    cards.forEach(function (card, i) {
      var pos = cfg.positions[i];
      if (!pos) return;
      html += '<div class="tr-entry">'
        + '<div class="tr-entry-head">'
        + '<span class="tr-pos">' + pos.name + '</span>'
        + '<span class="tr-card-nm">' + card.name + '</span>'
        + '</div>'
        + '<p class="tr-entry-text">' + applyLens(pos, card) + '</p>'
        + '</div>';
    });

    if (triads.length > 0) {
      html += '<div class="tr-divider"></div><h3 class="tr-sub">' + labels.triadsHeader + '</h3>';
      triads.forEach(function (t) {
        html += '<div class="tr-pair tr-triad">'
          + '<span class="tr-pair-lbl">' + t.label + '</span>'
          + '<p class="tr-pair-txt">' + t.text + '</p>'
          + '</div>';
      });
    }

    if (pairs.length > 0) {
      html += '<div class="tr-divider"></div><h3 class="tr-sub">' + labels.pairsHeader + '</h3>';
      pairs.forEach(function (p) {
        html += '<div class="tr-pair">'
          + '<span class="tr-pair-lbl">' + p.label + '</span>'
          + '<p class="tr-pair-txt">' + p.text + '</p>'
          + '</div>';
      });
    }

    html += '<div class="tr-divider"></div>'
      + '<h3 class="tr-sub">' + labels.synthesisHeader + '</h3>'
      + '<p class="tr-synth">' + buildSynthesis(cards, spreadType, pairs, triads) + '</p>';

    if (window.PlateformePartage) {
      var nomTirage = spreadType.split('-').map(cap).join(' ');
      var config = {
        type: 'tirage',
        titre: labels.readingTitle,
        sousTitre: nomTirage,
        cartes: cards.map(function (c) { return { nom: c.name, image: c.img }; })
      };
      html += window.PlateformePartage.construireBoutonsHTML(config);
    }

    html += '</div>';

    return html;
  }

  /* ── Générateur de lecture par plan ───────────────────────────────────────
     Utilise window[planesGlobal] (chargé séparément) pour projeter le tirage
     sur un plan : 'personnel' | 'professionnel' | 'relationnel'.               */
  function generatePlaneReading(spreadType, cards, plane) {
    var planes = window[planesGlobal];
    if (!planes) return '';
    var proj = passSpreadType
      ? planes.projectSpread(cards, plane, spreadType)
      : planes.projectSpread(cards, plane);
    if (!proj) return '';

    var cfg = SPREADS[spreadType];
    var positions = cfg ? cfg.positions : [];

    var html = '<div class="tr-plane-section" data-plane="' + plane + '">'
      + '<div class="tr-plane-header">'
      + '<span class="tr-plane-icon">' + (plane === 'personnel' ? '☾' : plane === 'professionnel' ? '☉' : '♡') + '</span>'
      + '<h3 class="tr-plane-title">Lecture sur le plan ' + proj.planeLabel + '</h3>'
      + '</div>'
      + '<p class="tr-plane-intro">' + proj.intro + '</p>'
      + '<div class="tr-plane-entries">';

    proj.entries.forEach(function (entry, i) {
      var posName = positions[i] ? positions[i].name : ('Carte ' + (i + 1));
      html += '<div class="tr-plane-entry">'
        + '<div class="tr-plane-entry-head">'
        + '<span class="tr-plane-pos">' + posName + '</span>'
        + '<span class="tr-plane-card">' + entry.cardName + '</span>'
        + (entry.kw ? '<span class="tr-plane-kw">' + entry.kw + '</span>' : '')
        + '</div>'
        + '<p class="tr-plane-text">' + entry.text + '</p>'
        + '</div>';
    });

    html += '</div>'
      + '<div class="tr-plane-synth">'
      + '<span class="tr-plane-synth-lbl">Synthèse</span>'
      + '<p>' + proj.synth + '</p>'
      + '</div>'
      + (proj.conseil ? '<div class="tr-plane-conseil">'
        + '<span class="tr-plane-conseil-lbl">Conseil</span>'
        + '<p>' + proj.conseil + '</p>'
        + '</div>' : '')
      + (proj.question ? '<div class="tr-plane-question">'
        + '<span class="tr-plane-question-lbl">Question à méditer</span>'
        + '<p>' + proj.question + '</p>'
        + '</div>' : '')
      + '</div>';

    return html;
  }

  /* Génère les 3 lectures par plan d'un coup (pour affichage en accordéon). */
  function generateAllPlaneReadings(spreadType, cards) {
    if (!window[planesGlobal]) return '';
    var planes = ['personnel', 'professionnel', 'relationnel'];
    var html = '<div class="tr-planes-wrapper">'
      + '<div class="tr-planes-tabs">'
      + '<button class="tr-plane-tab active" data-plane="personnel">☾ Personnel</button>'
      + '<button class="tr-plane-tab" data-plane="professionnel">☉ Professionnel</button>'
      + '<button class="tr-plane-tab" data-plane="relationnel">♡ Relationnel</button>'
      + '</div>'
      + '<div class="tr-planes-content">';
    planes.forEach(function (p, i) {
      html += '<div class="tr-plane-pane' + (i === 0 ? ' active' : '') + '" data-plane="' + p + '">'
        + generatePlaneReading(spreadType, cards, p)
        + '</div>';
    });
    html += '</div></div>';
    return html;
  }

  /* ── API publique ────────────────────────────────────────────────────────── */
  var exportsObj = {
    generateReading: generateReading,
    generatePlaneReading: generatePlaneReading,
    generateAllPlaneReadings: generateAllPlaneReadings
  };
  /* Exports supplémentaires éventuels fournis par le deck (ex. SPREADS). */
  if (config.extraExports) {
    for (var k in config.extraExports) {
      if (Object.prototype.hasOwnProperty.call(config.extraExports, k)) {
        exportsObj[k] = config.extraExports[k];
      }
    }
  }
  return exportsObj;
};
