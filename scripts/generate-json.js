// 数据生成脚本
// 运行: node scripts/generate-json.js
// 将 TypeScript 数据转换为 JSON 文件

const fs = require('fs');
const path = require('path');

// 读取 nav-data.ts 内容
const tsFile = path.join(__dirname, '../data/nav-data.ts');
const content = fs.readFileSync(tsFile, 'utf8');

// 提取 navData 数组（简化版 - 提取前20个作为示例）
const navDataMatch = content.match(/export const navData[\s\S]*?\n\]/);
const categoriesMatch = content.match(/export const categories[\s\S]*?\n\]/);

if (!navDataMatch || !categoriesMatch) {
  console.error('无法提取数据');
  process.exit(1);
}

// 使用 ts-node 或创建临时脚本来执行
const tempScript = `
const fs = require('fs');

// 模拟导入
const navData = (() => {
${navDataMatch[0].replace('export const navData: NavItem[] =', 'return')}
})();

const categories = (() => {
${categoriesMatch[0].replace('export const categories: Category[] =', 'return')}
})();

const result = {
  meta: {
    name: 'MyNuxtNav 导航数据',
    version: '1.0.0',
    lastUpdated: new Date().toISOString().split('T')[0],
    totalSites: navData.length,
    totalCategories: categories.length
  },
  categories,
  sites: navData
};

fs.writeFileSync('data/nav-data.json', JSON.stringify(result, null, 2));
fs.writeFileSync('data/sites.json', JSON.stringify(navData, null, 2));
fs.writeFileSync('data/categories.json', JSON.stringify(categories, null, 2));

console.log('✓ 数据已导出');
console.log('  - data/nav-data.json');
console.log('  - data/sites.json');
console.log('  - data/categories.json');
`;

fs.writeFileSync('scripts/temp-convert.js', tempScript);

console.log('请运行以下命令完成转换:');
console.log('  npx ts-node scripts/temp-convert.js');
console.log('');
console.log('或者手动复制 nav-data.ts 中的数据到 JSON 文件');
