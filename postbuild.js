// postbuild.js — Minification des JS statiques vers dist/

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { basename } from 'node:path';
import { minify } from 'terser';

const JS_DIRS = ['dist/assets/js', 'dist/js'];

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

for (const dir of JS_DIRS) {
  let files = [];
  try {
    files = execSync(`find "${dir}" -name "*.js" -type f 2>/dev/null || true`, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(f => f);
  } catch { continue; }

  for (const file of files) {
    const name = basename(file);
    if (name.endsWith('.min.js')) continue;

    const code = readFileSync(file, 'utf8');
    const sizeBefore = Buffer.byteLength(code, 'utf8');

    try {
      const result = await minify(code, {
        compress: { drop_console: false, passes: 2 },
        mangle: true,
        format: { comments: false },
      });

      if (result.code) {
        writeFileSync(file, result.code, 'utf8');
        const sizeAfter = Buffer.byteLength(result.code, 'utf8');
        totalBefore += sizeBefore;
        totalAfter += sizeAfter;
        count++;
        console.log(`  ✓ ${name.padEnd(28)} ${(sizeBefore/1024).toFixed(1)} KB → ${(sizeAfter/1024).toFixed(1)} KB (${((1-sizeAfter/sizeBefore)*100).toFixed(0)}%)`);
      }
    } catch (err) {
      console.warn(`  ⚠ ${name} : conservé (${err.message})`);
    }
  }
}

if (count > 0) {
  console.log(`\n  ✅ ${count} fichiers minifiés · ${(totalBefore/1024).toFixed(0)} KB → ${(totalAfter/1024).toFixed(0)} KB (${((1-totalAfter/totalBefore)*100).toFixed(0)}%)`);
} else {
  console.log('  ℹ Aucun fichier JS à minifier');
}
