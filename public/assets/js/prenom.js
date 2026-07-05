// ═══════════════════════════════════════════════════════════
// NUMÉROLOGIE DU PRÉNOM — Calculateur & Interprétation (Version Enrichie)
// Mission de vie, Leçons Karmiques et Héritage Transgénérationnel
// ═══════════════════════════════════════════════════════════

const PYTH_TABLE = {
  A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
  J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
  S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8
};

const VOYELLES = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);
const MAITRES  = new Set([11, 22, 33]);

// ─── INTERPRÉTATIONS DU NOMBRE ACTIF (MISSION D'ÂME DU PRÉNOM) ───
const INTERP_ACTIF = {
  1: {
    titre: "L'Impulsion Individuelle & Leadership",
    mission: "Incarner l'autonomie et oser ouvrir de nouvelles voies.",
    desc: "Porteur de la vibration 1, votre prénom vous pousse à vous affirmer par vous-même. Vous êtes venu pour apprendre à diriger votre vie sans dépendre du regard ou de l'approbation d'autrui. Votre mission est d'initier des projets originaux et de développer une saine confiance en votre propre potentiel unique. Sur le plan de l'âme, c'est un appel à dépasser la peur de la solitude ou du rejet pour exprimer votre individualité."
  },
  2: {
    titre: "L'Harmonie Relationnelle & Coopération",
    mission: "Créer des ponts, écouter et harmoniser les opposés.",
    desc: "La vibration 2 confère à votre prénom une nature d'ambassadeur de paix. Votre mission d'âme est de cultiver la réceptivité, l'empathie et l'art de l'association. Vous êtes venu apprendre à collaborer sans vous effacer, à écouter votre intuition profonde et à guérir les divisions autour de vous. C'est une énergie douce mais d'une grande puissance de cohésion, essentielle pour pacifier les mémoires de conflits."
  },
  3: {
    titre: "La Joie Créative & Expression de Soi",
    mission: "Communiquer, rayonner la joie et embellir le monde.",
    desc: "Avec le 3, votre prénom porte l'étincelle de la créativité et de la communication. Votre mission de vie est de transmettre des messages inspirants, que ce soit par l'art, l'écriture, la parole ou simplement par une joie de vivre communicative. Vous êtes venu dépasser le doute créateur et le repli sur soi pour offrir votre lumière au monde. Votre présence rappelle aux autres l'importance du jeu et de la spontanéité."
  },
  4: {
    titre: "La Structure, Stabilité & Ancrage",
    mission: "Bâtir des fondations solides et incarner la persévérance.",
    desc: "La vibration 4 fait de votre prénom un vecteur d'ancrage et d'ordre. Votre mission est de donner corps aux idées, d'organiser la matière et de construire des structures stables (foyer, entreprise, projets). Vous êtes venu apprendre la patience, le sens du détail et la discipline régulière. C'est une force de loyauté et de rigueur qui permet de réparer les instabilités ou les errances des générations précédentes."
  },
  5: {
    titre: "La Liberté d'Expérience & Adaptabilité",
    mission: "Explorer, transmettre le changement et libérer le mouvement.",
    desc: "Le 5 insuffle à votre prénom un puissant vent de liberté et de curiosité. Votre mission est d'explorez les multiples facettes de la vie à travers le mouvement, le voyage, et l'apprentissage par l'expérience directe. Vous êtes venu apprendre à vous adapter aux tournants de l'existence sans vous disperser, et à enseigner aux autres que le changement est une opportunité de croissance spirituelle."
  },
  6: {
    titre: "L'Amour Responsable & Harmonie Familiale",
    mission: "Prendre soin des vôtres, concilier et incarner la bienveillance.",
    desc: "Porteur du 6, votre prénom vibre avec la fréquence du foyer, de la communauté et de la responsabilité affective. Votre mission est de cultiver l'harmonie, le sens de la beauté et l'accompagnement des autres. Vous êtes venu apprendre à donner sans condition mais aussi à poser des limites saines pour ne pas vous sacrifier. C'est la vibration par excellence de la guérison des liens familiaux."
  },
  7: {
    titre: "La Sagesse Intérieure & Quête de Vérité",
    mission: "Analyser, méditer et transmettre la connaissance de l'esprit.",
    desc: "La vibration 7 oriente votre prénom vers la recherche intérieure et le mystère. Votre mission d'âme est de comprendre le sens caché des choses, d'étudier et de développer votre discernement mental et spirituel. Vous êtes venu apprendre la valeur de la solitude choisie et de la méditation. Votre rôle est d'apporter une clarté tranquille et des réponses profondes là où règne la confusion."
  },
  8: {
    titre: "L'Abondance Juste & Maîtrise Matérielle",
    mission: "Manifester la puissance matérielle avec intégrité spirituelle.",
    desc: "Avec le 8, votre prénom porte une empreinte de force, de résilience et d'ambition. Votre mission est de maîtriser les lois de la matière (finance, autorité, réalisation concrète) tout en restant aligné avec vos valeurs spirituelles. Vous êtes venu apprendre la loi de cause à effet (Karma) et comprendre que le véritable pouvoir consiste à élever les autres, non à les dominer."
  },
  9: {
    titre: "L'Amour Universel & Compassion sans frontières",
    mission: "Incarner l'altruisme, lâcher prise et transmettre aux autres.",
    desc: "Le 9 est le nombre de l'achèvement et de la sagesse universelle. Votre prénom vous appelle à dépasser les intérêts personnels pour vous ouvrir à l'humanitaire, à l'idéalisme et au partage désintéressé. Votre mission est d'inspirer par votre compassion, de savoir clore les cycles passés avec pardon, et d'ouvrir la conscience collective vers plus de tolérance."
  },
  11: {
    titre: "Le Maître Visionnaire & Inspiration",
    mission: "Canaliser des vérités supérieures pour éclairer les consciences.",
    desc: "En tant que Nombre Maître, le 11 confère à votre prénom une hypersensibilité et une intuition hors du commun. Votre mission d'âme est d'agir comme un phare spirituel, de canaliser des idées novatrices et d'inspirer votre entourage par votre vision authentique. Le défi associé est d'apprendre à canaliser cette tension nerveuse élevée vers des réalisations créatrices."
  },
  22: {
    titre: "Le Grand Bâtisseur Universel",
    mission: "Concrétiser de grands idéaux au service du bien commun.",
    desc: "Le Nombre Maître 22 allie la vision spirituelle du 11 à la rigueur matérielle du 4. Votre mission est de concevoir et d'édifier des projets de grande envergure, capables de transformer ou d'améliorer durablement la vie de la communauté. Votre prénom porte une forte énergie de manifestation pratique qui demande un grand sens des responsabilités."
  },
  33: {
    titre: "Le Maître Enseignant par l'Amour",
    mission: "Guider par l'exemple, le dévouement et la compassion pure.",
    desc: "Le Nombre Maître 33 est le plus rare. Il invite à un niveau élevé d'expression de l'amour inconditionnel et de la guidance. Votre mission d'âme est d'enseigner par votre façon d'être, en diffusant protection, réconfort et sagesse auprès de ceux qui souffrent. C'est un appel à une dévotion désintéressée portée par une force intérieure tranquille."
  }
};

