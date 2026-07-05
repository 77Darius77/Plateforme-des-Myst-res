/* Moteur d'interprétation des tirages — Petit Lenormand v2 */
window.tarotLenormandInterp = (function () {

  var HOUSE_MEANINGS = [
    "Maison 1 (Cavalier) : Nouvelles, arrivées, messagers, départs, action imminente.",
    "Maison 2 (Trèfle) : Petite chance, joies éphémères, opportunités soudaines.",
    "Maison 3 (Vaisseau) : Voyages, éloignement, commerce, désir d'évasion.",
    "Maison 4 (Maison) : Foyer, famille, sécurité, stabilité résidentielle.",
    "Maison 5 (Arbre) : Santé, croissance lente, spiritualité, généalogie.",
    "Maison 6 (Nuages) : Doutes, confusion passagère, climat mental instable.",
    "Maison 7 (Serpent) : Complications, rivalités, détours, astuce stratégique.",
    "Maison 8 (Cercueil) : Fins nécessaires, transformations radicales, deuil.",
    "Maison 9 (Bouquet) : Joie, cadeaux, invitations, reconnaissance esthétique.",
    "Maison 10 (Faux) : Ruptures abruptes, décisions soudaines, récolte directe.",
    "Maison 11 (Fouet) : Conflits verbaux, stress permanent, schémas répétitifs.",
    "Maison 12 (Oiseaux) : Discussions orales, bavardages, excitation mentale.",
    "Maison 13 (Enfant) : Nouveaux départs, innocence, petits projets naissants.",
    "Maison 14 (Renard) : Travail quotidien, astuce professionnelle, méfiance nécessaire.",
    "Maison 15 (Ours) : Force protectrice, pouvoir financier, autorité bienveillante.",
    "Maison 16 (Étoiles) : Espoirs, clarté d'esprit, guidance spirituelle, souhaits.",
    "Maison 17 (Cigogne) : Changements favorables, naissance physique ou morale.",
    "Maison 18 (Chien) : Amitié fidèle, loyauté mutuelle, confiance inaltérable.",
    "Maison 19 (Tour) : Isolement, recul, institutions administratives et légales.",
    "Maison 20 (Jardin) : Vie sociale active, réseau, popularité publique.",
    "Maison 21 (Montagne) : Obstacles majeurs, blocages lourds, persévérance.",
    "Maison 22 (Chemin) : Décisions de parcours, choix multiples, alternatives.",
    "Maison 23 (Souris) : Pertes d'énergie ou d'argent, usure, stress permanent.",
    "Maison 24 (Cœur) : Amour sincère, affection chaleureuse, passions affectives.",
    "Maison 25 (Anneau) : Engagements officiels, contrats signés, alliances durables.",
    "Maison 26 (Livre) : Secrets bien gardés, études intellectuelles, mystères.",
    "Maison 27 (Lettre) : Écrits officiels, courriers administratifs, messages écrits.",
    "Maison 28 (Homme) : Énergie masculine active, consultant ou partenaire principal.",
    "Maison 29 (Femme) : Énergie féminine réceptive, consultante ou partenaire principal.",
    "Maison 30 (Lys) : Harmonie, pureté morale, maturité paisible, sexualité sereine.",
    "Maison 31 (Soleil) : Succès éclatant, pleine vitalité, victoire sur les ombres.",
    "Maison 32 (Lune) : Intuition riche, rêves, honneurs publics, émotions profondes.",
    "Maison 33 (Clé) : Solutions trouvées, déblocages du destin, réussite assurée.",
    "Maison 34 (Poissons) : Argent en circulation, commerce, abondance matérielle.",
    "Maison 35 (Ancre) : Ancrage indéfectible, sécurité à long terme, port d'attache.",
    "Maison 36 (Croix) : Fardeau inéluctable, épreuves karmiques, sacrifice spirituel."
  ];

  var HOUSE_NAMES = [
    "Cavalier","Trèfle","Vaisseau","Maison","Arbre","Nuages","Serpent","Cercueil",
    "Bouquet","Faux","Fouet","Oiseaux","Enfant","Renard","Ours","Étoiles",
    "Cigogne","Chien","Tour","Jardin","Montagne","Chemin","Souris","Cœur",
    "Anneau","Livre","Lettre","Homme","Femme","Lys","Soleil","Lune",
    "Clé","Poissons","Ancre","Croix"
  ];

  // ─── Helpers ───────────────────────────────────────────────────

  function cap(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function findCardById(cards, id) {
    for (var i = 0; i < cards.length; i++) {
      if (cards[i] && cards[i].id === id) return cards[i];
    }
    return null;
  }

  function findCardIndexById(cards, id) {
    for (var i = 0; i < cards.length; i++) {
      if (cards[i] && cards[i].id === id) return i;
    }
    return -1;
  }

  function countPolarity(cards) {
    var pos = 0, neg = 0, neu = 0;
    cards.forEach(function(c) {
      if (!c) return;
      if (c.polarity === 'positive') pos++;
      else if (c.polarity === 'négative') neg++;
      else neu++;
    });
    return { positive: pos, negative: neg, neutral: neu };
  }

  function getHouseMeaning(posIndex) {
    var i = posIndex;
    if (i < 0 || i >= 36) return null;
    return {
      cardId: String(i + 1).padStart ? String(i + 1).padStart(2, '0') : (i < 9 ? '0' + (i + 1) : '' + (i + 1)),
      name: HOUSE_NAMES[i],
      meaning: HOUSE_MEANINGS[i]
    };
  }

  function getSurrounding(cards, centerIdx, gridCols, gridRows) {
    var row = Math.floor(centerIdx / gridCols);
    var col = centerIdx % gridCols;
    var results = [];
    for (var r = Math.max(0, row - 1); r <= Math.min(gridRows - 1, row + 1); r++) {
      for (var c = Math.max(0, col - 1); c <= Math.min(gridCols - 1, col + 1); c++) {
        var idx = r * gridCols + c;
        if (idx === centerIdx) continue;
        if (cards[idx]) {
          results.push({
            index: idx,
            row: r,
            col: c,
            card: cards[idx],
            house: getHouseMeaning(idx)
          });
        }
      }
    }
    return results;
  }

  function chainRead(cards, context) {
    if (!cards || cards.length < 2) return '';
    var a = cards[0], b = cards[1], c = cards.length >= 3 ? cards[2] : null;

    function findPairing(src, target) {
      if (!src || !target || !src.pairings) return null;
      for (var i = 0; i < src.pairings.length; i++) {
        if (src.pairings[i].with === target.id) return src.pairings[i].meaning;
      }
      return null;
    }

    var abP = findPairing(a, b);
    var bcP = c ? findPairing(b, c) : null;

    var parts = [];
    parts.push(cap(a.name) + ' pose la première pierre');

    if (abP) {
      parts.push(' : ' + abP.charAt(0).toLowerCase() + abP.slice(1));
    } else {
      parts.push(', avec son ' + (a.keywords ? a.keywords[0] : 'essence') + '.');
    }

    parts.push(' ' + cap(b.name) + ' transforme le paysage');

    if (c && bcP) {
      parts.push(' : ' + bcP.charAt(0).toLowerCase() + bcP.slice(1));
    } else if (c) {
      parts.push(' en apportant ' + (b.keywords ? b.keywords[0] : 'sa force') + ', préparant la venue de ' + c.name + '.');
    } else {
      parts.push(' en ancrant définitivement ce message.');
    }

    if (c) {
      parts.push(' Enfin, ' + c.name + ' accomplit le cycle');
      parts.push(' : ' + (c.synthesis || c.meaning || '').split('.')[0].toLowerCase() + '.');
    }

    return parts.join('');
  }

  function chainRead4(cards, context) {
    if (!cards || cards.length < 4) return chainRead(cards, context);

    function findPairing(src, target) {
      if (!src || !target || !src.pairings) return null;
      for (var i = 0; i < src.pairings.length; i++) {
        if (src.pairings[i].with === target.id) return src.pairings[i].meaning;
      }
      return null;
    }

    var a = cards[0], b = cards[1], c = cards[2], d = cards[3];
    var abP = findPairing(a, b);
    var bcP = findPairing(b, c);
    var cdP = findPairing(c, d);

    var parts = [];
    parts.push(cap(a.name) + ' initie la séquence');
    parts.push(abP ? ' : ' + abP.charAt(0).toLowerCase() + abP.slice(1) : ' en posant les fondations.');
    parts.push(' ' + cap(b.name) + ' prend le relais');
    parts.push(bcP ? ' : ' + bcP.charAt(0).toLowerCase() + bcP.slice(1) : ', amplifiant le mouvement.');
    parts.push(' ' + cap(c.name) + ' cristallise la dynamique');
    parts.push(cdP ? ' : ' + cdP.charAt(0).toLowerCase() + cdP.slice(1) : ', consolidant le chemin.');
    parts.push(' Finalement, ' + d.name + ' délivre l\'aboutissement : ' + (d.synthesis || d.meaning || '').split('.')[0].toLowerCase() + '.');
    return parts.join('');
  }

  function polarityColor(polarity) {
    if (polarity === 'positive') return 'var(--emerald)';
    if (polarity === 'négative') return 'var(--rose)';
    return 'var(--text-muted)';
  }

  function polarityLabel(polarity) {
    if (polarity === 'positive') return 'Favorable';
    if (polarity === 'négative') return 'Défi';
    return 'Neutre';
  }

  function keywordsHTML(keywords) {
    if (!keywords || !keywords.length) return '';
    return keywords.map(function(k) { return '<span style="display:inline-block;background:rgba(212,175,55,0.1);color:var(--gold);padding:0.15rem 0.5rem;border-radius:12px;margin:0.15rem;font-size:0.78rem;">' + esc(k) + '</span>'; }).join(' ');
  }

  function sectionHeader(title) {
    return '<div class="tr-header"><span class="tr-star">✦</span><h2 class="tr-title">' + title + '</h2></div>';
  }

  function subHeader(title) {
    return '<h3 class="tr-sub">' + title + '</h3>';
  }

  function divider() {
    return '<div class="tr-divider"></div>';
  }

  // ─── Quotidien ──────────────────────────────────────────────────

  function generateQuotidien(card) {
    var toneMap = {
      'positive': 'Énergie lumineuse et constructive — cette carte vous invite à avancer avec confiance, le vent est favorable.',
      'négative': 'Énergie de transformation et de vigilance — chaque défi que cette carte signale recèle une opportunité de croissance profonde.',
      'neutre': 'Énergie d\'observation et d\'équilibre — prenez le temps de peser chaque option avant d\'agir.'
    };

    var html = '';
    html += '<div class="tr-section">';
    html += sectionHeader('Tirage Quotidien &mdash; Votre Clé du Jour');
    html += '<p class="tr-intro">Une seule carte pour éclairer votre journée, définir votre intention et recevoir un message direct du destin.</p>';
    html += divider();

    // Carte nom + keywords
    html += '<div class="tr-entry">';
    html += '<div class="tr-entry-head">';
    html += '<span class="tr-card-nm" style="font-size:1.3rem;color:var(--gold);">' + esc(card.symbol || '') + ' ' + esc(card.name) + '</span>';
    html += '</div>';
    html += '<div style="margin-top:0.3rem;">' + keywordsHTML(card.keywords) + '</div>';
    html += '</div>';

    // Sens général
    html += '<div class="tr-entry">';
    html += '<div class="tr-entry-head"><span class="tr-pos">Sens Général</span></div>';
    html += '<p class="tr-entry-text">' + esc(card.meaning) + '</p>';
    html += '</div>';

    // Conseil
    html += '<div class="tr-entry">';
    html += '<div class="tr-entry-head"><span class="tr-pos">Conseil du Jour</span></div>';
    html += '<p class="tr-entry-text">' + esc(card.advice) + '</p>';
    html += '</div>';

    // Question
    html += '<div class="tr-entry">';
    html += '<div class="tr-entry-head"><span class="tr-pos">Question à Méditer</span></div>';
    html += '<p class="tr-entry-text" style="font-style:italic;">' + esc(card.question) + '</p>';
    html += '</div>';

    // Ombre
    html += '<div class="tr-entry">';
    html += '<div class="tr-entry-head"><span class="tr-pos">Face d\'Ombre</span></div>';
    html += '<p class="tr-entry-text">' + esc(card.shadow) + '</p>';
    html += '</div>';

    // Tonalité énergétique
    html += divider();
    html += subHeader('Tonalité Énergétique');
    var tone = toneMap[card.polarity] || toneMap['neutre'];
    html += '<p class="tr-synth" style="color:' + polarityColor(card.polarity) + ';font-weight:500;">' + esc(tone) + '</p>';

    html += '</div>';
    return html;
  }

  // ─── Trois Cartes ───────────────────────────────────────────────

  function generateTroisCartes(cards) {
    var positionLabels = ['Le Passé', 'Le Présent', 'Le Futur'];
    var posContexts = ['ce qui a posé les bases', 'ce qui agit maintenant', 'ce qui se dessine devant vous'];

    var html = '';
    html += '<div class="tr-section">';
    html += sectionHeader('Tirage en Trois Cartes');
    html += '<p class="tr-intro">Trois cartes formant une phrase symbolique : le passé comme origine, le présent comme action en cours, et le futur comme dénouement. Ensemble, elles tracent la courbe de votre situation.</p>';
    html += divider();

    // La Phrase du Destin
    html += subHeader('La Phrase du Destin');
    html += '<div class="tr-pair">';
    html += '<p class="tr-pair-txt" style="font-size:1.05rem;line-height:1.7;font-weight:400;">' + esc(chainRead(cards, 'destin')) + '</p>';
    html += '</div>';
    html += divider();

    // 3 entrées détaillées
    for (var i = 0; i < 3; i++) {
      var c = cards[i];
      html += '<div class="tr-entry">';
      html += '<div class="tr-entry-head">';
      html += '<span class="tr-pos">' + esc(positionLabels[i]) + '</span>';
      html += '<span class="tr-card-nm">' + esc(c.symbol || '') + ' ' + esc(c.name) + '</span>';
      html += '</div>';
      html += '<p class="tr-entry-text">Dans <strong>' + esc(positionLabels[i]).toLowerCase() + '</strong>, ' + esc(c.name) + ' révèle ' + esc(posContexts[i]) + ' : ' + esc(c.meaning) + '</p>';
      html += '<p class="tr-entry-text" style="color:var(--gold);font-size:0.85rem;margin-top:-0.3rem;">Conseil : ' + esc(c.advice) + '</p>';
      html += '</div>';
    }

    // Conseil synthétisé
    html += divider();
    html += subHeader('Conseil Synthétisé');
    var adviceCards = cards.filter(function(c) { return c.advice; });
    var selAdvice = adviceCards.length >= 2 ? adviceCards[1] : (adviceCards[0] || cards[0]);
    html += '<p class="tr-synth">' + esc(selAdvice.advice) + '</p>';

    // Meilleure question
    html += divider();
    html += subHeader('La Meilleure Question à Vous Poser');
    var lastCard = cards[2];
    html += '<p class="tr-synth" style="font-style:italic;">' + esc(lastCard.question) + '</p>';

    html += '</div>';
    return html;
  }

  // ─── Carré de Neuf ──────────────────────────────────────────────

  function generateCarreDeNeuf(cards) {
    var html = '';
    html += '<div class="tr-section">';
    html += sectionHeader('Carré de Neuf &mdash; Lecture Approfondie');
    html += '<p class="tr-intro">Une grille de 3×3 cartes offrant une lecture complète : les colonnes représentent Passé, Présent et Futur, tandis que les lignes révèlent votre Conscient, votre Réel et votre Inconscient.</p>';
    html += divider();

    // ── Vue d'Ensemble ──
    html += subHeader('Vue d\'Ensemble');
    var pol = countPolarity(cards);
    var domPolarity = pol.positive >= pol.negative ? (pol.positive >= pol.neutral ? 'positive' : 'neutre') : (pol.negative >= pol.neutral ? 'négative' : 'neutre');
    html += '<p class="tr-entry-text">Ce carré de neuf compte <strong style="color:' + polarityColor('positive') + ';">' + pol.positive + ' cartes favorables</strong>, <strong style="color:' + polarityColor('négative') + ';">' + pol.negative + ' cartes de défi</strong> et <strong style="color:' + polarityColor('neutre') + ';">' + pol.neutral + ' cartes neutres</strong>. ';
    if (domPolarity === 'positive') {
      html += 'La dominante est résolument constructive : les forces d\'expansion et de réalisation l\'emportent. Votre paysage est porteur.';
    } else if (domPolarity === 'négative') {
      html += 'La dominante signale des défis à traverser. Ces obstacles ne sont pas des impasses mais des passages initiatiques qui vous transforment.';
    } else {
      html += 'L\'équilibre des forces est remarquable : tout reste ouvert, et c\'est votre libre arbitre qui fera pencher la balance.';
    }
    html += '</p>';
    html += divider();

    // ── La Carte Centrale (position 4) ──
    var center = cards[4];
    html += subHeader('La Carte Centrale &mdash; Le Cœur du Tirage');
    html += '<div class="tr-entry" style="border-left:3px solid var(--gold);padding-left:1rem;">';
    html += '<div class="tr-entry-head">';
    html += '<span class="tr-card-nm" style="font-size:1.2rem;">' + esc(center.symbol || '') + ' ' + esc(center.name) + '</span>';
    html += '<span style="font-size:0.75rem;color:var(--text-muted);"> — Position centrale</span>';
    html += '</div>';
    html += '<p class="tr-entry-text">' + esc(center.meaning) + '</p>';
    html += '<p class="tr-entry-text" style="color:var(--gold);"><strong>Conseil :</strong> ' + esc(center.advice) + '</p>';
    html += '<p class="tr-entry-text" style="color:var(--rose);font-style:italic;"><strong>Ombre :</strong> ' + esc(center.shadow) + '</p>';
    html += '</div>';
    html += divider();

    // ── Les Quatre Coins (0,2,6,8) ──
    html += subHeader('Les Quatre Coins &mdash; Le Cadre de Votre Situation');
    var corners = [
      { idx: 0, label: 'Passé conscient — la graine' },
      { idx: 2, label: 'Futur conscient — la récolte envisagée' },
      { idx: 6, label: 'Passé inconscient — la racine cachée' },
      { idx: 8, label: 'Futur inconscient — la destinée profonde' }
    ];
    for (var ci = 0; ci < corners.length; ci++) {
      var co = corners[ci];
      var coc = cards[co.idx];
      html += '<div class="tr-entry">';
      html += '<div class="tr-entry-head">';
      html += '<span class="tr-pos">' + esc(co.label) + '</span>';
      html += '<span class="tr-card-nm">' + esc(coc.symbol || '') + ' ' + esc(coc.name) + '</span>';
      html += '</div>';
      html += '<p class="tr-entry-text">' + esc(coc.synthesis || coc.meaning.split('.')[0]) + '.</p>';
      html += '</div>';
    }
    html += divider();

    // ── Le Losange Intérieur (1,3,5,7) ──
    html += subHeader('Le Losange Intérieur &mdash; Les Énergies Mobiles');
    var diamond = [
      { idx: 1, label: 'Conscient présent — votre mental actif' },
      { idx: 3, label: 'Passé du réel — les faits antérieurs' },
      { idx: 5, label: 'Futur du réel — les faits à venir' },
      { idx: 7, label: 'Inconscient présent — votre intuition vive' }
    ];
    for (var di = 0; di < diamond.length; di++) {
      var dm = diamond[di];
      var dmc = cards[dm.idx];
      html += '<div class="tr-entry">';
      html += '<div class="tr-entry-head">';
      html += '<span class="tr-pos">' + esc(dm.label) + '</span>';
      html += '<span class="tr-card-nm">' + esc(dmc.symbol || '') + ' ' + esc(dmc.name) + '</span>';
      html += '</div>';
      html += '<p class="tr-entry-text">' + esc(dmc.synthesis || dmc.meaning.split('.')[0]) + '.</p>';
      html += '</div>';
    }
    html += divider();

    // ── Les Trois Lignes ──
    html += subHeader('Les Trois Lignes &mdash; Plans de Conscience');
    var lines = [
      { idxs: [0,1,2], name: 'Ligne du Conscient', desc: 'Vos pensées, vos projets, votre dialogue intérieur' },
      { idxs: [3,4,5], name: 'Ligne du Réel', desc: 'Votre quotidien concret, votre corps, votre environnement matériel' },
      { idxs: [6,7,8], name: 'Ligne de l\'Inconscient', desc: 'Vos rêves, vos peurs, votre sagesse souterraine' }
    ];
    for (var li = 0; li < lines.length; li++) {
      var ln = lines[li];
      var lnCards = [cards[ln.idxs[0]], cards[ln.idxs[1]], cards[ln.idxs[2]]];
      html += '<div class="tr-pair">';
      html += '<span class="tr-pair-lbl">' + esc(ln.name) + ' <span style="font-weight:400;font-size:0.8rem;color:var(--text-muted);">(' + esc(ln.desc) + ')</span></span>';
      html += '<p class="tr-pair-txt">' + esc(chainRead(lnCards, 'ligne')) + '</p>';
      html += '</div>';
    }
    html += divider();

    // ── Les Trois Colonnes ──
    html += subHeader('Les Trois Colonnes &mdash; Lignes du Temps');
    var cols = [
      { idxs: [0,3,6], name: 'Colonne du Passé', desc: 'Ce qui vous a conduit jusqu\'ici' },
      { idxs: [1,4,7], name: 'Colonne du Présent', desc: 'Ce qui pulse au cœur de l\'instant' },
      { idxs: [2,5,8], name: 'Colonne du Futur', desc: 'Ce qui émerge à l\'horizon' }
    ];
    for (var ci2 = 0; ci2 < cols.length; ci2++) {
      var cl = cols[ci2];
      var clCards = [cards[cl.idxs[0]], cards[cl.idxs[1]], cards[cl.idxs[2]]];
      html += '<div class="tr-pair">';
      html += '<span class="tr-pair-lbl">' + esc(cl.name) + ' <span style="font-weight:400;font-size:0.8rem;color:var(--text-muted);">(' + esc(cl.desc) + ')</span></span>';
      html += '<p class="tr-pair-txt">' + esc(chainRead(clCards, 'colonne')) + '</p>';
      html += '</div>';
    }
    html += divider();

    // ── Les Diagonales ──
    html += subHeader('Les Diagonales &mdash; Influences Cachées');
    var diag1 = [cards[0], cards[4], cards[8]];
    var diag2 = [cards[6], cards[4], cards[2]];
    html += '<div class="tr-pair">';
    html += '<span class="tr-pair-lbl">Diagonale de la Manifestation <span style="font-weight:400;font-size:0.8rem;color:var(--text-muted);">(de la graine à la destinée)</span></span>';
    html += '<p class="tr-pair-txt">' + esc(chainRead(diag1, 'diagonale')) + '</p>';
    html += '</div>';
    html += '<div class="tr-pair">';
    html += '<span class="tr-pair-lbl">Diagonale de l\'Intégration <span style="font-weight:400;font-size:0.8rem;color:var(--text-muted);">(des profondeurs à la conscience)</span></span>';
    html += '<p class="tr-pair-txt">' + esc(chainRead(diag2, 'diagonale')) + '</p>';
    html += '</div>';
    html += divider();

    // ── Synthèse Narrative ──
    html += subHeader('Synthèse Narrative');
    html += '<p class="tr-synth">' + esc(buildCarreSynthesis(cards)) + '</p>';
    html += divider();

    // ── Ce Que Ce Tirage Vous Invite à Faire ──
    html += subHeader('Ce Que Ce Tirage Vous Invite à Faire');
    html += '<ol style="padding-left:1.2rem;line-height:1.8;color:var(--text);font-size:0.9rem;">';
    html += '<li>' + esc('Prenez appui sur ' + cards[4].name + ' : ' + (cards[4].advice || cards[4].synthesis || '') + ' C\'est votre point d\'ancrage.') + '</li>';
    html += '<li>' + esc('Observez la tension entre ' + cards[0].name + ' (votre conscient) et ' + cards[6].name + ' (votre inconscient). ' + buildTensionAdvice(cards[0], cards[6]) + '') + '</li>';
    html += '<li>' + esc(cards[2].name + ' éclaire votre avenir immédiat. ' + (cards[2].advice || 'Agissez en cohérence avec cette vision.') + '') + '</li>';
    html += '</ol>';

    html += '</div>';
    return html;
  }

  function buildCarreSynthesis(cards) {
    var center = cards[4];
    var last = cards[8];
    return 'Au centre de votre existence, ' + center.name + ' pose la tonalité dominante de votre période : '
      + (center.synthesis || center.meaning.split('.')[0]) + '. '
      + 'Les cartes ' + cards[1].name + ' et ' + cards[7].name + ' encadrent cette énergie centrale, l\'une sur le plan conscient, l\'autre dans les profondeurs de votre psyché. '
      + 'La colonne de gauche (' + cards[0].name + ', ' + cards[3].name + ', ' + cards[6].name + ') ancre votre histoire, '
      + 'tandis que la colonne de droite (' + cards[2].name + ', ' + cards[5].name + ', ' + last.name + ') projette votre devenir. '
      + 'Ce tirage vous rappelle que chaque carte est une facette d\'un même diamant — votre vie. '
      + last.name + ' scelle ce récit avec la promesse que ' + (last.synthesis || last.meaning.split('.')[0]).toLowerCase() + '.';
  }

  function buildTensionAdvice(a, b) {
    if (a.polarity === b.polarity) {
      return 'Ces deux énergies se renforcent mutuellement, suivez leur élan commun.';
    }
    return 'Ces deux forces opposées ne s\'annulent pas : elles dialoguent. Écoutez leur conversation intérieure.';
  }

  // ─── Grand Tableau ──────────────────────────────────────────────

  function generateGrandTableau(cards) {
    var html = '';
    html += '<div class="tr-section">';
    html += sectionHeader('Grand Tableau &mdash; Les 36 Cartes Déployées');
    html += '<p class="tr-intro">Le Grand Tableau déploie l\'intégralité du Petit Lenormand en quatre rangées de neuf cartes. Chaque position est une Maison qui dialogue avec la carte qui l\'occupe, créant une cartographie complète de votre existence.</p>';
    html += divider();

    // Trouver les significateurs
    var idxH = findCardIndexById(cards, '28');
    var idxF = findCardIndexById(cards, '29');
    var sigIdx = idxH !== -1 ? idxH : (idxF !== -1 ? idxF : -1);
    var sigCard = sigIdx !== -1 ? cards[sigIdx] : null;
    var sigLabel = idxH !== -1 ? 'L\'Homme' : (idxF !== -1 ? 'La Femme' : '');

    // ── Architecture ──
    html += subHeader('Architecture du Grand Tableau');
    html += '<p class="tr-entry-text">Les 36 cartes sont disposées en 4 rangées de 9. Chaque carte occupe la Maison Lenormand correspondant à sa position, créant un dialogue unique entre l\'énergie de la carte et le domaine de vie de la Maison. Les colonnes 1 à 9 structurent l\'axe temporel (gauche = passé, droite = futur), tandis que les rangées superposent les niveaux de réalité.</p>';
    html += divider();

    // ── Significateurs ──
    html += subHeader('Significateurs &mdash; Votre Positionnement');
    html += '<div class="tr-entry" style="border-left:3px solid var(--gold);padding-left:1rem;">';

    if (sigCard && sigIdx !== -1) {
      var sigCol = sigIdx % 9;
      var sigRow = Math.floor(sigIdx / 9);
      var sigHouse = getHouseMeaning(sigIdx);
      var surroundings = getSurrounding(cards, sigIdx, 9, 4);

      html += '<p class="tr-entry-text"><strong>' + esc(sigLabel) + ' se trouve en position ' + (sigIdx + 1) + '</strong> (colonne ' + (sigCol + 1) + ', rangée ' + (sigRow + 1) + ').</p>';
      html += '<p class="tr-entry-text">Cette carte occupe la <strong>' + esc(sigHouse.name) + '</strong> : ' + esc(sigHouse.meaning) + '</p>';
      html += '<p class="tr-entry-text">En tant que significateur, ' + esc(sigCard.name) + ' vous représente ici. ' + esc(sigCard.meaning) + '</p>';

      html += '<p style="font-size:0.85rem;color:var(--gold);margin-top:0.8rem;"><strong>Cartes environnantes :</strong></p>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.5rem;">';
      for (var si = 0; si < surroundings.length; si++) {
        var s = surroundings[si];
        html += '<span style="font-size:0.78rem;background:rgba(212,175,55,0.08);padding:0.2rem 0.5rem;border-radius:6px;color:var(--text-muted);">' + esc(s.card.symbol || '') + ' ' + esc(s.card.name) + '</span>';
      }
      html += '</div>';
    } else {
      html += '<p class="tr-entry-text">Les cartes 28 (L\'Homme) et 29 (La Femme) n\'apparaissent pas dans ce tirage, ce qui est inhabituel. Vérifiez votre jeu.</p>';
    }

    html += '</div>';
    html += divider();

    // ── Les Quatre Piliers ──
    html += subHeader('Les Quatre Piliers de Votre Vie');
    var piliers = [
      { id: '24', domain: 'Amour & Relations', desc: 'Le Cœur éclaire votre vie affective, vos attachements et vos passions.' },
      { id: '34', domain: 'Finances & Abondance', desc: 'Les Poissons révèlent la circulation de vos ressources matérielles.' },
      { id: '19', domain: 'Carrière & Statut', desc: 'La Tour dévoile votre positionnement professionnel et social.' },
      { id: '05', domain: 'Santé & Vitalité', desc: 'L\'Arbre ancre votre bien-être physique et votre croissance personnelle.' }
    ];

    for (var pi = 0; pi < piliers.length; pi++) {
      var pil = piliers[pi];
      var pilIdx = findCardIndexById(cards, pil.id);
      if (pilIdx === -1) continue;
      var pilCard = cards[pilIdx];
      var pilHouse = getHouseMeaning(pilIdx);
      var pilSurr = getSurrounding(cards, pilIdx, 9, 4);

      html += '<div class="tr-entry">';
      html += '<div class="tr-entry-head">';
      html += '<span class="tr-pos" style="color:var(--gold);">' + esc(pil.domain) + '</span>';
      html += '<span class="tr-card-nm">' + esc(pilCard.symbol || '') + ' ' + esc(pilCard.name) + '</span>';
      html += '</div>';
      html += '<p class="tr-entry-text">' + esc(pil.desc) + ' Placé en <strong>' + esc(pilHouse.name) + '</strong>, ' + esc(pilCard.name) + ' vous dit : ' + esc(pilCard.meaning) + '</p>';
      if (pilSurr.length) {
        var topNeighbors = pilSurr.slice(0, 3);
        html += '<p style="font-size:0.78rem;color:var(--text-muted);margin-top:-0.2rem;margin-bottom:0.5rem;">Entouré notamment de ' + topNeighbors.map(function(n) { return n.card.name; }).join(', ') + '.</p>';
      }
      var domainField = pil.id === '24' ? 'love' : (pil.id === '34' ? 'work' : (pil.id === '19' ? 'work' : 'health'));
      var domainText = pil.id === '24' ? pilCard.love : (pil.id === '34' ? pilCard.work : (pil.id === '19' ? pilCard.work : pilCard.health));
      html += '<p style="font-size:0.85rem;color:' + polarityColor(pilCard.polarity) + ';">' + esc(domainText) + '</p>';
      html += '</div>';
    }
    html += divider();

    // ── Les Quatre Coins du Destin ──
    html += subHeader('Les Quatre Coins du Destin');
    var cornersGT = [
      { idx: 0,  name: 'Porte d\'Entrée', desc: 'Ce qui ouvre le cycle de votre lecture.' },
      { idx: 8,  name: 'Porte de Sortie', desc: 'La première conclusion partielle qui émerge.' },
      { idx: 27, name: 'Fondation Gauche', desc: 'La base de votre histoire personnelle.' },
      { idx: 35, name: 'Aboutissement', desc: 'La destination lointaine de votre voyage.' }
    ];
    for (var cj = 0; cj < cornersGT.length; cj++) {
      var cg = cornersGT[cj];
      var cgc = cards[cg.idx];
      var cgHouse = getHouseMeaning(cg.idx);
      html += '<div class="tr-entry">';
      html += '<div class="tr-entry-head">';
      html += '<span class="tr-pos">' + esc(cg.name) + ' (Position ' + (cg.idx + 1) + ')</span>';
      html += '<span class="tr-card-nm">' + esc(cgc.symbol || '') + ' ' + esc(cgc.name) + '</span>';
      html += '</div>';
      html += '<p class="tr-entry-text">' + esc(cg.desc) + ' Ici, ' + esc(cgc.name) + ' occupe la maison ' + esc(cgHouse.name) + ' : ' + (cgc.synthesis || cgc.meaning.split('.')[0]) + '.</p>';
      html += '</div>';
    }
    html += divider();

    // ── Premières Cartes (0-3) ──
    html += subHeader('Les Premières Cartes &mdash; Le Message d\'Ouverture');
    var first4 = [cards[0], cards[1], cards[2], cards[3]];
    html += '<div class="tr-pair">';
    html += '<p class="tr-pair-txt">' + esc(chainRead4(first4, 'ouverture')) + '</p>';
    html += '</div>';
    html += divider();

    // ── Dernières Cartes (32-35) ──
    html += subHeader('Les Dernières Cartes &mdash; L\'Issue Finale');
    var last4 = [cards[32], cards[33], cards[34], cards[35]];
    html += '<div class="tr-pair">';
    html += '<p class="tr-pair-txt">' + esc(chainRead4(last4, 'final')) + '</p>';
    html += '</div>';
    html += divider();

    // ── Colonne du Destin ──
    if (sigIdx !== -1) {
      var destCol = sigIdx % 9;
      var colCards = [cards[destCol], cards[destCol + 9], cards[destCol + 18], cards[destCol + 27]];
      html += subHeader('Colonne du Destin &mdash; Votre Ligne de Vie');
      html += '<div class="tr-pair">';
      html += '<span class="tr-pair-lbl">Colonne ' + (destCol + 1) + ' &mdash; le fil conducteur de votre existence</span>';
      html += '<p class="tr-pair-txt">' + esc(chainRead4(colCards, 'colonne-destin')) + '</p>';
      html += '</div>';
      html += divider();
    }

    // ── Grande Synthèse ──
    html += subHeader('Grande Synthèse');
    html += '<p class="tr-synth">' + esc(buildGrandeSynthese(cards, sigCard, sigLabel)) + '</p>';
    html += divider();

    // ── Ce Que le Grand Tableau Vous Révèle ──
    html += subHeader('Ce Que le Grand Tableau Vous Révèle');
    var loveCard = findCardById(cards, '24');
    var moneyCard = findCardById(cards, '34');
    var careerCard = findCardById(cards, '19');
    var healthCard = findCardById(cards, '05');

    html += '<div class="tr-entry">';
    html += '<div class="tr-entry-head"><span class="tr-pos" style="color:var(--rose);">Domaine Amoureux</span></div>';
    html += '<p class="tr-entry-text">' + esc(loveCard ? loveCard.love : 'L\'amour se lit dans les cartes qui entourent votre significateur.') + '</p>';
    html += '</div>';

    html += '<div class="tr-entry">';
    html += '<div class="tr-entry-head"><span class="tr-pos" style="color:var(--gold);">Domaine Financier</span></div>';
    html += '<p class="tr-entry-text">' + esc(moneyCard ? moneyCard.work : 'Vos finances se reflètent dans la circulation des cartes matérielles du tirage.') + '</p>';
    html += '</div>';

    html += '<div class="tr-entry">';
    html += '<div class="tr-entry-head"><span class="tr-pos" style="color:var(--emerald);">Domaine Professionnel</span></div>';
    html += '<p class="tr-entry-text">' + esc(careerCard ? careerCard.work : 'Votre carrière se déploie dans les cartes touchant aux institutions et au pouvoir.') + '</p>';
    html += '</div>';

    html += '<div class="tr-entry">';
    html += '<div class="tr-entry-head"><span class="tr-pos" style="color:var(--accent);">Domaine de la Santé</span></div>';
    html += '<p class="tr-entry-text">' + esc(healthCard ? healthCard.health : 'Votre vitalité se mesure à la présence des cartes de croissance et de renouveau.') + '</p>';
    html += '</div>';

    html += '</div>';
    return html;
  }

  function buildGrandeSynthese(cards, sigCard, sigLabel) {
    var parts = [];

    if (sigCard) {
      parts.push(sigLabel + ' (' + sigCard.name + ') occupe une position centrale dans votre lecture et vous invite à considérer que ' + (sigCard.synthesis || sigCard.meaning.split('.')[0]).toLowerCase() + '.');
    }

    parts.push('Le Grand Tableau révèle une architecture subtile où chaque carte dialogue avec sa Maison.');

    var keyCards = [cards[0], cards[8], cards[27], cards[35]];
    parts.push('Les quatre coins du tableau (' + keyCards.map(function(c) { return c.name; }).join(', ') + ') délimitent votre espace de vie et en tracent les frontières.');

    var pol = countPolarity(cards);
    if (pol.positive > pol.negative) {
      parts.push('Avec ' + pol.positive + ' cartes favorables, les forces constructives dominent largement le paysage, annonçant une période de croissance et de réalisations.');
    } else if (pol.negative > pol.positive) {
      parts.push('Avec ' + pol.negative + ' cartes de défi, une traversée initiatique vous attend — chaque ombre cache une lumière à découvrir.');
    } else {
      parts.push('L\'équilibre des polarités (' + pol.positive + ' positives, ' + pol.negative + ' négatives) indique que tout est entre vos mains.');
    }

    var rowNames = ['la première rangée', 'la deuxième rangée', 'la troisième rangée', 'la quatrième rangée'];
    for (var r = 0; r < 4; r++) {
      var rowStart = r * 9;
      var rowKey = cards[rowStart + 4];
      parts.push('Dans ' + rowNames[r] + ', la carte centrale ' + rowKey.name + ' oriente cette strate de votre réalité vers ' + (rowKey.keywords ? rowKey.keywords[0] : 'son essence') + '.');
    }

    if (cards[35]) {
      parts.push('La toute dernière carte, ' + cards[35].name + ', scelle le destin de ce tableau : ' + (cards[35].synthesis || cards[35].meaning.split('.')[0]).toLowerCase() + '.');
    }

    return parts.join(' ');
  }

  // ─── Main Dispatcher ─────────────────────────────────────────────

  function generateReading(spreadType, drawnCards) {
    var cards = drawnCards || [];
    if (!cards.length) return '';

    var html = '';

    switch (spreadType) {
      case 'quotidien':
        html = generateQuotidien(cards[0]);
        break;
      case 'trois-cartes':
        if (cards.length < 3) return '';
        html = generateTroisCartes(cards.slice(0, 3));
        break;
      case 'carre-de-neuf':
        if (cards.length < 9) return '';
        html = generateCarreDeNeuf(cards.slice(0, 9));
        break;
      case 'grand-tableau':
        if (cards.length < 36) return '';
        html = generateGrandTableau(cards);
        break;
      default:
        return '';
    }

    if (spreadType !== 'grand-tableau' && window.tarotLenormandPlanes && window.tarotLenormandPlanes.generateAllPlaneReadings) {
      html += window.tarotLenormandPlanes.generateAllPlaneReadings(spreadType, drawnCards);
    }

    if (window.PlateformePartage) {
      var nomTirage = spreadType.split('-').map(cap).join(' ');
      var config = {
        type: 'tirage',
        titre: 'Lecture Lenormand',
        sousTitre: nomTirage,
        cartes: cards.map(function (c) {
          return {
            nom: c.name,
            image: '/images/tarot/lenormand/' + (window.tarotLenormandFilenames ? window.tarotLenormandFilenames[c.id] : '')
          };
        })
      };
      html += window.PlateformePartage.construireBoutonsHTML(config);
    }

    return html;
  }

  // ─── Public API ──────────────────────────────────────────────────

  return {
    generateReading: generateReading
  };

})();
