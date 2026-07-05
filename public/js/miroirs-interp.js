/* Moteur d'interprétation des tirages — Oracle des Miroirs (Dimitri d'Alfange d'Uvril) */
window.miroirsInterp = (function () {

  /* ── Configurations des tirages ────────────────────────────────────────── */
  var SPREADS = {
    'trois-cartes': {
      intro: 'Trois miroirs pour une introspection profonde : le passé qui a façonné, le présent qui vibre, l\'avenir qui se dessine. L\'Oracle des Miroirs ne prédit pas — il reflète votre vérité intérieure et vous aide à comprendre les dynamiques qui traversent votre existence.',
      positions: [
        { name: 'Miroir du Passé', shadow: false,
          tpl: 'Les racines de votre situation plongent dans {T}. Ce miroir vous renvoie l\'image de ce qui a été — une influence qui continue d\'agir en vous, consciemment ou non, et dont la compréhension éclaire votre présent.' },
        { name: 'Miroir du Présent', shadow: false,
          tpl: '{TC} — voilà l\'énergie qui gouverne votre instant présent. Ce miroir reflète votre état actuel, les forces en jeu et ce que vous devez regarder en face pour avancer avec clarté.' },
        { name: 'Miroir du Futur', shadow: false,
          tpl: 'La direction qui émerge est placée sous le signe de {T}. Ce miroir ne prédit pas un destin figé mais révèle une tendance probable — une invitation à modeler consciemment votre avenir.' },
      ],
    },
    'croix': {
      intro: 'La Croix des Reflets déploie cinq miroirs en étoile pour une analyse nuancée. Au centre, votre vérité. À gauche, ce qui vous porte. À droite, ce qui vous défie. En haut, votre idéal. En bas, vos fondations. Un paysage complet de votre situation.',
      positions: [
        { name: 'Le Cœur du Sujet', shadow: false,
          tpl: 'Vous êtes placé sous le signe de {T}. Ce miroir central reflète votre positionnement actuel — votre essence, vos motivations profondes et l\'énergie qui vous définit dans cette situation.' },
        { name: 'Ce qui vous Soutient', shadow: false,
          tpl: 'Un soutien se manifeste à travers {T}. Ce miroir révèle les forces qui vous accompagnent — personnes, ressources ou qualités intérieures sur lesquelles vous pouvez vous appuyer.' },
        { name: 'Ce qui vous Défie', shadow: false,
          tpl: '{TC} représente le défi qui se dresse devant vous. Ce miroir ne cache rien de ce qui vous oppose : regardez-le avec courage, car il recèle la clé de votre dépassement.' },
        { name: 'L\'Idéal à Atteindre', shadow: false,
          tpl: 'Votre idéal se dessine dans {T}. Ce miroir élève votre regard vers le potentiel supérieur — ce que vous pouvez devenir si vous honorez votre vérité profonde.' },
        { name: 'Le Fondement', shadow: true,
          tpl: 'Les fondations reposent sur {T}. Ce miroir sonde vos profondeurs — l\'inconscient, les racines cachées, ce qui sous-tend toute la situation sans toujours se montrer au grand jour.' },
      ],
    },
    'miroir': {
      intro: 'Le Tirage du Miroir déploie neuf cartes en un carré sacré — trois lignes pour trois niveaux de conscience. Cet arrangement permet une analyse complète de votre destinée, telle que la reflète l\'Oracle des Miroirs dans sa plus vaste expression.',
      positions: [
        { name: 'Miroir du Passé', shadow: false,
          tpl: 'Les racines de votre chemin sont imprégnées de {T}. Ce miroir révèle l\'héritage du passé qui continue de façonner silencieusement votre présent.' },
        { name: 'Miroir du Présent', shadow: false,
          tpl: '{TC} colore votre réalité immédiate. Ce miroir reflète l\'état actuel de votre être et les circonstances qui vous entourent en ce moment.' },
        { name: 'Miroir du Futur', shadow: false,
          tpl: 'L\'horizon s\'annonce sous le signe de {T}. Ce miroir projette la tendance qui se dessine — non comme une fatalité, mais comme un potentiel à conscientiser.' },
        { name: 'Miroir des Forces', shadow: false,
          tpl: 'Vos forces vives sont incarnées par {T}. Ce miroir célèbre vos ressources intérieures et les appuis extérieurs qui vous rendent capable de traverser toute épreuve.' },
        { name: 'Miroir du Cœur', shadow: false,
          tpl: 'Le cœur de votre être vibre de {T}. Ce miroir central reflète votre état émotionnel profond, vos désirs véritables et ce qui fait battre votre âme.' },
        { name: 'Miroir des Défis', shadow: false,
          tpl: 'Les défis qui vous attendent portent le visage de {T}. Ce miroir montre les obstacles à surmonter — non pour vous décourager, mais pour vous y préparer.' },
        { name: 'Miroir des Fondations', shadow: true,
          tpl: 'Les fondations de votre être s\'enracinent dans {T}. Ce miroir sonde les couches profondes — votre inconscient, vos croyances fondamentales et le socle sur lequel tout repose.' },
        { name: 'Miroir des Relations', shadow: false,
          tpl: '{TC} teinte vos relations. Ce miroir éclaire les dynamiques affectives et sociales — ce que vous attirez, ce que vous donnez, ce que vous recevez.' },
        { name: 'Miroir de la Destinée', shadow: false,
          tpl: 'La synthèse de toutes ces forces s\'exprime à travers {T}. Ce miroir final révèle le message unifié que l\'Oracle vous adresse — la direction sacrée de votre chemin.' },
      ],
    },
  };

  /* ── Résonances notables (paires de cartes Miroirs) ────────────────────── */
  var PAIRS = [
    /* Amour et relations */
    { ids: ['13','06'], label: 'Amour · Femme',
      text: 'L\'Amour et la Femme s\'unissent pour révéler une puissante énergie féminine dans votre vie amoureuse. Intuition, douceur et passion se conjuguent — une relation profonde et nourrissante se dessine.' },
    { ids: ['13','07'], label: 'Amour · Homme',
      text: 'L\'Amour rencontre l\'Homme : une rencontre décisive avec une figure masculine ou l\'éveil de votre principe masculin dans la relation. Action et cœur s\'allient pour un amour constructif.' },
    { ids: ['13','14'], label: 'Amour · Amitié',
      text: 'L\'Amour et l\'Amitié se reflètent mutuellement — la plus belle des relations naît souvent d\'une amitié sincère. Une complicité rare où le cœur et la loyauté se renforcent.' },
    { ids: ['06','07'], label: 'Femme · Homme',
      text: 'Le miroir de la Femme et de l\'Homme révèle l\'union sacrée du masculin et du féminin. En vous ou autour de vous, ces deux principes cherchent l\'équilibre et l\'harmonie.' },
    { ids: ['13','32'], label: 'Amour · Bouclier',
      text: 'L\'Amour protégé par le Bouclier : une relation où les limites saines permettent un amour durable. Vous apprenez à aimer sans vous perdre, à vous ouvrir sans vous exposer.' },
    { ids: ['21','45'], label: 'Séparation · Retour',
      text: 'La Séparation et le Retour dansent ensemble — ce qui s\'éloigne peut revenir transformé. Une rupture n\'est peut-être qu\'une pause dans un cycle plus vaste de votre histoire.' },

    /* Succès et prospérité */
    { ids: ['46','39'], label: 'Chance · Victoire',
      text: 'La Chance et la Victoire forment un duo éclatant — le destin vous sourit et le triomphe est à portée de main. Tout ce que vous entreprenez est porté par des vents favorables.' },
    { ids: ['31','39'], label: 'Évolution · Victoire',
      text: 'L\'Évolution mène à la Victoire : votre croissance personnelle est la clé de votre succès. Chaque pas intérieur franchi se traduit par une avancée concrète dans votre vie.' },
    { ids: ['02','18'], label: 'Fécondité · Argent',
      text: 'La Fécondité et l\'Argent annoncent une période d\'abondance matérielle. Projets fertiles, rentrées financières, investissements qui portent leurs fruits — la prospérité est au rendez-vous.' },
    { ids: ['15','18'], label: 'Travail · Argent',
      text: 'Le Travail et l\'Argent se reflètent : vos efforts professionnels génèrent une juste rétribution. La valeur de votre travail est reconnue — matériellement et symboliquement.' },
    { ids: ['39','50'], label: 'Victoire · Cadeau',
      text: 'La Victoire et le Cadeau célèbrent une réussite inattendue. Un succès arrive par surprise, un accomplissement est récompensé au-delà de vos espérances.' },

    /* Défis et avertissements */
    { ids: ['19','43'], label: 'Jalousie · Trahison',
      text: 'La Jalousie et la Trahison forment un miroir douloureux — attention aux dynamiques toxiques dans votre entourage. Ces cartes vous avertissent d\'une situation où la confiance est en péril.' },
    { ids: ['36','41'], label: 'Enfermement · Instabilité',
      text: 'L\'Enfermement et l\'Instabilité se répondent : vous oscillez entre le sentiment d\'être prisonnier et l\'incapacité à trouver un ancrage stable. Le miroir vous invite à chercher l\'équilibre entre sécurité et liberté.' },
    { ids: ['30','51'], label: 'Échec · Culpabilité',
      text: 'L\'Échec et la Culpabilité s\'entrelacent — un revers passé que vous ne vous pardonnez pas continue de peser. Ce miroir vous invite à transformer la leçon en sagesse plutôt qu\'en fardeau.' },
    { ids: ['33','34'], label: 'Accusation · Verdict',
      text: 'L\'Accusation suivie du Verdict : une situation de jugement est en cours. Que vous soyez juge ou accusé, la vérité finira par émerger — préparez-vous à l\'entendre avec intégrité.' },
    { ids: ['25','42'], label: 'Fatalité · Retard',
      text: 'La Fatalité et le Retard signalent que certaines choses ne peuvent être précipitées. Ce qui est inévitable suivra son cours — votre défi est d\'accepter le rythme imposé par le destin.' },

    /* Transformation et évolution */
    { ids: ['01','31'], label: 'Hérédité · Évolution',
      text: 'L\'Hérédité rencontre l\'Évolution : vous transformez un héritage familial en force personnelle. Les schémas du passé se métamorphosent sous l\'impulsion de votre conscience.' },
    { ids: ['12','31'], label: 'Changement · Évolution',
      text: 'Le Changement et l\'Évolution dansent ensemble — une transformation profonde est en cours. Vous n\'êtes plus la même personne qu\'hier, et demain vous réserve encore des métamorphoses.' },
    { ids: ['03','52'], label: 'Naissance · Miroir Magique',
      text: 'La Naissance sous la protection du Miroir Magique : un nouveau départ béni, un commencement placé sous les meilleurs auspices. La magie de la vie opère en votre faveur.' },
    { ids: ['35','52'], label: 'Clairvoyance · Miroir Magique',
      text: 'La Clairvoyance et le Miroir Magique forment le duo le plus intuitif de l\'oracle. Votre vision est décuplée, votre guidance intérieure est infaillible — faites-lui une confiance absolue.' },

    /* Paix et guérison */
    { ids: ['47','49'], label: 'Joie · Tranquillité',
      text: 'La Joie et la Tranquillité réunies — un bonheur paisible, une sérénité joyeuse. Le calme après la tempête, la paix qui suit la bataille. Savourez cet instant de grâce.' },
    { ids: ['10','49'], label: 'Santé · Tranquillité',
      text: 'La Santé et la Tranquillité se renforcent mutuellement : votre bien-être physique et votre paix intérieure sont liés. Prenez soin de l\'un pour guérir l\'autre.' },
    { ids: ['32','36'], label: 'Bouclier · Enfermement',
      text: 'Le Bouclier et l\'Enfermement vous avertissent qu\'une protection excessive devient prison. Vos défenses, érigées pour vous protéger, risquent de vous isoler du monde et de vous-même.' },
    { ids: ['40','44'], label: 'Ouverture · Carrefour',
      text: 'L\'Ouverture au Carrefour : un choix s\'offre à vous, et chaque direction mène vers des possibilités nouvelles. Le moment est venu de décider, mais toutes les portes sont ouvertes.' },
  ];

  /* ── Triades (combinaisons de 3 cartes) ───────────────────────────────── */
  var TRIADS = [
    { ids: ['13','46','47'], label: 'Amour · Chance · Joie',
      text: 'Triade du bonheur amoureux : l\'Amour, la Chance et la Joie forment une constellation exceptionnelle pour la vie affective. Une rencontre providentielle ou une renaissance sentimentale éclatante.' },
    { ids: ['19','21','43'], label: 'Jalousie · Séparation · Trahison',
      text: 'Triade de la rupture douloureuse : trois énergies sombres qui signalent une crise affective majeure. Ce triangle n\'est pas une fatalité — il révèle ce qui doit être guéri pour que l\'amour renaisse.' },
    { ids: ['03','31','39'], label: 'Naissance · Évolution · Victoire',
      text: 'Trinité du succès évolutif : un nouveau départ, une croissance continue et un triomphe final. Votre chemin est tracé — chaque étape vous rapproche de votre accomplissement.' },
    { ids: ['01','09','45'], label: 'Hérédité · Famille · Retour',
      text: 'Triade des racines familiales : l\'héritage, les liens du sang et le retour aux sources. Une dynamique familiale profonde est à l\'œuvre — guérison transgénérationnelle en cours.' },
    { ids: ['35','11','52'], label: 'Clairvoyance · Rêve · Miroir Magique',
      text: 'Triade de l\'éveil intuitif : la lucidité, le songe et la magie s\'unissent. Votre conscience s\'ouvre à des dimensions supérieures — les messages de l\'invisible vous parviennent avec une clarté inédite.' },
    { ids: ['30','42','46'], label: 'Échec · Retard · Chance',
      text: 'Triade du renversement : après l\'échec et l\'attente vient la chance. Ce qui semblait perdu se retourne en votre faveur. La patience et l\'apprentissage portent leurs fruits.' },
    { ids: ['15','18','29'], label: 'Travail · Argent · Contrat',
      text: 'Triade de la réalisation professionnelle : l\'effort, la prospérité et l\'engagement se conjuguent. Un projet aboutit, un contrat se signe, votre carrière franchit un cap décisif.' },
    { ids: ['06','07','48'], label: 'Femme · Homme · Réunion',
      text: 'Triade de l\'union sacrée : les principes féminin et masculin se rassemblent. Une rencontre déterminante, une réconciliation majeure ou l\'harmonisation de vos polarités intérieures.' },
    { ids: ['04','47','50'], label: 'Enfant · Joie · Cadeau',
      text: 'Triade de la grâce innocente : la spontanéité de l\'Enfant, la légèreté de la Joie et la surprise du Cadeau. Un moment de pur bonheur, simple et désintéressé, vous est offert.' },
    { ids: ['36','40','44'], label: 'Enfermement · Ouverture · Carrefour',
      text: 'Triade de la libération : l\'enfermement cède face à l\'ouverture quand vous acceptez de choisir. Vous êtes à la croisée des chemins — la porte de sortie existe, il suffit de la franchir.' },
  ];

  /* ── Analyse des tonalités dominantes ────────────────────────────────────── */
  function detectTonalBalance(cards) {
    var tones = { 'positive': 0, 'negative': 0, 'neutral': 0 };
    cards.forEach(function (c) {
      var effTone = getEffectiveTone(c);
      if (tones.hasOwnProperty(effTone)) tones[effTone]++;
    });

    var dominant = null, max = 0;
    for (var t in tones) {
      if (tones[t] > max) { max = tones[t]; dominant = t; }
    }

    var readings = {
      'positive': 'Les miroirs positifs dominent ce tirage : une lumière bienveillante éclaire votre chemin. Les énergies favorables se reflètent dans votre vie — accueillez-les avec gratitude.',
      'negative': 'Les miroirs difficiles sont majoritaires : des ombres, des défis et des avertissements occupent le premier plan. L\'Oracle ne prédit pas le malheur — il éclaire ce qui demande votre attention pour être transformé.',
      'neutral': 'Les miroirs neutres dominent : la pondération et l\'observation sont de mise. Ce tirage vous invite au recul et à la réflexion avant d\'agir.'
    };

    return { dominant: dominant, count: max, total: cards.length, text: readings[dominant] || '' };
  }

  /* ── Utilitaires ────────────────────────────────────────────────────────── */
  function isReversed(card) {
    return !!(card && card.isReversed);
  }

  function getTheme(card, useShadow) {
    if (!card) return '';
    if (isReversed(card)) useShadow = !useShadow;
    return useShadow ? (card.shadow || card.theme) : card.theme;
  }

  function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getEffectiveTone(card) {
    if (!card) return '';
    var t = card.tone;
    if (!isReversed(card)) return t;
    if (t === 'positive') return 'négative';
    if (t === 'négative') return 'positive';
    return t;
  }

  function applyLens(pos, card) {
    var t = getTheme(card, !!pos.shadow);
    var orientation = isReversed(card) ? ' (inversée)' : '';
    return pos.tpl.replace(/\{T\}/g, t).replace(/\{TC\}/g, cap(t)) + orientation;
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

  /* ── Détection des familles ─────────────────────────────────────────────── */
  function detectFamilies(cards) {
    var families = { 'thématique': 0, 'relation': 0, 'défi': 0 };
    cards.forEach(function(c) {
      if (c.family && families.hasOwnProperty(c.family)) families[c.family]++;
    });

    var dominant = null, max = 0;
    for (var f in families) {
      if (families[f] > max) { max = families[f]; dominant = f; }
    }

    if (!dominant || max < 2) return null;

    var labels = { 'thématique': 'miroirs thématiques', 'relation': 'miroirs relationnels', 'défi': 'miroirs de défi' };
    var intros = {
      'thématique': 'Les miroirs thématiques dominent ce tirage : votre attention est tournée vers les grands thèmes de l\'existence — identité, évolution, spiritualité. L\'Oracle vous invite à une réflexion profonde sur le sens de votre parcours.',
      'relation': 'Les miroirs relationnels colorent ce tirage : vos liens affectifs, familiaux et sociaux sont au cœur de la lecture. Les dynamiques humaines qui vous entourent méritent toute votre attention.',
      'défi': 'Les miroirs de défi sont majoritaires : l\'Oracle pointe les obstacles, les choix et les épreuves qui jalonnent votre route. Ces cartes ne sont pas des condamnations mais des invitations à vous dépasser.'
    };

    return '<em>Famille dominante — ' + labels[dominant] + ' (' + max + '/' + cards.length + '). ' + intros[dominant] + '</em> ';
  }

  /* ── Synthèse du tirage ────────────────────────────────────────────────── */
  function buildSynthesis(cards, spreadType, pairs, triads, tonalInfo) {
    var text = '';
    var revCount = cards.filter(function(c) { return isReversed(c); }).length;

    if (spreadType === 'trois-cartes') {
      var f = cards[0], l = cards[2], m = cards[1];
      text = 'Ce tirage trace un arc de <strong>' + f.name + '</strong>' + (isReversed(f) ? ' (inversée)' : '') + ' (' + getTheme(f, false) + ') jusqu\'à <strong>' + l.name + '</strong>' + (isReversed(l) ? ' (inversée)' : '') + ' (' + getTheme(l, false) + '). '
           + 'Le miroir du présent, <strong>' + m.name + '</strong>' + (isReversed(m) ? ' (inversée)' : '') + ', est le point pivot — c\'est ici que votre conscience peut agir pour transformer la trajectoire. ';
    } else if (spreadType === 'croix') {
      var centre = cards[0], haut = cards[3], bas = cards[4];
      text = 'Au cœur de la Croix des Reflets, <strong>' + centre.name + '</strong>' + (isReversed(centre) ? ' (inversée)' : '') + ' (' + getTheme(centre, false) + ') définit votre vérité actuelle. '
           + 'Entre l\'idéal de <strong>' + haut.name + '</strong> et les fondations de <strong>' + bas.name + '</strong>' + (isReversed(bas) ? ' (inversée)' : '') + ', votre chemin se dessine avec clarté. ';
    } else if (spreadType === 'miroir') {
      var dest = cards[8], coeur = cards[4];
      text = 'Ce grand miroir à neuf facettes révèle un chemin riche et complexe. Au cœur, <strong>' + coeur.name + '</strong>' + (isReversed(coeur) ? ' (inversée)' : '') + ' (' + getTheme(coeur, false) + ') bat comme le pouls de votre être. '
           + 'Tout converge vers la destinée marquée par <strong>' + dest.name + '</strong>' + (isReversed(dest) ? ' (inversée)' : '') + ' (' + getTheme(dest, false) + ') — le message ultime de l\'Oracle pour votre chemin. ';
    }

    if (revCount > 0) {
      text += '<em>' + revCount + ' carte' + (revCount > 1 ? 's' : '') + ' inversée' + (revCount > 1 ? 's' : '') + ' : l\'énergie est intériorisée, contrariée ou appelle une attention particulière. Une carte inversée n\'est pas un mauvais présage — c\'est une invitation à explorer l\'envers du miroir. </em>';
    }

    if (tonalInfo && tonalInfo.dominant) {
      text += tonalInfo.text + ' ';
    }

    var familyText = detectFamilies(cards);
    if (familyText) text += familyText;

    if (triads.length > 0) {
      text += 'La constellation <strong>' + triads[0].label + '</strong> est particulièrement significative : ' + triads[0].text + ' ';
    } else if (pairs.length > 0) {
      var labels = pairs.slice(0, 2).map(function (p) { return p.label; }).join(' et ');
      text += (pairs.length === 1 ? 'La résonance ' : 'Les résonances ') + labels + ' amplifient ce message. ';
    }

    text += 'L\'Oracle des Miroirs ne dicte pas votre destin — il vous tend un reflet de votre âme. Votre libre arbitre reste le miroir le plus puissant de votre existence.';
    return text;
  }

  /* ── Générateur principal ────────────────────────────────────────────────── */
  function generateReading(spreadType, cards) {
    var cfg = SPREADS[spreadType];
    if (!cfg || !cards || !cards.length) return '';

    var pairs  = detectPairs(cards);
    var triads = detectTriads(cards);
    var tonalInfo = detectTonalBalance(cards);

    var html = '<div class="tr-section">'
      + '<div class="tr-header"><span class="tr-star">✦</span><h2 class="tr-title">Lecture de votre tirage Miroirs</h2></div>'
      + '<p class="tr-intro">' + cfg.intro + '</p>'
      + '<div class="tr-divider"></div>';

    cards.forEach(function (card, i) {
      var pos = cfg.positions[i];
      if (!pos) return;
      var revLabel = isReversed(card) ? ' <span class="tr-rev">(inversée)</span>' : '';
      html += '<div class="tr-entry">'
        + '<div class="tr-entry-head">'
        + '<span class="tr-pos">' + pos.name + '</span>'
        + '<span class="tr-card-nm">' + card.toneEmoji + ' ' + card.name + revLabel + '</span>'
        + '<span class="tr-card-planet">(' + cap(getEffectiveTone(card)) + ')</span>'
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
      + '<p class="tr-synth">' + buildSynthesis(cards, spreadType, pairs, triads, tonalInfo) + '</p>';

    if (window.PlateformePartage) {
      var nomTirage = spreadType.split('-').map(cap).join(' ');
      var config = {
        type: 'tirage',
        titre: 'Lecture de votre tirage Miroirs',
        sousTitre: nomTirage,
        cartes: cards.map(function (c) { return { nom: c.name, image: '/images/oracles/miroirs/card_' + String(c.id).padStart(2, '0') + '.webp' }; })
      };
      html += window.PlateformePartage.construireBoutonsHTML(config);
    }

    html += '</div>';

    return html;
  }

  /* ── Lecture par plan ─────────────────────────────────────────────────── */
  function generatePlaneReading(spreadType, cards, plane) {
    if (!window.miroirsPlanes) return '';
    var proj = window.miroirsPlanes.projectSpread(cards, plane);
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
    if (!window.miroirsPlanes) return '';
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
    if (window.miroirsPlanes) {
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
