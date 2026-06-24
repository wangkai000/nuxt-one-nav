<template>
  <div v-if="!failed" :class="centered ? 'flex justify-center' : ''">
    <ins
      ref="insRef"
      class="adsbygoogle"
      style="display:block;min-width:0;width:100%;min-height:45px"
      :data-ad-client="client"
      :data-ad-slot="slot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    >
    </ins>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  client: string
  slot: string
  centered?: boolean
}>()

const insRef = ref<HTMLElement>()
const failed = ref(false)

let observer: MutationObserver | null = null
let timer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  if (!import.meta.client || !insRef.value) return

  observer = new MutationObserver(() => {
    const status = insRef.value!.dataset.adStatus
    if (status === 'filled') failed.value = false
    if (status === 'unfilled') failed.value = true
  })
  observer.observe(insRef.value, { attributes: true, attributeFilter: ['data-ad-status'] })

  // 延迟到布局计算完成后再 push（修复 availableWidth=0）
  requestAnimationFrame(() => {
    if (!insRef.value) return
    ;(window as any).adsbygoogle = (window as any).adsbygoogle || []

    // 全局只 push 一次，避免 "already have ads" 错误
    if (!(window as any).__adsPushed) {
      ;(window as any).__adsPushed = true
      ;(window as any).adsbygoogle.push({})
    }

    timer = setTimeout(() => {
      if (insRef.value?.dataset.adStatus !== 'filled') {
        failed.value = true
      }
      observer?.disconnect()
    }, 3000)
  })
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  observer?.disconnect()
})
</script>
