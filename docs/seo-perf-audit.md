# Audit Performance SEO — 2026-06-21

## Google Fonts

- **Status:** Non-bloquant (preload + noscript fallback) ✓
- **font-display:swap:** Déjà dans l'URL Google Fonts (`&display=swap`) ✓
- **Preload:** `rel="preload"` présent, chargement asynchrone confirmé

Layout.astro (lignes 105-106):
```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;400;600&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;400;600&display=swap"></noscript>
```

## @font-face CSS Custom

- **Résultat grep:** Aucun @font-face trouvé dans `/public/assets/css/`
- **Action:** Aucune requise — les fonts sont intégralement gérées via Google Fonts avec `display=swap`

## Images Statiques

- **Images dans blog/ et numerologie/:** 0 trouvées
- **Images dynamiques oracles:** Peuplées via JavaScript (src="" initial)
- **Action:** Aucune requise — aucune images statiques à optimiser, les oracles utilisent du lazy loading natif

## Résumé de Conformité

✓ Google Fonts non-bloquant (preload + noscript + display=swap)
✓ Aucun @font-face sans font-display:swap
✓ Aucune image non-optimisée

**Status global:** CONFORME aux bonnes pratiques Web Vitals
