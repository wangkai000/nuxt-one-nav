import { readonly } from 'vue'
import type { NavItem, Category } from '~/types/nav'

export type { NavItem, Category }

// 动态导入对应语言的数据
const loadNavDataForLocale = async (locale: string) => {
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

// 响应式数据 composable
export const useNavData = () => {
  const navData = useState<NavItem[]>('nav-data', () => [])
  const categories = useState<Category[]>('nav-categories', () => [])

  const initNavData = async (locale: string) => {
    const data = await loadNavDataForLocale(locale)
    navData.value = data.sites as NavItem[]
    categories.value = data.categories as Category[]
  }

  const getLeafCategories = computed(() =>
    categories.value.filter(cat => !cat.children || cat.children.length === 0)
  )

  const getCategoryById = (id: string): Category | undefined => {
    const found = categories.value.find(cat => cat.id === id)
    if (found) return found
    for (const cat of categories.value) {
      if (cat.children) {
        const child = cat.children.find(c => c.id === id)
        if (child) return child
      }
    }
    return undefined
  }

  const getNavItemsByCategory = (categoryId: string): NavItem[] =>
    navData.value.filter(item => item.category === categoryId)

  const getHotNavItems = (limit = 10): NavItem[] =>
    navData.value.filter(item => item.isHot).slice(0, limit)

  const getNewNavItems = (limit = 10): NavItem[] =>
    navData.value.filter(item => item.isNew).slice(0, limit)

  return {
    navData: readonly(navData),
    categories: readonly(categories),
    initNavData,
    getLeafCategories,
    getCategoryById,
    getNavItemsByCategory,
    getHotNavItems,
    getNewNavItems
  }
}
