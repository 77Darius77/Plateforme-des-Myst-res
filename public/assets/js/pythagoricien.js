// ═══════════════════════════════════════════════════════════
// NUMÉROLOGIE PYTHAGORICIENNE — Calculateur
// Sources : Hans Decoz (WorldNumerology), Matthew Goodwin,
//           Numerologist.com, SeventhLifePath.com, Mindbodygreen
// ═══════════════════════════════════════════════════════════

// ─── TABLE PYTHAGORICIENNE ────────────────────────────────
const PYTH_TABLE = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
};
const VOYELLES = new Set(['A','E','I','O','U']);
const MAITRES  = new Set([11,22,33]);

// ─── DONNÉES — NOMBRES ────────────────────────────────────
const NOMBRES = {
  1: {
    titre: "Le Pionnier",
    force: "Leadership, initiative, indépendance",
    defi: "Égocentrisme, solitude, domination",
    maitre: false,
    interpretation: "Le 1 est la vibration de la création pure — la force primordiale dont tous les autres nombres émergent. Ceux qui portent fortement le 1 ont un don inné pour ouvrir des chemins là où d'autres voient des obstacles. Leur énergie est directe, enthousiaste, magnétique. Le vrai travail du 1 consiste à exercer ce leadership avec humilité : la force s'affirme sans écraser, l'indépendance reste ouverte à la collaboration. Un 1 épanoui inspire par l'exemple, pas par l'autorité.",
    chemin: "Ton chemin de vie est celui de l'affirmation de soi et de l'initiative. Tu es venu apprendre à incarner une indépendance saine — ni soumission ni tyrannie — et à ouvrir des voies originales que les autres emprunteront après toi.",
    expression: "Tu t'exprimes dans le monde par ton originalité et ta capacité à initier. Les autres te voient comme un meneur naturel, quelqu'un qui avance là où d'autres hésitent encore à se lancer.",
    ame: "Au plus profond de toi, tu aspires à une vie authentiquement tienne, libre et accomplie selon tes propres termes. Le moteur secret de tes choix est le désir d'autonomie et de réalisation personnelle.",
    personnalite: "Tu dégages une assurance et une indépendance qui imposent le respect. Ton entourage te perçoit comme quelqu'un de déterminé, capable de décider et d'agir sans hésitation excessive."
  },
  2: {
    titre: "Le Diplomate",
    force: "Intuition, empathie, coopération",
    defi: "Dépendance affective, passivité, effacement",
    maitre: false,
    interpretation: "Le 2 est la vibration la plus réceptive du spectre — une force subtile et profonde que sa discrétion rend souvent invisible. Les personnes portant fortement le 2 sentent ce que les autres vivent avant même qu'ils ne le verbalisent. Leur don naturel pour la médiation et la création de liens fait d'eux les ciments de toute relation ou organisation. Le grand défi du 2 est de ne pas conditionner sa valeur à l'approbation des autres : une fois ce cap franchi, leur intuition devient une boussole irremplaçable.",
    chemin: "Ton chemin de vie est celui de la coopération et de la sensibilité affinée. Tu es venu apprendre que la force silencieuse et l'écoute profonde sont aussi puissantes — sinon plus — que l'action directe.",
    expression: "Tu t'exprimes dans le monde par ta sensibilité et ton tact exceptionnel. On vient te voir quand la communication est rompue ou les relations tendues : tu as la faculté rare de créer des ponts.",
    ame: "Au fond de toi, tu aspires à la paix, à l'harmonie et à des liens authentiques. Ce qui te nourrit vraiment n'est pas le succès solitaire mais la profondeur dans tes relations et la douceur des échanges.",
    personnalite: "Tu projettes une douceur et une disponibilité qui mettent les autres à l'aise instantanément. Ceux qui te rencontrent sentent que tu les écoutes vraiment — ce don est ta plus grande force sociale."
  },
  3: {
    titre: "Le Créateur",
    force: "Créativité, joie, communication",
    defi: "Dispersion, superficialité, inconstance",
    maitre: false,
    interpretation: "Le 3 vibre avec une énergie expansive, joyeuse et créative qui éclaire tout ce qu'il touche. Porteurs d'une imagination fertile et d'un don naturel pour l'expression, les 3 excellent dans tous les arts, la communication et la création de lien social. Leur défi n'est pas le talent — ils en ont en abondance — mais la discipline : sans focus, la créativité du 3 s'éparpille dans mille projets jamais aboutis. Un 3 épanoui est un phare de joie qui, en se concentrant, peut créer des œuvres durables.",
    chemin: "Ton chemin de vie est celui de la créativité et de l'expression authentique. Tu es venu apprendre à canaliser ton imaginaire débordant en quelque chose de palpable qui parle aux autres et laisse une trace.",
    expression: "Tu t'exprimes dans le monde par ta créativité, ton charme naturel et ton don pour les mots. L'art, la communication et la création de lien sont tes terrains naturels d'excellence.",
    ame: "Au fond de toi brûle un désir intense de joie, de beauté et d'expression libre. Ce qui te manque le plus quand tu l'as perdu : l'espace de créer sans contrainte et de partager cette création.",
    personnalite: "Tu projettes une énergie chaleureuse, vivante et enthousiaste. On te remarque, on aime être en ta présence — tu apportes une légèreté contagieuse qui rend les moments mémorables."
  },
  4: {
    titre: "Le Bâtisseur",
    force: "Discipline, fiabilité, méthode",
    defi: "Rigidité, résistance au changement, surmenage",
    maitre: false,
    interpretation: "Le 4 est la vibration de la solidité et du travail bien fait — la fondation sur laquelle tout le reste repose. Les personnes portant fortement le 4 sont les architectes silencieux de la société : ils organisent, structurent, et construisent ce qui dure. Leur loyauté et leur fiabilité font d'eux des partenaires et collègues irremplaçables. Le défi spirituel du 4 est d'apprendre à distinguer stabilité et rigidité : les meilleures fondations sont solides, pas figées.",
    chemin: "Ton chemin de vie est celui de la maîtrise par le travail et la structure. Tu es venu apprendre à bâtir quelque chose de durable — en toi d'abord, puis dans le monde — avec patience et méthode.",
    expression: "Tu t'exprimes dans le monde par la compétence, la fiabilité et la méthode irréprochable. On te confie ce qui est important parce que tu le feras bien, jusqu'au bout, sans raccourcis.",
    ame: "Au fond de toi, tu aspires à la stabilité, à la sécurité et à l'accomplissement concret. Ce qui te nourrit profondément, c'est sentir que tu as bâti quelque chose de solide qui résiste au temps.",
    personnalite: "Tu projettes une impression de sérieux et de fiabilité totale. On sait que si tu t'engages, c'est réel — cette réputation d'intégrité est ton actif le plus précieux aux yeux du monde."
  },
  5: {
    titre: "L'Aventurier",
    force: "Liberté, adaptabilité, polyvalence",
    defi: "Instabilité, impulsivité, fuite de l'engagement",
    maitre: false,
    interpretation: "Le 5 explore l'existence à travers ses cinq sens — c'est la vibration du changement, de la curiosité et de la liberté. Les personnes portant fortement le 5 s'ennuient rapidement de la routine et s'épanouissent dans la nouveauté, les voyages et les échanges multiples. Leur intelligence est vive, leur adaptabilité exceptionnelle. Le piège du 5 est de confondre liberté et fuite : la liberté authentique inclut la capacité à s'engager librement, pas seulement à échapper à ce qui contraint.",
    chemin: "Ton chemin de vie est celui de la liberté expérimentée et de la polyvalence assumée. Tu es venu apprendre que la vraie liberté n'est pas l'absence d'engagement mais la capacité de choisir ses engagements en pleine conscience.",
    expression: "Tu t'exprimes dans le monde par ta vivacité d'esprit, ta curiosité et ton aptitude naturelle à communiquer. Le changement est ton élément — tu y navigues avec une aisance qui fascine et inspire.",
    ame: "Au plus profond de toi, tu aspires à une vie sans cages — variée, mouvante, riche d'expériences sensorielles et humaines. Ce qui t'étoufferait le plus : une vie uniforme répétée indéfiniment.",
    personnalite: "Tu projettes une énergie dynamique et vivante, une présence qu'on remarque dans la pièce. On te perçoit comme quelqu'un d'ouvert, d'imprévisible dans le bon sens, jamais ennuyeux."
  },
  6: {
    titre: "Le Nourricier",
    force: "Amour responsable, harmonie, sens artistique",
    defi: "Ingérence, sacrifice excessif, martyrologie",
    maitre: false,
    interpretation: "Le 6 est la vibration de l'amour responsable — non pas l'amour romantique égocentré, mais l'amour qui nourrit, protège et crée les conditions de l'épanouissement des autres. Les personnes portant fortement le 6 ont une vocation naturelle au service : famille, communauté, professions d'aide ou de soin. Leur défi est d'apprendre à offrir cet amour sans contrôle ni condition, et à se laisser nourrir à leur tour — sans quoi leur générosité finit en épuisement silencieux.",
    chemin: "Ton chemin de vie est celui de la responsabilité assumée et de l'amour en actes. Tu es venu apprendre que servir les autres est une force — à condition de te servir aussi toi-même avec la même bienveillance.",
    expression: "Tu t'exprimes dans le monde par le soin, l'harmonie et la création d'environnements où les gens se sentent bien. Ton sens esthétique raffiné et ton amour du beau sont des dons que les autres ressentent.",
    ame: "Au fond de toi, tu aspires à l'harmonie, à la beauté et à des relations où tu peux vraiment nourrir et être nourri. Ce qui te manque le plus quand il est absent : un foyer vibrant d'amour véritable.",
    personnalite: "Tu dégages une chaleur et un sens des responsabilités qui inspirent confiance spontanément. Les gens se sentent protégés et écoutés en ta présence — tu as naturellement une aura de bienveillance concrète."
  },
  7: {
    titre: "Le Chercheur",
    force: "Profondeur analytique, sagesse, discernement",
    defi: "Isolement, méfiance, sécheresse émotionnelle",
    maitre: false,
    interpretation: "Le 7 est le philosophe, le mystique, l'analyste — la vibration qui ne se satisfait jamais de réponses de surface. Les personnes portant fortement le 7 ont une soif de comprendre qui va au-delà du visible : ils cherchent le sens caché, la loi profonde, la vérité nue. Leur charme mystérieux tient à cette profondeur perceptible même sans qu'ils parlent. Le danger du 7 est l'isolement : la sagesse qui reste dans la tour d'ivoire perd sa raison d'être — elle n'a de sens que partagée.",
    chemin: "Ton chemin de vie est celui de la connaissance de soi et de la quête de sens profond. Tu es venu apprendre à unir le monde intérieur et le monde extérieur, la contemplation et l'action concrète.",
    expression: "Tu t'exprimes dans le monde par ta profondeur et ton discernement rare. On vient te voir pour ta perspicacité et ta capacité à voir ce que les autres manquent — tu perçois là où les autres supposent.",
    ame: "Au fond de toi, tu aspires à comprendre — vraiment comprendre, pas juste accumuler des informations. Ce qui te nourrit profondément : la solitude choisie, l'étude approfondie et la connexion spirituelle authentique.",
    personnalite: "Tu projettes une réserve mystérieuse et une profondeur perceptible à ceux qui s'approchent. Les gens sentent qu'il y a beaucoup plus en toi qu'en surface — ce mystère est une part de ton magnétisme naturel."
  },
  8: {
    titre: "Le Réalisateur",
    force: "Ambition, leadership stratégique, sens des affaires",
    defi: "Matérialisme, workaholisme, rigidité émotionnelle",
    maitre: false,
    interpretation: "Le 8 est la vibration de la puissance et de l'abondance — son symbole, l'infini tourné à 90°, illustre le cycle de ce qui est donné et reçu. Les personnes portant fortement le 8 ont une vision stratégique et une capacité à manifester le succès par l'intention soutenue et le travail méthodique. Le 8 ne réussit pas par chance : il bâtit patiemment, décide avec conviction, et assume pleinement ses choix. Son grand travail spirituel : apprendre que la valeur profonde ne se mesure pas à la fortune ou au statut.",
    chemin: "Ton chemin de vie est celui de la maîtrise du monde matériel au service d'une vision plus grande. Tu es venu apprendre l'équilibre entre pouvoir et intégrité, entre réussite ambitieuse et humanité préservée.",
    expression: "Tu t'exprimes dans le monde par ton autorité naturelle et ta capacité à organiser des ressources vers des objectifs ambitieux. Tu incarnes la compétence associée à la détermination — un duo rare.",
    ame: "Au fond de toi, tu aspires à l'accomplissement et à la reconnaissance de ta compétence réelle. Ce n'est pas une vanité — c'est le désir profond de voir ta vision prendre forme concrète dans le monde.",
    personnalite: "Tu projettes une autorité naturelle et une présence de commandement immédiatement perceptible. On sait instinctivement que tu peux gérer la situation — cette confiance que tu inspires est ton capital le plus précieux."
  },
  9: {
    titre: "L'Humaniste",
    force: "Compassion universelle, sagesse, générosité",
    defi: "Idéalisme excessif, désillusion, martyrologie",
    maitre: false,
    interpretation: "Le 9 est la vibration de l'achèvement et de la sagesse gagnée par l'expérience — non pas une fin, mais la clôture d'un cycle qui ouvre le suivant. Les personnes portant fortement le 9 ont un sens inné du bien collectif et une compassion qui ne se limite pas aux proches mais s'étend à l'humanité entière. Leur leçon principale : apprendre à donner sans s'épuiser, à avoir des idéaux sans devenir intransigeants. Un 9 épanoui inspire, pardonne et élève — sans se sacrifier.",
    chemin: "Ton chemin de vie est celui du service universel et de la sagesse gagnée par l'expérience accumulée. Tu es venu apprendre à aimer généreusement, sans attente de retour et sans te perdre toi-même dans le geste.",
    expression: "Tu t'exprimes dans le monde par ta compassion large et ton sens inné de la justice. On te voit comme quelqu'un qui pense au-delà de son intérêt immédiat — cette vision large est ton don le plus précieux.",
    ame: "Au fond de toi, tu aspires à contribuer à quelque chose de plus grand que toi-même. Ce qui te nourrit profondément : sentir que tu as fait une différence, même petite, dans la vie d'un autre être.",
    personnalite: "Tu projettes une chaleur universelle et une sagesse qui n'impose pas ses vues. Les gens sentent que tu les acceptes sans les juger — cette absence de jugement est le plus précieux de tes dons visibles."
  },
  11: {
    titre: "Le Visionnaire",
    force: "Intuition spirituelle, inspiration, sensibilité élevée",
    defi: "Anxiété chronique, idéalisme paralysant, hypersensibilité",
    maitre: true,
    interpretation: "Le 11 est l'antenne la plus fine du spectre numérologique — il capte des impressions et des intuitions avant même que les autres ne les perçoivent. Ce nombre maître porte en lui la vibration du 2 amplifiée à une dimension spirituelle supérieure. Sa grande leçon : passer de la vision à l'action concrète. Les insights les plus brillants ne valent rien s'ils restent dans le cœur. La maturité enseigne aux porteurs du 11 à canaliser leur sensibilité extraordinaire en service authentique et durable.",
    chemin: "Ton chemin de vie porte la double charge d'un nombre maître : une intuition exceptionnelle et la responsabilité de la mettre au service des autres. Ta mission est d'inspirer concrètement, pas seulement de ressentir.",
    expression: "Tu t'exprimes dans le monde par une présence à la fois discrète et magnétique, qui touche les gens sans qu'ils sachent toujours pourquoi. Ta sensibilité est ton outil d'expression le plus puissant.",
    ame: "Au fond de toi brûle un désir de transcendance et de connexion au plan supérieur. Tu aspires à vivre une vie qui a du sens au-delà de l'ordinaire — à être un canal pour quelque chose de plus grand.",
    personnalite: "Tu projettes un charme mystérieux et une profondeur spirituelle immédiatement perceptible. Ceux qui te rencontrent sentent que tu perçois plus que tu ne le montres — ce mystère fait partie de ton magnétisme."
  },
  22: {
    titre: "Le Grand Bâtisseur",
    force: "Réalisation à grande échelle, vision pratique",
    defi: "Perfectionnisme paralysant, pression écrasante du potentiel",
    maitre: true,
    interpretation: "Le 22 est peut-être le nombre maître le plus puissant en termes de potentiel de réalisation. Il combine la vision du 11 avec la solidité du 4, créant un bâtisseur capable d'édifier des structures qui durent des générations. Ce n'est pas un don facile : le 22 porte un sentiment d'obligation parfois écrasant. La maturation du 22 passe par l'acceptation que grand ne signifie pas parfait — les chefs-d'œuvre se construisent brique par brique, dans la durée, sans avoir besoin d'être monumentaux dès le premier essai.",
    chemin: "Ton chemin de vie porte l'ambition d'un bâtisseur de monde. Tu es venu accomplir quelque chose qui dépasse ton bénéfice personnel — une contribution durable à la communauté ou à l'humanité entière.",
    expression: "Tu t'exprimes dans le monde par une combinaison rare de vision large et de compétence pratique concrète. On sait que si tu t'attelles à quelque chose, le résultat sera solide, réfléchi et destiné à durer.",
    ame: "Au fond de toi, tu aspires à laisser quelque chose de grand derrière toi — une organisation, une œuvre, un héritage qui survivra au temps. C'est une ambition spirituelle autant que concrète et matérielle.",
    personnalite: "Tu projettes une stature et une profondeur qui impressionnent avant même que tu ne parles. On te perçoit comme quelqu'un d'important — tu portes naturellement la marque reconnaissable des grands bâtisseurs."
  },
  33: {
    titre: "Le Maître Enseignant",
    force: "Compassion universelle, enseignement par l'être, dévotion",
    defi: "Épuisement par don excessif, difficulté à se recevoir",
    maitre: true,
    interpretation: "Le 33 est le nombre maître le plus rare et le plus exigeant — il ne se manifeste pleinement que chez des individus ayant atteint une maturité spirituelle et émotionnelle élevée. Sa vibration unit la vision du 11, la réalisation du 22 et l'amour du 6 dans une synthèse unique. Le 33 n'enseigne pas en donnant des leçons — sa vie entière est une leçon vivante. Sa compassion n'est pas sentimentale : elle est exigeante, transformatrice et ancrée dans la réalité la plus concrète.",
    chemin: "Ton chemin de vie porte la vocation la plus rare : celle du maître enseignant universel. Tu es venu offrir, au plus haut niveau, un service qui transforme — non par les mots seuls, mais par la façon dont tu vis.",
    expression: "Tu t'exprimes dans le monde par un amour en actes et une capacité à transformer doucement ceux que tu touches. Ta présence a quelque chose d'apaisant et d'élévateur simultanément — un équilibre rare.",
    ame: "Au fond de toi, tu aspires à servir au niveau le plus profond — non par obligation morale, mais parce que l'amour universel est ta nature la plus vraie. Ce désir de transcendance par le service est ta boussole.",
    personnalite: "Tu projettes une douceur et une profondeur qui font se sentir vus et aimés sans condition. Ceux qui te rencontrent ont souvent l'impression de rencontrer quelqu'un d'exceptionnel — une présence rare et lumineuse."
  }
};

