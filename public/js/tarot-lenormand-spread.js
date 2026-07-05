/*
 * Moteur d'interaction des tirages Petit Lenormand (partagé par les 4 sous-pages).
 * Le type de tirage est lu depuis l'attribut data-spread de #table-area
 * (quotidien | trois-cartes | carre-de-neuf | grand-tableau).
 * La logique de tirage est identique à l'ancienne page unique lenormand.astro ;
 * seule la sélection du tirage (ancien sélecteur) a été remplacée par le data-spread,
 * et l'accessibilité clavier (étape 3) a été ajoutée aux cartes de l'éventail.
 */
(function () {
  const FILENAMES = {
    "01": "1_cavalier.png",
    "02": "2_clover.png",
    "03": "3_ship.png",
    "04": "4_house.png",
    "05": "5_tree.png",
    "06": "6_clouds.png",
    "07": "7_snake.png",
    "08": "8_coffin.png",
    "09": "9_flowers.png",
    "10": "10_scythe.png",
    "11": "11_birchrod.png",
    "12": "12_birds.png",
    "13": "13_children.png",
    "14": "14_fox.png",
    "15": "15_bear.png",
    "16": "16_star.png",
    "17": "17_stork.png",
    "18": "18_dog.png",
    "19": "19_tower.png",
    "20": "20_garden.png",
    "21": "21_mountain.png",
    "22": "22_road.png",
    "23": "23_mice.png",
    "24": "24_heart.png",
    "25": "25_ring.png",
    "26": "26_book.png",
    "27": "27_letter.png",
    "28": "28_gentleman.png",
    "29": "29_lady.png",
    "30": "30_lilies.png",
    "31": "31_sun.png",
    "32": "32_moon.png",
    "33": "33_key.png",
    "34": "34_fish.png",
    "35": "35_anchor.png",
    "36": "36_cross.png"
  };

  function initLenormandSpread() {
    const tableArea = document.getElementById('table-area');
    if (!tableArea || tableArea.dataset.initialized) return;
    tableArea.dataset.initialized = "true";

    const btnShuffle = document.getElementById('btn-shuffle');
    const btnRevealAll = document.getElementById('btn-reveal-all');
    const fanContainer = document.getElementById('fan-container');
    const slotsContainer = document.getElementById('slots-container');
    const deckInstruction = document.getElementById('deck-instruction');
    const readingSection = document.getElementById('reading-section');

    // Type de tirage figé pour la sous-page (lu depuis data-spread)
    let currentSpread = tableArea.dataset.spread || 'quotidien';
    let drawnCards = [];
    let requiredCards = 1;
    let deckIndices = [];

    function resetTable() {
      // Masquer/Réinitialiser
      fanContainer.style.display = 'none';
      slotsContainer.style.display = 'none';
      btnRevealAll.style.display = 'none';
      readingSection.style.display = 'none';
      btnShuffle.style.display = 'inline-block';
      drawnCards = [];

      if (currentSpread === 'quotidien') {
        requiredCards = 1;
        deckInstruction.innerText = "Préparez vos cartes pour le Tirage Quotidien (1 carte)";
        btnShuffle.innerText = "Mélanger et Étaler ✦";
      } else if (currentSpread === 'trois-cartes') {
        requiredCards = 3;
        deckInstruction.innerText = "Préparez vos cartes pour la Ligne du Temps (3 cartes)";
        btnShuffle.innerText = "Mélanger et Étaler ✦";
      } else if (currentSpread === 'carre-de-neuf') {
        requiredCards = 9;
        deckInstruction.innerText = "Préparez vos cartes pour le Carré de 9 (9 cartes)";
        btnShuffle.innerText = "Mélanger et Étaler ✦";
      } else if (currentSpread === 'grand-tableau') {
        requiredCards = 36;
        deckInstruction.innerText = "Préparez les 36 cartes pour le Grand Tableau";
        btnShuffle.innerText = "Mélanger et Étaler ✦";
      }
    }

    // Clic sur Shuffler
    btnShuffle.addEventListener('click', () => {
      btnShuffle.style.display = 'none';
      readingSection.style.display = 'none';

      // Mélanger les indices de cartes 0 à 35
      deckIndices = Array.from({length: 36}, (_, i) => i).sort(() => 0.5 - Math.random());

      // Éventail de cartes à tirer (commun à tous les tirages)
      deckInstruction.innerText = `Sélectionnez ${requiredCards} cartes en cliquant sur le paquet (${drawnCards.length}/${requiredCards})`;
      buildFanLayout();
      buildSlotsLayout();
    });

    // Générer l'éventail de cartes piochables
    function buildFanLayout() {
      fanContainer.innerHTML = '';
      fanContainer.style.display = 'block';

      const width = fanContainer.offsetWidth || Math.min(window.innerWidth - 40, 850);
      const step = (width - 55) / 35;

      for (let i = 0; i < 36; i++) {
        const card = document.createElement('div');
        card.className = 'fan-card';
        card.style.left = `${i * step}px`;
        card.style.zIndex = i;

        // Positionnement en arc
        const middle = 17.5;
        const dist = Math.abs(i - middle);
        const y = dist * dist * 0.15;
        const rot = (i - middle) * 1.5;

        card.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
        card.dataset.index = deckIndices[i];

        // Accessibilité clavier (étape 3)
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Carte ${i + 1} sur 36, face cachée`);

        card.addEventListener('click', () => drawCardFromFan(card));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); drawCardFromFan(card); }
        });
        fanContainer.appendChild(card);
      }
    }

    // Clic sur une carte de l'éventail
    function drawCardFromFan(cardEl) {
      if (drawnCards.length >= requiredCards) return;

      cardEl.classList.add('drawn');
      const idx = parseInt(cardEl.dataset.index, 10);
      const cardData = window.tarotLenormandData[idx];
      drawnCards.push(cardData);

      const currentIdx = drawnCards.length;
      fillSlotData(currentIdx, cardData);

      // Ligne du Temps, Carré de 9 et Grand Tableau : ne pas révéler automatiquement, l'utilisateur utilisera le bouton
      if (currentSpread !== 'trois-cartes' && currentSpread !== 'carre-de-neuf' && currentSpread !== 'grand-tableau') {
        setTimeout(() => {
          document.getElementById(`slot-card-${currentIdx}`).classList.add('flipped');
        }, 300);
      }

      deckInstruction.innerText = `Sélectionnez ${requiredCards} cartes (${drawnCards.length}/${requiredCards})`;

      if (drawnCards.length === requiredCards) {
        if (currentSpread === 'trois-cartes' || currentSpread === 'carre-de-neuf' || currentSpread === 'grand-tableau') {
          fanContainer.style.display = 'none';
          btnRevealAll.style.display = 'inline-block';
          btnRevealAll.innerText = 'Révéler les cartes ✦';
          deckInstruction.innerText = "Tirage complet. Cliquez sur le bouton pour révéler les cartes.";
        } else {
          deckInstruction.innerText = "Tirage complet ! Découverte des interprétations...";
          setTimeout(() => {
            fanContainer.style.display = 'none';
            showReadings();
          }, 1200);
        }
      }
    }

    // Remplir un slot spécifique
    function fillSlotData(slotNum, cardData) {
      const imgEl = document.getElementById(`img-${slotNum}`);
      const titleEl = document.getElementById(`title-${slotNum}`);
      const kwEl = document.getElementById(`kw-${slotNum}`);
      const symEl = document.getElementById(`sym-${slotNum}`);
      const elemEl = document.getElementById(`elem-${slotNum}`);
      const planEl = document.getElementById(`plan-${slotNum}`);
      const cardEl = document.getElementById(`slot-card-${slotNum}`);

      if (cardEl) {
        cardEl.classList.remove('empty-slot');
      }
      if (imgEl) {
        imgEl.src = `/images/tarot/lenormand/${FILENAMES[cardData.id]}`;
        imgEl.alt = cardData.name;
      }
      if (titleEl) {
        titleEl.innerText = cardData.name;
      }
      const nameBelowEl = document.getElementById(`card-name-${slotNum}`);
      if (nameBelowEl) {
        nameBelowEl.innerText = cardData.name;
      }
      if (kwEl) {
        kwEl.innerText = cardData.keywords.slice(0, 2).join(', ');
      }
      // Métadonnées ésotériques (style Thoth)
      if (symEl) {
        symEl.innerText = cardData.symbol || '—';
      }
      if (elemEl) {
        elemEl.innerText = cardData.element || '—';
      }
      if (planEl) {
        planEl.innerText = cardData.planet || '—';
      }
    }

    // Construire la grille d'accueil des cartes (Slots)
    function buildSlotsLayout() {
      slotsContainer.innerHTML = '';
      slotsContainer.style.display = ''; // Laisser la classe CSS définir le display (grid/flex)

      let gridClass = '';
      let slotNames = [];

      if (currentSpread === 'quotidien') {
        gridClass = 'grid-quotidien';
        slotNames = ['La Clé du Jour'];
      } else if (currentSpread === 'trois-cartes') {
        gridClass = 'grid-trois-cartes';
        slotNames = ['Le Passé', 'Le Présent', 'Le Futur'];
      } else if (currentSpread === 'carre-de-neuf') {
        gridClass = 'grid-carre-de-neuf';
        slotNames = [
          'Passé - Tête', 'Présent - Tête', 'Futur - Tête',
          'Passé - Cœur', 'Présent - Cœur', 'Futur - Cœur',
          'Passé - Matériel', 'Présent - Matériel', 'Futur - Matériel'
        ];
      } else if (currentSpread === 'grand-tableau') {
        gridClass = 'grid-grand-tableau';
        slotNames = Array.from({length: 36}, (_, i) => `Maison ${i + 1}`);
      }

      slotsContainer.className = gridClass;

      for (let i = 0; i < requiredCards; i++) {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'lenormand-slot';

        // Titre de position (style Thoth)
        const titleSpan = document.createElement('div');
        titleSpan.className = 'tarot-pos';
        titleSpan.innerText = slotNames[i];
        slotDiv.appendChild(titleSpan);

        // Carte 3D (style Thoth)
        const cardDiv = document.createElement('div');
        cardDiv.className = 'lenormand-card empty-slot';
        cardDiv.id = `slot-card-${i + 1}`;

        const innerDiv = document.createElement('div');
        innerDiv.className = 'card-inner';

        // Face cachée
        const frontDiv = document.createElement('div');
        frontDiv.className = 'card-front';

        // Face révélée (style Thoth)
        const backDiv = document.createElement('div');
        backDiv.className = 'card-back';

        const img = document.createElement('img');
        img.id = `img-${i + 1}`;
        img.className = 'card-img';

        const title = document.createElement('h3');
        title.id = `title-${i + 1}`;
        title.className = 'card-back-title';

        // Bloc métadonnées ésotériques (style Thoth)
        const metaDiv = document.createElement('div');
        metaDiv.className = 'esoteric-metadata';
        metaDiv.innerHTML = `
          <div class="meta-row"><strong>Symbole:</strong> <span id="sym-${i + 1}"></span></div>
          <div class="meta-row"><strong>Élément:</strong> <span id="elem-${i + 1}"></span></div>
          <div class="meta-row"><strong>Planète:</strong> <span id="plan-${i + 1}"></span></div>
        `;

        const kw = document.createElement('p');
        kw.id = `kw-${i + 1}`;
        kw.className = 'card-back-kw';

        backDiv.appendChild(img);
        backDiv.appendChild(title);
        backDiv.appendChild(metaDiv);
        backDiv.appendChild(kw);

        innerDiv.appendChild(frontDiv);
        innerDiv.appendChild(backDiv);
        cardDiv.appendChild(innerDiv);
        slotDiv.appendChild(cardDiv);
        slotsContainer.appendChild(slotDiv);

        // Nom sous trait horizontal (Grand Tableau & Carré de 9) + clic sur carte (Grand Tableau)
        if (currentSpread === 'grand-tableau' || currentSpread === 'carre-de-neuf') {
          // Trait horizontal + nom sous la carte
          const sep = document.createElement('hr');
          sep.className = 'card-name-sep';
          slotDiv.appendChild(sep);

          const nameBelow = document.createElement('div');
          nameBelow.className = 'card-name-below';
          nameBelow.id = `card-name-${i + 1}`;
          slotDiv.appendChild(nameBelow);
        }
        if (currentSpread === 'grand-tableau') {
          cardDiv.addEventListener('click', () => {
            if (!cardDiv.classList.contains('flipped')) {
              cardDiv.classList.add('flipped');
              checkAllFlippedGT();
            }
          });
        }
      }
    }

    // Vérifier si toutes les cartes du Grand Tableau sont retournées pour afficher l'interprétation
    function checkAllFlippedGT() {
      const totalFlipped = slotsContainer.querySelectorAll('.lenormand-card.flipped').length;
      if (totalFlipped === 36) {
        btnRevealAll.style.display = 'none';
        deckInstruction.innerText = "Grand Tableau complété ! Analyse des maisons en cours...";
        setTimeout(showReadings, 1000);
      }
    }

    // Révéler Tout (Grand Tableau et Carré de 9)
    btnRevealAll.addEventListener('click', () => {
      btnRevealAll.style.display = 'none';
      const cards = slotsContainer.querySelectorAll('.lenormand-card');
      const nbCards = cards.length;
      cards.forEach((c, idx) => {
        setTimeout(() => {
          c.classList.add('flipped');
        }, idx * 100);
      });
      setTimeout(() => {
        deckInstruction.innerText = nbCards === 36 ? "Grand Tableau révélé." : "Cartes révélées !";
        showReadings();
      }, nbCards * 100 + 800);
    });

    // Afficher les interprétations
    function showReadings() {
      if (!window.tarotLenormandInterp) return;

      const interpretationHTML = window.tarotLenormandInterp.generateReading(currentSpread, drawnCards);

      readingSection.innerHTML = interpretationHTML;
      readingSection.style.display = 'block';

      // Petit scroll fluide vers la lecture
      setTimeout(() => {
        readingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        initPlaneTabs();
      }, 500);
    }

    function initPlaneTabs() {
      const tabs = readingSection.querySelectorAll('.tr-plane-tab');
      const panes = readingSection.querySelectorAll('.tr-plane-pane');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const plane = tab.dataset.plane;
          tabs.forEach(t => t.classList.toggle('active', t === tab));
          panes.forEach(p => p.classList.toggle('active', p.dataset.plane === plane));
        });
      });
    }

    resetTable();
  }

  // Init au chargement de la page
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLenormandSpread);
  } else {
    initLenormandSpread();
  }
  document.addEventListener('astro:page-load', initLenormandSpread);
})();
