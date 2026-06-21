/* Moteur d'interprétation — Yi King (Livre des Mutations) */
window.yiKingInterp = (function () {

  var SPREADS = {
    'trois-hexagrammes': {
      intro: 'Trois temps d\'une même quête : le passé qui a préparé, le présent qui agit, le futur qui se dessine. La sagesse millénaire du Yi King éclaire chaque étape de votre chemin.',
      positions: [
        { name: 'Le Passé', tpl: 'Le passé est marqué par {N} — {T}. Cette influence fondatrice a préparé le terrain de votre situation actuelle. Comprendre cette racine, c\'est déjà s\'en libérer.' },
        { name: 'Le Présent', tpl: '{TC} — telle est l\'énergie qui gouverne ce moment. C\'est le cœur vivant de votre question, les forces à l\'œuvre ici et maintenant. Accueillez cette vérité.' },
        { name: 'Le Futur', tpl: 'La trajectoire s\'oriente vers {T}. Ce n\'est pas un destin figé mais une indication de la direction naturelle — le Yi King éclaire, votre libre arbitre décide.' },
      ],
    },
    'mutation': {
      intro: 'Le tirage par mutation est le cœur vivant du Yi King. L\'hexagramme de départ révèle la situation actuelle, le trait mutant indique ce qui est en train de basculer, et l\'hexagramme d\'arrivée montre le paysage qui se dessine si vous accompagnez cette transformation.',
      positions: [
        { name: 'Hexagramme de départ', tpl: 'Votre situation actuelle est sous le signe de {N} — {T}. Voici le paysage intérieur et extérieur dans lequel vous vous trouvez en ce moment. Cet hexagramme décrit la configuration énergétique qui est la vôtre.' },
        { name: 'Hexagramme d\'arrivée', tpl: 'L\'évolution mène vers {N} — {T}. Si vous accompagnez consciemment la mutation en cours, voici la configuration vers laquelle vous tendez. Ce n\'est pas une fatalité mais une trajectoire probable si vous dansez avec le changement.' },
      ],
    },
    'simple': {
      intro: 'Un seul hexagramme, une seule réponse — concentrée et directe. Le Yi King vous livre ici l\'essence de sa sagesse pour éclairer votre question avec la force de quatre millénaires.',
      positions: [
        { name: 'L\'Hexagramme', tpl: '{TC} — voici le message central du Yi King pour vous. Méditez cet hexagramme, laissez sa sagesse millénaire infuser dans votre conscience et guider vos pas.' },
      ],
    },
  };

  /* ── Signification des traits mutants ───────────────────────────────────── */
  var LINE_MEANINGS = {
    1: {
      name: 'Le Fondement',
      desc: 'la racine de la situation, les commencements, ce qui est encore souterrain',
      reveals: 'que le changement part de la base même de votre situation. Les fondations bougent — c\'est le moment de repenser vos assises avant de construire plus haut.',
    },
    2: {
      name: 'Le Champ intérieur',
      desc: 'les relations proches, l\'espace intime, la vie intérieure',
      reveals: 'que la mutation touche votre sphère la plus personnelle : vos relations, votre foyer, votre équilibre intérieur. Quelque chose change dans votre façon d\'être avec vous-même et vos proches.',
    },
    3: {
      name: 'La Transition',
      desc: 'le passage à l\'action, l\'hésitation féconde, le seuil entre deux états',
      reveals: 'que vous êtes au point de bascule entre l\'ancien et le nouveau. L\'hésitation que vous ressentez est le signe avant-coureur d\'un mouvement décisif. Franchissez le seuil.',
    },
    4: {
      name: 'Le Service',
      desc: 'l\'influence sur les autres, le rôle social, la responsabilité extérieure',
      reveals: 'que le changement impacte votre place dans le monde et votre relation aux autres. Votre rôle évolue, votre façon de servir ou d\'influencer se redessine.',
    },
    5: {
      name: 'Le Souverain',
      desc: 'la gouvernance, le centre décisionnel, l\'axe de pouvoir',
      reveals: 'que c\'est votre capacité à décider, à trancher, à gouverner votre vie qui se transforme. Le centre de gravité se déplace — une nouvelle autorité intérieure émerge.',
    },
    6: {
      name: 'L\'Achèvement',
      desc: 'le dépassement, la sagesse qui conclut, ou l\'excès qui avertit',
      reveals: 'que la mutation touche à l\'aboutissement ou au dépassement. Un cycle touche à sa fin ou un excès appelle à la retenue. La sagesse est de savoir quand s\'arrêter.',
    },
  };

  function describeMutation(lineNum) {
    var line = LINE_MEANINGS[lineNum] || LINE_MEANINGS[1];
    return '<div class="tr-divider"></div>'
      + '<div class="tr-entry tr-mutation-entry">'
      + '<div class="tr-entry-head">'
      + '<span class="tr-pos tr-mutation-pos">⚊ ↔ ⚋ Trait mutant — Ligne ' + lineNum + '</span>'
      + '<span class="tr-card-nm">' + line.name + '</span>'
      + '</div>'
      + '<p class="tr-entry-text tr-mutation-text">'
      + 'La mutation se produit à la <strong>' + lineNum + '<sup>e</sup> ligne</strong>, celle de <strong>' + line.name + '</strong> — ' + line.desc + '. '
      + 'C\'est ici que le mouvement s\'enclenche, que l\'énergie se retourne, que l\'ancien devient le nouveau. '
      + 'Cette ligne est le pivot du changement : tout ce qui suit en découle.'
      + '</p>'
      + '<p class="tr-mutation-reveals">'
      + '<span class="tr-mutation-icon">☯</span> '
      + '<em>Ce que cette mutation révèle :</em> ' + line.reveals
      + '</p>'
      + '</div>';
  }

  var PAIRS = [
    { ids: ['01','02'], label: 'Le Créateur · Le Réceptif',
      text: 'L\'union primordiale du yang et du yin, du ciel et de la terre. Toute création naît de cette polarité — la force d\'agir et la sagesse d\'accueillir sont en parfait équilibre.' },
    { ids: ['11','12'], label: 'La Paix · La Stagnation',
      text: 'Quand la Paix et la Stagnation se côtoient, le message est clair : les cycles alternent inexorablement. Profitez de l\'harmonie sans vous y attacher, traversez le blocage sans désespérer.' },
    { ids: ['63','64'], label: 'L\'Achèvement · L\'Inachèvement',
      text: 'Le dernier et l\'avant-dernier hexagramme ensemble : tout achèvement contient le germe d\'un nouveau commencement, tout inachèvement est une promesse. La roue tourne éternellement.' },
    { ids: ['29','30'], label: 'L\'Insondable · Ce qui s\'attache',
      text: 'L\'eau et le feu, le danger et la clarté. Traversez les profondeurs de l\'Insondable avec le courage du cœur véritable, puis attachez-vous à la lumière pour éclairer votre route.' },
    { ids: ['05','06'], label: 'L\'Attente · Le Conflit',
      text: 'L\'alternative entre patience et confrontation. L\'Attente conseille la confiance sereine, le Conflit avertit des tensions. À vous de choisir la voie juste selon les circonstances.' },
    { ids: ['24','44'], label: 'Le Retour · La Rencontre',
      text: 'Le retour du yang et la rencontre inattendue. Quelque chose revient dans votre vie au moment même où surgit une rencontre nouvelle — les cycles et le hasard se répondent.' },
    { ids: ['15','16'], label: 'La Modestie · L\'Enthousiasme',
      text: 'Deux attitudes complémentaires : l\'humilité qui tempère la grandeur et l\'enthousiasme qui soulève les montagnes. Trouvez l\'équilibre entre ces deux forces pour avancer avec justesse.' },
    { ids: ['07','13'], label: 'L\'Armée · La Communauté',
      text: 'L\'organisation disciplinée et le rassemblement fraternel. La force du collectif structuré peut accomplir ce qu\'aucun individu seul ne peut — unissez vos forces à celles des autres.' },
    { ids: ['03','04'], label: 'La Difficulté Initiale · La Folie Juvénile',
      text: 'Les deux hexagrammes des commencements : le chaos de la naissance et l\'inexpérience de la jeunesse. Tout début est difficile et maladroit — persévérez, l\'apprentissage fait son œuvre.' },
    { ids: ['41','42'], label: 'La Diminution · L\'Augmentation',
      text: 'Le cycle du don et de la réception. Ce qui diminue ici augmente là-bas — la perte et le gain sont les deux faces d\'une même pièce. Acceptez la loi naturelle des vases communicants.' },
    { ids: ['49','50'], label: 'La Révolution · Le Chaudron',
      text: 'La révolution qui transforme et le chaudron qui sublime. Après le grand changement vient le temps de la transformation alchimique — ce qui a été renversé peut maintenant être transmué en or.' },
    { ids: ['51','52'], label: 'L\'Éveilleur · L\'Immobilité',
      text: 'Le choc qui réveille et l\'immobilité qui apaise. Après la secousse du tonnerre vient le silence de la montagne — l\'éveil mène à la paix intérieure si vous l\'accueillez.' },
    { ids: ['09','26'], label: 'Le Pouvoir du Faible · Le Pouvoir du Grand',
      text: 'La petite force de persuasion et la grande puissance accumulée. Selon le moment, utilisez l\'influence subtile ou la force maîtrisée — les deux sont des pouvoirs, chacun a son heure.' },
    { ids: ['35','36'], label: 'Le Progrès · L\'Obscurcissement',
      text: 'La lumière qui monte et la lumière qui se cache. Le Progrès annonce l\'avancée, l\'Obscurcissement conseille la prudence. Le sage sait quand briller et quand se retirer.' },
    { ids: ['37','38'], label: 'La Famille · L\'Opposition',
      text: 'L\'harmonie domestique et la divergence des perspectives. La Famille et l\'Opposition racontent la tension entre l\'intime et le social — ce qui unit à la maison peut diviser au dehors.' },
  ];

  var TRIADS = [
    { ids: ['01','02','64'], label: 'Créateur · Réceptif · Inachèvement',
      text: 'La trinité fondamentale du Yi King : le yang créateur, le yin réceptif, et le devenir toujours ouvert. Tout est possible entre ces trois pôles — créez, accueillez, laissez advenir.' },
    { ids: ['03','04','05'], label: 'Difficulté Initiale · Folie Juvénile · Attente',
      text: 'La trilogie des commencements : le chaos initial, l\'apprentissage nécessaire, et la patience confiante. Tout projet traverse ces trois phases — honorez chacune d\'elles.' },
    { ids: ['11','63','12'], label: 'Paix · Achèvement · Stagnation',
      text: 'Le cycle complet : l\'harmonie qui s\'accomplit puis se fige. Cette triade rappelle que toute paix accomplie contient le germe de la stagnation. Restez vigilant même dans les moments fastes.' },
    { ids: ['24','25','26'], label: 'Retour · Innocence · Pouvoir du Grand',
      text: 'La renaissance, la pureté d\'intention et la force accumulée. Un renouveau porté par un cœur sincère et une puissance patiemment construite — triple bénédiction du ciel.' },
    { ids: ['46','47','48'], label: 'Ascension · Épuisement · Puits',
      text: 'Monter, s\'épuiser, puiser aux sources. L\'ascension mène parfois à l\'épuisement, mais le puits de la sagesse intérieure est toujours là pour vous régénérer. La source est en vous.' },
    { ids: ['57','58','61'], label: 'Le Doux · La Sérénité · La Vérité Intérieure',
      text: 'L\'influence subtile, la joie partagée et la sincérité du cœur. La triade de l\'harmonie parfaite : agissez avec douceur, cultivez la joie, parlez depuis votre vérité profonde.' },
    { ids: ['33','39','40'], label: 'Retraite · Obstacle · Libération',
      text: 'Se retirer face à l\'obstacle pour mieux se libérer. La sagesse consiste parfois à reculer devant la difficulté — ce n\'est pas une défaite mais une stratégie qui prépare la libération.' },
    { ids: ['55','56','62'], label: 'Abondance · Voyageur · Petite Démesure',
      text: 'L\'abondance précède souvent le voyage, et le voyage enseigne l\'attention aux détails. Profitez de la plénitude avant de reprendre la route — chaque petit geste comptera.' },
  ];

  function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function applyLens(pos, card) {
    var name = card.name + ' (' + card.chineseName + ')';
    var t = card.theme || card.meaning || '';
    return pos.tpl.replace(/\{T\}/g, t).replace(/\{TC\}/g, cap(t)).replace(/\{N\}/g, name);
  }

  function detectPairs(cards) {
    var ids = cards.map(function(c) { return c.id; });
    return PAIRS.filter(function(p) {
      return p.ids.every(function(id) { return ids.indexOf(id) !== -1; });
    }).slice(0, 3);
  }

  function detectTriads(cards) {
    var ids = cards.map(function(c) { return c.id; });
    return TRIADS.filter(function(t) {
      return t.ids.every(function(id) { return ids.indexOf(id) !== -1; });
    }).slice(0, 2);
  }

  function buildSynthesis(cards, spreadType, pairs, triads, options) {
    var text = '';
    if (spreadType === 'trois-hexagrammes') {
      text = 'Ce tirage trace un arc depuis <strong>' + cards[0].name + '</strong> (' + cards[0].chineseName + ') jusqu\'à <strong>' + cards[2].name + '</strong> (' + cards[2].chineseName + '). '
           + 'L\'hexagramme du présent, <strong>' + cards[1].name + '</strong> (' + cards[1].chineseName + '), est le pivot — c\'est lui qui révèle comment le chemin d\'hier mène au destin de demain. ';
    } else if (spreadType === 'mutation') {
      var start = cards[0], arrive = cards[1];
      var line = (options && options.mutatingLine) ? options.mutatingLine : 1;
      var lineName = (LINE_MEANINGS[line] && LINE_MEANINGS[line].name) || 'le Fondement';
      var lineOrdinal = line + '<sup>e</sup>';
      text = '<strong>L\'arc de transformation : du ' + start.name + ' (' + start.chineseName + ') au ' + arrive.name + ' (' + arrive.chineseName + ')</strong>. '
           + 'Le déclencheur se situe à la ' + lineOrdinal + ' ligne — <em>' + lineName + '</em>. '
           + 'La situation décrite par <strong>' + start.name + '</strong> (' + start.theme + ') est en train de se muer vers <strong>' + arrive.name + '</strong> (' + arrive.theme + '). '
           + 'Ce mouvement n\'est ni un hasard ni une fatalité : il exprime la dynamique vivante de votre situation. '
           + 'La transformation révèle que ce qui était contenu dans le premier hexagramme cherche à s\'exprimer dans le second — comme une graine devient plante. '
           + 'Votre rôle n\'est pas de subir ce changement mais de <strong>l\'accompagner en conscience</strong> : '
           + 'reconnaissez ce qui meurt dans la situation de départ, accueillez ce qui naît dans l\'hexagramme d\'arrivée, et soyez le témoin actif de cette métamorphose. ';
    } else if (spreadType === 'simple') {
      text = 'Le <strong>' + cards[0].name + '</strong> (' + cards[0].chineseName + ') est la réponse concentrée du Yi King à votre question. '
           + 'Méditez sa sagesse — chaque mot de cet hexagramme éclaire un aspect de votre situation. ';
    }
    if (triads.length > 0) {
      text += 'La constellation <strong>' + triads[0].label + '</strong> est particulièrement révélatrice : ' + triads[0].text + ' ';
    } else if (pairs.length > 0) {
      var labels = pairs.slice(0, 2).map(function(p) { return p.label; }).join(' et ');
      text += (pairs.length === 1 ? 'La résonance ' : 'Les résonances ') + '<strong>' + labels + '</strong> amplifient ce message. ';
    }
    text += 'Le Yi King ne prédit pas l\'avenir — il éclaire le moment présent. À vous de faire de cette sagesse millénaire un guide vivant pour vos choix.';
    return text;
  }

  function generateReading(spreadType, cards, options) {
    var cfg = SPREADS[spreadType];
    if (!cfg || !cards || !cards.length) return '';

    var pairs  = detectPairs(cards);
    var triads = detectTriads(cards);

    var html = '<div class="tr-section">'
      + '<div class="tr-header"><span class="tr-star">☯</span><h2 class="tr-title">Lecture de votre tirage Yi King</h2></div>'
      + '<p class="tr-intro">' + cfg.intro + '</p>';

    // Pour le tirage par mutation : insérer le trait mutant AVANT les hexagrammes
    if (spreadType === 'mutation' && options && options.mutatingLine) {
      html += describeMutation(options.mutatingLine);
    }

    html += '<div class="tr-divider"></div>';

    cards.forEach(function(card, i) {
      var pos = cfg.positions[i];
      if (!pos) return;
      html += '<div class="tr-entry">'
        + '<div class="tr-entry-head">'
        + '<span class="tr-pos">' + pos.name + '</span>'
        + '<span class="tr-card-nm">' + card.trigrams + ' ' + card.name + ' (' + card.chineseName + ')</span>'
        + '</div>'
        + '<p class="tr-entry-text">' + applyLens(pos, card) + '</p>'
        + '</div>';
    });

    if (triads.length > 0) {
      html += '<div class="tr-divider"></div><h3 class="tr-sub">Constellation remarquable</h3>';
      triads.forEach(function(t) {
        html += '<div class="tr-pair tr-triad">'
          + '<span class="tr-pair-lbl">' + t.label + '</span>'
          + '<p class="tr-pair-txt">' + t.text + '</p>'
          + '</div>';
      });
    }

    if (pairs.length > 0) {
      html += '<div class="tr-divider"></div><h3 class="tr-sub">Résonances notables</h3>';
      pairs.forEach(function(p) {
        html += '<div class="tr-pair">'
          + '<span class="tr-pair-lbl">' + p.label + '</span>'
          + '<p class="tr-pair-txt">' + p.text + '</p>'
          + '</div>';
      });
    }

    html += '<div class="tr-divider"></div>'
      + '<h3 class="tr-sub">Synthèse</h3>'
      + '<p class="tr-synth">' + buildSynthesis(cards, spreadType, pairs, triads, options) + '</p>'
      + '</div>';

    return html;
  }

  function generatePlaneReading(spreadType, cards, plane) {
    if (!window.yiKingPlanes) return '';
    var proj = window.yiKingPlanes.projectSpread(cards, plane);
    if (!proj) return '';

    var planeIcons = { personnel: '☾', professionnel: '☉', relationnel: '♡' };

    var html = '<div class="tr-plane-section" data-plane="' + plane + '">'
      + '<div class="tr-plane-header">'
      + '<span class="tr-plane-icon">' + (planeIcons[plane] || '✦') + '</span>'
      + '<h3 class="tr-plane-title">Lecture sur le plan ' + proj.planeLabel + '</h3>'
      + '</div>'
      + '<p class="tr-plane-intro">' + proj.intro + '</p>'
      + '<div class="tr-plane-entries">';

    proj.entries.forEach(function(entry) {
      html += '<div class="tr-plane-entry">'
        + '<div class="tr-plane-entry-head">'
        + '<span class="tr-plane-pos">' + entry.cardName + '</span>'
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
    if (!window.yiKingPlanes) return '';
    var planes = ['personnel', 'professionnel', 'relationnel'];
    var html = '<div class="tr-planes-wrapper">'
      + '<div class="tr-planes-tabs">'
      + '<button class="tr-plane-tab active" data-plane="personnel">☾ Personnel</button>'
      + '<button class="tr-plane-tab" data-plane="professionnel">☉ Professionnel</button>'
      + '<button class="tr-plane-tab" data-plane="relationnel">♡ Relationnel</button>'
      + '</div>'
      + '<div class="tr-planes-content">';
    planes.forEach(function(p, i) {
      html += '<div class="tr-plane-pane' + (i === 0 ? ' active' : '') + '" data-plane="' + p + '">'
        + generatePlaneReading(spreadType, cards, p)
        + '</div>';
    });
    html += '</div></div>';
    return html;
  }

  function generateReadingWithPlanes(spreadType, cards, options) {
    var html = generateReading(spreadType, cards, options);
    if (window.yiKingPlanes) {
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
