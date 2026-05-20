const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!['node_modules', '.nuxt', '.output', 'dist', '.git', 'i18n'].includes(f)) {
        files = files.concat(walk(p));
      }
    } else if (/\.(vue|ts)$/.test(f)) {
      files.push(p);
    }
  });
  return files;
}

// Skip generated data files
const skipPatterns = ['nav-data.', '.generated.', 'types/nav'];

const files = walk('.');
const results = [];
files.forEach(f => {
  if (skipPatterns.some(p => f.includes(p))) return;
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    const trimmed = l.trim();
    // Skip comments and console.log
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('<!--') || trimmed.includes('console.log')) return;
    // Skip $t() calls (already i18n'd)
    if (/\$t\(/.test(l)) return;
    // Must contain Chinese
    if (/[\u4e00-\u9fff]/.test(l)) {
      results.push(f + ':L' + (i + 1) + ': ' + trimmed);
    }
  });
});
console.log(results.join('\n'));
