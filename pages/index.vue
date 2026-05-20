<template>
  <div class="max-w-screen-2xl mx-auto">
    <!-- Hero 背景图片区域 -->
    <div class="relative mb-8 overflow-hidden rounded-2xl">
      <!-- 背景图片 -->
      <div class="absolute inset-0 hero-wallpaper"></div>

      <!-- 内容 -->
      <div class="relative px-8 py-12 md:py-16 flex flex-col items-start gap-3">
        <h1 class="inline px-4 py-2 rounded-lg bg-white/90 dark:bg-[#1a1a2e]/90 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {{ $t('app.name') }}
        </h1>
        <p class="inline px-4 py-2 rounded-lg bg-white/80 dark:bg-[#1a1a2e]/80 text-gray-700 dark:text-gray-200 text-base md:text-lg">
          {{ $t('footer.slogan') }}
        </p>
      </div>
    </div>

    <!-- 导航网格 -->
    <NavGrid />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: () => t('seo.title'),
  meta: [{ name: 'description', content: () => t('seo.description') }]
})
</script>
