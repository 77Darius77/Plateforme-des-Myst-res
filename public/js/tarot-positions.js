/* ─────────────────────────────────────────────────────────────────────────
   tarot-positions.js — Grille des modificateurs positionnels
   Chaque position dans un tirage a un rôle, un verbe d'interprétation,
   un registre (lumière/ombre/transition) et une intro contextuelle.
   ───────────────────────────────────────────────────────────────────────── */
window.tarotPositions = (function () {

  /* Grille générique par rôle de position */
  var POSITION_MODIFIERS = {
    /* ── Positions temporelles ─────────────────────────────────────────── */
    'passé': {
      verbe: 'a fondé',
      registre: 'ombre',
      intro: 'Ce qui a pris racine dans le passé',
      conseil: 'Reconnais l\'empreinte de ce qui a été pour t\'en libérer'
    },
    'passé lointain': {
      verbe: 'a conditionné',
      registre: 'ombre',
      intro: 'Les racines profondes de cette situation',
      conseil: 'Regarde ce qui, dans ton histoire ancienne, continue d\'agir'
    },
    'passé récent': {
      verbe: 'vient de marquer',
      registre: 'mixte',
      intro: 'Ce qui vient de se jouer et dont les effets se prolongent',
      conseil: 'Observe comment cet événement récent nourrit encore la situation'
    },
    'présent': {
      verbe: 'traverse',
      registre: 'mixte',
      intro: 'Ce qui est vivant maintenant',
      conseil: 'Habite pleinement ce moment, sans fuir ni anticiper'
    },
    'futur': {
      verbe: 'appelle à advenir',
      registre: 'lumière',
      intro: 'Ce qui se prépare et demande à être accueilli',
      conseil: 'Prépare le terrain sans forcer — laisse la trajectoire se dessiner'
    },
    'futur proche': {
      verbe: 'émerge',
      registre: 'lumière',
      intro: 'Ce qui s\'annonce dans les prochaines semaines',
      conseil: 'Accueille consciemment cette énergie qui monte'
    },
    'conclusion': {
      verbe: 'laisse comme héritage',
      registre: 'mixte',
      intro: 'La leçon que ce cycle te laisse',
      conseil: 'Intègre cette graine et emporte-la dans le prochain cycle'
    },

    /* ── Positions de guidance ─────────────────────────────────────────── */
    'conseil': {
      verbe: 'invite à',
      registre: 'lumière',
      intro: 'L\'attitude ou l\'action que la situation réclame',
      conseil: 'Intègre cette clé pour avancer concrètement'
    },
    'synthèse': {
      verbe: 'colore',
      registre: 'mixte',
      intro: 'L\'énergie maîtresse qui teinte tout le tirage',
      conseil: 'Reviens à cette carte comme boussole intérieure'
    },
    'issue': {
      verbe: 'dessine',
      registre: 'mixte',
      intro: 'L\'issue probable dans la dynamique actuelle',
      conseil: 'Considère cette trajectoire comme une orientation, pas un verdict'
    },
    'résultat': {
      verbe: 'aboutit à',
      registre: 'mixte',
      intro: 'Le résultat probable si tu poursuis sur cette voie',
      conseil: 'Utilise cette vision comme boussole pour ajuster ta route'
    },

    /* ── Positions d\'opposition ───────────────────────────────────────── */
    'défi': {
      verbe: 'te confronte à',
      registre: 'ombre',
      intro: 'Ce qui te bloque et demande à être traversé',
      conseil: 'Ne contourne pas l\'obstacle — il est le passage'
    },
    'obstacle': {
      verbe: 'résiste par',
      registre: 'ombre',
      intro: 'Ce qui freine ta démarche',
      conseil: 'Regarde ce qui, en toi ou autour de toi, bloque le mouvement'
    },
    'contre': {
      verbe: 's\'oppose par',
      registre: 'ombre',
      intro: 'La résistance active dans cette situation',
      conseil: 'Traverse pleinement ce qui résiste avant que la voie se dégage'
    },
    'ombre': {
      verbe: 'te renvoie à',
      registre: 'ombre',
      intro: 'Ce que tu n\'oses pas regarder',
      conseil: 'La conscience de l\'ombre est déjà le début de la libération'
    },

    /* ── Positions de soutien ─────────────────────────────────────────── */
    'pour': {
      verbe: 'soutient par',
      registre: 'lumière',
      intro: 'La force favorable qui agit en ta faveur',
      conseil: 'Reconnais cette énergie et appuie-toi sur elle'
    },
    'couronne': {
      verbe: 'aboutit à',
      registre: 'lumière',
      intro: 'L\'accomplissement possible de ta démarche',
      conseil: 'Vise cette lumière sans la forcer'
    },
    'base': {
      verbe: 'repose sur',
      registre: 'mixte',
      intro: 'Le fondement sur lequel tout repose',
      conseil: 'Consolide cette base avant de construire plus haut'
    },
    'approche': {
      verbe: 't\'approche par',
      registre: 'mixte',
      intro: 'L\'énergie qui vient à toi dans l\'immédiat',
      conseil: 'Accueille ce qui arrive sans résister'
    },
    'environnement': {
      verbe: 't\'entoure de',
      registre: 'mixte',
      intro: 'L\'influence de ton entourage et du contexte',
      conseil: 'Distingue ce qui vient de toi de ce qui vient de l\'extérieur'
    },

    /* ── Positions relationnelles ─────────────────────────────────────── */
    'toi': {
      verbe: 'te représente par',
      registre: 'mixte',
      intro: 'Ce que tu apportes dans le lien',
      conseil: 'Reconnais ta part avec lucidité et bienveillance'
    },
    'autre': {
      verbe: 'représente l\'autre par',
      registre: 'mixte',
      intro: 'Ce que l\'autre apporte dans le lien',
      conseil: 'Cherche à comprendre sans projeter'
    },
    'lien': {
      verbe: 'unit par',
      registre: 'mixte',
      intro: 'Le pont qui vous relie',
      conseil: 'Nourris ce qui vous unit, clarifie ce qui vous sépare'
    },
    'dynamique': {
      verbe: 'anime par',
      registre: 'mixte',
      intro: 'L\'interaction entre vous deux',
      conseil: 'Observez comment vous vous nourrissez ou vous freinez mutuellement'
    },
    'potentiel': {
      verbe: 'promet',
      registre: 'lumière',
      intro: 'L\'horizon possible de cette relation',
      conseil: 'Cultivez ce qui peut advenir sans forcer'
    },

    /* ── Positions spirituelles ───────────────────────────────────────── */
    'corps': {
      verbe: 's\'exprime par',
      registre: 'mixte',
      intro: 'Le message de ton corps et de ton ancrage physique',
      conseil: 'Écoute les signaux du corps — ils savent avant la tête'
    },
    'mental': {
      verbe: 'pense par',
      registre: 'mixte',
      intro: 'Le message de ta pensée rationnelle',
      conseil: 'Clarifie tes pensées sans les laisser dominer'
    },
    'esprit': {
      verbe: 'appelle par',
      registre: 'lumière',
      intro: 'Le message de ton âme et de ton intuition profonde',
      conseil: 'Fais confiance à la voix intérieure qui sait'
    },

    /* ── Positions astrologiques ──────────────────────────────────────── */
    'maison-i': { verbe: 'marque ton identité par', registre: 'mixte', intro: 'L\'image que tu projettes', conseil: 'Honore qui tu es vraiment' },
    'maison-ii': { verbe: 'traverse tes ressources par', registre: 'mixte', intro: 'Ta relation à l\'argent et aux biens', conseil: 'Cultive une relation saine à la matière' },
    'maison-iii': { verbe: 'colore tes échanges par', registre: 'mixte', intro: 'Ta communication et ton entourage proche', conseil: 'Prends soin de la qualité de tes échanges' },
    'maison-iv': { verbe: 'fonde tes racines sur', registre: 'mixte', intro: 'Ton foyer et tes fondations intimes', conseil: 'Honore tes racines tout en te libérant' },
    'maison-v': { verbe: 'exprime ta créativité par', registre: 'lumière', intro: 'Ton élan créateur et tes plaisirs', conseil: 'Laisse parler ta joie de vivre' },
    'maison-vi': { verbe: 'structure ton quotidien par', registre: 'mixte', intro: 'Ta santé et ton travail au quotidien', conseil: 'Prends soin de tes rythmes' },
    'maison-vii': { verbe: 'te lie par', registre: 'mixte', intro: 'Tes partenariats et associations', conseil: 'Cherche l\'équilibre dans le lien' },
    'maison-viii': { verbe: 'te transforme par', registre: 'ombre', intro: 'Les crises et mutations profondes', conseil: 'Laisse mourir ce qui doit mourir' },
    'maison-ix': { verbe: 'ouvre ton idéal par', registre: 'lumière', intro: 'Ta quête de sens et de philosophie', conseil: 'Élève ton regard au-delà du quotidien' },
    'maison-x': { verbe: 'oriente ta vocation par', registre: 'mixte', intro: 'Ta carrière et ta réputation', conseil: 'Incarne ta vocation avec authenticité' },
    'maison-xi': { verbe: 'inspire tes projets par', registre: 'lumière', intro: 'Tes amitiés et projets collectifs', conseil: 'Cultive les liens qui partagent tes idéaux' },
    'maison-xii': { verbe: 'te renvoie à', registre: 'ombre', intro: 'Ce qui est caché et les épreuves silencieuses', conseil: 'Regarde en face ce que tu évites' }
  };

  /* Normalise le nom d'une position pour matcher la grille */
  function normalize(positionName) {
    if (!positionName) return 'présent';
    var n = positionName.toLowerCase()
      .replace(/^\d+\.\s*/, '') // retire "1. ", "2. " etc.
      .replace(/^la\s+/, '')
      .replace(/^le\s+/, '')
      .replace(/^les\s+/, '')
      .replace(/^l\'/, '')
      .trim();
    /* Match direct */
    if (POSITION_MODIFIERS[n]) return n;
    /* Match par mot-clé */
    if (n.indexOf('passé lointain') !== -1) return 'passé lointain';
    if (n.indexOf('passé récent') !== -1) return 'passé récent';
    if (n.indexOf('passé') !== -1) return 'passé';
    if (n.indexOf('futur proche') !== -1) return 'futur proche';
    if (n.indexOf('futur') !== -1) return 'futur';
    if (n.indexOf('conclusion') !== -1) return 'conclusion';
    if (n.indexOf('conseil') !== -1) return 'conseil';
    if (n.indexOf('synthèse') !== -1) return 'synthèse';
    if (n.indexOf('issue') !== -1) return 'issue';
    if (n.indexOf('résultat') !== -1) return 'résultat';
    if (n.indexOf('défi') !== -1) return 'défi';
    if (n.indexOf('obstacle') !== -1) return 'obstacle';
    if (n.indexOf('contre') !== -1) return 'contre';
    if (n.indexOf('ombre') !== -1) return 'ombre';
    if (n.indexOf('pour') !== -1) return 'pour';
    if (n.indexOf('couronne') !== -1) return 'couronne';
    if (n.indexOf('base') !== -1) return 'base';
    if (n.indexOf('approche') !== -1) return 'approche';
    if (n.indexOf('environnement') !== -1) return 'environnement';
    if (n.indexOf('toi') !== -1) return 'toi';
    if (n.indexOf('autre') !== -1) return 'autre';
    if (n.indexOf('lien') !== -1) return 'lien';
    if (n.indexOf('dynamique') !== -1) return 'dynamique';
    if (n.indexOf('potentiel') !== -1) return 'potentiel';
    if (n.indexOf('corps') !== -1) return 'corps';
    if (n.indexOf('mental') !== -1) return 'mental';
    if (n.indexOf('esprit') !== -1) return 'esprit';
    if (n.indexOf('maison') !== -1) {
      var m = n.match(/maison\s*(i{1,3}|iv|v|vi{0,3}|ix|x|x{1,2}i?)/i);
      if (m) return 'maison-' + m[1].toLowerCase();
    }
    return 'présent';
  }

  function getModifier(positionName) {
    var key = normalize(positionName);
    return POSITION_MODIFIERS[key] || POSITION_MODIFIERS['présent'];
  }

  return {
    getModifier: getModifier,
    normalize: normalize,
    POSITION_MODIFIERS: POSITION_MODIFIERS
  };
})();
