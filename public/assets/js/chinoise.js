// ═══════════════════════════════════════════════════════════
// NUMÉROLOGIE CHINOISE — Calculateur enrichi
// Sources : Ba Zhai, Wu Xing, Nine Star Ki, Lo Shu numerology,
// Chao-Hsiu Chen, Lillian Too, Stephen Skinner, Joey Yap,
// Derek Walters, MTC (organes / heures), tradition taoïste
// ═══════════════════════════════════════════════════════════

// ─── LES 5 ÉLÉMENTS ─────────────────────────────────────
const ELEMENTS = {
  Eau:   { var: 'cyan',    zh: '水', yin_yang: 'Yin',    saison: 'Hiver',        cycle: 'génère le Bois' },
  Bois:  { var: 'emerald', zh: '木', yin_yang: 'Yang',   saison: 'Printemps',    cycle: 'génère le Feu' },
  Feu:   { var: 'rose',    zh: '火', yin_yang: 'Yang',   saison: 'Été',          cycle: 'génère la Terre' },
  Terre: { var: 'gold',    zh: '土', yin_yang: 'Neutre', saison: 'Inter-saisons',cycle: 'génère le Métal' },
  Métal: { var: 'violet',  zh: '金', yin_yang: 'Yin',    saison: 'Automne',      cycle: 'génère l\'Eau' }
};

// ─── LES 9 CASES DU LO SHU ───────────────────────────────
const LO_SHU = {
  1: {
    element:'Eau', trigram:'☵', trigram_nom:'Kan', direction:'Nord', zh:'一',
    domaine:'Carrière & Destinée',
    force:'Sagesse intuitive, détermination, sens du destin',
    absence:'Manque de direction de vie, hésitations chroniques, peur de l\'échec professionnel',
    surplus:'Obsession du contrôle, rigidité, tendance à l\'isolement',
    theme_absence:'Identité & Assertivité',
    lecon_absence:'Développer une identité stable indépendante des regards. Apprendre à dire "je", à se positionner, à diriger sans chercher l\'approbation.',
    surplus_2x:'Bonne capacité de communication, leadership naturel.',
    surplus_3x:'Personnalité très affirmée, parfois dans sa tête — difficulté à écouter vraiment.',
    surplus_4x:'Tension entre besoin d\'expression et capacité à le faire. Agitation intérieure, âme souvent incomprise.'
  },
  2: {
    element:'Terre', trigram:'☷', trigram_nom:'Kun', direction:'Sud-Ouest', zh:'二',
    domaine:'Relations & Maternité',
    force:'Empathie profonde, coopération, sens du soin',
    absence:'Difficultés relationnelles, isolement affectif, timidité excessive',
    surplus:'Dépendance émotionnelle, sacrifice de soi, manque de limites',
    theme_absence:'Intuition & Sensibilité',
    lecon_absence:'Développer l\'intelligence émotionnelle, écouter l\'intuition corporelle, cultiver l\'empathie sans sur-analyser.',
    surplus_2x:'Intuition très fine, excellent jugement des situations.',
    surplus_3x:'Hypersensibilité émotionnelle — peut être submergé par les humeurs des autres.',
    surplus_4x:'Absorption incontrôlée des émotions environnantes, instabilité, besoin urgent d\'apprendre le détachement.'
  },
  3: {
    element:'Bois', trigram:'☳', trigram_nom:'Zhen', direction:'Est', zh:'三',
    domaine:'Santé & Famille',
    force:'Vitalité, ambition juste, sens de la famille',
    absence:'Fragilité physique, tensions familiales récurrentes, impatience',
    surplus:'Impulsivité, colère vive, difficultés face à l\'autorité',
    theme_absence:'Expression & Créativité',
    lecon_absence:'Libérer la parole et la créativité. Pratiquer une forme d\'expression (art, écriture, musique), cesser de minimiser ses idées.',
    surplus_2x:'Forte créativité et sens artistique.',
    surplus_3x:'Imagination débordante, storytelling naturel — parfois déconnecté du réel.',
    surplus_4x:'Hyperactivité imaginative, difficulté à distinguer rêve et réalité, dispersion chronique.'
  },
  4: {
    element:'Bois', trigram:'☴', trigram_nom:'Xun', direction:'Sud-Est', zh:'四',
    domaine:'Fortune & Prospérité',
    force:'Créativité, sens des opportunités, chance matérielle',
    absence:'Difficultés financières, manque de persévérance, procrastination',
    surplus:'Matérialisme, anxiété autour de l\'argent, peur de manquer',
    theme_absence:'Organisation & Ancrage',
    lecon_absence:'Cultiver la discipline, créer des routines stables, respecter les délais. Ancrer les projets dans le concret.',
    surplus_2x:'Solide sens pratique, travailleur fiable.',
    surplus_3x:'Discipline rigide, perfectionnisme opérationnel.',
    surplus_4x:'Rigidité, résistance aux changements, difficulté à improviser ou s\'adapter.'
  },
  5: {
    element:'Terre', trigram:'◎', trigram_nom:'Wu Ji', direction:'Centre', zh:'五',
    domaine:'Équilibre & Unité',
    force:'Adaptabilité, charisme naturel, capacité à rassembler',
    absence:'Instabilité intérieure, manque d\'ancrage, tendance aux extrêmes',
    surplus:'Imprévisibilité, besoin de tout contrôler, difficulté à se fixer',
    theme_absence:'Adaptabilité & Liberté',
    lecon_absence:'C\'est l\'absence la plus significative — le 5 est le cœur de la grille. Accepter le changement comme condition naturelle, développer la flexibilité intérieure.',
    surplus_2x:'Grande adaptabilité, polyvalence naturelle.',
    surplus_3x:'Éparpillement — trop de directions simultanées, difficulté à se fixer.',
    surplus_4x:'Instabilité chronique, besoin compulsif de changement, difficulté à s\'engager dans la durée.'
  },
  6: {
    element:'Métal', trigram:'☰', trigram_nom:'Qian', direction:'Nord-Ouest', zh:'六',
    domaine:'Bienfaiteurs & Voyages',
    force:'Leadership organisé, protection divine, sens des responsabilités',
    absence:'Manque de soutien extérieur, difficulté à déléguer ou demander de l\'aide',
    surplus:'Autoritarisme, perfectionnisme paralysant, contrôle excessif',
    theme_absence:'Amour & Responsabilité',
    lecon_absence:'Apprendre à donner et recevoir l\'amour sans conditions, assumer les responsabilités relationnelles, cultiver la beauté et l\'harmonie.',
    surplus_2x:'Sens aigu des responsabilités familiales, généreux.',
    surplus_3x:'Tendance à se sacrifier — martyr du foyer ou de la famille.',
    surplus_4x:'Fusion excessive avec le groupe, perte d\'identité propre, co-dépendance.'
  },
  7: {
    element:'Métal', trigram:'☱', trigram_nom:'Dui', direction:'Ouest', zh:'七',
    domaine:'Créativité & Expression',
    force:'Éloquence, joie communicative, sens artistique',
    absence:'Blocages créatifs, difficulté à s\'exprimer, manque de spontanéité',
    surplus:'Bavardage, légèreté excessive, facilité à se disperser',
    theme_absence:'Introspection & Spiritualité',
    lecon_absence:'Apprivoiser le silence intérieur, développer une pratique contemplative, accepter que les périodes de retrait ont leur valeur.',
    surplus_2x:'Profondeur spirituelle, sens de l\'analyse.',
    surplus_3x:'Tendance à l\'isolement, hyper-intériorité, difficultés relationnelles.',
    surplus_4x:'Retrait du monde, désintérêt pour le matériel pouvant mener à une incapacité à fonctionner dans le quotidien.'
  },
  8: {
    element:'Terre', trigram:'☶', trigram_nom:'Gen', direction:'Nord-Est', zh:'八',
    domaine:'Connaissance & Sagesse',
    force:'Persévérance, profondeur intellectuelle, amour de l\'apprentissage',
    absence:'Manque de discipline, superficialité, tendance à abandonner les projets',
    surplus:'Rigidité intellectuelle, refus du changement, isolation dans ses certitudes',
    theme_absence:'Réalisation matérielle & Autorité',
    lecon_absence:'Développer la planification à long terme, apprendre à valoriser son travail concrètement, assumer des positions de responsabilité sans les fuir.',
    surplus_2x:'Ambition matérielle saine, bon sens financier.',
    surplus_3x:'Obstination, attachement excessif au statut ou à la sécurité.',
    surplus_4x:'Matérialisme compulsif, ou à l\'inverse rejet total du matériel par réaction.'
  },
  9: {
    element:'Feu', trigram:'☲', trigram_nom:'Li', direction:'Sud', zh:'九',
    domaine:'Renommée & Rayonnement',
    force:'Passion, vision claire, capacité d\'illuminer les autres',
    absence:'Besoin de reconnaissance non satisfait, manque de visibilité, sentiment d\'invisibilité',
    surplus:'Ego surdimensionné, impulsivité, risque de burnout émotionnel',
    theme_absence:'Idéalisme & Vision',
    lecon_absence:'Développer une vision universelle, contribuer à quelque chose de plus grand que soi, cultiver la sagesse pratique et l\'ambition idéaliste.',
    surplus_2x:'Sagesse et vision humaniste.',
    surplus_3x:'Idéalisme intense, tendance à des objectifs difficiles à atteindre.',
    surplus_4x:'Décalage entre idéaux et réalité, lourdeur émotionnelle liée au poids du monde perçu, risque de dogmatisme.'
  }
};

