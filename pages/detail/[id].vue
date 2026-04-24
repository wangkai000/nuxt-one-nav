<template>
  <div class="min-h-screen  from-gray-50 via-white to-gray-100 dark:from-[#1a1a2e] dark:via-[#1e1e3a] dark:to-[#1a1a2e]">
    <div class="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- 主内容卡片 -->
      <div class="bg-white/80 dark:bg-[#1e1e3a]/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">

      <!-- 面包屑导航 -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <button
          @click="goBack"
          class="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Icon icon="mdi:arrow-left" class="w-4 h-4" />
          <span>导航首页</span>
        </button>
        <Icon icon="mdi:chevron-right" class="w-4 h-4 text-gray-300 dark:text-gray-600" />
        <button
          v-if="parentCategory"
          @click="navigateToCategory(parentCategory.id)"
          class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {{ parentCategory.name }}
        </button>
        <template v-if="parentCategory && childCategory">
          <Icon icon="mdi:chevron-right" class="w-4 h-4 text-gray-300 dark:text-gray-600" />
          <button
            @click="navigateToCategory(childCategory.id)"
            class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {{ childCategory.name }}
          </button>
        </template>
        <Icon icon="mdi:chevron-right" class="w-4 h-4 text-gray-300 dark:text-gray-600" />
        <span class="text-gray-700 dark:text-gray-200">{{ navItem?.title }}</span>
      </nav>

      <!-- 未找到 -->
      <div v-if="!navItem" class="flex flex-col items-center justify-center py-24 text-gray-500">
        <Icon icon="mdi:alert-circle-outline" class="w-16 h-16 mb-4 opacity-50" />
        <p class="text-lg">未找到该网站</p>
        <button @click="goBack" class="mt-4 text-blue-600 hover:underline">返回首页</button>
      </div>

      <template v-else>
        <!-- 主内容区 -->
        <div class="max-w-2xl mx-auto space-y-5 mb-8">

          <!-- 卡片：图标 + 标题 -->
          <div class="bg-white dark:bg-[#252547] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 relative overflow-hidden shadow-sm">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div class="flex items-start gap-4">
              <!-- 大图标 -->
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 flex items-center justify-center flex-shrink-0 overflow-hidden relative shadow-sm">
                <div v-if="!iconLoaded || iconError" class="absolute inset-0 flex items-center justify-center z-10">
                  <Icon :icon="fallbackIcon" class="w-8 h-8 text-gray-400" />
                </div>
                <img
                  v-if="!iconError"
                  :src="resolvedIconUrl"
                  :alt="navItem.title"
                  class="w-10 h-10 object-contain absolute z-20 transition-opacity duration-300"
                  :class="{ 'opacity-0': !iconLoaded, 'opacity-100': iconLoaded }"
                  @error="iconError = true"
                  @load="iconLoaded = true"
                />
              </div>
              <div class="min-w-0 flex-1">
                <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{{ navItem.title }}</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ navItem.description }}</p>
              </div>
            </div>
          </div>

          <!-- 标签 -->
          <div v-if="navItem.tags && navItem.tags.length > 0"
            class="bg-white dark:bg-[#252547] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in navItem.tags"
                :key="tag"
                class="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- 快捷操作 -->
          <div class="bg-white dark:bg-[#252547] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 space-y-3">
            <!-- 访问官网 -->
            <a
              :href="navItem.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors shadow-sm"
            >
              <Icon icon="mdi:open-in-new" class="w-5 h-5" />
              <span>访问官网</span>
            </a>

            <!-- 链接复制 -->
            <button
              @click="copyUrl"
              class="flex items-center justify-center gap-2 w-full px-5 py-2.5 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-xl transition-colors"
            >
              <Icon :icon="urlCopied ? 'mdi:check' : 'mdi:content-copy'" class="w-4 h-4" />
              <span class="text-sm">{{ urlCopied ? '已复制' : '复制链接' }}</span>
            </button>

            <!-- URL展示 -->
            <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Icon icon="mdi:link-variant" class="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ navItem.url }}</span>
            </div>
          </div>
        </div>

        <!-- 相关推荐 -->
        <div v-if="relatedItems.length > 0" class="bg-white dark:bg-[#252547] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <Icon :icon="categoryIcon" class="w-5 h-5 text-gray-400" />
            <h2 class="text-base font-bold text-gray-900 dark:text-white">同分类推荐</h2>
            <span class="text-sm text-gray-500">({{ relatedItems.length }})</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            <div
              v-for="item in relatedItems"
              :key="item.id"
              class="group flex items-center gap-3 bg-white dark:bg-[#1e1e3a] rounded-xl border border-gray-200 dark:border-gray-800 p-3 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all"
              @click="navigateToDetail(item.id)"
            >
              <!-- 小图标 -->
              <div class="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                <div v-if="!relatedIconsLoaded[item.id]" class="absolute inset-0 flex items-center justify-center">
                  <Icon :icon="getRelatedFallbackIcon(item)" class="w-5 h-5 text-gray-300 dark:text-gray-600" />
                </div>
                <img
                  v-if="!relatedIconErrors[item.id]"
                  :src="getRelatedIconUrl(item)"
                  class="w-6 h-6 object-contain"
                  :class="{ 'opacity-0': !relatedIconsLoaded[item.id], 'opacity-100': relatedIconsLoaded[item.id] }"
                  loading="lazy"
                  @error="relatedIconErrors[item.id] = true"
                  @load="relatedIconsLoaded[item.id] = true"
                />
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ item.title }}</div>
                <div class="text-xs text-gray-400 dark:text-gray-500 truncate">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部留白 -->
        <div class="h-8"></div>

      </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { navData, categories, getCategoryById } from '~/data/nav-data'
