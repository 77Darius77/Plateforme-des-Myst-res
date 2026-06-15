import fs from 'fs';
import path from 'path';

const renMap = {
  'dist/blog.html': 'dist/blog/index.html',
  'dist/astrologie.html': 'dist/astrologie/index.html',
  'dist/numerologie.html': 'dist/numerologie/index.html',
  'dist/oracles.html': 'dist/oracles/index.html',
  'dist/tarologie.html': 'dist/tarologie/index.html',
};

for (const [src, dest] of Object.entries(renMap)) {
  if (fs.existsSync(src)) {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.renameSync(src, dest);
    console.log(`Renamed ${src} to ${dest}`);
  }
}

// ═══════════ GENERATE SITEMAP.XML ═══════════
const siteUrl = 'https://mysteres.fr';
const distDir = path.resolve('dist');

function getHtmlFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getHtmlFiles(filePath, files);
    } else if (file.endsWith('.html')) {
      files.push(filePath);
    }
  }
  return files;
}

if (fs.existsSync(distDir)) {
  const htmlFiles = getHtmlFiles(distDir);
  const urls = htmlFiles.map(file => {
    let relPath = path.relative(distDir, file).replace(/\\/g, '/');
    
    // Format index.html to trailing slash
    if (relPath === 'index.html') {
      relPath = '';
    } else if (relPath.endsWith('/index.html')) {
      relPath = relPath.slice(0, -10); // keep trailing slash
    }
    
    return `${siteUrl}/${relPath}`;
  });

  const today = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${url === siteUrl + '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`Generated sitemap.xml containing ${urls.length} URLs.`);
}

