/* ─────────────────────────────────────────────────────────────────────────
   tarot-planes.js — Lectures par plan de vie (22 arcanes majeurs × 3 plans)
   Plans : personnel (intériorité) · professionnel (vocation/finances) · relationnel (amour/lien)
   Sources : synthèse de Vibratis, France-Minéraux, 7Tarot, Francelecture,
             Planète Astrologie, Vivre Intuitif, Le Tarot Trésor Infini.
   ───────────────────────────────────────────────────────────────────────── */
window.tarotPlanes = (function () {

  /* Chaque arcane expose 3 lectures concises (1-2 phrases) + 1 mot-clé par plan.
     Le moteur projette ces textes sur le tirage en cours. */
  var PLANES = {
    '00': {
      name: 'Le Mat',
      personnel: {
        kw: 'indépendance intérieure',
        text: 'Un appel à retrouver ta liberté d\'être, sans te conformer aux attentes. C\'est le moment de redémarrer intérieurement, avec l\'insouciance de celui qui n\'a rien à perdre.'
      },
      professionnel: {
        kw: 'nouveau départ',
        text: 'Une voie professionnelle s\'ouvre, atypique ou risquée, mais enthousiasmante. Premier emploi, formation, voyage initiatique — l\'élan compte plus que l\'expérience.'
      },
      relationnel: {
        kw: 'rencontre libre',
        text: 'Une relation hors des cadres, atypique, qui valorise l\'indépendance de chacun. Besoin d\'espace et de fraîcheur dans le lien — fuir ce qui enferme.'
      }
    },
    '01': {
      name: 'Le Bateleur',
      personnel: {
        kw: 'potentiel révélé',
        text: 'Tu as tous les outils en main : il suffit de les assembler. C\'est le moment d\'aligner ta volonté et tes moyens, de passer de l\'intention à l\'acte.'
      },
      professionnel: {
        kw: 'lancement',
        text: 'Démarrage d\'activité, signature de contrat, premier entretien. L\'habileté et la créativité sont tes meilleurs atouts — oser proposer, oser entreprendre.'
      },
      relationnel: {
        kw: 'séduction',
        text: 'Rencontre naissante où le charme et le talent opèrent. Relation légère et stimulante, fondée sur l\'échange et la curiosité mutuelle.'
      }
    },
    '02': {
      name: 'La Papesse',
      personnel: {
        kw: 'intériorité',
        text: 'Période de gestation silencieuse, d\'écoute intérieure et de maturation. Les réponses viendront du silence, pas du bruit — écrire, méditer, se retirer.'
      },
      professionnel: {
        kw: 'études / recherche',
        text: 'Formation longue, recherche, spécialisation intellectuelle. Métiers du livre, de la psy, du conseil — tout ce qui demande de la profondeur et de la patience.'
      },
      relationnel: {
        kw: 'lien platonique',
        text: 'Relation profonde mais discrète, parfois platonique ou « mère spirituelle ». Le lien se construit dans le non-dit et la compréhension silencieuse.'
      }
    },
    '03': {
      name: 'L\'Impératrice',
      personnel: {
        kw: 'créativité',
        text: 'Féminité incarnée, créativité débordante, expression de soi. C\'est le moment de créer, d\'écrire, de rayonner — laisser parler ta nature profonde.'
      },
      professionnel: {
        kw: 'communication',
        text: 'Métiers de la communication, du marketing, de la pédagogie, de l\'art. Lancement de projets créatifs, succès intellectuel et social.'
      },
      relationnel: {
        kw: 'charisme amoureux',
        text: 'Séduction rayonnante, relation expressive et fertile. Possible grossesse ou désir d\'enfant. Le lien se nourrit d\'abondance et de chaleur.'
      }
    },
    '04': {
      name: 'L\'Empereur',
      personnel: {
        kw: 'ancrage',
        text: 'Structuration du moi, image paternelle intériorisée, autorité personnelle assumée. Sentiment de solidité intérieure et de cadre posé sur sa propre vie.'
      },
      professionnel: {
        kw: 'direction',
        text: 'Direction d\'équipe, promotion, fondation d\'entreprise stable. Gestion rigoureuse, placements sûrs, succès par le pragmatisme et le travail ancré.'
      },
      relationnel: {
        kw: 'partenaire stable',
        text: 'Figure paternelle ou partenaire fiable, stable mais peu démonstratif. Couple durable fondé sur le respect et la sécurité matérielle.'
      }
    },
    '05': {
      name: 'Le Pape',
      personnel: {
        kw: 'transmission',
        text: 'Un guide, un mentor, une tradition spirituelle qui éclaire ton chemin. Invitation à recevoir un enseignement et à le transmettre à ton tour.'
      },
      professionnel: {
        kw: 'conseil',
        text: 'Contrat protecteur, guidance morale, protecteur influent. Métiers de l\'enseignement, du conseil, du droit, de l\'accompagnement.'
      },
      relationnel: {
        kw: 'union traditionnelle',
        text: 'Relation bénie par l\'entourage, mariage, engagement officiel. Le lien s\'inscrit dans une tradition ou une institution qui le protège.'
      }
    },
    '06': {
      name: 'L\'Amoureux',
      personnel: {
        kw: 'choix intérieur',
        text: 'Question intime : qu\'est-ce que je veux vraiment ? Conflit entre cœur et tête, entre désir et raison. Le libre-arbitre est au cœur du processus.'
      },
      professionnel: {
        kw: 'carrefour',
        text: 'Choix de carrière, signature de contrat, partenariat d\'affaires. Une décision importante se présente — écouter ce qui résonne vraiment.'
      },
      relationnel: {
        kw: 'coup de foudre',
        text: 'Carrefour amoureux, hésitation entre deux partenaires, coup de foudre ou relation triangulaire. Le cœur doit trancher.'
      }
    },
    '07': {
      name: 'Le Chariot',
      personnel: {
        kw: 'volonté',
        text: 'Dépassement de soi, courage intérieur, progression résolue. Tu as les rênes en main — avancer dans la direction que tu as choisie.'
      },
      professionnel: {
        kw: 'succès',
        text: 'Promotion, déménagement professionnel, voyage d\'affaires, succès d\'examen. L\'élan et la détermination paient.'
      },
      relationnel: {
        kw: 'conquête',
        text: 'Séduction assumée, conquête amoureuse, couple qui avance dans la même direction. Le lien se construit par l\'action partagée.'
      }
    },
    '08': {
      name: 'La Justice',
      personnel: {
        kw: 'équilibre',
        text: 'Alignement entre tes valeurs et tes actes. Capacité à te juger sans cruauté, à distinguer le vrai du faux en toi-même.'
      },
      professionnel: {
        kw: 'contrat',
        text: 'Négociation, procédure juridique, médiation, carrière juridique ou RH. Ce qui est juste finit par triompher — patience et droiture.'
      },
      relationnel: {
        kw: 'respect mutuel',
        text: 'Couple fondé sur le respect et l\'équité, contrat de mariage, séparation équitable. Le lien repose sur la droiture et la parole donnée.'
      }
    },
    '09': {
      name: 'L\'Hermite',
      personnel: {
        kw: 'quête intérieure',
        text: 'Retraite méditative, retour à soi, lanterne de la sagesse. Un temps long de recherche personnelle est nécessaire — ne pas brusquer.'
      },
      professionnel: {
        kw: 'spécialisation',
        text: 'Recherche, expertise de niche, professorat. Période de recul qui prépare une contribution plus profonde et plus juste.'
      },
      relationnel: {
        kw: 'solitude choisie',
        text: 'Célibat fécond, période de recul dans le couple. Le lien a besoin de silence pour se redécouvrir — accepter la distance sans la vivre comme un échec.'
      }
    },
    '10': {
      name: 'La Roue de Fortune',
      personnel: {
        kw: 'tournant',
        text: 'Acceptation du cycle, lâcher-prise sur le contrôle. Le destin bouge — accueillir ce qui vient sans résister, même si c\'est inconfortable.'
      },
      professionnel: {
        kw: 'opportunité',
        text: 'Tournant professionnel imprévu : promotion, licenciement, opportunité saisie au vol. Variation financière importante — s\'adapter vite.'
      },
      relationnel: {
        kw: 'destin amoureux',
        text: 'Rencontre « karmique », retour d\'un ex, coup du sort. Le lien est marqué par le destin — accepter ce qui se présente.'
      }
    },
    '11': {
      name: 'La Force',
      personnel: {
        kw: 'courage doux',
        text: 'Maîtrise des instincts par la douceur, pas par la violence. Une grande vitalité intérieure et la capacité de dompter tes démons avec grâce.'
      },
      professionnel: {
        kw: 'persévérance',
        text: 'Énergie stable et continue, capacité à tenir sur la durée. Succès par la patience et la force tranquille, pas par la brutalité.'
      },
      relationnel: {
        kw: 'lien apprivoisé',
        text: 'Relation où la passion est domptée par la tendresse. Le lien se construit par la patience et l\'acceptation des failles de l\'autre.'
      }
    },
    '12': {
      name: 'Le Pendu',
      personnel: {
        kw: 'lâcher-prise',
        text: 'Blocage ou pause forcée qui invite à voir les choses sous un angle totalement différent. Arrêter d\'agir pour commencer à comprendre.'
      },
      professionnel: {
        kw: 'pause imposée',
        text: 'Congé, rupture de contrat, période d\'attente. Ce temps d\'arrêt n\'est pas un échec — c\'est un changement de perspective nécessaire.'
      },
      relationnel: {
        kw: 'sacrifice',
        text: 'Relation en suspens, sacrifice consenti ou subi. Le lien demande de lâcher quelque chose pour retrouver un sens plus profond.'
      }
    },
    '13': {
      name: 'L\'Arcane Sans Nom',
      personnel: {
        kw: 'transformation',
        text: 'Fin d\'un cycle intérieur, mutation nécessaire. Faire table rase de ce qui ne te correspond plus — accepter de mourir à une version de toi-même.'
      },
      professionnel: {
        kw: 'réorientation',
        text: 'Licenciement, fin de contrat, changement de voie radicale. Ce qui disparaît libère la place pour quelque chose de plus juste.'
      },
      relationnel: {
        kw: 'rupture',
        text: 'Séparation nécessaire, coupe des liens toxiques. Ce qui meurt dans le lien ouvre la possibilité d\'un amour plus authentique.'
      }
    },
    '14': {
      name: 'Tempérance',
      personnel: {
        kw: 'harmonie',
        text: 'Guérison intérieure, circulation fluide des énergies. Tempérer les extrêmes, retrouver un rythme de croisière doux et réparateur.'
      },
      professionnel: {
        kw: 'diplomatie',
        text: 'Médiation, compromis, fluidité des échanges. Période d\'équilibre où les projets avancent par ajustements successifs.'
      },
      relationnel: {
        kw: 'complicité',
        text: 'Relation apaisée, complicité douce, dialogue fluide. Le lien se nourrit de patience et de mesure — éviter les excès.'
      }
    },
    '15': {
      name: 'Le Diable',
      personnel: {
        kw: 'passions',
        text: 'Énergie brute, créativité sauvage, mais aussi dépendances et ombres à regarder en face. Ce qui te fascine peut aussi t\'enchaîner.'
      },
      professionnel: {
        kw: 'ambition',
        text: 'Puissance financière, ambition matérielle, pouvoir. Attention aux excès et aux emprises — garder la maîtrise de tes choix.'
      },
      relationnel: {
        kw: 'attraction',
        text: 'Relation passionnelle, magnétique, parfois possessive. Distinguer l\'amour libre de la dépendance qui chaîne — l\'enjeu central.'
      }
    },
    '16': {
      name: 'La Maison-Dieu',
      personnel: {
        kw: 'effondrement',
        text: 'Bouleversement intérieur, effondrement de fausses croyances. Un électrochoc qui libère ce qui était emprisonné — accepter la secousse.'
      },
      professionnel: {
        kw: 'rupture brutale',
        text: 'Licenciement, faillite, accident de carrière. Mais aussi : éclair de lucidité, réorientation brutale mais nécessaire.'
      },
      relationnel: {
        kw: 'rupture révélatrice',
        text: 'Séparation brutale mais nécessaire, trahison révélée. Ce qui s\'effondre dans le lien ouvre à une vérité plus juste.'
      }
    },
    '17': {
      name: 'L\'Étoile',
      personnel: {
        kw: 'espérance',
        text: 'Reconnexion au sens, inspiration, vulnérabilité assumée. Tu as trouvé ta place dans le monde — foi en l\'avenir, protégée par une bonne étoile.'
      },
      professionnel: {
        kw: 'vocation',
        text: 'Projet aligné avec tes valeurs, vocation humanitaire ou artistique. Période faste où le travail a du sens et porte ses fruits.'
      },
      relationnel: {
        kw: 'amour bienveillant',
        text: 'Relation de confiance, soutien mutuel, fertilité. Le lien est nourri par la tendresse et l\'espoir partagé.'
      }
    },
    '18': {
      name: 'La Lune',
      personnel: {
        kw: 'inconscient',
        text: 'Plongée dans les profondeurs, les rêves, les émotions. Période fertile pour les créatifs et les intuitifs — mais prudence face aux illusions.'
      },
      professionnel: {
        kw: 'créativité intuitive',
        text: 'Travail créatif, intuitif, onirique. Mais aussi : confusion, projets flous, manque de clarté — ne pas signer dans le doute.'
      },
      relationnel: {
        kw: 'émotions profondes',
        text: 'Relation marquée par les non-dits, les projections, les fantasmes. Distinguer ce qui est réel de ce qui est rêvé — clarifier avant d\'agir.'
      }
    },
    '19': {
      name: 'Le Soleil',
      personnel: {
        kw: 'épanouissement',
        text: 'Joie simple d\'être pleinement soi, clarté rayonnante. Période de lumière intérieure, de confiance et de chaleur partagée.'
      },
      professionnel: {
        kw: 'succès reconnu',
        text: 'Succès public, reconnaissance, épanouissement professionnel. L\'une des cartes les plus favorables — visibilité et accomplissement.'
      },
      relationnel: {
        kw: 'amour joyeux',
        text: 'Amour véritable, joie partagée, épanouissement à deux. Le lien est lumineux, chaleureux, protecteur — souvent lié à un enfant.'
      }
    },
    '20': {
      name: 'Le Jugement',
      personnel: {
        kw: 'renaissance',
        text: 'Émergence d\'une nouvelle conscience, vocation qui s\'éveille. Libération d\'une situation enfermante — entendre l\'appel intérieur.'
      },
      professionnel: {
        kw: 'nouvelle voie',
        text: 'Reconversion, nouvelle inattendue, vocation qui se révèle. Ce qui semblait fini ouvre à quelque chose d\'entièrement neuf.'
      },
      relationnel: {
        kw: 'réconciliation',
        text: 'Pardon, retrouvailles, renaissance du lien. Une nouvelle étape s\'ouvre dans la relation — souvent après une longue maturation.'
      }
    },
    '21': {
      name: 'Le Monde',
      personnel: {
        kw: 'accomplissement',
        text: 'Plénitude, intégration harmonieuse, cycle qui se ferme dans la lumière. Tout ce que tu as traversé prend sens — tu es arrivé·e.'
      },
      professionnel: {
        kw: 'réussite totale',
        text: 'Succès complet, reconnaissance internationale, voyage couronné. L\'aboutissement d\'un long chemin professionnel.'
      },
      relationnel: {
        kw: 'union accomplie',
        text: 'Relation aboutie, harmonie avec l\'univers, lien qui touche à la plénitude. Le couple atteint une forme d\'accomplissement rare.'
      }
    }
  };

  /* ── API publique ─────────────────────────────────────────────────────── */

  /** Renvoie la lecture d'une carte sur un plan donné. */
  function getPlaneReading(cardId, plane) {
    var data = PLANES[cardId];
    if (!data) return null;
    return data[plane] || null;
  }

  /** Renvoie les 3 lectures d'une carte (pour affichage compact). */
  function getAllPlanes(cardId) {
    var data = PLANES[cardId];
    if (!data) return null;
    return {
      name: data.name,
      personnel: data.personnel,
      professionnel: data.professionnel,
      relationnel: data.relationnel
    };
  }

  /** Génère un résumé du tirage projeté sur un plan donné.
      cards : tableau d'objets {id, name} dans l'ordre du tirage.
      plane : 'personnel' | 'professionnel' | 'relationnel'
      Retourne un objet { intro, entries:[{name, kw, text}], synth, conseil, question } */
  function projectSpread(cards, plane) {
    if (!cards || !cards.length) return null;

    var planeLabel = {
      personnel: 'personnel',
      professionnel: 'professionnel',
      relationnel: 'relationnel'
    }[plane] || plane;

    var intros = {
      personnel: 'Cette lecture projette ton tirage sur le miroir intérieur. Elle ne parle pas de ce que tu fais, mais de ce que tu es en train de devenir — de la qualité de ton rapport à toi-même, à tes ombres et à ta lumière.',
      professionnel: 'Cette lecture projette ton tirage sur le terrain du monde concret : vocation, projets, place sociale, ressources. Elle éclaire ce que ce cycle t\'appelle à construire ou à transformer dans ta vie active.',
      relationnel: 'Cette lecture projette ton tirage sur le terrain du lien : amour, famille, partenariats, communauté. Elle révèle la qualité de ce que tu donnes, reçois et construis avec les autres.'
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

    /* ── Analyse narrative profonde ─────────────────────────────────────── */

    /* 1. Identifier les grandes familles énergétiques présentes */
    var families = analyzeFamilies(cards);

    /* 2. Détecter la dynamique dominante (progression, tension, lumière, ombre) */
    var dynamic = detectDynamic(cards);

    /* 3. Identifier le fil narratif (ce qui relie les cartes entre elles) */
    var narrative = buildNarrative(cards, plane, families, dynamic);

    /* 4. Formuler un conseil incarné */
    var conseil = buildConseil(cards, plane, dynamic);

    /* 5. Poser une question ouverte pour approfondir */
    var question = buildQuestion(plane, dynamic, families);

    /* 6. Synthèse finale : assembler les pièces */
    var synth = composeSynthesis(narrative, dynamic, families, plane, planeLabel);

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

  /* ── Analyse des familles énergétiques ─────────────────────────────────── */
  function analyzeFamilies(cards) {
    var counts = { lumiere: 0, ombre: 0, mouvement: 0, introspection: 0, structure: 0 };
    var lumiereIds = ['17','19','21','14','10'];
    var ombreIds = ['15','16','13','18','12'];
    var mouvementIds = ['00','01','07','11','06'];
    var introspectionIds = ['02','09','08','20'];
    var structureIds = ['04','05','03'];

    cards.forEach(function (c) {
      if (lumiereIds.indexOf(c.id) !== -1) counts.lumiere++;
      if (ombreIds.indexOf(c.id) !== -1) counts.ombre++;
      if (mouvementIds.indexOf(c.id) !== -1) counts.mouvement++;
      if (introspectionIds.indexOf(c.id) !== -1) counts.introspection++;
      if (structureIds.indexOf(c.id) !== -1) counts.structure++;
    });
    return counts;
  }

  /* ── Détection de la dynamique dominante ───────────────────────────────── */
  function detectDynamic(cards) {
    var lumiereIds = ['17','19','21','14','10','07','11'];
    var ombreIds = ['15','16','13','18','12','09'];
    var tensionIds = ['06','08','12','15','16'];

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

  /* ── Construction du fil narratif ──────────────────────────────────────── */
  function buildNarrative(cards, plane, families, dynamic) {
    var n = cards.length;
    var first = cards[0], last = cards[n - 1];

    /* Détecter une progression (passage d'une énergie à une autre) */
    var firstIsLight = ['17','19','21','14','10','07','11'].indexOf(first.id) !== -1;
    var lastIsLight = ['17','19','21','14','10','07','11'].indexOf(last.id) !== -1;
    var firstIsShadow = ['15','16','13','18','12','09'].indexOf(first.id) !== -1;
    var lastIsShadow = ['15','16','13','18','12','09'].indexOf(last.id) !== -1;

    /* ── Narratives spécifiques par plan ─────────────────────────────────── */

    if (plane === 'personnel') {
      if (firstIsShadow && lastIsLight) {
        return 'Ce tirage raconte un passage intérieur : tu traverses une zone d\'ombre qui débouche sur une lumière. Ce que tu as affronté dans l\'obscurité — doutes, deuils, renoncements — t\'a préparé à recevoir ce qui vient. La traversée n\'est pas un détour, elle est le chemin lui-même. Tu n\'en sors pas indemne, mais tu en sors transformé·e.';
      }
      if (firstIsLight && lastIsShadow) {
        return 'Ce tirage invite à la lucidité intérieure : après une période d\'ouverture et de clarté, quelque chose demande à être regardé en face. Ce n\'est pas une chute — c\'est un appel à descendre dans ce qui avait été mis de côté pour que rien ne reste inachevé en toi. La lumière véritable inclut l\'ombre, elle ne la fuit pas.';
      }
      if (dynamic === 'lumiere') {
        return 'Plusieurs cartes de lumière se répondent dans ce tirage : elles amplifient un message d\'ouverture intérieure, de réconciliation avec toi-même et d\'alignement profond. Tu es dans une phase où ce que tu es vraiment peut enfin se montrer sans masque. C\'est le moment d\'habiter pleinement ta vérité, même si elle dérange.';
      }
      if (dynamic === 'ombre') {
        return 'Plusieurs cartes d\'ombre traversent ce tirage : elles ne prédisent pas un malheur, elles signalent ce qui doit être traversé consciemment. Une partie de toi demande à être reconnue — peut-être ta vulnérabilité, ta colère, ta tristesse, ton besoin. L\'ombre ignorée ne disparaît pas : elle agit à ton insu. La regarder en face est déjà le début de la libération.';
      }
      if (dynamic === 'tension') {
        return 'Ce tirage met en scène une tension intérieure féconde entre lumière et ombre. Les cartes ne s\'opposent pas — elles dialoguent. Tu portes en toi des polarités qui cherchent à s\'harmoniser : force et douceur, action et lâcher-prise, raison et intuition. La maturité vient quand on accepte d\'habiter ces tensions sans en rejeter aucune.';
      }
      return 'Ce tirage compose une mosaïque d\'énergies intérieures complémentaires. Aucune facette de toi n\'est isolée — chacune prend son sens dans le dialogue avec les autres. Tu es un être complexe, et ce tirage te demande de la nuance, de l\'écoute intérieure et la capacité à relier ce qui semble disparate en toi.';
    }

    if (plane === 'professionnel') {
      if (firstIsShadow && lastIsLight) {
        return 'Ce tirage raconte une traversée professionnelle : tu sors (ou tu vas sortir) d\'une période difficile — doutes, échecs, remises en question — pour entrer dans une phase de reconnaissance et d\'accomplissement. Ce que tu as appris dans l\'adversité vaut plus que ce que tu aurais acquis dans la facilité. Le terrain qui s\'ouvre est solide parce qu\'il a été éprouvé.';
      }
      if (firstIsLight && lastIsShadow) {
        return 'Ce tirage invite à la vigilance professionnelle : après une période favorable, quelque chose demande à être consolidé ou transformé. Une structure montre ses limites, un projet révèle ses failles, une réussite cache une fragilité. Ce n\'est pas un échec annoncé — c\'est un appel à regarder ce qui doit être renforcé avant que la croissance ne s\'effondre.';
      }
      if (dynamic === 'lumiere') {
        return 'Plusieurs cartes de lumière se répondent dans ce tirage : elles amplifient un message d\'accomplissement professionnel, de reconnaissance et d\'alignement entre ta vocation et ton action. C\'est le moment d\'oser proposer, lancer, signer. Les énergies sont favorables — ne les gaspille pas dans l\'hésitation. Agis depuis la confiance, pas depuis la peur.';
      }
      if (dynamic === 'ombre') {
        return 'Plusieurs cartes d\'ombre traversent ce tirage : elles signalent ce qui doit être regardé en face dans ta vie professionnelle. Un projet qui ne te ressemble plus, un environnement qui épuise, une direction qui n\'est plus la tienne. L\'ombre ici n\'est pas une menace — c\'est une information. Prends du recul avant toute décision importante.';
      }
      if (dynamic === 'tension') {
        return 'Ce tirage met en scène une tension féconde entre ambition et prudence, entre expansion et recentrage. Les cartes ne te demandent ni de foncer tête baissée ni de tout paralyser — elles t\'invitent à avancer avec discernement. Cherche le point d\'équilibre entre ce que tu veux construire et ce que tu peux réellement porter.';
      }
      return 'Ce tirage compose une mosaïque d\'énergies professionnelles complémentaires. Aucune carte n\'est isolée — chacune éclaire une facette de ta situation. La diversité des cartes suggère qu\'il n\'y a pas une seule voie toute tracée : il y a la tienne, à construire avec patience, en assemblant les pièces comme un artisan assemble son œuvre.';
    }

    if (plane === 'relationnel') {
      if (firstIsShadow && lastIsLight) {
        return 'Ce tirage raconte une traversée relationnelle : tu sors (ou tu vas sortir) d\'une période de tensions, de deuils ou de désillusions pour entrer dans une phase de liens plus justes et plus nourrissants. Ce que tu as appris sur toi à travers les autres vaut plus que ce que tu aurais appris dans la facilité. Les liens qui viennent seront différents — plus vrais, plus libres.';
      }
      if (firstIsLight && lastIsShadow) {
        return 'Ce tirage invite à la lucidité relationnelle : après une période d\'harmonie, quelque chose demande à être regardé en face dans tes liens. Une relation montre ses limites, un schéma se répète, un besoin a été mis de côté. Ce n\'est pas une rupture annoncée — c\'est un appel à clarifier ce qui doit l\'être pour que le lien reste vivant.';
      }
      if (dynamic === 'lumiere') {
        return 'Plusieurs cartes de lumière se répondent dans ce tirage : elles amplifient un message d\'ouverture du cœur, de liens nourrissants et de connexions justes. C\'est le moment d\'accueillir ce qui se présente, d\'approfondir ce qui existe, de gratitude pour ce qui porte. Ouvre ton cœur sans te diluer — les liens justes respectent ton axe intérieur.';
      }
      if (dynamic === 'ombre') {
        return 'Plusieurs cartes d\'ombre traversent ce tirage : elles signalent ce qui doit être regardé en face dans tes relations. Une dépendance à clarifier, une limite à poser, un lien à transformer ou à quitter. L\'ombre ici n\'est pas une condamnation — c\'est une invitation à honorer ta vérité plutôt que de maintenir des liens qui ne te nourrissent plus.';
      }
      if (dynamic === 'tension') {
        return 'Ce tirage met en scène une tension féconde entre besoin d\'union et besoin d\'indépendance, entre donner et recevoir, entre s\'engager et se préserver. Les cartes ne te demandent ni de te fondre ni de te couper — elles t\'invitent à trouver ta juste place dans le lien. Les contradictions relationnelles sont souvent le signe d\'une croissance en cours.';
      }
      return 'Ce tirage compose une mosaïque d\'énergies relationnelles complémentaires. Aucun lien n\'est isolé — chacun prend son sens dans l\'ensemble de ta vie affective. Accepte que tes relations ne sont pas toutes au même stade : certaines demandent de l\'attention, d\'autres du recul, d\'autres encore de l\'engagement. Honore chaque lien selon ce qu\'il est vraiment.';
    }

    return 'Ce tirage compose une mosaïque d\'énergies complémentaires. Aucune carte n\'est isolée — chacune prend son sens dans le dialogue avec les autres.';
  }

  /* ── Conseil incarné ───────────────────────────────────────────────────── */
  function buildConseil(cards, plane, dynamic) {
    var conseils = {
      personnel: {
        lumiere: 'Accorde-toi du temps pour intégrer ce qui s\'ouvre. La lumière intérieure se cultive dans la durée, pas dans l\'urgence. Pratique le silence, l\'écriture, la marche — tout ce qui te ramène à ton centre.',
        ombre: 'Ne fuis pas ce qui se présente, même si c\'est inconfortable. L\'ombre traversée devient une alliée. Cherche un espace d\'écoute — un ami, un thérapeute, un carnet — pour nommer ce qui vit en toi.',
        tension: 'Tiens les deux pôles sans choisir trop vite. La vérité n\'est jamais d\'un seul côté. Lâche la volonté de tout résoudre immédiatement — la maturité vient par l\'acceptation des contradictions fécondes.',
        mixte: 'Cultive la patience du tisserand : chaque fil a sa place, même ceux dont tu ne vois pas encore l\'usage. Fais confiance au motif qui se dessine, même s\'il reste flou.'
      },
      professionnel: {
        lumiere: 'C\'est le moment d\'oser proposer, lancer, signer. Les énergies sont favorables — ne les gaspille pas dans l\'hésitation. Agis depuis la confiance, pas depuis la peur.',
        ombre: 'Prends du recul avant toute décision importante. Ce qui semble urgent ne l\'est pas toujours. Vérifie les contrats, clarifie les intentions, ne signe rien dans le doute.',
        tension: 'Cherche le point d\'équilibre entre ambition et prudence. Les cartes ne te demandent ni de foncer tête baissée ni de tout paralyser — elles t\'invitent à avancer avec discernement.',
        mixte: 'Avance par étapes, en testant chaque terrain avant de t\'engager. La diversité des cartes suggère qu\'il n\'y a pas une seule voie — il y a la tienne, à tracer avec patience.'
      },
      relationnel: {
        lumiere: 'Ouvre ton cœur sans te diluer. Les liens qui se présentent ou se renforcent sont porteurs de lumière — accueille-les avec gratitude, mais garde ton axe intérieur.',
        ombre: 'Prends soin de tes limites. Ce qui se joue dans tes relations demande de la lucidité : distingue ce qui te nourrit de ce qui t\'épuise. Le lien juste n\'est pas celui qui rassure, c\'est celui qui respecte ta vérité.',
        tension: 'Ne cherche pas à résoudre les tensions relationnelles par la fuite ou par la fusion. Reste présent à ce qui est, même inconfortable. Les contradictions dans le lien sont souvent le signe d\'une croissance en cours.',
        mixte: 'Accepte que tes relations ne sont pas toutes au même stade. Certaines demandent de l\'attention, d\'autres du recul, d\'autres encore de l\'engagement. Honore chaque lien selon ce qu\'il est vraiment.'
      }
    };
    return (conseils[plane] && conseils[plane][dynamic]) || conseils[plane].mixte;
  }

  /* ── Question ouverte pour approfondir ─────────────────────────────────── */
  function buildQuestion(plane, dynamic, families) {
    var questions = {
      personnel: {
        lumiere: 'Qu\'est-ce que je fais du temps et de l\'énergie que cette lumière me donne ?',
        ombre: 'Quelle partie de moi ai-je cessé d\'écouter, et qu\'est-ce qu\'elle essaie encore de me dire ?',
        tension: 'Qu\'est-ce que je cherche à réconcilier en moi depuis longtemps, et qu\'est-ce qui m\'empêche d\'y arriver ?',
        mixte: 'Si je devais nommer l\'élan central de ce moment de ma vie, quel serait-il ?'
      },
      professionnel: {
        lumiere: 'Quel projet ou quelle direction ai-je le courage d\'incarner maintenant ?',
        ombre: 'Qu\'est-ce que je construis qui ne me ressemble plus, et qu\'est-ce que j\'évite de regarder ?',
        tension: 'Quel est le prix que je paie pour ma situation actuelle, et vaut-il encore ce que je reçois en échange ?',
        mixte: 'Si je n\'avais aucune contrainte matérielle, à quoi consacrerais-je vraiment mon énergie ?'
      },
      relationnel: {
        lumiere: 'Quel lien mérite aujourd\'hui que j\'y mette plus de présence et de gratitude ?',
        ombre: 'Quelle relation me demande de poser une limite que je repousse depuis trop longtemps ?',
        tension: 'Qu\'est-ce que je projette sur l\'autre qui m\'appartient en réalité ?',
        mixte: 'Quel type de lien ai-je vraiment envie de nourrir dans cette phase de ma vie ?'
      }
    };
    return (questions[plane] && questions[plane][dynamic]) || questions[plane].mixte;
  }

  /* ── Composition de la synthèse finale ─────────────────────────────────── */
  function composeSynthesis(narrative, dynamic, families, plane, planeLabel) {
    var parts = [narrative];

    /* Ajouter une observation sur la dominante énergétique, spécifique au plan */
    var dominant = null, max = 0;
    Object.keys(families).forEach(function (k) {
      if (families[k] > max) { max = families[k]; dominant = k; }
    });

    if (max >= 2) {
      var observations = {
        personnel: {
          lumiere: 'La lumière intérieure est majoritaire dans ce tirage : c\'est un signal d\'alignement et de réconciliation avec toi-même. Les cartes t\'invitent à faire confiance à ce qui porte en toi, même quand ça dérange.',
          ombre: 'L\'ombre intérieure est très présente : ce n\'est pas un avertissement, c\'est une invitation à traverser ce qui a été mis de côté. La conscience de l\'ombre est déjà le début de la libération — ce que tu refuses de regarder agit à ton insu.',
          mouvement: 'Le mouvement intérieur domine : quelque chose est en train de se transformer en toi, que tu le veuilles ou non. Mieux vaut accompagner ce mouvement que le subir — il te mène vers une version plus juste de toi-même.',
          introspection: 'L\'introspection est la tonalité dominante : ce tirage te demande de ralentir, de regarder en arrière pour comprendre ce qui se joue maintenant. Les réponses ne viendront pas du monde extérieur, mais de l\'écoute de toi-même.',
          structure: 'La structure intérieure est au cœur du tirage : il est temps de poser des cadres internes, de clarifier ce qui doit l\'être, de donner une forme stable à ce qui cherche à exister en toi.'
        },
        professionnel: {
          lumiere: 'La lumière professionnelle est majoritaire : c\'est un signal d\'alignement entre ta vocation et ton action. Les cartes t\'invitent à faire confiance à ce que tu construis et à oser rayonner dans ton domaine.',
          ombre: 'L\'ombre professionnelle est très présente : ce n\'est pas un échec annoncé, c\'est une invitation à regarder ce qui ne fonctionne plus. Un projet, un environnement ou une direction montre ses limites — la lucidité est le premier pas du changement.',
          mouvement: 'Le mouvement professionnel domine : quelque chose est en train de se transformer dans ta vie active, que tu le veuilles ou non. Une opportunité, un tournant, une réorientation. Mieux vaut accompagner ce mouvement que le subir.',
          introspection: 'L\'introspection professionnelle est la tonalité dominante : ce tirage te demande de ralentir, de questionner ce que tu fais vraiment et pourquoi. Les réponses viendront d\'un retour à l\'essentiel, pas d\'une accélération.',
          structure: 'La structure professionnelle est au cœur du tirage : il est temps de poser des cadres concrets, de clarifier tes engagements, de donner une forme stable à tes projets. Ce qui est édifié maintenant sera durable.'
        },
        relationnel: {
          lumiere: 'La lumière relationnelle est majoritaire : c\'est un signal d\'ouverture du cœur et de liens nourrissants. Les cartes t\'invitent à accueillir ce qui se présente, à approfondir ce qui existe, à gratitude pour ce qui porte.',
          ombre: 'L\'ombre relationnelle est très présente : ce n\'est pas une condamnation des liens, c\'est une invitation à regarder ce qui doit être transformé. Une dépendance, une limite, un schéma qui se répète — la lucidité est le premier pas de la libération.',
          mouvement: 'Le mouvement relationnel domine : quelque chose est en train de se transformer dans tes liens, que tu le veuilles ou non. Une rencontre, une rupture, une évolution. Mieux vaut accompagner ce mouvement que le subir.',
          introspection: 'L\'introspection relationnelle est la tonalité dominante : ce tirage te demande de ralentir, de questionner ce que tu cherches vraiment dans le lien. Les réponses viendront de l\'intérieur, pas de l\'extérieur.',
          structure: 'La structure relationnelle est au cœur du tirage : il est temps de poser des cadres dans tes liens, de clarifier les engagements, de donner une forme stable à ce qui compte. Ce qui est édifié maintenant sera durable.'
        }
      };
      if (observations[plane] && observations[plane][dominant]) {
        parts.push(observations[plane][dominant]);
      }
    }

    /* Clôture : rappel du libre arbitre, formulé selon le plan */
    var clotures = {
      personnel: 'Cette lecture est un miroir, pas un verdict. Elle éclaire une facette de ta vie intérieure — ce que tu en fais reste ton choix le plus précieux.',
      professionnel: 'Cette lecture est un miroir, pas un verdict. Elle éclaire une facette de ta vie active — ce que tu en fais reste ton choix le plus précieux.',
      relationnel: 'Cette lecture est un miroir, pas un verdict. Elle éclaire une facette de ta vie relationnelle — ce que tu en fais reste ton choix le plus précieux.'
    };
    parts.push(clotures[plane] || clotures.personnel);

    return parts.join(' ');
  }

  return {
    getPlaneReading: getPlaneReading,
    getAllPlanes: getAllPlanes,
    projectSpread: projectSpread,
    PLANES: PLANES
  };
})();
