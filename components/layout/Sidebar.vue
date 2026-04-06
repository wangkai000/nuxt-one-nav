<template>
  <div class="h-screen flex">
    <!-- 侧边栏 -->
    <el-aside
      :width="collapsed ? '64px' : '220px'"
      class="transition-all duration-300 ease-in-out bg-white dark:bg-[#16162a] border-r border-gray-200 dark:border-gray-800 flex flex-col"
    >
      <!-- Logo 区域 -->
      <div class="h-14 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
          </div>
          <span v-show="!collapsed" class="text-base font-bold text-gray-900 dark:text-white">MyNuxtNav</span>
        </NuxtLink>
      </div>

      <!-- 导航菜单 -->
      <el-scrollbar class="flex-1">
        <el-menu
          :default-active="activeCategory"
          :collapse="collapsed"
          :collapse-transition="false"
          class="bg-transparent border-r-0"
          @select="handleSelect"
        >
          <template v-for="cat in categories" :key="cat.id">
            <!-- 全部 -->
            <el-menu-item v-if="cat.id === 'all'" :index="cat.id">
              <el-icon><component :is="getIcon(cat.icon)" /></el-icon>
              <template #title>
                <span>{{ cat.name }}</span>
              </template>
            </el-menu-item>

            <!-- 有子分类的父分类 -->
            <el-sub-menu v-else-if="cat.children && cat.children.length > 0" :index="cat.id">
              <template #title>
                <el-icon><component :is="getIcon(cat.icon)" /></el-icon>
                <span>{{ cat.name }}</span>
              </template>
              <el-menu-item
                v-for="child in cat.children"
                :key="child.id"
                :index="child.id"
              >
                <el-icon><component :is="getIcon(child.icon)" /></el-icon>
                <span>{{ child.name }}</span>
              </el-menu-item>
            </el-sub-menu>

            <!-- 没有子分类的分类 -->
            <el-menu-item v-else :index="cat.id">
              <el-icon><component :is="getIcon(cat.icon)" /></el-icon>
              <template #title>
                <span>{{ cat.name }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>

      <!-- 底部：折叠按钮 + 主题切换 -->
      <div class="border-t border-gray-200 dark:border-gray-800 p-2 flex items-center justify-center gap-2">
        <span
          @click="collapsed = !collapsed"
          class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-500"
        >
          <el-icon size="18"><component :is="getIcon(collapsed ? 'mdi:chevron-double-right' : 'mdi:chevron-double-left')" /></el-icon>
        </span>
        <span
          @click="toggleTheme"
          class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-500"
        >
          <el-icon size="18"><component :is="getIcon(isDark ? 'mdi:weather-sunny' : 'mdi:weather-night')" /></el-icon>
        </span>
      </div>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { categories } from '~/data/nav-data'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const { activeCategory, selectCategory } = useSearch()
const collapsed = useState<boolean>('sidebar-collapsed', () => false)

// 主题切换
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

// 将 mdi:xxx 或 simple-icons:xxx 转换为 Element Plus 图标组件名
const iconNameMap: Record<string, string> = {
  // mdi 图标映射到 Element Plus
  'mdi:apps': 'Apps',
  'mdi:robot-happy-outline': 'Robot',
  'mdi:chat-processing-outline': 'ChatDotRound',
  'mdi:image-outline': 'Picture',
  'mdi:magnify': 'Search',
  'mdi:code-braces': 'Code',
  'mdi:git': 'Branch',
  'mdi:cloud-upload-outline': 'Upload',
  'mdi:tools': 'Tools',
  'mdi:palette-outline': 'Brush',
  'mdi:pencil-outline': 'Edit',
  'mdi:folder-image': 'Folder',
  'mdi:rocket-launch-outline': 'Rocket',
  'mdi:file-document-outline': 'Document',
  'mdi:checkbox-marked-outline': 'Finished',
  'mdi:wrench-outline': 'Wrench',
  'mdi:toolbox-outline': 'Tools',
  'mdi:code-tags': 'Code',
  'mdi:book-open-page-variant-outline': 'Reading',
  'mdi:book-outline': 'Notebook',
  'mdi:play-circle-outline': 'VideoPlay',
  'mdi:youtube': 'VideoCamera',
  'mdi:music-note': 'Headset',
  'mdi:unfold-more-horizontal': 'FullScreen',
  'mdi:unfold-less-horizontal': 'FullScreen',
  'mdi:weather-sunny': 'Sunny',
  'mdi:weather-night': 'Moon',
  'mdi:chevron-double-right': 'DArrowRight',
  'mdi:chevron-double-left': 'DArrowLeft',
  'mdi:brain': 'MagicStick',
  'mdi:robot-love-outline': 'Bot',
  'mdi:lightning-bolt': 'Lightning',
  'mdi:flash-outline': 'Flash',
  'mdi:pencil-ruler': 'Relation',
  'mdi:image-size-select-small': 'PicLeft',
  'mdi:regex': 'SetUp',
  'mdi:palette-swatch-outline': 'Color',
  'mdi:folder-outline': 'Folder',
  // simple-icons 用默认图标
}

const getIcon = (icon: string) => {
  const name = iconNameMap[icon] || 'Folder'
  return (ElementPlusIconsVue as any)[name] || ElementPlusIconsVue.Folder
}

// 处理菜单选择
const handleSelect = (index: string) => {
  selectCategory(index)

  if (index === 'all') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  // 查找目标元素并滚动
  const element = document.getElementById(`category-${index}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
::deep(.el-menu) {
  border-right: none;
}

::deep(.el-menu--collapse) {
  width: 64px;
}

::deep(.el-menu-item),
::deep(.el-sub-menu__title) {
  height: 48px;
  line-height: 48px;
}

::deep(.el-sub-menu .el-menu-item) {
  height: 44px;
  line-height: 44px;
  min-width: 180px;
}
</style>