<template>
  <div class="fixed right-4 sm:right-6 bottom-16 sm:bottom-20 z-50 flex flex-col items-center gap-3">
    <!-- 深色模式切换按钮 -->
    <Transition name="fade-slide">
      <button
        @click="toggleTheme"
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
        :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
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
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
        title="返回顶部"
      >
        <!-- 新的返回顶部图标：更简洁的箭头 -->
        <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="m18 15-6-6-6 6" />
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

// 监听滚动
const handleScroll = () => {
  const container = getScrollContainer()
  let scrollTop = 0

  if (container === window) {
    scrollTop = window.scrollY
  } else {
    scrollTop = (container as Element).scrollTop
  }

  // 滚动超过 300px 显示按钮
  showBackToTop.value = scrollTop > 300
}

// 返回顶部
const scrollToTop = () => {
  const container = getScrollContainer()

  if (container === window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    container.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  const container = getScrollContainer()
  container.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // 初始检查

  onUnmounted(() => {
    container.removeEventListener('scroll', handleScroll)
  })
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