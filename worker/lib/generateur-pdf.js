/* ── Générateur PDF — Rapport d'Incarnation ───────────────────────────────
   pdfkit A4, bufferPages:true pour footer post-rendu.
   Palette : bleu marine #0d1b2a · or #d4af37 · crème #faf7f2              */

import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';
import { Buffer } from 'node:buffer';
import { CARD_DATA } from './tarot-data.js';
import { LENORMAND_DATA } from './lenormand-data.js';
// Polices importées comme données binaires (règle "Data" de wrangler.jsonc) :
// pas de système de fichiers sur Workers.
import fontSansData      from './fonts/Sans-Regular.ttf';
import fontSansBoldData  from './fonts/Sans-Bold.ttf';
import fontSerifData     from './fonts/Serif-Regular.ttf';
import fontSerifBoldData from './fonts/Serif-Bold.ttf';
import fontSerifItalData from './fonts/Serif-Italic.ttf';

// Noms de polices enregistrées dans le document (voir genererRapportPDF)
const FONT_SANS       = 'Sans';
const FONT_SANS_BOLD  = 'SansBold';
const FONT_SERIF      = 'Serif';
const FONT_SERIF_BOLD = 'SerifBold';
const FONT_SERIF_ITAL = 'SerifItal';

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
  if (doc.y + needed > H - MB) {
    doc.addPage();
    pageHeader(doc, 'Rapport d\'Incarnation');
  }
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

// ── chainReadPDF — narration contextuelle d'une séquence de 3 cartes ────────
function chainReadPDF(cardA, cardB, cardC, context) {
  function lo(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : ''; }
  function kw(c) { return c.keywords?.[0] || 'transformation'; }
  function findPairing(src, target) {
    if (!src?.pairings || !target?.id) return null;
    return src.pairings.find(p => p.with === target.id)?.meaning || null;
  }

  const abP = findPairing(cardA, cardB);
  const bcP = cardC ? findPairing(cardB, cardC) : null;
  const syn = cardC ? (cardC.synthesis || cardC.meaning || '').split('.')[0] : '';
  const synLow = syn ? lo(syn) : '';

  let openA, linkAB, openB, linkBC, closeC;

  if (context === 'ligne-passe') {
    openA  = `Dans vos racines, ${cardA.name} inscrit l'empreinte`;
    linkAB = abP ? ` : ${lo(abP)}` : `, portant son énergie de ${kw(cardA)}.`;
    openB  = ` ${cardB.name} en révèle la profondeur`;
    linkBC = cardC && bcP ? ` : ${lo(bcP)}` : cardC ? `, laissant émerger ${kw(cardB)} avant la venue de ${cardC.name}.` : `.`;
    closeC = cardC ? ` ${cardC.name} scelle cette empreinte : ${synLow}.` : '';
  } else if (context === 'ligne-present') {
    openA  = `Au cœur de l'instant, ${cardA.name} porte l'enjeu central`;
    linkAB = abP ? ` : ${lo(abP)}` : `, avec son énergie de ${kw(cardA)}.`;
    openB  = ` ${cardB.name} amplifie ou nuance la dynamique`;
    linkBC = cardC && bcP ? ` : ${lo(bcP)}` : cardC ? `, en apportant ${kw(cardB)}, tandis que ${cardC.name} oriente l'issue.` : `.`;
    closeC = cardC ? ` ${cardC.name} canalise l'ensemble : ${synLow}.` : '';
  } else if (context === 'ligne-futur') {
    openA  = `À l'horizon, ${cardA.name} ouvre la voie`;
    linkAB = abP ? ` : ${lo(abP)}` : `, par son énergie de ${kw(cardA)}.`;
    openB  = ` ${cardB.name} trace la direction`;
    linkBC = cardC && bcP ? ` : ${lo(bcP)}` : cardC ? `, en mobilisant ${kw(cardB)} vers ce que ${cardC.name} accomplira.` : `.`;
    closeC = cardC ? ` ${cardC.name} dessine l'aboutissement possible : ${synLow}.` : '';
  } else if (context === 'col-interieur') {
    openA  = `Sur votre axe intérieur, ${cardA.name} ancre la dynamique`;
    linkAB = abP ? ` : ${lo(abP)}` : `, par son énergie de ${kw(cardA)}.`;
    openB  = ` ${cardB.name} en révèle la profondeur psychique`;
    linkBC = cardC && bcP ? ` : ${lo(bcP)}` : cardC ? `, mêlant ${kw(cardB)} à ce que ${cardC.name} portera.` : `.`;
    closeC = cardC ? ` ${cardC.name} dessine ce que vous emportez vers l'avenir : ${synLow}.` : '';
  } else if (context === 'col-relationnel') {
    openA  = `Sur votre axe relationnel, ${cardA.name} établit la qualité du lien`;
    linkAB = abP ? ` : ${lo(abP)}` : `, portant son énergie de ${kw(cardA)}.`;
    openB  = ` ${cardB.name} en transforme les contours`;
    linkBC = cardC && bcP ? ` : ${lo(bcP)}` : cardC ? `, tissant ${kw(cardB)} jusqu'à la venue de ${cardC.name}.` : `.`;
    closeC = cardC ? ` ${cardC.name} indique le fruit de cet échange : ${synLow}.` : '';
  } else if (context === 'col-exterieur') {
    openA  = `Sur votre axe extérieur, ${cardA.name} révèle les forces en jeu`;
    linkAB = abP ? ` : ${lo(abP)}` : `, par son énergie de ${kw(cardA)}.`;
    openB  = ` ${cardB.name} les module ou les contredit`;
    linkBC = cardC && bcP ? ` : ${lo(bcP)}` : cardC ? `, en apportant ${kw(cardB)}, avant que ${cardC.name} n'oriente l'issue.` : `.`;
    closeC = cardC ? ` ${cardC.name} pointe le dénouement dans le monde concret : ${synLow}.` : '';
  } else if (context === 'diag-descend') {
    openA  = `De vos origines, ${cardA.name} plante la graine initiale`;
    linkAB = abP ? ` : ${lo(abP)}` : `, par son énergie de ${kw(cardA)}.`;
    openB  = ` ${cardB.name}, au cœur du présent, transforme cette semence`;
    linkBC = cardC && bcP ? ` : ${lo(bcP)}` : cardC ? `, en activant ${kw(cardB)} vers la maturation de ${cardC.name}.` : `.`;
    closeC = cardC ? ` ${cardC.name} révèle la destinée de ce fil : ${synLow}.` : '';
  } else {
    openA  = `De ce qui émerge en vous, ${cardA.name} fait remonter une énergie`;
    linkAB = abP ? ` : ${lo(abP)}` : `, portant ${kw(cardA)}.`;
    openB  = ` ${cardB.name}, au cœur du présent, intègre et transforme`;
    linkBC = cardC && bcP ? ` : ${lo(bcP)}` : cardC ? `, en mobilisant ${kw(cardB)} pour toucher ${cardC.name}.` : `.`;
    closeC = cardC ? ` ${cardC.name} achève l'intégration : ${synLow}.` : '';
  }

  return openA + linkAB + openB + linkBC + (closeC || '');
}

