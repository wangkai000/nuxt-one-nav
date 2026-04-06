/**
 * 搜索和分类筛选 composable
 * 使用 Nuxt useState 实现跨组件共享
 */
export const useSearch = () => {
  const query = useState<string>('search-query', () => '')
  const activeCategory = useState<string>('active-category', () => 'all')
  const expandedCategories = useState<Set<string>>('expanded-categories', () => new Set(['ai', 'dev']))

  const setQuery = (value: string) => {
    query.value = value
  }

  const selectCategory = (categoryId: string) => {
    activeCategory.value = categoryId
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
    setQuery,
    selectCategory,
    toggleCategory,
    isCategoryExpanded,
    clear
  }
}
