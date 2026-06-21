(function () {
  'use strict';

  /* ─── Données des 12 signes sous l'angle de l'Astrologie Sidérale ─── */
  var SIGNS = [
    { name: 'Bélier',      sym: '♈', el: 'Feu',   mod: 'Cardinal', ruler: 'Mars',    col: 'rose',
      kw: 'Action initiatrice · Alignement cosmique · Noblesse de l\'âme · Courage vertical',
      ascInterp: '<strong>L\'initiateur sidéral de la conscience.</strong> Avec l\'Ascendant Bélier en zodiaque sidéral, vous entrez dans l\'existence comme un pionnier de l\'âme. On perçoit chez vous une présence spontanée, franche, courageuse et habitée d\'un feu dynamique qui n\'attend pas la permission pour se manifester.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre instinct premier est d\'affirmer votre individualité et de tracer de nouvelles voies. Vous portez la signature des étoiles pionnières de la constellation du Bélier, vous incitant à vivre au présent et à affronter l\'adversité de front. Votre quête évolutive est d\'apprendre à canaliser l\'intensité de Mars pour qu\'elle devienne une force de protection bienveillante et non une colère impulsive.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Leader naturel et starter hors pair, vous excellez à initier des projets audacieux. Vous préférez les environnements de travail autonomes et dynamiques aux structures routinières. Votre courage vous rend particulièrement précieux dans la gestion de crises ou le lancement d\'innovations.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous recherchez l\'authenticité absolue et la clarté. Vous séduisez par votre franchise et votre feu intérieur. Vous avez besoin d\'un partenaire fort qui respecte votre liberté d\'action tout en partageant votre goût pour l\'aventure et le renouveau constant.',
      interp: '<strong>Le guerrier de lumière.</strong> Régi par Mars, le Bélier sidéral symbolise le réveil de la volonté divine et la pureté de l\'élan vital. Connecté aux étoiles d\'Arietis, votre Soleil appelle à une incarnation courageuse et à une quête de souveraineté intérieure libérée des illusions de l\'ego.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre nature intime est entière, droite et en quête d\'alignement avec votre vérité intérieure. Vous agissez souvent à l\'instinct, avec une noblesse de cœur innée. Le défi de votre évolution consiste à surmonter l\'impatience et la réactivité émotionnelle, afin de polir votre force brute en une sagesse rayonnante.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Esprit d\'entreprise et créativité active définissent votre parcours. Vous êtes un bâtisseur de premières étapes, un pionnier qui ouvre des brèches. Vous avez besoin de buts clairs et d\'un fort sentiment de liberté pour exprimer tout votre potentiel productif.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Vous exprimez vos sentiments de façon directe et passionnée. Fuyant les jeux de manipulation psychologique, vous offrez une protection inconditionnelle à ceux que vous aimez. Votre partenaire idéal partage votre franchise et comprend votre besoin périodique de solitude créative.' },
    { name: 'Taureau',     sym: '♉', el: 'Terre', mod: 'Fixe',     ruler: 'Vénus',   col: 'emerald',
      kw: 'Ancrage sacré · Beauté primordiale · Résilience divine · Paix de l\'être',
      ascInterp: '<strong>La force tranquille et sensuelle du zodiaque.</strong> Avec l\'Ascendant Taureau sidéral, vous dégagez une impression de calme imperturbable, de stabilité et de connexion intime avec les forces terrestres. On ressent en vous une autorité naturelle, posée et rassurante.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous abordez le monde avec prudence, préférant la sécurité des fondations solides à l\'agitation du changement. Votre présence vénusienne est harmonieuse et orientée vers la préservation de la beauté et du vivant. Votre défi d\'évolution est d\'accepter l\'impermanence de la matière et de ne pas vous enfermer dans l\'obstination.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Constant, rigoureux et d\'une patience légendaire, vous êtes le pilier sur lequel une équipe s\'appuie lors des crises. Vous excellez dans les projets à longue échéance, l\'écologie, l\'immobilier durable, l\'artisanat ou l\'art. Vos réalisations sont faites pour durer.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Dans le domaine amoureux, vous exprimez une tendresse enveloppante et une fidélité inébranlable. Vous construisez le couple sur le socle du confort physique et de la sérénité émotionnelle. Vous fuyez le conflit et cherchez la complicité par le silence partagé et les plaisirs simples de la vie.',
      interp: '<strong>Le gardien des rythmes de la vie.</strong> Relié à la splendide étoile Aldébaran et à l\'amas des Pléiades, le Taureau sidéral exprime l\'abondance naturelle et la matérialisation harmonieuse de l\'esprit. Votre Soleil recherche la paix intérieure profonde en s\'harmonisant avec la nature.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous possédez une résilience physique et psychique hors du commun. Votre âme a besoin de calme, de beauté esthétique et de confort matériel pour s\'épanouir. Le défi majeur est de surmonter la peur du manque et la résistance au changement, afin d\'expérimenter la liberté du détachement spirituel.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Constructeur méthodique, vous avancez pas à pas avec constance et efficacité. Vous aimez voir les fruits de votre labeur se concrétiser sous vos mains. Les domaines financiers, artistiques et agronomiques répondent idéalement à votre nature ancrée.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Protecteur et généreux, vous aimez avec patience et profondeur. Votre engagement est solide, et vous exprimez votre affection en veillant à la sécurité et au bien-être de votre partenaire. Vous avez besoin de loyauté absolue pour vous ouvrir totalement.' },
    { name: 'Gémeaux',    sym: '♊', el: 'Air',   mod: 'Mutable',  ruler: 'Mercure', col: 'cyan',
      kw: 'Curiosité de l\'esprit · Synthèse des contraires · Agilité de l\'âme · Communication',
      ascInterp: '<strong>Le messager agile et curieux.</strong> Avec l\'Ascendant Gémeaux en sidéral, vous abordez la vie avec curiosité, adaptabilité et un besoin impérieux de communication. Vous projetez l\'image d\'une intelligence vive, espiègle et toujours ouverte à l\'échange intellectuel.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre premier réflexe face à la nouveauté est d\'analyser, de poser des questions et de relier les esprits. Vous aimez l\'interaction sous toutes ses formes. Votre quête évolutive est de dépasser la curiosité superficielle ou la dispersion mentale afin de trouver un fil conducteur spirituel et de stabiliser votre esprit.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Polyvalent et réactif, vous êtes excellent pour faire circuler l\'information. Vous brillez dans l\'écriture, l\'enseignement, la négociation, les relations publiques et les nouvelles technologies. Vous vous adaptez instantanément aux changements de direction.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Vous séduisez par la parole, l\'esprit et l\'humour. Pour vous, l\'amour commence par une connexion intellectuelle forte. Vous recherchez un partenaire stimulé par la curiosité et le renouveau, capable de respecter votre besoin de légèreté et d\'espace.',
      interp: '<strong>Le traducteur de la dualité cosmique.</strong> Aligné sur les étoiles Castor et Pollux, le Gémeaux sidéral est l\'archétype de la liaison et de la transmission. Votre âme cherche à comprendre les multiples reflets du monde pour en révéler l\'unité sous-jacente.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre esprit est un canal dynamique d\'idées et de perceptions. Très réceptif intellectuellement, vous apprenez rapidement mais devez veiller à ne pas épuiser votre système nerveux par une surcharge mentale. Votre apprentissage consiste à écouter le silence intérieur autant que les mots.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Idéal pour les activités nécessitant de la flexibilité et de l\'intelligence relationnelle. Vous aimez mener de front plusieurs projets et travailler en réseau. Votre vivacité d\'esprit vous permet d\'identifier les solutions là où d\'autres voient de la confusion.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Complice et joueur, vous aimez partager des découvertes et des débats d\'idées. Vous fuyez la routine étouffante. Votre attachement grandit à mesure que se développe un espace de liberté et d\'apprentissage partagé.' },
    { name: 'Cancer',     sym: '♋', el: 'Eau',   mod: 'Cardinal', ruler: 'Lune',    col: 'cyan',
      kw: 'Réceptivité intuitive · Sanctuaire de l\'âme · Dévouement silencieux · Sagesse émotionnelle',
      ascInterp: '<strong>Le gardien réceptif et protecteur.</strong> Avec l\'Ascendant Cancer sidéral, votre approche du monde est teintée d\'une grande sensibilité émotionnelle et d\'une réceptivité intuitive. Vous dégagez une bienveillance chaleureuse mais discrète, presque timide au premier contact.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous absorbez les émotions environnantes comme une éponge sacrée. Votre carapace sert à protéger un monde intérieur d\'une immense richesse. Votre chemin d\'évolution est d\'apprendre à poser des limites claires entre vos sentiments et ceux des autres, afin d\'offrir votre protection sans vous épuiser.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> En groupe, vous incarnez l\'instinct de soin et la loyauté. Vous brillez dans la psychologie, l\'enfance, la création ou toute activité liée à la mémoire collective et au foyer. Vous menez les projets à l\'intuition et préférez motiver par la douceur.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Vous aimez de manière profonde et protectrice. D\'un naturel romantique et réservé, vous offrez à votre partenaire un soutien émotionnel absolu et veillez à créer un cocon de paix. Le défi est d\'exprimer vos besoins clairement plutôt que de vous replier dans le silence.',
      interp: '<strong>L\'âme nourricière du zodiaque.</strong> Régi par la Lune et aligné sur les douces étoiles de la constellation du Cancer, ce signe incarne le refuge de l\'inconscient et le mystère de la naissance. Votre Soleil exprime sa puissance à travers l\'empathie silencieuse, la mémoire du cœur et le soin apporté à autrui.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre intériorité est d\'une profondeur océanique. Très attaché à vos racines spirituelles et familiales, vous portez en vous un besoin viscéral de sécurité émotionnelle. Votre défi consiste à ne pas laisser les blessures du passé ou la peur de l\'abandon paralyser vos élans créatifs et votre rayonnement.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Vous recherchez des projets porteurs de sens humain et de bienveillance. Dévoué à votre mission, vous travaillez à l\'instinct de protection et excellez dans les rôles d\'accompagnement thérapeutique, de médiation bienveillante et de valorisation de l\'humain.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous recherchez l\'intimité sacrée et l\'osmose affective. Loyal et attentionné, vous donnez sans compter pour le bien-être de votre partenaire. Vous avez besoin d\'une structure relationnelle solide et rassurante pour oser déployer pleinement votre vulnérabilité.' },
    { name: 'Lion',       sym: '♌', el: 'Feu',   mod: 'Fixe',     ruler: 'Soleil',  col: 'gold',
      kw: 'Rayonnement intérieur · Noblesse spirituelle · Force d\'expression · Générosité d\'âme',
      ascInterp: '<strong>La présence lumineuse et fière.</strong> Avec l\'Ascendant Lion sidéral, vous dégagez une aura de dignité naturelle, de droiture et de générosité chaleureuse. Votre entrée dans le monde est noble et franche, attirant spontanément le regard et le respect d\'autrui.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre instinct premier est d\'assumer des responsabilités et de guider avec courage et honnêteté. Vous méprisez la mesquinerie et cherchez à élever les situations. Votre chemin d\'évolution consiste à cultiver l\'humilité et le partage de la lumière afin d\'éviter l\'ego dominateur.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Leader charismatique et créatif, vous assumez naturellement la direction d\'un groupe. Vous savez motiver vos collaborateurs en célébrant leurs succès avec noblesse. Vous brillez dans l\'art, l\'enseignement supérieur et la représentation publique.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Vous exprimez vos sentiments de façon royale, généreuse et protectrice. Loyal et passionné, vous cherchez un partenaire avec qui créer une union créative et respectueuse de la dignité de chacun. Vous protégez férocement les vôtres.',
      interp: '<strong>Le souverain du cœur.</strong> Aligné sur la constellation royale du Lion et son étoile majestueuse Regulus, ce signe symbolise le rayonnement solaire pur et la force créative de l\'esprit. Votre Soleil exprime une joie de vivre communicative, une loyauté inébranlable et un besoin d\'incarner une vérité supérieure.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre force réside dans votre grand cœur et votre intégrité spirituelle. Vous possédez un sens aigu de l\'honneur personnel. Le défi évolutif est d\'apprendre que votre valeur ne dépend pas de l\'admiration du monde, mais de votre amour intérieur inconditionnel.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Fait pour inspirer et guider, vous avez besoin de marge de manœuvre et de reconnaissance pour vos talents. Les rôles de management, de direction ou d\'entrepreneuriat artistique conviennent parfaitement à votre besoin de créativité autonome.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Entier et passionné, vous donnez avec magnificence. Vous attendez une loyauté totale et un amour clair. Pour vous, la relation doit être un lieu de valorisation mutuelle et d\'élévation, exempt de calculs ou de compromis médiocres.' },
    { name: 'Vierge',    sym: '♍', el: 'Terre', mod: 'Mutable',  ruler: 'Mercure', col: 'emerald',
      kw: 'Pureté de l\'intention · Discernement aigu · Service désintéressé · Organisation sacrée',
      ascInterp: '<strong>L\'observateur discret et compétent.</strong> Avec l\'Ascendant Vierge sidérale, vous abordez la vie avec modestie, logique et une grande acuité d\'esprit. On vous perçoit comme une personne fiable, d\'une courtoisie irréprochable et attentive aux détails pratiques.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre premier mouvement est d\'observer et de structurer mentalement la situation pour être utile. Vous détestez le gaspillage d\'énergie et le chaos. Votre chemin d\'évolution est de vous libérer du besoin obsessionnel de contrôle afin de faire confiance à la fluidité de la vie.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Vous êtes l\'artisan de la précision. Analytique et travailleur, vous excellez dans l\'analyse de données, l\'organisation méthodique, le soin de santé et l\'ingénierie. Vous assurez la qualité finale des projets collectifs avec brio.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Vous exprimez votre amour par des actes concrets de service et une écoute attentive. Timide au départ, vous choisissez vos relations avec discernement. Vous recherchez un partenaire stable et honnête qui valorise votre dévouement discret.',
      interp: '<strong>La conscience du détail et du service.</strong> Connectée à la brillante étoile Spica (Chitra) — point d\'ancrage historique de l\'Ayanamsa Lahiri — la Vierge sidérale incarne la récolte de la sagesse et le polissage de l\'esprit. Votre Soleil cherche à matérialiser l\'ordre divin à travers la clarté mentale et le service d\'autrui.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous possédez un esprit d\'une finesse remarquable, doublé d\'une pureté d\'intention touchante. Cependant, ce discernement peut parfois se muer en culpabilité intérieure ou en perfectionnisme stérile. Votre défi consiste à accueillir vos limites humaines avec bienveillance.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Rigoureux et intègre, vous vous épanouissez dans les activités exigeant de la méthode et un dévouement sincère : recherche médicale, conseil technique, écriture ou gestion administrative. Vous résolvez les problèmes avec clarté.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Pudique mais profondément loyal, vous offrez une présence solide et rassurante au quotidien. Votre amour se prouve par le soutien pratique, la fiabilité et le souci du bien-être physique et psychique de votre conjoint.' },
    { name: 'Balance',   sym: '♎', el: 'Air',   mod: 'Cardinal', ruler: 'Vénus',   col: 'rose',
      kw: 'Recherche d\'équilibre · Diplomatie d\'âme · Justice cosmique · Harmonie relationnelle',
      ascInterp: '<strong>L\'architecte de l\'harmonie et des liens.</strong> Avec l\'Ascendant Balance sidérale, vous vous présentez au monde sous le signe de la grâce, de la diplomatie et de la recherche active de justice. On vous perçoit comme une personne charmante, attentive à l\'autre et soucieuse d\'équilibre relationnel.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre réflexe est de chercher le compromis et d\'apaiser les tensions ambiantes. Ce besoin viscéral d\'harmonie peut parfois vous amener à l\'indécision ou au sacrifice de vos propres désirs. Votre chemin évolutif est d\'apprendre à affirmer votre propre vérité intérieure sans craindre la confrontation.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Excellent négociateur, vous brillez dans la médiation, le conseil juridique, les carrières artistiques ou les relations humaines. Vous êtes le ciment social de votre équipe, apportant du tact et favorisant la coopération équitable.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Le couple est votre miroir d\'évolution. Très attentif et attentionné, vous exprimez votre amour en veillant constamment au bien-être de votre partenaire. Vous recherchez un dialogue intellectuel riche et refusez la vulgarité ou les rapports de force.',
      interp: '<strong>Le chercheur de l\'accord parfait.</strong> Aligné sur la constellation de la Balance, ce signe exprime la justice universelle et l\'harmonie des contraires. Votre Soleil cherche à établir l\'équilibre entre les polarités de l\'existence et à semer la paix par l\'art et le dialogue constructif.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous possédez un sens inné des nuances de la psyché humaine. Doté d\'une grande sociabilité, vous souffrez des ambiances disharmonieuses. Le défi de votre évolution consiste à surmonter la complaisance et la peur du rejet pour cultiver un courage intérieur indépendant de l\'approbation des autres.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Vous excellez dans les domaines de collaboration et d\'association de compétences. Sensible à l\'équité, vous veillez à ce que les droits de chacun soient respectés. Votre sens esthétique raffiné constitue une force majeure dans les projets artistiques.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Romantique et délicat, vous concevez la vie comme un partenariat harmonieux. Vous aimez les gestes attentionnés et la complicité esthétique. Votre défi est de savoir poser des limites claires pour éviter la dépendance affective ou l\'accumulation de rancune.' },
    { name: 'Scorpion',  sym: '♏', el: 'Eau',   mod: 'Fixe',     ruler: 'Pluton',  col: 'violet',
      kw: 'Intensité transformatrice · Alchimie de l\'âme · Regard perçant · Volonté inébranlable',
      ascInterp: '<strong>La force silencieuse et magnétique du zodiaque.</strong> Avec l\'Ascendant Scorpion sidéral, vous dégagez un magnétisme intense et un mystère profond. On perçoit instantanément votre présence pénétrante, vos facultés d\'observation et votre résilience silencieuse.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Face au monde, vous sondez et protégez votre vulnérabilité avec rigueur. Vous n\'accordez votre confiance qu\'après de multiples tests silencieux. Votre défi évolutif est d\'apprendre à lâcher le contrôle et à pardonner pour transmuter les peurs de trahison en force alchimique.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Perspicace et déterminé, vous excellez dans l\'investigation, la stratégie financière, la psychologie et la recherche médicale. Vous possédez le courage de faire face aux crises et de restructurer les systèmes obsolètes.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Vous recherchez une connexion entière, profonde et sans compromis futiles. Loyal à l\'extrême, vous offrez une présence indétectible et une passion sincère à votre partenaire. Vous avez besoin d\'honnêteté brute pour ouvrir votre jardin secret.',
      interp: '<strong>L\'alchimiste spirituel.</strong> Connecté à l\'étoile rouge géante Antarès (le cœur du Scorpion) et gouverné par Pluton et Mars, ce signe symbolise la mort-renaissance et le pouvoir de régénération de la conscience. Votre Soleil exprime une volonté de fer, une quête de vérité absolue et une capacité unique à surmonter les épreuves.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre psyché est intense et refuse la superficialité. Vous possédez un don inné pour décoder les motivations cachées des autres. Le défi majeur est de renoncer à la rancune et à l\'auto-destruction émotionnelle pour incarner l\'archétype du Phénix, capable de se relever grandi de chaque crise.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Tenace et autonome, vous travaillez avec un investissement total. Vous n\'avez pas peur de plonger dans les détails complexes ou de traiter les aspects obscurs des projets. Votre rigueur fait de vous un atout inestimable dans les recherches exigeantes.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> En amour, vous refusez la tiédeur. Vous cherchez l\'osmose d\'âme à âme. Protecteur et passionné, votre attachement est d\'une fidélité à toute épreuve. Vous exigez une réciprocité affective totale et une sincérité sans faille.' },
    { name: 'Sagittaire',sym: '♐', el: 'Feu',   mod: 'Mutable',  ruler: 'Jupiter', col: 'gold',
      kw: 'Quête de sens · Flèche de la vérité · Optimisme de l\'âme · Sagesse nomade',
      ascInterp: '<strong>L\'explorateur enthousiaste de l\'esprit.</strong> Avec l\'Ascendant Sagittaire sidéral, vous abordez l\'existence avec un optimisme communicatif, une parole libre et une énergie en mouvement perpétuel. On vous perçoit comme une présence chaleureuse, philosophique et généreuse.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous voyez la vie comme une quête de vérité et d\'apprentissage. Votre réflexe face à l\'inconnu est d\'y chercher un sens supérieur. Votre chemin d\'évolution consiste à discipliner votre parole pour éviter l\'arrogance dogmatique et à apprendre à vous poser pour approfondir les relations concrètes.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Visionnaire et enthousiaste, vous brillez dans l\'enseignement, l\'édition, les voyages, le commerce international ou le droit. Vous savez motiver et élargir les horizons de votre équipe par votre enthousiasme naturel.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Vous séduisez par votre humour et votre soif de liberté d\'esprit. Pour vous, l\'amour est un voyage partagé. Vous recherchez un partenaire indépendant qui stimule votre pensée et respecte votre besoin d\'espace de liberté.',
      interp: '<strong>Le chercheur de sagesse.</strong> Régi par Jupiter et aligné sur les étoiles de la constellation du Sagittaire pointant vers le Centre Galactique, ce signe symbolise l\'expansion de la conscience et la poursuite des hauts idéaux. Votre Soleil exprime une foi innée en l\'univers, une quête de vérité et un besoin d\'espace et d\'indépendance.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre esprit est habité par un élan philosophique profond. Généreux et idéaliste, vous croyez profondément en la nature humaine. Le défi de votre évolution consiste à éviter l\'éparpillement et la fuite devant les contraintes matérielles ou émotionnelles du quotidien.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Motivé par le sens plutôt que par le seul gain matériel, vous avez besoin de liberté d\'action. Vous excellez dans les fonctions de conseil de haut niveau, de formation, de direction ou de projets humanitaires internationaux.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Sincère et spontané, vous refusez la jalousie mesquine et l\'étouffement. Vous offrez une relation joyeuse, stimulante et riche en projets communs. Le couple doit être pour vous un espace de croissance spirituelle mutuelle.' },
    { name: 'Capricorne',sym: '♑', el: 'Terre', mod: 'Cardinal', ruler: 'Saturne', col: 'slate',
      kw: 'Ambition intègre · Endurance de l\'âme · Sagesse du temps · Responsabilité sacrée',
      ascInterp: '<strong>Le bâtisseur intègre et patient.</strong> Avec l\'Ascendant Capricorne sidéral, vous projetez une image de sérieux, d\'autorité tranquille et de maîtrise de soi. On vous respecte pour votre maturité précoce, votre discrétion et votre fiabilité exemplaire.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Face à l\'existence, vous avancez avec méthode et un grand sens des responsabilités. Vous possédez une force tranquille capable d\'endurer de longues épreuves sans faiblir. Votre chemin évolutif est d\'accueillir la spontanéité, la douceur et de lâcher le masque rigide de la maîtrise absolue.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Organisateur né et rigoureux, vous êtes structuré pour assumer des responsabilités de direction ou de gestion. Vous menez vos projets à bien avec discipline et persévérance. Vos collaborateurs apprécient votre intégrité absolue.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Vous exprimez votre amour par des actes concrets et constants plutôt que par des effusions théâtrales. Loyal et protecteur, vous offrez à votre partenaire une stabilité émotionnelle à toute épreuve. Vous recherchez un engagement sérieux et durable.',
      interp: '<strong>Le sage du sommet.</strong> Aligné sur la constellation du Capricorne et régi par Saturne, ce signe incarne l\'intégrité, la concentration et la patience qui triomphe du temps. Votre Soleil s\'exprime à travers l\'effort soutenu, l\'ancrage réaliste et la volonté de laisser une empreinte durable dans le monde.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre intériorité est empreinte d\'un sentiment aigu du devoir et d\'une maturité spirituelle. Vous préférez la solitude constructive à l\'agitation sociale stérile. Le défi de votre évolution est d\'apprendre à aimer votre vulnérabilité intérieure et à vous délester des fardeaux qui ne vous appartiennent pas.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Excellent planificateur à long terme, vous excellez dans les administrations, la recherche scientifique rigoureuse, l\'architecture ou l\'entrepreneuriat structuré. Votre ténacité surmonte tous les obstacles de parcours.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Discret sur ses sentiments mais d\'une fidélité sans faille, vous construisez la relation sur la durée. Vous êtes un pilier de sécurité pour votre conjoint. L\'amour s\'exprime pour vous par des attentions pratiques et des gestes de protection constants.' },
    { name: 'Verseau',   sym: '♒', el: 'Air',   mod: 'Fixe',     ruler: 'Uranus',  col: 'cyan',
      kw: 'Esprit communautaire · Vision humaniste · Indépendance d\'esprit · Altruisme cosmique',
      ascInterp: '<strong>Le visionnaire fraternel et indépendant.</strong> Avec l\'Ascendant Verseau sidéral, vous abordez le monde de manière originale, amicale et tolérante. On vous perçoit comme une personne unique, tournée vers le futur, humaniste et dotée d\'une grande liberté d\'esprit.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre réflexe face aux autres est de privilégier la fraternité d\'idées et la logique collective. Vous refusez le conformisme social. Votre chemin d\'évolution consiste à vous engager personnellement et à laisser parler la chaleur du cœur sans maintenir une distance de sécurité intellectuelle.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Très à l\'aise dans le travail collaboratif et les projets collectifs, vous apportez un esprit d\'innovation précieux. Vous brillez dans la technologie, le milieu associatif ou de recherche. Votre esprit d\'équipe favorise un climat égalitaire.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Vous cherchez une complicité intellectuelle forte et une amitié amoureuse avant tout. L\'indépendance réciproque et le respect mutuel sont la clé du couple. Vous aimez encourager l\'autre à s\'affirmer dans son originalité propre.',
      interp: '<strong>Le porteur d\'eau cosmique.</strong> Aligné sur la constellation du Verseau (Shatabhisha/l\'Étoile aux cent médecins) et gouverné par Uranus et Saturne, ce signe symbolise l\'altruisme cosmique et l\'éveil spirituel collectif. Votre Soleil s\'exprime à travers l\'idéal de fraternité universelle et la pensée scientifique ou philosophique d\'avant-garde.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous possédez un esprit original et un besoin viscéral d\'indépendance d\'esprit. Vous comprenez intuitivement les structures de groupe. Le défi de votre évolution est de concilier votre détachement mental avec des connexions émotionnelles intimes et sincères.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Porteur d\'idées nouvelles, vous excellez dans l\'innovation technologique, le développement d\'alternatives écologiques ou les structures humanitaires. Vous êtes motivé par l\'intérêt collectif et le progrès social.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Vous fuyez la jalousie et la fusion étouffante. Pour vous, le couple est un partenariat basé sur l\'égalité et le partage d\'idéaux élevés. Loyal mais respectueux de l\'espace de chacun, vous êtes un compagnon de vie stimulant et fiable.' },
    { name: 'Poissons',  sym: '♓', el: 'Eau',   mod: 'Mutable',  ruler: 'Neptune', col: 'violet',
      kw: 'Compassion universelle · Sensibilité mystique · Imagination infinie · Fusion d\'âme',
      ascInterp: '<strong>L\'âme douce et réceptive du zodiaque.</strong> Avec l\'Ascendant Poissons sidéral, vous dégagez une aura de paix silencieuse, de douceur et d\'empathie naturelle. On vous perçoit comme une personne intuitive, mystique, créative et extrêmement réceptive aux vibrations ambiantes.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Vous abordez le monde en le ressentant, sans filtre logique. Votre esprit fluide s\'adapte facilement, ce qui peut vous faire paraître insaisissable. Votre quête évolutive est d\'apprendre à ancrer votre sensibilité et à poser des limites claires pour ne pas vous dissoudre dans le chagrin des autres.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Très créatif et doué d\'une fine intuition humaine, vous brillez dans l\'art, la musique, l\'accompagnement thérapeutique, la spiritualité ou les soins humanitaires. Vous apportez de l\'harmonie dans votre milieu professionnel.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Vous recherchez la fusion spirituelle et romantique absolue avec l\'être aimé. D\'une réceptivité sans égale, vous inspirez la confidence et exprimez votre attachement par un soutien inconditionnel. Le défi est de garder les pieds sur terre dans la relation.',
      interp: '<strong>L\'océan de dévouement cosmique.</strong> Aligné sur la constellation mystique des Poissons et gouverné par Neptune et Jupiter, ce signe symbolise le retour à l\'unité divine et la compassion sans limites. Votre Soleil s\'exprime par une créativité poétique, un sens de l\'invisible et un dévouement sincère aux autres.<br><br><strong>🌱 Plan Personnel &amp; Psychologique :</strong> Votre sensibilité psychique est extraordinaire, vous rendant sensible aux rythmes subtils de l\'existence. Le danger réside dans l\'évasion imaginaire ou la posture de victime. Votre défi consiste à transformer votre réceptivité passive en un engagement spirituel actif et structuré.<br><br><strong>💼 Plan Professionnel &amp; Projets :</strong> Vous fonctionnez à l\'instinct et à l\'inspiration créative. Vous avez besoin d\'un travail porteur de sens spirituel ou d\'aide directe aux personnes. Vos facultés d\'écoute attentive soulagent naturellement les souffrances professionnelles ou privées.<br><br><strong>💖 Plan Relationnel &amp; Amoureux :</strong> Fusionnel et dévoué, vous aimez de manière inconditionnelle. Vous recherchez l\'osmose d\'âme à âme et avez besoin d\'un partenaire stable, honnête et ancré capable de protéger votre cœur sensible tout en comprenant vos besoins de rêves et de silence.' }
  ];

  /* ─── Décans (36 = 12 signes × 3) ─── */
  var DECANS = [
    {r:'Mars',    p:'volonté initiatrice pure · force martienne brute d\'action'},
    {r:'Soleil',  p:'rayonnement intérieur et charisme souverain · souffle de vie'},
    {r:'Jupiter', p:'sagesse et hauts idéaux · expansion de conscience'},
    {r:'Vénus',   p:'amour de la beauté organique · harmonie sensuelle et terrienne'},
    {r:'Mercure', p:'discernement pragmatique · travail minutieux de la matière'},
    {r:'Saturne', p:'endurance et patience · rigueur des fondations'},
    {r:'Mercure', p:'vivacité de l\'intellect · curiosité communicative'},
    {r:'Vénus',   p:'diplomatie raffinée · art de la relation et des échanges'},
    {r:'Uranus',  p:'idéaux originaux · esprit de réforme et de fraternité'},
    {r:'Lune',    p:'sensibilité réceptive vive · mémoire du cœur'},
    {r:'Pluton',  p:'alchimie psychologique · transformation émotionnelle'},
    {r:'Neptune', p:'rêves inspirés · reliance spirituelle et compassion'},
    {r:'Soleil',  p:'noblesse naturelle · le cœur rayonnant dans sa vérité'},
    {r:'Jupiter', p:'magnanimité et générosité d\'âme · idéal d\'évolution'},
    {r:'Mars',    p:'courage actif · force de combat au nom du bien'},
    {r:'Mercure', p:'méthode analytique · intelligence pratique et service'},
    {r:'Saturne', p:'maîtrise du temps · autodiscipline et sobriété'},
    {r:'Vénus',   p:'soin attentionné · dévouement aux besoins physiques et affectifs'},
    {r:'Vénus',   p:'équilibre et harmonie · art du compromis et de la beauté'},
    {r:'Uranus',  p:'justice universelle · esprit d\'équité et de progrès'},
    {r:'Mercure', p:'facilité relationnelle · médiation par l\'échange intellectuel'},
    {r:'Pluton',  p:'transmutation alchimique · plongée dans les profondeurs de l\'être'},
    {r:'Neptune', p:'intuition subtile · mystère de l\'inconscient'},
    {r:'Lune',    p:'sensibilité empathique · besoin d\'intimité protectrice'},
    {r:'Jupiter', p:'foi jupitérienne · voyage de l\'esprit en quête d\'idéal'},
    {r:'Mars',    p:'volonté de vérité · action courageuse et directe'},
    {r:'Soleil',  p:'générosité d\'esprit · rayonnement philosophique'},
    {r:'Saturne', p:'intégrité absolue · structure et devoir de vie'},
    {r:'Vénus',   p:'patience productive · ambition sensuelle et fiable'},
    {r:'Mercure', p:'sens logique aiguisé · sens du détail utile'},
    {r:'Uranus',  p:'indépendance d\'esprit absolue · innovation sociale'},
    {r:'Mercure', p:'recherche intellectuelle collective · réseaux fraternels'},
    {r:'Vénus',   p:'idéaux humanitaires · harmonie et amitié universelle'},
    {r:'Neptune', p:'dissolution mystique de l\'ego · reliance à l\'infini'},
    {r:'Lune',    p:'sensibilité vibratoire intense · intuition réceptive'},
    {r:'Pluton',  p:'renaissance spirituelle · transformation par l\'abandon'}
  ];

  /* ─── Synthèse Soleil + Ascendant Sidéral ─── */
  var EL_TEXTS = {
    'Feu+Feu': {
      general: 'Votre identité Feu et votre Ascendant Feu en astrologie sidérale créent un alliage d\'une intensité rare. Vous êtes une âme rayonnante et vibrante, habitée par un courage vertical. Votre présence insuffle un élan créateur puissant et invite chacun à s\'aligner avec sa vérité essentielle.',
      pro: 'Pionnier dans l\'âme, vous excellez dans les rôles de leadership inspirant, d\'innovation ou d\'entrepreneuriat autonome. Vous avez besoin de relever des défis nobles et de disposer d\'une grande indépendance pour maintenir actif votre feu intérieur.',
      relational: 'En amour, vous recherchez l\'authenticité absolue et refusez les faux-semblants. Passionné et protecteur, vous offrez une loyauté royale à votre partenaire, tout en ayant besoin que votre liberté et votre dignité individuelles soient respectées.'
    },
    'Feu+Terre': {
      general: 'Le feu créateur de votre Soleil s\'associe à l\'ancrage solide de votre Ascendant Terre. C\'est l\'alliance de la vision ardente et de la persévérance réaliste. Les idéaux intérieurs de votre âme trouvent les moyens matériels et la patience nécessaires pour s\'incarner durablement.',
      pro: 'Vous possédez une excellente aptitude à structurer et à mener à bien de grands projets complexes. Organisé, lucide et déterminé, vous combinez l\'enthousiasme créatif à une discipline de travail irréprochable.',
      relational: 'Chaleureux et fiable, vous exprimez vos sentiments à travers des actions pratiques et une protection inconditionnelle. Vous offrez à votre partenaire un foyer solide, calme et propice à l\'évolution partagée.'
    },
    'Feu+Air': {
      general: 'L\'Air de votre Ascendant attise la flamme de votre identité solaire. Cette configuration sidérale vous dote d\'une grande curiosité d\'esprit, d\'un sens de la communication inspirant et d\'une sociabilité spontanée. Vous savez traduire vos idéaux en paroles porteuses de sens.',
      pro: 'Excellent médiateur, enseignant ou communicant, vous brillez dans les domaines exigeant la diffusion d\'idées neuves ou le travail d\'équipe stimulant. Votre agilité intellectuelle favorise la résolution créative de problèmes.',
      relational: 'Vous recherchez avant tout une profonde complicité d\'idées et de philosophie avec l\'être aimé. Le rire, les discussions enrichissantes et le respect mutuel de la liberté individuelle constituent la clé de votre équilibre de couple.'
    },
    'Feu+Eau': {
      general: 'Une alliance d\'intensité émotionnelle et de passion ardente. Le Feu de votre identité et l\'Eau de votre expression créent une personnalité profondément intuitive, vibrante et sensible, capable d\'une grande dévotion envers ses idéaux.',
      pro: 'Vous travaillez à l\'inspiration et à l\'instinct de protection. Vous devez vous engager dans des projets porteurs de sens humain ou artistique. Votre force réside dans votre capacité à investir votre sensibilité de manière active.',
      relational: 'Votre vie affective est riche, romantique et entière. Vous cherchez une connexion d\'âme à âme et offrez une tendresse infinie mêlée d\'une protection active. Le défi est d\'équilibrer vos vagues émotionnelles.'
    },
    'Terre+Feu': {
      general: 'La stabilité réaliste de votre Soleil Terre s\'exprime avec le dynamisme actif de votre Ascendant Feu. Cette alliance confère à votre personnalité une force tranquille, un charisme intègre et une grande assurance dans vos choix de vie.',
      pro: 'Entrepreneur perspicace, vous alliez le sens pratique du concret à un courage d\'action rapide. Vous savez prendre des risques calculés pour bâtir des structures durables ou encadrer efficacement des projets innovants.',
      relational: 'Protecteur et chaleureux, vous rassurez dès le premier contact. Vous prouvez votre attachement par votre régularité, des gestes attentionnés et une présence fiable capable de soutenir votre partenaire face aux tempêtes de l\'existence.'
    },
    'Terre+Terre': {
      general: 'Un double ancrage dans l\'élément de Terre. Vous dégagez une sensation de calme souverain, de solidité rassurante et de sagesse tranquille. La nature et le concret constituent vos véritables refuges de ressourcement.',
      pro: 'Bâtisseur pragmatique et méthodique, vous excellez dans la gestion rigoureuse, la planification à long terme ou l\'artisanat d\'art. Vous avancez pas à pas avec persévérance, sans jamais dévier de vos objectifs structurels.',
      relational: 'En amour, vous recherchez la fidélité, la simplicité naturelle et la sécurité pérenne. Sensuel et fiable, vous offrez à votre partenaire un soutien solide et construisez un foyer chaleureux propice à la paix de l\'esprit.'
    },
    'Terre+Air': {
      general: 'Le sens du réel de votre identité solaire s\'harmonise avec la fluidité intellectuelle de votre Ascendant Air. Vous abordez l\'existence avec logique, bon sens et une fine compréhension des relations interpersonnelles.',
      pro: 'Excellent planificateur, conseiller ou gestionnaire de projets collaboratifs. Vous savez trier des informations complexes et structurer des solutions opérationnelles tout en maintenant un excellent esprit de dialogue.',
      relational: 'Fiable et communicatif, vous cherchez un partenariat basé sur la confiance mutuelle et le respect intellectuel. Vous exprimez vos sentiments avec clarté et mesure, privilégiant les actes constants aux effusions émotionnelles éphémères.'
    },
    'Terre+Eau': {
      general: 'Votre structure Terre est nourrie par la sensibilité intuitive de votre Ascendant Eau. Cette configuration sidérale favorise une personnalité d\'une grande réceptivité humaine, attentive aux autres et douée d\'un sens pratique constructif.',
      pro: 'Dévoué et consciencieux, vous vous épanouissez dans les métiers de soin, d\'éducation, de thérapie ou d\'accompagnement. Votre calme rassurant et votre écoute bienveillante sont précieux pour vos collègues.',
      relational: 'Très attaché à votre foyer et à la sécurité de l\'être aimé, vous êtes un partenaire protecteur, tendre et d\'une grande constance. Vous offrez à votre compagnon de route un havre de paix enveloppant et fidèle.'
    },
    'Air+Feu': {
      general: 'L\'intellect agile de votre Soleil Air s\'enflamme au contact de votre Ascendant Feu. Vous êtes une personnalité vivante, curieuse, habitée par de multiples idéaux d\'évolution et dotée d\'une parole inspirante.',
      pro: 'Innovateur et convaincant, vous brillez dans l\'enseignement, la médiation, la formation ou les projets à dimension philosophique ou sociale. Vous savez mobiliser les énergies collectives vers de nouveaux horizons.',
      relational: 'Indépendant et chaleureux, vous fuyez la routine et l\'étouffement affectif. Vous recherchez un partenaire qui partage votre curiosité intellectuelle et respecte votre besoin d\'indépendance et de mouvement.'
    },
    'Air+Terre': {
      general: 'Les concepts et idées de votre Soleil Air s\'ancrent dans la structure solide de votre Ascendant Terre. Vous abordez l\'existence avec logique, pragmatisme et un grand sens de l\'observation impartiale.',
      pro: 'Chercheur ou gestionnaire rigoureux, vous êtes doué pour rationaliser des processus complexes et concevoir des solutions applicables au quotidien. Votre rigueur et votre sens de la méthode sont indiscutables.',
      relational: 'Discret et attentionné, vous préférez la clarté et la stabilité relationnelle aux drames émotionnels. Vous prouvez votre attachement par votre fidélité, votre régularité et votre soutien logique face aux difficultés.'
    },
    'Air+Air': {
      general: 'Une synergie mentale et relationnelle totale. Votre esprit sidéral est avide d\'échanges d\'idées, de connaissances et d\'altruisme. Vous comprenez rapidement les situations globales et connectez facilement les esprits.',
      pro: 'Idéal pour les métiers de l\'écriture, de la recherche scientifique, de la communication innovante ou des relations publiques. Vous excellez à faire circuler la connaissance et à coordonner des projets collectifs.',
      relational: 'Très sociable mais pudique sur le plan des émois intimes, vous recherchez un véritable complice intellectuel et philosophique. L\'amitié amoureuse et la liberté de pensée partagée sont vos moteurs indispensables.'
    },
    'Air+Eau': {
      general: 'Les idées altruistes de votre identité Air s\'enrichissent de la réceptivité psychologique de votre Ascendant Eau. Vous possédez une fine perception des ambiances, des motivations cachées et des blessures d\'autrui.',
      pro: 'Excellent pédagogue, psychologue, thérapeute ou médiateur social, vous alliez intelligence logique et sensibilité. Vous savez écouter au-delà des mots et transmettre vos messages avec tact et diplomatie.',
      relational: 'Empathique et attentionné, vous recherchez une connexion à la fois sensible et intellectuelle. Vous exprimez vos sentiments avec tact, fuyez les rapports de force et veillez au confort psychique du couple.'
    },
    'Eau+Feu': {
      general: 'La profondeur intuitive de votre identité Eau s\'exprime avec le dynamisme actif de votre Ascendant Feu. Vous êtes une âme passionnée, guidée par des intuitions puissantes et un élan chaleureux de protection des vôtres.',
      pro: 'Très créatif et guidé par l\'instinct, vous brillez là où vous pouvez exprimer votre sensibilité de manière visible et courageuse. Vous travaillez avec enthousiasme et défendez avec ardeur vos convictions professionnelles.',
      relational: 'Entier et d\'une grande sensibilité, vous aimez avec intensité. Vous recherchez une relation vibrante et protectrice, et avez besoin d\'un partenaire capable d\'accueillir vos vagues émotionnelles avec respect et force.'
    },
    'Eau+Terre': {
      general: 'Votre sensibilité Eau trouve un réceptacle solide dans votre Ascendant Terre. C\'est une configuration sidérale d\'ancrage et de fécondité, où l\'intuition se traduit en actions concrètes et bienveillantes.',
      pro: 'Fiable, calme et attentif aux besoins d\'autrui, vous aimez travailler dans des cadres stables et porteurs de sens humain. Vous êtes le pilier protecteur sur lequel l\'équipe peut se reposer.',
      relational: 'Dévoué et constant, vous placez la construction du foyer au cœur de votre vie. Vous offrez à votre partenaire une tendresse sincère, une écoute profonde et un sentiment de sécurité inébranlable.'
    },
    'Eau+Air': {
      general: 'Une alliance d\'empathie silencieuse (Eau) et de diplomatie intellectuelle (Air). Vous dégagez une bienveillance naturelle qui apaise instantanément votre entourage et favorise la concorde sociale.',
      pro: 'Médiateur hors pair, vous brillez dans les ressources humaines, les soins thérapeutiques, la communication bienveillante ou l\'éducation. Votre force est d\'allier intuition et écoute active.',
      relational: 'Vous recherchez l\'harmonie relationnelle absolue et la sécurité affective. Doux et attentionné, vous êtes protecteur et soucieux de l\'équilibre du couple. Vous fuyez le conflit pour préserver votre cocon.'
    },
    'Eau+Eau': {
      general: 'Une immersion totale dans le monde de l\'inconscient, de l\'intuition vibratoire et de la reliance invisible. Vous êtes d\'une sensibilité extraordinaire, ressentant les cœurs et les atmosphères comme un livre ouvert.',
      pro: 'Thérapeute, artiste inspiré ou conseiller spirituel, vous excellez là où l\'écoute profonde et la créativité sensible sont exigées. Vous fonctionnez à la résonance émotionnelle et à l\'intuition.',
      relational: 'Fusionnel et profondément romantique, vous recherchez l\'osmose totale avec l\'être aimé. Vous aimez de façon inconditionnelle et avez besoin d\'une sécurité affective et spirituelle absolue pour vous ouvrir.'
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

  /* ─── Dictionnaires d'interprétations détaillées des Planètes Personnelles en Signes ─── */
  var MOON_DATA = {
    'Bélier': {
      p: "Votre sensibilité est vive, passionnée et réactive. Vous vivez vos émotions au présent avec une franchise absolue, guidé par un besoin vital d'indépendance.",
      w: "Au travail, vous réagissez avec enthousiasme et audace. Vous êtes excellent pour surmonter les premiers obstacles à l'instinct.",
      r: "En amour, vous exprimez vos sentiments de façon directe et spontanée, fuyant la routine et recherchant une intensité franche."
    },
    'Taureau': {
      p: "Vos émotions sont calmes, stables et profondément ancrées. Vous recherchez le confort, la beauté organique et la sérénité émotionnelle.",
      w: "Professionnellement, vous êtes d'une fiabilité absolue. Vous structurez vos tâches avec patience et gérez le stress par le calme.",
      r: "Sur le plan affectif, vous exprimez une tendresse rassurante et une fidélité inébranlable, construisant un foyer paisible."
    },
    'Gémeaux': {
      p: "Votre sensibilité est curieuse, mobile et passe par le filtre de l'esprit. Vous aimez échanger sur vos états d'âme et verbaliser vos ressentis.",
      w: "Au travail, votre adaptabilité et votre sens de l'humour facilitent les relations. Vous résolvez les tensions par le dialogue.",
      r: "En couple, vous recherchez une complicité intellectuelle et amicale. Le partage d'idées et le jeu sont vos moteurs."
    },
    'Cancer': {
      p: "Une réceptivité intuitive océanique. Vous absorbez les ambiances environnantes comme une éponge et possédez une mémoire émotionnelle d'une richesse infinie.",
      w: "Vous brillez dans les fonctions de soin, d'éducation ou de création où votre intuition et votre empathie naturelle font merveille.",
      r: "Tendre et protecteur, vous aspirez à une fusion d'âme à âme et à la création d'un foyer chaleureux et sécurisant."
    },
    'Lion': {
      p: "Votre cœur est généreux, fier et noble. Vous ressentez le besoin d'exprimer vos émotions avec panache et dignité.",
      w: "Vous vous investissez professionnellement avec passion et un fort sentiment de loyauté, motivant vos collaborateurs par votre chaleur.",
      r: "En amour, vous êtes loyal, protecteur et démonstratif. Vous offrez un amour vaste et attendez une estime réciproque."
    },
    'Vierge': {
      p: "Votre sensibilité est pudique, analytique et soucieuse de bien faire. Vous gérez vos sentiments avec logique et recherchez l'utilité.",
      w: "D'une précision et d'une fiabilité hors pair au travail, vous désamorcez les crises en apportant des solutions concrètes et claires.",
      r: "Vous exprimez votre attachement par des services attentionnés et une écoute fidèle au quotidien, fuyant les grands drames."
    },
    'Balance': {
      p: "Vous recherchez l'harmonie, la concorde et la beauté dans tout ce que vous vivez. Le conflit ou la vulgarité heurtent profondément votre sensibilité.",
      w: "Au travail, votre diplomatie naturelle et votre sens de la justice font de vous un excellent médiateur et partenaire de projets.",
      r: "Romantique et attentionné, vous concevez la vie comme un duo harmonieux basé sur le dialogue, le tact et le respect mutuel."
    },
    'Scorpion': {
      p: "Votre intériorité est d'une intensité mystérieuse et d'une résilience hors norme. Vos émotions sont entières, secrètes et magnétiques.",
      w: "Vous agissez avec stratégie et perspicacité. Vous n'avez pas peur d'affronter les crises professionnelles ou de restructurer les systèmes défaillants.",
      r: "En amour, vous cherchez la fusion absolue, l'authenticité et la vérité d'âme à âme, offrant une fidélité indéfectible."
    },
    'Sagittaire': {
      p: "Votre nature émotionnelle est optimiste, chaleureuse et assoiffée de liberté et d'idéaux élevés. Vous croyez profondément en la vie.",
      w: "Vous apportez un enthousiasme communicatif et une hauteur de vue. Vous brillez dans la formation ou le développement de projets.",
      r: "Compagnon de route joyeux et sincère, vous offrez une relation ouverte sur le monde et exempte de jalousie étouffante."
    },
    'Capricorne': {
      p: "Vos sentiments sont profonds, retenus et marqués par une grande maturité. Vous gérez vos émotions avec pudeur et autodiscipline.",
      w: "Vous structurez les projets avec discipline et endurance. Vous assumez les responsabilités professionnelles les plus lourdes avec intégrité.",
      r: "Fidèle et constant, vous ne vous engagez pas à la légère. Vous prouvez votre amour par des actes concrets et une sécurité durable."
    },
    'Verseau': {
      p: "Votre sensibilité est indépendante, originale et fraternelle. Vous prenez du recul face aux drames pour privilégier la logique humaine.",
      w: "Innovant et tourné vers l'avenir au travail, vous collaborez facilement en équipe autour de projets sociaux ou écologiques.",
      r: "Vous privilégiez l'amitié amoureuse et le respect mutuel de l'indépendance de chacun. Vous exprimez votre amour en encourageant l'autre."
    },
    'Poissons': {
      p: "Votre empathie est illimitée. Vous ressentez les émotions d'autrui au point de vous y dissoudre, guidé par une imagination poétique.",
      w: "Très créatif et intuitif, vous brillez dans l'accompagnement d'aide directe ou les projets artistiques porteurs de sens subtil.",
      r: "D'une tendresse infinie et d'une dévotion sincère, vous cherchez l'osmose romantique et mystique avec l'être aimé."
    }
  };

  var MERCURY_DATA = {
    'Bélier': {
      p: "Votre esprit est vif, direct et réactif. Vous pensez et décidez rapidement, exprimant vos opinions avec franchise et courage.",
      w: "Au travail, vous êtes un initiateur d'idées audacieuses. Vous préférez aller droit au but et détestez les réunions interminables.",
      r: "Dans vos échanges, vous appréciez la clarté immédiate et la sincérité absolue, refusant les détours ou les faux-semblants."
    },
    'Taureau': {
      p: "Votre pensée est calme, pragmatique et réfléchie. Vous prenez le temps d'assimiler les informations pour construire un raisonnement solide.",
      w: "Au travail, vous excellez dans la structuration concrète et le suivi rigoureux. Votre parole est écoutée pour son bon sens.",
      r: "Dans vos discussions de couple, vous rassurez par votre calme et votre régularité, cherchant des solutions stables et réalistes."
    },
    'Gémeaux': {
      p: "Votre esprit est d'une agilité et d'une curiosité exceptionnelles. Vous aimez accumuler les connaissances et croiser les idées.",
      w: "Vous brillez dans la communication, l'écriture, les relations publiques et le multitâche. Vous connectez les esprits avec aisance.",
      r: "Le jeu d'esprit et la conversation stimulante sont vos meilleurs atouts de séduction. Vous apportez beaucoup de vie dans l'échange."
    },
    'Cancer': {
      p: "Votre pensée est intuitive, imaginative et nourrie par vos souvenirs. Vous réfléchissez avec votre cœur et captez le non-dit.",
      w: "Professionnellement, vous brillez dans la négociation diplomatique ou la création de récits. Vous apprenez par l'implication personnelle.",
      r: "Dans l'intimité, vos mots sont doux, attentionnés et enveloppants. Vous exprimez vos sentiments avec pudeur et tendresse."
    },
    'Lion': {
      p: "Votre parole est noble, chaleureuse et persuasive. Vous vous exprimez avec fierté et cherchez à élever le débat.",
      w: "Excellent orateur ou formateur, vous savez captiver un auditoire et guider les équipes par des discours clairs et inspirants.",
      r: "Dans le couple, vous aimez encourager votre partenaire par des compliments sincères et des déclarations chaleureuses."
    },
    'Vierge': {
      p: "Votre esprit analytique est d'une clarté et d'une précision remarquables. Vous triez, classez et résolvez les problèmes avec logique.",
      w: "Vous excellez dans les métiers exigeant de la rigueur, de la relecture ou de la gestion technique de données complexes.",
      r: "Dans vos relations, vous proposez des conseils pratiques et utiles, traduisant votre affection par une aide concrète au quotidien."
    },
    'Balance': {
      p: "Votre pensée recherche l'équité, la nuance et le compromis harmonieux. Vous pesez toujours le pour et le contre avant de décider.",
      w: "Excellent diplomate ou conseiller juridique, vous désamorcez les conflits professionnels en trouvant des terrains d'entente équitables.",
      r: "Dans vos échanges amoureux, vous privilégiez le tact, le respect mutuel et le dialogue constructif, évitant la vulgarité."
    },
    'Scorpion': {
      p: "Votre intellect est perçant, stratégique et sans concession. Vous aimez creuser sous les apparences pour découvrir les secrets.",
      w: "Vous brillez dans l'investigation, la finance stratégique ou la psychologie, là où la lucidité et la perspicacité sont capitales.",
      r: "Vos discussions de couple sont profondes et cherchent l'authenticité brute. Vous détestez le mensonge ou la superficialité."
    },
    'Sagittaire': {
      p: "Votre pensée est philosophique, ouverte sur le monde et en quête de sens global. Vous aimez enseigner et partager vos idéaux.",
      w: "Vous brillez dans les rôles de synthèse, d'enseignement ou d'expansion internationale. Votre vision globale inspire vos collaborateurs.",
      r: "Dans vos échanges intimes, vous séduisez par votre humour, votre franchise et votre soif d'apprendre ensemble."
    },
    'Capricorne': {
      p: "Votre esprit est structuré, réaliste et concentré sur la durée. Vous vous exprimez de façon sobre, précise et pragmatique.",
      w: "Vous excellez dans la planification stratégique à long terme. Votre rigueur et votre sens des responsabilités inspirent le respect.",
      r: "Dans vos engagements, votre parole est un contrat d'honneur. Vous rassurez votre partenaire par votre constance et votre sérieux."
    },
    'Verseau': {
      p: "Votre pensée est originale, progressiste et tournée vers le futur. Vous aimez bousculer les idées reçues pour innover.",
      w: "Vous êtes à l'aise dans le remue-méninges et les projets collectifs axés sur la technologie ou le progrès social.",
      r: "Dans vos relations, vous séduisez par votre indépendance d'esprit, votre tolérance et vos discussions d'avenir passionnantes."
    },
    'Poissons': {
      p: "Votre esprit est intuitif, métaphorique et réceptif à l'invisible. Vous pensez par images et ressentez les vérités subtiles.",
      w: "Vous brillez dans les domaines artistiques, l'écriture poétique ou la thérapie où l'inspiration et l'empathie guident vos choix.",
      r: "Dans le couple, vous communiquez d'âme à âme, captant les sentiments de votre partenaire sans qu'aucun mot ne soit prononcé."
    }
  };

  var VENUS_DATA = {
    'Bélier': {
      p: "Vous aimez avec fougue, spontanéité et un besoin de nouveauté constante. Vos sentiments naissent rapidement et recherchent l'intensité.",
      w: "Au travail, vous appréciez les relations dynamiques et franches. Vous insufflez de la passion et une saine émulation dans vos projets.",
      r: "En amour, vous séduisez par votre audace et votre charme direct. Vous recherchez un partenaire indépendant qui stimule votre désir."
    },
    'Taureau': {
      p: "Une configuration de grande harmonie. Vos sentiments sont calmes, stables et intimement liés aux plaisirs des sens et de la nature.",
      w: "Dans vos projets, vous recherchez le confort, la beauté tangible et la rentabilité stable, alliant l'esthétique au pragmatisme.",
      r: "D'une fidélité à toute épreuve et d'une grande sensualité, vous exprimez votre amour par des cadeaux, du soin et une présence fiable."
    },
    'Gémeaux': {
      p: "Vous aimez avec légèreté, curiosité et un grand besoin d'échanges d'idées. Les relations platoniques ou intellectuelles vous stimulent.",
      w: "Professionnellement, vous créez un climat convivial par votre humour. Vous excellez dans l'animation d'événements et le réseau social.",
      r: "La complicité d'esprit et le jeu verbal sont indispensables. Vous séduisez par les mots et fuyez l'exclusivité étouffante."
    },
    'Cancer': {
      p: "Vos sentiments sont empreints d'une grande tendresse protectrice. Vous aimez avec nostalgie et recherchez un nid douillet.",
      w: "Vous appréciez les ambiances de travail familiales et bienveillantes. Vous vous investissez par attachement affectif aux équipes.",
      r: "Tendre, fusionnel et fidèle, vous offrez à votre conjoint un amour enveloppant, mais craignez beaucoup les blessures d'amour propre."
    },
    'Lion': {
      p: "Votre façon d'aimer est noble, théâtrale et généreuse. Vous placez l'être aimé sur un piédestal et recherchez un amour flamboyant.",
      w: "Au travail, vous valorisez la reconnaissance de vos talents artistiques ou créatifs. Vous inspirez confiance par votre allure digne.",
      r: "Fidèle et protecteur, vous gâtez votre partenaire avec magnificence, mais attendez en retour une admiration et un respect sincères."
    },
    'Vierge': {
      p: "Vos sentiments sont pudiques, mesurés et exprimés avec discrétion. Vous analysez vos émotions et fuyez le laisser-aller.",
      w: "Dans votre activité, vous trouvez du plaisir dans la précision et le service d'utilité publique. Vos collègues apprécient votre tact soigné.",
      r: "Votre amour se prouve par le dévouement quotidien et des services attentionnés, apportant de la sérénité pratique au couple."
    },
    'Balance': {
      p: "La beauté, le raffinement et l'équilibre artistique sont vos idéaux de vie. Vous recherchez la concorde relationnelle absolue.",
      w: "Vous excellez dans les négociations d'affaires, le design d'intérieur ou les carrières artistiques où votre goût exquis fait la différence.",
      r: "Romantique délicat, vous fuyez le conflit et cherchez la réciprocité harmonieuse, séduisant par votre tact et votre courtoisie."
    },
    'Scorpion': {
      p: "Vos sentiments sont d'une intensité volcanique et d'une profondeur absolue. L'amour est pour vous un chemin de transformation intime.",
      w: "Au travail, vous fonctionnez à la passion ou au rejet. Votre magnétisme vous permet d'influencer positivement les décisions collectives.",
      r: "Fusionnel, passionné et très protecteur, vous exigez une loyauté totale et refusez les faux-semblants amoureux."
    },
    'Sagittaire': {
      p: "Votre idéal d'amour est grand, noble, aventureux et ouvert sur le monde. Vous aimez voyager et grandir avec l'autre.",
      w: "Vous appréciez les relations professionnelles basées sur le respect mutuel des idéaux. Vous insufflez de l'optimisme dans vos projets.",
      r: "Partenaire de route enthousiaste et jovial, vous fuyez la jalousie possessive et cultivez une amitié amoureuse épanouissante."
    },
    'Capricorne': {
      p: "Vos sentiments sont sérieux, réservés et s'ancrent dans la durée. Vous refusez les amourettes futiles et recherchez l'engagement.",
      w: "Professionnellement, vous êtes apprécié pour votre rigueur et votre discrétion. Vous alliez responsabilité et intégrité relationnelle.",
      r: "Pudique mais d'une fidélité à toute épreuve, vous prouvez votre attachement par votre constance et votre protection inconditionnelle."
    },
    'Verseau': {
      p: "Votre façon d'aimer est libre, originale et fraternelle. Vous placez l'amitié intellectuelle au-dessus de la fusion possessive.",
      w: "Vous aimez collaborer avec des personnes atypiques ou engagées. Vous encouragez la créativité collaborative dans votre équipe.",
      r: "Vous offrez une relation égalitaire, riche en discussions stimulantes. Le respect de l'indépendance de chacun est sacré."
    },
    'Poissons': {
      p: "L'amour inconditionnel et la compassion universelle. Vos sentiments sont d'une sensibilité infinie et d'une résonance mystique.",
      w: "Vous trouvez du plaisir dans les projets d'aide humanitaire ou artistiques, agissant par dévouement sincère pour soulager les autres.",
      r: "Romantique absolu, vous recherchez l'osmose d'âme à âme, pardonnant avec douceur et offrant une tendresse infinie."
    }
  };

  var MARS_DATA = {
    'Bélier': {
      p: "Votre énergie est directe, courageuse et rapide. Vous foncez face aux défis et affirmez votre volonté avec force.",
      w: "Starter né au travail, vous prenez immédiatement les devants. Vous aimez décider vite et agir sans attendre de consensus.",
      r: "En amour, vous séduisez par votre audace et votre ardeur directe, provoquant les rencontres avec spontanéité."
    },
    'Taureau': {
      p: "Votre force d'action est persévérante, patiente et obstinée. Vous construisez avec calme et défendez vos acquis avec vigueur.",
      w: "Constant et méthodique au travail, vous menez vos tâches à bien pas à pas, résistant parfaitement à l'effort soutenu.",
      r: "Dans vos relations, vous êtes un partenaire protecteur et solide, rassurant par votre constance physique et votre loyauté."
    },
    'Gémeaux': {
      p: "Votre action passe par le verbe et l'esprit. Vous débattez, écrivez et résolvez les conflits par votre vivacité intellectuelle.",
      w: "Au travail, vous aimez mener de front plusieurs projets stimulants. Votre agilité intellectuelle est un atout majeur.",
      r: "Vous exprimez votre désir par le jeu d'esprit et la taquinerie complice. Vous séduisez par votre bagout et votre humour."
    },
    'Cancer': {
      p: "Votre énergie d'action est guidée par vos sentiments et votre intuition. Vous agissez pour protéger votre foyer et vos proches.",
      w: "Au travail, vous fonctionnez à l'instinct et préférez coopérer doucement plutôt que d'imposer votre autorité par la force.",
      r: "De nature tendre et réservée, vous agissez avec une grande délicatesse affectueuse, fuyant la brutalité."
    },
    'Lion': {
      p: "Votre action est digne, fière et créative. Vous agissez avec courage et cherchez à inspirer les autres par vos exploits.",
      w: "Leader naturel au travail, vous menez vos projets avec assurance et générosité, pilotant les équipes avec noblesse.",
      r: "Passionné et théâtral, vous exprimez votre désir de façon flamboyante et protégez férocement l'être aimé."
    },
    'Vierge': {
      p: "Votre énergie d'action est méthodique, soignée et précise. Vous agissez de manière pragmatique pour ordonner et soigner.",
      w: "Garant de la finition des projets au travail, vous résolvez les problèmes complexes avec logique et sens du détail pratique.",
      r: "Vous agissez avec une discrétion touchante pour le bien-être de votre partenaire, montrant votre amour par des services concrets."
    },
    'Balance': {
      p: "Votre action recherche le compromis, le tact et la concorde. Vous agissez toujours pour rétablir la justice et l'harmonie.",
      w: "Au travail, vous préférez la collaboration et le partenariat. Vous êtes excellent pour négocier des accords équitables.",
      r: "Vous exprimez vos désirs avec douceur et esthétisme, séduisant par votre courtoisie raffinée et fuyant les éclats de voix."
    },
    'Scorpion': {
      p: "Votre force d'action est d'une intensité phénoménale et d'une ténacité à toute épreuve. Vous agissez avec stratégie et secret.",
      w: "Vous excellez dans la gestion de crises majeures ou la restructuration d'activités, agissant avec courage et perspicacité.",
      r: "Magnétique et entier, vous exprimez votre désir avec passion et possessivité saine, cherchant l'intimité fusionnelle."
    },
    'Sagittaire': {
      p: "Votre énergie est enthousiaste, aventureuse et tournée vers l'atteinte d'idéaux élevés. Vous agissez avec foi et optimisme.",
      w: "Vous pilotez les projets d'envergure ou d'enseignement avec élan, fédérant les collaborateurs par votre bonne humeur.",
      r: "Partenaire de jeu dynamique et ouvert, vous aimez partager des activités sportives ou des voyages stimulants à deux."
    },
    'Capricorne': {
      p: "Votre action est structurée, disciplinée et planifiée sur le long terme. Vous gravissez les échelons par le travail constant.",
      w: "D'une efficacité redoutable et silencieuse au travail, vous assumez les tâches les plus ardues avec persévérance et droiture.",
      r: "Discret et solide, vous agissez comme un rempart de sécurité pour votre conjoint, construisant un foyer pérenne."
    },
    'Verseau': {
      p: "Votre force d'action est indépendante, originale et tournée vers le collectif. Vous agissez pour réformer et innover.",
      w: "Vous brillez dans le travail collaboratif et les projets associatifs ou technologiques d'avant-garde, refusant le conformisme.",
      r: "Vous exprimez votre désir avec originalité et liberté de ton, privilégiant la complicité fraternelle et le respect mutuel."
    },
    'Poissons': {
      p: "Votre action est subtile, intuitive et inspirée. Vous agissez souvent de manière indirecte, guidé par votre sensibilité.",
      w: "Vous vous épanouissez dans les projets créatifs, artistiques ou d'aide sociale où votre réceptivité est une force motrice.",
      r: "D'une tendresse infinie, vous exprimez votre désir avec une douceur poétique et une empathie enveloppante."
    }
  };

  var PLANET_INFOS = {
    'Soleil': { sym: '☉', name: 'Soleil', col: 'gold', role: 'Essence & Volonté Profonde' },
    'Lune': { sym: '☽', name: 'Lune', col: 'cyan', role: 'Sensibilité & Intuition' },
    'Mercure': { sym: '☿', name: 'Mercure', col: 'cyan', role: 'Intellect & Communication' },
    'Vénus': { sym: '♀', name: 'Vénus', col: 'rose', role: 'Amour, Harmonie & Esthétique' },
    'Mars': { sym: '♂', name: 'Mars', col: 'rose', role: 'Désir, Action & Force de Volonté' },
    'Jupiter': { sym: '♃', name: 'Jupiter', col: 'gold', role: 'Sagesse, Expansion & Opportunités' },
    'Saturne': { sym: '♄', name: 'Saturne', col: 'slate', role: 'Responsabilité, Discipline & Temps' },
    'Uranus': { sym: '♅', name: 'Uranus', col: 'cyan', role: 'Originalité & Éveil de Conscience' },
    'Neptune': { sym: '♆', name: 'Neptune', col: 'violet', role: 'Inspiration, Compassion & Rêve' },
    'Pluton': { sym: '♇', name: 'Pluton', col: 'violet', role: 'Transformation & Puissance Psychique' }
  };

  /* ─── Rendu des cartes résultat (Soleil / Ascendant de base) ─── */
  var COLOR_MAP = {
    rose: '#fb8195', emerald: '#3dd399', cyan: '#3bd3ee',
    gold: '#dfb26c', violet: '#b78bfa', slate: '#94a3b8'
  };

  function renderCard(s, extraHtml, ayanamsaStr, tropicalDeg) {
    var col = COLOR_MAP[s.col] || '#94a3b8';
    var tropStr = tropicalDeg ? '<span class="at-rc-badge">Soleil Tropical : ' + tropicalDeg + '</span>' : '';
    return '<div class="at-result-card">'
      + '<div class="at-rc-header">'
        + '<div class="at-rc-sym" style="color:' + col + '">' + s.sym + '</div>'
        + '<div>'
          + '<div class="at-rc-name" style="color:' + col + '">' + s.name + ' Sidéral</div>'
          + '<div class="at-rc-badges">'
            + '<span class="at-rc-badge">' + s.el + '</span>'
            + '<span class="at-rc-badge">' + s.mod + '</span>'
            + '<span class="at-rc-badge">♟ ' + s.ruler + '</span>'
            + tropStr
          + '</div>'
        + '</div>'
      + '</div>'
      + '<p class="at-rc-kw">' + s.kw + '</p>'
      + '<p class="at-rc-interp">' + s.interp + '</p>'
      + (extraHtml || '')
      + '</div>';
  }

  function renderAscCard(s, ascDeg, ayanamsaStr, tropicalDeg) {
    var decan = getDecanInfo(Math.floor(ascDeg / 30), ascDeg);
    var degStr = (((ascDeg % 30) + 30) % 30).toFixed(1);
    var col = COLOR_MAP[s.col] || '#94a3b8';
    var tropStr = tropicalDeg ? '<span class="at-rc-badge">Ascendant Tropical : ' + tropicalDeg + '</span>' : '';
    var extra  = '<div class="at-rc-footer">'
      + '<span class="at-rc-deg">↑ ' + degStr + '° ' + s.name + '</span>'
      + '<span class="at-decan-badge">Décan ' + (Math.floor(((ascDeg % 30) + 30) % 30 / 10) + 1)
      + ' · ' + decan.r + '</span>'
      + '<span class="at-rc-deg" style="margin-left:auto;color:var(--emerald);">Ayanamsa Lahiri : ' + ayanamsaStr + '</span>'
      + '</div>'
      + '<p class="at-decan-phrase">' + decan.p + '</p>';
    
    return '<div class="at-result-card">'
      + '<div class="at-rc-header">'
        + '<div class="at-rc-sym" style="color:' + col + '">' + s.sym + '</div>'
        + '<div>'
          + '<div class="at-rc-name" style="color:' + col + '">' + s.name + ' Sidéral</div>'
          + '<div class="at-rc-badges">'
            + '<span class="at-rc-badge">' + s.el + '</span>'
            + '<span class="at-rc-badge">' + s.mod + '</span>'
            + '<span class="at-rc-badge">♟ ' + s.ruler + '</span>'
            + tropStr
          + '</div>'
        + '</div>'
      + '</div>'
      + '<p class="at-rc-kw">' + s.kw + '</p>'
      + '<p class="at-rc-interp">' + (s.ascInterp || s.interp) + '</p>'
      + extra
      + '</div>';
  }

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
      + '<div class="at-combo-title">✦ Votre configuration Soleil · Ascendant Sidérale</div>'
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

  /* Formatage des degrés */
  function formatAyanamsa(deg) {
    var d = Math.floor(deg);
    var minFloat = (deg - d) * 60;
    var m = Math.floor(minFloat);
    var s = Math.round((minFloat - m) * 60);
    if (s === 60) { m += 1; s = 0; }
    if (m === 60) { d += 1; m = 0; }
    return d + '° ' + m + '\' ' + s + '"';
  }

  function formatLonToSign(deg) {
    var idx = Math.floor(deg / 30);
    var d = (((deg % 30) + 30) % 30).toFixed(1);
    return d + '° ' + SIGNS[idx].name;
  }

  function updatePersonalAyanamsa(j, mo, a, ayanamsaStr, tropicalSunDeg, siderealSunDeg, tropicalAscDeg, siderealAscDeg) {
    var box = document.getElementById('atPersonalAyanamsaBox');
    if (!box) return;

    var sunTropSign = SIGNS[Math.floor(tropicalSunDeg / 30)].name;
    var sunSidSign = SIGNS[Math.floor(siderealSunDeg / 30)].name;
    var ascTropSign = SIGNS[Math.floor(tropicalAscDeg / 30)].name;
    var ascSidSign = SIGNS[Math.floor(siderealAscDeg / 30)].name;

    var sunTropVal = (((tropicalSunDeg % 30) + 30) % 30).toFixed(1);
    var sunSidVal = (((siderealSunDeg % 30) + 30) % 30).toFixed(1);
    var ascTropVal = (((tropicalAscDeg % 30) + 30) % 30).toFixed(1);
    var ascSidVal = (((siderealAscDeg % 30) + 30) % 30).toFixed(1);

    var birthDateStr = (j < 10 ? '0' + j : j) + '/' + (mo < 10 ? '0' + mo : mo) + '/' + a;

    var SUN_TRANSITIONS = {
      'Bélier_Poissons': "Ce glissement du Bélier (Feu Cardinal) vers les Poissons (Eau Mutable) indique que votre volonté consciente, que vous pensiez menée uniquement par l'impulsion et l'affirmation individuelle, puise en réalité sa force dans une grande réceptivité spirituelle, une empathie universelle et un besoin de reliance. Votre combat n'est pas extérieur, mais intérieur, intuitif et pacifique.",
      'Taureau_Bélier': "Ce glissement du Taureau (Terre Fixe) vers le Bélier (Feu Cardinal) révèle que derrière une apparente recherche de stabilité, de confort et de sécurité passive se cache un moteur d'action guidé par l'audace, l'indépendance sauvage et le besoin d'initier de nouvelles voies. Votre force tranquille s'anime d'un élan pionnier.",
      'Gémeaux_Taureau': "Ce glissement des Gémeaux (Air Mutable) vers le Taureau (Terre Fixe) indique que votre agilité intellectuelle et votre soif d'échange verbal reposent en vérité sur une essence intime profondément ancrée, calme et en quête de concret. Votre esprit a besoin de se matérialiser dans le réel, de savourer les plaisirs simples et de bâtir du solide.",
      'Cancer_Gémeaux': "Ce glissement du Cancer (Eau Cardinal) vers les Gémeaux (Air Mutable) montre que si votre façade recherche la sécurité d'un cocon émotionnel, votre essence stellaire se nourrit de communication, de curiosité intellectuelle et de flexibilité. Vous exprimez votre sensibilité par le verbe, le lien social et l'agilité d'esprit.",
      'Lion_Cancer': "Ce glissement du Lion (Feu Fixe) vers le Cancer (Eau Cardinal) est une invitation à intérioriser votre lumière. Le besoin de reconnaissance extérieure et de rayonnement public s'efface pour révéler une noblesse d'âme centrée sur l'empathie, la mémoire, le soin des vôtres et la protection bienveillante. Votre force est celle du cœur et de l'intimité.",
      'Vierge_Lion': "Ce glissement de la Vierge (Terre Mutable) vers le Lion (Feu Fixe) révèle que votre rigueur analytique, votre modestie et votre sens du détail cachent en réalité un noyau d'une grande dignité, souverain et généreux. Vous n'êtes pas né pour rester uniquement dans l'ombre du service, mais pour inspirer et guider avec intégrité.",
      'Balance_Vierge': "Ce glissement de la Balance (Air Cardinal) vers la Vierge (Terre Mutable) montre que votre quête de relations harmonieuses et de compromis esthétiques s'appuie sur une essence méthodique, lucide, éprise de vérité pratique et de pureté d'intention. Votre équilibre s'obtient par le discernement concret et l'utilité réelle.",
      'Scorpion_Balance': "Ce glissement du Scorpion (Eau Fixe) vers la Balance (Air Cardinal) indique que votre tendance à vivre les situations sous forme de crises intenses ou de luttes de pouvoir inconscientes cherche en réalité à s'apaiser dans une quête sacrée d'harmonie, de justice relationnelle et de paix. Votre alchimie passe par l'art du lien et du compromis.",
      'Sagittaire_Scorpion': "Ce glissement du Sagittaire (Feu Mutable) vers le Scorpion (Eau Fixe) révèle que votre soif de voyages, d'optimisme et de philosophie de vie prend racine dans un besoin de vérité brute, d'investigation psychologique profonde et d'alchimie émotionnelle. Votre quête de sens est une plongée dans les mystères intimes.",
      'Capricorne_Sagittaire': "Ce glissement du Capricorne (Terre Cardinal) vers le Sagittaire (Feu Mutable) indique que votre rigueur, votre sens des responsabilités et votre froideur apparente cachent en réalité une âme de chercheur de vérité, de voyageur et de philosophe. Votre ambition est portée par une foi profonde en la vie et un besoin d'évasion spirituelle.",
      'Verseau_Capricorne': "Ce glissement du Verseau (Air Fixe) vers le Capricorne (Terre Cardinal) montre que vos idéaux humanistes et votre soif d'originalité reposent en vérité sur une structure saturnienne d'une grande intégrité, persévérante et pragmatique. Vous donnez corps à vos utopies par une discipline et une patience inébranlables.",
      'Poissons_Verseau': "Ce glissement des Poissons (Eau Mutable) vers le Verseau (Air Fixe) révèle que votre sensibilité mystique et votre tendance à la fusion émotionnelle sont en réalité canalisées par une conscience collective humaniste, originale et tournée vers le futur. Votre compassion s'exprime dans la fraternité et le partage d'idéaux libres."
    };

    var ASC_TRANSITIONS = {
      'Bélier_Poissons': "Votre filtre premier de réaction au monde, que vous pensiez impulsif, courageux et combatif (Bélier), est en réalité guidé à un niveau spirituel par une extrême sensibilité intuitive et une grande douceur mystique (Poissons). Votre entrée dans l'existence se fait par le ressenti et la reliance.",
      'Taureau_Bélier': "Derrière une posture perçue comme calme, posée ou en recherche de stabilité passive (Taureau), votre horizon de naissance révèle un filtre de contact dynamique, réactif et habité par la fougue initiatrice du Bélier. Vous apprenez à vous affirmer et à agir à l'instinct.",
      'Gémeaux_Taureau': "Votre contact avec le monde extérieur, au lieu d'être dispersé, changeant ou purement intellectuel (Gémeaux), s'ancre en réalité dans une présence physique solide, posée et rassurante (Taureau). Vous apprenez à stabiliser vos perceptions dans la matière.",
      'Cancer_Gémeaux': "Votre filtre relationnel spontané, que vous pensiez timide, réservé ou uniquement protecteur (Cancer), s'anime en réalité d'une grande curiosité d'esprit, d'une agilité communicative et d'un besoin d'échange (Gémeaux). Vous filtrez le monde par le dialogue.",
      'Lion_Cancer': "Votre prestance naturelle, que vous pensiez devoir être solaire, fière ou au premier plan (Lion), s'exprime en réalité à travers une posture de protection intime, réceptive et enveloppante (Cancer). Votre autorité passe par le soin et l'empathie.",
      'Vierge_Lion': "Votre première réaction face aux situations, perçue comme modeste, timide ou axée sur l'analyse critique (Vierge), dégage en réalité une dignité naturelle et une noblesse de présence chaleureuse (Lion). Vous apprenez à assumer votre propre rayonnement.",
      'Balance_Vierge': "Votre filtre de perception, plutôt que de reposer sur les compromis mondains ou le besoin constant de plaire (Balance), s'appuie sur une attention rigoureuse aux détails, une pudeur sincère et un désir d'utilité concrète (Vierge).",
      'Scorpion_Balance': "Au lieu de vous présenter au monde avec une distance défensive, mystérieuse ou soupçonneuse (Scorpion), votre filtre d'horizon cherche spontanément le dialogue harmonieux, la médiation pacifique et la coopération sincère (Balance).",
      'Sagittaire_Scorpion': "Votre approche spontanée de la vie n'est pas celle d'une légèreté joviale ou d'une foi aveugle (Sagittaire), mais celle d'un regard pénétrant, d'une grande intensité psychologique et d'un besoin de transmuter les crises (Scorpion).",
      'Capricorne_Sagittaire': "Votre filtre de vie, plutôt que d'être uniquement austère, saturnien ou sévère (Capricorne), s'anime en réalité d'un optimisme d'horizon, d'un goût pour l'exploration philosophique et d'une générusité jupitérienne (Sagittaire).",
      'Verseau_Capricorne': "Votre approche du monde, que vous vouliez humaniste, détachée ou originale (Verseau), s'ancre en vérité dans une posture pragmatique, rigoureuse et responsable (Capricorne), construisant patiemment vos projets dans le temps.",
      'Poissons_Verseau': "Votre horizon de naissance, plutôt que de vous inciter à la fusion affective vulnérable ou au sacrifice de soi (Poissons), vous invite à poser un filtre d'indépendance mentale, de fraternité d'esprit et d'originalité humaniste (Verseau)."
    };

    var html = '<h3 class="at-method-h3" style="color:var(--gold); display:flex; align-items:center; gap:0.5rem; margin-top:0; font-size:1.1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">'
             + '✨ Votre Décalage d\'Ayanamsa Personnel (' + birthDateStr + ')</h3>';

    html += '<p class="at-method-p" style="margin-top:0.8rem;">Lors de votre naissance le <strong>' + birthDateStr + '</strong>, l\'écart astronomique exact entre le zodiaque tropical (saisonnier) et le zodiaque sidéral (constellations réelles) était de <strong style="color:var(--emerald);">' + ayanamsaStr + '</strong>.</p>';

    html += '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.2rem; margin-top:1.2rem;">';
    
    // Box Soleil
    html += '<div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:1.2rem; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">'
          + '<h4 style="margin:0 0 0.6rem 0; font-size:0.95rem; color:var(--gold); display:flex; align-items:center; gap:0.4rem; font-family:var(--font-mono); font-weight:600;">'
          + '☀️ Transition du Signe Solaire</h4>'
          + '<p style="margin:0; font-size:0.85rem; line-height:1.6; color:#d0d6e0; font-family:var(--font-mono);">'
          + '• Position Tropicale : <strong>' + sunTropVal + '° ' + sunTropSign + '</strong><br>'
          + '• Position Sidérale : <strong style="color:var(--emerald);">' + sunSidVal + '° ' + sunSidSign + '</strong>'
          + '</p>';
    if (sunTropSign !== sunSidSign) {
      var sunKey = sunTropSign + '_' + sunSidSign;
      var sunInterp = SUN_TRANSITIONS[sunKey] || ('En raison du décalage de la précession, votre Soleil physique a glissé de la constellation du ' + sunTropSign + ' vers celle du ' + sunSidSign + ' au moment de votre incarnation.');
      html += '<p style="margin:0.8rem 0 0 0; font-size:0.82rem; color:#cbd5e1; line-height:1.6;">'
            + '<strong>Conséquence évolutive :</strong> ' + sunInterp
            + '</p>';
    } else {
      html += '<p style="margin:0.8rem 0 0 0; font-size:0.82rem; color:#cbd5e1; line-height:1.6;">'
            + '<strong>Conséquence évolutive :</strong> Bien que sa longitude ait été reculée de près de 24°, votre Soleil reste dans la constellation réelle du <strong>' + sunSidSign + '</strong>. Vos repères saisonniers terrestres et stellaires coïncident sur ce point, conférant une unité immédiate à votre expression d\'identité.'
            + '</p>';
    }
    html += '</div>';

    // Box Ascendant
    html += '<div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:1.2rem; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">'
          + '<h4 style="margin:0 0 0.6rem 0; font-size:0.95rem; color:var(--violet); display:flex; align-items:center; gap:0.4rem; font-family:var(--font-mono); font-weight:600;">'
          + '🌅 Transition de l\'Ascendant</h4>'
          + '<p style="margin:0; font-size:0.85rem; line-height:1.6; color:#d0d6e0; font-family:var(--font-mono);">'
          + '• Position Tropicale : <strong>' + ascTropVal + '° ' + ascTropSign + '</strong><br>'
          + '• Position Sidérale : <strong style="color:var(--emerald);">' + ascSidVal + '° ' + ascSidSign + '</strong>'
          + '</p>';
    if (ascTropSign !== ascSidSign) {
      var ascKey = ascTropSign + '_' + ascSidSign;
      var ascInterp = ASC_TRANSITIONS[ascKey] || ('L\'horizon de l\'Est à votre premier souffle révèle que votre Ascendant réel s\'est décalé vers ' + ascSidSign + ', teintant vos filtres instinctifs d\'une nouvelle résonance.');
      html += '<p style="margin:0.8rem 0 0 0; font-size:0.82rem; color:#cbd5e1; line-height:1.6;">'
            + '<strong>Conséquence évolutive :</strong> ' + ascInterp
            + '</p>';
    } else {
      html += '<p style="margin:0.8rem 0 0 0; font-size:0.82rem; color:#cbd5e1; line-height:1.6;">'
            + '<strong>Conséquence évolutive :</strong> Votre point ascendant à l\'Est reste dans la constellation de la <strong>' + ascSidSign + '</strong>, garantissant une intégrité directe entre vos filtres terrestres et célestes, stabilisant votre masque social et votre véhicule physique.'
            + '</p>';
    }
    html += '</div>';

    html += '</div>'; // Fin grid

    // Note sur le décalage temporel
    var yearDiff = 2026 - a;
    var directionStr = yearDiff > 0 ? "légèrement plus court" : "plus grand";
    html += '<p style="margin:1.2rem 0 0 0; font-size:0.82rem; color:var(--slate); line-height:1.6; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">'
          + 'ℹ️ <strong>Physique Stellaire :</strong> L\'axe de notre Terre se déplaçant au rythme de 50.3" par an, l\'écart à votre naissance en <strong>' + a + '</strong> était ' + directionStr + ' que l\'écart de référence de 2026. L\'algorithme de notre moteur de calcul a appliqué l\'équation d\'Ayanamsa exacte de votre année pour positionner vos luminaires avec une précision astronomique rigoureuse.'
          + '</p>';

    box.innerHTML = html;
    box.style.display = 'block';
  }

  var NAKSHATRAS = [
    {
      name: 'Ashwini', ruler: 'Ketu', deity: 'Les Ashwins (Médecins Célestes)', sym: 'Tête de Cheval',
      personal: "Votre trame karmique est marquée par une impulsion de guérison rapide et un esprit pionnier. Au niveau subconscient, vous portez un besoin vital de nouveauté et de dépassement des limites héritées. Votre défi réside dans la canalisation de cette impatience innée pour éviter l'épuisement.",
      pro: "Innovateur né, vous excellez dans les phases de démarrage, d'action d'urgence ou de restructuration rapide. Vos dons s'expriment dans les professions médicales, le conseil de crise ou l'entrepreneuriat audacieux.",
      relational: "En amour, vous recherchez une complicité basée sur l'action et l'indépendance mutuelle. Vous charmez par votre élan spontané, mais devez veiller à ne pas fuir la relation lorsque la routine s'installe."
    },
    {
      name: 'Bharani', ruler: 'Vénus', deity: 'Yama (Dieu du Dharma et de la Mort)', sym: 'Organe de naissance (Yoni)',
      personal: "Vos forces subconscientes vous poussent vers des processus réguliers de mort-renaissance psychologique. Le karma de Bharani est lié à la gestation et au sacrifice nécessaire pour donner naissance à une nouvelle version de vous-même.",
      pro: "Doté d'une discipline à toute épreuve sous la pression, vous brillez dans la gestion de crise, les finances de restructuration ou les arts nécessitant une longue préparation méticuleuse.",
      relational: "Vous vivez vos relations avec une intensité totale et un engagement d'âme. Passionné et parfois possessif, votre chemin est d'apprendre le lâcher-prise pour vivre une harmonie apaisée."
    },
    {
      name: 'Krittika', ruler: 'Soleil', deity: 'Agni (Dieu du Feu)', sym: 'Couteau ou Lame',
      personal: "Votre âme porte le feu purificateur (Agni). Votre structure karmique vous pousse à éliminer les faux-semblants et à protéger farouchement la vérité. Votre défi est d'apprendre à pacifier votre colère sacrée.",
      pro: "Votre esprit critique aiguisé et votre sens du devoir font de vous un leader naturel, un chercheur rigoureux ou un éducateur intransigeant mais profondément juste.",
      relational: "Direct et protecteur, vous n'aimez pas les non-dits dans le couple. Vous offrez un abri solide à votre partenaire, mais devez adoucir vos jugements pour éviter les ruptures brutales."
    },
    {
      name: 'Rohini', ruler: 'Lune', deity: 'Brahma (Créateur)', sym: 'Chariot ou Temple',
      personal: "Baigné par une abondance et une fertilité naturelles, votre subconscient vibre pour la beauté et la préservation de la vie. Karmiquement, vous attirez les regards et devez veiller à ne pas céder à la dépendance matérielle ou émotionnelle.",
      pro: "Créateur d'exception, vos talents s'épanouissent dans les arts visuels, le design, l'écologie ou le luxe raffiné. Votre magnétisme attire naturellement les soutiens et le succès financier.",
      relational: "Vous concevez l'union comme un cocon de douceur et de confort partagé. Votre besoin d'harmonie esthétique et affective vous rend extrêmement attentionné, cherchant une dévotion constante."
    },
    {
      name: 'Mrigashira', ruler: 'Mars', deity: 'Soma (Dieu de la Lune et du Nectar)', sym: 'Tête de Cerf',
      personal: "Votre âme est celle du voyageur éternel en quête de nectar spirituel. Vos forces subconscientes se traduisent par une curiosité insatiable et une sensibilité fine qui cherchent la beauté derrière chaque mystère.",
      pro: "Excellent chercheur, journaliste, communicant ou médiateur. Votre agilité intellectuelle vous permet de faire des ponts entre des mondes opposés avec une grande aisance.",
      relational: "Doux, joueur et sensible, vous recherchez une union fondée sur le dialogue continu et la complicité amicale. Vous fuyez les relations étouffantes ou trop rigides."
    },
    {
      name: 'Ardra', ruler: 'Rahu', deity: 'Rudra (Dieu des Tempêtes)', sym: 'Larme ou Diamant',
      personal: "Karmiquement lié aux tempêtes émotionnelles purificatrices. Vos forces subconscientes traversent le chaos pour en extraire des vérités fondamentales. Votre défi est d'apprendre à ne pas vous complaire dans la souffrance.",
      pro: "Vous excellez dans les environnements instables, la thérapie de choc, l'investigation complexe ou les technologies de rupture où d'autres perdent pied.",
      relational: "Les relations superficielles ne vous intéressent pas ; vous cherchez la vérité brute de l'autre. Vos sentiments sont profonds et demandent de l'honnêteté, quitte à bousculer le partenaire."
    },
    {
      name: 'Punarvasu', ruler: 'Jupiter', deity: 'Aditi (Mère des Dieux)', sym: 'Carquois de Flèches',
      personal: "Votre karma est porteur de régénération et du retour du printemps après l'hiver. Vos forces subconscientes sont nourries par un optimisme philosophique inaltérable et une grande générosité d'âme.",
      pro: "Don inné pour guider, enseigner et redonner espoir. Vous êtes parfait dans le mentorat, le droit, l'éducation ou tout projet à vocation philanthropique.",
      relational: "Bienveillant et loyal, vous offrez une sécurité émotionnelle totale. Vous cherchez un partenaire qui partage votre soif d'éthique, de voyages intellectuels et d'indépendance spatiale."
    },
    {
      name: 'Pushya', ruler: 'Saturne', deity: 'Brihaspati (Maître Spirituel)', sym: 'Pis de Vache ou Fleur',
      personal: "La demeure de la bienveillance pure. Votre trame karmique est celle d'un protecteur et d'un nourricier spirituel. Vos forces subconscientes recherchent le devoir accompli et le respect des lois éthiques.",
      pro: "Pilier de confiance, vous excellez dans le soin, la transmission de traditions sacrées, l'administration ou la gestion de structures communautaires durables.",
      relational: "Dévoué et protecteur, vous chérissez le foyer par-dessus tout. Votre amour se manifeste par des actions concrètes de soutien, aspirant à une union stable et sécurisante."
    },
    {
      name: 'Ashlesha', ruler: 'Mercure', deity: 'Sarpas (Serpents Cosmiques)', sym: 'Serpent enroulé',
      personal: "Vos forces subconscientes sont imprégnées d'un magnétisme intense et d'une intuition pénétrante (Kundalini). Karmiquement, vous apprenez à maîtriser vos peurs et à rejeter la manipulation mentale.",
      pro: "Fin stratège, vous brillez en psychologie, en négociation de haut niveau, en espionnage industriel ou dans la recherche scientifique des secrets de la nature.",
      relational: "Intense et parfois possessif, vous donnez votre confiance de façon très sélective. En amour, vous recherchez une fusion totale mais devez apprendre à lâcher le contrôle."
    },
    {
      name: 'Magha', ruler: 'Ketu', deity: 'Les Pitris (Ancêtres)', sym: 'Trône Royal',
      personal: "Connecté à l'héritage de vos ancêtres et aux forces de la lignée. Votre subconscient porte une noblesse naturelle et un sens inébranlable de la dignité. Votre défi est d'éviter l'orgueil et le mépris.",
      pro: "Leader naturel, vous excellez dans l'administration publique, l'histoire, l'archéologie, la direction générale ou tout rôle exigeant de l'autorité morale.",
      relational: "D'une fidélité et d'une fierté impériale, vous traitez votre partenaire avec égards et exigez en retour une reconnaissance claire de votre rôle. Protecteur jaloux du foyer."
    },
    {
      name: 'Purva Phalguni', ruler: 'Vénus', deity: 'Bhaga (Dieu de la Fortune)', sym: 'Lit ou Hamac',
      personal: "Une trame karmique tournée vers le repos de l'âme, le plaisir créatif et le jeu social. Vos forces subconscientes vous portent vers la joie et le relâchement des tensions. Défi d'éviter la complaisance passive.",
      pro: "Créatif, vous vous épanouissez dans le divertissement, la mode, les arts visuels, l'animation ou les relations publiques haut de gamme.",
      relational: "Romantique et chaleureux, vous concevez l'amour comme un art de vivre et de séduire. Vous recherchez un partenaire qui apprécie l'humour, le confort et les sorties culturelles."
    },
    {
      name: 'Uttara Phalguni', ruler: 'Soleil', deity: 'Aryaman (Dieu de la Fraternité)', sym: 'Pieds de Lit',
      personal: "Votre karma repose sur la fraternité et le soutien des autres. Au niveau subconscient, vous êtes motivé par le sens du devoir civique et le besoin de structurer des partenariats équitables.",
      pro: "Excellent dans la création d'alliances stratégiques, la diplomatie, la gestion d'associations ou le conseil juridique. Vous rassemblez les contraires autour d'un idéal commun.",
      relational: "Pour vous, le couple est un contrat d'entraide de longue durée. Vous offrez un dévouement absolu et recherchez une union fondée sur le respect des engagements mutuels."
    },
    {
      name: 'Hasta', ruler: 'Lune', deity: 'Savitur (Dieu du Soleil levant)', sym: 'Main ou Poing',
      personal: "Votre subconscient possède la clé de la manifestation matérielle par les mains (Hasta). Votre karma est d'amener les concepts de l'esprit dans le plan physique avec habileté et ingéniosité.",
      pro: "Génie créateur des artisans, chirurgiens, thérapeutes manuels, musiciens ou concepteurs techniques. Vous avez le don inné de réparer ce qui est brisé.",
      relational: "Attentionné et pragmatique, vous montrez votre amour par des gestes concrets du quotidien. Très protecteur, vous cherchez un partenaire sensible à votre délicatesse."
    },
    {
      name: 'Chitra', ruler: 'Mars', deity: 'Vishvakarma (Architecte Céleste)', sym: 'Perle ou Joyau brillant',
      personal: "La demeure de l'Architecte Céleste. Karmiquement, vous êtes venu pour sculpter votre vie comme une œuvre d'art. Forces subconscientes tournées vers la recherche de la perfection géométrique et de la forme esthétique.",
      pro: "Vous excellez dans l'architecture, le graphisme, le design industriel, l'ingénierie créative ou la haute couture. Votre sens du détail visuel est infaillible.",
      relational: "Séducteur et fier, vous aimez charmer et être admiré pour votre bon goût. Vous recherchez un partenaire raffiné qui sait apprécier et soutenir vos ambitions créatives."
    },
    {
      name: 'Svati', ruler: 'Rahu', deity: 'Vayu (Dieu du Vent)', sym: 'Jeune Pousse ou Épée',
      personal: "Porté par les forces du vent et du souffle vital (Vayu). Votre karma est d'apprendre l'indépendance d'esprit absolue tout en gardant un ancrage intérieur solide. Votre défi est de ne pas vous disperser au gré des influences extérieures.",
      pro: "Négociateur de talent, consultant indépendant ou voyageur d'affaires. Votre adaptabilité face aux changements soudains du marché fait de vous un atout stratégique majeur.",
      relational: "Vous avez besoin d'espace et de liberté pour respirer dans la relation. Un couple réussi pour vous implique le respect total de l'autonomie et des projets de chacun."
    },
    {
      name: 'Vishakha', ruler: 'Jupiter', deity: 'Indra & Agni (Pouvoir et Feu)', sym: 'Porte Triomphale',
      personal: "Vos forces subconscientes vous poussent vers des buts lointains avec une persévérance sans égale. Votre karma exige de surmonter la jalousie ou l'obsession du succès pour vous tourner vers une victoire partagée.",
      pro: "Excellent chef de projet, politicien, activiste ou chercheur de haut niveau. Rien ne vous arrête lorsque vous avez fixé votre objectif à long terme.",
      relational: "Passionné et très exigeant, vous recherchez un partenaire qui partage votre force d'esprit et s'investit pleinement dans des projets communs d'envergure."
    },
    {
      name: 'Anuradha', ruler: 'Saturne', deity: 'Mitra (Dieu de l\'Amitié)', sym: 'Fleur de Lotus',
      personal: "Le Lotus qui fleurit dans la boue. Votre subconscient possède une force d'amour et de dévotion capable de surmonter toutes les épreuves de la vie. Votre défi karmique est de vaincre la peur d'être abandonné.",
      pro: "Diplomate de talent, médiateur culturel ou chercheur universitaire. Vous excellez dans le maillage de réseaux humains à l'échelle internationale.",
      relational: "Romantique absolu, vous concevez le couple comme une alliance sacrée. Vous êtes prêt à traverser des tempêtes pour soutenir et garder près de vous l'être aimé."
    },
    {
      name: 'Jyeshtha', ruler: 'Mercure', deity: 'Indra (Roi des Dieux)', sym: 'Amulette protectrice',
      personal: "Votre subconscient abrite le pouvoir protecteur du souverain psychique. Karmiquement, vous êtes venu pour acquérir la sagesse de l'âge mûr et protéger les personnes vulnérables. Votre défi est de renoncer à l'autoritarisme mental.",
      pro: "Leader de crise, psychologue clinicien, expert en sécurité ou stratège politique. Votre calme glacial sous le stress rassure immédiatement vos collaborateurs.",
      relational: "Protecteur et passionné, vous aimez diriger la danse mais recherchez secrètement un alter ego intellectuel capable de vous tenir tête et de vous comprendre en profondeur."
    },
    {
      name: 'Mula', ruler: 'Ketu', deity: 'Nirriti (Déesse de la Dissolution)', sym: 'Bouquet de Racines liées',
      personal: "La demeure des origines et de la racine. Vos forces subconscientes vous poussent à détruire les structures obsolètes ou les illusions spirituelles pour trouver la vérité nue. Votre défi est de pacifier le besoin inconscient d'autodestruction.",
      pro: "Chercheur scientifique de pointe, psychanalyste des profondeurs, historien ou auditeur spécialisé dans le démantèlement de systèmes en faillite.",
      relational: "Entier et sans compromis, vous refusez les relations de façade. Vous cherchez un partenaire prêt à s'engager sur un chemin d'honnêteté et d'évolution spirituelle totale."
    },
    {
      name: 'Purva Ashadha', ruler: 'Vénus', deity: 'Apas (Déesse des Eaux)', sym: 'Van à vanner',
      personal: "Lié à l'élément de l'eau cosmique purificatrice. Votre subconscient porte une confiance inébranlable en votre destin de réussite. Le défi karmique est de ne pas vous complaire dans un excès d'orgueil ou d'optimisme naïf.",
      pro: "Vous brillez dans la communication, l'écriture poétique, l'écologie marine, la navigation ou les métiers du conseil où votre parole fluide guérit.",
      relational: "Sensible et idéaliste, vous cherchez un amour pur et fluide comme l'eau. Vous offrez un soutien émotionnel profond et attendez une réciprocité poétique."
    },
    {
      name: 'Uttara Ashadha', ruler: 'Soleil', deity: 'Les Vishvadevas (Dieux Universels)', sym: 'Défense d\'Éléphant',
      personal: "Une trame karmique bâtie sur la justice universelle et l'intégrité indiscutable. Vos forces subconscientes vous poussent vers le respect absolu de vos engagements éthiques. Votre défi est d'apprendre la flexibilité face à l'imprévu.",
      pro: "Excellent magistrat, dirigeant d'institutions publiques, chercheur éthique ou enseignant de haut niveau. Votre constance garantit le succès final à long terme.",
      relational: "Partenaire fiable par excellence, vous construisez la relation sur le socle solide de la confiance morale. Vous êtes peu démonstratif mais d'une loyauté indéfectible."
    },
    {
      name: 'Shravana', ruler: 'Lune', deity: 'Vishnu (Préservateur du Cosmos)', sym: 'Oreille ou Trois Empreintes de pas',
      personal: "Le pouvoir de l'écoute intérieure et du silence. Votre karma est d'apprendre la sagesse par l'observation attentive et la réceptivité fine. Vos forces subconscientes sont connectées à la transmission orale du savoir.",
      pro: "Excellent thérapeute, consultant en stratégie, traducteur, chercheur ou professeur. Votre don d'écoute active vous permet de dénouer des conflits insolubles.",
      relational: "Dans le couple, vous êtes l'oreille bienveillante et rassurante. Vous communiquez beaucoup par la présence physique silencieuse et recherchez une harmonie paisible sans drames."
    },
    {
      name: 'Dhanishta', ruler: 'Mars', deity: 'Les Vasus (Dieux de l\'Abondance)', sym: 'Tambour ou Flûte',
      personal: "Connecté aux rythmes de l'abondance universelle. Votre subconscient possède le timing intérieur nécessaire pour matérialiser la prospérité. Votre défi karmique est d'éviter le piège de la possessivité matérielle.",
      pro: "Musicien, chorégraphe, gestionnaire de portefeuilles financiers ou coordinateur logistique de grands projets. Vous savez synchroniser le mouvement et les ressources.",
      relational: "Chaleureux, généreux et extraverti, vous aimez gâter votre partenaire et partager une vie sociale active. Vous cherchez une relation rythmée par des projets joyeux."
    },
    {
      name: 'Shatabhisha', ruler: 'Rahu', deity: 'Varuna (Dieu des Eaux cosmiques)', sym: 'Cercle vide ou 100 Médecins',
      personal: "Le cercle mystique des cent guérisseurs. Vos forces subconscientes exigent des moments de solitude absolue et de repli méditatif pour régénérer votre énergie. Votre défi karmique est de dépasser le sentiment d'isolement social.",
      pro: "Chercheur en médecine, psychiatre, innovateur technologique ou astrophysicien. Vous préférez le travail autonome ou les laboratoires confidentiels.",
      relational: "Extrêmement pudique avec vos sentiments, vous ouvrez votre porte secrète très lentement. Vous recherchez un partenaire tolérant et respectueux de votre indépendance."
    },
    {
      name: 'Purva Bhadrapada', ruler: 'Jupiter', deity: 'Aja Ekapada (Serpent de Feu)', sym: 'Épée ou Homme à double visage',
      personal: "Votre subconscient est habité par un feu purificateur intense et une passion spirituelle ardente. Karmiquement, vous êtes venu pour vivre des métamorphoses intérieures radicales. Votre défi est d'éviter l'extrémisme moral.",
      pro: "Militant engagé, réformateur social, chercheur en sciences ésotériques ou écrivain d'investigation. Vous n'avez pas peur de défendre des causes impopulaires.",
      relational: "Entier et exclusif, vous vivez l'amour sous forme de quête spirituelle ou de combat partagé. Vous recherchez un partenaire qui vibre avec la même flamme intérieure."
    },
    {
      name: 'Uttara Bhadrapada', ruler: 'Saturne', deity: 'Ahirbudhnya (Serpent des Abysses)', sym: 'Jumeaux ou Pieds arrière d\'un lit',
      personal: "Le Serpent des profondeurs océaniques. Vos forces subconscientes vous dotent d'une stabilité mentale rare et d'une compassion innée. Votre karma est d'apprimer l'ancrage et la paix là où règnent l'anxiété et le désordre.",
      pro: "Enseignant spirituel, psychanalyste de fond, conseiller de gestion de patrimoine à long terme ou guérisseur spirituel. Votre seule présence calme les esprits.",
      relational: "Protecteur, calme et d'une infinie patience, vous êtes le roc sur lequel repose le couple. Vous offrez un amour stable et mûr, capable de guérir les blessures de votre partenaire."
    },
    {
      name: 'Revati', ruler: 'Mercure', deity: 'Pushan (Protecteur des Voyageurs)', sym: 'Poissons nageant dans l\'eau',
      personal: "Le dernier voyage, la dissolution harmonieuse de l'ego. Vos forces subconscientes baignent dans l'amour inconditionnel et la reliance cosmique. Votre défi karmique est d'apprendre à poser des limites pour ne pas vous laisser dévorer.",
      pro: "Conseiller d'orientation d'âmes, artiste thérapeutique, protecteur des sans-voix (animaux, nature) ou accompagnateur en fin de vie. Votre empathie est votre plus grand outil.",
      relational: "D'un romantisme absolu et d'un dévouement sans bornes, vous cherchez la communion spirituelle et artistique avec votre partenaire, offrant une tendresse d'une pureté rare."
    }
  ];

  function getNakshatraInfo(deg) {
    var rawIdx = deg / (360.0 / 27.0);
    var idx = Math.floor(rawIdx % 27);
    return NAKSHATRAS[idx];
  }

  function formatNakshatraDeg(deg) {
    var raw = deg % (360.0 / 27.0);
    var d = Math.floor(raw);
    var minFloat = (raw - d) * 60;
    var m = Math.floor(minFloat);
    return d + '° ' + (m < 10 ? '0' + m : m) + '\'';
  }

  function updatePersonalNakshatras(moonDeg, sunDeg, ascDeg) {
    var box = document.getElementById('atPersonalNakshatrasBox');
    if (!box) return;

    var moonNak = getNakshatraInfo(moonDeg);
    var sunNak = getNakshatraInfo(sunDeg);
    var ascNak = getNakshatraInfo(ascDeg);

    var html = '<h3 class="at-method-h3" style="color:var(--emerald); display:flex; align-items:center; gap:0.5rem; margin-top:0; font-size:1.1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">'
             + '🌙 Vos Demeures Lunaires &amp; Étoiles d\'Ancrage</h3>';

    html += '<p class="at-method-p" style="margin-top:0.8rem;">Les 27 Nakshatras révèlent la trame karmique et les forces subconscientes profondes de votre structure psychologique. Voici les demeures stellaires activées par vos points célestes majeurs :</p>';

    html += '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.2rem; margin-top:1.2rem; align-items:stretch;">';

    // 1. Lune (Janma Nakshatra)
    html += '<div style="background:rgba(255,255,255,0.02); border:1px solid rgba(61,211,153,0.15); padding:1.2rem; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1); border-left:4px solid var(--emerald); display:flex; flex-direction:column; justify-content:space-between;">'
          + '<div>'
          + '<h4 style="margin:0 0 0.5rem 0; font-size:0.95rem; color:var(--emerald); display:flex; align-items:center; justify-content:space-between; font-weight:600;">'
          + '<span>🌙 Lune : ' + moonNak.name + '</span>'
          + '<span style="font-size:0.75rem; color:var(--slate); font-family:var(--font-mono);">' + formatNakshatraDeg(moonDeg) + '</span>'
          + '</h4>'
          + '<p style="margin:0 0 0.8rem 0; font-size:0.82rem; color:var(--slate); font-family:var(--font-mono); border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.5rem;">'
          + '• Régent : <strong>' + moonNak.ruler + '</strong> | Divinité : <strong>' + moonNak.deity + '</strong><br>'
          + '• Symbole : <strong>' + moonNak.sym + '</strong>'
          + '</p>'
          + '<div style="display:flex; flex-direction:column; gap:0.8rem; font-size:0.83rem; line-height:1.55; color:#cbd5e1;">'
          + '  <div>'
          + '    <strong style="color:var(--emerald); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:0.2rem;">✦ Plan Personnel &amp; Karmique</strong>'
          + '    <span>' + moonNak.personal + '</span>'
          + '  </div>'
          + '  <div>'
          + '    <strong style="color:var(--gold); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:0.2rem;">✦ Plan Professionnel &amp; Créatif</strong>'
          + '    <span>' + moonNak.pro + '</span>'
          + '  </div>'
          + '  <div>'
          + '    <strong style="color:var(--violet); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:0.2rem;">✦ Plan Relationnel &amp; Amoureux</strong>'
          + '    <span>' + moonNak.relational + '</span>'
          + '  </div>'
          + '</div>'
          + '</div>'
          + '</div>';

    // 2. Soleil
    html += '<div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:1.2rem; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.1); border-left:4px solid var(--gold); display:flex; flex-direction:column; justify-content:space-between;">'
          + '<div>'
          + '<h4 style="margin:0 0 0.5rem 0; font-size:0.95rem; color:var(--gold); display:flex; align-items:center; justify-content:space-between; font-weight:600;">'
          + '<span>☀️ Soleil : ' + sunNak.name + '</span>'
          + '<span style="font-size:0.75rem; color:var(--slate); font-family:var(--font-mono);">' + formatNakshatraDeg(sunDeg) + '</span>'
          + '</h4>'
          + '<p style="margin:0 0 0.8rem 0; font-size:0.82rem; color:var(--slate); font-family:var(--font-mono); border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.5rem;">'
          + '• Régent : <strong>' + sunNak.ruler + '</strong> | Divinité : <strong>' + sunNak.deity + '</strong><br>'
          + '• Symbole : <strong>' + sunNak.sym + '</strong>'
          + '</p>'
          + '<div style="display:flex; flex-direction:column; gap:0.8rem; font-size:0.83rem; line-height:1.55; color:#cbd5e1;">'
          + '  <div>'
          + '    <strong style="color:var(--emerald); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:0.2rem;">✦ Plan Personnel &amp; Karmique</strong>'
          + '    <span>' + sunNak.personal + '</span>'
          + '  </div>'
          + '  <div>'
          + '    <strong style="color:var(--gold); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:0.2rem;">✦ Plan Professionnel &amp; Créatif</strong>'
          + '    <span>' + sunNak.pro + '</span>'
          + '  </div>'
          + '  <div>'
          + '    <strong style="color:var(--violet); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:0.2rem;">✦ Plan Relationnel &amp; Amoureux</strong>'
          + '    <span>' + sunNak.relational + '</span>'
          + '  </div>'
          + '</div>'
          + '</div>'
          + '</div>';

    // 3. Ascendant
    html += '<div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:1.2rem; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.1); border-left:4px solid var(--violet); display:flex; flex-direction:column; justify-content:space-between;">'
          + '<div>'
          + '<h4 style="margin:0 0 0.5rem 0; font-size:0.95rem; color:var(--violet); display:flex; align-items:center; justify-content:space-between; font-weight:600;">'
          + '<span>🌅 Ascendant : ' + ascNak.name + '</span>'
          + '<span style="font-size:0.75rem; color:var(--slate); font-family:var(--font-mono);">' + formatNakshatraDeg(ascDeg) + '</span>'
          + '</h4>'
          + '<p style="margin:0 0 0.8rem 0; font-size:0.82rem; color:var(--slate); font-family:var(--font-mono); border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.5rem;">'
          + '• Régent : <strong>' + ascNak.ruler + '</strong> | Divinité : <strong>' + ascNak.deity + '</strong><br>'
          + '• Symbole : <strong>' + ascNak.sym + '</strong>'
          + '</p>'
          + '<div style="display:flex; flex-direction:column; gap:0.8rem; font-size:0.83rem; line-height:1.55; color:#cbd5e1;">'
          + '  <div>'
          + '    <strong style="color:var(--emerald); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:0.2rem;">✦ Plan Personnel &amp; Karmique</strong>'
          + '    <span>' + ascNak.personal + '</span>'
          + '  </div>'
          + '  <div>'
          + '    <strong style="color:var(--gold); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:0.2rem;">✦ Plan Professionnel &amp; Créatif</strong>'
          + '    <span>' + ascNak.pro + '</span>'
          + '  </div>'
          + '  <div>'
          + '    <strong style="color:var(--violet); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:0.2rem;">✦ Plan Relationnel &amp; Amoureux</strong>'
          + '    <span>' + ascNak.relational + '</span>'
          + '  </div>'
          + '</div>'
          + '</div>'
          + '</div>';

    html += '</div>'; // Fin grid

    // Note sur Spica / Chitra Nakshatra
    html += '<p style="margin:1.2rem 0 0 0; font-size:0.82rem; color:var(--slate); line-height:1.6; border-top:1px solid rgba(255,255,255,0.06); padding-top:1rem;">'
          + '🎯 <strong>L\'Étoile Ancre (Spica) :</strong> Votre thème calcule la position exacte de vos astres par rapport à l\'étoile fixe <strong>Spica</strong>, marquant le début historique de l\'Ayanamsa de Lahiri à 180° (au sein de la demeure <em>Chitra</em>). Cet alignement mathématique assure que vos Nakshatras correspondent aux constellations physiques réelles observées dans le ciel.'
          + '</p>';

    box.innerHTML = html;
    box.style.display = 'block';
  }

  /* ─── Heure d'été / hiver (DST) ─── */
  function lastSundayOfMonth(year, month) {
    var d = new Date(year, month, 0);
    d.setDate(d.getDate() - d.getDay());
    return d.getDate();
  }

  function nthSundayOfMonth(year, month, n) {
    var d = new Date(year, month - 1, 1);
    var dow = d.getDay();
    var firstSun = (dow === 0) ? 1 : 8 - dow;
    return firstSun + (n - 1) * 7;
  }

  function getUTCOffset(year, month, day, tzRule, stdOffset) {
    if (tzRule === 'none') return stdOffset;
    if (tzRule === 'eu' || tzRule === 'uk') {
      if (tzRule === 'eu' && year < 1976) return stdOffset;
      var startDay = lastSundayOfMonth(year, 3);
      var endDay   = lastSundayOfMonth(year, 10);
      var inDST = (month > 3 && month < 10)
               || (month === 3 && day >= startDay)
               || (month === 10 && day < endDay);
      return inDST ? stdOffset + 1 : stdOffset;
    }
    if (tzRule === 'us') {
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

  /* ─── Algorithmes Astronomiques & Éléments Képlériens J2000 ─── */
  function solveKepler(M, e) {
    var rad = Math.PI / 180;
    var E = M + e * (180 / Math.PI) * Math.sin(M * rad) * (1.0 + e * Math.cos(M * rad));
    if (e < 0.06) {
      return E;
    }
    var E0 = E;
    for (var k = 0; k < 100; k++) {
      var E1 = E0 - (E0 - e * (180 / Math.PI) * Math.sin(E0 * rad) - M) / (1.0 - e * Math.cos(E0 * rad));
      if (Math.abs(E1 - E0) < 0.00005) {
        return E1;
      }
      E0 = E1;
    }
    return E0;
  }

  var PLANET_ELEMENTS = {
    Mercury: {
      N: function(d) { return 48.3313 + 3.24587e-5 * d; },
      i: function(d) { return 7.0047 + 5.00e-8 * d; },
      w: function(d) { return 29.1241 + 1.01444e-5 * d; },
      a: function(d) { return 0.387098; },
      e: function(d) { return 0.205635 + 5.59e-10 * d; },
      M: function(d) { return 168.6562 + 4.0923344368 * d; }
    },
    Venus: {
      N: function(d) { return 76.6799 + 2.46590e-5 * d; },
      i: function(d) { return 3.3946 + 2.75e-8 * d; },
      w: function(d) { return 54.8910 + 1.38374e-5 * d; },
      a: function(d) { return 0.723330; },
      e: function(d) { return 0.006773 - 1.302e-9 * d; },
      M: function(d) { return 48.0052 + 1.6021302244 * d; }
    },
    Mars: {
      N: function(d) { return 49.5574 + 2.11081e-5 * d; },
      i: function(d) { return 1.8497 - 1.78e-8 * d; },
      w: function(d) { return 286.5016 + 2.92961e-5 * d; },
      a: function(d) { return 1.523688; },
      e: function(d) { return 0.093405 + 2.516e-9 * d; },
      M: function(d) { return 18.6021 + 0.5240207766 * d; }
    },
    Jupiter: {
      N: function(d) { return 100.4542 + 2.76854e-5 * d; },
      i: function(d) { return 1.3030 - 1.557e-7 * d; },
      w: function(d) { return 273.8777 + 1.64505e-5 * d; },
      a: function(d) { return 5.20256; },
      e: function(d) { return 0.048498 + 4.469e-9 * d; },
      M: function(d) { return 19.8950 + 0.0830853001 * d; }
    },
    Saturn: {
      N: function(d) { return 113.6634 + 2.38980e-5 * d; },
      i: function(d) { return 2.4886 - 1.081e-7 * d; },
      w: function(d) { return 339.3939 + 2.97661e-5 * d; },
      a: function(d) { return 9.55475; },
      e: function(d) { return 0.055546 - 9.499e-9 * d; },
      M: function(d) { return 316.9670 + 0.0334442282 * d; }
    },
    Uranus: {
      N: function(d) { return 74.0005 + 1.3978e-5 * d; },
      i: function(d) { return 0.7733 + 1.9e-8 * d; },
      w: function(d) { return 96.6612 + 3.0565e-5 * d; },
      a: function(d) { return 19.18171 - 1.55e-8 * d; },
      e: function(d) { return 0.047318 + 7.45e-9 * d; },
      M: function(d) { return 142.5905 + 0.011725806 * d; }
    },
    Neptune: {
      N: function(d) { return 131.7806 + 3.0173e-5 * d; },
      i: function(d) { return 1.7700 - 2.55e-7 * d; },
      w: function(d) { return 272.8461 - 6.027e-6 * d; },
      a: function(d) { return 30.05826 + 3.313e-8 * d; },
      e: function(d) { return 0.008606 + 2.15e-9 * d; },
      M: function(d) { return 260.2471 + 0.005995147 * d; }
    }
  };

  function calculatePlanets(jdTime, ayanamsa) {
    var d = jdTime - 2451543.5;
    var rad = Math.PI / 180;
    
    // Position héliocentrique du Soleil (Terre)
    var Ms_sun = 356.0470 + 0.9856002585 * d;
    var e_sun = 0.016709 - 1.151e-9 * d;
    var w_sun = 282.9404 + 4.70935e-5 * d;
    Ms_sun = ((Ms_sun % 360) + 360) % 360;
    
    var E_sun = solveKepler(Ms_sun, e_sun);
    var xv_sun = Math.cos(E_sun * rad) - e_sun;
    var yv_sun = Math.sqrt(1.0 - e_sun * e_sun) * Math.sin(E_sun * rad);
    var v_sun = Math.atan2(yv_sun, xv_sun) * 180 / Math.PI;
    var r_sun = Math.sqrt(xv_sun * xv_sun + yv_sun * yv_sun);
    var lonsun = (v_sun + w_sun + 360) % 360;
    
    var xs = r_sun * Math.cos(lonsun * rad);
    var ys = r_sun * Math.sin(lonsun * rad);
    
    var results = {};
    results['Soleil'] = (lonsun - ayanamsa + 360) % 360;
    
    // Calcul de la Lune
    var N_moon = 125.1228 - 0.0529538083 * d;
    var i_moon = 5.1454;
    var w_moon = 318.0634 + 0.1643573223 * d;
    var a_moon = 60.2666;
    var e_moon = 0.054900;
    var M_moon = 115.3654 + 13.0649929509 * d;
    M_moon = ((M_moon % 360) + 360) % 360;
    
    var E_moon = solveKepler(M_moon, e_moon);
    var xv_moon = a_moon * (Math.cos(E_moon * rad) - e_moon);
    var yv_moon = a_moon * (Math.sqrt(1.0 - e_moon * e_moon) * Math.sin(E_moon * rad));
    var v_moon = Math.atan2(yv_moon, xv_moon) * 180 / Math.PI;
    var r_moon = Math.sqrt(xv_moon * xv_moon + yv_moon * yv_moon);
    
    var N_moon_rad = N_moon * rad;
    var vw_moon_rad = (v_moon + w_moon) * rad;
    var i_moon_rad = i_moon * rad;
    
    var xh_moon = r_moon * (Math.cos(N_moon_rad) * Math.cos(vw_moon_rad) - Math.sin(N_moon_rad) * Math.sin(vw_moon_rad) * Math.cos(i_moon_rad));
    var yh_moon = r_moon * (Math.sin(N_moon_rad) * Math.cos(vw_moon_rad) + Math.cos(N_moon_rad) * Math.sin(vw_moon_rad) * Math.cos(i_moon_rad));
    var zh_moon = r_moon * (Math.sin(vw_moon_rad) * Math.sin(i_moon_rad));
    
    var lonecl_moon = Math.atan2(yh_moon, xh_moon) * 180 / Math.PI;
    var latecl_moon = Math.atan2(zh_moon, Math.sqrt(xh_moon * xh_moon + yh_moon * yh_moon)) * 180 / Math.PI;
    
    // Perturbations de la Lune
    var Mm_rad = M_moon * rad;
    var Ls = Ms_sun + w_sun;
    var Lm = M_moon + w_moon + N_moon;
    var D_elong = Lm - Ls;
    var F_lat = Lm - N_moon;
    
    var D_rad = D_elong * rad;
    var F_rad = F_lat * rad;
    var Ms_rad = Ms_sun * rad;
    
    var moonPertLon = -1.274 * Math.sin(Mm_rad - 2 * D_rad)
                    + 0.658 * Math.sin(2 * D_rad)
                    - 0.186 * Math.sin(Ms_rad)
                    - 0.059 * Math.sin(2 * Mm_rad - 2 * D_rad)
                    - 0.057 * Math.sin(Mm_rad - 2 * D_rad + Ms_rad)
                    + 0.053 * Math.sin(Mm_rad + 2 * D_rad)
                    + 0.046 * Math.sin(2 * D_rad - Ms_rad)
                    + 0.041 * Math.sin(Mm_rad - Ms_rad)
                    - 0.035 * Math.sin(D_rad)
                    - 0.031 * Math.sin(Mm_rad + Ms_rad)
                    - 0.015 * Math.sin(2 * F_rad - 2 * D_rad)
                    + 0.011 * Math.sin(Mm_rad - 4 * D_rad);
                    
    lonecl_moon += moonPertLon;
    results['Lune'] = ((lonecl_moon - ayanamsa) % 360 + 360) % 360;
    
    // Planètes Majeures
    var planetNames = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
    var frNames = {
      'Mercury': 'Mercure', 'Venus': 'Vénus', 'Mars': 'Mars', 
      'Jupiter': 'Jupiter', 'Saturn': 'Saturne', 'Uranus': 'Uranus', 'Neptune': 'Neptune'
    };
    
    for (var k = 0; k < planetNames.length; k++) {
      var pName = planetNames[k];
      var pEl = PLANET_ELEMENTS[pName];
      
      var N = pEl.N(d);
      var i = pEl.i(d);
      var w = pEl.w(d);
      var a = pEl.a(d);
      var e = pEl.e(d);
      var M = pEl.M(d);
      M = ((M % 360) + 360) % 360;
      
      var E = solveKepler(M, e);
      var xv = a * (Math.cos(E * rad) - e);
      var yv = a * (Math.sqrt(1.0 - e * e) * Math.sin(E * rad));
      var v = Math.atan2(yv, xv) * 180 / Math.PI;
      var r = Math.sqrt(xv * xv + yv * yv);
      
      var N_rad = N * rad;
      var vw_rad = (v + w) * rad;
      var i_rad = i * rad;
      
      var xh = r * (Math.cos(N_rad) * Math.cos(vw_rad) - Math.sin(N_rad) * Math.sin(vw_rad) * Math.cos(i_rad));
      var yh = r * (Math.sin(N_rad) * Math.cos(vw_rad) + Math.cos(N_rad) * Math.sin(vw_rad) * Math.cos(i_rad));
      var zh = r * (Math.sin(vw_rad) * Math.sin(i_rad));
      
      var lonecl = Math.atan2(yh, xh) * 180 / Math.PI;
      var latecl = Math.atan2(zh, Math.sqrt(xh * xh + yh * yh)) * 180 / Math.PI;
      lonecl = (lonecl + 360) % 360;
      
      // Perturbations
      if (pName === 'Jupiter') {
        var Mj_rad = M * rad;
        var Ms_rad = ((316.9670 + 0.0334442282 * d) % 360) * rad;
        var jupPert = -0.332 * Math.sin(2 * Mj_rad - 5 * Ms_rad - 67.6 * rad)
                    - 0.056 * Math.sin(2 * Mj_rad - 2 * Ms_rad + 21.0 * rad)
                    + 0.042 * Math.sin(3 * Mj_rad - 5 * Ms_rad + 21.0 * rad)
                    - 0.036 * Math.sin(Mj_rad - 2 * Ms_rad)
                    + 0.022 * Math.cos(Mj_rad - Ms_rad)
                    + 0.023 * Math.sin(2 * Mj_rad - 3 * Ms_rad + 52.0 * rad)
                    - 0.016 * Math.sin(Mj_rad - 5 * Ms_rad - 69.0 * rad);
        lonecl += jupPert;
      } else if (pName === 'Saturn') {
        var Mj_rad = ((19.8950 + 0.0830853001 * d) % 360) * rad;
        var Ms_rad = M * rad;
        var satPertLon = +0.812 * Math.sin(2 * Mj_rad - 5 * Ms_rad - 67.6 * rad)
                       - 0.229 * Math.cos(2 * Mj_rad - 4 * Ms_rad - 2.0 * rad)
                       + 0.119 * Math.sin(Mj_rad - 2 * Ms_rad - 3.0 * rad)
                       + 0.046 * Math.sin(2 * Mj_rad - 6 * Ms_rad - 69.0 * rad)
                       + 0.014 * Math.sin(Mj_rad - 3 * Ms_rad + 32.0 * rad);
        lonecl += satPertLon;
        var satPertLat = -0.020 * Math.cos(2 * Mj_rad - 4 * Ms_rad - 2.0 * rad)
                       + 0.018 * Math.sin(2 * Mj_rad - 6 * Ms_rad - 49.0 * rad);
        latecl += satPertLat;
      } else if (pName === 'Uranus') {
        var Mj_rad = ((19.8950 + 0.0830853001 * d) % 360) * rad;
        var Ms_rad = ((316.9670 + 0.0334442282 * d) % 360) * rad;
        var Mu_rad = M * rad;
        var uraPert = +0.040 * Math.sin(Ms_rad - 2 * Mu_rad + 6.0 * rad)
                    + 0.035 * Math.sin(Ms_rad - 3 * Mu_rad + 33.0 * rad)
                    - 0.015 * Math.sin(Mj_rad - Mu_rad + 20.0 * rad);
        lonecl += uraPert;
      }
      
      var lonecl_rad = lonecl * rad;
      var latecl_rad = latecl * rad;
      
      xh = r * Math.cos(lonecl_rad) * Math.cos(latecl_rad);
      yh = r * Math.sin(lonecl_rad) * Math.cos(latecl_rad);
      zh = r * Math.sin(latecl_rad);
      
      var xg = xh + xs;
      var yg = yh + ys;
      var zg = zh;
      
      var lon_geo = Math.atan2(yg, xg) * 180 / Math.PI;
      results[frNames[pName]] = ((lon_geo - ayanamsa) % 360 + 360) % 360;
    }
    
    // Calcul de Pluton
    var S = 50.03 + 0.033459652 * d;
    var P = 238.95 + 0.003968789 * d;
    var S_rad = S * rad;
    var P_rad = P * rad;
    
    var lonecl_pluto = 238.9508 + 0.00400703 * d 
                     - 19.799 * Math.sin(P_rad) 
                     + 19.848 * Math.cos(P_rad) 
                     + 0.897 * Math.sin(2 * P_rad) 
                     - 4.956 * Math.cos(2 * P_rad) 
                     + 0.610 * Math.sin(3 * P_rad) 
                     + 1.211 * Math.cos(3 * P_rad) 
                     - 0.341 * Math.sin(4 * P_rad) 
                     - 0.190 * Math.cos(4 * P_rad) 
                     + 0.128 * Math.sin(5 * P_rad) 
                     - 0.034 * Math.cos(5 * P_rad) 
                     - 0.038 * Math.sin(6 * P_rad) 
                     + 0.031 * Math.cos(6 * P_rad) 
                     + 0.020 * Math.sin(S_rad - P_rad) 
                     - 0.010 * Math.cos(S_rad - P_rad);
                     
    var latecl_pluto = -3.9082 
                     - 5.453 * Math.sin(P_rad) 
                     - 14.975 * Math.cos(P_rad) 
                     + 3.527 * Math.sin(2 * P_rad) 
                     + 1.673 * Math.cos(2 * P_rad) 
                     - 1.051 * Math.sin(3 * P_rad) 
                     + 0.328 * Math.cos(3 * P_rad) 
                     + 0.179 * Math.sin(4 * P_rad) 
                     - 0.292 * Math.cos(4 * P_rad) 
                     + 0.019 * Math.sin(5 * P_rad) 
                     + 0.100 * Math.cos(5 * P_rad) 
                     - 0.031 * Math.sin(6 * P_rad) 
                     - 0.026 * Math.cos(6 * P_rad) 
                     + 0.011 * Math.cos(S_rad - P_rad);
                     
    var r_pluto = 40.72 
                + 6.68 * Math.sin(P_rad) 
                + 6.90 * Math.cos(P_rad) 
                - 1.18 * Math.sin(2 * P_rad) 
                - 0.03 * Math.cos(2 * P_rad) 
                + 0.15 * Math.sin(3 * P_rad) 
                - 0.14 * Math.cos(3 * P_rad);
                
    var lonecl_pluto_rad = lonecl_pluto * rad;
    var latecl_pluto_rad = latecl_pluto * rad;
    
    var xh_pluto = r_pluto * Math.cos(lonecl_pluto_rad) * Math.cos(latecl_pluto_rad);
    var yh_pluto = r_pluto * Math.sin(lonecl_pluto_rad) * Math.cos(latecl_pluto_rad);
    var zh_pluto = r_pluto * Math.sin(latecl_pluto_rad);
    
    var xg_pluto = xh_pluto + xs;
    var yg_pluto = yh_pluto + ys;
    var zg_pluto = zh_pluto;
    
    var lon_geo_pluto = Math.atan2(yg_pluto, xg_pluto) * 180 / Math.PI;
    results['Pluton'] = ((lon_geo_pluto - ayanamsa) % 360 + 360) % 360;
    
    return results;
  }

  /* ─── Calcul de l'ascendant (UTC corrigé) ─── */
  function calcAscendantDeg(year, month, day, localHour, localMinute, lat, lon, utcOffset) {
    var utc = localHour + localMinute / 60.0 - utcOffset;
    utc = ((utc % 24) + 24) % 24;

    var a = Math.floor((14 - month) / 12);
    var y = year + 4800 - a;
    var m = month + 12 * a - 3;
    var JD = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4)
             - Math.floor(y / 100) + Math.floor(y / 400) - 32045 - 0.5;
    var T = (JD - 2451545.0) / 36525.0;

    var theta0 = 280.46061837 + 360.98564736629 * (JD - 2451545.0)
                 + 0.000387933 * T * T - T * T * T / 38710000;
    theta0 = ((theta0 % 360) + 360) % 360;

    var LST = theta0 + utc * 15.04106864 + lon;
    LST = ((LST % 360) + 360) % 360;

    var RAMC = LST * Math.PI / 180;
    var eps  = (23.4397 - 0.0130 * T) * Math.PI / 180;
    var phi  = lat * Math.PI / 180;
    var ascRad = Math.atan2(
      Math.cos(RAMC),
      -Math.sin(RAMC) * Math.cos(eps) - Math.tan(phi) * Math.sin(eps)
    );
    return ((ascRad * 180 / Math.PI) % 360 + 360) % 360;
  }

  function getSunLongitude(jd) {
    var D = jd - 2451545.0;
    var g = 357.529 + 0.98560028 * D;
    var q = 280.459 + 0.98564736 * D;
    var rad = Math.PI / 180;
    var L = q + 1.915 * Math.sin(g * rad) + 0.020 * Math.sin(2 * g * rad);
    return ((L % 360) + 360) % 360;
  }

  function calculateLahiriAyanamsa(jd) {
    var T = (jd - 2415020.3) / 36525.0;
    return 22.446867 + 1.39604167 * T + 0.00030833 * T * T;
  }

  function getDecanInfo(signIdx, deg) {
    var d = Math.floor(((deg % 30) + 30) % 30 / 10);
    return DECANS[signIdx * 3 + d];
  }

  /* ─── Parseur d'interprétations tripartite existantes ─── */
  function parseTripartiteInterp(htmlText) {
    var parts = htmlText.split('<br><br>');
    var general = parts[0] || '';
    var personal = '';
    var pro = '';
    var relational = '';
    
    for (var i = 1; i < parts.length; i++) {
      var p = parts[i];
      if (p.indexOf('🌱') !== -1 || p.indexOf('Personnel') !== -1) {
        personal = p.replace(/<strong>🌱.*?<\/strong>/, '').trim();
      } else if (p.indexOf('💼') !== -1 || p.indexOf('Professionnel') !== -1) {
        pro = p.replace(/<strong>💼.*?<\/strong>/, '').trim();
      } else if (p.indexOf('💖') !== -1 || p.indexOf('Relationnel') !== -1) {
        relational = p.replace(/<strong>💖.*?<\/strong>/, '').trim();
      }
    }
    
    return {
      general: general,
      personal: personal || general,
      pro: pro || general,
      relational: relational || general
    };
  }

  /* ─── Générateur d'interprétation pour les planètes externes ─── */
  function getOuterPlanetText(planetName, sign) {
    var p = PLANET_INFOS[planetName];
    var s = sign;
    var name = p.name;
    var signName = s.name;
    var el = s.el;
    var ruler = s.ruler;
    
    var personal = "", pro = "", relational = "";
    
    if (planetName === 'Jupiter') {
      personal = "Jupiter en " + signName + " (signe de " + el + " gouverné par " + ruler + ") indique que votre expansion spirituelle et philosophique passe par les qualités de : " + s.kw.toLowerCase() + ". Vous trouvez votre chance et votre optimisme en développant ces traits.";
      pro = "Sur le plan professionnel, cette configuration vous pousse à élargir vos compétences et à guider les autres par votre sagesse. Vous attirez la réussite en agissant de façon constructive dans les projets collectifs.";
      relational = "Dans vos relations, vous êtes un guide bienveillant et généreux, partageant votre foi en l'avenir et stimulant la croissance spirituelle de votre partenaire.";
    } else if (planetName === 'Saturne') {
      personal = "Saturne en " + signName + " vous invite à structurer et à discipliner votre vie à travers les qualités de : " + s.kw.toLowerCase() + ". C'est le lieu de vos leçons de vie les plus précieuses, exigeant de la patience et de la rigueur.";
      pro = "Au travail, cette position vous confère une endurance remarquable et un sens élevé du devoir. Vous bâtissez des projets durables et assumez des responsabilités avec une intégrité absolue.";
      relational = "Sur le plan sentimental, vous recherchez l'engagement sérieux et la clarté. Vous prouvez votre attachement par votre constance et votre protection indéfectible face aux épreuves.";
    } else if (planetName === 'Uranus') {
      personal = "Uranus en " + signName + " éveille votre conscience et libère votre originalité à travers les vibrations de : " + s.kw.toLowerCase() + ". Vous ressentez le besoin de bousculer les conventions établies pour exprimer votre liberté.";
      pro = "Professionnellement, vous apportez un vent d'innovation et des idées d'avant-garde. Vous brillez dans la résolution originale de problèmes et la collaboration sur des projets de progrès.";
      relational = "Dans le couple, vous fuyez la routine et l'étouffement. Vous recherchez une complicité fraternelle basée sur le respect de l'originalité et de l'espace de liberté de chacun.";
    } else if (planetName === 'Neptune') {
      personal = "Neptune en " + signName + " amplifie votre intuition mystique et votre compassion à travers les énergies de : " + s.kw.toLowerCase() + ". Vous êtes réceptif à l'invisible et recherchez la fusion spirituelle.";
      pro = "Au travail, vous fonctionnez à l'inspiration et excellez dans les projets créatifs, artistiques ou d'aide thérapeutique directe pour soulager les autres.";
      relational = "Dans vos relations, vous aimez de manière inconditionnelle et romantique. Votre défi consiste à garder les pieds sur terre et à ne pas idéaliser outre mesure votre partenaire.";
    } else if (planetName === 'Pluton') {
      personal = "Pluton en " + signName + " est le moteur de vos transformations profondes et de votre régénération à travers les qualités de : " + s.kw.toLowerCase() + ". Vous possédez une force psychique exceptionnelle pour renaître de vos cendres.";
      pro = "Dans votre vie active, vous agissez avec stratégie et ténacité pour transmuter les situations complexes et redonner de la puissance aux structures en déclin.";
      relational = "Sur le plan affectif, vous recherchez l'authenticité absolue et la vérité d'âme à âme, vivant vos attachements avec une intensité rare et transformatrice.";
    }
    
    return {
      personal: personal,
      pro: pro,
      relational: relational
    };
  }

  /* ─── Moteur d'Aspects Astrologiques ─── */
  function findAspects(positions, ascDeg) {
    var allPositions = {};
    for (var k in positions) {
      allPositions[k] = positions[k];
    }
    allPositions['Ascendant'] = ascDeg;
    
    var list = [];
    var keys = ['Soleil', 'Lune', 'Mercure', 'Vénus', 'Mars', 'Jupiter', 'Saturne', 'Uranus', 'Neptune', 'Pluton', 'Ascendant'];
    
    for (var i = 0; i < keys.length; i++) {
      for (var j = i + 1; j < keys.length; j++) {
        var p1 = keys[i];
        var p2 = keys[j];
        
        var lon1 = allPositions[p1];
        var lon2 = allPositions[p2];
        
        var diff = Math.abs(lon1 - lon2);
        var dist = Math.min(diff, 360 - diff);
        
        var aspect = null;
        var orb = 0;
        
        if (Math.abs(dist - 0) <= 8.0) {
          aspect = 'Conjonction';
          orb = Math.abs(dist - 0);
        } else if (Math.abs(dist - 60) <= 6.0) {
          aspect = 'Sextile';
          orb = Math.abs(dist - 60);
        } else if (Math.abs(dist - 90) <= 8.0) {
          aspect = 'Carré';
          orb = Math.abs(dist - 90);
        } else if (Math.abs(dist - 120) <= 8.0) {
          aspect = 'Trigone';
          orb = Math.abs(dist - 120);
        } else if (Math.abs(dist - 180) <= 8.0) {
          aspect = 'Opposition';
          orb = Math.abs(dist - 180);
        }
        
        if (aspect) {
          list.push({ p1: p1, p2: p2, type: aspect, orb: orb });
        }
      }
    }
    
    list.sort(function(a, b) { return a.orb - b.orb; });
    return list;
  }

  function getAspectInterpretation(p1, p2, type, orb) {
    var p1Name = p1 === 'Ascendant' ? 'Ascendant' : PLANET_INFOS[p1].name;
    var p2Name = p2 === 'Ascendant' ? 'Ascendant' : PLANET_INFOS[p2].name;
    
    var p1Role = p1 === 'Ascendant' ? 'la personnalité perçue' : PLANET_INFOS[p1].role.toLowerCase();
    var p2Role = p2 === 'Ascendant' ? 'la personnalité perçue' : PLANET_INFOS[p2].role.toLowerCase();
    
    var typeName = "";
    var typeSym = "";
    var typeDesc = "";
    
    if (type === 'Conjonction') { typeName = "Conjonction"; typeSym = "☌"; typeDesc = "L'union étroite des forces."; }
    if (type === 'Sextile')     { typeName = "Sextile";     typeSym = "⚹"; typeDesc = "Une harmonie dynamique et stimulante."; }
    if (type === 'Carré')       { typeName = "Carré";       typeSym = "□"; typeDesc = "Une tension créatrice et évolutive."; }
    if (type === 'Trigone')     { typeName = "Trigone";     typeSym = "△"; typeDesc = "Une alliance fluide et naturelle."; }
    if (type === 'Opposition')  { typeName = "Opposition";  typeSym = "☍"; typeDesc = "Un miroir de conscience et d'équilibre."; }
    
    var personal = "", pro = "", relational = "";
    
    if (type === 'Conjonction') {
      personal = "La conjonction entre " + p1Name + " et " + p2Name + " fusionne étroitement leurs énergies. Votre identité combine " + p1Role + " et " + p2Role + " en une seule force d'affirmation unique et puissante.";
      pro = "Professionnellement, cet aspect indique une concentration exceptionnelle de vos forces. Vous agissez avec une vision unifiée, canalisant votre énergie vers des buts clairs.";
      relational = "Dans vos relations, vous manifestez un comportement entier et charismatique. Vous recherchez un partenaire capable de comprendre cette union intense de vos énergies.";
    } else if (type === 'Sextile') {
      personal = "Le sextile entre " + p1Name + " et " + p2Name + " offre une relation fluide et constructive. Vos facultés de " + p1Role + " s'allient à " + p2Role + " pour créer des opportunités d'épanouissement personnel.";
      pro = "Au travail, cet aspect indique des talents que vous pouvez facilement développer. Vous apprenez vite et savez associer logique et intuition pour réussir.";
      relational = "Relationnellement, vous communiquez avec tact et bienveillance. Cet aspect favorise des amitiés solides et des partenariats amoureux équilibrés.";
    } else if (type === 'Carré') {
      personal = "Le carré entre " + p1Name + " et " + p2Name + " génère un défi intérieur stimulant. La tension entre " + p1Role + " et " + p2Role + " vous pousse à l'action et à surmonter les blocages psychologiques.";
      pro = "Sur le plan professionnel, cet aspect est un puissant moteur d'ambition. Bien que des obstacles initiaux puissent surgir, ils vous forcent à vous dépasser et à acquérir une grande maîtrise.";
      relational = "Dans le couple, ce carré demande de la patience pour surmonter des divergences de désirs. Il invite à un ajustement conscient des comportements.";
    } else if (type === 'Trigone') {
      personal = "Le trigone entre " + p1Name + " et " + p2Name + " représente un accord parfait et inné de vos énergies. Votre façon d'exprimer " + p1Role + " soutient naturellement votre " + p2Role + " sans effort.";
      pro = "Au travail, c'est un gage de facilité et de créativité fluide. Vous brillez par vos dons naturels et attirez facilement le succès dans vos initiatives.";
      relational = "Sur le plan sentimental, cet aspect apporte beaucoup de douceur, de complicité instinctive et de paix. Vos sentiments s'écoulent avec fluidité.";
    } else if (type === 'Opposition') {
      personal = "L'opposition entre " + p1Name + " et " + p2Name + " crée une tension de face-à-face. Vous oscillez parfois entre " + p1Role + " et " + p2Role + ", recherchant un point de synthèse et d'équilibre intérieur.";
      pro = "Professionnellement, cet aspect demande de savoir concilier deux approches différentes. C'est excellent pour les fonctions de négociation ou de gestion des contraires.";
      relational = "Dans la sphère intime, le partenaire sert souvent de miroir de projection pour vos propres forces inconscientes. L'apprentissage consiste à intégrer les deux facettes.";
    }
    
    return {
      p1Name: p1Name,
      p2Name: p2Name,
      personal: personal,
      pro: pro,
      relational: relational,
      typeName: typeName,
      typeSym: typeSym,
      orb: orb.toFixed(1)
    };
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

    // Gestion du pliage/dépliage des détails (liaisons statiques)
    var planetsBtn = document.getElementById('atTogglePlanetsBtn');
    var planetsDetails = document.getElementById('atPlanetsDetails');
    if (planetsBtn && planetsDetails) {
      planetsBtn.addEventListener('click', function() {
        var isHidden = planetsDetails.style.display === 'none';
        planetsDetails.style.display = isHidden ? 'block' : 'none';
        planetsBtn.classList.toggle('active', isHidden);
        var label = planetsBtn.querySelector('span:first-child');
        var icon = planetsBtn.querySelector('.at-toggle-icon');
        if (label) label.textContent = isHidden ? "Masquer le détail des positions planétaires" : "Développer le détail des positions planétaires";
        if (icon) icon.textContent = isHidden ? "▲" : "▼";
      });
    }

    var aspectsBtn = document.getElementById('atToggleAspectsBtn');
    var aspectsDetails = document.getElementById('atAspectsDetails');
    if (aspectsBtn && aspectsDetails) {
      aspectsBtn.addEventListener('click', function() {
        var isHidden = aspectsDetails.style.display === 'none';
        aspectsDetails.style.display = isHidden ? 'block' : 'none';
        aspectsBtn.classList.toggle('active', isHidden);
        var label = aspectsBtn.querySelector('span:first-child');
        var icon = aspectsBtn.querySelector('.at-toggle-icon');
        if (label) label.textContent = isHidden ? "Masquer le détail des aspects astrologiques" : "Développer le détail des aspects astrologiques";
        if (icon) icon.textContent = isHidden ? "▲" : "▼";
      });
    }

    // Ajouter le gestionnaire de clic sur les onglets dynamiques
    var resultsBlock = document.getElementById('atResultats');
    if (resultsBlock) {
      resultsBlock.addEventListener('click', function (e) {
        var tabBtn = e.target.closest('.at-tab-btn');
        if (tabBtn) {
          var card = tabBtn.closest('.at-planet-card, .at-aspect-card');
          if (card) {
            var tabName = tabBtn.dataset.tab;
            var btns = card.querySelectorAll('.at-tab-btn');
            var contents = card.querySelectorAll('.at-tab-content');
            
            for (var i = 0; i < btns.length; i++) {
              btns[i].classList.remove('active');
            }
            for (var i = 0; i < contents.length; i++) {
              contents[i].classList.remove('active');
            }
            
            tabBtn.classList.add('active');
            var targetContent = card.querySelector('.at-tab-content[data-tab="' + tabName + '"]');
            if (targetContent) {
              targetContent.classList.add('active');
            }
          }
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

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

      /* Calcul du jour julien exact */
      var a_aux = Math.floor((14 - mo) / 12);
      var y_aux = a + 4800 - a_aux;
      var m_aux = mo + 12 * a_aux - 3;
      var JD = j + Math.floor((153 * m_aux + 2) / 5) + 365 * y_aux + Math.floor(y_aux / 4)
               - Math.floor(y_aux / 100) + Math.floor(y_aux / 400) - 32045 - 0.5;
      
      var jdTime = JD + (h + mi / 60.0 - utcOffset) / 24.0;
      var ayanamsa = calculateLahiriAyanamsa(jdTime);

      /* Calculs Planétaires Complets */
      var planetLons = calculatePlanets(jdTime, ayanamsa);
      
      // Soleil
      var tropicalSunDeg = getSunLongitude(jdTime);
      var siderealSunDeg = planetLons['Soleil'];
      var soleilIdx = Math.floor(siderealSunDeg / 30);
      var soleil = SIGNS[soleilIdx];

      // Ascendant
      var tropicalAscDeg = calcAscendantDeg(a, mo, j, h, mi, lat, lon, utcOffset);
      var siderealAscDeg = (tropicalAscDeg - ayanamsa + 360) % 360;
      var ascIdx = Math.floor(siderealAscDeg / 30);
      var ascSign = SIGNS[ascIdx];

      var ayanamsaStr = formatAyanamsa(ayanamsa);
      var tropSunStr = (((tropicalSunDeg % 30) + 30) % 30).toFixed(1) + '° ' + SIGNS[Math.floor(tropicalSunDeg / 30)].name;
      var tropAscStr = (((tropicalAscDeg % 30) + 30) % 30).toFixed(1) + '° ' + SIGNS[Math.floor(tropicalAscDeg / 30)].name;

      // 1. Cartes Majeures (Soleil & Ascendant)
      document.getElementById('atSoleilCard').innerHTML    = renderCard(soleil, null, ayanamsaStr, tropSunStr);
      document.getElementById('atAscendantCard').innerHTML = renderAscCard(ascSign, siderealAscDeg, ayanamsaStr, tropAscStr);
      document.getElementById('atComboBlock').innerHTML    = getCombinedReading(soleil, ascSign);

      // 2. Personal Ayanamsa explanation in Section 2
      updatePersonalAyanamsa(j, mo, a, ayanamsaStr, tropicalSunDeg, siderealSunDeg, tropicalAscDeg, siderealAscDeg);

      // 3. Personal Nakshatras explanation in Section 4
      updatePersonalNakshatras(planetLons['Lune'], siderealSunDeg, siderealAscDeg);

      // Reset des états pliés/dépliés
      if (planetsDetails) planetsDetails.style.display = 'none';
      if (planetsBtn) {
        planetsBtn.classList.remove('active');
        var pLabel = planetsBtn.querySelector('span:first-child');
        var pIcon = planetsBtn.querySelector('.at-toggle-icon');
        if (pLabel) pLabel.textContent = "Développer le détail des positions planétaires";
        if (pIcon) pIcon.textContent = "▼";
      }

      if (aspectsDetails) aspectsDetails.style.display = 'none';
      if (aspectsBtn) {
        aspectsBtn.classList.remove('active');
        var aLabel = aspectsBtn.querySelector('span:first-child');
        var aIcon = aspectsBtn.querySelector('.at-toggle-icon');
        if (aLabel) aLabel.textContent = "Développer le détail des aspects astrologiques";
        if (aIcon) aIcon.textContent = "▼";
      }

      // 2. Tableau de Synthèse Stellaire (repositionné à la fin)
      var summaryRows = '';
      var planetsOrder = ['Soleil', 'Lune', 'Mercure', 'Vénus', 'Mars', 'Jupiter', 'Saturne', 'Uranus', 'Neptune', 'Pluton'];
      
      // Ajouter l'Ascendant dans le tableau
      summaryRows += '<tr>'
        + '<td><strong>↑ Ascendant</strong></td>'
        + '<td>' + formatLonToSign(siderealAscDeg) + '</td>'
        + '<td>' + ascSign.sym + ' ' + ascSign.name + '</td>'
        + '<td>Décan ' + (Math.floor(((siderealAscDeg % 30) + 30) % 30 / 10) + 1) + ' (' + getDecanInfo(ascIdx, siderealAscDeg).r + ')</td>'
        + '</tr>';

      for (var k = 0; k < planetsOrder.length; k++) {
        var pName = planetsOrder[k];
        var pLon = planetLons[pName];
        var pIdx = Math.floor(pLon / 30);
        var pSign = SIGNS[pIdx];
        var pDecan = getDecanInfo(pIdx, pLon);
        var pInfo = PLANET_INFOS[pName];
        
        summaryRows += '<tr>'
          + '<td>' + pInfo.sym + ' <strong>' + pInfo.name + '</strong></td>'
          + '<td>' + formatLonToSign(pLon) + '</td>'
          + '<td>' + pSign.sym + ' ' + pSign.name + '</td>'
          + '<td>Décan ' + (Math.floor(((pLon % 30) + 30) % 30 / 10) + 1) + ' (' + pDecan.r + ')</td>'
          + '</tr>';
      }

      document.getElementById('atSummaryTableBlock').innerHTML = 
        '<div class="at-summary-table-wrap">'
        + '<table class="at-summary-table">'
        + '<thead>'
        + '<tr>'
        + '<th>Corps Céleste</th>'
        + '<th>Position Sidérale</th>'
        + '<th>Signe Constellaire</th>'
        + '<th>Régent de Décan</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody>' + summaryRows + '</tbody>'
        + '</table>'
        + '</div>';

      // 3. Synthèse et Interprétation des Énergies Planétaires Sidérales (Néophyte)
      var elementPoints = { 'Feu': 0, 'Terre': 0, 'Air': 0, 'Eau': 0 };
      var modePoints = { 'Cardinal': 0, 'Fixe': 0, 'Mutable': 0 };

      function addPoints(deg, weight) {
        var idx = Math.floor(((deg % 360) + 360) % 360 / 30);
        var sign = SIGNS[idx];
        if (sign) {
          elementPoints[sign.el] += weight;
          modePoints[sign.mod] += weight;
        }
      }

      addPoints(siderealSunDeg, 3);
      addPoints(planetLons['Lune'], 3);
      addPoints(siderealAscDeg, 3);
      
      var extraPlanets = ['Mercure', 'Vénus', 'Mars', 'Jupiter', 'Saturne', 'Uranus', 'Neptune', 'Pluton'];
      for (var o = 0; o < extraPlanets.length; o++) {
        addPoints(planetLons[extraPlanets[o]], 1);
      }

      var totalPoints = 17;
      var firePct = Math.round((elementPoints['Feu'] / totalPoints) * 100);
      var earthPct = Math.round((elementPoints['Terre'] / totalPoints) * 100);
      var airPct = Math.round((elementPoints['Air'] / totalPoints) * 100);
      var waterPct = Math.round((elementPoints['Eau'] / totalPoints) * 100);

      var sum = firePct + earthPct + airPct + waterPct;
      if (sum !== 100) {
        var diff = 100 - sum;
        var maxEl = 'Feu';
        if (elementPoints['Terre'] > elementPoints[maxEl]) maxEl = 'Terre';
        if (elementPoints['Air'] > elementPoints[maxEl]) maxEl = 'Air';
        if (elementPoints['Eau'] > elementPoints[maxEl]) maxEl = 'Eau';
        
        if (maxEl === 'Feu') firePct += diff;
        else if (maxEl === 'Terre') earthPct += diff;
        else if (maxEl === 'Air') airPct += diff;
        else if (maxEl === 'Eau') waterPct += diff;
      }

      var elements = [
        { name: 'Feu', pct: firePct, label: 'Feu', class: 'fire', desc: 'l\'enthousiasme, l\'énergie vitale, l\'action et l\'esprit d\'initiative' },
        { name: 'Terre', pct: earthPct, label: 'Terre', class: 'earth', desc: 'la stabilité, le pragmatisme, l\'esprit concret et la persévérance' },
        { name: 'Air', pct: airPct, label: 'Air', class: 'air', desc: 'la communication, l\'intellect, la curiosité et le besoin d\'échange' },
        { name: 'Eau', pct: waterPct, label: 'Eau', class: 'water', desc: 'la sensibilité profonde, l\'intuition, l\'empathie et la vie intérieure' }
      ];
      elements.sort(function(a, b) { return b.pct - a.pct; });
      var dominantEl = elements[0];

      var modesList = [
        { name: 'Cardinal', pts: modePoints['Cardinal'], desc: 'votre élan à initier des projets, entreprendre et diriger' },
        { name: 'Fixe', pts: modePoints['Fixe'], desc: 'votre capacité à persévérer, stabiliser et approfondir ce qui est déjà commencé' },
        { name: 'Mutable', pts: modePoints['Mutable'], desc: 'votre adaptabilité, votre flexibilité et votre goût pour la transition et le changement' }
      ];
      modesList.sort(function(a, b) { return b.pts - a.pts; });
      var dominantMode = modesList[0];

      var sunSignName = SIGNS[Math.floor(siderealSunDeg / 30)].name;
      var moonSignName = SIGNS[Math.floor(planetLons['Lune'] / 30)].name;
      var ascSignName = SIGNS[Math.floor(siderealAscDeg / 30)].name;

      var personalSynthesis = "Votre thème sidéral révèle un tempérament cosmique unique, avec une prédominance de l'élément <strong>" + dominantEl.name + "</strong> (" + dominantEl.pct + "%). Sur le plan psychologique et comportemental, cela indique que vos réactions spontanées et votre motivation profonde sont intimement liées à " + dominantEl.desc + ". L'expression de cette énergie est canalisée par un mode principalement <strong>" + dominantMode.name + "</strong>, mettant en lumière " + dominantMode.desc + ".<br><br>"
        + "Au cœur de votre identité, l'alliance sacrée entre votre essence (<strong>Soleil en " + sunSignName + "</strong>), votre univers émotionnel (<strong>Lune en " + moonSignName + "</strong>) et votre comportement instinctif (<strong>Ascendant " + ascSignName + "</strong>) dessine une personnalité riche. Voici la synthèse de vos énergies planétaires sur les trois plans clés de votre vie :<br><br>"
        + "🌱 <strong>Plan Personnel & Psychologique :</strong> ";

      if (dominantEl.name === 'Feu') {
        personalSynthesis += "Votre tempérament est propulsé par une étincelle de Feu créatrice et dynamique. Vous possédez une force d'âme ardente et un enthousiasme débordant, qui s'allient à la structure de votre Ascendant " + ascSignName + " pour forger une identité courageuse, guidée par l'intuition et l'impulsion d'exister pleinement. Cette nature vous dote de dons innés précieux, tels qu'une force créatrice vive, une vitalité contagieuse et un courage inébranlable capable d'inspirer les autres vers l'action. Cependant, votre défi d'incarnation majeur réside dans la maîtrise de cette impatience naturelle et la nécessité de canaliser votre ardeur impulsive, afin de préserver votre esprit du surmenage et d'éviter l'éparpillement énergétique.";
      } else if (dominantEl.name === 'Terre') {
        personalSynthesis += "Ancré(e) dans l'énergie pragmatique de la Terre, vous recherchez la stabilité et la clarté intérieure. Votre univers psychologique, guidé par le Soleil en " + sunSignName + ", privilégie la force tranquille, le bon sens et la patience, vous permettant d'assimiler les leçons de la vie avec sagesse. Vous disposez ainsi de dons innés remarquables : un pragmatisme à toute épreuve, une fiabilité absolue et un sens profond de la structuration concrète. Votre défi d'incarnation sera de dépasser la peur du manque, d'assouplir une tendance à la rigidité ou aux routines fermées, et d'embrasser sereinement les imprévus inhérents à l'existence.";
      } else if (dominantEl.name === 'Air') {
        personalSynthesis += "Votre esprit se nourrit du mouvement et des idées de l'élément Air. Porteur d'une grande curiosité intellectuelle et d'un besoin viscéral d'espace mental, vous analysez le monde avec recul, cherchant à donner du sens à votre incarnation sous la guidance de votre Lune en " + moonSignName + ". Cette configuration vous confère des dons innés d'agilité intellectuelle, d'aisance relationnelle et une capacité unique à connecter les concepts et les êtres. Pour autant, votre défi d'incarnation vous invite à sortir du mental pour ancrer vos projets, à surmonter la dispersion et à accueillir pleinement vos émotions sans chercher à systématiquement les intellectualiser.";
      } else if (dominantEl.name === 'Eau') {
        personalSynthesis += "Doté(e) d'une hypersensibilité féconde liée à la prédominance de l'Eau, vous naviguez la vie à travers le prisme des ressentis et de l'intuition. Votre monde intérieur est vaste, nourri par des dons innés d'empathie profonde, de sensibilité artistique et une écoute intime capable d'apporter de la guérison autour de vous. Néanmoins, votre défi d'incarnation réside dans la nécessité de poser des limites saines pour ne pas devenir une éponge émotionnelle face aux énergies extérieures, tout en apprenant à stabiliser vos fluctuations d'humeur et à surmonter une certaine insécurité affective.";
      }

      personalSynthesis += "<br><br>💼 <strong>Plan Professionnel & Projets :</strong> ";
      if (dominantMode.name === 'Cardinal') {
        if (dominantEl.name === 'Feu') {
          personalSynthesis += "En milieu professionnel, votre tempérament de pionnier vous pousse à initier avec audace et à diriger les projets. Vos dons innés s'expriment à travers un leadership charismatique naturel et une capacité unique à insuffler de l'élan pour démarrer des initiatives d'envergure. Votre défi d'incarnation consiste à cultiver la persévérance nécessaire pour mener à terme les projets commencés, tout en modérant une tendance involontaire à l'autoritarisme.";
        } else if (dominantEl.name === 'Terre') {
          personalSynthesis += "Votre force professionnelle réside dans la fondation de projets durables. Vous possédez l'esprit d'entreprise allié au sens des réalités. Vos dons innés résident dans une structuration méthodique rigoureuse et une excellente gestion organisationnelle. Votre défi d'incarnation vous demande d'apprendre à déléguer, de lâcher prise sur le besoin de contrôle absolu et d'oser innover en dehors des cadres établis.";
        } else if (dominantEl.name === 'Air') {
          personalSynthesis += "Votre vocation est celle d'un connecteur d'idées. Excellent communicant, vous lancez des partenariats et concevez des stratégies. Vos dons innés de négociateur agile et de visionnaire vous permettent de créer des synergies novatrices. Votre défi d'incarnation sera de structurer vos priorités pour ne pas vous éparpiller dans de trop nombreuses directions et de prêter une attention rigoureuse aux détails pratiques de mise en œuvre.";
        } else if (dominantEl.name === 'Eau') {
          personalSynthesis += "Votre approche du travail est profondément humaine et guidée par le sens. Vous possédez des dons innés pour le management bienveillant et une intuition fine des besoins de vos collaborateurs. Votre défi d'incarnation sera de savoir trancher fermement lorsque les situations l'exigent, sans culpabiliser, et d'éviter que les tensions relationnelles ou affectives n'affectent vos décisions professionnelles.";
        }
      } else if (dominantMode.name === 'Fixe') {
        if (dominantEl.name === 'Feu') {
          personalSynthesis += "Professionnellement, vous êtes un foyer de persévérance et de fidélité à vos idéaux. Vos dons innés de détermination inébranlable et de puissance de concentration vous permettent d'accomplir des œuvres de longue haleine. Votre défi d'incarnation réside dans l'assouplissement de votre orgueil et l'acceptation des remises en question constructives indispensables à votre évolution.";
        } else if (dominantEl.name === 'Terre') {
          personalSynthesis += "Dans le travail, vous incarnez la fiabilité absolue. Vous consolidez les structures et optimisez les ressources. Vos dons innés d'endurance et de rigueur sécurisent les projets sur le long terme. Votre défi d'incarnation sera de surmonter la résistance naturelle au changement, d'éviter l'inertie et d'apprendre à adapter vos méthodes avec souplesse aux nouvelles exigences du marché.";
        } else if (dominantEl.name === 'Air') {
          personalSynthesis += "Votre sphère professionnelle bénéficie d'une concentration mentale remarquable. Vous approfondissez les concepts complexes grâce à des dons innés de rigueur scientifique et d'intégrité intellectuelle hors pair. Votre défi d'incarnation sera de ne pas vous enfermer dans des dogmes théoriques et d'apprendre à communiquer vos idées de manière plus chaleureuse, accessible et collaborative.";
        } else if (dominantEl.name === 'Eau') {
          personalSynthesis += "Vocationnellement, vous êtes guidé par des passions inébranlables et un instinct protecteur. Vos dons innés se manifestent par un dévouement total et un flair psychologique acéré pour désamorcer les crises ou décoder les non-dits. Votre défi d'incarnation réside dans la nécessité de lâcher prise sur les rancœurs professionnelles et de refuser les rapports de force ou la rétention d'informations.";
        }
      } else { // Mutable
        if (dominantEl.name === 'Feu') {
          personalSynthesis += "Votre parcours professionnel se nourrit de polyvalence et d'enthousiasme communicatif. Vos dons innés résident dans une extraordinaire adaptabilité face à l'imprévu et une capacité à motiver vos équipes en période de transition. Votre défi d'incarnation sera de canaliser cette énergie dispersée en trouvant une ligne directrice stable pour pérenniser votre carrière.";
        } else if (dominantEl.name === 'Terre') {
          personalSynthesis += "Dans le domaine professionnel, vous brillez par votre habileté à optimiser les détails pratiques. Vous possédez des dons innés d'ingéniosité et de conscience professionnelle rigoureuse pour améliorer continuellement les processus. Votre défi d'incarnation consiste à dépasser un perfectionnisme parfois anxieux et à valoriser vos compétences à leur juste valeur sans vous sous-estimer.";
        } else if (dominantEl.name === 'Air') {
          personalSynthesis += "Votre dynamique professionnelle repose sur l'agilité conceptuelle et la variété. Vos dons innés pour le multitâche et l'assimilation rapide d'informations font de vous une excellente passerelle d'idées. Votre défi d'incarnation sera de structurer vos plannings pour éviter la surcharge mentale, en favorisant la profondeur de vos réalisations plutôt que leur seule quantité.";
        } else if (dominantEl.name === 'Eau') {
          personalSynthesis += "Professionnellement, votre force réside dans votre extraordinaire intuition adaptative. Vos dons innés d'empathie et d'accompagnement vous orientent naturellement vers les métiers du soin, de la création ou de la transmission. Votre défi d'incarnation sera de vous forger une protection saine face au stress ambiant et de clarifier vos propres buts sans vous laisser influencer par autrui.";
        }
      }

      personalSynthesis += "<br><br>💖 <strong>Plan Relationnel & Amoureux :</strong> ";
      if (dominantEl.name === 'Feu') {
        personalSynthesis += "Dans la sphère relationnelle, votre expression affective est chaleureuse, spontanée et entière. Vos dons innés résident dans une passion généreuse, une loyauté inconditionnelle et une vitalité joyeuse qui dynamise vos relations. Votre défi d'incarnation sera de respecter le rythme et l'espace intime de l'autre, tout en apprenant à apprécier le calme et la simplicité du quotidien sans exiger une intensité émotionnelle permanente.";
      } else if (dominantEl.name === 'Terre') {
        personalSynthesis += "Vos relations affectives et amicales se construisent sur la durée, la fidélité et la confiance mutuelle. Vos dons innés se traduisent par une stabilité rassurante et une manière concrète de prouver votre amour par le soutien matériel et la présence physique. Votre défi d'incarnation consistera à exprimer plus ouvertement et verbalement vos sentiments, à surmonter une tendance à la possessivité et à laisser plus de place à la spontanéité et à l'imprévu.";
      } else if (dominantEl.name === 'Air') {
        personalSynthesis += "Sur le plan relationnel, l'échange intellectuel, le dialogue et la complicité mentale sont vos portes d'entrée vers l'intimité. Vos dons innés résident dans une communication fluide, une légèreté joyeuse et un respect naturel de la liberté d'autrui. Votre défi d'incarnation sera d'oser descendre dans la vulnérabilité affective profonde, en dépassant la peur de l'intimité émotionnelle pure et de l'engagement à long terme.";
      } else if (dominantEl.name === 'Eau') {
        personalSynthesis += "Dans le domaine amoureux et familial, vous recherchez une communion d'âme et une sécurité affective totale. Vos dons innés se manifestent par une écoute empathique infinie et une immense capacité de dévouement intime. Votre défi d'incarnation sera d'éviter les pièges de la dépendance affective ou d'une fusion étouffante, en apprenant à exprimer clairement vos propres besoins plutôt que d'attendre que l'autre les devine.";
      }

      var elementsHtml = '<div class="at-summary-card">'
        + '<div class="at-summary-grid">';
      for (var e = 0; e < 4; e++) {
        var el = elements[e];
        elementsHtml += '<div class="at-summary-item">'
          + '<div class="at-summary-item-title"><span>' + el.label + '</span><span>' + el.pct + '%</span></div>'
          + '<div class="at-progress-bar-wrap">'
            + '<div class="at-progress-bar at-progress-bar-' + el.class + '" style="width:' + el.pct + '%"></div>'
          + '</div>'
          + '</div>';
      }
      elementsHtml += '</div>'
        + '<div class="at-summary-desc">' + personalSynthesis + '</div>'
        + '</div>';

      document.getElementById('atPlanetsSummary').innerHTML = elementsHtml;

      // 4. Cartes de Détails Planétaires (masquées par défaut)
      var planetsHtml = '';
      var ascTri = parseTripartiteInterp(ascSign.ascInterp || ascSign.interp);
      planetsHtml += '<div class="at-planet-card">'
        + '<div class="at-pc-header">'
          + '<span class="at-pc-icon">↑</span>'
          + '<div class="at-pc-meta">'
            + '<h4 class="at-pc-name">Ascendant Sidéral</h4>'
            + '<span class="at-pc-pos">' + formatLonToSign(siderealAscDeg) + '</span>'
          + '</div>'
        + '</div>'
        + '<div class="at-tabs-nav">'
          + '<button class="at-tab-btn active" data-tab="perso">🌱 Plan Personnel</button>'
          + '<button class="at-tab-btn" data-tab="pro">💼 Plan Professionnel</button>'
          + '<button class="at-tab-btn" data-tab="love">💖 Plan Relationnel</button>'
        + '</div>'
        + '<div class="at-tab-content active" data-tab="perso">' + ascTri.personal + '</div>'
        + '<div class="at-tab-content" data-tab="pro">' + ascTri.pro + '</div>'
        + '<div class="at-tab-content" data-tab="love">' + ascTri.relational + '</div>'
        + '</div>';

      var sunTri = parseTripartiteInterp(soleil.interp);
      planetsHtml += '<div class="at-planet-card">'
        + '<div class="at-pc-header">'
          + '<span class="at-pc-icon">☉</span>'
          + '<div class="at-pc-meta">'
            + '<h4 class="at-pc-name">Soleil Sidéral</h4>'
            + '<span class="at-pc-pos">' + formatLonToSign(siderealSunDeg) + '</span>'
          + '</div>'
        + '</div>'
        + '<div class="at-tabs-nav">'
          + '<button class="at-tab-btn active" data-tab="perso">🌱 Plan Personnel</button>'
          + '<button class="at-tab-btn" data-tab="pro">💼 Plan Professionnel</button>'
          + '<button class="at-tab-btn" data-tab="love">💖 Plan Relationnel</button>'
        + '</div>'
        + '<div class="at-tab-content active" data-tab="perso">' + sunTri.personal + '</div>'
        + '<div class="at-tab-content" data-tab="pro">' + sunTri.pro + '</div>'
        + '<div class="at-tab-content" data-tab="love">' + sunTri.relational + '</div>'
        + '</div>';

      for (var k = 1; k < planetsOrder.length; k++) {
        var pName = planetsOrder[k];
        var pLon = planetLons[pName];
        var pIdx = Math.floor(pLon / 30);
        var pSign = SIGNS[pIdx];
        var pInfo = PLANET_INFOS[pName];
        var interpData = { personal: "", pro: "", relational: "" };
        
        if (pName === 'Lune') {
          interpData.personal = MOON_DATA[pSign.name].p;
          interpData.pro = MOON_DATA[pSign.name].w;
          interpData.relational = MOON_DATA[pSign.name].r;
        } else if (pName === 'Mercure') {
          interpData.personal = MERCURY_DATA[pSign.name].p;
          interpData.pro = MERCURY_DATA[pSign.name].w;
          interpData.relational = MERCURY_DATA[pSign.name].r;
        } else if (pName === 'Vénus') {
          interpData.personal = VENUS_DATA[pSign.name].p;
          interpData.pro = VENUS_DATA[pSign.name].w;
          interpData.relational = VENUS_DATA[pSign.name].r;
        } else if (pName === 'Mars') {
          interpData.personal = MARS_DATA[pSign.name].p;
          interpData.pro = MARS_DATA[pSign.name].w;
          interpData.relational = MARS_DATA[pSign.name].r;
        } else {
          interpData = getOuterPlanetText(pName, pSign);
        }
        
        planetsHtml += '<div class="at-planet-card">'
          + '<div class="at-pc-header">'
            + '<span class="at-pc-icon">' + pInfo.sym + '</span>'
            + '<div class="at-pc-meta">'
              + '<h4 class="at-pc-name">' + pInfo.name + ' Sidéral</h4>'
              + '<span class="at-pc-pos">' + formatLonToSign(pLon) + '</span>'
            + '</div>'
          + '</div>'
          + '<div class="at-tabs-nav">'
            + '<button class="at-tab-btn active" data-tab="perso">🌱 Plan Personnel</button>'
            + '<button class="at-tab-btn" data-tab="pro">💼 Plan Professionnel</button>'
            + '<button class="at-tab-btn" data-tab="love">💖 Plan Relationnel</button>'
          + '</div>'
          + '<div class="at-tab-content active" data-tab="perso">' + interpData.personal + '</div>'
          + '<div class="at-tab-content" data-tab="pro">' + interpData.pro + '</div>'
          + '<div class="at-tab-content" data-tab="love">' + interpData.relational + '</div>'
          + '</div>';
      }
      document.getElementById('atPlanetsBlock').innerHTML = planetsHtml;

      // 5. Synthèse des Aspects Astrologiques Sidéraux (Néophyte)
      var aspects = findAspects(planetLons, siderealAscDeg);
      
      var conjCount = 0;
      var sextileCount = 0;
      var squareCount = 0;
      var trineCount = 0;
      var oppCount = 0;
      
      for (var i = 0; i < aspects.length; i++) {
        var asp = aspects[i];
        if (asp.type === 'Conjonction') conjCount++;
        else if (asp.type === 'Sextile') sextileCount++;
        else if (asp.type === 'Carré') squareCount++;
        else if (asp.type === 'Trigone') trineCount++;
        else if (asp.type === 'Opposition') oppCount++;
      }

      var harmonieuxCount = trineCount + sextileCount;
      var tensionCount = squareCount + oppCount;
      var aspectSynthesis = '';

      if (aspects.length === 0) {
        aspectSynthesis = "Votre ciel de naissance sidéral présente une configuration rare d'aspects très espacés. Cela indique que vos énergies planétaires fonctionnent de manière autonome et indépendante. Vous n'êtes pas soumis à des tiraillements intérieurs majeurs, ce qui vous offre une liberté psychologique singulière.<br><br>"
          + "🌱 <strong>Plan Personnel & Psychologique :</strong> Vous jouissez d'une grande liberté psychologique et d'un calme intérieur naturel. Cette configuration vous offre le don inné d'une autonomie psychique totale et d'une tranquillité naturelle, vos facettes n'entrant pas en conflit. Cependant, votre défi d'incarnation sera de trouver une motivation profonde à évoluer sans y être poussé par des crises ou tensions extérieures, en évitant ainsi une stagnation confortable.<br><br>"
          + "💼 <strong>Plan Professionnel & Projets :</strong> Vous menez vos activités de manière autonome et ciblée. Vos dons innés s'expriment à travers une capacité à travailler seul de façon linéaire et hyper-focalisée. Votre défi d'incarnation réside dans l'effort nécessaire pour vous intégrer au sein de projets d'équipe complexes et pour collaborer de manière fluide avec des tempéraments contradictoires.<br><br>"
          + "💖 <strong>Plan Relationnel & Amoureux :</strong> Vos relations sont fluides et calmes. Vous disposez du don inné d'un pacifisme relationnel naturel et d'une simplicité affective qui éloigne spontanément les conflits. Votre défi d'incarnation sera de faire l'effort d'exprimer vos vulnérabilités et de partager votre riche monde intérieur, plutôt que de vous réfugier dans votre indépendance rassurante.";
      } else {
        aspectSynthesis = "L'analyse de vos relations planétaires montre <strong>" + aspects.length + " aspect(s) majeur(s)</strong> en jeu dans votre ciel stellaire, dont <strong>" + conjCount + " conjonction(s)</strong>, <strong>" + harmonieuxCount + " aspect(s) harmonieux</strong> et <strong>" + tensionCount + " aspect(s) de tension constructive</strong>. Voici leur influence combinée sur vos différents plans de vie :<br><br>";
        
        // 1. Plan Personnel
        aspectSynthesis += "🌱 <strong>Plan Personnel & Psychologique :</strong> ";
        if (tensionCount > harmonieuxCount) {
          aspectSynthesis += "Vos forces psychologiques fonctionnent sous une dynamique de tension constructive. C'est le signe d'un parcours de vie riche en transformations. Cette configuration vous dote de dons innés précieux tels qu'une résilience hors du commun et une remarquable lucidité d'introspection. Votre défi d'incarnation sera d'apaiser vos conflits intérieurs, de surmonter des cycles d'auto-sabotage ou d'anxiété, et d'essayer de ne pas concevoir l'existence comme un combat permanent.";
        } else if (harmonieuxCount > tensionCount) {
          aspectSynthesis += "Vous bénéficiez d'une intégration harmonieuse et fluide de vos forces psychologiques. Vos émotions et vos désirs s'accordent naturellement. Vos dons innés se traduisent par une paix intérieure innée, une grande force de récupération psychologique et un alignement naturel. Votre défi d'incarnation sera d'éviter la complaisance, de ne pas fuir les confrontations saines nécessaires à votre évolution et de cultiver une saine discipline personnelle.";
        } else if (conjCount > 0) {
          aspectSynthesis += "Vos fonctions psychologiques sont fortement unifiées autour de pôles d'intensité majeurs. Vous possédez le don inné d'une force de volonté et d'une focalisation exceptionnelles, alliant authenticité et passion. Votre défi d'incarnation sera d'apprendre à modérer l'exclusivité ou l'obsessionnalité, tout en sachant intégrer des points de vue divergents sans vous sentir menacé.";
        } else {
          aspectSynthesis += "Votre psyché bénéficie d'un équilibre sain entre fluidité (pour vous ressourcer) et tensions stimulantes (pour évoluer). Vos dons innés résident dans une souplesse d'adaptation émotionnelle et une capacité à vous apaiser rapidement. Votre défi d'incarnation consistera à maintenir ce cap sans tomber dans l'inertie lors des accalmies, ni dans le découragement lors des phases de défi.";
        }
        aspectSynthesis += "<br><br>";

        // 2. Plan Professionnel
        aspectSynthesis += "💼 <strong>Plan Professionnel & Projets :</strong> ";
        if (tensionCount > harmonieuxCount) {
          aspectSynthesis += "Les tensions planétaires vous confèrent une ambition combative et une grande persévérance face à l'adversité. Vos dons innés résident dans une aptitude exceptionnelle à gérer les situations de crise et à faire preuve d'une endurance indestructible face aux obstacles. Votre défi d'incarnation sera de canaliser votre esprit de rivalité et d'accepter les compromis collectifs sans chercher à instaurer des rapports de force.";
        } else if (harmonieuxCount > tensionCount) {
          aspectSynthesis += "Votre parcours professionnel est facilité par des opportunités naturelles et une aisance à collaborer. Vous disposez de dons innés pour instaurer un climat de confiance, collaborer harmonieusement et attirer le succès. Votre défi d'incarnation consistera à ne pas fuir l'effort ou la confrontation nécessaire pour défendre vos convictions, en stimulant une saine ambition personnelle.";
        } else if (conjCount > 0) {
          aspectSynthesis += "Dans votre travail, vous excellez dans les spécialisations pointues et les projets demandant une focalisation absolue. Vos dons innés s'expriment à travers une expertise pointue et une détermination sans faille. Votre défi d'incarnation réside dans la prévention de l'épuisement professionnel lié à un surinvestissement obsessif, et dans le développement d'une plus grande flexibilité d'esprit.";
        } else {
          aspectSynthesis += "Vous combinez habilement l'écoute collaborative et l'esprit d'initiative. Vos dons innés résident dans une polyvalence managériale et une capacité à alterner leadership autonome et travail d'équipe. Votre défi d'incarnation sera d'oser choisir des projets à la hauteur de votre plein potentiel au lieu de vous installer dans un confort routinier.";
        }
        aspectSynthesis += "<br><br>";

        // 3. Plan Relationnel
        aspectSynthesis += "💖 <strong>Plan Relationnel & Amoureux :</strong> ";
        if (tensionCount > harmonieuxCount) {
          aspectSynthesis += "Vos relations agissent comme des miroirs de croissance intenses et stimulants. Vous bénéficiez du don inné de bâtir des connexions d'une immense profondeur psychologique, agissant comme un catalyseur de vérité pour l'autre. Votre défi d'incarnation consistera à dépasser les luttes de pouvoir et le besoin inconscient de drames ou de crises passionnelles pour vous sentir exister.";
        } else if (harmonieuxCount > tensionCount) {
          aspectSynthesis += "Vous attirez spontanément l'harmonie, la complicité et la bienveillance dans vos relations affectives. Vos dons innés résident dans une facilité à inspirer la confiance, à apaiser les conflits et à nourrir une tendresse sereine. Votre défi d'incarnation sera d'oser aborder les discussions difficiles nécessaires au couple plutôt que de tolérer des situations insatisfaisantes par peur de briser l'harmonie.";
        } else if (conjCount > 0) {
          aspectSynthesis += "Vos relations affectives se caractérisent par l'intensité et la profondeur. Vous possédez le don inné d'une fidélité absolue et d'un dévouement passionné. Votre défi d'incarnation sera de respecter scrupuleusement l'espace vital et l'autonomie de votre partenaire pour éviter toute tendance fusionnelle étouffante ou possessive.";
        } else {
          aspectSynthesis += "Votre vie relationnelle trouve sa stabilité dans un équilibre vivant. Vos dons innés résident dans un sens aigu du partage et du compromis équitable au quotidien. Votre défi d'incarnation consistera à entretenir activement le mystère, la séduction et l'originalité au sein du couple afin de ne pas laisser la routine s'installer.";
        }
      }

      var aspectsSummaryHtml = '<div class="at-summary-card">'
        + '<div class="at-summary-grid">'
          + '<div class="at-summary-item"><div class="at-summary-item-title"><span>Conjonctions ☌</span></div><div class="at-summary-item-val" style="color:var(--gold);">' + conjCount + '</div></div>'
          + '<div class="at-summary-item"><div class="at-summary-item-title"><span>Harmonieux (△/⚹)</span></div><div class="at-summary-item-val" style="color:var(--emerald);">' + harmonieuxCount + '</div></div>'
          + '<div class="at-summary-item"><div class="at-summary-item-title"><span>Tensions (□/☍)</span></div><div class="at-summary-item-val" style="color:var(--rose);">' + tensionCount + '</div></div>'
        + '</div>'
        + '<div class="at-summary-desc">' + aspectSynthesis + '</div>'
        + '</div>';

      document.getElementById('atAspectsSummary').innerHTML = aspectsSummaryHtml;

      // 6. Cartes de Détails des Aspects (masquées par défaut)
      var aspectsHtml = '';
      if (aspects.length === 0) {
        aspectsHtml += '<p class="slate" style="text-align:center;grid-column: 1 / -1;padding:2rem;">Aucun aspect majeur détecté avec les orbes configurés.</p>';
      } else {
        for (var i = 0; i < aspects.length; i++) {
          var asp = aspects[i];
          var aData = getAspectInterpretation(asp.p1, asp.p2, asp.type, asp.orb);
          
          aspectsHtml += '<div class="at-aspect-card">'
            + '<div class="at-ac-header">'
              + '<span class="at-ac-sym at-ac-sym-' + asp.type.toLowerCase().replace('é', 'e') + '">' + aData.typeSym + '</span>'
              + '<div class="at-ac-meta">'
                + '<h4 class="at-ac-title">' + aData.p1Name + ' ' + aData.typeName + ' ' + aData.p2Name
                + '<span class="at-aspect-badge at-aspect-badge-' + asp.type.toLowerCase().replace('é', 'e') + '">' + asp.type + '</span>'
                + '</h4>'
                + '<span class="at-ac-orb">Orbe : ' + aData.orb + '°</span>'
              + '</div>'
            + '</div>'
            + '<div class="at-tabs-nav">'
              + '<button class="at-tab-btn active" data-tab="perso">🌱 Plan Personnel</button>'
              + '<button class="at-tab-btn" data-tab="pro">💼 Plan Professionnel</button>'
              + '<button class="at-tab-btn" data-tab="love">💖 Plan Relationnel</button>'
            + '</div>'
            + '<div class="at-tab-content active" data-tab="perso">' + aData.personal + '</div>'
            + '<div class="at-tab-content" data-tab="pro">' + aData.pro + '</div>'
            + '<div class="at-tab-content" data-tab="love">' + aData.relational + '</div>'
            + '</div>';
        }
      }
      document.getElementById('atAspectsBlock').innerHTML = aspectsHtml;

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