// ─── FLÈCHES DU LO SHU ───────────────────────────────────
const FLECHES = [
  { cases:[4,9,2], axe:'Plan Mental (ligne haute)',
    force:'Flèche de l\'Intellect',
    forceDesc:'Esprit analytique puissant, mémoire exceptionnelle, sens de la planification à long terme. Don pour la recherche et les études.',
    faiblesse:'Flèche de la Mémoire Déficiente',
    faiblesseDesc:'Défi mnémonique chronique s\'accentuant avec l\'âge. La personne doit compenser par des outils externes : notes, routines, cartes mentales.' },
  { cases:[3,5,7], axe:'Plan Émotionnel (ligne médiane)',
    force:'Flèche de la Compassion',
    forceDesc:'Foi profonde, équilibre émotionnel, empathie naturelle. Don pour les métiers d\'aide, la psychologie, la spiritualité.',
    faiblesse:'Flèche de l\'Hypersensibilité',
    faiblesseDesc:'Vulnérabilité émotionnelle, timidité, difficulté à exprimer les émotions sans être submergé. Tendance au refoulement.' },
  { cases:[8,1,6], axe:'Plan Pratique (ligne basse)',
    force:'Flèche de la Praticité',
    forceDesc:'Ancrage dans la réalité, sens des responsabilités, aptitude à concrétiser les projets. Réussite dans les métiers de terrain.',
    faiblesse:'Flèche du Rêveur',
    faiblesseDesc:'Tendance à vivre dans l\'abstraction, difficulté à passer à l\'action et à terminer ce qui est commencé.' },
  { cases:[4,3,8], axe:'Plan de la Volonté (colonne gauche)',
    force:'Flèche de la Détermination',
    forceDesc:'Persévérance à toute épreuve, ambition méthodique, caractère inébranlable face aux obstacles. Ne lâchent jamais un objectif.',
    faiblesse:'Flèche de la Résignation',
    faiblesseDesc:'Manque de motivation profonde, passivité, tendance à abandonner face aux difficultés. Leçon : trouver un but qui mobilise.' },
  { cases:[9,5,1], axe:'Plan de la Sensibilité (colonne centrale)',
    force:'Flèche de la Sensibilité',
    forceDesc:'Intuition développée, dynamisme intérieur, don naturel pour la communication et les relations humaines.',
    faiblesse:'Flèche de la Solitude',
    faiblesseDesc:'Difficulté à s\'ouvrir aux autres, sentiment chronique d\'isolement, manque de chaleur émotionnelle perçue par l\'entourage.' },
  { cases:[2,7,6], axe:'Plan Spirituel (colonne droite)',
    force:'Flèche de la Spiritualité',
    forceDesc:'Foi naturelle, conscience spirituelle élevée, sérénité face aux épreuves. Sens profond de l\'existence.',
    faiblesse:'Flèche du Scepticisme',
    faiblesseDesc:'Difficulté à croire en quelque chose de plus grand que soi. Tendance au cynisme, hyper-rationalisme ou vide existentiel.' },
  { cases:[4,5,6], axe:'Diagonale principale',
    force:'Flèche de la Persévérance',
    forceDesc:'Capacité à surmonter les frustrations et obstacles. Ténacité forgée par l\'épreuve — ces personnes deviennent plus fortes après chaque difficulté.',
    faiblesse:'Flèche de la Frustration',
    faiblesseDesc:'Obstacles récurrents semblant inexplicables, attentes chroniquement déçues. Leçon : lâcher le perfectionnisme, accepter l\'imperfection du réel.' },
  { cases:[2,5,8], axe:'Diagonale secondaire',
    force:'Flèche de l\'Équilibre',
    forceDesc:'Équilibre naturel entre raison et émotion. Médiateurs fiables, capables de prises de décision mesurées et justes.',
    faiblesse:'Flèche de l\'Hésitation',
    faiblesseDesc:'Indécision chronique, peur de se tromper paralysant l\'action, dépendance à l\'avis extérieur. Leçon : faire confiance à son propre jugement.' }
];