// ─── DONNÉES — ANNÉES PERSONNELLES ───────────────────────
const ANNEE_PERSO = {
  1: { theme: "Nouveau Départ", mot: "Initiation",    conseil: "Lance tes projets et affirme ton indépendance. L'énergie du 1 soutient tous les nouveaux commencements — sème maintenant ce que tu récolteras dans le prochain cycle de 9 ans." },
  2: { theme: "Coopération",    mot: "Patience",      conseil: "Nourris tes liens et cultive la patience active. L'année 2 demande d'écouter plus qu'agir — les ponts que tu construis maintenant te porteront bien au-delà de cette année." },
  3: { theme: "Expression",     mot: "Créativité",    conseil: "Crée, exprime-toi et élargis ton cercle de vie. C'est une année de joie et d'expansion sociale — laisse ta créativité s'épanouir sans te censurer inutilement." },
  4: { theme: "Fondation",      mot: "Discipline",    conseil: "Organise, travaille en profondeur et construis les bases solides. Les efforts concrets de l'année 4 sont les fondations invisibles de tout ce qui viendra dans les années suivantes." },
  5: { theme: "Changement",     mot: "Liberté",       conseil: "Embrasse le changement et reste fondamentalement adaptable. Les opportunités de l'année 5 arrivent souvent sans prévenir — sois prêt à saisir ce qui se présente." },
  6: { theme: "Responsabilité", mot: "Harmonie",      conseil: "Honore tes engagements et prends soin de tes relations profondément. L'année 6 te demande d'équilibrer le service aux autres et l'amour inconditionnel de toi-même." },
  7: { theme: "Introspection",  mot: "Profondeur",    conseil: "Retire-toi, étudie et laisse mûrir ce qui est en toi. L'année 7 est une pause nécessaire — ses fruits sont intérieurs mais essentiels pour préparer la récolte à venir." },
  8: { theme: "Récolte",        mot: "Abondance",     conseil: "Vise le succès et gère tes ressources avec sagesse et intégrité. L'énergie du 8 soutient les ambitions concrètes — mais rappelle-toi que le vrai pouvoir est toujours intègre." },
  9: { theme: "Achèvement",     mot: "Lâcher prise",  conseil: "Termine ce qui est inachevé, pardonne et libère ce qui est périmé. L'année 9 clôture un cycle complet — prépare-toi à un nouveau départ en faisant de la place dans tous les domaines." }
};

