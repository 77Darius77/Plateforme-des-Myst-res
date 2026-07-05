/* ═══════════════════════════════════════════
   PARTAGE DE RÉSULTAT — Génération d'image PNG
   Étape 15 du PRD : carte visuelle téléchargeable/
   partageable pour les résultats de calcul et de tirage.
   ═══════════════════════════════════════════ */

(function () {

  const LARGEUR = 1080;
  const HAUTEUR = 1080;
  const OR = '#dfb26c';
  const TEXTE = '#f1f5f9';
  const TEXTE_ATTENUE = '#94a3b8';

  function construireBoutonsHTML(config) {
    const json = JSON.stringify(config).replace(/"/g, '&quot;');
    return '<div class="share-image-wrap">'
      + '<button type="button" class="share-btn share-image-btn" data-share-config="' + json + '">📥 Télécharger l\'image</button>'
      + '<button type="button" class="share-btn share-image-native-btn" data-share-config="' + json + '">🔗 Partager</button>'
      + '</div>';
  }

  function afficherBoutons(containerEl, config) {
    if (!containerEl) return;
    containerEl.insertAdjacentHTML('beforeend', construireBoutonsHTML(config));
  }

  function chargerImage(src) {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = reject;
      img.src = src;
    });
  }

  async function chargerPolices() {
    try {
      await Promise.all([
        document.fonts.load('700 80px "JetBrains Mono"'),
        document.fonts.load('700 40px "JetBrains Mono"'),
        document.fonts.load('600 36px "Inter"'),
        document.fonts.load('400 28px "Inter"')
      ]);
      await document.fonts.ready;
    } catch (e) {
      /* Police indisponible : le rendu retombe sur la police système, pas bloquant. */
    }
  }

  function dessinerFond(ctx) {
    const degrade = ctx.createLinearGradient(0, 0, LARGEUR, HAUTEUR);
    degrade.addColorStop(0, 'rgba(18,25,42,1)');
    degrade.addColorStop(1, 'rgba(10,13,23,1)');
    ctx.fillStyle = degrade;
    ctx.fillRect(0, 0, LARGEUR, HAUTEUR);
  }

  function dessinerBandeauMarque(ctx) {
    ctx.textAlign = 'center';
    ctx.fillStyle = OR;
    ctx.font = '700 40px "JetBrains Mono", monospace';
    ctx.fillText('◈ PLATEFORME DES MYSTÈRES', LARGEUR / 2, 110);
  }

  function dessinerPiedDePage(ctx) {
    ctx.textAlign = 'center';
    ctx.fillStyle = TEXTE_ATTENUE;
    ctx.font = '400 28px "Inter", sans-serif';
    ctx.fillText('plateforme-des-mysteres.com', LARGEUR / 2, HAUTEUR - 60);
  }

  function dessinerTitres(ctx, config) {
    ctx.textAlign = 'center';
    ctx.fillStyle = TEXTE;
    ctx.font = '600 36px "Inter", sans-serif';
    ctx.fillText(config.titre || '', LARGEUR / 2, 210);
    if (config.sousTitre) {
      ctx.fillStyle = TEXTE_ATTENUE;
      ctx.font = '400 28px "Inter", sans-serif';
      ctx.fillText(config.sousTitre, LARGEUR / 2, 250);
    }
  }

  function dessinerValeurs(ctx, valeurs) {
    const n = valeurs.length;
    const largeurBloc = LARGEUR / n;
    const centreY = 560;
    valeurs.forEach(function (v, i) {
      const cx = largeurBloc * i + largeurBloc / 2;
      ctx.textAlign = 'center';
      ctx.fillStyle = OR;
      ctx.font = '700 130px "JetBrains Mono", monospace';
      ctx.fillText(String(v.valeur), cx, centreY);
      ctx.fillStyle = TEXTE_ATTENUE;
      ctx.font = '400 26px "Inter", sans-serif';
      ctx.fillText((v.label || '').toUpperCase(), cx, centreY + 60);
    });
  }

  async function dessinerCartes(ctx, cartes) {
    const n = cartes.length;
    const largeurCarte = n <= 3 ? 280 : 200;
    const hauteurCarte = n <= 3 ? 480 : 340;
    const espace = 30;
    const largeurTotale = n * largeurCarte + (n - 1) * espace;
    let x = (LARGEUR - largeurTotale) / 2;
    const y = 300;

    const images = await Promise.all(cartes.map(function (c) {
      if (c.svg) {
        let svg = c.svg.replace(/currentColor/g, OR);
        if (!/xmlns=/.test(svg)) {
          svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
        }
        const src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
        return chargerImage(src).catch(function () { return null; });
      }
      return c.image ? chargerImage(c.image).catch(function () { return null; }) : Promise.resolve(null);
    }));

    cartes.forEach(function (c, i) {
      const cx = x + largeurCarte / 2;
      const img = images[i];
      if (img) {
        ctx.drawImage(img, x, y, largeurCarte, hauteurCarte);
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(x, y, largeurCarte, hauteurCarte);
      }
      ctx.textAlign = 'center';
      ctx.fillStyle = TEXTE;
      ctx.font = '600 26px "Inter", sans-serif';
      ctx.fillText(c.nom || '', cx, y + hauteurCarte + 40, largeurCarte + 20);
      x += largeurCarte + espace;
    });
  }

  async function genererImage(config) {
    const canvas = document.createElement('canvas');
    canvas.width = LARGEUR;
    canvas.height = HAUTEUR;
    const ctx = canvas.getContext('2d');

    await chargerPolices();
    dessinerFond(ctx);
    dessinerBandeauMarque(ctx);
    dessinerTitres(ctx, config);

    if (config.type === 'tirage' && Array.isArray(config.cartes)) {
      await dessinerCartes(ctx, config.cartes);
    } else if (Array.isArray(config.valeurs)) {
      dessinerValeurs(ctx, config.valeurs);
    }

    dessinerPiedDePage(ctx);

    return new Promise(function (resolve) {
      canvas.toBlob(function (blob) { resolve(blob); }, 'image/png');
    });
  }

  function declencherTelechargement(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plateforme-des-mysteres-resultat.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
  }

  async function partagerNatif(blob, config) {
    const fichier = new File([blob], 'plateforme-des-mysteres-resultat.png', { type: 'image/png' });
    try {
      await navigator.share({
        files: [fichier],
        title: config.titre || 'Plateforme des Mystères',
        text: 'Découvre mon résultat sur Plateforme des Mystères ✦'
      });
    } catch (e) {
      /* Annulation utilisateur ou échec silencieux — pas d'action de repli nécessaire. */
    }
  }

  function supportePartageFichier() {
    if (!navigator.canShare || !navigator.share) return false;
    try {
      const test = new File([''], 'test.png', { type: 'image/png' });
      return navigator.canShare({ files: [test] });
    } catch (e) {
      return false;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (supportePartageFichier()) {
      document.body.classList.add('has-native-share');
    }
  });

  document.addEventListener('click', async function (e) {
    const btn = e.target.closest('.share-image-btn, .share-image-native-btn');
    if (!btn) return;
    let config;
    try {
      config = JSON.parse(btn.dataset.shareConfig);
    } catch (err) {
      return;
    }

    const texteOriginal = btn.textContent;
    btn.disabled = true;
    btn.textContent = '✦ Génération...';

    try {
      const blob = await genererImage(config);
      if (btn.classList.contains('share-image-native-btn')) {
        await partagerNatif(blob, config);
      } else {
        declencherTelechargement(blob);
      }
    } finally {
      btn.disabled = false;
      btn.textContent = texteOriginal;
    }
  });

  window.PlateformePartage = {
    genererImage: genererImage,
    afficherBoutons: afficherBoutons,
    construireBoutonsHTML: construireBoutonsHTML
  };

})();
