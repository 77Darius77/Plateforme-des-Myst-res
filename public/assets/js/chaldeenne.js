// ═══════════════════════════════════════════════════════════
// NUMÉROLOGIE CHALDÉENNE — Calculateur
// Sources : Cheiro (Book of Numbers), Joanna Martine Woolfolk,
//           Michael McClain, ChaldeanNumerology.com, Astrology.com
// ═══════════════════════════════════════════════════════════

// ─── TABLE CHALDÉENNE ────────────────────────────────────
// Le 9 est sacré — aucune lettre ne lui est attribuée
const CHALD_TABLE = {
  A:1, I:1, J:1, Q:1, Y:1,
  B:2, K:2, R:2,
  C:3, G:3, L:3, S:3,
  D:4, M:4, T:4,
  E:5, H:5, N:5, X:5,
  U:6, V:6, W:6,
  O:7, Z:7,
  F:8, P:8
};

// ─── DONNÉES — VIBRATIONS SIMPLES (1–9) ──────────────────
const VIBRATIONS = {
  1: {
    titre: "Le Solaire",
    force: "Volonté, originalité, leadership",
    defi: "Arrogance, isolement, rigidité",
    interpretation: "Le 1 chaldéen est la vibration du Soleil — lumineuse, souveraine et créatrice. Dans la cosmologie babylonienne, le Soleil représentait le pouvoir divin qui ordonne le chaos. Les personnes portant cette vibration ont un magnétisme naturel et une capacité à s'imposer qui transcende les obstacles. Leur défi est d'apprendre que la vraie autorité n'est pas celle qui soumet mais celle qui inspire. En Chaldéen, le 1 conserve sa racine astrale : Shamash, le dieu-soleil sumérien, gardien de la justice et de la vérité.",
    astre: "Soleil ☀"
  },
  2: {
    titre: "La Lunaire",
    force: "Intuition, réceptivité, cycles",
    defi: "Inconstance, vulnérabilité, dépendance",
    interpretation: "Le 2 chaldéen vibre avec la Lune — changeant, réceptif, cyclique. Là où le 1 agit, le 2 ressent. Les porteurs de cette vibration ont une sensibilité aux atmosphères et aux non-dits qui dépasse l'ordinaire. Ils captent les humeurs collectives, anticipent les retournements, et excellent dans les rôles de soutien et de médiation. Leur vulnérabilité est leur force mal comprise : ce qui les rend perméables les rend aussi précieux. Inanna, déesse lunaire sumérienne, incarne ce mystère — descendant et remontant des enfers pour mieux renaître.",
    astre: "Lune 🌙"
  },
  3: {
    titre: "Le Jupitérien",
    force: "Expansion, sagesse, éloquence",
    defi: "Excès, dispersion, orgueil intellectuel",
    interpretation: "Le 3 chaldéen est gouverné par Jupiter — planète de l'expansion, de la philosophie et de la prospérité. Ces personnes ont un appétit insatiable pour le savoir et une capacité naturelle à transmettre ce qu'elles ont appris. Leur éloquence est un outil puissant. Le risque est l'excès : trop promettre, trop s'étaler, perdre de vue l'essentiel dans l'abondance des idées. Marduk, le grand dieu babylonien de l'ordre cosmique, gouverne cette vibration — rappelant que la sagesse n'est utile que traduite en actes mesurés.",
    astre: "Jupiter ♃"
  },
  4: {
    titre: "L'Uranique",
    force: "Innovation, génie, indépendance",
    defi: "Excentricité, instabilité, rébellion",
    interpretation: "Le 4 chaldéen — contrairement au 4 pythagoricien (stable, terrien) — est associé à Uranus, planète de la rupture et de l'innovation. Les porteurs du 4 chaldéen sont des esprits originaux qui voient ce que les autres ne voient pas encore. Souvent incompris de leur vivant, ils tracent des sillons dont les générations suivantes récoltent les fruits. Leur défi : apprivoiser l'irrégularité de leur génie sans se laisser consumer par leur propre singularité.",
    astre: "Uranus ⛢"
  },
  5: {
    titre: "Le Mercurien",
    force: "Intelligence, communication, adaptabilité",
    defi: "Instabilité, superficialité, dispersion",
    interpretation: "Le 5 chaldéen vibre avec Mercure — messager des dieux, maître de la communication et des échanges. Cette vibration est la plus mentale du spectre chaldéen : vive, curieuse, polyglotte dans les langues comme dans les idées. Les porteurs du 5 excellent dans le commerce, l'écriture, l'enseignement et la diplomatie. Nabu, le dieu babylonien de l'écriture et de la sagesse, est leur archétype. Leur défi : la profondeur. La vitesse de leur esprit peut les empêcher de toucher le fond des choses.",
    astre: "Mercure ☿"
  },
  6: {
    titre: "Le Vénusien",
    force: "Beauté, harmonie, amour créateur",
    defi: "Indulgence, dépendance affective, excès",
    interpretation: "Le 6 chaldéen est gouverné par Vénus — déesse de l'amour, de la beauté et de l'art. Les porteurs de cette vibration ont un sens esthétique naturel et un magnétisme affectif puissant. Ils créent autour d'eux des environnements beaux et harmonieux, et attirent les autres sans effort apparent. Ishtar, déesse babylonienne de l'amour et de la guerre, est leur archétype — rappelant que la beauté a deux faces : elle peut élever comme elle peut asservir. Le vrai travail du 6 est d'apprendre à aimer sans perdre son centre.",
    astre: "Vénus ♀"
  },
  7: {
    titre: "Le Neptunien",
    force: "Mystère, intuition profonde, spiritualité",
    defi: "Illusion, fuite du réel, dissolution",
    interpretation: "Le 7 chaldéen est associé à Neptune et à la Lune du voile — le monde de l'invisible, du rêve et de la divination. C'est la vibration des initiés, des chamans et des mystiques. Ceux qui portent fortement le 7 ont une connexion naturelle au plan subtil et une faculté prophétique que la logique ordinaire ne suffit pas à expliquer. Enki, dieu sumérien des abysses et de la sagesse cachée, est leur gardien. Leur péril : se noyer dans le symbolique au détriment du concret.",
    astre: "Neptune ♆"
  },
  8: {
    titre: "Le Saturnien",
    force: "Endurance, karma, maîtrise du temps",
    defi: "Fardeau karmique, lenteur, résistance",
    interpretation: "Le 8 chaldéen est le nombre de Saturne — planète du karma, du temps long et des épreuves qui forgent. Là où le 8 pythagoricien est tourné vers la réussite matérielle, le 8 chaldéen porte une dimension plus lourde : celle du destin inévitable à accomplir. Les porteurs du 8 ont souvent une vie marquée par des épreuves précoces qui s'avèrent, avec le recul, les meilleurs formateurs. Ninurta, dieu babylonien de la guerre et de l'agriculture — celui qui laboure la terre dure —, est leur archétype. Leur victoire est celle qui s'est méritée.",
    astre: "Saturne ♄"
  },
  9: {
    titre: "Le Sacré",
    force: "Divinité, complétude, universalité",
    defi: "Inatteignable comme vibration humaine",
    interpretation: "Le 9 est la vibration de l'Absolu dans la tradition chaldéenne — si parfaite qu'aucune lettre de l'alphabet ne peut la porter sans la profaner. C'est le nombre de la complétude divine, de la totalité du cosmos. Les anciens Babyloniens considéraient le 9 comme le nombre des dieux supérieurs, intouchable par la réalité humaine. Dans un calcul chaldéen, si le résultat final est 9, c'est considéré comme une vibration de mission transcendante — rare et exigeante. Le 9 n'est pas attribué aux lettres : il reste libre, sacré, disponible pour le divin.",
    astre: "Mars ♂ (gardien)"
  }
};

