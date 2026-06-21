/* Moteur d'interprétation des tirages — Oracle de la Triade (57 lames, sans inversées) */
window.triadeInterp = (function () {

  /* ── Configurations des tirages ────────────────────────────────────────── */
  var SPREADS = {
    TROIS_CARTES: {
      name: 'Trois Cartes',
      count: 3,
      intro: 'Trois lames pour éclairer le fil du temps : le passé qui a tissé, le présent qui vibre, le futur qui appelle. La carte centrale est le pivot — elle révèle comment le chemin d\'hier ouvre la porte de demain.',
      positions: [
        { name: 'Passé', level: null, label: 'Ce qui fut',
          tpl: '{TC} — telle est l\'énergie qui a préparé ce moment. {T}' },
        { name: 'Présent', level: null, label: 'Ce qui est',
          tpl: '{TC} — c\'est le cœur battant de votre situation. {T}' },
        { name: 'Futur', level: null, label: 'Ce qui vient',
          tpl: '{TC} — la trajectoire qui s\'annonce. {T}' }
      ]
    },
    CROIX: {
      name: 'Croix',
      count: 6,
      intro: 'Six piliers pour une lecture en profondeur : au centre votre essence, autour les forces qui vous entourent, et une synthèse qui éclaire l\'ensemble.',
      positions: [
        { name: 'Le Consultant', level: null, label: 'Centre',
          tpl: 'Au cœur du tirage, {TC} vous définit dans cette situation. {T}' },
        { name: 'Forces', level: null, label: 'Gauche',
          tpl: 'Ce qui vous soutient : {TC}. {T}' },
        { name: 'Obstacles', level: null, label: 'Droite',
          tpl: 'Ce qui vous défie : {TC}. {T}' },
        { name: 'Environnement', level: null, label: 'Haut',
          tpl: 'Ce qui vous entoure : {TC}. {T}' },
        { name: 'Résultat', level: null, label: 'Bas horizontal',
          tpl: 'L\'aboutissement probable : {TC}. {T}' },
        { name: 'Synthèse', level: null, label: 'Bas vertical',
          tpl: 'La clé de compréhension : {TC}. {T}' }
      ]
    },
    PYRAMIDE: {
      name: 'Pyramide (Tétraktys)',
      count: 10,
      intro: 'Dix lames disposées selon la Tétraktys pythagoricienne : de l\'unité spirituelle au sommet jusqu\'aux quatre piliers de la manifestation concrète à la base. Une lecture qui relie le ciel et la terre.',
      positions: [
        { name: 'Spiritualité', level: 1, label: 'Niveau 1 — L\'Un',
          tpl: 'Le principe supérieur qui gouverne ce tirage : {TC}. {T}' },
        { name: 'Idées (1)', level: 2, label: 'Niveau 2 — La Dualité',
          tpl: 'Première idée-force : {TC}. {T}' },
        { name: 'Idées (2)', level: 2, label: 'Niveau 2 — La Dualité',
          tpl: 'Seconde idée-force : {TC}. {T}' },
        { name: 'Action (1)', level: 3, label: 'Niveau 3 — La Triade',
          tpl: 'Première impulsion d\'action : {TC}. {T}' },
        { name: 'Action (2)', level: 3, label: 'Niveau 3 — La Triade',
          tpl: 'Deuxième impulsion d\'action : {TC}. {T}' },
        { name: 'Action (3)', level: 3, label: 'Niveau 3 — La Triade',
          tpl: 'Troisième impulsion d\'action : {TC}. {T}' },
        { name: 'Concret (1)', level: 4, label: 'Niveau 4 — La Manifestation',
          tpl: 'Premier pilier de manifestation : {TC}. {T}' },
        { name: 'Concret (2)', level: 4, label: 'Niveau 4 — La Manifestation',
          tpl: 'Deuxième pilier de manifestation : {TC}. {T}' },
        { name: 'Concret (3)', level: 4, label: 'Niveau 4 — La Manifestation',
          tpl: 'Troisième pilier de manifestation : {TC}. {T}' },
        { name: 'Concret (4)', level: 4, label: 'Niveau 4 — La Manifestation',
          tpl: 'Quatrième pilier de manifestation : {TC}. {T}' }
      ],
      levels: [
        { level: 1, name: 'Spiritualité', desc: 'L\'essence spirituelle, le souffle premier qui initie toute chose.' },
        { level: 2, name: 'Idées', desc: 'Les archétypes et les conceptions qui émergent de l\'unité primordiale.' },
        { level: 3, name: 'Action', desc: 'La mise en mouvement, le passage de l\'idée à la volonté agissante.' },
        { level: 4, name: 'Concret', desc: 'La manifestation dans la matière, l\'incarnation tangible du chemin parcouru.' }
      ]
    }
  };

  /* ── Paires notables (combinaisons de 2 cartes) ───────────────────────── */
  var PAIRS = [
    /* Cycles et polarités fondamentales */
    { ids: ['01', '57'], label: 'Alpha · Oméga',
      text: 'Le cycle sacré dans sa plénitude : le commencement et l\'accomplissement se tiennent par la main. Ce qui a été initié par Alpha trouve sa consécration dans Oméga — la boucle est parfaite, le voyage est complet.' },
    { ids: ['14', '25'], label: 'Homme · Femme',
      text: 'L\'équilibre primordial du masculin et du féminin sacrés. L\'action et la réceptivité, la force et la douceur, le yang et le yin dansent en harmonie. Cette paire annonce une intégration profonde des polarités intérieures.' },
    { ids: ['33', '54'], label: 'Naissance · Mort',
      text: 'Le seuil des seuils : la vie qui émerge et la forme qui se dissout. Ces deux lames réunies parlent d\'un passage initiatique majeur — une renaissance qui exige d\'abord la fin d\'un ancien chapitre.' },

    /* Sagesse et connaissance */
    { ids: ['09', '18'], label: 'Sagesse · Science',
      text: 'La connaissance intérieure et le savoir extérieur s\'allient. La Sagesse apporte le discernement que la Science éclaire par la raison. Ensemble, elles forment une compréhension complète — ce que le cœur sait, l\'esprit l\'organise.' },
    { ids: ['09', '20'], label: 'Sagesse · Erreur',
      text: 'Le maître et l\'élève en une seule leçon. L\'Erreur enseigne ce que la Sagesse confirme : chaque faux pas est une école déguisée. Cette paire annonce qu\'une erreur passée ou à venir porte en elle un enseignement précieux.' },
    { ids: ['18', '50'], label: 'Science · Papyrus',
      text: 'Le savoir vivant rencontre la mémoire écrite. La Science explore, le Papyrus conserve. Cette alliance parle de la transmission du savoir, de l\'étude qui porte ses fruits, d\'une découverte qui mérite d\'être consignée.' },

    /* Amour et prospérité */
    { ids: ['15', '24'], label: 'Amour · Richesse',
      text: 'L\'abondance du cœur et l\'abondance matérielle se répondent. L\'Amour ouvre les vannes de la prospérité, la Richesse offre les moyens d\'aimer plus largement. Une période où donner et recevoir s\'équilibrent magnifiquement.' },
    { ids: ['15', '21'], label: 'Amour · Bénédiction',
      text: 'Le cœur touché par la grâce divine. L\'Amour trouve sa source sacrée dans la Bénédiction qui descend sur lui. Cette paire annonce une union protégée, une affection placée sous le regard bienveillant de l\'univers.' },

    /* Forces et conflits */
    { ids: ['23', '38'], label: 'Paix · Arme',
      text: 'L\'harmonie et le conflit en tension. La Paix appelle à la réconciliation là où l\'Arme signale un affrontement latent. Cette paire vous invite à choisir : déposer les armes pour retrouver la sérénité, ou défendre ce qui doit l\'être sans basculer dans la violence.' },
    { ids: ['28', '49'], label: 'Protection · Adversaire',
      text: 'Le bouclier face à l\'opposant. La Protection veille autour de vous pendant que l\'Adversaire se profile à l\'horizon. Cette configuration annonce un conflit que vous traversez protégé — restez vigilant sans céder à la peur.' },
    { ids: ['05', '17'], label: 'Eau · Énergie',
      text: 'La puissance émotionnelle et la force vitale se conjuguent. L\'Eau apporte la profondeur intuitive, l\'Énergie fournit l\'élan nécessaire à la manifestation. Une alliance puissante où les sentiments nourrissent l\'action au lieu de la freiner.' },

    /* Lumière et ombre */
    { ids: ['37', '08'], label: 'Lumière · Nadir',
      text: 'L\'éclat de la conscience au point le plus sombre du voyage. La Lumière promet la clarté, le Nadir rappelle l\'épreuve de l\'obscurité. Ensemble, elles racontent une traversée : la clarté qui naît de la confrontation avec l\'ombre est la plus précieuse qui soit.' },
    { ids: ['04', '32'], label: 'Mensonge · Illusion',
      text: 'Les voiles du faux qui s\'épaississent. Le Mensonge et l\'Illusion conjugués mettent en garde contre une tromperie profonde — de la part d\'autrui ou de vos propres perceptions. Le discernement est votre boussole la plus urgente.' },

    /* Cheminement et évolution */
    { ids: ['06', '36'], label: 'Racine · Voyage',
      text: 'L\'ancrage et le mouvement en équilibre. La Racine ancre dans les origines, le Voyage appelle vers l\'ailleurs. Cette paire parle d\'un départ qui n\'est pas une fuite, mais une exploration nourrie par la solidité de vos fondations.' },
    { ids: ['07', '43'], label: 'Porte · Clé',
      text: 'L\'ouverture et la solution se présentent ensemble. La Porte qui s\'entrouvre et la Clé qui la déverrouille — une configuration rare et puissante qui annonce une opportunité dont vous possédez déjà le moyen de la saisir.' },
    { ids: ['26', '10'], label: 'Épreuve · Réussite',
      text: 'Le défi qui précède le triomphe. L\'Épreuve dresse l\'obstacle, la Réussite en promet le dépassement. Cette paire annonce que les difficultés actuelles sont la rampe de lancement d\'un succès à venir — persévérez.' },

    /* Relations et liens sacrés */
    { ids: ['02', '56'], label: 'Isolement · Frère',
      text: 'La solitude et la fraternité en tension. L\'Isolement signale une période de retrait, le Frère annonce la présence d\'une alliance fidèle. Cette paire invite à reconnaître que même dans la traversée solitaire, une main fraternelle se tend quelque part.' },
    { ids: ['46', '30'], label: 'Sacrifice · Pardon',
      text: 'Le renoncement qui ouvre la voie de la libération. Le Sacrifice demande de déposer ce qui pèse, le Pardon offre la clé pour s\'en défaire définitivement. Ensemble, ils annoncent une guérison profonde par le lâcher-prise courageux.' },

    /* Temps et destin */
    { ids: ['47', '45'], label: 'Éternité · Temps',
      text: 'L\'infini et l\'éphémère en dialogue. L\'Éternité révèle ce qui ne passe pas, le Temps rappelle ce qui s\'écoule. Cette paire parle de la nécessité d\'honorer à la fois ce qui dure et ce qui doit être vécu pleinement dans l\'instant présent.' },
    { ids: ['34', '29'], label: 'Initiation · Élévation',
      text: 'L\'éveil qui conduit à l\'ascension. L\'Initiation ouvre les yeux sur une réalité plus vaste, l\'Élévation déploie les ailes pour s\'y engager. Une configuration de progrès spirituel rapide et profondément transformateur.' },

    /* Engagement et décision */
    { ids: ['12', '22'], label: 'Sceau · Choix',
      text: 'L\'engagement et la décision se font face. Le Sceau parle de ce qui est déjà scellé, le Choix rappelle que votre liberté demeure entière. Cette paire signale un moment de décision cruciale où un engagement passé doit être honoré ou renouvelé.' },
    { ids: ['19', '53'], label: 'Prière · Méditation',
      text: 'Les deux ailes de la contemplation. La Prière élève l\'âme vers le divin, la Méditation ramène au centre intérieur. Ensemble, elles annoncent une période de connexion spirituelle intense — le silence et la dévotion vous guident.' }
  ];

  /* ── Triades (combinaisons de 3 cartes) ───────────────────────────────── */
  var TRIADS = [
    /* Cycles de création */
    { ids: ['01', '03', '57'], label: 'Alpha · Delta · Oméga',
      text: 'La Trinité du cycle créateur : le commencement (Alpha), la transformation (Delta) et l\'accomplissement (Oméga). Cette triade sacrée révèle que vous êtes au cœur d\'un processus complet — ce qui a été semé se transforme pour aboutir à sa pleine réalisation. Un alignement cosmique rare qui parle d\'un destin en pleine floraison.' },
    { ids: ['01', '33', '57'], label: 'Alpha · Naissance · Oméga',
      text: 'Le cycle de vie intégral : l\'impulsion originelle, l\'émergence et l\'accomplissement. Cette triade annonce la clôture d\'un cycle majeur et la naissance simultanée d\'un nouveau. Rien ne se termine vraiment — tout se métamorphose.' },

    /* Union sacrée */
    { ids: ['14', '25', '55'], label: 'Homme · Femme · Fusion',
      text: 'Le chemin complet de l\'union sacrée : le masculin, le féminin et leur synthèse alchimique. Cette triade célèbre l\'intégration des polarités qui mène à la Fusion — que ce soit dans une relation, un projet ou votre être intérieur, les opposés s\'apprêtent à danser comme un seul corps.' },
    { ids: ['15', '23', '55'], label: 'Amour · Paix · Fusion',
      text: 'La trinité du cœur accompli : l\'Amour qui relie, la Paix qui apaise et la Fusion qui unifie. Une configuration d\'harmonie relationnelle exceptionnelle — les liens que vous tissez aujourd\'hui sont placés sous le signe de la complétude.' },

    /* Connaissance et sagesse */
    { ids: ['09', '18', '50'], label: 'Sagesse · Science · Papyrus',
      text: 'Le triangle de la connaissance accomplie : la Sagesse qui discerne, la Science qui explore et le Papyrus qui transmet. Cette triade parle d\'un savoir qui cherche à s\'incarner — étude, enseignement, écriture ou transmission sont au premier plan de votre chemin.' },

    /* Épreuves et traversée */
    { ids: ['20', '26', '27'], label: 'Erreur · Épreuve · Doute',
      text: 'Le triangle de l\'épreuve intérieure : l\'Erreur commise ou à venir, l\'Épreuve qui teste et le Doute qui ronge. Cette triade n\'est pas une malédiction mais un signal : vous traversez une période de fragilité où chaque pas semble incertain. La lucidité et l\'humilité sont vos alliées — cette traversée forge ceux qui ne s\'y perdent pas.' },
    { ids: ['02', '08', '42'], label: 'Isolement · Nadir · Désert',
      text: 'La trilogie de la traversée solitaire : l\'Isolement qui coupe du monde, le Nadir qui touche le fond et le Désert qui dépouille. Une configuration austère mais profondément initiatique — c\'est dans le vide le plus total que la voix intérieure devient enfin audible. Ne fuyez pas ce passage, il est le creuset d\'une renaissance.' },

    /* Décisions et opportunités */
    { ids: ['07', '22', '43'], label: 'Porte · Choix · Clé',
      text: 'Le triangle de l\'opportunité décisive : la Porte qui s\'ouvre, le Choix qui s\'impose et la Clé qui déverrouille. Une configuration dynamique qui annonce un carrefour majeur — tous les éléments sont réunis pour une décision éclairée qui changera le cours des choses.' },

    /* Puissance manifestée */
    { ids: ['05', '17', '37'], label: 'Eau · Énergie · Lumière',
      text: 'La triade de la puissance manifestée : l\'Eau des émotions profondes, l\'Énergie de la force vitale et la Lumière de la conscience éclairée. Quand ces trois forces s\'alignent, la création devient fluide et lumineuse — vos projets sont portés par un courant qui ne demande qu\'à couler.' },
    { ids: ['10', '24', '29'], label: 'Réussite · Richesse · Élévation',
      text: 'Le triangle de l\'accomplissement manifesté : la Réussite qui couronne, la Richesse qui abonde et l\'Élévation qui élève. Une configuration d\'expansion et de prospérité — ce que vous avez construit trouve sa reconnaissance et vous porte vers de nouveaux sommets.' },

    /* Spiritualité et connexion */
    { ids: ['19', '48', '53'], label: 'Prière · Âme · Méditation',
      text: 'La trinité de la connexion intérieure : la Prière qui élève, l\'Âme qui est et la Méditation qui centre. Ces trois lames parlent d\'un appel profond à l\'intériorité — votre vie spirituelle réclame votre attention, et le silence que vous lui offrirez sera largement récompensé en clarté et en paix.' },
    { ids: ['21', '28', '47'], label: 'Bénédiction · Protection · Éternité',
      text: 'Triangle de la grâce éternelle : la Bénédiction qui descend, la Protection qui enveloppe et l\'Éternité qui garantit. Une configuration sacrée qui annonce que vous êtes porté par des forces bienveillantes au-delà du temps — recevez cette grâce avec gratitude et confiance.' }
  ];

  /* ── Analyse des tonalités ─────────────────────────────────────────────── */
  function detectTonalBalance(cards) {
    var tones = { positive: 0, negative: 0, neutral: 0 };
    cards.forEach(function (c) {
      if (c && tones.hasOwnProperty(c.tone)) tones[c.tone]++;
    });

    var dominant = null, max = 0;
    for (var t in tones) {
      if (tones[t] > max) { max = tones[t]; dominant = t; }
    }

    var readings = {
      positive: 'Les lames positives dominent ce tirage : une énergie favorable, des forces bénéfiques à l\'œuvre, des ouvertures lumineuses. L\'univers semble conspirer en votre faveur.',
      negative: 'Les lames d\'ombre sont majoritaires : des défis, des avertissements, des traversées nécessaires. Ces cartes ne condamnent pas — elles éclairent ce qui doit être regardé en face pour être dépassé.',
      neutral: 'Les lames neutres dominent : la pondération et la réflexion sont de mise. Le tirage suggère une période d\'observation et de maturation — rien ne presse, tout se prépare.'
    };

    return { positive: tones.positive, negative: tones.negative, neutral: tones.neutral, dominant: dominant, count: max, total: cards.length, text: readings[dominant] || '' };
  }

  /* ── Utilitaires ────────────────────────────────────────────────────────── */
  function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getTheme(card) {
    if (!card) return '';
    return card.theme || '';
  }

  function applyLens(pos, card) {
    var t = card.theme || card.meaning || '';
    return pos.tpl.replace(/\{T\}/g, t).replace(/\{TC\}/g, cap(t));
  }

  /* ── Lookup ────────────────────────────────────────────────────────────── */
  function getCard(id) {
    return (window.triadeData || []).find(function (c) { return c.id === id; });
  }

  function getCardName(id) {
    var c = getCard(id);
    return c ? c.name : 'Inconnue';
  }

  function getCardTone(id) {
    var c = getCard(id);
    return c ? c.tone : '';
  }

  /* ── Détection des paires et triades ───────────────────────────────────── */
  function findPairs(cardIds) {
    if (!cardIds || !cardIds.length) return [];
    return PAIRS.filter(function (p) {
      return p.ids.every(function (id) { return cardIds.indexOf(id) !== -1; });
    });
  }

  function findTriads(cardIds) {
    if (!cardIds || !cardIds.length) return [];
    return TRIADS.filter(function (t) {
      return t.ids.every(function (id) { return cardIds.indexOf(id) !== -1; });
    });
  }

  /* ── Synthèse du tirage ────────────────────────────────────────────────── */
  function buildSynthesis(cards, pairs, triads) {
    var tonalInfo = detectTonalBalance(cards);

    var tonesSummary = '';
    if (tonalInfo.dominant === 'positive') {
      tonesSummary = 'Dominante positive (' + tonalInfo.positive + ' lames) : ' + tonalInfo.text;
    } else if (tonalInfo.dominant === 'negative') {
      tonesSummary = 'Dominante d\'ombre (' + tonalInfo.negative + ' lames) : ' + tonalInfo.text;
    } else if (tonalInfo.dominant === 'neutral') {
      tonesSummary = 'Dominante neutre (' + tonalInfo.neutral + ' lames) : ' + tonalInfo.text;
    } else {
      tonesSummary = 'Équilibre tonal : positives (' + tonalInfo.positive + '), négatives (' + tonalInfo.negative + '), neutres (' + tonalInfo.neutral + ').';
    }

    var pairsText = pairs.map(function (p) {
      return p.label + ' : ' + p.text;
    });

    var triadsText = triads.map(function (t) {
      return t.label + ' : ' + t.text;
    });

    var overallMessage = '';
    if (triads.length > 0) {
      overallMessage = 'Ce tirage est traversé par la constellation <strong>' + triads[0].label + '</strong>, qui en révèle la dynamique profonde : ' + triads[0].text + ' ';
    } else if (pairs.length > 0) {
      overallMessage = 'Les résonances <strong>' + pairs[0].label + '</strong>' + (pairs.length > 1 ? ' et <strong>' + pairs[1].label + '</strong>' : '') + ' éclairent les forces à l\'œuvre dans ce tirage. ';
    }

    overallMessage += tonalInfo.text + ' ';
    overallMessage += 'L\'Oracle de la Triade n\'est pas un verdict — c\'est un miroir tendu à votre âme au moment présent. Votre libre arbitre demeure la boussole suprême de votre chemin.';

    return {
      tonesSummary: tonesSummary,
      pairsText: pairsText,
      triadsText: triadsText,
      overallMessage: overallMessage
    };
  }

  /* ── Configuration des tirages ─────────────────────────────────────────── */
  function getSpreadConfig(type) {
    return SPREADS[type] || null;
  }

  /* ── Générateur principal ────────────────────────────────────────────────── */
  function generateReading(cards, spreadType) {
    var cfg = SPREADS[spreadType];
    if (!cfg || !cards || !cards.length) return null;

    var pairs  = findPairs(cards.map(function (c) { return c.id; }));
    var triads = findTriads(cards.map(function (c) { return c.id; }));
    var synth  = buildSynthesis(cards, pairs, triads);

    var positions = [];
    cards.forEach(function (card, i) {
      var pos = cfg.positions[i];
      if (!pos || !card) return;
      positions.push({
        position: pos.name,
        level: pos.level,
        label: pos.label,
        cardId: card.id,
        cardName: card.name,
        cardTone: card.tone,
        cardToneEmoji: card.toneEmoji || '',
        cardMeaning: card.meaning || '',
        cardTheme: card.theme || '',
        cardKeywords: card.keywords || [],
        interpretation: applyLens(pos, card)
      });
    });

    return {
      spreadType: spreadType,
      spreadName: cfg.name,
      spreadIntro: cfg.intro,
      positions: positions,
      pairs: pairs,
      triads: triads,
      synthesis: synth
    };
  }

  /* ── Génération HTML (optionnel, pour affichage) ──────────────────────── */
  function generateReadingHtml(cards, spreadType) {
    var reading = generateReading(cards, spreadType);
    if (!reading) return '';

    var html = '<div class="tr-section">'
      + '<div class="tr-header"><span class="tr-star">✦</span><h2 class="tr-title">Lecture de votre tirage — ' + reading.spreadName + '</h2></div>'
      + '<p class="tr-intro">' + reading.spreadIntro + '</p>'
      + '<div class="tr-divider"></div>';

    reading.positions.forEach(function (pos) {
      var toneClass = 'tr-tone-' + pos.cardTone;
      html += '<div class="tr-entry">'
        + '<div class="tr-entry-head">'
        + '<span class="tr-pos">' + pos.position + (pos.level ? ' (Niveau ' + pos.level + ')' : '') + '</span>'
        + '<span class="tr-card-nm">' + pos.cardToneEmoji + ' ' + pos.cardName + '</span>'
        + '<span class="tr-card-tone ' + toneClass + '">(' + cap(pos.cardTone) + ')</span>'
        + '</div>'
        + '<p class="tr-entry-text">' + pos.interpretation + '</p>'
        + '</div>';
    });

    if (reading.triads.length > 0) {
      html += '<div class="tr-divider"></div><h3 class="tr-sub">Constellations remarquables</h3>';
      reading.triads.forEach(function (t) {
        html += '<div class="tr-pair tr-triad">'
          + '<span class="tr-pair-lbl">✦ ' + t.label + '</span>'
          + '<p class="tr-pair-txt">' + t.text + '</p>'
          + '</div>';
      });
    }

    if (reading.pairs.length > 0) {
      html += '<div class="tr-divider"></div><h3 class="tr-sub">Résonances notables</h3>';
      reading.pairs.forEach(function (p) {
        html += '<div class="tr-pair">'
          + '<span class="tr-pair-lbl">' + p.label + '</span>'
          + '<p class="tr-pair-txt">' + p.text + '</p>'
          + '</div>';
      });
    }

    html += '<div class="tr-divider"></div>'
      + '<h3 class="tr-sub">Synthèse</h3>'
      + '<p class="tr-synth">' + reading.synthesis.tonesSummary + '</p>';

    if (reading.synthesis.triadsText.length > 0) {
      reading.synthesis.triadsText.forEach(function (t) {
        html += '<p class="tr-synth-triad">' + t + '</p>';
      });
    }
    if (reading.synthesis.pairsText.length > 0) {
      reading.synthesis.pairsText.forEach(function (p) {
        html += '<p class="tr-synth-pair">' + p + '</p>';
      });
    }

    html += '<p class="tr-synth-overall">' + reading.synthesis.overallMessage + '</p>'
      + '</div>';

    return html;
  }

  return {
    generateReading: generateReading,
    generateReadingHtml: generateReadingHtml,
    findPairs: findPairs,
    findTriads: findTriads,
    getCardName: getCardName,
    getCardTone: getCardTone,
    buildSynthesis: buildSynthesis,
    getSpreadConfig: getSpreadConfig,
    SPREADS: SPREADS
  };
})();
