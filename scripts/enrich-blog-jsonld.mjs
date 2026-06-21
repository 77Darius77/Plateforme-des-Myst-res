import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '..', 'src', 'pages', 'blog');
const siteUrl = 'https://mysteres.fr';

function enrichFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.astro');

  // Ignorer index.astro (liste des articles, pas un Article schema)
  if (fileName === 'index') return;

  const articleUrl = `${siteUrl}/blog/${fileName}/`;
  let changed = false;

  // Vérifier si on a déjà les 4 champs requis
  const hasUrl = content.includes('"url"');
  const hasImage = content.includes('"image"');
  const hasDateModified = content.includes('"dateModified"');
  const hasPublisher = content.includes('"publisher"');

  if (!hasUrl || !hasImage || !hasDateModified || !hasPublisher) {
    content = content.replace(
      /"datePublished": "([^"]+)"/,
      (match, date) => {
        changed = true;
        return `"url": "${articleUrl}",\n  "image": "${siteUrl}/images/og-default.svg",\n  "dateModified": "${date}",\n  "publisher": {\n    "@type": "Organization",\n    "name": "Plateforme des Mystères",\n    "url": "${siteUrl}"\n  },\n  "datePublished": "${date}"`;
      }
    );
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Enriched: ${path.basename(filePath)}`);
  }
}

for (const entry of fs.readdirSync(blogDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.astro')) {
    enrichFile(path.join(blogDir, entry.name));
  }
}
console.log('Done enriching blog JSON-LD.');
