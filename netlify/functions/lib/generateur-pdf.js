/* ── Générateur PDF — Rapport d'Incarnation ───────────────────────────────
   pdfkit A4, bufferPages:true pour footer post-rendu.
   Palette : bleu marine #0d1b2a · or #d4af37 · crème #faf7f2              */

import PDFDocument from 'pdfkit';
import { CARD_DATA } from './tarot-data.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONT_SANS       = join(__dirname, 'fonts/Sans-Regular.ttf');
const FONT_SANS_BOLD  = join(__dirname, 'fonts/Sans-Bold.ttf');
const FONT_SERIF      = join(__dirname, 'fonts/Serif-Regular.ttf');
const FONT_SERIF_BOLD = join(__dirname, 'fonts/Serif-Bold.ttf');
const FONT_SERIF_ITAL = join(__dirname, 'fonts/Serif-Italic.ttf');

// ── Palette ────────────────────────────────────────────────────────────────
const NAVY  = '#0d1b2a';
const GOLD  = '#d4af37';
const DARK  = '#1a1a2e';
const MUTED = '#6b7280';
const LIGHT = '#f0e6cc';
const LGRAY = '#e2e8f0';

const W  = 595.28;
const H  = 841.89;
const ML = 55;
const MR = 55;
const MT = 55;
const MB = 60;
const CW = W - ML - MR;

// ── Helpers ────────────────────────────────────────────────────────────────
function hLine(doc, y, color = GOLD, lw = 0.5) {
  doc.moveTo(ML, y).lineTo(W - MR, y).lineWidth(lw).strokeColor(color).stroke();
}

function ensureSpace(doc, needed) {
  if (doc.y + needed > H - MB) doc.addPage();
}

function pageHeader(doc, label) {
  doc.rect(0, 0, W, 8).fill(NAVY);
  doc.fillColor(GOLD).font(FONT_SANS).fontSize(6)
     .text(label.toUpperCase(), ML, 14, { width: CW, align: 'right', characterSpacing: 1.5 });
  doc.y = MT;
}

function footer(doc, pageNum, total, annee) {
  const y = H - 35;
  hLine(doc, y, GOLD, 0.3);
  doc.fillColor(MUTED).font(FONT_SANS).fontSize(7)
     .text(`Plateforme des Mystères  ·  Rapport d'Incarnation ${annee}`, ML, y + 6, { width: CW * 0.65 });
  doc.fillColor(GOLD).font(FONT_SANS).fontSize(7)
     .text(`${pageNum} / ${total}`, ML, y + 6, { width: CW, align: 'right' });
}

function numberBlock(doc, x, y, num, lbl) {
  const bw = 78, bh = 68;
  doc.rect(x, y, bw, bh).fill(NAVY);
  doc.rect(x + 0.5, y + 0.5, bw - 1, bh - 1).lineWidth(0.8).strokeColor(GOLD).stroke();
  doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(30)
     .text(String(num), x, y + 8, { width: bw, align: 'center' });
  doc.fillColor(LIGHT).font(FONT_SANS).fontSize(6.5)
     .text(lbl.toUpperCase(), x, y + 48, { width: bw, align: 'center', characterSpacing: 0.8 });
}

function sectionTitle(doc, numero, titre, sousTitre) {
  doc.addPage();
  pageHeader(doc, 'Rapport d\'Incarnation');
  const ty = doc.y;
  doc.rect(ML - 5, ty, CW + 10, 42).fill(NAVY);
  doc.fillColor(GOLD).font(FONT_SANS).fontSize(7)
     .text(numero, ML, ty + 5, { width: CW, align: 'center', characterSpacing: 1.5 });
  doc.fillColor(LIGHT).font(FONT_SANS_BOLD).fontSize(14)
     .text(titre, ML, ty + 16, { width: CW, align: 'center' });
  doc.y = ty + 42 + 6;
  if (sousTitre) {
    doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(9)
       .text(sousTitre.toUpperCase(), ML, doc.y, { width: CW, align: 'center', characterSpacing: 1.2 });
    doc.y += 4;
  }
  hLine(doc, doc.y, GOLD, 0.5);
  doc.y += 14;
}

