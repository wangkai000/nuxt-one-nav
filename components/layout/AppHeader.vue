<template>
  <!-- 顶部导航栏内容（由外层 el-header 包裹，此处不再重复 el-header） -->
  <div class="h-full w-full px-4 flex items-center justify-between">
    <!-- 左侧 -->
    <div class="flex items-center gap-4">
      <!-- 汉堡菜单按钮（移动端） -->
      <button
        @click="toggleMobileMenu"
        class="xl:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Icon icon="mdi:menu" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>

      <!-- Logo（仅移动端显示，桌面端侧栏已有 Logo） -->
      <a href="/" class="xl:hidden flex items-center">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
          </svg>
        </div>
      </a>

      <!-- 桌面端导航 -->
      <nav class="hidden xl:flex items-center gap-1">
        <!-- 收缩/展开侧边栏按钮 -->
        <el-button text @click="toggleSidebar" :title="collapsed ? '展开' : '收起'">
          <!-- 使用更简洁的折叠图标 -->
          <svg v-if="collapsed" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 6h16M4 12h10M4 18h16" />
          </svg>
        </el-button>

        <el-button text @click="refreshPage">
          <Icon icon="fluent-emoji:house" class="w-4 h-4 mr-1" />
          {{ config.nav.home }}
        </el-button>
        <a
          href="https://tianmiao.site/"
          target="_blank"
          rel="noopener noreferrer"
          class="el-button el-button--text"
          style="text-decoration: none;"
        >
          <Icon icon="fluent-emoji:technologist" class="w-4 h-4 mr-1" />
          {{ config.nav.author }}
        </a>

      </nav>
    </div>

    <!-- 右侧 -->
    <div class="flex items-center gap-3">
      <!-- 搜索框（美化版） -->
      <div class="flex items-center">
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon icon="fluent-emoji:magnifying-glass-tilted-left" class="w-4 h-4 group-focus-within:scale-110 transition-transform" />
          </div>
          <input
            v-model="searchInput"
            type="search"
            :placeholder="config.nav.searchPlaceholder"
            class="w-28 sm:w-36 md:w-44 lg:w-46 h-9 pl-9 pr-4 text-sm rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            @input="handleInput"
            @search="handleSearchClear"
            @keydown="handleKeydown"
          />
        </div>
      </div>

      <!-- 收藏提示（仅桌面端显示） -->
      <div class="hidden lg:flex items-center text-xs text-gray-500 dark:text-gray-400 mr-2">
        <span>{{ config.nav.bookmark }}</span>
        <span class="mx-1 text-gray-300">|</span>
        <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300 font-mono">Ctrl</kbd>
        <span class="mx-1">(</span>
        <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300 font-mono">⌘</kbd>
        <span class="mx-1">)</span>
        <span>+</span>
        <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300 font-mono">D</kbd>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useDebounceFn } from '@vueuse/core'

const config = useRuntimeConfig().public.siteConfig

const emit = defineEmits(['toggle-mobile-menu'])
const { query, setQuery, clear } = useSearch()

// 侧边栏折叠状态
const collapsed = useState<boolean>('sidebar-collapsed', () => false)

// 切换侧边栏
const toggleSidebar = () => {
  collapsed.value = !collapsed.value
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const refreshPage = () => {
  window.location.reload()
}

const toggleMobileMenu = () => {
  emit('toggle-mobile-menu')
}

// 搜索输入处理
const searchInput = ref('')

// 同步外部 query 到输入框
watch(() => query.value, (newQuery) => {
  searchInput.value = newQuery
}, { immediate: true })

// 300ms 防抖搜索，避免每次按键都触发 267 条数据的筛选和重新渲染
const debouncedSearch = useDebounceFn((value: string) => {
  setQuery(value)
}, 300)

// 处理输入
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  searchInput.value = value
  debouncedSearch(value)
}

// 浏览器原生 search input 清除事件
const handleSearchClear = () => {
  searchInput.value = ''
  clear()
}

// 处理键盘事件
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    searchInput.value = ''
    clear()
  }
}

// 全局快捷键 ⌘K / Ctrl+K
onMounted(() => {
  const handleGlobalKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      const input = document.querySelector('input[placeholder]') as HTMLInputElement
      input?.focus()
    }
  }
  window.addEventListener('keydown', handleGlobalKeydown)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalKeydown)
  })
})
</script>
