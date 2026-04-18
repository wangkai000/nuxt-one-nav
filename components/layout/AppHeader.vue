<template>
  <!-- 顶部导航栏 -->
  <el-header
    class="h-14 px-4 flex items-center justify-between"
  >
    <!-- 左侧 -->
    <div class="flex items-center gap-4">
      <!-- 汉堡菜单按钮（移动端） -->
      <button
        @click="toggleMobileMenu"
        class="xl:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Icon icon="mdi:menu" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>

      <!-- Logo（仅移动端显示图标，不显示文字） -->
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
        <el-button text @click="toggleSidebar" :title="collapsed ? '展开侧边栏' : '收起侧边栏'">
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
          首页
        </el-button>
        <a
          href="https://tianmiao.site/"
          target="_blank"
          rel="noopener noreferrer"
          class="el-button el-button--text"
          style="text-decoration: none;"
        >
          <Icon icon="fluent-emoji:technologist" class="w-4 h-4 mr-1" />
          作者
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
            type="text"
            placeholder="搜索导航"
            class="w-36 lg:w-46 h-9 pl-9 pr-4 text-sm rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            @input="handleInput"
            @keydown="handleKeydown"
          />
          <!-- 清空按钮 -->
          <button
            v-if="searchInput"
            @click="clear(); searchInput = ''"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <Icon icon="fluent-emoji:cross-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- 收藏提示（仅桌面端显示） -->
      <div class="hidden lg:flex items-center text-xs text-gray-500 dark:text-gray-400 mr-2">
        <span>欢迎收藏 MyNuxtNav导航网</span>
        <span class="mx-1 text-gray-300">|</span>
        <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300 font-mono">Ctrl</kbd>
        <span class="mx-1">(</span>
        <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300 font-mono">⌘</kbd>
        <span class="mx-1">)</span>
        <span>+</span>
        <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300 font-mono">D</kbd>
      </div>

      <!-- GitHub & Gitee 链接 -->
      <div class="flex items-center gap-2">
        <a
          href="https://github.com/wangkai000/nuxt-one-nav"
          target="_blank"
          rel="noopener noreferrer"
          class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="GitHub"
        >
          <!-- 浅色模式用彩色图标，深色模式用白色图标 -->
          <Icon icon="logos:github-icon" class="w-5 h-5 dark:hidden" />
          <Icon icon="mdi:github" class="w-5 h-5 hidden dark:block text-white" />
        </a>
        <a
          href="https://gitee.com/wangkai000/my-nuxt-nav"
          target="_blank"
          rel="noopener noreferrer"
          class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Gitee"
        >
          <!-- Gitee 使用 MDI 图标，深色模式自动变色 -->
          <Icon icon="simple-icons:gitee" class="w-5 h-5 text-red-500 dark:text-red-400" />
        </a>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

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

// 处理输入
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  searchInput.value = value
  setQuery(value)
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
      const input = document.querySelector('input[placeholder*="搜索"]') as HTMLInputElement
      input?.focus()
    }
  }
  window.addEventListener('keydown', handleGlobalKeydown)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalKeydown)
  })
})
</script>
