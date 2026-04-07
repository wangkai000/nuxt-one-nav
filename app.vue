<template>
  <div v-cloak>
    <!-- 初始加载遮罩 - 现代风格 -->
    <div id="initial-loader" :class="{ hidden: isLoaded }">
      <div class="loader-container">
        <!-- Logo 动画 -->
        <div class="logo-wrapper">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10" class="logo-circle"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" class="logo-polygon"/>
            </svg>
          </div>
          <div class="logo-text">MyNuxtNav</div>
        </div>
        <!-- 进度条 -->
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <!-- 加载文字 -->
        <div class="loading-text">加载中...</div>
      </div>
    </div>

    <!-- 全局加载指示器 -->
    <LoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// 控制初始加载遮罩
const isLoaded = ref(false)

// Fallback 定时器，防止 hydration 失败导致遮罩一直显示
let fallbackTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  // DOM 加载完成后隐藏遮罩
  nextTick(() => {
    setTimeout(() => {
      isLoaded.value = true
    }, 800) // 最小显示 800ms，避免闪烁
  })
})

// Fallback: 如果 5 秒后仍未加载完成，强制隐藏遮罩
onMounted(() => {
  fallbackTimer = setTimeout(() => {
    if (!isLoaded.value) {
      isLoaded.value = true
      console.warn('SSR hydration 可能失败，已强制隐藏加载遮罩')
    }
  }, 5000)
})

onUnmounted(() => {
  if (fallbackTimer) {
    clearTimeout(fallbackTimer)
  }
})

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

<style>
/* v-cloak - 防止 Vue 渲染前显示未编译的模板 */
[v-cloak] {
  display: none !important;
}

/* 初始加载遮罩 */
#initial-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f5f7 0%, #e8e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

html.dark #initial-loader {
  background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
}

#initial-loader.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* 加载容器 */
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

/* Logo 包装器 */
.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Logo 图标 */
.logo-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

.logo-icon svg {
  width: 32px;
  height: 32px;
  color: white;
}

.logo-circle {
  stroke-dasharray: 63;
  stroke-dashoffset: 63;
  animation: drawCircle 1s ease forwards;
}

.logo-polygon {
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  animation: drawPolygon 1s ease 0.3s forwards;
}

/* Logo 文字 */
.logo-text {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

html.dark .logo-text {
  background: linear-gradient(135deg, #f9fafb 0%, #d1d5db 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 进度条 */
.progress-bar {
  width: 200px;
  height: 4px;
  background: rgba(156, 163, 175, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
  border-radius: 2px;
  animation: progress 2s ease-in-out infinite;
}

/* 加载文字 */
.loading-text {
  font-size: 14px;
  color: #6b7280;
  letter-spacing: 2px;
}

html.dark .loading-text {
  color: #9ca3af;
}

/* 动画 */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes drawCircle {
  to { stroke-dashoffset: 0; }
}

@keyframes drawPolygon {
  to { stroke-dashoffset: 0; }
}

@keyframes progress {
  0% { width: 0%; opacity: 1; }
  50% { width: 70%; opacity: 1; }
  100% { width: 100%; opacity: 0; }
}
</style>
