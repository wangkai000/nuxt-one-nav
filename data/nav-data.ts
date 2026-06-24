import type { NavItem, Category } from '~/types/nav'

export type { NavItem, Category }

// 加载中文导航数据
import navDataJson from './nav-data.generated.json'

// 响应式数据 composable
export const useNavData = () => {
  const navData = useState<NavItem[]>('nav-data', () => [...navDataJson.sites] as NavItem[])
  const categories = useState<Category[]>('nav-categories', () => [...navDataJson.categories] as Category[])

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

  return { navData, categories, getCategoryById }
}
