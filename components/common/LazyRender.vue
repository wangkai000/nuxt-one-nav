<template>
  <div :id="sectionId" ref="el" :class="['relative', rootClass]">
    <!-- 可见/即将可见时渲染实际内容 -->
    <template v-if="visible">
      <slot />
    </template>
    <!-- 不可见时显示骨架占位，保留空间防布局抖动 -->
    <div v-else class="space-y-3">
      <div
        v-for="i in skeletonRows"
        :key="i"
        class="h-40 rounded-lg bg-gray-100/60 dark:bg-gray-800/40 animate-pulse"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  /** 该区块的 DOM id（用于侧边栏 scrollIntoView 定位） */
  id?: string
  /** 预估项数（用于生成骨架条数） */
  itemCount?: number
  /** 网格列数（用于计算骨架行数） */
  columns?: number
  /** IntersectionObserver 提前加载距离 */
  rootMargin?: string
  /** 根容器类名 */
  rootClass?: string
  /** 外部强制可见（侧边栏点击触发的预加载） */
  forceVisible?: boolean
}>(), {
  itemCount: 6,
  columns: 6,
  rootMargin: '300px 0px',
  rootClass: '',
  forceVisible: false
})

const sectionId = props.id
const el = ref<HTMLElement>()
const visible = ref(false)

// 估算骨架行数（不少于 1 行）
const skeletonRows = computed(() => Math.max(1, Math.ceil(props.itemCount / props.columns)))

// 监听外部强制可见信号
watch(() => props.forceVisible, (val) => {
  if (val && !visible.value) {
    visible.value = true
    observer?.unobserve(el.value!)
    observer?.disconnect()
  }
})

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return
  // 如果外部已经要求可见，跳过观察
  if (props.forceVisible) {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer?.unobserve(entry.target)
        observer?.disconnect()
      }
    },
    { rootMargin: props.rootMargin }
  )
  observer.observe(el.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>