import type { NavItem, Category } from '~/types/nav'

const route = useRoute()
const router = useRouter()

// ─── 数据 ───────────────────────────────────────────────
const itemId = computed(() => route.params.id as string)
const navItem = computed(() => navData.find(item => item.id === itemId.value) as NavItem | undefined)

// ─── 分类信息 ───────────────────────────────────────────
const categoryInfo = computed(() => {
  if (!navItem.value) return null
  return getCategoryById(navItem.value.category)
})

// 父分类（直系父级）
const parentCategory = computed<Category | null>(() => {
  const info = categoryInfo.value
  if (!info) return null
  if ('parentId' in info && info.parentId) {
    return getCategoryById(info.parentId as string) as Category | null
  }
  return null
})

// 子分类（当前所属）
const childCategory = computed<Category | null>(() => {
  const info = categoryInfo.value
  if (!info) return null
  if ('parentId' in info && info.parentId) {
    return info as Category
  }
  return null
})

const categoryName = computed(() => categoryInfo.value?.name || '未分类')
const categoryIcon = computed(() => categoryInfo.value?.icon || 'mdi:folder-outline')

// ─── 相关推荐（同分类）──────────────────────────────────
const relatedItems = computed<NavItem[]>(() => {
  if (!navItem.value) return []
  return navData
    .filter(item => item.category === navItem.value!.category && item.id !== navItem.value!.id)
    .slice(0, 10)
})

// ─── 主图标 ─────────────────────────────────────────────
const iconLoaded = ref(false)
const iconError = ref(false)

const getFaviconFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return `${urlObj.origin}/favicon.ico`
  } catch {
    return `${url.replace(/\/$/, '')}/favicon.ico`
  }
}

const resolvedIconUrl = computed(() => {
  if (!navItem.value) return ''
  const icon = navItem.value.icon
  if (icon && !icon.startsWith('simple-icons:') && !icon.startsWith('mdi:') && !icon.startsWith('fluent-emoji:') && !icon.startsWith('logos:')) {
    return icon
  }
  return getFaviconFromUrl(navItem.value.url)
})

// ─── 相关站点图标 ───────────────────────────────────────
const relatedIconsLoaded = reactive<Record<string, boolean>>({})
const relatedIconErrors = reactive<Record<string, boolean>>({})

const getRelatedIconUrl = (item: NavItem): string => {
  if (item.icon && !item.icon.startsWith('simple-icons:') && !item.icon.startsWith('mdi:') && !item.icon.startsWith('fluent-emoji:') && !item.icon.startsWith('logos:')) {
    return item.icon
  }
  return getFaviconFromUrl(item.url)
}

const getRelatedFallbackIcon = (item: NavItem): string => {
  if (item.iconName) return item.iconName
  const cat = item.category
  const catIconMap: Record<string, string> = {
    'ai': 'mdi:robot',
    'web3': 'mdi:ethereum',
    'frontend': 'mdi:language-javascript',
    'frontend-react': 'mdi:react',
    'frontend-vue': 'mdi:vuejs',
    'frontend-other': 'mdi:svelte',
    'nodejs': 'mdi:nodejs',
    'bun-ecosystem': 'mdi:bun',
    'css-framework': 'mdi:tailwind',
    'build-tool': 'mdi:vite',
    'ui-lib': 'mdi:storybook',
    'game-engine': 'mdi:gamepad-variant',
    'tools': 'mdi:toolbox',
    'resources': 'mdi:map',
    'game-community': 'mdi:forum',
    'dev-community': 'mdi:account-group',
    'learning': 'mdi:book-open-variant',
  }
  if (cat && catIconMap[cat]) return catIconMap[cat]
  return 'mdi:globe'
}

