// 使用 Node.js 直接解析 TS 文件并导出为 JSON
// 这个脚本会读取 nav-data.ts 并提取 navData 和 categories

const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', 'data', 'nav-data.ts');
const outputFile = path.join(__dirname, '..', 'data', 'nav-data.json');

// 读取文件
const content = fs.readFileSync(inputFile, 'utf8');

// 提取 navData 数组
function extractArray(content, startMarker, endMarker) {
  const start = content.indexOf(startMarker);
  if (start === -1) throw new Error(`找不到 ${startMarker}`);

  const end = content.indexOf(endMarker, start);
  if (end === -1) throw new Error(`找不到 ${endMarker}`);

  let arrayText = content.substring(start, end);

  // 移除 export const xxx: Type = 
  arrayText = arrayText.replace(/export const \w+:\s*\w+(\[\])?\s*=\s*/, '');

  // 转换为 JSON 兼容格式
  // 1. 将单引号转为双引号（但保护字符串内的单引号）
  // 2. 移除尾随逗号
  // 3. 处理类型注解

  // 简单方法：使用正则替换
  arrayText = arrayText
    .replace(/\/\/.*$/gm, '')  // 移除行注释
    .replace(/\/\*[\s\S]*?\*\//g, '')  // 移除块注释
    .replace(/(\w+):\s*\w+(\[\])?\s*([,}])/g, '"$1": null$3')  // 先标记类型注解位置
    .replace(/,\s*([}\]])/g, '$1');  // 移除尾随逗号

  return arrayText;
}

try {
  // 提取 navData
  const navDataText = extractArray(
    content,
    'export const navData: NavItem[] = [',
    '// 分类定义'
  );

  // 提取 categories
  const catText = extractArray(
    content,
    'export const categories: Category[] = [',
    '/** 为每个分类计算网站数量 */'
  );

  // 保存原始文本用于调试
  fs.writeFileSync(path.join(__dirname, 'navData_debug.txt'), navDataText);
  fs.writeFileSync(path.join(__dirname, 'cat_debug.txt'), catText);

  console.log('已提取数据，请检查 debug 文件');
  console.log('navData 长度:', navDataText.length);
  console.log('categories 长度:', catText.length);

} catch (e) {
  console.error('导出失败:', e.message);
}
