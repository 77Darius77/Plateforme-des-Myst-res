/* Moteur d'interprétation des tirages — Oracle Gé (Gérard Barbier, 1991) */
window.geInterp = (function () {

  /* ── Configurations des tirages ────────────────────────────────────────── */
  var SPREADS = {
    'trois-cartes': {
      intro: 'Trois temps d\'une même quête : le passé qui a préparé, le présent qui agit, le futur qui se dessine. La carte centrale est le pivot — elle révèle comment le chemin d\'hier conduit au destin de demain.',
      positions: [
        { name: 'Le Passé', shadow: false,
          tpl: 'Cette situation a ses racines dans {T}. Ce qui a été semé alors continue d\'influencer votre présent — reconnaître cette empreinte, c\'est déjà s\'en libérer.' },
        { name: 'Le Présent', shadow: false,
          tpl: '{TC} — telle est l\'énergie qui gouverne ce moment. C\'est le cœur vivant de votre question, les forces à l\'œuvre et les ressources dont vous disposez.' },
        { name: 'Le Futur', shadow: false,
          tpl: 'La trajectoire s\'annonce sous le signe de {T}. Ce n\'est pas un destin écrit, mais une direction probable — un conseil ou un avertissement pour éclairer votre route.' },
      ],
    },
    'croix': {
      intro: 'Cinq piliers pour une lecture croisée : ce qui constitue votre situation, ce qui s\'y oppose, ce qui est en devenir, l\'obstacle à traverser, et la synthèse qui éclaire tout.',
      positions: [
        { name: 'Le Consultant — Situation', shadow: false,
          tpl: 'Votre position actuelle est sous le signe de {T}. C\'est l\'énergie qui vous définit dans cette situation — votre ancrage et les forces que vous incarnez.' },
        { name: 'Le Passé — Origines', shadow: false,
          tpl: 'Ce qui vient d\'hier porte la marque de {T}. Une influence du passé qui continue d\'agir sur le présent — la comprendre, c\'est dénouer le fil.' },
        { name: 'Le Futur — Devenir', shadow: false,
          tpl: 'La direction qui se dessine est {T}. Considérez-la comme une indication, non comme une fatalité — votre liberté reste entière.' },
        { name: 'L\'Obstacle — Défi', shadow: true,
          tpl: 'L\'obstacle prend le visage de {T}. Il n\'est pas là pour vous arrêter, mais pour vous apprendre ce que la voie facile n\'aurait pas enseigné.' },
        { name: 'La Synthèse — Vue d\'ensemble', shadow: false,
          tpl: '{TC} est l\'énergie maîtresse de ce tirage. Elle colore l\'ensemble des cartes et révèle la vibration profonde — tout s\'articule autour d\'elle.' },
      ],
    },
    'etoile': {
      intro: 'Une constellation de sept forces en dialogue : au centre, l\'essence du tirage, et six branches qui éclairent les grandes sphères de la vie. L\'Étoile vous révèle la carte de votre ciel intérieur.',
      positions: [
        { name: 'Le Centre — Cœur du tirage', shadow: false,
          tpl: 'Au cœur de cette constellation, {T} rayonne comme l\'énergie centrale. Tout découle de cette influence fondamentale qui colore l\'ensemble.' },
        { name: 'Les Finances — Matérialité', shadow: false,
          tpl: 'Sur le plan matériel, {T} indique la dynamique en cours. Ressources, dépenses, prospérité — lisez ici la signature financière du moment.' },
        { name: 'Les Sentiments — Amour', shadow: false,
          tpl: 'Dans le domaine du cœur, {T} dessine la carte émotionnelle. C\'est le pouls de vos relations et l\'état de votre vie affective.' },
        { name: 'La Santé — Vitalité', shadow: false,
          tpl: 'Votre vitalité est marquée par {T}. C\'est un indicateur de votre équilibre physique et énergétique — écoutez ce que votre corps exprime.' },
        { name: 'Le Travail — Carrière', shadow: false,
          tpl: 'Dans votre vie professionnelle, {T} est la force agissante. Carrière, vocation, projets en cours — c\'est ici que se joue votre chemin.' },
        { name: 'La Spiritualité — Sens', shadow: false,
          tpl: 'Sur le plan spirituel, {T} vous guide. C\'est l\'appel de votre âme, la direction invisible qui donne du sens au reste.' },
        { name: 'Le Résultat — Aboutissement', shadow: false,
          tpl: 'La résultante de toutes ces forces converge vers {T}. C\'est l\'aboutissement — le message final que les cartes vous adressent.' },
      ],
    },
  };

  /* ── Résonances notables (paires de cartes Gé) ───────────────────────── */
  var PAIRS = [
    /* Amour et relations */
    { ids: ['01','02'], label: 'Soleil · Rose',
      text: 'Rayonnement amoureux : la lumière du Soleil éclaire la tendresse de la Rose. Période de bonheur affectif éclatant et de reconnaissance sentimentale.' },
    { ids: ['02','06'], label: 'Rose · Deux Cœurs',
      text: 'L\'amour partagé dans sa forme la plus pure : tendresse et union se conjuguent. Un sentiment sincère mène à une relation harmonieuse.' },
    { ids: ['06','29'], label: 'Deux Cœurs · Poignée de Mains',
      text: 'De l\'amour à l\'engagement : le cœur trouve l\'accord. Union officialisée, promesse tenue, alliance durable.' },
    { ids: ['15','02'], label: 'Symboles Sexuels · Rose',
      text: 'Fusion du désir et de la tendresse : passion et amour s\'unissent. Une relation complète où le corps et le cœur parlent le même langage.' },
    { ids: ['36','53'], label: 'Cœur Partagé · Flûte Brisée',
      text: 'Rupture douloureuse et désenchantement : le cœur brisé et l\'harmonie perdue. Une séparation qui laisse des cicatrices profondes.' },

    /* Succès et prospérité */
    { ids: ['01','11'], label: 'Soleil · Lion',
      text: 'Puissance et rayonnement majeurs : le leadership du Lion magnifié par l\'éclat du Soleil. Succès assuré, autorité naturelle, reconnaissance éclatante.' },
    { ids: ['01','56'], label: 'Soleil · Pyramide',
      text: 'Succès durable et accomplissement solide : la lumière éclaire l\'édifice. Une réussite qui résiste au temps et honore vos efforts.' },
    { ids: ['07','19'], label: 'Chiffres · Argent',
      text: 'Chance et prospérité financière : les chiffres annoncent des gains. Une période faste pour les finances et les investissements.' },
    { ids: ['23','56'], label: 'Outils · Pyramide',
      text: 'Travail concret menant à l\'édification : chaque outil contribue à bâtir la pyramide. La persévérance dans l\'effort construit une réussite solide.' },
    { ids: ['19','34'], label: 'Argent · Écureuil',
      text: 'Prospérité par la sagesse financière : gagner et épargner. Une gestion prudente qui prépare un avenir serein.' },

    /* Conflits et épreuves */
    { ids: ['12','32'], label: 'Poignard · Serpent',
      text: 'Conflit et trahison mêlés : la parole blesse là où la confiance a été rompue. Danger d\'une agression cachée ou d\'une dispute destructrice.' },
    { ids: ['32','57'], label: 'Serpent · Lynx',
      text: 'Mensonge et trahison : l\'hypocrisie et la calomnie s\'allient. Méfiez-vous des apparences trompeuses et des langues de vipère.' },
    { ids: ['36','58'], label: 'Cœur Partagé · Croix',
      text: 'Deuil amoureux et épreuve affective : le chagrin rencontre la croix à porter. Une période douloureuse mais profondément transformatrice.' },
    { ids: ['39','59'], label: 'Rat · Chauve-Souris',
      text: 'Perte et trahison dans l\'ombre : ce qui vous est dérobé et les dangers invisibles. Redoublez de vigilance dans vos affaires et votre entourage proche.' },

    /* Évolution et transformation */
    { ids: ['13','03'], label: 'Papillon · Printemps',
      text: 'Métamorphose et renouveau : la transformation du Papillon s\'épanouit dans l\'énergie du Printemps. Tout renaît, tout devient possible.' },
    { ids: ['13','16'], label: 'Papillon · Route',
      text: 'Choix transformateur : un nouveau chemin s\'ouvre après une métamorphose intérieure. La voie est libre pour une nouvelle direction de vie.' },
    { ids: ['10','27'], label: 'Bateau · Oiseau',
      text: 'Messages d\'ailleurs et horizons nouveaux : un voyage annoncé, des nouvelles venues de loin. L\'appel du large se fait entendre.' },
    { ids: ['10','16'], label: 'Bateau · Route',
      text: 'Départ et direction : le voyage s\'apprête et la route se trace. Une période de grands mouvements et de décisions spatiales.' },

    /* Guérison et apaisement */
    { ids: ['60','17'], label: 'Colombe · Étoile',
      text: 'Paix et espoir réunis : la Colombe apporte l\'apaisement que l\'Étoile avait promise. Guérison profonde et renouveau de la foi.' },
    { ids: ['35','33'], label: 'Hôpital · Stéthoscope',
      text: 'Santé sous surveillance : le soin est en cours et l\'écoute médicale est active. Prenez les traitements nécessaires avec confiance.' },
    { ids: ['37','54'], label: 'Coquillage · Campagne',
      text: 'Repos réparateur au vert : la pause et la nature s\'unissent pour régénérer corps et esprit. Offrez-vous cette trêve bienfaisante.' },
    { ids: ['38','52'], label: 'Éléphant · Homme Âgé',
      text: 'Sagesse transmise par les anciens : la mémoire et l\'expérience se conjuguent. Un enseignement précieux vous est offert, recevez-le avec respect.' },

    /* Cartes personnages */
    { ids: ['47','48'], label: 'Femme · Homme',
      text: 'Rencontre du masculin et du féminin : deux figures mûres qui se complètent. Une relation d\'égal à égal, fondée sur la maturité et le respect mutuel.' },
    { ids: ['49','50'], label: 'Consultante · Consultant',
      text: 'La consultante et le consultant réunis : toutes les forces sont en vous. Puissance féminine et masculine intérieures en parfait équilibre.' },

    /* Combinaisons décisionnelles */
    { ids: ['16','42'], label: 'Route · Flèches',
      text: 'Décision rapide sur le chemin : la Route ouvre les possibles, les Flèches désignent la direction. Ne tardez plus — l\'action est requise maintenant.' },
    { ids: ['30','44'], label: 'Balance · Justice',
      text: 'Équité complète : la Balance pèse, la Justice tranche. Une décision légale ou un arbitrage impartial vous attend. Le droit est de votre côté si vous êtes juste.' },
    { ids: ['29','61'], label: 'Poignée de Mains · Parchemin',
      text: 'Accord officialisé : l\'engagement verbal devient contrat écrit. Une alliance scellée sur le papier — mariage, partenariat, signature importante.' },

    /* Transformations et guidance */
    { ids: ['13','17'], label: 'Papillon · Étoile',
      text: 'Transformation guidée : la métamorphose du Papillon est éclairée par la lumière de l\'Étoile. Une évolution profonde et protégée, portée par une guidance supérieure.' },
    { ids: ['17','21'], label: 'Étoile · Trois Lunes',
      text: 'Intuition et guidance réunies : l\'Étoile éclaire, les Trois Lunes chuchotent. Faites confiance à vos rêves et à vos pressentiments — ils vous guident juste.' },
    { ids: ['14','22'], label: 'Pensée · Bougie',
      text: 'Méditation éclairée : la réflexion profonde rencontre la lumière spirituelle. Un temps de recul inspiré — la réponse viendra dans le silence intérieur.' },

    /* Épreuves et traversées */
    { ids: ['26','58'], label: 'Désert · Croix',
      text: 'Épreuve solitaire : la traversée du Désert alourdie par la Croix. Une période difficile mais profondément initiatique — chaque pas dans le vide vous transforme.' },
    { ids: ['01','58'], label: 'Soleil · Croix',
      text: 'Épreuve éclairée : la lumière du Soleil traverse la Croix. Une difficulté qui, une fois surmontée, ouvre sur une renaissance lumineuse et un succès durable.' },
    { ids: ['41','58'], label: 'Hiver · Croix',
      text: 'Épreuve hivernale : le froid de l\'Hiver et le poids de la Croix. Une traversée rude mais qui prépare le terrain du renouveau — patience et endurance.' },

    /* Relations et affections */
    { ids: ['02','28'], label: 'Rose · Cadeau',
      text: 'Déclaration amoureuse : la tendresse de la Rose reçoit le Cadeau. Un geste d\'amour, une surprise romantique, une demande qui vient du cœur.' },
    { ids: ['06','31'], label: 'Deux Cœurs · Chien',
      text: 'Fidélité amoureuse : l\'union des Deux Cœurs scellée par la loyauté du Chien. Un amour sincère et durable, fondé sur la confiance mutuelle.' },
    { ids: ['15','36'], label: 'Symboles Sexuels · Cœur Partagé',
      text: 'Désir et rupture : la passion physique confrontée à la séparation affective. Un conflit entre le corps qui désire et le cœur qui souffre — clarifiez vos sentiments.' },

    /* Force et harmonie */
    { ids: ['11','43'], label: 'Lion · Harpe',
      text: 'Autorité douce : la puissance du Lion tempérée par l\'harmonie de la Harpe. Un leadership qui inspire plutôt qu\'il n\'impose — la force dans la grâce.' },
    { ids: ['38','09'], label: 'Éléphant · Escargot',
      text: 'Progrès lents mais sûrs : la sagesse de l\'Éléphant alliée à la patience de l\'Escargot. Rien ne presse — chaque petit pas vous rapproche du but avec certitude.' },
    { ids: ['37','43'], label: 'Coquillage · Harpe',
      text: 'Écoute apaisée : le repos du Coquillage et l\'harmonie de la Harpe. Une pause musicale, un ressourcement par l\'art et la beauté — laissez-vous porter.' },

    /* Nouveaux départs */
    { ids: ['10','18'], label: 'Bateau · Cigogne',
      text: 'Nouveau départ au loin : le voyage du Bateau et la naissance annoncée par la Cigogne. Un changement de vie radical — départ, déménagement, nouvelle existence.' },
    { ids: ['04','54'], label: 'Feu · Campagne',
      text: 'Racines dans la nature : le foyer protecteur du Feu et la sérénité de la Campagne. Un équilibre entre sécurité domestique et ressourcement naturel.' },

    /* Travail et réalisation */
    { ids: ['23','56'], label: 'Outils · Pyramide',
      text: 'Travail concret menant à l\'édification : chaque outil contribue à bâtir la pyramide. La persévérance dans l\'effort construit une réussite solide.' },
    { ids: ['23','16'], label: 'Outils · Route',
      text: 'Travail en chemin : les Outils sont prêts, la Route s\'ouvre. Mettez vos compétences en mouvement — le travail mène à une nouvelle direction.' },

    /* Ombres et dangers */
    { ids: ['08','12'], label: 'Araignée · Poignard',
      text: 'Piège agressif : la toile de l\'Araignée traversée par le Poignard. Attention aux manipulations qui cachent des intentions hostiles — ouvrez les yeux.' },
    { ids: ['32','57'], label: 'Serpent · Lynx',
      text: 'Trahison démasquée : le venin du Serpent percé par le regard du Lynx. La vérité éclate — ce qui était caché est révélé, la lucidité triomphe.' },
    { ids: ['33','60'], label: 'Stéthoscope · Colombe',
      text: 'Guérison apaisée : le diagnostic du Stéthoscope suivi par la paix de la Colombe. Un parcours de soins qui aboutit à la guérison — faites confiance au processus.' },

    /* ── Paires oracle-de-ge.com ──────────────────────────────────────────── */
    /* Rayonnement et transformation */
    { ids: ['01','03'], label: 'Soleil · Printemps',
      text: 'Renaissance éclatante : la lumière solaire sur le renouveau printanier. Un nouveau départ placé sous les meilleurs auspices — tout fleurit, tout réussit.' },
    { ids: ['01','05'], label: 'Soleil · Tours',
      text: 'Succès visible et structuré : l\'éclat solaire sur une construction solide. Vos réalisations attirent la reconnaissance dans un cadre officiel ou professionnel.' },
    { ids: ['13','04'], label: 'Papillon · Feu',
      text: 'Transformation fulgurante : la légèreté du Papillon traversée par l\'intensité du Feu. Un changement radical et passionné — osez la métamorphose complète.' },
    { ids: ['14','22'], label: 'Pensée · Bougie',
      text: 'Clarté intérieure : la réflexion de la Pensée éclairée par la flamme de la Bougie. Vos idées trouvent leur vérité dans la lumière de l\'intuition — méditez avant d\'agir.' },

    /* Amour et relations */
    { ids: ['02','28'], label: 'Rose · Cadeau',
      text: 'Don du cœur : la tendresse de la Rose et la générosité du Cadeau. Un geste d\'amour désintéressé ou une surprise affective — l\'amour s\'exprime avec grâce.' },
    { ids: ['06','31'], label: 'Deux Cœurs · Chien',
      text: 'Fidélité amoureuse : l\'union des Deux Cœurs protégée par la loyauté du Chien. Une relation solide, sincère et durable — l\'amour dans ce qu\'il a de plus loyal.' },
    { ids: ['15','36'], label: 'Symboles Sexuels · Cœur Partagé',
      text: 'Désir et partage : l\'énergie vitale des Symboles Sexuels rencontre le lien du Cœur Partagé. La passion physique s\'approfondit en connexion émotionnelle.' },
    { ids: ['02','18'], label: 'Rose · Cigogne',
      text: 'Naissance d\'un sentiment : la Rose éclose et la Cigogne qui apporte le renouveau. Un amour naissant, l\'arrivée d\'un enfant ou une nouvelle page affective.' },

    /* Carrière et ambition */
    { ids: ['23','01'], label: 'Outils · Soleil',
      text: 'Artisan du succès : le travail concret des Outils illuminé par le Soleil. Vos efforts sont reconnus et récompensés — la maîtrise rencontre la gloire.' },
    { ids: ['11','56'], label: 'Lion · Pyramide',
      text: 'Leadership bâtisseur : la puissance du Lion au service d\'une construction durable. Votre autorité naturelle édifie un héritage solide et respecté.' },
    { ids: ['61','56'], label: 'Parchemin · Pyramide',
      text: 'Savoir fondateur : la connaissance du Parchemin érigée en monument. Un projet basé sur l\'étude, l\'écrit ou la transmission — construisez sur des bases solides.' },

    /* Spiritualité et intuition */
    { ids: ['59','60'], label: 'Chauve-Souris · Colombe',
      text: 'L\'ombre vers la lumière : les peurs de la Chauve-Souris apaisées par la Colombe. Un passage initiatique qui débouche sur la paix — faites confiance au processus.' },
    { ids: ['58','60'], label: 'Croix · Colombe',
      text: 'Paix après l\'épreuve : le poids de la Croix allégé par la Colombe. L\'acceptation mène à la libération — une souffrance traversée débouche sur la sérénité.' },
    { ids: ['57','59'], label: 'Lynx · Chauve-Souris',
      text: 'Clairvoyance dans l\'ombre : le regard perçant du Lynx et l\'intuition nocturne de la Chauve-Souris. Rien ne vous échappe — vous percevez l\'invisible avec acuité.' },

    /* Défis et avertissements */
    { ids: ['12','53'], label: 'Poignard · Flûte Brisée',
      text: 'Rupture brutale : le coup du Poignard suivi du silence de la Flûte Brisée. Une fin douloureuse mais nécessaire — ce qui se brise ne résonnait plus juste.' },
    { ids: ['32','39'], label: 'Serpent · Rat',
      text: 'Trahison et spoliation : la perfidie du Serpent et la perte du Rat. Attention aux personnes malintentionnées — protégez vos biens et votre intégrité.' },
    { ids: ['08','32'], label: 'Araignée · Serpent',
      text: 'Toile empoisonnée : la manipulation de l\'Araignée alliée à la trahison du Serpent. Une situation complexe où les apparences sont trompeuses — restez lucide.' },

    /* Famille et foyer */
    { ids: ['04','54'], label: 'Feu · Campagne',
      text: 'Retour aux sources : la chaleur du foyer et la sérénité de la campagne. Besoin de vous ressourcer dans un cadre simple et authentique — la nature vous appelle.' },
    { ids: ['45','51'], label: 'Jeune Fille · Femme Âgée',
      text: 'Transmission féminine : la fraîcheur de la Jeune Fille guidée par la sagesse de la Femme Âgée. Un lien intergénérationnel précieux — écoutez les conseils d\'expérience.' },
  ];

  /* ── Triades (combinaisons de 3 cartes) ───────────────────────────────── */
  var TRIADS = [
    { ids: ['01','02','06'], label: 'Soleil · Rose · Deux Cœurs',
      text: 'Trinité amoureuse : rayonnement, tendresse et union. Une relation exceptionnelle placée sous les plus hautes auspices — amour véritable et durable.' },
    { ids: ['01','11','56'], label: 'Soleil · Lion · Pyramide',
      text: 'Triomphe absolu : puissance, rayonnement et réussite monumentale. Une ascension remarquable qui mène au sommet de la reconnaissance.' },
    { ids: ['07','19','34'], label: 'Chiffres · Argent · Écureuil',
      text: 'Prospérité complète : la chance, le gain et l\'épargne forment un triangle financier parfait. Sécurité et abondance durable.' },
    { ids: ['12','32','57'], label: 'Poignard · Serpent · Lynx',
      text: 'Triangle des ténèbres : conflit, trahison et mensonge s\'entrelacent. Une période de vigilance extrême — protégez vos arrières et votre cœur.' },
    { ids: ['36','53','58'], label: 'Cœur Partagé · Flûte Brisée · Croix',
      text: 'La trilogie de l\'épreuve : rupture, destruction et deuil. Une traversée douloureuse mais nécessaire — après la destruction vient la reconstruction.' },
    { ids: ['17','60','22'], label: 'Étoile · Colombe · Bougie',
      text: 'Triade spirituelle : espoir, paix et foi intérieure. La lumière guide votre chemin — faites confiance à l\'invisible qui veille sur vous.' },
    { ids: ['10','27','03'], label: 'Bateau · Oiseau · Printemps',
      text: 'La triple promesse d\'horizons nouveaux : départ, message et renouveau. Une page se tourne, un chapitre neuf s\'ouvre devant vous.' },
    { ids: ['02','06','29'], label: 'Rose · Deux Cœurs · Poignée de Mains',
      text: 'L\'amour dans sa plénitude : de la tendresse à l\'union, puis à l\'engagement. Un cheminement amoureux complet vers une relation épanouie et durable.' },
    { ids: ['31','38','56'], label: 'Chien · Éléphant · Pyramide',
      text: 'Trinité de la réussite durable : la fidélité du Chien, la sagesse de l\'Éléphant et la solidité de la Pyramide. Un succès construit sur la loyauté, la prudence et la persévérance.' },
    { ids: ['09','26','58'], label: 'Escargot · Désert · Croix',
      text: 'Trilogie de la patience : la lenteur de l\'Escargot, la traversée du Désert et l\'épreuve de la Croix. Rien ne presse — chaque épreuve traversée vous rapproche de la renaissance.' },
    { ids: ['04','37','54'], label: 'Feu · Coquillage · Campagne',
      text: 'Trilogie du repos : le foyer protecteur, la pause réparatrice et la sérénité naturelle. Accordez-vous une trêve complète — corps, cœur et esprit vous remercieront.' },
    { ids: ['02','06','18'], label: 'Rose · Deux Cœurs · Cigogne',
      text: 'Naissance d\'un amour : la tendresse de la Rose, l\'union des Deux Cœurs et le nouveau départ de la Cigogne. Un amour naissant ou un enfant à venir — vie nouvelle et sentiment pur.' },
    { ids: ['33','35','60'], label: 'Stéthoscope · Hôpital · Colombe',
      text: 'Parcours de guérison : l\'écoute médicale, les soins nécessaires et l\'apaisement final. Un chemin de santé qui, bien que difficile, aboutit à la guérison et à la paix.' },
    { ids: ['08','32','39'], label: 'Araignée · Serpent · Rat',
      text: 'Triangle des pertes : manipulation, trahison et vol s\'entrelacent. Une période de grande vigilance — protégez vos biens, votre cœur et votre intégrité.' },
    { ids: ['23','01','56'], label: 'Outils · Soleil · Pyramide',
      text: 'Succès opérationnel complet : le travail concret des Outils, l\'éclat du Soleil et l\'édification de la Pyramide. Tous les feux sont au vert pour une réussite magistrale.' },

    /* ── Triades oracle-de-ge.com ─────────────────────────────────────────── */
    { ids: ['01','03','13'], label: 'Soleil · Printemps · Papillon',
      text: 'Renaissance lumineuse : le rayonnement solaire, le renouveau printanier et la métamorphose du Papillon. Transformation complète et positive — un nouveau vous émerge.' },
    { ids: ['26','58','60'], label: 'Désert · Croix · Colombe',
      text: 'De l\'épreuve à la paix : la traversée du Désert, le poids de la Croix et l\'apaisement de la Colombe. Toute épreuve traversée avec courage débouche sur la sérénité.' },
    { ids: ['45','47','51'], label: 'Jeune Fille · Femme · Femme Âgée',
      text: 'Les trois âges du féminin : la jeunesse, la maturité et la sagesse. Une lignée de femmes vous guide — honorez votre féminin sacré à chaque étape de la vie.' },
    { ids: ['61','17','60'], label: 'Parchemin · Étoile · Colombe',
      text: 'Message de paix céleste : la connaissance du Parchemin, la guidance de l\'Étoile et la paix de la Colombe. Une révélation spirituelle ou une bonne nouvelle importante approche.' },
    { ids: ['48','50','52'], label: 'Homme · Consultant · Homme Âgé',
      text: 'Lignée masculine : l\'action, la conscience de soi et la sagesse. Un cheminement masculin complet — du faire à l\'être, en passant par la maturité.' },
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
      'positive': 'Les cartes positives dominent ce tirage : une énergie favorable, des opportunités lumineuses et un optimisme de circonstance. Les forces bénéfiques sont de votre côté.',
      'negative': 'Les cartes négatives sont majoritaires dans ce tirage : des défis, des avertissements et des blocages sont au premier plan. Prenez ces cartes comme des conseils de prudence, non comme des fatalités.',
      'neutral': 'Les cartes neutres dominent : la pondération et la réflexion sont de mise. Le tirage suggère une période d\'observation, de recul et de décision mûrie.'
    };

    return { dominant: dominant, count: max, total: cards.length, text: readings[dominant] || '' };
  }

  /* ── Utilitaires ────────────────────────────────────────────────────────── */
  function isReversed(card) {
    return !!(card && card.reversed);
  }

  function getTheme(card, useShadow) {
    if (!card) return '';
    // Inverser la logique shadow si la carte est retournée
    if (isReversed(card)) useShadow = !useShadow;
    return useShadow ? (card.shadow || card.theme) : card.theme;
  }

  function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /* Retourne la tonalité effective en tenant compte du sens (endroit/inversé).
     Une carte positive inversée devient négative (énergie contrariée).
     Une carte négative inversée devient positive (obstacle surmonté).
     Une carte neutre reste neutre. */
  function getEffectiveTone(card) {
    if (!card) return '';
    var t = card.tone;
    if (!isReversed(card)) return t;
    // Inverser positive ↔ négative
    if (t === 'positive') return 'négative';
    if (t === 'négative') return 'positive';
    return t; // neutre, neutre-magique, etc. inchangés
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

  /* ── Détection des cartes saisonnières ───────────────────────────────────── */
  var SEASON_IDS = ['03','24','41','55'];
  var SEASON_NAMES = { '03': 'Printemps', '24': 'Été', '41': 'Hiver', '55': 'Automne' };
  var SEASON_PERIODS = { '03': 'mars à mai', '24': 'juin à août', '41': 'décembre à février', '55': 'septembre à novembre' };

  function detectSeasons(cards) {
    var found = cards.filter(function(c) { return SEASON_IDS.indexOf(c.id) !== -1; });
    if (found.length === 0) return null;
    
    var names = found.map(function(c) { return c.name; });
    var periods = found.map(function(c) { return SEASON_PERIODS[c.id] || ''; });
    
    if (found.length === 1) {
      return 'La carte saison <strong>' + names[0] + '</strong> suggère une période autour de ' + periods[0] + ' comme moment-clé. ';
    } else if (found.length === 2) {
      return 'Les deux cartes saison <strong>' + names.join(' et ') + '</strong> délimitent un intervalle entre ' + periods[0] + ' et ' + periods[1] + '. ';
    } else {
      return 'Plusieurs cartes saison sont présentes (' + names.join(', ') + '), indiquant une tendance qui se déploie sur l\'ensemble d\'un cycle annuel. ';
    }
  }

  /* ── Détection des familles de cartes ────────────────────────────────────── */
  function detectFamilies(cards) {
    var families = { 'thématique': 0, 'personnage': 0, 'saison': 0 };
    cards.forEach(function(c) {
      if (c.family && families.hasOwnProperty(c.family)) families[c.family]++;
    });
    
    var dominant = null, max = 0;
    for (var f in families) {
      if (families[f] > max) { max = families[f]; dominant = f; }
    }
    
    if (!dominant || max < 2) return null;
    
    var labels = { 'thématique': 'cartes thématiques', 'personnage': 'personnages', 'saison': 'cartes saisonnières' };
    var intros = {
      'thématique': 'Le tirage est dominé par les situations et événements : votre attention est tournée vers les circonstances extérieures et leur impact sur votre vie.',
      'personnage': 'Les personnages dominent ce tirage : les relations humaines et les figures de votre entourage sont au cœur de la lecture.',
      'saison': 'Les cartes saisonnières colorent ce tirage : la temporalité et les cycles naturels rythment les événements à venir.'
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
           + 'La carte du présent, <strong>' + m.name + '</strong>' + (isReversed(m) ? ' (inversée)' : '') + ', est le pivot qui révèle comment passer de l\'origine à la destination. ';
    } else if (spreadType === 'croix') {
      var cons = cards[0], obs = cards[3], synth = cards[4];
      text = 'Entre votre situation marquée par <strong>' + cons.name + '</strong>' + (isReversed(cons) ? ' (inversée)' : '') + ' et l\'obstacle de <strong>' + obs.name + '</strong>' + (isReversed(obs) ? ' (inversée)' : '') + ' (' + getTheme(obs, true) + '), l\'énergie maîtresse est <strong>' + synth.name + '</strong> : ' + getTheme(synth, false) + '. ';
    } else if (spreadType === 'etoile') {
      var centre = cards[0], resultat = cards[6];
      text = 'Au cœur de l\'étoile, <strong>' + centre.name + '</strong>' + (isReversed(centre) ? ' (inversée)' : '') + ' (' + getTheme(centre, false) + ') rayonne comme l\'énergie centrale. Les six branches convergent vers <strong>' + resultat.name + '</strong>' + (isReversed(resultat) ? ' (inversée)' : '') + ' (' + getTheme(resultat, false) + ') — l\'aboutissement de toutes les forces en présence. ';
    }

    if (revCount > 0) {
      text += '<em>' + revCount + ' carte' + (revCount > 1 ? 's' : '') + ' inversée' + (revCount > 1 ? 's' : '') + ' : l\'énergie est intériorisée, contrariée ou en cours de retournement. </em>';
    }

    if (tonalInfo && tonalInfo.dominant) {
      text += tonalInfo.text + ' ';
    }

    // Détection temporelle (saisons)
    var seasonText = detectSeasons(cards);
    if (seasonText) text += seasonText;

    // Détection des familles
    var familyText = detectFamilies(cards);
    if (familyText) text += familyText;

    if (triads.length > 0) {
      text += 'La constellation <strong>' + triads[0].label + '</strong> est particulièrement significative : ' + triads[0].text + ' ';
    } else if (pairs.length > 0) {
      var labels = pairs.slice(0, 2).map(function (p) { return p.label; }).join(' et ');
      text += (pairs.length === 1 ? 'La résonance ' : 'Les résonances ') + labels + ' amplifient ce message. ';
    }

    text += 'L\'Oracle Gé n\'est pas un verdict — c\'est un éclairage du moment présent. Votre libre arbitre demeure la boussole suprême de votre chemin.';
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
      + '<div class="tr-header"><span class="tr-star">✦</span><h2 class="tr-title">Lecture de votre tirage Gé</h2></div>'
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
      var config = {
        cible: '#resultats',
        titre: 'ge-' + spreadType
      };
      html += window.PlateformePartage.construireBoutonsHTML(config);
    }

    html += '</div>';

    return html;
  }

  /* ── Lecture par plan ─────────────────────────────────────────────────── */
  function generatePlaneReading(spreadType, cards, plane) {
    if (!window.gePlanes) return '';
    var proj = window.gePlanes.projectSpread(cards, plane);
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
    if (!window.gePlanes) return '';
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
    if (window.gePlanes) {
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
