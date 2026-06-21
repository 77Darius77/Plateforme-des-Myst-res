/* Interpretations par plan — Oracle des Miroirs (Dimitri d'Alfange d'Uvril) */
window.miroirsPlanes = (function () {

  var CARD_PLANES = {
    '01': { /* Hérédité */
      personnel: "Votre héritage familial façonne silencieusement vos choix et vos peurs. Prenez conscience des schémas transmis par vos ancêtres : certains vous portent, d'autres vous limitent. Le travail sur votre lignée est une clé majeure de votre évolution personnelle.",
      professionnel: "Votre carrière est influencée par des modèles familiaux — un métier transmis de génération en génération ou au contraire une rupture à assumer. Distinguez ce qui vient de votre désir authentique de ce qui relève d'une attente héritée.",
      relationnel: "Les schémas amoureux de vos parents ou grands-parents se rejouent dans vos relations. Ce miroir vous invite à reconnaître ces répétitions pour vous en libérer et créer des liens qui vous ressemblent vraiment." },
    '02': { /* Fécondité */
      personnel: "Une période d'abondance créatrice s'ouvre — tout ce que vous entreprenez peut germer et fleurir. Votre énergie fertile est à son apogée : projets, idées, transformations personnelles trouvent un terreau favorable.",
      professionnel: "Vos projets professionnels entrent dans une phase de croissance. Lancements, créations d'entreprise, nouvelles collaborations — la période est idéale pour semer ce que vous récolterez demain.",
      relationnel: "La Fécondité parle de l'envie de fonder une famille, d'avoir un enfant ou de faire grandir une relation existante. Une énergie de création et de renouveau traverse votre vie affective." },
    '03': { /* Naissance */
      personnel: "Un nouveau chapitre de votre existence s'ouvre avec fraîcheur et espoir. Laissez derrière vous ce qui appartient au passé et accueillez cette renaissance avec confiance. Vous êtes au début de quelque chose de beau.",
      professionnel: "Un nouveau départ professionnel se profile — changement de poste, création d'entreprise ou formation qualifiante. Cette naissance demande du soin et de la patience, comme tout ce qui vient au monde.",
      relationnel: "Une nouvelle relation voit le jour ou une relation existante renaît sous une forme renouvelée. L'innocence et la fraîcheur des débuts sont au rendez-vous." },
    '04': { /* Enfant */
      personnel: "Retrouvez votre âme d'enfant — cette part de vous sait encore s'émerveiller, créer sans jugement et faire confiance à la vie. Laissez-la s'exprimer et colorer votre quotidien de spontanéité.",
      professionnel: "Abordez vos projets avec un regard neuf et créatif. L'Enfant vous invite à sortir des sentiers battus, à oser l'originalité et à retrouver le plaisir de créer sans pression de résultat.",
      relationnel: "Dans vos relations, cultivez la spontanéité et le jeu. L'Enfant vous rappelle que l'amour et l'amitié se nourrissent de moments simples et de rires partagés." },
    '05': { /* Parole */
      personnel: "Votre vérité demande à être exprimée. La Parole est un pouvoir créateur : ce que vous dites façonne votre réalité. Communiquez avec authenticité et écoutez les messages que la vie vous adresse.",
      professionnel: "Une communication importante est à l'ordre du jour — négociation, présentation, entretien. La clarté de votre parole sera votre meilleur atout. Osez dire ce que vous pensez avec justesse.",
      relationnel: "Le dialogue est la clé de vos relations en ce moment. Une conversation sincère peut dénouer des incompréhensions. Exprimez vos besoins sans crainte et écoutez ceux de l'autre." },
    '06': { /* Femme */
      personnel: "Le principe féminin s'éveille en vous — intuition, réceptivité, douceur et puissance intérieure. Honorez cette énergie quelle que soit votre identité de genre. Une figure féminine inspirante croise votre route.",
      professionnel: "L'intuition et la diplomatie sont vos alliées professionnelles. Une femme influence positivement votre carrière. Cultivez les qualités féminines de collaboration et d'écoute dans votre environnement de travail.",
      relationnel: "Pour les femmes, ce miroir vous parle directement de votre identité et de votre pouvoir. Pour les hommes, il évoque votre relation à la féminité — partenaire, mère, ou votre propre part féminine." },
    '07': { /* Homme */
      personnel: "Le principe masculin s'affirme — action, structure, protection et rationalité. Cette énergie vous pousse à agir et à poser des limites claires. Une figure masculine importante influence votre parcours.",
      professionnel: "L'action et l'initiative sont vos moteurs professionnels. Prenez des décisions, structurez vos projets, affirmez votre autorité avec justesse. Un allié masculin pourrait jouer un rôle clé.",
      relationnel: "Pour les hommes, ce miroir parle de votre identité profonde. Pour les femmes, il évoque votre relation au masculin — partenaire, père, ou votre propre part masculine à équilibrer." },
    '08': { /* Maison */
      personnel: "Votre maison intérieure — votre sentiment de sécurité et d'ancrage — demande votre attention. Prenez soin de votre espace de vie, il est le reflet de votre état d'âme et le sanctuaire de votre paix.",
      professionnel: "Stabilité et sécurité professionnelles sont au premier plan. Travail à domicile, investissement immobilier ou besoin de sécuriser votre situation — la Maison vous invite à construire des bases solides.",
      relationnel: "Le foyer et la vie domestique sont au cœur de vos préoccupations affectives. Déménagement en couple, achat immobilier ou simple besoin de créer un nid chaleureux ensemble." },
    '09': { /* Famille */
      personnel: "Vos liens familiaux occupent le devant de la scène — réconciliation, soutien ou règlement de comptes. La famille est votre miroir premier : ce qui s'y joue résonne dans tous les aspects de votre vie.",
      professionnel: "L'entreprise familiale, le travail avec des proches ou l'équilibre entre vie professionnelle et familiale sont en jeu. Trouvez l'harmonie entre vos ambitions et vos responsabilités familiales.",
      relationnel: "Les dynamiques familiales influencent vos relations amoureuses et amicales. Une question familiale demande à être résolue pour libérer votre vie affective." },
    '10': { /* Santé */
      personnel: "Votre bien-être physique et mental est le miroir de votre équilibre intérieur. Écoutez les messages de votre corps : fatigue, tension ou vitalité sont des indicateurs précieux de votre état global.",
      professionnel: "Attention au surmenage professionnel — votre santé pourrait en pâtir. Rééquilibrez votre charge de travail et accordez-vous des pauses régénérantes. Votre efficacité dépend de votre vitalité.",
      relationnel: "Les relations toxiques ont un impact direct sur votre santé. Prenez soin de vous en posant des limites claires. Une relation saine nourrit votre bien-être ; une relation malsaine l'épuise." },
    '11': { /* Rêve */
      personnel: "Vos rêves nocturnes et vos aspirations profondes contiennent des messages essentiels. Tenez un journal de rêves, méditez, laissez votre inconscient vous parler. Une guidance précieuse émerge de votre monde intérieur.",
      professionnel: "Un projet créatif ou une vision inspirante émerge. Ne rejetez pas vos idées les plus audacieuses — elles contiennent peut-être la clé de votre épanouissement professionnel.",
      relationnel: "Vos rêves vous parlent de vos relations. Une personne vous apparaît en songe, une intuition vous guide vers quelqu'un. Faites confiance aux messages subtils de votre inconscient." },
    '12': { /* Changement */
      personnel: "Une transformation majeure est en marche dans votre vie. Le Changement vous bouscule mais vous libère — accueillez-le comme un allié plutôt qu'un ennemi. Ce qui bouge aujourd'hui prépare votre devenir.",
      professionnel: "Des bouleversements professionnels sont annoncés — restructuration, changement de poste, nouvelle orientation. Ces mouvements, même déstabilisants, ouvrent des portes inattendues.",
      relationnel: "Vos relations traversent une phase de mutation. Une dynamique change, un lien évolue. Le Changement vous invite à vous adapter et à laisser partir ce qui ne peut plus durer." },
    '13': { /* Amour */
      personnel: "L'amour de soi est le fondement de tous les autres amours. Ce miroir vous invite à vous regarder avec bienveillance et à cultiver la relation la plus importante : celle que vous entretenez avec vous-même.",
      professionnel: "La passion pour votre travail ou un projet qui vous tient à cœur illumine votre vie professionnelle. L'Amour évoque aussi une collaboration harmonieuse ou un environnement de travail chaleureux.",
      relationnel: "L'Amour dans toute sa splendeur — une rencontre décisive, l'approfondissement d'un lien existant ou la guérison d'une blessure affective. Votre cœur s'ouvre et attire le meilleur." },
    '14': { /* Amitié */
      personnel: "L'amitié que vous cultivez envers vous-même est la base de relations saines. Soyez votre propre meilleur ami — traitez-vous avec la même indulgence et le même soutien que vous offrez à vos proches.",
      professionnel: "Des alliances professionnelles solides se tissent. Collègues devenus amis, réseau qui vous soutient, collaborations fondées sur la confiance. Cultivez ces liens précieux.",
      relationnel: "Une amitié profonde illumine votre vie — un soutien fidèle, une présence réconfortante. L'Amitié vous rappelle que l'amour prend de nombreuses formes, toutes également précieuses." },
    '15': { /* Travail */
      personnel: "Votre rapport au travail révèle beaucoup de votre estime personnelle. Travaillez-vous pour vous accomplir ou pour prouver votre valeur ? Ce miroir vous invite à trouver un sens profond dans ce que vous faites.",
      professionnel: "Votre carrière est au centre des préoccupations — nouveau projet, promotion, recherche d'emploi ou questionnement sur votre voie. Le Travail récompense l'effort sincère et la persévérance.",
      relationnel: "L'équilibre entre vie professionnelle et vie affective est à soigner. Le travail ne doit pas devenir un refuge qui vous éloigne de vos relations, ni vos relations un obstacle à votre épanouissement professionnel." },
    '16': { /* Sexualité */
      personnel: "Votre énergie vitale et créatrice circule — ou au contraire se bloque. La Sexualité parle de votre force de vie fondamentale, de votre créativité et de votre rapport au plaisir et au corps.",
      professionnel: "La créativité et le magnétisme personnel sont vos atouts. Des projets passionnants mobilisent votre énergie de façon intense. Osez exprimer votre puissance créatrice sans retenue.",
      relationnel: "L'intimité physique et émotionnelle avec votre partenaire est au premier plan. Désir, connexion charnelle, réconciliation des corps — la Sexualité vous invite à honorer cette dimension sacrée de l'amour." },
    '17': { /* Projection */
      personnel: "Ce que vous voyez chez les autres est souvent le reflet de ce qui est en vous. La Projection vous invite à reprendre possession de vos qualités et de vos ombres que vous attribuez à autrui.",
      professionnel: "Attention aux illusions dans votre vie professionnelle — vous idéalisez peut-être un projet ou un collaborateur. Prenez du recul pour distinguer la réalité de vos projections.",
      relationnel: "Vos attentes irréalistes pèsent sur vos relations. Vous voyez l'autre non pas tel qu'il est, mais tel que vous voudriez qu'il soit. Ce miroir vous invite à l'acceptation de la réalité." },
    '18': { /* Argent */
      personnel: "Votre relation à l'argent est le miroir de votre estime personnelle. Croyez-vous mériter l'abondance ? Ce miroir révèle vos croyances limitantes sur la prospérité et votre propre valeur.",
      professionnel: "Des questions financières sont au premier plan — revenus, investissements, négociation salariale. L'Argent récompense la valeur que vous créez. Osez demander ce que vous valez vraiment.",
      relationnel: "L'argent dans le couple ou la famille peut être source de tension ou de sécurité. Clarifiez votre rapport à l'argent avec vos proches pour éviter malentendus et ressentiments." },
    '19': { /* Jalousie */
      personnel: "La jalousie révèle un manque d'estime de soi. Plutôt que de vous comparer, tournez votre regard vers l'intérieur : qu'est-ce qui vous manque pour vous sentir complet ? La réponse est en vous, pas chez l'autre.",
      professionnel: "La rivalité professionnelle vous consume. Plutôt que d'envier le succès des autres, concentrez-vous sur votre propre chemin. Transformez la compétition en stimulation positive.",
      relationnel: "La jalousie empoisonne vos relations. Cette insécurité affective parle d'une blessure ancienne — un manque de confiance qui mérite d'être guéri pour retrouver des liens apaisés." },
    '20': { /* Distance */
      personnel: "Un éloignement — géographique ou émotionnel — vous affecte. La Distance vous invite à regarder cette séparation non comme une perte mais comme un espace de maturation nécessaire.",
      professionnel: "Un projet à distance, une mutation géographique ou un décalage avec vos collègues. La Distance professionnelle vous demande de vous adapter et de trouver de nouvelles façons de collaborer.",
      relationnel: "L'éloignement pèse sur une relation importante. Relation à distance, silence prolongé, ou distance affective malgré la proximité physique. La communication est essentielle pour maintenir le lien." },
    '21': { /* Séparation */
      personnel: "Une rupture — avec une personne, une situation ou une partie de vous-même — est en cours ou à venir. La Séparation est douloureuse mais nécessaire : elle libère l'espace pour du renouveau.",
      professionnel: "Fin de contrat, départ d'un collègue, changement de voie radical. Cette séparation professionnelle, bien que déstabilisante, vous ouvre à de nouvelles possibilités que vous n'imaginiez pas.",
      relationnel: "Une rupture affective est signalée — ou la peur de cette rupture. La Séparation vous invite à l'acceptation : ce qui se termine a rempli sa mission. L'avenir vous réserve d'autres rencontres." },
    '22': { /* Boomerang */
      personnel: "Les conséquences de vos actions passées vous reviennent — positives ou négatives. Le Boomerang vous rappelle la loi de cause à effet : chaque choix porte ses fruits en son temps.",
      professionnel: "Un projet passé produit ses résultats, une décision professionnelle antérieure trouve son aboutissement. Récoltez les fruits de votre travail — ou apprenez des erreurs commises.",
      relationnel: "Ce que vous avez semé dans vos relations vous revient. Un geste de générosité trouve sa récompense, une parole blessante trouve son écho. Le Boomerang invite à la responsabilité." },
    '23': { /* Loi */
      personnel: "Votre rapport aux règles, à l'autorité et à la discipline est questionné. La Loi vous invite à trouver le juste équilibre entre liberté et cadre — une structure solide permet l'épanouissement.",
      professionnel: "Des questions juridiques ou administratives se présentent. Respect des procédures, signature de contrat, conformité — la rigueur est votre alliée. Un conseil juridique pourrait être bénéfique.",
      relationnel: "Les règles implicites ou explicites de vos relations sont à clarifier. Un cadre sain protège les liens. Formalisez vos engagements si nécessaire." },
    '24': { /* Voyage */
      personnel: "Le Voyage vous appelle — déplacement géographique, exploration intérieure ou quête spirituelle. Partez à la découverte de nouveaux horizons, ils vous révéleront des facettes inconnues de vous-même.",
      professionnel: "Mobilité professionnelle, expatriation, missions à l'étranger ou simple besoin de changement. Le Voyage dynamise votre carrière et élargit vos perspectives.",
      relationnel: "Un voyage à deux renforcera vos liens, ou une rencontre surviendra lors d'un déplacement. Les relations à distance sont favorisées — la séparation géographique peut rapprocher les cœurs." },
    '25': { /* Fatalité */
      personnel: "Un événement inévitable se profile — vous ne pouvez le contourner, seulement l'accepter. La Fatalité n'est pas une punition mais une initiation : elle vous enseigne le lâcher-prise.",
      professionnel: "Une situation professionnelle échappe à votre contrôle. Plutôt que de lutter contre l'inévitable, concentrez votre énergie sur ce qui dépend vraiment de vous.",
      relationnel: "Une rupture ou une séparation semble inévitable. La Fatalité vous prépare à ce qui doit arriver — votre force réside dans votre capacité à traverser l'épreuve avec dignité." },
    '26': { /* Examen */
      personnel: "Vous êtes face à une évaluation — de vous-même ou par les autres. L'Examen vous invite à l'honnêteté : faites le bilan de vos forces et faiblesses sans complaisance ni sévérité excessive.",
      professionnel: "Un test, un entretien ou une évaluation professionnelle approche. Préparez-vous avec sérieux mais sans stress excessif. Cet examen révélera votre véritable niveau.",
      relationnel: "Vos relations passent un test — une crise qui éprouve la solidité des liens. Ce qui résiste à l'examen en sort renforcé ; ce qui s'effondre n'était pas fait pour durer." },
    '27': { /* Temps */
      personnel: "Rien ne sert de forcer — le Temps est votre allié. Chaque processus a sa durée propre, chaque fruit son moment de maturité. Cultivez la patience et respectez les cycles naturels de votre vie.",
      professionnel: "Vos projets demandent du temps pour aboutir. Ne précipitez rien — la maturation professionnelle suit son rythme. Le long terme récompense la patience stratégique.",
      relationnel: "Une relation a besoin de temps pour s'épanouir. Ne brûlez pas les étapes — laissez le lien se construire naturellement. Le temps révèle la vérité des sentiments." },
    '28': { /* Correspondance */
      personnel: "Un message important vous parvient ou va vous parvenir. Restez attentif aux signes, aux synchronicités et aux communications. L'univers vous parle à travers de multiples canaux.",
      professionnel: "Une nouvelle professionnelle est imminente — réponse à une candidature, proposition de collaboration, message d'un contact. Vérifiez vos courriels et soyez réactif.",
      relationnel: "Une communication importante avec un proche est à l'ordre du jour. Une lettre, un appel ou un message peut changer la dynamique d'une relation. Exprimez-vous clairement." },
    '29': { /* Contrat */
      personnel: "Un engagement formel ou informel se profile — envers vous-même ou envers autrui. Le Contrat vous invite à honorer vos promesses et à lire attentivement les termes de tout accord.",
      professionnel: "Signature de contrat, partenariat professionnel, accord formel. Le Contrat scelle un engagement important — soyez précis et clair sur les attentes mutuelles avant de signer.",
      relationnel: "Votre relation passe à une étape d'engagement — mariage, pacte civil, engagement verbal solennel. Le Contrat officialise un lien qui existait déjà dans les cœurs." },
    '30': { /* Échec */
      personnel: "Un revers douloureux vous confronte à vos limites. L'Échec n'est pas une fin mais un enseignement : il révèle ce qui doit être corrigé, transformé, ou abandonné. Chaque chute prépare une résilience.",
      professionnel: "Un projet n'aboutit pas, un objectif s'éloigne. Cet échec professionnel contient une leçon précieuse — analysez ce qui n'a pas fonctionné pour rebondir plus fort.",
      relationnel: "Une relation échoue ou traverse une crise grave. Cet échec affectif vous enseigne sur vos besoins réels et vos patterns relationnels. La guérison passe par la compréhension." },
    '31': { /* Évolution */
      personnel: "Vous progressez, vous grandissez, votre conscience s'élargit. L'Évolution célèbre votre chemin parcouru et vous encourage à poursuivre votre transformation personnelle avec confiance et détermination.",
      professionnel: "Votre carrière franchit un cap évolutif — formation, promotion, acquisition de nouvelles compétences. L'Évolution professionnelle est en marche, portée par vos efforts constants.",
      relationnel: "Vos relations évoluent vers plus de maturité et de profondeur. Vous attirez des liens qui correspondent à votre niveau de conscience actuel. L'ancien s'efface pour faire place au nouveau." },
    '32': { /* Bouclier */
      personnel: "Une protection bienveillante vous entoure — vos limites sont respectées, votre intégrité préservée. Le Bouclier vous invite à maintenir des frontières saines sans vous couper du monde.",
      professionnel: "Protégez vos intérêts professionnels — confidentialité, propriété intellectuelle, clauses contractuelles. Le Bouclier est un allié pour sécuriser votre position sans agressivité.",
      relationnel: "Des limites saines protègent vos relations. Le Bouclier vous aide à dire non quand c'est nécessaire, à vous préserver des énergies toxiques tout en restant ouvert à l'amour." },
    '33': { /* Accusation */
      personnel: "Vous vous sentez accusé — ou vous accusez les autres pour éviter de vous regarder. L'Accusation révèle un climat de reproche qui masque une vérité plus profonde. Cherchez la cause plutôt que le coupable.",
      professionnel: "Un conflit professionnel éclate — reproches, critiques, mise en cause. Gardez votre calme et concentrez-vous sur les faits plutôt que sur les personnes. La vérité finit toujours par émerger.",
      relationnel: "Des reproches empoisonnent vos relations. L'Accusation vous invite à dépasser le stade du blâme pour entrer dans un dialogue authentique sur vos besoins respectifs." },
    '34': { /* Verdict */
      personnel: "Une décision est rendue, une vérité est révélée. Le Verdict apporte la clarté que vous attendiez — même s'il n'est pas celui que vous espériez. Acceptez-le et avancez.",
      professionnel: "Un résultat professionnel tombe — décision hiérarchique, verdict juridique, aboutissement d'un projet. Quelle que soit l'issue, elle vous libère de l'incertitude.",
      relationnel: "Une réponse claire arrive dans votre vie affective. L'attente prend fin — cette clarification, même douloureuse, vous permet de tourner une page et d'envisager la suite." },
    '35': { /* Clairvoyance */
      personnel: "Votre intuition est à son apogée — faites-lui confiance. La Clairvoyance vous offre une lucidité exceptionnelle pour lire entre les lignes et percevoir ce qui échappe au regard ordinaire.",
      professionnel: "Votre flair professionnel est aiguisé. Faites confiance à votre instinct pour les décisions importantes — votre intuition capte des informations que votre raison n'a pas encore analysées.",
      relationnel: "Vous percevez la vérité de vos relations au-delà des apparences. Cette lucidité vous guide vers les personnes qui vous sont bénéfiques et vous éloigne de celles qui vous épuisent." },
    '36': { /* Enfermement */
      personnel: "Vous vous sentez prisonnier d'une situation, d'une peur ou d'un schéma répétitif. L'Enfermement révèle les barreaux invisibles que vous avez vous-même forgés — mais il vous montre aussi que la clé est dans votre poche.",
      professionnel: "Un sentiment d'enfermement professionnel vous oppresse — poste sans perspective, environnement toxique, peur de changer. Identifiez ce qui vous retient pour commencer à construire votre sortie.",
      relationnel: "Une relation est devenue une prison — dépendance affective, contrôle, routine étouffante. L'Enfermement vous alerte : il est temps de retrouver votre liberté, seul ou en redéfinissant la relation." },
    '37': { /* Étranger */
      personnel: "La rencontre avec l'inconnu vous transforme — nouvelle culture, nouveau milieu, ou découverte d'une part inexplorée de vous-même. L'Étranger est un messager d'expansion.",
      professionnel: "Un contexte professionnel étranger ou inhabituel s'ouvre à vous. L'expatriation, le travail avec l'international ou un changement radical de secteur sont favorisés.",
      relationnel: "Une rencontre avec une personne venue d'ailleurs ou très différente de vous est probable. L'Étranger vous invite à dépasser vos préjugés et à vous enrichir de l'altérité." },
    '38': { /* Compromis */
      personnel: "L'art du compromis consiste à trouver l'équilibre sans vous trahir. Le Compromis vous invite à négocier avec souplesse tout en restant fidèle à vos valeurs essentielles.",
      professionnel: "Une négociation professionnelle est en cours. Trouvez un terrain d'entente satisfaisant pour toutes les parties. Un accord équilibré vaut mieux qu'une victoire écrasante.",
      relationnel: "Le compromis est la clé de relations durables. Apprenez à céder sur ce qui est négociable sans renoncer à l'essentiel. L'amour mature sait trouver le juste milieu." },
    '39': { /* Victoire */
      personnel: "Vous triomphez d'une épreuve, vous atteignez un objectif important. La Victoire célèbre votre persévérance et votre force intérieure. Savourez cet accomplissement pleinement mérité.",
      professionnel: "Succès professionnel éclatant — promotion, reconnaissance, aboutissement d'un projet majeur. La Victoire confirme que vous êtes sur la bonne voie et que vos efforts portent leurs fruits.",
      relationnel: "Une victoire affective — réconciliation, déclaration d'amour, consolidation d'un lien précieux. La Victoire dans le domaine du cœur est la plus douce des réussites." },
    '40': { /* Ouverture */
      personnel: "Des portes s'ouvrent, des opportunités inédites se présentent. L'Ouverture vous invite à sortir de votre zone de confort et à accueillir l'inconnu avec curiosité et enthousiasme.",
      professionnel: "Nouvelles opportunités professionnelles — poste inattendu, projet innovant, réseau qui s'élargit. Restez réceptif aux propositions, même celles qui sortent de votre cadre habituel.",
      relationnel: "Vous vous ouvrez à de nouvelles rencontres ou à une nouvelle façon de vivre vos relations. L'Ouverture dissout les murs que vous aviez construits autour de votre cœur." },
    '41': { /* Instabilité */
      personnel: "Le sol tremble sous vos pieds — incertitudes, changements rapides, perte de repères. L'Instabilité est inconfortable mais passagère : elle précède une restructuration plus solide.",
      professionnel: "Turbulences professionnelles — restructuration, incertitude économique, changements fréquents. Gardez votre cap intérieur et restez flexible. La stabilité reviendra.",
      relationnel: "Vos relations sont instables — hauts et bas émotionnels, insécurité affective, changements d'humeur. Cherchez votre propre centre pour ne pas être ballotté par les fluctuations extérieures." },
    '42': { /* Retard */
      personnel: "Les choses n'avancent pas au rythme espéré — un délai, un obstacle temporel ralentit votre progression. Le Retard enseigne la patience : ce qui est différé n'est pas refusé.",
      professionnel: "Un projet prend du retard, une réponse tarde à venir. Utilisez ce temps pour peaufiner votre stratégie plutôt que de vous impatienter. Le timing parfait n'est pas le vôtre mais celui de l'univers.",
      relationnel: "Une rencontre ou une réconciliation est retardée. Le Retard vous prépare à recevoir cette relation dans de meilleures conditions. L'attente a un sens." },
    '43': { /* Trahison */
      personnel: "Une confiance a été brisée — par un proche, par la vie ou par vous-même. La Trahison est une blessure profonde, mais elle révèle aussi ce qui n'était pas authentique dans vos liens.",
      professionnel: "Méfiez-vous d'une trahison professionnelle — promesse non tenue, collègue déloyal, partenaire qui vous dessert. Protégez vos arrières sans sombrer dans la paranoïa.",
      relationnel: "La confiance est rompue dans une relation importante. Cette trahison affective est dévastatrice mais clarifie la vérité du lien. La reconstruction est possible si la sincérité revient." },
    '44': { /* Carrefour */
      personnel: "Vous êtes à la croisée des chemins — un choix important doit être fait. Le Carrefour ne décide pas pour vous mais éclaire les options. Écoutez votre cœur autant que votre raison.",
      professionnel: "Un choix de carrière décisif se présente — changement de voie, acceptation d'un poste, décision entrepreneuriale. Chaque direction mène à un destin différent. Pesez le pour et le contre.",
      relationnel: "Un choix affectif important vous attend — s'engager, partir, ou redéfinir la relation. Le Carrefour vous invite à une décision consciente plutôt qu'à un choix par défaut." },
    '45': { /* Retour */
      personnel: "Quelque chose ou quelqu'un revient dans votre vie — une opportunité, une personne, une situation passée. Le Retour n'est pas une régression mais une seconde chance de faire les choses autrement.",
      professionnel: "Une ancienne opportunité professionnelle refait surface — un poste que vous aviez refusé, un projet laissé de côté. Cette fois, vous avez la maturité pour le saisir différemment.",
      relationnel: "Une personne du passé réapparaît — ex-partenaire, vieil ami, membre de la famille éloigné. Le Retour vous offre une chance de clore ou de renouer." },
    '46': { /* Chance */
      personnel: "La fortune vous sourit — une opportunité providentielle se présente, une synchronicité favorable éclaire votre route. Saisissez cette chance sans hésitation ni fausse modestie.",
      professionnel: "Une opportunité professionnelle inespérée surgit. La Chance récompense ceux qui sont prêts — votre préparation rencontre enfin l'occasion. Ne la laissez pas passer.",
      relationnel: "Un heureux hasard amoureux — une rencontre fortuite qui pourrait changer votre vie. Restez ouvert et réceptif aux surprises que l'univers place sur votre chemin." },
    '47': { /* Joie */
      personnel: "La Joie pure et simple illumine votre être — une période de légèreté et de bonheur authentique. Ne cherchez pas à la mériter : accueillez-la simplement, comme un enfant accueille un rayon de soleil.",
      professionnel: "Satisfaction et plaisir au travail — un projet abouti, une ambiance positive, la reconnaissance de vos pairs. La Joie professionnelle est un puissant moteur de réussite.",
      relationnel: "Bonheur partagé dans vos relations — complicité, rires, moments précieux. La Joie est le ciment des liens durables. Célébrez les petits bonheurs du quotidien." },
    '48': { /* Réunion */
      personnel: "Des retrouvailles importantes se profilent — avec une personne, un lieu ou une partie de vous-même. La Réunion répare ce qui était séparé et renforce ce qui était dispersé.",
      professionnel: "Collaboration, fusion, association professionnelle. La Réunion annonce la convergence de forces complémentaires vers un objectif commun. L'union fait la force.",
      relationnel: "Retrouvailles affectives — réconciliation familiale, retour d'un être aimé, rapprochement amical. La Réunion guérit les blessures de la séparation." },
    '49': { /* Tranquillité */
      personnel: "La paix intérieure vous enveloppe — un moment de calme profond dans le tumulte de l'existence. La Tranquillité vous invite au repos, à la contemplation et à la régénération.",
      professionnel: "Une période de stabilité professionnelle — ni crise, ni révolution, mais une assise confortable. Profitez de ce calme pour consolider vos acquis et préparer l'avenir sereinement.",
      relationnel: "Harmonie et paix dans vos relations — les tensions s'apaisent, les conflits se résolvent. La Tranquillité offre un espace de douceur où les liens se renforcent en silence." },
    '50': { /* Cadeau */
      personnel: "Une bénédiction inattendue vous est offerte — un don de la vie que vous n'aviez pas demandé. Recevez avec gratitude, sans vous demander si vous le méritez. Le Cadeau est gratuit par essence.",
      professionnel: "Une opportunité professionnelle offerte sur un plateau — promotion inattendue, prime, proposition avantageuse. Ne la refusez pas par fausse modestie.",
      relationnel: "Un geste d'amour ou d'amitié désintéressé vous touche en plein cœur. Le Cadeau dans les relations parle de générosité pure, sans attente de retour." },
    '51': { /* Culpabilité */
      personnel: "Un poids moral vous accable — sentiment de faute réel ou imaginaire. La Culpabilité vous invite à distinguer la responsabilité authentique de l'auto-punition stérile.",
      professionnel: "Vous portez la culpabilité d'une erreur professionnelle. Assumez votre responsabilité sans vous flageller — la reconnaissance sincère de l'erreur est le premier pas vers sa réparation.",
      relationnel: "La culpabilité empoisonne vos relations — vous vous sentez redevable ou vous faites porter la faute à l'autre. Libérez-vous par le pardon, envers vous-même et envers autrui." },
    '52': { /* Miroir Magique */
      personnel: "Une protection supérieure vous enveloppe — les forces de lumière agissent en votre faveur. Le Miroir Magique transforme les obstacles en tremplins et révèle votre pouvoir personnel.",
      professionnel: "Une chance presque magique favorise votre carrière. Des synchronicités étonnantes, des portes qui s'ouvrent toutes seules — faites confiance à ce flux providentiel.",
      relationnel: "Vos souhaits amoureux sont exaucés — une rencontre magique, une réconciliation inespérée. Le Miroir Magique bénit votre vie affective d'une protection lumineuse." },
    '53': { /* Miroir Magnétique */
      personnel: "Ce miroir vous renvoie votre propre image — il est le reflet pur de votre identité. Qui êtes-vous vraiment ? Le Miroir Magnétique amorce une profonde introspection sur votre essence véritable.",
      professionnel: "Votre identité professionnelle est au cœur du questionnement. Êtes-vous aligné avec ce que vous faites ? Votre carrière reflète-t-elle qui vous êtes vraiment ?",
      relationnel: "Votre façon d'être en relation reflète votre identité profonde. Le Miroir Magnétique vous invite à examiner vos patterns affectifs et à vous demander s'ils expriment votre vérité." },
  };

  var PLANE_LABELS = {
    personnel: 'Personnel',
    professionnel: 'Professionnel',
    relationnel: 'Relationnel'
  };

  var PLANE_INTROS = {
    personnel: 'Voici la lecture de votre tirage sur le plan personnel. Chaque miroir éclaire une facette de votre chemin intérieur et de votre développement personnel.',
    professionnel: 'Voici la lecture de votre tirage sur le plan professionnel. Les miroirs révèlent les dynamiques de votre carrière, de vos projets et de votre vie matérielle.',
    relationnel: 'Voici la lecture de votre tirage sur le plan relationnel. Les miroirs vous parlent de vos liens affectifs, de votre vie amoureuse et de vos connexions humaines.'
  };

  var PLANE_SYNTH = {
    personnel: {
      positive: 'La dominante positive de ce tirage annonce une période favorable à l\'épanouissement personnel. Les miroirs lumineux vous guident vers le meilleur de vous-même.',
      negative: 'La dominante négative signale des défis personnels à relever. Ces miroirs difficiles ne sont pas des fatalités mais des invitations à un travail sur soi enrichissant.',
      neutral: 'La tonalité neutre du tirage suggère une période de recul et d\'observation. Prenez le temps de vous connaître avant d\'agir.'
    },
    professionnel: {
      positive: 'Les miroirs positifs dominent votre ciel professionnel. Opportunités, succès et reconnaissance sont au rendez-vous — avancez avec confiance.',
      negative: 'Des obstacles professionnels sont signalés. Prenez ces avertissements comme des guides pour affiner votre stratégie plutôt que comme des blocages définitifs.',
      neutral: 'La tonalité neutre invite à la réflexion stratégique. Analysez posément votre situation professionnelle avant de prendre des décisions.'
    },
    relationnel: {
      positive: 'Les miroirs positifs illuminent votre vie affective. Harmonie, rencontres et épanouissement amoureux bénéficient d\'une énergie chaleureuse.',
      negative: 'Des tensions affectives sont indiquées. Ces difficultés sont des opportunités de clarification et d\'approfondissement de vos liens.',
      neutral: 'Vos relations traversent une phase de stabilité. Profitez de cette période pour consolider vos liens sans précipitation.'
    }
  };

  function isReversed(card) {
    return !!(card && card.isReversed);
  }

  function getEffectiveTone(card) {
    if (!card) return '';
    var t = card.tone;
    if (!isReversed(card)) return t;
    if (t === 'positive') return 'négative';
    if (t === 'négative') return 'positive';
    return t;
  }

  function detectDominantTone(cards) {
    var tones = { positive: 0, negative: 0, neutral: 0 };
    cards.forEach(function (c) {
      var effTone = getEffectiveTone(c);
      if (tones.hasOwnProperty(effTone)) tones[effTone]++;
    });
    var best = null, max = 0;
    for (var t in tones) {
      if (tones[t] > max) { max = tones[t]; best = t; }
    }
    return best;
  }

  function projectSpread(cards, plane) {
    var reversedCount = 0;
    var entries = cards.map(function (card) {
      var cid = String(card.id).padStart(2, '0');
      var planeData = CARD_PLANES[cid];
      var isRev = !!(card.isReversed);
      if (isRev) reversedCount++;
      var revPrefix = isRev ? 'Inversée — énergie intériorisée ou contrariée : ' : '';
      var revSuffix = isRev ? ' (inversée)' : '';
      if (!planeData) return { cardName: card.name + revSuffix, kw: card.toneEmoji + ' ' + card.name + revSuffix, text: revPrefix + card.meaning };
      return {
        cardName: card.name + revSuffix,
        kw: card.toneEmoji + ' ' + card.name + revSuffix,
        text: revPrefix + (planeData[plane] || card.meaning)
      };
    });

    var dominantTone = detectDominantTone(cards);
    var synth = (dominantTone && PLANE_SYNTH[plane] && PLANE_SYNTH[plane][dominantTone])
      ? PLANE_SYNTH[plane][dominantTone]
      : 'Ce tirage vous offre un éclairage précieux. L\'Oracle des Miroirs ne prédit pas — il vous tend un reflet de votre vérité intérieure.';

    if (reversedCount > 0) {
      synth += ' Notez la présence de ' + reversedCount + ' carte' + (reversedCount > 1 ? 's' : '') + ' inversée' + (reversedCount > 1 ? 's' : '') + ' — leur énergie est intériorisée ou en cours de retournement.';
    }

    return {
      planeLabel: PLANE_LABELS[plane],
      intro: PLANE_INTROS[plane],
      entries: entries,
      synth: synth
    };
  }

  return {
    projectSpread: projectSpread
  };
})();