// ─── ALCHIMIE & CORRESPONDANCES OCCULTES (HERMÉTISME & TAROT) ───
const OCCULTE_DATA = {
  1: {
    element: "Feu 🜂 (Volonté pure, impulsion active)",
    metal: "L'Or ☉ (Le Soi souverain, conscience rayonnante)",
    alchimie: "La Calcination 🜁 (Brûler les scories de l'égo pour libérer l'essence première)",
    tarot: "Le Bateleur (I)",
    tarotDesc: "Le commencement créateur, la table des outils de la manifestation, la volonté d'action."
  },
  2: {
    element: "Eau 🜄 (Réceptivité intuitive, matrice passive)",
    metal: "L'Argent ☽ (Reflet inconscient, mystère psychique)",
    alchimie: "La Dissolution 🜄 (Dissoudre les blocages et structures rigides dans l'eau de la conscience)",
    tarot: "La Papesse (II)",
    tarotDesc: "L'accès au temple secret, le livre scellé des mémoires ancestrales et de l'intuition pure."
  },
  3: {
    element: "Air 🜁 (Verbe vibratoire, expansion créative)",
    metal: "Le Mercure ☿ (Vif-argent, messager spirituel)",
    alchimie: "La Séparation 🜊 (Filtrer les idées et exprimer la vérité pure par le souffle verbal)",
    tarot: "L'Impératrice (III)",
    tarotDesc: "La fertilité créatrice, la manifestation de l'abondance par l'imagination active."
  },
  4: {
    element: "Terre 🜃 (Densification physique, stabilité)",
    metal: "Le Cuivre ♀ (Affinité attractive, cohésion des formes)",
    alchimie: "La Conjonction 🜄 (Assembler les contraires de l'esprit pour leur donner un corps stable)",
    tarot: "L'Empereur (IV)",
    tarotDesc: "La maîtrise du plan matériel, l'ancrage solide, la structure et la loi du monde manifesté."
  },
  5: {
    element: "Éther 🜀 (La Quintessence vibratoire, espace libre)",
    metal: "Le Fer ♂ (Dynamisme active, force de conquête)",
    alchimie: "La Fermentation 🜎 (La transformation interne, la mutation spirituelle par l'expérience)",
    tarot: "Le Pape (V)",
    tarotDesc: "La transmission initiatique, la liberté d'esprit et la compréhension des lois universelles."
  },
  6: {
    element: "Eau 🜄 / Terre 🜃 (Harmonie sensorielle, équilibre affectif)",
    metal: "L'Étain ♃ (Harmonie expansionnelle, générosité protectrice)",
    alchimie: "La Distillation 🜍 (Purifier les désirs instinctifs pour en tirer le nectar de l'amour inconditionnel)",
    tarot: "L'Amoureux (VI)",
    tarotDesc: "L'équilibre des polarités masculine/féminine, les choix du cœur et l'union harmonieuse."
  },
  7: {
    element: "Air 🜁 / Éther 🜀 (Pensée transcendante, étude spirituelle)",
    metal: "Le Plomb ♄ (Ancrage du temps, introspection silencieuse)",
    alchimie: "La Sublimation 🜔 (Transformer les expériences denses de la Terre en sagesse céleste pure)",
    tarot: "Le Chariot (VII)",
    tarotDesc: "Le triomphe de la volonté spirituelle sur le chaos mental, la direction claire du destin."
  },
  8: {
    element: "Feu 🜂 / Terre 🜃 (Puissance concrète, justice karmique)",
    metal: "L'Acier ♄ (Rigueur tranchante, justice absolue)",
    alchimie: "La Coagulation 🜏 (Cristalliser l'intention spirituelle dans les réalisations physiques)",
    tarot: "La Justice (VIII)",
    tarotDesc: "L'équilibre parfait du Karma, la loi cosmique d'action/réaction et la rigueur d'alignement."
  },
  9: {
    element: "Éther 🜀 / Feu 🜂 (Lumière spirituelle universelle, fin des cycles)",
    metal: "Le Métal Philosophique 🜎 (L'alliage transmuté)",
    alchimie: "La Multiplication 🜔 (Projeter la lumière spirituelle pour accroître l'éveil collectif)",
    tarot: "L'Ermite (IX)",
    tarotDesc: "Le guide silencieux qui éclaire la voie avec sa lanterne, la sagesse du temps et le détachement."
  },
  11: {
    element: "Éther de Feu (Intuition électrique, voltage cosmique)",
    metal: "L'Or Alchimique (Vibration solaire supérieure)",
    alchimie: "L'Éveil de la Pierre (Canaliser le feu occulte pour initier les consciences)",
    tarot: "La Force (XI)",
    tarotDesc: "La maîtrise douce des énergies instinctives par la pureté du cœur, la canalisation du feu cosmique."
  },
  22: {
    element: "Terre Cosmique (Concrétisation des archétypes)",
    metal: "Le Bronze Philosophique (Alliage de ténacité et de sagesse)",
    alchimie: "Le Grand Œuvre (Bâtir les fondations physiques de l'âge d'or)",
    tarot: "Le Mat (XXII)",
    tarotDesc: "Le génie affranchi des limites, le voyageur éternel qui matérialise l'impossible."
  },
  33: {
    element: "Le Feu Éthéré (Amour christique inconditionnel)",
    metal: "Le Platine (Pureté ultime, incorruptibilité spirituelle)",
    alchimie: "La Rédemption Transmutationnelle (Guérison globale par la compassion pure)",
    tarot: "Le Monde (XXI)",
    tarotDesc: "L'accomplissement total du Grand Œuvre, l'harmonie parfaite avec l'univers entier."
  }
};

