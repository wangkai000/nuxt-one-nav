/**
 * 搜索和分类筛选 composable
 * 使用 Nuxt useState 实现跨组件共享
 */
export const useSearch = () => {
  const query = useState<string>('search-query', () => '')
  const activeCategory = useState<string>('active-category', () => 'all')
  const expandedCategories = useState<Set<string>>('expanded-categories', () => new Set(['ai', 'dev']))

  // 预加载的 InViewRender 分类 ID（用于侧边栏点击时强制渲染，持久化避免导航时丢失）
  const preloadedIds = useState<Set<string>>('preloaded-ids', () => new Set(['all']))

  const setQuery = (value: string) => {
    query.value = value
  }

  const selectCategory = (categoryId: string) => {
    activeCategory.value = categoryId
  }

  /**
   * 强制预加载目标分类对应的父级 InViewRender 区块
   * 必须在 selectCategory 之后、scrollIntoView 之前调用
   * @returns 父级分类 ID（用于定位实际的 InViewRender wrapper）
   */
  const preloadCategory = (categoryId: string, categories: any[]): string | null => {
    if (!categoryId || categoryId === 'all') {
      if (!preloadedIds.value.has('all')) {
        preloadedIds.value = new Set([...preloadedIds.value, 'all'])
      }
      return 'all'
    }

    for (const cat of categories) {
      // 子分类：找到其父级分类，预加载父级
      if (cat.children && cat.children.length > 0) {
        const childIds = cat.children.map((c: any) => c.id)
        if (childIds.includes(categoryId)) {
          if (!preloadedIds.value.has(cat.id)) {
            preloadedIds.value = new Set([...preloadedIds.value, cat.id])
          }
          return cat.id
        }
      }
      // 无子分类的一级分类：直接预加载自身
      if (cat.id === categoryId) {
        if (!preloadedIds.value.has(cat.id)) {
          preloadedIds.value = new Set([...preloadedIds.value, cat.id])
        }
        return cat.id
      }
    }
    return null
  }

  // 切换分类展开/折叠
  const toggleCategory = (categoryId: string) => {
    const newSet = new Set(expandedCategories.value)
    if (newSet.has(categoryId)) {
      newSet.delete(categoryId)
    } else {
      newSet.add(categoryId)
    }
    expandedCategories.value = newSet
  }

  // 检查分类是否展开
  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.value.has(categoryId)
  }

  const clear = () => {
    query.value = ''
    activeCategory.value = 'all'
  }

  return {
    query,
    activeCategory,
    expandedCategories,
    preloadedIds,
    setQuery,
    selectCategory,
    preloadCategory,
    toggleCategory,
    isCategoryExpanded,
    clear
  }
}