// ─── DONNÉES KUA (1–9, sans 5) ───────────────────────────
const KUA_DATA = {
  1: {
    groupe:'Est', element:'Eau', trigram:'☵', trigram_nom:'Kan', direction:'Nord',
    dirs_fav:['Sud','Est','Sud-Est','Nord'],
    dirs_defav:{ huoHai:'Ouest', wuGui:'Nord-Est', liuSha:'Nord-Ouest', jueMing:'Sud-Ouest' },
    couleurs:['Bleu nuit','Noir','Bleu marine','Gris ardoise'],
    couleurs_eviter:['Ocre','Jaune','Brun'],
    professions:['Communication','Médias','Psychologie','Logistique','Santé','Enseignement'],
    compatibles:[3,4], tension:[2,5,8],
    force:'Leadership intuitif, profondeur émotionnelle, sagesse',
    defi:'La peur comme moteur de décision — isolement, rétention, difficulté à poser des limites claires.',
    saison:'Hiver', heure:'23h–1h (Heure du Rat)',
    interp:'Le Kua 1 est gouverné par l\'Eau et le trigramme Kan — l\'Abîme. Ces personnes possèdent une profondeur intuitive et un magnétisme discret qui attirent naturellement les autres. Leur parcours est souvent jalonné de passages sombres qui forgent une sagesse hors du commun. Ils excellent dans les métiers de conseil, d\'enseignement et de médiation. Leur direction d\'activation est le Sud (Feu) : cette opposition Eau-Feu est la source de leur plus grand rayonnement.'
  },
  2: {
    groupe:'Ouest', element:'Terre', trigram:'☷', trigram_nom:'Kun', direction:'Sud-Ouest',
    dirs_fav:['Nord-Ouest','Nord-Est','Ouest','Sud-Ouest'],
    dirs_defav:{ huoHai:'Est', wuGui:'Sud-Est', liuSha:'Sud', jueMing:'Nord' },
    couleurs:['Ocre','Jaune doré','Beige','Terracotta','Rose poudré'],
    couleurs_eviter:['Vert vif','Bleu-vert'],
    professions:['Soin','Éducation','Immobilier','Nutrition','Travail social','Hôtellerie'],
    compatibles:[8,6,7], tension:[3,4],
    force:'Douceur, sens du soin, patience infinie',
    defi:'L\'hyperdépendance et le sacrifice de soi — effacement de la personnalité propre, jalousie silencieuse, résistance passive au changement.',
    saison:'Fin d\'été (intersaison)', heure:'13h–15h (Heure du Mouton)',
    interp:'Le Kua 2 est gouverné par la Terre et le trigramme Kun — la Réceptivité. Ces personnes incarnent la douceur, la patience et l\'art de nourrir les autres. Elles savent créer des environnements sécurisants où chacun peut se déposer. Leur force n\'est pas dans l\'action directe mais dans la constance et la fidélité. Elles s\'épanouissent dans les professions de soin, d\'éducation et de gestion de communautés.'
  },
  3: {
    groupe:'Est', element:'Bois', trigram:'☳', trigram_nom:'Zhen', direction:'Est',
    dirs_fav:['Sud','Nord','Sud-Est','Est'],
    dirs_defav:{ huoHai:'Sud-Ouest', wuGui:'Nord-Ouest', liuSha:'Nord-Est', jueMing:'Ouest' },
    couleurs:['Vert vif','Vert émeraude','Bleu-vert','Turquoise'],
    couleurs_eviter:['Blanc','Argent','Gris clair'],
    professions:['Entrepreneuriat','Design','Enseignement','Droit','Sport','Journalisme'],
    compatibles:[1,4,9], tension:[6,7],
    force:'Élan vital, ambition, pionnier',
    defi:'L\'impulsivité et l\'impatience structurelle — tendance à lancer sans terminer. La colère est l\'émotion du Bois : gérer les réactions vives.',
    saison:'Printemps', heure:'5h–7h (Heure du Dragon)',
    interp:'Le Kua 3 est gouverné par le Bois et le trigramme Zhen — le Tonnerre. C\'est la vibration du mouvement, du commencement et de l\'ambition juste. Ces personnes ont une énergie pionnière : elles lancent, initient, ouvrent des voies. Leur défi est d\'apprendre à tenir dans la durée ce qu\'elles ont initié avec enthousiasme. Les arts, le sport, l\'entrepreneuriat et tout ce qui demande de l\'élan leur conviennent naturellement.'
  },
  4: {
    groupe:'Est', element:'Bois', trigram:'☴', trigram_nom:'Xun', direction:'Sud-Est',
    dirs_fav:['Nord','Sud','Est','Sud-Est'],
    dirs_defav:{ huoHai:'Nord-Est', wuGui:'Ouest', liuSha:'Sud-Ouest', jueMing:'Nord-Ouest' },
    couleurs:['Vert doux','Bleu-vert aqua','Vert sauge','Violet'],
    couleurs_eviter:['Blanc cassé','Argent mat'],
    professions:['Édition','Diplomatie','Communication','Stylisme','Herboristerie','Enseignement'],
    compatibles:[1,3,9], tension:[6,7],
    force:'Sens des opportunités, créativité, fortune',
    defi:'L\'indécision et la dispersion — inconstance, manque d\'ancrage, procrastination par perfectionnisme. Sensibilité excessive aux opinions extérieures.',
    saison:'Printemps tardif (mai)', heure:'7h–9h (Heure du Serpent)',
    interp:'Le Kua 4 est gouverné par le Bois doux et le trigramme Xun — le Vent. Ces personnes ont un flair naturel pour les opportunités et une capacité à se glisser dans les espaces favorables sans heurter les résistances. Comme le vent qui contourne les obstacles plutôt que de les affronter, elles naviguent avec intelligence. Leur domaine de prédilection : le commerce, la négociation, l\'art et tout ce qui demande finesse et adaptabilité.'
  },
  6: {
    groupe:'Ouest', element:'Métal', trigram:'☰', trigram_nom:'Qian', direction:'Nord-Ouest',
    dirs_fav:['Ouest','Nord-Est','Sud-Ouest','Nord-Ouest'],
    dirs_defav:{ huoHai:'Sud-Est', wuGui:'Est', liuSha:'Nord', jueMing:'Sud' },
    couleurs:['Argent','Gris acier','Blanc','Or pâle'],
    couleurs_eviter:['Rouge vif','Orange'],
    professions:['Leadership','Droit','Armée','Finance','Ingénierie','Chirurgie'],
    compatibles:[2,7,8], tension:[9],
    force:'Autorité naturelle, organisation, sens des responsabilités',
    defi:'L\'autoritarisme et la rigidité hiérarchique — difficulté à déléguer, micromanagement, refus de la remise en question.',
    saison:'Automne', heure:'19h–21h (Heure du Chien)',
    interp:'Le Kua 6 est gouverné par le Métal pur et le trigramme Qian — le Ciel. C\'est la vibration du dirigeant né, de celui qui porte naturellement des responsabilités collectives. Ces personnes inspirent confiance et respect par leur intégrité et leur sens de l\'organisation. Elles sont souvent appelées à gérer, à décider, à représenter. Leur défi : apprendre à déléguer et à lâcher le contrôle quand la situation l\'exige.'
  },
  7: {
    groupe:'Ouest', element:'Métal', trigram:'☱', trigram_nom:'Dui', direction:'Ouest',
    dirs_fav:['Nord-Ouest','Nord-Est','Sud-Ouest','Ouest'],
    dirs_defav:{ huoHai:'Nord', wuGui:'Sud', liuSha:'Est', jueMing:'Sud-Est' },
    couleurs:['Blanc pur','Or pâle','Ivoire','Cuivre rosé'],
    couleurs_eviter:['Rouge vif','Bordeaux intense'],
    professions:['Négociation','Finance','Gastronomie','Communication','Coaching','Beauté'],
    compatibles:[2,6,8], tension:[9],
    force:'Expression, joie de vivre, charme',
    defi:'La superficialité séduisante et la parole blessante — charme de façade masquant une fragilité, cynisme, utilisation de l\'humour pour éviter la profondeur.',
    saison:'Automne (octobre)', heure:'17h–19h (Heure du Coq)',
    interp:'Le Kua 7 est gouverné par le Métal doux et le trigramme Dui — le Lac. C\'est la vibration de la joie partagée, de l\'éloquence et de la beauté. Ces personnes ont un charme naturel et une facilité à communiquer qui leur ouvrent les portes. Elles excellent dans l\'expression artistique, la parole publique et toutes les formes de création. Leur défi : ne pas se laisser emporter par la légèreté au détriment de la profondeur.'
  },
  8: {
    groupe:'Ouest', element:'Terre', trigram:'☶', trigram_nom:'Gen', direction:'Nord-Est',
    dirs_fav:['Sud-Ouest','Nord-Ouest','Ouest','Nord-Est'],
    dirs_defav:{ huoHai:'Sud', wuGui:'Nord', liuSha:'Sud-Est', jueMing:'Est' },
    couleurs:['Ocre','Brun-rouge','Bleu ardoise','Terracotta'],
    couleurs_eviter:['Vert profond','Bleu pétrole'],
    professions:['Recherche','Philosophie','Archéologie','Histoire','Banque','Méditation'],
    compatibles:[2,6,7], tension:[3,4],
    force:'Persévérance, sagesse accumulée, intégrité',
    defi:'L\'immobilisme et la résistance au mouvement — entêtement pathologique, accumulation (objets, rancœurs), orgueil intellectuel.',
    saison:'Fin d\'hiver / début printemps', heure:'1h–3h (Heure du Bœuf)',
    interp:'Le Kua 8 est gouverné par la Terre immobile et le trigramme Gen — la Montagne. Ces personnes incarnent la persévérance, la profondeur et la capacité à tenir bon quand tout vacille. Elles apprennent lentement mais retiennent définitivement. Leur sagesse s\'acquiert dans le silence et la patience. Elles excellent dans les métiers qui demandent de la rigueur, de la durée et de la discrétion : recherche, gestion de patrimoine, artisanat de haute précision.'
  },
  9: {
    groupe:'Est', element:'Feu', trigram:'☲', trigram_nom:'Li', direction:'Sud',
    dirs_fav:['Est','Sud-Est','Nord','Sud'],
    dirs_defav:{ huoHai:'Nord-Est', wuGui:'Ouest', liuSha:'Sud-Ouest', jueMing:'Nord-Ouest' },
    couleurs:['Rouge','Orange','Corail','Violet vif'],
    couleurs_eviter:['Noir','Bleu nuit intense'],
    professions:['Arts visuels','Marketing','Politique','Médias','Gastronomie','Spiritualité'],
    compatibles:[3,4], tension:[1,6,7],
    force:'Rayonnement, passion, vision',
    defi:'L\'épuisement par surexposition — dispersion de l\'énergie, besoin compulsif de reconnaissance, burnout émotionnel. Le cœur de Li est vide : cultiver la profondeur intérieure.',
    saison:'Été', heure:'11h–13h (Heure du Cheval)',
    interp:'Le Kua 9 est gouverné par le Feu et le trigramme Li — la Lumière. C\'est la vibration du rayonnement, de la passion et de la capacité à illuminer les autres. Ces personnes ont une présence magnétique et une vision qui dépasse le cadre ordinaire. Elles savent inspirer les foules et créer des mouvements. Leur défi : gérer la consommation d\'énergie inhérente à ce rayonnement et apprendre à s\'éteindre parfois pour mieux se recharger.'
  }
};

