// 导航数据 API
// 从 JSON 文件读取数据，提供 API 接口

import navDataJson from '../../data/nav-data.generated.json'
import type { NavItem, Category } from '~/types/nav'

// 类型转换
const navData: NavItem[] = navDataJson.sites as NavItem[]
const categories: Category[] = navDataJson.categories as Category[]

export default defineEventHandler((event) => {
  const query = getQuery(event)

  // 只返回 sites 数据
  if (query.data === 'sites') {
    return navData
  }

  // 只返回 categories 数据
  if (query.data === 'categories') {
    return categories
  }

  // 支持按分类筛选
  if (query.category) {
    const filtered = navData.filter(site => site.category === query.category)
    return {
      meta: {
        total: filtered.length,
        category: query.category
      },
      data: filtered
    }
  }

  // 支持搜索
  if (query.search) {
    const keyword = (query.search as string).toLowerCase()
    const filtered = navData.filter(site =>
      site.title.toLowerCase().includes(keyword) ||
      site.description.toLowerCase().includes(keyword) ||
      site.tags?.some(tag => tag.toLowerCase().includes(keyword))
    )
    return {
      meta: {
        total: filtered.length,
        keyword: query.search
      },
      data: filtered
    }
  }

  // 返回完整数据
  return {
    meta: navDataJson.meta,
    categories: categories,
    sites: navData
  }
})
