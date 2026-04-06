<template>
  <el-container class="h-screen">
    <!-- 桌面端侧边栏（隐藏移动端） -->
    <Sidebar class="hidden xl:flex" />

    <!-- 移动端抽屉菜单 -->
    <el-drawer
      v-model="mobileMenuVisible"
      direction="ltr"
      :show-close="false"
      size="280px"
      class="!bg-white dark:!bg-[#16162a]"
    >
      <template #title>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
          </div>
          <span class="text-base font-bold text-gray-900 dark:text-white">MyNuxtNav</span>
        </div>
      </template>
      <div class="px-2">
        <el-menu
          :default-active="activeCategory"
          class="border-r-0"
          @select="handleMenuSelect"
        >
          <template v-for="cat in categories" :key="cat.id">
            <!-- 跳过 "全部" 分类 -->
            <template v-if="cat.id !== 'all'">
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
            <el-menu-item v-else :index="cat.id">
              <Icon :icon="cat.icon" class="w-5 h-5 mr-2" />
              <span>{{ cat.name }}</span>
            </el-menu-item>
            </template>
          </template>
        </el-menu>
      </div>
      <!-- 底部主题切换 -->
      <div class="absolute bottom-4 left-0 right-0 px-4 flex items-center justify-center gap-4">
        <span
          @click="toggleTheme"
          class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          <Icon :icon="isDark ? 'fluent-emoji:sun' : 'fluent-emoji:crescent-moon'" class="w-6 h-6" />
        </span>
      </div>
    </el-drawer>

    <!-- 主内容区 -->
    <el-container class="flex flex-col bg-gradient-to-br from-blue-100/90 via-indigo-100/80 to-purple-100/90 dark:from-[#1e293b]/95 dark:via-[#312e81]/85 dark:to-[#1e1b4b]/95">
      <!-- 顶部栏 -->
      <el-header class="!h-14 !p-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#16162a]">
        <AppHeader @toggle-mobile-menu="mobileMenuVisible = true" />
      </el-header>

      <el-main class="!p-0 flex-1 overflow-auto">
        <!-- 内容 -->
        <main class="pt-4 px-4 sm:pt-6 sm:px-6 lg:pt-8 lg:px-8">
          <slot />
        </main>

        <!-- 底部 -->
        <AppFooter />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { categories } from '~/data/nav-data'

const { activeCategory, selectCategory } = useSearch()
const mobileMenuVisible = ref(false)

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const handleMenuSelect = (index: string) => {
  selectCategory(index)
  mobileMenuVisible.value = false
  if (index === 'all') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    // 等待抽屉关闭后滚动
    setTimeout(() => {
      const element = document.getElementById(`category-${index}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }
}
</script>

<style scoped>
:deep(.el-drawer) {
  height: 100vh !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  display: flex;
  align-items: center;
}
</style>