// ── Contenu détaillé des flèches Lo Shu à développer ───────────────────────
const FLECHES_CONSEILS = {
  'Volonté': {
    intro: `L'absence de la Flèche de Volonté (1–5–9) indique que maintenir une direction ferme sur la durée peut demander un effort conscient. Vous pouvez amorcer de nombreux projets avec enthousiasme et peiner à les porter jusqu'à leur aboutissement — non par manque de talent, mais parce que l'énergie de détermination linéaire ne vient pas naturellement.`,
    exemples: [
      `Choisissez un seul projet prioritaire pour les 90 prochains jours et travaillez-y chaque matin pendant 20 minutes avant toute autre tâche. La constance prime sur l'intensité.`,
      `Tenez un carnet d'intentions hebdomadaires : chaque dimanche, notez ce que vous voulez avoir accompli vendredi. Relisez-le chaque matin. Cette micro-habitude renforce la continuité de l'élan.`,
      `Apprenez à dire "pas maintenant" aux nouvelles idées qui surgissent : notez-les dans un carnet "plus tard" pour ne pas les perdre, sans dévier de votre cap actuel.`,
    ],
    conseil: `La volonté s'entraîne comme un muscle — et comme tout muscle, elle grandit dans la régularité, pas dans l'intensité sporadique. Commencez petit, tenez la durée, et observez la confiance en vos propres engagements se transformer progressivement.`,
  },
  'Intuition': {
    intro: `L'absence de la Flèche d'Intuition (3–5–7) invite à développer votre connexion au ressenti profond et à la perception subtile. Vous avez tendance à sur-analyser là où il s'agirait de simplement ressentir, ou à rejeter vos premières impressions au profit de la logique — ce qui peut vous éloigner de votre boussole intérieure.`,
    exemples: [
      `Notez vos rêves dans un carnet dès le réveil, avant d'ouvrir votre téléphone. Ce simple geste développe progressivement l'attention au langage de l'inconscient.`,
      `Pratiquez 5 minutes de silence intentionnel par jour sans écran, sans musique, sans tâche. Observez ce qui émerge spontanément à l'esprit — c'est souvent là que vit l'intuition.`,
      `Avant toute décision importante, notez ce que vous ressentez dans le corps (gorge, ventre, poitrine) avant de penser. L'intuition parle d'abord physiquement.`,
    ],
    conseil: `Votre intuition est présente, mais couverte par le bruit mental. Créez des îlots de silence dans votre quotidien : ce n'est pas dans l'agitation que la voix intérieure se fait entendre, mais dans l'espace que vous lui offrez délibérément.`,
  },
  'Intellect': {
    intro: `L'absence de la Flèche d'Intellect (2–5–8) indique que la mémorisation structurée et la pensée analytique rigoureuse sont des zones de développement. Vous pouvez préférer l'intuition ou l'action directe à la méthodologie — ce qui vous donne de la fluidité mais peut parfois vous faire manquer de fondations conceptuelles solides.`,
    exemples: [
      `Lisez 10 pages par jour sur un sujet qui vous fascine — non pour être productif, mais pour le plaisir de comprendre. La curiosité soutenue est le meilleur entraîneur de l'intellect.`,
      `Pratiquez la reformulation : après chaque réunion importante ou lecture significative, notez en 3 phrases ce que vous en avez retenu. Cela consolide la mémoire active.`,
      `Apprenez quelque chose de structurellement nouveau — une langue, les bases d'un instrument, un cours en ligne dans un domaine étranger. La diversité stimule les connexions neuronales.`,
    ],
    conseil: `L'intellect s'affûte par la curiosité et la discipline conjointes. Choisissez un domaine qui vous attire et plongez-y avec méthode. La profondeur d'un seul sujet développe davantage l'intellect que l'accumulation superficielle de nombreux autres.`,
  },
  'Plan pratique': {
    intro: `L'absence de la Flèche du Plan Pratique (1–2–3) indique que l'organisation naturelle, la méthode et la planification ne sont pas vos premières ressources. Votre créativité ou votre réactivité peuvent être grandes, mais sans structure, vos projets risquent de stagner ou de se disperser faute de jalons clairs.`,
    exemples: [
      `Adoptez la règle des 3 priorités : chaque matin, avant d'ouvrir vos messages, notez les 3 choses les plus importantes de la journée. Concentrez-vous sur la première avant de passer à la suivante.`,
      `Découpez chaque projet en étapes hebdomadaires avec une date et un livrable précis. La structure libère l'énergie créative en lui donnant un canal.`,
      `Préparez votre lendemain le soir avant de vous coucher : 10 minutes de préparation le soir vous font gagner une heure le matin et réduisent l'anxiété de la page blanche.`,
    ],
    conseil: `La méthode n'est pas l'ennemie de la liberté — c'est son infrastructure. Essayez une seule routine structurante pendant 21 jours (lever à heure fixe, 15 minutes de planification quotidienne) et observez comment votre espace mental s'ouvre.`,
  },
  'Ordre': {
    intro: `L'absence de la Flèche d'Ordre (4–5–6) invite à travailler l'équilibre émotionnel et l'harmonie relationnelle. Vous pouvez osciller entre des extrêmes — trop de rigidité ou trop de fluidité — sans trouver facilement un centre stable qui vous permette de tenir vos engagements sans vous épuiser.`,
    exemples: [
      `Identifiez votre baromètre émotionnel personnel : qu'est-ce qui vous indique précisément que vous êtes centré ? Reproduisez délibérément ces conditions chaque jour, même brièvement.`,
      `Pratiquez une activité d'ancrage régulière : marche en nature, yoga, jardinage, cuisine consciente. Ces pratiques ramènent au corps et neutralisent l'agitation mentale.`,
      `Apprenez à identifier vos déclencheurs de déséquilibre (personnes, situations, heures de la journée) et préparez une réponse intentionnelle à chacun, plutôt que de réagir automatiquement.`,
    ],
    conseil: `L'harmonie intérieure se construit dans les petits gestes quotidiens, pas dans les grandes décisions. Un seul rituel de recentrage — même de 5 minutes — pratiqué chaque jour vaut infiniment plus que deux heures de méditation une fois par semaine.`,
  },
  'Activité': {
    intro: `L'absence de la Flèche d'Activité (7–8–9) indique que l'énergie physique disponible et la capacité à passer à l'action concrète sont des zones de développement prioritaire. Vous pouvez rester longtemps dans la réflexion ou l'intention sans franchir le seuil de l'action effective — non par paresse, mais parce que l'élan physique ne s'enclenche pas spontanément.`,
    exemples: [
      `Adoptez la règle des 2 minutes : si une tâche prend moins de 2 minutes, faites-la immédiatement sans la noter ni la reporter. Cette règle seule transforme la gestion du quotidien.`,
      `Intégrez au moins 20 minutes de mouvement physique quotidien — marche rapide, vélo, natation. Le corps en mouvement libère une énergie mentale que la sédentarité retient captive.`,
      `Terminez quelque chose de concret chaque jour, même de très petit : un email envoyé, une pièce rangée, un appel passé. L'élan de l'achèvement est contagieux.`,
    ],
    conseil: `L'action précède souvent la motivation, pas l'inverse. N'attendez pas de vous sentir prêt ou inspiré : faites le premier geste, aussi minuscule soit-il. La dynamique s'enclenche en agissant, jamais en attendant d'en avoir envie.`,
  },
  'Matière': {
    intro: `L'absence de la Flèche de Matière (1–4–7) invite à renforcer votre ancrage dans le monde concret et matériel. Les réalités pratiques — finances, habitat, corps physique, ressources — peuvent demander plus d'attention que vous ne leur en accordez naturellement, vous laissant parfois dans une fragilité de base qui dessert vos aspirations plus élevées.`,
    exemples: [
      `Tenez un budget mensuel simple : notez vos entrées et sorties chaque semaine. La clarté financière n'est pas une contrainte — c'est une forme de conscience de soi et de respect de vos ressources.`,
      `Prenez soin de votre espace de vie : rangez, allégez, rendez votre environnement immédiat intentionnel. L'espace extérieur reflète et influence directement votre espace intérieur.`,
      `Planifiez vos bilans médicaux et dentaires à l'avance. Le corps est votre premier instrument — entretenir sa mécanique est un acte de respect fondamental envers vous-même.`,
    ],
    conseil: `La matière est le fondement de tout le reste. Choisissez un seul domaine concret (finances, corps, habitat) et améliorez-le méthodiquement pendant 3 mois. Une base solide multiplie votre efficacité dans tous les autres domaines de vie.`,
  },
  'Résilience': {
    intro: `L'absence de la Flèche de Résilience (3–6–9) indique que la capacité de rebond face aux épreuves et aux revers est une force à construire consciemment. Vous pouvez être profondément affecté par les difficultés, mettre du temps à vous relever, ou éviter les situations à risque par peur de ne pas pouvoir encaisser un échec.`,
    exemples: [
      `Tenez un journal de ce que vous avez déjà surmonté : listez 10 moments difficiles que vous avez traversés. Ce témoignage personnel est votre meilleure preuve tangible de résilience existante.`,
      `Entourez-vous délibérément de personnes qui vous relèvent : éloignez-vous des cercles de plaignants chroniques et cultivez les relations avec ceux qui voient les solutions dans les obstacles.`,
      `Pratiquez la gratitude quotidienne pour les petites choses, même en période difficile. Ce n'est pas de la naïveté : c'est un entraînement progressif du regard qui change votre rapport à l'adversité.`,
    ],
    conseil: `La résilience ne signifie pas ne jamais tomber — elle signifie tomber avec moins de résistance et se relever avec plus de rapidité. Elle se construit en nommant vos forces passées, en célébrant vos petites victoires, et en acceptant que traverser une épreuve ne vous définit pas, mais vous forme.`,
  },
};

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

  // Ombre
  if (c.ombre) {
    hLine(doc, doc.y - 8, LGRAY, 0.3);
    doc.y += 4;
    lbl(doc, "Ce que ce chemin porte comme ombre");
    body(doc, c.ombre, { font: FONT_SERIF_ITAL, gap: 3, color: MUTED });
  }

  // Clés pratiques
  if (c.cles && c.cles.length > 0) {
    ensureSpace(doc, 100);
    doc.y += 8;
    hLine(doc, doc.y - 6, GOLD, 0.3);
    doc.y += 6;
    lbl(doc, '3 clés pratiques pour activer ce chemin');
    c.cles.forEach((cle, i) => {
      ensureSpace(doc, 45);
      doc.y += 6;
      const ky = doc.y;
      // Numéro
      doc.rect(ML, ky, 26, 26).fill(GOLD);
      doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(13)
         .text(String(i + 1), ML, ky + 5, { width: 26, align: 'center' });
      // Texte
      doc.fillColor(DARK).font(FONT_SERIF).fontSize(10).lineGap(2.5)
         .text(cle, ML + 36, ky, { width: CW - 36, align: 'justify' });
      doc.y = Math.max(doc.y, ky + 26) + 4;
    });
  }
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
  sectionTitle(doc, '05 — TAROT DE MARSEILLE', 'L\'Arcane de Vie', arcane.nom);

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
  sectionTitle(doc, '06 — TAROT DE MARSEILLE', `L'Arcane du Cycle ${profil.anneeRapport}`, arcane.nom);

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
  sectionTitle(doc, '07 — ASTROLOGIE SOLAIRE', 'Signe, Élément & Modalité', profil.signe);

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