// ─── UTILITAIRES DE CALCUL ───────────────────────────────
function reduire(n) {
  while (n > 9 && !MAITRES.has(n)) {
    n = String(n).split('').reduce((s, d) => s + parseInt(d), 0);
  }
  return n;
}

function valeurLettre(c) { return PYTH_TABLE[c] || 0; }

function estYVoyelle(mot, i) {
  const prev = i > 0 ? mot[i - 1] : '';
  const next = i < mot.length - 1 ? mot[i + 1] : '';
  return !VOYELLES.has(prev) && !VOYELLES.has(next);
}

function reduireChiffres(n) {
  return String(n).split('').reduce((s, d) => s + parseInt(d), 0);
}

function sommeComplete(mot) {
  return mot.split('').reduce((s, c) => s + (valeurLettre(c) || 0), 0);
}

function sommeVoyelles(mot) {
  return mot.split('').reduce((s, c, i) => {
    const v = VOYELLES.has(c) || (c === 'Y' && estYVoyelle(mot, i));
    return s + (v ? valeurLettre(c) : 0);
  }, 0);
}

function sommeConsonnes(mot) {
  return mot.split('').reduce((s, c, i) => {
    const v = VOYELLES.has(c) || (c === 'Y' && estYVoyelle(mot, i));
    return s + (!v && /[A-Z]/.test(c) ? valeurLettre(c) : 0);
  }, 0);
}

