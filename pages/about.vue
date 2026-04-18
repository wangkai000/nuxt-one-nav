<template>
  <div class="max-w-screen-2xl mx-auto">
    <!-- Hero 背景图片区域 -->
    <div class="relative mb-8 overflow-hidden rounded-2xl">
      <!-- 背景图片 -->
      <div class="absolute inset-0 hero-wallpaper"></div>

      <!-- 内容 -->
      <div class="relative px-8 py-12 md:py-16">
        <h1 class="inline px-4 py-2 rounded-lg bg-white/90 dark:bg-[#1a1a2e]/90 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          关于 MyNuxtNav
        </h1>
      </div>
    </div>

    <!-- 关于内容 -->
    <div class="bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
      <div class="max-w-2xl mx-auto space-y-6 text-gray-700 dark:text-gray-300">
        <p class="text-lg leading-relaxed">
          这是一个简洁高效的工具导航站。
        </p>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">导航站特点</h2>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-blue-500 mt-1">•</span>
              <span>精心收录高质量网站资源</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-blue-500 mt-1">•</span>
              <span>支持搜索过滤，快速定位</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-blue-500 mt-1">•</span>
              <span>适配深色模式，护眼舒适</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-blue-500 mt-1">•</span>
              <span>基于 Nuxt 3 构建，体验流畅</span>
            </li>
          </ul>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">联系方式</h2>
          <p>如果你有好的网站推荐，欢迎联系交换友链。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于 - MyNuxtNav',
  meta: [{ name: 'description', content: '关于 MyNuxtNav 导航站' }]
})
</script>