// ── PLANÈTE GOUVERNANTE ───────────────────────────────────────────────────
function drawPlanete(doc, profil, contenu) {
  const pl  = profil.planete;
  const txt = contenu.planete;
  sectionTitle(doc, '04 — NUMÉROLOGIE & ASTROLOGIE', 'Planète Gouvernante',
    `${pl.symbole}  ${pl.nom}`);

  // Bloc planète
  const startY = doc.y;
  const bw = 78, bh = 68;
  doc.rect(ML, startY, bw, bh).fill(NAVY);
  doc.rect(ML + 0.5, startY + 0.5, bw - 1, bh - 1).lineWidth(0.8).strokeColor(GOLD).stroke();
  doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(24)
     .text(pl.symbole, ML, startY + 10, { width: bw, align: 'center' });
  doc.fillColor(LIGHT).font(FONT_SANS).fontSize(8)
     .text(pl.nom.toUpperCase(), ML, startY + 46, { width: bw, align: 'center', characterSpacing: 0.8 });

  // Infos en colonne à droite
  const ix = ML + 94;
  doc.fillColor(MUTED).font(FONT_SANS).fontSize(7.5)
     .text(`Élément : ${pl.element}   ·   Polarité : ${pl.polarite}   ·   Qualité : ${pl.qualite}`,
       ix, startY, { width: CW - 94 });
  doc.y = startY + 14;
  doc.fillColor(DARK).font(FONT_SERIF).fontSize(10.5).lineGap(3)
     .text(txt.corps, ix, doc.y, { width: CW - 94, align: 'justify' });
  doc.y = Math.max(doc.y, startY + bh + 6) + 14;

  hLine(doc, doc.y - 8, GOLD, 0.3);
  lbl(doc, 'Le défi planétaire');
  body(doc, txt.defi, { font: FONT_SERIF_ITAL, gap: 3 });

  doc.y += 8;
  lbl(doc, 'Correspondances');
  body(doc, `Chemin de vie ${profil.cheminDeVie}  ·  ${pl.nom} (${pl.symbole})  ·  Élément ${pl.element}  ·  Polarité ${pl.polarite}  ·  Qualité ${pl.qualite}`, { font: FONT_SANS, size: 9, color: MUTED });
}

