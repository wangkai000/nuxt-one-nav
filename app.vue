<template>
  <div>
    <!-- 全局加载指示器 -->
    <LoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Element Plus 暗色模式支持
const colorMode = useColorMode()

// 客户端挂载后同步 Element Plus 暗色模式
onMounted(() => {
  if (colorMode.value === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

// 监听颜色模式变化，同步到 Element Plus
watch(
  () => colorMode.value,
  (mode) => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
)
</script>
