/* ─────────────────────────────────────────────────────────────────────────
   tarot-lenormand-planes.js — Lectures par Plan
   Plans : Personnel · Professionnel · Relationnel
   Utilise window.tarotLenormandData pour les données des cartes.
   Expose window.tarotLenormandPlanes.
   ───────────────────────────────────────────────────────────────────────── */
(function () {

  var DATA = function () { return window.tarotLenormandData || []; };

  // ─── Utilitaires ───────────────────────────────────────────────

  function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function cap(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ─── Helpers de polarité ───────────────────────────────────────

  function isPositive(card) { return card && card.polarity === 'positive'; }
  function isNegative(card) { return card && card.polarity === 'négative'; }

  function getMostPositive(cards) {
    var soleil = null;
    var best = null;
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      if (!c) continue;
      if (c.id === '31') soleil = c;
      if (isPositive(c) && !best) best = c;
    }
    if (soleil) return soleil;
    if (best) return best;
    for (var j = 0; j < cards.length; j++) {
      if (cards[j] && cards[j].polarity === 'neutre') return cards[j];
    }
    return cards[0];
  }

  function getMostChallenging(cards) {
    var worst = null;
    for (var i = 0; i < cards.length; i++) {
      if (isNegative(cards[i])) { worst = cards[i]; break; }
    }
    if (worst) return worst;
    for (var j = 0; j < cards.length; j++) {
      if (cards[j] && cards[j].polarity === 'neutre') return cards[j];
    }
    return cards[cards.length - 1];
  }

  // ─── Adaptation carte → plan ───────────────────────────────────
  //    personnel : meaning + health + synthesis
  //    professionnel : meaning + work
  //    relationnel : meaning + love

  function adaptForPlane(card, plane) {
    if (!card) return { kw: '', text: '' };
    var kw = card.keywords && card.keywords.length ? card.keywords[0] : '';
    var text = '';

    if (plane === 'personnel') {
      kw = card.keywords && card.keywords.length >= 2 ? card.keywords[1] : kw;
      text = [card.meaning, card.health, card.synthesis].filter(Boolean).join(' ');
    } else if (plane === 'professionnel') {
      kw = card.keywords && card.keywords.length >= 2 ? card.keywords[1] : kw;
      text = [card.meaning, card.work].filter(Boolean).join(' ');
    } else if (plane === 'relationnel') {
      kw = card.keywords && card.keywords.length >= 2 ? card.keywords[1] : kw;
      text = [card.meaning, card.love].filter(Boolean).join(' ');
    }

    return { kw: kw, text: text.trim() };
  }

  // ─── Chaînage narratif pour un plan ────────────────────────────

  function findPairing(src, target) {
    if (!src || !target || !src.pairings) return null;
    for (var i = 0; i < src.pairings.length; i++) {
      if (src.pairings[i].with === target.id) return src.pairings[i].meaning;
    }
    return null;
  }

  function chainCardsForPlane(cards, plane) {
    if (!cards || cards.length < 2) return '';
    var a = cards[0], b = cards[1], c = cards.length >= 3 ? cards[2] : null;
    var aKw = (adaptForPlane(a, plane).kw || a.keywords[0] || '');
    var bKw = (adaptForPlane(b, plane).kw || b.keywords[0] || '');
    var abP = findPairing(a, b);
    var parts = [];

    if (plane === 'personnel') {
      parts.push('<strong>' + esc(a.name) + '</strong> éveille en vous ' + esc(aKw));
      if (abP) {
        parts.push(', et avec <strong>' + esc(b.name) + '</strong> : ' + esc(abP.charAt(0).toLowerCase() + abP.slice(1)));
      } else {
        parts.push('. <strong>' + esc(b.name) + '</strong> approfondit ce cheminement en y apportant ' + esc(bKw));
      }
    } else if (plane === 'professionnel') {
      parts.push('<strong>' + esc(a.name) + '</strong> initie une dynamique de ' + esc(aKw));
      if (abP) {
        parts.push('. Avec <strong>' + esc(b.name) + '</strong> : ' + esc(abP.charAt(0).toLowerCase() + abP.slice(1)));
      } else {
        parts.push('. <strong>' + esc(b.name) + '</strong> structure cette énergie autour de ' + esc(bKw));
      }
    } else {
      parts.push('<strong>' + esc(a.name) + '</strong> ouvre votre cœur à ' + esc(aKw));
      if (abP) {
        parts.push('. Avec <strong>' + esc(b.name) + '</strong> : ' + esc(abP.charAt(0).toLowerCase() + abP.slice(1)));
      } else {
        parts.push('. <strong>' + esc(b.name) + '</strong> enrichit ce lien de ' + esc(bKw));
      }
    }

    if (c) {
      var bcP = findPairing(b, c);
      var cKw = adaptForPlane(c, plane).kw || c.keywords[0] || '';
      if (plane === 'personnel') {
        parts.push('. Enfin, <strong>' + esc(c.name) + '</strong> accomplit cette transformation intérieure');
        parts.push(bcP ? ' : ' + esc(bcP.charAt(0).toLowerCase() + bcP.slice(1)) : ' en révélant ' + esc(cKw));
      } else if (plane === 'professionnel') {
        parts.push('. <strong>' + esc(c.name) + '</strong> concrétise le résultat');
        parts.push(bcP ? ' : ' + esc(bcP.charAt(0).toLowerCase() + bcP.slice(1)) : ' sous le signe de ' + esc(cKw));
      } else {
        parts.push('. <strong>' + esc(c.name) + '</strong> couronne cette histoire de cœur');
        parts.push(bcP ? ' : ' + esc(bcP.charAt(0).toLowerCase() + bcP.slice(1)) : ' par ' + esc(cKw));
      }
    }

    parts.push('.');
    return parts.join('');
  }

  // ─── Blocs HTML réutilisables ──────────────────────────────────

  function sectionOpen(title) {
    return '<div class="tr-section"><div class="tr-header"><span class="tr-star">✦</span><h2 class="tr-title">' + esc(title) + '</h2></div>';
  }

  function sectionClose() { return '</div>'; }

  function sub(title) {
    return '<h3 class="tr-sub">' + esc(title) + '</h3>';
  }

  function dividerEl() {
    return '<div class="tr-divider"></div>';
  }

  function pairBlock(label, content) {
    return '<div class="tr-pair"><span class="tr-pair-lbl">' + esc(label) + '</span><p class="tr-pair-txt">' + content + '</p></div>';
  }

  function planeEntry(positionLabel, card, plane, extra) {
    var a = adaptForPlane(card, plane);
    var h = '<div class="tr-plane-entry">';
    h += '<div class="tr-plane-entry-head">';
    h += '<span class="tr-plane-pos">' + esc(positionLabel) + '</span>';
    h += '<span class="tr-plane-card">' + esc(card.symbol || '') + ' ' + esc(card.name) + '</span>';
    h += '</div>';
    h += '<span class="tr-plane-kw">' + esc(a.kw) + '</span>';
    h += '<p class="tr-plane-text">' + esc(a.text) + '</p>';
    if (extra) h += extra;
    h += '</div>';
    return h;
  }

  // ═══════════════════════════════════════════════════════════════
  //  PLAN PERSONNEL — Croissance intérieure, bien-être
  // ═══════════════════════════════════════════════════════════════

  function buildPersonnelQuotidien(card) {
    var a = adaptForPlane(card, 'personnel');
    var h = '';
    h += '<p class="tr-plane-intro">Une carte tirée pour vous, comme un miroir tendu vers votre intériorité. Laissez ce message cheminer en vous tout au long de cette journée.</p>';
    h += dividerEl();

    h += '<div class="tr-entry">';
    h += '<div class="tr-entry-head">';
    h += '<span class="tr-plane-card">' + esc(card.symbol || '') + ' ' + esc(card.name) + '</span>';
    h += '</div>';
    h += '<span class="tr-plane-kw">' + esc(a.kw) + '</span>';
    h += '<p class="tr-plane-text">' + esc(a.text) + '</p>';
    h += '</div>';

    h += dividerEl();
    h += sub('Conseil Intérieur');
    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Ce que votre âme vous souffle</span>';
    h += '<p>' + esc(card.advice) + '</p>';
    h += '</div>';

    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Face d\'Ombre à surveiller</span>';
    h += '<p>' + esc(card.shadow) + '</p>';
    h += '</div>';

    h += dividerEl();
    h += '<div class="tr-plane-question">';
    h += '<span class="tr-plane-question-lbl">Question à méditer aujourd\'hui</span>';
    h += '<p>' + esc(card.question) + '</p>';
    h += '</div>';

    return h;
  }

  function buildPersonnelTroisCartes(cards) {
    var h = '';
    h += sectionOpen('Votre Trajectoire Personnelle');
    h += '<p class="tr-plane-intro">Trois cartes pour éclairer votre cheminement intérieur. Elles révèlent la trame de votre croissance personnelle, vos forces actuelles et les enseignements que l\'Univers dépose sur votre route.</p>';
    h += dividerEl();

    h += sub('La Chaîne Intérieure');
    h += pairBlock('La phrase de votre âme', chainCardsForPlane(cards, 'personnel'));
    h += dividerEl();

    var labels = ['Ce qui Émerge en Vous', 'Ce qui Vous Travaille', 'Ce vers Quoi Vous Allez'];
    for (var i = 0; i < 3; i++) {
      var c = cards[i];
      var extra = '<p class="tr-plane-text" style="color:var(--gold);font-size:0.85rem;margin-top:0.3rem;"><strong>Conseil :</strong> ' + esc(c.advice) + '</p>';
      h += planeEntry(labels[i], c, 'personnel', extra);
    }

    h += dividerEl();

    var synthCard = cards[2];
    h += sub('Ce Que l\'Univers Vous Enseigne');
    h += '<div class="tr-plane-synth">';
    h += '<span class="tr-plane-synth-lbl">Synthèse</span>';
    h += '<p>' + esc(synthCard.synthesis || synthCard.meaning) + '</p>';
    h += '</div>';

    h += dividerEl();

    h += sub('Votre Pratique Cette Semaine');
    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Trois actions à incarner</span>';
    h += '<ol style="padding-left:1.2rem;line-height:1.8;color:var(--text);font-size:0.9rem;">';
    h += '<li>Chaque matin, méditez cette phrase : <em>' + esc(cards[1].advice) + '</em></li>';
    h += '<li>Notez dans un carnet les synchronicités liées à <strong>' + esc(cards[0].name) + '</strong></li>';
    h += '<li>Avant de dormir, interrogez-vous : <em>' + esc(cards[2].question) + '</em></li>';
    h += '</ol>';
    h += '</div>';

    h += sectionClose();
    return h;
  }

  function buildPersonnelCarreDeNeuf(cards) {
    var center = cards[4];
    var h = '';
    h += sectionOpen('Votre Cheminement Intérieur Profond');
    h += '<p class="tr-plane-intro">Le Carré de Neuf déploie une cartographie complète de votre paysage intérieur. Chaque position révèle une facette de votre croissance personnelle, de vos ombres et de votre lumière.</p>';
    h += dividerEl();

    h += sub('La Carte de Votre Cheminement');
    var ca = adaptForPlane(center, 'personnel');
    h += '<div class="tr-plane-entry" style="border-left:3px solid var(--gold);padding-left:1rem;">';
    h += '<div class="tr-plane-entry-head">';
    h += '<span class="tr-plane-pos">Position Centrale</span>';
    h += '<span class="tr-plane-card">' + esc(center.symbol || '') + ' ' + esc(center.name) + '</span>';
    h += '</div>';
    h += '<span class="tr-plane-kw">' + esc(ca.kw) + '</span>';
    h += '<p class="tr-plane-text">' + esc(ca.text) + '</p>';
    h += '<p class="tr-plane-text" style="color:var(--gold);font-size:0.85rem;"><strong>Conseil :</strong> ' + esc(center.advice) + '</p>';
    h += '</div>';
    h += dividerEl();

    h += sub('Les Trois Leçons');
    var rows = [
      { idxs: [0,1,2], name: 'Leçon de Conscience', desc: 'Ce que votre esprit doit intégrer' },
      { idxs: [3,4,5], name: 'Leçon d\'Incarnation', desc: 'Ce que votre quotidien vous enseigne' },
      { idxs: [6,7,8], name: 'Leçon d\'Âme', desc: 'Ce que votre essence profonde vous révèle' }
    ];
    for (var ri = 0; ri < rows.length; ri++) {
      var row = rows[ri];
      var rowCards = [cards[row.idxs[0]], cards[row.idxs[1]], cards[row.idxs[2]]];
      var fullLabel = row.name + ' <span style="font-weight:400;font-size:0.8rem;color:var(--text-muted);">(' + esc(row.desc) + ')</span>';
      h += pairBlock(fullLabel, chainCardsForPlane(rowCards, 'personnel'));
    }
    h += dividerEl();

    h += sub('De l\'Ombre à la Lumière');
    var pos = getMostPositive(cards);
    var chal = getMostChallenging(cards);
    var pa = adaptForPlane(pos, 'personnel');
    var cha = adaptForPlane(chal, 'personnel');
    h += pairBlock(
      'Votre Plus Grande Force Actuelle',
      '<strong>' + esc(pos.symbol || '') + ' ' + esc(pos.name) + '</strong> — ' + esc(pa.text)
    );
    h += pairBlock(
      'Votre Défi de Croissance',
      '<strong>' + esc(chal.symbol || '') + ' ' + esc(chal.name) + '</strong> — ' + esc(cha.text) + ' ' + esc(chal.shadow || '')
    );
    h += dividerEl();

    h += sub('Votre Feuille de Route Intérieure');
    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Trois étapes pour honorer votre chemin</span>';
    h += '<ol style="padding-left:1.2rem;line-height:1.8;color:var(--text);font-size:0.9rem;">';
    h += '<li>Accueillez <strong>' + esc(cards[0].name) + '</strong> comme point de départ : ' + esc(cards[0].advice) + '</li>';
    h += '<li>Ancrez-vous dans <strong>' + esc(cards[4].name) + '</strong> comme pilier : ' + esc(cards[4].advice) + '</li>';
    h += '<li>Avancez vers <strong>' + esc(cards[8].name) + '</strong> comme horizon : ' + esc(cards[8].advice) + '</li>';
    h += '</ol>';
    h += '</div>';
    h += dividerEl();

    h += '<div class="tr-plane-question">';
    h += '<span class="tr-plane-question-lbl">Question Profonde à Explorer</span>';
    h += '<p>' + esc(center.question) + '</p>';
    h += '</div>';

    h += sectionClose();
    return h;
  }

  // ═══════════════════════════════════════════════════════════════
  //  PLAN PROFESSIONNEL — Carrière, projets, finances
  // ═══════════════════════════════════════════════════════════════

  function buildProfessionnelQuotidien(card) {
    var a = adaptForPlane(card, 'professionnel');
    var h = '';
    h += '<p class="tr-plane-intro">Une carte pour guider votre journée professionnelle. Elle éclaire vos projets, vos décisions et l\'énergie à cultiver dans votre travail.</p>';
    h += dividerEl();

    h += '<div class="tr-entry">';
    h += '<div class="tr-entry-head">';
    h += '<span class="tr-plane-card">' + esc(card.symbol || '') + ' ' + esc(card.name) + '</span>';
    h += '</div>';
    h += '<span class="tr-plane-kw">' + esc(a.kw) + '</span>';
    h += '<p class="tr-plane-text">' + esc(card.work || card.meaning) + '</p>';
    h += '</div>';

    h += dividerEl();
    h += sub('Stratégie du Jour');
    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Conseil professionnel</span>';
    h += '<p>' + esc(card.advice) + '</p>';
    h += '</div>';

    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Piège à éviter</span>';
    h += '<p>' + esc(card.shadow) + '</p>';
    h += '</div>';

    h += dividerEl();
    h += '<div class="tr-plane-question">';
    h += '<span class="tr-plane-question-lbl">Question pour votre carrière</span>';
    h += '<p>' + esc(card.question) + '</p>';
    h += '</div>';

    return h;
  }

  function buildProfessionnelTroisCartes(cards) {
    var h = '';
    h += sectionOpen('Votre Trajectoire Professionnelle');
    h += '<p class="tr-plane-intro">Trois cartes pour décoder les forces à l\'œuvre dans votre vie professionnelle : ce qui se prépare, ce qui se joue et ce qui se concrétise.</p>';
    h += dividerEl();

    h += sub('La Dynamique Pro');
    h += pairBlock('La mécanique de votre succès', chainCardsForPlane(cards, 'professionnel'));
    h += dividerEl();

    var labels = ['Le Contexte Actuel', 'Le Mouvement en Cours', 'Le Résultat qui se Profile'];
    for (var i = 0; i < 3; i++) {
      var c = cards[i];
      var extra = '<p class="tr-plane-text" style="color:var(--gold);font-size:0.85rem;margin-top:0.3rem;"><strong>Stratégie :</strong> ' + esc(c.advice) + '</p>';
      h += planeEntry(labels[i], c, 'professionnel', extra);
    }

    h += dividerEl();

    h += sub('Opportunité à Saisir');
    h += '<div class="tr-plane-synth">';
    h += '<span class="tr-plane-synth-lbl">Ce que ce tirage vous révèle</span>';
    h += '<p>' + esc(cards[1].synthesis || cards[1].meaning) + '</p>';
    h += '</div>';

    h += dividerEl();

    h += sub('Action Prioritaire');
    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Votre prochain mouvement décisif</span>';
    h += '<p>' + esc(cards[2].advice) + '</p>';
    h += '</div>';

    h += sectionClose();
    return h;
  }

  function buildProfessionnelCarreDeNeuf(cards) {
    var center = cards[4];
    var h = '';
    h += sectionOpen('Votre Projet en Pleine Lumière');
    h += '<p class="tr-plane-intro">Une lecture approfondie de votre situation professionnelle : la carte centrale révèle le pivot de votre projet, et les neuf positions en dessinent l\'architecture complète.</p>';
    h += dividerEl();

    h += sub('Le Pivot de Votre Projet');
    var ca = adaptForPlane(center, 'professionnel');
    h += '<div class="tr-plane-entry" style="border-left:3px solid var(--gold);padding-left:1rem;">';
    h += '<div class="tr-plane-entry-head">';
    h += '<span class="tr-plane-pos">Carte Maîtresse</span>';
    h += '<span class="tr-plane-card">' + esc(center.symbol || '') + ' ' + esc(center.name) + '</span>';
    h += '</div>';
    h += '<span class="tr-plane-kw">' + esc(ca.kw) + '</span>';
    h += '<p class="tr-plane-text">' + esc(center.work || center.meaning) + '</p>';
    h += '<p class="tr-plane-text" style="color:var(--gold);font-size:0.85rem;"><strong>Stratégie :</strong> ' + esc(center.advice) + '</p>';
    h += '</div>';
    h += dividerEl();

    h += sub('Structure du Projet');
    var cols = [
      { idxs: [0,3,6], name: 'Fondations', desc: 'Les bases sur lesquelles vous construisez' },
      { idxs: [1,4,7], name: 'Développement', desc: 'Les forces qui font croître votre projet' },
      { idxs: [2,5,8], name: 'Aboutissement', desc: 'La destination vers laquelle vous tendez' }
    ];
    for (var ci = 0; ci < cols.length; ci++) {
      var col = cols[ci];
      var colCards = [cards[col.idxs[0]], cards[col.idxs[1]], cards[col.idxs[2]]];
      var fullLabel = col.name + ' <span style="font-weight:400;font-size:0.8rem;color:var(--text-muted);">(' + esc(col.desc) + ')</span>';
      h += pairBlock(fullLabel, chainCardsForPlane(colCards, 'professionnel'));
    }
    h += dividerEl();

    h += sub('Forces et Vigilances');
    var pos = getMostPositive(cards);
    var chal = getMostChallenging(cards);
    var pa = adaptForPlane(pos, 'professionnel');
    var cha = adaptForPlane(chal, 'professionnel');
    h += pairBlock(
      'Votre Atout Maître',
      '<strong>' + esc(pos.symbol || '') + ' ' + esc(pos.name) + '</strong> — ' + esc(pa.text)
    );
    h += pairBlock(
      'Point de Vigilance',
      '<strong>' + esc(chal.symbol || '') + ' ' + esc(chal.name) + '</strong> — ' + esc(cha.text) + ' ' + esc(chal.shadow || '')
    );
    h += dividerEl();

    h += sub('Plan d\'Action');
    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Trois actions concrètes</span>';
    h += '<ol style="padding-left:1.2rem;line-height:1.8;color:var(--text);font-size:0.9rem;">';
    h += '<li>Étape Fondation — ' + esc(cards[0].advice) + '</li>';
    h += '<li>Étape Développement — ' + esc(cards[4].advice) + '</li>';
    h += '<li>Étape Aboutissement — ' + esc(cards[8].advice) + '</li>';
    h += '</ol>';
    h += '</div>';

    h += sectionClose();
    return h;
  }

  // ═══════════════════════════════════════════════════════════════
  //  PLAN RELATIONNEL — Amour, amitié, famille
  // ═══════════════════════════════════════════════════════════════

  function buildRelationnelQuotidien(card) {
    var a = adaptForPlane(card, 'relationnel');
    var h = '';
    h += '<p class="tr-plane-intro">La Carte du Cœur — un message pour vos relations du jour. Amour, amitié, famille : laissez cette carte éclairer vos liens les plus précieux.</p>';
    h += dividerEl();

    h += '<div class="tr-entry">';
    h += '<div class="tr-entry-head">';
    h += '<span class="tr-plane-card">' + esc(card.symbol || '') + ' ' + esc(card.name) + '</span>';
    h += '</div>';
    h += '<span class="tr-plane-kw">' + esc(a.kw) + '</span>';
    h += '<p class="tr-plane-text">' + esc(card.love || card.meaning) + '</p>';
    h += '</div>';

    h += dividerEl();
    h += sub('Conseil du Cœur');
    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Ce que votre cœur vous conseille</span>';
    h += '<p>' + esc(card.advice) + '</p>';
    h += '</div>';

    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Ombre relationnelle à surveiller</span>';
    h += '<p>' + esc(card.shadow) + '</p>';
    h += '</div>';

    h += dividerEl();
    h += '<div class="tr-plane-question">';
    h += '<span class="tr-plane-question-lbl">Question pour vos relations</span>';
    h += '<p>' + esc(card.question) + '</p>';
    h += '</div>';

    return h;
  }

  function buildRelationnelTroisCartes(cards) {
    var h = '';
    h += sectionOpen('L\'Histoire de Votre Cœur');
    h += '<p class="tr-plane-intro">Trois cartes pour lire la partition de vos relations. Chaque carte est un chapitre de votre histoire affective, une note dans la symphonie de vos liens.</p>';
    h += dividerEl();

    h += sub('La Rencontre des Âmes');
    h += pairBlock('Le récit de vos liens', chainCardsForPlane(cards, 'relationnel'));
    h += dividerEl();

    var labels = ['Ce Qui Vous Appelle', 'Ce Qui Vous Relie', 'Ce Qui Vous Attend'];
    for (var i = 0; i < 3; i++) {
      var c = cards[i];
      var extra = '<p class="tr-plane-text" style="color:var(--rose);font-size:0.85rem;margin-top:0.3rem;"><strong>Message :</strong> ' + esc(c.advice) + '</p>';
      h += planeEntry(labels[i], c, 'relationnel', extra);
    }

    h += dividerEl();

    h += sub('Le Message de Votre Cœur');
    h += '<div class="tr-plane-synth">';
    h += '<span class="tr-plane-synth-lbl">Ce que vos relations vous enseignent</span>';
    h += '<p>' + esc(cards[1].synthesis || cards[1].love || cards[1].meaning) + '</p>';
    h += '</div>';

    h += dividerEl();

    h += sub('Un Geste à Poser');
    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Un acte concret pour nourrir vos liens</span>';
    h += '<p>' + esc(cards[2].advice) + '</p>';
    h += '</div>';

    h += sectionClose();
    return h;
  }

  function buildRelationnelCarreDeNeuf(cards) {
    var center = cards[4];
    var h = '';
    h += sectionOpen('La Cartographie de Vos Relations');
    h += '<p class="tr-plane-intro">Le Carré de Neuf explore toutes les facettes de votre vie relationnelle. Amour, amitié, famille : chaque carte dévoile une dimension de vos liens les plus précieux.</p>';
    h += dividerEl();

    h += sub('Le Cœur de Vos Relations');
    var ca = adaptForPlane(center, 'relationnel');
    h += '<div class="tr-plane-entry" style="border-left:3px solid var(--rose);padding-left:1rem;">';
    h += '<div class="tr-plane-entry-head">';
    h += '<span class="tr-plane-pos">Position Centrale</span>';
    h += '<span class="tr-plane-card">' + esc(center.symbol || '') + ' ' + esc(center.name) + '</span>';
    h += '</div>';
    h += '<span class="tr-plane-kw">' + esc(ca.kw) + '</span>';
    h += '<p class="tr-plane-text">' + esc(center.love || center.meaning) + '</p>';
    h += '<p class="tr-plane-text" style="color:var(--rose);font-size:0.85rem;"><strong>Message :</strong> ' + esc(center.advice) + '</p>';
    h += '</div>';
    h += dividerEl();

    h += sub('Les Trois Dimensions de l\'Amour');
    var dims = [
      { idxs: [0,1,2], name: 'La Tête', desc: 'Ce que vous pensez de vos relations, vos attentes conscientes' },
      { idxs: [3,4,5], name: 'Le Cœur', desc: 'Ce que vous ressentez, vos émotions et vos désirs profonds' },
      { idxs: [6,7,8], name: 'Le Corps', desc: 'Ce que vous vivez concrètement, votre quotidien affectif' }
    ];
    for (var di = 0; di < dims.length; di++) {
      var dim = dims[di];
      var dimCards = [cards[dim.idxs[0]], cards[dim.idxs[1]], cards[dim.idxs[2]]];
      var fullLabel = dim.name + ' <span style="font-weight:400;font-size:0.8rem;color:var(--text-muted);">(' + esc(dim.desc) + ')</span>';
      h += pairBlock(fullLabel, chainCardsForPlane(dimCards, 'relationnel'));
    }
    h += dividerEl();

    h += sub('Ce Qui Vous Unit / Ce Qui Vous Sépare');
    var pos = getMostPositive(cards);
    var chal = getMostChallenging(cards);
    var pa = adaptForPlane(pos, 'relationnel');
    var cha = adaptForPlane(chal, 'relationnel');
    h += pairBlock(
      'Ce Qui Vous Unit',
      '<strong>' + esc(pos.symbol || '') + ' ' + esc(pos.name) + '</strong> — ' + esc(pa.text)
    );
    h += pairBlock(
      'Ce Qui Vous Sépare ou Vous Défie',
      '<strong>' + esc(chal.symbol || '') + ' ' + esc(chal.name) + '</strong> — ' + esc(cha.text) + ' ' + esc(chal.shadow || '')
    );
    h += dividerEl();

    h += sub('Chemin de Cœur');
    h += '<div class="tr-plane-conseil">';
    h += '<span class="tr-plane-conseil-lbl">Trois pas vers des relations plus lumineuses</span>';
    h += '<ol style="padding-left:1.2rem;line-height:1.8;color:var(--text);font-size:0.9rem;">';
    h += '<li>Écoutez <strong>' + esc(cards[0].name) + '</strong> — ' + esc(cards[0].advice) + '</li>';
    h += '<li>Incarnez <strong>' + esc(cards[4].name) + '</strong> — ' + esc(cards[4].advice) + '</li>';
    h += '<li>Offrez <strong>' + esc(cards[8].name) + '</strong> — ' + esc(cards[8].advice) + '</li>';
    h += '</ol>';
    h += '</div>';

    h += sectionClose();
    return h;
  }

  // ═══════════════════════════════════════════════════════════════
  //  API PUBLIQUE
  // ═══════════════════════════════════════════════════════════════

  function buildPlaneReading(spreadType, drawnCards, plane) {
    var cards = drawnCards || [];
    if (!cards.length) return '';

    var planeLabel = { personnel: 'Personnel', professionnel: 'Professionnel', relationnel: 'Relationnel' }[plane] || plane;
    var planeIcon = { personnel: '☾', professionnel: '☉', relationnel: '♡' }[plane] || '';
    var html = '';

    html += '<div class="tr-plane-header">';
    html += '<span class="tr-plane-icon">' + esc(planeIcon) + '</span>';
    html += '<h3 class="tr-plane-title">Lecture sur le Plan ' + esc(planeLabel) + '</h3>';
    html += '</div>';

    if (spreadType === 'quotidien') {
      if (plane === 'personnel') html += buildPersonnelQuotidien(cards[0]);
      else if (plane === 'professionnel') html += buildProfessionnelQuotidien(cards[0]);
      else html += buildRelationnelQuotidien(cards[0]);
    } else if (spreadType === 'trois-cartes') {
      if (cards.length < 3) return '';
      var three = cards.slice(0, 3);
      if (plane === 'personnel') html += buildPersonnelTroisCartes(three);
      else if (plane === 'professionnel') html += buildProfessionnelTroisCartes(three);
      else html += buildRelationnelTroisCartes(three);
    } else if (spreadType === 'carre-de-neuf') {
      if (cards.length < 9) return '';
      var nine = cards.slice(0, 9);
      if (plane === 'personnel') html += buildPersonnelCarreDeNeuf(nine);
      else if (plane === 'professionnel') html += buildProfessionnelCarreDeNeuf(nine);
      else html += buildRelationnelCarreDeNeuf(nine);
    }

    return html;
  }

  function generateAllPlaneReadings(spreadType, drawnCards) {
    var cards = drawnCards || [];
    if (!cards.length) return '';

    var planes = ['personnel', 'professionnel', 'relationnel'];
    var planeLabels = ['☾ Personnel', '☉ Professionnel', '♡ Relationnel'];
    var html = '';

    html += '<div class="tr-planes-wrapper">';
    html += '<div class="tr-planes-tabs">';
    for (var i = 0; i < planes.length; i++) {
      html += '<button class="tr-plane-tab' + (i === 0 ? ' active' : '') + '" data-plane="' + esc(planes[i]) + '">' + esc(planeLabels[i]) + '</button>';
    }
    html += '</div>';

    html += '<div class="tr-planes-content">';
    for (var j = 0; j < planes.length; j++) {
      html += '<div class="tr-plane-pane' + (j === 0 ? ' active' : '') + '" data-plane="' + esc(planes[j]) + '">';
      html += buildPlaneReading(spreadType, cards, planes[j]);
      html += '</div>';
    }
    html += '</div></div>';

    return html;
  }

  // ─── Attachement ───────────────────────────────────────────────

  window.tarotLenormandPlanes = {
    version: '2.0',
    buildPlaneReading: buildPlaneReading,
    generateAllPlaneReadings: generateAllPlaneReadings
  };

})();
