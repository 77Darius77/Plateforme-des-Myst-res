/* ========================================
   Plateforme des Mystères — Main Scripts
   ======================================== */

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}
window.toggleTheme = toggleTheme;

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
}
window.updateThemeIcon = updateThemeIcon;

document.addEventListener('DOMContentLoaded', function () {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeIcon(currentTheme);

  // ---- Theme toggle button (remplace onclick="toggleTheme()" inline, CSP) ----
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // ---- Prévention de soumission des formulaires sans JS de reload ----
  // Remplace onsubmit="return false;" inline (CSP script-src sans unsafe-inline).
  document.querySelectorAll('form[data-prevent-submit]').forEach(function (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); });
  });

  // ---- Skip-link focus management ----
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      const main = document.querySelector('main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus();
        main.addEventListener('blur', function () {
          main.removeAttribute('tabindex');
        }, { once: true });
      }
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Scroll Reveal (IntersectionObserver) ----
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ---- Scroll Top Button ----
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    // Remplace onclick="window.scrollTo(...)" inline (CSP script-src).
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.pointerEvents = 'auto';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.pointerEvents = 'none';
      }
    }, { passive: true });
  }

  // ---- Reading Progress Bar ----
  const progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      const winH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = winH > 0 ? (window.scrollY / winH) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  // ---- Tirage du jour : affichage de la date courante (accueil) ----
  const tirageJourDate = document.getElementById('tirageJourDate');
  if (tirageJourDate) {
    tirageJourDate.textContent = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  }

  // ---- Share Button ----
  const shareBtn = document.querySelector('.share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          shareBtn.textContent = '✓ Lien copié !';
          setTimeout(function () {
            shareBtn.innerHTML = '🔗 Partager cet article';
          }, 2000);
        });
      }
    });
  }
});