// ── CARRÉ LO SHU ─────────────────────────────────────────────────────────
function drawLoShu(doc, profil) {
  const ls = profil.loShu;
  sectionTitle(doc, '08 — NUMÉROLOGIE GÉOMÉTRIQUE', 'Carré Lo Shu',
    'Le miroir géométrique de votre date de naissance');

  body(doc, `Le carré Lo Shu est une figure mathématique millénaire : un carré magique 3×3 dans lequel les chiffres de 1 à 9 sont disposés de façon à ce que chaque ligne, colonne et diagonale donne la même somme (15). Appliqué à votre date de naissance, il révèle quels chiffres sont fortement présents, lesquels sont absents, et quelles "flèches" — séquences complètes — dessinent vos ressources naturelles.`);
  doc.y += 8;

  // Grille 3×3
  const cellSize = 62;
  const gridW    = cellSize * 3;
  const gridX    = ML + (CW - gridW) / 2;
  const gridY    = doc.y;

  ls.positions.forEach((row, ri) => {
    row.forEach((num, ci) => {
      const x   = gridX + ci * cellSize;
      const y   = gridY + ri * cellSize;
      const cnt = ls.grille[num];
      const absent = cnt === 0;

      // Fond
      doc.rect(x + 2, y + 2, cellSize - 4, cellSize - 4)
         .fill(absent ? '#e9ecef' : NAVY);

      // Bordure
      doc.rect(x + 2, y + 2, cellSize - 4, cellSize - 4)
         .lineWidth(absent ? 0.3 : 0.8)
         .strokeColor(absent ? LGRAY : GOLD).stroke();

      // Chiffre Lo Shu
      doc.fillColor(absent ? MUTED : GOLD)
         .font(FONT_SANS_BOLD).fontSize(22)
         .text(String(num), x + 2, y + 8, { width: cellSize - 4, align: 'center' });

      // Compteur de présences
      if (!absent) {
        const dots = '●'.repeat(Math.min(cnt, 5));
        doc.fillColor(LIGHT).font(FONT_SANS).fontSize(8)
           .text(dots, x + 2, y + 40, { width: cellSize - 4, align: 'center' });
      } else {
        doc.fillColor(MUTED).font(FONT_SANS).fontSize(8)
           .text('absent', x + 2, y + 40, { width: cellSize - 4, align: 'center' });
      }
    });
  });
  doc.y = gridY + cellSize * 3 + 18;

  // Légende : chiffres absents
  if (ls.nombresAbsents.length > 0) {
    lbl(doc, `Chiffres absents : ${ls.nombresAbsents.join(', ')}`);
    body(doc, `L'absence d'un chiffre dans votre date de naissance indique une énergie que vous êtes invité à développer consciemment au cours de cette vie. Ce n'est pas un manque — c'est une direction de croissance.`, { color: MUTED, font: FONT_SERIF_ITAL, size: 9.5 });
    doc.y += 6;
  }

  // Flèches présentes
  if (ls.flechesPresentes.length > 0) {
    hLine(doc, doc.y, GOLD, 0.3);
    doc.y += 12;
    lbl(doc, `Flèches de forces actives (${ls.flechesPresentes.length})`);
    ls.flechesPresentes.forEach(f => {
      ensureSpace(doc, 28);
      doc.y += 4;
      const fy = doc.y;
      doc.rect(ML, fy, 3, 18).fill(GOLD);
      doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(9)
         .text(`${f.nom}  [${f.chiffres.join('-')}]`, ML + 10, fy, { width: CW - 10 });
      doc.fillColor(MUTED).font(FONT_SERIF).fontSize(9)
         .text(f.description, ML + 10, doc.y + 1, { width: CW - 10 });
      doc.y += 12;
    });
  }

  // Flèches absentes
  if (ls.flechesAbsentes.length > 0) {
    ensureSpace(doc, 60);
    doc.y += 10;
    hLine(doc, doc.y, LGRAY, 0.3);
    doc.y += 12;
    lbl(doc, `Séquences à développer (${ls.flechesAbsentes.length})`);
    body(doc, `Ces séquences, absentes de votre date de naissance, représentent des qualités que votre âme a choisies de développer dans cette incarnation. Ce ne sont pas des manques — ce sont des directions de croissance précises, les axes sur lesquels vos efforts conscients portent le plus de fruits.`, { font: FONT_SERIF_ITAL, size: 9.5, color: MUTED, after: 14 });

    ls.flechesAbsentes.forEach(f => {
      const conseils = FLECHES_CONSEILS[f.nom];
      ensureSpace(doc, 140);
      doc.y += 8;

      // En-tête de la flèche
      const fy = doc.y;
      doc.rect(ML, fy, 3, 22).fill(LGRAY);
      doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(10)
         .text(`${f.nom}  [${f.chiffres.join('–')}]`, ML + 10, fy, { width: CW - 10 });
      doc.fillColor(MUTED).font(FONT_SANS).fontSize(8)
         .text(f.description, ML + 10, doc.y + 2, { width: CW - 10 });
      doc.y += 14;

      if (conseils) {
        body(doc, conseils.intro, { font: FONT_SERIF, size: 10, gap: 2.5, color: DARK, after: 8 });

        doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(7.5)
           .text('EXEMPLES PRATIQUES', ML, doc.y, { width: CW, characterSpacing: 1 });
        doc.y += 7;
        conseils.exemples.forEach((ex, i) => {
          ensureSpace(doc, 34);
          const ey = doc.y;
          doc.rect(ML, ey + 2, 18, 18).fill(GOLD);
          doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(9)
             .text(String(i + 1), ML, ey + 4, { width: 18, align: 'center' });
          doc.fillColor(DARK).font(FONT_SERIF).fontSize(9.5).lineGap(2.5)
             .text(ex, ML + 26, ey, { width: CW - 26, align: 'justify' });
          doc.y = Math.max(doc.y, ey + 18) + 5;
        });

        ensureSpace(doc, 50);
        doc.y += 4;
        hLine(doc, doc.y - 2, LGRAY, 0.3);
        doc.y += 6;
        doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(7.5)
           .text('CLÉ DE DÉVELOPPEMENT', ML, doc.y, { width: CW, characterSpacing: 1 });
        doc.y += 7;
        body(doc, conseils.conseil, { font: FONT_SERIF_ITAL, size: 10, gap: 2.5, color: DARK, after: 18 });
      } else {
        body(doc, f.description, { font: FONT_SERIF, size: 10, color: MUTED, after: 12 });
      }
    });
  }
}