// ─── NOMBRE DE VIE CHINOIS (1–9) ─────────────────────────
const VIE_CHINOIS = {
  1: {
    titre:'Le Sage Solitaire', zh:'一', element:'Eau',
    force:'Indépendance, sagesse intérieure, leadership discret',
    defi:'Isolement, rigidité, difficulté à demander de l\'aide',
    devise:'"La profondeur n\'est pas l\'absence de forme — c\'est la forme que tout finit par prendre."',
    couleurs:['Bleu nuit','Noir','Vert pâle'],
    couleurs_eviter:['Ocre','Jaune','Brun'],
    pierres:['Aigue-marine','Lapis-lazuli','Tourmaline noire','Pierre de lune'],
    professions:['Philosophie','Diplomatie','Psychologie','Musique','Recherche'],
    compatibles:[6,7,3,4], tension:[2,5,8],
    saison:'Hiver', heure:'17h–19h (Rein)',
    interp:'Dans la cosmologie chinoise, le 1 est associé à l\'Eau du Nord — profonde, silencieuse, persistante. Cette vibration incarne la force du commencement solitaire : ces personnes tracent leur propre voie avec une détermination qui défie les conventions. Comme l\'eau qui finit toujours par trouver son chemin, elles contournent les obstacles avec patience. Leur leadership s\'exprime dans l\'exemple plutôt que dans la proclamation.'
  },
  2: {
    titre:'L\'Harmonisateur', zh:'二', element:'Terre',
    force:'Diplomatie, empathie, sens du collectif',
    defi:'Indécision, dépendance aux autres, sacrifice de soi',
    devise:'"Je suis le sol sur lequel les autres peuvent enfin s\'enraciner."',
    couleurs:['Jaune doré','Ocre','Brun','Rose poudré'],
    couleurs_eviter:['Vert vif','Bleu-vert intense'],
    pierres:['Citrine','Jaspe jaune','Ambre','Œil de tigre'],
    professions:['Enseignement','Soins','Thérapie','Nutrition','Ressources humaines'],
    compatibles:[9,5,8,6,7], tension:[3,4],
    saison:'Fin d\'été', heure:'7h–9h (Estomac)',
    interp:'Le 2 chinois est la vibration de la Terre du Sud-Ouest — réceptive, nourricière, patiente. Ces personnes sont des bâtisseurs de ponts : là où les autres voient des conflits, elles voient des opportunités de réconciliation. Elles ont un don naturel pour sentir les besoins des autres avant que ceux-ci ne les expriment. Leur plus grand don est aussi leur plus grand risque : se dissoudre dans les besoins d\'autrui au détriment de leur propre substance.'
  },
  3: {
    titre:'Le Bâtisseur', zh:'三', element:'Bois',
    force:'Créativité, élan vital, ambition saine',
    defi:'Impulsivité, dispersion, difficultés à finir ce qui est commencé',
    devise:'"Ce qui pousse vers le ciel ne peut être arrêté — seulement guidé."',
    couleurs:['Vert vif','Bleu-vert','Turquoise','Noir (soutien Eau)'],
    couleurs_eviter:['Blanc','Argent','Gris clair'],
    pierres:['Jade vert','Aventurine verte','Malachite','Émeraude'],
    professions:['Entrepreneuriat','Architecture','Sport de haut niveau','Droit','Coaching'],
    compatibles:[1,4,9], tension:[6,7],
    saison:'Printemps', heure:'1h–3h (Foie)',
    interp:'Le 3 est la vibration du Bois de l\'Est — croissance, mouvement ascendant, renouveau. Dans la vision chinoise, le 3 représente les trois pouvoirs fondamentaux : le Ciel, la Terre et l\'Être humain. Ces personnes ont une énergie créatrice qui cherche constamment à se manifester et à grandir. Leur défi est de canaliser cet élan pour construire quelque chose qui dure.'
  },
  4: {
    titre:'Le Stratège', zh:'四', element:'Bois',
    force:'Méthode, persévérance, sens du détail',
    defi:'Rigidité, perfectionnisme, anxiété face à l\'imprévu',
    devise:'"Le vent ne s\'impose pas — il transforme tout ce qu\'il traverse."',
    couleurs:['Vert doux','Bleu-vert aqua','Vert sauge','Lavande'],
    couleurs_eviter:['Blanc cassé','Argent mat'],
    pierres:['Jade lavande','Péridot','Amazonite','Chrysoprase'],
    professions:['Édition','Traduction','Conseil','Stylisme','Diplomatie','Psychanalyse'],
    compatibles:[1,3,9], tension:[6,7],
    saison:'Printemps tardif', heure:'1h–3h (Foie)',
    interp:'Le 4 est une vibration particulière : le mot "quatre" (sì, 四) est phonétiquement proche du mot "mort" (sǐ, 死), ce qui lui confère une aura de sérieux et de profondeur. Ces personnes ont une rigueur et une méthode qui leur permettent d\'accomplir ce que les autres abandonnent. Leur sagesse est celle de la fondation solide — invisible mais indispensable.'
  },
  5: {
    titre:'Le Pivot', zh:'五', element:'Terre',
    force:'Adaptabilité, charisme, capacité à rassembler',
    defi:'Instabilité, résistance à l\'engagement, besoin d\'être au centre',
    devise:'"Je suis le point fixe autour duquel le monde tourne — ma force est dans l\'équilibre, non dans le mouvement."',
    couleurs:['Jaune impérial','Or','Ocre','Rouge brique'],
    couleurs_eviter:['Vert vif','Bleu profond'],
    pierres:['Citrine impériale','Jaspe jaune','Topaze or','Ambre'],
    professions:['Leadership politique','Stratégie','Médiation internationale','Médecine','Géologie'],
    compatibles:[9,2,8,6,7], tension:[3,4,1],
    saison:'Toutes les intersaisons', heure:'7h–11h (Estomac/Rate)',
    interp:'Le 5 occupe la case centrale du carré Lo Shu — c\'est la vibration de l\'axe, de l\'équilibre entre toutes les forces. Dans la tradition chinoise, 5 est le nombre du centre et des 5 éléments eux-mêmes. Ces personnes ont naturellement une position centrale dans leur entourage : tout passe par elles, tout est filtré à travers leur prisme. Cette position est à la fois un pouvoir et une responsabilité.'
  },
  6: {
    titre:'Le Perfectionniste', zh:'六', element:'Métal',
    force:'Éthique, rigueur, sens des responsabilités',
    defi:'Perfectionnisme paralysant, difficulté à lâcher prise',
    devise:'"La perfection n\'est pas la rigidité — c\'est l\'acuité qui sait quand trancher et quand retenir."',
    couleurs:['Blanc','Argent','Or pâle','Gris perle'],
    couleurs_eviter:['Rouge vif','Orange'],
    pierres:['Cristal de roche blanc','Hématite argentée','Quartz fumé','Diamant'],
    professions:['Justice','Médecine','Architecture','Finance institutionnelle','Ingénierie de précision'],
    compatibles:[2,5,8,7,1], tension:[9],
    saison:'Automne', heure:'3h–5h (Poumon)',
    interp:'Le 6 est la vibration du Métal Nord-Ouest — ciselé, précis, exigeant. Dans la culture chinoise, 6 (liù, 六) est associé à la fluidité et à la progression constante (流, liú, couler). Ces personnes ont un sens éthique profond et une capacité à organiser les choses avec une précision qui force le respect. Elles excellent dans les rôles qui demandent intégrité, méthode et sens du détail.'
  },
  7: {
    titre:'Le Méditatif', zh:'七', element:'Métal',
    force:'Introspection, sens spirituel, intuition affinée',
    defi:'Isolement, difficulté à communiquer les émotions, perfectionnisme',
    devise:'"Les mots sont mon or — je les pèse avant de les offrir, et ils changent le monde."',
    couleurs:['Blanc cassé','Argent','Beige rosé','Cuivre'],
    couleurs_eviter:['Rouge','Violet intense'],
    pierres:['Pyrite','Quartz rose','Topaze bleue','Améthyste claire'],
    professions:['Finance','Rhétorique','Enseignement','Joaillerie','Orthophonie','Administration'],
    compatibles:[2,5,8,6,1], tension:[9,3,4],
    saison:'Automne', heure:'17h–19h (Rein/fin d\'après-midi)',
    interp:'Le 7 est la vibration du Métal Ouest — tranchant, pur, réfléchi. Dans la symbolique chinoise, 7 (qī, 七) est associé au rassemblement et à la connexion (起, qǐ, se lever). Ces personnes ont une profondeur intérieure qui se traduit par une vie riche en questionnements spirituels. Elles ont souvent besoin de solitude pour se régénérer et traitent les expériences de vie avec une finesse analytique remarquable.'
  },
  8: {
    titre:'Le Manifesteur', zh:'八', element:'Terre',
    force:'Prospérité, autorité naturelle, endurance',
    defi:'Matérialisme, rigidité, difficulté à exprimer la vulnérabilité',
    devise:'"La montagne ne court pas après l\'horizon — elle devient le lieu où tout prend sens."',
    couleurs:['Ocre','Brun-rouge','Terracotta','Rose saumon'],
    couleurs_eviter:['Vert profond','Bleu pétrole'],
    pierres:['Jaspe rouge','Œil de taureau','Agate brune','Obsidienne'],
    professions:['Recherche','Archéologie','Patrimoine','Banque long terme','Psychologie des profondeurs'],
    compatibles:[9,2,5,6,7], tension:[3,4,1],
    saison:'Fin d\'hiver', heure:'1h–3h (Foie nocturne)',
    interp:'Dans la culture chinoise, 8 est considéré comme le chiffre le plus favorable car 八 (bā) sonne comme 發 (fā), qui signifie "prospérer". Cette vibration porte une promesse d\'accomplissement matériel et de reconnaissance. Mais la tradition souligne que la vraie prospérité du 8 vient après une période de labeur intense. Ces personnes ont une capacité de travail exceptionnelle et une résilience qui finit toujours par payer.'
  },
  9: {
    titre:'L\'Accomplissement', zh:'九', element:'Feu',
    force:'Universalité, rayonnement, sens de l\'achèvement',
    defi:'Dispersion, difficultés à maintenir des projets sur la durée',
    devise:'"Je suis la lumière qui révèle — je ne brûle que ce qui doit se transformer."',
    couleurs:['Rouge vif','Rose intense','Violet','Bordeaux'],
    couleurs_eviter:['Noir','Bleu nuit'],
    pierres:['Rubis','Grenat rouge','Cornaline','Carnéole'],
    professions:['Arts visuels','Cinéma','Politique','Marketing','Gastronomie','Spiritualité'],
    compatibles:[3,4,2,5,8], tension:[1,6,7],
    saison:'Été', heure:'11h–13h (Cœur)',
    interp:'Le 9 est la vibration du Feu Sud — brillant, rayonnant, consumant. Dans la tradition chinoise, 9 (jiǔ, 九) est phonétiquement proche de "longtemps" (久, jiǔ) et porte donc une symbolique de permanence et d\'accomplissement. C\'est le nombre de la complétude — il contient en lui tous les autres. Ces personnes ont souvent une vocation universelle : elles sont attirées par tout ce qui transcende les frontières et les catégories.'
  }
};

