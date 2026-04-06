// 导航数据 API
// 提供 JSON 格式的导航数据，可用于外部调用

import { navData, categories, categoryMap } from '../data/nav-data'

export default defineEventHandler((event) => {
  const query = getQuery(event)

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
    meta: {
      name: 'MyNuxtNav 导航数据',
      version: '1.0.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      totalSites: navData.length,
      totalCategories: categories.length
    },
    categories: categories,
    sites: navData
  }
})
