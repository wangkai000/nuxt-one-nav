<template>
  <div class="max-w-screen-2xl mx-auto">
    <!-- Hero 极光背景区域 -->
    <div class="relative mb-8 overflow-hidden rounded-2xl">
      <!-- 极光背景 -->
      <div class="absolute inset-0 hero-gradient dark:hero-gradient-dark">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 dark:from-blue-600/30 dark:via-purple-600/20 dark:to-pink-600/30"></div>
      </div>

      <!-- 内容 -->
      <div class="relative px-8 py-12 md:py-16">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          发现精彩网站
        </h1>
        <p class="text-gray-600 dark:text-gray-300 text-base md:text-lg max-w-xl">
          精心挑选的高质量网站集合，助你高效工作与生活
        </p>
      </div>
    </div>

    <!-- 导航网格 -->
    <NavGrid />

    <!-- 友情链接 -->
    <FriendshipLinks />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'MyNuxtNav - 发现精彩网站',
  meta: [{ name: 'description', content: '精心挑选的高质量网站导航' }]
})
</script>
