/* Interpretations par plan — Oracle de Belline */
window.bellinePlanes = (function () {

  var CARD_PLANES = {
    '00': {
      personnel: 'Protection céleste et alignement intérieur : une période de paix, de clarté et de bien-être s\'ouvre. Tout ce qui était trouble s\'éclaircit ; faites confiance au chemin, l\'univers vous guide vers l\'équilibre. Sur le plan santé, annonce guérison et regain d\'énergie positive.',
      professionnel: 'Talisman de réussite : vos projets sont protégés et les obstacles s\'aplanissent. Une aide providentielle ou une opportunité inespérée se présente. Les efforts trouvent leur aboutissement dans un climat favorable ; avancez avec confiance, la voie est libre.',
      relationnel: 'Apaisement et harmonie dans toutes les relations. Les tensions se dissipent, la communication devient fluide. En amour, promesse de sérénité et de complicité retrouvée ; en famille, retour à la paix et à l\'entente. Cette carte neutralise les influences négatives environnantes.'
    },
    '01': {
      personnel: 'Une clé vous est offerte pour ouvrir une porte importante de votre chemin de vie. Les solutions existent, même si vous êtes dans une impasse : restez attentif aux signes et synchronicités. C\'est une invitation à prendre une décision majeure pour votre évolution personnelle ou spirituelle.',
      professionnel: 'Des opportunités décisives se présentent : nouveau poste, projet porteur, rencontre professionnelle déterminante. Vous disposez ou disposerez bientôt des moyens nécessaires pour progresser. Cette carte annonce un tournant favorable dans votre carrière, à condition de saisir la clé au bon moment.',
      relationnel: 'Croisée des chemins amoureuse : une rencontre significative ou une décision importante concernant votre vie affective. Pour les couples, c\'est le moment de sceller un engagement ou de prendre une nouvelle direction ensemble. La Destinée favorise les unions et les choix sentimentaux profonds.'
    },
    '02': {
      personnel: 'Représente le principe masculin en vous (action, volonté, structure). Appel à prendre des initiatives, à faire preuve de détermination et à structurer votre vie avec autorité bienveillante. Incarnation de la force tranquille, de la résistance et de la capacité à observer avant d\'agir.',
      professionnel: 'Énergie de réalisation et de concrétisation : c\'est le moment d\'agir et de mettre en œuvre vos projets. Représente un soutien masculin influent (supérieur, mentor, associé) ou votre propre capacité à diriger. Favorable aux initiatives, aux prises de responsabilité, à l\'entrepreneuriat.',
      relationnel: 'Peut représenter le consultant masculin, un partenaire ou une figure masculine importante. Dans un tirage amoureux, symbolise l\'homme qui revient ou s\'engage durablement. Évoque protection, fidélité et stabilité affective. Pour une femme, annonce une rencontre avec un homme structurant et fiable.'
    },
    '03': {
      personnel: 'Représente le principe féminin en vous (intuition, créativité, réceptivité). Appel à développer votre sensibilité, votre imagination et votre connexion à l\'intuition profonde. Carte de fertilité créative : tout projet peut naître et s\'épanouir si vous l\'incubez avec soin et patience.',
      professionnel: 'Favorable aux projets créatifs, à l\'enseignement, aux métiers de soin et d\'accompagnement. Invite à utiliser l\'intelligence émotionnelle et l\'intuition dans les décisions professionnelles. Peut représenter une collaboratrice influente ou une associée bienveillante. Succès par la finesse plutôt que par la force.',
      relationnel: 'Représente la consultante ou une figure féminine centrale. Symbole d\'amour inconditionnel, de douceur et d\'écoute. Dans un tirage amoureux, annonce épanouissement affectif, maternité ou renouveau du lien. Incarne la partenaire idéale : intuitive, aimante et profondément connectée.'
    },
    '04': {
      personnel: 'Une renaissance intérieure s\'annonce : nouvelle étape de vie, regain d\'énergie, éveil spirituel. Tout est à construire et les possibles sont vastes. Moment idéal pour initier une pratique de bien-être, commencer une thérapie ou entreprendre un cheminement personnel transformateur.',
      professionnel: 'Début prometteur : nouveau poste, lancement d\'entreprise, projet innovant, formation ouvrant des horizons. Les conditions sont réunies pour réussir ce que vous entreprenez. L\'ambiance est créative et les collaborations fructueuses. Investissements passés commencent à porter leurs fruits.',
      relationnel: 'Renouveau sentimental : regain de passion pour les couples, naissance d\'une relation prometteuse pour les célibataires. Peut annoncer un engagement (mariage, vie commune) ou l\'arrivée d\'un enfant. Les liens familiaux se renforcent ; nouvelle dynamique harmonieuse au sein du foyer.'
    },
    '05': {
      personnel: 'Vos efforts personnels portent leurs fruits : accomplissement, reconnaissance de votre valeur, sentiment de plénitude. C\'est la fin des blocages, des insatisfactions et des périodes de doute. Une étape importante de votre cheminement intérieur est franchie avec succès.',
      professionnel: 'Réussite professionnelle manifeste : promotion, augmentation, signature de contrat important, succès d\'un projet. Vos compétences sont reconnues à leur juste valeur. Tout ce que vous avez construit avec persévérance trouve maintenant sa récompense. Période faste pour les affaires et la carrière.',
      relationnel: 'Épanouissement amoureux, bonne entente et harmonie conjugale. Pour les célibataires, rencontre d\'une personne significative menant à une relation stable. Pour les couples, officialisation possible (mariage, PACS) ou concrétisation de projets communs. Fin de la solitude et des insatisfactions affectives.'
    },
    '06': {
      personnel: 'Élévation spirituelle et personnelle : vous accédez à un niveau supérieur de conscience et de compréhension de vous-même. Période de croissance intérieure, de dépassement des anciennes limites. Le travail sur soi aboutit à une version plus épanouie et plus sage de vous-même.',
      professionnel: 'Promotion, avancement ou ascension sociale significative. Une opportunité majeure vous permet d\'accéder à un niveau supérieur. Formation, changement de poste, nouveau statut : tout indique une progression. Investissements et placements sécurisent votre avenir sur le long terme. Soutien de vos supérieurs.',
      relationnel: 'Excellente carte pour la vie sociale et relationnelle : vos relations s\'élèvent en qualité. Amitiés profondes, relations amoureuses qui grandissent en maturité. Soutien des proches dans vos projets. Rencontres avec des personnes qui vous tirent vers le haut spirituellement et intellectuellement.'
    },
    '07': {
      personnel: 'Reconnaissance de votre intégrité et de votre valeur morale. Vous êtes apprécié pour ce que vous êtes profondément. Fierté légitime et sentiment d\'accomplissement personnel. Carte qui invite à rester fidèle à vos principes et à votre éthique, car c\'est cela qui fonde votre rayonnement.',
      professionnel: 'Distinction professionnelle, poste à haute responsabilité, reconnaissance publique de votre expertise. Succès dans un concours, obtention d\'un titre ou d\'une certification. Votre réputation est excellente et vous ouvrez des portes. Période où les satisfactions et les réjouissances professionnelles sont au rendez-vous.',
      relationnel: 'Relations fondées sur le respect mutuel et l\'admiration. Dans le couple, fascination et considération réciproques. Amitiés fidèles et honorables. Vous attirez des personnes de qualité qui reconnaissent votre valeur. Carte favorable aux relations sociales prestigieuses et aux alliances durables.'
    },
    '08': {
      personnel: 'Un ami sincère veille sur vous ou pense à vous. Période propice à la réflexion, à la méditation et à l\'écoute de vos intuitions. Soutien invisible mais réel de l\'univers. Cultivez la gratitude et l\'ouverture aux autres, car c\'est dans l\'échange que vous trouverez des réponses.',
      professionnel: 'Négociations et échanges professionnels favorisés. Soutien de collègues, de supérieurs ou de collaborateurs. Conseils avisés d\'un mentor ou d\'un réseau. Les partenariats fondés sur la confiance et l\'honnêteté sont particulièrement protégés. Idées et projets novateurs reçoivent un accueil favorable.',
      relationnel: 'Relations amicales et affectives placées sous le signe de la fidélité et de l\'honnêteté. Quelqu\'un pense à vous avec affection. Amitiés solides, nouveaux liens prometteurs. Dans le couple, complicité intellectuelle et projets communs. Carte qui invite à exprimer votre gratitude envers ceux qui vous soutiennent.'
    },
    '09': {
      personnel: 'Appel au repos et au ressourcement : votre corps et votre esprit réclament une pause. Période de calme où vous pouvez recharger vos batteries et retrouver votre équilibre. Favorable aux retraites, cures, vacances dans la nature. La simplicité et le retour à l\'essentiel sont vos meilleurs alliés.',
      professionnel: 'Ralentissement bénéfique : prenez soin de votre équilibre travail/bien-être. Intérêt possible pour un domaine lié à la santé, au bien-être ou à l\'écologie. Évitez le surmenage et adoptez des méthodes de travail plus sereines. Consolidation tranquille de votre situation professionnelle existante.',
      relationnel: 'Besoin de calme et de recul dans la vie affective. Pour les couples, prenez du temps à deux loin du tumulte quotidien ; des moments simples dans la nature renforceront vos liens. Pour les célibataires, période de guérison des blessures passées avant de s\'ouvrir à une nouvelle relation.'
    },
    '10': {
      personnel: 'Le « cadeau du ciel » : une période de chance et d\'opportunités inattendues s\'ouvre. Pour recevoir, il faut aussi savoir donner. Cultivez la générosité et l\'ouverture du cœur. Des bénédictions arrivent sous forme de synchronicités, de rencontres ou de prises de conscience lumineuses.',
      professionnel: 'Opportunités professionnelles offertes comme des cadeaux : poste inattendu, aides financières, intervention providentielle d\'une personne influente. Faveurs et avantages obtenus par recommandation. Les domaines relationnels et créatifs sont particulièrement favorisés. Acceptez ce qui vient avec gratitude et discernement.',
      relationnel: 'Affection, cadeaux et attentions de la part de vos proches. Période faste pour les relations amicales et amoureuses : vous recevez autant que vous donnez. Rencontre possible par le biais d\'une connaissance. Générosité et bienveillance règnent dans votre cercle affectif.'
    },
    '11': {
      personnel: 'Invitation à l\'indépendance et au libre arbitre plutôt qu\'à la peur de la trahison. Méfiez-vous des jugements hâtifs et de la dépendance à l\'avis des autres. Faites vos propres choix et assumez-les pleinement. Votre instinct de survie est aiguisé : utilisez-le avec sagesse, non avec paranoïa.',
      professionnel: 'Prudence dans les affaires : vérifiez les informations, lisez les petits caractères, méfiez-vous des promesses trop belles. Risque d\'escroquerie ou de vol intellectuel. Concurrence déloyale possible. Cependant, votre malice et votre intelligence vous permettront de retomber sur vos pieds. Protégez vos intérêts sans sombrer dans la suspicion.',
      relationnel: 'Attention aux faux-semblants dans vos relations. Quelqu\'un pourrait ne pas être totalement honnête. Invitation à poser des limites claires et à ne pas tolérer les comportements toxiques. Pour les couples, clarification nécessaire plutôt qu\'accusation directe. Faites confiance à votre intuition tout en vérifiant les faits.'
    },
    '12': {
      personnel: 'Un nouveau cycle s\'ouvre : départ physique, émotionnel ou spirituel. Besoin d\'évasion, de prendre du recul, de changer d\'air pour mieux vous retrouver. L\'ancien se termine, le nouveau commence. Cette transition est nécessaire à votre évolution personnelle ; accueillez-la avec confiance.',
      professionnel: 'Changement professionnel en vue : mutation, démission, nouveau poste à l\'étranger, lancement d\'une activité indépendante. Les déplacements et voyages d\'affaires sont favorisés. L\'envol professionnel est possible mais nécessite une préparation méthodique. Attention à ne pas négliger la gestion financière dans l\'euphorie du changement.',
      relationnel: 'Dans le couple, besoin de prendre du recul ou risque de séparation temporaire ; parfois nécessaire pour mieux se retrouver. Pour les célibataires, un départ pourrait mener à une rencontre. Carte de mouvement qui invite à ne pas s\'accrocher à ce qui doit partir pour faire place au neuf.'
    },
    '13': {
      personnel: 'Période d\'instabilité intérieure : vos choix semblent dictés par des forces extérieures. Rien n\'est acquis, tout est impermanence. Invitation à vous recentrer, à stabiliser vos fondations et à ne pas prendre de décisions impulsives. Acceptez les fluctuations sans vous y perdre ; l\'ancrage est votre salut.',
      professionnel: 'Situation professionnelle fluctuante : promesses non tenues, projets qui changent de cap, environnement de travail instable. Ne vous engagez pas sur des bases fragiles. Attendez que la situation se stabilise avant de prendre des décisions majeures. Protégez vos arrières et restez flexible.',
      relationnel: 'Attention à l\'instabilité affective : une personne inconstante ou indécise pourrait vous faire souffrir. Dans le couple, hauts et bas émotionnels, difficulté à se projeter. Ne faites pas de promesses que vous ne pourrez tenir. Pour les célibataires, méfiez-vous des relations qui commencent trop vite et s\'éteignent de même.'
    },
    '14': {
      personnel: 'Une révélation importante éclaire votre chemin : information cruciale, prise de conscience, découverte intérieure. Vous élargissez vos horizons et comprenez ce qui était caché. Favorable à l\'apprentissage, aux études, à l\'exploration de nouvelles philosophies ou pratiques spirituelles.',
      professionnel: 'Découverte d\'une opportunité professionnelle, d\'une solution innovante ou d\'une information déterminante. Poste intéressant qui se présente, projet novateur validé. Perfectionnement de vos acquis. La curiosité et la veille sont vos atouts : restez à l\'affût, posez les bonnes questions, saisissez l\'ouverture.',
      relationnel: 'Apprendre à mieux connaître la personne qui partage votre vie. Pour les nouveaux couples, phase de découverte mutuelle enrichissante. Une vérité cachée peut émerger, positive ou négative selon les cartes environnantes. Ouverture à de nouvelles façons d\'aimer et de communiquer.'
    },
    '15': {
      personnel: 'Plongée dans votre monde émotionnel et intuitif. Laissez vos sentiments s\'exprimer sans les refouler, mais ne vous noyez pas dedans. Appel à écouter votre cœur et votre voix intérieure plutôt que votre mental. Favorable à la méditation, à la créativité et aux thérapies émotionnelles. Un chemin intérieur doit être parcouru.',
      professionnel: 'Avancez avec fluidité sans forcer les choses. Projets liés à l\'eau, à l\'étranger, aux voyages ou aux domaines créatifs. Laissez-vous porter par le courant des opportunités plutôt que de lutter. Période d\'incubation où il faut laisser mûrir plutôt que précipiter. Suivez votre intuition dans les décisions.',
      relationnel: 'Émotions fortes et parfois fluctuantes dans la vie affective. Besoin de laisser circuler les sentiments, de dire ce qui pèse sur le cœur. Distance possible avec un être cher (éloignement géographique ou émotionnel). L\'amour nécessite un lâcher-prise : acceptez de ne pas tout contrôler dans la relation.'
    },
    '16': {
      personnel: 'Retour aux sources et besoin de sécurité intérieure. Vous trouverez votre havre de paix en vous reconnectant à vos racines et à ce qui est familier. Période favorable pour aménager votre espace de vie, créer un sanctuaire personnel et renforcer vos fondations psychologiques.',
      professionnel: 'Consolidation de votre situation professionnelle ou de votre position dans l\'entreprise. Travail possible depuis la maison ou dans un contexte familial. Entreprise familiale favorisée. Stabilité et sécurité financière plutôt que prise de risque. Vos bases professionnelles se solidifient.',
      relationnel: 'Carte de la famille par excellence : harmonie au sein du foyer, retour aux valeurs familiales. Pour le couple, stabilité, projets d\'installation commune, achat immobilier. Pour les célibataires, besoin de construire un nid avant d\'accueillir l\'amour. Sens de l\'hospitalité et chaleur des liens familiaux.'
    },
    '17': {
      personnel: 'Signal d\'alarme de votre corps ou de votre psyché : quelque chose ne va pas et demande votre attention. Ce n\'est pas une fatalité mais un avertissement à prendre au sérieux. Ralentissez, identifiez la source du malaise plutôt que de masquer les symptômes. Invitation à un travail thérapeutique ou introspectif.',
      professionnel: 'Problèmes ou dysfonctionnements dans votre travail : projet qui tourne mal, ambiance toxique, surmenage menant au burn-out. Nécessité de diagnostiquer ce qui ne fonctionne pas et d\'y remédier. Prenez du recul pour identifier la racine du problème. N\'ignorez pas les signaux faibles.',
      relationnel: 'Malaise dans la relation : non-dits, tensions sous-jacentes, peurs qui bloquent la communication. Quelque chose « ne tourne pas rond » dans votre vie affective ou familiale. Invitation à nommer le problème, à oser les conversations difficiles plutôt que de laisser la situation s\'envenimer.'
    },
    '18': {
      personnel: 'Fin d\'un cycle et début d\'un autre dans votre vie personnelle ou spirituelle. Transformation profonde de vos habitudes, de votre mode de vie ou de votre perception de vous-même. Cela peut concerner un déménagement, un voyage initiatique ou une évolution intérieure majeure. Accueillez le changement avec souplesse.',
      professionnel: 'Changement de travail, de secteur, de méthode ou de poste. Possibilité de reconversion professionnelle réussie. Innovation nécessaire : sortez de la routine, cassez les schémas obsolètes. Ce qui semblait stable se transforme, mais pour le mieux à terme. Adaptez-vous rapidement, la transition est inévitable et bénéfique.',
      relationnel: 'Évolution significative de votre vie affective : nouvelle phase dans le couple, changement de statut (célibat vers relation, ou l\'inverse). La routine est bousculée, ce qui peut être déstabilisant mais finalement positif. Ouverture à de nouvelles façons de vivre l\'amour et d\'être en relation.'
    },
    '19': {
      personnel: 'Abondance et prospérité dans votre vie : vous récoltez ce que vous avez semé. Confiance en votre valeur personnelle et capacité à attirer l\'abondance. Période où vous pouvez combler vos manques et capitaliser sur vos forces. L\'énergie est disponible pour concrétiser vos aspirations.',
      professionnel: 'Réussite financière, augmentation de revenus, bénéfices, investissements fructueux. Opportunités d\'améliorer votre situation matérielle : nouveau contrat, promotion avec hausse de salaire, projet rentable. C\'est le moment de faire fructifier vos actifs et de sécuriser votre avenir financier. Gérez avec sagesse.',
      relationnel: 'Dans le couple, stabilité matérielle qui sécurise la relation ou discussions nécessaires sur les finances communes. Attention à ne pas réduire la relation à des considérations matérielles. Pour les célibataires, rencontre possible avec une personne aisée ou dans un contexte lié aux affaires.'
    },
    '20': {
      personnel: 'Élargissement de vos horizons intellectuels et spirituels. Compréhension nouvelle de votre situation, solution émergeant de la réflexion. Favorable aux études, à la lecture, à la méditation. Votre discernement est aiguisé : faites confiance à votre capacité d\'analyse pour résoudre les problèmes.',
      professionnel: 'Succès par la réflexion stratégique : analysez, planifiez, choisissez la solution la plus simple et efficace. Formation, certifications, publications favorisées. Votre expertise est reconnue. Échanges professionnels enrichissants qui ouvrent de nouvelles perspectives. Utilisez votre intelligence plutôt que votre force.',
      relationnel: 'Communication de qualité dans le couple et les relations : échanges profonds, compréhension mutuelle, capacité à résoudre les conflits par le dialogue. Rencontre possible avec une personne cultivée ou dans un contexte intellectuel. L\'amour se nourrit aussi de conversations stimulantes et de complicité mentale.'
    },
    '21': {
      personnel: 'Sentiment d\'être prisonnier d\'une situation ou en proie à des angoisses profondes. Peurs qui vous paralysent et vous empêchent d\'avancer. Cette carte appelle un travail thérapeutique ou introspectif pour dépasser vos blocages. Ce qui a été perdu ou volé vous invite à un lâcher-prise nécessaire.',
      professionnel: 'Risque de perte financière, vol, arnaque, mauvaise gestion, négligence coûteuse. Protégez vos accès (données, contrats, propriété intellectuelle). Brèche de confiance possible avec un associé ou un employé. Récupérez ce qui vous est dû avec calme et méthode. Leçon à tirer pour mieux sécuriser vos affaires.',
      relationnel: 'Perte de confiance dans une relation, sentiment d\'avoir été volé affectivement. Peur de l\'abandon ou de la trahison qui mine le lien. Dans certains cas, nécessité de couper avec une relation toxique qui vous vide de votre énergie. Guérison nécessaire après une blessure affective.'
    },
    '22': {
      personnel: 'Vous avez tous les outils pour avancer dans votre vie : il ne tient qu\'à vous de vous en servir. C\'est le moment de structurer vos projets personnels ou votre cheminement spirituel. Comme le Bateleur du Tarot, cette carte vous invite à mettre à plat votre situation et à agir avec méthode.',
      professionnel: 'Lancement d\'une entreprise, projet d\'envergure, investissement immobilier ou nouvelle activité. Tout est en place pour réussir si vous structurez correctement : planifiez les étapes, définissez les rôles, exécutez avec constance. Potentiel de réussite réel si vous passez de l\'idée à l\'action organisée.',
      relationnel: 'Construction d\'une relation solide ou d\'un projet de vie commune. Nécessité de structurer la vie de couple : engagement, achat, projets partagés. Pour les célibataires, il est temps de « construire » activement votre vie affective plutôt que d\'attendre passivement. Mettez en place les conditions de la rencontre.'
    },
    '23': {
      personnel: 'Circulation d\'énergie et d\'idées dans votre vie : tout bouge, circule, s\'échange. Période propice aux nouvelles connexions et à la diversification de vos activités. Restez fluide, ouvert aux opportunités qui passent. C\'est dans l\'échange que vous trouverez votre équilibre actuel.',
      professionnel: 'Commerce florissant, négociations fructueuses, transactions réussies. Favorable aux métiers de la finance, des assurances, des médias, de l\'édition. Contrats, accords commerciaux, partenariats d\'affaires bien aspectés. Communication efficace et réseautage productif. L\'argent circule positivement.',
      relationnel: 'Échanges nombreux et variés dans votre vie sociale. Communication fluide avec votre entourage. Possibilité de rencontre via le travail ou les affaires. Dans le couple, discussions productives sur les questions matérielles ou administratives. La clé est de maintenir l\'information en circulation sans rétention.'
    },
    '24': {
      personnel: 'Une nouvelle importante arrive, susceptible de débloquer une situation ou d\'ouvrir une nouvelle voie. Restez disponible et attentif aux signes, messages et communications. Cette annonce peut concerner tous les domaines ; lisez entre les lignes pour en saisir toute la portée.',
      professionnel: 'C\'est le feu vert que vous attendiez : réponse positive, confirmation de projet, annonce d\'embauche, signature de contrat. Les démarches, entretiens et candidatures sont favorisés. Opportunité soudaine ou arrivée inattendue qui fait avancer vos affaires. Communiquez activement, c\'est le moment.',
      relationnel: 'Nouvelle d\'un être cher, prise de contact inattendue, message important d\'un proche. Pour les célibataires, une rencontre peut être annoncée ou facilitée. Pour les couples, communication importante qui débloque une situation. Renouer le dialogue avec quelqu\'un dont vous étiez éloigné est favorisé.'
    },
    '25': {
      personnel: 'Période harmonieuse et douce : la joie de vivre est au rendez-vous. Accordez-vous du plaisir légitime (loisirs, art, nature, sensualité) sans culpabilité. C\'est dans l\'appréciation des belles choses que vous retrouvez votre élan vital. Le plaisir équilibré nourrit l\'âme et recharge votre énergie.',
      professionnel: 'Satisfaction et plaisir dans le travail : vous aimez ce que vous faites et cela se ressent. Projets créatifs ou artistiques particulièrement favorisés. Ambiance de travail agréable, bonnes relations avec les collègues. Les secteurs du luxe, de la beauté, des arts et de la gastronomie sont sous bonne influence.',
      relationnel: 'Bonheur simple et partagé dans la vie affective. Moments de complicité, de rire et de sensualité. Sorties, loisirs et plaisirs à deux sont favorisés. Pour les célibataires, période légère où les rencontres se font naturellement, dans la joie. Profitez sans trop intellectualiser : l\'amour est aussi plaisir et légèreté.'
    },
    '26': {
      personnel: 'Retour à la paix intérieure : les conflits internes s\'apaisent, vous faites la paix avec vous-même. Période de sérénité où vous pouvez retrouver votre centre et votre équilibre. Favorable à la méditation, aux pratiques de pleine conscience. Enterrez la hache de guerre avec vos propres démons.',
      professionnel: 'Fin des tensions et des conflits professionnels. Réconciliation avec un collègue, accord trouvé après des négociations difficiles. Environnement de travail apaisé. C\'est le moment de chercher un terrain d\'entente, de proposer des compromis. La coopération remplace la compétition, pour le bénéfice de tous.',
      relationnel: 'Réconciliation après une dispute, retour à l\'harmonie dans le couple ou la famille. Carte qui resserre les liens, aplanit les tensions et apaise les cœurs. Pour les célibataires, paix intérieure qui attire des relations saines. Dans toute relation, choisissez ce qui apporte un calme durable plutôt que des passions orageuses.'
    },
    '27': {
      personnel: 'Union de vos différentes facettes : tête, cœur et corps s\'alignent harmonieusement. Période d\'intégration personnelle où vous rassemblez vos forces pour avancer. Mariage intérieur du masculin et du féminin en vous. Alliance avec votre destinée et votre moi profond.',
      professionnel: 'Associations et partenariats professionnels extrêmement favorisés. Signature de contrat, création d\'entreprise à plusieurs, collaboration fructueuse. Les énergies mises en commun décuplent les résultats. Que ce soit un associé, un client ou un collaborateur, l\'union fait la force. C\'est le moment de sceller des alliances.',
      relationnel: 'Carte majeure de l\'amour et de l\'engagement : mariage, vie commune, officialisation d\'une relation. Rencontre amoureuse décisive et durable pour les célibataires. Intimité profonde, dévouement mutuel, retrouvailles. Définissez clairement les termes de l\'engagement et choisissez le bon accord pour une relation épanouie.'
    },
    '28': {
      personnel: 'Vos racines et votre appartenance à un clan (familial, spirituel, communautaire) sont au cœur de votre équilibre actuel. Retour vers une structure collective saine. Clarifiez votre rôle au sein du groupe. Protégez les liens tout en préservant votre individualité. L\'énergie est à la construction de votre « dynastie » personnelle.',
      professionnel: 'Entreprise familiale favorisée ou travail en équipe soudée comme une famille. Besoin de consolider votre place au sein de l\'organisation. L\'intégration dans le groupe professionnel est harmonieuse. Parfois, nécessité de travailler dans un cadre proche des valeurs familiales. Solidarité d\'équipe.',
      relationnel: 'La famille au sens large est au premier plan : liens du sang, liens de cœur, famille choisie. Projets familiaux (mariage, enfants, réunification) favorisés. Retour à des relations saines au sein du clan. Attention à l\'ambivalence : ne pas trop couver les autres ni refuser de quitter le nid.'
    },
    '29': {
      personnel: 'L\'amour sous toutes ses formes imprègne votre vie : amour de soi, passion pour un projet, connexion à la Source. C\'est une carte de plénitude affective et d\'ouverture du cœur. Cultivez la gratitude et laissez l\'amour guider vos choix. Votre rayonnement attire naturellement l\'affection et la bienveillance.',
      professionnel: 'Passion investie dans votre travail : vous êtes animé par une motivation profonde pour ce que vous faites. Succès par l\'amour du métier. Projet auquel vous vous dévouez avec enthousiasme. Cette carte conseille de suivre votre cœur dans les choix professionnels : faites ce que vous aimez pour vous épanouir pleinement.',
      relationnel: 'Carte maîtresse de l\'amour romantique : passion, attraction, connexion affective profonde. Pour les couples, relation épanouie, complicité intense, amour qui grandit. Pour les célibataires, rencontre capitale marquée par le désir et l\'évidence amoureuse. Amour durable fondé sur la constance, les gestes simples et la sécurité émotionnelle.'
    },
    '30': {
      personnel: 'Invitation à profiter des plaisirs simples de la vie : partage, convivialité, moments de qualité avec ceux qui comptent. Prenez place à la table de la vie, nourrissez-vous des bonnes choses et des bonnes relations. Cultivez l\'art de recevoir et de célébrer le moment présent.',
      professionnel: 'Réunions, négociations, déjeuners d\'affaires et événements professionnels favorisés. Les échanges autour d\'une table débouchent sur des accords concrets. L\'aspect social du travail est important : cultivez votre réseau dans un cadre convivial. Invitations et événements d\'entreprise porteurs d\'opportunités.',
      relationnel: 'Carte des retrouvailles, des fêtes de famille et des moments partagés. Repas en amoureux, sorties entre amis, célébrations qui renforcent les liens. Pour les célibataires, rencontre possible lors d\'un événement social ou d\'une invitation. Nourrissez les relations qui vous nourrissent en retour.'
    },
    '31': {
      personnel: 'Énergie passionnée qui vous pousse à vivre pleinement, à sortir des sentiers battus et à repousser vos limites. Attention toutefois aux décisions prises « à chaud » et au risque d\'épuisement. Canalisez cette intensité vers la création plutôt que la dispersion. La passion est un feu qui éclaire ou qui brûle.',
      professionnel: 'Grande énergie investie dans vos projets professionnels, enthousiasme contagieux, mais tendance à brûler les étapes. Succès possible mais parfois éphémère si mal canalisé. Dans certains cas, changement impulsif de carrière réussi par pure audace. Prenez le temps de la réflexion stratégique malgré l\'envie d\'agir vite.',
      relationnel: 'Passion amoureuse intense, coup de foudre, désir ardent. Relations passionnées mais parfois instables, aventure sans lendemain si la passion n\'est pas canalisée. Séduction puissante et magnétisme fort. Pour les couples, raviver la flamme. Attention aux excès émotionnels et à la jalousie qui peut accompagner cette intensité.'
    },
    '32': {
      personnel: 'Alerte : restez lucide face aux énergies toxiques autour de vous ou en vous. Ne répondez pas à la malveillance par la malveillance. Protégez votre intégrité et votre paix intérieure sans entrer dans des jeux malsains. La meilleure défense est de rester aligné avec vos valeurs et de choisir la sortie propre.',
      professionnel: 'Jalousie, rivalité, commérages ou sabotage dans l\'environnement professionnel. Un collègue ou concurrent pourrait agir contre vos intérêts. Protégez vos projets, ne divulguez pas trop d\'informations. Cette carte vous alerte pour que vous puissiez anticiper et vous protéger, non pour vous paralyser.',
      relationnel: 'Attention aux personnes mal intentionnées dans votre entourage. Médisances, manipulations, trahison possible. Dans le couple, tensions liées à la jalousie ou à des influences extérieures néfastes. Observez, vérifiez, posez des limites claires. Ne laissez pas la toxicité d\'autrui contaminer vos relations.'
    },
    '33': {
      personnel: 'Période de clarification radicale : ce qui doit être jugé ou tranché le sera. Confrontation avec une vérité intérieure, un choix moral. Comme la Justice du Tarot, cette carte coupe dans le flou et oblige à prendre position. Soyez rigoureux et patient : la vérité finit par s\'imposer d\'elle-même.',
      professionnel: 'Questions juridiques, signature de contrat, procédure administrative ou litige en cours. La décision sera rendue, positive ou négative selon les cartes environnantes. Peut représenter une rupture de contrat comme une officialisation. Affrontez la situation avec des faits, des preuves et un cadre clair. Justice sera faite.',
      relationnel: 'Officialisation d\'une union (mariage, PACS) ou au contraire divorce et séparation. Conflit ouvert qui demande résolution, discussion franche voire confrontation. Décision irrévocable concernant la vie affective. Pour les célibataires, une vérité émerge concernant une relation passée ou à venir.'
    },
    '34': {
      personnel: 'Sentiment d\'être prisonnier d\'une situation, d\'une addiction ou d\'un schéma mental. Comme le Diable du Tarot, cette carte révèle vos chaînes. Prenez conscience de ce qui vous domine (peur, colère, attachement malsain) pour vous en libérer. La liberté commence par reconnaître sa propre servitude.',
      professionnel: 'Situation professionnelle où vous subissez l\'autorité arbitraire d\'un supérieur ou d\'un système. Perte d\'autonomie, sentiment d\'être coincé dans un poste sans échappatoire. Posez des limites claires, refusez l\'abus, renégociez le cadre. Si votre emploi vous opprime, préparez votre libération.',
      relationnel: 'Relation de domination/soumission : dépendance affective, emprise psychologique, partenaire contrôlant. Peut représenter l\'attachement excessif à une personne ou la difficulté à quitter une relation toxique. Au positif, lien très fort presque fusionnel. Évaluez si cet attachement vous grandit ou vous diminue.'
    },
    '35': {
      personnel: 'Rien n\'est jamais tout blanc ni tout noir : cette carte révèle une dualité intérieure, un combat entre vos parts d\'ombre et de lumière. L\'ennemi peut être une force extérieure ou une partie de vous-même. Cette énergie de conflit peut être canalisée positivement comme force de création et de dépassement.',
      professionnel: 'Concurrence agressive, rivalité déclarée, conflit ouvert dans le travail. Quelqu\'un s\'oppose activement à vos projets. Restez stratégique, protégez vos informations et avancez par les résultats plutôt que par la confrontation directe. Cette carte est aussi un signal de mobilisation : défendez vos positions.',
      relationnel: 'Conflit, tension, opposition dans la vie affective ou familiale. Une personne peut se révéler hostile. Attention aux disputes qui dégénèrent. Cette carte invite à identifier clairement vos « ennemis » relationnels sans paranoïa, et à choisir vos batailles. Parfois, le conflit est nécessaire pour assainir une relation.'
    },
    '36': {
      personnel: 'Dialogue intérieur nécessaire entre vos différentes aspirations. Médiation entre vos désirs et vos peurs. Capacité à vous intégrer harmonieusement dans votre environnement social. Écoutez et faites-vous entendre : la vérité émerge de l\'échange, pas du monologue intérieur.',
      professionnel: 'Négociations en cours ou à venir : préparez-vous soigneusement, écoutez la partie adverse, faites une proposition claire. Entretiens d\'embauche, réunions décisives, médiation professionnelle. Quand bien aspectée, promesse d\'accord. Mal aspectée, discussions stériles ou commérages. L\'issue dépend de la qualité du dialogue.',
      relationnel: 'Communication essentielle dans le couple ou la famille : il est temps de parler, de négocier, de trouver des compromis. Discussions parfois animées mais nécessaires. Pour les célibataires, période de rencontres et d\'échanges qui peuvent déboucher sur une relation. Écoutez autant que vous parlez.'
    },
    '37': {
      personnel: 'Énergie brute et puissante qui vous anime : courage, impulsivité, feu sacré intérieur. Besoin de purifier certains aspects de votre vie, comme le phénix qui renaît de ses cendres. Agissez avec détermination mais gardez le contrôle. Cette force peut construire ou détruire selon comment vous la dirigez.',
      professionnel: 'Agissez maintenant avec courage et détermination. Démarrage énergique de projets, initiatives audacieuses. Choisissez une cible précise, engagez-vous pleinement et canalisez votre élan. Attention aux décisions impulsives ou aux conflits brûlants avec des collègues. L\'énergie est là : utilisez-la à bon escient.',
      relationnel: 'Passion ardente, tension sexuelle, intensité émotionnelle dans la relation. Peut représenter un conflit qui éclate au grand jour ou au contraire une réconciliation passionnée. Nécessité de purifier la relation de ce qui l\'encombre. Attention aux disputes explosives : le feu peut réchauffer ou brûler.'
    },
    '38': {
      personnel: 'Comme la Maison Dieu du Tarot, cette carte annonce un bouleversement soudain qui détruit ce qui était mal construit. Choc nécessaire pour vous réveiller et vous forcer à changer. Restez adaptable : sécurisez l\'essentiel, apprenez vite de la situation et transformez la disruption en ajustement positif.',
      professionnel: 'Imprévu majeur ou crise soudaine dans le travail : perte d\'emploi, échec d\'un projet, accident financier. C\'est un signal fort pour revoir vos méthodes et vos fondations. Ce qui s\'effondre devait partir. Reconstruisez sur des bases plus solides. Adaptabilité et résilience sont vos meilleures armes.',
      relationnel: 'Rupture soudaine, crise imprévue dans le couple ou la famille. Événement choquant qui oblige à redéfinir la relation. Séparation brutale possible. Mais cet accident peut être le déclencheur d\'une nécessaire remise en question et d\'une reconstruction sur des bases plus authentiques.'
    },
    '39': {
      personnel: 'Une main secourable se tend vers vous : soutien de l\'univers, protection invisible, guidance spirituelle. Vous êtes sur la bonne voie et pouvez compter sur des aides providentielles. Acceptez le soutien qu\'on vous offre. Votre capacité à maîtriser les événements et à garder le contrôle est renforcée.',
      professionnel: 'Soutien puissant d\'un supérieur, d\'un mentor ou d\'une personne influente. Appui institutionnel ou politique favorable à vos projets. Vous pouvez déléguer ce qui vous pèse et avancer avec un backing solide. Situation de maîtrise : vous dominez les événements professionnels. Succès et reconnaissance assurés.',
      relationnel: 'Soutien indéfectible d\'un proche, d\'un partenaire ou d\'un ami. Dans le couple, l\'un porte l\'autre dans une période difficile. Protection affective et sécurité. Pour les célibataires, rencontre avec une personne protectrice et fiable. Acceptez l\'aide qu\'on vous offre sans orgueil mal placé.'
    },
    '40': {
      personnel: 'Rayonnement intérieur et extérieur : vous attirez par votre beauté naturelle et votre harmonie. Période de vitalité, de fraîcheur et d\'espoir. Tout ce que vous entreprenez avec le cœur a des chances de s\'épanouir. Cultivez votre beauté intérieure autant qu\'extérieure. C\'est une carte de floraison personnelle.',
      professionnel: 'Succès par l\'harmonie et l\'esthétique. Projets liés à la beauté, à l\'art, au design ou au luxe particulièrement favorisés. Votre image professionnelle est un atout majeur : soignez-la. Ce que vous peaufinez aujourd\'hui augmente votre impact et votre attractivité sur le marché.',
      relationnel: 'Sentiments sincères, loyauté et fraîcheur dans la relation amoureuse. Pour les célibataires, rencontre marquée par la beauté (physique ou intérieure) et le coup de cœur. Début prometteur d\'une histoire. Pour les couples, redécouverte de la beauté du partenaire et renouveau du désir.'
    },
    '41': {
      personnel: 'Ce qui vous a été transmis (génétiquement, culturellement, karmiquement) influence votre présent. Honorez votre histoire familiale et spirituelle tout en choisissant consciemment ce que vous gardez et ce dont vous vous libérez. Mémoire et continuité sont à l\'honneur. Le passé éclaire votre chemin actuel.',
      professionnel: 'Héritage matériel ou transmission d\'entreprise, de savoir-faire, de clientèle. Reprise d\'une affaire familiale favorisée. Investissements patrimoniaux sécurisés sur le long terme. Ce qui vient du passé (économies, acquis, réseau hérité) constitue une base solide pour bâtir l\'avenir professionnel.',
      relationnel: 'Transmission familiale, racines communes, héritage affectif. Dans le couple, influence des familles respectives sur la relation (positive ou pesante). Mémoire des ancêtres qui influence la dynamique familiale actuelle. Honorez l\'histoire tout en écrivant votre propre chapitre affectif.'
    },
    '42': {
      personnel: 'Avancez lentement et sûrement : la meilleure décision est celle qui résiste à l\'épreuve du temps. Prenez du recul, observez, méditez avant d\'agir. Votre sagesse intérieure parle : écoutez-la. Favorable à l\'étude, à la méditation et aux pratiques spirituelles. La patience est votre meilleure alliée.',
      professionnel: 'Agissez avec prudence et stratégie : élaborez un plan réfléchi, analysez toutes les options, ne vous précipitez pas. Conseil avisé d\'un mentor expérimenté. Décisions mûrement réfléchies qui porteront leurs fruits sur le long terme. Sagesse plutôt que génie, constance plutôt que fulgurance.',
      relationnel: 'Relations fondées sur la maturité et la profondeur plutôt que sur la passion éphémère. Communication sage et réfléchie. Dans le couple, capacité à résoudre les problèmes avec recul. Pour les célibataires, une personne mûre et sage pourrait entrer dans votre vie. L\'amour se construit avec patience.'
    },
    '43': {
      personnel: 'Vos paroles et vos actions voyagent loin : votre réputation vous précède. Période de visibilité où vous êtes remarqué. Utilisez cette notoriété avec humilité et sagesse. Gérez votre image en restant authentique. C\'est le moment de rayonner et de partager votre lumière avec le monde.',
      professionnel: 'Succès public, reconnaissance professionnelle étendue, médiatisation positive. Votre travail est remarqué et applaudi. Idéal pour lancer un produit, publier, prendre la parole en public. Ascension sociale liée à votre notoriété. Restez cohérent et visez la qualité plutôt que la simple célébrité.',
      relationnel: 'Votre vie affective ou familiale peut être exposée au regard des autres. Dans le couple, fierté mutuelle et reconnaissance sociale de l\'union. Pour les célibataires, rencontre avec une personne connue ou en vue. L\'opinion des autres influence vos relations : restez fidèle à vous-même.'
    },
    '44': {
      personnel: 'Comme la Roue de Fortune du Tarot, cette carte rappelle que tout change et que la chance tourne. Une opportunité inattendue se présente. Restez prêt à saisir le moment favorable tout en gardant votre discernement. La vie vous offre une ouverture : dites oui au bon moment. Tout est cycle et transformation.',
      professionnel: 'Coup de chance, opportunité soudaine, gain inattendu, spéculation gagnante. Une occasion se présente sans que vous l\'ayez cherchée. Soyez prêt à la saisir rapidement. Mais attention : le hasard peut aussi tourner. Ne misez pas tout sur la chance ; gardez une stratégie solide en parallèle.',
      relationnel: 'Rencontre « par hasard » qui pourrait changer votre vie affective. Coïncidences troublantes, synchronicités amoureuses. La chance est avec vous dans les relations, mais ne la forcez pas. Pour les couples, un événement fortuit pourrait modifier la dynamique. Restez ouvert aux surprises du destin.'
    },
    '45': {
      personnel: 'Bien-être profond et satisfaction durable : vous êtes aligné avec votre chemin de vie et cela se ressent. C\'est le « coup de pouce du destin ». Même dans la difficulté, cette carte promet que vous garderez la tête hors de l\'eau. Le bonheur vient de la stabilité intérieure et du rythme sain que vous cultivez.',
      professionnel: 'Satisfaction et accomplissement professionnels. Vocation trouvée, travail qui a du sens, reconnaissance qui comble au-delà du matériel. Les efforts constants mènent à une réussite épanouissante. Période de récolte où la joie du travail accomplit nourrit votre quotidien.',
      relationnel: 'Bonheur amoureux et familial : harmonie, complicité, joie partagée. Pour les couples, période de plénitude où l\'amour est vécu dans la sérénité. Pour les célibataires, bonheur d\'être bien seul avant une rencontre épanouissante. L\'amour heureux se construit sur la joie simple du quotidien partagé.'
    },
    '46': {
      personnel: 'Comme l\'Ermite du Tarot, cette carte parle du poids du passé et du vécu qui handicape votre présent. Période où la vie semble pénible, où la fatigue (physique ou morale) domine. Faites un bilan honnête de votre situation : prenez du recul pour identifier ce qui vous bloque et alléger votre fardeau.',
      professionnel: 'Difficultés professionnelles, labeur ingrat, manque de reconnaissance, période de vaches maigres. Obstacles qui semblent s\'accumuler. Ce n\'est pas une fin, mais une épreuve : tenez bon, coupez le superflu, transformez l\'obstacle en leçon. Cette phase forge votre résilience et votre force de caractère.',
      relationnel: 'Sentiment d\'isolement affectif, problèmes de communication dans le couple, lassitude. Le poids des expériences passées peut entraver les relations présentes. Faites l\'inventaire de ce qui vous pèse dans votre vie affective. La solitude ressentie est une invitation à vous reconstruire intérieurement avant de mieux aimer.'
    },
    '47': {
      personnel: 'Période de stagnation apparente où rien ne semble pousser. Comme une île déserte au milieu de l\'eau, cette carte vous invite à la méditation et au retrait temporaire. Ne forcez rien. Ce vide est fertile : il vous donne le temps de faire le point et de vous clarifier avant de repartir.',
      professionnel: 'Projets à l\'arrêt, blocages administratifs, stérilité créative. Rien n\'avance malgré vos efforts. Cessez de forcer : revoyez vos méthodes, changez d\'approche, attendez que les conditions mûrissent. Cette pause forcée peut être mise à profit pour vous former ou repenser votre stratégie.',
      relationnel: 'Période de vide affectif ou de sécheresse émotionnelle dans le couple. Pas de rencontre en vue pour les célibataires. Blocage de la communication ou de l\'intimité. Plutôt que de forcer une connexion, acceptez cette pause comme un temps de maturation et de retour à vous-même.'
    },
    '48': {
      personnel: 'Comme l\'Arcane sans Nom du Tarot, cette carte annonce une fin nécessaire. Ce qui doit mourir en vous (croyances limitantes, vieilles habitudes, attachements) va être tranché. Décidez avec clarté : coupez ce qui vous retient pour ouvrir un nouveau chapitre. Ce n\'est pas une punition mais une libération.',
      professionnel: 'Fin inévitable d\'un contrat, d\'un projet ou d\'une situation professionnelle. Licenciement, fermeture d\'entreprise, échec d\'un projet qui ne pouvait aboutir. Acceptez la coupe franche : cette fin prépare un nouveau départ plus aligné. Tournez la page avec dignité et préparez la suite.',
      relationnel: 'Rupture définitive, séparation inévitable, divorce. Une relation arrive à son terme naturel et ne peut être sauvée. Ou au contraire, décision radicale et salvatrice de mettre fin à une situation toxique. La fin est douloureuse mais nécessaire pour que du neuf puisse émerger dans votre vie affective.'
    },
    '49': {
      personnel: 'Intervention bienveillante de l\'univers : contre toute attente, une situation difficile se dénoue positivement. Grâce divine, protection spirituelle, pardon reçu ou donné. Laissez-vous porter par cette énergie de douceur et de compassion. Réparez ce qui doit l\'être et avancez plus léger, le cœur apaisé.',
      professionnel: 'Contre toute attente, une solution arrive : aide providentielle, délai accordé, retournement favorable de situation. Rebondissement positif après une période noire. Restez humble et reconnaissant. Cette carte est un véritable cadeau dans un contexte professionnel difficile : la roue tourne enfin en votre faveur.',
      relationnel: 'Pardon, réconciliation inespérée, retour à la douceur après une crise. Grâce accordée ou reçue dans le couple. Pour les célibataires, une rencontre peut survenir de manière inattendue, comme un don du ciel. L\'amour sous sa forme la plus pure : compassion, bienveillance et acceptation inconditionnelle.'
    },
    '50': {
      personnel: 'Comme la Maison Dieu, cette carte parle de l\'usure du temps sur les choses et de la nécessité de se renouveler. Ce qui s\'effondre était devenu obsolète. Acceptez la fin d\'une structure, triez l\'essentiel et reconstruisez mieux. Ne restez pas prisonnier des habitudes ou de la monotonie : renouvelez-vous.',
      professionnel: 'Faillite, pertes financières, échec d\'un projet, déconfiture. Fondations fragiles qui s\'effondrent. Cette crise vous force à reconstruire sur des bases plus solides. Acceptez la fin d\'une structure professionnelle dépassée et préparez votre renaissance. L\'échec apparent est le prélude d\'une reconstruction durable.',
      relationnel: 'Effondrement d\'une relation basée sur des fondations fragiles. Routine et usure du temps qui ont détruit le lien. Nécessité de tout reconstruire ou de partir. Pour les célibataires, sentiment de désolation affective. Il est temps de rebâtir votre vie sentimentale sur des bases plus authentiques.'
    },
    '51': {
      personnel: 'La roue est bloquée : rien n\'avance malgré vos efforts. Plutôt que de vous épuiser contre les obstacles, utilisez ce temps pour consolider vos acquis, préparer l\'avenir et cultiver la patience. Le temps travaille pour vous si vous ajustez votre plan. Dans l\'immobilité forcée se cache une maturation nécessaire.',
      professionnel: 'Projets à l\'arrêt, délais administratifs, blocages hiérarchiques, obstacles répétés. Rien ne bouge et c\'est frustrant. Consolidez vos positions, préparez le terrain, et relancez au moment opportun. Cette carte peut aussi représenter un investissement à long terme : la lenteur est gage de solidité.',
      relationnel: 'Stagnation affective : une relation qui n\'avance pas, un célibat qui s\'éternise, des projets de couple repoussés. Patience obligatoire mais aussi invitation à vérifier si ces retards ne cachent pas un blocage plus profond. Le temps peut renforcer un amour véritable ou révéler son absence de fondations.'
    },
    '52': {
      personnel: 'Besoin impérieux de retrait, de silence et d\'introspection. Comme un moine dans son cloître, isolez-vous du bruit du monde pour vous retrouver. Période de réflexion profonde, de bilan ou de deuil nécessaire. Protégez votre espace intérieur. Au positif : vacances spirituelles, retraite, connexion à votre essence.',
      professionnel: 'Période de retrait professionnel : mise en disponibilité, congé sabbatique, chômage vécu comme une pause. Besoin de vous extraire d\'un environnement toxique. Isolez-vous pour réfléchir à votre avenir professionnel. Manque de contacts et de réseau. Préparez votre prochaine action loin de l\'agitation.',
      relationnel: 'Manque de communication, silence, distance dans la relation. L\'un des partenaires « se cloître » émotionnellement. Pour les célibataires, période de solitude choisie ou subie. Cette carte avertit contre l\'isolement affectif excessif tout en reconnaissant le besoin légitime de se recentrer avant d\'aimer à nouveau.'
    },
  };

  var PLANE_LABELS = {
    personnel: 'Personnel',
    professionnel: 'Professionnel',
    relationnel: 'Relationnel'
  };

  var PLANE_INTROS = {
    personnel: 'Voici la lecture de votre tirage sur le plan personnel.',
    professionnel: 'Voici la lecture de votre tirage sur le plan professionnel.',
    relationnel: 'Voici la lecture de votre tirage sur le plan relationnel.'
  };

  var PLANE_SYNTH = {
    personnel: {
      Soleil: 'Les energies solaires indiquent une periode de rayonnement personnel.',
      Lune: 'Les influences lunaires vous invitent a l\'introspection et l\'ecoute interieure.',
      Mercure: 'L\'intellect et la communication sont au cœur de votre evolution personnelle.',
      Venus: 'L\'harmonie et l\'amour de soi sont les cles de votre epanouissement.',
      Mars: 'L\'energie de l\'action vous pousse a vous affirmer.',
      Jupiter: 'Une expansion personnelle favorable est en cours.',
      Saturne: 'Une phase de structuration vous invite a batir des fondations solides.'
    },
    professionnel: {
      Soleil: 'Succes et reconnaissance professionnelle sont favorises.',
      Lune: 'La discretion et l\'intuition sont vos alliees professionnelles.',
      Mercure: 'Communication et agilite intellectuelle sont vos atouts majeurs.',
      Venus: 'Les alliances et l\'harmonie au travail portent leurs fruits.',
      Mars: 'L\'audace et l\'initiative sont recompensees.',
      Jupiter: 'Expansion professionnelle favorable.',
      Saturne: 'Patience et perseverance sont vos meilleures alliees.'
    },
    relationnel: {
      Soleil: 'Chaleur et generosite illuminent vos relations.',
      Lune: 'Emotions profondes et sensibilite caracterisent vos liens actuels.',
      Mercure: 'Le dialogue et la comprehension mutuelle sont essentiels.',
      Venus: 'Amour et harmonie baignent vos relations.',
      Mars: 'Passion et intensite animent vos liens.',
      Jupiter: 'Vos relations s\'epanouissent et s\'elargissent.',
      Saturne: 'Stabilite et engagement caracterisent vos relations.'
    }
  };

  function detectDominantPlanet(cards) {
    var planets = {};
    cards.forEach(function (c) {
      var p = c.planet;
      if (p === 'Majeure') return;
      planets[p] = (planets[p] || 0) + 1;
    });
    var best = null, max = 0;
    for (var p in planets) {
      if (planets[p] > max) { max = planets[p]; best = p; }
    }
    return best;
  }

  function projectSpread(cards, plane) {
    var entries = cards.map(function (card) {
      var cid = String(card.id).padStart(2, '0');
      var planeData = CARD_PLANES[cid];
      if (!planeData) return { cardName: card.name, kw: '', text: card.meaning };
      return {
        cardName: card.name,
        kw: card.planetEmoji + ' ' + card.planet,
        text: planeData[plane] || card.meaning
      };
    });

    var dominant = detectDominantPlanet(cards);
    var synth = (dominant && PLANE_SYNTH[plane] && PLANE_SYNTH[plane][dominant])
      ? PLANE_SYNTH[plane][dominant]
      : 'Ce tirage vous offre un eclairage precieux sur votre situation actuelle.';

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