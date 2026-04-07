<template>
  <div class="space-y-8">
    <!-- 搜索时显示所有结果（不分组） -->
    <template v-if="query.trim()">
      <div>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>搜索结果</span>
          <span class="text-sm font-normal text-gray-500">({{ filteredItems.length }})</span>
        </h2>
        <div v-if="filteredItems.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          <NavCard v-for="item in filteredItems" :key="item.id" :item="item" />
        </div>
        <div v-else class="flex flex-col items-center justify-center py-16 text-gray-500">
          <Icon name="mdi:magnify" class="w-12 h-12 mb-3 opacity-50" />
          <p>没有找到相关网站</p>
        </div>
      </div>
    </template>

    <!-- 正常浏览时按分类分组（始终显示全部） -->
    <template v-else>
      <div v-for="cat in categoriesWithItems" :key="cat.id" :id="`category-${cat.id}`" class="scroll-mt-20">
        <!-- 分类标题 -->
        <div class="flex items-center gap-3 mb-4">
          <Icon :name="getIconName(cat.icon)" class="w-5 h-5 text-gray-400" />
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ cat.name }}</h2>
          <span class="text-sm text-gray-500">({{ cat.items.length }})</span>
          <div class="flex-1 h-px bg-gray-200 dark:bg-gray-800"></div>
        </div>

        <!-- 如果有子分类，分组显示 -->
        <div v-if="cat.children && cat.children.length > 0" class="space-y-6">
          <div v-for="child in cat.children.filter(c => c.items && c.items.length > 0)" :key="child.id" :id="`category-${child.id}`" class="scroll-mt-20">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 ml-2 flex items-center gap-2">
              <Icon :name="getIconName(child.icon)" class="w-4 h-4" />
              {{ child.name }}
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              <NavCard v-for="item in child.items" :key="item.id" :item="item" />
            </div>
          </div>
        </div>

        <!-- 没有子分类的直接显示 -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          <NavCard v-for="item in cat.items" :key="item.id" :item="item" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { navData, categories, getLeafCategories, getCategoryById } from '~/data/nav-data'
import type { NavItem, Category } from '~/types/nav'

const { query, activeCategory } = useSearch()

// mdi:xxx 转换为 @iconify/vue 格式
const getIconName = (icon: string): string => {
  if (icon.startsWith('mdi:')) {
    return `mdi:${icon.slice(4)}`
  }
  if (icon.startsWith('simple-icons:')) {
    return `simple-icons:${icon.slice(13)}`
  }
  return icon
}

// 叶子节点分类（扁平化列表，用于移动端）
const leafCategories = computed(() => getLeafCategories())

// 按分类分组的网站
const categoriesWithItems = computed(() => {
  return categories
    .filter(cat => cat.id !== 'all')
    .map(cat => {
      let items: NavItem[] = []

      if (cat.children && cat.children.length > 0) {
        // 有子分类：获取所有子分类的网站
        const childIds = cat.children.map(child => child.id)
        items = navData.filter(item => childIds.includes(item.category))

        // 为每个子分类分配对应的网站
        const childrenWithItems = cat.children.map(child => ({
          ...child,
          items: navData.filter(item => item.category === child.id).sort((a, b) => a.order - b.order)
        })).filter(child => child.items.length > 0)

        return {
          ...cat,
          items: items.sort((a, b) => a.order - b.order),
          children: childrenWithItems
        }
      } else {
        // 没有子分类：直接匹配该分类的网站
        items = navData.filter(item => item.category === cat.id)

        return {
          ...cat,
          items: items.sort((a, b) => a.order - b.order),
          children: undefined
        }
      }
    })
    .filter(cat => cat.items.length > 0)
})

// 实际用于筛选的分类ID
const effectiveCategoryId = computed(() => {
  const cat = getCategoryById(activeCategory.value)
  if (cat && 'parentId' in cat) {
    return (cat as any).parentId
  }
  return activeCategory.value
})

// 过滤后的网站（搜索时使用）
const filteredItems = computed<NavItem[]>(() => {
  let result = [...navData]

  if (effectiveCategoryId.value !== 'all') {
    const selectedCat = getCategoryById(activeCategory.value)

    if (selectedCat) {
      // 检查是否是子分类（有 parentId）
      if ('parentId' in selectedCat) {
        // 子分类：只匹配该子分类的网站
        result = result.filter(item => item.category === activeCategory.value)
      } else {
        // 父分类：匹配该分类及其所有子分类的网站
        const parentCat = selectedCat as Category
        if (parentCat.children && parentCat.children.length > 0) {
          const childIds = parentCat.children.map(child => child.id)
          result = result.filter(item =>
            item.category === parentCat.id || childIds.includes(item.category)
          )
        } else {
          // 没有子分类的一级分类：只匹配该分类的网站
          result = result.filter(item => item.category === parentCat.id)
        }
      }
    }
  }

  const q = query.value.trim().toLowerCase()
  if (q) {
    result = result.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags?.some(tag => tag.toLowerCase().includes(q))
    )
  }

  return result.sort((a, b) => a.order - b.order)
})
</script>