function preparerMots(prenom, nom) {
  return (prenom + ' ' + nom).trim().split(/\s+/).map(w =>
    w.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, '')
  ).filter(w => w.length > 0);
}

// ─── CALCULS PRINCIPAUX ──────────────────────────────────
function cheminDeVie(j, m, a) {
  const rm = reduire(reduireChiffres(m));
  const rj = reduire(reduireChiffres(j));
  const ra = reduire(reduireChiffres(a));
  const somme = rm + rj + ra;
  return { val: reduire(somme), rm, rj, ra, somme, moisRaw: m, jourRaw: j, anneeRaw: a };
}

function nombreNom(mots, fnSomme) {
  const partiels = mots.map(m => ({ mot: m, valBrute: fnSomme(m), val: reduire(fnSomme(m)) }));
  const somme = partiels.reduce((s, p) => s + p.val, 0);
  return { val: reduire(somme), partiels, somme };
}

function anneePersonnelle(j, m, anneeActuelle) {
  const rj = reduire(reduireChiffres(j));
  const rm = reduire(reduireChiffres(m));
  const ra = reduire(reduireChiffres(anneeActuelle));
  const somme = rj + rm + ra;
  let val = reduire(somme);
  if (MAITRES.has(val)) val = reduire(val);
  if (val > 9) val = reduire(val);
  return { val, rj, rm, ra, somme, annee: anneeActuelle };
}

