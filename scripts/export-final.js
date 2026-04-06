const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', 'data', 'nav-data.ts');
const outputFile = path.join(__dirname, '..', 'data', 'nav-data.json');

console.log('开始导出数据...');
console.log('输入文件:', inputFile);

// 读取文件
const content = fs.readFileSync(inputFile, 'utf8');
console.log('文件大小:', (content.length / 1024).toFixed(1), 'KB');

// 提取数组内容
function extractArray(content, startMarker, endMarker) {
  const start = content.indexOf(startMarker);
  if (start === -1) throw new Error('找不到: ' + startMarker);

  const end = content.indexOf(endMarker, start);
  if (end === -1) throw new Error('找不到: ' + endMarker);

  return content.substring(start + startMarker.length, end).trim();
}

try {
  // 提取 navData
  console.log('\n提取 navData...');
  const navDataRaw = extractArray(
    content,
    'export const navData: NavItem[] = [',
    '// 分类定义'
  );

  // 提取 categories
  console.log('提取 categories...');
  const catRaw = extractArray(
    content,
    'export const categories: Category[] = [',
    '/** 为每个分类计算网站数量 */'
  );

  // 保存原始内容
  fs.writeFileSync(path.join(__dirname, 'navdata_raw.txt'), navDataRaw);
  fs.writeFileSync(path.join(__dirname, 'categories_raw.txt'), catRaw);

  console.log('原始内容已保存');
  console.log('navData 长度:', navDataRaw.length);
  console.log('categories 长度:', catRaw.length);

  // 使用更安全的方法 - 直接替换关键模式
  function convertToJson(raw) {
    // 步骤 1: 保护字符串（包括 URL）
    const strings = [];
    let protected = raw.replace(/'((?:[^'\\]|\\.)*)'/g, (match, p1) => {
      strings.push(p1.replace(/\\'/g, "'"));
      return `__STR${strings.length - 1}__`;
    });

    // 步骤 2: 移除注释
    protected = protected
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');

    // 步骤 3: 处理属性名（加引号）
    protected = protected.replace(/([{,]\s*)(\w+):/g, '$1"$2":');

    // 步骤 4: 移除尾随逗号
    protected = protected.replace(/,\s*([}\]])/g, '$1');

    // 步骤 5: 恢复字符串为双引号
    protected = protected.replace(/__STR(\d+)__/g, (match, idx) => {
      const str = strings[idx];
      // 转义双引号
      return '"' + str.replace(/"/g, '\\"') + '"';
    });

    return '[' + protected + ']';
  }

  console.log('\n转换数据...');
  const navDataJson = convertToJson(navDataRaw);
  const catJson = convertToJson(catRaw);

  // 保存转换后的内容
  fs.writeFileSync(path.join(__dirname, 'navdata_converted.json'), navDataJson);
  fs.writeFileSync(path.join(__dirname, 'categories_converted.json'), catJson);

  console.log('转换完成，尝试解析...');

  // 解析
  const navData = JSON.parse(navDataJson);
  const categories = JSON.parse(catJson);

  console.log('✓ 解析成功!');
  console.log('  网站数量:', navData.length);
  console.log('  分类数量:', categories.length);

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
  fs.writeFileSync(outputFile, JSON.stringify(fullData, null, 2), 'utf8');

  console.log('\n✓ 导出完成!');
  console.log('  输出文件:', outputFile);
  console.log('  文件大小:', (fs.statSync(outputFile).size / 1024).toFixed(1), 'KB');

} catch (e) {
  console.error('\n✗ 错误:', e.message);
  console.log('\n请检查 scripts 目录下的 debug 文件');
  process.exit(1);
}
