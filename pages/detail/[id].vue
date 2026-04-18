<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <!-- 返回按钮 -->
    <button
      @click="goBack"
      class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
    >
      <Icon icon="fluent-emoji:left-arrow" class="w-5 h-5" />
      <span>返回导航</span>
    </button>

    <!-- 详情卡片 -->
    <div class="bg-white dark:bg-[#1e1e3a] rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
      <!-- 图标和标题 -->
      <div class="flex items-start gap-4 mb-6">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 flex items-center justify-center flex-shrink-0">
          <img
            v-if="navItem?.icon && !iconError"
            :src="navItem.icon"
            :alt="navItem.title"
            class="w-10 h-10 object-contain"
            @error="iconError = true"
          />
          <Icon v-else :icon="fallbackIcon" class="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {{ navItem?.title }}
          </h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            {{ navItem?.description }}
          </p>
        </div>
      </div>

      <!-- 标签 -->
      <div v-if="navItem?.tags && navItem.tags.length > 0" class="mb-6">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in navItem.tags"
            :key="tag"
            class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- 访问按钮 -->
      <a
        :href="navItem?.url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        <Icon icon="fluent-emoji:rocket" class="w-5 h-5" />
        <span>访问官网</span>
        <Icon icon="fluent-emoji:external-link" class="w-4 h-4" />
      </a>

      <!-- 分类信息 -->
      <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Icon :icon="categoryIcon" class="w-5 h-5" />
          <span>分类：{{ categoryName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { navData, categories, getCategoryById } from '~/data/nav-data'
import type { NavItem } from '~/types/nav'

const route = useRoute()
const router = useRouter()

// 获取 URL 参数中的 id
const itemId = computed(() => route.params.id as string)

// 根据 ID 查找网站数据
const navItem = computed(() => {
  return navData.find(item => item.id === itemId.value) as NavItem | undefined
})

// 获取分类信息
const categoryInfo = computed(() => {
  if (!navItem.value) return null
  return getCategoryById(navItem.value.category)
})

const categoryName = computed(() => categoryInfo.value?.name || '未分类')
const categoryIcon = computed(() => categoryInfo.value?.icon || 'fluent-emoji:folder')

// 图标加载状态
const iconError = ref(false)

// 兜底图标
const fallbackIcon = computed(() => {
  if (!navItem.value) return 'fluent-emoji:globe-with-meridians'
  
  const url = navItem.value.url.toLowerCase()
  if (url.includes('github')) return 'logos:github-icon'
  if (url.includes('vercel')) return 'logos:vercel-icon'
  if (url.includes('vue')) return 'logos:vue'
  if (url.includes('react')) return 'logos:react'
  
  return 'fluent-emoji:globe-with-meridians'
})

// 返回导航
const goBack = () => {
  router.push('/')
}

// 设置页面标题
useHead({
  title: computed(() => navItem.value ? `${navItem.value.title} - MyNuxtNav` : '未找到')
})
</script>