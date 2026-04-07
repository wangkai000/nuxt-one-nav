import type { NavItem, Category } from '~/types/nav'
import navDataRaw from './nav-data.json'

export type { NavItem, Category }

// 从 nav-data.json 中导出网站数据
export const navData: NavItem[] = navDataRaw.sites as NavItem[]

// 从 nav-data.json 中导出分类数据
export const categories: Category[] = navDataRaw.categories as Category[]

// 获取所有叶子节点分类（没有子分类的分类）
export const getLeafCategories = (): Category[] => {
  return categories.filter(cat => !cat.children || cat.children.length === 0)
}

// 根据 ID 获取分类
export const getCategoryById = (id: string): Category | undefined => {
  // 先在一级分类中查找
  const found = categories.find(cat => cat.id === id)
  if (found) return found

  // 在二级分类中查找
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
