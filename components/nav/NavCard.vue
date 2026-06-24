<template>
  <div
    ref="cardRef"
    class="group flex flex-col items-center text-center p-4 bg-white dark:bg-[#1e1e3a] rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
    @click="goToDetail"
  >
    <!-- 图标 -->
    <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 flex items-center justify-center mb-3 overflow-hidden relative">
      <!-- 兜底图标 - 卡片进入视口前和图片加载前始终显示 -->
      <div
        v-if="!shouldLoad || !iconLoaded"
        class="absolute inset-0 flex items-center justify-center z-10"
      >
        <Icon :icon="getFallbackIcon(item.category, item.url, item.tags)" class="w-8 h-8" />
      </div>

      <!-- 图片图标 - 仅当卡片进入视口后才渲染 img 标签，避免大量并发请求 -->
      <img
        v-if="shouldLoad && !iconError"
        :src="getIconUrl(item)"
        :alt="item.title"
        class="w-9 h-9 object-contain absolute z-20 transition-opacity duration-300"
        :class="{ 'opacity-0': !iconLoaded, 'opacity-100': iconLoaded }"
        decoding="async"
        @error="iconError = true"
        @load="iconLoaded = true"
      />
    </div>

    <!-- 标题 -->
    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate w-full group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
      {{ item.title }}
    </h3>

    <!-- 描述 -->
    <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
      {{ item.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { shallowRef, ref, onMounted, onUnmounted } from 'vue'
import type { NavItem } from '~/types/nav'
import { getFallbackIcon } from '~/utils/icon-maps'
import { getIconUrl } from '~/utils/favicon'

const props = defineProps<{ item: NavItem }>()

const router = useRouter()

// 在新标签页打开详情页
const goToDetail = () => {
  window.open(`/detail/${props.item.id}`, '_blank')
}

// ===== 卡片级图片懒加载 =====
// 用 IntersectionObserver 控制 img 标签的渲染时机
// 避免 267 张卡片同时发起 favicon 请求
const cardRef = ref<HTMLElement>()
const shouldLoad = ref(false)

// 图标加载状态
const iconLoaded = shallowRef(false)
const iconError = shallowRef(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!cardRef.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        shouldLoad.value = true
        observer?.unobserve(entry.target)
        observer?.disconnect()
      }
    },
    { rootMargin: '200px' } // 提前 200px 开始加载，到视口时已缓存好
  )
  observer.observe(cardRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})


</script>

<style scoped>
/* 仅在 hover 期间临时启用 GPU 合成层，用完即释放 */
.group:hover {
  will-change: transform;
}
</style>