function lbl(doc, text) {
  doc.x = ML;
  doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(7.5)
     .text(text.toUpperCase(), ML, doc.y, { width: CW, characterSpacing: 1.2 });
  doc.y += 6;
}

function body(doc, text, opts = {}) {
  doc.x = ML;
  doc.fillColor(opts.color || DARK)
     .font(opts.font || FONT_SERIF)
     .fontSize(opts.size || 10.5)
     .lineGap(opts.gap || 3)
     .text(text, ML, doc.y, { width: CW, align: opts.align || 'justify' });
  doc.y += opts.after || 10;
}

// ── COUVERTURE ─────────────────────────────────────────────────────────────
function drawCover(doc, profil) {
  doc.rect(0, 0, W, H).fill(NAVY);

  doc.fillColor(GOLD).font(FONT_SANS).fontSize(8)
     .text('✦  ✦  ✦', 0, 60, { width: W, align: 'center', characterSpacing: 6 });

  doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(40)
     .text('◈', 0, H * 0.22, { width: W, align: 'center' });

  doc.fillColor(LIGHT).font(FONT_SANS_BOLD).fontSize(26)
     .text('RAPPORT', 0, H * 0.36, { width: W, align: 'center', characterSpacing: 1.5 });
  doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(26)
     .text('D\'INCARNATION', 0, doc.y, { width: W, align: 'center', characterSpacing: 1.5 });

  const sepY = doc.y + 12;
  doc.moveTo(W * 0.3, sepY).lineTo(W * 0.7, sepY).lineWidth(0.5).strokeColor(GOLD).stroke();

  doc.fillColor(GOLD).font(FONT_SANS).fontSize(7.5)
     .text('TAROT  ·  NUMÉROLOGIE  ·  ASTROLOGIE  ·  TIKOUN', 0, sepY + 12, { width: W, align: 'center', characterSpacing: 2 });

  doc.fillColor(LIGHT).font(FONT_SANS_BOLD).fontSize(22)
     .text(`${profil.prenom.toUpperCase()} ${profil.nom.toUpperCase()}`, 0, H * 0.58, { width: W, align: 'center' });
  doc.fillColor(MUTED).font(FONT_SANS).fontSize(9)
     .text('né(e) le ' + profil.dateNaissance, 0, doc.y + 4, { width: W, align: 'center', characterSpacing: 1 });

  doc.moveTo(W * 0.25, H * 0.72).lineTo(W * 0.75, H * 0.72).lineWidth(0.3).strokeColor(GOLD).stroke();

  doc.fillColor(MUTED).font(FONT_SANS).fontSize(7)
     .text('PLATEFORME DES MYSTÈRES', 0, H - 65, { width: W, align: 'center', characterSpacing: 3 });
  doc.fillColor(MUTED).font(FONT_SANS).fontSize(7)
     .text(String(profil.anneeRapport), 0, H - 50, { width: W, align: 'center' });
}

