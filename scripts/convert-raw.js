const fs = require('fs');
const path = require('path');

// 读取原始数据
const navDataRaw = fs.readFileSync(path.join(__dirname, 'navdata_raw.txt'), 'utf8');
const catRaw = fs.readFileSync(path.join(__dirname, 'categories_raw.txt'), 'utf8');

// 改进的转换 - 保护字符串内的内容
function processContent(content) {
  // 先保护字符串（包括 URL）
  const strings = [];
  let processed = content.replace(/'([^'\\]*)'/g, (match, p1) => {
    strings.push(p1);
    return `__STRING_${strings.length - 1}__`;
  });

  // 现在安全地移除注释
  processed = processed
    .replace(/\/\/.*$/gm, '')  // 行注释
    .replace(/\/\*[\s\S]*?\*\//g, '');  // 块注释

  // 恢复字符串为双引号
  processed = processed.replace(/__STRING_(\d+)__/g, (match, idx) => {
    return `"${strings[idx]}"`;
  });

  // 移除类型注解
  processed = processed.replace(/:\s*\w+(\[\])?\s*([,}])/g, '$2');

  // 处理属性名
  processed = processed.replace(/([{,]\s*)(\w+):\s*/g, '$1"$2": ');

  // 移除尾随逗号
  processed = processed.replace(/,\s*([}\]])/g, '$1');

  return processed;
}

try {
  console.log('处理 navData...');
  const navDataProcessed = processContent(navDataRaw);
  fs.writeFileSync(path.join(__dirname, 'navdata_processed.txt'), navDataProcessed);

  // 包装并执行
  const navDataJs = 'return [' + navDataProcessed + ']';
  const navData = new Function(navDataJs)();
  console.log('  ✓ navData 条目数:', navData.length);

  console.log('处理 categories...');
  const catProcessed = processContent(catRaw);
  fs.writeFileSync(path.join(__dirname, 'categories_processed.txt'), catProcessed);

  const catJs = 'return [' + catProcessed + ']';
  const categories = new Function(catJs)();
  console.log('  ✓ categories 条目数:', categories.length);

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

  // 写入最终文件
  const outputFile = path.join(__dirname, '..', 'data', 'nav-data.json');
  fs.writeFileSync(outputFile, JSON.stringify(fullData, null, 2), 'utf8');

  console.log('\n✓ 导出完成!');
  console.log('  输出文件:', outputFile);
  console.log('  文件大小:', (fs.statSync(outputFile).size / 1024).toFixed(1), 'KB');

} catch (e) {
  console.error('错误:', e.message);
  console.log('\n请检查 processed 文件');
}
