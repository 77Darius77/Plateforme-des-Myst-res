/* ─────────────────────────────────────────────────────────────────────────
   tarot-rws-planes.js — Lectures par plan de vie (78 cartes RWS × 3 plans)
   Plans : personnel · professionnel · relationnel
   Sources : synthèse Biddy Tarot, Labyrinthos, Tarot.com, Aeclectic Tarot,
             et l'école RWS classique (Waite, Pollack, Greer).
   ───────────────────────────────────────────────────────────────────────── */
window.tarotRwsPlanes = (function () {

  /* ── 22 Arcanes Majeurs ──────────────────────────────────────────────── */
  var MAJORS = {
    '00': {
      name: 'Le Fou',
      personnel: { kw: 'liberté intérieure', text: 'Un appel à retrouver ta spontanéité et ta confiance en l\'univers. Laisse tomber les conventions qui ne te ressemblent plus — ose être pleinement toi-même, même si ça dérange.' },
      professionnel: { kw: 'nouveau départ', text: 'Une voie professionnelle s\'ouvre, atypique ou risquée. Premier emploi, formation, voyage initiatique — l\'élan compte plus que l\'expérience. Fais confiance à l\'inconnu.' },
      relationnel: { kw: 'rencontre libre', text: 'Une relation hors des cadres, atypique, qui valorise l\'indépendance de chacun. Besoin d\'espace et de fraîcheur dans le lien — fuir ce qui enferme.' }
    },
    '01': {
      name: 'Le Magicien',
      personnel: { kw: 'pouvoir personnel', text: 'Tu as toutes les ressources en main : il suffit de les assembler. C\'est le moment d\'aligner ta volonté et tes moyens, de passer de l\'intention à l\'acte.' },
      professionnel: { kw: 'manifestation', text: 'Démarrage d\'activité, signature de contrat, premier entretien. L\'habileté et la créativité sont tes meilleurs atouts — oser proposer, oser entreprendre.' },
      relationnel: { kw: 'séduction consciente', text: 'Rencontre naissante où le charme et le talent opèrent. Relation légère et stimulante, fondée sur l\'échange et la curiosité mutuelle.' }
    },
    '02': {
      name: 'La Grande Prêtresse',
      personnel: { kw: 'intuition', text: 'Période de gestation silencieuse, d\'écoute intérieure et de maturation. Les réponses viendront du silence, pas du bruit — écrire, méditer, se retirer.' },
      professionnel: { kw: 'recherche', text: 'Formation longue, recherche, spécialisation. Métiers du livre, de la psy, du conseil — tout ce qui demande de la profondeur et de la patience.' },
      relationnel: { kw: 'lien intuitif', text: 'Relation profonde mais discrète, parfois platonique. Le lien se construit dans le non-dit et la compréhension silencieuse.' }
    },
    '03': {
      name: 'L\'Impératrice',
      personnel: { kw: 'créativité', text: 'Féminité incarnée, créativité débordante, expression de soi. C\'est le moment de créer, d\'écrire, de rayonner — laisser parler ta nature profonde.' },
      professionnel: { kw: 'abondance', text: 'Métiers de la communication, du marketing, de la pédagogie, de l\'art. Lancement de projets créatifs, succès intellectuel et social.' },
      relationnel: { kw: 'fertilité', text: 'Séduction rayonnante, relation expressive et fertile. Possible grossesse ou désir d\'enfant. Le lien se nourrit d\'abondance et de chaleur.' }
    },
    '04': {
      name: 'L\'Empereur',
      personnel: { kw: 'ancrage', text: 'Structuration du moi, image paternelle intériorisée, autorité personnelle assumée. Sentiment de solidité intérieure et de cadre posé sur sa propre vie.' },
      professionnel: { kw: 'direction', text: 'Direction d\'équipe, promotion, fondation d\'entreprise stable. Gestion rigoureuse, placements sûrs, succès par le pragmatisme.' },
      relationnel: { kw: 'partenaire stable', text: 'Figure paternelle ou partenaire fiable, stable mais peu démonstratif. Couple durable fondé sur le respect et la sécurité matérielle.' }
    },
    '05': {
      name: 'Le Hiérophante',
      personnel: { kw: 'transmission', text: 'Un guide, un mentor, une tradition spirituelle qui éclaire ton chemin. Invitation à recevoir un enseignement et à le transmettre à ton tour.' },
      professionnel: { kw: 'institution', text: 'Contrat protecteur, guidance morale, protecteur influent. Métiers de l\'enseignement, du conseil, du droit, de l\'accompagnement.' },
      relationnel: { kw: 'union traditionnelle', text: 'Relation bénie par l\'entourage, mariage, engagement officiel. Le lien s\'inscrit dans une tradition ou une institution qui le protège.' }
    },
    '06': {
      name: 'Les Amoureux',
      personnel: { kw: 'choix intérieur', text: 'Question intime : qu\'est-ce que je veux vraiment ? Conflit entre cœur et tête, entre désir et raison. Le libre-arbitre est au cœur du processus.' },
      professionnel: { kw: 'carrefour', text: 'Choix de carrière, signature de contrat, partenariat d\'affaires. Une décision importante se présente — écouter ce qui résonne vraiment.' },
      relationnel: { kw: 'alignement', text: 'Carrefour amoureux, hésitation entre deux partenaires, coup de foudre ou relation triangulaire. Le cœur doit trancher.' }
    },
    '07': {
      name: 'Le Chariot',
      personnel: { kw: 'volonté', text: 'Dépassement de soi, courage intérieur, progression résolue. Tu as les rênes en main — avancer dans la direction que tu as choisie.' },
      professionnel: { kw: 'victoire', text: 'Promotion, déménagement professionnel, voyage d\'affaires, succès d\'examen. L\'élan et la détermination paient.' },
      relationnel: { kw: 'conquête', text: 'Séduction assumée, conquête amoureuse, couple qui avance dans la même direction. Le lien se construit par l\'action partagée.' }
    },
    '08': {
      name: 'La Force',
      personnel: { kw: 'courage doux', text: 'Maîtrise des instincts par la douceur, pas par la violence. Une grande vitalité intérieure et la capacité de dompter tes démons avec grâce.' },
      professionnel: { kw: 'persévérance', text: 'Énergie stable et continue, capacité à tenir sur la durée. Succès par la patience et la force tranquille, pas par la brutalité.' },
      relationnel: { kw: 'lien apprivoisé', text: 'Relation où la passion est domptée par la tendresse. Le lien se construit par la patience et l\'acceptation des failles de l\'autre.' }
    },
    '09': {
      name: 'L\'Ermite',
      personnel: { kw: 'quête intérieure', text: 'Retraite méditative, retour à soi, lanterne de la sagesse. Un temps long de recherche personnelle est nécessaire — ne pas brusquer.' },
      professionnel: { kw: 'spécialisation', text: 'Recherche, expertise de niche, professorat. Période de recul qui prépare une contribution plus profonde et plus juste.' },
      relationnel: { kw: 'solitude choisie', text: 'Célibat fécond, période de recul dans le couple. Le lien a besoin de silence pour se redécouvrir.' }
    },
    '10': {
      name: 'La Roue de Fortune',
      personnel: { kw: 'tournant', text: 'Acceptation du cycle, lâcher-prise sur le contrôle. Le destin bouge — accueillir ce qui vient sans résister, même si c\'est inconfortable.' },
      professionnel: { kw: 'opportunité', text: 'Tournant professionnel imprévu : promotion, licenciement, opportunité saisie au vol. Variation financière importante — s\'adapter vite.' },
      relationnel: { kw: 'destin amoureux', text: 'Rencontre « karmique », retour d\'un ex, coup du sort. Le lien est marqué par le destin — accepter ce qui se présente.' }
    },
    '11': {
      name: 'La Justice',
      personnel: { kw: 'équilibre', text: 'Alignement entre tes valeurs et tes actes. Capacité à te juger sans cruauté, à distinguer le vrai du faux en toi-même.' },
      professionnel: { kw: 'contrat', text: 'Négociation, procédure juridique, médiation, carrière juridique ou RH. Ce qui est juste finit par triompher — patience et droiture.' },
      relationnel: { kw: 'respect mutuel', text: 'Couple fondé sur le respect et l\'équité, contrat de mariage, séparation équitable. Le lien repose sur la droiture et la parole donnée.' }
    },
    '12': {
      name: 'Le Pendu',
      personnel: { kw: 'lâcher-prise', text: 'Blocage ou pause forcée qui invite à voir les choses sous un angle totalement différent. Arrêter d\'agir pour commencer à comprendre.' },
      professionnel: { kw: 'pause imposée', text: 'Congé, rupture de contrat, période d\'attente. Ce temps d\'arrêt n\'est pas un échec — c\'est un changement de perspective nécessaire.' },
      relationnel: { kw: 'sacrifice', text: 'Relation en suspens, sacrifice consenti ou subi. Le lien demande de lâcher quelque chose pour retrouver un sens plus profond.' }
    },
    '13': {
      name: 'La Mort',
      personnel: { kw: 'transformation', text: 'Fin d\'un cycle intérieur, mutation nécessaire. Faire table rase de ce qui ne te correspond plus — accepter de mourir à une version de toi-même.' },
      professionnel: { kw: 'réorientation', text: 'Licenciement, fin de contrat, changement de voie radicale. Ce qui disparaît libère la place pour quelque chose de plus juste.' },
      relationnel: { kw: 'rupture', text: 'Séparation nécessaire, coupe des liens toxiques. Ce qui meurt dans le lien ouvre la possibilité d\'un amour plus authentique.' }
    },
    '14': {
      name: 'Tempérance',
      personnel: { kw: 'harmonie', text: 'Guérison intérieure, circulation fluide des énergies. Tempérer les extrêmes, retrouver un rythme de croisière doux et réparateur.' },
      professionnel: { kw: 'diplomatie', text: 'Médiation, compromis, fluidité des échanges. Période d\'équilibre où les projets avancent par ajustements successifs.' },
      relationnel: { kw: 'complicité', text: 'Relation apaisée, complicité douce, dialogue fluide. Le lien se nourrit de patience et de mesure — éviter les excès.' }
    },
    '15': {
      name: 'Le Diable',
      personnel: { kw: 'passions', text: 'Énergie brute, créativité sauvage, mais aussi dépendances et ombres à regarder en face. Ce qui te fascine peut aussi t\'enchaîner.' },
      professionnel: { kw: 'ambition', text: 'Puissance financière, ambition matérielle, pouvoir. Attention aux excès et aux emprises — garder la maîtrise de tes choix.' },
      relationnel: { kw: 'attraction', text: 'Relation passionnelle, magnétique, parfois possessive. Distinguer l\'amour libre de la dépendance qui chaîne — l\'enjeu central.' }
    },
    '16': {
      name: 'La Tour',
      personnel: { kw: 'effondrement', text: 'Bouleversement intérieur, effondrement de fausses croyances. Un électrochoc qui libère ce qui était emprisonné — accepter la secousse.' },
      professionnel: { kw: 'rupture brutale', text: 'Licenciement, faillite, accident de carrière. Mais aussi : éclair de lucidité, réorientation brutale mais nécessaire.' },
      relationnel: { kw: 'rupture révélatrice', text: 'Séparation brutale mais nécessaire, trahison révélée. Ce qui s\'effondre dans le lien ouvre à une vérité plus juste.' }
    },
    '17': {
      name: 'L\'Étoile',
      personnel: { kw: 'espérance', text: 'Reconnexion au sens, inspiration, vulnérabilité assumée. Tu as trouvé ta place dans le monde — foi en l\'avenir, protégée par une bonne étoile.' },
      professionnel: { kw: 'vocation', text: 'Projet aligné avec tes valeurs, vocation humanitaire ou artistique. Période faste où le travail a du sens et porte ses fruits.' },
      relationnel: { kw: 'amour bienveillant', text: 'Relation de confiance, soutien mutuel, fertilité. Le lien est nourri par la tendresse et l\'espoir partagé.' }
    },
    '18': {
      name: 'La Lune',
      personnel: { kw: 'inconscient', text: 'Plongée dans les profondeurs, les rêves, les émotions. Période fertile pour les créatifs et les intuitifs — mais prudence face aux illusions.' },
      professionnel: { kw: 'créativité intuitive', text: 'Travail créatif, intuitif, onirique. Mais aussi : confusion, projets flous, manque de clarté — ne pas signer dans le doute.' },
      relationnel: { kw: 'émotions profondes', text: 'Relation marquée par les non-dits, les projections, les fantasmes. Distinguer ce qui est réel de ce qui est rêvé — clarifier avant d\'agir.' }
    },
    '19': {
      name: 'Le Soleil',
      personnel: { kw: 'épanouissement', text: 'Joie simple d\'être pleinement soi, clarté rayonnante. Période de lumière intérieure, de confiance et de chaleur partagée.' },
      professionnel: { kw: 'succès reconnu', text: 'Succès public, reconnaissance, épanouissement professionnel. L\'une des cartes les plus favorables — visibilité et accomplissement.' },
      relationnel: { kw: 'amour joyeux', text: 'Amour véritable, joie partagée, épanouissement à deux. Le lien est lumineux, chaleureux, protecteur — souvent lié à un enfant.' }
    },
    '20': {
      name: 'Le Jugement',
      personnel: { kw: 'renaissance', text: 'Émergence d\'une nouvelle conscience, vocation qui s\'éveille. Libération d\'une situation enfermante — entendre l\'appel intérieur.' },
      professionnel: { kw: 'nouvelle voie', text: 'Reconversion, nouvelle inattendue, vocation qui se révèle. Ce qui semblait fini ouvre à quelque chose d\'entièrement neuf.' },
      relationnel: { kw: 'réconciliation', text: 'Pardon, retrouvailles, renaissance du lien. Une nouvelle étape s\'ouvre dans la relation — souvent après une longue maturation.' }
    },
    '21': {
      name: 'Le Monde',
      personnel: { kw: 'accomplissement', text: 'Plénitude, intégration harmonieuse, cycle qui se ferme dans la lumière. Tout ce que tu as traversé prend sens — tu es arrivé·e.' },
      professionnel: { kw: 'réussite totale', text: 'Succès complet, reconnaissance internationale, voyage couronné. L\'aboutissement d\'un long chemin professionnel.' },
      relationnel: { kw: 'union accomplie', text: 'Relation aboutie, harmonie avec l\'univers, lien qui touche à la plénitude. Le couple atteint une forme d\'accomplissement rare.' }
    }
  };

  /* ── 56 Arcanes Mineurs — templates par suit + numéro ─────────────────── */
  /* Pour les mineurs, on génère des lectures à partir du suit + du numéro.
     Suit : W (Bâtons/Feu/Action) · C (Coupes/Eau/Émotion) · S (Épées/Air/Mental) · P (Pentacles/Terre/Matière)
     Numéro : 1 (As) à 14 (Roi) */

  var SUIT_PLANES = {
    W: {
      personnel: { kw: 'élan vital', text: 'Une énergie de feu intérieur s\'allume en toi : passion, créativité, désir d\'agir. C\'est le moment d\'honorer ce qui te fait vibrer, même si ça dérange les autres.' },
      professionnel: { kw: 'initiative', text: 'Une dynamique d\'action et de lancement s\'active dans ta vie professionnelle. Projet, création, prise d\'initiative — l\'énergie est là, à toi de la canaliser.' },
      relationnel: { kw: 'passion', text: 'Une étincelle de passion et de désir traverse tes liens. Le cœur s\'enflamme, l\'élan est là — reste à voir si le feu dure ou s\'il consume.' }
    },
    C: {
      personnel: { kw: 'émotion', text: 'Une vague émotionnelle te traverse : amour, nostalgie, compassion, vulnérabilité. Accueille ce qui monte sans le juger — c\'est ton cœur qui parle.' },
      professionnel: { kw: 'intuition', text: 'L\'intuition et l\'intelligence émotionnelle sont tes meilleurs atouts maintenant. Écoute ce que tu ressens avant de décider — les chiffres suivront.' },
      relationnel: { kw: 'lien du cœur', text: 'Le cœur est au centre de tout : amour, amitié, famille. Ce qui se joue maintenant touche à ta capacité d\'aimer et d\'être aimé·e.' }
    },
    S: {
      personnel: { kw: 'clarté mentale', text: 'Une percée intellectuelle ou un besoin de vérité se fait sentir. C\'est le moment de trancher, de nommer ce qui était flou, de clarifier ta pensée.' },
      professionnel: { kw: 'décision', text: 'Une décision importante demande à être prise avec lucidité. Analyse, stratégie, communication — ton esprit est affûté, fais-lui confiance.' },
      relationnel: { kw: 'communication', text: 'La communication est la clé : ce qui ne se dit pas crée des malentendus. C\'est le moment de parler vrai, avec douceur mais sans détour.' }
    },
    P: {
      personnel: { kw: 'ancrage', text: 'Un besoin d\'ancrage et de concret se fait sentir : corps, santé, routine, ressources. Prends soin de tes bases matérielles et physiques.' },
      professionnel: { kw: 'réalisation', text: 'Le terrain concret est au centre : finances, projets tangibles, résultats mesurables. C\'est le moment de bâtir, pas de rêver.' },
      relationnel: { kw: 'stabilité', text: 'Le lien demande de la stabilité et du concret : engagements, projets communs, sécurité matérielle. L\'amour se construit aussi dans le quotidien.' }
    }
  };

  /* Modificateurs par numéro (1-14) */
  var NUMBER_MODIFIERS = {
    1:  { kw: 'nouveau départ', text: 'Une graine est plantée. C\'est le début d\'un cycle, l\'étincelle initiale, le potentiel pur qui demande à être cultivé.' },
    2:  { kw: 'équilibre', text: 'Deux forces se rencontrent et cherchent l\'harmonie. Dialogue, partenariat, choix — c\'est le moment de tenir les deux pôles.' },
    3:  { kw: 'expansion', text: 'Trois forces s\'unissent et créent. Croissance, créativité, collaboration — ce qui émane de toi prend forme dans le monde.' },
    4:  { kw: 'fondation', text: 'Quatre forces posent les bases. Stabilité, structure, cadre — c\'est le moment de consolider ce qui a été initié.' },
    5:  { kw: 'tension', text: 'Cinq forces se confrontent. Conflit, défi, instabilité — c\'est le moment de traverser l\'adversité pour en sortir plus fort·e.' },
    6:  { kw: 'harmonie', text: 'Six forces trouvent leur équilibre. Transition douce, victoire méritée, réconciliation — le chemin s\'apaise.' },
    7:  { kw: 'introspection', text: 'Sept forces invitent au recul. Évaluation, patience, stratégie — c\'est le moment de regarder avant d\'avancer.' },
    8:  { kw: 'mouvement', text: 'Huit forces se mettent en marche. Action, maîtrise, progression rapide — l\'élan est là, saisis-le.' },
    9:  { kw: 'plénitude', text: 'Neuf forces approchent de l\'accomplissement. Sagesse acquise, presque-bilan, vigilance — tu es proche du but.' },
    10: { kw: 'cycle complet', text: 'Dix forces bouclent un cycle. Accomplissement, fin, nouveau départ imminent — ce qui se termine ouvre sur autre chose.' },
    11: { kw: 'curiosité', text: 'Le Valet apporte une énergie jeune et curieuse. Apprentissage, exploration, message à recevoir — reste ouvert·e.' },
    12: { kw: 'mouvement rapide', text: 'Le Cavalier avance avec rapidité. Action, parfois impulsivité, message en route — sois prêt·e à recevoir ou à agir.' },
    13: { kw: 'maturation', text: 'La Reine incarne la maturité nourricière. Accueil, intuition, chaleur — tu as les ressources pour prendre soin.' },
    14: { kw: 'autorité', text: 'Le Roi incarne l\'autorité accomplie. Maîtrise, leadership, sagesse — tu as les ressources pour guider et décider.' }
  };

  /* ── API publique ─────────────────────────────────────────────────────── */

  function getPlaneReading(cardId, plane) {
    /* Majeurs : lecture directe */
    if (MAJORS[cardId]) {
      return MAJORS[cardId][plane] || null;
    }
    /* Mineurs : combinaison suit + numéro */
    var suit = cardId.charAt(0);
    var num = parseInt(cardId.slice(1), 10);
    if (SUIT_PLANES[suit] && NUMBER_MODIFIERS[num]) {
      var suitData = SUIT_PLANES[suit][plane];
      var numData = NUMBER_MODIFIERS[num];
      return {
        kw: suitData.kw + ' · ' + numData.kw,
        text: suitData.text + ' ' + numData.text
      };
    }
    return null;
  }

  function getAllPlanes(cardId) {
    var p = {
      personnel: getPlaneReading(cardId, 'personnel'),
      professionnel: getPlaneReading(cardId, 'professionnel'),
      relationnel: getPlaneReading(cardId, 'relationnel')
    };
    if (!p.personnel) return null;
    var name = MAJORS[cardId] ? MAJORS[cardId].name : cardId;
    return { name: name, personnel: p.personnel, professionnel: p.professionnel, relationnel: p.relationnel };
  }

  /* ── Analyse narrative (réutilise la logique de tarot-planes.js) ───────── */
  function analyzeFamilies(cards) {
    var counts = { lumiere: 0, ombre: 0, mouvement: 0, introspection: 0, structure: 0 };
    var lumiereIds = ['17','19','21','14','10','07','11','W01','W06','W14','C01','C09','C10','S01','P09','P10'];
    var ombreIds = ['15','16','13','18','12','09','S03','S09','S10','P04','P05','C04','C05'];
    var mouvementIds = ['00','01','07','11','06','W08','W12','S08'];
    var introspectionIds = ['02','09','08','20','S04','S07','C08','P07'];
    var structureIds = ['04','05','03','P03','P08','W04'];

    cards.forEach(function (c) {
      if (lumiereIds.indexOf(c.id) !== -1) counts.lumiere++;
      if (ombreIds.indexOf(c.id) !== -1) counts.ombre++;
      if (mouvementIds.indexOf(c.id) !== -1) counts.mouvement++;
      if (introspectionIds.indexOf(c.id) !== -1) counts.introspection++;
      if (structureIds.indexOf(c.id) !== -1) counts.structure++;
    });
    return counts;
  }

  function detectDynamic(cards) {
    var lumiereIds = ['17','19','21','14','10','07','11','W01','W06','W14','C01','C09','C10','S01','P09','P10'];
    var ombreIds = ['15','16','13','18','12','09','S03','S09','S10','P04','P05','C04','C05'];
    var tensionIds = ['06','08','12','15','16','W05','S02','S05'];

    var lumiereCount = 0, ombreCount = 0, tensionCount = 0;
    cards.forEach(function (c) {
      if (lumiereIds.indexOf(c.id) !== -1) lumiereCount++;
      if (ombreIds.indexOf(c.id) !== -1) ombreCount++;
      if (tensionIds.indexOf(c.id) !== -1) tensionCount++;
    });

    if (lumiereCount >= 2 && ombreCount === 0) return 'lumiere';
    if (ombreCount >= 2 && lumiereCount === 0) return 'ombre';
    if (lumiereCount > 0 && ombreCount > 0) return 'tension';
    if (tensionCount >= 2) return 'tension';
    return 'mixte';
  }

  function buildNarrative(cards, plane, families, dynamic) {
    var n = cards.length;
    var first = cards[0], last = cards[n - 1];

    var firstIsLight = ['17','19','21','14','10','07','11','W01','W06','W14','C01','C09','C10','S01','P09','P10'].indexOf(first.id) !== -1;
    var lastIsLight = ['17','19','21','14','10','07','11','W01','W06','W14','C01','C09','C10','S01','P09','P10'].indexOf(last.id) !== -1;
    var firstIsShadow = ['15','16','13','18','12','09','S03','S09','S10','P04','P05','C04','C05'].indexOf(first.id) !== -1;
    var lastIsShadow = ['15','16','13','18','12','09','S03','S09','S10','P04','P05','C04','C05'].indexOf(last.id) !== -1;

    if (plane === 'personnel') {
      if (firstIsShadow && lastIsLight) return 'Ce tirage raconte un passage intérieur : tu traverses une zone d\'ombre qui débouche sur une lumière. Ce que tu as affronté dans l\'obscurité — doutes, deuils, renoncements — t\'a préparé à recevoir ce qui vient. La traversée n\'est pas un détour, elle est le chemin lui-même.';
      if (firstIsLight && lastIsShadow) return 'Ce tirage invite à la lucidité intérieure : après une période d\'ouverture, quelque chose demande à être regardé en face. Ce n\'est pas une chute — c\'est un appel à descendre dans ce qui avait été mis de côté pour que rien ne reste inachevé en toi.';
      if (dynamic === 'lumiere') return 'Plusieurs cartes de lumière se répondent dans ce tirage : elles amplifient un message d\'ouverture intérieure, de réconciliation avec toi-même et d\'alignement profond. Tu es dans une phase où ce que tu es vraiment peut enfin se montrer sans masque.';
      if (dynamic === 'ombre') return 'Plusieurs cartes d\'ombre traversent ce tirage : elles signalent ce qui doit être traversé consciemment. Une partie de toi demande à être reconnue — peut-être ta vulnérabilité, ta colère, ta tristesse. L\'ombre ignorée ne disparaît pas : elle agit à ton insu.';
      if (dynamic === 'tension') return 'Ce tirage met en scène une tension intérieure féconde entre lumière et ombre. Tu portes en toi des polarités qui cherchent à s\'harmoniser : force et douceur, action et lâcher-prise, raison et intuition. La maturité vient quand on accepte d\'habiter ces tensions.';
      return 'Ce tirage compose une mosaïque d\'énergies intérieures complémentaires. Aucune facette de toi n\'est isolée — chacune prend son sens dans le dialogue avec les autres. Tu es un être complexe, et ce tirage te demande de la nuance et de l\'écoute intérieure.';
    }

    if (plane === 'professionnel') {
      if (firstIsShadow && lastIsLight) return 'Ce tirage raconte une traversée professionnelle : tu sors (ou tu vas sortir) d\'une période difficile pour entrer dans une phase de reconnaissance et d\'accomplissement. Ce que tu as appris dans l\'adversité vaut plus que ce que tu aurais acquis dans la facilité.';
      if (firstIsLight && lastIsShadow) return 'Ce tirage invite à la vigilance professionnelle : après une période favorable, quelque chose demande à être consolidé ou transformé. Une structure montre ses limites, un projet révèle ses failles. Ce n\'est pas un échec annoncé — c\'est un appel à regarder ce qui doit être renforcé.';
      if (dynamic === 'lumiere') return 'Plusieurs cartes de lumière se répondent dans ce tirage : elles amplifient un message d\'accomplissement professionnel, de reconnaissance et d\'alignement entre ta vocation et ton action. C\'est le moment d\'oser proposer, lancer, signer.';
      if (dynamic === 'ombre') return 'Plusieurs cartes d\'ombre traversent ce tirage : elles signalent ce qui doit être regardé en face dans ta vie professionnelle. Un projet qui ne te ressemble plus, un environnement qui épuise, une direction qui n\'est plus la tienne.';
      if (dynamic === 'tension') return 'Ce tirage met en scène une tension féconde entre ambition et prudence, entre expansion et recentrage. Les cartes ne te demandent ni de foncer tête baissée ni de tout paralyser — elles t\'invitent à avancer avec discernement.';
      return 'Ce tirage compose une mosaïque d\'énergies professionnelles complémentaires. La diversité des cartes suggère qu\'il n\'y a pas une seule voie toute tracée : il y a la tienne, à construire avec patience, en assemblant les pièces comme un artisan assemble son œuvre.';
    }

    if (plane === 'relationnel') {
      if (firstIsShadow && lastIsLight) return 'Ce tirage raconte une traversée relationnelle : tu sors (ou tu vas sortir) d\'une période de tensions, de deuils ou de désillusions pour entrer dans une phase de liens plus justes et plus nourrissants. Les liens qui viennent seront différents — plus vrais, plus libres.';
      if (firstIsLight && lastIsShadow) return 'Ce tirage invite à la lucidité relationnelle : après une période d\'harmonie, quelque chose demande à être regardé en face dans tes liens. Une relation montre ses limites, un schéma se répète. Ce n\'est pas une rupture annoncée — c\'est un appel à clarifier.';
      if (dynamic === 'lumiere') return 'Plusieurs cartes de lumière se répondent dans ce tirage : elles amplifient un message d\'ouverture du cœur, de liens nourrissants et de connexions justes. C\'est le moment d\'accueillir ce qui se présente, d\'approfondir ce qui existe, de gratitude pour ce qui porte.';
      if (dynamic === 'ombre') return 'Plusieurs cartes d\'ombre traversent ce tirage : elles signalent ce qui doit être regardé en face dans tes relations. Une dépendance à clarifier, une limite à poser, un lien à transformer ou à quitter.';
      if (dynamic === 'tension') return 'Ce tirage met en scène une tension féconde entre besoin d\'union et besoin d\'indépendance, entre donner et recevoir. Les cartes ne te demandent ni de te fondre ni de te couper — elles t\'invitent à trouver ta juste place dans le lien.';
      return 'Ce tirage compose une mosaïque d\'énergies relationnelles complémentaires. Accepte que tes relations ne sont pas toutes au même stade : certaines demandent de l\'attention, d\'autres du recul, d\'autres encore de l\'engagement.';
    }

    return 'Ce tirage compose une mosaïque d\'énergies complémentaires.';
  }

  function buildConseil(cards, plane, dynamic, spreadType) {
    /* Conseils spécifiques par tirage */
    var conseilsBySpread = {
      'croix-celtique': {
        personnel: {
          lumiere: 'La Croix Celtique confirme un alignement profond : honore ce qui s\'ouvre en toi. Les 10 cartes dessinent un chemin clair — fais-lui confiance, même quand il dérange.',
          ombre: 'La Croix Celtique pointe ce qui doit être traversé : ne contourne pas l\'obstacle, il est le passage. Prends le temps de regarder chaque face de ce qui se présente.',
          tension: 'La Croix Celtique met en scène une dynamique intérieure riche : tiens les polarités sans choisir trop vite. L\'intégration demande du temps et de la patience.',
          mixte: 'La Croix Celtique compose un paysage intérieur complexe : chaque carte a sa place. Cultive la patience du tisserand — le motif se révèle dans la durée.'
        },
        professionnel: {
          lumiere: 'La Croix Celtique confirme un terrain favorable : oser proposer, lancer, signer. Les influences extérieures sont positives — saisis cette fenêtre.',
          ombre: 'La Croix Celtique pointe un obstacle professionnel à traverser : clarifie les intentions, vérifie les contrats, ne signe rien dans le doute.',
          tension: 'La Croix Celtique met en tension ambition et prudence : avance avec discernement. Les cartes ne demandent ni de foncer ni de paralyser.',
          mixte: 'La Croix Celtique compose un paysage professionnel complexe : avance par étapes, en testant chaque terrain avant de t\'engager pleinement.'
        },
        relationnel: {
          lumiere: 'La Croix Celtique confirme une dynamique relationnelle porteuse : ouvre ton cœur sans te diluer. Les liens qui se présentent sont justes.',
          ombre: 'La Croix Celtique pointe ce qui doit être clarifié dans tes liens : distingue ce qui te nourrit de ce qui t\'épuise. Le lien juste demande lucidité.',
          tension: 'La Croix Celtique met en scène des tensions relationnelles fécondes : reste présent à ce qui est, même inconfortable. Les contradictions sont le signe d\'une croissance.',
          mixte: 'La Croix Celtique compose un paysage relationnel riche : accepte que tes liens ne sont pas tous au même stade. Honore chaque relation selon ce qu\'elle est.'
        }
      },
      'fer-a-cheval': {
        personnel: {
          lumiere: 'Le Fer à Cheval confirme que ta décision est alignée avec ton être profond : avance. Les doutes qui restent sont des réflexes, pas des signaux.',
          ombre: 'Le Fer à Cheval pointe ce qui freine ta décision : un doute légitime ou une peur à regarder. Prends le temps de distinguer les deux.',
          tension: 'Le Fer à Cheval met en tension ton élan et tes doutes : clarifie ce qui vient de toi et ce qui vient de l\'entourage. La réponse est en toi.',
          mixte: 'Le Fer à Cheval compose un paysage décisionnel complexe : avance par étapes, en testant chaque terrain. La clarté viendra par l\'action mesurée.'
        },
        professionnel: {
          lumiere: 'Le Fer à Cheval confirme que ton projet est viable : oser passer à l\'action. Les influences extérieures sont favorables — saisis la fenêtre.',
          ombre: 'Le Fer à Cheval pointe un obstacle concret à ton projet : clarifie les conditions, vérifie les soutiens, ne fonce pas tête baissée.',
          tension: 'Le Fer à Cheval met en tension ton ambition et la réalité : cherche le point d\'équilibre entre ce que tu veux et ce que tu peux porter.',
          mixte: 'Le Fer à Cheval compose un paysage professionnel complexe : teste avant de t\'engager. La patience est ta meilleure alliée.'
        },
        relationnel: {
          lumiere: 'Le Fer à Cheval confirme que ta décision relationnelle est juste : ouvre ton cœur. Les doutes qui restent sont des échos du passé, pas des signaux présents.',
          ombre: 'Le Fer à Cheval pointe ce qui freine ta décision relationnelle : un doute légitime ou une projection de l\'entourage. Distingue les deux.',
          tension: 'Le Fer à Cheval met en tension ton désir et tes peurs : clarifie ce qui vient de toi et ce qui vient des autres. La réponse est en toi.',
          mixte: 'Le Fer à Cheval compose un paysage relationnel complexe : avance par étapes, en observant ce qui se confirme à chaque pas.'
        }
      },
      'relation': {
        personnel: {
          lumiere: 'Ce tirage confirme que tu apportes ta lumière dans le lien : reste authentique, même si ça dérange. Ce que tu es vraiment est ta meilleure offrande.',
          ombre: 'Ce tirage pointe ta part d\'ombre dans le lien : ce que tu projettes, ce que tu évites, ce que tu n\'oses pas regarder. La lucidité sur soi est le premier pas.',
          tension: 'Ce tirage met en tension ce que tu donnes et ce que tu reçois : clarifie tes besoins sans accuser l\'autre. La maturité relationnelle passe par l\'honnêteté intérieure.',
          mixte: 'Ce tirage compose un paysage intérieur riche : accepte ta complexité. Le lien juste n\'est pas celui qui te rassure, c\'est celui qui respecte ta vérité.'
        },
        professionnel: {
          lumiere: 'Ce tirage confirme une collaboration porteuse : tes compétences et ton énergie sont reconnues. Oser proposer, oser t\'engager.',
          ombre: 'Ce tirage pointe ce qui freine la collaboration : un malentendu, un non-dit, une attente déçue. La clarification est le premier pas.',
          tension: 'Ce tirage met en tension tes attentes et celles de l\'autre : cherchez le terrain d\'entente sans renier vos différences.',
          mixte: 'Ce tirage compose un paysage professionnel complexe : avance par étapes, en observant ce qui se confirme à chaque interaction.'
        },
        relationnel: {
          lumiere: 'Ce tirage confirme que le lien est juste : vos intentions se rencontrent, le pont qui vous unit est solide. Cultivez ce qui porte.',
          ombre: 'Ce tirage pointe ce qui fragilise le lien : un malentendu, un non-dit, une attente déçue. La parole vraie est le premier pas de la guérison.',
          tension: 'Ce tirage met en tension vos intentions : clarifiez ce que chacun attend sans accuser. Le lien juste demande des deux côtés.',
          mixte: 'Ce tirage compose un paysage relationnel riche : acceptez la complexité. Le lien juste n\'est pas parfait, il est vivant.'
        }
      },
      'spirituel': {
        personnel: {
          lumiere: 'L\'Alignement Spirituel confirme une harmonie profonde entre ton corps, ton mental et ton esprit : honore cette cohérence, elle est ton guide.',
          ombre: 'L\'Alignement Spirituel pointe un déséquilibre à ré-harmoniser : un de tes plans (corps, mental, esprit) appelle plus d\'attention. Écoute ce signal.',
          tension: 'L\'Alignement Spirituel met en tension tes trois plans : clarifie ce qui cherche à s\'exprimer. L\'équilibre ne vient pas de la perfection, mais de l\'écoute.',
          mixte: 'L\'Alignement Spirituel compose un paysage intérieur riche : chaque plan a son mot à dire. La sagesse vient de l\'intégration, pas du choix.'
        },
        professionnel: {
          lumiere: 'L\'Alignement Spirituel confirme que ton activité est alignée : ce que tu fais, ce que tu penses et ce que ton âme appelle convergent. Avance.',
          ombre: 'L\'Alignement Spirituel pointe un décalage professionnel : ce que tu fais ne nourrit plus ce que tu es. Réfléchis à un réajustement.',
          tension: 'L\'Alignement Spirituel met en tension ton activité et ton âme : clarifie ce qui compte vraiment. La réussite sans alignement épuise.',
          mixte: 'L\'Alignement Spirituel compose un paysage professionnel riche : chaque plan a sa vérité. Cherche l\'activité qui respecte les trois.'
        },
        relationnel: {
          lumiere: 'L\'Alignement Spirituel confirme que tes liens sont justes : ton corps, ton mental et ton esprit s\'y expriment en harmonie. Cultive.',
          ombre: 'L\'Alignement Spirituel pointe un déséquilibre relationnel : un de tes plans n\'est pas nourri dans le lien. Écoute ce signal.',
          tension: 'L\'Alignement Spirituel met en tension tes trois plans dans le lien : clarifie ce qui cherche à s\'exprimer. L\'équilibre demande de l\'attention.',
          mixte: 'L\'Alignement Spirituel compose un paysage relationnel riche : chaque plan a son mot à dire. Le lien juste intègre les trois.'
        }
      }
    };

    var conseils = conseilsBySpread[spreadType] || {
      personnel: {
        lumiere: 'Accorde-toi du temps pour intégrer ce qui s\'ouvre. La lumière intérieure se cultive dans la durée, pas dans l\'urgence.',
        ombre: 'Ne fuis pas ce qui se présente, même si c\'est inconfortable. L\'ombre traversée devient une alliée.',
        tension: 'Tiens les deux pôles sans choisir trop vite. La vérité n\'est jamais d\'un seul côté.',
        mixte: 'Cultive la patience du tisserand : chaque fil a sa place.'
      },
      professionnel: {
        lumiere: 'C\'est le moment d\'oser proposer, lancer, signer. Les énergies sont favorables.',
        ombre: 'Prends du recul avant toute décision importante. Vérifie les contrats, clarifie les intentions.',
        tension: 'Cherche le point d\'équilibre entre ambition et prudence.',
        mixte: 'Avance par étapes, en testant chaque terrain avant de t\'engager.'
      },
      relationnel: {
        lumiere: 'Ouvre ton cœur sans te diluer. Les liens qui se présentent sont porteurs de lumière.',
        ombre: 'Prends soin de tes limites. Distingue ce qui te nourrit de ce qui t\'épuise.',
        tension: 'Ne cherche pas à résoudre les tensions par la fuite ou par la fusion.',
        mixte: 'Accepte que tes relations ne sont pas toutes au même stade.'
      }
    };
    return (conseils[plane] && conseils[plane][dynamic]) || conseils[plane].mixte;
  }

  function buildQuestion(plane, dynamic, families, spreadType) {
    var questionsBySpread = {
      'croix-celtique': {
        personnel: {
          lumiere: 'Les 10 cartes confirment un alignement profond : qu\'est-ce que tu vas faire de cette clarté pour honorer ce qui s\'ouvre en toi ?',
          ombre: 'La Croix Celtique pointe une zone d\'ombre à traverser : quelle partie de toi demandes-tu enfin à regarder en face ?',
          tension: 'La Croix Celtique met en scène une dynamique intérieure riche : qu\'est-ce que tu cherches à réconcilier en toi depuis longtemps ?',
          mixte: 'Les 10 cartes composent un paysage complexe : si tu devais nommer l\'élan central de ce moment de ta vie, quel serait-il ?'
        },
        professionnel: {
          lumiere: 'La Croix Celtique confirme un terrain favorable : quel projet ou quelle direction as-tu le courage d\'incarner maintenant ?',
          ombre: 'La Croix Celtique pointe un obstacle professionnel : qu\'est-ce que tu construis qui ne te ressemble plus, et qu\'est-ce que tu évites de regarder ?',
          tension: 'La Croix Celtique met en tension ambition et prudence : quel est le prix que tu paies pour ta situation actuelle ?',
          mixte: 'Les 10 cartes composent un paysage professionnel complexe : si tu n\'avais aucune contrainte matérielle, à quoi consacrerais-tu vraiment ton énergie ?'
        },
        relationnel: {
          lumiere: 'La Croix Celtique confirme une dynamique relationnelle porteuse : quel lien mérite aujourd\'hui plus de présence et de gratitude ?',
          ombre: 'La Croix Celtique pointe ce qui fragilise tes liens : quelle relation te demande de poser une limite que tu repousses depuis trop longtemps ?',
          tension: 'La Croix Celtique met en scène des tensions relationnelles : qu\'est-ce que tu projettes sur l\'autre qui t\'appartient en réalité ?',
          mixte: 'Les 10 cartes composent un paysage relationnel riche : quel type de lien as-tu vraiment envie de nourrir dans cette phase de ta vie ?'
        }
      },
      'fer-a-cheval': {
        personnel: {
          lumiere: 'Le Fer à Cheval confirme que ta décision est alignée : qu\'est-ce que tu vas faire maintenant que tu sais ?',
          ombre: 'Le Fer à Cheval pointe un doute légitime : qu\'est-ce que tu crains vraiment, et ce doute te protège-t-il ou te freine-t-il ?',
          tension: 'Le Fer à Cheval met en tension ton élan et tes peurs : qu\'est-ce qui vient de toi et qu\'est-ce qui vient de l\'entourage ?',
          mixte: 'Le Fer à Cheval compose un paysage décisionnel complexe : de quoi as-tu besoin pour avancer avec plus de clarté ?'
        },
        professionnel: {
          lumiere: 'Le Fer à Cheval confirme que ton projet est viable : quel premier pas concret vas-tu faire aujourd\'hui ?',
          ombre: 'Le Fer à Cheval pointe un obstacle concret : qu\'est-ce que tu n\'as pas encore vérifié ou clarifié dans ton projet ?',
          tension: 'Le Fer à Cheval met en tension ton ambition et la réalité : quel est le point d\'équilibre que tu cherches ?',
          mixte: 'Le Fer à Cheval compose un paysage professionnel complexe : de quoi as-tu besoin pour avancer avec plus de confiance ?'
        },
        relationnel: {
          lumiere: 'Le Fer à Cheval confirme que ta décision relationnelle est juste : qu\'est-ce que tu vas faire maintenant que tu sais ?',
          ombre: 'Le Fer à Cheval pointe un doute relationnel : ce doute vient-il de toi ou de l\'influence de ton entourage ?',
          tension: 'Le Fer à Cheval met en tension ton désir et tes peurs : qu\'est-ce que tu projettes sur l\'autre qui t\'appartient ?',
          mixte: 'Le Fer à Cheval compose un paysage relationnel complexe : de quoi as-tu besoin pour clarifier ta position ?'
        }
      },
      'relation': {
        personnel: {
          lumiere: 'Ce tirage confirme que tu apportes ta lumière : qu\'est-ce que tu vas faire de cette clarté sur toi-même ?',
          ombre: 'Ce tirage pointe ta part d\'ombre dans le lien : qu\'est-ce que tu évites de regarder en toi qui se rejoue dans la relation ?',
          tension: 'Ce tirage met en tension ce que tu donnes et reçois : qu\'est-ce que tu n\'oses pas demander ou nommer ?',
          mixte: 'Ce tirage compose un paysage intérieur riche : qu\'est-ce que tu attends vraiment de ce lien, en profondeur ?'
        },
        professionnel: {
          lumiere: 'Ce tirage confirme une collaboration porteuse : qu\'est-ce que tu vas faire de cette reconnaissance ?',
          ombre: 'Ce tirage pointe ce qui freine la collaboration : quel malentendu ou non-dit demandes-tu à clarifier ?',
          tension: 'Ce tirage met en tension tes attentes et celles de l\'autre : quel terrain d\'entente cherches-tu ?',
          mixte: 'Ce tirage compose un paysage professionnel complexe : qu\'est-ce que tu attends vraiment de cette collaboration ?'
        },
        relationnel: {
          lumiere: 'Ce tirage confirme que le lien est juste : qu\'est-ce que tu vas faire pour cultiver ce qui porte ?',
          ombre: 'Ce tirage pointe ce qui fragilise le lien : quel malentendu ou non-dit demandes-tu à clarifier ?',
          tension: 'Ce tirage met en tension vos intentions : qu\'est-ce que chacun attend vraiment, et qu\'est-ce qui n\'a pas été dit ?',
          mixte: 'Ce tirage compose un paysage relationnel riche : qu\'est-ce que ce lien t\'apporte vraiment, et qu\'est-ce qu\'il te demande ?'
        }
      },
      'spirituel': {
        personnel: {
          lumiere: 'L\'Alignement Spirituel confirme une harmonie profonde : qu\'est-ce que tu vas faire pour honorer cette cohérence ?',
          ombre: 'L\'Alignement Spirituel pointe un déséquilibre : quel plan (corps, mental, esprit) demandes-tu à écouter davantage ?',
          tension: 'L\'Alignement Spirituel met en tension tes trois plans : qu\'est-ce qui cherche à s\'exprimer et que tu n\'écoutes pas ?',
          mixte: 'L\'Alignement Spirituel compose un paysage intérieur riche : qu\'est-ce que ton corps, ton mental et ton esprit essaient de te dire ensemble ?'
        },
        professionnel: {
          lumiere: 'L\'Alignement Spirituel confirme que ton activité est juste : qu\'est-ce que tu vas faire pour approfondir cet alignement ?',
          ombre: 'L\'Alignement Spirituel pointe un décalage : qu\'est-ce que tu fais qui ne nourrit plus ce que tu es ?',
          tension: 'L\'Alignement Spirituel met en tension ton activité et ton âme : qu\'est-ce qui compte vraiment pour toi ?',
          mixte: 'L\'Alignement Spirituel compose un paysage professionnel riche : quelle activité respecterait tes trois plans à la fois ?'
        },
        relationnel: {
          lumiere: 'L\'Alignement Spirituel confirme que tes liens sont justes : qu\'est-ce que tu vas faire pour cultiver cette harmonie ?',
          ombre: 'L\'Alignement Spirituel pointe un déséquilibre relationnel : quel plan n\'est pas nourri dans tes liens ?',
          tension: 'L\'Alignement Spirituel met en tension tes trois plans dans le lien : qu\'est-ce qui cherche à s\'exprimer et que tu n\'écoutes pas ?',
          mixte: 'L\'Alignement Spirituel compose un paysage relationnel riche : quel lien respecterait tes trois plans à la fois ?'
        }
      }
    };

    var questions = questionsBySpread[spreadType] || {
      personnel: {
        lumiere: 'Qu\'est-ce que je fais du temps et de l\'énergie que cette lumière me donne ?',
        ombre: 'Quelle partie de moi ai-je cessé d\'écouter ?',
        tension: 'Qu\'est-ce que je cherche à réconcilier en moi depuis longtemps ?',
        mixte: 'Si je devais nommer l\'élan central de ce moment de ma vie, quel serait-il ?'
      },
      professionnel: {
        lumiere: 'Quel projet ou quelle direction ai-je le courage d\'incarner maintenant ?',
        ombre: 'Qu\'est-ce que je construis qui ne me ressemble plus ?',
        tension: 'Quel est le prix que je paie pour ma situation actuelle ?',
        mixte: 'Si je n\'avais aucune contrainte matérielle, à quoi consacrerais-je vraiment mon énergie ?'
      },
      relationnel: {
        lumiere: 'Quel lien mérite aujourd\'hui plus de présence et de gratitude ?',
        ombre: 'Quelle relation me demande de poser une limite ?',
        tension: 'Qu\'est-ce que je projette sur l\'autre qui m\'appartient ?',
        mixte: 'Quel type de lien ai-je vraiment envie de nourrir ?'
      }
    };
    return (questions[plane] && questions[plane][dynamic]) || questions[plane].mixte;
  }

  function composeSynthesis(narrative, dynamic, families, plane, planeLabel, spreadType) {
    var parts = [narrative];
    var dominant = null, max = 0;
    Object.keys(families).forEach(function (k) {
      if (families[k] > max) { max = families[k]; dominant = k; }
    });

    if (max >= 2) {
      var observationsBySpread = {
        'croix-celtique': {
          personnel: {
            lumiere: 'La Croix Celtique confirme un alignement intérieur profond : les 10 cartes convergent vers une même lumière. C\'est le moment d\'honorer ce qui s\'ouvre.',
            ombre: 'La Croix Celtique pointe une zone d\'ombre centrale : ce qui traverse ton paysage intérieur demande à être regardé en face. La traversée est le chemin.',
            mouvement: 'La Croix Celtique met en scène un mouvement intérieur puissant : quelque chose est en train de se transformer en toi. Accompagne ce mouvement.',
            introspection: 'La Croix Celtique invite à une introspection profonde : les 10 cartes dessinent un paysage intérieur riche. Prends le temps de l\'explorer.',
            structure: 'La Croix Celtique appelle à structurer ton monde intérieur : il est temps de poser des cadres internes, de clarifier ce qui doit l\'être.'
          },
          professionnel: {
            lumiere: 'La Croix Celtique confirme un terrain professionnel favorable : les 10 cartes convergent vers une même lumière. C\'est le moment d\'oser.',
            ombre: 'La Croix Celtique pointe un obstacle professionnel central : ce qui freine ta démarche demande à être regardé en face. La lucidité est le premier pas.',
            mouvement: 'La Croix Celtique met en scène un mouvement professionnel puissant : une opportunité, un tournant. Accompagne ce mouvement.',
            introspection: 'La Croix Celtique invite à questionner ta voie professionnelle : les 10 cartes dessinent un paysage complexe. Prends le temps de clarifier.',
            structure: 'La Croix Celtique appelle à structurer ton projet professionnel : il est temps de poser des cadres concrets, de consolider.'
          },
          relationnel: {
            lumiere: 'La Croix Celtique confirme une dynamique relationnelle porteuse : les 10 cartes convergent vers une même lumière. Cultive ce qui porte.',
            ombre: 'La Croix Celtique pointe ce qui fragilise tes liens : ce qui traverse ton paysage relationnel demande à être regardé en face.',
            mouvement: 'La Croix Celtique met en scène un mouvement relationnel puissant : une rencontre, une évolution. Accompagne ce mouvement.',
            introspection: 'La Croix Celtique invite à questionner tes liens : les 10 cartes dessinent un paysage relationnel riche. Prends le temps d\'explorer.',
            structure: 'La Croix Celtique appelle à structurer tes liens : il est temps de poser des cadres relationnels, de clarifier les engagements.'
          }
        },
        'fer-a-cheval': {
          personnel: {
            lumiere: 'Le Fer à Cheval confirme que ta décision est alignée avec ton être profond : les 7 cartes convergent vers une même lumière. Avance.',
            ombre: 'Le Fer à Cheval pointe un doute légitime à clarifier : ce qui freine ta décision demande à être distingué de l\'influence de l\'entourage.',
            mouvement: 'Le Fer à Cheval met en scène un mouvement décisionnel : quelque chose est en train de se clarifier en toi. Accompagne ce mouvement.',
            introspection: 'Le Fer à Cheval invite à une introspection ciblée : les 7 cartes dessinent le chemin de ta décision. Prends le temps de l\'explorer.',
            structure: 'Le Fer à Cheval appelle à structurer ta décision : il est temps de poser des cadres intérieurs, de clarifier tes critères.'
          },
          professionnel: {
            lumiere: 'Le Fer à Cheval confirme que ton projet est viable : les 7 cartes convergent vers une même lumière. Oser passer à l\'action.',
            ombre: 'Le Fer à Cheval pointe un obstacle concret à ton projet : ce qui freine demande à être clarifié. Vérifie les conditions.',
            mouvement: 'Le Fer à Cheval met en scène un mouvement professionnel : une opportunité, un tournant. Accompagne ce mouvement.',
            introspection: 'Le Fer à Cheval invite à questionner ton projet : les 7 cartes dessinent un paysage complexe. Prends le temps de clarifier.',
            structure: 'Le Fer à Cheval appelle à structurer ton projet : il est temps de poser des cadres concrets, de consolider les bases.'
          },
          relationnel: {
            lumiere: 'Le Fer à Cheval confirme que ta décision relationnelle est juste : les 7 cartes convergent vers une même lumière. Ouvre ton cœur.',
            ombre: 'Le Fer à Cheval pointe un doute relationnel à clarifier : ce qui freine vient-il de toi ou de l\'entourage ? Distingue les deux.',
            mouvement: 'Le Fer à Cheval met en scène un mouvement relationnel : une évolution, une clarification. Accompagne ce mouvement.',
            introspection: 'Le Fer à Cheval invite à questionner ta position relationnelle : les 7 cartes dessinent un paysage riche. Prends le temps d\'explorer.',
            structure: 'Le Fer à Cheval appelle à structurer ta position relationnelle : il est temps de poser des cadres, de clarifier tes critères.'
          }
        },
        'relation': {
          personnel: {
            lumiere: 'Ce tirage confirme que tu apportes ta lumière dans le lien : les 5 cartes convergent vers une même clarté. Reste authentique.',
            ombre: 'Ce tirage pointe ta part d\'ombre dans le lien : ce que tu projettes, ce que tu évites. La lucidité sur soi est le premier pas.',
            mouvement: 'Ce tirage met en scène un mouvement intérieur : quelque chose est en train de se clarifier en toi sur ta façon d\'aimer.',
            introspection: 'Ce tirage invite à une introspection relationnelle : les 5 cartes dessinent ce que tu apportes au lien. Prends le temps d\'explorer.',
            structure: 'Ce tirage appelle à structurer ta position intérieure : il est temps de clarifier ce que tu veux et ce que tu apportes.'
          },
          professionnel: {
            lumiere: 'Ce tirage confirme une collaboration porteuse : les 5 cartes convergent vers une même clarté. Oser t\'engager.',
            ombre: 'Ce tirage pointe ce qui freine la collaboration : un malentendu, un non-dit. La clarification est le premier pas.',
            mouvement: 'Ce tirage met en scène un mouvement professionnel : une évolution, une clarification. Accompagne ce mouvement.',
            introspection: 'Ce tirage invite à questionner ta collaboration : les 5 cartes dessinent un paysage complexe. Prends le temps de clarifier.',
            structure: 'Ce tirage appelle à structurer ta collaboration : il est temps de poser des cadres, de clarifier les engagements.'
          },
          relationnel: {
            lumiere: 'Ce tirage confirme que le lien est juste : les 5 cartes convergent vers une même clarté. Cultivez ce qui porte.',
            ombre: 'Ce tirage pointe ce qui fragilise le lien : un malentendu, un non-dit. La parole vraie est le premier pas.',
            mouvement: 'Ce tirage met en scène un mouvement relationnel : une évolution, une clarification. Accompagne ce mouvement.',
            introspection: 'Ce tirage invite à questionner le lien : les 5 cartes dessinent un paysage riche. Prends le temps d\'explorer.',
            structure: 'Ce tirage appelle à structurer le lien : il est temps de poser des cadres relationnels, de clarifier les engagements.'
          }
        },
        'spirituel': {
          personnel: {
            lumiere: 'L\'Alignement Spirituel confirme une harmonie profonde : tes trois plans dialoguent en cohérence. Honore cette unité.',
            ombre: 'L\'Alignement Spirituel pointe un déséquilibre : un de tes plans (corps, mental, esprit) appelle plus d\'attention. Écoute ce signal.',
            mouvement: 'L\'Alignement Spirituel met en scène un mouvement d\'harmonisation : quelque chose cherche à s\'équilibrer en toi. Accompagne ce mouvement.',
            introspection: 'L\'Alignement Spirituel invite à une écoute profonde : tes trois plans ont un message commun. Prends le temps de l\'entendre.',
            structure: 'L\'Alignement Spirituel appelle à structurer ton alignement : il est temps de poser des cadres pour nourrir tes trois plans.'
          },
          professionnel: {
            lumiere: 'L\'Alignement Spirituel confirme que ton activité est juste : ce que tu fais, ce que tu penses et ce que ton âme appelle convergent.',
            ombre: 'L\'Alignement Spirituel pointe un décalage : ce que tu fais ne nourrit plus ce que tu es. Réfléchis à un réajustement.',
            mouvement: 'L\'Alignement Spirituel met en scène un mouvement d\'alignement professionnel : une réorientation, une clarification.',
            introspection: 'L\'Alignement Spirituel invite à questionner ton activité : tes trois plans ont un message commun sur ta voie.',
            structure: 'L\'Alignement Spirituel appelle à structurer ton activité : il est temps de poser des cadres qui respectent tes trois plans.'
          },
          relationnel: {
            lumiere: 'L\'Alignement Spirituel confirme que tes liens sont justes : ton corps, ton mental et ton esprit s\'y expriment en harmonie.',
            ombre: 'L\'Alignement Spirituel pointe un déséquilibre relationnel : un de tes plans n\'est pas nourri dans le lien. Écoute ce signal.',
            mouvement: 'L\'Alignement Spirituel met en scène un mouvement d\'harmonisation relationnelle : quelque chose cherche à s\'équilibrer.',
            introspection: 'L\'Alignement Spirituel invite à écouter tes liens : tes trois plans ont un message commun sur ce que tu vis.',
            structure: 'L\'Alignement Spirituel appelle à structurer tes liens : il est temps de poser des cadres qui respectent tes trois plans.'
          }
        }
      };

      var observations = observationsBySpread[spreadType] || {
        personnel: {
          lumiere: 'La lumière intérieure est majoritaire : c\'est un signal d\'alignement et de réconciliation avec toi-même.',
          ombre: 'L\'ombre intérieure est très présente : ce n\'est pas un avertissement, c\'est une invitation à traverser ce qui a été mis de côté.',
          mouvement: 'Le mouvement intérieur domine : quelque chose est en train de se transformer en toi.',
          introspection: 'L\'introspection est la tonalité dominante : ce tirage te demande de ralentir.',
          structure: 'La structure intérieure est au cœur du tirage : il est temps de poser des cadres internes.'
        },
        professionnel: {
          lumiere: 'La lumière professionnelle est majoritaire : c\'est un signal d\'alignement entre ta vocation et ton action.',
          ombre: 'L\'ombre professionnelle est très présente : un projet, un environnement ou une direction montre ses limites.',
          mouvement: 'Le mouvement professionnel domine : une opportunité, un tournant, une réorientation.',
          introspection: 'L\'introspection professionnelle est la tonalité dominante : ce tirage te demande de questionner ce que tu fais vraiment.',
          structure: 'La structure professionnelle est au cœur du tirage : il est temps de poser des cadres concrets.'
        },
        relationnel: {
          lumiere: 'La lumière relationnelle est majoritaire : c\'est un signal d\'ouverture du cœur et de liens nourrissants.',
          ombre: 'L\'ombre relationnelle est très présente : une dépendance, une limite, un schéma qui se répète.',
          mouvement: 'Le mouvement relationnel domine : une rencontre, une rupture, une évolution.',
          introspection: 'L\'introspection relationnelle est la tonalité dominante : ce tirage te demande de questionner ce que tu cherches dans le lien.',
          structure: 'La structure relationnelle est au cœur du tirage : il est temps de poser des cadres dans tes liens.'
        }
      };
      if (observations[plane] && observations[plane][dominant]) {
        parts.push(observations[plane][dominant]);
      }
    }

    var clotures = {
      personnel: 'Cette lecture est un miroir, pas un verdict. Elle éclaire une facette de ta vie intérieure — ce que tu en fais reste ton choix le plus précieux.',
      professionnel: 'Cette lecture est un miroir, pas un verdict. Elle éclaire une facette de ta vie active — ce que tu en fais reste ton choix le plus précieux.',
      relationnel: 'Cette lecture est un miroir, pas un verdict. Elle éclaire une facette de ta vie relationnelle — ce que tu en fais reste ton choix le plus précieux.'
    };
    parts.push(clotures[plane] || clotures.personnel);

    return parts.join(' ');
  }

  function projectSpread(cards, plane, spreadType) {
    if (!cards || !cards.length) return null;

    var planeLabel = { personnel: 'personnel', professionnel: 'professionnel', relationnel: 'relationnel' }[plane] || plane;

    /* Intros adaptées selon le type de tirage */
    var introsBySpread = {
      'croix-celtique': {
        personnel: 'Cette lecture projette ta Croix Celtique sur le miroir intérieur. Les 10 cartes éclairent ton rapport à toi-même : ce que tu montres, ce que tu caches, ce qui te traverse, ce qui te bloque, ce qui te libère.',
        professionnel: 'Cette lecture projette ta Croix Celtique sur le terrain professionnel. Les 10 cartes décodent ta situation active : forces en jeu, obstacles concrets, influences extérieures, racines et aboutissement de ta démarche.',
        relationnel: 'Cette lecture projette ta Croix Celtique sur le terrain relationnel. Les 10 cartes révèlent la dynamique de tes liens : ce qui te nourrit, ce qui te freine, ce que l\'entourage projette, et l\'horizon relationnel.'
      },
      'fer-a-cheval': {
        personnel: 'Cette lecture projette ton Fer à Cheval sur le miroir intérieur. Les 7 cartes tracent le chemin de ta décision : ce qui te motive, ce qui te freine, ce que tu crains, et la direction que ton être profond appelle.',
        professionnel: 'Cette lecture projette ton Fer à Cheval sur le terrain professionnel. Les 7 cartes évaluent l\'évolution de ton projet ou de ta décision : contexte, obstacles, doutes, influences extérieures, issue probable.',
        relationnel: 'Cette lecture projette ton Fer à Cheval sur le terrain relationnel. Les 7 cartes isolent tes doutes profonds de l\'influence de ton entourage, pour clarifier ce que tu veux vraiment dans le lien.'
      },
      'relation': {
        personnel: 'Cette lecture projette ton Tirage de la Relation sur le miroir intérieur. Les 5 cartes révèlent ce que tu projettes de toi dans le lien : ta part d\'ombre, ta part de lumière, ce que tu apportes et ce que tu cherches.',
        professionnel: 'Cette lecture projette ton Tirage de la Relation sur le terrain professionnel. Les 5 cartes décryptent la dynamique de ta collaboration : intentions, attentes, tensions, potentiel d\'évolution.',
        relationnel: 'Cette lecture projette ton Tirage de la Relation sur le terrain du lien. Les 5 cartes comparent tes intentions avec celles de l\'autre, et révèlent le pont qui vous unit — ou ce qui le fragilise.'
      },
      'spirituel': {
        personnel: 'Cette lecture projette ton Alignement Spirituel sur le miroir intérieur. Les 3 cartes révèlent comment ton corps, ton mental et ton esprit dialoguent en toi, et où se situe le déséquilibre à ré-harmoniser.',
        professionnel: 'Cette lecture projette ton Alignement Spirituel sur le terrain professionnel. Les 3 cartes éclairent la cohérence entre ce que tu fais, ce que tu penses et ce que ton âme appelle — clé d\'une activité juste.',
        relationnel: 'Cette lecture projette ton Alignement Spirituel sur le terrain relationnel. Les 3 cartes révèlent comment ton corps, ton mental et ton esprit s\'expriment dans tes liens, et où l\'alignement manque.'
      }
    };

    var intros = introsBySpread[spreadType] || {
      personnel: 'Cette lecture projette ton tirage sur le miroir intérieur. Elle ne parle pas de ce que tu fais, mais de ce que tu es en train de devenir.',
      professionnel: 'Cette lecture projette ton tirage sur le terrain du monde concret : vocation, projets, place sociale, ressources.',
      relationnel: 'Cette lecture projette ton tirage sur le terrain du lien : amour, famille, partenariats, communauté.'
    };

    var entries = cards.map(function (card) {
      var r = getPlaneReading(card.id, plane);
      return {
        cardId: card.id,
        cardName: card.name,
        kw: r ? r.kw : '',
        text: r ? r.text : 'Lecture indisponible pour cette carte sur ce plan.'
      };
    });

    var families = analyzeFamilies(cards);
    var dynamic = detectDynamic(cards);
    var narrative = buildNarrative(cards, plane, families, dynamic);
    var conseil = buildConseil(cards, plane, dynamic, spreadType);
    var question = buildQuestion(plane, dynamic, families, spreadType);
    var synth = composeSynthesis(narrative, dynamic, families, plane, planeLabel, spreadType);

    return {
      plane: plane,
      planeLabel: planeLabel,
      intro: intros[plane] || '',
      entries: entries,
      synth: synth,
      conseil: conseil,
      question: question
    };
  }

  return {
    getPlaneReading: getPlaneReading,
    getAllPlanes: getAllPlanes,
    projectSpread: projectSpread
  };
})();
