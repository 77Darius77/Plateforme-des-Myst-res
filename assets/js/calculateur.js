/* ═══════════════════════════════════════════
   NUMÉROLOGIE CABALISTIQUE — Calculateur
   ═══════════════════════════════════════════ */

const ARCHETYPES = {
  1:  { force: "Leader, pionnier, indépendance", faiblesse: "Égoïsme, domination", interpretation: "Tu es né·e pour ouvrir des chemins. Ta force est l'initiative, l'audace, la capacité à te lancer sans attendre. Mais ton ombre est l'égoïsme — apprends à ouvrir la voie sans écraser ceux qui marchent avec toi." },
  2:  { force: "Coopération, diplomatie, patience", faiblesse: "Dépendance affective", interpretation: "Tu es un·e pacificateur·rice naturel·le. Ta force est l'harmonie, l'écoute, l'art de rassembler. Attention à ne pas confondre coopération et fusion — ta valeur ne dépend pas de celle des autres." },
  3:  { force: "Communication, créativité, joie", faiblesse: "Dispersion, superficialité", interpretation: "Tu rayonnes par ta parole et ta créativité. Le monde a besoin de ta lumière. Mais veille à ne pas t'éparpiller — la profondeur vaut mieux que mille étincelles." },
  4:  { force: "Structure, ordre, discipline", faiblesse: "Rigidité, peur du changement", interpretation: "Tu es le pilier sur lequel les autres s'appuient. Ta discipline construit des cathédrales. Mais souviens-toi que même les pyramides respirent — la vie a besoin de mouvement." },
  5:  { force: "Liberté, aventure, adaptabilité", faiblesse: "Instabilité, excès", interpretation: "Tu es l'explorateur·rice de l'âme. Ta soif de nouveauté est un trésor. Apprends à danser avec le changement sans brûler toutes tes maisons." },
  6:  { force: "Responsabilité, famille, service", faiblesse: "Mensonge (6↔9)", interpretation: "Tu portes le monde sur tes épaules avec une générosité rare. Mais le 6 cache un secret : renverse-le, il devient le 9, la Vérité. Ne te mens pas pour plaire." },
  7:  { force: "Sagesse intérieure, analyse, spiritualité", faiblesse: "Isolement, froideur", interpretation: "Tu vois ce que les autres ne voient pas. Ta profondeur d'analyse est un don précieux. Mais n'enferme pas ta sagesse dans une tour d'ivoire — descends partager." },
  8:  { force: "Pouvoir, conquête, stratégie", faiblesse: "Avidité, manipulation", interpretation: "Tu es bâti·e pour accomplir de grandes choses. Le pouvoir est ton outil. Utilise-le comme un jardinier, pas comme un conquérant — cultive, ne détruis pas." },
  9:  { force: "Vérité, sagesse universelle", faiblesse: "Mensonge (9↔6)", interpretation: "Tu es un phare de vérité. Ta mission est d'incarner l'authenticité absolue. Mais le 9 inversé est le 6, le mensonge — ne te cache pas derrière des façades, même pour te protéger." },
  10: { force: "Compréhension : jamais seul·e", faiblesse: "Peur de la solitude", interpretation: "Tu sais profondément que nous sommes tous reliés. Ta force est cette connexion universelle. Mais ta peur d'être seul·e peut te faire oublier que la solitude est parfois une alliée." },
  11: { force: "Intuition, connexion inter-mondes", faiblesse: "Dépendance, nier son intuition", interpretation: "Tu perçois les mondes invisibles. Ton intuition est une boussole infaillible — à condition de l'écouter, et de ne pas la sacrifier pour plaire." },
  12: { force: "Sacrifice, grande capacité de travail", faiblesse: "Esclavage — ne pas savoir dire non", interpretation: "Tu peux déplacer des montagnes par ton travail. Mais apprends à dire NON. Le sacrifice a de la valeur seulement s'il est choisi, pas subi." },
  13: { force: "Transformation, Amour (Ahavá), le Phénix", faiblesse: "Transformation douloureuse prolongée", interpretation: "Le 13 n'est pas maudit — c'est le nombre de l'Amour. Tu es l'alchimiste qui transforme la souffrance en or. Embrasse le changement : c'est en mourant qu'on renaît." },
  14: { force: "Engagement, respect des contrats", faiblesse: "Fuir les engagements", interpretation: "Ta parole est ton sceau. Tu honores tes promesses avec une loyauté exemplaire. Mais ton ombre te pousse à fuir quand l'engagement fait peur — apprends à rester." },
  15: { force: "Passion (tous domaines)", faiblesse: "Addictions, surtout sexuelles", interpretation: "Tu vibres avec une intensité rare. La passion est ton carburant. Mais canalise-la — une rivière sans berges devient un marécage." },
  16: { force: "Perfectionnisme sain, excellence", faiblesse: "Auto-exigence excessive, souffrance", interpretation: "Tu vises l'excellence, et tu l'atteins. Mais quand le perfectionnisme devient un fouet, il blesse. Accepte que « assez bien » soit parfois parfait." },
  17: { force: "Douceur, tactilité, chaleur humaine", faiblesse: "Froideur, absence de contact", interpretation: "Tu es une source de chaleur et de réconfort. Ta douceur guérit. Mais si tu te coupes du contact, tu te prives de ta propre médecine." },
  18: { force: "Décodage des secrets familiaux, rêves", faiblesse: "Secrets non révélés, ombre familiale", interpretation: "Tu es le·a détective des secrets de famille. Les rêves te parlent. Mais attention à ne pas découvrir ce que tu n'es pas prêt·e à révéler." },
  19: { force: "Rayonnement, exemplarité, conscience", faiblesse: "Implosion, problème d'estime de soi", interpretation: "Tu es fait·e pour briller et inspirer. Le monde a besoin de ta lumière. Mais si tu doutes de toi, cette lumière s'éteint — allume-la, même si ta main tremble." },
  20: { force: "Reconnaissance, titres, diplômes", faiblesse: "« Qui est mon père ? » — absence", interpretation: "Tu as soif de reconnaissance, et c'est légitime. Mais la vraie question du 20 est : qui suis-je au-delà des titres ? La réponse est en toi, pas dans le regard des autres." },
  21: { force: "Vision globale, langues, liberté", faiblesse: "Esclavage, ne pas se sentir libre", interpretation: "Tu vois le monde comme un aigle voit la terre. Rien ne t'échappe. Mais ta liberté est sacrée — ne laisse personne te mettre en cage." },
  22: { force: "Le Joker — toutes possibilités, libre arbitre", faiblesse: "Chaos, dispersion, chaos sexuel", interpretation: "Tu portes en toi toutes les possibilités de la création. C'est un don vertigineux. Mais sans discipline, ce pouvoir devient chaos — choisis, puis construis." }
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

  return { jour, mois, annee, chemin, ticun, date: dateStr };
}