// ── VUE D'ENSEMBLE ────────────────────────────────────────────────────────
function drawOverview(doc, profil, contenu) {
  doc.addPage();
  pageHeader(doc, 'Vue d\'ensemble');

  doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(18)
     .text('Votre Portrait d\'Incarnation', ML, doc.y, { width: CW });
  doc.y += 6;
  hLine(doc, doc.y, GOLD);
  doc.y += 16;

  // Grille 5 nombres
  const bw = 78, gap = (CW - bw * 5) / 4;
  const startY = doc.y;
  [
    { val: profil.cheminDeVie,      lbl: 'Chemin de vie'    },
    { val: profil.expression,       lbl: 'Expression'       },
    { val: profil.ame,              lbl: 'Âme'              },
    { val: profil.personnalite,     lbl: 'Personnalité'     },
    { val: profil.anneePersonnelle, lbl: 'Année perso.'    },
  ].forEach((n, i) => numberBlock(doc, ML + i * (bw + gap), startY, n.val, n.lbl));
  doc.y = startY + 68 + 18;

  // Bande astrologie / tarot
  hLine(doc, doc.y - 6, LGRAY, 0.3);
  const colW = CW / 5;
  const rowY  = doc.y + 4;
  [
    { l: 'Signe',         v: profil.signe },
    { l: 'Élément',       v: profil.element },
    { l: 'Modalité',      v: profil.modalite },
    { l: 'Arcane de vie', v: profil.arcaneVie.nom },
    { l: 'Arcane du cycle', v: profil.arcaneAnnee.nom },
  ].forEach((item, i) => {
    const x = ML + i * colW;
    doc.fillColor(MUTED).font(FONT_SANS).fontSize(7)
       .text(item.l.toUpperCase(), x, rowY, { width: colW, align: 'center', characterSpacing: 0.8 });
    doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(9)
       .text(item.v, x, rowY + 12, { width: colW, align: 'center' });
  });
  doc.y = rowY + 32;
  hLine(doc, doc.y, LGRAY, 0.3);
  doc.y += 16;

  lbl(doc, 'Portrait narratif');
  body(doc, contenu.synthese.portrait, { font: FONT_SERIF_ITAL, gap: 4 });

  if (profil.nombresAbsents.length > 0) {
    doc.y += 4;
    lbl(doc, 'Leçons karmiques');
    body(doc, profil.nombresAbsents.map(n => {
      const l = contenu.lecons.find(x => x.numero === n);
      return l ? `${n} — ${l.titre}` : String(n);
    }).join('  ·  '), { font: FONT_SANS, size: 9, color: MUTED, after: 4 });
  }

  if (profil.dettesKarmiques.length > 0) {
    lbl(doc, 'Dettes karmiques');
    body(doc, profil.dettesKarmiques.map(d => {
      const x = contenu.dettes.find(k => k.numero === d);
      return x ? `${d} — ${x.titre}` : String(d);
    }).join('  ·  '), { font: FONT_SANS, size: 9, color: MUTED, after: 4 });
  }
}

// ── CHEMIN DE VIE ──────────────────────────────────────────────────────────
function drawCheminDeVie(doc, profil, contenu) {
  const c = contenu.cheminDeVie;
  sectionTitle(doc, '01 — NUMÉROLOGIE', 'Le Chemin de Vie', c.titre);

  const startY = doc.y;
  numberBlock(doc, ML, startY, profil.cheminDeVie, 'Chemin de vie');
  doc.fillColor(DARK).font(FONT_SERIF).fontSize(10.5).lineGap(3)
     .text(c.corps, ML + 94, startY, { width: CW - 94, align: 'justify' });
  doc.y = Math.max(doc.y, startY + 68 + 6) + 16;

  hLine(doc, doc.y - 8, GOLD, 0.3);
  lbl(doc, 'Ce que ce chemin demande concrètement');
  body(doc, `Vivre le chemin de vie ${profil.cheminDeVie} pleinement implique d'accepter la responsabilité de ce que vous portez naturellement, sans le minimiser ni l'exagérer. Là où vous vous retrouvez à attendre la permission d'agir, rappelez-vous que ce chemin s'active quand vous décidez. Les moments où vous vous sentez le plus vivant sont les meilleurs indicateurs que vous êtes dans votre axe.`);
}