// ─── CONSTRUCTION HTML ───────────────────────────────────
function colorClass(role) {
  const map = { chemin: 'emerald', expression: 'violet', ame: 'rose', personnalite: 'cyan' };
  return map[role] || 'gold';
}

function buildFormule(r) {
  const cdv = r.cheminDetail;
  const expr = r.expressionDetail;
  const ame = r.ameDetail;
  const perso = r.personnaliteDetail;

  const motPartiels = (partiels, couleur) =>
    partiels.map((p, i) =>
      `${i > 0 ? '<span class="pf-op">+</span>' : ''}
      <span class="pf-box cf-bg-${couleur}"><span class="pf-wname">${p.mot}</span><span class="pf-wval">${p.val}</span></span>`
    ).join('');

  return `
  <div class="pyth-formule">
    <div class="pf-row">
      <span class="pf-lbl">Chemin de vie</span>
      <div class="pf-calc">
        <span class="pf-box cf-bg-violet"><span class="pf-wname">mois</span><span class="pf-wval">${cdv.rm}</span></span>
        <span class="pf-op">+</span>
        <span class="pf-box cf-bg-emerald"><span class="pf-wname">jour</span><span class="pf-wval">${cdv.rj}</span></span>
        <span class="pf-op">+</span>
        <span class="pf-box cf-bg-cyan"><span class="pf-wname">année</span><span class="pf-wval">${cdv.ra}</span></span>
        <span class="pf-op">=</span>
        <span class="pf-sum">${cdv.somme}</span>
        <span class="pf-arrow">→</span>
        <span class="pf-res cf-emerald"><strong>${r.chemin}</strong></span>
      </div>
    </div>
    <div class="pf-row">
      <span class="pf-lbl">Expression</span>
      <div class="pf-calc">
        ${motPartiels(expr.partiels, 'violet')}
        <span class="pf-op">=</span>
        <span class="pf-sum">${expr.somme}</span>
        <span class="pf-arrow">→</span>
        <span class="pf-res cf-violet"><strong>${r.expression}</strong></span>
      </div>
    </div>
    <div class="pf-row">
      <span class="pf-lbl">Désir de l'Âme</span>
      <div class="pf-calc">
        ${ame.partiels.map((p, i) =>
          `${i > 0 ? '<span class="pf-op">+</span>' : ''}
          <span class="pf-box cf-bg-rose"><span class="pf-wname">${p.mot}</span><span class="pf-wval">${p.val}</span></span>`
        ).join('')}
        <span class="pf-op">=</span>
        <span class="pf-sum">${ame.somme}</span>
        <span class="pf-arrow">→</span>
        <span class="pf-res cf-rose"><strong>${r.ame}</strong></span>
      </div>
    </div>
    <div class="pf-row">
      <span class="pf-lbl">Personnalité</span>
      <div class="pf-calc">
        ${perso.partiels.map((p, i) =>
          `${i > 0 ? '<span class="pf-op">+</span>' : ''}
          <span class="pf-box cf-bg-cyan"><span class="pf-wname">${p.mot}</span><span class="pf-wval">${p.val}</span></span>`
        ).join('')}
        <span class="pf-op">=</span>
        <span class="pf-sum">${perso.somme}</span>
        <span class="pf-arrow">→</span>
        <span class="pf-res cf-cyan"><strong>${r.personnalite}</strong></span>
      </div>
    </div>
  </div>`;
}

