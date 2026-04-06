// 完整数据导出脚本
// 读取 nav-data.ts 并生成完整的 JSON 文件

const fs = require('fs');
const path = require('path');

// 读取原始 TS 文件
const tsContent = fs.readFileSync(path.join(__dirname, '../data/nav-data.ts'), 'utf8');

// 提取 navData 数组（从 export const navData 开始到 // 分类定义 之前）
const navDataMatch = tsContent.match(/export const navData[\s\S]*?(?=\/\/ 分类定义)/);
if (!navDataMatch) {
  console.error('无法找到 navData');
  process.exit(1);
}

// 提取 categories 数组
const categoriesMatch = tsContent.match(/export const categories[\s\S]*?(?=\/\*\* 为每个分类)/);
if (!categoriesMatch) {
  console.error('无法找到 categories');
  process.exit(1);
}

// 转换为可执行的 JS 代码
function tsToJs(tsCode) {
  return tsCode
    .replace(/export const \w+: \w+\[\] = /, 'return ')
    .replace(/:\s*\w+(\[\])?\s*([,}])/g, '$2')  // 移除类型注解
    .replace(/\/\/.*$/gm, '')  // 移除行注释
    .replace(/\/\*[\s\S]*?\*\//g, '');  // 移除块注释
}

const navDataJs = tsToJs(navDataMatch[0]);
const categoriesJs = tsToJs(categoriesMatch[0]);

// 安全地执行代码获取数据
try {
  const navData = new Function(navDataJs)();
  const categories = new Function(categoriesJs)();

  // 构建完整数据结构
  const fullData = {
    meta: {
      name: 'MyNuxtNav 导航数据',
      version: '1.0.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      description: '基于 Nuxt 3 的导航站数据',
      totalSites: navData.length,
      totalCategories: categories.length
    },
    categories: categories,
    sites: navData
  };

  // 写入 JSON 文件
  fs.writeFileSync(
    path.join(__dirname, '../data/nav-data.json'),
    JSON.stringify(fullData, null, 2),
    'utf8'
  );

  console.log('✓ 数据导出成功');
  console.log(`  - 网站数量: ${navData.length}`);
  console.log(`  - 分类数量: ${categories.length}`);
  console.log(`  - 输出文件: data/nav-data.json`);

} catch (e) {
  console.error('导出失败:', e.message);
  process.exit(1);
}
