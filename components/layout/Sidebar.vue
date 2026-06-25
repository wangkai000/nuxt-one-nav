<template>
  <div class="h-full flex">
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
          <span v-show="!collapsed" class="text-base font-bold text-gray-900 dark:text-white">基米导航</span>
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
            <el-sub-menu v-else-if="cat.children && cat.children.length > 0" :index="cat.id">
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
              <span>{{ config.nav.submit }}</span>
            </template>
          </el-menu-item>
          <el-menu-item index="about" @click="openAbout">
            <Icon icon="fluent-emoji:information" style="width: 20px; height: 20px; min-width: 20px; min-height: 20px; margin-right: 12px;" />
            <template #title>
              <span>{{ config.nav.about }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useNavData } from '~/data/nav-data'

const config = useRuntimeConfig().public.siteConfig

const { categories } = useNavData()

const { activeCategory, selectCategory, preloadCategory } = useSearch()
const collapsed = useState<boolean>('sidebar-collapsed', () => false)

// 获取实际滚动容器（el-main，不是 window）
const getScrollContainer = (): HTMLElement | null => {
  return document.querySelector('.el-main')
}

// 滚动到指定元素（返回 Promise，配合 async/await 精确控制时序）
// 关键修复：不再用两次 smooth scrollIntoView 互相中断，
// 改用 instant 快速到位 + 300ms 后 smooth 微调（避免 Chromium 的 smooth 中断 bug）
const scrollToElement = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const tryScroll = (retriesLeft: number) => {
      const element = document.getElementById(id)
      if (element) {
        // 第一步：instant 瞬间到位（避免内容渲染中高度变化导致偏移）
        element.scrollIntoView({ behavior: 'instant', block: 'start' })
        // 第二步：300ms 后 smooth 微调（此时 InViewRender 内容已渲染完成）
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
    tryScroll(20) // 2s 超时
  })
}

// 处理菜单选择
const handleSelect = async (index: string) => {
  const route = useRoute()

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
  // 双 nextTick：确保二级分类的子 div 也渲染完成（在 InViewRender slot 内）
  await nextTick()

  const found = await scrollToElement(`category-${index}`)
  if (!found) {
    // 回退：滚动实际容器（el-main），不是 window（window 无溢出，scrollTo 是空操作）
    getScrollContainer()?.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// 打开网站提交
const openSubmit = () => {
  window.open('https://github.com/wangkai000/nuxt-one-nav/issues', '_blank')
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

/* ========== 菜单文字自动换行（解决中英文切换时文字被挤压裁切） ========== */

/* 一级菜单和子菜单标题 - 允许文字换行 */
::deep(.el-menu-item),
::deep(.el-sub-menu__title) {
  height: auto !important;
  min-height: 48px;
  line-height: 1.4 !important;
  padding-top: 6px;
  padding-bottom: 6px;
  white-space: normal !important;
  word-break: break-word !important;
}

/* 收起状态下恢复单行居中 */
::deep(.el-menu--collapse) .el-menu-item,
::deep(.el-menu--collapse) .el-sub-menu__title {
  height: 48px !important;
  min-height: 48px;
  line-height: 48px !important;
  padding: 0 !important;
  white-space: nowrap !important;
}

/* 子菜单项 - 多行换行 */
::deep(.el-sub-menu .el-menu-item) {
  height: auto !important;
  min-height: 44px;
  line-height: 1.4 !important;
  padding-top: 6px;
  padding-bottom: 6px;
  white-space: normal !important;
  word-break: break-word !important;
}

/* 菜单标题中的 span（Element Plus 内部可能有 nowrap） */
::deep(.el-menu-item span),
::deep(.el-sub-menu__title span),
::deep(.el-sub-menu .el-menu-item span) {
  white-space: normal !important;
  word-break: break-word !important;
  line-height: 1.4 !important;
}
</style>