// ── EXPRESSION & ÂME ───────────────────────────────────────────────────────
function drawExpressionAme(doc, profil, contenu) {
  sectionTitle(doc, '02 — NUMÉROLOGIE', 'Expression & Âme',
    `${contenu.expression.titre}  ·  ${contenu.ame.titre}`);

  lbl(doc, `Nombre d'Expression — ${profil.expression}  ·  Ce que vous projetez`);
  const y1 = doc.y;
  numberBlock(doc, ML, y1, profil.expression, 'Expression');
  doc.fillColor(DARK).font(FONT_SERIF).fontSize(10.5).lineGap(3)
     .text(contenu.expression.corps, ML + 94, y1, { width: CW - 94, align: 'justify' });
  doc.y = Math.max(doc.y, y1 + 68 + 6) + 18;

  hLine(doc, doc.y - 6, LGRAY, 0.3);
  doc.y += 10;
  lbl(doc, `Nombre de l'Âme — ${profil.ame}  ·  Vos aspirations profondes`);
  const y2 = doc.y;
  numberBlock(doc, ML, y2, profil.ame, 'Âme');
  doc.fillColor(DARK).font(FONT_SERIF).fontSize(10.5).lineGap(3)
     .text(contenu.ame.corps, ML + 94, y2, { width: CW - 94, align: 'justify' });
  doc.y = Math.max(doc.y, y2 + 68 + 6) + 16;

  hLine(doc, doc.y - 8, GOLD, 0.3);
  lbl(doc, 'La relation entre ces deux nombres');
  const rel = profil.expression === profil.ame
    ? `Votre expression (${profil.expression}) et votre âme (${profil.ame}) portent le même nombre — une cohérence rare entre ce que vous projetez et ce que vous désirez intimement. Moins d'énergie perdue en contradictions internes, plus de puissance disponible pour avancer dans votre direction.`
    : `Votre expression (${profil.expression}) et votre âme (${profil.ame}) vibrent différemment. Ce que vous montrez au monde n'est pas toujours aligné avec ce que vous ressentez profondément. Cette tension est productive : elle vous invite à créer des espaces de vie où vous pouvez être les deux à la fois.`;
  body(doc, rel);
}

// ── PERSONNALITÉ & ANNÉE PERSONNELLE ──────────────────────────────────────
function drawPersonnaliteAnnee(doc, profil, contenu) {
  sectionTitle(doc, '03 — NUMÉROLOGIE', 'Personnalité & Cycle en Cours', contenu.anneePerso.titre);

  lbl(doc, `Nombre de Personnalité — ${profil.personnalite}  ·  L'image que vous projetez`);
  const y1 = doc.y;
  numberBlock(doc, ML, y1, profil.personnalite, 'Personnalité');
  doc.fillColor(DARK).font(FONT_SERIF).fontSize(10.5).lineGap(3)
     .text(contenu.personnalite.corps, ML + 94, y1, { width: CW - 94, align: 'justify' });
  doc.y = Math.max(doc.y, y1 + 68 + 6) + 20;

  hLine(doc, doc.y - 6, LGRAY, 0.3);
  doc.y += 12;
  lbl(doc, `Année Personnelle ${profil.anneeRapport} — Cycle ${profil.anneePersonnelle}`);
  const y2 = doc.y;
  numberBlock(doc, ML, y2, profil.anneePersonnelle, `Année ${profil.anneeRapport}`);
  doc.fillColor(DARK).font(FONT_SERIF).fontSize(10.5).lineGap(3)
     .text(contenu.anneePerso.corps, ML + 94, y2, { width: CW - 94, align: 'justify' });
  doc.y = Math.max(doc.y, y2 + 68 + 6) + 16;

  hLine(doc, doc.y - 8, GOLD, 0.3);
  lbl(doc, 'Invitation pratique pour cette année');
  body(doc, `En année personnelle ${profil.anneePersonnelle}, l'énergie disponible est particulièrement adaptée à un type d'action précis. Travailler dans le sens de ce cycle plutôt que contre lui ne signifie pas subir — c'est utiliser le vent plutôt que de ramer contre lui. Notez ce que vous voulez avoir accompli à la fin de cette année : c'est votre boussole personnelle pour les douze prochains mois.`);
}

