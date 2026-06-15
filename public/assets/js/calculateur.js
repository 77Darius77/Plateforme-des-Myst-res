/* ═══════════════════════════════════════════
   NUMÉROLOGIE CABALISTIQUE — Calculateur
   ═══════════════════════════════════════════ */

const ARCHETYPES = {
  1:  { force: "Leader, pionnier, indépendance", faiblesse: "Égoïsme, domination", interpretation: "Le 1 est le nombre de l'indépendance et du leadership. Dans la tradition, le Un porte la fortaleza du pionnier — tu es celui qui ouvre les chemins que personne n'a encore tracés. Ta force est l'initiative pure, l'audace de te lancer sans filet, la capacité à compter sur toi-même en toutes circonstances. Mais le 1 a une ombre puissante : la solitude vécue depuis la basse estime. Raúl le dit clairement : « No puedo estar solo. » Ce n'est pas la solitude choisie du sage, c'est la solitude subie de celui qui ne sait pas s'ouvrir. Ton défi est d'être le leader sans être le tyran, d'ouvrir la voie sans écraser ceux qui marchent avec toi. La leçon du 1, c'est d'apprendre que la véritable indépendance n'est pas de tout faire seul — c'est de savoir quand avancer seul et quand inviter les autres à te rejoindre. Tu es le premier, mais le premier n'est rien sans ceux qui suivent.", interpretation_jour: "Né·e un 1, tu es un·e pionnier·ère dans l'âme. Le premier jour du mois t'a donné une énergie d'initiative pure — tu n'attends pas qu'on te montre le chemin, tu le traces. Cette indépendance est ton bouclier, mais n'oublie pas que même les leaders ont besoin d'alliés.", interpretation_mois: "Né·e en janvier (mois 1), tu démarres chaque chose avec une intensité rare. Le 1 en mois te confère une force de commencement — tu es celui ou celle qui lance les projets, qui ose le premier pas. Cette énergie est un moteur, pas un feu de paille.", interpretation_annee: "Ton année de naissance se réduit au 1. Ta génération est venue pour initier, pas pour suivre. Dans une époque de transformation, tu as la responsabilité d'ouvrir des brèches, de montrer que l'audace est encore possible." },
  2:  { force: "Coopération, diplomatie, patience", faiblesse: "Dépendance affective", interpretation: "Le 2 est le nombre de la connexion — la capacité à relier les mondes, à relier les êtres. Dans la cabale, le 2 représente la pareja, le couple, le miroir. Ta force est cette faculté unique de créer des ponts là où d'autres voient des murs, de tendre la main quand le monde se referme. Tu es un diplomate-né, un pacificateur, quelqu'un qui sent l'autre avant même qu'il ne parle. Mais le 2 a une ombre redoutable : la dépendance. Quand ta connexion devient fusion, tu perds ta propre limite — tu ne sais plus où tu commences et où l'autre finit. Ta valeur ne dépend pas de celle des autres, même si ton cœur te dit le contraire. La leçon du 2, c'est d'apprendre à être avec sans être dans, à aimer sans t'accrocher. La vraie connexion n'est pas celle qui t'attache — c'est celle qui te libère tout en te reliant.", interpretation_jour: "Né·e un 2, tu es un·e diplomate-né·e. Ta force réside dans ta capacité à créer des ponts là où d'autres voient des murs. Cette sensibilité aux autres est ton radar — mais attention à ne pas t'y perdre.", interpretation_mois: "Né·e en février (mois 2), tu baignes dans l'énergie de la relation et de l'harmonie. Le 2 en mois fait de toi un être de nuance et de patience. Tu sais que la douceur est parfois plus forte que la tempête.", interpretation_annee: "Ton année de naissance se réduit au 2. Ta génération porte la mission de réconcilier, de rassembler ce qui a été divisé. Dans un monde qui oppose, tu es venu·e pour unir." },
  3:  { force: "Communication, créativité, joie", faiblesse: "Dispersion, superficialité", interpretation: "Le 3 est le nombre des cieux, du monde non-physique. Dans la cabale, le Père représente le monde non-physique, et le 3 en est la clé. Ta force est la connexion aux mondes supérieurs — tu captes des informations que les autres ne perçoivent pas, tu es traversé par des intuitions qui viennent d'ailleurs. Tu es un canal entre la terre et le ciel, et ta créativité déborde parce qu'elle est alimentée par des sources invisibles. Mais voici ton ombre : quand tu perds cette connexion spirituelle, tu deviens sec, rationnel, coupé de ta source. C'est particulièrement vrai pour les hommes trop cartésiens qui ont nié leur part de mystère. La leçon du 3, c'est de rester connecté aux mondes subtils sans perdre pied dans la réalité. Laisse le ciel t'inspirer, mais garde les pieds sur terre. Tu es le pont qui relie l'invisible au visible.", interpretation_jour: "Né·e un 3, tu es un·e artiste de la parole et de la vie. Ta créativité déborde — elle est ton essence, pas un simple passe-temps. Le monde a soif de ta joie, mais n'oublie pas d'approfondir ce que tu exprimes.", interpretation_mois: "Né·e en mars (mois 3), tu es porté·e par une énergie de communication vibrante. Le 3 en mois te donne une aisance naturelle à exprimer tes émotions et tes idées. Tu es un canal, pas un barrage.", interpretation_annee: "Ton année de naissance se réduit au 3. Ta génération est appelée à libérer la créativité et la joie. Tu es un messager des temps nouveaux — ta parole compte." },
  4:  { force: "Structure, ordre, discipline", faiblesse: "Rigidité, peur du changement", interpretation: "Le 4 est la structure, la base, le carré. Raúl le dit : ce sont les « personas cuadriculadas » — ceux qui ont besoin de cases, de plans, de fondations solides. Ta force est cette capacité à structurer le chaos, à poser des piliers là où tout menace de s'effondrer. Tu es le bâtisseur, celui sur qui les autres peuvent compter. Mais le 4 a un défi immense : la rigidité. Quand la structure devient prison, quand le plan devient carcan, tu t'étouffes sans même le savoir. Le grand défi du 4, c'est d'apprendre à s'ajuster. La maternité est l'épreuve idéale pour un 4 — parce qu'un enfant, ça ne se contrôle pas, ça force à lâcher prise. Ta leçon est d'être solide sans être rigide, d'offrir une structure qui soutient sans enfermer. Sois le pilier, pas la cage.", interpretation_jour: "Né·e un 4, tu es un·e bâtisseur·se né·e. Ta force est la construction patiente, la discipline qui transforme une vision en réalité. Tu poses les fondations que le vent ne peut emporter.", interpretation_mois: "Né·e en avril (mois 4), tu es ancré·e dans la matière et la stabilité. Le 4 en mois t'offre une structure intérieure solide. Mais rappelle-toi que la sécurité est un tremplin, pas une forteresse.", interpretation_annee: "Ton année de naissance se réduit au 4. Ta génération a pour mission de reconstruire sur des bases solides. Tu es venu·e apporter l'ordre là où règne le chaos." },
  5:  { force: "Liberté, aventure, adaptabilité", faiblesse: "Instabilité, excès", interpretation: "Le 5 est le nombre de la mère, des principes, des valeurs. Raúl l'appelle « el territorio interior » — ton espace intérieur sacré. Depuis la porte vers l'intérieur, ce sont TES lois qui règnent. Ta force est cette capacité à définir ton propre territoire, à savoir ce qui est bon pour toi et ce qui ne l'est pas. Mais le 5 a une ombre redoutable : laisser entrer n'importe qui dans ta maison, dans ton intimité. Raúl prévient : « Ojito a quién permites entrar en tu útero. » Les lois de l'intérieur sont sacrées, et si tu les abandonnes, tu te retrouves envahi. Le 5 est une leçon de discernement — apprends à fermer ta porte à ceux qui ne respectent pas ton territoire. Ta maison intérieure est ton sanctuaire ; n'ouvre qu'à ceux qui en sont dignes.", interpretation_jour: "Né·e un 5, tu es un·e aventurier·ère dans l'âme. Le changement est ton carburant, la liberté ton seul maître. Tu as la clé de l'adaptabilité — cette flexibilité est ton superpouvoir.", interpretation_mois: "Né·e en mai (mois 5), tu es traversé·e par un vent de liberté. Le 5 en mois te pousse à explorer, à goûter, à voyager. Ton appétit de vie est immense, nourris-le sans t'y brûler.", interpretation_annee: "Ton année de naissance se réduit au 5. Ta génération est venue pour briser les chaînes et célébrer la diversité. Tu es un explorateur de nouveaux possibles." },
  6:  { force: "Responsabilité, famille, service", faiblesse: "Mensonge (6↔9)", interpretation: "Le 6 est la lettre hébraïque Vav — la communication, la connexion. Dans la cabale, Vav est le clou qui relie les mondes. Ta force est cette capacité à communiquer, à tisser des liens, à être le point de jonction entre les personnes et les idées. Tu portes le monde sur tes épaules avec une générosité rare, et les autres se reposent sur toi. Mais le 6 cache un secret que Raúl révèle : renverse-le, et il devient le 9. Le 6 à l'endroit, c'est la communication ; à l'envers, c'est la Vérité. Et inversement — le 6 peut aussi devenir le mensonge. Quand tu communiques sans vérité, quand tu mens pour plaire ou pour maintenir l'harmonie factice, tu trahis ton essence. La leçon du 6, c'est que la vraie communication est celle qui dit la vérité avec amour. Ne te mens pas pour arrondir les angles. Parle, mais parle vrai.", interpretation_jour: "Né·e un 6, tu es un·e protecteur·rice-né·e. Ta responsabilité envers les autres est ta marque de fabrique. Tu portes le foyer, la famille, le service — mais n'oublie pas de te servir toi-même.", interpretation_mois: "Né·e en juin (mois 6), tu es baigné·e d'une énergie familiale et responsable. Le 6 en mois fait de toi un pilier pour ceux qui t'entourent. C'est ta force, mais veille à ne pas porter le monde seul·e.", interpretation_annee: "Ton année de naissance se réduit au 6. Ta génération a la mission de guérir les liens, de restaurer la confiance. Tu es venu·e pour aimer, servir, et rappeler que la vérité est plus forte que tout." },
  7:  { force: "Sagesse intérieure, analyse, spiritualité", faiblesse: "Isolement, froideur", interpretation: "Le 7 est le nombre du Sage, mais aussi du guerrier intérieur. Dans la tradition cabalistique, le 7 représente le contrôle — non pas celui qu'on impose aux autres, mais celui qu'on exerce sur soi-même. Ta force, c'est cette capacité à plonger dans les profondeurs de l'analyse, à voir ce que personne ne voit, à comprendre les mécanismes cachés du réel. Tu es un chercheur de vérité, et rien ne t'arrête quand tu poursuis une question. Mais ton ombre, c'est la tour d'ivoire. Le 7 en debilidad, c'est le contrôle qui devient prison — l'isolement, la froideur, cette distance que tu mets entre toi et les autres pour ne pas souffrir. La véritable leçon du 7, c'est d'apprendre à lâcher prise — à descendre de la montagne pour partager ta sagesse avec ceux qui marchent dans la vallée. Le sage véritable n'est pas celui qui sait, c'est celui qui éclaire.", interpretation_jour: "Né·e un 7, tu es un·e chercheur·se de vérité. Ton esprit ne se satisfait jamais des réponses toutes faites — tu creuses, tu analyses, tu médites. Cette profondeur est ton trésor le plus précieux, mais elle peut aussi t'isoler si tu oublies de partager tes découvertes.", interpretation_mois: "Né·e en juillet (mois 7), tu baignes dans une énergie de recueillement et d'introspection. Le 7 en mois colore ton approche de la vie d'une teinte spirituelle — tu ne vis pas les choses, tu les contemples. Cette sagesse te vient naturellement, comme une seconde peau.", interpretation_annee: "Ton année de naissance se réduit au 7. Ta génération porte la mission de chercher la vérité au-delà des apparences. Tu es venu·e à une époque où le sens profond des choses est à redécouvrir, et tu as un rôle à jouer dans cette quête." },
  8:  { force: "Pouvoir, conquête, stratégie", faiblesse: "Avidité, manipulation", interpretation: "Le 8, c'est le Conquistador. Raúl ne mâche pas ses mots : le 8 est profondément lié au territoire, à la conquête, à l'acquisition. « Está muy relacionado con la inmobiliaria, adquirir propiedades, dinero, cuenta bancaria holgada. » Ta force est cette capacité à bâtir un empire, à conquérir ton territoire, à créer l'abondance autour de toi. Dans la tradition, le mâle offre le territoire à la femelle — le 8 protège, pourvoit, étend son domaine. Mais le 8 a une ombre : se faire piétiner, voir son territoire envahi. Quand tu perds le contrôle de ton empire, tu deviens vulnérable. La leçon du 8, c'est de conquérir avec stratégie mais sans avidité. Bâtis ton royaume, mais souviens-toi qu'un empire construit sur l'oppression finit toujours par s'effondrer. Sois un conquérant au cœur juste.", interpretation_jour: "Né·e un 8, tu es né·e pour le pouvoir et le succès. Ta force est la stratégie, l'ambition, la capacité à voir grand et à accomplir. L'argent et l'autorité sont des outils — sers-t'en avec sagesse.", interpretation_mois: "Né·e en août (mois 8), tu es imprégné·e d'une énergie de conquête et de maîtrise. Le 8 en mois te donne une endurance et une détermination hors du commun. Le pouvoir est juste un moyen — ne confonds pas la fin et les moyens.", interpretation_annee: "Ton année de naissance se réduit au 8. Ta génération est appelée à rééquilibrer le pouvoir et la matière. Tu es venu·e pour construire des empires — mais des empires qui servent l'humanité." },
  9:  { force: "Vérité, sagesse universelle", faiblesse: "Mensonge (9↔6)", interpretation: "Le 9 est la Vérité. En hébreu, le mot « Emet » — vérité — a pour guématrie 441, qui se réduit à 9. C'est mathématique : le 9 porte la signature de la vérité dans son ADN. Ta force est cette fidélité absolue à la vérité, cette capacité à voir au-delà des illusions, à être un phare d'authenticité dans un monde qui triche. Mais le 9 a une ombre redoutable : le mensonge. Raúl le dit sans détour : « Son esos mentirosos compulsivos, porque no le ven la gravedad. » Le 9 retourné devient le 6 — la communication dévoyée en mensonge. Certains 9 mentent sans même s'en rendre compte, parce qu'ils ne voient pas la gravité de ce qu'ils font. La leçon du 9, c'est d'incarner la vérité coûte que coûte, même quand elle dérange. Tu es un phare — les phares ne cachent pas leur lumière pour protéger les rochers.", interpretation_jour: "Né·e un 9, tu es un phare de vérité dans ce monde. Ton âme a choisi ce jour pour rayonner une sagesse qui ne triche pas. Le 9 est le nombre de l'accomplissement — tu es ici pour boucler une boucle, pas pour en ouvrir une nouvelle.", interpretation_mois: "Né·e en septembre (mois 9), tu portes l'énergie de la récolte et du bilan. Le 9 en mois te donne une maturité précoce, une capacité à voir la fin dans le commencement. Tu sais que tout cycle s'achève — et c'est ta force.", interpretation_annee: "Ton année de naissance se réduit au 9. Cela signifie que ta génération est appelée à clore un chapitre de l'histoire humaine. Tu es venu·e pour enseigner, guérir, et montrer la voie de la compassion universelle." },
  10: { force: "Compréhension : jamais seul·e", faiblesse: "Peur de la solitude", interpretation: "Le 10 parle de la peur — et plus précisément de la peur de la solitude. C'est le nombre qui te confronte à la question la plus intime : es-tu capable d'être seul ? Ta force est une compréhension profonde que personne n'est jamais vraiment seul, parce que tu es toujours avec le Créateur, toujours relié au grand tout. Le 10 est le nombre de la totalité, du cycle qui se referme et qui en ouvre un autre. Mais la debilidad du 10, c'est cette peur viscérale de la solitude — ce vide que tu cherches à combler par tous les moyens, par les autres, par l'activité, par le bruit. La leçon du 10, c'est d'apprendre à être seul sans être seul. Quand tu sais que tu es toujours accompagné par l'invisible, la solitude devient une force et non plus une faiblesse. Tu n'es pas seul. Tu ne l'as jamais été.", interpretation_jour: "Né·e un 10, tu portes la conscience que tu n'es jamais seul·e. Le 10 est le nombre de la totalité — tu es relié·e à tout ce qui est. Cette connexion universelle est ton don le plus précieux.", interpretation_mois: "Né·e sous l'énergie rare du mois 10, tu es porté·e par une puissance cyclique. Le 10 en mois te rappelle que chaque fin est un recommencement. Tu es un être de renaissance, de cycles, de compréhension profonde.", interpretation_annee: "Ton année de naissance se réduit au 10. Ta génération est là pour incarner l'unité dans la diversité. Tu es venu·e pour montrer que nous sommes un seul et même tissu vivant." },
  11: { force: "Intuition, connexion inter-mondes", faiblesse: "Dépendance, nier son intuition", interpretation: "Le 11 est l'intuition, la communication entre deux mondes. Raúl le formule magnifiquement : « Uno y uno, la capacidad intermundos. » Un plus un, ce n'est pas deux — c'est la capacité de passer d'un monde à l'autre. Ta force est cette connexion spirituelle constante, cette aptitude à capter ce qui n'est pas dit, à voir ce qui est caché. Tu es un canal entre le visible et l'invisible, et ton intuition est une boussole infaillible. Mais le 11 a deux ombres : d'abord la dépendance (comme le 2), parce que 1+1 c'est aussi la pareja, le besoin de l'autre. Ensuite, le fait de nier son intuition par rationalisation excessive. L'intuition doit passer par le filtre de la rationalité, mais sans être étouffée. La leçon du 11, c'est de faire confiance à ce que tu perçois. Le monde invisible te parle — écoute-le, sans peur.", interpretation_jour: "Né·e un 11, tu es un canal entre les mondes. Ton intuition est si puissante qu'elle frôle la voyance. Écoute-la sans peur — c'est ta guidance la plus sûre, mais n'oublie pas de rester ancré·e dans la réalité.", interpretation_mois: "Né·e sous l'énergie rare du mois 11, tu vis dans une fréquence élevée. Le 11 en mois amplifie ta sensibilité — tu perçois ce que les autres ne voient pas. C'est un don magnifique, mais il demande protection et discernement.", interpretation_annee: "Ton année de naissance se réduit au 11. Ta génération agit comme un pont entre l'ancien et le nouveau. Tu es un éclaireur, un guide spirituel pour ceux qui cherchent leur chemin." },
  12: { force: "Sacrifice, grande capacité de travail", faiblesse: "Esclavage — ne pas savoir dire non", interpretation: "Le 12 est le nombre du sacrifice et de la capacité de travail. Ta force est immense : tu peux déplacer des montagnes à la force de tes bras, de ta volonté, de ton endurance. Tu es de ceux qui ne reculent jamais devant l'effort. Mais le 12 a une ombre que Raúl décrit parfaitement : l'esclavage. « Te pasaste de capacidad, no tienes límite, no sabes decir no. » Tu as tellement de capacité que tu ne sais plus t'arrêter. Les personnes avec un 12 sont en stress constant, toujours disponibles, toujours prêtes à rendre service. « ¿Quieres pedirle un favor a una persona con 12? Pídeselo. No te va a decir que no. » Mais on ne peut pas vivre comme ça. La leçon du 12, c'est d'apprendre à dire non. Le sacrifice a de la valeur seulement s'il est choisi, pas subi. Pose des limites — même le plus infatigable des travailleurs a besoin de repos.", interpretation_jour: "Né·e un 12, tu as une capacité de travail hors du commun. Le sacrifice est dans ton ADN — tu donnes tout pour ce qui compte. Mais apprends à dire non avant de t'épuiser : ton don est immense, pas infini.", interpretation_mois: "Né·e sous l'énergie rare du mois 12, tu portes une force de travail et de dévouement. Le 12 en mois te donne la persévérance des grands bâtisseurs. Mais même les temples ont besoin de repos.", interpretation_annee: "Ton année de naissance se réduit au 12. Ta génération a la mission de servir une cause plus grande que soi. Tu es venu·e pour construire, mais aussi pour apprendre à t'arrêter." },
  13: { force: "Transformation, Amour (Ahavá), le Phénix", faiblesse: "Transformation douloureuse prolongée", interpretation: "Le 13 est peut-être le plus beau des nombres, et le plus incompris. Dans le Tarot, le 13 représente la Mort — mais pas la mort du corps, la mort de l'ancien, la renaissance. Et dans la cabale, le 13 est le nombre de l'Amour : « Ahavá » en hébreu a pour valeur 13. Le Tétragramme, le Nom de Dieu, vaut 26, soit 13+13. Raúl le dit : « Cuando 13 y 13 se juntan, eso es Dios. » Le 13 N'EST PAS un nombre maudit — c'est un des plus élevés qui soit. Ta force est d'accepter la transformation, de mourir et de renaître encore et encore comme le Phénix. Mais ton ombre, c'est la transformation douloureuse qui se prolonge indéfiniment — quand tu refuses de lâcher prise, la mort de l'ancien devient une agonie sans fin. La leçon du 13, c'est d'embrasser le changement comme un acte d'amour. Meurs à ce qui ne te sert plus, et renais plus fort.", interpretation_jour: "Né·e un 13, tu es l'alchimiste de ta propre vie. Le 13 n'est pas un chiffre maudit — c'est celui de la transformation par l'Amour (Ahavá). Tu renais de tes cendres encore et encore. Vis cette métamorphose sans crainte.", interpretation_mois: "Né·e sous l'énergie rare du mois 13, tu es porté·e par une force de mutation profonde. Le 13 en mois te transforme en permanence — tu es un être en perpétuelle évolution. Accueille les changements comme des naissances.", interpretation_annee: "Ton année de naissance se réduit au 13. Ta génération est celle de la grande transformation. Tu es venu·e pour aimer, mourir à l'ancien monde, et renaître dans un nouveau." },
  14: { force: "Engagement, respect des contrats", faiblesse: "Fuir les engagements", interpretation: "Le 14 est le nombre du compromis et du contrat. Dans la tradition, le 14 représente l'engagement sacré — la parole donnée, la promesse scellée. Ta force est cette capacité à respecter tes contrats, à tenir tes engagements avec une loyauté qui force le respect. Quand tu dis quelque chose, tu le fais. Ta parole est ton sceau, et c'est pour cela que les autres te font confiance. Mais le 14 a une ombre que tu connais bien : la tentation de fuir quand l'engagement fait peur. L'engagement est un poids, et parfois tu préfères t'en libérer plutôt que d'honorer ta parole. La leçon du 14, c'est de comprendre qu'un contrat n'est pas une prison — c'est un pont entre toi et l'autre. Apprends à choisir tes engagements avec sagesse, mais une fois que tu as donné ta parole, honore-la. La liberté véritable n'est pas de n'avoir aucun contrat, c'est d'honorer ceux que tu as choisis.", interpretation_jour: "Né·e un 14, ta parole est une signature sacrée. Tu respectes tes engagements avec une loyauté inébranlable. Cette fiabilité fait de toi un roc sur lequel les autres s'appuient. Honore tes promesses, mais n'en fais pas des prisons.", interpretation_mois: "Né·e sous l'énergie rare du mois 14, tu es marqué·e par la puissance des contrats et des liens sacrés. Le 14 en mois te lie à ta parole d'une manière presque mystique. Mais même les vœux ont besoin d'être revisités.", interpretation_annee: "Ton année de naissance se réduit au 14. Ta génération est appelée à restaurer l'honneur et la fiabilité. Tu es venu·e pour montrer qu'une promesse est un pont sacré entre les êtres." },
  15: { force: "Passion (tous domaines)", faiblesse: "Addictions, surtout sexuelles", interpretation: "Le 15 est le nombre des addictions, et particulièrement des addictions sexuelles. Raúl est très clair : le 15 traite le sexe comme quelque chose de ludique, de récréatif. Mais le 15 a une face lumineuse extraordinaire : la PASSION. Pas seulement la passion sexuelle — la passion dans tous les domaines de la vie. « Tienes gasolina para hacer lo que quieras. » Tu as du carburant pour faire tout ce que tu veux. Ta force, c'est cette intensité vitale, cette énergie débordante qui te permet de vivre chaque instant avec une puissance rare. Mais l'ombre du 15, ce sont les pratiques inadéquates, l'addiction qui prend le contrôle. Quand la passion devient dépendance, elle te consume au lieu de te nourrir. La leçon du 15, c'est de canaliser cette énergie passionnelle comme un fleuve puissant mais maîtrisé. La passion est ton moteur — ne la réprime pas, mais ne la laisse pas te dévorer.", interpretation_jour: "Né·e un 15, tu es un volcan de passion. Tout ce que tu fais, tu le fais avec intensité — amour, travail, création. Cette énergie est ta force vitale. Canalise-la comme un fleuve puissant, pas comme un torrent dévastateur.", interpretation_mois: "Né·e sous l'énergie rare du mois 15, tu baignes dans une puissance passionnelle rare. Le 15 en mois te connecte aux forces vives de la création. Ta passion est ton moteur — ne la réprime pas, mais guide-la.", interpretation_annee: "Ton année de naissance se réduit au 15. Ta génération est venue pour réveiller la passion endormie du monde. Tu es un être de désir et de feu — embrasse cette intensité sans t'y consumer." },
  16: { force: "Perfectionnisme sain, excellence", faiblesse: "Auto-exigence excessive, souffrance", interpretation: "Le 16 est l'hyper-perfectionniste. Raúl le décrit avec précision : ta force est de faire les choses parfaitement, sans stress, avec une élégance dans l'exécution qui frôle l'art. Tu vois les détails que personne ne voit, tu atteins des niveaux d'excellence qui laissent les autres admiratifs. C'est un don rare et précieux. Mais l'ombre du 16 est l'auto-exigence excessive qui devient souffrance. Quand la quête de perfection devient un fouet, elle blesse. Tu t'en veux de ne pas être parfait, tu te punis pour des détails que personne d'autre ne remarque. La leçon du 16, c'est d'apprendre que « assez bien » est parfois parfait. La perfection n'est pas un but à atteindre — c'est un chemin à parcourir. Fais de ton mieux, puis lâche prise. L'excellence sans la paix intérieure n'est qu'une prison dorée.", interpretation_jour: "Né·e un 16, tu es un artisan de l'excellence. Rien n'est assez bien tant que ce n'est pas parfait. Cette exigence te pousse vers les sommets. Mais souviens-toi que la perfection n'est pas un but, c'est un chemin.", interpretation_mois: "Né·e sous l'énergie rare du mois 16, tu portes la flamme de la perfection. Le 16 en mois fait de toi un être d'exigence et de précision. C'est un don rare — mais ne laisse pas l'idéal t'empêcher d'agir.", interpretation_annee: "Ton année de naissance se réduit au 16. Ta génération est là pour élever les standards de l'humanité. Tu es venu·e pour montrer que l'excellence est un acte d'amour envers le monde." },
  17: { force: "Douceur, tactilité, chaleur humaine", faiblesse: "Froideur, absence de contact", interpretation: "Le 17 est la douceur, le tact, « lo rico, lo calentito ». Raúl est très concret : le 17 est tactile. « ¿Quieres calmar a un 17? Acarícialo. » Ce sont les mains — le contact, la caresse, la chaleur qui passe par la peau. Ta force est cette capacité à apporter du réconfort par ta simple présence. Tu es un baume pour les âmes blessées, une source de chaleur dans un monde froid. Mais l'ombre du 17, c'est l'absence de contact, la froideur. Quand tu te coupes de cette dimension tactile, tu cherches la chaleur sans jamais la trouver. Ta leçon est d'offrir ta douceur sans peur. Le monde a besoin de tes mains, de ta présence, de cette tendresse que tu portes en toi. N'aie pas peur de toucher — c'est ta médecine.", interpretation_jour: "Né·e un 17, tu es une source de chaleur et de douceur. Ton toucher, ta présence, ta voix apaisent. Tu es un baume pour les âmes blessées. Cette tendresse est ta médecine — ne la cache pas, le monde en a besoin.", interpretation_mois: "Né·e sous l'énergie rare du mois 17, tu es traversé·e par une douceur cosmique. Le 17 en mois te donne une sensibilité tactile et émotionnelle hors norme. Tu es ici pour rappeler que la tendresse est une force.", interpretation_annee: "Ton année de naissance se réduit au 17. Ta génération porte la mission de réintroduire la douceur dans un monde dur. Tu es venu·e pour guérir par le contact, par la présence, par l'amour tangible." },
  18: { force: "Décodage des secrets familiaux, rêves", faiblesse: "Secrets non révélés, ombre familiale", interpretation: "Le 18 est l'inconscient collectif familial. Raúl l'explique avec une grande profondeur : le 18 porte les secrets de famille, les maladies mentales, les secrets sexuels qui traversent les générations. Ta force est d'être le décodeur, celui ou celle qui met au jour ce qui a été caché. « El que decodifica los secretos y lo saca a la luz. » Tu as le pouvoir de transformer l'obscurité en lumière, de révéler les non-dits qui empoisonnent la lignée. Le monde des rêves est ton allié — c'est par là que les secrets te parlent. Mais l'ombre du 18, c'est le secret qui reste caché, la personne qui se masque. Quand tu refuses de voir ce qui est devant toi, l'obscurité s'épaissit. La leçon du 18, c'est d'avancer avec courage dans les zones d'ombre. Révèle, guéris, libère — mais fais-le avec amour et prudence.", interpretation_jour: "Né·e un 18, tu es le décodeur des secrets de famille. Rien ne t'échappe — les non-dits, les silences, les héritages invisibles. Ton don est de mettre au jour ce qui est caché. Avance avec prudence : toute vérité n'est pas bonne à dire sans préparation.", interpretation_mois: "Né·e sous l'énergie rare du mois 18, tu es connecté·e aux mystères de la lignée. Le 18 en mois te plonge dans les eaux profondes de l'inconscient familial. Tu es un explorateur des ombres — n'oublie pas de revenir à la lumière.", interpretation_annee: "Ton année de naissance se réduit au 18. Ta génération a la mission de révéler les secrets que le passé n'a pas su libérer. Tu es venu·e pour briser les chaines invisibles qui traversent le temps." },
  19: { force: "Rayonnement, exemplarité, conscience", faiblesse: "Implosion, problème d'estime de soi", interpretation: "Le 19 est la conscience, la capacité d'irradier. Raúl le dit magnifiquement : « Como el sol que ilumina. » Tu es comme le soleil — ta nature est de briller, d'éclairer, de réchauffer tout ce qui t'entoure. Ta force est l'exemplarité : quand tu assumes ta lumière, tu deviens un modèle pour les autres sans même le chercher. Ta conscience rayonne et élève ceux qui croisent ton chemin. Mais l'ombre du 19 est terrible : l'implosion. Ne pas irradier alors que tu en as la capacité, c'est l'autodestruction. Le soleil qui ne brille pas se consume de l'intérieur. C'est souvent un problème d'estime de soi — tu doutes de ta lumière, alors tu l'éteins. La leçon du 19, c'est de briller sans fausse modestie. Le monde a besoin de ta lumière. Allume-la, même si ta main tremble. Tu es fait pour rayonner.", interpretation_jour: "Né·e un 19, tu es une lumière qui ne demande qu'à briller. Ta conscience est ton phare, ton rayonnement est ton essence. Le monde a besoin de voir qui tu es vraiment. N'aie pas peur d'être exemplaire — c'est ta nature.", interpretation_mois: "Né·e sous l'énergie rare du mois 19, tu es porté·e par la lumière du Soleil intérieur. Le 19 en mois te donne une puissance de rayonnement exceptionnelle. Mais cette lumière doit d'abord être allumée en toi-même.", interpretation_annee: "Ton année de naissance se réduit au 19. Ta génération est venue pour éclairer les consciences. Tu es un porteur de lumière dans une époque qui cherche son chemin — brille sans fausse modestie." },
  20: { force: "Reconnaissance, titres, diplômes", faiblesse: "« Qui est mon père ? » — absence", interpretation: "Le 20, c'est la question du père. Raúl est catégorique : « Falta de padre. » « ¿Quién es mi padre? » Le 20 est la quête de reconnaissance, et cette quête est souvent la recherche du père — réel ou symbolique. Ta force est la capacité à obtenir des titres, des diplômes, des reconnaissances officielles. « Le encantan los títulos. » Tu as soif de reconnaissance, et c'est légitime — tu as quelque chose à offrir au monde. Mais l'ombre du 20, c'est l'absence de reconnaissance du père. Quand le père manque, tu passes ta vie à chercher une validation que tu ne trouves jamais. La leçon du 20, c'est de comprendre que la véritable reconnaissance ne vient pas des diplômes ou des titres. Elle vient de l'intérieur. « Qui est mon père ? » La réponse est en toi. Tu es ton propre père. Tu es ta propre autorité.", interpretation_jour: "Né·e un 20, tu as soif de reconnaissance et de titres honorifiques. C'est légitime — tu as quelque chose à offrir au monde. Mais la véritable question du 20 est : qui es-tu au-delà des diplômes et des couronnes ?", interpretation_mois: "Né·e sous l'énergie rare du mois 20, tu es en quête d'identité et de légitimité. Le 20 en mois te pousse à chercher qui est ton père symbolique, quelle est ta lignée spirituelle. La réponse est en toi.", interpretation_annee: "Ton année de naissance se réduit au 20. Ta génération est appelée à se réapproprier son identité et sa reconnaissance. Tu es venu·e pour rappeler que la valeur d'un être ne se mesure pas à ses titres." },
  21: { force: "Vision globale, langues, liberté", faiblesse: "Esclavage, ne pas se sentir libre", interpretation: "Le 21 est le monde, la vision globale. Raúl est pragmatique : « Contrata un 21. » Si tu veux une vision stratégique mondiale, prends un 21. Ta force est cette capacité à voir les connexions globales, à comprendre les cultures, à parler les langues, à naviguer entre les mondes. Les langues étrangères te viennent facilement, les autres cultures t'attirent, la stratégie globale est ton terrain de jeu. Mais l'ombre du 21 est terrible : l'esclavage. « Lo peor que puede tener un 21 es amenazarle su libertad. » Être privé de liberté, ne pas se sentir libre — c'est la pire chose pour un 21. Quand tu ne peux pas exprimer ta nature globale, quand on te met en cage, tu dépéris. La leçon du 21, c'est de préserver ta liberté comme le bien le plus précieux. Ne laisse personne te mettre en cage. Le monde est ton terrain — parcours-le sans entrave.", interpretation_jour: "Né·e un 21, tu as une vision globale du monde. Rien ne t'échappe — tu vois les connexions là où d'autres voient des fragments. Les langues, les cultures, les perspectives sont ton terrain de jeu. Ta liberté est ton bien le plus sacré.", interpretation_mois: "Né·e sous l'énergie rare du mois 21, tu portes le regard de l'aigle sur le monde. Le 21 en mois te donne une capacité unique à embrasser la complexité sans te perdre. Mais ne regarde pas de si haut que tu en oublies de vivre.", interpretation_annee: "Ton année de naissance se réduit au 21. Ta génération est celle de la mondialisation des consciences. Tu es venu·e pour unir les peuples, les langues, les savoirs, sans jamais aliéner ta liberté." },
  22: { force: "Le Joker — toutes possibilités, libre arbitre", faiblesse: "Chaos, dispersion, chaos sexuel", interpretation: "Le 22 est le Joker, le roi des nombres. Dans la cabale, le 22 représente les 22 lettres de l'alphabet hébreu — tous les composants de la création. Raúl le dit avec force : « Tiene las 22 letras hebreas en él. » Tu as les 22 lettres en toi. Tu peux TOUT faire — absolument tout. Ta force est cette capacité illimitée, ce libre arbitre total, ce potentiel infini qui te permet d'incarner tous les chemins. C'est vertigineux et magnifique. Mais l'ombre du 22, c'est le chaos. « Va a estar en un caos, tantísimas posibilidades que se hace un lío. » Avec tant de possibilités, tu te perds. Le chaos sexuel aussi guette le 22 — la mauvaise utilisation de la semence, de l'énergie créatrice. La leçon du 22, c'est de choisir. Avec un tel pouvoir, tu dois apprendre la discipline. Choisis une direction, concentre-toi, et tu bâtiras des mondes. Tu as les lettres de la création en toi — écris ton chef-d'œuvre.", interpretation_jour: "Né·e un 22, tu es le Joker de la création. Toutes les possibilités sont dans tes mains — c'est vertigineux et magnifique. Tu peux être tout, faire tout, incarner tout. Mais sans discipline, ce don infini devient chaos.", interpretation_mois: "Né·e sous l'énergie rare du mois 22, tu es traversé·e par toutes les forces de la création. Le 22 en mois te rend perméable à l'infinie diversité des possibles. Choisis, concentre-toi, et tu bâtiras des mondes.", interpretation_annee: "Ton année de naissance se réduit au 22. Ta génération porte la responsabilité de la liberté absolue et du choix conscient. Tu es venu·e pour incarner le libre arbitre et construire, à partir du chaos, un chef-d'œuvre." }
};

