import type { NavItem, Category } from '~/types/nav'

export type { NavItem, Category }

// 根据当前语言获取对应的数据
const getLocale = () => {
  if (process.client) {
    // 客户端：从 URL 或 cookie 获取
    const path = window.location.pathname
    if (path.startsWith('/en')) return 'en'
    return 'zh'
  }
  // 服务端：默认中文
  return 'zh'
}

// 动态导入对应语言的数据
const loadNavData = async () => {
  const locale = getLocale()
  try {
    if (locale === 'en') {
      const module = await import('./nav-data.en.generated.json')
      return module.default || module
    }
  } catch (e) {
    console.warn('Failed to load English data, falling back to Chinese')
  }
  // 默认加载中文
  const module = await import('./nav-data.zh.generated.json')
  return module.default || module
}

// 数据缓存
let dataCache: { navData: NavItem[], categories: Category[] } | null = null

// 初始化数据
export const initNavData = async () => {
  if (dataCache) return dataCache

  const data = await loadNavData()
  dataCache = {
    navData: data.sites as NavItem[],
    categories: data.categories as Category[]
  }
  return dataCache
}

// 导出数据（需要在 initNavData 后使用）
export let navData: NavItem[] = []
export let categories: Category[] = []

// 设置数据（由 app.vue 调用）
export const setNavData = (data: { navData: NavItem[], categories: Category[] }) => {
  navData = data.navData
  categories = data.categories
}

// 获取所有叶子节点分类（没有子分类的分类）
export const getLeafCategories = (): Category[] => {
  return categories.filter(cat => !cat.children || cat.children.length === 0)
}

// 根据 ID 获取分类
export const getCategoryById = (id: string): Category | undefined => {
  const found = categories.find(cat => cat.id === id)
  if (found) return found

  for (const cat of categories) {
    if (cat.children) {
      const child = cat.children.find(c => c.id === id)
      if (child) return child
    }
  }

  return undefined
}

// 获取分类下的所有网站
export const getNavItemsByCategory = (categoryId: string): NavItem[] => {
  return navData.filter(item => item.category === categoryId)
}

// 获取热门网站
export const getHotNavItems = (limit = 10): NavItem[] => {
  return navData.filter(item => item.isHot).slice(0, limit)
}

// 获取最新网站
export const getNewNavItems = (limit = 10): NavItem[] => {
  return navData.filter(item => item.isNew).slice(0, limit)
}