// ─── NOMBRES COMPOSÉS (10–52) ─────────────────────────────
const COMPOSES = {
  10: { titre: "La Roue du Destin", polarite: "favorable", msg: "Montées et descentes alternées. La fortune est cyclique — les hauts succèdent aux bas avec une régularité karmique. Apprendre à surfer les cycles plutôt qu'à les subir." },
  11: { titre: "Le Guerrier masqué", polarite: "attention", msg: "Force cachée sous une apparence ordinaire. Grande puissance potentielle, mais risque de la retourner contre soi. L'ennemi le plus redoutable est intérieur." },
  12: { titre: "L'Inversé", polarite: "attention", msg: "Sacrifice et abnégation. Tendance à se retrouver victime de circonstances ou des autres. Leçon : apprendre à recevoir autant qu'à donner, et à identifier les drains d'énergie." },
  13: { titre: "Le Phénix", polarite: "neutre", msg: "Transformation profonde par les épreuves. Ce nombre n'est pas maudit : il indique un changement radical qui détruit l'ancien pour libérer le nouveau. La renaissance est au bout." },
  14: { titre: "Le Mouvement", polarite: "attention", msg: "Adaptabilité forcée. Ce nombre demande de rester souple face à des changements imprévus. Éviter les dépendances (substances, personnes). La prudence est la vertu cardinale." },
  15: { titre: "Le Mage", polarite: "favorable", msg: "Don pour les arts occultes, la persuasion et la magie de l'existence. Grande capacité à manifester. Attention à ne pas utiliser ce pouvoir pour des fins manipulatrices." },
  16: { titre: "La Tour brisée", polarite: "attention", msg: "Choc libérateur. Ce nombre annonce une épreuve apparemment destructrice qui s'avère purificatrice. La reconstruction sera plus solide. Accepter ce qui doit tomber." },
  17: { titre: "L'Étoile du Berger", polarite: "favorable", msg: "Vibration de l'espoir, de la renommée et de l'amour durable. Après les épreuves du 16 vient la lumière du 17. Protection divine dans les moments sombres." },
  18: { titre: "Le Miroir voilé", polarite: "attention", msg: "Tension entre monde matériel et monde spirituel. Risque de se laisser tromper par les apparences ou de tromper soi-même. La clairvoyance est la clé." },
  19: { titre: "Le Prince du Ciel", polarite: "favorable", msg: "Succès, rayonnement et accomplissement. L'un des nombres les plus fortunés du système chaldéen. Après les leçons des nombres précédents, la récolte." },
  20: { titre: "L'Éveil", polarite: "neutre", msg: "Appel à une prise de conscience. Ce nombre marque un tournant dans la destinée — une décision importante doit être prise. La clarté s'impose d'elle-même." },
  21: { titre: "La Couronne", polarite: "favorable", msg: "Victoire méritée et reconnaissance. L'intelligence associée à l'effort finit par triompher. Nombre de la réussite après une longue marche." },
  22: { titre: "L'Imprudent", polarite: "attention", msg: "Attention aux erreurs de jugement et aux faux-pas. Ce nombre peut donner accès à des pouvoirs hors du commun, mais les retournements sont rapides si la prudence est négligée." }
};

