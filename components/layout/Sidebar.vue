<template>
  <div class="h-screen flex">
    <!-- 侧边栏 -->
    <el-aside
      :width="collapsed ? '64px' : '220px'"
      class="transition-all duration-300 ease-in-out bg-white dark:bg-[#16162a] border-r border-gray-200 dark:border-gray-800 flex flex-col"
    >
      <!-- Logo 区域 -->
      <div class="h-14 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <a href="/" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
          </div>
          <span v-show="!collapsed" class="text-base font-bold text-gray-900 dark:text-white">MyNuxtNav</span>
        </a>
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
              <Icon :icon="cat.icon" style="width: 20px; height: 20px; min-width: 20px; min-height: 20px; margin-right: 12px;" />
              <template #title>
                <span>{{ cat.name }}</span>
              </template>
            </el-menu-item>

            <!-- 有子分类的父分类 -->
            <el-sub-menu v-else-if="cat.children && cat.children.length > 0" :index="cat.id" @click="handleSubMenuClick(cat.id)">
              <template #title>
                <Icon :icon="cat.icon" style="width: 20px; height: 20px; min-width: 20px; min-height: 20px; margin-right: 12px;" />
                <span>{{ cat.name }}</span>
              </template>
              <el-menu-item
                v-for="child in cat.children"
                :key="child.id"
                :index="child.id"
              >
                <Icon :icon="child.icon" style="width: 16px; height: 16px; min-width: 16px; min-height: 16px; margin-right: 12px;" />
                <span>{{ child.name }}</span>
              </el-menu-item>
            </el-sub-menu>

            <!-- 没有子分类的分类 -->
            <el-menu-item v-else :index="cat.id">
              <Icon :icon="cat.icon" style="width: 20px; height: 20px; min-width: 20px; min-height: 20px; margin-right: 12px;" />
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
          <el-menu-item index="submit" @click="openSubmit">
            <Icon icon="fluent-emoji:plus" style="width: 20px; height: 20px; min-width: 20px; min-height: 20px; margin-right: 12px;" />
            <template #title>
              <span>网站提交</span>
            </template>
          </el-menu-item>
          <el-menu-item index="friends" @click="openFriends">
            <Icon icon="fluent-emoji:handshake" style="width: 20px; height: 20px; min-width: 20px; min-height: 20px; margin-right: 12px;" />
            <template #title>
              <span>友情链接</span>
            </template>
          </el-menu-item>
          <el-menu-item index="about" @click="openAbout">
            <Icon icon="fluent-emoji:information" style="width: 20px; height: 20px; min-width: 20px; min-height: 20px; margin-right: 12px;" />
            <template #title>
              <span>关于导航</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { categories } from '~/data/nav-data'

const { activeCategory, selectCategory } = useSearch()
const collapsed = useState<boolean>('sidebar-collapsed', () => false)

// 处理菜单选择
const handleSelect = (index: string) => {
  const route = useRoute()

  // 如果不在首页，先跳转回首页
  if (route.path !== '/') {
    selectCategory(index)
    navigateTo('/')
    return
  }

  selectCategory(index)

  // 查找目标元素并滚动
  const element = document.getElementById(`category-${index}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    // 如果找不到对应元素（比如首页），滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// 处理子菜单点击（父分类）
const handleSubMenuClick = (index: string) => {
  selectCategory(index)

  // 查找目标元素并滚动
  const element = document.getElementById(`category-${index}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 打开网站提交
const openSubmit = () => {
  // 可以跳转到提交页面或打开对话框
  ElMessage.info('这只是一个资源导航站的模板而已...')
}

// 打开友情链接
const openFriends = () => {
  // 滚动到页面底部的友情链接区域
  const element = document.getElementById('friendship-links')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    // 如果找不到，滚动到页面底部
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
}

// 打开关于
const openAbout = () => {
  navigateTo('/about')
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
  justify-content: flex-start;
}

/* 收起状态下图标居中 */
::deep(.el-menu--collapse) .el-menu-item,
::deep(.el-menu--collapse) .el-sub-menu__title {
  padding: 0 !important;
  justify-content: center !important;
}

::deep(.el-menu--collapse) .el-menu-item .iconify,
::deep(.el-menu--collapse) .el-sub-menu__title .iconify {
  margin: 0 !important;
}

/* 固定图标大小 - 所有状态下保持 20px */
::deep(.el-menu-item) .iconify,
::deep(.el-sub-menu__title) .iconify,
::deep(.el-menu--collapse) .el-menu-item .iconify,
::deep(.el-menu--collapse) .el-sub-menu__title .iconify {
  width: 20px !important;
  height: 20px !important;
  min-width: 20px !important;
  min-height: 20px !important;
  max-width: 20px !important;
  max-height: 20px !important;
  flex-shrink: 0 !important;
  font-size: 20px !important;
}

/* 针对收起状态的强制样式 */
::deep(.el-menu--collapse .el-menu-item .iconify),
::deep(.el-menu--collapse .el-sub-menu__title .iconify) {
  width: 20px !important;
  height: 20px !important;
  min-width: 20px !important;
  min-height: 20px !important;
  max-width: 20px !important;
  max-height: 20px !important;
}

/* 子菜单中的图标稍微小一点 */
::deep(.el-sub-menu .el-menu-item) .iconify {
  width: 16px !important;
  height: 16px !important;
  min-width: 16px !important;
  min-height: 16px !important;
}

::deep(.el-sub-menu .el-menu-item) {
  height: 44px;
  line-height: 44px;
  min-width: 180px;
}
</style>
