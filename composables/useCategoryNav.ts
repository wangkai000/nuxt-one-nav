/**
 * 侧边栏/移动端抽屉分类跳转共享逻辑
 * Sidebar.vue 和 default.vue 中共用，消除 80% 重复
 */
import type { Category } from '~/types/nav'
import { useNavData } from '~/data/nav-data'

export function useCategoryNav() {
  const { activeCategory, selectCategory, preloadCategory } = useSearch()
  const { scrollToElement } = useScroll()
  const router = useRouter()
  const { categories } = useNavData()

  const handleSelect = async (categoryId: string) => {
    if (!categoryId || categoryId === 'all') {
      selectCategory('all')
      await navigateTo('/')
      return
    }
    selectCategory(categoryId)
    const parentId = preloadCategory(categoryId, categories.value)

    await navigateTo('/')
    await nextTick()
    await nextTick()
    await scrollToElement(`category-${parentId || categoryId}`)
  }

  return { handleSelect }
}
