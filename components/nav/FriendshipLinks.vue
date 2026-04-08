<template>
  <div id="friendship-links" class="mt-12 mb-8 scroll-mt-20">
    <!-- 分类标题 -->
    <div class="flex items-center gap-3 mb-4">
      <Icon name="fluent-emoji:handshake" class="w-5 h-5 text-gray-400" />
      <h2 class="text-lg font-bold text-gray-900 dark:text-white">友情链接</h2>
      <span class="text-sm text-gray-500">({{ friendLinks.length }})</span>
      <div class="flex-1 h-px bg-gray-200 dark:bg-gray-800"></div>
    </div>

    <!-- 链接列表 -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      <a
        v-for="item in friendLinks"
        :key="item.id"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-3 p-4 bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200"
      >
        <img
          :src="item.icon"
          :alt="item.title"
          class="w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
        />
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {{ item.title }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
            {{ item.description }}
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { navData } from '~/data/nav-data'

// 获取友情链接
const friendLinks = computed(() => {
  return navData.filter(item => item.category === 'friendship-links').sort((a, b) => a.order - b.order)
})
</script>