// ── ARCANE DE VIE ──────────────────────────────────────────────────────────
function drawArcaneVie(doc, profil, contenu) {
  const arcane = profil.arcaneVie;
  const card   = CARD_DATA[arcane.key] || CARD_DATA['01'];
  sectionTitle(doc, '04 — TAROT DE MARSEILLE', 'L\'Arcane de Vie', arcane.nom);

  const y1 = doc.y;
  numberBlock(doc, ML, y1, arcane.numero, 'Arcane de vie');
  doc.fillColor(DARK).font(FONT_SERIF).fontSize(10.5).lineGap(3)
     .text(`L'Arcane ${arcane.nom} est le mythe intérieur qui traverse toute votre histoire. Il ne désigne pas une période ni un événement — il nomme l'énergie fondamentale qui opère en arrière-plan de votre vie, souvent sans que vous en ayez conscience. C'est la carte qui revient, le thème récurrent, la tension centrale que vous rencontrez sous mille formes différentes.`,
       ML + 94, y1, { width: CW - 94, align: 'justify' });
  doc.y = Math.max(doc.y, y1 + 68 + 6) + 16;

  hLine(doc, doc.y - 8, GOLD, 0.3);
  lbl(doc, 'Registre lumineux');
  body(doc, `${arcane.nom} dans son registre actif porte l'énergie du ${card.theme}.`);

  lbl(doc, 'Registre d\'ombre');
  body(doc, `Dans son registre d'ombre, cet arcane peut manifester ${card.shadow}.`);

  lbl(doc, 'Comment travailler avec cet arcane');
  body(doc, `Reconnaître la présence de ${arcane.nom} dans votre histoire ne signifie pas y être enfermé — c'est l'occasion de travailler consciemment avec cette énergie. Là où vous retrouvez ses thèmes (dans vos relations, vos blocages, vos élans), vous avez une ouverture vers une croissance profonde.`);
}

// ── ARCANE DE L'ANNÉE ──────────────────────────────────────────────────────
function drawArcaneAnnee(doc, profil, contenu) {
  const arcane = profil.arcaneAnnee;
  const card   = CARD_DATA[arcane.key] || CARD_DATA['01'];
  sectionTitle(doc, '05 — TAROT DE MARSEILLE', `L'Arcane du Cycle ${profil.anneeRapport}`, arcane.nom);

  const y1 = doc.y;
  numberBlock(doc, ML, y1, arcane.numero, `Cycle ${profil.anneeRapport}`);
  doc.fillColor(DARK).font(FONT_SERIF).fontSize(10.5).lineGap(3)
     .text(`L'Arcane du Cycle est un compagnon symbolique pour les douze prochains mois. Là où l'Arcane de Vie est une constante de toute votre existence, celui-ci est une invitation ponctuelle — une énergie que vous traversez en ${profil.anneeRapport} et qui colorera vos défis et opportunités de cette période.`,
       ML + 94, y1, { width: CW - 94, align: 'justify' });
  doc.y = Math.max(doc.y, y1 + 68 + 6) + 16;

  hLine(doc, doc.y - 8, GOLD, 0.3);
  lbl(doc, `L'énergie disponible en ${profil.anneeRapport}`);
  body(doc, `${arcane.nom} porte cette année l'invitation suivante : ${card.theme}. Cette énergie est à la fois une ressource et un défi.`);

  lbl(doc, 'Ce qui est à surveiller');
  body(doc, `L'ombre de cet arcane — ${card.shadow} — peut se manifester si vous résistez à son invitation principale.`);

  if (arcane.numero !== profil.arcaneVie.numero) {
    lbl(doc, `Dialogue avec l'Arcane de Vie (${profil.arcaneVie.nom})`);
    body(doc, `Ces deux arcanes en dialogue pour ${profil.anneeRapport} créent une dynamique particulière : votre mythe fondamental (${profil.arcaneVie.nom}) rencontre l'énergie de passage de ${arcane.nom}. Méditez ce croisement : qu'est-ce que l'énergie de l'année vient activer dans votre histoire fondamentale ?`);
  }
}

