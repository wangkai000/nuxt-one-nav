<template>
  <a
    :href="item.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group flex flex-col items-center text-center p-4 bg-white dark:bg-[#1e1e3a] rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:-translate-y-1"
    style="box-shadow: 0 1px 2px rgba(0,0,0,0.04);"
    @mouseenter="$event.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'"
    @mouseleave="$event.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)'"
  >
    <!-- 图标 -->
    <div class="w-14 h-14 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center mb-3 overflow-hidden">
      <img
        v-if="!iconErrorMap[item.id]"
        :src="getIconUrl(item)"
        :alt="item.title"
        class="w-9 h-9 object-contain"
        loading="lazy"
        @error="onIconError(item.id)"
      />
      <Icon v-else :name="getFallbackIcon(item)" class="w-7 h-7 text-gray-400" />
    </div>

    <!-- 标题 -->
    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate w-full group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
      {{ item.title }}
    </h3>

    <!-- 描述 -->
    <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
      {{ item.description }}
    </p>
  </a>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { NavItem } from '~/types/nav'

const props = defineProps<{ item: NavItem }>()

// 每个卡片独立的图标错误状态
const iconErrorMap = reactive<Record<string, boolean>>({})

const onIconError = (id: string) => {
  iconErrorMap[id] = true
}

// 从网址提取域名获取 favicon
const getFaviconFromUrl = (url: string): string => {
  return `${url.replace(/\/$/, '')}/favicon.ico`
}

// 获取图标 URL：优先用 item.icon，否则从 URL 生成
const getIconUrl = (item: NavItem): string => {
  // 已有 icon 且不是 simple-icons/mdi 格式
  if (item.icon && !item.icon.startsWith('simple-icons:') && !item.icon.startsWith('mdi:')) {
    return item.icon
  }
  // 直接拼接 /favicon.ico
  return getFaviconFromUrl(item.url)
}

// 获取兜底图标：根据分类获取对应的图标
const getFallbackIcon = (item: NavItem): string => {
  // 如果有 iconName 就用
  if (item.iconName) return item.iconName

  // 根据网址域名特征返回合适的图标
  const url = item.url.toLowerCase()
  if (url.includes('github')) return 'mdi:github'
  if (url.includes('bilibili') || url.includes('b23.tv')) return 'mdi:youtube'
  if (url.includes('youtube')) return 'mdi:youtube'
  if (url.includes('twitter') || url.includes('x.com')) return 'mdi:twitter'
  if (url.includes('juejin')) return 'mdi:language-javascript'
  if (url.includes('zhihu')) return 'mdi:chat-processing-outline'
  if (url.includes('taobao') || url.includes('tmall')) return 'mdi:shopping'
  if (url.includes('jd.com')) return 'mdi:shopping'
  if (url.includes('baidu')) return 'mdi:search'
  if (url.includes('google')) return 'mdi:google'
  if (url.includes('netflix')) return 'mdi:netflix'
  if (url.includes('music') || url.includes('y.qq.com')) return 'mdi:music-note'

  // 默认通用图标
  return 'mdi:web'
}
</script>
