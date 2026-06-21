(function () {
  'use strict';

  /* ─── Données d'interprétation pour les Lagnas (Ascendants Védiques) ─── */
  var LAGNA_DATA = {
    'Bélier': {
      sym: '♈', name: 'Mesha (Bélier)', ruler: 'Mars (Mangala)', element: 'Feu',
      personal: "Propulsé par l'énergie brute de Mars, votre Lagna Mesha indique une incarnation axée sur l'affirmation de soi et l'exploration courageuse du monde. Votre don inné est une force vitale jaillissante et un optimisme de pionnier capable de surmonter tous les obstacles physiques ou psychiques. Cependant, votre défi majeur consiste à tempérer une impatience ardente et à canaliser une colère soudaine afin de ne pas détruire les fondations que vous tentez de bâtir.",
      pro: "Vous excellez dans la création de projets, les rôles de leadership et toutes les activités exigeant des décisions rapides et une énergie inépuisable. Bâtisseur infatigable de nouvelles initiatives, votre don est d'inspirer les autres par votre audace. Votre défi d'incarnation est d'apprendre la persévérance sur le long terme pour ne pas abandonner les projets une fois la phase d'excitation initiale passée.",
      relational: "En amour, vous êtes entier, passionné et charismatique, cherchant une connexion directe et spontanée. Votre don est une honnêteté totale et une loyauté sans faille envers votre partenaire. Votre défi consiste à laisser de l'espace à l'autre et à accepter la vulnérabilité émotionnelle sans la percevoir comme une faiblesse ou une soumission."
    },
    'Taureau': {
      sym: '♉', name: 'Vrishabha (Taureau)', ruler: 'Vénus (Shukra)', element: 'Terre',
      personal: "Sous la régence de la douce Vénus, le Lagna Vrishabha offre une structure solide, calme et profondément ancrée. Votre don inné réside dans votre persévérance inébranlable et un sens inné de la beauté, de la nature et de l'harmonie concrète. Votre défi d'incarnation réside dans la tendance à vous figer dans vos certitudes matérielles et à résister de manière excessive aux transformations inévitables de l'existence.",
      pro: "Vous êtes le pilier sur lequel une entreprise peut bâtir sa stabilité financière et opérationnelle. Rigoureux, fiable et amateur de travail bien fait, vous excellez dans la gestion de ressources, l'artisanat de qualité ou l'immobilier. Votre défi consiste à accepter l'innovation et le changement de méthodes sans vous sentir menacé dans votre sécurité.",
      relational: "Vous recherchez une union stable, protectrice et sensuelle, conçue comme un havre de paix. Loyal et généreux, votre don est la création d'un cadre de vie sécurisant et chaleureux. Votre défi réside dans le dépassement de la possessivité et du besoin d'accumulation sentimentale qui peuvent étouffer la fluidité relationnelle."
    },
    'Gémeaux': {
      sym: '♊', name: 'Mithuna (Gémeaux)', ruler: 'Mercure (Budha)', element: 'Air',
      personal: "Régi par le messager céleste Mercure, le Lagna Mithuna dote votre âme d'une curiosité insatiable et d'une agilité intellectuelle remarquable. Votre don inné est une capacité d'adaptation phénoménale et une facilité naturelle à nouer des contacts et à transmettre des idées. Votre défi d'incarnation est de canaliser votre agitation mentale et d'éviter la dispersion superficielle qui vous empêche d'approfondir les vérités essentielles.",
      pro: "Vous brillez dans la communication, l'écriture, les langues, l'enseignement ou le commerce dynamique. Votre agilité d'esprit vous permet de gérer de multiples tâches simultanément et de trouver des solutions innovantes. Votre défi est d'apprendre la rigueur d'exécution et de finaliser avec soin ce que votre esprit fertile a initié.",
      relational: "En amour, vous avez besoin d'une profonde complicité intellectuelle et de rires partagés. Votre don est de savoir renouveler la relation par le jeu, la discussion et la légèreté. Votre défi est de surmonter la peur de l'intimité émotionnelle profonde en osant livrer vos sentiments vulnérables plutôt que de vous réfugier dans l'analyse intellectuelle."
    },
    'Cancer': {
      sym: '♋', name: 'Karka (Cancer)', ruler: 'Lune (Chandra)', element: 'Eau',
      personal: "Gouverné par la Lune et associé à l'élément de l'eau, le Lagna Karka symbolise l'incarnation de l'empathie, de l'intuition et de la protection maternelle. Votre don inné est une sensibilité exceptionnelle et une force de dévotion inaltérable envers les êtres qui vous sont chers. Votre défi d'incarnation consiste à ériger des limites saines pour ne pas vous laisser submerger par les émotions d'autrui ou sombrer dans des sautes d'humeur imprévisibles.",
      pro: "Vous vous épanouissez dans les métiers de soin, d'éducation, de gestion humaine, de psychologie ou dans l'accompagnement de projets à fort impact émotionnel. Votre don est de savoir créer une atmosphère chaleureuse où chacun se sent en sécurité. Votre défi professionnel est d'accepter les critiques objectives sans les ressentir comme des attaques personnelles directes.",
      relational: "L'amour est pour vous un engagement sacré de l'âme, une recherche de fusion émotionnelle et de sécurité familiale absolue. Protecteur et aimant, vous offrez une tendresse infinie. Votre défi d'incarnation est de ne pas développer de dynamique d'attachement excessif ou de manipulation inconsciente par le biais de la victimisation face aux peurs d'abandon."
    },
    'Lion': {
      sym: '♌', name: 'Simha (Lion)', ruler: 'Soleil (Surya)', element: 'Feu',
      personal: "Régi par le Soleil lui-même, le Lagna Simha confère une aura lumineuse, royale et naturellement protectrice. Votre don inné est une générosité de cœur grandiose, une grande force de volonté et une intégrité innée qui pousse au respect. Votre défi d'incarnation est d'apprivoiser un ego ombrageux et un besoin viscéral d'approbation publique, en apprenant à rayonner pour les autres plutôt que pour votre propre gloire.",
      pro: "Vous êtes né pour diriger, inspirer, créer et assumer de hautes responsabilités publiques ou entrepreneuriales. Votre présence magnétique rassure vos équipes et impulse une direction claire. Votre défi consiste à déléguer le pouvoir en toute confiance et à accepter de ne pas être le centre unique d'attention dans chaque réussite.",
      relational: "En amour, vous êtes loyal, chevaleresque et profondément démonstratif, exigeant une admiration mutuelle. Votre don est d'apporter du panache, de la joie et de la protection à votre partenaire. Votre défi est d'acceptée que l'autre ait son propre jardin secret et ses moments de recul, sans y déceler une remise en cause de votre valeur."
    },
    'Vierge': {
      sym: '♍', name: 'Kanya (Vierge)', ruler: 'Mercure (Budha)', element: 'Terre',
      personal: "Sous l'influence méthodique de Mercure, le Lagna Kanya oriente votre incarnation vers la pureté, le service dévoué et le sens du détail. Votre don inné est une intelligence d'analyse hors pair et une capacité à ordonner le chaos avec patience et précision. Votre défi majeur est de pacifier une tendance à l'autocritique destructive et au perfectionnisme stérile, générateurs d'anxiété chronique.",
      pro: "Vous excellez dans l'organisation, l'administration, les sciences d'analyse, l'édition ou les professions de santé et de conseil technique. Précis et dévoué, vous résolvez les problèmes les plus subtils. Votre défi est de ne pas vous perdre dans des détails insignifiants et d'apprendre à valoriser votre propre contribution à sa juste mesure.",
      relational: "Vous exprimez votre affection par des services constants et une attention délicate aux besoins pratiques de votre partenaire. Protecteur discret, vous êtes d'une grande fiabilité. Votre défi consiste à cesser de chercher à corriger ou à perfectionner l'autre, en accueillant l'imperfection humaine comme une part naturelle de l'amour."
    },
    'Balance': {
      sym: '♎', name: 'Tula (Balance)', ruler: 'Vénus (Shukra)', element: 'Air',
      personal: "Gouverné par Vénus, le Lagna Tula recherche inlassablement l'équilibre, la justice et l'harmonie esthétique et relationnelle. Votre don inné est un sens aigu de la diplomatie et une capacité naturelle à comprendre tous les points de vue pour apaiser les tensions. Votre défi d'incarnation réside dans une indécision paralysante et dans la peur excessive du conflit, vous poussant à faire des compromis destructeurs pour votre propre intégrité.",
      pro: "Vous vous épanouissez dans la médiation, le droit, la négociation d'accords, les arts visuels ou la diplomatie d'affaires. Votre don est d'instaurer des relations équitables et fructueuses entre partenaires. Votre défi professionnel est d'oser trancher avec fermeté et de défendre vos idées personnelles, même si elles déplaisent.",
      relational: "Le couple est le miroir indispensable de votre épanouissement personnel. Romantique, courtois et attentif, vous recherchez l'équité totale dans le partage des tâches et des sentiments. Votre défi consiste à ne pas vous oublier dans la relation et à oser exprimer vos désaccords pour maintenir une harmonie réelle et non feinte."
    },
    'Scorpion': {
      sym: '♏', name: 'Vrishchika (Scorpion)', ruler: 'Mars / Ketu', element: 'Eau',
      personal: "Régi par Mars et le mystique Ketu, le Lagna Vrishchika est le signe des transformations psychiques les plus profondes et de la résilience absolue. Votre don inné est une intuition perçante capable de sonder les mystères invisibles et de renaître de chaque crise plus fort. Votre défi d'incarnation est de dépasser un instinct de méfiance, d'éviter de nourrir de vieilles rancunes et d'abandonner le besoin inconscient de contrôler les situations.",
      pro: "Vous excellez dans l'investigation secrète, la psychothérapie profonde, la recherche scientifique complexe, la finance stratégique ou la gestion des situations de crise majeure. Ténacité et sang-froid vous caractérisent. Votre défi est de ne pas instaurer de rapports de force avec vos hiérarchies ou vos collègues.",
      relational: "Vous recherchez une fusion totale, passionnée et sans faux-semblants avec l'être aimé, refusant la superficialité. Protecteur absolu, votre don est un engagement d'âme. Votre défi consiste à accorder votre confiance et à renoncer aux soupçons ou à la jalousie qui usent l'harmonie du couple."
    },
    'Sagittaire': {
      sym: '♐', name: 'Dhanu (Sagittaire)', ruler: 'Jupiter (Guru)', element: 'Feu',
      personal: "Placé sous la tutelle de Jupiter, le Lagna Dhanu dote votre incarnation d'un idéal spirituel élevé et d'un optimisme contagieux. Votre don inné est une soif de vérité philosophique, de sagesse et d'exploration intellectuelle qui ouvre les horizons de votre esprit. Votre défi d'incarnation est de tempérer un excès d'enthousiasme pouvant tourner au dogmatisme rigide ou à une impatience face aux contraintes de la vie courante.",
      pro: "Vous êtes fait pour l'enseignement supérieur, le droit, la recherche philosophique, les voyages internationaux ou le mentorat inspirant. Votre don est de savoir donner du sens aux projets collectifs. Votre défi professionnel est de rester focalisé sur les détails techniques et de ne pas promettre plus que ce que vous pouvez concrètement réaliser.",
      relational: "En amour, vous recherchez un compagnon de route avec qui partager des idéaux, des voyages et une vision commune du monde. Chaleureux et généreux, vous insufflez de la joie. Votre défi est de concilier votre besoin vital d'indépendance avec la patience requise par la vie quotidienne à deux."
    },
    'Capricorne': {
      sym: '♑', name: 'Makara (Capricorne)', ruler: 'Saturne (Shani)', element: 'Terre',
      personal: "Régi par la rigueur de Saturne, le Lagna Makara oriente votre parcours vers la discipline, la maturité précoce et l'ambition à long terme. Votre don inné est une persévérance indestructible et un sens aigu de la responsabilité éthique face au monde. Votre défi d'incarnation consiste à adoucir une propension à la mélancolie ou à la sévérité envers vous-même, en osant ouvrir votre cœur à la joie et à la légèreté.",
      pro: "Bâtisseur infatigable de structures pérennes, vous excellez dans l'administration, l'ingénierie, la direction d'entreprises ou tout rôle exigeant de la patience et du sang-froid. Votre don est de matérialiser de grands objectifs sur le long terme. Votre défi est d'apprendre la flexibilité face aux imprévus et de savoir déléguer.",
      relational: "Vous exprimez votre amour de manière concrète par le soutien matériel, la protection du foyer et la fidélité absolue dans le temps. Stable et mûr, vous êtes un repère solide. Votre défi consiste à exprimer verbalement vos sentiments et à accepter le lâcher-prise émotionnel nécessaire à la passion."
    },
    'Verseau': {
      sym: '♒', name: 'Kumbha (Verseau)', ruler: 'Saturne / Rahu', element: 'Air',
      personal: "Gouverné par Saturne et le rebelle Rahu, le Lagna Kumbha symbolise une incarnation tournée vers les idéaux collectifs, l'originalité de pensée et la fraternité universelle. Votre don inné est une vision humaniste avancée et une liberté d'esprit qui refuse les conditionnements limitants. Votre défi d'incarnation est de dépasser un sentiment d'isolement intérieur et d'apprendre à connecter vos émotions individuelles sans vous réfugier dans une froideur conceptuelle.",
      pro: "Vous brillez dans le travail d'équipe à vocation sociale, la recherche d'idées nouvelles, l'innovation technologique ou la direction de projets humanitaires. Votre don est d'anticiper les besoins collectifs. Votre défi professionnel est de savoir composer avec des structures rigides sans chercher la rébellion systématique.",
      relational: "Vous recherchez une relation d'égal à égal fondée sur l'amitié sincère, le respect de la liberté réciproque et le partage de convictions communes. Indépendant, vous fuyez l'exclusivité étouffante. Votre défi est d'oser aborder l'intimité charnelle et émotionnelle sans craindre de perdre votre autonomie intellectuelle."
    },
    'Poissons': {
      sym: '♓', name: 'Meena (Poissons)', ruler: 'Jupiter / Ketu', element: 'Eau',
      personal: "Placé sous la régence bienveillante de Jupiter et de Ketu, le Lagna Meena est le signe de l'amour universel, de la compassion mystique et de la dissolution finale des limites de l'ego. Votre don inné est une intuition spirituelle exceptionnelle et une empathie naturelle qui vous connecte au Tout. Votre défi d'incarnation est de poser des limites claires et de structurer votre esprit pour ne pas vous évader de la réalité concrète par le biais de l'illusion ou de l'auto-apitoiement.",
      pro: "Vous êtes à votre place dans les arts créatifs, la musique spirituelle, la thérapie psychologique, l'accompagnement humanitaire ou la recherche spirituelle. Inspiré et compatissant, vous guérissez par votre présence. Votre défi professionnel est de savoir structurer vos tarifs, de gérer les contraintes administratives et de dire non avec fermeté.",
      relational: "Pour vous, aimer est une communion sacrée et une quête de fusion inconditionnelle avec le partenaire. Dévoué et d'une tendresse infinie, vous offrez une sécurité émotionnelle rare. Votre défi est de ne pas vous sacrifier pour des partenaires toxiques ou immatures en les idéalisant à l'extrême."
    }
  };

  /* ─── Les 27 Nakshatras (Demeures Lunaires) ─── */
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
      name: 'Shravana', ruler: 'Lune', deity: 'Vishnu (Préservateur du Cosmos)', sym: 'Oreille ou Empreintes',
      personal: "Le pouvoir de l'écoute intérieure et du silence. Votre karma est d'apprendre la sagesse par l'observation active et la réceptivité fine. Vos forces subconscientes sont connectées à la transmission orale du savoir.",
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
      name: 'Shatabhisha', ruler: 'Rahu', deity: 'Varuna (Dieu des Eaux cosmiques)', sym: 'Cercle vide',
      personal: "Le cercle mystique des cent guérisseurs. Vos forces subconscientes exigent des moments de solitude absolue et de repli méditatif pour régénérer votre énergie. Votre défi karmique est de dépasser le sentiment d'isolement social.",
      pro: "Chercheur en médecine, psychiatre, innovateur technologique ou astrophysicien. Vous préférez le travail autonome ou les laboratoires confidentiels.",
      relational: "Extrêmement pudique avec vos sentiments, vous ouvrez votre porte secrète très lentement. Vous recherchez un partenaire tolérant et respectueux de votre indépendance."
    },
    {
      name: 'Purva Bhadrapada', ruler: 'Jupiter', deity: 'Aja Ekapada (Serpent de Feu)', sym: 'Épée ou Double Visage',
      personal: "Votre subconscient est habité par un feu purificateur intense et une passion spirituelle ardente. Karmiquement, vous êtes venu pour vivre des métamorphoses intérieures radicales. Votre défi est d'éviter l'extrémisme moral.",
      pro: "Militant engagé, réformateur social, chercheur en sciences ésotériques ou écrivain d'investigation. Vous n'avez pas peur de défendre des causes impopulaires.",
      relational: "Entier et exclusif, vous vivez l'amour sous forme de quête spirituelle ou de combat partagé. Vous recherchez un partenaire qui vibre avec la même flamme intérieure."
    },
    {
      name: 'Uttara Bhadrapada', ruler: 'Saturne', deity: 'Ahirbudhnya (Serpent des Abysses)', sym: 'Pieds de lit',
      personal: "Le Serpent des profondeurs océaniques. Vos forces subconscientes vous dotent d'une stabilité mentale rare et d'une compassion innée. Votre karma est d'apprendre l'ancrage et la paix là où règnent l'anxiété et le désordre.",
      pro: "Enseignant spirituel, psychanalyste de fond, conseiller de gestion de patrimoine à long terme ou guérisseur spirituel. Votre seule présence calme les esprits.",
      relational: "Protecteur, calme et d'une infinie patience, vous êtes le roc sur lequel repose le couple. Vous offrez un amour stable et mûr, capable de guérir les blessures de votre partenaire."
    },
    {
      name: 'Revati', ruler: 'Mercure', deity: 'Pushan (Protecteur des Voyageurs)', sym: 'Poissons nageant',
      personal: "Le dernier voyage, la dissolution harmonieuse de l'ego. Vos forces subconscientes baignent dans l'amour inconditionnel et la reliance cosmique. Votre défi karmique est d'apprendre à poser des limites pour ne pas vous laisser dévorer.",
      pro: "Conseiller d'orientation d'âmes, artiste thérapeutique, protecteur des sans-voix (animaux, nature) ou accompagnateur en fin de vie. Votre empathie est votre plus grand outil.",
      relational: "D'un romantisme absolu et d'un dévouement sans bornes, vous cherchez la communion spirituelle et artistique avec votre partenaire, offrant une tendresse d'une pureté rare."
    }
  ];

  /* ─── Les 12 Bhavas (Maisons Védiques) ─── */
  var BHAVA_DATA = {
    1: { name: 'Tanu Bhava (1ère Maison)', keyword: 'Le Corps, le Soi, l\'Incarnation', desc: 'Représente votre constitution physique, votre vitalité générale, votre apparence et la manière dont vous projetez votre ego et votre personnalité dans le plan physique.' },
    2: { name: 'Dhana Bhava (2ème Maison)', keyword: 'La Richesse, la Famille, la Parole', desc: 'Gouverne vos ressources financières personnelles, vos valeurs morales, vos relations familiales précoces, vos habitudes alimentaires et votre force d\'expression orale.' },
    3: { name: 'Sahaja Bhava (3ème Maison)', keyword: 'Le Courage, la Volonté, les Talents', desc: 'Indique votre force de volonté, votre courage face aux défis, vos talents artistiques et manuels, vos frères et sœurs plus jeunes, et les courts voyages d\'études.' },
    4: { name: 'Bandhu Bhava (4ème Maison)', keyword: 'Le Foyer, la Mère, la Paix Mentale', desc: 'Représente votre foyer intérieur, votre mère, vos biens immobiliers et votre sentiment général de bonheur intime et de paix psychologique.' },
    5: { name: 'Putra Bhava (5ème Maison)', keyword: 'La Créativité, l\'Éducation, le Karma Passé', desc: 'Gouverne vos projets créatifs, vos enfants, vos études supérieures, vos romances et les mérites spirituels accumulés lors de vos vies antérieures (Purva Punya).' },
    6: { name: 'Ari Bhava (6ème Maison)', keyword: 'Les Obstacles, les Défis, le Service', desc: 'Concerne votre santé physique, les maladies, les conflits quotidiens, les dettes financières, les obstacles karmiques et votre attitude face au service désintéressé.' },
    7: { name: 'Yuvati Bhava (7ème Maison)', keyword: 'Le Couple, les Partenariats, l\'Autre', desc: 'Représente le mariage, votre partenaire de vie, les associations professionnelles d\'affaires, les interactions publiques et le miroir de votre propre psyché à travers autrui.' },
    8: { name: 'Randhra Bhava (8ème Maison)', keyword: 'La Transformation, les Secrets, l\'Ésotérisme', desc: 'Gouverne les crises initiatiques majeures, la longévité, l\'argent partagé (héritages), l\'intuition mystique profonde et la maîtrise des forces occultes ou ésotériques.' },
    9: { name: 'Dharma Bhava (9ème Maison)', keyword: 'Le Destin, la Sagesse, la Spiritualité', desc: 'Indique votre sens moral, votre philosophie de vie, votre foi spirituelle, vos enseignants spirituels (Gurus), votre père et votre chance globale dans l\'existence.' },
    10: { name: 'Karma Bhava (10ème Maison)', keyword: 'La Carrière, le Statut, la Réalisation', desc: 'Représente votre profession, votre statut social, votre renommée publique, l\'influence que vous exercez sur le monde et les actions concrètes que vous réalisez.' },
    11: { name: 'Labha Bhava (11ème Maison)', keyword: 'Les Gains, les Souhaits, les Réseaux', desc: 'Gouverne vos revenus supplémentaires, l\'accomplissement de vos désirs profonds, votre réseau d\'amis proches et votre contribution à des projets humanitaires collectifs.' },
    12: { name: 'Vyaya Bhava (12ème Maison)', keyword: 'La Libération, la Spiritualité, les Rêves', desc: 'Représente les dépenses, l\'isolement propice à la méditation (Moksha), le monde des rêves, les secrets enfouis et le voyage de l\'âme après la dissolution de l\'ego.' }
  };

  /* ─── Régents & Durées des Vimshottari Dashas ─── */
  var DASHA_RULERS = [
    { name: 'Ketu', duration: 7, sym: '☋', Graha: 'Ketu (Nœud Sud)', focus: "Phase de détachement, d'introspection spirituelle, de purification karmique et de libération des attachements matériels anciens." },
    { name: 'Vénus', duration: 20, sym: '♀', Graha: 'Shukra (Vénus)', focus: "Période d'expansion créative, de raffinement artistique, d'épanouissement relationnel, de confort matériel et de recherche de l'harmonie sacrée." },
    { name: 'Soleil', duration: 6, sym: '☉', Graha: 'Surya (Soleil)', focus: "Cycle d'affirmation du soi, de rayonnement public, de prise de responsabilités, de reconnexion à votre force vitale et à votre autorité intérieure." },
    { name: 'Lune', duration: 10, sym: '🌙', Graha: 'Chandra (Lune)', focus: "Phase de maturation émotionnelle, de développement de l'intuition, d'importance accrue du foyer, de la sensibilité et des forces maternelles." },
    { name: 'Mars', duration: 7, sym: '♂', Graha: 'Mangala (Mars)', focus: "Période d'action intense, de courage, de défis à surmonter, d'ambition professionnelle et de canalisation de la force de volonté." },
    { name: 'Rahu', duration: 18, sym: '☊', Graha: 'Rahu (Nœud Nord)', focus: "Cycle d'ambitions mondaines intenses, d'expériences novatrices ou inhabituelles, de désirs puissants et d'apprentissages à travers les illusions de la matière." },
    { name: 'Jupiter', duration: 16, sym: '♃', Graha: 'Guru (Jupiter)', focus: "Grande phase de sagesse, d'apprentissage supérieur, d'enseignement, de chance générale, d'optimisme philosophique et d'élévation spirituelle." },
    { name: 'Saturne', duration: 19, sym: '♄', Graha: 'Shani (Saturne)', focus: "Cycle de discipline rigoureuse, de patience, de restructuration à long terme, de liquidation des dettes karmiques et de consolidation par le travail." },
    { name: 'Mercure', duration: 17, sym: '☿', Graha: 'Budha (Mercure)', focus: "Période d'activité intellectuelle intense, de commerce, d'études approfondies, de communication écrite ou orale et d'adaptabilité mentale." }
  ];

  /* ─── Dictionnaire des Noms Planétaires ─── */
  var PLANET_INFOS = {
    'Soleil': { name: 'Surya (Soleil)', sym: '☉' },
    'Lune': { name: 'Chandra (Lune)', sym: '🌙' },
    'Mercure': { name: 'Budha (Mercure)', sym: '☿' },
    'Vénus': { name: 'Shukra (Vénus)', sym: '♀' },
    'Mars': { name: 'Mangala (Mars)', sym: '♂' },
    'Jupiter': { name: 'Guru (Jupiter)', sym: '♃' },
    'Saturne': { name: 'Shani (Saturne)', sym: '♄' },
    'Uranus': { name: 'Uranus (Rahu/Ketu-sub)', sym: '♅' },
    'Neptune': { name: 'Neptune (mystique)', sym: '♆' },
    'Pluton': { name: 'Pluton (alchimie)', sym: '♇' }
  };

  /* ─── Noms des signes védiques ─── */
  var SIGN_TRANSLATIONS = {
    'Bélier': 'Mesha',
    'Taureau': 'Vrishabha',
    'Gémeaux': 'Mithuna',
    'Cancer': 'Karka',
    'Lion': 'Simha',
    'Vierge': 'Kanya',
    'Balance': 'Tula',
    'Scorpion': 'Vrishchika',
    'Sagittaire': 'Dhanu',
    'Capricorne': 'Makara',
    'Verseau': 'Kumbha',
    'Poissons': 'Meena'
  };

  var SIGN_LIST_FR = ['Bélier', 'Taureau', 'Gémeaux', 'Cancer', 'Lion', 'Vierge', 'Balance', 'Scorpion', 'Sagittaire', 'Capricorne', 'Verseau', 'Poissons'];
  var SIGN_LIST_SYMS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

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
      N: function(d) { return 76.6806 + 2.46590e-5 * d; },
      i: function(d) { return 3.3946 + 2.75e-8 * d; },
      w: function(d) { return 54.8910 + 1.38374e-5 * d; },
      a: function(d) { return 0.723332; },
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
                     + 0.897 * Math.sin(S_rad - P_rad) 
                     + 0.602 * Math.sin(2 * S_rad - 2 * P_rad);
    lonecl_pluto = (lonecl_pluto + 360) % 360;
    
    var latecl_pluto = -16.143 + 14.865 * Math.sin(P_rad) 
                     + 14.900 * Math.cos(P_rad);
                     
    var lonecl_pluto_rad = lonecl_pluto * rad;
    var latecl_pluto_rad = latecl_pluto * rad;
    
    var xh_pluto = 39.5 * Math.cos(lonecl_pluto_rad) * Math.cos(latecl_pluto_rad);
    var yh_pluto = 39.5 * Math.sin(lonecl_pluto_rad) * Math.cos(latecl_pluto_rad);
    var zh_pluto = 39.5 * Math.sin(latecl_pluto_rad);
    
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

  function formatLonToSign(deg) {
    var d = Math.floor(deg % 30);
    var minFloat = (deg % 1) * 60;
    var m = Math.floor(minFloat);
    var sIdx = Math.floor(deg / 30);
    var sName = SIGN_LIST_FR[sIdx] || 'Bélier';
    return d + '° ' + (m < 10 ? '0' + m : m) + '\' ' + sName;
  }

  function formatAyanamsa(ayanamsa) {
    var deg = Math.floor(ayanamsa);
    var min = Math.floor((ayanamsa - deg) * 60);
    return deg + '° ' + (min < 10 ? '0' + min : min) + '\'';
  }

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

  /* ─── Rendu des Cards Lagna ─── */
  function renderLagnaCard(lagnaData, degVal) {
    var signPos = (degVal % 30).toFixed(1);

    return '<div class="at-result-card">'
      + '<div class="at-rc-header">'
        + '<span class="at-rc-sym" style="color:var(--violet); text-shadow:0 0 15px rgba(183,139,250,0.4);">' + lagnaData.sym + '</span>'
        + '<div class="at-rc-meta">'
          + '<h4 class="at-rc-name" style="color:var(--violet);">' + lagnaData.name + '</h4>'
          + '<span class="at-rc-dates">Ascendant Védique physique</span>'
        + '</div>'
      + '</div>'
      + '<div class="at-plans-section">'
        + '<div class="at-plan-item">'
          + '<h5 class="at-plan-title">🌱 Plan Personnel</h5>'
          + '<p class="at-rc-interp">' + lagnaData.personal + '</p>'
        + '</div>'
        + '<div class="at-plan-item">'
          + '<h5 class="at-plan-title">💼 Plan Professionnel</h5>'
          + '<p class="at-rc-interp">' + lagnaData.pro + '</p>'
        + '</div>'
        + '<div class="at-plan-item">'
          + '<h5 class="at-plan-title">💖 Plan Relationnel</h5>'
          + '<p class="at-rc-interp">' + lagnaData.relational + '</p>'
        + '</div>'
      + '</div>'
      + '<div class="at-rc-footer" style="border-top:1px solid rgba(255,255,255,0.05); padding-top:0.8rem; margin-top:1rem;">'
        + '<span class="at-rc-deg">Position : ' + signPos + '° ' + lagnaData.name.split(' ')[0] + ' (' + degVal.toFixed(2) + '° total)</span>'
        + '<span class="at-decan-badge" style="border-color:rgba(183,139,250,0.25); background:rgba(183,139,250,0.06); color:var(--violet);">Graha : ' + lagnaData.ruler + '</span>'
      + '</div>'
      + '</div>';
  }

  /* ─── Rendu des Cards Nakshatra de Naissance ─── */
  function renderNakshatraCard(nak, degVal) {
    var rawDeg = degVal % (360.0 / 27.0);
    var pada = Math.floor(rawDeg / (360.0 / 108.0)) + 1; // 4 Padas par Nakshatra

    return '<div class="at-result-card" style="border-color:rgba(223,178,108,0.2); background:rgba(255,255,255,0.02);">'
      + '<div class="at-rc-header">'
        + '<span class="at-rc-sym" style="color:var(--gold); text-shadow:0 0 15px rgba(223,178,108,0.35);">🌙</span>'
        + '<div class="at-rc-meta">'
          + '<h4 class="at-rc-name" style="color:var(--gold);">' + nak.name + '</h4>'
          + '<span class="at-rc-dates">Demeure Lunaire de Naissance</span>'
        + '</div>'
      + '</div>'
      + '<div class="at-plans-section">'
        + '<div class="at-plan-item at-plan-item--gold">'
          + '<h5 class="at-plan-title">🌌 Plan Karmique</h5>'
          + '<p class="at-rc-interp"><strong>Trame Karmique :</strong> ' + nak.personal + '</p>'
        + '</div>'
        + '<div class="at-plan-item at-plan-item--gold">'
          + '<h5 class="at-plan-title">💼 Dons &amp; Action</h5>'
          + '<p class="at-rc-interp"><strong>Talents Professionnels :</strong> ' + nak.pro + '</p>'
        + '</div>'
        + '<div class="at-plan-item at-plan-item--gold">'
          + '<h5 class="at-plan-title">💖 Relation &amp; Défis</h5>'
          + '<p class="at-rc-interp"><strong>Défis Affectifs :</strong> ' + nak.relational + '</p>'
        + '</div>'
      + '</div>'
      + '<div class="at-rc-footer" style="border-top:1px solid rgba(255,255,255,0.05); padding-top:0.8rem; margin-top:1rem;">'
        + '<span class="at-rc-deg">Position : ' + formatNakshatraDeg(degVal) + ' (Pada ' + pada + ')</span>'
        + '<span class="at-decan-badge">Devata : ' + nak.deity + '</span>'
        + '<span class="at-decan-badge" style="border-color:rgba(223,178,108,0.25); background:rgba(223,178,108,0.06); color:var(--gold);">Gouverneur : ' + nak.ruler + '</span>'
      + '</div>'
      + '</div>';
  }

  /* ─── Rendu de la Ligne Temporelle Vimshottari Dasha ─── */
  function renderDashaTimeline(moonDeg, birthDate) {
    var rawIdx = moonDeg / (360.0 / 27.0);
    var nakIdx = Math.floor(rawIdx % 27);
    var startLon = nakIdx * (360.0 / 27.0);
    
    // Fraction du Nakshatra parcourue
    var fraction = (moonDeg - startLon) / (360.0 / 27.0);
    if (fraction < 0) fraction = 0;
    if (fraction > 1) fraction = 1;
    
    var birthRulerIdx = nakIdx % 9;
    var birthRuler = DASHA_RULERS[birthRulerIdx];
    var firstDashaRemaining = (1 - fraction) * birthRuler.duration;
    
    var timelineHtml = '<div class="at-dasha-timeline">';
    var currentDate = new Date(birthDate.getTime());
    var nowMs = new Date().getTime();
    
    for (var i = 0; i < 9; i++) {
      var rIdx = (birthRulerIdx + i) % 9;
      var ruler = DASHA_RULERS[rIdx];
      var dDuration = (i === 0) ? firstDashaRemaining : ruler.duration;
      
      var startDateStr = currentDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      var startMs = currentDate.getTime();
      
      // Ajout de la durée de la Dasha en millisecondes
      currentDate.setTime(currentDate.getTime() + dDuration * 365.25 * 24 * 60 * 60 * 1000);
      var endDateStr = currentDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      var endMs = currentDate.getTime();
      
      var isActive = (nowMs >= startMs && nowMs < endMs);
      var isPast = (nowMs >= endMs);
      
      var statusClass = '';
      var badgeHtml = '';
      if (isActive) {
        statusClass = 'active';
        badgeHtml = '<span class="at-dasha-status-badge active-dasha">Cycle Actuel ⚡</span>';
      } else if (isPast) {
        statusClass = 'past';
        badgeHtml = '<span class="at-dasha-status-badge past-dasha">Cycle Passé ✓</span>';
      } else {
        statusClass = 'future';
        badgeHtml = '<span class="at-dasha-status-badge future-dasha">Cycle Futur ⏳</span>';
      }
      
      timelineHtml += '<div class="at-dasha-item ' + statusClass + '">'
        + '<div class="at-dasha-marker">' + ruler.sym + '</div>'
        + '<div class="at-dasha-content">'
          + '<div class="at-dasha-header">'
            + '<h4 class="at-dasha-title">' + ruler.Graha + ' ' + badgeHtml + '</h4>'
            + '<span class="at-dasha-dates">Du ' + startDateStr + ' au ' + endDateStr + ' (' + dDuration.toFixed(1) + ' ans)</span>'
          + '</div>'
          + '<p class="at-dasha-desc">' + ruler.focus + '</p>'
        + '</div>'
        + '</div>';
    }
    
    timelineHtml += '</div>';
    return timelineHtml;
  }

  /* ─── Mapping Lagna → planète régente & Purushartha ─── */
  var SIGN_RULER_PLANET = {
    'Bélier':'Mars','Taureau':'Vénus','Gémeaux':'Mercure','Cancer':'Lune','Lion':'Soleil',
    'Vierge':'Mercure','Balance':'Vénus','Scorpion':'Mars','Sagittaire':'Jupiter',
    'Capricorne':'Saturne','Verseau':'Saturne','Poissons':'Jupiter'
  };
  var SIGN_RULER_LABEL = {
    'Bélier':'Mars (Mangala)','Taureau':'Vénus (Shukra)','Gémeaux':'Mercure (Budha)',
    'Cancer':'Lune (Chandra)','Lion':'Soleil (Surya)','Vierge':'Mercure (Budha)',
    'Balance':'Vénus (Shukra)','Scorpion':'Mars (Mangala)','Sagittaire':'Jupiter (Guru)',
    'Capricorne':'Saturne (Shani)','Verseau':'Saturne (Shani) & Rahu','Poissons':'Jupiter (Guru) & Ketu'
  };
  var ELEMENT_NATURAL_PURU = { 'Feu':'dharma', 'Terre':'artha', 'Air':'kama', 'Eau':'moksha' };
  var PURU_DEFS = {
    dharma: { name:'Dharma', label:'Vocation éthique & Mission', sym:'🌟', color:'var(--gold)',
      desc:'l\'accomplissement de votre vocation éthique, de votre mission d\'âme et de votre rayonnement spirituel dans le monde',
      houses:[1,5,9] },
    artha:  { name:'Artha',  label:'Prospérité & Structure',     sym:'🏛️', color:'var(--emerald)',
      desc:'la construction de ressources durables, de structures solides et d\'une sécurité matérielle maîtrisée',
      houses:[2,6,10] },
    kama:   { name:'Kama',   label:'Désirs & Liens',             sym:'💫', color:'var(--rose)',
      desc:'l\'épanouissement de vos désirs légitimes, de vos plaisirs profonds et de la richesse de vos liens relationnels',
      houses:[3,7,11] },
    moksha: { name:'Moksha', label:'Libération & Transcendance', sym:'🌊', color:'var(--violet)',
      desc:'la libération progressive des attachements, la transcendance de l\'ego et le retour à l\'unité spirituelle',
      houses:[4,8,12] }
  };
  var BHAVA_KW = { 1:'Soi',2:'Richesse',3:'Talents',4:'Foyer',5:'Créativité',6:'Défis',7:'Union',8:'Transformation',9:'Sagesse',10:'Carrière',11:'Gains',12:'Libération' };

  /* ─── Génération du bloc Fondements personnalisé ─── */
  function generateFondementsPersonnalises(lagnaData, moonNak, ascName, siderealAscDeg, moonDeg, planetLons) {
    var moonSignIdx  = Math.floor(moonDeg / 30);
    var moonSignFr   = SIGN_LIST_FR[moonSignIdx] || 'Bélier';
    var moonSignVed  = SIGN_TRANSLATIONS[moonSignFr] || moonSignFr;
    var lagnaRulerLabel = SIGN_RULER_LABEL[ascName] || lagnaData.ruler;
    var rulerPlanetKey  = SIGN_RULER_PLANET[ascName];
    var rulerLon = (rulerPlanetKey && planetLons[rulerPlanetKey] !== undefined) ? planetLons[rulerPlanetKey] : null;
    var rulerHouse = rulerLon !== null ? Math.floor(((rulerLon - siderealAscDeg + 360) % 360) / 30) + 1 : null;

    // Comptage des Purusharthas
    var summaryPlanets = ['Soleil','Lune','Mercure','Vénus','Mars','Jupiter','Saturne'];
    var puruCount = { dharma:0, artha:0, kama:0, moksha:0 };
    var activatedHouses = [];
    for (var k = 0; k < summaryPlanets.length; k++) {
      var pLon = planetLons[summaryPlanets[k]];
      var h = Math.floor(((pLon - siderealAscDeg + 360) % 360) / 30) + 1;
      if (activatedHouses.indexOf(h) === -1) activatedHouses.push(h);
      var pKeys = Object.keys(PURU_DEFS);
      for (var pi = 0; pi < pKeys.length; pi++) {
        if (PURU_DEFS[pKeys[pi]].houses.indexOf(h) !== -1) { puruCount[pKeys[pi]]++; break; }
      }
    }
    activatedHouses.sort(function(a,b){return a-b;});

    var dominantPuru = 'dharma';
    var maxCount = -1;
    var pKeyList = Object.keys(puruCount);
    for (var i = 0; i < pKeyList.length; i++) {
      if (puruCount[pKeyList[i]] > maxCount) { maxCount = puruCount[pKeyList[i]]; dominantPuru = pKeyList[i]; }
    }
    var naturalPuru = ELEMENT_NATURAL_PURU[lagnaData.element] || 'dharma';
    var pDef = PURU_DEFS[dominantPuru];
    var pAligned = (dominantPuru === naturalPuru);

    var activatedStr = activatedHouses.map(function(h){
      return 'Maison ' + h + ' (' + (BHAVA_KW[h] || '') + ')';
    }).join(', ');

    var rulerHouseStr = rulerHouse
      ? 'Votre Graha régent <strong>' + lagnaRulerLabel + '</strong> occupe la <strong>Maison ' + rulerHouse + ' (' + (BHAVA_DATA[rulerHouse] ? BHAVA_DATA[rulerHouse].keyword.split(',')[0] : BHAVA_KW[rulerHouse] || '') + ')</strong>, concentrant son énergie dans ce domaine d\'expérience.'
      : 'Votre Graha régent <strong>' + lagnaRulerLabel + '</strong> est le maître de votre incarnation.';

    var pNuance = pAligned
      ? 'Votre nature de <strong>' + lagnaData.element + '</strong> et la distribution planétaire convergent dans le même registre, créant une force directrice exceptionnellement cohérente dans votre thème.'
      : 'Votre nature de <strong>' + lagnaData.element + '</strong> vous oriente naturellement vers le <strong>' + PURU_DEFS[naturalPuru].name + '</strong>, mais vos planètes dans les maisons de <strong>' + pDef.name + '</strong> créent une tension créatrice qui enrichit et complexifie votre parcours d\'âme en combinant ces deux orientations.';

    return '<div class="at-result-card" style="border-color:rgba(183,139,250,0.2);">'
      + '<div class="at-rc-header">'
        + '<span class="at-rc-sym" style="color:var(--violet);">🕉️</span>'
        + '<div class="at-rc-meta">'
          + '<h4 class="at-rc-name" style="color:var(--violet);">Votre Cartographie Karmique</h4>'
          + '<span class="at-rc-dates">' + lagnaData.name + ' · Nakshatra ' + moonNak.name + ' · Élément ' + lagnaData.element + '</span>'
        + '</div>'
      + '</div>'
      + '<div class="at-plans-section">'
        + '<div class="at-plan-item">'
          + '<h5 class="at-plan-title">🌱 Plan Personnel — Trame de l\'Âme</h5>'
          + '<p class="at-rc-interp">Votre Lagna <strong>' + lagnaData.name + '</strong> (élément <strong>' + lagnaData.element + '</strong>) ancre cette incarnation dans la mission suivante : ' + lagnaData.personal + ' Au niveau subconscient, votre Nakshatra natal <strong>' + moonNak.name + '</strong> — sous la tutelle de <strong>' + moonNak.deity + '</strong> et gouverné par <strong>' + moonNak.ruler + '</strong> — inscrit dans votre mémoire karmique (Prarabdha) : ' + moonNak.personal + '</p>'
        + '</div>'
        + '<div class="at-plan-item">'
          + '<h5 class="at-plan-title">💼 Plan Professionnel — Grahas, Rashis & Dharma</h5>'
          + '<p class="at-rc-interp">' + rulerHouseStr + ' Votre Rashi ascendant est <strong>' + (SIGN_TRANSLATIONS[ascName] || ascName) + ' (' + ascName + ')</strong> — l\'environnement sidéral à travers lequel votre énergie d\'incarnation s\'exprime. La Lune évolue dans le Rashi <strong>' + moonSignVed + ' (' + moonSignFr + ')</strong>, colorant votre réceptivité mentale (Manas) d\'une teinte ' + moonSignFr + '. ' + lagnaData.pro + '</p>'
        + '</div>'
        + '<div class="at-plan-item">'
          + '<h5 class="at-plan-title">💖 Plan Relationnel — Purushartha & Destinée</h5>'
          + '<p class="at-rc-interp">Vos planètes activent principalement les ' + activatedStr + ', révélant un Purushartha dominant de <strong>' + pDef.sym + ' ' + pDef.name + ' (' + pDef.label + ')</strong> — une vie orientée vers ' + pDef.desc + '. ' + pNuance + ' Sur le plan affectif : ' + lagnaData.relational + '</p>'
        + '</div>'
      + '</div>'
      + '</div>';
  }

  /* ─── Génération du bloc Nakshatras personnalisé ─── */
  function generateNakshatrasPersonnalise(moonNak, moonDeg) {
    var rawDeg = moonDeg % (360.0 / 27.0);
    var pada = Math.floor(rawDeg / (360.0 / 108.0)) + 1;
    var padaSigns = ['Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire','Capricorne','Verseau','Poissons'];
    var nakIdx = Math.floor(moonDeg / (360.0 / 27.0)) % 27;
    var padaSignIdx = (nakIdx * 4 + (pada - 1)) % 12;
    var padaSignFr = padaSigns[padaSignIdx];

    return '<div class="at-result-card" style="border-color:rgba(223,178,108,0.2); background:rgba(255,255,255,0.02);">'
      + '<div class="at-rc-header">'
        + '<span class="at-rc-sym" style="color:var(--gold);">🌙</span>'
        + '<div class="at-rc-meta">'
          + '<h4 class="at-rc-name" style="color:var(--gold);">Votre Nakshatra ' + moonNak.name + ' — Demeure Lunaire</h4>'
          + '<span class="at-rc-dates">Devata : ' + moonNak.deity + ' · Graha : ' + moonNak.ruler + ' · Pada ' + pada + ' (' + (SIGN_TRANSLATIONS[padaSignFr] || padaSignFr) + '/' + padaSignFr + ')</span>'
        + '</div>'
      + '</div>'
      + '<div class="at-plans-section">'
        + '<div class="at-plan-item at-plan-item--gold">'
          + '<h5 class="at-plan-title">🌌 Trame Karmique (Prarabdha)</h5>'
          + '<p class="at-rc-interp">La divinité <strong>' + moonNak.deity + '</strong> régit la nature spirituelle de vos dons subconscients. Le Graha planétaire <strong>' + moonNak.ruler + '</strong> module la dynamique psychologique de votre Lune et insuffle à votre Manas (mental) sa couleur distinctive. <strong>Votre trame :</strong> ' + moonNak.personal + '</p>'
        + '</div>'
        + '<div class="at-plan-item at-plan-item--gold">'
          + '<h5 class="at-plan-title">💼 Dons, Talents & Action Juste</h5>'
          + '<p class="at-rc-interp">Votre Nakshatra <strong>' + moonNak.name + '</strong>, symbolisé par <strong>' + moonNak.sym + '</strong>, oriente vos dons naturels vers un champ d\'action privilégié. ' + moonNak.pro + '</p>'
        + '</div>'
        + '<div class="at-plan-item at-plan-item--gold">'
          + '<h5 class="at-plan-title">💖 Vie Affective & Défis Karmiques</h5>'
          + '<p class="at-rc-interp">Votre Pada ' + pada + ' vous connecte à l\'énergie sous-jacente du signe <strong>' + (SIGN_TRANSLATIONS[padaSignFr] || padaSignFr) + ' (' + padaSignFr + ')</strong>, nuançant l\'expression de votre Nakshatra dans la sphère affective. ' + moonNak.relational + '</p>'
        + '</div>'
      + '</div>'
      + '</div>';
  }

  /* ─── Données d'interprétation par planète dans chaque maison ─── */
  var PLANET_IN_HOUSE = {
    'Soleil': {
      1: "le Soleil en Maison 1 sculpte une personnalité solaire, volontaire et rayonnante, avec un fort besoin de briller et d'affirmer son identité propre",
      2: "le Soleil en Maison 2 oriente votre force vitale vers la construction de ressources durables et une parole qui porte autorité",
      3: "le Soleil en Maison 3 insuffle un courage d'initiative remarquable et une confiance naturelle dans vos prises de parole et vos entreprises",
      4: "le Soleil en Maison 4 place le cœur de votre être dans le foyer familial — votre ancrage intérieur est votre vrai trône",
      5: "le Soleil en Maison 5 enflamme votre créativité affective et vous destine à briller dans les jeux de la séduction et de l'expression artistique",
      6: "le Soleil en Maison 6 vous confère une endurance au service mais peut exposer à des luttes d'égo dans l'environnement professionnel quotidien",
      7: "le Soleil en Maison 7 attire des partenaires à forte personnalité et place le miroir de l'autre au centre de votre épanouissement",
      8: "le Soleil en Maison 8 vous dote d'une puissance régénératrice profonde, mais exige de traverser des épreuves initiatiques pour la manifester",
      9: "le Soleil en Maison 9 vous destine à un rôle de guide philosophique ou spirituel, portant une vision lumineuse du sens de l'existence",
      10: "le Soleil en Maison 10 est un placement de haute visibilité publique — votre vocation est d'incarner l'autorité et de laisser une marque durable",
      11: "le Soleil en Maison 11 vous connecte à des cercles d'influence, portant votre énergie solaire vers des projets collectifs d'envergure",
      12: "le Soleil en Maison 12 oriente une part de votre lumière vers le retrait et la réalisation spirituelle silencieuse plutôt que vers la gloire publique"
    },
    'Lune': {
      1: "la Lune en Maison 1 vous donne un tempérament émotif, réceptif et changeant, avec une empathie naturelle qui se lit sur votre visage",
      2: "la Lune en Maison 2 crée une relation fluctuante à la sécurité matérielle — les finances et la nourriture deviennent des sources de réconfort émotionnel",
      3: "la Lune en Maison 3 stimule une communication intuitive et une mémoire émotionnelle riche, souvent liée à une relation forte avec la fratrie",
      4: "la Lune en Maison 4, son domicile naturel, intensifie le besoin de foyer sécurisant et de racines affectives solides comme pierre angulaire de votre équilibre",
      5: "la Lune en Maison 5 nourrit une créativité sentimentale débordante et un amour instinctif pour les enfants, l'art et les émotions de la romance",
      6: "la Lune en Maison 6 lie votre équilibre émotionnel à votre santé quotidienne et au soin que vous portez à vos responsabilités de service",
      7: "la Lune en Maison 7 recherche une union nourricière et protectrice, cherchant à fusionner émotionnellement avec l'être aimé pour trouver sa paix",
      8: "la Lune en Maison 8 amplifie votre monde subconscient et votre radar émotionnel, vous rendant particulièrement sensible aux courants invisibles",
      9: "la Lune en Maison 9 instille une foi intuitive profonde et un besoin émotionnel de sens philosophique ou de connexion spirituelle",
      10: "la Lune en Maison 10 colore votre carrière d'une dimension de soin et de service public, attirant les rôles nourriciers ou liés à la communauté",
      11: "la Lune en Maison 11 crée des liens affectifs forts avec vos cercles d'amis et alimente vos rêves collectifs d'une énergie émotionnelle sincère",
      12: "la Lune en Maison 12 intensifie votre vie intérieure et vos rêves nocturnes, révélant une mémoire karmique subconsciente très active"
    },
    'Mercure': {
      1: "Mercure en Maison 1 forge un esprit curieux, agile et communicatif — votre intelligence rapide est votre premier outil d'incarnation",
      2: "Mercure en Maison 2 affine votre sens du commerce, des négociations et de la valeur des mots pour générer des ressources",
      3: "Mercure en Maison 3, en son domicile naturel, multiplie vos aptitudes de communication, vos relations fraternelles et vos projets intellectuels",
      4: "Mercure en Maison 4 crée un foyer riche en échanges intellectuels et une relation mentale profonde avec vos origines familiales",
      5: "Mercure en Maison 5 nourrit des créations à fort contenu intellectuel — écriture, jeux de l'esprit, enseignement créatif et séduction par l'humour",
      6: "Mercure en Maison 6 vous incline vers des métiers d'analyse fine, de diagnostic ou de service méthodique exigeant précision et adaptabilité",
      7: "Mercure en Maison 7 attire des partenaires intellectuellement stimulants et place la communication au cœur de la réussite relationnelle",
      8: "Mercure en Maison 8 aiguise votre pénétration psychologique et votre capacité d'enquête sur les sujets occultés ou complexes",
      9: "Mercure en Maison 9 vous oriente vers l'enseignement supérieur, la philosophie, l'écriture de voyage ou la diffusion d'idées à grande échelle",
      10: "Mercure en Maison 10 favorise une carrière dans la communication, les médias, le conseil ou toute activité où la maîtrise du langage crée du prestige",
      11: "Mercure en Maison 11 vous rend excellent dans le maillage de réseaux intellectuels et l'organisation de projets collectifs innovants",
      12: "Mercure en Maison 12 oriente votre intelligence vers la recherche secrète, l'écriture méditative ou les études dans la solitude"
    },
    'Vénus': {
      1: "Vénus en Maison 1 vous confère un magnétisme naturel, un sens aigu de l'esthétique et une capacité à attirer la beauté et l'harmonie dans votre vie",
      2: "Vénus en Maison 2 favorise une relation harmonieuse avec l'abondance matérielle, les arts appliqués et le goût du beau comme vecteur de prospérité",
      3: "Vénus en Maison 3 rend vos communications douces et persuasives, vous dotant d'un talent naturel pour les arts oraux, l'écriture élégante et la diplomatie",
      4: "Vénus en Maison 4 crée un foyer de beauté et d'harmonie, avec un attachement profond aux plaisirs domestiques et à la douceur des origines",
      5: "Vénus en Maison 5, son domicile d'exaltation, sublime votre vie amoureuse, votre créativité artistique et votre capacité à séduire avec grâce",
      6: "Vénus en Maison 6 adoucit les obstacles du quotidien et vous attire vers des professions de soins esthétiques, thérapeutiques ou de service harmonieux",
      7: "Vénus en Maison 7, son autre domicile, est un placement béni pour les unions — vous attirez des partenaires raffinés et cherchez une harmonie idéale",
      8: "Vénus en Maison 8 intensifie vos passions amoureuses et votre attrait pour la profondeur ésotérique des émotions cachées et des unions transformatrices",
      9: "Vénus en Maison 9 marie beauté et sagesse — votre idéal amoureux est teinté de philosophie, de voyages et de partage d'idéaux spirituels",
      10: "Vénus en Maison 10 ouvre la voie vers une carrière dans les arts, la mode, le design ou les relations publiques, où votre charme naturel est une ressource",
      11: "Vénus en Maison 11 favorise des amitiés riches et durables, des gains issus de projets artistiques collectifs et une vie sociale épanouissante",
      12: "Vénus en Maison 12 crée des amours secrètes ou karmiques, et un attachement profond à la solitude créatrice ou à la dévotion spirituelle"
    },
    'Mars': {
      1: "Mars en Maison 1 forge une personnalité combative, dynamique et pionnière — vous avez une énergie vitale intense et un tempérament qui s'impose naturellement",
      2: "Mars en Maison 2 vous pousse à conquérir activement vos ressources, mais crée aussi des conflits autour de l'argent ou de l'appropriation des biens",
      3: "Mars en Maison 3 vous rend courageux dans vos prises de position et très actif dans vos projets de communication, parfois avec une franchise tranchante",
      4: "Mars en Maison 4 peut créer des tensions dans le foyer familial, mais aussi une grande force de volonté pour protéger et reconstruire vos racines",
      5: "Mars en Maison 5 enflamme vos amours d'une passion ardente et votre créativité d'une énergie débordante qui peut aller jusqu'à la compétition artistique",
      6: "Mars en Maison 6 vous arme d'une combativité précieuse face aux obstacles quotidiens — vous excellez dans les rôles exigeant endurance et résolution de conflits",
      7: "Mars en Maison 7 attire des partenaires forts ou conflictuels et demande un apprentissage de la négociation pour éviter de transformer l'union en lutte de pouvoir",
      8: "Mars en Maison 8 décuple votre force de transformation et votre capacité à renaître des crises avec une puissance régénératrice remarquable",
      9: "Mars en Maison 9 alimente votre quête philosophique d'une passion militante — vous défendez vos convictions avec ardeur et ne cédez jamais sur vos idéaux",
      10: "Mars en Maison 10 indique une carrière dynamique où l'action, le leadership et la compétition sont des moteurs — vous visez le sommet avec détermination",
      11: "Mars en Maison 11 met votre énergie au service de causes collectives et de la réalisation active de vos ambitions à long terme",
      12: "Mars en Maison 12 refoule l'énergie martiale vers des combats intérieurs ou des actions discrètes, parfois dans des contextes isolés ou confidentiels"
    },
    'Jupiter': {
      1: "Jupiter en Maison 1 offre un placement béni — expansion naturelle, optimisme contagieux et une tendance à attirer la chance dans votre champ d'action",
      2: "Jupiter en Maison 2 est un signe de prospérité financière et de générosité — vos ressources ont tendance à croître via la sagesse et la philosophie appliquée",
      3: "Jupiter en Maison 3 enrichit votre pensée de perspectives larges et votre communication d'une sagesse qui inspire et élève ceux qui vous entourent",
      4: "Jupiter en Maison 4 bénit le foyer, la relation avec la mère et les fondations psychologiques d'un sentiment d'expansion et de protection intérieure",
      5: "Jupiter en Maison 5 multiplie les bénédictions créatives — succès dans les projets artistiques, des relations amoureuses enrichissantes et une grande joie de vivre",
      6: "Jupiter en Maison 6 vous confère une grande résilience face aux obstacles et une capacité à transformer les défis quotidiens en sources de croissance",
      7: "Jupiter en Maison 7 attire des unions riches et expansives avec des partenaires sages, philosophes ou aux vastes horizons culturels",
      8: "Jupiter en Maison 8 transforme les crises en croissances spirituelles profondes et peut indiquer des héritages ou des ressources cachées importantes",
      9: "Jupiter en Maison 9, son domicile naturel, exalte votre vocation philosophique, spirituelle ou d'enseignement supérieur à son maximum d'expression",
      10: "Jupiter en Maison 10 est un placement classique de succès professionnel, de reconnaissance publique et d'ascension vers des positions d'autorité et de leadership",
      11: "Jupiter en Maison 11 est très favorable à la réalisation de vos désirs profonds et à l'expansion de votre cercle d'influence et de vos revenus",
      12: "Jupiter en Maison 12 indique une protection karmique invisible et un chemin de croissance spirituelle à travers la retraite, la méditation ou le service désintéressé"
    },
    'Saturne': {
      1: "Saturne en Maison 1 forge un caractère sérieux, responsable et déterminé, mais peut créer un sentiment de fardeau physique ou de maturité imposée très jeune",
      2: "Saturne en Maison 2 exige patience et discipline pour bâtir une sécurité financière solide — les ressources arrivent lentement mais durablement",
      3: "Saturne en Maison 3 structure votre communication en profondeur — vous parlez peu mais de manière précise, sérieuse et avec une autorité croissante",
      4: "Saturne en Maison 4 peut indiquer un foyer marqué par la responsabilité ou la distance émotionnelle, mais offre aussi une ancre intérieure d'une solidité rare",
      5: "Saturne en Maison 5 tempère les élans créatifs et amoureux par la discipline — les dons artistiques et sentimentaux s'expriment avec le temps et la maturité",
      6: "Saturne en Maison 6 vous dote d'une méthode de travail rigoureuse et d'une endurance face aux obstacles quotidiens qui vous permet de bâtir sur la durée",
      7: "Saturne en Maison 7 indique des unions qui se construisent dans le temps, souvent avec des partenaires plus âgés ou très structurés, demandant patience et engagement",
      8: "Saturne en Maison 8 intensifie le karme des transformations et exige un travail profond de restructuration intérieure à chaque crise majeure de la vie",
      9: "Saturne en Maison 9 crée une foi philosophique sévère et rigoureuse, forgée par l'expérience et l'épreuve plutôt que par la grâce naturelle",
      10: "Saturne en Maison 10, son domicile naturel, est le placement du bâtisseur patient — la carrière s'élève lentement mais solidement vers des sommets durables",
      11: "Saturne en Maison 11 structure vos ambitions collectives et vos réseaux avec sérieux — les gains arrivent tardivement mais de manière fiable et durable",
      12: "Saturne en Maison 12 crée un sentiment de solitude karmique qui pousse vers la maîtrise spirituelle intérieure et la libération des attachements anciens"
    }
  };

  /* ─── Génération du résumé personnalisé des Bhavas ─── */
  function generateBhavasSummary(lagnaDeg, planetLons) {
    var summaryPlanets = ['Soleil', 'Lune', 'Mercure', 'Vénus', 'Mars', 'Jupiter', 'Saturne'];
    var housePlanets = {};
    for (var h = 1; h <= 12; h++) housePlanets[h] = [];

    for (var k = 0; k < summaryPlanets.length; k++) {
      var pName = summaryPlanets[k];
      var pLon = planetLons[pName];
      var house = Math.floor(((pLon - lagnaDeg + 360) % 360) / 30) + 1;
      housePlanets[house].push(pName);
    }

    function buildPlan(houseNums, titleIcon, titleLabel, fallback) {
      var sentences = [];
      for (var i = 0; i < houseNums.length; i++) {
        var h = houseNums[i];
        var planets = housePlanets[h];
        for (var j = 0; j < planets.length; j++) {
          var pName = planets[j];
          var interp = PLANET_IN_HOUSE[pName] && PLANET_IN_HOUSE[pName][h];
          if (interp) sentences.push(interp.charAt(0).toUpperCase() + interp.slice(1) + '.');
        }
      }
      var content = sentences.length > 0
        ? sentences.join(' ')
        : fallback;

      return '<div class="at-plan-item">'
        + '<h5 class="at-plan-title">' + titleIcon + ' ' + titleLabel + '</h5>'
        + '<p class="at-rc-interp">' + content + '</p>'
        + '</div>';
    }

    var personal = buildPlan(
      [1, 4, 8, 12],
      '🌱', 'Plan Personnel',
      "Aucune des planètes principales n'occupe directement vos maisons de vie personnelle (1, 4, 8, 12). Cela renforce l'importance de votre Lagna et de votre Nakshatra lunaire comme axes fondateurs de votre identité incarnée."
    );

    var pro = buildPlan(
      [2, 3, 6, 10, 11],
      '💼', 'Plan Professionnel',
      "Vos maisons de carrière et de ressources (2, 3, 6, 10, 11) ne sont pas directement occupées par les planètes principales. La trajectoire professionnelle s'exprime alors principalement à travers l'énergie du Lagna et les cycles Dasha actifs."
    );

    var relational = buildPlan(
      [5, 7, 9],
      '💖', 'Plan Relationnel',
      "Vos maisons des unions et de la romance (5, 7, 9) ne contiennent pas de planètes majeures en transit natal. L'épanouissement relationnel passe davantage par la qualité de votre Lagna et les influences de Vénus et de la Lune dans votre thème global."
    );

    return '<div class="at-bhavas-summary">'
      + '<div class="at-plans-section">'
      + personal + pro + relational
      + '</div>'
      + '</div>';
  }

  /* ─── Rendu des 12 Bhavas (Maisons) ─── */
  function renderBhavas(lagnaDeg, planetLons) {
    var html = '<div class="at-bhavas-grid">';
    
    // Position des planètes triées par maison
    var housePlanets = {};
    for (var h = 1; h <= 12; h++) {
      housePlanets[h] = [];
    }
    
    var planetsOrder = ['Soleil', 'Lune', 'Mercure', 'Vénus', 'Mars', 'Jupiter', 'Saturne', 'Uranus', 'Neptune', 'Pluton'];
    for (var k = 0; k < planetsOrder.length; k++) {
      var pName = planetsOrder[k];
      var pLon = planetLons[pName];
      var house = Math.floor(((pLon - lagnaDeg + 360) % 360) / 30) + 1;
      var pInfo = PLANET_INFOS[pName];
      var signIdx = Math.floor(pLon / 30);
      var signName = SIGN_TRANSLATIONS[SIGN_LIST_FR[signIdx]];
      housePlanets[house].push({
        name: pInfo.name,
        sym: pInfo.sym,
        deg: (pLon % 30).toFixed(1) + '° ' + signName
      });
    }
    
    for (var houseNum = 1; houseNum <= 12; houseNum++) {
      var houseData = BHAVA_DATA[houseNum];
      var planetsInHouse = housePlanets[houseNum];
      var planetsHtml = '';
      
      if (planetsInHouse.length === 0) {
        planetsHtml = '<p class="at-bhava-no-planets">Aucun corps céleste majeur dans ce Bhava</p>';
      } else {
        planetsHtml = '<div class="at-bhava-planets-list">';
        for (var p = 0; p < planetsInHouse.length; p++) {
          var pl = planetsInHouse[p];
          planetsHtml += '<span class="at-bhava-planet-tag" title="' + pl.name + '">'
            + '<span class="at-pt-sym">' + pl.sym + '</span> ' + pl.name.split(' ')[0] + ' (' + pl.deg + ')'
            + '</span>';
        }
        planetsHtml += '</div>';
      }
      
      html += '<div class="at-bhava-card">'
        + '<div class="at-bhava-header">'
          + '<span class="at-bhava-num">' + houseNum + '</span>'
          + '<div class="at-bhava-meta">'
            + '<h4 class="at-bhava-name">' + houseData.name + '</h4>'
            + '<span class="at-bhava-kw">' + houseData.keyword + '</span>'
          + '</div>'
        + '</div>'
        + '<p class="at-bhava-desc">' + houseData.desc + '</p>'
        + '<div class="at-bhava-occupants">'
          + '<span class="at-bo-label">Planètes présentes :</span>'
          + planetsHtml
        + '</div>'
        + '</div>';
    }
    
    html += '</div>';
    return html;
  }

  /* ─── Initialisation ─── */
  function init() {
    var form = document.getElementById('at-form');
    if (!form || form.dataset.init) return;
    form.dataset.init = '1';

    var villeEl   = document.getElementById('at-ville');
    var customDiv = document.getElementById('at-custom-coords');
    var tzField   = document.getElementById('at-tz-offset');

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

    // Toggle déroulant des 12 Bhavas
    var bhavasBtn = document.getElementById('atToggleBhavasBtn');
    var bhavasDetails = document.getElementById('atBhavasDetails');
    if (bhavasBtn && bhavasDetails) {
      bhavasBtn.addEventListener('click', function () {
        var isHidden = bhavasDetails.style.display === 'none';
        bhavasDetails.style.display = isHidden ? 'block' : 'none';
        bhavasBtn.classList.toggle('active', isHidden);
        var label = bhavasBtn.querySelector('span:first-child');
        var icon = bhavasBtn.querySelector('.at-toggle-icon');
        if (label) label.textContent = isHidden ? 'Masquer le détail des 12 Bhavas' : 'Développer le détail des 12 Bhavas';
        if (icon) icon.textContent = isHidden ? '▲' : '▼';
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

      /* Calculs Planétaires */
      var planetLons = calculatePlanets(jdTime, ayanamsa);
      
      // Lune
      var moonDeg = planetLons['Lune'];
      var moonNak = getNakshatraInfo(moonDeg);

      // Ascendant
      var tropicalAscDeg = calcAscendantDeg(a, mo, j, h, mi, lat, lon, utcOffset);
      var siderealAscDeg = (tropicalAscDeg - ayanamsa + 360) % 360;
      var ascIdx = Math.floor(siderealAscDeg / 30);
      var ascName = SIGN_LIST_FR[ascIdx];
      var lagnaData = LAGNA_DATA[ascName];

      var ayanamsaStr = formatAyanamsa(ayanamsa);

      // 1. Rendu Lagna et Nakshatra
      document.getElementById('atLagnaCard').innerHTML = renderLagnaCard(lagnaData, siderealAscDeg);
      document.getElementById('atNakshatraCard').innerHTML = renderNakshatraCard(moonNak, moonDeg);

      // Fondements & Nakshatras personnalisés — swap statique → dynamique
      var fondementsPerso   = document.getElementById('atFondementsPersonnalise');
      var fondementsStatic  = document.getElementById('atFondementsStatic');
      var nakshatrasPerso   = document.getElementById('atNakshatrasPersonnalise');
      var nakshatrasStatic  = document.getElementById('atNakshatrasStatic');
      if (fondementsPerso) {
        fondementsPerso.innerHTML = generateFondementsPersonnalises(lagnaData, moonNak, ascName, siderealAscDeg, moonDeg, planetLons);
        fondementsPerso.style.display = 'block';
      }
      if (fondementsStatic)  fondementsStatic.style.display  = 'none';
      if (nakshatrasPerso) {
        nakshatrasPerso.innerHTML = generateNakshatrasPersonnalise(moonNak, moonDeg);
        nakshatrasPerso.style.display = 'block';
      }
      if (nakshatrasStatic) nakshatrasStatic.style.display = 'none';

      // 2. Rendu des Bhavas (Maisons)
      document.getElementById('atBhavasSummary').innerHTML = generateBhavasSummary(siderealAscDeg, planetLons);
      document.getElementById('atBhavasBlock').innerHTML = renderBhavas(siderealAscDeg, planetLons);
      if (bhavasDetails) { bhavasDetails.style.display = 'none'; }
      if (bhavasBtn) {
        bhavasBtn.classList.remove('active');
        var bl = bhavasBtn.querySelector('span:first-child');
        var bi = bhavasBtn.querySelector('.at-toggle-icon');
        if (bl) bl.textContent = 'Développer le détail des 12 Bhavas';
        if (bi) bi.textContent = '▼';
      }

      // 3. Rendu Vimshottari Dasha
      var birthDate = new Date(a, mo - 1, j, h, mi);
      document.getElementById('atDashaTimeline').innerHTML = renderDashaTimeline(moonDeg, birthDate);

      // 4. Rendu de la table de synthèse
      var summaryRows = '';
      var planetsOrder = ['Soleil', 'Lune', 'Mercure', 'Vénus', 'Mars', 'Jupiter', 'Saturne', 'Uranus', 'Neptune', 'Pluton'];
      
      summaryRows += '<tr>'
        + '<td><strong>↑ Lagna (Ascendant)</strong></td>'
        + '<td>' + formatLonToSign(siderealAscDeg) + '</td>'
        + '<td>' + lagnaData.sym + ' ' + lagnaData.name + '</td>'
        + '<td>Vénus / Soleil-sub</td>'
        + '</tr>';

      for (var k = 0; k < planetsOrder.length; k++) {
        var pName = planetsOrder[k];
        var pLon = planetLons[pName];
        var pIdx = Math.floor(pLon / 30);
        var pSignName = SIGN_LIST_FR[pIdx];
        var pSignSym = SIGN_LIST_SYMS[pIdx];
        var pInfo = PLANET_INFOS[pName];
        var pNak = getNakshatraInfo(pLon);
        
        summaryRows += '<tr>'
          + '<td>' + pInfo.sym + ' <strong>' + pInfo.name + '</strong></td>'
          + '<td>' + formatLonToSign(pLon) + '</td>'
          + '<td>' + pSignSym + ' ' + pSignName + ' (' + SIGN_TRANSLATIONS[pSignName] + ')</td>'
          + '<td>Nak. ' + pNak.name + ' (gouverné par ' + pNak.ruler + ')</td>'
          + '</tr>';
      }

      document.getElementById('atSummaryTableBlock').innerHTML = 
        '<div class="at-summary-table-wrap">'
        + '<table class="at-summary-table">'
        + '<thead>'
        + '<tr>'
        + '<th>Graha (Corps)</th>'
        + '<th>Position Sidérale</th>'
        + '<th>Rashi (Signe Védique)</th>'
        + '<th>Nakshatra Ancre</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody>' + summaryRows + '</tbody>'
        + '</table>'
        + '</div>';

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
