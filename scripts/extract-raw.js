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
function extractArrayContent(content, startMarker, endMarker) {
  const start = content.indexOf(startMarker);
  if (start === -1) throw new Error(`找不到: ${startMarker}`);

  const end = content.indexOf(endMarker, start);
  if (end === -1) throw new Error(`找不到: ${endMarker}`);

  return content.substring(start + startMarker.length, end).trim();
}

try {
  // 提取 navData
  console.log('\n提取 navData...');
  const navDataContent = extractArrayContent(
    content,
    'export const navData: NavItem[] = [',
    '// 分类定义'
  );

  // 提取 categories
  console.log('提取 categories...');
  const catContent = extractArrayContent(
    content,
    'export const categories: Category[] = [',
    '/** 为每个分类计算网站数量 */'
  );

  console.log('navData 内容长度:', navDataContent.length);
  console.log('categories 内容长度:', catContent.length);

  // 保存原始内容用于调试
  fs.writeFileSync(path.join(__dirname, 'navdata_raw.txt'), navDataContent);
  fs.writeFileSync(path.join(__dirname, 'categories_raw.txt'), catContent);

  console.log('\n原始内容已保存到 debug 文件');
  console.log('请检查这些文件，然后手动转换为 JSON');

} catch (e) {
  console.error('错误:', e.message);
  process.exit(1);
}