// ── ASTROLOGIE SOLAIRE ────────────────────────────────────────────────────
function drawSigne(doc, profil, contenu) {
  sectionTitle(doc, '06 — ASTROLOGIE SOLAIRE', 'Signe, Élément & Modalité', profil.signe);

  const colW3 = CW / 3;
  const gY = doc.y;
  [
    { l: 'Signe',    v: profil.signe    },
    { l: 'Élément',  v: profil.element  },
    { l: 'Modalité', v: profil.modalite },
  ].forEach((item, i) => {
    const x = ML + i * colW3;
    doc.rect(x + 4, gY, colW3 - 8, 52).fill('#f1f5f9');
    doc.fillColor(MUTED).font(FONT_SANS).fontSize(7)
       .text(item.l.toUpperCase(), x + 4, gY + 8, { width: colW3 - 8, align: 'center', characterSpacing: 1 });
    doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(16)
       .text(item.v, x + 4, gY + 20, { width: colW3 - 8, align: 'center' });
  });
  doc.y = gY + 64;

  hLine(doc, doc.y - 6, GOLD, 0.3);
  lbl(doc, `Portrait du ${profil.signe}`);
  body(doc, contenu.signe.corps, { gap: 4 });

  lbl(doc, `L'élément ${profil.element} dans votre vie`);
  const elemTextes = {
    'Feu':   'Le Feu donne l\'élan, l\'enthousiasme, la capacité de s\'enflammer pour ce qui compte. Il demande d\'apprendre à ne pas tout consumer dans l\'urgence.',
    'Terre': 'La Terre donne la patience, la fidélité, la capacité de construire sur la durée. Elle demande de s\'assouplir là où la vie réclame du mouvement.',
    'Air':   'L\'Air donne la fluidité, la curiosité, la capacité de relier les idées et les personnes. Il demande de s\'ancrer dans le concret pour que ses idées prennent forme.',
    'Eau':   'L\'Eau donne la profondeur, la sensibilité, la capacité de ressentir ce qui ne se dit pas. Elle demande de tracer des frontières pour que sa richesse ne s\'épuise pas.',
  };
  body(doc, elemTextes[profil.element] || '');

  lbl(doc, `Modalité ${profil.modalite} — votre style d'action`);
  const modalTextes = {
    'Cardinal': 'Les signes Cardinaux initient — ils ont une capacité naturelle à lancer, à démarrer, à ouvrir de nouveaux cycles. Leur défi est de tenir dans la durée ce qu\'ils commencent avec énergie.',
    'Fixe':     'Les signes Fixes persistent — ils ont une capacité naturelle à tenir le cap face à ce qui veut dévier leur trajectoire. Leur défi est d\'apprendre à lâcher ce qui ne sert plus leur croissance.',
    'Mutable':  'Les signes Mutables s\'adaptent — ils ont une capacité naturelle à évoluer selon les besoins de la situation. Leur défi est de trouver un fil directeur stable au cœur de leur fluidité.',
  };
  body(doc, modalTextes[profil.modalite] || '');
}

// ── TIKOUN — LEÇONS & DETTES ──────────────────────────────────────────────
function drawKarmique(doc, profil, contenu) {
  sectionTitle(doc, '07 — NUMÉROLOGIE PROFONDE', 'Tikoun — Leçons & Dettes Karmiques',
    'Ce que cette vie vous invite à traverser');

  body(doc, `En numérologie, les nombres absents de votre nom de naissance et les valeurs karmiques dans vos calculs pointent vers des domaines que votre âme a choisi d'explorer particulièrement dans cette incarnation. Ce n'est pas une condamnation — c'est une carte précise de là où la croissance la plus profonde vous attend.`);
  doc.y += 6;

  if (contenu.lecons.length > 0) {
    hLine(doc, doc.y, GOLD, 0.3);
    doc.y += 12;
    lbl(doc, 'Leçons karmiques — Nombres absents de votre nom');
    contenu.lecons.forEach(lecon => {
      ensureSpace(doc, 80);
      doc.y += 8;
      const ly = doc.y;
      numberBlock(doc, ML, ly, lecon.numero, 'Absent');
      doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(10)
         .text(lecon.titre, ML + 94, ly, { width: CW - 94 });
      doc.fillColor(DARK).font(FONT_SERIF).fontSize(10.5).lineGap(3)
         .text(lecon.corps, ML + 94, doc.y + 2, { width: CW - 94, align: 'justify' });
      doc.y = Math.max(doc.y, ly + 68 + 6) + 10;
    });
  } else {
    body(doc, `Tous les chiffres de 1 à 9 sont présents dans votre nom de naissance — aucune leçon karmique n'est signalée. Vos axes de croissance se lisent dans les autres dimensions de votre profil.`, { color: MUTED, font: FONT_SERIF_ITAL });
  }

  doc.y += 8;
  hLine(doc, doc.y, GOLD, 0.3);
  doc.y += 12;
  lbl(doc, 'Dettes karmiques — Valeurs intermédiaires dans vos calculs');

  if (contenu.dettes.length > 0) {
    contenu.dettes.forEach(dette => {
      ensureSpace(doc, 90);
      doc.y += 8;
      const dy = doc.y;
      numberBlock(doc, ML, dy, dette.numero, 'Dette');
      doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(10)
         .text(dette.titre, ML + 94, dy, { width: CW - 94 });
      doc.fillColor(DARK).font(FONT_SERIF).fontSize(10.5).lineGap(3)
         .text(dette.corps, ML + 94, doc.y + 2, { width: CW - 94, align: 'justify' });
      doc.y = Math.max(doc.y, dy + 68 + 6) + 10;
    });
  } else {
    body(doc, `Aucune dette karmique détectée dans vos calculs numériques.`, { color: MUTED, font: FONT_SERIF_ITAL });
  }
}

