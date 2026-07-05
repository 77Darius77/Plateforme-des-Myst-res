/* Moteur d'interprétation pour le Tarot Rider-Waite-Smith — Tarologie v1 */
window.tarotRwsInterp = (function () {

  var CARD_DATA = {
    // ==================== ARCANES MAJEURS ====================
    '00': {
      theme:  'le saut de la foi — une confiance totale dans le voyage cosmique, guidée par l\'innocence pure',
      shadow: 'l\'insouciance dangereuse — avancer aveuglément sans voir le gouffre sous vos pieds'
    },
    '01': {
      theme:  'la force de canalisation — aligner le haut et le bas pour matérialiser vos intentions dans le concret',
      shadow: 'la manipulation des apparences — utiliser vos talents pour abuser d\'autrui ou illusionner'
    },
    '02': {
      theme:  'l\'écoute du murmure intérieur — la reliance directe à l\'inconscient et aux mystères de la nuit',
      shadow: 'les secrets étouffants — dissimuler des vérités par peur du jugement ou par repli craintif'
    },
    '03': {
      theme:  'l\'énergie de la terre nourricière — cultiver la beauté, l\'abondance et la créativité organique',
      shadow: 'l\'étouffement affectif — vouloir tout contrôler sous prétexte de protéger, créant une dépendance'
    },
    '04': {
      theme:  'la fondation solide — ériger des structures stables et assumer une autorité bienveillante et protectrice',
      shadow: 'la tyrannie rigide — imposer un ordre sec et intransigeant par peur de perdre le contrôle'
    },
    '05': {
      theme:  'la transmission des valeurs — l\'enseignement d\'une sagesse éprouvée par le temps et la structure',
      shadow: 'l\'orthodoxie stérile — s\'accrocher à des rituels ou dogmes obsolètes vides de sens spirituel'
    },
    '06': {
      theme:  'l\'alignement des désirs — faire le choix du cœur en parfaite harmonie avec vos valeurs essentielles',
      shadow: 'la désunion intérieure — la dispersion affective et la difficulté à faire un choix authentique'
    },
    '07': {
      theme:  'la maîtrise triomphante — diriger les forces opposées de votre char pour avancer avec volonté',
      shadow: 'la perte de direction — une agitation excessive qui mène au surmenage ou à la rupture'
    },
    '08': {
      theme:  'la puissance de la douceur — dompter votre lion intérieur par la compassion et la patience d\'esprit',
      shadow: 'la faiblesse face aux pulsions — se laisser submerger par la colère ou réprimer violemment ses désirs'
    },
    '09': {
      theme:  'la recherche de la lumière intérieure — s\'éloigner du bruit pour trouver la sagesse dans le silence',
      shadow: 'le repli misanthrope — s\'isoler du monde par fierté ou par refus de partager son fardeau'
    },
    '10': {
      theme:  'le timing parfait de l\'univers — embrasser le changement et comprendre les lois des cycles naturels',
      shadow: 'la résistance aux tournants — s\'obstiner à retenir une roue qui doit nécessairement tourner'
    },
    '11': {
      theme:  'la vérité lucide — assumer les conséquences de ses choix passés avec droiture et discernement',
      shadow: 'l\'injustice subie ou projetée — la partialité subjective qui refuse de voir sa propre responsabilité'
    },
    '12': {
      theme:  'le sacrifice éclairé — lâcher prise sur le contrôle pour obtenir une vision lumineuse et renversée',
      shadow: 'la victimisation passive — subir un blocage sans chercher à en comprendre la leçon spirituelle'
    },
    '13': {
      theme:  'la fin d\'un chapitre obsolète — couper les liens morts pour permettre l\'émergence d\'une nouvelle aube',
      shadow: 'l\'angoisse de la perte — lutter désespérément contre un deuil ou un changement inéluctable'
    },
    '14': {
      theme:  'l\'alchimie guérisseuse — transmuter les énergies opposées par un dosage patient et harmonieux',
      shadow: 'le manque d\'alignement — l\'instabilité d\'humeur et l\'incapacité à trouver la paix intérieure'
    },
    '15': {
      theme:  'la prise de conscience des chaînes — regarder en face vos attachements et désirs d\'emprise pour vous libérer',
      shadow: 'l\'asservissement volontaire — se complaire dans les dépendances, la luxure ou la manipulation de l\'ego'
    },
    '16': {
      theme:  'l\'illumination libératrice — la destruction brutale de la forteresse de l\'ego pour retrouver la vérité',
      shadow: 'la ruine subie — la peur panique de l\'effondrement de vos certitudes et le déni du chaos'
    },
    '17': {
      theme:  'la source d\'espérance pure — verser vos émotions avec générosité sous un ciel constellé d\'étoiles',
      shadow: 'la perte de foi — le sentiment de vide spirituel, le doute ou la naïveté déconnectée du réel'
    },
    '18': {
      theme:  'le voyage dans les profondeurs de l\'âme — apprivoiser l\'inconnu, l\'intuition et les mondes oniriques',
      shadow: 'l\'égarement dans l\'angoisse — être paralysé par des fantasmes irrationnels ou des mensonges'
    },
    '19': {
      theme:  'la clarté enfantine retrouvée — rayonner de joie pure, de vitalité et d\'authenticité bienveillante',
      shadow: 'le besoin d\'exposer sa vie — l\'égocentrisme qui cherche à éblouir autrui sans chaleur réelle'
    },
    '20': {
      theme:  'l\'appel de la conscience supérieure — entendre la trompette du réveil et renaître lavé du passé',
      shadow: 'le refus de s\'éveiller — ignorer sa vocation ou culpabiliser sans cesse sur ses erreurs passées'
    },
    '21': {
      theme:  'la plénitude et l\'intégration finale — danser au centre de la couronne, en harmonie avec le grand Tout',
      shadow: 'la réussite inachevée — la peur de franchir le dernier pas ou d\'ouvrir un nouveau cycle'
    },

    // ==================== BÂTONS (WANDS) ====================
    'W01': {
      theme:  'l\'étincelle créatrice primitive — la force de volonté pure prête à s\'embraser pour un nouveau cycle',
      shadow: 'l\'impatience stérile — une passion désordonnée qui s\'éteint aussitôt par manque de persévérance'
    },
    'W02': {
      theme:  'la vision à l\'horizon — planifier l\'avenir en tenant le monde entre vos mains avec ambition',
      shadow: 'la peur du départ — rester figé au sommet de votre tour, hésitant face au grand inconnu'
    },
    'W03': {
      theme:  'l\'attente active et confiante — observer les navires du succès revenir chargés d\'opportunités',
      shadow: 'les retards contrariants — l\'incapacité à anticiper ou le sentiment d\'être bloqué sur place'
    },
    'W04': {
      theme:  'le foyer chaleureux — célébrer une étape franchie avec ceux qui partagent votre cœur',
      shadow: 'l\'instabilité domestique — des tensions sous le toit ou une joie superficielle'
    },
    'W05': {
      theme:  'la joute stimulante — affronter l\'adversité de façon ludique pour tester vos limites',
      shadow: 'la discorde stérile — des querelles épuisantes et une dispersion d\'énergie'
    },
    'W06': {
      theme:  'le couronnement public — recevoir les honneurs mérités sous les acclamations',
      shadow: 'l\'orgueil vaniteux — le besoin maladif de reconnaissance extérieure ou une fausse victoire'
    },
    'W07': {
      theme:  'la défense acharnée — tenir fermement votre position élevée face aux défis extérieurs',
      shadow: 'la capitulation sous le nombre — se laisser déborder par la pression ou douter de ses convictions'
    },
    'W08': {
      theme:  'les flèches de la vitesse — des événements fulgurants qui s\'alignent à un rythme effréné',
      shadow: 'la précipitation chaotique — foncer sans réfléchir et rater sa cible'
    },
    'W09': {
      theme:  'la persévérance du guerrier — rester debout malgré la fatigue pour protéger le dernier rempart',
      shadow: 'la paranoïa défensive — voir des ennemis partout et s\'épuiser dans une garde inutile'
    },
    'W10': {
      theme:  'le fardeau final — porter courageusement une charge lourde qui touche bientôt à sa fin',
      shadow: 'le burn-out écrasant — s\'effondrer sous le poids de responsabilités qui ne vous appartiennent pas'
    },
    'W11': {
      theme:  'l\'enthousiasme juvénile — accueillir une nouvelle idée créative avec la passion de la jeunesse',
      shadow: 'l\'agitation brouillonne — s\'enflammer pour tout sans jamais concrétiser la moindre idée'
    },
    'W12': {
      theme:  'l\'élan intrépide — foncer avec fougue et magnétisme vers de nouvelles aventures',
      shadow: 'la colère impulsive — une agressivité stérile ou une fuite en avant désordonnée'
    },
    'W13': {
      theme:  'le charisme rayonnant — gouverner votre vie avec chaleur, indépendance et générosité d\'esprit',
      shadow: 'la jalousie possessive — le besoin d\'attirer toute l\'attention sur soi de façon théâtrale'
    },
    'W14': {
      theme:  'le leader visionnaire — inspirer le monde par votre volonté tranquille et votre sens de l\'action',
      shadow: 'le despote colérique — imposer sa volonté de force sans tenir compte des sensibilités d\'autrui'
    },

    // ==================== COUPES (CUPS) ====================
    'C01': {
      theme:  'le calice de l\'amour pur — laisser déborder vos émotions et votre intuition spirituelle',
      shadow: 'le vide affectif — bloquer ses sentiments ou se laisser submerger par une hypersensibilité'
    },
    'C02': {
      theme:  'la connexion des âmes — échanger une coupe d\'amour dans un partenariat profondément équilibré',
      shadow: 'la discorde relationnelle — la rupture de communication ou un déséquilibre affectif majeur'
    },
    'C03': {
      theme:  'la communion fraternelle — célébrer la joie d\'être ensemble et de partager la beauté de la vie',
      shadow: 'l\'excès festif — se perdre dans les plaisirs superficiels pour fuir sa solitude'
    },
    'C04': {
      theme:  'le retrait méditatif — contempler ses insatisfactions intérieures, quitte à rater une offre',
      shadow: 'le cynisme blasé — refuser toute aide par pure bouderie émotionnelle'
    },
    'C05': {
      theme:  'le deuil nécessaire — pleurer sur ce qui est perdu pour mieux apprécier ce qui subsiste',
      shadow: 'la complaisance dans la tristesse — refuser de tourner la tête pour voir les verres pleins'
    },
    'C06': {
      theme:  'la nostalgie bienveillante — honorer la pureté des souvenirs d\'enfance pour guérir le présent',
      shadow: 'l\'idéalisation du passé — fuir les responsabilités d\'aujourd\'hui dans un hier imaginaire'
    },
    'C07': {
      theme:  'l\'éventail des désirs — explorer la multiplicité des possibles tout en gardant son discernement',
      shadow: 'l\'égarement dans l\'illusion — se laisser tenter par des chimères irréalistes ou des addictions'
    },
    'C08': {
      theme:  'le pèlerinage volontaire — tourner le dos aux coupes connues pour chercher une vérité plus haute',
      shadow: 'la fuite lâche — abandonner un projet ou un engagement à la moindre difficulté émotionnelle'
    },
    'C09': {
      theme:  'la satisfaction du gourmet — savourer pleinement le confort et l\'harmonie de votre quotidien',
      shadow: 'l\'autosatisfaction égoïste — se complaire dans son confort en ignorant le besoin des autres'
    },
    'C10': {
      theme:  'l\'arc-en-ciel de plénitude — vivre l\'harmonie familiale et affective dans une joie partagée',
      shadow: 'la façade superficielle — simuler le bonheur familial parfait pour cacher les fêlures'
    },
    'C11': {
      theme:  'l\'éveil de la sensibilité — recevoir un message affectueux ou accueillir une intuition poétique',
      shadow: 'la fragilité puérile — une instabilité émotionnelle ou des caprices infantiles'
    },
    'C12': {
      theme:  'le chevalier romantique — avancer vers l\'idéal amoureux avec poésie et douceur',
      shadow: 'l\'illusionniste séducteur — promettre la lune sans intention de s\'engager réellement'
    },
    'C13': {
      theme:  'la reine de l\'empathie — lire dans les cœurs avec compassion et faire confiance aux mystères',
      shadow: 'l\'insécurité affective — se laisser submerger par les projections émotionnelles d\'autrui'
    },
    'C14': {
      theme:  'le sage des émotions — maintenir un calme olympien et conseiller autrui avec diplomatie',
      shadow: 'la manipulation froide — masquer ses sentiments sous un calme trompeur pour dominer'
    },

    // ==================== ÉPÉES (SWORDS) ====================
    'S01': {
      theme:  'le glaive du discernement — trancher la confusion pour faire éclater la vérité absolue',
      shadow: 'la violence verbale — utiliser l\'intellect comme une arme pour blesser ou détruire'
    },
    'S02': {
      theme:  'la trêve des yeux bandés — pacifier l\'esprit temporairement en attendant le choix juste',
      shadow: 'l\'indécision paralysante — refuser de choisir par lâcheté face aux conséquences'
    },
    'S03': {
      theme:  'la blessure nécessaire — vivre la douleur d\'une vérité qui brise une illusion du cœur',
      shadow: 'la rancœur tenace — s\'accrocher à la trahison passée pour refuser de guérir'
    },
    'S04': {
      theme:  'le repos du guerrier — s\'offrir une parenthèse de silence et de convalescence mentale',
      shadow: 'la léthargie dépressive — s\'isoler du monde par peur d\'affronter la vie active'
    },
    'S05': {
      theme:  'la défaite honorable ou la victoire amère — accepter que certains combats détruisent le vainqueur',
      shadow: 'la malveillance mesquine — savourer l\'humiliation d\'autrui ou trahir pour gagner'
    },
    'S06': {
      theme:  'la traversée des eaux calmes — s\'éloigner doucement des tourmentes vers un avenir serein',
      shadow: 'le voyage sans fin — errer sans ancrage en traînant ses regrets comme des bagages'
    },
    'S07': {
      theme:  'la stratégie discrète — contourner l\'obstacle par l\'astuce ou agir de façon autonome',
      shadow: 'la lâcheté fuyante — tricher, mentir ou fuir ses responsabilités en douce'
    },
    'S08': {
      theme:  'la cage ouverte — comprendre que vos liens mentaux sont les seuls obstacles réels',
      shadow: 'la victimisation absolue — se complaire dans l\'impuissance sans essayer de défaire ses liens'
    },
    'S09': {
      theme:  'l\'angoisse de minuit — affronter vos peurs et projections mentales qui semblent géantes',
      shadow: 'la rumination destructive — s\'enfermer dans des scénarios catastrophes imaginaires'
    },
    'S10': {
      theme:  'la fin du calvaire — accepter l\'effondrement total pour permettre à l\'aube de poindre',
      shadow: 'le drame exagéré — se complaire dans le rôle du martyr terrassé par le destin'
    },
    'S11': {
      theme:  'la vigilance de l\'esprit — analyser le monde avec un regard critique et affronter le vent debout',
      shadow: 'la parole blessante — critiquer sans fin ou espionner par pure méfiance'
    },
    'S12': {
      theme:  'la charge héroïque — foncer tête baissée pour défendre vos convictions par la pure logique',
      shadow: 'l\'arrogance aveugle — l\'agressivité intellectuelle qui refuse d\'écouter tout argument opposé'
    },
    'S13': {
      theme:  'la reine de la lucidité — observer le monde sans fard et exprimer la vérité avec dignité',
      shadow: 'le cynisme glacial — couper toute empathie pour se protéger derrière une armure de froideur'
    },
    'S14': {
      theme:  'la justice rationnelle — gouverner par la loi, la logique pure et l\'équité analytique',
      shadow: 'le juge cruel — appliquer des sentences froides et inhumaines sans aucune compassion'
    },

    // ==================== PENTACLES (PENTACLES) ====================
    'P01': {
      theme:  'la graine de prospérité — accueillir une opportunité matérielle ou physique de croissance',
      shadow: 'le gaspillage des ressources — négliger sa santé ou rater une chance financière concrète'
    },
    'P02': {
      theme:  'le jonglage fluide — adapter vos ressources aux fluctuations de la vie avec amusement',
      shadow: 'la dispersion instable — être débordé par le quotidien et perdre l\'équilibre des priorités'
    },
    'P03': {
      theme:  'l\'œuvre collective — unir les compétences pour bâtir un projet avec maîtrise technique',
      shadow: 'le manque de professionnalisme — refuser de collaborer ou bâcler son travail'
    },
    'P04': {
      theme:  'la forteresse d\'or — sécuriser ses acquis en érigeant des structures financières stables',
      shadow: 'l\'avarice craintive — s\'accrocher maladivement à la matière par peur irrationnelle du manque'
    },
    'P05': {
      theme:  'l\'épreuve du froid — traverser une période de privation pour redéfinir vos vraies valeurs',
      shadow: 'l\'isolement volontaire — passer à côté des secours disponibles par orgueil ou désespoir'
    },
    'P06': {
      theme:  'la charité bienveillante — équilibrer le flux de générosité en donnant et recevant avec équité',
      shadow: 'le pouvoir de l\'argent — donner pour asservir ou mendier en refusant d\'être autonome'
    },
    'P07': {
      theme:  'la récolte patiente — contempler le travail accompli et laisser mûrir les fruits du temps',
      shadow: 'l\'impatience stérile — vouloir forcer la pousse ou abandonner avant la récolte'
    },
    'P08': {
      theme:  'l\'artisan appliqué — façonner patiemment votre œuvre à force de discipline et d\'apprentissage',
      shadow: 'la routine monotone — se perdre dans un labeur mécanique dénué de sens ou de créativité'
    },
    'P09': {
      theme:  'le jardin d\'abondance — savourer votre indépendance matérielle et votre raffinement solitaire',
      shadow: 'la prison dorée — accorder trop d\'importance aux apparences de réussite pour cacher le vide'
    },
    'P10': {
      theme:  'l\'héritage durable — ancrer votre vie dans la sécurité d\'une transmission transgénérationnelle',
      shadow: 'les conflits de succession — des querelles familiales autour de biens matériels ou de traditions'
    },
    'P11': {
      theme:  'l\'apprenti appliqué — initier un projet concret ou des études avec rigueur et modestie',
      shadow: 'l\'utopie financière — rêver de richesse facile sans faire le moindre effort concret'
    },
    'P12': {
      theme:  'la persévérance infatigable — avancer avec méthode, patience et une fiabilité à toute épreuve',
      shadow: 'la routine stagnante — s\'enfermer dans un conservatisme rigide qui refuse toute nouveauté'
    },
    'P13': {
      theme:  'la générosité de la terre — cultiver le confort et nourrir son entourage avec pragmatisme',
      shadow: 'l\'attachement étouffant — compenser ses insécurités affectives par des cadeaux ou du luxe'
    },
    'P14': {
      theme:  'le roi de l\'abondance — assumer le succès financier et stabiliser un empire matériel avec sagesse',
      shadow: 'le spéculateur matérialiste — mesurer la valeur de l\'existence uniquement par le compte en banque'
    }
  };

  var SPREADS = {
    'croix-celtique': {
      intro: 'La Croix Celtique est la méthode de référence du Tarot Rider-Waite-Smith. Elle explore une question à travers 10 dimensions, reliant votre psyché inconsciente à votre destinée concrète.',
      positions: [
        { name: '1. La Situation présente', shadow: false, tpl: 'Au centre de votre vie actuelle, {TC}. C\'est l\'énergie qui colore directement votre quotidien.' },
        { name: '2. L\'Obstacle immédiat', shadow: true, tpl: 'Ce qui croise et défie votre élan porte le visage de {T}. C\'est le défi à relever pour grandir.' },
        { name: '3. L\'Inconscient / La Racine', shadow: false, tpl: 'La racine profonde et invisible de votre question réside dans {T}. Ce schéma inconscient nourrit la situation.' },
        { name: '4. Le Passé récent', shadow: false, tpl: 'L\'influence qui s\'éloigne mais vous influence encore est {T}. C\'est ce qui vous a conduit ici.' },
        { name: '5. Le Conscient / L\'Objectif', shadow: false, tpl: 'Ce vers quoi se tourne votre esprit conscient est {T}. C\'est le meilleur potentiel auquel vous aspirez.' },
        { name: '6. Le Futur proche', shadow: false, tpl: 'La prochaine étape sur votre chemin dessine {T}. Préparez-vous à accueillir cette vibration.' },
        { name: '7. Votre attitude intérieure', shadow: false, tpl: 'Votre état d\'esprit face à cette question est marqué par {T}. C\'est votre force ou votre filtre.' },
        { name: '8. L\'Environnement extérieur', shadow: false, tpl: 'Les influences extérieures, votre entourage ou les circonstances vous renvoient {T}.' },
        { name: '9. Vos Espoirs et Craintes', shadow: true, tpl: 'Dans le secret de votre cœur, {TC} oscille entre espoir de réussite et peur du blocage.' },
        { name: '10. L\'Issue finale', shadow: false, tpl: 'Si la trajectoire actuelle se maintient, l\'aboutissement de cette quête sera {T}.' }
      ]
    },
    'fer-a-cheval': {
      intro: 'Le Fer à Cheval est idéal pour analyser une prise de décision ou un projet sous 7 angles distincts.',
      positions: [
        { name: '1. Le Passé', shadow: false, tpl: 'Les fondations de votre situation découlent de {T}.' },
        { name: '2. Le Présent', shadow: false, tpl: 'La réalité du moment est caractérisée par {T}.' },
        { name: '3. Les Craintes / Doutes', shadow: true, tpl: 'Ce qui freine secrètement votre élan est {T}.' },
        { name: '4. L\'Obstacle concret', shadow: true, tpl: 'Le défi externe ou interne à surmonter est {T}.' },
        { name: '5. L\'Entourage et les aides', shadow: false, tpl: 'Ce que le monde extérieur ou vos alliés vous apportent est {T}.' },
        { name: '6. Le Conseil / La clé', shadow: false, tpl: 'La meilleure attitude à adopter maintenant est {T}.' },
        { name: '7. L\'Issue probable', shadow: false, tpl: 'L\'aboutissement logique de cette démarche s\'oriente vers {T}.' }
      ]
    },
    'relation': {
      intro: 'Ce tirage en 5 cartes explore la dynamique subtile entre vous et un partenaire (amical, amoureux ou professionnel).',
      positions: [
        { name: '1. Votre état d\'esprit', shadow: false, tpl: 'Dans ce lien, vous rayonnez ou ressentez {T}.' },
        { name: '2. L\'état d\'esprit de l\'autre', shadow: false, tpl: 'En face de vous, le partenaire traverse et manifeste {T}.' },
        { name: '3. La dynamique relationnelle', shadow: false, tpl: 'Le pont qui vous unit et l\'interaction entre vous portent la marque de {T}.' },
        { name: '4. Le défi ou obstacle commun', shadow: true, tpl: 'La friction ou le point de blocage que vous devez surmonter ensemble est {T}.' },
        { name: '5. Le potentiel d\'évolution', shadow: false, tpl: 'L\'horizon futur de cette relation promet d\'atteindre {T}.' }
      ]
    },
    'spirituel': {
      intro: 'Un alignement sacré en 3 cartes pour harmoniser vos différents plans de conscience : Corps, Mental et Esprit.',
      positions: [
        { name: '1. Le plan physique (Le Corps)', shadow: false, tpl: 'Votre ancrage terrestre et vos actions concrètes sont guidés par {T}.' },
        { name: '2. Le plan mental (La Pensée)', shadow: false, tpl: 'Votre réflexion, vos choix rationnels et vos croyances se structurent autour de {T}.' },
        { name: '3. Le plan spirituel (L\'Esprit)', shadow: false, tpl: 'Le message de votre âme et votre intuition profonde vibrent sous {T}.' }
      ]
    }
  };

  /* ── Résonances RWS ── */
  var PAIRS = [
    { ids: ['00','21'], label: 'Le Fou · Le Monde', text: 'Le voyage initiatique se referme : l\'innocence absolue du Fou trouve sa plénitude parfaite dans la danse sacrée du Monde. Un cycle majeur de votre vie s\'accomplit.' },
    { ids: ['01','02'], label: 'Le Magicien · La Grande Prêtresse', text: 'L\'alliance sacrée de l\'action consciente et du savoir intuitif. Ce tirage vous invite à marier votre volonté active à votre écoute passive pour réussir.' },
    { ids: ['03','04'], label: 'L\'Impératrice · L\'Empereur', text: 'L\'équilibre parfait entre le Féminin créateur et le Masculin structurant. Vos projets bénéficient à la fois d\'une inspiration fertile et d\'un cadre solide.' },
    { ids: ['15','16'], label: 'Le Diable · La Tour', text: 'Les chaînes de l\'illusion se brisent dans l\'orage. Un effondrement soudain mais extrêmement libérateur vous détache d\'une emprise toxique ou d\'une fausse croyance.' },
    { ids: ['17','18'], label: 'L\'Étoile · La Lune', text: 'La traversée de la nuit obscure de l\'âme guidée par l\'espérance céleste. Vos peurs inconscientes s\'apaisent sous la bienveillance d\'une bonne étoile.' }
  ];

  var TRIADS = [
    { ids: ['00','01','21'], label: 'Le Fou · Le Magicien · Le Monde', text: 'Le chemin de l\'initié : du saut créatif à la manifestation consciente pour finir dans la plénitude du grand Tout. Une réussite spirituelle et matérielle totale.' },
    { ids: ['13','16','20'], label: 'La Mort · La Tour · Le Jugement', text: 'La grande transmutation : la fin inéluctable d\'un cycle, la destruction des illusions de l\'ego, suivies immédiatement d\'une renaissance resplendissante.' }
  ];
  /* ── Moteur commun ──────────────────────────────────────────────────────── */
  return window.createTarotEngine({
    cardData: CARD_DATA,
    spreads: SPREADS,
    pairs: PAIRS,
    triads: TRIADS,
    planesGlobal: 'tarotRwsPlanes',
    passSpreadType: true,
    labels: {
      readingTitle: 'Lecture symbolique Rider-Waite-Smith',
      triadsHeader: 'Triades Sacrées',
      pairsHeader: 'Harmonies de cartes',
      synthesisHeader: 'Synthèse du Tirage'
    },
    synthesis: {
      useFamilies: false,
      openings: {
        'croix-celtique': function (cards, api) {
          var sit = cards[0], outcome = cards[9];
          return 'Votre situation présente animée par <strong>' + sit.name + '</strong> trouve son dénouement logique et constructif à travers <strong>' + outcome.name + '</strong> (' + api.getTheme(outcome, false) + '). ';
        },
        'fer-a-cheval': function (cards, api) {
          var conseil = cards[5], issue = cards[6];
          return 'Pour avancer au mieux face à ce défi, le tirage conseille d\'incarner l\'énergie de <strong>' + conseil.name + '</strong> afin d\'ouvrir la voie vers <strong>' + issue.name + '</strong>. ';
        },
        'relation': function (cards, api) {
          var dynamic = cards[2], fut = cards[4];
          return 'La relation repose actuellement sur l\'échange de <strong>' + dynamic.name + '</strong>, avec un très bel horizon de croissance vers <strong>' + fut.name + '</strong>. ';
        },
        'spirituel': function (cards, api) {
          var mental = cards[1], spirit = cards[2];
          return 'Votre mental orienté vers <strong>' + mental.name + '</strong> doit s\'aligner avec les appels spirituels de <strong>' + spirit.name + '</strong>. ';
        }
      },
      triadPhrase: function (triads) {
        return 'La présence de la triade <strong>' + triads[0].label + '</strong> signale un alignement de destin exceptionnel : ' + triads[0].text + ' ';
      },
      pairPhrase: function (pairs) {
        return 'La résonance de <strong>' + pairs[0].label + '</strong> enrichit le tirage : ' + pairs[0].text + ' ';
      },
      closing: 'Les cartes du Rider-Waite-Smith révèlent vos paysages mentaux et spirituels pour éclairer votre libre arbitre.'
    }
  });
})();