// ─── CALCULS ─────────────────────────────────────────────
function reduire(n) {
  while (n > 9) n = String(n).split('').map(Number).reduce((a,b)=>a+b,0);
  return n;
}
function calculerKua(annee, genre) {
  let s = reduire(String(annee).split('').map(Number).reduce((a,b)=>a+b,0));
  let kua;
  if (genre === 'homme') {
    kua = annee >= 2000 ? (9 - s) : (10 - s);
    if (kua <= 0) kua += 9;
    if (kua === 5) kua = 2;
  } else {
    kua = reduire(s + (annee >= 2000 ? 6 : 5));
    if (kua === 5) kua = 8;
  }
  return kua;
}
function construireLoShu(j, m, a) {
  const digits = (String(j) + String(m) + String(a)).split('').map(Number).filter(d => d >= 1 && d <= 9);
  const c = {};
  for (let i = 1; i <= 9; i++) c[i] = 0;
  digits.forEach(d => c[d]++);
  return c;
}
function nombreVieCorrect(j, m, a) {
  const digits = (String(j) + String(m) + String(a)).split('').map(Number);
  return reduire(digits.reduce((s,d)=>s+d,0));
}

// ─── UTILITAIRES ─────────────────────────────────────────
function elCol(element) { return ELEMENTS[element]?.var || 'gold'; }

