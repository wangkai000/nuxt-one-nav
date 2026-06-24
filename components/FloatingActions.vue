<template>
  <div class="fixed right-4 sm:right-6 bottom-16 sm:bottom-20 z-50 flex flex-col items-center gap-3">
    <!-- 深色模式切换按钮 -->
    <Transition name="fade-slide">
      <button
        @click="toggleTheme"
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-200"
        :title="isDark ? '浅色' : '深色'"
      >
        <!-- 新的图标：使用更现代的太阳/月亮切换图标 -->
        <svg v-if="isDark" class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
        <svg v-else class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </button>
    </Transition>

    <!-- 返回顶部按钮 -->
    <Transition name="fade-slide">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-200"
        title="返回顶部"
      >
        <!-- 新的返回顶部图标：向上箭头（居中对齐） -->
        <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 15 6-6 6 6" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleTheme = () => { 
  colorMode.preference = isDark.value ? 'light' : 'dark' 
}

const showBackToTop = ref(false)

// 获取滚动容器
const getScrollContainer = () => {
  // 优先查找 el-main 容器
  const elMain = document.querySelector('.el-main')
  if (elMain) return elMain
  return window
}

// 记录当前监听的滚动容器
let scrollContainerEl: Element | null = null

// 监听滚动
const handleScroll = () => {
  const elMain = document.querySelector('.el-main') as HTMLElement | null
  // 取所有可能滚动容器的最大值，避免因容器判断错误导致按钮不显示
  const scrollTop = Math.max(
    elMain?.scrollTop || 0,
    window.scrollY || 0,
    document.documentElement.scrollTop || 0
  )

  // 滚动超过 300px 显示按钮
  showBackToTop.value = scrollTop > 300
}

// 返回顶部
const scrollToTop = () => {
  // 先尝试滚动 el-main，如果不行就滚动 window
  const elMain = document.querySelector('.el-main') as HTMLElement | null
  if (elMain && elMain.scrollTop > 0) {
    elMain.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  // 同时监听 el-main 和 window 的滚动，避免容器判断错误导致按钮不显示
  scrollContainerEl = document.querySelector('.el-main')
  scrollContainerEl?.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('scroll', handleScroll, { passive: true })

  // 初始检查
  handleScroll()
})

onUnmounted(() => {
  scrollContainerEl?.removeEventListener('scroll', handleScroll)
  window.removeEventListener('scroll', handleScroll)
  scrollContainerEl = null
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>