// ── CARRÉ DE 9 — PETIT LENORMAND ─────────────────────────────────────────
function drawCarreDe9(doc, profil) {
  const len  = profil.lenormand;
  sectionTitle(doc, '09 — ORACLE LENORMAND', 'Le Carré de 9',
    'Tirage déterministe — ancré dans votre date de naissance');

  body(doc, `Le Carré de 9 est le tirage le plus complet du Petit Lenormand : neuf cartes disposées en grille 3×3, lues horizontalement (passé, présent, futur), verticalement (axe psychique, social, matériel) et en diagonales (flèches d'énergie). La carte centrale (#5) est la synthèse du tout. Ce tirage est calculé de façon déterministe depuis votre date de naissance — il est unique et reproductible : chaque fois que vous générez ce rapport avec la même date, vous obtiendrez les mêmes cartes.`);
  doc.y += 10;

  // Dessin de la grille 3×3
  const cellW = 140, cellH = 90;
  const gridW = cellW * 3;
  const gridX = ML + (CW - gridW) / 2;
  let   gridY = doc.y;

  ensureSpace(doc, cellH * 3 + 30);
  gridY = doc.y;

  const ZONES = { passe: '#1a1a2e', present: NAVY, futur: '#0d2b1a' };

  len.positions.forEach((pos, i) => {
    const ri  = Math.floor(i / 3);
    const ci  = i % 3;
    const x   = gridX + ci * cellW;
    const y   = gridY + ri * cellH;
    const card = LENORMAND_DATA[pos.id] || {};
    const isCentral = (i === 4);

    // Fond
    doc.rect(x + 3, y + 3, cellW - 6, cellH - 6)
       .fill(isCentral ? GOLD : ZONES[pos.zone] || NAVY);

    // Bordure
    doc.rect(x + 3, y + 3, cellW - 6, cellH - 6)
       .lineWidth(isCentral ? 1.5 : 0.5)
       .strokeColor(isCentral ? NAVY : GOLD).stroke();

    // Numéro de position
    const textColor = isCentral ? NAVY : GOLD;
    doc.fillColor(textColor).font(FONT_SANS_BOLD).fontSize(7)
       .text(String(pos.pos), x + 6, y + 8, { width: 16 });

    // Nom de la carte
    doc.fillColor(isCentral ? NAVY : LIGHT).font(FONT_SANS_BOLD).fontSize(10)
       .text(card.name || `Carte ${pos.id + 1}`, x + 6, y + 16, { width: cellW - 12, align: 'center' });

    // Numéro Lenormand
    doc.fillColor(isCentral ? NAVY : GOLD).font(FONT_SANS).fontSize(8)
       .text(`N° ${pos.id + 1}`, x + 6, y + 34, { width: cellW - 12, align: 'center', characterSpacing: 0.5 });

    // Label de position
    doc.fillColor(isCentral ? NAVY : MUTED).font(FONT_SANS).fontSize(6.5)
       .text(pos.label, x + 6, y + cellH - 22, { width: cellW - 12, align: 'center', characterSpacing: 0.5 });
  });
  doc.y = gridY + cellH * 3 + 20;

  // Lecture des lignes
  hLine(doc, doc.y, GOLD, 0.3);
  doc.y += 12;
  lbl(doc, 'Lecture horizontale — Axe Temps');

  const lignes = [
    { label: 'Ligne 1 — Passé',   indices: [0, 1, 2] },
    { label: 'Ligne 2 — Présent', indices: [3, 4, 5] },
    { label: 'Ligne 3 — Futur',   indices: [6, 7, 8] },
  ];
  lignes.forEach(lg => {
    ensureSpace(doc, 40);
    doc.y += 6;
    doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(8)
       .text(lg.label.toUpperCase(), ML, doc.y, { width: CW, characterSpacing: 0.8 });
    doc.y += 4;
    const cards = lg.indices.map(i => {
      const p = len.positions[i];
      const c = LENORMAND_DATA[p.id] || {};
      return `${c.name || '?'} (${p.label})`;
    }).join('  →  ');
    body(doc, cards, { font: FONT_SANS, size: 9, color: DARK, after: 4 });

    // Lecture des mots-clés combinés
    const keywords = lg.indices.flatMap(i => {
      const p = len.positions[i];
      const c = LENORMAND_DATA[p.id] || {};
      return (c.keywords || []).slice(0, 2);
    });
    if (keywords.length > 0) {
      body(doc, 'Thèmes : ' + keywords.join('  ·  '), { font: FONT_SERIF_ITAL, size: 9, color: MUTED, after: 5 });
    }
    const lineCards = lg.indices.map(i => LENORMAND_DATA[len.positions[i].id] || {});
    if (lineCards.every(c => c.name)) {
      const ctx = lg.indices[0] < 3 ? 'ligne-passe' : lg.indices[0] < 6 ? 'ligne-present' : 'ligne-futur';
      body(doc, chainReadPDF(lineCards[0], lineCards[1], lineCards[2], ctx), { font: FONT_SERIF, size: 9.5, gap: 2.5, after: 7 });
    }
  });

  // Lecture des colonnes
  doc.y += 10;
  ensureSpace(doc, 80);
  hLine(doc, doc.y, LGRAY, 0.3);
  doc.y += 12;
  lbl(doc, 'Lecture verticale — Trois axes de vie');

  const colonnes = [
    { label: 'Colonne 1 — Axe Intérieur',  indices: [0, 3, 6] },
    { label: 'Colonne 2 — Axe Relationnel', indices: [1, 4, 7] },
    { label: 'Colonne 3 — Axe Extérieur',  indices: [2, 5, 8] },
  ];
  colonnes.forEach(col => {
    ensureSpace(doc, 40);
    doc.y += 6;
    doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(8)
       .text(col.label.toUpperCase(), ML, doc.y, { width: CW, characterSpacing: 0.8 });
    doc.y += 4;
    const cards = col.indices.map(i => {
      const p = len.positions[i];
      const c = LENORMAND_DATA[p.id] || {};
      return `${c.name || '?'}`;
    }).join('  ·  ');
    body(doc, cards, { font: FONT_SANS, size: 9, color: DARK, after: 5 });
    const colCards = col.indices.map(i => LENORMAND_DATA[len.positions[i].id] || {});
    if (colCards.every(c => c.name)) {
      const ctx = col.indices[0] === 0 ? 'col-interieur' : col.indices[0] === 1 ? 'col-relationnel' : 'col-exterieur';
      body(doc, chainReadPDF(colCards[0], colCards[1], colCards[2], ctx), { font: FONT_SERIF, size: 9.5, gap: 2.5, after: 7 });
    }
  });

  // Diagonales
  doc.y += 10;
  ensureSpace(doc, 120);
  hLine(doc, doc.y, LGRAY, 0.3);
  doc.y += 12;
  lbl(doc, 'Diagonales — Fils d\'énergie transversaux');

  const diag1 = [0, 4, 8].map(i => LENORMAND_DATA[len.positions[i].id] || {});
  const diag2 = [6, 4, 2].map(i => LENORMAND_DATA[len.positions[i].id] || {});

  ensureSpace(doc, 65);
  doc.y += 6;
  doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(8)
     .text('DIAGONALE DE LA MANIFESTATION — DE L\'ORIGINE AU RÉSULTAT', ML, doc.y, { width: CW, characterSpacing: 0.8 });
  doc.y += 4;
  body(doc, diag1.map(c => c.name || '?').join('  →  '), { font: FONT_SANS, size: 9, color: DARK, after: 5 });
  if (diag1.every(c => c.name)) {
    body(doc, chainReadPDF(diag1[0], diag1[1], diag1[2], 'diag-descend'), { font: FONT_SERIF, size: 9.5, gap: 2.5, after: 8 });
  }

  ensureSpace(doc, 65);
  doc.y += 6;
  doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(8)
     .text('DIAGONALE DE L\'INTÉGRATION — DU DEVENIR AUX FONDATIONS', ML, doc.y, { width: CW, characterSpacing: 0.8 });
  doc.y += 4;
  body(doc, diag2.map(c => c.name || '?').join('  →  '), { font: FONT_SANS, size: 9, color: DARK, after: 5 });
  if (diag2.every(c => c.name)) {
    body(doc, chainReadPDF(diag2[0], diag2[1], diag2[2], 'diag-ascend'), { font: FONT_SERIF, size: 9.5, gap: 2.5, after: 8 });
  }

  // Carte centrale
  ensureSpace(doc, 80);
  doc.y += 10;
  hLine(doc, doc.y, GOLD);
  doc.y += 14;
  lbl(doc, 'Carte centrale — Synthèse du tirage');
  const central = len.positions[4];
  const centralCard = LENORMAND_DATA[central.id] || {};
  const cx = doc.y;
  const bw = 78, bh = 68;
  doc.rect(ML, cx, bw, bh).fill(GOLD);
  doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(11)
     .text(centralCard.name || '?', ML, cx + 8, { width: bw, align: 'center' });
  doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(13)
     .text(`N° ${central.id + 1}`, ML, cx + 30, { width: bw, align: 'center', characterSpacing: 0.5 });
  const meanText = centralCard.meaning || centralCard.synthesis || '';
  if (meanText) {
    doc.fillColor(DARK).font(FONT_SERIF).fontSize(10.5).lineGap(3)
       .text(meanText, ML + 94, cx, { width: CW - 94, align: 'justify' });
  }
  doc.y = Math.max(doc.y, cx + bh + 6) + 10;

  if (centralCard.advice) {
    lbl(doc, 'Invitation de la carte centrale');
    body(doc, centralCard.advice, { font: FONT_SERIF_ITAL, gap: 3, color: MUTED });
  }

  // ── Lecture par domaine de vie ──────────────────────────────────────────
  ensureSpace(doc, 80);
  doc.y += 14;
  hLine(doc, doc.y, GOLD, 0.5);
  doc.y += 14;
  lbl(doc, 'Lecture par domaine de vie');
  body(doc, `Le même tirage parle simultanément à tous les plans de votre existence. En interrogeant chaque axe du Carré de 9 à travers le prisme d'un domaine précis et en lisant les significations spécifiques de chaque carte pour ce contexte, voici ce que vos cartes révèlent concrètement pour votre vie personnelle, professionnelle et relationnelle.`, { font: FONT_SERIF_ITAL, size: 9.5, color: MUTED, after: 14 });

  const loFirst = s => s && s.length ? s.charAt(0).toLowerCase() + s.slice(1) : s;
  const firstSent = (card, field) => ((card[field] || card.meaning || '').split('.')[0] || '').trim();

  const DOMAINES = [
    {
      label: 'Plan Personnel',
      sous: 'Bien-être · développement intérieur · ressources psychiques',
      indices: [3, 4, 6],
      roles: ['Votre ressource intérieure', 'Énergie centrale', 'Ce qui émerge pour vous'],
      field: 'health',
      opens: [
        n => `${n} constitue votre ressource fondamentale pour ce cycle`,
        n => `${n}, au cœur du tirage, affirme`,
        n => `${n} ouvre la voie de ce qui se prépare pour vous`,
      ],
    },
    {
      label: 'Plan Professionnel',
      sous: 'Travail · projets · finances · créativité',
      indices: [2, 5, 8],
      roles: ['Point de bascule', 'Dynamique active', 'Résultat à venir'],
      field: 'work',
      opens: [
        n => `${n} marque le tournant de votre trajectoire professionnelle`,
        n => `${n} représente la dynamique active de vos projets`,
        n => `${n} dessine l'horizon professionnel qui se profile`,
      ],
    },
    {
      label: 'Plan Relationnel',
      sous: 'Amour · liens affectifs · échanges & connexions humaines',
      indices: [1, 4, 7],
      roles: ['Écho du passé récent', 'Cœur de la dynamique', 'Ce qui vous est proposé'],
      field: 'love',
      opens: [
        n => `${n} porte l'empreinte de vos liens récents`,
        n => `${n}, au cœur de cette dynamique, révèle`,
        n => `${n} ouvre la voie de ce qui s'offre à vous`,
      ],
    },
  ];

  DOMAINES.forEach(dom => {
    ensureSpace(doc, 110);
    doc.y += 10;

    // En-tête domaine
    const dy = doc.y;
    doc.rect(ML, dy, CW, 32).fill(NAVY);
    doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(11)
       .text(dom.label.toUpperCase(), ML + 14, dy + 7, { width: CW - 28, characterSpacing: 1.2 });
    doc.fillColor(MUTED).font(FONT_SANS).fontSize(8)
       .text(dom.sous, ML + 14, dy + 21, { width: CW - 28 });
    doc.y = dy + 38;

    const domPositions = dom.indices.map(i => len.positions[i]);
    const domCards     = domPositions.map(p => LENORMAND_DATA[p.id] || {});

    domCards.forEach((card, i) => {
      const pos = domPositions[i];
      const raw = card[dom.field] || card.meaning || '';
      const domText = raw.split('.').filter(s => s.trim().length > 5).slice(0, 2).join('. ').trim() + '.';

      ensureSpace(doc, 65);
      doc.y += 7;

      const cy = doc.y;
      doc.rect(ML, cy, 3, 24).fill(GOLD);
      doc.fillColor(MUTED).font(FONT_SANS).fontSize(7)
         .text(dom.roles[i].toUpperCase(), ML + 10, cy, { width: CW - 10, characterSpacing: 0.8 });
      doc.fillColor(NAVY).font(FONT_SANS_BOLD).fontSize(10)
         .text(`${card.name || '?'}`, ML + 10, cy + 11, { continued: true });
      doc.fillColor(MUTED).font(FONT_SANS).fontSize(8)
         .text(`  —  N° ${pos.id + 1}`, { width: CW - 10 });
      doc.y += 4;

      body(doc, domText, { font: FONT_SERIF, size: 9.5, gap: 2.5, color: DARK, after: 8 });
    });

    // Synthèse narrative du domaine
    ensureSpace(doc, 70);
    doc.y += 6;
    hLine(doc, doc.y, LGRAY, 0.3);
    doc.y += 8;
    doc.fillColor(GOLD).font(FONT_SANS_BOLD).fontSize(7.5)
       .text('SYNTHÈSE', ML, doc.y, { width: CW, characterSpacing: 1 });
    doc.y += 7;

    const synthesis =
      `${dom.opens[0](domCards[0].name)} : ${loFirst(firstSent(domCards[0], dom.field))}. ` +
      `${dom.opens[1](domCards[1].name)} : ${loFirst(firstSent(domCards[1], dom.field))}. ` +
      `Enfin, ${dom.opens[2](domCards[2].name)} : ${loFirst(firstSent(domCards[2], dom.field))}.`;

    body(doc, synthesis, { font: FONT_SERIF_ITAL, size: 10, gap: 3, color: DARK, after: 18 });
  });
}

