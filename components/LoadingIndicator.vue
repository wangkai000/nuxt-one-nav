<template>
  <div
    v-if="loading"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 dark:bg-[#16162a]/90 backdrop-blur-sm transition-opacity duration-300"
    :class="{ 'opacity-0 pointer-events-none': !showLoading }"
  >
    <div class="flex flex-col items-center gap-4">
      <!-- 加载动画 -->
      <div class="relative">
        <div class="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
        <div class="absolute inset-0 w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
      <!-- 加载文字 -->
      <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">
        Loading...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 使用 Nuxt 的加载状态
const { loading } = useLoadingIndicator()
const showLoading = ref(false)

// 延迟显示加载动画，避免快速跳转时的闪烁
let timeout: NodeJS.Timeout

watch(loading, (isLoading) => {
  if (isLoading) {
    // 延迟 100ms 显示，避免快速加载时的闪烁
    timeout = setTimeout(() => {
      showLoading.value = true
    }, 100)
  } else {
    clearTimeout(timeout)
    showLoading.value = false
  }
})

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>
