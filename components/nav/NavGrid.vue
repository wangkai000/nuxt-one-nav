<template>
  <div class="space-y-8">
    <!-- 加载状态 -->
    <div v-if="pending" class="flex flex-col items-center justify-center py-16 text-gray-500">
      <div class="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-3"></div>
      <p>加载中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-16 text-red-500">
      <Icon name="mdi:alert-circle" class="w-12 h-12 mb-3" />
      <p>加载失败，请刷新重试</p>
    </div>

    <!-- 数据加载完成 -->
    <template v-else>
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

      <!-- 正常浏览时按分类分组 -->
      <template v-else>
        <div v-for="cat in categoriesWithItems" :key="cat.id" :id="`category-${cat.id}`" class="scroll-mt-20">
          <!-- 分类标题 -->
          <div class="flex items-center gap-3 mb-4">
            <Icon :name="cat.icon" class="w-5 h-5 text-gray-400" />
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ cat.name }}</h2>
            <span class="text-sm text-gray-500">({{ cat.items.length }})</span>
            <div class="flex-1 h-px bg-gray-200 dark:bg-gray-800"></div>
          </div>

          <!-- 如果有子分类，分组显示 -->
          <div v-if="cat.children && cat.children.length > 0" class="space-y-6">
            <div v-for="child in cat.children.filter(c => c.items && c.items.length > 0)" :key="child.id" :id="`category-${child.id}`" class="scroll-mt-20">
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 ml-2 flex items-center gap-2">
                <Icon :name="child.icon" class="w-4 h-4" />
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
    </template>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { NavItem, Category } from '~/types/nav'

const { query, activeCategory } = useSearch()

// 从 API 获取数据
const { data: navData, pending, error } = await useFetch<NavItem[]>('/api/nav?data=sites', {
  key: 'nav-sites',
  default: () => []
})

const { data: categories } = await useFetch<Category[]>('/api/nav?data=categories', {
  key: 'nav-categories',
  default: () => []
})

// 叶子节点分类
const leafCategories = computed(() => {
  return categories.value?.filter(cat => cat.id !== 'all') || []
})

// 按分类分组的网站
const categoriesWithItems = computed(() => {
  if (!categories.value || !navData.value) return []

  return categories.value
    .filter(cat => cat.id !== 'all')
    .map(cat => {
      let items: NavItem[] = []

      if (cat.children && cat.children.length > 0) {
        // 有子分类
        const childIds = cat.children.map(child => child.id)
        items = navData.value.filter(item => childIds.includes(item.category))

        const childrenWithItems = cat.children.map(child => ({
          ...child,
          items: navData.value.filter(item => item.category === child.id).sort((a, b) => a.order - b.order)
        })).filter(child => child.items.length > 0)

        return {
          ...cat,
          items: items.sort((a, b) => a.order - b.order),
          children: childrenWithItems
        }
      } else {
        // 没有子分类
        items = navData.value.filter(item => item.category === cat.id)

        return {
          ...cat,
          items: items.sort((a, b) => a.order - b.order),
          children: undefined
        }
      }
    })
    .filter(cat => cat.items.length > 0)
})

// 过滤后的网站（搜索时使用）
const filteredItems = computed<NavItem[]>(() => {
  if (!navData.value) return []

  let result = [...navData.value]
  const keyword = query.value.toLowerCase().trim()

  if (keyword) {
    result = result.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.tags?.some(tag => tag.toLowerCase().includes(keyword))
    )
  }

  if (activeCategory.value !== 'all') {
    const selectedCat = categories.value?.find(c => c.id === activeCategory.value)

    if (selectedCat) {
      if (selectedCat.children && selectedCat.children.length > 0) {
        const childIds = selectedCat.children.map(child => child.id)
        result = result.filter(item =>
          item.category === selectedCat.id || childIds.includes(item.category)
        )
      } else {
        result = result.filter(item => item.category === selectedCat.id)
      }
    }
  }

  return result
})
</script>
