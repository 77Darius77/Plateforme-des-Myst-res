/* ═══════════════════════════════════════════
   PARTAGE DE RÉSULTAT — Export PDF de la page
   Étape 15 du PRD : capture du bloc de résultat affiché
   (html2canvas) et export en PDF (jsPDF), téléchargeable
   ou partageable nativement sur mobile.
   ═══════════════════════════════════════════ */

(function () {

  const VENDOR_JSPDF = '/assets/js/vendor/jspdf.umd.min.js';
  const VENDOR_HTML2CANVAS = '/assets/js/vendor/html2canvas.min.js';

  function construireBoutonsHTML(config) {
    const json = JSON.stringify(config).replace(/"/g, '&quot;');
    return '<div class="share-image-wrap">'
      + '<button type="button" class="share-btn share-image-btn" data-share-config="' + json + '">📥 Télécharger le PDF</button>'
      + '<button type="button" class="share-btn share-image-native-btn" data-share-config="' + json + '">🔗 Partager</button>'
      + '</div>';
  }

  function afficherBoutons(containerEl, config) {
    if (!containerEl) return;
    containerEl.insertAdjacentHTML('beforeend', construireBoutonsHTML(config));
  }

  function chargerScript(src) {
    return new Promise(function (resolve, reject) {
      const existant = document.querySelector('script[src="' + src + '"]');
      if (existant) { resolve(); return; }
      const script = document.createElement('script');
      script.src = src;
      script.onload = function () { resolve(); };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function chargerLibrairiesPDF() {
    if (!window.html2canvas) await chargerScript(VENDOR_HTML2CANVAS);
    if (!window.jspdf) await chargerScript(VENDOR_JSPDF);
  }

  async function genererPDF(config) {
    await chargerLibrairiesPDF();

    const cibleEl = document.querySelector(config.cible);
    if (!cibleEl) throw new Error('Élément cible introuvable : ' + config.cible);

    const echelle = 1;
    const themeClair = document.documentElement.getAttribute('data-theme') === 'light';
    const canvas = await window.html2canvas(cibleEl, {
      backgroundColor: themeClair ? '#f6f8fb' : '#080a10',
      useCORS: true,
      scale: echelle,
      ignoreElements: function (el) {
        return !!(el.closest && el.closest('.share-image-wrap'));
      }
    });

    const { jsPDF } = window.jspdf;
    const largeurPt = canvas.width / echelle;
    const hauteurPt = canvas.height / echelle;
    const pdf = new jsPDF({
      orientation: hauteurPt >= largeurPt ? 'portrait' : 'landscape',
      unit: 'pt',
      format: [largeurPt, hauteurPt]
    });
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.85), 'JPEG', 0, 0, largeurPt, hauteurPt);

    return pdf.output('blob');
  }

  function declencherTelechargement(blob, titre) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (titre || 'plateforme-des-mysteres-resultat') + '.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
  }

  async function partagerNatif(blob, config) {
    const nomFichier = (config.titre || 'plateforme-des-mysteres-resultat') + '.pdf';
    const fichier = new File([blob], nomFichier, { type: 'application/pdf' });
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
      const test = new File([''], 'test.pdf', { type: 'application/pdf' });
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
      const blob = await genererPDF(config);
      if (btn.classList.contains('share-image-native-btn')) {
        await partagerNatif(blob, config);
      } else {
        declencherTelechargement(blob, config.titre);
      }
    } catch (err) {
      console.warn('Partage PDF : échec de génération', err);
    } finally {
      btn.disabled = false;
      btn.textContent = texteOriginal;
    }
  });

  window.PlateformePartage = {
    genererPDF: genererPDF,
    afficherBoutons: afficherBoutons,
    construireBoutonsHTML: construireBoutonsHTML
  };

})();
