<template>
  <div class="max-w-screen-2xl mx-auto">
    <!-- Hero 背景图片区域 -->
    <div class="relative mb-8 overflow-hidden rounded-2xl">
      <!-- 背景图片 -->
      <div class="absolute inset-0 hero-wallpaper"></div>

      <!-- 内容 -->
      <div class="relative px-8 py-12 md:py-16">
        <h1 class="inline px-4 py-2 rounded-lg bg-white/90 dark:bg-[#1a1a2e]/90 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {{ config.nav.about }} - {{ config.title }}
        </h1>
      </div>
    </div>

    <!-- 关于内容 -->
    <div class="bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-[2px] rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
      <div class="max-w-2xl mx-auto space-y-6 text-gray-700 dark:text-gray-300">
        <p class="text-lg leading-relaxed">
          精选高质量网站导航，开发工具、AI 服务、云平台一站直达
        </p>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">特色功能</h2>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-blue-500 mt-1">•</span>
              <span>精选高质量网站导航，开发工具、AI 服务、云平台一站直达</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-blue-500 mt-1">•</span>
              <span>搜索与筛选</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-blue-500 mt-1">•</span>
              <span>深色模式支持</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-blue-500 mt-1">•</span>
              <span>基于 Nuxt 4 构建</span>
            </li>
          </ul>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">联系方式</h2>
          <p>欢迎联系交换友链。</p>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">开源项目</h2>
          <p>本项目完全开源，欢迎 Star 和贡献代码。</p>
          <div class="flex flex-wrap gap-4">
            <a
              href="https://github.com/wangkai000/nuxt-one-nav"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <Icon icon="mdi:github" class="w-5 h-5" />
              <span>GitHub</span>
              <Icon icon="mdi:open-in-new" class="w-3.5 h-3.5 text-gray-400" />
            </a>
            <a
              href="https://gitee.com/wangkai000/my-nuxt-nav"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <Icon icon="simple-icons:gitee" class="w-5 h-5 text-red-500 dark:text-red-400" />
              <span>Gitee</span>
              <Icon icon="mdi:open-in-new" class="w-3.5 h-3.5 text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig().public.siteConfig

useHead({
  title: `${config.nav.about} - ${config.title}`,
  meta: [{ name: 'description', content: `${config.nav.about} ${config.title} - ${config.description}` }]
})
</script>