// ─── UTILITAIRES ─────────────────────────────────────────
function valeurLettre(c) { return CHALD_TABLE[c] || 0; }

function reduireChald(n) {
  while (n > 9) {
    n = String(n).split('').reduce((s, d) => s + parseInt(d), 0);
  }
  return n;
}

function sommeMot(mot) {
  return mot.split('').reduce((s, c) => s + (valeurLettre(c) || 0), 0);
}

function preparerMot(str) {
  return str.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
}

function preparerMots(str) {
  return str.trim().split(/\s+/).map(preparerMot).filter(w => w.length > 0);
}

// ─── CALCULS PRINCIPAUX ──────────────────────────────────
function nombreActif(prenom) {
  const mots = preparerMots(prenom);
  const partiels = mots.map(m => ({ mot: m, brut: sommeMot(m), val: reduireChald(sommeMot(m)) }));
  const somme = partiels.reduce((s, p) => s + p.val, 0);
  const brut = somme;
  return { val: reduireChald(somme), brut, partiels };
}

function nombreDestin(prenom, nom) {
  const mots = preparerMots(prenom + ' ' + nom);
  const partiels = mots.map(m => ({ mot: m, brut: sommeMot(m), val: reduireChald(sommeMot(m)) }));
  const somme = partiels.reduce((s, p) => s + p.val, 0);
  const compose = somme <= 52 && somme >= 10 ? somme : null;
  return { val: reduireChald(somme), brut: somme, compose, partiels };
}

function nombreNaissance(jour) {
  const compose = jour >= 10 && jour <= 52 ? jour : null;
  return { val: reduireChald(jour), brut: jour, compose };
}

function nombreVie(j, m, a) {
  const digits = (String(j) + String(m) + String(a)).split('').map(Number);
  const somme = digits.reduce((s, d) => s + d, 0);
  const compose = somme >= 10 && somme <= 52 ? somme : null;
  return { val: reduireChald(somme), brut: somme, compose };
}

// ─── CONSTRUCTION HTML ───────────────────────────────────
function infoCompose(compose) {
  if (!compose || !COMPOSES[compose]) return '';
  const c = COMPOSES[compose];
  const couleur = c.polarite === 'favorable' ? 'emerald' : c.polarite === 'attention' ? 'rose' : 'gold';
  return `<div class="ch-compose cf-bg-${couleur}">
    <span class="ch-compose-num cf-${couleur}">${compose}</span>
    <div class="ch-compose-info">
      <strong class="cf-${couleur}">${c.titre}</strong>
      <p>${c.msg}</p>
    </div>
  </div>`;
}

