import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dirs = [
  path.join(root, 'src/pages/numerologie'),
  path.join(root, 'src/pages/tarologie'),
  path.join(root, 'src/pages/astrologie'),
  path.join(root, 'src/pages/oracles'),
];
const aPropos = path.join(root, 'src/pages/a-propos.astro');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  // Réécrire "url": "https://mysteres.fr/...html" → "url": "https://mysteres.fr/.../",
  const fixed = content.replace(
    /"url":\s*"(https:\/\/mysteres\.fr\/[^"]*?)\.html"/g,
    (match, base) => `"url": "${base}/"`
  );
  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed, 'utf-8');
    console.log(`Fixed: ${path.relative(root, filePath)}`);
  }
}

function walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(fullPath);
    else if (entry.name.endsWith('.astro')) fixFile(fullPath);
  }
}

for (const dir of dirs) {
  if (fs.existsSync(dir)) walkDir(dir);
}
fixFile(aPropos);
console.log('Done fixing JSON-LD urls.');