// ─── FLÈCHES : détection ─────────────────────────────────
function detecterFleches(comptage) {
  const forces = [], faiblesses = [];
  FLECHES.forEach(f => {
    const vals = f.cases.map(n => comptage[n] || 0);
    if (vals.every(v => v > 0)) forces.push(f);
    if (vals.every(v => v === 0)) faiblesses.push(f);
  });
  return { forces, faiblesses };
}

// ─── CONSTRUCTION : Kua card ─────────────────────────────
function buildKuaCard(kua) {
  const d = KUA_DATA[kua];
  if (!d) return '<p>Données indisponibles.</p>';
  const col = elCol(d.element);

  const dirsHtml = d.dirs_fav.map(dir =>
    `<span class="ch-dir-badge">${dir}</span>`).join('');

  const defavLabels = { huoHai:'Huo Hai', wuGui:'Wu Gui', liuSha:'Liu Sha', jueMing:'Jue Ming' };
  const dirsDefHtml = Object.entries(d.dirs_defav).map(([k, v]) =>
    `<span class="ch-dir-defav" title="${defavLabels[k]}">${v} <em>(${defavLabels[k]})</em></span>`
  ).join('');

  const couleursHtml = d.couleurs.map(c =>
    `<span class="ch-color-tag ch-color-tag--ok">${c}</span>`).join('');
  const couleursEviterHtml = d.couleurs_eviter.map(c =>
    `<span class="ch-color-tag ch-color-tag--no">✕ ${c}</span>`).join('');

  const profsHtml = d.professions.map(p =>
    `<span class="ch-prof-tag">${p}</span>`).join('');

  const compatsHtml = d.compatibles.map(n => {
    const k = KUA_DATA[n]; if (!k) return '';
    return `<span class="ch-compat-tag cf-${elCol(k.element)}">${n} ${k.trigram} ${k.element}</span>`;
  }).join('');
  const tensionsHtml = (d.tension || []).map(n => {
    const k = KUA_DATA[n]; if (!k) return '';
    return `<span class="ch-compat-tag ch-compat-tag--tension">${n} ${k.trigram}</span>`;
  }).join('');

  return `<div class="ch-kua-card">
    <div class="ch-kua-header">
      <div class="ch-kua-num cf-${col}">${kua}</div>
      <div class="ch-kua-meta">
        <div class="ch-kua-title cf-${col}">${d.trigram} Kua ${kua} — ${d.trigram_nom}</div>
        <div class="ch-kua-el">
          <span class="ch-badge cf-bg-${col} cf-${col}">${ELEMENTS[d.element].zh} ${d.element}</span>
          <span class="ch-badge">Groupe ${d.groupe}</span>
          <span class="ch-badge">${d.direction}</span>
          <span class="ch-badge">⊙ ${d.saison}</span>
        </div>
      </div>
    </div>
    <div class="ch-kua-force">✦ ${d.force}</div>
    <p class="ch-kua-interp">${d.interp}</p>

    <div class="ch-kua-section-grid">
      <div class="ch-kua-section">
        <span class="ch-kua-sec-lbl">✦ Directions favorables</span>
        <div class="ch-dirs">${dirsHtml}</div>
      </div>
      <div class="ch-kua-section">
        <span class="ch-kua-sec-lbl">◈ Directions à éviter</span>
        <div class="ch-dirs">${dirsDefHtml}</div>
      </div>
    </div>

    <div class="ch-kua-section">
      <span class="ch-kua-sec-lbl">Couleurs favorables · à éviter</span>
      <div class="ch-color-tags">${couleursHtml} ${couleursEviterHtml}</div>
    </div>

    <div class="ch-kua-section">
      <span class="ch-kua-sec-lbl">Professions en résonance</span>
      <div class="ch-color-tags">${profsHtml}</div>
    </div>

    <div class="ch-kua-section-grid">
      <div class="ch-kua-section">
        <span class="ch-kua-sec-lbl">Kua harmonieux</span>
        <div class="ch-dirs">${compatsHtml}</div>
      </div>
      ${tensionsHtml ? `<div class="ch-kua-section">
        <span class="ch-kua-sec-lbl">Kua en tension</span>
        <div class="ch-dirs">${tensionsHtml}</div>
      </div>` : ''}
    </div>

    <div class="ch-kua-defi">
      <span class="ch-kua-sec-lbl">Défi central — </span>${d.defi}
      <span class="ch-kua-heure">🕐 ${d.heure}</span>
    </div>
  </div>`;
}