// ── SYNTHÈSE ───────────────────────────────────────────────────────────────
function drawSynthese(doc, profil, contenu) {
  const syn = contenu.synthese;
  sectionTitle(doc, '08 — SYNTHÈSE', 'Convergences & Tensions', 'Le cœur du rapport');

  body(doc, `Cette section croise quatre disciplines différentes pour repérer ce qu'aucune d'elles ne peut voir seule. Les convergences indiquent des énergies qui se renforcent mutuellement. Les tensions révèlent les zones de friction productive — les endroits où votre croissance la plus riche est disponible.`);
  doc.y += 8;

  if (syn.convergences.length > 0) {
    hLine(doc, doc.y, GOLD, 0.3);
    doc.y += 12;
    lbl(doc, '✦ Convergences — Les fils qui se rejoignent');
    syn.convergences.forEach(text => {
      ensureSpace(doc, 45);
      doc.y += 4;
      body(doc, text, { gap: 4 });
    });
  }

  if (syn.tensions.length > 0) {
    doc.y += 6;
    hLine(doc, doc.y, LGRAY, 0.3);
    doc.y += 12;
    lbl(doc, '◈ Tensions productives — Les endroits où grandir');
    syn.tensions.forEach(text => {
      ensureSpace(doc, 45);
      doc.y += 4;
      body(doc, text, { gap: 4 });
    });
  }

  if (syn.texteDettes) {
    doc.y += 6;
    hLine(doc, doc.y, LGRAY, 0.3);
    doc.y += 12;
    lbl(doc, 'Dimension karmique');
    body(doc, syn.texteDettes);
  }

  doc.y += 10;
  hLine(doc, doc.y, GOLD);
  doc.y += 14;
  lbl(doc, 'Portrait de clôture');
  body(doc, syn.portrait, { font: FONT_SERIF_ITAL, size: 11, gap: 4 });
}

// ── CONCLUSION ────────────────────────────────────────────────────────────
function drawConclusion(doc, profil) {
  doc.addPage();
  doc.rect(0, 0, W, H).fill(NAVY);

  doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(36)
     .text('◈', 0, H * 0.2, { width: W, align: 'center' });

  doc.fillColor(LIGHT).font(FONT_SANS_BOLD).fontSize(20)
     .text('Pour aller plus loin', 0, H * 0.3, { width: W, align: 'center' });

  doc.moveTo(W * 0.35, H * 0.37).lineTo(W * 0.65, H * 0.37)
     .lineWidth(0.4).strokeColor(GOLD).stroke();

  const tips = [
    `Méditez une semaine sur votre Arcane de Vie (${profil.arcaneVie.nom}) — notez ce que vous remarquez.`,
    `Chaque matin, posez-vous : "Suis-je dans le sens de l'énergie du cycle ${profil.anneePersonnelle} cette année ?"`,
    `Pour les leçons karmiques : commencez par la plus petite action possible dans ce domaine. L'élan vient du premier pas.`,
    `Ce rapport est un point de départ. Revenez-y dans 6 mois et notez ce qui a bougé.`,
  ];

  let ty = H * 0.41;
  tips.forEach((tip, i) => {
    doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(9)
       .text(`${i + 1}.`, ML + 20, ty, { width: 20 });
    doc.fillColor(LIGHT).font(FONT_SERIF).fontSize(10).lineGap(2)
       .text(tip, ML + 44, ty, { width: CW - 44 });
    ty = doc.y + 14;
  });

  doc.moveTo(W * 0.35, ty + 8).lineTo(W * 0.65, ty + 8)
     .lineWidth(0.4).strokeColor(GOLD).stroke();

  doc.fillColor(MUTED).font(FONT_SERIF_ITAL).fontSize(9)
     .text('Ce rapport n\'est ni un diagnostic médical, ni un conseil psychologique, ni une prédiction.\nUtilisez-le comme un miroir, pas comme un oracle.', 0, ty + 22, { width: W, align: 'center' });
}

