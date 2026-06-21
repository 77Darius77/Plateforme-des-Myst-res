/* Interpretations par plan — Oracle Gé (Gérard Barbier, 1991) */
window.gePlanes = (function () {

  var CARD_PLANES = {
    /* ═══ CARTES POSITIVES ═══ */
    '01': { /* Le Soleil */
      personnel: "Rayonnement intérieur et confiance en soi retrouvée — période de vitalité optimale. Le Soleil dissipe les ombres du doute et vous reconnecte à votre essence lumineuse. Laissez-vous porter par cette énergie solaire qui régénère vos cellules et vos pensées.",
      professionnel: "Succès éclatant et reconnaissance publique dans votre carrière. Vos talents brillent et attirent l'attention des bonnes personnes. Une promotion, un projet abouti, une visibilité accrue — tout ce que vous entreprenez est illuminé. C'est le moment de rayonner et de saisir les opportunités.",
      relationnel: "Chaleur humaine et générosité dans vos relations. Vous attirez naturellement les autres par votre lumière intérieure. En amour, une période de bonheur partagé et de complicité rayonnante. Réconciliations favorisées, les malentendus se dissipent comme brume au soleil."
    },
    '02': { /* La Rose */
      personnel: "Éclosion de votre sensibilité et ouverture du cœur. La Rose vous invite à cultiver la beauté intérieure et à vous traiter avec douceur. C'est une période d'épanouissement personnel où vous pouvez enfin accueillir l'amour que vous méritez.",
      professionnel: "Une attention délicate ou une opportunité agréable se présente dans votre travail. Un projet créatif ou esthétique est favorisé. Les métiers d'art, de beauté ou de relation client bénéficient d'une énergie particulièrement florissante.",
      relationnel: "Romance, déclaration amoureuse ou geste tendre d'un être cher. La Rose annonce une période où l'amour s'exprime avec délicatesse. Pour les célibataires, une rencontre douce et sincère. Pour les couples, une renaissance de la tendresse."
    },
    '03': { /* Le Printemps */
      personnel: "Renouveau total de votre être — nouvelle coupe, nouvelle énergie, nouveau départ. Tout ce qui était en dormance s'éveille. C'est le moment d'initier des changements positifs dans votre hygiène de vie, votre état d'esprit et vos projets personnels.",
      professionnel: "Nouvelles opportunités professionnelles qui germent comme des bourgeons au printemps. Vos projets trouvent un terreau fertile. Lancement d'entreprise, nouveau poste, formation prometteuse — la saison est idéale pour semer ce que vous récolterez demain.",
      relationnel: "Renouveau affectif et fraîcheur dans les relations. Pour les couples, une nouvelle dynamique s'installe, légère et vivifiante. Pour les célibataires, une rencontre spontanée et rafraîchissante est probable. Les liens familiaux se ravivent."
    },
    '04': { /* Le Feu */
      personnel: "Retour aux sources et ancrage dans vos racines. Le Feu du foyer réchauffe votre cœur et sécurise votre espace intérieur. C'est le moment de prendre soin de votre chez-vous, de votre corps et de vos fondations personnelles.",
      professionnel: "Stabilité professionnelle et sécurité matérielle. Vos bases sont solides — investissez dans votre environnement de travail, aménagez votre espace, consolidez vos acquis. Les métiers liés à l'immobilier, l'habitat et la famille sont favorisés.",
      relationnel: "Harmonie familiale et chaleur du foyer. Les relations avec vos proches sont placées sous le signe de la protection et de la bienveillance. Vos racines affectives sont solides — prenez le temps de nourrir ce cocon protecteur."
    },
    '06': { /* Les Deux Cœurs */
      personnel: "Réconciliation intérieure entre votre cœur et votre raison. Les Deux Cœurs symbolisent l'harmonie retrouvée en vous-même. Vous êtes prêt à aimer et à être aimé pleinement. Guérison des blessures affectives du passé.",
      professionnel: "Partenariat professionnel fructueux et collaborations harmonieuses. Une alliance ou une association se forme dans un climat de confiance mutuelle. Les projets menés en binôme réussissent particulièrement bien.",
      relationnel: "Union amoureuse, rencontre décisive ou réconciliation majeure. Deux cœurs qui battent à l'unisson — l'amour partagé dans sa forme la plus pure. Cette carte est l'une des plus favorables pour la vie sentimentale."
    },
    '07': { /* Les Chiffres */
      personnel: "Votre bonne étoile brille — une période de chance et de synchronicités s'ouvre. Restez réceptif aux signes et aux opportunités inattendues. Les jeux du hasard vous sourient, mais surtout votre intuition est décuplée.",
      professionnel: "Gains inattendus, opportunités financières, investissements fructueux. Les Chiffres annoncent des rentrées d'argent surprenantes. C'est le moment de prendre des risques calculés — la fortune sourit aux audacieux.",
      relationnel: "Heureux hasard dans les rencontres. Vous pourriez croiser quelqu'un d'important de manière totalement inattendue. Laissez une place au hasard dans votre vie sociale — il pourrait bien vous surprendre agréablement."
    },
    '10': { /* Le Bateau */
      personnel: "L'appel du large et de l'inconnu résonne en vous. C'est le moment de quitter votre zone de confort pour explorer de nouveaux horizons intérieurs. Un voyage initiatique ou une expérience transformatrice vous attend.",
      professionnel: "Mobilité professionnelle, expatriation ou nouveau projet loin de vos bases habituelles. Le Bateau lève l'ancre — changement de cap favorable dans votre carrière. Les métiers du transport, du tourisme et de l'international sont bénis.",
      relationnel: "Une rencontre venue d'ailleurs ou une relation à distance se profile. Pour les couples, un voyage à deux renforcera vos liens. La distance n'est pas un obstacle mais une opportunité de grandir ensemble autrement."
    },
    '11': { /* Le Lion */
      personnel: "Affirmation de soi et prise de pouvoir personnelle. Le Lion rugit en vous — c'est le moment d'exprimer votre autorité naturelle avec bienveillance. Vous avez la force de surmonter tous les obstacles par votre seule présence.",
      professionnel: "Leadership reconnu et position dominante dans votre domaine. Vous êtes naturellement écouté et respecté. Prenez les rênes avec confiance — les projets que vous dirigez sont voués au succès. Négociations gagnantes.",
      relationnel: "Protection et loyauté envers vos proches. Vous êtes le pilier sur lequel on s'appuie. En amour, une relation passionnée et intense, mais attention à ne pas dominer l'autre. Équilibre entre puissance et tendresse."
    },
    '13': { /* Le Papillon */
      personnel: "Métamorphose profonde en cours — vous n'êtes plus la même personne qu'hier. Le Papillon annonce une transformation positive de votre identité, de votre apparence ou de votre état d'esprit. Laissez l'ancien mourir pour que le nouveau naisse.",
      professionnel: "Changement de carrière, reconversion ou évolution majeure de votre poste. Une transformation professionnelle bénéfique vous libère de ce qui vous pesait. Osez la mutation — elle vous mènera vers plus de légèreté et d'accomplissement.",
      relationnel: "Évolution positive de votre vie affective. Une relation se transforme pour le meilleur. Pour les célibataires, vous avez changé intérieurement et attirez désormais des personnes différentes. Légèreté et renouveau dans les liens."
    },
    '17': { /* L'Étoile */
      personnel: "Guidance céleste et protection invisible — une étoile veille sur votre chemin. Faites confiance à l'univers, même dans l'obscurité. L'espoir renaît et votre foi en la vie se restaure. Période de connexion spirituelle intense.",
      professionnel: "Inspiration créative et vision claire de votre avenir professionnel. Un mentor ou un guide apparaît pour éclairer votre route. Les projets à long terme reçoivent une bénédiction. Suivez votre bonne étoile professionnelle.",
      relationnel: "Espoir dans les affaires de cœur. Une nouvelle relation prometteuse s'annonce, guidée par une connexion presque spirituelle. Pour les couples, l'Étoile éclaire votre chemin commun et ravive la foi en l'autre."
    },
    '18': { /* La Cigogne */
      personnel: "Un nouveau chapitre de votre vie commence — renaissance, nouveau départ, arrivée imminente d'un changement majeur. Comme la cigogne qui apporte une nouvelle vie, préparez-vous à accueillir ce qui vient avec joie et ouverture.",
      professionnel: "Nouveau projet, création d'entreprise, arrivée dans une nouvelle équipe. La Cigogne apporte une opportunité professionnelle fraîche et prometteuse. C'est le début d'une aventure qui transformera votre carrière positivement.",
      relationnel: "Grossesse, naissance ou agrandissement de la famille. Pour les couples, un nouveau membre arrive — bébé ou nouvel ami proche. Pour les célibataires, une rencontre qui a le potentiel de tout changer et de créer une nouvelle famille."
    },
    '19': { /* L'Argent */
      personnel: "Prospérité et abondance matérielle en chemin. L'Argent n'est pas qu'une question de finances — c'est aussi l'abondance d'énergie, de reconnaissance et de satisfaction. Ouvrez-vous à recevoir sans culpabilité.",
      professionnel: "Rentrées financières favorables — augmentation, prime, nouveau client lucratif. Vos efforts sont récompensés sur le plan matériel. C'est le moment d'investir, d'épargner ou de négocier votre valeur. Succès commercial garanti.",
      relationnel: "Stabilité matérielle qui sécurise vos relations. L'Argent dans un tirage affectif parle de sécurité — vous pouvez construire une vie à deux sur des bases solides. Mais attention à ne pas réduire l'amour à des questions matérielles."
    },
    '20': { /* Les Deux Flûtes */
      personnel: "Joie de vivre et célébration de qui vous êtes. Les Deux Flûtes vous invitent à danser, chanter, fêter votre existence. Laissez place à la légèreté et au plaisir — vous l'avez bien mérité.",
      professionnel: "Succès à célébrer, événement professionnel festif, signature de contrat. Une ambiance de fête au travail — vos collègues et vous partagez une réussite collective. Les métiers de l'événementiel et du spectacle sont particulièrement favorisés.",
      relationnel: "Mariage, fiançailles, célébration amoureuse. Les Deux Flûtes sont la carte de l'union festive par excellence. Pour les célibataires, une rencontre lors d'une fête ou d'un événement social. Célébrez vos liens avec joie."
    },
    '23': { /* Les Outils */
      personnel: "Vous possédez déjà tout ce dont vous avez besoin pour réussir. Les Outils représentent vos talents, compétences et ressources intérieures. Cessez de chercher à l'extérieur — la solution est déjà entre vos mains.",
      professionnel: "Concrétisation et mise en œuvre de vos projets. Tout est en place pour agir — vous avez les compétences, les moyens et les contacts nécessaires. C'est une carte d'action : retroussons nos manches et construisons.",
      relationnel: "Dans les relations, les Outils indiquent que vous avez les moyens de réparer, construire ou améliorer vos liens. Communication pratique, gestes concrets — c'est par l'action que l'amour se prouve en ce moment."
    },
    '27': { /* L'Oiseau */
      personnel: "Une bonne nouvelle arrive ou un message important vous attend. Libérez-vous des chaînes mentales qui vous retiennent — comme l'oiseau, vous êtes fait pour voler librement. L'intuition parle, écoutez-la.",
      professionnel: "Communication, nouvelles professionnelles, courrier ou appel décisif. L'Oiseau apporte un message qui fera avancer votre carrière. Les métiers de la communication, du journalisme et des médias sont favorisés.",
      relationnel: "Des nouvelles d'un être cher arrivent. Un message important concernant votre vie affective — déclaration, clarification ou retrouvailles. L'Oiseau favorise la communication dans le couple et les échanges sincères."
    },
    '28': { /* Le Cadeau */
      personnel: "Recevez avec gratitude ce que la vie vous offre — un cadeau inattendu, une aide providentielle, une bénédiction. Le Cadeau vous rappelle que vous méritez de recevoir sans condition. Ouvrez les mains et le cœur.",
      professionnel: "Faveur inattendue, recommandation précieuse, opportunité offerte sur un plateau. Quelqu'un vous tend la main professionnellement — acceptez cette aide avec reconnaissance. Les cadeaux professionnels arrivent souvent par des personnes bienveillantes.",
      relationnel: "Geste d'amour, attention touchante, cadeau d'un être cher. Vous êtes aimé et on vous le montre. Pour les célibataires, une rencontre qui a tout d'un cadeau du destin. Pour les couples, une surprise qui renforce vos liens."
    },
    '29': { /* La Poignée de Mains */
      personnel: "Réconciliation intérieure et accord avec vous-même. Vous serrez la main de toutes les parts de votre être. Acceptation de soi et paix intérieure scellent une nouvelle alliance entre votre tête, votre cœur et votre corps.",
      professionnel: "Signature de contrat, partenariat, accord professionnel majeur. La Poignée de Mains scelle une alliance durable et bénéfique. C'est le moment de formaliser vos engagements — tout accord signé sous cette carte sera solide.",
      relationnel: "Réconciliation, engagement officialisé, accord trouvé dans le couple. La Poignée de Mains est la carte de la paix retrouvée — les conflits s'apaisent, les malentendus se dissipent. Amitié renforcée, amour consolidé."
    },
    '31': { /* Le Chien */
      personnel: "Un ami fidèle veille sur vous. Cultivez la loyauté envers vous-même — soyez votre meilleur ami. Le Chien incarne la fidélité à vos valeurs et à votre parole. Une présence rassurante vous accompagne.",
      professionnel: "Soutien loyal d'un collègue ou d'un mentor. Un collaborateur fidèle vous épaule dans un projet important. Les relations professionnelles fondées sur la confiance et la loyauté sont protégées et prospèrent.",
      relationnel: "Amitié indéfectible, loyauté amoureuse, présence rassurante d'un être cher. Le Chien est le symbole du compagnon qui ne trahit jamais. En amour, une relation fondée sur la fidélité et le soutien mutuel."
    },
    '34': { /* L'Écureuil */
      personnel: "Prévoyance et sagesse dans la gestion de votre énergie vitale. Comme l'écureuil qui fait ses réserves, prenez soin de votre capital santé et de votre équilibre. Période propice à l'épargne et à la planification à long terme.",
      professionnel: "Gestion financière prudente et fructueuse. L'Écureuil conseille d'épargner, d'investir avec sagesse et de préparer l'avenir. Les petites économies d'aujourd'hui seront les grandes ressources de demain. Stabilité matérielle assurée.",
      relationnel: "Construire une relation sur des bases solides et durables. Prenez le temps de nourrir vos liens, investissez dans la qualité plutôt que la quantité. L'Écureuil parle d'un amour qui se construit patiemment, jour après jour."
    },
    '37': { /* Le Coquillage */
      personnel: "Besoin de repos, de recul et de ressourcement. Le Coquillage vous invite à vous retirer dans votre coquille protectrice pour recharger vos batteries. Écoutez le silence — il a beaucoup à vous dire.",
      professionnel: "Période de pause méritée dans votre carrière. Vacances, congés ou ralentissement bénéfique. Ne culpabilisez pas de lever le pied — cette pause régénératrice vous rendra plus productif et créatif au retour.",
      relationnel: "Besoin d'intimité et de moments à deux loin du tumulte. Pour les célibataires, une période de repli affectif salutaire avant de s'ouvrir à nouveau. Pour les couples, offrez-vous une escapade à deux."
    },
    '38': { /* L'Éléphant */
      personnel: "Sagesse intérieure et force tranquille. L'Éléphant vous connecte à votre mémoire profonde et à votre expérience accumulée. Vous portez chance par votre seule présence — faites confiance à votre sagesse instinctive.",
      professionnel: "Soutien puissant, protection hiérarchique, réussite durable. L'Éléphant est le symbole du succès qui dure et de la force tranquille dans les affaires. Une personne influente vous soutient. Projets de longue haleine favorisés.",
      relationnel: "Relations solides fondées sur le respect et la mémoire partagée. L'Éléphant parle d'un amour qui n'oublie pas, d'une amitié qui traverse le temps. Une figure protectrice veille sur vous affectivement."
    },
    '43': { /* La Harpe */
      personnel: "Expression créative et harmonie intérieure. La Harpe vous invite à laisser parler l'artiste en vous — musique, écriture, peinture, danse. Votre sensibilité est votre plus grande force. Laissez résonner la beauté qui est en vous.",
      professionnel: "Créativité professionnelle à son apogée. Projets artistiques, innovations, solutions élégantes — la Harpe favorise tout ce qui demande de l'harmonie et de l'esthétique. Les métiers créatifs sont particulièrement bénis.",
      relationnel: "Harmonie amoureuse et complicité profonde. La Harpe évoque une relation où l'on vibre sur la même fréquence. Pour les célibataires, une rencontre harmonieuse qui résonne avec votre âme. Communication fluide et apaisée."
    },
    '54': { /* La Campagne */
      personnel: "Retour à la simplicité et à l'essentiel. La Campagne vous enjoint de ralentir, de respirer et de vous reconnecter à la nature. Votre corps et votre esprit réclament le calme et l'authenticité.",
      professionnel: "Période de ralentissement professionnel bénéfique. Peut indiquer un intérêt pour des métiers en lien avec la nature, l'agriculture ou l'écologie. Recherche d'un meilleur équilibre entre vie professionnelle et personnelle.",
      relationnel: "Relations simples, authentiques et sans artifice. La Campagne parle d'un amour qui se vit au naturel, loin des complications. Pour les couples, besoin de simplicité et de moments vrais à deux. Amitiés sincères."
    },
    '56': { /* La Pyramide */
      personnel: "Élévation personnelle et accomplissement durable. Vous construisez quelque chose de solide qui résistera au temps. La Pyramide est le symbole de votre évolution — chaque pierre posée avec patience vous élève un peu plus.",
      professionnel: "Réussite monumentale et reconnaissance durable dans votre carrière. Promotion, aboutissement d'un grand projet, notoriété. Ce que vous construisez aujourd'hui deviendra votre héritage professionnel. Visez haut, construisez solide.",
      relationnel: "Relation stable et durable, construite pierre par pierre. La Pyramide parle d'un amour qui résiste au temps et aux épreuves. Pour les célibataires, une rencontre qui a le potentiel de durer toute une vie."
    },
    '60': { /* La Colombe */
      personnel: "Paix intérieure et sérénité retrouvée. La Colombe annonce la fin des tourments et le retour à l'harmonie. Votre esprit s'apaise, vos tensions se dissolvent. Une période de calme profond s'ouvre devant vous.",
      professionnel: "Conflits professionnels qui s'apaisent — médiation réussie, accord trouvé. La Colombe apporte la paix dans votre environnement de travail. Les négociations aboutissent dans un climat serein.",
      relationnel: "Réconciliation et retour à l'harmonie affective. La Colombe est la carte de la paix dans le couple — les disputes s'éteignent, la compréhension renaît. Pour tous, retour à des relations apaisées et bienveillantes."
    },

    /* ═══ CARTES NÉGATIVES ═══ */
    '08': { /* L'Araignée */
      personnel: "Attention aux pièges que vous vous tendez à vous-même — pensées négatives, anxiété, rumination. L'Araignée révèle une toile mentale dont il est temps de vous libérer. Identifiez ce qui vous retient prisonnier de vous-même.",
      professionnel: "Méfiance au travail — manipulation possible, ambiance toxique, pièges administratifs. L'Araignée avertit d'une situation professionnelle où des fils se tissent dans votre dos. Restez vigilant et documentez tout.",
      relationnel: "Une relation toxique ou manipulatrice pourrait vous emprisonner. Méfiez-vous des personnes qui tissent leur toile autour de vous. L'Araignée appelle à couper les liens malsains pour retrouver votre liberté affective."
    },
    '09': { /* L'Escargot */
      personnel: "Tout vous semble lent — frustration, impatience, sentiment de stagnation. Mais l'Escargot enseigne que la lenteur peut être protectrice. Ce qui tarde à venir se prépare en profondeur. Acceptez ce rythme imposé.",
      professionnel: "Retards, blocages administratifs, lenteur des processus. Les projets n'avancent pas au rythme souhaité. L'Escargot conseille la patience — tout arrive à point à qui sait attendre. Ne brusquez rien.",
      relationnel: "Évolution lente d'une relation ou stagnation affective. L'autre avance à son rythme, pas au vôtre. L'Escargot invite à respecter la temporalité de chacun — forcer les choses ne fera que ralentir davantage."
    },
    '12': { /* Le Poignard */
      personnel: "Conflit intérieur aigu — colère refoulée, frustration explosive, mots durs envers vous-même. Le Poignard avertit d'une tension qui cherche à s'exprimer. Canalisez cette énergie avant qu'elle ne blesse.",
      professionnel: "Conflit ouvert au travail, rivalité agressive, parole blessante. Le Poignard annonce une dispute ou une tension professionnelle majeure. Protégez vos arrières et pesez vos mots soigneusement.",
      relationnel: "Dispute violente, rupture brutale ou parole qui tranche. Le Poignard dans les relations annonce un conflit qui peut être destructeur. Avant de parler, respirez — les mots peuvent être des armes."
    },
    '25': { /* Le Point d'Exclamation */
      personnel: "Alerte — un événement soudain vous percute. Le Point d'Exclamation annonce une surprise qui peut être un choc. Restez centré et ne réagissez pas à chaud. Ce qui arrive est un signal, pas une fatalité.",
      professionnel: "Nouvelle choc dans votre carrière — annonce soudaine, restructuration, surprise désagréable. Restez calme et analyser la situation avant d'agir. Cette alerte vous prépare à réagir intelligemment.",
      relationnel: "Révélation soudaine dans une relation — secret dévoilé, déclaration inattendue, crise. Le Point d'Exclamation secoue votre vie affective. Le choc initial passé, vous y verrez plus clair."
    },
    '26': { /* Le Désert */
      personnel: "Sentiment de vide, solitude intérieure, période aride. Le Désert est une traversée nécessaire — tout semble stérile mais quelque chose se prépare sous la surface. Cette épreuve forge votre résilience.",
      professionnel: "Période de vaches maigres — projets qui n'aboutissent pas, manque d'opportunités. Le Désert professionnel est temporaire. Profitez-en pour vous former et préparer la prochaine oasis.",
      relationnel: "Solitude affective, sentiment d'abandon, isolement. Le Désert dans les relations est douloureux mais initiatique. Cette traversée vous apprendra à vous suffire à vous-même avant d'accueillir l'autre."
    },
    '32': { /* Le Serpent */
      personnel: "Méfiez-vous de vos propres mensonges intérieurs — auto-illusion, déni, jalousie envers vous-même. Le Serpent révèle une part d'ombre qui demande à être regardée en face avec honnêteté.",
      professionnel: "Trahison ou hypocrisie dans votre environnement professionnel. Quelqu'un joue double jeu. Le Serpent avertit d'une personne toxique au travail — observez sans vous confier imprudemment.",
      relationnel: "Trahison amoureuse, jalousie destructrice, mensonge dans le couple. Le Serpent est l'une des cartes les plus redoutées en amour. Elle ne condamne pas la relation mais exige la vérité — aussi douloureuse soit-elle."
    },
    '35': { /* L'Hôpital */
      personnel: "Votre corps réclame de l'attention — fatigue accumulée, santé fragilisée, besoin de soins. L'Hôpital n'annonce pas forcément une maladie grave mais un avertissement à prendre votre santé au sérieux.",
      professionnel: "Période d'arrêt maladie possible ou besoin de ralentir professionnellement pour raisons de santé. Ne repoussez pas les consultations médicales. Votre carrière attendra — votre santé d'abord.",
      relationnel: "Une relation qui a besoin de soins — comme un patient, votre couple réclame de l'attention. Ou annonce qu'un proche aura besoin de votre soutien médical. Prenez soin de ceux que vous aimez."
    },
    '36': { /* Le Cœur Partagé */
      personnel: "Blessure affective profonde, chagrin qui demande à être pleuré. Le Cœur Partagé évoque une peine qui vous traverse. Ce deuil émotionnel est nécessaire — laissez les larmes couler, elles nettoient l'âme.",
      professionnel: "Séparation professionnelle douloureuse — départ d'un collègue apprécié, rupture de contrat, projet qui vous tenait à cœur abandonné. Ce qui se termine ouvre la place à autre chose.",
      relationnel: "Rupture amoureuse, divorce, séparation douloureuse. Le Cœur Partagé annonce une peine sentimentale. Mais un cœur brisé peut aussi signifier un cœur qui s'ouvre — après la douleur viendra la renaissance."
    },
    '39': { /* Le Rat */
      personnel: "On vous subtilise de l'énergie — personnes toxiques, situations drainantes, petits soucis qui s'accumulent. Le Rat avertit de pertes matérielles ou énergétiques. Protégez vos biens et votre paix intérieure.",
      professionnel: "Perte financière, vol ou escroquerie possible. Vérifiez vos comptes et vos contrats. Le Rat signale qu'on pourrait profiter de votre confiance. Soyez vigilant dans vos transactions.",
      relationnel: "Quelqu'un profite de votre générosité sans contrepartie. Le Rat révèle une relation déséquilibrée où vous donnez trop. Méfiez-vous des personnes qui grignotent votre énergie sans jamais rien rendre."
    },
    '53': { /* La Flûte Brisée */
      personnel: "Sentiment d'échec, désillusion, perte de sens. La musique s'est arrêtée et le silence fait mal. Mais une flûte brisée peut annoncer la fin d'une illusion nécessaire — pour mieux reconstruire sur du vrai.",
      professionnel: "Échec d'un projet, contrat rompu, désaccord professionnel. La Flûte Brisée parle de ce qui se casse dans votre carrière. Ce n'est pas une fin mais une remise à zéro — une nouvelle mélodie pourra naître.",
      relationnel: "Divorce, rupture douloureuse, harmonie brisée. La Flûte Brisée annonce la fin d'une relation qui n'était plus viable. Acceptez ce qui est cassé pour pouvoir reconstruire."
    },
    '55': { /* L'Automne */
      personnel: "Bilan de vie, acceptation du déclin temporaire, nostalgie. L'Automne vous invite à faire le tri — ce qui doit tomber, tombe. Acceptez cette loi des cycles sans mélancolie excessive.",
      professionnel: "Fin de cycle professionnel — retraite, départ, projet qui s'achève. L'Automne n'est pas un échec mais un aboutissement naturel. Récoltez les fruits de votre travail et préparez l'hiver sereinement.",
      relationnel: "Une relation qui arrive à son terme naturel ou qui mûrit vers une nouvelle phase. L'Automne parle de transformation — l'amour passionné devient amour mature. Ne vous accrochez pas aux feuilles mortes."
    },
    '57': { /* Le Lynx */
      personnel: "Quelque chose vous est caché — ou vous vous cachez quelque chose à vous-même. Le Lynx perce les illusions. Regardez la vérité en face, même inconfortable. La lucidité est votre bouclier.",
      professionnel: "Mensonge, rumeur ou calomnie dans votre environnement professionnel. On vous cache une information importante. Le Lynx vous donne la capacité de voir clair — faites confiance à votre flair.",
      relationnel: "Infidélité, mensonge par omission, secret dans le couple. Le Lynx révèle ce qui était dissimulé. La vérité va éclater — préparez-vous à l'entendre. Mieux vaut une vérité dure qu'un mensonge confortable."
    },
    '58': { /* La Croix */
      personnel: "Épreuve majeure, deuil ou transformation imposée par la vie. La Croix est lourde à porter mais elle est aussi le symbole de la résurrection. Cette épreuve vous transformera profondément.",
      professionnel: "Changement imposé et non désiré — licenciement, fermeture, restructuration subie. La Croix professionnelle est difficile mais elle annonce une renaissance future. Tenez bon, ce n'est qu'un passage.",
      relationnel: "Deuil affectif, séparation imposée par les circonstances, perte d'un être cher. La Croix est l'une des cartes les plus difficiles en amour. Elle n'annonce pas la fin de l'amour mais sa transformation."
    },
    '59': { /* La Chauve-Souris */
      personnel: "Peurs nocturnes, angoisses irrationnelles, ombres qui vous hantent. La Chauve-Souris révèle vos démons intérieurs — regardez-les en face, ils perdront leur pouvoir.",
      professionnel: "Conflit familial qui impacte votre travail, danger invisible dans votre environnement professionnel. La Chauve-Souris suggère des tensions cachées qui minent l'ambiance.",
      relationnel: "Conflit familial larvé, trahison dans le cercle proche, secret de famille. La Chauve-Souris parle de ce qui se trame dans l'ombre de vos relations. Mettez de la lumière sur ces zones d'ombre."
    },

    /* ═══ CARTES NEUTRES (sélection) ═══ */
    '05': { /* Les Tours */
      personnel: "Besoin de solitude au milieu de la foule — sentiment d'anonymat, de n'être qu'un parmi tant d'autres. Les Tours vous invitent à trouver votre espace personnel même dans l'agitation urbaine.",
      professionnel: "Environnement professionnel urbain, grande structure, administration. Les Tours parlent de bureaucratie et d'anonymat au travail. Faites-vous remarquer par la qualité plutôt que par le bruit.",
      relationnel: "Sentiment de solitude dans la foule ou dans le couple — vous êtes entouré mais vous vous sentez seul. Les Tours invitent à créer de l'intimité malgré l'agitation environnante."
    },
    '14': { /* La Pensée */
      personnel: "Période de réflexion et d'introspection profonde. Prenez le temps de peser le pour et le contre avant toute décision. La Pensée favorise la méditation, l'étude et la maturation mentale.",
      professionnel: "Planification stratégique, analyse de projet, recul nécessaire avant d'agir. La Pensée vous conseille de réfléchir avant de vous lancer. Les décisions mûrement réfléchies seront les plus solides.",
      relationnel: "Prenez du recul sur votre vie affective — analysez vos schémas relationnels. La Pensée invite à réfléchir avant de parler ou d'agir en amour. La compréhension précède la résolution."
    },
    '15': { /* Les Symboles Sexuels */
      personnel: "Énergie vitale et désir puissants — votre corps parle, écoutez-le. Les Symboles Sexuels parlent de vitalité, de créativité et de force de vie. Canalisez cette énergie puissante.",
      professionnel: "Créativité débridée, énergie entrepreneuriale, audace. Dans le travail, les Symboles Sexuels parlent de passion pour ce que vous faites. Mettez du désir dans vos projets.",
      relationnel: "Attraction magnétique, désir puissant, alchimie sexuelle. Une rencontre passionnelle est probable. Pour les couples, ravivez la flamme du désir. Attention à ne pas confondre passion et amour durable."
    },
    '16': { /* La Route */
      personnel: "À la croisée des chemins — un choix important vous attend. La Route symbolise votre libre arbitre : quelle direction allez-vous prendre ? Cette décision définira votre prochain chapitre de vie.",
      professionnel: "Choix de carrière déterminant, bifurcation professionnelle, nouvelle direction. La Route vous met face à une décision — aucun choix n'est mauvais si vous l'assumez pleinement.",
      relationnel: "Décision amoureuse — choisir entre deux chemins affectifs. La Route dans les relations annonce un choix important : s'engager ou partir, pardonner ou tourner la page."
    },
    '21': { /* Les Trois Lunes */
      personnel: "Intuition décuplée et connexion aux cycles naturels. Les Trois Lunes vous invitent à écouter votre sixième sens — quelque chose se prépare dans les 30 jours. Faites confiance à vos rêves.",
      professionnel: "Un projet ou une opportunité se manifestera dans le mois. Les Trois Lunes parlent de gestation professionnelle — ce qui est en train de se préparer porte l'empreinte du mystère et de la réussite.",
      relationnel: "Événement affectif dans les 30 jours — rencontre, déclaration ou clarification. Les Trois Lunes favorisent l'intuition amoureuse. Écoutez votre cœur plus que votre raison."
    },
    '22': { /* La Bougie */
      personnel: "Connexion spirituelle et méditation profonde. La Bougie est votre flamme intérieure — nourrissez votre foi, quelle qu'elle soit. Cette lumière vous guide dans l'obscurité.",
      professionnel: "Inspiration divine dans votre travail — une idée lumineuse émerge. La Bougie parle de vocation plus que de carrière. Votre travail peut devenir une offrande si vous y mettez votre âme.",
      relationnel: "Amour spirituel, connexion d'âme à âme, relation qui élève. La Bougie parle de liens qui transcendent le physique. Une rencontre qui a du sens, un amour qui fait grandir spirituellement."
    },
    '24': { /* L'Été */
      personnel: "Plénitude et épanouissement personnel. Comme la nature en été, vous êtes au sommet de votre forme. Profitez de cette période faste pour concrétiser vos désirs et rayonner pleinement.",
      professionnel: "Plein rendement professionnel — vos projets arrivent à maturité. Récoltez ce que vous avez semé. L'Été favorise les résultats concrets et la reconnaissance de votre travail.",
      relationnel: "Relations chaleureuses et épanouissantes. L'Été en amour parle de passion douce, de complicité joyeuse et de moments lumineux partagés. Profitez de cette belle saison affective."
    },
    '30': { /* La Balance */
      personnel: "Recherchez l'équilibre dans tous les aspects de votre vie. La Balance pèse le pour et le contre — prenez le temps de trouver votre point d'équilibre personnel avant toute décision.",
      professionnel: "Décision professionnelle à peser soigneusement — négociation commerciale, contrat à évaluer. La Balance indique que l'issue sera juste si vous restez équitable.",
      relationnel: "Équilibre à trouver dans le couple — donner et recevoir doivent s'équilibrer. La Balance signale une relation où la justice doit prévaloir. Pesez vos mots et vos actes avec équité."
    },
    '33': { /* Le Stéthoscope */
      personnel: "Écoutez votre corps — il vous parle. Fatigue, petit symptôme, besoin de repos. Le Stéthoscope conseille un bilan de santé préventif. Votre corps est votre temple, prenez-en soin.",
      professionnel: "Diagnostic professionnel — analysez la santé de votre carrière. Le Stéthoscope invite à ausculter vos projets : sont-ils viables ? Nécessitent-ils des soins ?",
      relationnel: "Écoutez vraiment l'autre — au-delà des mots, entendez ce que son cœur exprime. Le Stéthoscope dans les relations parle d'empathie et d'attention profonde aux besoins de l'être aimé."
    },
    '40': { /* Les Papiers */
      personnel: "Démarches administratives à accomplir — papiers, formulaires, inscriptions. Ne repoussez pas ces formalités, elles sont importantes pour votre stabilité.",
      professionnel: "Contrats, signatures, dossiers administratifs au premier plan. Les Papiers annoncent une période de formalisation — tout doit être écrit, signé, enregistré. Soyez méticuleux.",
      relationnel: "Formalisation d'une relation — PACS, mariage, contrat. Les Papiers parlent d'officialiser un lien. Ou de régulariser une situation affective sur le plan administratif."
    },
    '41': { /* L'Hiver */
      personnel: "Période de repli et d'introspection — tout est en dormance. Ne forcez rien, l'Hiver est un temps de gestation. Ce qui se prépare dans le silence éclora au printemps.",
      professionnel: "Ralentissement professionnel temporaire — baisse d'activité, pause dans les projets. Utilisez cet hiver professionnel pour préparer le printemps à venir.",
      relationnel: "Refroidissement temporaire d'une relation — besoin de distance. L'Hiver n'est pas la fin de l'amour mais son repos. Respectez le besoin de l'autre de prendre du recul."
    },
    '42': { /* Les Flèches */
      personnel: "Décision rapide à prendre — ne tergiversez plus, le temps presse. Les Flèches indiquent la direction à suivre. Faites confiance à votre premier mouvement.",
      professionnel: "Opportunités multiples, choix rapides à faire. Les Flèches parlent de dynamisme professionnel — plusieurs options s'offrent à vous, choisissez vite et bien.",
      relationnel: "Décision amoureuse urgente — vous ne pouvez plus rester dans l'indécision. Les Flèches pointent vers la direction juste. Suivez votre intuition amoureuse."
    },
    '44': { /* La Justice */
      personnel: "Vos actions passées trouvent leur juste retour — positif ou négatif. La Justice est impartiale : elle reflète ce que vous avez semé. Acceptez le verdict avec équanimité.",
      professionnel: "Affaire juridique, jugement, décision légale. La Justice annonce une issue favorable si vous êtes dans votre bon droit. Tout procès ou litige trouvera une résolution équitable.",
      relationnel: "Équité dans les relations — ce que vous donnez vous est rendu. La Justice invite à traiter l'autre avec équité. En cas de conflit, une médiation aboutira à une solution juste."
    },
    '52': { /* L'Homme Âgé */
      personnel: "Sagesse des anciens et transmission spirituelle. L'Homme Âgé vous connecte à l'expérience accumulée et au respect des traditions. Un conseil avisé vous sera donné.",
      professionnel: "Conseil d'un mentor expérimenté, transmission de savoir-faire. L'Homme Âgé représente une figure d'autorité bienveillante. Écoutez les anciens dans votre domaine.",
      relationnel: "Soutien d'un aîné, conseil d'un grand-parent, sagesse transmise. Dans le couple, l'Homme Âgé parle de maturité et de patience. L'amour se bonifie avec le temps."
    },
    '61': { /* Le Parchemin */
      personnel: "Engagement formel envers vous-même — un pacte personnel qui scelle une décision importante. Le Parchemin officialise ce qui n'était qu'une intention.",
      professionnel: "Signature de contrat, diplôme, certification officielle. Le Parchemin annonce un engagement professionnel écrit et solennel. Tout document signé sous cette carte aura force et durée.",
      relationnel: "Engagement officialisé — promesse, contrat de mariage, accord écrit entre partenaires. Le Parchemin donne du poids à vos paroles. En amour, le temps des promesses orales est révolu."
    },

    /* ═══ CARTES PERSONNAGES ═══ */
    '45': { /* La Jeune Fille */
      personnel: "Une énergie jeune et fraîche vous habite — renouveau, spontanéité, regard neuf. Connectez-vous à la jeune fille en vous, celle qui croit encore en la magie de la vie.",
      professionnel: "Une jeune femme dans votre entourage professionnel — collègue, stagiaire, recrue prometteuse. Son énergie fraîche peut dynamiser vos projets.",
      relationnel: "Une jeune femme importante dans votre vie — fille, sœur, amie. En amour, peut représenter une nouvelle relation ou le côté juvénile de votre partenaire."
    },
    '46': { /* Le Jeune Homme */
      personnel: "L'énergie du renouveau masculin — élan, dynamisme, courage d'entreprendre. Le Jeune Homme en vous veut conquérir le monde. Canalisez cette fougue créatrice.",
      professionnel: "Un jeune homme dynamique dans votre sphère professionnelle — nouveau collègue, associé prometteur, concurrent. Sa présence peut être un atout ou un défi.",
      relationnel: "Un jeune homme important dans votre vie — fils, frère, ami. En amour, peut représenter un nouveau partenaire ou l'aspect juvénile de votre conjoint."
    },
    '47': { /* La Femme */
      personnel: "Votre féminin sacré s'exprime pleinement — intuition, réceptivité, puissance créatrice. La Femme vous invite à honorer votre nature profonde, au-delà des stéréotypes.",
      professionnel: "Une femme influente dans votre carrière — supérieure, collègue, associée. Sa présence est bénéfique et structurante. Autorité féminine bienveillante.",
      relationnel: "Figure féminine centrale de votre vie — mère, épouse, amie. La Femme représente la maturité affective, la capacité à aimer profondément et durablement."
    },
    '48': { /* L'Homme */
      personnel: "Votre masculin sacré s'affirme — structure, protection, action juste. L'Homme vous invite à incarner votre autorité avec bienveillance et force tranquille.",
      professionnel: "Un homme influent dans votre sphère professionnelle — patron, mentor, associé. Figure d'autorité masculine constructive. Soutien professionnel solide.",
      relationnel: "Figure masculine centrale de votre vie — père, époux, ami. L'Homme représente la stabilité affective, la protection et la loyauté dans les relations."
    },
    '49': { /* La Consultante */
      personnel: "Carte de protection personnelle — vous êtes protégée dans cette période. La Consultante reflète votre propre image dans le miroir divinatoire. Faites-vous confiance.",
      professionnel: "Protection professionnelle particulière — une aide féminine vous soutient. Vous êtes vue favorablement par votre environnement de travail.",
      relationnel: "Vous êtes au centre de vos relations — protégez votre espace affectif. La Consultante parle d'amour-propre et de respect de soi dans les relations."
    },
    '50': { /* Le Consultant */
      personnel: "Carte de victoire personnelle — vous avez toutes les cartes en main. Le Consultant représente votre pouvoir d'agir et de réussir par vous-même.",
      professionnel: "Succès professionnel garanti — vous êtes l'acteur principal de votre réussite. Le Consultant annonce une période où votre volonté suffit à faire aboutir vos projets.",
      relationnel: "Vous avez le pouvoir dans vos relations — utilisez-le avec sagesse. Le Consultant parle d'autonomie affective et de capacité à créer des relations équilibrées."
    },
    '51': { /* La Femme Âgée */
      personnel: "Sagesse féminine profonde et transmission spirituelle. La Femme Âgée vous connecte à la grande mère intérieure. Écoutez sa voix douce qui vous guide.",
      professionnel: "Conseil d'une femme expérimentée dans votre domaine — mentor, formatrice, référence. Son expérience éclaire votre chemin professionnel.",
      relationnel: "Conseil d'une aînée, sagesse de grand-mère, soutien maternel. La Femme Âgée parle de l'amour inconditionnel et de la bienveillance qui traverse les générations."
    },
  };

  var PLANE_LABELS = {
    personnel: 'Personnel',
    professionnel: 'Professionnel',
    relationnel: 'Relationnel'
  };

  var PLANE_INTROS = {
    personnel: 'Voici la lecture de votre tirage sur le plan personnel. Chaque carte éclaire une facette de votre chemin intérieur.',
    professionnel: 'Voici la lecture de votre tirage sur le plan professionnel. Découvrez ce que les cartes révèlent de votre carrière et de vos projets.',
    relationnel: 'Voici la lecture de votre tirage sur le plan relationnel. Les cartes vous parlent de vos liens affectifs et de votre vie sentimentale.'
  };

  var PLANE_SYNTH = {
    personnel: {
      positive: 'La dominante positive de ce tirage annonce une période favorable à l\'épanouissement personnel. Les énergies constructives vous portent vers le meilleur de vous-même.',
      negative: 'La dominante négative de ce tirage signale des défis personnels à relever. Ces cartes ne sont pas des fatalités mais des invitations à la vigilance et au travail sur soi.',
      neutral: 'La dominante neutre de ce tirage suggère une période de recul et de réflexion. Ni tout blanc ni tout noir, votre chemin personnel demande de la pondération.'
    },
    professionnel: {
      positive: 'Les cartes positives dominent votre ciel professionnel. Projets favorisés, soutiens actifs, reconnaissance — la voie est ouverte pour avancer avec confiance.',
      negative: 'Des obstacles professionnels sont signalés par les cartes négatives. Prenez-les comme des avertissements pour affiner votre stratégie plutôt que comme des blocages définitifs.',
      neutral: 'La tonalité neutre du tirage professionnel invite à la réflexion stratégique. Prenez le temps d\'analyser avant d\'agir.'
    },
    relationnel: {
      positive: 'Les cartes positives illuminent votre vie affective. Harmonie, rencontres, réconciliations — vos relations bénéficient d\'une énergie chaleureuse et constructive.',
      negative: 'Des tensions affectives sont indiquées par les cartes négatives. Ces difficultés sont des opportunités de clarification et de renforcement de vos liens.',
      neutral: 'Vos relations traversent une phase de stabilité et d\'observation. Profitez de cette période neutre pour consolider vos liens sans précipitation.'
    }
  };

  function isReversed(card) {
    return !!(card && card.reversed);
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
      var isRev = !!(card.reversed);
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
      : 'Ce tirage vous offre un éclairage précieux sur votre situation actuelle. L\'Oracle Gé ne prédit pas — il éclaire le chemin.';

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
