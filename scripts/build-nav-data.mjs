/**
 * 构建期脚本：将 nav-data.md 解析为 nav-data.generated.json
 * 用法：node scripts/build-nav-data.mjs
 * 由 nuxt.config.ts 的 build:before hook 自动调用
 */
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const mdPath = resolve(rootDir, 'data', 'nav-data.md')
const outPath = resolve(rootDir, 'data', 'nav-data.generated.json')

if (!existsSync(mdPath)) {
  console.error('[build-nav-data] ERROR: data/nav-data.md not found')
  process.exit(1)
}

const md = readFileSync(mdPath, 'utf-8')
const { categories, sites } = parseNavMd(md)

const result = {
  meta: {
    name: 'MyNuxtNav 导航数据',
    version: '2.0.0',
    lastUpdated: new Date().toISOString().split('T')[0],
    description: '基于 Nuxt 3 的导航站数据（Markdown 数据源）',
    totalSites: sites.length,
    totalCategories: categories.length
  },
  categories,
  sites
}

writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8')
console.log(`[build-nav-data] OK: ${sites.length} sites, ${categories.length} categories -> ${outPath}`)

// ==================== 解析器 ====================

function parseNavMd(md) {
  const categories = []
  const sites = []
  let currentCat = null
  let currentChild = null
  let siteOrder = 0

  for (const rawLine of md.split('\n')) {
    const line = rawLine.trimEnd()

    // 一级分类: # Title
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      // 保存上一个分类的最后一个子分类
      if (currentChild && currentCat) {
        if (!currentCat.children.find(c => c.id === currentChild.id)) {
          currentCat.children.push({ ...currentChild })
        }
        currentChild = null
      }
      // 保存上一个分类
      if (currentCat) pushCat(currentCat, categories, sites)
      currentCat = { id: '', name: line.slice(2), icon: '', children: [] }
      currentChild = null
      continue
    }

    // 二级子分类: ## Title
    if (line.startsWith('## ')) {
      // 保存上一个子分类
      if (currentChild && currentCat) {
        if (!currentCat.children.find(c => c.id === currentChild.id)) {
          currentCat.children.push({ ...currentChild })
        }
      }
      if (currentCat) {
        currentChild = { id: '', name: line.slice(3), icon: '' }
      }
      continue
    }

    // 元数据: > key: value | key2: value2
    if (line.startsWith('> ') && (currentCat || currentChild)) {
      const target = currentChild || currentCat
      for (const part of line.slice(2).split('|')) {
        const kv = part.trim().match(/^(\w+):\s*(.+)$/)
        if (kv) {
          const [_, key, val] = kv
          if (key === 'id') target.id = val
          else if (key === 'icon') target.icon = val
        }
      }
      continue
    }

    // 网站条目: - [Title](URL) - Description | meta
    if (line.startsWith('- [') && currentCat) {
      const m = line.match(/^- \[([^\]]+)\]\(([^)]+)\)\s*-\s*([\s\S]+)$/)
      if (!m) continue
      siteOrder++

      const [, title, url, rest] = m
      const pipeParts = rest.split(' | ')
      const description = pipeParts[0].trim()

      let icon = '', tags = [], isHot = false, isNew = false

      for (let i = 1; i < pipeParts.length; i++) {
        const p = pipeParts[i].trim()
        if (p.startsWith('icon: ')) icon = p.slice(6)
        else if (p.startsWith('tags: ')) tags = p.slice(6).split(',').map(t => t.trim()).filter(Boolean)
        else if (p === 'hot') isHot = true
        else if (p === 'new') isNew = true
      }

      sites.push({
        id: toId(title),
        title, description, url,
        ...(icon ? { icon } : {}),
        ...(tags.length ? { tags } : {}),
        category: currentChild ? currentChild.id : currentCat.id,
        order: siteOrder,
        ...(isHot ? { isHot: true } : {}),
        ...(isNew ? { isNew: true } : {})
      })
    }
  }

  // 保存最后一个分类的最后一个子分类
  if (currentChild && currentCat) {
    if (!currentCat.children.find(c => c.id === currentChild.id)) {
      currentCat.children.push({ ...currentChild })
    }
  }
  // 保存最后一个分类
  if (currentCat) pushCat(currentCat, categories, sites)

  return { categories, sites }
}

function pushCat(cat, categories, sites) {
  // 为每个子分类计算站点数
  if (cat.children) {
    for (const child of cat.children) {
      child.count = sites.filter(s => s.category === child.id).length
    }
    // 去掉空子分类
    cat.children = cat.children.filter(c => c.count > 0)
    if (cat.children.length === 0) delete cat.children
  }
  // 计算站点数
  const ownCount = sites.filter(s => s.category === cat.id).length
  const childCount = (cat.children || []).reduce((sum, c) => sum + c.count, 0)
  cat.count = ownCount + childCount
  // 只保留有站点的分类
  if (cat.count > 0) categories.push(cat)
}

function toId(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s.-]/g, '')
    .replace(/[\s.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    || 'site-' + Math.random().toString(36).slice(2, 6)
}