function buildCoreGrid(r) {
  const cores = [
    { role: 'chemin',       label: "Chemin de Vie",       val: r.chemin,       note: "Ta mission et ton apprentissage" },
    { role: 'expression',   label: "Nombre d'Expression", val: r.expression,   note: "Comment tu te manifestes" },
    { role: 'ame',          label: "Désir de l'Âme",      val: r.ame,          note: "Ce qui te motive en profondeur" },
    { role: 'personnalite', label: "Personnalité",         val: r.personnalite, note: "L'image que tu projettes" },
  ];
  return cores.map(c => {
    const nb = NOMBRES[c.val] || {};
    const col = colorClass(c.role);
    return `
    <div class="core-card cp-${c.role}">
      <div class="core-num cf-${col}">${c.val}${nb.maitre ? '<sup class="maitre-sup">✦</sup>' : ''}</div>
      <div class="core-label">${c.label}</div>
      <div class="core-titre">${nb.titre || ''}</div>
      <div class="core-note">${c.note}</div>
    </div>`;
  }).join('');
}

function buildAnneePerso(r) {
  const ap = ANNEE_PERSO[r.anneePerso] || {};
  return `
  <div class="pa-card">
    <div class="pa-left">
      <div class="pa-num cf-gold">${r.anneePerso}</div>
      <div class="pa-year-label">Année Personnelle ${r.anneeDetail.annee}</div>
    </div>
    <div class="pa-right">
      <div class="pa-theme cf-gold">${ap.theme || ''} <span class="pa-mot">— ${ap.mot || ''}</span></div>
      <p class="pa-conseil">${ap.conseil || ''}</p>
    </div>
  </div>`;
}

