const fs = require('fs');
const path = require('path');

// 读取 TS 文件
const tsFile = path.join(__dirname, '..', 'data', 'nav-data.ts');
const content = fs.readFileSync(tsFile, 'utf8');

// 提取 navData 数组内容
const navDataStart = content.indexOf('export const navData: NavItem[] = [');
const navDataEnd = content.indexOf('// 分类定义');

if (navDataStart === -1 || navDataEnd === -1) {
  console.error('无法定位 navData');
  process.exit(1);
}

let navDataStr = content.substring(navDataStart, navDataEnd);

// 提取 categories 数组内容
const catStart = content.indexOf('export const categories: Category[] = [');
const catEnd = content.indexOf('/** 为每个分类计算网站数量 */');

if (catStart === -1 || catEnd === -1) {
  console.error('无法定位 categories');
  process.exit(1);
}

let catStr = content.substring(catStart, catEnd);

// 转换为可执行的 JS
function convertToJs(tsStr, varName) {
  // 移除 export const xxx: Type = 
  let js = tsStr.replace(new RegExp(`export const ${varName}[\\s\\S]*?= `), '');

  // 移除类型注解 (简单处理)
  js = js.replace(/:\s*\w+(\[\])?\s*([,}])/g, '$2');

  // 移除注释
  js = js.replace(/\/\/.*$/gm, '');
  js = js.replace(/\/\*[\s\S]*?\*\//g, '');

  return js;
}

const navDataJs = convertToJs(navDataStr, 'navData');
const catJs = convertToJs(catStr, 'categories');

// 安全执行获取数据
try {
  const navData = eval(navDataJs);
  const categories = eval(catJs);

  console.log(`导出 ${navData.length} 个网站`);
  console.log(`导出 ${categories.length} 个分类`);

  // 构建完整数据
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

  // 写入文件
  const outputFile = path.join(__dirname, '..', 'data', 'nav-data.json');
  fs.writeFileSync(outputFile, JSON.stringify(fullData, null, 2), 'utf8');

  console.log('\n✓ 导出成功!');
  console.log(`  文件: ${outputFile}`);
  console.log(`  大小: ${(fs.statSync(outputFile).size / 1024).toFixed(1)} KB`);

} catch (e) {
  console.error('导出失败:', e.message);
  process.exit(1);
}