function reveal() {
  const input = document.getElementById('dateInput');
  const errorEl = document.getElementById('errorMsg');
  const resultat = document.getElementById('resultat');
  const btn = document.getElementById('calcBtn');

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
  resultat.classList.remove('visible');

  try {
    const r = calculer(input.value.trim());

    // Animation du bouton
    btn.textContent = '✦ Révélation en cours...';
    btn.disabled = true;

    setTimeout(() => {
      // Détail du calcul — textContent pour les données utilisateur
      document.getElementById('calcDetail').textContent =
        `Jour ${r.jour} + Mois ${r.mois} + Année ${r.annee} = ${r.jour + r.mois + r.annee} → Chemin de vie ${r.chemin}\n` +
        `max(${r.jour},${r.mois},${r.annee}) − mid − min → Ticún ${r.ticun}`;

      // Cartes résultat — innerHTML pour la structure fixe, textContent pour les valeurs dynamiques
      const cv = ARCHETYPES[r.chemin];
      const tc = ARCHETYPES[r.ticun];
      const cardsContainer = document.getElementById('resultCards');
      cardsContainer.innerHTML = `
        <div class="result-card emerald-card">
          <div class="label">Chemin de vie / Don</div>
          <div class="big-num"></div>
          <div class="desc"><strong></strong><br><span style="font-size:0.8rem;color:#64748b">Ombre : <span class="ombre-val"></span></span></div>
        </div>
        <div class="result-card gold">
          <div class="label">Ticún / Défi d'âme</div>
          <div class="big-num"></div>
          <div class="desc"><strong></strong><br><span style="font-size:0.8rem;color:#64748b">Ombre : <span class="ombre-val"></span></span></div>
        </div>
      `;
      const cards = cardsContainer.children;
      cards[0].querySelector('.big-num').textContent = r.chemin;
      cards[0].querySelector('.desc strong').textContent = cv.force;
      cards[0].querySelector('.ombre-val').textContent = cv.faiblesse;
      cards[1].querySelector('.big-num').textContent = r.ticun;
      cards[1].querySelector('.desc strong').textContent = tc.force;
      cards[1].querySelector('.ombre-val').textContent = tc.faiblesse;

      // Interprétation — innerHTML pour la structure fixe, textContent pour les valeurs dynamiques
      const interpContainer = document.getElementById('resultInterpretation');
      interpContainer.innerHTML = `
        <p style="color:#fbbf24;font-weight:600;margin-bottom:0.5rem;"></p>
        <p></p>
        <p style="margin-top:0.8rem;"></p>
      `;
      const interpPs = interpContainer.children;
      interpPs[0].textContent = `🔮 Lecture croisée — ${r.chemin} + ${r.ticun}`;
      interpPs[1].textContent = cv.interpretation;
      interpPs[2].textContent = tc.interpretation;

      resultat.classList.add('visible');
      resultat.scrollIntoView({ behavior: 'smooth', block: 'center' });

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

document.addEventListener('DOMContentLoaded', initFromURL);