function buildDetails(r) {
  const cards = [
    { role: 'chemin',       label: "Chemin de Vie",       val: r.chemin,       note: "Ta mission de vie et ton apprentissage central" },
    { role: 'expression',   label: "Nombre d'Expression", val: r.expression,   note: "Comment tu te manifestes et incarnes ta nature" },
    { role: 'ame',          label: "Désir de l'Âme",      val: r.ame,          note: "Ce qui te motive en profondeur — ton moteur caché" },
    { role: 'personnalite', label: "Personnalité",         val: r.personnalite, note: "L'image que tu projettes au monde extérieur" },
  ];
  return cards.map(c => {
    const nb = NOMBRES[c.val] || {};
    const col = colorClass(c.role);
    return `
    <div class="pd-card pd-${c.role}">
      <div class="pd-header">
        <div class="pd-num cf-${col}">${c.val}${nb.maitre ? '<sup class="maitre-sup">✦</sup>' : ''}</div>
        <div class="pd-info">
          <h4 class="pd-titre cf-${col}">${c.label} — ${nb.titre || ''}</h4>
          <p class="pd-note">${c.note}</p>
        </div>
      </div>
      <div class="pd-keys">
        <span class="pd-key pd-force">✦ ${nb.force || ''}</span>
        <span class="pd-key pd-defi">◈ ${nb.defi || ''}</span>
      </div>
      <p class="pd-interp">${nb.interpretation || ''}</p>
      <div class="pd-role-box pd-role-${c.role}">
        <p>${nb[c.role] || ''}</p>
      </div>
    </div>`;
  }).join('');
}

function afficherResultats(r) {
  document.getElementById('pythFormule').innerHTML = buildFormule(r);
  document.getElementById('pythCoreGrid').innerHTML = buildCoreGrid(r);
  document.getElementById('pythAnneePerso').innerHTML = buildAnneePerso(r);
  document.getElementById('pythDetails').innerHTML = buildDetails(r);

  const section = document.getElementById('pythResultats');
  section.hidden = false;
  setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}

