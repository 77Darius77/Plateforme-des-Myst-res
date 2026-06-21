import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

function toCleanUrl(urlWithHtml) {
  if (urlWithHtml === '/index.html') return '/';
  if (urlWithHtml.endsWith('/index.html')) {
    return urlWithHtml.slice(0, -'index.html'.length);
  }
  if (urlWithHtml.endsWith('.html')) {
    return urlWithHtml.slice(0, -5) + '/';
  }
  return urlWithHtml;
}

function resolveHref(hrefRaw, fromFilePath) {
  if (hrefRaw.startsWith('/')) {
    return toCleanUrl(hrefRaw);
  }
  const fromDir = path.dirname(fromFilePath);
  const resolved = path.resolve(fromDir, hrefRaw);
  const relToPages = path.relative(pagesDir, resolved).replace(/\\/g, '/');
  return toCleanUrl('/' + relToPages);
}

function toCleanCanonicalPath(p) {
  if (p === '' || p === 'index.html') return '';
  if (p.endsWith('/index.html')) return p.slice(0, -'index.html'.length);
  if (p.endsWith('.html')) return p.slice(0, -5) + '/';
  return p;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // Réécrire href="*.html"
  const withHrefs = content.replace(/href="([^"]*\.html)"/g, (match, href) => {
    const newHref = resolveHref(href, filePath);
    if (newHref !== href) {
      changed = true;
      return `href="${newHref}"`;
    }
    return match;
  });

  // Réécrire canonicalPath="*.html"
  const withCanonical = withHrefs.replace(/canonicalPath="([^"]*\.html)"/g, (match, cPath) => {
    const newPath = toCleanCanonicalPath(cPath);
    if (newPath !== cPath) {
      changed = true;
      return `canonicalPath="${newPath}"`;
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(filePath, withCanonical, 'utf-8');
    console.log(`Updated: ${path.relative(path.join(__dirname, '..'), filePath)}`);
  }
}

function walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.astro')) {
      processFile(fullPath);
    }
  }
}

walkDir(pagesDir);
console.log('Done rewriting .html hrefs to clean URLs.');
