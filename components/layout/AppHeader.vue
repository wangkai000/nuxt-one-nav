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
        <el-icon size="20"><component :is="getIcon('mdi:menu')" /></el-icon>
      </button>

      <!-- Logo（仅移动端显示） -->
      <NuxtLink to="/" class="xl:hidden flex items-center gap-2">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
          </svg>
        </div>
        <span class="text-base font-bold text-gray-900 dark:text-white">MyNuxtNav</span>
      </NuxtLink>

      <!-- 桌面端导航 -->
      <nav class="hidden xl:flex items-center gap-1">
        <el-button text @click="scrollToTop">
          <el-icon class="mr-1"><component :is="getIcon('mdi:home-outline')" /></el-icon>
          首页
        </el-button>
        <el-button text>
          <el-icon class="mr-1"><component :is="getIcon('mdi:account-outline')" /></el-icon>
          作者
        </el-button>
        <el-button text>
          <el-icon class="mr-1"><component :is="getIcon('mdi:cog-outline')" /></el-icon>
          配置
        </el-button>
      </nav>
    </div>

    <!-- 右侧 -->
    <div class="flex items-center gap-3">
      <!-- 搜索框（美化版） -->
      <div class="hidden sm:flex items-center">
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <el-icon size="16" class="text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <component :is="getIcon('mdi:magnify')" />
            </el-icon>
          </div>
          <input
            v-model="searchInput"
            type="text"
            placeholder="搜索导航... (⌘K)"
            class="w-40 lg:w-56 h-9 pl-9 pr-4 text-sm rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            @input="handleInput"
            @keydown="handleKeydown"
          />
          <!-- 清空按钮 -->
          <button
            v-if="searchInput"
            @click="clear(); searchInput = ''"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <el-icon size="14"><component :is="getIcon('mdi:close')" /></el-icon>
          </button>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const emit = defineEmits(['toggle-mobile-menu'])
const { query, setQuery, clear } = useSearch()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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

// 图标映射
const iconNameMap: Record<string, string> = {
  'mdi:menu': 'Fold',
  'mdi:home-outline': 'HomeFilled',
  'mdi:account-outline': 'User',
  'mdi:cog-outline': 'Setting',
  'mdi:magnify': 'Search',
  'mdi:close': 'Close',
}

const getIcon = (icon: string) => {
  const name = iconNameMap[icon] || 'Folder'
  return (ElementPlusIconsVue as any)[name] || ElementPlusIconsVue.Folder
}
</script>
