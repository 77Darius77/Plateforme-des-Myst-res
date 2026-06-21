/* Interprétations par plan — Oracle de la Triade */
window.triadePlanes = (function () {

  var CARD_PLANES = {
    /* ═══ CARTES POSITIVES ═══ */
    '01': { /* Alpha */
      personnel: {kw: "Élan créateur, potentiel pur", text: "Alpha marque l'aube d'un nouveau cycle intérieur. Tout est possible — saisissez cet élan créateur avec confiance, la page blanche de votre existence n'attend que votre première phrase."},
      professionnel: {kw: "Nouveau départ, initiative", text: "Un projet professionnel est en gestation et porte la promesse d'un accomplissement majeur. L'énergie d'Alpha favorise les lancements, les créations d'entreprise et les initiatives audacieuses."},
      relationnel: {kw: "Rencontre promise, page blanche", text: "Sur le plan relationnel, Alpha annonce soit une rencontre fondatrice, soit le renouveau d'un lien existant. L'univers vous offre une page blanche pour écrire une nouvelle histoire affective."},
      argent: {kw: "Nouveau départ, potentiel financier", text: "Une nouvelle ère financière s'ouvre devant vous. Investissez dans ce qui commence, même modestement — les graines semées aujourd'hui deviendront des arbres prospères."}
    },
    '06': { /* Racine */
      personnel: {kw: "Ancrage, héritage intérieur", text: "Racine vous invite à puiser dans vos origines la force d'avancer. Honorez vos fondations familiales et vos racines profondes — c'est de là que monte la sève de votre épanouissement."},
      professionnel: {kw: "Fondations solides, transmission", text: "Vos bases professionnelles sont solides. Racine favorise les métiers liés au patrimoine, à la transmission et à l'héritage. Consolidez avant d'innover."},
      relationnel: {kw: "Liens familiaux, fidélité", text: "Les liens du sang et du cœur sont au premier plan. Racine parle de loyauté familiale, de retrouvailles avec vos proches, de la force qu'apporte l'appartenance à une lignée."},
      argent: {kw: "Sécurité matérielle, patrimoine", text: "Vos bases financières sont solides. Privilégiez les investissements patrimoniaux, l'immobilier, l'épargne de long terme. Construisez votre sécurité sur des fondations durables."}
    },
    '07': { /* Porte */
      personnel: {kw: "Ouverture, opportunité", text: "Une porte s'ouvre devant vous — reconnaissez-la et franchissez le seuil. L'univers vous adresse une invitation claire à explorer un espace inexploré de votre être."},
      professionnel: {kw: "Nouvelle opportunité, passage", text: "Une opportunité professionnelle se présente, qu'il s'agisse d'une offre, d'une promotion ou d'un projet novateur. N'hésitez pas trop longtemps, la porte ne restera pas éternellement ouverte."},
      relationnel: {kw: "Rencontre décisive, ouverture", text: "Une personne franchit le seuil de votre vie ou une relation existante s'ouvre à une nouvelle dimension. Laissez entrer sans crainte."},
      argent: {kw: "Opportunité, ouverture financière", text: "Une porte financière s'ouvre — contrat, offre, projet lucratif. Franchissez ce seuil sans hésiter, la chance sourit aux audacieux."}
    },
    '09': { /* Sagesse */
      personnel: {kw: "Discernement, maturité intérieure", text: "La Sagesse couronne votre cheminement personnel. Vous voyez désormais avec les yeux de l'expérience, capable de discerner le vrai du faux, l'essentiel de l'accessoire."},
      professionnel: {kw: "Expertise reconnue, conseil avisé", text: "Votre expérience professionnelle est reconnue et recherchée. La Sagesse favorise les postes de conseil, de mentorat et les décisions stratégiques éclairées."},
      relationnel: {kw: "Maturité affective, écoute", text: "Votre maturité affective vous permet d'aborder vos relations avec recul et bienveillance. Vous devenez une figure de sagesse pour vos proches."},
      argent: {kw: "Gestion avisée, maturité financière", text: "Votre expérience vous permet de prendre des décisions financières éclairées. La Sagesse favorise les placements réfléchis et la gestion prudente de vos ressources."}
    },
    '10': { /* Réussite */
      personnel: {kw: "Accomplissement, couronnement", text: "Vos efforts portent leurs fruits. La Réussite célèbre l'aboutissement d'un long cheminement personnel — savourez ce triomphe sans fausse modestie."},
      professionnel: {kw: "Succès, reconnaissance", text: "Vos projets atteignent leur apogée : promotion, contrat signé, succès commercial. La reconnaissance que vous attendiez arrive. Restez ambitieux, ce sommet n'est qu'un camp de base."},
      relationnel: {kw: "Union accomplie, plénitude", text: "En amour comme en amitié, la Réussite annonce une relation épanouie et stable. Vous récoltez les fruits de votre investissement affectif."},
      argent: {kw: "Succès financier, aboutissement", text: "Succès financier, aboutissement d'un projet lucratif. Vous récoltez les fruits de vos efforts — promotion, rentrée d'argent, retour sur investissement."}
    },
    '14': { /* Homme */
      personnel: {kw: "Action, volonté affirmée", text: "L'archétype masculin s'éveille en vous — c'est le temps de l'action décidée, du courage d'affirmer qui vous êtes. La force tranquille vous habite."},
      professionnel: {kw: "Leadership, décision", text: "Prenez les rênes avec assurance. Homme favorise la prise de décision, le leadership et l'affirmation de votre autorité naturelle dans le respect des autres."},
      relationnel: {kw: "Protection, engagement", text: "Vous incarnez la figure protectrice dans vos relations. L'énergie du masculin sacré apporte stabilité et loyauté — protégez sans enfermer, guidez sans dominer."},
      argent: {kw: "Initiative, décision financière", text: "Prenez les commandes de vos finances avec assurance. C'est le moment d'agir, de décider, d'investir. Votre détermination attire la prospérité."}
    },
    '15': { /* Amour */
      personnel: {kw: "Cœur ouvert, compassion", text: "L'Amour vous traverse et vous transforme. Ouvrez votre cœur sans retenue — c'est en aimant que vous guérissez toutes les parts blessées de votre être."},
      professionnel: {kw: "Passion, harmonie d'équipe", text: "Mettez du cœur dans votre travail. L'Amour favorise les vocations, les collaborations harmonieuses et les environnements professionnels bienveillants."},
      relationnel: {kw: "Union sacrée, tendresse", text: "La carte la plus lumineuse pour le cœur : rencontre inoubliable, amour partagé, réconciliation profonde. L'Amour véritable ne possède pas — il élève et libère."},
      argent: {kw: "Générosité, abondance partagée", text: "L'argent circule avec le cœur. Donnez généreusement, recevez avec gratitude. Une période de fluidité financière où l'abondance se multiplie par le partage."}
    },
    '17': { /* Énergie */
      personnel: {kw: "Vitalité, force de vie", text: "Un flux puissant d'énergie vitale vous traverse. Votre corps, votre esprit et votre âme débordent de dynamisme — saisissez cet élan pour concrétiser vos aspirations."},
      professionnel: {kw: "Productivité, dynamisme", text: "Votre productivité est à son maximum. Lancez-vous dans les projets d'envergure, votre énergie communicative entraîne les autres dans votre sillage."},
      relationnel: {kw: "Magnétisme, enthousiasme", text: "Votre charisme naturel attire les regards et les cœurs. L'Énergie favorise les rencontres vibrantes et les relations intenses. Canalisez ce feu sans le consumer."},
      argent: {kw: "Dynamisme financier, élan", text: "Votre énergie attire l'abondance. Lancez-vous dans des projets ambitieux, votre dynamisme est contagieux et génère des opportunités lucratives."}
    },
    '21': { /* Bénédiction */
      personnel: {kw: "Grâce, protection céleste", text: "Une vague de grâce descend sur votre vie. Vous êtes protégé, guidé, porté par des forces bienveillantes. Recevez cette bénédiction sans chercher à la mériter."},
      professionnel: {kw: "Faveur, alignement favorable", text: "Les circonstances professionnelles s'alignent en votre faveur comme par enchantement. La Bénédiction annonce un soutien inattendu, une protection venue d'en haut."},
      relationnel: {kw: "Harmonie divine, bénédiction du lien", text: "Vos relations sont bénies. Pour les couples, une période de paix et d'harmonie profonde. Pour les célibataires, une rencontre placée sous le signe de la providence."},
      argent: {kw: "Providence, manne inattendue", text: "Une aide financière inattendue ou un coup de chance se manifeste. La providence veille sur votre prospérité — recevez cette bénédiction avec gratitude."}
    },
    '23': { /* Paix */
      personnel: {kw: "Sérénité, réconciliation intérieure", text: "Les tempêtes s'apaisent et le silence guérisseur s'installe. La Paix vous invite au repos de l'âme — goûtez cette sérénité sans craindre qu'elle ne dure pas."},
      professionnel: {kw: "Apaisement, résolution", text: "Les conflits professionnels trouvent leur résolution. La Paix favorise les accords négociés, la fin des tensions et un climat de travail serein."},
      relationnel: {kw: "Réconciliation, harmonie durable", text: "Les disputes s'éteignent, les malentendus se dissipent. La Paix annonce une période d'harmonie affective où l'amour coule sans obstacle."},
      argent: {kw: "Stabilité financière, sérénité", text: "Vos finances trouvent leur équilibre. Les tensions se dissipent, les dettes s'apaisent. Une période de sécurité matérielle vous permet de souffler."}
    },
    '24': { /* Richesse */
      personnel: {kw: "Abondance, plénitude", text: "L'abondance se manifeste sous toutes ses formes dans votre vie. Ouvrez-vous à recevoir sans culpabilité — la prospérité est votre état naturel."},
      professionnel: {kw: "Prospérité, succès matériel", text: "Rentrées financières favorables, investissements fructueux, contrats lucratifs. La Richesse annonce une période de prospérité matérielle — récoltez et partagez."},
      relationnel: {kw: "Générosité, abondance du cœur", text: "La vraie richesse est celle du cœur. Donnez sans compter et vous recevrez au centuple. La Richesse parle de relations nourrissantes et d'amitiés généreuses."},
      argent: {kw: "Abondance, prospérité matérielle", text: "C'est LE moment favorable pour vos finances. Rentrées d'argent, retour sur investissement, sécurité matérielle renforcée. Partagez cette abondance pour la faire circuler."}
    },
    '25': { /* Femme */
      personnel: {kw: "Intuition, réceptivité", text: "L'archétype féminin s'éveille en vous — écoutez votre intuition qui murmure les vérités que la raison ignore. La puissance véritable réside dans la douceur."},
      professionnel: {kw: "Créativité, intelligence sensible", text: "Votre intelligence intuitive est votre atout majeur. Femme favorise les métiers créatifs, le conseil, l'accompagnement et tout ce qui demande de la sensibilité."},
      relationnel: {kw: "Écoute, accueil de l'autre", text: "Votre capacité d'accueil et d'écoute fait de vous un refuge pour ceux que vous aimez. La Femme parle de l'amour qui reçoit et transforme sans juger."},
      argent: {kw: "Intuition financière, réceptivité", text: "Fiez-vous à votre intuition pour vos décisions financières. La Femme favorise les revenus liés à la créativité et à l'accompagnement."}
    },
    '28': { /* Protection */
      personnel: {kw: "Sécurité, abri intérieur", text: "Un bouclier invisible vous entoure. Vous êtes protégé des influences néfastes — reposez-vous dans cette sécurité sans chercher à percer le mystère de cette sauvegarde."},
      professionnel: {kw: "Soutien, garde-fou", text: "Une protection hiérarchique ou institutionnelle veille sur votre carrière. La Protection annonce un filet de sécurité — osez davantage, vous êtes couvert."},
      relationnel: {kw: "Bienveillance, dévouement", text: "Quelqu'un veille sur vous avec une tendresse protectrice. La Protection parle d'un amour vigilant, d'une amitié indéfectible qui vous garde des blessures du monde."},
      argent: {kw: "Sécurité financière, épargne", text: "Vos finances sont protégées. Une épargne ou un filet de sécurité vous préserve des imprévus. Continuez à consolider cette protection."}
    },
    '29': { /* Élévation */
      personnel: {kw: "Ascension, dépassement de soi", text: "Votre conscience s'élève au-dessus des limitations d'hier. L'Élévation vous offre une perspective nouvelle — voyez grand, le paysage est magnifique depuis ces hauteurs."},
      professionnel: {kw: "Progression, promotion", text: "Votre carrière prend son essor. Promotion, progression rapide, projet ambitieux — l'Élévation signale une ascension professionnelle marquée et méritée."},
      relationnel: {kw: "Élévation mutuelle, amour inspirant", text: "Vos relations vous élèvent et vous inspirent. Une connexion qui fait grandir les deux êtres — l'amour comme chemin d'évolution mutuelle."},
      argent: {kw: "Ascension financière, promotion", text: "Vos revenus s'élèvent — augmentation, promotion, nouveau pallier. L'Élévation annonce une progression financière notable et méritée."}
    },
    '33': { /* Naissance */
      personnel: {kw: "Renouveau, renaissance", text: "Quelque chose de radicalement nouveau éclôt en vous. La Naissance annonce un renouveau personnel — nouvelle identité, nouveau projet de vie, résurrection après une traversée difficile."},
      professionnel: {kw: "Création, projet naissant", text: "Un projet professionnel voit le jour : création d'entreprise, nouveau poste, invention. Protégez cette jeune pousse avec tout le soin qu'elle mérite."},
      relationnel: {kw: "Nouveau lien, agrandissement", text: "Une nouvelle relation naît ou votre cercle affectif s'agrandit. La Naissance peut aussi annoncer une grossesse ou l'arrivée d'un nouvel être cher dans votre vie."},
      argent: {kw: "Nouveau projet, source de revenus", text: "Une nouvelle source de revenus éclot : création d'entreprise, projet innovant, investissement porteur. Soignez cette jeune pousse financière."}
    },
    '37': { /* Lumière */
      personnel: {kw: "Clarté, illumination", text: "La lumière se fait dans les zones d'ombre de votre existence. Vous comprenez enfin ce qui était obscur — cette clarté intérieure dissout les peurs et les doutes."},
      professionnel: {kw: "Idée brillante, vision claire", text: "Une illumination professionnelle vous frappe : l'idée que vous cherchiez, la solution à un problème épineux, la vision d'un projet novateur."},
      relationnel: {kw: "Vérité révélée, transparence", text: "La vérité éclate dans vos relations — une révélation apporte la clarté nécessaire. La Lumière dissipe les malentendus et les non-dits."},
      argent: {kw: "Clarté financière, idée lucrative", text: "Une illumination éclaire votre situation financière. L'idée qui vous manquait, la solution à un blocage — la clarté dissout les obstacles matériels."}
    },
    '39': { /* Message */
      personnel: {kw: "Nouvelle, communication", text: "Un message important est en chemin. Restez attentif aux signes, aux synchronicités, aux paroles entendues par hasard — l'univers communique avec vous."},
      professionnel: {kw: "Annonce favorable, contact clé", text: "Une communication professionnelle décisive arrive : offre, contrat, contact stratégique. Le Message peut aussi indiquer que vous devez vous exprimer publiquement."},
      relationnel: {kw: "Déclaration, retrouvailles", text: "Des nouvelles d'un être cher, une déclaration attendue, un message qui change tout sur le plan affectif. Parfois, le Message vous invite à dire ce que vous taisiez."},
      argent: {kw: "Annonce favorable, nouvelle financière", text: "Une communication financière positive est en chemin : offre, contrat, rentrée d'argent. Restez à l'écoute des opportunités qui se présentent."}
    },
    '41': { /* Équité */
      personnel: {kw: "Justice intérieure, justesse", text: "L'équilibre se rétablit en vous — vous recevez ce que vous avez semé. L'Équité vous invite à agir avec droiture, le cosmos est un miroir parfait."},
      professionnel: {kw: "Justice, reconnaissance", text: "Vos mérites sont reconnus à leur juste valeur. L'Équité favorise les procédures juridiques, les négociations équitables et la juste rétribution de votre travail."},
      relationnel: {kw: "Équilibre, réparation", text: "Justice affective — un tort est réparé, un malentendu clarifié, un équilibre restauré dans vos relations. Traitez l'autre avec la même équité que vous attendez."},
      argent: {kw: "Justice financière, juste rétribution", text: "Vous recevez ce qui vous est dû. L'Équité annonce une régularisation financière, un remboursement, une juste rémunération de votre travail."}
    },
    '43': { /* Clé */
      personnel: {kw: "Solution, accès intérieur", text: "La solution que vous cherchez est enfin trouvée. La Clé ouvre ce qui résistait — une compréhension soudaine déverrouille une situation personnelle bloquée."},
      professionnel: {kw: "Résolution, opportunité décisive", text: "Un problème professionnel trouve sa solution. La Clé peut représenter une personne, une information ou une compétence qui débloque votre carrière."},
      relationnel: {kw: "Accès au cœur, ouverture", text: "Vous trouvez la clé du cœur de l'autre, ou quelqu'un trouve celle du vôtre. La Clé annonce une ouverture affective après une période de fermeture."},
      argent: {kw: "Solution financière, déblocage", text: "Un problème financier trouve sa solution. La Clé déverrouille une opportunité de revenu ou un investissement qui vous était inaccessible."}
    },
    '47': { /* Éternité */
      personnel: {kw: "Continuité, essence immortelle", text: "Vous touchez à l'intemporel, à cette part de vous qui ne connaît ni début ni fin. L'Éternité vous rappelle que votre essence véritable traverse les cycles sans jamais périr."},
      professionnel: {kw: "Œuvre durable, héritage", text: "Ce que vous construisez aujourd'hui vous survivra. L'Éternité favorise les projets à très long terme, l'héritage professionnel, les fondations qui traverseront les époques."},
      relationnel: {kw: "Lien indéfectible, amour éternel", text: "Un lien qui transcende le temps — âmes sœurs, amitié éternelle, amour qui traverse les vies. L'Éternité parle d'une connexion que rien ni personne ne peut briser."},
      argent: {kw: "Richesse durable, héritage", text: "Ce que vous construisez traversera le temps. Investissements à très long terme, héritage, patrimoine transgénérationnel — voyez loin dans vos décisions financières."}
    },
    '55': { /* Fusion */
      personnel: {kw: "Unité intérieure, synthèse", text: "Toutes les parts de vous-même s'unifient dans une synthèse alchimique. La Fusion marque la réconciliation du masculin et du féminin sacrés en vous."},
      professionnel: {kw: "Synergie, alliance féconde", text: "Des compétences ou des partenaires se combinent pour créer une valeur supérieure à leur somme. La Fusion favorise les fusions d'entreprises et les collaborations synergiques."},
      relationnel: {kw: "Union totale, alchimie parfaite", text: "Deux êtres vibrent à l'unisson — l'amour fusionnel dans sa beauté la plus pure. La Fusion parle de noces alchimiques entre deux âmes qui se reconnaissent."},
      argent: {kw: "Synergie financière, alliance", text: "Des ressources ou partenaires se combinent pour multiplier votre prospérité. La Fusion favorise les associations et les projets collaboratifs lucratifs."}
    },
    '56': { /* Frère */
      personnel: {kw: "Alliance, compagnonnage", text: "L'énergie de la fraternité vous traverse — vous n'êtes pas seul sur votre chemin. Le Frère rappelle la force qu'apporte l'amitié véritable et le soutien mutuel."},
      professionnel: {kw: "Partenariat, fidélité", text: "Un allié professionnel loyal se manifeste. Le Frère favorise les partenariats, les associations et les collaborations fondées sur la confiance et la fidélité."},
      relationnel: {kw: "Amitié profonde, loyauté", text: "L'amitié dans sa forme la plus noble éclaire votre vie. Le Frère parle d'un lien choisi, d'une fraternité d'âme qui n'a pas besoin des liens du sang pour exister."},
      argent: {kw: "Soutien financier, partenariat", text: "Un allié ou un partenaire se manifeste pour vous épauler financièrement. Le Frère annonce un partenariat économique fondé sur la confiance."}
    },
    '57': { /* Oméga */
      personnel: {kw: "Accomplissement, plénitude", text: "Un grand cycle personnel s'achève dans la plénitude. Oméga célèbre la sagesse récoltée au terme du voyage — vous êtes complet, accompli, prêt pour un nouveau commencement."},
      professionnel: {kw: "Aboutissement, moisson", text: "Un projet professionnel arrive à son terme glorieux : aboutissement d'une carrière, succès d'un plan de longue haleine. Oméga est le couronnement de vos efforts."},
      relationnel: {kw: "Complétude, cercle fermé", text: "Une relation atteint sa pleine maturité — amour accompli, amitié indéfectible. Oméga ferme un cycle affectif dans la beauté et la gratitude."},
      argent: {kw: "Accomplissement financier, moisson", text: "Un cycle financier s'achève dans l'abondance. Récoltez les fruits de vos investissements de long terme et préparez le prochain cycle avec sagesse."}
    },

    /* ═══ CARTES NÉGATIVES ═══ */
    '02': { /* Isolement */
      personnel: {kw: "Solitude, retrait imposé", text: "Vous traversez une période de solitude qui pèse sur votre âme. L'Isolement n'est pas une punition mais un passage — le silence forcé contient une vérité que vous devez entendre."},
      professionnel: {kw: "Mise à l'écart, isolement", text: "Vous vous sentez écarté des circuits de décision ou isolé dans votre travail. Plutôt que de subir, utilisez cette période pour vous recentrer sur l'essentiel."},
      relationnel: {kw: "Éloignement, solitude affective", text: "Une distance douloureuse s'installe avec un être cher, ou le célibat pèse particulièrement. Ne laissez pas la solitude se muer en forteresse dont vous jetez vous-même la clé."},
      argent: {kw: "Isolement financier, introspection", text: "Une période de solitude financière vous invite à l'introspection. Ce n'est pas le moment des grandes dépenses — observez, évaluez, préparez."}
    },
    '04': { /* Mensonge */
      personnel: {kw: "Illusion, auto-aveuglement", text: "Quelque chose vous est caché — ou vous vous cachez quelque chose. Le Mensonge vous invite à déchirer les voiles de l'illusion, aussi inconfortable que soit la vérité."},
      professionnel: {kw: "Tromperie, faux-semblant", text: "Méfiez-vous des paroles trop belles pour être vraies dans votre environnement professionnel. Vérifiez les informations, lisez entre les lignes des contrats."},
      relationnel: {kw: "Duplicité, masques", text: "Un masque risque de tomber dans votre vie affective. Tromperie possible ou simplement un non-dit qui pèse — le Mensonge appelle à la vérité coûte que coûte."},
      argent: {kw: "Tromperie financière, méfiance", text: "Méfiez-vous des offres trop alléchantes et des promesses financières non vérifiées. Vérifiez chaque contrat, chaque engagement — la vigilance est de mise."}
    },
    '08': { /* Nadir */
      personnel: {kw: "Point bas, traversée obscure", text: "Vous touchez le fond d'un cycle difficile. Le Nadir est douloureux mais c'est aussi le point où la remontée devient possible — la seule direction qui reste est le haut."},
      professionnel: {kw: "Échec, creux de carrière", text: "Vous traversez la période la plus basse de votre parcours professionnel. Ce creux n'est pas une fin — il est le tremplin d'où vous allez rebondir."},
      relationnel: {kw: "Rupture, abîme affectif", text: "Une relation atteint son point le plus sombre. Le Nadir est l'épreuve du feu — ce qui survit à cette traversée des abîmes en ressortira transformé."},
      argent: {kw: "Creux financier, point bas", text: "Vous traversez une période financière difficile, mais le creux de la vague signifie que la remontée est proche. Serrez les dents sans céder à la panique."}
    },
    '11': { /* Tentation */
      personnel: {kw: "Désir trompeur, piège", text: "Une séduction puissante vous attire vers un chemin qui n'est pas le vôtre. La Tentation met en garde : ce qui brille le plus n'éclaire pas toujours le mieux."},
      professionnel: {kw: "Offre alléchante, leurre", text: "Une proposition professionnelle semble trop belle pour être vraie — elle l'est probablement. Ne prenez pas le mirage pour l'oasis."},
      relationnel: {kw: "Attirance dangereuse, passion", text: "Une attraction magnétique mais périlleuse se manifeste. La Tentation prévient : ne confondez pas le désir brûlant avec l'amour véritable."},
      argent: {kw: "Dépense excessive, mirage", text: "Attention aux achats compulsifs et aux investissements hasardeux qui brillent de mille feux. La Tentation prévient : ce qui scintille n'est pas de l'or."}
    },
    '13': { /* Pénitence */
      personnel: {kw: "Remords, culpabilité", text: "Le poids du regret pèse sur votre conscience. La Pénitence n'est pas une condamnation mais une purification — le repentir sincère est la porte étroite vers la paix."},
      professionnel: {kw: "Erreur à réparer, responsabilité", text: "Une faute professionnelle passée demande réparation. Assumez vos responsabilités sans vous flageller — la Pénitence mène à la libération, non à la rumination."},
      relationnel: {kw: "Pardon à demander, réparation", text: "Un tort causé à un être cher doit être réparé. La Pénitence vous invite à présenter des excuses sincères — le pont peut encore être reconstruit."},
      argent: {kw: "Dette, charge financière", text: "Une dette ou une obligation financière pèse sur vous. Assumez vos responsabilités sans vous accabler — un plan de remboursement méthodique vous libérera."}
    },
    '20': { /* Erreur */
      personnel: {kw: "Égarement, faux pas", text: "Vous avez pris une mauvaise direction, mais l'Erreur n'est pas une fatalité. Reconnaître son égarement est le premier pas vers la vérité — ne vous obstinez pas."},
      professionnel: {kw: "Mauvaise décision, rectification", text: "Une décision professionnelle s'avère erronée. Corrigez le tir sans tarder — l'Erreur bien reconnue devient un enseignement précieux."},
      relationnel: {kw: "Malentendu, jugement erroné", text: "Vous avez mal jugé une personne ou une situation affective. L'Erreur invite à rectifier votre perception avant que le malentendu ne s'enracine."},
      argent: {kw: "Erreur financière, rectification", text: "Une mauvaise décision financière doit être corrigée rapidement. Reconnaissez l'erreur et ajustez votre stratégie avant que les conséquences ne s'aggravent."}
    },
    '26': { /* Épreuve */
      personnel: {kw: "Obstacle, résilience", text: "Une montagne se dresse sur votre chemin. L'Épreuve teste votre force et votre foi — ce qui ne vous défait pas vous fortifie. Chaque pas, même minuscule, est une victoire."},
      professionnel: {kw: "Défi, résistance", text: "Un obstacle professionnel met votre détermination à l'épreuve. Ce défi est un maître déguisé — il vient vous enseigner ce que vous refusez d'apprendre autrement."},
      relationnel: {kw: "Crise, test du lien", text: "Votre relation traverse une zone de turbulences. L'Épreuve ne condamne pas le lien mais le teste — le couple qui surmonte cette tempête en ressort renforcé."},
      argent: {kw: "Difficulté financière, résilience", text: "Un défi financier teste votre résistance. Ressources limitées, imprévu coûteux — cette épreuve vous enseigne la valeur de chaque denier."}
    },
    '27': { /* Doute */
      personnel: {kw: "Incertitude, confusion", text: "Le brouillard du doute envahit votre esprit. Ne le laissez pas vous paralyser — le Doute est parfois le chemin vers une foi plus éclairée, mais l'immobilité est la seule erreur."},
      professionnel: {kw: "Hésitation, remise en question", text: "Vous doutez de vos compétences ou de la direction professionnelle prise. Vérifiez vos fondations sans tout démolir — le Doute bien canalisé affine la stratégie."},
      relationnel: {kw: "Incertitude affective, vacillement", text: "Le doute s'installe dans votre vie affective — confiance ébranlée, questionnements sur l'avenir du lien. Clarifiez avant de trancher."},
      argent: {kw: "Incertitude financière, hésitation", text: "Le brouillard entoure vos décisions financières. Évitez les engagements importants tant que la clarté n'est pas revenue. Vérifiez vos calculs avant d'agir."}
    },
    '32': { /* Illusion */
      personnel: {kw: "Mirage, aveuglement", text: "Vous prenez des ombres pour des réalités. L'Illusion vous enjoint à déchirer le voile de Maya — ce que vous croyez voir n'est que le reflet de vos peurs ou de vos désirs."},
      professionnel: {kw: "Chimère, fausse promesse", text: "Une opportunité professionnelle n'est que poudre aux yeux, ou une idée que vous caressez repose sur des bases illusoires. L'Illusion appelle à un regard lucide et impitoyable."},
      relationnel: {kw: "Amour illusoire, projection", text: "Vous aimez peut-être une image plutôt qu'une personne réelle. L'Illusion prévient : ne bâtissez pas votre vie affective sur le nuage de vos projections."},
      argent: {kw: "Mirage financier, fausse promesse", text: "Ne vous fiez pas aux apparences de prospérité — un projet ou un placement repose sur des bases illusoires. Exigez des preuves avant d'investir."}
    },
    '38': { /* Arme */
      personnel: {kw: "Conflit, défense", text: "Les tensions intérieures montent et la confrontation semble inévitable. L'Arme n'est pas la violence — elle est le signal que vos limites ont été franchies et qu'il faut les défendre."},
      professionnel: {kw: "Rivalité, conflit ouvert", text: "Un conflit professionnel éclate ou couve. Préparez votre défense sans attaquer le premier — la meilleure arme est celle que l'on n'a pas besoin de dégainer."},
      relationnel: {kw: "Dispute, rapport de force", text: "Les mots deviennent des armes dans votre couple ou votre entourage. L'Arme appelle à désamorcer le conflit avant que les blessures ne soient irréparables."},
      argent: {kw: "Conflit financier, litige", text: "Un conflit d'argent couve ou éclate — litige, partage, compétition déloyale. Protégez vos intérêts sans déclencher une guerre coûteuse."}
    },
    '40': { /* Malheur */
      personnel: {kw: "Douleur, deuil", text: "Une vague de tristesse et de perte vous submerge. Le Malheur n'est pas éternel — laissez la douleur vous traverser sans vous y identifier. Le soleil brille derrière les nuages."},
      professionnel: {kw: "Perte, revers", text: "Un échec professionnel cuisant ou une perte financière vous affecte. Le Malheur est un orage — tenez bon, il passera et vous aurez appris à danser sous la pluie."},
      relationnel: {kw: "Chagrin, séparation douloureuse", text: "Une peine affective profonde vous étreint — rupture, deuil, abandon. La souffrance est un visiteur, non une pièce permanente de votre demeure intérieure."},
      argent: {kw: "Perte, revers financier", text: "Attention aux pertes matérielles ou aux investissements hasardeux. Ce n'est pas le moment de prendre des risques financiers. Protégez vos acquis."}
    },
    '44': { /* Foudre */
      personnel: {kw: "Choc, rupture brutale", text: "Un événement soudain déchire le ciel de votre existence. La Foudre détruit et éclaire simultanément — ce qui s'effondre n'était peut-être pas aussi solide qu'il le paraissait."},
      professionnel: {kw: "Catastrophe, électrochoc", text: "Une nouvelle brutale bouleverse votre carrière : licenciement, rupture de contrat, crise sectorielle. De la cendre peut naître une forêt plus forte."},
      relationnel: {kw: "Rupture soudaine, révélation", text: "Une rupture brutale ou une révélation fracassante ébranle votre vie affective. La Foudre ne laisse rien intact, mais la vérité nue est le seul sol où reconstruire."},
      argent: {kw: "Choc financier, imprévu", text: "Un événement soudain frappe vos finances — perte, dépense imprévue, crise. Gardez une réserve d'urgence, la Foudre ne prévient pas."}
    },
    '46': { /* Sacrifice */
      personnel: {kw: "Renoncement, perte consentie", text: "Vous devez lâcher quelque chose de précieux pour avancer. Le Sacrifice n'est pas destruction gratuite — c'est l'offrande que la vie exige pour ouvrir une porte plus grande."},
      professionnel: {kw: "Abandon nécessaire, concession", text: "Un sacrifice professionnel est requis : renoncer à un poste, à un projet, à une ambition pour permettre quelque chose de plus important. Pesez ce que vous déposez sur l'autel."},
      relationnel: {kw: "Deuil affectif, lâcher-prise", text: "Vous devez faire le deuil d'une relation ou d'une attente. Le Sacrifice parle de l'amour qui libère au lieu de retenir — parfois aimer, c'est laisser partir."},
      argent: {kw: "Renoncement financier, coupe", text: "Vous devez sacrifier une dépense ou un investissement pour préserver l'essentiel. Ce renoncement temporaire ouvrira la porte à une prospérité plus grande."}
    },
    '49': { /* Adversaire */
      personnel: {kw: "Opposition, combat intérieur", text: "Vous faites face à une force d'opposition — à l'extérieur ou à l'intérieur de vous-même. L'Adversaire est un miroir qui révèle vos faiblesses pour vous forcer à les dépasser."},
      professionnel: {kw: "Rivalité, compétition", text: "Un concurrent ou un opposant professionnel se dresse contre vous. Ne le haïssez pas — cet Adversaire est peut-être le catalyseur qui vous poussera à vous surpasser."},
      relationnel: {kw: "Tension, antagonisme", text: "Une personne s'oppose à vous dans votre sphère affective — rival amoureux, conflit familial. L'Adversaire n'est souvent que la projection extérieure d'une résistance intérieure."},
      argent: {kw: "Rivalité financière, concurrence", text: "Un concurrent ou un opposant menace vos intérêts financiers. Défendez votre position sans obsession — l'Adversaire vous pousse à vous dépasser."}
    },
    '52': { /* Silence */
      personnel: {kw: "Mutisme, repli", text: "Le silence s'est installé en vous — lourd, pesant. Les mots refusent de sortir ou personne ne les entend. Le Silence est parfois prison, parfois sanctuaire — demandez-vous qui l'habite."},
      professionnel: {kw: "Non-dit, communication rompue", text: "On ne vous dit pas tout ou vous ne parvenez pas à vous exprimer. Le Silence professionnel est un poison lent — brisez-le avant que les non-dits ne pourrissent la terre."},
      relationnel: {kw: "Froid, distance émotionnelle", text: "Le silence s'est glissé entre vous et l'être aimé. Ce qui n'est pas dit pèse plus lourd que des paroles. Le Silence appelle à retrouver la voie du dialogue."},
      argent: {kw: "Blocage financier, non-dit", text: "Un silence entoure vos finances — facture ignorée, négociation rompue, information cachée. Brisez ce mutisme avant que la situation ne se dégrade."}
    },
    '54': { /* Mort */
      personnel: {kw: "Transformation, fin nécessaire", text: "Quelque chose en vous doit mourir pour renaître. La Mort n'est pas la fin — c'est le passage obligé vers la métamorphose. Ce qui s'effondre n'est que la chrysalide vide."},
      professionnel: {kw: "Fin de cycle, restructuration", text: "Un pan de votre vie professionnelle arrive à son terme : fin de contrat, fermeture, changement radical. Ce n'est pas un échec mais une transition vers une nouvelle forme."},
      relationnel: {kw: "Séparation, deuil du lien", text: "Une relation touche à sa fin. La Mort annonce une séparation douloureuse mais nécessaire — ne vous accrochez pas à ce qui est déjà mort, la vie frappe à votre porte."},
      argent: {kw: "Fin de cycle financier, transition", text: "Un pan de votre vie financière s'achève : fin de contrat, perte de revenus, changement radical. Ce n'est pas une fin mais une métamorphose nécessaire."}
    },

    /* ═══ CARTES NEUTRES ═══ */
    '03': { /* Delta */
      personnel: {kw: "Mutation, passage", text: "Vous êtes dans l'entre-deux, le passage délicat d'un état à un autre. Delta ne dit pas où vous allez — il dit que la transformation est en cours. Ne résistez pas au courant."},
      professionnel: {kw: "Transition, bifurcation", text: "Une transformation professionnelle est en marche — restructuration, reconversion, mutation. Delta marque le point de bifurcation où plusieurs destins deviennent possibles."},
      relationnel: {kw: "Évolution, métamorphose du lien", text: "Votre relation se transforme. Ce qui était ne sera plus, ce qui sera n'est pas encore. Delta invite à traverser ce passage sans peur — la chrysalide précède le papillon."},
      argent: {kw: "Transition financière, flux", text: "Vos finances sont en pleine mutation. Ni perte ni gain assuré, Delta marque un passage — adaptez-vous au courant sans résister."}
    },
    '05': { /* Eau */
      personnel: {kw: "Émotions, fluidité", text: "Plongez dans vos profondeurs émotionnelles. L'Eau vous invite à laisser couler ce qui ne peut être retenu — les sentiments sont comme les vagues, ils vont et viennent."},
      professionnel: {kw: "Adaptabilité, intelligence émotionnelle", text: "Votre intelligence émotionnelle est votre meilleur atout professionnel. L'Eau favorise l'adaptabilité et la créativité — épousez les formes du moment sans vous rigidifier."},
      relationnel: {kw: "Sensibilité, connexion intuitive", text: "Vos émotions sont à fleur de cœur. L'Eau parle d'une connexion intuitive profonde avec l'autre — n'ayez pas peur de votre sensibilité, c'est votre force."},
      argent: {kw: "Flux financier, liquidités", text: "Comme l'eau, vos finances sont en mouvement. Gérez votre trésorerie avec fluidité, ni rétention excessive ni dépense irréfléchie. L'équilibre est la clé."}
    },
    '12': { /* Sceau */
      personnel: {kw: "Engagement, décision irréversible", text: "Un engagement personnel se scelle — promesse envers vous-même, vœu, pacte intérieur. Le Sceau engage l'âme : ce que vous décidez aujourd'hui devient la pierre angulaire de demain."},
      professionnel: {kw: "Contrat, signature", text: "Un engagement professionnel se formalise : contrat, alliance, accord. Ne scellez rien dans la précipitation — un Sceau brisé laisse une cicatrice."},
      relationnel: {kw: "Alliance, promesse", text: "Une promesse est faite ou attendue dans votre vie affective — mariage, engagement, pacte. Le Sceau donne du poids à vos paroles et de la durée à vos liens."},
      argent: {kw: "Engagement financier, contrat", text: "Un engagement financier se formalise : prêt, contrat, signature. Ne scellez rien sans avoir lu chaque ligne — un Sceau apposé engage durablement."}
    },
    '16': { /* Mutation */
      personnel: {kw: "Évolution, réinvention", text: "Vous êtes en pleine mue — l'ancienne version de vous s'efface tandis que la nouvelle émerge. La Mutation demande de la patience : la chrysalide a besoin d'obscurité pour accomplir son mystère."},
      professionnel: {kw: "Changement profond, adaptation", text: "Votre environnement professionnel mute profondément. Plutôt que de résister, accompagnez cette évolution — la Mutation vous prépare à une forme plus adaptée au monde qui vient."},
      relationnel: {kw: "Transition affective, redéfinition", text: "La dynamique de votre relation change. Mutation ne signifie pas rupture mais transformation du lien — l'amour évolue, à vous de danser avec ce mouvement."},
      argent: {kw: "Transformation financière, adaptation", text: "Votre situation financière se transforme en profondeur. Accompagnez ce changement plutôt que d'y résister — la nouvelle forme sera plus adaptée."}
    },
    '18': { /* Science */
      personnel: {kw: "Connaissance, analyse", text: "Votre intellect est en éveil. La Science vous invite à étudier, analyser, comprendre — mais n'oubliez pas que la science sans conscience n'est que ruine de l'âme."},
      professionnel: {kw: "Compétence, expertise", text: "Vos compétences techniques et votre savoir sont vos atouts majeurs. La Science favorise la formation, la recherche, l'approfondissement de votre expertise."},
      relationnel: {kw: "Compréhension, recul analytique", text: "Prenez du recul pour analyser vos schémas relationnels. La Science éclaire les dynamiques affectives par la compréhension — mais l'amour ne s'explique pas, il se vit."},
      argent: {kw: "Analyse financière, stratégie", text: "Analysez vos finances avec méthode. La Science favorise la planification budgétaire, l'étude de marché et les décisions fondées sur des données solides."}
    },
    '19': { /* Prière */
      personnel: {kw: "Spiritualité, recueillement", text: "Votre âme cherche le dialogue avec le sacré. La Prière n'est pas une demande mais un alignement — intériorisez-vous et laissez l'univers entendre le silence de votre cœur."},
      professionnel: {kw: "Vocation, sens", text: "Vous cherchez du sens dans votre travail. La Prière évoque la dimension vocationnelle de votre carrière — votre métier peut devenir une offrande si vous y mettez votre âme."},
      relationnel: {kw: "Communion spirituelle, lien sacré", text: "Vos relations prennent une dimension spirituelle. La Prière parle de liens qui transcendent le matériel — connexion d'âme à âme, respect sacré de l'autre."},
      argent: {kw: "Alignement financier, confiance", text: "Votre rapport à l'argent se spiritualise. Faites confiance à l'univers pour subvenir à vos besoins tout en restant actif — la manne vient à qui sait la recevoir."}
    },
    '22': { /* Choix */
      personnel: {kw: "Décision, carrefour", text: "Vous êtes au carrefour de votre existence. Le Choix ne dit pas quelle route prendre — il rappelle seulement que ne pas choisir est déjà un choix. Votre âme entière se déclare dans cette décision."},
      professionnel: {kw: "Bifurcation, décision stratégique", text: "Une décision professionnelle majeure vous attend. Pesez chaque option avec soin — chaque porte qui s'ouvre en ferme d'autres. Assumez votre choix pleinement."},
      relationnel: {kw: "Dilemme affectif, engagement", text: "Un choix affectif déterminant se présente : s'engager ou partir, pardonner ou tourner la page. L'indécision laisse le hasard décider à votre place."},
      argent: {kw: "Décision financière, carrefour", text: "Un choix financier important vous attend. Pesez le pour et le contre avec soin — chaque option ouvre un chemin et en ferme un autre."}
    },
    '30': { /* Pardon */
      personnel: {kw: "Libération, guérison", text: "Le moment est venu de déposer le fardeau du ressentiment. Le Pardon ne réécrit pas l'histoire mais en retire le dard — vous vous libérez avant de libérer l'autre."},
      professionnel: {kw: "Réconciliation, nouveau départ", text: "Un conflit professionnel peut être résolu par le Pardon. Passer l'éponge ne signifie pas oublier mais choisir de ne plus porter le poids qui freine l'avancée."},
      relationnel: {kw: "Absolution, paix retrouvée", text: "Pardonner à l'autre — ou vous pardonner à vous-même — est la clé de la paix affective. Le Pardon est la guérison : vous cessez de boire le poison en espérant que l'autre meure."},
      argent: {kw: "Libération financière, solde", text: "Libérez-vous des dettes émotionnelles liées à l'argent. Le Pardon financier efface les ardoises — soldez vos comptes, matériels comme symboliques."}
    },
    '31': { /* Ordre */
      personnel: {kw: "Structure, discipline", text: "Mettez de l'ordre dans votre chaos intérieur. L'Ordre n'est pas rigidité mais colonne vertébrale — structurez votre vie pour que la liberté puisse s'épanouir sans se disperser."},
      professionnel: {kw: "Organisation, méthode", text: "Structurez vos projets et vos priorités. L'Ordre favorise la planification, les processus et la mise en place de systèmes efficaces — le chaos est fertile mais seul l'ordre permet de récolter."},
      relationnel: {kw: "Cadre, clarté", text: "Établissez des limites claires dans vos relations. L'Ordre invite à définir un cadre sain — la structure protège l'amour sans l'étouffer."},
      argent: {kw: "Organisation financière, budget", text: "Mettez de l'ordre dans vos comptes. Budget, planification, rigueur — l'Ordre transforme le chaos financier en prospérité structurée."}
    },
    '34': { /* Initiation */
      personnel: {kw: "Éveil, révélation", text: "Vous franchissez un seuil de conscience. L'Initiation ne donne pas la connaissance, elle ouvre les yeux pour la recevoir — ce qui vous est révélé transforme votre vision du monde."},
      professionnel: {kw: "Apprentissage, mentorat", text: "Une formation ou une transmission vous attend — maître, mentor, stage initiatique. L'Initiation professionnelle marque un passage de grade dans votre carrière."},
      relationnel: {kw: "Rencontre initiatique, éveil du cœur", text: "Une rencontre qui vous transforme en profondeur — l'amour comme école de l'âme. L'Initiation parle d'un lien qui vous révèle à vous-même."},
      argent: {kw: "Apprentissage financier, mentorat", text: "Une formation ou un conseil financier vous est proposé. L'Initiation marque un passage vers une compréhension plus profonde de la prospérité."}
    },
    '35': { /* Nécessité */
      personnel: {kw: "Acceptation, destin", text: "Certaines choses doivent être, que vous le vouliez ou non. La Nécessité invite à l'acceptation — la liberté n'est pas de faire ce qu'on veut mais de vouloir ce qui est."},
      professionnel: {kw: "Inévitable, contrainte", text: "Une situation professionnelle s'impose à vous sans que vous puissiez la refuser. Accueillez-la plutôt que de la combattre — l'acceptation décuple votre capacité d'adaptation."},
      relationnel: {kw: "Lien inévitable, fatalité", text: "Une personne ou une situation affective s'impose dans votre vie avec la force du destin. La Nécessité parle des liens que l'on n'a pas choisis mais qui étaient écrits."},
      argent: {kw: "Contrainte financière, adaptation", text: "Certaines dépenses sont inévitables. Plutôt que de lutter, acceptez et organisez-vous — la Nécessité enseigne l'art de faire beaucoup avec peu."}
    },
    '36': { /* Voyage */
      personnel: {kw: "Mouvement, quête intérieure", text: "L'appel du large résonne — voyage géographique ou exploration intérieure. Le Voyage enseigne que l'on ne part jamais vraiment, on ne fait que rentrer par un autre chemin."},
      professionnel: {kw: "Mobilité, découverte", text: "Déplacement professionnel, expatriation ou nouvelle orientation. Le Voyage favorise les métiers du transport, du tourisme et tout ce qui implique le mouvement."},
      relationnel: {kw: "Relation à distance, rencontre", text: "Une relation à distance ou une rencontre lors d'un déplacement. Le Voyage parle du lien qui se tisse sur la route — parfois l'amour a besoin de kilomètres pour se révéler."},
      argent: {kw: "Mobilité financière, mouvement", text: "Vos finances impliquent des déplacements ou une expansion géographique. Le Voyage favorise le commerce international et les investissements au loin."}
    },
    '42': { /* Désert */
      personnel: {kw: "Dépouillement, essentiel", text: "Vous traversez une période de dénuement où seul l'essentiel subsiste. Le Désert est matrice de révélation — c'est dans le vide que la voix du sacré se fait entendre."},
      professionnel: {kw: "Austérité, recadrage", text: "Une période de vaches maigres ou de recentrage professionnel. Le Désert vous force à distinguer l'essentiel du superflu — profitez-en pour redéfinir vos priorités."},
      relationnel: {kw: "Solitude choisie, clarification", text: "Un temps de solitude ou d'austérité affective peut être nécessaire. Le Désert clarifie les liens — ce qui survit au dépouillement est véritablement solide."},
      argent: {kw: "Austérité, dépouillement", text: "Une période de vaches maigres vous invite à distinguer l'essentiel du superflu. Le Désert clarifie vos priorités financières — gardez l'indispensable."}
    },
    '45': { /* Temps */
      personnel: {kw: "Patience, maturation", text: "Rien ne sert de précipiter ce qui demande à mûrir. Le Temps vous enseigne la patience sacrée — ce qui se fait en son temps traverse les siècles."},
      professionnel: {kw: "Attente, long terme", text: "Vos projets demandent du temps pour aboutir. N'essayez pas de brûler les étapes — le Temps est l'allié de ce qui doit durer, non l'ennemi de votre impatience."},
      relationnel: {kw: "Maturation affective, cycles", text: "Laissez le temps faire son œuvre dans vos relations. La patience n'est pas l'excuse de l'inaction — c'est le respect des saisons du cœur."},
      argent: {kw: "Patience financière, maturation", text: "Vos investissements ont besoin de temps pour fructifier. Ne précipitez rien — la patience est la plus rentable des stratégies."}
    },
    '48': { /* Âme */
      personnel: {kw: "Authenticité, essence", text: "Plongez au-delà des masques et des constructions sociales pour toucher votre vérité profonde. L'Âme est le temple intérieur où le sacré réside — honorez-le."},
      professionnel: {kw: "Alignement, vocation", text: "Votre travail doit refléter qui vous êtes vraiment. L'Âme vous invite à aligner votre carrière avec votre essence profonde — le corps est le temple, l'âme est la divinité."},
      relationnel: {kw: "Connexion profonde, authenticité", text: "Cherchez l'authenticité dans vos relations — au-delà des masques sociaux, que reste-t-il ? L'Âme parle des liens qui touchent l'essence même de l'être."},
      argent: {kw: "Alignement, vocation financière", text: "Vos finances doivent refléter vos valeurs profondes. L'Âme vous invite à gagner votre vie en restant fidèle à votre essence."}
    },
    '50': { /* Papyrus */
      personnel: {kw: "Mémoire, sagesse ancienne", text: "La connaissance du passé éclaire votre présent. Le Papyrus vous connecte à la sagesse écrite, aux traditions, à la mémoire qui traverse les âges."},
      professionnel: {kw: "Documentation, transmission", text: "Vos écrits, contrats et archives prennent de l'importance. Le Papyrus favorise les métiers de la documentation, de l'édition et de la transmission du savoir."},
      relationnel: {kw: "Histoire partagée, mémoire du lien", text: "L'histoire de votre relation est un trésor — relisez les pages déjà écrites. Le Papyrus parle de l'importance de la mémoire affective dans la solidité des liens."},
      argent: {kw: "Documentation, contrat écrit", text: "Vos documents financiers prennent de l'importance : contrats, testaments, archives. Vérifiez chaque papier — la trace écrite est votre meilleure protection."}
    },
    '51': { /* Retour */
      personnel: {kw: "Retrouvailles, boucle", text: "Quelque chose ou quelqu'un revient du passé. Le Retour n'est pas régression — vous ne reviendrez pas au même endroit car celui qui revient n'est plus celui qui est parti."},
      professionnel: {kw: "Réintégration, cercle bouclé", text: "Un ancien projet, poste ou collaborateur refait surface. Le Retour parle de cycles professionnels qui se referment — ce qui revient porte une nouvelle maturité."},
      relationnel: {kw: "Retrouvailles, seconde chance", text: "Une personne du passé revient dans votre vie affective. Le Retour peut signifier une seconde chance — mais assurez-vous que ce n'est pas la peur d'avancer déguisée en nostalgie."},
      argent: {kw: "Retour financier, remboursement", text: "Un argent attendu revient — remboursement, restitution, retour sur investissement. Ce qui revient porte la maturité du temps écoulé."}
    },
    '53': { /* Méditation */
      personnel: {kw: "Centrage, présence", text: "Faites une pause et asseyez-vous au bord de votre fleuve intérieur. La Méditation ramène votre attention dispersée vers le centre d'où tout émane — le calme que vous cherchez est déjà en vous."},
      professionnel: {kw: "Recul stratégique, réflexion", text: "Prenez du recul avant d'agir. La Méditation conseille une pause stratégique — le silence précède les décisions éclairées."},
      relationnel: {kw: "Écoute profonde, apaisement", text: "La Méditation vous invite à écouter l'autre sans jugement et sans hâte de répondre. Une présence silencieuse vaut parfois plus que mille paroles."},
      argent: {kw: "Pause financière, réflexion", text: "Faites une pause dans vos décisions financières. La Méditation conseille le recul avant tout engagement — le silence précède les choix éclairés."}
    }
    /* 57 cartes — CARD_PLANES complet */
  };

  var PLANE_LABELS = {
    personnel: "Domaine Personnel",
    professionnel: "Domaine Professionnel",
    relationnel: "Domaine Relationnel",
    argent: "Domaine Financier"
  };

  var PLANE_INTROS = {
    personnel: "Sur le plan personnel, l'Oracle de la Triade éclaire votre chemin intérieur, révélant les forces et les ombres qui façonnent votre être. Chaque carte est un miroir tendu vers votre âme, une invitation à vous connaître plus profondément.",
    professionnel: "Dans la sphère professionnelle, ces cartes révèlent les dynamiques à l'œuvre dans votre carrière — opportunités naissantes, défis à relever, talents à exprimer. La Triade vous guide pour aligner votre travail avec votre destin.",
    relationnel: "Au niveau relationnel, la Triade dévoile la nature de vos liens affectifs, qu'ils soient amoureux, amicaux ou familiaux. Ces cartes éclairent la danse subtile entre votre cœur et celui des autres.",
    argent: "Sur le plan financier, l'Oracle de la Triade éclaire votre rapport à l'abondance et à la prospérité. Chaque carte révèle les énergies qui influencent vos finances — opportunités à saisir, pièges à éviter, ressources à cultiver."
  };

  function detectDominantTone(cards) {
    var tones = { positive: 0, negative: 0, neutral: 0 };
    cards.forEach(function (c) {
      var t = c && c.tone;
      if (tones.hasOwnProperty(t)) tones[t]++;
    });
    var best = null, max = 0;
    for (var t in tones) {
      if (tones[t] > max) { max = tones[t]; best = t; }
    }
    return best;
  }

  var PLANE_SYNTH = {
    positive: "La dominante lumineuse de ce tirage annonce une période favorable où les énergies constructives vous portent vers le meilleur de vous-même. Sur le plan personnel, l'élan créateur et la confiance en la vie sont vos alliés. Professionnellement, succès, reconnaissance et opportunités se manifestent avec clarté. Dans la sphère relationnelle, l'amour, l'harmonie et l'ouverture du cœur illuminent vos liens. Sur le plan financier, l'abondance se matérialise — rentrées d'argent, placements fructueux et sécurité matérielle sont au rendez-vous. L'Oracle de la Triade confirme que vous êtes aligné avec votre destin — recevez cette bénédiction et avancez avec gratitude.",
    negative: "Les cartes d'ombre dominent ce tirage, signalant des défis à relever sur tous les plans. Personnellement, vous traversez peut-être une nuit de l'âme — solitude, doute ou remise en question profonde. Professionnellement, obstacles, conflits ou pertes vous mettent à l'épreuve. Relationnellement, tensions, silence ou séparations questionnent la solidité de vos liens. Sur le plan financier, prudence et vigilance sont de mise — évitez les risques inutiles et protégez vos acquis. Mais rappelez-vous : ces cartes ne sont pas des fatalités. Comme le Nadir, elles marquent le point où la remontée devient possible. Chaque épreuve est un maître déguisé qui vient vous fortifier.",
    neutral: "La tonalité neutre de ce tirage vous invite à une traversée consciente de l'entre-deux. Sur le plan personnel, vous êtes dans une phase de transition, de métamorphose silencieuse où rien n'est encore figé. Professionnellement, c'est le temps de l'analyse, du choix réfléchi et de la patience stratégique. Dans vos relations, la stabilité et l'observation dominent — ni tempête ni éclaircie éclatante, mais un espace de maturation nécessaire. Sur le plan financier, ni précipitation ni inertie : gérez vos ressources avec pondération, le moment venu, les fruits mûriront. L'Oracle de la Triade vous conseille la pondération : ce qui se prépare dans le silence éclora en son temps."
  };

  function projectSpread(cards, plane) {
    var entries = cards.map(function (card) {
      var cid = String(card.id).padStart(2, '0');
      var planeData = CARD_PLANES[cid];
      if (!planeData) {
        return {
          cardName: card.name,
          kw: card.toneEmoji + ' ' + card.keywords.slice(0, 2).join(', '),
          text: card.meaning
        };
      }
      var p = planeData[plane];
      if (!p) {
        return {
          cardName: card.name,
          kw: card.toneEmoji + ' ' + card.keywords.slice(0, 2).join(', '),
          text: card.meaning
        };
      }
      return {
        cardName: card.name,
        kw: card.toneEmoji + ' ' + p.kw,
        text: p.text
      };
    });

    var dominantTone = detectDominantTone(cards);
    var synth = (dominantTone && PLANE_SYNTH[dominantTone])
      ? PLANE_SYNTH[dominantTone]
      : "Ce tirage vous offre un éclairage précieux sur votre situation actuelle. L'Oracle de la Triade ne prédit pas — il éclaire le chemin que votre âme a choisi de parcourir.";

    return {
      planeLabel: PLANE_LABELS[plane],
      intro: PLANE_INTROS[plane],
      entries: entries,
      synth: synth
    };
  }

  return {
    CARD_PLANES: CARD_PLANES,
    PLANE_LABELS: PLANE_LABELS,
    PLANE_INTROS: PLANE_INTROS,
    PLANE_SYNTH: PLANE_SYNTH,
    detectDominantTone: detectDominantTone,
    projectSpread: projectSpread
  };
})();
