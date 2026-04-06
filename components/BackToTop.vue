<template>
  <Transition name="fade-slide">
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
      title="返回顶部"
    >
      <Icon icon="fluent-emoji:up-arrow" class="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

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