// ─── LEÇONS KARMIQUES (NOMBRES MANQUANTS) ───
const INTERP_KARMA = {
  1: {
    titre: "Confiance & Affirmation (Absence du 1)",
    lecon: "Apprendre à exister par soi-même, sans attendre d'être validé par les autres. Développer son autonomie, son esprit d'initiative et dépasser la peur de l'indépendance."
  },
  2: {
    titre: "Sensibilité & Collaboration (Absence du 2)",
    lecon: "Apprendre le tact, l'écoute et la coopération. Développer la patience relationnelle, la réceptivité et dépasser la tendance à vouloir tout gérer de manière isolée."
  },
  3: {
    titre: "Expression & Confiance créative (Absence du 3)",
    lecon: "Oser exprimer sa vérité et libérer sa créativité. Travailler sur la peur du ridicule ou du jugement, et cultiver la joie spontanée plutôt que le sérieux rigide."
  },
  4: {
    titre: "Structure, Discipline & Patience (Absence du 4)",
    lecon: "Apprendre à s'organiser et à persévérer dans l'effort régulier. Accepter le cadre, la méthode et comprendre que les grandes réalisations demandent du temps."
  },
  5: {
    titre: "Adaptation & Acceptation du Changement (Absence du 5)",
    lecon: "Surmonter la peur de l'inconnu et de l'instabilité. Apprendre à lâcher prise sur le contrôle, à accueillir le mouvement, le voyage et les expériences nouvelles."
  },
  6: {
    titre: "Équilibre affectif & Responsabilité (Absence du 6)",
    lecon: "Apprendre à aimer de manière responsable sans devenir intrusif ni se sacrifier. Trouver le point d'équilibre entre le service aux autres et l'amour de soi-même."
  },
  7: {
    titre: "Profondeur spirituelle & Foi en soi (Absence du 7)",
    lecon: "Cultiver la vie intérieure, l'étude et la méditation. Apprendre à dépasser le doute mental excessif pour faire confiance à sa propre intuition profonde."
  },
  8: {
    titre: "Rapport au Pouvoir & Équilibre Matériel (Absence du 8)",
    lecon: "Pacifier son rapport à l'argent, à l'autorité et au pouvoir concret. Apprendre la justice, la résilience et à manifester le succès avec détachement."
  },
  9: {
    titre: "Détachement & Compassion Universelle (Absence du 9)",
    lecon: "Apprendre à lâcher prise sur les rancœurs du passé. Développer l'altruisme, l'ouverture d'esprit globale et accepter que certains cycles doivent se terminer."
  }
};