// ─── 导航操作 ───────────────────────────────────────────
const goBack = () => {
  router.push('/')
}

const navigateToCategory = (id: string) => {
  selectCategory(id)
  router.push('/')
}

const navigateToDetail = (id: string) => {
  router.push(`/detail/${id}`)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ─── 复制链接 ───────────────────────────────────────────
const urlCopied = ref(false)
const copyUrl = async () => {
  if (!navItem.value) return
  try {
    await navigator.clipboard.writeText(navItem.value.url)
    urlCopied.value = true
    setTimeout(() => { urlCopied.value = false }, 2000)
  } catch {
    // fallback
    const ta = document.createElement('textarea')
    ta.value = navItem.value.url
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    urlCopied.value = true
    setTimeout(() => { urlCopied.value = false }, 2000)
  }
}

// ─── 兜底图标（主卡片用）────────────────────────────────
const categoryIconMap: Record<string, string> = {
  'ai': 'mdi:robot',
  'web3': 'mdi:ethereum',
  'web3-ui': 'mdi:metamask',
  'smart-contract-framework': 'mdi:file-code',
  'smart-contract-lang': 'mdi:language-solidity',
  'frontend': 'mdi:language-javascript',
  'frontend-react': 'mdi:react',
  'frontend-vue': 'mdi:vuejs',
  'frontend-other': 'mdi:svelte',
  'nodejs': 'mdi:nodejs',
  'bun-ecosystem': 'mdi:bun',
  'css-framework': 'mdi:tailwind',
  'build-tool': 'mdi:vite',
  'ui-lib': 'mdi:storybook',
  'game-engine': 'mdi:gamepad-variant',
  'tools': 'mdi:toolbox',
  'resources': 'mdi:map',
  'game-community': 'mdi:forum',
  'dev-community': 'mdi:account-group',
  'learning': 'mdi:book-open-variant',
}

const domainIconMap: Record<string, string> = {
  'github': 'mdi:github',
  'gitlab': 'mdi:gitlab',
  'gitee': 'mdi:git',
  'bilibili': 'mdi:bilibili',
  'youtube': 'mdi:youtube',
  'twitter': 'mdi:twitter',
  'x.com': 'mdi:twitter',
  'juejin': 'mdi:emoticon-outline',
  'zhihu': 'mdi:zhihu',
  'google': 'mdi:google',
  'stackoverflow': 'mdi:stackoverflow',
  'discord': 'mdi:discord',
  'telegram': 'mdi:telegram',
  'reddit': 'mdi:reddit',
  'medium': 'mdi:medium',
  'dev.to': 'mdi:dev-to',
}

const fallbackIcon = computed(() => {
  if (!navItem.value) return 'mdi:globe'
  if (navItem.value.iconName) return navItem.value.iconName
  if (navItem.value.category && categoryIconMap[navItem.value.category]) return categoryIconMap[navItem.value.category]
  const url = navItem.value.url.toLowerCase()
  for (const [domain, icon] of Object.entries(domainIconMap)) {
    if (url.includes(domain)) return icon
  }
  if (navItem.value.tags) {
    const tags = navItem.value.tags.map(t => t.toLowerCase())
    if (tags.some(t => ['vue', 'vuejs'].includes(t))) return 'mdi:vuejs'
    if (tags.some(t => ['react'].includes(t))) return 'mdi:react'
    if (tags.some(t => ['angular'].includes(t))) return 'mdi:angular'
    if (tags.some(t => ['svelte'].includes(t))) return 'mdi:svelte'
    if (tags.some(t => ['node', 'nodejs'].includes(t))) return 'mdi:nodejs'
    if (tags.some(t => ['python'].includes(t))) return 'mdi:language-python'
    if (tags.some(t => ['typescript', 'ts'].includes(t))) return 'mdi:language-typescript'
    if (tags.some(t => ['javascript', 'js'].includes(t))) return 'mdi:language-javascript'
    if (tags.some(t => ['rust'].includes(t))) return 'mdi:language-rust'
    if (tags.some(t => ['go', 'golang'].includes(t))) return 'mdi:language-go'
    if (tags.some(t => ['docker'].includes(t))) return 'mdi:docker'
    if (tags.some(t => ['ai', 'gpt', 'llm'].includes(t))) return 'mdi:robot'
  }
  return 'mdi:globe'
})

// ─── SEO ───────────────────────────────────────────────
useHead({
  title: computed(() => navItem.value ? `${navItem.value.title} - 星途导航` : '未找到'),
})
</script>