function buildFormule(r) {
  const motPartiels = (partiels, couleur) =>
    partiels.map((p, i) =>
      `${i > 0 ? '<span class="pf-op">+</span>' : ''}
      <span class="pf-box cf-bg-${couleur}"><span class="pf-wname">${p.mot}</span><span class="pf-wval">${p.val}</span></span>`
    ).join('');

  return `<div class="pyth-formule">
    <div class="pf-row">
      <span class="pf-lbl">Nombre Actif</span>
      <div class="pf-calc">
        ${motPartiels(r.actifDetail.partiels, 'emerald')}
        <span class="pf-op">=</span>
        <span class="pf-sum">${r.actifDetail.brut}</span>
        <span class="pf-arrow">→</span>
        <span class="pf-res cf-emerald"><strong>${r.actif}</strong></span>
      </div>
    </div>
    <div class="pf-row">
      <span class="pf-lbl">Nombre de Destin</span>
      <div class="pf-calc">
        ${motPartiels(r.destinDetail.partiels, 'violet')}
        <span class="pf-op">=</span>
        <span class="pf-sum">${r.destinDetail.brut}</span>
        <span class="pf-arrow">→</span>
        <span class="pf-res cf-violet"><strong>${r.destin}</strong></span>
        ${r.destinDetail.compose ? `<span class="pf-compose-hint">(composé ${r.destinDetail.compose})</span>` : ''}
      </div>
    </div>
    <div class="pf-row">
      <span class="pf-lbl">Nombre de Naissance</span>
      <div class="pf-calc">
        <span class="pf-box cf-bg-rose"><span class="pf-wname">jour</span><span class="pf-wval">${r.naissanceDetail.brut}</span></span>
        <span class="pf-arrow">→</span>
        <span class="pf-res cf-rose"><strong>${r.naissance}</strong></span>
        ${r.naissanceDetail.compose ? `<span class="pf-compose-hint">(composé ${r.naissanceDetail.compose})</span>` : ''}
      </div>
    </div>
    <div class="pf-row">
      <span class="pf-lbl">Nombre de Vie</span>
      <div class="pf-calc">
        <span class="pf-box cf-bg-cyan"><span class="pf-wname">date complète</span><span class="pf-wval">${r.vieDetail.brut}</span></span>
        <span class="pf-arrow">→</span>
        <span class="pf-res cf-cyan"><strong>${r.vie}</strong></span>
        ${r.vieDetail.compose ? `<span class="pf-compose-hint">(composé ${r.vieDetail.compose})</span>` : ''}
      </div>
    </div>
  </div>`;
}

function buildCoreGrid(r) {
  const cores = [
    { role: 'actif',      label: "Nombre Actif",       val: r.actif,     col: 'emerald', note: "Qui tu es au quotidien",       compose: r.actifDetail.brut },
    { role: 'destin',     label: "Nombre de Destin",   val: r.destin,    col: 'violet',  note: "Ta mission globale",            compose: r.destinDetail.compose },
    { role: 'naissance',  label: "Nombre de Naissance",val: r.naissance, col: 'rose',    note: "Ton don inné à la naissance",   compose: r.naissanceDetail.compose },
    { role: 'vie',        label: "Nombre de Vie",       val: r.vie,       col: 'cyan',    note: "Ton chemin de vie global",      compose: r.vieDetail.compose },
  ];
  return cores.map(c => {
    const vib = VIBRATIONS[c.val] || {};
    return `<div class="core-card cp-${c.role}">
      <div class="core-num cf-${c.col}">${c.val}</div>
      <div class="core-label">${c.label}</div>
      <div class="core-titre">${vib.titre || ''}</div>
      <div class="core-note">${c.note}</div>
      ${c.compose && c.compose !== c.val && COMPOSES[c.compose]
        ? `<div class="core-compose-badge cf-gold">composé ${c.compose} — ${COMPOSES[c.compose].titre}</div>`
        : ''}
    </div>`;
  }).join('');
}

