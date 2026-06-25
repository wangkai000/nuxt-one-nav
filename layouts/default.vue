<template>
  <div class="h-screen-safe">
    <!-- 桌面端侧边栏（隐藏移动端） fixed 定位，永远不会跟着滚动 -->
    <Sidebar class="hidden xl:flex fixed left-0 top-0 h-screen-safe z-20" />

    <!-- 移动端抽屉菜单 -->
    <el-drawer
      v-model="mobileMenuVisible"
      direction="ltr"
      :show-close="false"
      size="280px"
      class="!bg-white dark:!bg-[#16162a]"
      :z-index="2000"
      :style="{ height: '100dvh' }"
    >
      <template #header>
        <div class="flex items-center gap-2 px-1">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
          </div>
          <span class="text-base font-bold text-gray-900 dark:text-white truncate">{{ config.title }}</span>
        </div>
      </template>

      <!-- 抽屉内容区域 -->
      <div class="h-full flex flex-col safe-area-bottom">
        <!-- 分类菜单 -->
        <div class="flex-1 overflow-y-auto overscroll-contain px-2 no-scrollbar">
          <el-menu
            :default-active="activeCategory"
            class="border-r-0 mobile-drawer-menu"
            @select="handleMenuSelect"
          >
            <template v-for="cat in categories" :key="cat.id">
              <!-- 有子分类的父分类 -->
              <el-sub-menu v-if="cat.children && cat.children.length > 0" :index="cat.id">
                <template #title>
                  <Icon :icon="cat.icon" class="w-5 h-5 mr-2" />
                  <span>{{ cat.name }}</span>
                </template>
                <el-menu-item
                  v-for="child in cat.children"
                  :key="child.id"
                  :index="child.id"
                >
                  <Icon :icon="child.icon" class="w-5 h-5 mr-2" />
                  <span>{{ child.name }}</span>
                </el-menu-item>
              </el-sub-menu>
              <!-- 没有子分类的分类（包括站长推荐） -->
              <el-menu-item v-else :index="cat.id">
                <Icon :icon="cat.icon" class="w-5 h-5 mr-2" />
                <span>{{ cat.name }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>

        <!-- 底部区域 -->
        <div class="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 pt-2 pb-4 px-4">
          <!-- 底部菜单 -->
          <div class="space-y-1">
            <div
              @click="openSubmit"
              class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300"
            >
              <Icon icon="fluent-emoji:plus" class="w-5 h-5 mr-3" />
              <span>{{ config.nav.submit }}</span>
            </div>
            <div
              @click="openAbout"
              class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300"
            >
              <Icon icon="fluent-emoji:information" class="w-5 h-5 mr-3" />
              <span>{{ config.nav.about }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>

<!-- 主内容区 -->
    <el-container
      class="h-full flex flex-col grid-bg overflow-hidden"
      :class="sidebarCollapsed ? 'xl:ml-[64px]' : 'xl:ml-[220px]'"
    >
      <!-- 顶部栏（fixed 固定到顶部，纯 CSS 对齐） -->
      <el-header
        class="!h-14 !p-0 flex-shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#16162a] fixed top-0 z-50 header-fixed"
        :class="sidebarCollapsed ? 'collapsed' : ''"
      >
        <AppHeader @toggle-mobile-menu="mobileMenuVisible = true" />
      </el-header>

      <!-- 用占位 div 把 el-main 往下推 -->
      <div class="h-14 flex-shrink-0"></div>

      <el-main class="!p-0 flex-1 min-h-0 overflow-y-auto">
        <!-- 内容 -->
        <main class="pt-4 px-4 sm:pt-6 sm:px-6 lg:pt-8 lg:px-8">
          <slot />
        </main>

        <!-- 底部 -->
        <AppFooter />
      </el-main>
    </el-container>

    <!-- 浮动按钮（深色模式切换 + 返回顶部） -->
    <FloatingActions />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useNavData } from '~/data/nav-data'

const runtimeConfig = useRuntimeConfig()
const config = runtimeConfig.public.siteConfig
const adsense = computed(() => (runtimeConfig.public as any).adsense)

// 动态注入 AdSense 广告库脚本（仅在 enabled=true 时加载）
if (import.meta.client && adsense.value?.enabled && adsense.value?.client) {
  useHead({
    script: [{
      async: true,
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.value.client}`,
      crossorigin: 'anonymous'
    }]
  })
}

const sidebarCollapsed = useState<boolean>('sidebar-collapsed', () => false)

const { categories } = useNavData()

const { activeCategory, selectCategory, preloadCategory } = useSearch()
const mobileMenuVisible = ref(false)

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const handleMenuSelect = async (index: string) => {
  const route = useRoute()

  // 先关闭抽屉（触发 300ms 关闭动画）
  mobileMenuVisible.value = false

  // 如果不在首页，先跳转回首页
  if (route.path !== '/') {
    selectCategory(index)
    // 预加载目标分类，确保导航后 InViewRender 已渲染
    preloadCategory(index, categories.value)
    await navigateTo('/')
  }

  selectCategory(index)
  // 确保目标分类的 InViewRender 被强制渲染
  preloadCategory(index, categories.value)
  await nextTick()
  await nextTick()

  // 等待抽屉关闭动画完成后再滚动，避免视觉跳变
  await new Promise(resolve => setTimeout(resolve, 350))

  const found = await scrollToCategory(`category-${index}`)
  if (!found) {
    document.querySelector('.el-main')?.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// 获取实际滚动容器
const getScrollContainer = (): HTMLElement | null => {
  return document.querySelector('.el-main')
}

// 带重试 + 布局稳定校正的滚动
const scrollToCategory = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const tryScroll = (retriesLeft: number) => {
      const element = document.getElementById(id)
      if (element) {
        // instant 瞬间到位，避免 smooth 中断 bug
        element.scrollIntoView({ behavior: 'instant', block: 'start' })
        // 300ms 后 smooth 微调
        setTimeout(() => {
          const el = document.getElementById(id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          resolve(true)
        }, 300)
        return
      }
      if (retriesLeft > 0) {
        setTimeout(() => tryScroll(retriesLeft - 1), 100)
      } else {
        resolve(false)
      }
    }
    tryScroll(20)
  })
}

// 打开网站提交
const openSubmit = () => {
  mobileMenuVisible.value = false
  window.open('https://github.com/wangkai000/nuxt-one-nav/issues', '_blank')
}

// 打开关于
const openAbout = () => {
  mobileMenuVisible.value = false
  navigateTo('/about')
}
</script>

<style scoped>
:deep(.el-drawer) {
  height: 100dvh !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  display: flex;
  align-items: flex-start;
  height: auto !important;
  min-height: 44px;
  line-height: 1.4 !important;
  padding-top: 8px;
  padding-bottom: 8px;
  white-space: normal !important;
  word-break: break-word !important;
}

/* 菜单文本 span 也做换行 */
:deep(.el-menu-item span),
:deep(.el-sub-menu__title span) {
  white-space: normal !important;
  word-break: break-word !important;
  line-height: 1.4 !important;
}

/* ─── 移动端抽屉菜单优化 ─── */

/* 隐藏抽屉内嵌滚动条（由外层 overflow-y-auto 统一控制） */
.mobile-drawer-menu :deep(.el-scrollbar__bar) {
  display: none !important;
}

/* 抽屉内菜单项间距增大，提升触控体验 */
.mobile-drawer-menu :deep(.el-menu-item),
.mobile-drawer-menu :deep(.el-sub-menu__title) {
  min-height: 48px !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  border-radius: 8px;
  margin: 2px 4px;
}

/* 隐藏 el-menu 内部自带滚动条（避免双重滚动） */
.mobile-drawer-menu :deep(.el-scrollbar) {
  overflow: visible !important;
}

/* 抽屉底部区域安全区 padding */
:deep(.el-drawer__body) {
  padding: 0 !important;
  padding-bottom: env(safe-area-inset-bottom, 16px) !important;
  overflow: hidden;
}

/* 去掉 drawer header 默认 padding，由内部元素控制 */
:deep(.el-drawer__header) {
  padding: 12px 16px 0 16px !important;
  margin-bottom: 0 !important;
}

/* 禁止全局滚动条（只能翻动抽屉内部） */
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* 桌面端菜单恢复原始样式（不应用抽屉修改） */
@media (min-width: 1280px) {
  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    min-height: 48px !important;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
    border-radius: 0;
    margin: 0;
  }

  /* 桌面端 header 和 drawer 相关样式恢复 */
  :deep(.el-drawer__header) {
    padding: var(--el-drawer-padding-primary) !important;
    margin-bottom: 0 !important;
  }
}
</style>
