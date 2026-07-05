/* Moteur d'interprétation des tirages — Oracle de Belline */
window.bellineInterp = (function () {

  /* ── Configurations des tirages ────────────────────────────────────────── */
  var SPREADS = {
    'trois-cartes': {
      intro: 'Trois instants d\'une même histoire : le passé qui a fondé, le présent qui révèle, le futur qui appelle. La carte centrale est le pivot — elle explique comment passer de l\'origine à la destination.',
      positions: [
        { name: 'Le Passé', shadow: false,
          tpl: 'Cette situation a pris naissance dans un registre de {T}. Ce schéma fondateur continue d\'agir en arrière-plan — reconnaître son empreinte, c\'est déjà s\'en libérer.' },
        { name: 'Le Présent', shadow: false,
          tpl: '{TC} — telle est l\'énergie qui gouverne ce moment. C\'est à la fois l\'enjeu vivant, les ressources disponibles et le cœur de ce que vous traversez actuellement.' },
        { name: 'Le Futur', shadow: false,
          tpl: 'La trajectoire naturelle porte la marque de {T}. Ce n\'est pas un destin figé : c\'est l\'orientation probable, un conseil ou un avertissement pour les semaines à venir.' },
      ],
    },
    'croix': {
      intro: 'Cinq forces en tension au cœur d\'un mandala divinatoire : ce qui vous soutient, ce qui résiste, ce que le tirage conseille, la réponse à votre question, et l\'énergie maîtresse qui colore l\'ensemble.',
      positions: [
        { name: 'Le Consultant — Situation', shadow: false,
          tpl: 'Votre position actuelle est sous le signe de {T}. C\'est l\'énergie qui vous définit dans cette situation — votre état d\'être et les forces dont vous disposez.' },
        { name: 'Les Forces Contraires — Obstacles', shadow: true,
          tpl: 'L\'obstacle porte ici le visage de {T}. Il est là non pour bloquer définitivement, mais pour pointer ce qui doit être pleinement traversé avant que la voie se dégage.' },
        { name: 'Le Conseil — Influence Supérieure', shadow: false,
          tpl: 'La guidance du tirage est {T}. C\'est l\'attitude ou l\'action que la situation réclame — ce que l\'oracle vous invite à intégrer pour avancer concrètement.' },
        { name: 'Le Résultat — Réponse', shadow: false,
          tpl: 'Dans la dynamique actuelle, {T} dessine l\'issue probable. Considérez-le comme une boussole et non comme un verdict immuable.' },
        { name: 'La Synthèse — Vue d\'ensemble', shadow: false,
          tpl: '{TC} est l\'énergie maîtresse de ce tirage. Elle colore toutes les autres cartes et révèle la tonalité profonde — c\'est autour d\'elle que tout s\'articule.' },
      ],
    },
    'ligne': {
      intro: 'Une fresque narrative en sept cartes, du passé lointain jusqu\'à l\'issue finale. Chaque carte est une étape d\'un chemin — lisez-les comme les chapitres d\'une histoire qui se déroule.',
      positions: [
        { name: 'Passé Lointain', shadow: false,
          tpl: 'À la racine profonde : {T}. Ce conditionnement structurant, souvent inconscient, a mis en mouvement les événements bien avant qu\'ils ne soient visibles.' },
        { name: 'Passé Proche', shadow: false,
          tpl: 'Ce qui vient de se jouer est marqué par {T}. Un événement ou un état dont les effets se prolongent et continuent de nourrir la situation actuelle.' },
        { name: 'Influence Passée', shadow: false,
          tpl: 'Une influence complémentaire du passé : {T}. Une couche supplémentaire de l\'histoire qui affine la compréhension des racines.' },
        { name: 'Présent', shadow: false,
          tpl: 'Le pivot central est {T}. C\'est ici que tout converge — l\'énergie du moment, ce qui est en jeu, et ce qui est disponible pour agir.' },
        { name: 'Futur Immédiat', shadow: false,
          tpl: '{TC} se prépare à émerger dans les jours ou semaines à venir. Une énergie qui frappe à la porte — soyez prêt à l\'accueillir.' },
        { name: 'Évolution', shadow: false,
          tpl: 'L\'évolution probable porte la vibration de {T}. La direction que prendra naturellement la situation si vous suivez le courant du conseil.' },
        { name: 'Issue Finale', shadow: false,
          tpl: 'Le dénouement de ce cycle est sous l\'égide de {T}. C\'est la destination probable — la leçon que ce chapitre vous laisse en héritage.' },
      ],
    },
    'coupe': {
      intro: 'Deux cartes en dialogue : la situation présente et son évolution. Cette méthode, chère aux cartomanciens, offre une réponse précise et concentrée à votre question.',
      positions: [
        { name: 'La Situation', shadow: false,
          tpl: '{TC} décrit l\'état actuel de votre question. C\'est le terrain — ce qui est, ici et maintenant, dans toute sa vérité.' },
        { name: 'L\'Évolution', shadow: false,
          tpl: 'La tendance qui se dessine est {T}. Cette carte indique la direction probable — ce vers quoi la situation évolue naturellement si rien ne change.' },
      ],
    },
  };

  /* ── Résonances notables (paires de cartes Belline) ──────────────────────── */
  var PAIRS = [
    /* Cartes maîtresses */
    { ids: ['00','01'], label: 'La Carte Bleue · La Destinée',
      text: 'Protection divine sur un choix capital : le tournant qui s\'annonce est placé sous une étoile protectrice. Avancez avec confiance — vous êtes guidé.' },
    { ids: ['02','03'], label: 'L\'Étoile de l\'Homme · L\'Étoile de la Femme',
      text: 'L\'alliance du masculin et du féminin : action et réceptivité, force et intuition. Une complétude intérieure qui permet tout.' },

    /* Amour et relations */
    { ids: ['29','27'], label: 'Amor · Union',
      text: 'L\'amour mène à l\'alliance : une relation qui s\'approfondit et se structure. Le sentiment et l\'engagement se renforcent mutuellement.' },
    { ids: ['29','08'], label: 'Amor · Pensée-Amitié',
      text: 'De l\'amitié à l\'amour, ou l\'amour qui trouve sa racine dans une amitié profonde. Une relation fondée sur la confiance sincère.' },
    { ids: ['31','29'], label: 'Passions · Amor',
      text: 'Passion amoureuse intense : le cœur brûle d\'un feu puissant. Intensité et désir à leur apogée — canalisez cette énergie avec conscience.' },

    /* Succès et accomplissement */
    { ids: ['05','07'], label: 'Réussite · Honneurs',
      text: 'Succès couronné de reconnaissance : le mérite rencontre la renommée. Double confirmation d\'une trajectoire juste et récompensée.' },
    { ids: ['05','45'], label: 'Réussite · Bonheur',
      text: 'La réussite qui mène au bonheur véritable : accomplissement matériel ET épanouissement intérieur. Une conjonction rare et précieuse.' },
    { ids: ['06','39'], label: 'Élévation · Appui',
      text: 'Ascension soutenue : une aide puissante favorise votre progression. Un mentor, un protecteur ou une circonstance propice vous élève.' },

    /* Obstacles et épreuves */
    { ids: ['11','17'], label: 'Trahison · Maladie',
      text: 'Double peine : une trahison qui affecte la santé morale ou physique. Le corps et le cœur crient — prenez soin de vous avant tout.' },
    { ids: ['46','51'], label: 'Infortune · Retard',
      text: 'L\'épreuve s\'installe dans la durée : malchance et obstacles ralentissent la route. La patience devient votre meilleure alliée.' },
    { ids: ['50','48'], label: 'Ruine · Fatalité',
      text: 'Effondrement et fin de cycle : ce qui s\'écroule devait disparaître. Acceptez cette conclusion pour renaître sur des bases neuves.' },

    /* Transformation */
    { ids: ['18','38'], label: 'Changement · Accident',
      text: 'Un changement imposé de l\'extérieur : un événement soudain transforme le décor. Ce bouleversement, même brutal, ouvre une voie nouvelle.' },
    { ids: ['49','18'], label: 'La Grâce · Changement',
      text: 'Un changement béni : une aide inattendue transforme la situation. La Providence intervient au cœur de la transition.' },
    { ids: ['52','49'], label: 'Cloître · La Grâce',
      text: 'Dans l\'isolement, la grâce vous trouve : une retraite qui débouche sur un soulagement inattendu. Le silence porte ses fruits.' },

    /* Communication et intelligence */
    { ids: ['20','24'], label: 'Intelligence · Nouvelle',
      text: 'Une information éclairante arrive : votre discernement est sollicité par une nouvelle importante. La clarté mentale guide votre décision.' },
    { ids: ['23','36'], label: 'Trafic · Pourparlers',
      text: 'Négociations actives et fructueuses : les échanges commerciaux ou diplomatiques avancent. L\'art de la parole porte ses fruits.' },
    { ids: ['14','20'], label: 'Découverte · Intelligence',
      text: 'Une révélation grâce à l\'analyse : votre intelligence dévoile ce qui était caché. Le savoir éclaire le mystère.' },

    /* Abondance et prospérité */
    { ids: ['19','10'], label: 'Argent · Présents',
      text: 'Abondance et cadeaux du destin : les flux financiers sont favorables, des opportunités matérielles se présentent. Recevez avec gratitude.' },
    { ids: ['19','41'], label: 'Argent · Héritage',
      text: 'Ressources venant du passé : un héritage, un legs ou des acquis familiaux favorisent votre situation financière. Honorez cette transmission.' },
    { ids: ['22','19'], label: 'Entreprises · Argent',
      text: 'Projets et finances en synergie : vos entreprises génèrent des revenus. La construction méthodique porte ses fruits matériels.' },

    /* Conflits et tensions */
    { ids: ['33','35'], label: 'Procès · Ennemis',
      text: 'Conflit ouvert avec des opposants : hostilité déclarée, combat juridique ou personnel. Préparez votre défense sans perdre votre centre.' },
    { ids: ['34','32'], label: 'Despotisme · Méchanceté',
      text: 'Emprise toxique et malveillance : une domination exercée par jalousie ou envie. Libérez-vous de cette influence néfaste.' },
    { ids: ['37','31'], label: 'Feu · Passions',
      text: 'Énergie ardente décuplée : le feu de l\'action et la passion du cœur s\'amplifient. Puissance créatrice ou risque d\'embrasement.' },

    /* Paix et harmonie */
    { ids: ['26','16'], label: 'La Paix · Les Pénates',
      text: 'Sérénité au foyer : l\'harmonie règne dans votre maison. Un havre de paix où se ressourcer pleinement.' },
    { ids: ['26','30'], label: 'La Paix · La Table',
      text: 'Réconciliations festives : la paix se célèbre autour d\'une table. Retrouvailles joyeuses et harmonie collective.' },
    { ids: ['09','25'], label: 'Campagne-Santé · Plaisirs',
      text: 'Santé et plaisirs en équilibre : le corps se régénère dans la joie. Repos actif et ressourcement heureux.' },

    /* Spiritualité et sagesse */
    { ids: ['42','52'], label: 'Sagesse · Cloître',
      text: 'La sagesse naît du retrait : une période d\'isolement fécond pour la réflexion profonde. Le silence enseigne.' },
    { ids: ['42','49'], label: 'Sagesse · La Grâce',
      text: 'Sagesse inspirée par le divin : votre discernement est guidé d\'en haut. Une compréhension qui dépasse la raison.' },
  ];

  /* ── Triades (combinaisons de 3 cartes) ───────────────────────────────── */
  var TRIADS = [
    { ids: ['00','05','45'], label: 'La Carte Bleue · Réussite · Bonheur',
      text: 'Bénédiction totale : protection divine, succès matériel et épanouissement profond. Une conjonction exceptionnelle de forces favorables.' },
    { ids: ['11','12','14'], label: 'Trahison · Départ · Découverte',
      text: 'Cycle douloureux de révélation : une trahison, une séparation, puis la vérité éclate. Ce qui semblait perte ouvre à une compréhension libératrice.' },
    { ids: ['46','50','49'], label: 'Infortune · Ruine · La Grâce',
      text: 'L\'épreuve, l\'effondrement, puis le secours : le chemin de croix débouche sur l\'intervention divine. Ne perdez jamais espoir — la grâce survient au point le plus sombre.' },
    { ids: ['29','27','28'], label: 'Amor · Union · Famille',
      text: 'De l\'amour à la famille : un chemin complet du cœur. Rencontre, alliance, puis intégration dans un cercle élargi — la promesse d\'un foyer.' },
    { ids: ['19','22','05'], label: 'Argent · Entreprises · Réussite',
      text: 'Le triangle de la prospérité : ressources, construction, succès. Un projet entrepreneurial couronné de réussite matérielle.' },
    { ids: ['17','09','25'], label: 'Maladie · Campagne-Santé · Plaisirs',
      text: 'De la maladie à la guérison par le plaisir : un chemin de rétablissement. Le mal-être cède la place au repos, puis à la joie retrouvée.' },
  ];

  /* ── Analyse des planètes dominantes ─────────────────────────────────────── */
  function detectPlanetaryBalance(cards) {
    var planets = { 'Soleil': 0, 'Lune': 0, 'Mercure': 0, 'Vénus': 0, 'Mars': 0, 'Jupiter': 0, 'Saturne': 0, 'Majeure': 0 };
    cards.forEach(function (c) {
      if (planets.hasOwnProperty(c.planet)) planets[c.planet]++;
    });

    var dominant = null, max = 0;
    for (var p in planets) {
      if (planets[p] > max) { max = planets[p]; dominant = p; }
    }

    var readings = {
      'Soleil': 'Le Soleil domine ce tirage : vitalité, succès et rayonnement sont au cœur de votre situation. Une période d\'expansion et de reconnaissance.',
      'Lune': 'La Lune colore ce tirage : émotions, intuition et monde intérieur sont activés. Écoutez vos rêves et vos ressentis profonds.',
      'Mercure': 'Mercure gouverne ce tirage : communication, intellect et échanges sont primordiaux. L\'information et le dialogue sont vos clés.',
      'Vénus': 'Vénus illumine ce tirage : amour, beauté et harmonie tissent la trame. Les relations et le plaisir sont au premier plan.',
      'Mars': 'Mars énergise ce tirage : action, conflit et courage sont à l\'œuvre. L\'énergie est là — canalisez-la avec sagesse.',
      'Jupiter': 'Jupiter amplifie ce tirage : chance, expansion et protection bienveillante. Des forces favorables vous soutiennent.',
      'Saturne': 'Saturne structure ce tirage : leçons, patience et sagesse du temps. Ralentissez — chaque obstacle est un enseignement.',
      'Majeure': 'Les cartes maîtresses dominent : la destinée et la protection sont au cœur de ce tirage. Des forces archétypales puissantes sont à l\'œuvre.'
    };

    return { dominant: dominant, count: max, total: cards.length, text: readings[dominant] || '' };
  }

  /* ── Utilitaires ────────────────────────────────────────────────────────── */
  function getTheme(card, useShadow) {
    if (!card) return '';
    return useShadow ? (card.shadow || card.theme) : card.theme;
  }

  function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function applyLens(pos, card) {
    var t = getTheme(card, !!pos.shadow);
    return pos.tpl.replace(/\{T\}/g, t).replace(/\{TC\}/g, cap(t));
  }

  function detectPairs(cards) {
    var ids = cards.map(function (c) { return c.id; });
    return PAIRS.filter(function (p) {
      return p.ids.every(function (id) { return ids.indexOf(id) !== -1; });
    }).slice(0, 3);
  }

  function detectTriads(cards) {
    var ids = cards.map(function (c) { return c.id; });
    return TRIADS.filter(function (t) {
      return t.ids.every(function (id) { return ids.indexOf(id) !== -1; });
    }).slice(0, 2);
  }

  function buildSynthesis(cards, spreadType, pairs, triads, planetInfo) {
    var text = '';

    if (spreadType === 'trois-cartes') {
      var f = cards[0], l = cards[2], m = cards[1];
      text = 'Ce tirage trace un arc de <strong>' + f.name + '</strong> (' + getTheme(f, false) + ') jusqu\'à <strong>' + l.name + '</strong> (' + getTheme(l, false) + '). '
           + 'La carte du présent, <strong>' + m.name + '</strong>, est le pivot qui révèle comment passer de l\'origine à la destination. ';
    } else if (spreadType === 'croix') {
      var pour = cards[0], contre = cards[1], synth = cards[4];
      text = 'Entre votre situation marquée par <strong>' + pour.name + '</strong> et l\'obstacle de <strong>' + contre.name + '</strong> (' + getTheme(contre, true) + '), l\'énergie maîtresse est <strong>' + synth.name + '</strong> : ' + getTheme(synth, false) + '. ';
    } else if (spreadType === 'ligne') {
      var r = cards[0], c = cards[6];
      text = 'La fresque narrative part des racines de <strong>' + r.name + '</strong> (' + getTheme(r, false) + ') et s\'achemine vers <strong>' + c.name + '</strong> (' + getTheme(c, false) + '). ';
    } else if (spreadType === 'coupe') {
      text = 'Deux cartes en dialogue : <strong>' + cards[0].name + '</strong> éclaire la situation présente, et <strong>' + cards[1].name + '</strong> en indique l\'évolution probable. ';
    }

    if (planetInfo && planetInfo.dominant !== 'Majeure') {
      text += planetInfo.text + ' ';
    }

    if (triads.length > 0) {
      text += 'La constellation <strong>' + triads[0].label + '</strong> est particulièrement significative : ' + triads[0].text + ' ';
    } else if (pairs.length > 0) {
      var labels = pairs.slice(0, 2).map(function (p) { return p.label; }).join(' et ');
      text += (pairs.length === 1 ? 'La résonance ' : 'Les résonances ') + labels + ' amplifient ce message. ';
    }

    text += 'L\'Oracle de Belline n\'est pas un verdict — c\'est un éclairage du moment présent. Votre libre arbitre demeure la boussole suprême de votre chemin.';
    return text;
  }

  /* ── Générateur principal ────────────────────────────────────────────────── */
  function generateReading(spreadType, cards) {
    var cfg = SPREADS[spreadType];
    if (!cfg || !cards || !cards.length) return '';

    var pairs  = detectPairs(cards);
    var triads = detectTriads(cards);
    var planetInfo = detectPlanetaryBalance(cards);

    var html = '<div class="tr-section">'
      + '<div class="tr-header"><span class="tr-star">✦</span><h2 class="tr-title">Lecture de votre tirage Belline</h2></div>'
      + '<p class="tr-intro">' + cfg.intro + '</p>'
      + '<div class="tr-divider"></div>';

    cards.forEach(function (card, i) {
      var pos = cfg.positions[i];
      if (!pos) return;
      html += '<div class="tr-entry">'
        + '<div class="tr-entry-head">'
        + '<span class="tr-pos">' + pos.name + '</span>'
        + '<span class="tr-card-nm">' + card.planetEmoji + ' ' + card.name + '</span>'
        + '<span class="tr-card-planet">(' + card.planet + ')</span>'
        + '</div>'
        + '<p class="tr-entry-text">' + applyLens(pos, card) + '</p>'
        + '</div>';
    });

    if (triads.length > 0) {
      html += '<div class="tr-divider"></div><h3 class="tr-sub">Constellation remarquable</h3>';
      triads.forEach(function (t) {
        html += '<div class="tr-pair tr-triad">'
          + '<span class="tr-pair-lbl">' + t.label + '</span>'
          + '<p class="tr-pair-txt">' + t.text + '</p>'
          + '</div>';
      });
    }

    if (pairs.length > 0) {
      html += '<div class="tr-divider"></div><h3 class="tr-sub">Résonances notables</h3>';
      pairs.forEach(function (p) {
        html += '<div class="tr-pair">'
          + '<span class="tr-pair-lbl">' + p.label + '</span>'
          + '<p class="tr-pair-txt">' + p.text + '</p>'
          + '</div>';
      });
    }

    html += '<div class="tr-divider"></div>'
      + '<h3 class="tr-sub">Synthèse</h3>'
      + '<p class="tr-synth">' + buildSynthesis(cards, spreadType, pairs, triads, planetInfo) + '</p>';

    if (window.PlateformePartage) {
      var config = {
        cible: '#resultats',
        titre: 'belline-' + spreadType
      };
      html += window.PlateformePartage.construireBoutonsHTML(config);
    }

    html += '</div>';

    return html;
  }

  /* ── Lecture par plan ─────────────────────────────────────────────────── */
  function generatePlaneReading(spreadType, cards, plane) {
    if (!window.bellinePlanes) return '';
    var proj = window.bellinePlanes.projectSpread(cards, plane);
    if (!proj) return '';

    var planeIcons = { personnel: '☾', professionnel: '☉', relationnel: '♡' };

    var html = '<div class="tr-plane-section" data-plane="' + plane + '">'
      + '<div class="tr-plane-header">'
      + '<span class="tr-plane-icon">' + (planeIcons[plane] || '✦') + '</span>'
      + '<h3 class="tr-plane-title">Lecture sur le plan ' + proj.planeLabel + '</h3>'
      + '</div>'
      + '<p class="tr-plane-intro">' + proj.intro + '</p>'
      + '<div class="tr-plane-entries">';

    proj.entries.forEach(function (entry) {
      html += '<div class="tr-plane-entry">'
        + '<div class="tr-plane-entry-head">'
        + '<span class="tr-plane-pos">' + entry.cardName + '</span>'
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
      + '</div>';

    return html;
  }

  function generateAllPlaneReadings(spreadType, cards) {
    if (!window.bellinePlanes) return '';
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

  function generateReadingWithPlanes(spreadType, cards) {
    var html = generateReading(spreadType, cards);
    if (window.bellinePlanes) {
      html += generateAllPlaneReadings(spreadType, cards);
    }
    return html;
  }

  return {
    generateReading: generateReading,
    generateReadingWithPlanes: generateReadingWithPlanes,
    generatePlaneReading: generatePlaneReading,
    generateAllPlaneReadings: generateAllPlaneReadings
  };
})();
