#!/usr/bin/env node
// Étape 10 (audit critique) — vérification programmatique du contraste WCAG.
// Calcule le ratio de contraste (luminance relative, formule WCAG 2.x) entre
// les couleurs de texte modifiées et les fonds réels du design system, avant/après.
// Usage : node scripts/contrast-check.mjs

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const int = parseInt(full, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function channelToLinear(c) {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function relativeLuminance({ r, g, b }) {
  const R = channelToLinear(r);
  const G = channelToLinear(g);
  const B = channelToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hex1, hex2) {
  const L1 = relativeLuminance(hexToRgb(hex1));
  const L2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function fmt(ratio) {
  return ratio.toFixed(2) + ':1';
}

const THRESHOLD = 4.5;

const cases = [
  {
    label: 'Gold texte — mode clair — sur --bg-deep clair (#f6f8fb)',
    before: { fg: '#b4853b', bg: '#f6f8fb' },
    after: { fg: '#8b6020', bg: '#f6f8fb' },
  },
  {
    label: 'Gold texte — mode clair — sur --bg-card clair (#ffffff)',
    before: { fg: '#b4853b', bg: '#ffffff' },
    after: { fg: '#8b6020', bg: '#ffffff' },
  },
  {
    label: 'text-muted — mode sombre — sur --bg-deep sombre (#080a10)',
    before: { fg: '#64748b', bg: '#080a10' },
    after: { fg: '#7484a0', bg: '#080a10' },
  },
  {
    label: 'text-muted — mode sombre — sur --bg-card sombre (#0f131e)',
    before: { fg: '#64748b', bg: '#0f131e' },
    after: { fg: '#7484a0', bg: '#0f131e' },
  },
];

let allPass = true;

for (const c of cases) {
  const beforeRatio = contrastRatio(c.before.fg, c.before.bg);
  const afterRatio = contrastRatio(c.after.fg, c.after.bg);
  const pass = afterRatio >= THRESHOLD;
  if (!pass) allPass = false;
  console.log(`\n${c.label}`);
  console.log(`  avant : ${c.before.fg} sur ${c.before.bg} → ${fmt(beforeRatio)}`);
  console.log(`  après : ${c.after.fg} sur ${c.after.bg} → ${fmt(afterRatio)}  ${pass ? 'PASS (≥4.5:1)' : 'FAIL (<4.5:1)'}`);
}

console.log('\n' + (allPass ? 'Tous les cas passent le seuil WCAG AA (4.5:1).' : 'ÉCHEC : au moins un cas est sous 4.5:1.'));
process.exit(allPass ? 0 : 1);
