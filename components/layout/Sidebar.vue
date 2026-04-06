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
              <Icon :icon="cat.icon" class="w-5 h-5" />
              <template #title>
                <span>{{ cat.name }}</span>
              </template>
            </el-menu-item>

            <!-- 有子分类的父分类 -->
            <el-sub-menu v-else-if="cat.children && cat.children.length > 0" :index="cat.id">
              <template #title>
                <Icon :icon="cat.icon" class="w-5 h-5" />
                <span>{{ cat.name }}</span>
              </template>
              <el-menu-item
                v-for="child in cat.children"
                :key="child.id"
                :index="child.id"
              >
                <Icon :icon="child.icon" class="w-4 h-4 mr-2" />
                <span>{{ child.name }}</span>
              </el-menu-item>
            </el-sub-menu>

            <!-- 没有子分类的分类 -->
            <el-menu-item v-else :index="cat.id">
              <Icon :icon="cat.icon" class="w-5 h-5" />
              <template #title>
                <span>{{ cat.name }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>

      <!-- 底部菜单：网站提交、友情链接、关于 -->
      <div class="border-t border-gray-200 dark:border-gray-800 py-2">
        <el-menu
          :collapse="collapsed"
          :collapse-transition="false"
          class="bg-transparent border-r-0"
        >
          <el-menu-item @click="openSubmit">
            <Icon icon="fluent-emoji:plus" class="w-5 h-5 mr-3" />
            <template #title>
              <span>网站提交</span>
            </template>
          </el-menu-item>
          <el-menu-item @click="openFriends">
            <Icon icon="fluent-emoji:handshake" class="w-5 h-5 mr-3" />
            <template #title>
              <span>友情链接</span>
            </template>
          </el-menu-item>
          <el-menu-item @click="openAbout">
            <Icon icon="fluent-emoji:information" class="w-5 h-5 mr-3" />
            <template #title>
              <span>关于导航</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 底部：折叠按钮 + 主题切换 -->
      <div class="border-t border-gray-200 dark:border-gray-800 p-2 flex items-center justify-center gap-2">
        <span
          @click="collapsed = !collapsed"
          class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          <Icon :icon="collapsed ? 'fluent-emoji:right-arrow' : 'fluent-emoji:left-arrow'" class="w-5 h-5" />
        </span>
        <span
          @click="toggleTheme"
          class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          <Icon :icon="isDark ? 'fluent-emoji:sun' : 'fluent-emoji:crescent-moon'" class="w-5 h-5" />
        </span>
      </div>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { categories } from '~/data/nav-data'

const { activeCategory, selectCategory } = useSearch()
const collapsed = useState<boolean>('sidebar-collapsed', () => false)

// 主题切换
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
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

// 打开网站提交
const openSubmit = () => {
  // 可以跳转到提交页面或打开对话框
  ElMessage.info('网站提交功能开发中...')
}

// 打开友情链接
const openFriends = () => {
  ElMessage.info('友情链接功能开发中...')
}

// 打开关于
const openAbout = () => {
  ElMessage.info('关于导航功能开发中...')
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
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 收起状态下图标居中 */
::deep(.el-menu--collapse) .el-menu-item,
::deep(.el-menu--collapse) .el-sub-menu__title {
  padding: 0 !important;
  justify-content: center;
}

::deep(.el-menu--collapse) .el-menu-item .iconify,
::deep(.el-menu--collapse) .el-sub-menu__title .iconify {
  margin: 0 !important;
}

::deep(.el-sub-menu .el-menu-item) {
  height: 44px;
  line-height: 44px;
  min-width: 180px;
}
</style>