function buildDetails(r) {
  const cards = [
    { role: 'actif',     label: "Nombre Actif",        val: r.actif,    col: 'emerald', note: "La vibration que tu incarnes dans ta vie active et quotidienne", compose: r.actifDetail },
    { role: 'destin',    label: "Nombre de Destin",    val: r.destin,   col: 'violet',  note: "Calculé sur ton nom complet — ta mission sur le plan cosmique",   compose: r.destinDetail },
    { role: 'naissance', label: "Nombre de Naissance", val: r.naissance,col: 'rose',    note: "Le jour de naissance conservé — le don que tu as apporté",        compose: r.naissanceDetail },
    { role: 'vie',       label: "Nombre de Vie",        val: r.vie,      col: 'cyan',    note: "La somme vibratoire de ta date complète — le fil directeur",      compose: r.vieDetail },
  ];
  return cards.map(c => {
    const vib = VIBRATIONS[c.val] || {};
    return `<div class="pd-card pd-${c.role}">
      <div class="pd-header">
        <div class="pd-num cf-${c.col}">${c.val}</div>
        <div class="pd-info">
          <h4 class="pd-titre cf-${c.col}">${c.label} — ${vib.titre || ''}</h4>
          <p class="pd-note">${c.note}</p>
        </div>
      </div>
      <div class="pd-keys">
        <span class="pd-key pd-force">✦ ${vib.force || ''}</span>
        <span class="pd-key pd-defi">◈ ${vib.defi || ''}</span>
        ${vib.astre ? `<span class="pd-key pd-astre">⬡ ${vib.astre}</span>` : ''}
      </div>
      <p class="pd-interp">${vib.interpretation || ''}</p>
      ${c.compose && c.compose.compose ? infoCompose(c.compose.compose) : ''}
    </div>`;
  }).join('');
}

function afficherResultats(r) {
  document.getElementById('chaldFormule').innerHTML = buildFormule(r);
  document.getElementById('chaldCoreGrid').innerHTML = buildCoreGrid(r);
  document.getElementById('chaldDetails').innerHTML = buildDetails(r);

  const shareZone = document.getElementById('shareImageZone');
  if (shareZone && window.PlateformePartage) {
    shareZone.innerHTML = '';
    window.PlateformePartage.afficherBoutons(shareZone, {
      cible: '#chaldResultats',
      titre: 'numerologie-chaldeenne'
    });
  }

  const section = document.getElementById('chaldResultats');
  section.hidden = false;
  setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}

// ─── GRILLE DES 9 VIBRATIONS ─────────────────────────────
function buildVibrationsGrid() {
  const grid = document.getElementById('chaldVibrationsGrid');
  if (!grid) return;

  const html = Object.entries(VIBRATIONS).map(([num, v]) => `
    <div class="archetype-card c-${num === '9' ? 'special9' : num}" role="button" tabindex="0"
         aria-label="Vibration ${num} — ${v.titre}"
         data-interp="${v.interpretation.replace(/"/g, '&quot;')}">
      <div class="card-inner">
        <div class="card-front">
          <div class="num-circle">${num}</div>
          <div class="force">${v.titre}</div>
          <div class="faiblesse">${v.force}</div>
          <div class="ch-astre-badge">${v.astre}</div>
          <div class="flip-hint">↻ Voir l'ombre</div>
        </div>
        <div class="card-back">
          <p>${v.interpretation.slice(0, 240)}…</p>
        </div>
      </div>
    </div>`).join('');
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

// ─── VALIDATION & ÉVÉNEMENTS ─────────────────────────────
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  buildVibrationsGrid();

  const form = document.getElementById('chald-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const j      = parseInt(document.getElementById('chald-jour').value);
    const m      = parseInt(document.getElementById('chald-mois').value);
    const a      = parseInt(document.getElementById('chald-annee').value);
    const prenom = document.getElementById('chald-prenom').value.trim();
    const nom    = document.getElementById('chald-nom').value.trim();

    if (!j || !m || !a || j < 1 || j > 31 || m < 1 || m > 12 || a < 1900 || a > 2100)
      return showToast('Date de naissance invalide.');
    if (!prenom) return showToast('Merci d\'entrer votre prénom usuel.');
    if (!nom)    return showToast('Merci d\'entrer votre nom de famille.');

    const actifD    = nombreActif(prenom);
    const destinD   = nombreDestin(prenom, nom);
    const naissD    = nombreNaissance(j);
    const vieD      = nombreVie(j, m, a);

    afficherResultats({
      actif: actifD.val,       actifDetail: actifD,
      destin: destinD.val,     destinDetail: destinD,
      naissance: naissD.val,   naissanceDetail: naissD,
      vie: vieD.val,           vieDetail: vieD,
      prenom, nom, jour: j, mois: m, annee: a
    });
  });

  document.getElementById('chald-exemple').addEventListener('click', () => {
    document.getElementById('chald-jour').value   = '15';
    document.getElementById('chald-mois').value  = '11';
    document.getElementById('chald-annee').value = '1990';
    document.getElementById('chald-prenom').value = 'Marie';
    document.getElementById('chald-nom').value    = 'Dupont';
    form.dispatchEvent(new Event('submit'));
  });
});
