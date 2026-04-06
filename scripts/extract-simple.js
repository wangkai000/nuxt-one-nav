// 直接读取 TS 文件并提取所有对象
const fs = require('fs');

const input = fs.readFileSync('D:/project1/nuxt/one-nav-ssg/data/nav-data.ts', 'utf8');

// 提取 navData 部分
const navMatch = input.match(/export const navData: NavItem\[\] = \[([\s\S]*?)\n\]\s*\/\/ 分类定义/);
if (!navMatch) {
  console.error('找不到 navData');
  process.exit(1);
}

const navContent = navMatch[1];

// 使用正则匹配每个对象
const objPattern = /\{\s*id:\s*'([^']+)'[\s\S]*?\},?\s*(?=\{|\/\/|$)/g;
const objects = [];
let match;

while ((match = objPattern.exec(navContent)) !== null) {
  const objText = match[0];
  
  // 提取各个字段
  const id = objText.match(/id:\s*'([^']+)'/)?.[1];
  const title = objText.match(/title:\s*'([^']+)'/)?.[1];
  const description = objText.match(/description:\s*'([^']+)'/)?.[1];
  const url = objText.match(/url:\s*'([^']+)'/)?.[1];
  const icon = objText.match(/icon:\s*'([^']+)'/)?.[1];
  const category = objText.match(/category:\s*'([^']+)'/)?.[1];
  const order = parseInt(objText.match(/order:\s*(\d+)/)?.[1] || '0');
  
  // 提取 tags 数组
  const tagsMatch = objText.match(/tags:\s*\[([^\]]+)\]/);
  const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/'/g, '')) : [];
  
  if (id && title) {
    objects.push({ id, title, description: description || '', url: url || '', icon: icon || '', tags, category: category || '', order });
  }
}

console.log('找到对象数量:', objects.length);

// 保存为 JSON
fs.writeFileSync('D:/project1/nuxt/one-nav-ssg/scripts/extracted.json', JSON.stringify(objects, null, 2), 'utf8');
console.log('已保存到 extracted.json');
