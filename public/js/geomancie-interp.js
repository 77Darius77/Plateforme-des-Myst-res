/* Moteur d'interprétation — Géomancie classique (16 figures, tradition arabe et européenne) */
window.geomancieInterp = (function () {

  /* ── Génération d'une figure aléatoire ─────────────────────────────────── */
  function genFigure() {
    var l = [1,2,1,2].map(function() { return Math.random() < 0.5 ? 1 : 2; });
    return window.geomancieData.find(function(f) {
      return f.lignes[0] === l[0] && f.lignes[1] === l[1] && f.lignes[2] === l[2] && f.lignes[3] === l[3];
    });
  }

  /* ── Rendu SVG inline de la figure (4 lignes de points) ─────────────────── */
  function renderFigureSVG(lignes, size) {
    size = size || 'md';
    var dotR = size === 'sm' ? 5 : 6;
    var gap = size === 'sm' ? 18 : 22;
    var rowH = size === 'sm' ? 20 : 24;
    var w = size === 'sm' ? 52 : 64;
    var h = rowH * 4 + gap;
    var html = '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" class="geo-svg">';
    for (var i = 0; i < 4; i++) {
      var cy = i * rowH + rowH / 2;
      var cx = w / 2;
      if (lignes[i] === 1) {
        html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + dotR + '" fill="currentColor"/>';
      } else {
        html += '<circle cx="' + (cx - dotR * 1.5) + '" cy="' + cy + '" r="' + dotR + '" fill="currentColor"/>';
        html += '<circle cx="' + (cx + dotR * 1.5) + '" cy="' + cy + '" r="' + dotR + '" fill="currentColor"/>';
      }
    }
    html += '</svg>';
    return html;
  }

  /* ── Couleur d'accent selon tonalité ────────────────────────────────────── */
  function toneColor(tone) {
    var map = { favorable: 'var(--gold)', defavorable: 'var(--rose)', neutre: 'var(--cyan)', mixte: 'var(--violet)' };
    return map[tone] || 'var(--text-muted)';
  }
  function toneBadge(tone) {
    var labels = { favorable: '✦ Favorable', defavorable: '⚠ Difficile', neutre: '◈ Neutre', mixte: '◑ Mixte' };
    return labels[tone] || '';
  }

  /* ── Configurations des tirages ─────────────────────────────────────────── */
  var SPREADS = {
    'trois-figures': {
      intro: 'Toute situation a une mémoire, une présence et une trajectoire. Les trois figures que vous avez générées forment une phrase — non une prédiction mécanique, mais le récit d\'une dynamique en cours. Lisez la séquence comme un mouvement, pas comme trois oracles distincts. C\'est leur relation qui parle le plus fort.',
      positions: [
        { name: 'Passé — Origines', descr: 'Ce qui a pris racine avant la situation actuelle',
          tpl: function(f) { return 'Cette situation a ses racines dans <strong>' + f.theme + '</strong> Ce qui a été semé continue d\'influencer le présent — reconnaître cette empreinte, c\'est déjà s\'en libérer.'; } },
        { name: 'Présent — Situation', descr: 'L\'énergie dominante au cœur de votre question',
          tpl: function(f) { return '<strong>' + f.nomFrancais + ' (' + f.nomLatin + ')</strong> — telle est l\'énergie qui gouverne ce moment. ' + f.meaning; } },
        { name: 'Futur — Issue probable', descr: 'La tendance si le courant actuel se poursuit',
          tpl: function(f) { return 'La trajectoire s\'annonce sous le signe de <em>' + f.theme + '</em> Ce n\'est pas un destin écrit, mais une direction probable — un conseil ou un avertissement pour éclairer votre route.'; } },
      ],
    },
    'croix': {
      intro: 'Cinq figures disposées en croix : une au centre, quatre aux points cardinaux. Le centre dit ce qui est — la réalité nue de la situation. Les quatre bras articulent les forces en présence : ce qui soutient et ce qui résiste, ce qui vient du passé et ce qui s\'annonce. Prenez le temps de contempler l\'ensemble avant de lire chaque position séparément.',
      positions: [
        { name: 'Centre — Situation présente', descr: 'L\'essence de votre question, les forces à l\'œuvre en ce moment',
          tpl: function(f) { return 'Votre position actuelle est sous le signe de <strong>' + f.nomFrancais + '</strong>. ' + f.meaning; } },
        { name: 'Haut — Ce qui soutient', descr: 'La force favorable active, ce qui travaille en votre faveur',
          tpl: function(f) { return 'La force qui soutient votre démarche est <em>' + f.theme + '</em> Reconnaissez cette énergie et appuyez-vous sur elle consciemment.'; } },
        { name: 'Bas — Origines / Fondation', descr: 'Les racines profondes de la situation',
          tpl: function(f) { return 'Les racines de cette situation portent la marque de <strong>' + f.nomFrancais + '</strong> — ' + f.theme + ' Comprendre l\'origine, c\'est déjà commencer à transformer.'; } },
        { name: 'Gauche — Obstacle / Résistance', descr: 'Ce qui freine ou complique votre démarche',
          tpl: function(f) { return 'L\'obstacle prend le visage de <em>' + f.ombre + '</em> Il n\'est pas là pour vous arrêter, mais pour vous apprendre ce que la voie facile n\'aurait pas enseigné.'; } },
        { name: 'Droite — Issue / Devenir', descr: 'La direction probable dans les semaines à venir',
          tpl: function(f) { return 'La direction qui se dessine est <em>' + f.theme + '</em> Cette figure indique une boussole, non un destin gravé dans la pierre. ' + f.juge; } },
      ],
    },
    'etoile': {
      intro: 'Une constellation de sept forces en dialogue : au centre l\'essence du tirage, et six branches qui éclairent les grandes sphères de la vie. L\'Étoile vous révèle la carte de votre ciel intérieur. Lisez d\'abord la figure centrale comme la tonalité générale, puis chaque branche comme un aspect de la situation.',
      positions: [
        { name: 'Centre — Cœur du tirage', descr: 'L\'énergie maîtresse qui irrigue tout le tirage',
          tpl: function(f) { return 'Au cœur de cette constellation, <strong>' + f.nomFrancais + ' (' + f.nomLatin + ')</strong> rayonne comme l\'énergie centrale. ' + f.meaning + ' ' + f.theme; } },
        { name: 'Aspiration — Ce que vous cherchez', descr: 'Ce que vous visez profondément, consciemment ou non',
          tpl: function(f) { return 'Votre aspiration profonde est marquée par <em>' + f.theme + '</em> Nommez cet idéal à voix haute — la clarté de l\'intention libère la route.'; } },
        { name: 'Fondation — Racines', descr: 'Le terrain sur lequel vous vous tenez',
          tpl: function(f) { return 'Votre fondation porte la marque de <strong>' + f.nomFrancais + '</strong> — ' + f.theme + ' Consolidez ce fondement avant de construire plus haut.'; } },
        { name: 'Passé — Ce qui s\'en va', descr: 'Ce qui appartient au cycle qui s\'achève',
          tpl: function(f) { return 'Le cycle passé portait l\'empreinte de <em>' + f.ombre + '</em> Reconnaissez cette empreinte pour vous en libérer — elle a conduit jusqu\'ici.'; } },
        { name: 'Avenir — Ce qui vient', descr: 'L\'énergie qui monte et cherche à se manifester',
          tpl: function(f) { return 'L\'énergie qui monte est <em>' + f.theme + '</em> Préparez le terrain — ce qui s\'annonce veut être accueilli. ' + f.juge; } },
        { name: 'Intérieur — Ressources cachées', descr: 'Vos ressources profondes, ce que vous portez sans le savoir',
          tpl: function(f) { return 'Vos ressources profondes vibrent au signe de <strong>' + f.nomFrancais + '</strong>. ' + f.meaning + ' Cette force est déjà là — il suffit de l\'appeler.'; } },
        { name: 'Extérieur — Environnement', descr: 'Ce qui vient de l\'extérieur, les influences de votre entourage',
          tpl: function(f) { return 'Votre environnement est marqué par <em>' + f.theme + '</em> Distinguez ce qui vient de vous de ce que le monde vous renvoie.'; } },
      ],
    },
  };

  /* ── Résonances entre figures géomantiques ─────────────────────────────── */
  var PAIRS = [
    { ids: ['puer','puella'], label: 'Puer · Puella',
      text: 'La rencontre de l\'ardeur et de la grâce — deux archétypes complémentaires. Passion immédiate, désir réciproque, intensité des débuts. Cette paire promet un contact électrique mais ne garantit pas la durée.' },
    { ids: ['fortuna-major','acquisitio'], label: 'Fortuna Major · Acquisitio',
      text: 'La combinaison la plus favorable possible en matière de réussite. Force intérieure et gain concret — un projet lancé sous cette paire a toutes les chances de prospérer durablement.' },
    { ids: ['caput-draconis','laetitia'], label: 'Caput Draconis · Laetitia',
      text: 'Éveil joyeux. Entrée dans un cycle spirituel ou personnel sous le signe de l\'ouverture et de la légèreté. Début d\'une pratique, d\'un enseignement, d\'un cheminement qui apporte de la joie.' },
    { ids: ['cauda-draconis','tristitia'], label: 'Cauda Draconis · Tristitia',
      text: 'Nuit obscure de l\'âme. Moment de dépossession profonde, de remise en question radicale. Éprouvant mais souvent précurseur d\'une transformation authentique — ne pas précipiter la sortie.' },
    { ids: ['rubeus','cauda-draconis'], label: 'Rubeus · Cauda Draconis',
      text: 'Conflit violent à son terme. Ce qui brûlait s\'effondre. Rupture abrupte, crise terminale d\'une situation tendue. Peut marquer la fin d\'un cycle d\'adversité — destruction nécessaire avant reconstruction.' },
    { ids: ['puella','fortuna-major'], label: 'Puella · Fortuna Major',
      text: 'Amour solide fondé sur un attachement réel. L\'une apporte la douceur, l\'autre la permanence. Union stable, souvent bénie socialement. Favorable pour les questions de durabilité affective.' },
    { ids: ['conjunctio','laetitia'], label: 'Conjunctio · Laetitia',
      text: 'Rencontre heureuse, union joyeuse. En question relationnelle : bonne nouvelle à venir, rapprochement, accord mutuel. L\'une unit, l\'autre allège — paire très favorable pour les débuts.' },
    { ids: ['tristitia','amissio'], label: 'Tristitia · Amissio',
      text: 'Double signal de perte en matière affective. Deuil d\'une relation, séparation douloureuse. Non sans espoir : ce qui s\'efface laisse de la place. Mais le moment présent est difficile.' },
    { ids: ['puer','amissio'], label: 'Puer · Amissio',
      text: 'Passion qui brûle ses propres ressources. L\'intensité de Puer combinée à la perte d\'Amissio indique une relation consommatrice. Invitation à mesurer le coût émotionnel avant de continuer.' },
    { ids: ['albus','acquisitio'], label: 'Albus · Acquisitio',
      text: 'Succès par la compétence et la clarté d\'esprit. Gain intellectuel, reconnaissance académique, négociation réussie. Ce n\'est pas la force qui convainc ici mais la précision.' },
    { ids: ['carcer','tristitia'], label: 'Carcer · Tristitia',
      text: 'Double enfermement : la structure qui emprisonne, la mélancolie qui isole. Situation de blocage intérieur profond. Cette paire suggère un travail thérapeutique ou un retrait volontaire.' },
    { ids: ['fortuna-major','albus'], label: 'Fortuna Major · Albus',
      text: 'Sagesse acquise par l\'expérience. Maturité spirituelle, discernement éclairé par un vécu riche. Cette paire favorise les enseignants, les guides, ceux qui transmettent.' },
    { ids: ['via','conjunctio'], label: 'Via · Conjunctio',
      text: 'Rencontre en chemin, relation de passage, union temporaire mais signifiante. Le lien existe — il ne fixe pas mais transforme. Idéale pour les chemins qui se croisent un temps.' },
    { ids: ['laetitia','fortuna-major'], label: 'Laetitia · Fortuna Major',
      text: 'Vitalité robuste et succès durable : la joie rencontre la gloire. En question de santé : le corps répond bien. En question de carrière : une ascension lumineuse et stable.' },
    { ids: ['rubeus','tristitia'], label: 'Rubeus · Tristitia',
      text: 'Signal d\'alarme : inflammation chronique, épuisement nerveux, santé compromise par le stress ou la violence. Consultation médicale conseillée — ne pas minimiser les symptômes.' },
    { ids: ['caput-draconis','fortuna-minor'], label: 'Caput Draconis · Fortuna Minor',
      text: 'Lancement rapide, succès initial prometteur. La tête du dragon ouvre le chemin, la petite fortune accélère les premiers résultats. Ce début brillant demande un suivi structuré.' },
  ];

  /* ── Détection des résonances ────────────────────────────────────────────── */
  function detectPairs(figures) {
    var ids = figures.map(function(f) { return f.id; });
    return PAIRS.filter(function(p) {
      return p.ids.every(function(id) { return ids.indexOf(id) !== -1; });
    }).slice(0, 2);
  }

  /* ── Synthèse du tirage ──────────────────────────────────────────────────── */
  function buildSynthesis(figures, spreadType, pairs) {
    var text = '';
    if (spreadType === 'trois-figures') {
      var f = figures[0], p = figures[1], fu = figures[2];
      text = 'Ce tirage trace un arc de <strong>' + f.nomFrancais + '</strong> (' + f.theme + ') jusqu\'à <strong>' + fu.nomFrancais + '</strong> (' + fu.theme + '). La figure centrale, <strong>' + p.nomFrancais + '</strong>, est le pivot — elle révèle comment le chemin d\'hier conduit au destin de demain. ';
    } else if (spreadType === 'croix') {
      var centre = figures[0], issue = figures[4];
      text = 'Au cœur de cette croix, <strong>' + centre.nomFrancais + ' (' + centre.nomLatin + ')</strong> — ' + centre.theme + ' L\'issue qui se dessine est celle de <strong>' + issue.nomFrancais + '</strong> : ' + issue.juge + ' ';
    } else if (spreadType === 'etoile') {
      var coeur = figures[0], avenir = figures[4];
      text = 'L\'étoile est gouvernée par <strong>' + coeur.nomFrancais + ' (' + coeur.nomLatin + ')</strong> — ' + coeur.theme + ' L\'énergie qui monte est celle de <strong>' + avenir.nomFrancais + '</strong> : ' + avenir.theme + ' ';
    }
    if (pairs.length > 0) {
      text += 'La résonance <strong>' + pairs[0].label + '</strong> amplifie ce message : ' + pairs[0].text + ' ';
    }
    text += 'La géomancie n\'est pas un verdict — c\'est l\'éclairage d\'un moment. Les figures montrent une direction, non une fatalité. Votre libre arbitre reste la boussole suprême.';
    return text;
  }

  /* ── Générateur principal ────────────────────────────────────────────────── */
  function generateFigures(spreadType) {
    var cfg = SPREADS[spreadType];
    if (!cfg) return [];
    return cfg.positions.map(function() { return genFigure(); });
  }

  function generateReadingHTML(spreadType, figures) {
    var cfg = SPREADS[spreadType];
    if (!cfg || !figures || !figures.length) return '';
    var pairs = detectPairs(figures);

    var html = '<div class="tr-section">'
      + '<div class="tr-header"><span class="tr-star">✦</span><h2 class="tr-title">Lecture géomantique</h2></div>'
      + '<p class="tr-intro">' + cfg.intro + '</p>'
      + '<div class="tr-divider"></div>';

    figures.forEach(function(fig, i) {
      var pos = cfg.positions[i];
      if (!pos || !fig) return;
      html += '<div class="tr-entry">'
        + '<div class="tr-entry-head">'
        + '<span class="tr-pos">' + pos.name + '</span>'
        + '<span class="tr-card-nm" style="color:' + toneColor(fig.tonalite) + ';">' + fig.nomFrancais + ' — ' + fig.nomLatin + '</span>'
        + '<span class="tr-card-planet">' + fig.symbole + ' ' + fig.planete + ' · ' + fig.element + '</span>'
        + '</div>'
        + '<p class="tr-entry-text">' + pos.tpl(fig) + '</p>'
        + '</div>';
    });

    if (pairs.length > 0) {
      html += '<div class="tr-divider"></div><h3 class="tr-sub">Résonances notables</h3>';
      pairs.forEach(function(p) {
        html += '<div class="tr-pair"><span class="tr-pair-lbl">' + p.label + '</span><p class="tr-pair-txt">' + p.text + '</p></div>';
      });
    }

    html += '<div class="tr-divider"></div>'
      + '<h3 class="tr-sub">Synthèse</h3>'
      + '<p class="tr-synth">' + buildSynthesis(figures, spreadType, pairs) + '</p>'
      + '</div>';

    return html;
  }

  /* ── API publique ────────────────────────────────────────────────────────── */
  return {
    genFigure: genFigure,
    generateFigures: generateFigures,
    generateReadingHTML: generateReadingHTML,
    renderFigureSVG: renderFigureSVG,
    toneColor: toneColor,
    toneBadge: toneBadge,
  };

})();
