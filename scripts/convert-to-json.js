// 更健壮的 TS 到 JSON 转换器
const fs = require('fs');

const content = fs.readFileSync('data/nav-data.ts', 'utf8');

// 提取对象数组 - 使用正则匹配
function extractArray(sectionName) {
  // 匹配 export const name: Type = [...]
  const pattern = new RegExp(`export const ${sectionName}:\\s*\\w+\\[\\]\\s*=\\s*([\\s\\S]*?)(?=export const |$)`, 'm');
  const match = content.match(pattern);

  if (!match) {
    console.error(`Could not find ${sectionName}`);
    return null;
  }

  let arrayContent = match[1].trim();

  // 找到最后一个 ]
  let bracketCount = 0;
  let endPos = 0;
  for (let i = 0; i < arrayContent.length; i++) {
    if (arrayContent[i] === '[') bracketCount++;
    else if (arrayContent[i] === ']') {
      bracketCount--;
      if (bracketCount === -1) {
        endPos = i;
        break;
      }
    }
  }

  return arrayContent.substring(0, endPos + 1);
}

function tsToJson(tsArray) {
  // 移除注释
  let json = tsArray.replace(/\/\/.*$/gm, '');
  json = json.replace(/\/\*[\s\S]*?\*\//g, '');

  // 处理类型注解 - 移除属性名后的类型声明
  json = json.replace(/"?(\w+)"?\s*:\s*\w+(\[\])?\s*=/g, '"$1":');

  // 保护字符串内的单引号
  let inString = false;
  let stringChar = '';
  let result = '';

  for (let i = 0; i < json.length; i++) {
    const char = json[i];
    const prevChar = i > 0 ? json[i - 1] : '';

    if (!inString && (char === '"' || char === "'")) {
      inString = true;
      stringChar = char;
      result += '"';
    } else if (inString && char === stringChar && prevChar !== '\\') {
      inString = false;
      stringChar = '';
      result += '"';
    } else if (inString && char === '"') {
      result += '\\"';
    } else if (!inString && char === "'") {
      result += '"';
    } else {
      result += char;
    }
  }

  json = result;

  // 处理尾随逗号
  json = json.replace(/,\s*([}\]])/g, '$1');

  // 处理 undefined
  json = json.replace(/:\s*undefined/g, ': null');

  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('Parse error:', e.message);
    // 保存调试文件
    fs.writeFileSync('data/debug.json', json);
    console.error('Debug output saved to data/debug.json');
    throw e;
  }
}

try {
  const navDataRaw = extractArray('navData');
  const categoriesRaw = extractArray('categories');

  if (!navDataRaw || !categoriesRaw) {
    console.error('Failed to extract arrays');
    process.exit(1);
  }

  console.log('Extracted navData length:', navDataRaw.length);
  console.log('Extracted categories length:', categoriesRaw.length);

  const navData = tsToJson(navDataRaw);
  const categories = tsToJson(categoriesRaw);

  // 创建完整的 JSON 数据
  const jsonData = {
    meta: {
      name: 'MyNuxtNav 导航数据',
      version: '1.0.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      totalSites: navData.length,
      totalCategories: categories.length
    },
    categories: categories,
    sites: navData
  };

  // 确保 data 目录存在
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data', { recursive: true });
  }

  // 写入文件
  fs.writeFileSync('data/nav-data.json', JSON.stringify(jsonData, null, 2));
  console.log('✓ data/nav-data.json created');

  fs.writeFileSync('data/sites.json', JSON.stringify(navData, null, 2));
  console.log('✓ data/sites.json created');

  fs.writeFileSync('data/categories.json', JSON.stringify(categories, null, 2));
  console.log('✓ data/categories.json created');

  console.log(`\n统计:`);
  console.log(`  - ${navData.length} 个网站`);
  console.log(`  - ${categories.length} 个分类`);

} catch (e) {
  console.error('Conversion failed:', e.message);
  process.exit(1);
}
