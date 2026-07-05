window.runesInterp = (function () {

  var SPREADS = {
    'trois-runes': {
      intro: "Les trois Nornes — Urðr, Verðandi et Skuld — tissent ensemble le fil de votre destinée. La première rune dévoile ce qui fut, la deuxième éclaire ce qui est, la troisième chuchote ce qui sera. Le passé prépare, le présent agit, le futur s'esquisse — trois temps, un seul chemin.",
      positions: [
        { name: "Le Passé — Urðr", shadow: false,
          tpl: "Ce qui fut a laissé son empreinte dans {T}. Cette énergie a tissé la trame de votre présent — reconnaître son influence, c'est déjà commencer à s'en libérer ou à l'honorer." },
        { name: "Le Présent — Verðandi", shadow: false,
          tpl: "{TC} — telle est la force qui gouverne ce moment. C'est le cœur vivant de votre question, les énergies à l'œuvre et la vérité que votre âme cherche à entendre." },
        { name: "Le Futur — Skuld", shadow: false,
          tpl: "La trame qui se tisse s'annonce sous le signe de {T}. Ce n'est pas un destin écrit dans la pierre, mais une direction probable — un conseil ou un avertissement pour éclairer votre route." },
      ],
    },
    'croix': {
      intro: "Cinq runes disposées selon les branches de l'Arbre Monde Yggdrasil. Ce tirage sacré révèle les forces en jeu, les obstacles cachés et les voies possibles. Chaque branche de l'arbre éclaire un aspect de votre quête.",
      positions: [
        { name: "Le Consultant — Situation", shadow: false,
          tpl: "Votre position actuelle vibre sous le signe de {T}. C'est l'énergie qui vous définit dans cette situation — votre ancrage et les forces que vous incarnez en ce moment." },
        { name: "Le Passé — Origines", shadow: false,
          tpl: "Ce qui vient d'hier porte la marque de {T}. Une influence du passé qui continue d'agir sur le présent — la comprendre, c'est dénouer le fil du temps." },
        { name: "Le Futur — Devenir", shadow: false,
          tpl: "La direction qui se dessine est {T}. Considérez-la comme une indication des Nornes, non comme une fatalité — votre liberté reste entière face au destin." },
        { name: "L'Obstacle — Défi", shadow: true,
          tpl: "L'obstacle prend le visage de {T}. Il n'est pas là pour vous arrêter, mais pour vous révéler ce que la voie facile n'aurait pas enseigné. Ce qui résiste est un maître." },
        { name: "La Synthèse — Vue d'ensemble", shadow: false,
          tpl: "{TC} est l'énergie maîtresse de ce tirage. Elle colore l'ensemble des runes et révèle la vibration profonde — tout s'articule autour d'elle comme les branches autour du tronc." },
      ],
    },
    'etoile': {
      intro: "Sept runes en constellation, comme les sept branches maîtresses d'Yggdrasil qui touchent les différents ciels. Chaque rune éclaire un domaine de votre existence — une carte complète de votre ciel intérieur se dessine.",
      positions: [
        { name: "Le Centre — Cœur du tirage", shadow: false,
          tpl: "Au cœur de cette constellation runique, {T} rayonne comme l'énergie centrale. Tout découle de cette influence fondamentale qui colore l'ensemble du tirage." },
        { name: "Les Finances — Matérialité", shadow: false,
          tpl: "Sur le plan matériel, {T} indique la dynamique en cours. Ressources, dépenses, prospérité — lisez ici la signature financière que les runes tracent pour vous." },
        { name: "Les Sentiments — Amour", shadow: false,
          tpl: "Dans le domaine du cœur, {T} dessine la carte émotionnelle. C'est le pouls de vos relations et l'état de votre vie affective — l'écho des cœurs dans le grand tissage." },
        { name: "La Santé — Vitalité", shadow: false,
          tpl: "Votre vitalité est marquée par {T}. C'est un indicateur de votre équilibre physique et énergétique — écoutez ce que votre corps exprime à travers ce symbole." },
        { name: "Le Travail — Carrière", shadow: false,
          tpl: "Dans votre vie professionnelle, {T} est la force agissante. Carrière, vocation, projets en cours — c'est ici que se forge votre contribution au monde." },
        { name: "La Spiritualité — Sens", shadow: false,
          tpl: "Sur le plan spirituel, {T} vous guide. C'est l'appel de votre âme, la direction invisible qui donne du sens au reste — le murmure d'Odin dans le vent." },
        { name: "Le Résultat — Aboutissement", shadow: false,
          tpl: "La résultante de toutes ces forces converge vers {T}. C'est l'aboutissement — le message final que les runes adressent à votre conscience." },
      ],
    },
  };

  var PAIRS = [
    { ids: ['01','02'], label: 'Fehu · Uruz',
      text: "Abondance et Force primale : la prospérité de Fehu est soutenue par la vitalité d'Uruz. Richesse et puissance se conjuguent — une période d'expansion matérielle portée par une énergie vitale débordante. Ce que vous construisez tient sur des fondations solides." },
    { ids: ['01','07'], label: 'Fehu · Gebo',
      text: "Richesse et Don : l'abondance circule dans un équilibre parfait. Ce que vous recevez, vous le donnerez ; ce que vous donnez vous reviendra. Une alliance financière ou un partenariat prospère se dessine, fondé sur la réciprocité généreuse." },
    { ids: ['02','16'], label: 'Uruz · Sowilo',
      text: "Force triomphante : la puissance sauvage d'Uruz est illuminée par le Soleil de Sowilo. Victoire éclatante dans une épreuve physique ou une transformation personnelle. La santé rayonne, l'énergie culmine — vous êtes inarrêtable." },
    { ids: ['03','15'], label: 'Thurisaz · Algiz',
      text: "Protection dans l'épreuve : l'épine et l'élan se conjuguent pour vous défendre. Une menace est contenue, un conflit est protégé par une force supérieure. La bataille est rude mais vous n'êtes pas seul — un bouclier invisible veille." },
    { ids: ['04','06'], label: 'Ansuz · Kenaz',
      text: "Révélation illuminée : la parole inspirée d'Ansuz rencontre le feu de la connaissance de Kenaz. Une vérité profonde émerge, une idée créatrice s'illumine. La communication devient révélation, le savoir devient sagesse." },
    { ids: ['04','21'], label: 'Ansuz · Laguz',
      text: "Message de l'inconscient : la parole divine plonge dans les eaux profondes de l'intuition. Un rêve, une synchronicité ou une vision vous parle — écoutez. L'inconscient envoie un message que votre esprit rationnel doit apprendre à déchiffrer." },
    { ids: ['05','19'], label: 'Raidho · Ehwaz',
      text: "Voyage en confiance : le mouvement de Raidho est porté par la fidélité d'Ehwaz. Un voyage ou un changement se fait en bonne compagnie. Partenariat de route, progression à deux — vous n'avancez pas seul." },
    { ids: ['06','08'], label: 'Kenaz · Wunjo',
      text: "Illumination joyeuse : la torche de la connaissance éclaire la fête de Wunjo. Une découverte créative apporte une joie profonde. Le travail inspiré trouve sa récompense dans l'accomplissement heureux. Célébrez ce que vous avez compris." },
    { ids: ['07','08'], label: 'Gebo · Wunjo',
      text: "Don joyeux et alliance heureuse : l'équilibre du don rencontre la plénitude de la joie. Une relation ou un partenariat apporte un bonheur authentique et partagé. La générosité mène à la célébration — union bénie par les runes." },
    { ids: ['09','10'], label: 'Hagalaz · Nauthiz',
      text: "Crise du besoin : la destruction rencontre la nécessité. Une épreuve brutale révèle un manque profond. Mais cette traversée du chaos est aussi une forge : ce qui résiste à la tempête et au feu devient inaltérable." },
    { ids: ['09','11'], label: 'Hagalaz · Isa',
      text: "Tempête figée : la destruction et l'immobilité se conjuguent. Une crise est bloquée, un chaos reste suspendu. Le gel après la grêle — une période de paralysie qui prépare une clarification nécessaire. Rien ne bouge, mais tout se décante." },
    { ids: ['10','12'], label: 'Nauthiz · Jera',
      text: "Besoin patient récompensé : la contrainte de Nauthiz trouve sa résolution dans le cycle de Jera. Ce qui vous manque maintenant viendra en son temps. La patience dans l'épreuve prépare une moisson abondante." },
    { ids: ['12','22'], label: 'Jera · Ingwaz',
      text: "Double moisson : le cycle accompli et la gestation silencieuse. Une récolte arrive pendant qu'une autre semence germe déjà. Abondance présente et future — la terre de votre vie est fertile, continuez à la cultiver." },
    { ids: ['13','15'], label: 'Eihwaz · Algiz',
      text: "Protection sacrée et sagesse profonde : l'arbre-monde et l'élan gardien unissent leurs forces. Une guidance spirituelle puissante vous est offerte. Initiation protégée — vous pouvez descendre dans les profondeurs, un gardien veille." },
    { ids: ['14','21'], label: 'Perthro · Laguz',
      text: "Mystère des profondeurs : le destin et l'intuition se rencontrent. Les secrets que recèle votre inconscient sont sur le point d'émerger. Faites confiance au flux — ce que le hasard dévoile est un message de votre âme profonde." },
    { ids: ['16','24'], label: 'Sowilo · Dagaz',
      text: "Aube éclatante : le soleil triomphe et l'aube se lève. Une renaissance lumineuse après une période sombre. La victoire est totale, le nouveau cycle s'ouvre dans la clarté. Rien ne peut plus vous arrêter — la lumière est partout." },
    { ids: ['17','16'], label: 'Tiwaz · Sowilo',
      text: "Victoire éclatante de la justice : l'honneur de Tyr est illuminé par le Soleil. Un combat juste aboutit à un triomphe éclatant. La cause que vous défendez l'emportera — intégrité et succès ne font qu'un." },
    { ids: ['18','22'], label: 'Berkano · Ingwaz',
      text: "Double fertilité : la naissance et la gestation se conjuguent. Un nouveau projet émerge pendant qu'un autre mûrit en silence. L'énergie créatrice féminine et masculine s'harmonisent — période de grande fécondité dans tous les domaines." },
    { ids: ['20','23'], label: 'Mannaz · Othala',
      text: "Conscience des racines : l'identité personnelle rencontre l'héritage ancestral. Vous êtes l'aboutissement d'une lignée — comprendre d'où vous venez éclaire qui vous êtes. Un travail sur les mémoires familiales est favorisé." },
    { ids: ['03','17'], label: 'Thurisaz · Tiwaz',
      text: "Épreuve et Justice : le conflit rencontre l'honneur. Une bataille difficile mais juste vous attend. L'épine blesse mais la lance de Tyr montre la voie noble. Combattez avec intégrité — la victoire sera morale avant d'être matérielle." },
  ];

  var TRIADS = [
    { ids: ['01','02','03'], label: 'Fehu · Uruz · Thurisaz',
      text: "Le cycle créateur de l'Ætt de Freya : abondance, force et épreuve. La richesse naît de la puissance vitale et se forge dans l'adversité. Ce que vous créez maintenant traversera des défis — mais la vitalité d'Uruz vous porte et la prospérité de Fehu vous attend au bout du chemin." },
    { ids: ['04','06','08'], label: 'Ansuz · Kenaz · Wunjo',
      text: "La triade de l'esprit : inspiration, illumination et joie. La parole inspirée éclaire la connaissance qui mène au bonheur. Une révélation approche — elle allumera en vous une compréhension qui débouchera sur un accomplissement joyeux." },
    { ids: ['07','19','08'], label: 'Gebo · Ehwaz · Wunjo',
      text: "L'alliance heureuse : le don, la confiance et la joie. Un partenariat fondé sur la générosité et la fidélité apporte un bonheur durable. L'union — amoureuse ou professionnelle — est bénie par cette triade exceptionnellement favorable." },
    { ids: ['09','10','11'], label: 'Hagalaz · Nauthiz · Isa',
      text: "L'hiver de l'âme : destruction, besoin et gel. Une traversée difficile où tout semble s'effondrer, manquer et se figer. Mais l'hiver précède toujours le printemps — cette triade annonce la fin d'un cycle douloureux, non son éternité. Tenez bon, le dégel viendra." },
    { ids: ['13','14','15'], label: 'Eihwaz · Perthro · Algiz',
      text: "Le voyage chamanique protégé : mystère, destin et gardien. Une initiation profonde est en cours — vous voyagez dans les mondes invisibles, guidé et protégé. Les secrets se dévoilent, le destin se révèle, et un gardien veille sur chaque pas." },
    { ids: ['16','24','12'], label: 'Sowilo · Dagaz · Jera',
      text: "La moisson solaire : victoire, éveil et récolte. Après le triomphe vient la renaissance, puis la moisson. Un cycle complet s'achève dans la lumière — tout ce que vous avez semé, combattu et espéré trouve maintenant son aboutissement." },
    { ids: ['17','18','19'], label: 'Tiwaz · Berkano · Ehwaz',
      text: "L'équilibre sacré : justice masculine, naissance féminine et partenariat. Le guerrier, la mère et le cheval — trois forces qui s'équilibrent. Un projet exige à la fois courage, patience et coopération. Les trois sont présents : avancez." },
    { ids: ['20','21','23'], label: 'Mannaz · Laguz · Othala',
      text: "Les racines de l'âme : conscience, intuition et héritage. Plongez dans les eaux de l'inconscient pour retrouver votre héritage spirituel. Qui vous êtes vraiment se révèle à la croisée de votre histoire personnelle et de votre sagesse intuitive." },
    { ids: ['05','13','19'], label: 'Raidho · Eihwaz · Ehwaz',
      text: "Le grand voyage : mouvement, connexion et confiance. Un périple transformateur vous attend — physique ou intérieur. L'arbre-monde vous relie à votre destination, le cheval vous y porte fidèlement. Le voyage est la destination." },
    { ids: ['02','06','21'], label: 'Uruz · Kenaz · Laguz',
      text: "La forge de la conscience : force brute, feu de la connaissance et eau de l'intuition. Les trois éléments primordiaux se combinent pour une transformation profonde. Votre puissance instinctive est éclairée par la compréhension et guidée par l'intuition." },
  ];

  function getEffectiveTone(card) {
    if (card && card.isReversed && card.canReverse) {
      if (card.tone === 'positive') return 'negative';
      if (card.tone === 'negative') return 'positive';
    }
    return card.tone || 'neutral';
  }

  function getEffectiveText(card) {
    if (card && card.isReversed && card.canReverse) {
      return card.reversed || card.meaning;
    }
    return card.meaning;
  }

  function applyLens(card, pos) {
    var text;
    if (pos.shadow) {
      text = card.shadow || card.theme;
    } else if (card.isReversed && card.canReverse) {
      text = card.reversed || card.meaning;
    } else {
      text = card.theme || card.meaning;
    }
    return text;
  }

  function capFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function detectSpecialCards(cards, spreadType) {
    var cardIds = cards.map(function(c) { return c.id; });
    var pairs = [];
    var triads = [];
    var tones = [];
    var aetts = [];

    cards.forEach(function(c) {
      tones.push(getEffectiveTone(c));
      aetts.push(c.aett || '');
    });

    PAIRS.forEach(function(pair) {
      var matchCount = 0;
      pair.ids.forEach(function(pid) {
        if (cardIds.indexOf(pid) >= 0) matchCount++;
      });
      if (matchCount >= 2) pairs.push(pair);
    });

    TRIADS.forEach(function(triad) {
      var matchCount = 0;
      triad.ids.forEach(function(tid) {
        if (cardIds.indexOf(tid) >= 0) matchCount++;
      });
      if (matchCount >= 3) triads.push(triad);
    });

    var dominantTone;
    var posCount = tones.filter(function(t) { return t === 'positive'; }).length;
    var negCount = tones.filter(function(t) { return t === 'negative'; }).length;
    var neuCount = tones.filter(function(t) { return t === 'neutral'; }).length;
    if (posCount > negCount && posCount > neuCount) dominantTone = 'positive';
    else if (negCount > posCount && negCount > neuCount) dominantTone = 'negative';
    else dominantTone = 'neutral';

    var uniqueAetts = [];
    aetts.forEach(function(a) { if (uniqueAetts.indexOf(a) < 0) uniqueAetts.push(a); });
    var dominantAett = uniqueAetts.length === 1 ? uniqueAetts[0] : null;

    var allReversed = cards.filter(function(c) { return c.isReversed && c.canReverse; }).length;

    return {
      pairs: pairs,
      triads: triads,
      dominantTone: dominantTone,
      dominantAett: dominantAett,
      posCount: posCount,
      negCount: negCount,
      neuCount: neuCount,
      allReversed: allReversed
    };
  }

  function generateReading(spreadType, cards) {
    var spread = SPREADS[spreadType];
    if (!spread) return '<div class="tr-message">Type de tirage inconnu.</div>';

    var specials = detectSpecialCards(cards, spreadType);
    var html = '';

    html += '<div class="tr-message tr-message-intro">';
    html += '<p>' + spread.intro + '</p>';
    html += '</div>';

    html += '<div class="tr-message">';

    for (var i = 0; i < spread.positions.length; i++) {
      var pos = spread.positions[i];
      var card = cards[i];
      if (!card) continue;

      var effectiveTone = getEffectiveTone(card);
      var toneLabel = effectiveTone === 'positive' ? 'positive' : (effectiveTone === 'negative' ? 'negative' : 'neutre');
      var isRev = card.isReversed && card.canReverse;
      var lensText = applyLens(card, pos);
      var tplText = pos.tpl;
      tplText = tplText.replace(/\{TC\}/g, capFirst(lensText));
      tplText = tplText.replace(/\{T\}/g, lensText);

      html += '<div class="tr-position" style="margin-bottom:1.5rem;padding:1rem;border-left:3px solid var(--gold);background:rgba(218,165,32,0.03);border-radius:0 6px 6px 0;">';
      html += '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">';
      html += '<span style="font-size:1.8rem;color:var(--gold);">' + (card.runeChar || '') + '</span>';
      html += '<div>';
      html += '<strong style="color:var(--emerald);">' + pos.name + '</strong>';
      html += ' <span style="color:var(--text-muted);font-family:var(--font-mono);">— ' + card.name + ' (' + toneLabel + ')</span>';
      if (isRev) html += ' <span class="tr-rev">Merkstave</span>';
      html += '</div></div>';
      html += '<p style="color:var(--text);line-height:1.7;margin:0;">' + tplText + '</p>';
      html += '</div>';
    }

    html += '</div>';

    if (specials.pairs.length > 0 || specials.triads.length > 0) {
      html += '<div class="tr-combos">';
      html += '<h3 style="color:var(--gold);font-family:var(--font-mono);font-size:1rem;margin-bottom:1rem;">◇ Résonances runiques</h3>';

      specials.pairs.forEach(function(pair) {
        html += '<div class="tr-combo-item">';
        html += '<span class="tr-combo-label">' + pair.label + '</span>';
        html += '<p>' + pair.text + '</p>';
        html += '</div>';
      });

      specials.triads.forEach(function(triad) {
        html += '<div class="tr-combo-item">';
        html += '<span class="tr-combo-label" style="color:var(--emerald);">▼ ' + triad.label + '</span>';
        html += '<p>' + triad.text + '</p>';
        html += '</div>';
      });

      html += '</div>';
    }

    html += '<div class="tr-special">';

    var aettNames = { freyja: "l'Ætt de Freya (création et vie)", heimdall: "l'Ætt de Heimdall (épreuves et chaos)", tyr: "l'Ætt de Tyr (divin et justice)" };
    if (specials.dominantAett) {
      html += '<div class="tr-special-item" style="border-left-color:var(--emerald);">Toutes les runes appartiennent à ' + (aettNames[specials.dominantAett] || specials.dominantAett) + '. Ce tirage est fortement coloré par les énergies de cet ætt.</div>';
    }

    if (specials.dominantTone === 'positive') {
      html += '<div class="tr-special-item" style="border-left-color:var(--gold);">Tonalité dominante positive — les forces lumineuses prédominent dans ce tirage. Les runes vous sourient, l\'élan est favorable. Avancez avec confiance.</div>';
    } else if (specials.dominantTone === 'negative') {
      html += '<div class="tr-special-item" style="border-left-color:var(--rose);">Tonalité dominante négative — les runes signalent une période de traversée. Ce n\'est pas une malédiction, c\'est une invitation à la vigilance et au travail intérieur. L\'ombre précède toujours la lumière.</div>';
    } else {
      html += '<div class="tr-special-item" style="border-left-color:var(--violet);">Tonalité neutre — les forces s\'équilibrent. Le tirage est une invitation à l\'observation plus qu\'à l\'action. Laissez les énergies se décanter avant de trancher.</div>';
    }

    if (specials.allReversed > 0) {
      html += '<div class="tr-special-item" style="border-left-color:var(--orange);">' + specials.allReversed + ' rune(s) en position Merkstave — des énergies bloquées ou intériorisées. L\'obstacle n\'est pas extérieur : il est dans le regard que vous portez. Retournez la perspective.</div>';
    }

    html += '</div>';

    html += '<div class="tr-synthesis">';
    html += '<h3 style="color:var(--gold);font-family:var(--font-mono);font-size:1rem;margin-bottom:0.8rem;">◇ Synthèse du tirage</h3>';

    if (spreadType === 'trois-runes') {
      var pastTone = getEffectiveTone(cards[0]);
      var presentTone = getEffectiveTone(cards[1]);
      var futureTone = getEffectiveTone(cards[2]);
      if (pastTone === 'negative' && presentTone === 'neutral' && futureTone === 'positive') {
        html += '<p>Un chemin de guérison se dessine : le passé fut lourd, le présent est un sas, le futur s\'éclaire. Vous êtes dans le passage — honorez-le. Les Nornes tissent une renaissance.</p>';
      } else if (pastTone === 'positive' && futureTone === 'positive') {
        html += '<p>Les Nornes tissent une continuité lumineuse. Ce qui fut bon se prolonge et s\'amplifie. Vous êtes porté par un courant favorable — ne résistez pas, laissez-vous porter.</p>';
      } else if (pastTone === 'negative' && presentTone === 'negative' && futureTone === 'negative') {
        html += '<p>L\'hiver de l\'âme — un temps de traversée où tout semble lourd. Mais les runes ne mentent pas : elles disent que cette saison prépare une moisson que vous ne voyez pas encore. Tenez bon, le cycle tournera.</p>';
      } else {
        html += '<p>Les trois temps se répondent en une mélodie complexe. Les Nornes ne livrent pas leur secret d\'un seul regard — méditez chaque rune et laissez le sens émerger dans le silence. Le fil se déroule à son rythme.</p>';
      }
    } else if (spreadType === 'croix') {
      var obstacleTone = getEffectiveTone(cards[3]);
      var syntheseTone = getEffectiveTone(cards[4]);
      if (obstacleTone === 'positive') {
        html += '<p>L\'obstacle est lumineux — le défi n\'est pas une menace mais un appel à grandir. La Synthèse confirme que ce qui semble vous bloquer est en réalité votre plus grand allié pour évoluer.</p>';
      } else if (syntheseTone === 'positive') {
        html += '<p>Malgré les ombres que certaines runes révèlent, la Synthèse est lumineuse. Yggdrasil penche ses branches vers la lumière — le dénouement sera favorable, foi de l\'Arbre-Monde.</p>';
      } else {
        html += '<p>Les cinq branches de l\'Arbre-Monde dessinent une configuration unique. Chaque rune est une racine ou un rameau — considérez l\'ensemble, non les parties. Le sens émerge de la relation entre les runes, non de chacune isolément.</p>';
      }
    } else if (spreadType === 'etoile') {
      var centerTone = getEffectiveTone(cards[0]);
      if (centerTone === 'positive') {
        html += '<p>Le Centre rayonne et irradie tous les domaines de votre vie. La rune centrale est un soleil autour duquel tout s\'organise. Ce tirage en étoile promet une période de cohérence et d\'harmonie où chaque aspect de votre existence trouve sa juste place.</p>';
      } else {
        html += '<p>La constellation runique révèle une configuration complexe. Le Centre colore tout le tirage — contemplez la rune centrale longuement, elle détient la clé de l\'ensemble. Les six branches déploient sa vibration dans chaque sphère de votre vie.</p>';
      }
    }

    html += '</div>';

    html += '<div class="tr-ps"><em>Les runes ne prédisent pas — elles éclairent. Le libre arbitre reste la rune suprême, celle qu\'aucun tirage ne peut remplacer. Méditez ces messages, puis agissez en conscience.</em></div>';

    return html;
  }

  function generateReadingWithPlanes(spreadType, cards) {
    var mainReading = generateReading(spreadType, cards);
    var planesHtml = '';
    if (window.runesPlanes && window.runesPlanes.generateAllPlaneReadings) {
      try {
        planesHtml = window.runesPlanes.generateAllPlaneReadings(spreadType, cards);
      } catch(e) {
        planesHtml = '<p style="color:var(--rose);">Erreur plans: ' + e.message + '</p>';
      }
    }
    var html = mainReading + planesHtml;
    if (window.PlateformePartage) {
      var nomTirage = spreadType.split('-').map(capFirst).join(' ');
      var config = {
        type: 'tirage',
        titre: 'Lecture Runes',
        sousTitre: nomTirage,
        cartes: cards.map(function (c) { return { nom: c.name, image: '/images/oracles/runes/rune_' + String(c.id).padStart(2, '0') + '.svg' }; })
      };
      html += window.PlateformePartage.construireBoutonsHTML(config);
    }
    return html;
  }

  return {
    generateReading: generateReading,
    generateReadingWithPlanes: generateReadingWithPlanes,
    getEffectiveTone: getEffectiveTone
  };

})();