// ─── ANCRES TRANSGÉNÉRATIONNELLES (LETTRES INITIALES ET CLÉS) ───
const INTERP_PIERRE_ANGULAIRE = {
  A: "Vibration de commencement, d'audace et d'esprit pionnier. Votre première réaction face aux événements est de prendre l'initiative de manière indépendante. L'héritage familial vous demande de rompre avec le passé et d'oser tracer votre propre voie de manière autonome.",
  B: "Vibration d'émotivité, de réserve et de réceptivité affective. Face aux défis, vous réagissez par la prudence et la recherche de sécurité ou de dialogue. Vous portez un héritage axé sur le besoin de soutien et l'écoute attentive.",
  C: "Vibration de communication, d'expression libre et de sociabilité. Vous réagissez en cherchant à exprimer verbalement ou créativement vos émotions. L'héritage ancestral est lié à l'art, à la parole publique ou au besoin de guérir par le rire et le partage.",
  D: "Vibration de structure, de persévérance et d'ancrage pragmatique. Votre première réaction est de planifier, d'organiser et de sécuriser la situation. Vous portez la mémoire de travailleurs dévoués et de bâtisseurs de foyers.",
  E: "Vibration de liberté, d'adaptation rapide et de mobilité intellectuelle. Vous réagissez en cherchant des issues nouvelles et des expériences variées. Héritage marqué par le changement, les voyages ou une soif d'émancipation.",
  F: "Vibration d'harmonie, de responsabilité affective et de dévouement. Votre réaction est de protéger le groupe ou votre famille. Très sensible aux attentes d'autrui, vous héritez d'une mission de soin et de préservation du clan.",
  G: "Vibration d'analyse, d'intuition profonde et de recherche intellectuelle. Face aux événements, vous prenez du recul et vous vous retirez dans l'observation. Mémoire de secrets, de sagesse silencieuse ou d'exigence mentale élevée.",
  H: "Vibration de réalisation matérielle, de justice et de résilience active. Vous réagissez en prenant le contrôle et en affrontant matériellement les épreuves. Héritage de combattants ou de personnes ayant surmonté des revers financiers.",
  I: "Vibration d'idéalisme, de grande sensibilité et d'émotivité à fleur de peau. Vous réagissez avec compassion, parfois avec une forte charge affective. Héritage d'âmes sensibles, dévouées ou artistiques.",
  J: "Vibration de force de décision, de justice et d'indépendance d'action. Vous réagissez par l'affirmation droite de votre volonté personnelle. Héritage de meneurs ou de personnes ayant dû s'élever seules.",
  K: "Vibration d'intuition supérieure, d'inspiration spirituelle et de rôle de guide. Vous réagissez à un niveau hautement sensible et intuitif. Mémoire d'enseignants spirituels ou de personnes connectées à l'invisible.",
  L: "Vibration de croissance intellectuelle, de rationalisation et d'amour d'apprendre. Vous réagissez en cherchant à comprendre logiquement et à analyser les faits. Héritage de transmetteurs de savoirs ou d'éducateurs.",
  M: "Vibration de force de travail, de rigueur et d'ancrage terrien (la matrice). Vous réagissez par le silence et l'action physique concrète. Héritage lié au travail manuel, à la terre ou à la protection maternelle rigoureuse.",
  N: "Vibration de renouveau permanent, de curiosité et d'instinct vif. Vous réagissez en contournant l'obstacle de manière inattendue. Héritage de grands tournants de vie ou de restructurations de la lignée.",
  O: "Vibration de dévotion morale, de sens du devoir et d'attachement aux traditions. Vous réagissez avec le souci des principes établis et du foyer. Héritage de figures parentales protectrices ou rigides.",
  P: "Vibration de réflexion profonde, de discrétion et d'exigence intellectuelle. Vous réagissez par le silence et une attitude réservée. Héritage lié à la quête de connaissances, à la solitude ou à l'écriture.",
  Q: "Vibration de recherche de vérité singulière, d'originalité et d'esprit indomptable. Vous réagissez avec indépendance d'esprit. Héritage de chercheurs atypiques ou d'esprits en dehors des normes.",
  R: "Vibration de courage moral, d'énergie de reconstruction et de résilience. Vous réagissez en faisant face de front, avec force. Héritage de personnes ayant fait preuve d'une grande résistance face à l'adversité.",
  S: "Vibration d'émotivité intense, de créativité artistique et de recherche d'éclat. Vous réagissez par la passion ou le besoin de plaire. Héritage d'artistes ou de personnalités marquantes de la famille.",
  T: "Vibration de sensibilité discrète, de diplomatie et de recherche constante d'équilibre. Vous réagissez par le tact ou en temporisant les conflits. Héritage de pacificateurs ou d'intermédiaires attentionnés.",
  U: "Vibration de tolérance universelle, d'intuition créative et d'ouverture spirituelle. Vous réagissez par la bienveillance et le partage. Héritage d'humanistes ou de créateurs d'idées.",
  V: "Vibration de puissance bâtisseuse, de sens des responsabilités et de constance. Vous réagissez en consolidant et en organisant les projets matériels. Héritage d'esprits constructeurs et déterminés.",
  W: "Vibration de mouvement fluide, d'indépendance d'action et d'adaptabilité. Vous réagissez avec vivacité créative. Héritage lié à la mobilité géographique ou aux changements professionnels fréquents.",
  X: "Vibration d'harmonie esthétique, d'émotivité sociale et d'altruisme. Vous réagissez en cherchant l'équilibre des relations et la beauté. Héritage lié au domaine artistique ou au bien-être communautaire.",
  Y: "Vibration d'intuition spirituelle, d'analyse et parfois d'indécision. Vous réagissez en vous interrogeant sur le sens profond des événements. Héritage d'esprits philosophes ou intuitifs.",
  Z: "Vibration de dynamisme, de sens stratégique élevé et de réussite matérielle. Vous réagissez avec autorité naturelle et efficacité commerciale. Héritage de leaders de projets ou d'entrepreneurs."
};

const INTERP_CLE_SPIRITUELLE = {
  A: "Clé d'Affirmation : Projet-sens parental axé sur la réussite individuelle, l'affirmation de soi et l'indépendance. Votre âme réagit aux événements en cherchant l'action directe et l'autonomie.",
  E: "Clé de Mouvement : Projet-sens axé sur le renouveau, le voyage, ou l'émancipation d'un cadre familial trop rigide. Votre âme a besoin d'expérimenter le changement et l'adaptation constante.",
  I: "Clé de Sensibilité : Projet-sens investi d'un grand idéalisme spirituel ou artistique. Votre âme réagit avec une grande émotivité, recherchant la vérité affective absolue et l'amour universel.",
  O: "Clé de Protection : Projet-sens centré sur la cohésion du foyer et la sécurité du groupe familial. Votre âme cherche instinctivement à harmoniser, protéger et rassembler les membres du clan.",
  U: "Clé de Créativité : Projet-sens axé sur le raffinement, l'art de l'expression ou le sens esthétique. Votre âme s'exprime par le partage et une sensibilité spirituelle ou créative fine.",
  Y: "Clé d'Introspection : Projet-sens axé sur l'exigence intellectuelle ou le besoin de comprendre des non-dits ancestraux. Votre âme recherche la solitude analytique ou la quête de sens."
};

