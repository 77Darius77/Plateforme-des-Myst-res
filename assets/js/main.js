/* ═══════════════════════════════════════════
   NUMÉROLOGIE CABALISTIQUE — Main (UI)
   ═══════════════════════════════════════════ */

/* ─── Générer les 22 cartes d'archétypes ─── */
(function buildArchetypes() {
  const grid = document.getElementById('archetypesGrid');
  for (let i = 1; i <= 22; i++) {
    const a = ARCHETYPES[i];
    const card = document.createElement('div');
    card.className = `archetype-card c-${i}`;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <div class="num-circle">${i}</div>
          <div class="force">✦ ${a.force}</div>
          <div class="faiblesse">◆ Ombre : ${a.faiblesse}</div>
          <div class="flip-hint">[ clic pour l'interprétation ]</div>
        </div>
      </div>
    `;
    card.addEventListener('click', function() {
      if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
        setTimeout(() => {
          card.querySelector('.card-inner').innerHTML = `
            <div class="card-front">
              <div class="num-circle">${i}</div>
              <div class="force">✦ ${a.force}</div>
              <div class="faiblesse">◆ Ombre : ${a.faiblesse}</div>
              <div class="flip-hint">[ clic pour l'interprétation ]</div>
            </div>
          `;
        }, 300);
      } else {
        card.querySelector('.card-inner').innerHTML = `
          <div class="card-front">
            <div class="num-circle">${i}</div>
            <div class="force">✦ ${a.force}</div>
            <div class="faiblesse">◆ Ombre : ${a.faiblesse}</div>
            <div class="flip-hint">[ clic pour l'interprétation ]</div>
          </div>
        `;
        card.classList.add('flipped');
        setTimeout(() => {
          card.querySelector('.card-inner').innerHTML = `
            <div class="card-back">
              <p style="color:#e2e8f0;font-size:0.9rem;line-height:1.6;">${a.interpretation}</p>
            </div>
          `;
        }, 300);
      }
    });
    grid.appendChild(card);
  }
})();

/* ─── Toast ─── */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ─── Animation au scroll (IntersectionObserver) ─── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(s => {
  s.style.opacity = '0';
  s.style.transform = 'translateY(30px)';
  s.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(s);
});

// Révéler le hero immédiatement
document.getElementById('hero').style.opacity = '1';
document.getElementById('hero').style.transform = 'translateY(0)';
