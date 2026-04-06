const fs = require('fs');

// 读取提取的数据
const sites = JSON.parse(fs.readFileSync('D:/project1/nuxt/one-nav-ssg/scripts/extracted.json', 'utf8'));
console.log('网站数量:', sites.length);

// 读取原始 TS 文件提取 categories
const tsContent = fs.readFileSync('D:/project1/nuxt/one-nav-ssg/data/nav-data.ts', 'utf8');

// 提取 categories
const catMatch = tsContent.match(/export const categories: Category\[\] = \[([\s\S]*?)\n\]\s*\/\*\* 为每个分类计算/);
if (!catMatch) {
  console.error('找不到 categories');
  process.exit(1);
}

const catContent = catMatch[1];

// 解析 categories（简化版）
const categories = [];
const catPattern = /\{\s*id:\s*'([^']+)'[\s\S]*?\},?\s*(?=\{|\/\/|\*)/g;
let catMatch2;

while ((catMatch2 = catPattern.exec(catContent)) !== null) {
  const objText = catMatch2[0];
  const id = objText.match(/id:\s*'([^']+)'/)?.[1];
  const name = objText.match(/name:\s*'([^']+)'/)?.[1];
  const icon = objText.match(/icon:\s*'([^']+)'/)?.[1];
  const defaultOpened = objText.includes('defaultOpened: true');
  
  // 检查是否有 children
  const childrenMatch = objText.match(/children:\s*\[([\s\S]*?)\]/);
  let children = [];
  if (childrenMatch) {
    const childPattern = /\{\s*id:\s*'([^']+)'[\s\S]*?\}/g;
    let childMatch;
    while ((childMatch = childPattern.exec(childrenMatch[1])) !== null) {
      const childText = childMatch[0];
      const childId = childText.match(/id:\s*'([^']+)'/)?.[1];
      const childName = childText.match(/name:\s*'([^']+)'/)?.[1];
      const childIcon = childText.match(/icon:\s*'([^']+)'/)?.[1];
      if (childId) {
        children.push({ id: childId, name: childName || '', icon: childIcon || '' });
      }
    }
  }
  
  if (id) {
    const cat = { id, name: name || '', icon: icon || '' };
    if (defaultOpened) cat.defaultOpened = true;
    if (children.length > 0) cat.children = children;
    categories.push(cat);
  }
}

console.log('分类数量:', categories.length);

// 构建完整数据
const fullData = {
  meta: {
    name: 'MyNuxtNav 导航数据',
    version: '1.0.0',
    lastUpdated: new Date().toISOString().split('T')[0],
    description: '基于 Nuxt 3 的导航站数据',
    totalSites: sites.length,
    totalCategories: categories.length
  },
  categories: categories,
  sites: sites
};

// 写入最终文件
fs.writeFileSync('D:/project1/nuxt/one-nav-ssg/data/nav-data.json', JSON.stringify(fullData, null, 2), 'utf8');
console.log('\n✓ 导出完成!');
console.log('  网站数量:', sites.length);
console.log('  分类数量:', categories.length);
console.log('  输出文件: data/nav-data.json');