const INTERP_CLE_PHYSIQUE = {
  B: "Protection par la réserve prudente, le silence et le retrait dans l'intimité protectrice.",
  C: "Protection par l'expression extravertie, la communication spontanée et l'optimisme protecteur.",
  D: "Protection par le pragmatisme constructif, le travail de terrain et l'ancrage matériel solide.",
  F: "Protection par l'esprit de conciliation chaleureux, le souci de plaire et le soin apporté aux autres.",
  G: "Protection par le recul critique, l'isolement d'observation et l'indépendance de pensée.",
  H: "Protection par le maintien d'une attitude d'assurance, le contrôle matériel et l'affirmation de son autorité.",
  J: "Protection par la fermeté d'esprit, la décision autonome et le respect absolu de sa propre droiture.",
  K: "Protection par la connexion à son inspiration intérieure et le maintien d'exigences morales très élevées.",
  L: "Protection par la rationalisation intellectuelle des faits et la recherche logique d'explications.",
  M: "Protection par l'action silencieuse, la résistance physique et le travail appliqué.",
  N: "Protection par le mouvement permanent, l'esquive des contraintes et la flexibilité instinctive.",
  P: "Protection par la discrétion analytique et le maintien d'une certaine distance intellectuelle.",
  Q: "Protection par l'affirmation d'une singularité assumée et un choix d'entourage très sélectif.",
  R: "Protection par la confrontation courageuse directe, l'action physique et la force d'affirmation.",
  S: "Protection par le déploiement d'une sensibilité théâtrale expressive ou créative.",
  T: "Protection par la diplomatie douce, l'évitement des conflits et la recherche de consensus.",
  V: "Protection par l'organisation rigoureuse, la persévérance physique et la rigueur d'exécution.",
  W: "Protection par le changement d'environnement et la recherche constante de nouvelles impulsions physiques.",
  X: "Protection par la recherche de beauté relationnelle, la créativité et la conciliation esthétique.",
  Z: "Protection par l'action pragmatique rapide, la négociation active et un magnétisme de direction."
};

// ─── RYTHME D'ÉVOLUTION (NOMBRE DE LETTRES) ───
function analyserRythmeEvolution(nbLettres) {
  if (nbLettres <= 4) {
    return {
      titre: "Rythme Rapide & Direct",
      desc: "Avec un prénom court, votre rythme d'évolution spirituelle et personnelle est direct, voire impulsif. Vous cherchez l'efficacité, la clarté immédiate, et préférez expérimenter par des actions rapides. Sur le plan karmique, cela indique une volonté de traiter les mémoires avec intensité et rapidité."
    };
  } else if (nbLettres >= 5 && nbLettres <= 6) {
    return {
      titre: "Rythme Équilibré & Adaptatif",
      desc: "Avec un prénom de longueur moyenne, votre évolution est caractérisée par un équilibre fluide entre action et réflexion. Vous avez la capacité de vous adapter aux changements extérieurs tout en préservant une certaine structure de vie. Ce rythme favorise l'intégration harmonieuse des leçons transgénérationnelles."
    };
  } else if (nbLettres >= 7 && nbLettres <= 8) {
    return {
      titre: "Rythme Réfléchi & Structuré",
      desc: "Votre prénom long indique un rythme d'évolution axé sur la profondeur, la patience et l'analyse. Vous avez besoin de temps pour assimiler les expériences et comprendre le sens caché des choses. Vous progressez par étapes structurées, ce qui vous permet de guérir en profondeur les filtres du passé."
    };
  } else {
    return {
      titre: "Rythme Global & Assimilation Complexe",
      desc: "Avec un prénom de 9 lettres ou plus, votre cheminement est vaste, complexe et multidimensionnel. Vous êtes venu pour intégrer des leçons spirituelles globales et universelles. Votre évolution demande d'embrasser des situations diversifiées et d'avoir une vision large pour transcender les mémoires familiales."
    };
  }
}

// ─── POLARITÉ DE L'ÂME (COMPARAISON VOYELLES / CONSONNES) ───
function interpreterPolarite(sommeVoyelles, sommeConsonnes) {
  // Ramener à la racine simple pour comparaison si c'est un maître nombre
  const v = (sommeVoyelles === 11 || sommeVoyelles === 22 || sommeVoyelles === 33) ? (sommeVoyelles === 11 ? 2 : (sommeVoyelles === 22 ? 4 : 6)) : sommeVoyelles;
  const c = (sommeConsonnes === 11 || sommeConsonnes === 22 || sommeConsonnes === 33) ? (sommeConsonnes === 11 ? 2 : (sommeConsonnes === 22 ? 4 : 6)) : sommeConsonnes;

  if (v > c) {
    return {
      type: "Dominante Spirituelle (Monde Intérieur)",
      desc: "Vos aspirations d'âme et votre intuition (Voyelles) guident vos choix en priorité. Vous accordez plus de valeur à l'être qu'au paraître. Le défi est de parvenir à manifester concrètement ces idéaux élevés sans crainte du jugement extérieur."
    };
  } else if (c > v) {
    return {
      type: "Dominante Personnalité (Monde Extérieur)",
      desc: "Votre force d'action et votre adaptation sociale (Consonnes) l'emportent sur le plan intime. On vous perçoit comme quelqu'un de fiable et d'efficace. Veillez cependant à vous accorder des temps de retour à soi pour nourrir vos rêves intérieurs."
    };
  } else {
    return {
      type: "Harmonie & Alignement Parfait",
      desc: "Vos rêves intimes (Voyelles) et votre personnalité active (Consonnes) vibrent sur la même longueur d'onde. Cette fluidité évite les tiraillements intérieurs et vous permet d'exprimer très naturellement qui vous êtes dans vos actions quotidiennes."
    };
  }
}