// ── NOTE MÉTHODOLOGIQUE ────────────────────────────────────────────────────
function drawMethodo(doc, profil) {
  doc.addPage();
  pageHeader(doc, 'Note méthodologique');

  doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(16)
     .text('Note méthodologique', ML, doc.y, { width: CW });
  doc.y += 6;
  hLine(doc, doc.y, GOLD);
  doc.y += 16;

  const d = new Date();
  const dateStr = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;

  [
    ['Numérologie pythagoricienne', `Table A=1…Z=8/9. Convention : Y = voyelle. Chemin de vie calculé par composants (jour, mois, année réduits séparément). Nombres Maîtres 11, 22, 33 préservés à chaque palier.`],
    ['Astrologie solaire', `Calcul depuis la date de naissance uniquement (sans heure ni lieu). Dates des signes approximatives — pour une précision maximale sur les cuspides, consultez un thème natal complet.`],
    ['Tarot de Marseille', `Deck Nicolas Conver 1760. Arcane de Vie : somme de tous les chiffres de la date, réduit à ≤ 22. Arcane du Cycle : idem avec l'année de génération du rapport.`],
    ['Tikoun / Leçons karmiques', `Nombres absents de 1 à 9 dans le nom complet de naissance. Dettes karmiques (13, 14, 16, 19) : valeurs intermédiaires des réductions numériques.`],
    ['Données utilisées', `${profil.prenom} ${profil.nom}  ·  ${profil.dateNaissance}`],
    ['Rapport généré le', dateStr],
  ].forEach(([titre, texte]) => {
    ensureSpace(doc, 40);
    doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(8)
       .text(titre.toUpperCase(), ML, doc.y, { width: CW, characterSpacing: 1 });
    doc.y += 2;
    doc.fillColor(MUTED).font(FONT_SERIF).fontSize(9.5).lineGap(2)
       .text(texte, ML, doc.y, { width: CW });
    doc.y += 12;
    hLine(doc, doc.y - 4, LGRAY, 0.3);
    doc.y += 8;
  });

  doc.y += 10;
  doc.fillColor(MUTED).font(FONT_SERIF_ITAL).fontSize(9)
     .text('Plateforme des Mystères', ML, doc.y, { width: CW, align: 'center' });
}

// ── POINT D'ENTRÉE ────────────────────────────────────────────────────────
export async function genererRapportPDF(profil, contenu) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 0, bufferPages: true });
    const chunks = [];
    doc.on('data', c => chunks.push(c));
    doc.on('error', reject);

    drawCover(doc, profil);
    drawOverview(doc, profil, contenu);
    drawCheminDeVie(doc, profil, contenu);
    drawExpressionAme(doc, profil, contenu);
    drawPersonnaliteAnnee(doc, profil, contenu);
    drawArcaneVie(doc, profil, contenu);
    drawArcaneAnnee(doc, profil, contenu);
    drawSigne(doc, profil, contenu);
    drawKarmique(doc, profil, contenu);
    drawSynthese(doc, profil, contenu);
    drawConclusion(doc, profil);
    drawMethodo(doc, profil);

    // Footers sur toutes les pages sauf couverture (0) et conclusion (avant-dernière)
    const range = doc.bufferedPageRange();
    const conclusionIdx = range.count - 2;
    for (let i = 1; i < range.count; i++) {
      if (i === conclusionIdx) continue;
      doc.switchToPage(range.start + i);
      footer(doc, i, range.count - 2, profil.anneeRapport);
    }

    doc.flushPages();
    doc.end();
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });
}