// ── TIKOUN — LEÇONS & DETTES ──────────────────────────────────────────────
function drawKarmique(doc, profil, contenu) {
  sectionTitle(doc, '10 — NUMÉROLOGIE PROFONDE', 'Tikoun — Leçons & Dettes Karmiques',
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
  sectionTitle(doc, '11 — SYNTHÈSE', 'Convergences & Tensions', 'Le cœur du rapport');

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
    ['Planète gouvernante', `Mapping Chemin de vie → planète tradition rosicrucienne. 1=Soleil, 2=Lune, 3=Jupiter, 4=Saturne, 5=Mercure, 6=Vénus, 7=Neptune, 8=Mars, 9=Mars/Jupiter, 11=Uranus, 22=Vulcain, 33=Neptune/Vénus.`],
    ['Astrologie solaire', `Calcul depuis la date de naissance uniquement (sans heure ni lieu). Dates des signes approximatives — pour une précision maximale sur les cuspides, consultez un thème natal complet.`],
    ['Tarot de Marseille', `Deck Nicolas Conver 1760. Arcane de Vie : somme de tous les chiffres de la date, réduit à ≤ 22. Arcane du Cycle : idem avec l'année de génération du rapport.`],
    ['Carré Lo Shu', `Carré magique 3×3 (positions 4,9,2 / 3,5,7 / 8,1,6). Chiffres collectés depuis la date de naissance (JJ/MM/AAAA). 8 flèches de force analysées.`],
    ['Carré de 9 Lenormand', `Tirage déterministe : graine LCG = jour×1000003 + mois×10007 + année×31. Algorithme LCG (a=1664525, c=1013904223). 9 cartes uniques tirées parmi 36. Reproductible à date identique.`],
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
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    doc.registerFont(FONT_SANS,       Buffer.from(fontSansData));
    doc.registerFont(FONT_SANS_BOLD,  Buffer.from(fontSansBoldData));
    doc.registerFont(FONT_SERIF,      Buffer.from(fontSerifData));
    doc.registerFont(FONT_SERIF_BOLD, Buffer.from(fontSerifBoldData));
    doc.registerFont(FONT_SERIF_ITAL, Buffer.from(fontSerifItalData));

    drawCover(doc, profil);
    drawOverview(doc, profil, contenu);
    drawCheminDeVie(doc, profil, contenu);
    drawExpressionAme(doc, profil, contenu);
    drawPersonnaliteAnnee(doc, profil, contenu);
    drawPlanete(doc, profil, contenu);
    drawArcaneVie(doc, profil, contenu);
    drawArcaneAnnee(doc, profil, contenu);
    drawSigne(doc, profil, contenu);
    drawLoShu(doc, profil);
    drawCarreDe9(doc, profil);
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
  });
}
