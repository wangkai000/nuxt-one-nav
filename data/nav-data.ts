import { readonly } from 'vue'
import type { NavItem, Category } from '~/types/nav'

export type { NavItem, Category }

// 加载中文导航数据
import navDataJson from './nav-data.generated.json'

// 响应式数据 composable
export const useNavData = () => {
  const navData = useState<NavItem[]>('nav-data', () => [])
  const categories = useState<Category[]>('nav-categories', () => [])

  const initNavData = () => {
    navData.value = navDataJson.sites as NavItem[]
    categories.value = navDataJson.categories as Category[]
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
