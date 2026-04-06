<template>
  <div>
    <!-- 全局加载遮罩 -->
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#16162a]"
      >
        <div class="flex flex-col items-center gap-4">
          <!-- 加载动画 -->
          <div class="relative">
            <div class="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div class="absolute inset-0 w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <!-- 加载文字 -->
          <p class="text-gray-600 dark:text-gray-400 text-sm font-medium animate-pulse">
            {{ loadingText }}
          </p>
        </div>
      </div>
    </Transition>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Element Plus 暗色模式支持
const colorMode = useColorMode()

// 监听颜色模式变化，同步到 Element Plus（只需要 dark class）
watch(
  () => colorMode.value,
  (mode) => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
  { immediate: true }
)

// 加载状态
const isLoading = ref(true)
const loadingText = ref('Loading...')

// 页面加载完成后隐藏加载动画
onMounted(() => {
  // 模拟加载时间，确保资源加载完成
  const timer = setTimeout(() => {
    isLoading.value = false
  }, 800)

  onUnmounted(() => {
    clearTimeout(timer)
  })
})

// 路由切换时显示加载动画
const router = useRouter()
router.beforeEach(() => {
  isLoading.value = true
})

router.afterEach(() => {
  // 延迟隐藏，让页面有时间渲染
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
