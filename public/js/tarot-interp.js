/* Moteur d'interprétation des tirages — Tarot de Marseille v2 */
window.tarotInterp = (function () {

  /* ── Données par arcane ──────────────────────────────────────────────────
     theme  : registre lumineux/actif (positions neutres et favorables)
     shadow : registre d'ombre (positions d'opposition, Maison VIII/XII)    */
  var CARD_DATA = {
    '00': {
      theme:  'élan libre et saut vers l\'inconnu — un potentiel brut qui s\'élance sans filet',
      shadow: 'instabilité et refus des limites — un mouvement qui s\'épuise dans la dispersion'
    },
    '01': {
      theme:  'initiative créatrice et maîtrise des commencements — les outils du changement en main',
      shadow: 'ruse et légèreté irresponsable — l\'agitation superficielle sans fondement véritable'
    },
    '02': {
      theme:  'savoir intérieur et gestation silencieuse — l\'intelligence qui écoute avant d\'agir',
      shadow: 'secret stérile et attente passive — une résistance à s\'ouvrir qui isole'
    },
    '03': {
      theme:  'communication rayonnante et abondance créatrice — l\'expression fertile qui engendre',
      shadow: 'dispersion et bavardage — une énergie qui se dilue au lieu de se concentrer'
    },
    '04': {
      theme:  'structure solide et autorité bienveillante — le cadre qui protège et permet d\'avancer',
      shadow: 'rigidité et contrôle excessif — une autorité qui étouffe plutôt qu\'elle ne guide'
    },
    '05': {
      theme:  'guidance spirituelle et transmission du savoir — le lien vivant entre visible et invisible',
      shadow: 'dogmatisme et conformisme — l\'imposition des règles au détriment de l\'expérience vécue'
    },
    '06': {
      theme:  'choix du cœur et alliance entre êtres — le désir comme boussole authentique',
      shadow: 'indécision et dépendance affective — la séduction qui confond amour libre et emprise'
    },
    '07': {
      theme:  'triomphe par l\'action et maîtrise de l\'élan — la volonté qui trace sa voie',
      shadow: 'brutalité et fuite en avant — la victoire creuse qui ne tient pas ses promesses'
    },
    '08': {
      theme:  'équilibre juste et droiture dans les décisions — la capacité à distinguer le vrai du faux',
      shadow: 'jugement implacable et froideur — l\'application rigide des règles sans nuance ni miséricorde'
    },
    '09': {
      theme:  'sagesse solitaire et maturation dans le silence — la lanterne qui guide de l\'intérieur',
      shadow: 'isolement stérile et fermeture aux autres — un repli qui protège mais aussi emprisonne'
    },
    '10': {
      theme:  'tournant du destin et mouvement de cycle — une opportunité dans le flux du temps',
      shadow: 'dépendance au hasard — subir le mouvement au lieu de le prendre en main'
    },
    '11': {
      theme:  'force douce et courage tranquille — la puissance intérieure qui apprivoise sans forcer',
      shadow: 'répression des instincts et épuisement — une rage refoulée qui cherche une issue'
    },
    '12': {
      theme:  'lâcher-prise et regard renversé sur la situation — la suspension qui permet de voir autrement',
      shadow: 'blocage prolongé et sacrifice subi — une immobilité qui dure au-delà du nécessaire'
    },
    '13': {
      theme:  'transformation radicale et nettoyage profond — l\'espace libéré pour que le neuf advienne',
      shadow: 'résistance au changement et deuil non accompli — s\'accrocher à ce qui ne peut plus demeurer'
    },
    '14': {
      theme:  'harmonie retrouvée et circulation fluide — l\'art de doser et d\'équilibrer les contraires',
      shadow: 'attentisme et demi-mesures — une modération qui évite la décision qui s\'impose'
    },
    '15': {
      theme:  'puissance vitale et ancrage dans la matière — l\'énergie brute qui crée et génère',
      shadow: 'emprise et excès destructeur — une dépendance qui chaîne davantage qu\'elle ne libère'
    },
    '16': {
      theme:  'libération brutale et illumination par l\'effondrement — ce qui s\'effondre pour laisser passer la lumière',
      shadow: 'choc non préparé et traumatisme non intégré — la violence du changement subi sans ressource'
    },
    '17': {
      theme:  'espoir serein et connexion à l\'essentiel — la grâce d\'une vision au-delà du bruit',
      shadow: 'idéalisme naïf et vulnérabilité — rêver sans ancrage au risque de la désillusion'
    },
    '18': {
      theme:  'profondeur de l\'inconscient et fertilité imaginaire — ce que l\'ombre recèle de richesse',
      shadow: 'illusion et confusion — la peur de regarder en face ce qui vit dans les profondeurs'
    },
    '19': {
      theme:  'épanouissement total et clarté rayonnante — la joie simple d\'être pleinement soi',
      shadow: 'arrogance et sur-exposition — briller si fort que l\'on aveugle et isole autour de soi'
    },
    '20': {
      theme:  'renaissance inattendue et vocation qui s\'éveille — l\'appel intérieur qui change tout',
      shadow: 'fuite du passé et incapacité à tirer les leçons — la nostalgie qui empêche d\'entendre l\'appel'
    },
    '21': {
      theme:  'accomplissement total et intégration harmonieuse — le cycle qui se ferme dans la plénitude',
      shadow: 'stagnation dans la réussite acquise — difficulté à ouvrir le prochain cycle nécessaire'
    },
  };

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
      intro: 'Cinq forces en tension : ce qui soutient, ce qui résiste, ce que le tirage conseille, ce qui adviendra, et l\'énergie maîtresse. Lire d\'abord la Synthèse (carte centrale), puis les quatre branches.',
      positions: [
        { name: 'Le Pour', shadow: false,
          tpl: '{TC} agit comme levier favorable dans cette situation. Cette énergie est activement en votre faveur — consciente ou non, elle est là pour vous soutenir.' },
        { name: 'Le Contre', shadow: true,
          tpl: 'L\'obstacle porte ici le visage de {T}. Il est là non pour bloquer définitivement, mais pour pointer ce qui doit être pleinement traversé avant que la voie se dégage.' },
        { name: 'Le Conseil', shadow: false,
          tpl: 'La clé de passage est {T}. C\'est l\'attitude ou l\'action que la situation réclame — ce que le tirage vous invite à intégrer pour avancer concrètement.' },
        { name: 'Le Résultat', shadow: false,
          tpl: 'Dans la dynamique actuelle, {T} dessine l\'issue probable. Considérez-le comme une boussole et non comme un verdict immuable.' },
        { name: 'La Synthèse', shadow: false,
          tpl: '{TC} est l\'énergie maîtresse de ce tirage. Elle colore toutes les autres cartes et révèle la tonalité profonde — c\'est autour d\'elle que tout s\'articule.' },
      ],
    },
    'ligne': {
      intro: 'Une histoire en cinq temps : des racines profondes jusqu\'au dénouement. Chercher la progression narrative entre les cinq cartes est aussi révélateur que chaque carte prise isolément.',
      positions: [
        { name: 'Passé lointain', shadow: false,
          tpl: 'À la racine profonde de cette situation : {T}. Ce conditionnement structurant, souvent inconscient, a tout mis en mouvement bien avant les événements récents.' },
        { name: 'Passé récent', shadow: false,
          tpl: 'Ce qui vient de se jouer est marqué par {T}. Un événement ou un état d\'être dont les effets se prolongent et continuent de nourrir la situation actuelle.' },
        { name: 'Présent', shadow: false,
          tpl: 'Le pivot central est {T}. C\'est ici que tout converge — l\'énergie du moment, ce qui est en jeu, et ce qui est disponible pour agir.' },
        { name: 'Futur proche', shadow: false,
          tpl: '{TC} se prépare à émerger dans les prochaines semaines. Une énergie qui s\'annonce — accueillie consciemment, elle peut devenir une vraie ressource.' },
        { name: 'Conclusion', shadow: false,
          tpl: 'Le dénouement de ce cycle porte la marque de {T}. C\'est la leçon que ce chapitre vous laisse — la graine que vous emportez dans le prochain.' },
      ],
    },
    'astrologique': {
      intro: 'Douze miroirs de votre vie, un pour chaque domaine d\'expérience. L\'ensemble forme le portrait vivant de votre moment présent. Chercher les thèmes récurrents entre plusieurs maisons est aussi révélateur que chaque carte isolée.',
      positions: [
        { name: 'Maison I — Personnalité', shadow: false,
          tpl: 'Votre identité profonde et l\'image que vous projetez en ce moment portent l\'empreinte de {T}.' },
        { name: 'Maison II — Finances', shadow: false,
          tpl: 'Vos ressources matérielles et leur gestion sont traversées par {T}.' },
        { name: 'Maison III — Entourage', shadow: false,
          tpl: 'Vos échanges, communications et liens proches sont colorés par {T}.' },
        { name: 'Maison IV — Foyer', shadow: false,
          tpl: 'Vos fondations intimes et familiales portent la tonalité de {T}.' },
        { name: 'Maison V — Créativité', shadow: false,
          tpl: 'Votre élan créateur et vos plaisirs profonds s\'expriment à travers {T}.' },
        { name: 'Maison VI — Quotidien', shadow: false,
          tpl: 'La santé et votre rapport au travail au quotidien sont marqués par {T}.' },
        { name: 'Maison VII — Partenariats', shadow: false,
          tpl: 'Vos associations — amour, travail, adversaires déclarés — sont imprégnées de {T}.' },
        { name: 'Maison VIII — Transformation', shadow: true,
          tpl: 'Le domaine des crises et des mutations profondes est activé par {T} : là où les anciennes formes se dissolvent pour que le neuf puisse advenir.' },
        { name: 'Maison IX — Idéal', shadow: false,
          tpl: 'Votre quête de sens et votre philosophie de vie portent la marque de {T}.' },
        { name: 'Maison X — Carrière', shadow: false,
          tpl: 'Vocation et réputation sociale vibrent au diapason de {T}.' },
        { name: 'Maison XI — Projets', shadow: false,
          tpl: 'Vos amitiés profondes et les projets collectifs s\'inscrivent dans {T}.' },
        { name: 'Maison XII — Secret', shadow: true,
          tpl: 'Ce qui est caché et les épreuves silencieuses portent l\'énergie de {T} — un domaine qui demande à être regardé en face plutôt qu\'évité.' },
      ],
    },
  };

  /* ── Résonances notables (paires) ──────────────────────────────────────── */
  var PAIRS = [
    /* Cycle et accomplissement */
    { ids: ['00','21'], label: 'Le Mat · Le Monde',
      text: 'Cycle initiatique accompli : ce qui a commencé dans l\'audace et l\'inconnu atteint son accomplissement total. Un voyage vers soi arrive à son terme.' },
    { ids: ['00','12'], label: 'Le Mat · Le Pendu',
      text: 'Liberté suspendue : l\'élan vers l\'inconnu se heurte à une pause forcée. Ce moment de lâcher-prise révèle ce à quoi l\'on s\'accroche réellement.' },
    { ids: ['02','21'], label: 'La Papesse · Le Monde',
      text: 'Victoire intérieure : la sagesse silencieuse atteint son but. Ce qui a mûri longtemps dans le secret trouve enfin sa pleine expression dans le monde.' },

    /* Transformations */
    { ids: ['16','13'], label: 'La Maison Dieu · L\'Arcane Sans Nom',
      text: 'Double transformation radicale : une structure s\'effondre et une métamorphose profonde la suit immédiatement. Ce qui disparaît libère quelque chose d\'entièrement nouveau.' },
    { ids: ['16','20'], label: 'La Maison Dieu · Le Jugement',
      text: 'Choc libérateur suivi d\'une renaissance : ce qui ressemble à une catastrophe prépare un éveil intérieur décisif. La destruction du vieux prépare l\'appel du neuf.' },
    { ids: ['13','20'], label: 'L\'Arcane Sans Nom · Le Jugement',
      text: 'La métamorphose radicale précède la renaissance totale : ce que vous traversez est le passage nécessaire vers une identité entièrement renouvelée.' },
    { ids: ['10','16'], label: 'La Roue de Fortune · La Maison Dieu',
      text: 'Changement inattendu qui brise la stagnation : un coup de destin libère une situation figée, parfois de façon brutale mais nécessaire.' },
    { ids: ['15','16'], label: 'Le Diable · La Maison Dieu',
      text: 'L\'excès conduit à l\'explosion libératrice : une accumulation de tension ou d\'attachement mène à un effondrement salutaire.' },

    /* Suspensions et profondeur */
    { ids: ['12','18'], label: 'Le Pendu · La Lune',
      text: 'Suspension dans le flou : un temps d\'immobilisme face aux profondeurs de l\'inconscient. Rien ne doit être forcé — la clarté viendra par imprégnation lente.' },
    { ids: ['09','12'], label: 'L\'Ermite · Le Pendu',
      text: 'Double solitude intérieure : un appel profond à s\'arrêter et à laisser une vérité émergente trouver sa forme. La durée de cette pause est nécessaire et féconde.' },
    { ids: ['08','12'], label: 'La Justice · Le Pendu',
      text: 'Blocage des décisions ou stagnation dans une situation légale. Un délai s\'impose avant que la clarté ne revienne et que le choix juste puisse être posé.' },

    /* Désir et emprise */
    { ids: ['06','15'], label: 'L\'Amoureux · Le Diable',
      text: 'L\'attraction face à l\'emprise : un désir vif mais la tentation de s\'y perdre. Distinguer l\'amour libre de la dépendance qui chaîne devient l\'enjeu central.' },

    /* Double sagesse */
    { ids: ['02','09'], label: 'La Papesse · L\'Ermite',
      text: 'Double appel au silence intérieur : une période de recueillement et de gestation profonde. Les réponses ne viendront pas du monde extérieur, mais de l\'écoute de soi.' },
    { ids: ['05','02'], label: 'Le Pape · La Papesse',
      text: 'Le savoir révélé et le savoir caché se font face : transmission extérieure et connaissance intérieure dialoguent. Une synthèse entre tradition et intuition personnelle.' },
    { ids: ['01','02'], label: 'Le Bateleur · La Papesse',
      text: 'La patience est essentielle avant d\'agir : la créativité doit s\'appuyer sur la sagesse intérieure. Laisser la connaissance mûrir avant de manifester.' },
    { ids: ['02','06'], label: 'La Papesse · L\'Amoureux',
      text: 'L\'intuition guide le cœur : avant de choisir, écouter la sagesse profonde. Une union espérée est possible si l\'intelligence intérieure est entendue.' },
    { ids: ['02','10'], label: 'La Papesse · La Roue de Fortune',
      text: 'Projet soutenu par une énergie intuitive : le cycle tourne en faveur de la connaissance intérieure. La sagesse féminine guide favorablement la destinée.' },

    /* Force et mouvement */
    { ids: ['07','11'], label: 'Le Chariot · La Force',
      text: 'Élan maîtrisé par la grâce : la puissance du Chariot canalisée par la douceur de la Force — une avancée victorieuse sans violence ni brutalité.' },
    { ids: ['07','10'], label: 'Le Chariot · La Roue de Fortune',
      text: 'Le mouvement appelle le mouvement : une dynamique de changement rapide s\'installe. Prendre les rênes pour surfer sur ce qui arrive.' },
    { ids: ['11','14'], label: 'La Force · Tempérance',
      text: 'Douceur puissante : deux cartes de maîtrise intérieure se rencontrent pour indiquer une guérison par la patience et l\'acceptation consciente.' },
    { ids: ['02','07'], label: 'La Papesse · Le Chariot',
      text: 'Conflit fécond entre intuition et action rationnelle : l\'une invite au silence, l\'autre à foncer. La sagesse est de savoir lequel des deux écouter en premier.' },

    /* Karma et décision */
    { ids: ['10','19'], label: 'La Roue de Fortune · Le Soleil',
      text: 'Tournant favorable : le cycle se retourne au moment propice pour apporter clarté, succès et joie retrouvée.' },
    { ids: ['08','20'], label: 'La Justice · Le Jugement',
      text: 'Règlement karmique : un bilan s\'impose et une décision tranche dans le vif. Ce qui a été semé arrive à pleine maturité.' },
    { ids: ['10','08'], label: 'La Roue de Fortune · La Justice',
      text: 'Cycle karmique et équité : ce qui a été semé revient de manière juste. Les actions passées trouvent leur équilibre naturel.' },
    { ids: ['04','08'], label: 'L\'Empereur · La Justice',
      text: 'L\'autorité et l\'équité se renforcent mutuellement : un cadre solide est posé avec droiture. Ce qui est édifié dans cette association sera durable et juste.' },
    { ids: ['09','08'], label: 'L\'Ermite · La Justice',
      text: 'Dilemme entre isolement réflexif et décision active : l\'introspection est nécessaire, mais elle doit finalement déboucher sur un choix clair et assumé.' },
    { ids: ['08','16'], label: 'La Justice · La Maison Dieu',
      text: 'Rupture soudaine d\'un contrat ou d\'une relation : l\'effondrement met à nu la vérité que les apparences masquaient.' },
    { ids: ['08','18'], label: 'La Justice · La Lune',
      text: 'Doutes sur les engagements et manque de clarté dans ce qui est vrai. Une prise de recul s\'impose pour distinguer l\'illusion de la réalité.' },
    { ids: ['08','19'], label: 'La Justice · Le Soleil',
      text: 'Succès solide et durable : ce qui est juste rayonne pleinement. Vérité et épanouissement marchent de pair dans cette association.' },
    { ids: ['08','17'], label: 'La Justice · L\'Étoile',
      text: 'Contrats heureux et relations tendres et espérées : la vérité porte en elle l\'espoir. Ce qui est juste est aussi ce qui nourrit l\'idéal.' },
    { ids: ['08','14'], label: 'La Justice · Tempérance',
      text: 'Dialogue fécond et médiation apaisante : les deux cartes invitent à trouver un juste milieu par l\'échange. Ce qui est équilibré peut durer.' },

    /* Lumière et ombre */
    { ids: ['18','19'], label: 'La Lune · Le Soleil',
      text: 'L\'oscillation entre ombre et lumière : deux polarités se côtoient. La connaissance de soi passe par l\'acceptation de ces deux faces complémentaires.' },
    { ids: ['17','14'], label: 'L\'Étoile · Tempérance',
      text: 'Harmonie cosmique : deux cartes d\'équilibre se renforcent pour indiquer une période de sérénité, de fluidité et de connexion intérieure profonde.' },
    { ids: ['17','19'], label: 'L\'Étoile · Le Soleil',
      text: 'Lumière sur lumière : une période de grâce, de reconnaissance et d\'alignement profond. L\'inspiration et l\'épanouissement se rejoignent en un même élan.' },
    { ids: ['19','20'], label: 'Le Soleil · Le Jugement',
      text: 'Reconnaissance totale et renaissance dans la joie : vocation et succès se rejoignent. Ce qui s\'épanouit appelle l\'éveil d\'une dimension entièrement nouvelle.' },

    /* Créativité et abondance */
    { ids: ['03','01'], label: 'L\'Impératrice · Le Bateleur',
      text: 'La créativité en action : l\'abondance fertile de l\'Impératrice s\'allie à l\'agilité du Bateleur — un projet trouve sa forme expressive et vivante.' },
    { ids: ['01','19'], label: 'Le Bateleur · Le Soleil',
      text: 'Rencontre prometteuse et nouveauté radiante : l\'agilité créatrice rencontre l\'éclat de l\'épanouissement. Un début sous d\'excellents auspices.' },
    { ids: ['03','14'], label: 'L\'Impératrice · Tempérance',
      text: 'Créativité et équilibre : l\'abondance expressive de l\'Impératrice s\'allie à la tempérance pour produire avec grâce et dans la durée.' },
    { ids: ['03','08'], label: 'L\'Impératrice · La Justice',
      text: 'Succès professionnel reconnu : la créativité et l\'abondance sont récompensées par une décision juste. Le travail accompli porte ses fruits légitimes.' },
    { ids: ['04','09'], label: 'L\'Empereur · L\'Ermite',
      text: 'Succès mérité après une période d\'attente et de maturation intérieure : l\'autorité et la sagesse se retrouvent dans un accomplissement profondément préparé.' },
    { ids: ['04','01'], label: 'L\'Empereur · Le Bateleur',
      text: 'Structure et initiative : la solidité de l\'Empereur guide l\'élan du Bateleur. Un projet trouve sa forme concrète, stable et durable.' },
  ];

  /* ── Triades (combinaisons de 3 arcanes) ───────────────────────────────── */
  var TRIADS = [
    { ids: ['00','01','21'], label: 'Le Mat · Le Bateleur · Le Monde',
      text: 'Le cycle initiatique complet : l\'inconnu, la maîtrise des outils, l\'accomplissement. Ce tirage raconte le voyage d\'un être depuis son premier élan jusqu\'à sa plénitude.' },
    { ids: ['16','13','20'], label: 'La Maison Dieu · L\'Arcane Sans Nom · Le Jugement',
      text: 'Triple passage : effondrement, transformation radicale, renaissance totale. Ce que vous traversez est un chemin de transmutation complet — rien ne sera comme avant, et c\'est une grâce.' },
    { ids: ['19','17','21'], label: 'Le Soleil · L\'Étoile · Le Monde',
      text: 'Apothéose lumineuse : trois cartes de lumière, d\'espoir et d\'accomplissement. Une période de grâce exceptionnelle, d\'alignement profond et de joie pleine.' },
    { ids: ['18','12','09'], label: 'La Lune · Le Pendu · L\'Ermite',
      text: 'Triple immobilité intérieure : l\'inconscient, la suspension et la solitude se conjuguent. Un appel profond au retrait — la lumière viendra d\'elle-même quand le moment sera mûr.' },
    { ids: ['07','11','08'], label: 'Le Chariot · La Force · La Justice',
      text: 'Triomphe par la maîtrise et la droiture : l\'action, l\'endurance et la justesse s\'allient. Ce qui est entrepris avec cette énergie est solide, durable et éthiquement fondé.' },
    { ids: ['06','15','16'], label: 'L\'Amoureux · Le Diable · La Maison Dieu',
      text: 'La passion → l\'emprise → l\'effondrement libérateur : un schéma de dépendance qui se brise enfin. Ce cycle, même douloureux, est une invitation à retrouver la liberté authentique.' },
    { ids: ['02','09','20'], label: 'La Papesse · L\'Ermite · Le Jugement',
      text: 'Sagesse intérieure, maturation solitaire, puis renaissance : ce qui a mûri longtemps dans le silence est enfin appelé à se manifester pleinement dans le monde.' },
    { ids: ['10','07','19'], label: 'La Roue de Fortune · Le Chariot · Le Soleil',
      text: 'Momentum positif total : le cycle tourne bien, l\'action est juste, l\'épanouissement suit. Un concours de circonstances exceptionnellement favorable — agir maintenant.' },
  ];

  /* ── Familles d'arcanes ─────────────────────────────────────────────────── */
  var FAMILIES = [
    { ids: ['00','01','02','03','04','05','06','07'],
      desc: 'Le tirage est majoritairement orienté vers l\'action, les relations et la construction dans le monde concret.' },
    { ids: ['08','09','10','11','12','13','14'],
      desc: 'Une forte dimension de passage et de transformation intérieure caractérise ce tirage — une période de maturation profonde en cours.' },
    { ids: ['15','16','17','18','19','20','21'],
      desc: 'Les grandes forces de l\'inconscient et du destin sont particulièrement actives dans ce tirage.' },
  ];

  /* ── Moteur commun ──────────────────────────────────────────────────────── */
  return window.createTarotEngine({
    cardData: CARD_DATA,
    spreads: SPREADS,
    pairs: PAIRS,
    triads: TRIADS,
    families: FAMILIES,
    planesGlobal: 'tarotPlanes',
    passSpreadType: false,
    labels: {
      readingTitle: 'Lecture de votre tirage',
      triadsHeader: 'Constellation de 3 arcanes',
      pairsHeader: 'Résonances notables',
      synthesisHeader: 'Synthèse'
    },
    synthesis: {
      useFamilies: true,
      openings: {
        'trois-cartes': function (cards, api) {
          var f = cards[0], l = cards[2], m = cards[1];
          return 'Ce tirage trace un arc de <strong>' + f.name + '</strong> (' + api.getTheme(f, false) + ') jusqu\'à <strong>' + l.name + '</strong> (' + api.getTheme(l, false) + '). '
               + 'La carte du présent, <strong>' + m.name + '</strong>, est le pivot qui révèle comment passer de l\'origine à la destination. ';
        },
        'croix': function (cards, api) {
          var pour = cards[0], contre = cards[1], synth = cards[4];
          return 'Entre le soutien de <strong>' + pour.name + '</strong> (' + api.getTheme(pour, false) + ') et l\'obstacle de <strong>' + contre.name + '</strong> (' + api.getTheme(contre, true) + '), l\'énergie maîtresse est <strong>' + synth.name + '</strong> : ' + api.getTheme(synth, false) + '. ';
        },
        'ligne': function (cards, api) {
          var r = cards[0], c = cards[4];
          return 'La ligne narrative part des racines de <strong>' + r.name + '</strong> (' + api.getTheme(r, false) + ') et s\'achemine vers <strong>' + c.name + '</strong> (' + api.getTheme(c, false) + '). ';
        },
        'astrologique': function (cards, api) {
          return 'Ce tirage à douze maisons offre un panorama complet de vos énergies actuelles. ';
        }
      },
      triadPhrase: function (triads) {
        return 'La constellation <strong>' + triads[0].label + '</strong> est particulièrement significative : ' + triads[0].text + ' ';
      },
      pairPhrase: function (pairs) {
        var labels = pairs.slice(0, 2).map(function (p) { return p.label; }).join(' et ');
        return (pairs.length === 1 ? 'La résonance ' : 'Les résonances ') + labels + ' amplifient ce message. ';
      },
      closing: 'Ce tirage n\'est pas un verdict — c\'est une carte du territoire intérieur tel qu\'il se présente aujourd\'hui. Le libre arbitre reste votre boussole.'
    }
  });
})();