// ─── UTILS DE CALCUL ──────────────────────────────────────
function reduire(n) {
  while (n > 9 && !MAITRES.has(n)) {
    n = String(n).split('').reduce((s, d) => s + parseInt(d), 0);
  }
  return n;
}

function valeurLettre(c) {
  return PYTH_TABLE[c] || 0;
}

function nettoyerChaine(str) {
  return str.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
}

// ─── INTERACTION AVEC LE DOM ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('prenom-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputPrenom = document.getElementById('input-prenom').value.trim();
    if (!inputPrenom) {
      showToast("Veuillez saisir votre prénom.");
      return;
    }

    const prenomClean = nettoyerChaine(inputPrenom);
    if (!prenomClean) {
      showToast("Le prénom saisi ne contient pas de lettres valides.");
      return;
    }

    calculerNumerologiePrenom(prenomClean, inputPrenom);
  });

  // Bouton Exemple
  const btnExemple = document.getElementById('prenom-exemple');
  if (btnExemple) {
    btnExemple.addEventListener('click', () => {
      document.getElementById('input-prenom').value = "Alexandre";
      form.dispatchEvent(new Event('submit'));
    });
  }
});

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── MOTEUR D'ANALYSE DU PRÉNOM ──────────────────────────
function calculerNumerologiePrenom(prenom, prenomAffichage) {
  const lettres = prenom.split('');
  const nbLettres = lettres.length;
  
  // 1. Calcul du Nombre Actif (Mission de vie)
  let sommeActif = 0;
  let formuleActif = [];
  let counts = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0 };

  let firstVowel = null;
  let firstConsonant = null;

  let sommeVoyelles = 0;
  let sommeConsonnes = 0;

  let detailsFormule = lettres.map((c) => {
    const val = valeurLettre(c);
    sommeActif += val;
    formuleActif.push(val);
    if (val >= 1 && val <= 9) {
      counts[val]++;
    }

    const isVowel = VOYELLES.has(c);
    if (isVowel) {
      sommeVoyelles += val;
      if (!firstVowel) firstVowel = c;
    } else {
      sommeConsonnes += val;
      if (!firstConsonant) firstConsonant = c;
    }

    return `<span class="letter-box"><strong>${c}</strong><span class="letter-val">${val}</span></span>`;
  }).join('<span class="letter-plus">+</span>');

  const rawSum = sommeActif;
  const actifFinal = reduire(sommeActif);

  // 2. Identification des Leçons Karmiques (Nombres manquants)
  let leconsKarmiques = [];
  for (let i = 1; i <= 9; i++) {
    if (counts[i] === 0) {
      leconsKarmiques.push(i);
    }
  }

  // 3. Pierre Angulaire (Première lettre)
  const premiereLettre = lettres[0];

  // 4. Rythme d'évolution
  const rythme = analyserRythmeEvolution(nbLettres);

  // Rendu des résultats
  renderResults({
    prenom: prenomAffichage,
    nbLettres: nbLettres,
    detailsFormule: detailsFormule,
    rawSum: rawSum,
    actifFinal: actifFinal,
    leconsKarmiques: leconsKarmiques,
    premiereLettre: premiereLettre,
    firstVowel: firstVowel,
    firstConsonant: firstConsonant,
    sommeVoyelles: reduire(sommeVoyelles),
    sommeConsonnes: reduire(sommeConsonnes),
    rythme: rythme
  });
}