// ─── CONSTRUCTION : Lo Shu result ────────────────────────
function buildLoShuResult(comptage) {
  const ordre = [4, 9, 2, 3, 5, 7, 8, 1, 6];
  const absents  = ordre.filter(n => comptage[n] === 0);
  const presents = ordre.filter(n => comptage[n] > 0);
  const { forces, faiblesses } = detecterFleches(comptage);
  const grillePleine = ordre.every(n => comptage[n] >= 1);

  const cellsHtml = ordre.map(n => {
    const c = comptage[n];
    const info = LO_SHU[n];
    const col  = elCol(info.element);
    const dots = c > 0 ? Array(Math.min(c, 5)).fill('●').join('') : '—';
    const tipText = c === 0
      ? `${info.domaine}\n\nManifestations : ${info.absence}\n\nThème karmique — ${info.theme_absence}\n${info.lecon_absence}`
      : `${info.domaine}\n\n✦ ${info.force}${c >= 2 ? '\n\nEn excès : ' + info.surplus : ''}`;
    return `<div class="ch-loshu-cell ${c===0?'ch-loshu-empty':''} ch-loshu-${col}"
      role="button" tabindex="0"
      data-interp="${tipText.replace(/"/g,'&quot;')}">
      <div class="ch-loshu-num cf-${c===0?'muted':col}">${n}</div>
      <div class="ch-loshu-trigram">${info.trigram}</div>
      <div class="ch-loshu-dots ${c===0?'':'cf-'+col}">${dots}</div>
      <div class="ch-loshu-domaine">${info.domaine.split('&')[0].trim()}</div>
    </div>`;
  }).join('');

  // Flèches détectées
  let flechesHtml = '';
  if (forces.length > 0 || faiblesses.length > 0) {
    const forceItems = forces.map(f =>
      `<div class="ch-fleche ch-fleche--force">
        <span class="ch-fleche-icon cf-emerald">↗</span>
        <div>
          <strong class="cf-emerald">${f.force}</strong>
          <span class="ch-fleche-axe"> · ${f.axe}</span>
          <p class="ch-fleche-desc">${f.forceDesc}</p>
        </div>
      </div>`).join('');
    const faiblesseItems = faiblesses.map(f =>
      `<div class="ch-fleche ch-fleche--faiblesse">
        <span class="ch-fleche-icon cf-rose">↙</span>
        <div>
          <strong class="cf-rose">${f.faiblesse}</strong>
          <span class="ch-fleche-axe"> · ${f.axe}</span>
          <p class="ch-fleche-desc">${f.faiblesseDesc}</p>
        </div>
      </div>`).join('');
    flechesHtml = `<div class="ch-fleches-section">
      <h4 class="ch-ls-h4">◈ Flèches du Lo Shu</h4>
      ${forceItems}${faiblesseItems}
    </div>`;
  }

  // Grille complète
  const grillePleineHtml = grillePleine
    ? `<div class="ch-ls-all-present">✦ Grille complète — tous les chiffres sont présents. Personnalité naturellement équilibrée avec accès à toutes les dimensions de l\'existence. Aucun angle mort majeur, mais la diversité d\'énergies demande une gestion consciente pour ne pas en négliger certaines.</div>`
    : '';

  // Absences avec leçons karmiques
  const absentHtml = absents.length === 0 ? '' :
    `<div class="ch-ls-section">
      <h4 class="ch-ls-h4">◈ Cases absentes — leçons karmiques</h4>
      ${absents.map(n => {
        const info = LO_SHU[n]; const col = elCol(info.element);
        return `<div class="ch-ls-row">
          <span class="ch-ls-num cf-${col}">${n} ${info.trigram}</span>
          <div>
            <strong class="cf-${col}">${info.domaine} · ${info.theme_absence}</strong>
            <p class="ch-ls-manifestation">Manifestations : ${info.absence}</p>
            <p>${info.lecon_absence}</p>
          </div>
        </div>`;
      }).join('')}
    </div>`;

  // Présences avec surplus gradués
  const presentHtml = `<div class="ch-ls-section">
    <h4 class="ch-ls-h4">◈ Cases actives — vos forces naturelles</h4>
    ${presents.map(n => {
      const info = LO_SHU[n]; const col = elCol(info.element); const c = comptage[n];
      let surplusMsg = '';
      if (c === 2) surplusMsg = ` <em class="ch-surplus ch-surplus--2">· ${info.surplus_2x}</em>`;
      if (c === 3) surplusMsg = ` <em class="ch-surplus ch-surplus--3">· Intensifié (3×) : ${info.surplus_3x}</em>`;
      if (c >= 4)  surplusMsg = ` <em class="ch-surplus ch-surplus--4">· Excès (${c}×) : ${info.surplus_4x}</em>`;
      return `<div class="ch-ls-row">
        <span class="ch-ls-num cf-${col}">${n} ${'●'.repeat(Math.min(c,4))}</span>
        <div>
          <strong class="cf-${col}">${info.domaine}</strong>
          <p>${info.force}${surplusMsg}</p>
          <p class="ch-ls-surplus-watch">Veiller à : ${info.surplus}</p>
        </div>
      </div>`;
    }).join('')}
  </div>`;

  return `<div class="ch-loshu-result">
    <div class="ch-loshu-grid">${cellsHtml}</div>
    <div class="ch-loshu-legend">
      <span>● = présent</span><span>— = absent</span><span>●●+ = trait accentué</span>
    </div>
    ${grillePleineHtml}
    ${flechesHtml}
    ${absentHtml}
    ${presentHtml}
  </div>`;
}

// ─── CONSTRUCTION : Nombre de Vie ─────────────────────────
function buildNombreVieCard(nv) {
  const d = VIE_CHINOIS[nv];
  if (!d) return '<p>Données indisponibles.</p>';
  const col = elCol(d.element);

  const couleursHtml = d.couleurs.map(c =>
    `<span class="ch-color-tag ch-color-tag--ok">${c}</span>`).join('');
  const couleursEviterHtml = d.couleurs_eviter.map(c =>
    `<span class="ch-color-tag ch-color-tag--no">✕ ${c}</span>`).join('');
  const pierresHtml = d.pierres.map(p =>
    `<span class="ch-pierre-tag">◈ ${p}</span>`).join('');
  const profsHtml = d.professions.map(p =>
    `<span class="ch-prof-tag">${p}</span>`).join('');
  const compatsHtml = (d.compatibles || []).map(n => {
    const k = VIE_CHINOIS[n]; if (!k) return '';
    return `<span class="ch-compat-tag cf-${elCol(k.element)}">${n} ${k.zh} ${k.element}</span>`;
  }).join('');
  const tensionsHtml = (d.tension || []).map(n => {
    const k = VIE_CHINOIS[n]; if (!k) return '';
    return `<span class="ch-compat-tag ch-compat-tag--tension">${n} ${k.zh}</span>`;
  }).join('');

  return `<div class="ch-vie-card">
    <div class="ch-vie-header">
      <div class="ch-vie-num cf-${col}">${nv}<span class="ch-vie-zh">${d.zh}</span></div>
      <div class="ch-vie-meta">
        <div class="ch-vie-title cf-${col}">${d.titre}</div>
        <div class="ch-kua-el">
          <span class="ch-badge cf-bg-${col} cf-${col}">${ELEMENTS[d.element].zh} ${d.element}</span>
          <span class="ch-badge">${ELEMENTS[d.element].saison}</span>
          <span class="ch-badge">⊙ ${d.saison}</span>
        </div>
      </div>
    </div>

    <div class="ch-vie-devise cf-${col}">${d.devise}</div>

    <div class="ch-vie-keys">
      <span class="pd-key pd-force">✦ ${d.force}</span>
      <span class="pd-key pd-defi">◈ ${d.defi}</span>
    </div>
    <p class="ch-kua-interp">${d.interp}</p>

    <div class="ch-kua-section">
      <span class="ch-kua-sec-lbl">Couleurs favorables · à éviter</span>
      <div class="ch-color-tags">${couleursHtml} ${couleursEviterHtml}</div>
    </div>

    <div class="ch-kua-section">
      <span class="ch-kua-sec-lbl">Pierres &amp; cristaux</span>
      <div class="ch-color-tags">${pierresHtml}</div>
    </div>

    <div class="ch-kua-section">
      <span class="ch-kua-sec-lbl">Professions en résonance</span>
      <div class="ch-color-tags">${profsHtml}</div>
    </div>

    <div class="ch-kua-section-grid">
      <div class="ch-kua-section">
        <span class="ch-kua-sec-lbl">Vibrations harmonieuses</span>
        <div class="ch-dirs">${compatsHtml}</div>
      </div>
      ${tensionsHtml ? `<div class="ch-kua-section">
        <span class="ch-kua-sec-lbl">Vibrations en tension</span>
        <div class="ch-dirs">${tensionsHtml}</div>
      </div>` : ''}
    </div>

    <div class="ch-kua-defi">
      <span class="ch-kua-sec-lbl">Heure du méridien — </span>${d.heure}
    </div>
  </div>`;
}

