(function () {
  'use strict';

  /* ─── Données des 12 signes ─── */
  var SIGNS = [
    { name: 'Bélier',      sym: '♈', el: 'Feu',   mod: 'Cardinal', ruler: 'Mars',    col: 'rose',
      kw: 'Initiative · Courage · Action · Pionnierisme',
      ascInterp: '<strong>L\'initiateur direct et actif.</strong> Avec l\'Ascendant Bélier, vous entrez dans le monde avec une démarche rapide et un regard franc. On vous perçoit immédiatement comme une présence dynamique, courageuse et indépendante, prête à relever tous les défis.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre réflexe instinctif face à l\'inconnu est de foncer et d\'agir. Vous dégagez une énergie d\'indépendance et de confiance en soi. Votre chemin d\'évolution consiste à développer la patience et l\'écoute active pour ne pas brusquer votre entourage.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Au travail, vous prenez immédiatement les devants. Vous aimez décider vite et agir sans attendre de consensus. Vous êtes excellent pour surmonter les obstacles de départ et insuffler une dynamique de groupe par votre enthousiasme.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Sur le plan relationnel, vous provoquez les rencontres et exprimez vos sentiments sans détour. Vous cherchez des relations dynamiques et détestez l\'ennui ou les non-dits. Votre charme réside dans votre franchise absolue et votre spontanéité.',
      interp: '<strong>Le pionnier courageux.</strong> Gouverné par Mars, le Bélier incarne l\'élan vital, le commencement et l\'affirmation de soi. Votre âme a besoin de conquérir, de tester ses limites et d\'agir avec spontanéité. Vous êtes le feu initial, celui qui ose là où d\'autres hésitent.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous vivez au présent, avec une authenticité brute qui ne s\'encombre pas de faux-semblants. Votre colère peut être vive mais elle s\'éteint rapidement sans laisser de rancune. Votre principal défi psychologique est de canaliser votre impatience et d\'apprendre que la vulnérabilité n\'est pas une faiblesse, mais une autre forme de courage.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> En entreprise, vous êtes un starter né, un entrepreneur dans l\'âme. Vous excellez dans le lancement de projets, la gestion de crises et les rôles de leader. Les structures trop rigides ou routinières vous étouffent. Vous avez besoin d\'autonomie et de défis constants pour maintenir votre motivation.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous êtes passionné, direct et entier. Vous aimez l\'intensité de la conquête et avez besoin d\'un partenaire indépendant qui sait vous stimuler sans chercher à vous brider. Votre loyauté est totale, et vous exprimez votre affection par des actions concrètes et protectrices.' },
    { name: 'Taureau',     sym: '♉', el: 'Terre', mod: 'Fixe',     ruler: 'Vénus',   col: 'emerald',
      kw: 'Stabilité · Sensualité · Patience · Beauté',
      ascInterp: '<strong>La présence rassurante et esthète.</strong> Avec l\'Ascendant Taureau, vous dégagez une impression immédiate de calme, de solidité et de raffinement. On vous perçoit comme quelqu\'un de posé, de fiable et de sensuel, avec un goût prononcé pour le confort et l\'harmonie visuelle.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre premier réflexe face à la nouveauté est d\'observer et de prendre votre temps. Vous fuyez la précipitation et l\'agitation. Votre chemin d\'évolution consiste à accepter le mouvement et l\'impermanence de la vie sans vous y opposer.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Au travail, vous inspirez confiance immédiatement. Vous structurez vos tâches avec réalisme et persévérance. Excellent collaborateur, vous apportez de la constance et une approche pragmatique indispensable aux projets de groupe.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Sur le plan relationnel, vous êtes constant et exclusif. Vous aimez les rituels de couple et les plaisirs partagés. Votre charme opère par votre douceur, votre calme et votre loyauté inébranlable.',
      interp: '<strong>Le bâtisseur patient et sensuel.</strong> Gouverné par Vénus, le Taureau incarne l\'ancrage, la stabilité et le plaisir d\'exister. Votre âme a besoin de s\'enraciner dans la matière, de créer de la sécurité et d\'apprécier la beauté tangible du monde. Vous avancez avec le temps comme allié, construisant ce qui dure.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous possédez une force tranquille et un besoin vital de stabilité. La peur du manque ou du changement peut parfois vous rendre rigide ou possessif, mais votre patience et votre calme sont des phares pour votre entourage. Votre défi est d\'apprendre à lâcher prise sur ce que vous ne pouvez pas contrôler.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Concret et méthodique, vous êtes d\'une fiabilité absolue. Vous excellez dans la gestion financière, l\'immobilier, l\'artisanat, la gastronomie ou l\'art. Vous aimez voir le fruit de vos efforts se matérialiser. Les environnements calmes où vous pouvez travailler à votre rythme vous conviennent le mieux.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous êtes d\'une fidélité à toute épreuve et d\'une grande sensualité. Protecteur et généreux, vous exprimez votre affection par le confort physique, les cadeaux et une présence rassurante. Vous cherchez un partenaire stable avec qui construire un foyer chaleureux.' },
    { name: 'Gémeaux',    sym: '♊', el: 'Air',   mod: 'Mutable',  ruler: 'Mercure', col: 'cyan',
      kw: 'Communication · Curiosité · Adaptabilité · Intelligence',
      ascInterp: '<strong>Le messager vif et sociable.</strong> Avec l\'Ascendant Gémeaux, vous projetez une image de dynamisme, de curiosité et d\'adaptabilité. On vous perçoit d\'emblée comme quelqu\'un de sociable, d\'intelligent et de facile d\'accès, toujours prêt à échanger.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous abordez la vie comme un terrain de jeu intellectuel. Votre réactivité et votre sens de l\'humour vous permettent de vous adapter à tous les milieux. Votre chemin d\'évolution est de développer une écoute plus profonde pour dépasser la simple curiosité superficielle.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Au travail, vous êtes un excellent facilitateur et réseau-né. Vous connectez les gens et les idées avec aisance. Votre adaptabilité fait de vous un collaborateur précieux dans les environnements en évolution rapide.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Relationnellement, vous aimez séduire par le jeu d\'esprit et la conversation. Vous créez des liens facilement et apportez beaucoup de gaieté et d\'animation dans la vie de votre partenaire.',
      interp: '<strong>L\'explorateur des idées.</strong> Gouverné par Mercure, les Gémeaux symbolisent la curiosité, la communication et l\'adaptabilité. Votre âme cherche à tisser des liens, à comprendre le monde sous toutes ses facettes et à transmettre les idées avec légèreté et brio. Vous êtes l\'éternel étudiant du zodiaque.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre esprit est en mouvement perpétuel, avide de stimulations. Cette vivacité peut parfois générer de l\'éparpillement ou de l\'anxiété mentale. Votre dualité vous permet de voir toutes les facettes d\'une situation. Le défi de votre vie est de trouver un ancrage intérieur au milieu du flot d\'informations.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Vous excellez là où l\'intellect, l\'écriture et le relationnel se rencontrent : journalisme, enseignement, commerce, communication ou nouvelles technologies. Multi-tâches par excellence, la routine est votre pire ennemie. Vous avez besoin de variété et de liberté de mouvement.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, la complicité intellectuelle et le rire sont vos moteurs indispensables. Vous cherchez un partenaire qui stimule votre esprit et respecte votre indépendance. Vous exprimez vos sentiments par les mots, le partage d\'idées et une légèreté rafraîchissante.' },
    { name: 'Cancer',     sym: '♋', el: 'Eau',   mod: 'Cardinal', ruler: 'Lune',    col: 'cyan',
      kw: 'Intuition · Protection · Mémoire · Empathie',
      ascInterp: '<strong>Le cocon protecteur et réceptif.</strong> Avec l\'Ascendant Cancer, vous abordez le monde avec une sensibilité visible et un besoin naturel de protection. On vous perçoit comme chaleureux, intuitif et doucement réservé au premier contact.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous ressentez les émotions ambiantes instantanément. Face au monde extérieur, votre carapace est votre bouclier indispensable. Votre vitalité est liée à votre environnement émotionnel. Votre chemin consiste à dépasser la méfiance pour offrir votre écoute unique sans vous épuiser.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Professionnellement, vous recherchez l\'esprit de famille. Vous brillez dans la gestion d\'équipe humaine, l\'éducation, les soins, la création ou tout ce qui touche aux racines et à l\'histoire. Vous préférez coopérer plutôt que d\'imposer votre autorité.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Dans le couple, vous êtes tendre, fidèle et extrêmement attentionné. Vous exprimez votre amour en créant un nid sécurisant et en prenant soin du confort de votre partenaire. Le défi est d\'éviter de vous replier sur vous-même au moindre malentendu.',
      interp: '<strong>Le gardien de l\'âme et du foyer.</strong> Régi par la Lune, le Cancer est le signe le plus connecté aux marées émotionnelles et à l\'inconscient. Votre âme cherche avant tout la sécurité, l\'intimité et la transmission. Vous possédez une réceptivité et une empathie naturelles qui vous permettent de ressentir le monde bien avant de l\'analyser.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre monde intérieur est d\'une richesse infinie. Animé par un besoin vital de protection et de refuge, vous êtes sensible aux atmosphères et absorbez les émotions environnantes comme une éponge. Votre carapace n\'est pas une barrière froide, mais un bouclier nécessaire pour protéger votre cœur d\'or et votre vulnérabilité. Le défi de votre vie est d\'apprendre à ne pas vous laisser submerger par le passé ou par la peur de l\'abandon, et à faire de votre sensibilité votre plus grande force.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Au travail, vous fonctionnez à l\'intuition et à la loyauté. Vous brillez dans les environnements bienveillants et collaboratifs. Les métiers du soin, de la création, de la psychologie, de l\'éducation ou de l\'immobilier (le foyer) résonnent profondément en vous. Vous êtes un excellent leader informel, capable de créer un esprit de famille au sein de votre équipe et de motiver par l\'empathie.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous cherchez la fusion, la sécurité et la complicité à long terme. Vous donnez tout ce que vous avez, protégez votre partenaire avec tendresse et rêvez de construire un nid douillet. Très sensible au rejet, vous avez besoin d\'être rassuré constamment. Votre partenaire idéal saura respecter votre jardin secret tout en vous offrant une stabilité inébranlable.' },
    { name: 'Lion',       sym: '♌', el: 'Feu',   mod: 'Fixe',     ruler: 'Soleil',  col: 'gold',
      kw: 'Rayonnement · Créativité · Générosité · Leadership',
      ascInterp: '<strong>Le guide charismatique et généreux.</strong> Avec l\'Ascendant Lion, vous dégagez une aura chaleureuse, théâtrale et fière. On vous remarque dès que vous entrez dans une pièce, et on vous perçoit comme quelqu\'un de généreux, de confiant et de naturellement leader.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre réflexe instinctif est de prendre les choses en main avec assurance et bienveillance. Vous détestez la mesquinerie et la médiocrité. Votre chemin d\'évolution est d\'apprendre à partager la lumière et à accepter vos propres faiblesses avec humilité.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Professionnellement, vous assumez les responsabilités avec courage. Vous savez inspirer la confiance et piloter des projets d\'envergure. Votre prestance est un atout majeur dans les relations publiques ou la représentation.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En relation, vous êtes un partenaire protecteur et démonstratif. Vous aimez les déclarations flamboyantes, le jeu créatif à deux et protégez férocement les personnes que vous aimez.',
      interp: '<strong>Le créateur rayonnant.</strong> Gouverné par le Soleil, le Lion incarne la joie de vivre, la générosité et l\'expression de soi. Votre âme cherche à briller pour inspirer les autres, à créer avec passion et à offrir un amour vaste et protecteur. Vous portez en vous une noblesse de cœur naturelle.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Animé par un fort besoin de reconnaissance et d\'amour, vous luttez parfois avec la peur d\'être ordinaire ou ignoré. Lorsque vous agissez depuis votre cœur et non depuis votre ego, votre générosité devient un soleil réconfortant pour votre entourage. Votre défi est de cultiver la confiance intérieure sans dépendre du regard des autres.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Leader naturel, vous vous épanouissez dans les postes de direction, les arts, l\'enseignement ou toute activité où vous pouvez exprimer votre créativité de manière autonome. Vous avez le sens du spectacle et de la mise en valeur. Vous motivez vos équipes par votre enthousiasme et votre bienveillance.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous êtes loyal, théâtral et passionné. Vous aimez gâter votre partenaire et attendez en retour une admiration et une fidélité absolues. Pour vous, l\'amour doit être grand, noble et célébré chaque jour.' },
    { name: 'Vierge',    sym: '♍', el: 'Terre', mod: 'Mutable',  ruler: 'Mercure', col: 'emerald',
      kw: 'Analyse · Service · Discernement · Précision',
      ascInterp: '<strong>L\'observateur méthodique et attentif.</strong> Avec l\'Ascendant Vierge, vous projetez une image de discrétion, de compétence et de clarté intellectuelle. On vous perçoit comme quelqu\'un de fiable, de propre sur soi, de poli et de particulièrement attentif aux détails.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre premier réflexe face à toute situation nouvelle est d\'analyser, d\'évaluer et de trier. Vous préférez observer avant d\'intervenir. Votre chemin d\'évolution est de lâcher prise sur le contrôle et de faire confiance à votre intuition spontanée.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Au travail, vous êtes le garant de la qualité et de la précision. Vous organisez les projets avec réalisme et veillez à ce que rien ne soit laissé au hasard. Vous êtes un collaborateur indispensable pour la finition.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Sur le plan sentimental, vous êtes réservé au départ, choisissant vos relations avec discernement. Vous exprimez votre amour de façon pratique et rassurez par votre régularité et votre écoute attentive.',
      interp: '<strong>L\'artisan de l\'harmonie et du service.</strong> Gouverné par Mercure, la Vierge incarne le discernement, l\'analyse et le dévouement. Votre âme cherche à ordonner le chaos, à soigner, à se rendre utile et à polir chaque détail pour atteindre une forme de pureté et d\'utilité concrète.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre esprit analytique est d\'une grande acuité, mais il peut se retourner contre vous sous forme d\'autocritique et d\'anxiété. Vous portez un souci sincère du bien-être d\'autrui et exprimez votre amour par des actes concrets de service. Le grand défi de votre vie est d\'apprendre à accepter l\'imperfection, en vous et chez les autres.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Organisé, précis et consciencieux, vous excellez dans les métiers du soin, de la recherche, de la comptabilité, de l\'édition ou de l\'artisanat d\'art. Vous résolvez les problèmes complexes avec méthode. Vous préférez l\'efficacité discrète des coulisses aux feux de la rampe.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous êtes pudique, attentionné et d\'une grande pureté d\'intention. Vous montrez votre attachement par votre présence fiable et votre soutien dans le quotidien. Vous cherchez un partenaire qui apprécie votre dévouement et respecte votre besoin d\'ordre et de clarté.' },
    { name: 'Balance',   sym: '♎', el: 'Air',   mod: 'Cardinal', ruler: 'Vénus',   col: 'rose',
      kw: 'Harmonie · Justice · Élégance · Relation',
      ascInterp: '<strong>L\'ambassadeur de la paix et de la beauté.</strong> Avec l\'Ascendant Balance, vous vous présentez au monde sous le signe de l\'élégance, de la diplomatie et de la grâce. Votre première réaction face à l\'inconnu est de chercher le compromis et de créer du lien. On vous perçoit immédiatement comme quelqu\'un de charmant, d\'avenant et d\'attentif au bien-être d\'autrui.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> En surface, vous lissez les angles et fuyez les conflits. Ce besoin absolu d\'harmonie peut parfois vous amener à vous oublier pour plaire aux autres ou à hésiter indéfiniment avant de prendre position. Votre vitalité dépend étroitement de la qualité de vos relations et de la beauté de votre environnement. Votre chemin d\'évolution consiste à développer votre propre affirmation personnelle tout en conservant votre merveilleux tact naturel.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Professionnellement, votre sens de l\'esthétique, de la justice et de la médiation est un atout majeur. Vous êtes le pacificateur de l\'équipe, celui qui sait concilier les points de vue opposés. Les carrières liées au conseil, à la justice, aux arts visuels, aux relations publiques ou au design vous conviennent à merveille. Vous préférez la collaboration et le partenariat à l\'exercice d\'un pouvoir solitaire.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Dans le domaine relationnel, vous êtes un partenaire romantique, attentionné et en recherche constante d\'équilibre. Vous n\'aimez pas la solitude et concevez la vie comme un duo harmonieux. Vous exprimez votre affection par des gestes raffinés et un souci permanent de l\'autre. Le défi est d\'apprendre à exprimer vos désaccords pour éviter que le ressentiment ne s\'accumule sous votre sourire aimable.',
      interp: '<strong>Le chercheur d\'équilibre et de beauté.</strong> Gouverné par Vénus, la Balance incarne l\'harmonie, la relation et la justice. Votre âme cherche à s\'associer, à peser le pour et le contre avec équité, et à embellir le monde par l\'art, le tact et le compromis. Vous êtes le pacificateur du zodiaque.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous possédez un sens inné des besoins d\'autrui, ce qui vous rend extrêmement diplomate. Cependant, la peur du conflit et le désir d\'approbation peuvent vous amener à hésiter indéfiniment ou à vous oublier pour plaire. Le grand défi de votre vie est de vous choisir, de savoir dire non et de comprendre que la discorde constructive fait grandir les relations.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Vous excellez dans les métiers du conseil, du droit, de la médiation, des relations publiques ou de la création artistique. Le travail d\'équipe et le partenariat sont vos cadres privilégiés. Vous apportez de l\'élégance, une écoute active et un souci permanent de justice sociale dans vos projets.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous êtes un romantique délicat et attentionné. Vous ne concevez pas la vie en solo ; le couple est votre miroir et votre havre de paix. Vous cherchez une relation équitable, esthétique et sans heurts, où chaque désaccord est résolu par le dialogue et le respect mutuel.' },
    { name: 'Scorpion',  sym: '♏', el: 'Eau',   mod: 'Fixe',     ruler: 'Pluton',  col: 'violet',
      kw: 'Profondeur · Transformation · Désir · Pouvoir',
      ascInterp: '<strong>La présence magnétique et mystérieuse.</strong> Avec l\'Ascendant Scorpion, vous dégagez une intensité silencieuse et un magnétisme indéniable. On ressent votre présence avant même que vous n\'ayez parlé. On vous perçoit comme mystérieux, observateur et doté d\'une grande force intérieure.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre réaction immédiate face au monde est de sonder et de protéger votre intimité. Vous accordez votre confiance avec une extrême prudence. Votre chemin d\'évolution consiste à baisser la garde et à accepter de montrer votre vulnérabilité sans crainte.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Au travail, vous agissez avec stratégie et discrétion. Vous savez identifier les faiblesses d\'un système ou d\'une situation pour les corriger. Vous imposez un respect naturel par votre rigueur et votre détermination silencieuse.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Relationnellement, vous séduisez par votre aura secrète. Vous cherchez des liens authentiques et profonds, fuyant la superficialité. Votre attachement est d\'une grande fidélité, teinté d\'une saine possessivité protectrice.',
      interp: '<strong>Le chercheur de vérité et le phénix.</strong> Gouverné par Pluton et Mars, le Scorpion incarne la transformation profonde, le magnétisme et le pouvoir de régénération. Votre âme cherche à explorer les mystères de la vie, à vivre des expériences intenses et à renaître de ses cendres face aux épreuves.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre sensibilité est immense mais cachée sous une cuirasse de contrôle. Vous possédez une intuition psychologique remarquable qui vous permet de lire en autrui. Vos combats intérieurs sont profonds, marqués par la peur de la trahison. Le grand défi de votre vie est de transmuter vos blessures en sagesse et en pardon.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Intense et déterminé, vous excellez là où il faut enquêter, soigner ou transformer : psychologie, médecine, recherche scientifique, finance stratégique ou investigation. Rien ne vous effraie dans l\'ombre ; vous allez là où d\'autres reculent. Vous travaillez avec un engagement total.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous cherchez la fusion absolue et la vérité. Passionné, loyal et entier, vous donnez tout mais exigez une honnêteté totale en retour. Très protecteur, vous êtes un partenaire d\'une intensité rare, capable de traverser les tempêtes à deux.' },
    { name: 'Sagittaire',sym: '♐', el: 'Feu',   mod: 'Mutable',  ruler: 'Jupiter', col: 'gold',
      kw: 'Liberté · Philosophie · Aventure · Expansion',
      ascInterp: '<strong>L\'explorateur enthousiaste et jovial.</strong> Avec l\'Ascendant Sagittaire, vous vous présentez au monde avec un sourire chaleureux, une parole libre et une énergie en mouvement. On vous perçoit comme quelqu\'un d\'ouvert, de philosophe, de spontané et de profondément optimiste.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre premier réflexe face à l\'inconnu est d\'y voir une opportunité d\'apprentissage et de découverte. Vous dégagez une grande joie de vivre. Votre chemin d\'évolution est d\'apprendre à poser vos valises et à approfondir les situations au lieu de toujours chercher un ailleurs.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Au travail, vous apportez de la hauteur de vue et un enthousiasme communicatif. Vous lancez les projets avec élan et savez fédérer les énergies. Votre franchise et votre bonhomie facilitent les négociations et le travail collectif.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Sur le plan amoureux, vous êtes spontané, amical et très indépendant. Vous séduisez par votre humour et votre soif d\'apprendre. Vous offrez à votre partenaire une relation dynamique, ouverte sur le monde et pleine de projets.',
      interp: '<strong>Le chercheur d\'horizons et de sens.</strong> Gouverné par Jupiter, le Sagittaire incarne l\'expansion, la philosophie et le goût de l\'aventure. Votre âme a besoin d\'espace pour explorer, d\'idéaux élevés pour croire en la vie, et de liberté pour grandir. Vous êtes le guide et l\'optimiste du zodiaque.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre nature est joyeuse, généreuse et tournée vers le futur. La peur de l\'enfermement ou de la routine peut parfois vous pousser à fuir les responsabilités émotionnelles complexes, mais votre foi en la vie est une source de lumière pour tous. Votre défi est de concilier votre soif de liberté avec les nécessités du présent.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Visionnaire et enthousiaste, vous brillez dans l\'enseignement, le voyage, le droit, l\'édition, le coaching ou le commerce international. Vous savez voir les choses en grand et motiver les autres autour d\'une vision d\'avenir. Les structures trop étroites ou répétitives vous étouffent.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous cherchez un compagnon de route, un complice d\'aventures et d\'idées. Vous êtes généreux, sincère et détestez la jalousie ou l\'étouffement. Pour vous, le couple est un voyage de croissance mutuelle où chacun doit pouvoir déployer ses ailes.' },
    { name: 'Capricorne',sym: '♑', el: 'Terre', mod: 'Cardinal', ruler: 'Saturne', col: 'slate',
      kw: 'Ambition · Discipline · Maîtrise · Durée',
      ascInterp: '<strong>Le leader fiable et digne.</strong> Avec l\'Ascendant Capricorne, vous projetez une image de sérieux, d\'autorité naturelle et de maîtrise de soi. On vous respecte immédiatement pour votre fiabilité, votre maturité et votre apparence soignée et structurée.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Face à l\'inconnu, votre premier réflexe est de vous auto-discipliner et d\'analyser les règles du jeu. Vous dégagez une réserve prudente. Votre chemin d\'évolution est de laisser de la place à la spontanéité, au jeu et à la tendresse désintéressée dans votre présentation au monde.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Professionnellement, vous inspirez un respect immédiat. Vous planifiez les projets avec rigueur et les menez à bien avec persévérance. Vous assumez les responsabilités et savez encadrer les équipes avec justice et autorité.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous êtes un partenaire protecteur, solide et stable. Vous préférez prouver votre attachement par des actes durables plutôt que par de grandes paroles. Vous offrez une sécurité affective rassurante et pérenne.',
      interp: '<strong>Le gardien du temps et de la structure.</strong> Gouverné par Saturne, le Capricorne incarne la responsabilité, l\'ambition patiente et l\'intégrité. Votre âme cherche à bâtir des fondations solides, à gravir les sommets par le travail et la discipline, et à laisser une œuvre durable derrière elle. Vous êtes le sage bâtisseur.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Doté d\'une maturité précoce, vous assumez souvent de lourdes responsabilités de bonne heure. Ce sérieux peut parfois vous couper du plaisir spontané ou vous faire paraître austère, mais votre loyauté et votre sens du devoir sont inébranlables. Le grand défi de votre vie est d\'accueillir la légèreté et d\'apprendre à aimer votre vulnérabilité.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Déterminé, méthodique et rigoureux, vous êtes fait pour le management, la direction d\'entreprise, la politique, l\'architecture ou la finance de long terme. Vous gravissez les échelons par le mérite et le travail personnel. Les responsabilités ne vous font pas peur ; elles vous structurent.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous êtes discret, pudique mais d\'une loyauté absolue. Vous ne vous engagez pas à la légère. Vous exprimez votre attachement par votre présence indéfectible, votre protection matérielle et votre constance. Votre amour est un fleuve tranquille qui gagne en profondeur avec les années.' },
    { name: 'Verseau',   sym: '♒', el: 'Air',   mod: 'Fixe',     ruler: 'Uranus',  col: 'cyan',
      kw: 'Originalité · Humanisme · Vision · Liberté',
      ascInterp: '<strong>L\'esprit original et fraternel.</strong> Avec l\'Ascendant Verseau, vous vous présentez au monde de manière originale, moderne et indépendante. On vous perçoit comme quelqu\'un d\'atypique, d\'amical, de tolérant et de tourné vers le futur.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre réflexe face à la nouveauté est de prendre du recul pour observer de manière logique et globale. Vous refusez qu\'on vous impose des étiquettes. Votre chemin d\'évolution consiste à vous engager personnellement et chaleureusement dans vos relations sans maintenir une distance de sécurité.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Au travail, vous apportez un vent de fraîcheur et d\'innovation. Vous collaborez facilement en groupe et savez motiver pour des causes d\'intérêt général. Votre indépendance d\'esprit est une source d\'idées neuves pour l\'équipe.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Sur le plan sentimental, vous séduisez par votre liberté d\'esprit et votre originalité. Vous préférez une relation de complicité égalitaire et amicale. Vous exprimez votre amour en encourageant l\'autre à être lui-même.',
      interp: '<strong>Le visionnaire indépendant.</strong> Gouverné par Uranus et Saturne, le Verseau incarne la liberté de pensée, l\'humanisme et l\'innovation. Votre âme a besoin de bousculer les conventions, de penser en avance sur son temps et de collaborer avec le collectif pour un monde plus juste et fraternel. Vous êtes le révolutionnaire bienveillant.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre esprit est brillant, original et parfois détaché. Vous pouvez éprouver des difficultés à gérer vos émotions intimes, préférant la clarté des idées à l\'irrégularité des sentiments. Votre besoin viscéral d\'indépendance coexiste avec un amour sincère de l\'humanité. Votre défi est d\'apprendre à ouvrir votre cœur autant que votre esprit.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Vous excellez dans l\'avant-garde, la technologie, l\'écologie, les sciences, le milieu associatif ou le travail d\'équipe humanitaire. Inventif et autonome, vous apportez des solutions inattendues aux blocages. Vous êtes le collaborateur qui propose toujours l\'idée du futur.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, l\'amitié et le respect mutuel de la liberté de chacun sont indispensables. Vous fuyez la jalousie et la fusion étouffante. Vous cherchez un partenaire autonome avec qui vous pouvez partager des projets stimulants et des discussions sans fin.' },
    { name: 'Poissons',  sym: '♓', el: 'Eau',   mod: 'Mutable',  ruler: 'Neptune', col: 'violet',
      kw: 'Compassion · Imagination · Spiritualité · Fusion',
      ascInterp: '<strong>La présence douce et inspirante.</strong> Avec l\'Ascendant Poissons, vous dégagez une aura de douceur, de rêve et d\'empathie naturelle. On vous perçoit comme quelqu\'un de sensible, de compréhensif, de mystérieux et de particulièrement réceptif aux ambiances.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre premier réflexe face au monde est de ressentir et d\'absorber l\'atmosphère avant d\'agir. Vous vous adaptez avec fluidité au contenant, ce qui peut vous faire paraître insaisissable. Votre chemin d\'évolution est d\'apprendre à poser vos propres limites et à dire non avec fermeté.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Au travail, vous apportez de l\'intuition, du sens artistique et une profonde bienveillance humaine. Vous désamorcez les tensions par votre douceur et savez imaginer des solutions créatives hors des sentiers battus.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Relationnellement, vous séduisez par votre réceptivité et votre charme poétique. Vous inspirez la confidence et la confiance immédiates. Vous cherchez une complicité magique et offrez une écoute pleine d\'amour et de compréhension.',
      interp: '<strong>L\'océan de compassion.</strong> Gouverné par Neptune et Jupiter, les Poissons incarnent la sensibilité universelle, l\'imagination et la fusion spirituelle. Votre âme cherche à dissoudre les frontières de l\'ego, à aimer sans conditions, et à exprimer la beauté mystique du monde à travers l\'art ou la dévotion.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre sensibilité est une éponge psychique : vous ressentez les émotions d\'autrui avec une intensité qui peut parfois vous submerger ou vous pousser à fuir la réalité. Votre monde imaginaire est d\'une richesse infinie. Le grand défi de votre vie est de poser des limites saines pour protéger votre énergie tout en restant connecté à votre immense bienveillance.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Très créatif et intuitif, vous brillez dans l\'art, la musique, l\'écriture, les soins énergétiques, la thérapie ou le travail humanitaire. Vous travaillez à l\'inspiration et avez besoin d\'un cadre souple et porteur de sens spirituel. Votre empathie fait des merveilles auprès des personnes en souffrance.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous êtes le romantique absolu, capable d\'une dévotion et d\'une tendresse infinies. Vous recherchez l\'osmose d\'âme à âme et pouvez avoir tendance à idéaliser votre partenaire. Vous avez besoin d\'un partenaire bienveillant et solide qui saura ancrer votre sensibilité sans la blesser.' }
  ];

  /* ─── Décans (36 = 12 signes × 3) — système ptolémaïque par triplicité ─── */
  var DECANS = [
    {r:'Mars',    p:'initiative pure · feu martien brut'},
    {r:'Soleil',  p:'créativité et charisme · touche léonine'},
    {r:'Jupiter', p:'idéaux et aventure · souffle sagittarien'},
    {r:'Vénus',   p:'sensualité et art · jouissance terrienne'},
    {r:'Mercure', p:'précision artisanale · finesse virgoïde'},
    {r:'Saturne', p:'persévérance · rigueur capricornienne'},
    {r:'Mercure', p:'intellect vif · curiosité à l\'état pur'},
    {r:'Vénus',   p:'sociabilité raffinée · délicatesse livienne'},
    {r:'Uranus',  p:'originalité visionnaire · idéaux verseau'},
    {r:'Lune',    p:'intuition et mémoire émotionnelle vive'},
    {r:'Pluton',  p:'profondeur psychique · intensité scorpionique'},
    {r:'Neptune', p:'compassion et rêverie · douceur piscéenne'},
    {r:'Soleil',  p:'rayonnement pur · le Lion dans toute sa majesté'},
    {r:'Jupiter', p:'générosité et vision · grandeur sagittarienne'},
    {r:'Mars',    p:'courage et action · ardeur bélieresque'},
    {r:'Mercure', p:'analyse et méthode · intelligence précise'},
    {r:'Saturne', p:'discipline et endurance · rigueur capricornienne'},
    {r:'Vénus',   p:'soin et raffinement · sensibilité tauréenne'},
    {r:'Vénus',   p:'harmonie et beauté · l\'équilibre à l\'état pur'},
    {r:'Uranus',  p:'justice sociale · avant-gardisme verseau'},
    {r:'Mercure', p:'diplomatie intellectuelle · finesse géminienne'},
    {r:'Pluton',  p:'transformation radicale · intensité brute'},
    {r:'Neptune', p:'mystère et intuition · profondeur piscéenne'},
    {r:'Lune',    p:'mémoire émotionnelle · sensibilité cancérienne'},
    {r:'Jupiter', p:'expansion et quête de sens · le philosophe voyageur'},
    {r:'Mars',    p:'ardeur et courage direct · feu bélieresque'},
    {r:'Soleil',  p:'créativité rayonnante · chaleur léonine'},
    {r:'Saturne', p:'discipline absolue · le sommet à conquérir'},
    {r:'Vénus',   p:'ambition sensible · patience tauréenne'},
    {r:'Mercure', p:'pragmatisme intelligent · acuité virgoïde'},
    {r:'Uranus',  p:'révolution pure · originalité à l\'état pur'},
    {r:'Mercure', p:'intellect collectif · esprit géminien'},
    {r:'Vénus',   p:'humanisme sensible · harmonie livienne'},
    {r:'Neptune', p:'dissolution mystique · le rêveur absolu'},
    {r:'Lune',    p:'empathie profonde · sensibilité cancérienne'},
    {r:'Pluton',  p:'puissance karmique · transformation ultime'}
  ];

  /* ─── Heure d'été / hiver (DST) ─── */

  function lastSundayOfMonth(year, month) {
    var d = new Date(year, month, 0); // dernier jour du mois (month est 1-indexé)
    d.setDate(d.getDate() - d.getDay());
    return d.getDate();
  }

  function nthSundayOfMonth(year, month, n) {
    var d = new Date(year, month - 1, 1);
    var dow = d.getDay();
    var firstSun = (dow === 0) ? 1 : 8 - dow;
    return firstSun + (n - 1) * 7;
  }

  /* Retourne le décalage UTC effectif (heure d'été incluse si applicable) */
  function getUTCOffset(year, month, day, tzRule, stdOffset) {
    if (tzRule === 'none') return stdOffset;

    if (tzRule === 'eu' || tzRule === 'uk') {
      /* France : heure d'été réintroduite en 1976 (crise pétrolière) */
      if (tzRule === 'eu' && year < 1976) return stdOffset;
      /* Règle EU/UK : dernier dimanche de mars → dernier dimanche d'octobre */
      var startDay = lastSundayOfMonth(year, 3);
      var endDay   = lastSundayOfMonth(year, 10);
      var inDST = (month > 3 && month < 10)
               || (month === 3 && day >= startDay)
               || (month === 10 && day < endDay);
      return inDST ? stdOffset + 1 : stdOffset;
    }

    if (tzRule === 'us') {
      /* US depuis 2007 : 2e dimanche de mars → 1er dimanche de novembre */
      /* US 1966-2006  : 1er dimanche d'avril → dernier dimanche d'octobre */
      var sMonth, sDay, eMonth, eDay;
      if (year >= 2007) {
        sMonth = 3;  sDay = nthSundayOfMonth(year, 3, 2);
        eMonth = 11; eDay = nthSundayOfMonth(year, 11, 1);
      } else {
        sMonth = 4;  sDay = nthSundayOfMonth(year, 4, 1);
        eMonth = 10; eDay = lastSundayOfMonth(year, 10);
      }
      var inDST2 = (month > sMonth && month < eMonth)
                || (month === sMonth && day >= sDay)
                || (month === eMonth && day < eDay);
      return inDST2 ? stdOffset + 1 : stdOffset;
    }

    return stdOffset;
  }

  /* ─── Signe solaire ─── */
  function getSunSignIdx(month, day) {
    var md = month * 100 + day;
    if (md >= 321 && md <= 419)  return 0;
    if (md >= 420 && md <= 520)  return 1;
    if (md >= 521 && md <= 621)  return 2;
    if (md >= 622 && md <= 722)  return 3;
    if (md >= 723 && md <= 822)  return 4;
    if (md >= 823 && md <= 922)  return 5;
    if (md >= 923 && md <= 1022) return 6;
    if (md >= 1023 && md <= 1121) return 7;
    if (md >= 1122 && md <= 1221) return 8;
    if (md >= 1222 || md <= 119)  return 9;
    if (md >= 120 && md <= 218)   return 10;
    return 11;
  }

  /* ─── Calcul de l'ascendant (UTC corrigé) ─── */
  function calcAscendantDeg(year, month, day, localHour, localMinute, lat, lon, utcOffset) {
    /* Conversion heure locale → UT */
    var utc = localHour + localMinute / 60.0 - utcOffset;
    utc = ((utc % 24) + 24) % 24;

    /* Jour julien à 0h UT */
    var a = Math.floor((14 - month) / 12);
    var y = year + 4800 - a;
    var m = month + 12 * a - 3;
    var JD = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4)
             - Math.floor(y / 100) + Math.floor(y / 400) - 32045 - 0.5;
    var T = (JD - 2451545.0) / 36525.0;

    /* Temps sidéral moyen de Greenwich (TSMG) à 0h UT */
    var theta0 = 280.46061837 + 360.98564736629 * (JD - 2451545.0)
                 + 0.000387933 * T * T - T * T * T / 38710000;
    theta0 = ((theta0 % 360) + 360) % 360;

    /* Temps sidéral local */
    var LST = theta0 + utc * 15.04106864 + lon;
    LST = ((LST % 360) + 360) % 360;

    /* Ascendant via RAMC */
    var RAMC = LST * Math.PI / 180;
    var eps  = (23.4397 - 0.0130 * T) * Math.PI / 180;
    var phi  = lat * Math.PI / 180;
    var ascRad = Math.atan2(
      Math.cos(RAMC),
      -Math.sin(RAMC) * Math.cos(eps) - Math.tan(phi) * Math.sin(eps)
    );
    return ((ascRad * 180 / Math.PI) % 360 + 360) % 360;
  }

  function signFromDeg(deg) { return Math.floor(((deg % 360) + 360) % 360 / 30); }
  function degInSign(deg)   { return (((deg % 30) + 30) % 30).toFixed(1); }

  function getDecanInfo(signIdx, deg) {
    var d = Math.floor(((deg % 30) + 30) % 30 / 10);
    return DECANS[signIdx * 3 + d];
  }

  /* ─── Synthèse Soleil + Ascendant ─── */
  var EL_TEXTS = {
    'Feu+Feu': {
      general: 'Votre essence Feu et votre Ascendant Feu créent une alliance d\'une intensité rare. Vous êtes une âme rayonnante, vibrante et passionnée. Votre présence est un feu chaleureux, et vous avancez dans la vie guidé par une confiance spontanée et un élan vital remarquable.',
      pro: 'Leader né, vous excellez dans les rôles qui demandent de l\'audace, de l\'esprit d\'entreprise et la capacité de lancer de nouveaux projets sans attendre. Vous avez besoin d\'autonomie et de défis réguliers pour maintenir votre flamme.',
      relational: 'En amour, vous êtes entier, passionné et direct. Vous fuyez la routine et avez besoin d\'un partenaire indépendant qui partage votre enthousiasme et respecte votre espace personnel.'
    },
    'Feu+Terre': {
      general: 'Le feu créatif de votre Soleil s\'allie à la structure solide de votre Ascendant Terre. C\'est une alliance de pragmatisme et de passion, où les idéaux intérieurs trouvent les moyens concrets de se manifester.',
      pro: 'Vous possédez une excellente capacité à matérialiser vos ambitions. Vous êtes organisé, tenace et capable de mener à bien de grands projets sur le long terme en alliant vision et méthode.',
      relational: 'Loyal et chaleureux, vous exprimez votre affection par des actes concrets et une présence protectrice. Vous offrez à votre partenaire un foyer solide tout en sachant stimuler le quotidien.'
    },
    'Feu+Air': {
      general: 'L\'Air de votre Ascendant attise le Feu de votre Soleil. Vous êtes une personnalité inspirée, communicative et très sociable. Les idées circulent avec fluidité et votre enthousiasme est naturellement contagieux.',
      pro: 'Excellent communicant, vous brillez dans l\'enseignement, la vente, les médias ou le travail d\'équipe. Vous savez motiver les autres et concevoir des stratégies innovantes avec aisance.',
      relational: 'Charmant et ouvert d\'esprit, vous recherchez avant tout une complicité intellectuelle. Vous aimez les échanges enrichissants et avez besoin d\'un espace de liberté pour vous épanouir.'
    },
    'Feu+Eau': {
      general: 'Une alliance d\'intensité émotionnelle et de passion ardente. Le Feu de votre identité et l\'Eau de votre expression créent une personnalité profondément intuitive, vibrante et créative.',
      pro: 'Vous travaillez à l\'instinct et à l\'inspiration. Vous avez besoin de donner un sens humain ou artistique à votre activité. Votre force réside dans votre capacité à vous investir pleinement.',
      relational: 'Votre vie sentimentale est riche, romantique et passionnée. Vous cherchez une connexion d\'âme à âme et offrez une tendresse infinie mêlée d\'une grande dévotion.'
    },
    'Terre+Feu': {
      general: 'La stabilité de votre Soleil Terre s\'exprime à travers l\'énergie active de votre Ascendant Feu. C\'est une force tranquille dotée d\'un charisme dynamique et d\'une grande confiance en soi.',
      pro: 'Entrepreneur réaliste, vous combinez une vision pragmatique à long terme avec une formidable force d\'action. Vous savez prendre des risques calculés pour bâtir votre réussite.',
      relational: 'Protecteur et chaleureux, vous inspirez confiance dès le premier contact. Vous prouvez votre attachement par votre fiabilité constante et des gestes généreux au quotidien.'
    },
    'Terre+Terre': {
      general: 'Un double ancrage dans l\'élément de Terre. Vous dégagez une impression de calme profond, de sagesse tranquille et de fiabilité absolue. La nature et le concret sont vos refuges.',
      pro: 'Bâtisseur méthodique, vous excellez dans l\'organisation, la gestion et la persévérance. Vous avancez pas à pas avec discipline, sans jamais perdre de vue vos objectifs concrets.',
      relational: 'En amour, vous recherchez la fidélité, la stabilité et la sécurité. Très sensuel, vous appréciez les plaisirs simples de la vie à deux et offrez à votre partenaire un soutien indéfectible.'
    },
    'Terre+Air': {
      general: 'Le sens des réalités de votre Soleil Terre rencontre la sociabilité de votre Ascendant Air. Vous êtes une personne logique, équilibrée et douée pour tisser des relations harmonieuses.',
      pro: 'Excellent conseiller ou planificateur, vous savez structurer les idées complexes et les rendre opérationnelles. Votre diplomatie vous permet de travailler efficacement avec tous.',
      relational: 'Fiable et communicatif, vous cherchez un partenariat basé sur le respect mutuel. Vous aimez les discussions constructives et exprimez vos sentiments de façon claire et mesurée.'
    },
    'Terre+Eau': {
      general: 'La Terre de votre identité est nourrie par l\'Eau sensible de votre Ascendant. Cette alliance crée une personnalité d\'une grande profondeur, attentive aux autres et douée d\'un sens pratique naturel.',
      pro: 'Dévoué et consciencieux, vous vous épanouissez dans les métiers de soin, de conseil ou d\'aide. Votre écoute attentive et votre calme rassurant sont très appréciés au travail.',
      relational: 'Très attaché à votre foyer, vous êtes un partenaire protecteur, tendre et constant. Vous offrez une sécurité émotionnelle et matérielle sans faille à ceux que vous aimez.'
    },
    'Air+Feu': {
      general: 'L\'intellect de votre Soleil Air s\'enflamme au contact de votre Ascendant Feu. Vous êtes une personne active, curieuse, habitée par de multiples projets et dotée d\'une parole inspirante.',
      pro: 'Innovateur et convaincant, vous brillez dans les fonctions de communication, de formation ou de conseil. Vous savez insuffler de l\'énergie et guider les autres vers de nouveaux horizons.',
      relational: 'Indépendant et chaleureux, vous fuyez la routine et l\'étouffement. Vous avez besoin d\'un partenaire qui partage vos élans intellectuels et accepte votre besoin de mouvement.'
    },
    'Air+Terre': {
      general: 'Les idées de votre Soleil Air s\'ancrent dans la structure de votre Ascendant Terre. Vous abordez la vie avec logique, pragmatisme et un grand sens de l\'observation.',
      pro: 'Chercheur ou gestionnaire rigoureux, vous êtes capable de trier et d\'analyser des données complexes pour en extraire des solutions concrètes. Votre méthode de travail est irréprochable.',
      relational: 'Discret et attentionné, vous préférez la clarté et la stabilité relationnelle aux effusions émotionnelles. Vous prouvez votre amour par des attentions pratiques et une fidélité à toute épreuve.'
    },
    'Air+Air': {
      general: 'Un double registre mental et relationnel. Votre esprit est en perpétuelle recherche, avide de connaissances, d\'échanges et de liberté. Vous comprenez vite et communiquez avec brio.',
      pro: 'Idéal pour les métiers de l\'écriture, de la communication, de la recherche ou des relations publiques. Vous êtes excellent pour faire circuler l\'information et connecter les esprits.',
      relational: 'Très sociable mais parfois pudique sur le plan émotionnel, vous recherchez avant tout un complice de discussion et un espace où votre liberté de pensée est respectée.'
    },
    'Air+Eau': {
      general: 'Les idées de votre Soleil Air se teintent de la sensibilité psychologique de votre Ascendant Eau. Vous possédez une fine perception des ambiances et des motivations d\'autrui.',
      pro: 'Excellent pédagogue, psychologue ou médiateur, vous alliez clarté intellectuelle et réceptivité. Vous savez écouter au-delà des mots et transmettre vos messages avec délicatesse.',
      relational: 'Empathique et attentionné, vous recherchez une connexion à la fois intellectuelle et sensible. Vous exprimez vos sentiments avec tact et veillez constamment au confort émotionnel du couple.'
    },
    'Eau+Feu': {
      general: 'La profondeur de votre Soleil Eau s\'exprime avec le rayonnement actif de votre Ascendant Feu. Vous êtes une âme passionnée, guidée par des intuitions puissantes et un élan de vie chaleureux.',
      pro: 'Très créatif, vous travaillez à l\'instinct et à l\'enthousiasme. Vous brillez là où vous pouvez exprimer votre singularité et votre sensibilité de manière active et visible.',
      relational: 'Entier et sensible, vous aimez avec intensité. Vous cherchez une relation vibrante et protectrice, et avez besoin d\'un partenaire capable d\'accueillir vos vagues émotionnelles.'
    },
    'Eau+Terre': {
      general: 'Votre sensibilité Eau trouve un magnifique réceptacle dans votre Ascendant Terre. C\'est une configuration d\'ancrage et de fertilité, où l\'intuition se traduit en actions réalistes et bienveillantes.',
      pro: 'Fiable, calme et attentif aux détails, vous aimez travailler dans des environnements stables et porteurs de sens. Vous êtes le pilier sur lequel l\'équipe peut toujours se reposer.',
      relational: 'Dévoué et protecteur, vous placez le foyer au cœur de votre vie. Vous offrez à votre partenaire une tendresse constante, une écoute profonde et un sentiment de sécurité inébranlable.'
    },
    'Eau+Air': {
      general: 'Une alliance remarquable d\'empathie profonde et de grâce sociale. Votre monde intérieur sensible (Eau) s\'exprime avec tact, délicatesse et diplomatie (Air). Vous dégagez une bienveillance naturelle qui apaise instantanément ceux qui vous entourent et favorise un climat de concorde.',
      pro: 'Médiateur exceptionnel, vous brillez dans le travail d\'équipe, les ressources humaines, les métiers du soin, de la communication bienveillante, de l\'éducation ou des arts. Votre force est d\'allier intuition subtile et écoute active pour harmoniser les énergies d\'un groupe.',
      relational: 'En amour, vous recherchez l\'harmonie absolue et la sécurité affective. D\'une douceur infinie, vous êtes protecteur et extrêmement soucieux du bien-être de votre partenaire. Vous fuyez les tensions et les conflits pour préserver votre précieux cocon de paix.'
    },
    'Eau+Eau': {
      general: 'Une immersion totale dans le monde de l\'inconscient, de l\'empathie et de l\'invisible. Vous êtes d\'une sensibilité vibratoire extraordinaire, ressentant les atmosphères et les cœurs comme un livre ouvert.',
      pro: 'Thérapeute, artiste, ou conseiller intuitif, vous excellez dans les domaines où l\'humain, l\'écoute profonde et la créativité sont essentiels. Vous travaillez à la résonance émotionnelle.',
      relational: 'Fusionnel et profondément romantique, vous cherchez l\'osmose totale avec l\'être aimé. Vous aimez d\'une manière inconditionnelle et avez besoin d\'une sécurité affective absolue pour vous ouvrir.'
    }
  };

  var MOD_TEXTS = {
    'Cardinal+Cardinal': 'Deux forces initiatrices — vous lancez les projets et impulsez le changement avec une énergie double.',
    'Cardinal+Fixe':      'Vous initiez et ancrez avec ténacité — vos projets démarrent sur les chapeaux de roues et tiennent le cap.',
    'Cardinal+Mutable':   'Vous lancez les idées et vous adaptez en cours de route — réactif et souple dans l\'exécution.',
    'Fixe+Cardinal':      'Vous portez une grande résolution intérieure qui passe à l\'action concrète au moment opportun.',
    'Fixe+Fixe':          'Constance, persévérance et fidélité absolues — la durée et la méthode sont vos alliées principales.',
    'Fixe+Mutable':       'Force de conviction intérieure qui sait pivoter — un contraste fécond entre stabilité et souplesse.',
    'Mutable+Cardinal':   'Vous vous adaptez d\'abord aux circonstances, puis lancez des actions concrètes avec conviction.',
    'Mutable+Fixe':       'Flexibilité intérieure doublée d\'une présentation ferme — deux vitesses qui s\'enrichissent mutuellement.',
    'Mutable+Mutable':    'Double adaptabilité et agilité — vous évoluez constamment, portés par le changement et le mouvement.'
  };

  function getCombinedReading(sunSign, ascSign) {
    var elKey  = sunSign.el + '+' + ascSign.el;
    var modKey = sunSign.mod + '+' + ascSign.mod;
    var elData  = EL_TEXTS[elKey]  || {
      general: 'Une alliance d\'éléments unique et riche.',
      pro: 'Un chemin professionnel guidé par vos forces de caractère combinées.',
      relational: 'Des relations nourries par votre sensibilité et votre mode d\'expression.'
    };
    var modStr = MOD_TEXTS[modKey] || 'Deux énergies de vie qui cheminent ensemble.';

    return '<div class="at-combo-block">'
      + '<div class="at-combo-title">✦ Votre configuration Soleil · Ascendant</div>'
      + '<div class="at-combo-sections">'
        + '<div class="at-combo-section">'
          + '<div class="at-combo-sec-title">🌱 Harmonie Globale &amp; Psychologie</div>'
          + '<div class="at-combo-sec-text">' + elData.general + '</div>'
        + '</div>'
        + '<div class="at-combo-section">'
          + '<div class="at-combo-sec-title">💼 Chemin Professionnel &amp; Création</div>'
          + '<div class="at-combo-sec-text">' + elData.pro + ' <span style="opacity:0.8;font-style:italic;">(' + modStr + ')</span></div>'
        + '</div>'
        + '<div class="at-combo-section">'
          + '<div class="at-combo-sec-title">💖 Sphère Relationnelle &amp; Amoureuse</div>'
          + '<div class="at-combo-sec-text">' + elData.relational + '</div>'
        + '</div>'
      + '</div>'
      + '</div>';
  }

  /* ─── Rendu des cartes résultat ─── */
  var COLOR_MAP = {
    rose: '#fb8195', emerald: '#3dd399', cyan: '#3bd3ee',
    gold: '#dfb26c', violet: '#b78bfa', slate: '#94a3b8'
  };

  function renderCard(s, extraHtml) {
    var col = COLOR_MAP[s.col] || '#94a3b8';
    return '<div class="at-result-card">'
      + '<div class="at-rc-header">'
        + '<div class="at-rc-sym" style="color:' + col + '">' + s.sym + '</div>'
        + '<div>'
          + '<div class="at-rc-name" style="color:' + col + '">' + s.name + '</div>'
          + '<div class="at-rc-badges">'
            + '<span class="at-rc-badge">' + s.el + '</span>'
            + '<span class="at-rc-badge">' + s.mod + '</span>'
            + '<span class="at-rc-badge">♟ ' + s.ruler + '</span>'
          + '</div>'
        + '</div>'
      + '</div>'
      + '<p class="at-rc-kw">' + s.kw + '</p>'
      + '<p class="at-rc-interp">' + s.interp + '</p>'
      + (extraHtml || '')
      + '</div>';
  }

  function renderAscCard(s, ascDeg) {
    var decan = getDecanInfo(signFromDeg(ascDeg), ascDeg);
    var degStr = degInSign(ascDeg);
    var col = COLOR_MAP[s.col] || '#94a3b8';
    var extra  = '<div class="at-rc-footer">'
      + '<span class="at-rc-deg">↑ ' + degStr + '° ' + s.name + '</span>'
      + '<span class="at-decan-badge">Décan ' + (Math.floor(((ascDeg % 30) + 30) % 30 / 10) + 1)
      + ' · ' + decan.r + '</span>'
      + '</div>'
      + '<p class="at-decan-phrase">' + decan.p + '</p>';
    /* Utiliser ascInterp (texte sur le comportement perçu) au lieu de interp (texte sur l\'identité profonde) */
    return '<div class="at-result-card">'
      + '<div class="at-rc-header">'
        + '<div class="at-rc-sym" style="color:' + col + '">' + s.sym + '</div>'
        + '<div>'
          + '<div class="at-rc-name" style="color:' + col + '">' + s.name + '</div>'
          + '<div class="at-rc-badges">'
            + '<span class="at-rc-badge">' + s.el + '</span>'
            + '<span class="at-rc-badge">' + s.mod + '</span>'
            + '<span class="at-rc-badge">♟ ' + s.ruler + '</span>'
          + '</div>'
        + '</div>'
      + '</div>'
      + '<p class="at-rc-kw">' + s.kw + '</p>'
      + '<p class="at-rc-interp">' + (s.ascInterp || s.interp) + '</p>'
      + extra
      + '</div>';
  }

  /* ─── Initialisation ─── */
  function init() {
    var form = document.getElementById('at-form');
    if (!form || form.dataset.init) return;
    form.dataset.init = '1';

    var villeEl    = document.getElementById('at-ville');
    var customDiv  = document.getElementById('at-custom-coords');
    var tzField    = document.getElementById('at-tz-offset');

    villeEl.addEventListener('change', function () {
      var isCustom = this.value === 'custom';
      customDiv.style.display = isCustom ? 'block' : 'none';
    });

    document.getElementById('at-exemple').addEventListener('click', function () {
      document.getElementById('at-jour').value   = '15';
      document.getElementById('at-mois').value   = '7';
      document.getElementById('at-annee').value  = '1990';
      document.getElementById('at-heure').value  = '14';
      document.getElementById('at-minute').value = '30';
      villeEl.value = '48.8566|2.3522|eu|1';
      customDiv.style.display = 'none';
    });

    form.addEventListener('submit', function () {
      var j  = parseInt(document.getElementById('at-jour').value, 10);
      var mo = parseInt(document.getElementById('at-mois').value, 10);
      var a  = parseInt(document.getElementById('at-annee').value, 10);
      var h  = parseInt(document.getElementById('at-heure').value, 10) || 0;
      var mi = parseInt(document.getElementById('at-minute').value, 10) || 0;

      if (!j || !mo || !a || mo < 1 || mo > 12 || j < 1 || j > 31 || a < 1900 || a > 2100) return;

      var lat, lon, utcOffset, tzNote = '';
      var villeVal = villeEl.value;

      if (villeVal === 'custom') {
        lat = parseFloat(document.getElementById('at-lat').value);
        lon = parseFloat(document.getElementById('at-lon').value);
        utcOffset = parseFloat(tzField ? tzField.value : '0') || 0;
        if (isNaN(lat) || isNaN(lon)) return;
        tzNote = 'UTC' + (utcOffset >= 0 ? '+' : '') + utcOffset + ' (saisi manuellement)';
      } else if (villeVal && villeVal !== '') {
        var parts     = villeVal.split('|');
        lat           = parseFloat(parts[0]);
        lon           = parseFloat(parts[1]);
        var tzRule    = parts[2];
        var stdOffset = parseFloat(parts[3]);
        utcOffset     = getUTCOffset(a, mo, j, tzRule, stdOffset);
        var isDST     = (utcOffset > stdOffset);
        tzNote = 'UTC' + (utcOffset >= 0 ? '+' : '') + utcOffset
               + (isDST ? ' (heure d\'été)' : ' (heure d\'hiver)');
      } else {
        lat = 48.8566; lon = 2.3522;
        utcOffset = getUTCOffset(a, mo, j, 'eu', 1);
        tzNote = 'UTC+' + utcOffset + ' (Paris par défaut)';
      }

      var soleilIdx = getSunSignIdx(mo, j);
      var soleil    = SIGNS[soleilIdx];

      var ascDeg    = calcAscendantDeg(a, mo, j, h, mi, lat, lon, utcOffset);
      var ascIdx    = signFromDeg(ascDeg);
      var ascSign   = SIGNS[ascIdx];

      document.getElementById('atSoleilCard').innerHTML    = renderCard(soleil, null);
      document.getElementById('atAscendantCard').innerHTML = renderAscCard(ascSign, ascDeg);
      document.getElementById('atComboBlock').innerHTML    = getCombinedReading(soleil, ascSign);

      var noteEl = document.getElementById('atTzNote');
      if (noteEl) noteEl.textContent = tzNote;

      var res = document.getElementById('atResultats');
      res.removeAttribute('hidden');
      res.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('astro:page-load', init);
})();