function reduire(n) {
  while (n > 22) {
    n = String(n).split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return n;
}

function calculer(dateStr) {
  const parts = dateStr.split('/');
  if (parts.length !== 3) throw new Error('Format invalide. Utilise JJ/MM/AAAA');
  const [j, m, a] = parts.map(Number);
  if (isNaN(j) || isNaN(m) || isNaN(a)) throw new Error('La date doit contenir uniquement des chiffres');
  // Validation calendaire réelle
  const d = new Date(a, m - 1, j);
  if (d.getDate() !== j || d.getMonth() + 1 !== m || d.getFullYear() !== a) {
    throw new Error('Date inexistante (ex: 31 février)');
  }
  if (a < 1000 || a > 9999) throw new Error('Année hors limites');

  const jour = reduire(j);
  const mois = reduire(m);
  const annee = reduire(a);
  const chemin = reduire(jour + mois + annee);
  const sorted = [jour, mois, annee].sort((a, b) => b - a);
  let ticun = Math.abs((sorted[0] - sorted[1]) - sorted[2]);
  if (ticun === 0) ticun = 22;

  const repartition = analyserRepartition(jour, mois, annee);
  const r = {
    jour, mois, annee, chemin, ticun, date: dateStr, repartition,
    interpretation_jour: ARCHETYPES[jour]?.interpretation_jour || '',
    interpretation_mois: ARCHETYPES[mois]?.interpretation_mois || '',
    interpretation_annee: ARCHETYPES[annee]?.interpretation_annee || '',
    interpretation: ARCHETYPES[chemin]?.interpretation || ''
  };
  r.portrait = genererPortrait(r);
  return r;
}

function analyserRepartition(jour, mois, annee) {
  const nombres = [jour, mois, annee].sort((a,b) => a-b);
  return {
    don: nombres[2],
    don_nom: ARCHETYPES[nombres[2]].force,
    defi: nombres[0],
    defi_nom: ARCHETYPES[nombres[0]].faiblesse,
    ambivalence: nombres[1],
    ambivalence_nom: ARCHETYPES[nombres[1]].force + " / " + ARCHETYPES[nombres[1]].faiblesse
  };
}

function genererPortrait(r) {
  return `Ton chemin de vie ${r.chemin} te donne la capacité de ${ARCHETYPES[r.chemin].force.toLowerCase()}. Ton ticún ${r.ticun} t'appelle à travailler sur ${ARCHETYPES[r.ticun].faiblesse.toLowerCase()}. Ton jour ${r.jour} est ton outil principal, ton mois ${r.mois} colore ton approche, et ton année ${r.annee} inscrit ta mission dans une dynamique générationnelle. Ta répartition montre que ton plus grand don est le ${r.repartition.don} (${r.repartition.don_nom}), ton principal défi est le ${r.repartition.defi} (${r.repartition.defi_nom}), et le ${r.repartition.ambivalence} (${r.repartition.ambivalence_nom}) joue un rôle ambivalent — à toi de le faire pencher du côté de la lumière.`;
}

// ─── Animations ───
function animateNumber(el, target, duration = 800) {
  if (!el) return;
  const start = 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(start + (target - start) * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function revealSection(el, delay = 0) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    delay = 0;
  }
  setTimeout(() => {
    el.classList.add('visible');
  }, delay);
}

function buildRepartitionSVG(r) {
  const defi = r.repartition.defi;
  const ambi = r.repartition.ambivalence;
  const don = r.repartition.don;
  // Normaliser les positions 1..22 → 10..290 dans le SVG
  const pos = (num) => 10 + ((num - 1) / 21) * 280;
  return `
    <svg class="repart-svg" viewBox="0 0 300 60" aria-label="Spectre de répartition Défis-Dons" role="img">
      <!-- Barre de fond -->
      <rect x="10" y="25" width="280" height="10" rx="5" fill="var(--bg-surface, #1e293b)" stroke="var(--border, #334155)" stroke-width="1"/>
      <!-- Points et labels -->
      <circle cx="${pos(defi)}" cy="30" r="8" fill="var(--text-muted, #64748b)"/>
      <text x="${pos(defi)}" y="54" text-anchor="middle" fill="var(--text-muted, #64748b)" font-size="10">◆ ${defi} Défi</text>

      <circle cx="${pos(ambi)}" cy="30" r="8" fill="var(--cyan, #22d3ee)"/>
      <text x="${pos(ambi)}" y="54" text-anchor="middle" fill="var(--cyan, #22d3ee)" font-size="10">◇ ${ambi} Ambi.</text>

      <circle cx="${pos(don)}" cy="30" r="8" fill="var(--gold, #fbbf24)"/>
      <text x="${pos(don)}" y="54" text-anchor="middle" fill="var(--gold, #fbbf24)" font-size="10">★ ${don} Don</text>
    </svg>
  `;
}

function reveal() {
  const input = document.getElementById('dateInput');
  const errorEl = document.getElementById('errorMsg');
  const resultat = document.getElementById('resultat');
  const btn = document.getElementById('calcBtn');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const staggerMs = prefersReduced ? 0 : 200;
  const counterDur = prefersReduced ? 0 : 800;

  // Accessibilité ARIA — une seule initialisation
  if (!resultat.hasAttribute('aria-live')) {
    resultat.setAttribute('aria-live', 'polite');
  }
  if (!errorEl.hasAttribute('aria-live')) {
    errorEl.setAttribute('aria-live', 'assertive');
  }
  if (!input.hasAttribute('aria-describedby')) {
    input.setAttribute('aria-describedby', 'errorMsg');
  }

  errorEl.textContent = '';
  // Reset all reveal sections
  document.querySelectorAll('.reveal-section').forEach(el => el.classList.remove('visible'));

  try {
    const r = calculer(input.value.trim());

    // Animation du bouton
    btn.textContent = '✦ Révélation en cours...';
    btn.disabled = true;

    setTimeout(() => {
      // Détail du calcul
      const sorted = [r.jour, r.mois, r.annee].sort((a, b) => b - a);
      document.getElementById('calcDetail').innerHTML =
        `Jour ${r.jour} + Mois ${r.mois} + Année ${r.annee} = <span>${r.jour + r.mois + r.annee}</span> → <span>Chemin de vie ${r.chemin}</span><br>` +
        `max(${r.jour}, ${r.mois}, ${r.annee}) − mid − min &nbsp;➔&nbsp; ${sorted[0]} − ${sorted[1]} − ${sorted[2]} = <span>${r.ticun}</span> → <span>Ticún ${r.ticun}</span>`;

      // Cartes résultat — innerHTML pour la structure fixe, textContent pour les valeurs dynamiques
      const cv = ARCHETYPES[r.chemin];
      const tc = ARCHETYPES[r.ticun];
      const cardsContainer = document.getElementById('resultCards');
      cardsContainer.innerHTML = `
        <div class="result-card emerald-card">
          <div class="label">Chemin de vie / Don</div>
          <div class="big-num">0</div>
          <div class="desc"><strong></strong><br><span style="font-size:0.8rem;color:#64748b">Ombre : <span class="ombre-val"></span></span></div>
        </div>
        <div class="result-card gold">
          <div class="label">Ticún / Défi d'âme</div>
          <div class="big-num">0</div>
          <div class="desc"><strong></strong><br><span style="font-size:0.8rem;color:#64748b">Ombre : <span class="ombre-val"></span></span></div>
        </div>
      `;
      const cards = cardsContainer.children;
      cards[0].querySelector('.desc strong').textContent = cv.force;
      cards[0].querySelector('.ombre-val').textContent = cv.faiblesse;
      cards[1].querySelector('.desc strong').textContent = tc.force;
      cards[1].querySelector('.ombre-val').textContent = tc.faiblesse;

      // Interprétation — cartes riches Jour/Mois/Année + Répartition + Portrait
      const interpContainer = document.getElementById('resultInterpretation');
      interpContainer.innerHTML = `
        <p style="color:#fbbf24;font-weight:600;margin-bottom:0.5rem;">🔮 Lecture croisée — ${r.chemin} + ${r.ticun}</p>
        <p>${cv.interpretation}</p>
        <p style="margin-top:0.8rem;">${tc.interpretation}</p>

        <div class="raw-numbers">
          <div class="raw-card">
            <span class="raw-num">${r.jour}</span>
            <span class="raw-label">Jour</span>
            <p class="raw-desc">Ton outil inné</p>
          </div>
          <div class="raw-card">
            <span class="raw-num">${r.mois}</span>
            <span class="raw-label">Mois</span>
            <p class="raw-desc">Ton influence</p>
          </div>
          <div class="raw-card">
            <span class="raw-num">${r.annee}</span>
            <span class="raw-label">Année</span>
            <p class="raw-desc">Ta mission</p>
          </div>
        </div>

        <div class="detail-interpretations">
          <div class="interp-card">
            <h4>🌅 Ton Jour — ${r.jour}</h4>
            <p>${ARCHETYPES[r.jour].interpretation_jour}</p>
          </div>
          <div class="interp-card">
            <h4>🌊 Ton Mois — ${r.mois}</h4>
            <p>${ARCHETYPES[r.mois].interpretation_mois}</p>
          </div>
          <div class="interp-card">
            <h4>🌍 Ton Année — ${r.annee}</h4>
            <p>${ARCHETYPES[r.annee].interpretation_annee}</p>
          </div>
        </div>

        <div class="portrait">
          <h4>📜 Ton Portrait d'Âme</h4>
          <p class="portrait-text">${r.portrait}</p>
        </div>
      `;

      // SVG Répartition — dans la section dédiée
      const repartSection = document.getElementById('repartitionSection');
      if (repartSection) {
        repartSection.innerHTML = buildRepartitionSVG(r);
      }

      // Staggered reveal sections
      revealSection(document.getElementById('calcDetail'), 0);
      revealSection(document.getElementById('resultCards'), 0);
      revealSection(document.getElementById('resultInterpretation'), 1 * staggerMs);
      revealSection(document.getElementById('repartitionSection'), 2 * staggerMs);

      resultat.classList.add('visible');
      resultat.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Animation compteur sur les .big-num
      const bigNums = document.querySelectorAll('.big-num');
      if (bigNums.length >= 2) {
        animateNumber(bigNums[0], r.chemin, counterDur);
        animateNumber(bigNums[1], r.ticun, counterDur);
      }

      // Mise à jour de l'URL pour partage
      const newURL = window.location.pathname + '?date=' + encodeURIComponent(r.date);
      window.history.pushState({}, '', newURL);

      btn.textContent = 'Révéler mes nombres ✦';
      btn.disabled = false;

      showToast('✨ Tes nombres sont révélés !');
    }, 600);

  } catch (e) {
    errorEl.textContent = '⚠ ' + e.message;
    btn.textContent = 'Révéler mes nombres ✦';
    btn.disabled = false;
  }
}

// Permettre la validation avec Entrée
document.getElementById('dateInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') reveal();
});

/* ═══════════════════════════════════════════
   INIT DEPUIS L'URL — partage ?date=JJ/MM/AAAA
   ═══════════════════════════════════════════ */
function initFromURL() {
  const params = new URLSearchParams(window.location.search);
  const dateParam = params.get('date');
  if (!dateParam) return;

  // Regex stricte : JJ/MM/AAAA
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dateParam)) return; // ignorer silencieusement

  // Valider la date via le calculateur
  try {
    const r = calculer(dateParam);
    // Pré-remplir l'input
    const input = document.getElementById('dateInput');
    if (input) input.value = dateParam;
    // Déclencher le calcul
    reveal();
  } catch (_) {
    // Date invalide → ignorer silencieusement
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initFromURL();

  /* ─── Feedback visuel on-input ─── */
  const dateInput = document.getElementById('dateInput');
  if (dateInput) {
    dateInput.addEventListener('input', function(e) {
      const val = e.target.value;
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (regex.test(val)) {
        e.target.style.borderColor = '#34d399';
      } else if (val.length > 0) {
        e.target.style.borderColor = '#334155';
      }
    });
  }
});