// ─── GRILLE STATIQUE LO SHU (section [02]) ───────────────
function buildLoShuStatique() {
  const ordre = [4, 9, 2, 3, 5, 7, 8, 1, 6];
  const grid = document.getElementById('loShuStatiqueGrid');
  if (!grid) return;
  grid.innerHTML = ordre.map(n => {
    const info = LO_SHU[n]; const col = elCol(info.element);
    const tooltipText = `✦ ${info.force}\n\nAbsence : ${info.absence}\n\nThème karmique — ${info.theme_absence}\n${info.lecon_absence}`;
    return `<div class="archetype-card ch-static-cell" role="button" tabindex="0"
      aria-label="Case ${n} — ${info.domaine}"
      data-interp="${tooltipText.replace(/"/g, '&quot;')}">
      <div class="card-inner">
        <div class="card-front">
          <div class="num-circle ch-nc-${col}">${n}</div>
          <div class="force">${info.domaine}</div>
          <div class="faiblesse">${info.direction} · ${info.trigram} ${info.trigram_nom}</div>
          <div class="ch-astre-badge cf-${col}">${ELEMENTS[info.element].zh} ${info.element}</div>
          <div class="flip-hint">↻ Voir · survol pour tout lire</div>
        </div>
        <div class="card-back">
          <div>
            <strong class="cf-${col}" style="font-size:0.8rem;display:block;margin-bottom:0.5rem;">${info.domaine}</strong>
            <p style="font-size:0.78rem;margin-bottom:0.5rem;">✦ ${info.force}</p>
            <p style="font-size:0.75rem;color:var(--rose);">Absence : ${info.absence}</p>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

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
      tooltip.style.whiteSpace = 'pre-line';
      tooltip.textContent = text;
      document.body.appendChild(tooltip);
      activeTooltip = tooltip;
      const rect = card.getBoundingClientRect();
      const tw = 400;
      let left = rect.left + rect.width / 2 - tw / 2;
      if (left < 10) left = 10;
      if (left + tw > window.innerWidth - 10) left = window.innerWidth - tw - 10;
      tooltip.style.width = tw + 'px';
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

// ─── TOOLTIPS GRILLE RÉSULTAT ────────────────────────────
function initLoShuResultTooltips() {
  const container = document.getElementById('chLoShuResult');
  if (!container) return;
  let activeTooltip = null;
  container.querySelectorAll('.ch-loshu-cell[data-interp]').forEach(cell => {
    cell.addEventListener('mouseenter', () => {
      if (activeTooltip) { activeTooltip.remove(); activeTooltip = null; }
      const text = cell.dataset.interp;
      if (!text) return;
      const tooltip = document.createElement('div');
      tooltip.className = 'arch-tooltip';
      tooltip.style.whiteSpace = 'pre-line';
      tooltip.textContent = text;
      document.body.appendChild(tooltip);
      activeTooltip = tooltip;
      const rect = cell.getBoundingClientRect();
      const tw = 380;
      let left = rect.left + rect.width / 2 - tw / 2;
      if (left < 10) left = 10;
      if (left + tw > window.innerWidth - 10) left = window.innerWidth - tw - 10;
      tooltip.style.width = tw + 'px';
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
    cell.addEventListener('mouseleave', () => {
      if (activeTooltip) { activeTooltip.remove(); activeTooltip = null; }
    });
  });
}

// ─── TOAST ───────────────────────────────────────────────
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildLoShuStatique();

  const form = document.getElementById('ch-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const j     = parseInt(document.getElementById('ch-jour').value);
    const m     = parseInt(document.getElementById('ch-mois').value);
    const a     = parseInt(document.getElementById('ch-annee').value);
    const genre = document.querySelector('input[name="ch-genre"]:checked')?.value;

    if (!j || !m || !a || j<1 || j>31 || m<1 || m>12 || a<1900 || a>2100)
      return showToast('Date de naissance invalide.');
    if (!genre) return showToast('Merci de sélectionner votre genre (pour le Kua).');

    const kua      = calculerKua(a, genre);
    const comptage = construireLoShu(j, m, a);
    const nv       = nombreVieCorrect(j, m, a);

    document.getElementById('chKuaCard').innerHTML     = buildKuaCard(kua);
    document.getElementById('chLoShuResult').innerHTML = buildLoShuResult(comptage);
    document.getElementById('chNombreVie').innerHTML   = buildNombreVieCard(nv);

    initLoShuResultTooltips();

    const shareZone = document.getElementById('shareImageZone');
    if (shareZone && window.PlateformePartage) {
      shareZone.innerHTML = '';
      window.PlateformePartage.afficherBoutons(shareZone, {
        type: 'numerologie',
        titre: 'Numérologie Chinoise',
        sousTitre: 'Ton Kua et ton Nombre de Vie',
        valeurs: [
          { label: 'Kua', valeur: kua },
          { label: 'Trigramme', valeur: KUA_DATA[kua].trigram_nom },
          { label: 'Nombre de Vie', valeur: nv }
        ]
      });
    }

    const section = document.getElementById('chResultats');
    section.hidden = false;
    setTimeout(() => section.scrollIntoView({ behavior:'smooth', block:'start' }), 80);
  });

  document.getElementById('ch-exemple').addEventListener('click', () => {
    document.getElementById('ch-jour').value  = '15';
    document.getElementById('ch-mois').value  = '11';
    document.getElementById('ch-annee').value = '1990';
    document.querySelector('input[name="ch-genre"][value="femme"]').checked = true;
    form.dispatchEvent(new Event('submit'));
  });
});