// ─── GRILLE DES NOMBRES ──────────────────────────────────
function buildNombresGrid() {
  const grid = document.getElementById('pythNombresGrid');
  if (!grid) return;

  const ordre = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
  const html = ordre.map(num => {
    const n = NOMBRES[num];
    return `
    <div class="archetype-card c-${num}" role="button" tabindex="0"
         aria-label="Nombre ${num} — ${n.titre}"
         data-interp="${n.interpretation.replace(/"/g, '&quot;')}">
      <div class="card-inner">
        <div class="card-front">
          <div class="num-circle">${num}</div>
          <div class="force">${n.titre}</div>
          <div class="faiblesse">${n.force}</div>
          ${n.maitre ? '<div class="master-badge">Nombre Maître</div>' : '<div class="flip-hint">↻ Voir l\'ombre</div>'}
          ${n.maitre ? '<div class="flip-hint">↻ Voir l\'ombre</div>' : ''}
        </div>
        <div class="card-back">
          <p>${n.interpretation.slice(0, 240)}…</p>
        </div>
      </div>
    </div>`;
  }).join('');
  grid.innerHTML = html;

  let activeTooltip = null;
  grid.querySelectorAll('.archetype-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
    });
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('flipped')) return;
      if (activeTooltip) { activeTooltip.remove(); activeTooltip = null; }
      const text = card.dataset.interp;
      if (!text) return;
      const tooltip = document.createElement('div');
      tooltip.className = 'arch-tooltip';
      tooltip.textContent = text;
      document.body.appendChild(tooltip);
      activeTooltip = tooltip;
      const rect = card.getBoundingClientRect();
      const tw = 460;
      let left = rect.left + rect.width / 2 - tw / 2;
      if (left < 10) left = 10;
      if (left + tw > window.innerWidth - 10) left = window.innerWidth - tw - 10;
      tooltip.style.position = 'fixed';
      tooltip.style.left = left + 'px';
      tooltip.style.top = '-9999px';
      requestAnimationFrame(() => {
        const th = tooltip.offsetHeight;
        let top = rect.bottom + 10;
        if (top + th > window.innerHeight - 10) top = rect.top - th - 10;
        if (top < 10) top = 10;
        tooltip.style.top = top + 'px';
      });
    });
    card.addEventListener('mouseleave', () => {
      if (activeTooltip) { activeTooltip.remove(); activeTooltip = null; }
    });
  });
}

// ─── VALIDATION ──────────────────────────────────────────
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

function valider(j, m, a, prenom, nom) {
  if (!j || !m || !a || j < 1 || j > 31 || m < 1 || m > 12 || a < 1900 || a > 2100)
    return 'Date de naissance invalide.';
  if (!prenom.trim()) return 'Merci d\'entrer au moins un prénom.';
  if (!nom.trim()) return 'Merci d\'entrer votre nom de famille.';
  return null;
}

// ─── ÉVÉNEMENTS ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildNombresGrid();

  const form = document.getElementById('pyth-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const j      = parseInt(document.getElementById('pyth-jour').value);
    const m      = parseInt(document.getElementById('pyth-mois').value);
    const a      = parseInt(document.getElementById('pyth-annee').value);
    const prenom = document.getElementById('pyth-prenom').value.trim();
    const nom    = document.getElementById('pyth-nom').value.trim();

    const err = valider(j, m, a, prenom, nom);
    if (err) { showToast(err); return; }

    const mots    = preparerMots(prenom, nom);
    const cdv     = cheminDeVie(j, m, a);
    const expr    = nombreNom(mots, sommeComplete);
    const ame     = nombreNom(mots, sommeVoyelles);
    const perso   = nombreNom(mots, sommeConsonnes);
    const ap      = anneePersonnelle(j, m, new Date().getFullYear());

    afficherResultats({
      chemin: cdv.val,      cheminDetail: cdv,
      expression: expr.val, expressionDetail: expr,
      ame: ame.val,         ameDetail: ame,
      personnalite: perso.val, personnaliteDetail: perso,
      anneePerso: ap.val,   anneeDetail: ap,
      prenom, nom, mots
    });
  });

  document.getElementById('pyth-exemple').addEventListener('click', () => {
    document.getElementById('pyth-jour').value   = '15';
    document.getElementById('pyth-mois').value  = '11';
    document.getElementById('pyth-annee').value = '1990';
    document.getElementById('pyth-prenom').value = 'Marie Claire';
    document.getElementById('pyth-nom').value    = 'Dupont';
    form.dispatchEvent(new Event('submit'));
  });
});
