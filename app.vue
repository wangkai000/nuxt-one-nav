<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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
</script>