function renderResults(res) {
  const container = document.getElementById('prenom-resultats');
  if (!container) return;

  // 1. Formule
  let htmlFormule = `
    <div class="pyth-formule" style="margin-bottom: 0;">
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;">
        ${res.detailsFormule}
      </div>
      <div style="text-align: center; font-family: var(--font-mono); font-size: 0.95rem; color: var(--text-dim);">
        Total Brut = <strong>${res.rawSum}</strong> → Réduit = <span style="color: var(--gold); font-weight: 700; font-size: 1.2rem;">${res.actifFinal}</span>
      </div>
    </div>
  `;

  // 2. Nombre Actif / Mission de Vie
  const dataActif = INTERP_ACTIF[res.actifFinal] || { titre: "Inconnu", mission: "", desc: "" };
  const occ = OCCULTE_DATA[res.actifFinal] || { element: "Éther", metal: "Non défini", alchimie: "Non défini", tarot: "Le Mat", tarotDesc: "" };
  
  let htmlActif = `
    <div class="result-card gold" style="height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center;">
      <div class="big-num">${res.actifFinal}</div>
      <div class="label">Nombre Actif / Mission du Prénom</div>
      <h4 style="margin: 0.5rem 0; color: var(--gold); font-size: 1.15rem;">✦ ${dataActif.titre}</h4>
      <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim); margin-bottom: 0.8rem;">
        <strong>Mission de Vie :</strong> ${dataActif.mission}
      </p>
      <p class="desc" style="margin-bottom: 1.25rem;">${dataActif.desc}</p>
      
      <!-- Alignement Hermétique & Occulte -->
      <div style="margin-top: auto; border-top: 1px dashed rgba(212, 175, 55, 0.25); padding-top: 1rem; text-align: left;">
        <h5 style="color: var(--gold); font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; margin: 0 0 0.6rem 0; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.4rem;">
          <span>✦</span> Correspondances Alchimiques & Tarot
        </h5>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.78rem; color: var(--text-dim); display: flex; flex-direction: column; gap: 0.4rem;">
          <li><strong>Élément :</strong> ${occ.element}</li>
          <li><strong>Métal :</strong> ${occ.metal}</li>
          <li><strong>Grand Œuvre :</strong> ${occ.alchimie}</li>
          <li style="border-left: 2px solid var(--gold); padding-left: 0.5rem; margin-top: 0.2rem; font-style: italic; color: var(--text);">
            <strong>Arcane (${occ.tarot}) :</strong> ${occ.tarotDesc}
          </li>
        </ul>
      </div>
    </div>
  `;

  // 3. Structure et Rythme Évolutif (Polarités + Rythme)
  const polarite = interpreterPolarite(res.sommeVoyelles, res.sommeConsonnes);
  let htmlStructure = `
    <!-- Polarités voyelles/consonnes -->
    <div style="background: linear-gradient(150deg, var(--bg-card-hover) 0%, var(--bg-card) 100%); border: 1px solid var(--border); border-radius: 12px; padding: 1.2rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 0.8rem;">
      <div>
        <h4 style="color: var(--cyan); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 0.3rem; text-transform: uppercase;">☯ Polarité de l'Âme</h4>
        <p style="font-size: 0.72rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 0.4rem;">
          Équilibre entre votre élan intérieur (Voyelles) et votre personnalité sociale (Consonnes).
        </p>
      </div>
      
      <div style="display: flex; gap: 0.75rem;">
        <div style="flex: 1; background: rgba(251, 129, 149, 0.05); border: 1px solid rgba(251, 129, 149, 0.15); border-radius: 8px; padding: 0.4rem; text-align: center;">
          <div style="font-size: 1.15rem; font-weight: 700; color: var(--rose); font-family: var(--font-mono);">${res.sommeVoyelles}</div>
          <div style="font-size: 0.58rem; text-transform: uppercase; color: var(--text-muted); font-family: var(--font-mono); margin-top: 0.15rem;">Voyelles</div>
        </div>
        <div style="flex: 1; background: rgba(59, 211, 238, 0.05); border: 1px solid rgba(59, 211, 238, 0.15); border-radius: 8px; padding: 0.4rem; text-align: center;">
          <div style="font-size: 1.15rem; font-weight: 700; color: var(--cyan); font-family: var(--font-mono);">${res.sommeConsonnes}</div>
          <div style="font-size: 0.58rem; text-transform: uppercase; color: var(--text-muted); font-family: var(--font-mono); margin-top: 0.15rem;">Consonnes</div>
        </div>
      </div>

      <div style="background: rgba(59, 211, 238, 0.03); border-left: 2px solid var(--cyan); padding: 0.4rem 0.6rem; border-radius: 0 4px 4px 0; text-align: left;">
        <h5 style="font-size: 0.75rem; color: var(--text); margin-bottom: 0.15rem; font-family: var(--font-mono); font-weight: 700; text-transform: uppercase;">${polarite.type}</h5>
        <p style="font-size: 0.72rem; color: var(--text-dim); line-height: 1.45; margin: 0;">${polarite.desc}</p>
      </div>
    </div>

    <!-- Rythme -->
    <div style="background: linear-gradient(150deg, var(--bg-card-hover) 0%, var(--bg-card) 100%); border: 1px solid var(--border); border-radius: 12px; padding: 1.2rem; flex: 1; min-height: 140px; display: flex; flex-direction: column; justify-content: space-between; gap: 0.6rem;">
      <div>
        <h4 style="color: var(--emerald); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 0.4rem; text-transform: uppercase;">⚡ Rythme d'Évolution</h4>
        <h5 style="color: var(--text); font-size: 0.88rem; margin-bottom: 0.3rem; font-family: var(--font-mono);">✦ ${res.rythme.titre}</h5>
        <p style="font-size: 0.75rem; color: var(--text-dim); line-height: 1.45; margin: 0;">
          ${res.rythme.desc}
        </p>
      </div>
    </div>
  `;

  // 4. Leçons Karmiques (Karma)
  let htmlKarma = '';
  if (res.leconsKarmiques.length === 0) {
    htmlKarma = `
      <div style="font-style: normal;">
        <h4 style="color: var(--emerald); margin-bottom: 0.5rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">✔ Intégration Karmique Totale</h4>
        <p style="font-size: 0.9rem; color: var(--text-dim); line-height: 1.7; margin: 0;">Incroyable ! Votre prénom contient toutes les vibrations de 1 à 9. Sur le plan karmique, cela indique une âme qui a déjà exploré et équilibré ces différentes facettes de conscience dans ses cycles passés. Vous disposez d'une boîte à outils spirituelle complète pour cette incarnation.</p>
      </div>
    `;
  } else {
    htmlKarma = `
      <p style="color: var(--text-dim); margin-bottom: 1.25rem; font-size: 0.9rem; line-height: 1.6;">
        Les nombres manquants dans l'analyse de votre prénom représentent les **Leçons Karmiques** — des fréquences vibratoires que votre âme n'a pas pleinement intégrées dans des cycles antérieurs et qu'elle cherche à travailler aujourd'hui.
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
        ${res.leconsKarmiques.map(num => {
          const detail = INTERP_KARMA[num] || { titre: "Leçon", lecon: "" };
          return `
            <div style="background: rgba(251, 129, 149, 0.05); border: 1px solid rgba(251, 129, 149, 0.2); border-left: 3px solid var(--rose); border-radius: 10px; padding: 1rem 1.2rem;">
              <h5 style="color: var(--rose); margin-bottom: 0.3rem; font-family: var(--font-mono); font-size: 0.88rem;">Vibration ${num} : ${detail.titre}</h5>
              <p style="font-size: 0.82rem; color: var(--text-dim); margin: 0; line-height: 1.6;">${detail.lecon}</p>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // 5. Transgénérationnel (3 Clés)
  const descInitiale = INTERP_PIERRE_ANGULAIRE[res.premiereLettre] || "Vibration d'impulsion.";
  const descVoyelle = res.firstVowel ? (INTERP_CLE_SPIRITUELLE[res.firstVowel] || "") : "";
  const descConsonne = res.firstConsonant ? (INTERP_CLE_PHYSIQUE[res.firstConsonant] || "") : "";

  let htmlTransgen = `
    <!-- Pierre Angulaire (Première lettre) -->
    <div class="pd-card pd-expression" style="margin: 0; display: flex; flex-direction: column;">
      <div class="pd-header">
        <div class="pd-num cf-violet" style="font-size: 2.5rem;">${res.premiereLettre}</div>
        <div class="pd-info">
          <h4 class="pd-titre cf-violet" style="font-size: 0.85rem; text-transform: uppercase;">La Pierre Angulaire</h4>
          <p class="pd-note">Première lettre du prénom</p>
        </div>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-dim); line-height: 1.6; margin: 0 0 1rem 0; flex: 1;">
        Elle indique comment vous initiez les projets et réagissez face aux obstacles imprévus. Elle correspond au filtre comportemental et énergétique hérité de votre lignée à la naissance.
      </p>
      <div class="pd-role-box pd-role-expression" style="font-style: normal; font-size: 0.82rem; line-height: 1.6; margin-top: auto;">
        ${descInitiale}
      </div>
    </div>

    <!-- Clé Spirituelle (Première Voyelle) -->
    <div class="pd-card pd-ame" style="margin: 0; display: flex; flex-direction: column;">
      <div class="pd-header">
        <div class="pd-num cf-rose" style="font-size: 2.5rem;">${res.firstVowel || '—'}</div>
        <div class="pd-info">
          <h4 class="pd-titre cf-rose" style="font-size: 0.85rem; text-transform: uppercase;">La Clé Spirituelle</h4>
          <p class="pd-note">Première voyelle du prénom</p>
        </div>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-dim); line-height: 1.6; margin: 0 0 1rem 0; flex: 1;">
        Elle révèle la réaction immédiate de votre **âme** et de vos émotions intimes. C'est la porte d'entrée de vos ressentis profonds, souvent façonnée par le climat psychique parental lors de votre gestation.
      </p>
      ${res.firstVowel ? `
        <div class="pd-role-box pd-role-ame" style="font-style: normal; font-size: 0.82rem; line-height: 1.6; margin-top: auto;">
          ${descVoyelle}
        </div>
      ` : `<p style="margin-top:auto; font-style:italic; font-size:0.8rem; color:var(--text-muted);">Aucune voyelle trouvée dans ce prénom.</p>`}
    </div>

    <!-- Clé Physique / Terrestre (Première Consonne) -->
    <div class="pd-card pd-defi" style="margin: 0; display: flex; flex-direction: column; border-color: rgba(59, 211, 238, 0.3);">
      <div class="pd-header">
        <div class="pd-num cf-cyan" style="font-size: 2.5rem;">${res.firstConsonant || '—'}</div>
        <div class="pd-info">
          <h4 class="pd-titre cf-cyan" style="font-size: 0.85rem; text-transform: uppercase;">La Clé Physique</h4>
          <p class="pd-note">Première consonne du prénom</p>
        </div>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-dim); line-height: 1.6; margin: 0 0 1rem 0; flex: 1;">
        Elle décrit comment vous protégez votre sphère intime, comment vous interagissez physiquement avec le monde et exprimez votre égo / personnalité sociale au quotidien.
      </p>
      ${res.firstConsonant ? `
        <div class="pd-role-box pd-role-defi" style="font-style: normal; font-size: 0.82rem; line-height: 1.6; background: rgba(59, 211, 238, 0.05); border: 1px solid rgba(59, 211, 238, 0.2); border-left: 3px solid var(--cyan); color: var(--text-dim); margin-top: auto;">
          ${descConsonne}
        </div>
      ` : `<p style="margin-top:auto; font-style:italic; font-size:0.8rem; color:var(--text-muted);">Aucune consonne trouvée dans ce prénom.</p>`}
    </div>
  `;

  // Injecter le tout
  document.getElementById('prenom-formule-block').innerHTML = htmlFormule;
  document.getElementById('prenom-actif-block').innerHTML = htmlActif;
  document.getElementById('prenom-structure-block').innerHTML = htmlStructure;
  document.getElementById('prenom-karma-block').innerHTML = htmlKarma;
  document.getElementById('prenom-transgen-block').innerHTML = htmlTransgen;

  const shareZone = document.getElementById('shareImageZone');
  if (shareZone && window.PlateformePartage) {
    shareZone.innerHTML = '';
    window.PlateformePartage.afficherBoutons(shareZone, {
      type: 'numerologie',
      titre: 'Numérologie du Prénom',
      sousTitre: 'La mission cachée dans ton prénom',
      valeurs: [
        { label: 'Nombre Actif', valeur: res.actifFinal },
        { label: 'Désir de l\'Âme', valeur: res.sommeVoyelles },
        { label: 'Personnalité', valeur: res.sommeConsonnes }
      ]
    });
  }

  // Rendre visible et scroller
  container.hidden = false;
  setTimeout(() => container.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}
