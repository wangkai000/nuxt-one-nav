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
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
          <!-- 兜底图标 - 图片未加载成功时显示 -->
          <div v-if="!iconLoaded || iconError" class="absolute inset-0 flex items-center justify-center z-10">
            <Icon :icon="fallbackIcon" class="w-8 h-8 text-gray-400" />
          </div>
          <!-- 真实图标 -->
          <img
            v-if="!iconError"
            :src="resolvedIconUrl"
            :alt="navItem?.title"
            class="w-10 h-10 object-contain absolute z-20 transition-opacity duration-300"
            :class="{ 'opacity-0': !iconLoaded, 'opacity-100': iconLoaded }"
            @error="iconError = true"
            @load="iconLoaded = true"
          />
        </div>
        <div class="min-w-0">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {{ navItem?.title }}
          </h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
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
const iconLoaded = ref(false)
const iconError = ref(false)

// 从网址提取域名获取 favicon
const getFaviconFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return `${urlObj.origin}/favicon.ico`
  } catch {
    return `${url.replace(/\/$/, '')}/favicon.ico`
  }
}

// 解析图标 URL：优先 item.icon，否则从 URL 生成 favicon
const resolvedIconUrl = computed(() => {
  if (!navItem.value) return ''
  const icon = navItem.value.icon
  if (icon && !icon.startsWith('simple-icons:') && !icon.startsWith('mdi:') && !icon.startsWith('fluent-emoji:') && !icon.startsWith('logos:')) {
    return icon
  }
  return getFaviconFromUrl(navItem.value.url)
})

// 分类图标映射（与 NavCard 保持一致）
const categoryIconMap: Record<string, string> = {
  'ai': 'fluent-emoji:robot',
  'web3': 'logos:ethereum',
  'web3-ui': 'logos:metamask-icon',
  'smart-contract-framework': 'logos:solidity',
  'smart-contract-lang': 'vscode-icons:file-type-solidity',
  'frontend': 'logos:javascript',
  'frontend-react': 'logos:react',
  'frontend-vue': 'logos:vue',
  'frontend-other': 'logos:svelte-icon',
  'nodejs': 'logos:nodejs-icon',
  'bun-ecosystem': 'logos:bun',
  'css-framework': 'logos:tailwindcss-icon',
  'build-tool': 'logos:vitejs',
  'ui-lib': 'logos:storybook-icon',
  'game-engine': 'fluent-emoji:video-game',
  'tools': 'fluent-emoji:toolbox',
  'resources': 'fluent-emoji:world-map',
  'game-community': 'fluent-emoji:video-game',
  'dev-community': 'fluent-emoji:technologist',
  'learning': 'fluent-emoji:books',
}

// 域名图标映射（与 NavCard 保持一致）
const domainIconMap: Record<string, string> = {
  'github': 'logos:github-icon',
  'gitlab': 'logos:gitlab',
  'gitee': 'logos:gitee',
  'bilibili': 'logos:bilibili',
  'youtube': 'logos:youtube-icon',
  'twitter': 'logos:twitter',
  'x.com': 'logos:twitter',
  'juejin': 'logos:juejin',
  'zhihu': 'logos:zhihu',
  'taobao': 'logos:taobao',
  'tmall': 'logos:taobao',
  'jd': 'logos:jd',
  'baidu': 'logos:baidu',
  'google': 'logos:google-icon',
  'netflix': 'logos:netflix',
  'qq': 'logos:qq',
  'wechat': 'logos:wechat',
  'vuejs': 'logos:vue',
  'react': 'logos:react',
  'angular': 'logos:angular-icon',
  'svelte': 'logos:svelte-icon',
  'nextjs': 'logos:nextjs-icon',
  'nuxt': 'logos:nuxt-icon',
  'vercel': 'logos:vercel-icon',
  'stackoverflow': 'logos:stackoverflow-icon',
  'discord': 'logos:discord-icon',
  'telegram': 'logos:telegram',
  'reddit': 'logos:reddit-icon',
  'medium': 'logos:medium-icon',
  'dev.to': 'logos:dev',
}

// 兜底图标（与 NavCard.getFallbackIcon 完全一致的逻辑）
const fallbackIcon = computed(() => {
  if (!navItem.value) return 'fluent-emoji:globe-with-meridians'

  // 优先 iconName
  if (navItem.value.iconName) return navItem.value.iconName

  // 匹配分类
  const cat = navItem.value.category
  if (cat && categoryIconMap[cat]) return categoryIconMap[cat]

  // 匹配域名
  const url = navItem.value.url.toLowerCase()
  for (const [domain, icon] of Object.entries(domainIconMap)) {
    if (url.includes(domain)) return icon
  }

  // 匹配标签
  if (navItem.value.tags) {
    const tags = navItem.value.tags.map(t => t.toLowerCase())
    if (tags.some(t => ['vue', 'vuejs'].includes(t))) return 'logos:vue'
    if (tags.some(t => ['react'].includes(t))) return 'logos:react'
    if (tags.some(t => ['angular'].includes(t))) return 'logos:angular-icon'
    if (tags.some(t => ['svelte'].includes(t))) return 'logos:svelte-icon'
    if (tags.some(t => ['node', 'nodejs'].includes(t))) return 'logos:nodejs-icon'
    if (tags.some(t => ['python'].includes(t))) return 'logos:python'
    if (tags.some(t => ['typescript', 'ts'].includes(t))) return 'logos:typescript-icon'
    if (tags.some(t => ['javascript', 'js'].includes(t))) return 'logos:javascript'
    if (tags.some(t => ['rust'].includes(t))) return 'logos:rust'
    if (tags.some(t => ['go', 'golang'].includes(t))) return 'logos:go'
    if (tags.some(t => ['docker'].includes(t))) return 'logos:docker-icon'
    if (tags.some(t => ['kubernetes', 'k8s'].includes(t))) return 'logos:kubernetes'
    if (tags.some(t => ['aws'].includes(t))) return 'logos:aws'
    if (tags.some(t => ['web3', 'blockchain'].includes(t))) return 'logos:ethereum'
    if (tags.some(t => ['ai', 'gpt', 'llm'].includes(t))) return 'fluent-emoji:robot'
  }

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
