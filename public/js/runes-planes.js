window.runesPlanes = (function () {

  function getEffectiveTone(card) {
    if (window.runesInterp && window.runesInterp.getEffectiveTone) {
      return window.runesInterp.getEffectiveTone(card);
    }
    if (card && card.isReversed && card.canReverse) {
      if (card.tone === 'positive') return 'negative';
      if (card.tone === 'negative') return 'positive';
    }
    return card.tone || 'neutral';
  }

  var CARD_PLANES = {
    '01': {
      personnel: "Abondance intérieure et sentiment de plénitude. Fehu dans le plan personnel vous invite à reconnaître votre propre valeur — non pas en termes d'argent, mais de richesse d'être. Vous possédez des ressources intérieures insoupçonnées. Cultivez la gratitude pour ce que vous êtes, et l'abondance matérielle suivra naturellement.",
      professionnel: "Prospérité professionnelle en chemin. Une augmentation, un nouveau client, un projet lucratif — Fehu active les flux financiers. C'est le moment d'investir dans vos compétences ou de négocier votre valeur. La rune du bétail parle de ce qui croît quand on en prend soin : votre carrière est un troupeau à faire prospérer.",
      relationnel: "Générosité affective et sécurité matérielle dans le couple. Fehu parle d'une relation où chacun apporte et reçoit dans un équilibre nourrissant. Pour les célibataires : vous attirez l'abondance amoureuse quand vous reconnaissez votre propre valeur. Ne vous sous-estimez pas."
    },
    '02': {
      personnel: "Force vitale et courage de vous affirmer. Uruz vous connecte à votre puissance sauvage — celle qui ne demande pas la permission pour exister. Votre corps est votre allié : écoutez-le, honorez-le, renforcez-le. Une transformation physique ou psychique profonde est possible maintenant.",
      professionnel: "Affirmation puissante dans votre carrière. Uruz donne le courage de prendre des risques calculés et de vous imposer avec justesse. Force de travail accrue, endurance dans les projets exigeants. Les métiers physiques et les postes de leadership sont favorisés.",
      relationnel: "Passion brute et magnétisme animal. Uruz dans le plan affectif parle de désir puissant et de connexion viscérale. Pour les couples : ravivez la flamme par le corps. Pour les célibataires : votre force attire — ne la cachez pas pour plaire."
    },
    '03': {
      personnel: "Une épreuve personnelle vous attend, mais elle vous protège aussi. Thurisaz est l'épine qui défend la rose — ce qui vous blesse maintenant vous fortifiera. L'inconscient signale un conflit non résolu : affrontez-le plutôt que de l'éviter.",
      professionnel: "Conflit professionnel ou compétition féroce. Un obstacle se dresse — un collègue hostile, une procédure bloquante ou un marché difficile. Thurisaz conseille la défense stratégique plus que l'attaque frontale. Protégez votre territoire sans déclarer la guerre.",
      relationnel: "Tension dans une relation, possible conflit. L'épine est entrée dans le cœur — vexation, jalousie ou blessure non dite. Thurisaz vous avertit : ne frappez pas sous le coup de la colère. La protection de votre cœur passe par la parole, non par le silence agressif."
    },
    '04': {
      personnel: "Un message important vous est adressé — par un rêve, une synchronicité, une parole entendue. Ansuz ouvre le canal de l'intuition et de la guidance. Écoutez davantage, parlez moins. La sagesse d'Odin vous souffle une vérité que seul le silence peut recevoir.",
      professionnel: "Communication décisive dans votre travail. Un entretien, une présentation ou un message peut tout changer. Ansuz favorise l'expression orale et écrite, les négociations et les échanges intellectuels. Dites votre vérité professionnelle avec clarté et conviction.",
      relationnel: "Une conversation importante approche. Ansuz dans le plan affectif invite au dialogue authentique — dites ce que vous avez sur le cœur, mais surtout écoutez la réponse. Une déclaration, une clarification ou un message d'amour peut arriver. La parole guérit quand elle est vraie."
    },
    '05': {
      personnel: "Un voyage ou un changement de décor vous appelle. Raidho est le mouvement juste — physiquement ou intérieurement. Votre vie intérieure a besoin de mouvement : sortez des routines mentales, explorez de nouveaux horizons de pensée. Le chemin se fait en marchant.",
      professionnel: "Mobilité professionnelle, déplacement ou évolution de carrière. Raidho annonce un changement de poste, une mission à l'étranger ou une formation itinérante. Le rythme s'accélère — suivez le mouvement sans résistance. Votre carrière est un voyage, non une destination.",
      relationnel: "Un voyage à deux ou une relation qui évolue. Raidho parle d'une rencontre en déplacement ou d'une relation qui vous fait bouger, grandir. Pour les couples : partez ensemble, même pour une journée. Le mouvement ravive le lien."
    },
    '06': {
      personnel: "Illumination intérieure et révélation personnelle. Kenaz allume la torche de votre compréhension — ce qui était obscur devient clair. Une idée créative fulgurante, une prise de conscience décisive. La flamme est aussi celle du désir : que voulez-vous vraiment ?",
      professionnel: "Inspiration créative et solutions innovantes. Kenaz favorise les métiers de création, d'enseignement et de recherche. Une découverte ou une idée brillante va faire avancer votre projet. Partagez votre lumière — elle éclairera aussi les autres.",
      relationnel: "Clarté affective et passion ravivée. Kenaz apporte une compréhension soudaine de votre situation amoureuse. Le désir est une lumière — suivez-la sans peur. Pour les célibataires : une rencontre électrique, une attraction immédiate. Pour les couples : la flamme se ranime."
    },
    '07': {
      personnel: "Recevez le don que la vie vous fait — une qualité, un talent, une opportunité. Gebo vous rappelle que vous méritez de recevoir autant que de donner. L'équilibre intérieur passe par l'acceptation de vos propres dons. Cultivez la gratitude active.",
      professionnel: "Partenariat, alliance ou contrat équilibré. Gebo est la rune des affaires justes — une collaboration où chacun trouve son compte. Don et contre-don professionnel : ce que vous offrez vous sera rendu. Négociation gagnant-gagnant en vue.",
      relationnel: "Équilibre amoureux et réciprocité. Gebo est une des runes les plus favorables pour l'amour — don mutuel, générosité du cœur, alliance sacrée. Pour les célibataires : une rencontre équilibrée où chacun apporte. Pour les couples : renouvelez vos vœux par le don quotidien."
    },
    '08': {
      personnel: "Joie profonde et accomplissement personnel. Wunjo annonce une période de bonheur authentique — vous êtes à votre juste place. Célébrez qui vous êtes, sans retenue ni fausse modestie. La joie est un indicateur spirituel : elle confirme que vous êtes sur le bon chemin.",
      professionnel: "Succès et reconnaissance dans votre travail. Wunjo apporte la récompense après l'effort — promotion, célébration d'un projet abouti ou ambiance harmonieuse. Les métiers créatifs et sociaux sont particulièrement rayonnants.",
      relationnel: "Bonheur amoureux et célébration affective. Wunjo est la rune de l'amour heureux — complicité, fête, légèreté. Pour les célibataires : une rencontre joyeuse dans un contexte festif. Pour les couples : période de complicité lumineuse. Célébrez votre amour."
    },
    '09': {
      personnel: "Crise personnelle et effondrement des structures. Hagalaz est la tempête qui renverse tout — croyances, habitudes, certitudes. Ne résistez pas au chaos : il nettoie ce qui doit l'être. Ce qui s'effondre n'était pas assez solide. La reconstruction viendra.",
      professionnel: "Bouleversement professionnel majeur. Hagalaz peut annoncer une perte d'emploi, une restructuration ou un échec cuisant. Mais cette destruction est un nettoyage — l'ancien doit partir pour que le nouveau advienne. Ne vous accrochez pas aux ruines.",
      relationnel: "Rupture ou crise grave dans une relation. Hagalaz est la grêle qui s'abat sur le couple — une vérité explosive, une trahison, une séparation. La douleur est réelle, mais elle n'est pas éternelle. Ce qui se brise était peut-être déjà fêlé."
    },
    '10': {
      personnel: "Traversée du manque et de la nécessité. Nauthiz vous met face à vos besoins fondamentaux — qu'est-ce qui vous manque vraiment ? Distinguez l'essentiel du superflu. Cette contrainte est une forge : elle vous apprend la patience, la résistance et l'humilité.",
      professionnel: "Restrictions financières ou professionnelles. Le budget est serré, les opportunités rares, les délais contraignants. Nauthiz n'est pas une punition mais un enseignement : apprenez à faire avec moins, à prioriser, à durer. La pénurie révèle l'essentiel.",
      relationnel: "Frustration affective ou solitude subie. Un besoin d'amour inassouvi, une distance imposée, une attente douloureuse. Nauthiz demande de la patience — le manque que vous ressentez vous apprend quelque chose sur vous-même. La rencontre ou la réconciliation viendra en son temps."
    },
    '11': {
      personnel: "Pause imposée et introspection nécessaire. Isa fige tout mouvement — c'est le moment de l'immobilité consciente. Ne luttez pas contre le gel : méditez, observez, clarifiez. L'eau calme devient miroir ; l'esprit calme devient lucide.",
      professionnel: "Stagnation professionnelle et blocage des projets. Rien n'avance, tout est gelé. Isa vous conseille de ne pas forcer les choses — utilisez cette pause pour analyser, planifier et vous préparer. Le dégel viendra, soyez prêt.",
      relationnel: "Froideur affective ou distance dans la relation. Les sentiments semblent gelés, la communication rompue. Isa n'est pas une rupture mais un temps mort. Profitez-en pour clarifier vos émotions — le cristal de glace révèle ce que l'eau trouble cachait."
    },
    '12': {
      personnel: "Récolte des fruits de votre travail personnel. Jera récompense la patience et l'effort constant — ce que vous avez semé en vous-même arrive à maturité. Célébrez le chemin parcouru, honorez le temps passé. La moisson est un aboutissement et un nouveau départ.",
      professionnel: "Aboutissement d'un projet long et récolte des efforts. Jera annonce une promotion méritée, un contrat signé ou un objectif atteint après des mois de travail. Les investissements passés portent leurs fruits. Partagez la récolte avec ceux qui vous ont aidé.",
      relationnel: "Maturité affective et aboutissement amoureux. Une relation qui a traversé les saisons trouve son accomplissement. Pour les célibataires : vous avez mûri, vous êtes prêt pour une relation durable. Pour les couples : le temps travaille pour vous — la patience fut récompensée."
    },
    '13': {
      personnel: "Initiation profonde et connexion aux mystères. Eihwaz vous invite à descendre dans vos profondeurs — ce que vous y trouverez vous transformera. L'arbre-monde vous relie à votre sagesse ancestrale. Une partie de vous meurt pour qu'une autre naisse.",
      professionnel: "Transformation professionnelle par une initiation ou une formation profonde. Eihwaz parle d'un changement de paradigme dans votre carrière — non pas un simple nouveau poste, mais une évolution fondamentale. Endurance récompensée.",
      relationnel: "Connexion d'âme et relation initiatique. Une rencontre qui vous transforme en profondeur, un amour qui vous relie à quelque chose de plus grand que vous. Pour les couples : votre relation traverse une initiation — elle en sortira plus forte ou s'y dissoudra."
    },
    '14': {
      personnel: "Le destin frappe à votre porte par le hasard. Perthro vous invite à faire confiance à l'imprévu — les synchronicités ne sont pas des coïncidences. Lâchez le contrôle : quelque chose que vous n'attendiez pas va se produire et révéler une partie de votre chemin.",
      professionnel: "Opportunité imprévue ou coup du sort professionnel. Perthro annonce un changement inattendu — une offre soudaine, un licenciement surprise ou une rencontre décisive. Le hasard est le nom que prend le destin quand il veut rester discret.",
      relationnel: "Rencontre inattendue ou révélation affective. Perthro est la rune des coups de foudre, des retrouvailles improbables, des secrets qui se dévoilent. L'amour surgit là où vous ne l'attendez pas — restez ouvert au mystère."
    },
    '15': {
      personnel: "Protection spirituelle active autour de vous. Algiz vous enveloppe de sa ramure protectrice — un guide, un ange gardien ou votre propre force intérieure veille. Avancez sans peur : le chemin est gardé. Faites aussi votre part : la protection exige votre vigilance.",
      professionnel: "Allié puissant ou protecteur dans votre carrière. Algiz annonce un mentor, un soutien hiérarchique ou une protection syndicale. Votre position est défendue par une force bienveillante. En contrepartie, restez droit et loyal.",
      relationnel: "Protection affective et sécurité dans la relation. Algiz parle d'un partenaire protecteur ou d'un amour qui vous sécurise. Pour les célibataires : ne baissez pas votre garde trop vite, mais sachez reconnaître ceux qui veulent vraiment votre bien."
    },
    '16': {
      personnel: "Rayonnement personnel et victoire sur les ombres intérieures. Sowilo est le soleil de l'âme — tout ce que vous touchez s'illumine. Confiance absolue en votre chemin, santé éclatante, énergie vitale au zénith. Savourez ce triomphe : vous l'avez mérité.",
      professionnel: "Succès éclatant et reconnaissance professionnelle. Sowilo annonce une victoire totale — un contrat majeur, une promotion éclatante ou une visibilité soudaine. Les projecteurs sont sur vous : brillez sans arrogance. Cette réussite est durable.",
      relationnel: "Amour lumineux et rayonnant. Sowilo dans le plan affectif parle d'une relation qui vous illumine et vous grandit. Pour les célibataires : vous attirez par votre lumière intérieure — ne la cachez pas. Pour les couples : une période de complicité solaire."
    },
    '17': {
      personnel: "Appel à l'honneur et à l'intégrité personnelle. Tiwaz vous demande : pour quoi êtes-vous prêt à vous battre ? Quelle cause mérite votre sacrifice ? Votre force intérieure est mise au service de la justice — d'abord envers vous-même.",
      professionnel: "Victoire juridique, compétition gagnée ou combat professionnel abouti. Tiwaz favorise les métiers de justice, de défense et de leadership. Un adversaire sera vaincu par votre intégrité plus que par votre agressivité.",
      relationnel: "Engagement, loyauté et vérité dans la relation. Tiwaz parle d'un amour fondé sur l'honneur et le respect mutuel. Pour les célibataires : une rencontre avec une personne intègre. Pour les couples : clarifiez vos engagements et tenez-les."
    },
    '18': {
      personnel: "Nouveau départ et renaissance personnelle. Berkano est la sève printanière qui monte en vous — nouveau projet, nouvelle identité, nouvelle vie. Laissez l'ancien mourir pour que le nouveau naisse. L'énergie féminine sacrée vous enveloppe de sa douceur régénératrice.",
      professionnel: "Nouveau projet professionnel ou création d'entreprise. Berkano favorise les commencements — lancement, fondation, démarrage. Comme la mère qui enfante, vous donnez naissance à quelque chose qui vous survivra. Prenez soin de cette jeune pousse.",
      relationnel: "Naissance d'un amour, agrandissement de la famille ou renaissance du couple. Berkano annonce une grossesse, une nouvelle relation ou un renouveau affectif. L'énergie maternelle est active — guérison, tendresse et protection dans les liens."
    },
    '19': {
      personnel: "Confiance en vous-même et en vos alliés. Ehwaz est le cheval fidèle — vous n'êtes pas seul sur la route. Acceptez l'aide, offrez la vôtre. La progression personnelle est plus rapide et plus douce à deux qu'en solitaire.",
      professionnel: "Partenariat professionnel ou collaboration harmonieuse. Ehwaz annonce une alliance de travail fondée sur la confiance mutuelle. Un collègue, un associé ou un employé devient un allié précieux. Travail d'équipe favorisé.",
      relationnel: "Confiance absolue et loyauté dans le couple. Ehwaz est la rune du partenaire fidèle — amitié amoureuse, soutien indéfectible, chemin parcouru ensemble. Pour les célibataires : une rencontre fondée sur la confiance et le respect mutuel."
    },
    '20': {
      personnel: "Miroir de l'âme et connaissance de soi. Mannaz vous invite à vous regarder sans masque — qui êtes-vous vraiment ? Cette introspection n'est pas narcissique : elle est la condition de toute relation authentique aux autres. Votre humanité est votre plus grande richesse.",
      professionnel: "Réseau professionnel et intelligence collective. Mannaz favorise les collaborations, le travail en communauté et les projets sociaux. Votre réputation et vos relations humaines sont votre meilleur atout professionnel.",
      relationnel: "Qualité du lien humain et conscience de l'autre. Mannaz parle de relations fondées sur la reconnaissance mutuelle et non sur le besoin. Pour les célibataires : regardez comment vous vous reliez aux autres en général — l'amour naît de cette qualité de présence."
    },
    '21': {
      personnel: "Plongée dans votre océan intérieur. Laguz ouvre les vannes de l'intuition et des émotions — laissez couler. Les rêves parlent, le corps sait, l'inconscient guide. Ne résistez pas à ce qui monte : les larmes, les souvenirs, les désirs profonds sont des messagers.",
      professionnel: "Créativité intuitive et projets fondés sur l'émotion. Laguz favorise les métiers de l'eau — soin, thérapie, art, musique. Laissez l'intuition guider vos décisions professionnelles : elle voit ce que la raison ignore.",
      relationnel: "Flux émotionnel et connexion intuitive. Laguz parle d'un amour où l'on se comprend sans mots, où les émotions circulent librement. Pour les célibataires : une rencontre sur la même longueur d'onde. Pour les couples : laissez couler les émotions sans les retenir."
    },
    '22': {
      personnel: "Gestation silencieuse et accomplissement intérieur. Ingwaz protège ce qui mûrit en vous — ne dévoilez pas vos projets trop tôt. Une période de calme fertile précède l'éclosion. La paix du foyer intérieur est votre refuge.",
      professionnel: "Projet en gestation et aboutissement imminent. Ingwaz annonce la conclusion d'un cycle professionnel. Ce qui était en préparation touche à sa fin. Protégez votre œuvre jusqu'à maturité — le moment de la montrer viendra.",
      relationnel: "Foyer, famille et sécurité affective. Ingwaz est la rune du cocon domestique — harmonie familiale, confort du chez-soi, chaleur du nid. Pour les couples : période de paix et de stabilité. Pour les célibataires : construisez d'abord votre sanctuaire intérieur."
    },
    '23': {
      personnel: "Retour aux sources et héritage personnel. Othala vous invite à explorer vos racines — familiales, culturelles, spirituelles. Ce que vous avez reçu de vos ancêtres est un trésor à honorer. Votre place dans la lignée est unique et sacrée.",
      professionnel: "Entreprise familiale, transmission ou héritage professionnel. Othala favorise les métiers de patrimoine, l'immobilier et la transmission de savoir-faire. Vous pourriez recevoir un héritage, une succession ou une opportunité liée à vos origines.",
      relationnel: "Valeurs familiales et engagement durable. Othala parle d'un amour qui construit un héritage — mariage, enfants, transmission. Pour les célibataires : une rencontre ancrée dans des valeurs communes. Pour les couples : bâtissez pour les générations futures."
    },
    '24': {
      personnel: "Éveil et renaissance intérieure. Dagaz annonce l'aube après la longue nuit — espoir, clarté, nouveau départ. Ce qui était obscur devient lumineux. Une transformation profonde est accomplie : vous n'êtes plus le même. Ouvrez les yeux sur le jour neuf.",
      professionnel: "Nouveau cycle professionnel et opportunités lumineuses. Dagaz annonce un tournant décisif — changement de carrière, nouvelle orientation ou renaissance après un échec. La lumière revient, plus claire qu'avant.",
      relationnel: "Renaissance affective et espoir amoureux. Dagaz est la promesse que l'amour renaît toujours — après un deuil, une rupture, une solitude. Un nouveau cycle affectif s'ouvre dans la lumière. Pour les couples : un nouveau départ ensemble."
    }
  };

  function getToneLabel(tone) {
    if (tone === 'positive') return 'positive';
    if (tone === 'negative') return 'négative';
    return 'neutre';
  }

  function buildPlaneReading(cards, plane, planeEmoji, planeLabel, spreadType) {
    var isActive = plane === 'personnel';
    var html = '<div class="tr-plane-pane' + (isActive ? ' active' : '') + '" data-plane="' + plane + '" style="' + (isActive ? 'display:block' : 'display:none') + '">';
    html += '<h4 style="color:var(--gold);font-family:var(--font-mono);margin-bottom:1rem;">' + planeEmoji + ' Plan ' + planeLabel + '</h4>';

    var planeData;
    cards.forEach(function(card) {
      planeData = CARD_PLANES[card.id];
      if (!planeData) return;
      var isRev = card.isReversed && card.canReverse;
      var revLabel = isRev ? ' <span class="tr-rev">Merkstave</span>' : '';
      html += '<div class="tr-plane-reading" style="margin-bottom:1rem;padding:0.8rem;background:rgba(218,165,32,0.02);border-radius:6px;">';
      html += '<strong style="color:var(--emerald);">' + card.runeChar + ' ' + card.name + '</strong>' + revLabel;
      html += '<p style="color:var(--text);margin:0.3rem 0 0 0;line-height:1.6;">';
      html += planeData[plane] || "Méditez sur cette rune et laissez votre intuition parler.";
      html += '</p>';
      html += '</div>';
    });

    var tones = cards.map(function(c) { return getEffectiveTone(c); });
    var posCount = tones.filter(function(t) { return t === 'positive'; }).length;
    var negCount = tones.filter(function(t) { return t === 'negative'; }).length;
    var planeTone = posCount > negCount ? 'positive' : (negCount > posCount ? 'negative' : 'neutral');

    html += '<div style="margin-top:1rem;padding:0.8rem;border-left:3px solid var(--gold);background:rgba(218,165,32,0.03);">';
    html += '<strong style="color:var(--gold);font-size:0.9rem;">Synthèse ' + planeLabel.toLowerCase() + '</strong><br>';

    if (planeTone === 'positive') {
      html += '<span style="color:var(--text);">Les énergies lumineuses dominent ce plan. Une période favorable s\'ouvre — avancez avec confiance et gratitude. Ce que vous semez maintenant portera des fruits abondants.</span>';
    } else if (planeTone === 'negative') {
      html += '<span style="color:var(--text);">Les énergies d\'ombre prédominent. Ce n\'est pas une malédiction, mais une invitation au travail intérieur. Chaque rune sombre est un professeur — écoutez-la sans peur, elle vous prépare à la lumière.</span>';
    } else {
      html += '<span style="color:var(--text);">Équilibre des forces. Le plan est en phase d\'observation — ni pleine lumière ni obscurité. Prenez le temps d\'écouter avant d\'agir. La neutralité est parfois la plus sage des positions.</span>';
    }

    html += '</div></div>';
    return html;
  }

  function generateAllPlaneReadings(spreadType, cards) {
    var html = '';

    html += '<div class="tr-plane-tabs" style="display:flex;gap:0.5rem;margin:2rem 0 1rem 0;flex-wrap:wrap;justify-content:center;">';
    html += '<button class="tr-plane-tab active" data-plane="personnel" style="background:var(--bg-card);border:1px solid var(--gold);color:var(--gold);padding:0.5rem 1.2rem;border-radius:4px;cursor:pointer;font-family:var(--font-mono);font-size:0.85rem;">Personnel ☾</button>';
    html += '<button class="tr-plane-tab" data-plane="professionnel" style="background:var(--bg-card);border:1px solid var(--gold);color:var(--text-muted);padding:0.5rem 1.2rem;border-radius:4px;cursor:pointer;font-family:var(--font-mono);font-size:0.85rem;">Professionnel ☉</button>';
    html += '<button class="tr-plane-tab" data-plane="relationnel" style="background:var(--bg-card);border:1px solid var(--gold);color:var(--text-muted);padding:0.5rem 1.2rem;border-radius:4px;cursor:pointer;font-family:var(--font-mono);font-size:0.85rem;">Relationnel ♡</button>';
    html += '</div>';

    html += '<div class="tr-plane-panes">';
    html += buildPlaneReading(cards, 'personnel', '☾', 'Personnel', spreadType);
    html += buildPlaneReading(cards, 'professionnel', '☉', 'Professionnel', spreadType);
    html += buildPlaneReading(cards, 'relationnel', '♡', 'Relationnel', spreadType);
    html += '</div>';

    return html;
  }

  return {
    generateAllPlaneReadings: generateAllPlaneReadings,
    getEffectiveTone: getEffectiveTone
  };

})();
