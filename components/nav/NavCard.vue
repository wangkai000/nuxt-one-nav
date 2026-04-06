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
    <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 flex items-center justify-center mb-3 overflow-hidden relative">
      <!-- 加载中的占位符 -->
      <div
        v-if="!iconLoadedMap[item.id] && !iconErrorMap[item.id]"
        class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 animate-pulse"
      />

      <!-- 图片图标 -->
      <img
        v-if="!iconErrorMap[item.id]"
        :src="getIconUrl(item)"
        :alt="item.title"
        class="w-9 h-9 object-contain relative z-10 transition-opacity duration-300"
        :class="{ 'opacity-0': !iconLoadedMap[item.id], 'opacity-100': iconLoadedMap[item.id] }"
        loading="lazy"
        decoding="async"
        @error="onIconError(item.id)"
        @load="onIconLoad(item.id)"
      />

      <!-- 兜底图标 -->
      <div v-else class="relative z-10 flex items-center justify-center">
        <Icon :icon="getFallbackIcon(item)" class="w-8 h-8" />
      </div>
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

// 每个卡片独立的图标状态
const iconErrorMap = reactive<Record<string, boolean>>({})
const iconLoadedMap = reactive<Record<string, boolean>>({})

const onIconError = (id: string) => {
  iconErrorMap[id] = true
}

const onIconLoad = (id: string) => {
  iconLoadedMap[id] = true
}

// 从网址提取域名获取 favicon
const getFaviconFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return `${urlObj.origin}/favicon.ico`
  } catch {
    return `${url.replace(/\/$/, '')}/favicon.ico`
  }
}

// 获取图标 URL：优先用 item.icon，否则从 URL 生成
const getIconUrl = (item: NavItem): string => {
  // 已有 icon 且不是 simple-icons/mdi/fluent-emoji 格式
  if (item.icon && !item.icon.startsWith('simple-icons:') && !item.icon.startsWith('mdi:') && !item.icon.startsWith('fluent-emoji:') && !item.icon.startsWith('logos:')) {
    return item.icon
  }
  // 从 URL 获取 favicon
  return getFaviconFromUrl(item.url)
}

// 分类图标映射
const categoryIconMap: Record<string, string> = {
  'ai': 'fluent-emoji:robot',
  'web3': 'logos:ethereum',
  'web3-ui': 'logos:metamask-icon',
  'smart-contract-framework': 'logos:solidity',
  'smart-contract-lang': 'vscode-icons:file-type-solidity',
  'frontend': 'logos:javascript',
  'frontend-react': 'logos:react',
  'frontend-vue': 'logos:vue',
  'frontend-other': 'logos:svelte-icon',
  'nodejs': 'logos:nodejs-icon',
  'bun-ecosystem': 'logos:bun',
  'css-framework': 'logos:tailwindcss-icon',
  'build-tool': 'logos:vitejs',
  'ui-lib': 'logos:storybook-icon',
  'game-engine': 'fluent-emoji:video-game',
  'tools': 'fluent-emoji:toolbox',
  'resources': 'fluent-emoji:world-map',
  'game-community': 'fluent-emoji:video-game',
  'dev-community': 'fluent-emoji:technologist',
  'learning': 'fluent-emoji:books',
}

// 域名图标映射
const domainIconMap: Record<string, string> = {
  'github': 'logos:github-icon',
  'gitlab': 'logos:gitlab',
  'gitee': 'logos:gitee',
  'bilibili': 'logos:bilibili',
  'youtube': 'logos:youtube-icon',
  'twitter': 'logos:twitter',
  'x.com': 'logos:twitter',
  'juejin': 'logos:juejin',
  'zhihu': 'logos:zhihu',
  'taobao': 'logos:taobao',
  'tmall': 'logos:taobao',
  'jd': 'logos:jd',
  'baidu': 'logos:baidu',
  'google': 'logos:google-icon',
  'netflix': 'logos:netflix',
  'qq': 'logos:qq',
  'wechat': 'logos:wechat',
  'vuejs': 'logos:vue',
  'react': 'logos:react',
  'angular': 'logos:angular-icon',
  'svelte': 'logos:svelte-icon',
  'nextjs': 'logos:nextjs-icon',
  'nuxt': 'logos:nuxt-icon',
  'vercel': 'logos:vercel-icon',
  'stackoverflow': 'logos:stackoverflow-icon',
  'discord': 'logos:discord-icon',
  'telegram': 'logos:telegram',
  'reddit': 'logos:reddit-icon',
  'medium': 'logos:medium-icon',
  'dev.to': 'logos:dev',
}

// 获取兜底图标
const getFallbackIcon = (item: NavItem): string => {
  // 1. 优先使用 item.iconName
  if (item.iconName) return item.iconName

  // 2. 根据分类获取图标
  if (item.category && categoryIconMap[item.category]) {
    return categoryIconMap[item.category]
  }

  // 3. 根据域名获取图标
  const url = item.url.toLowerCase()
  for (const [domain, icon] of Object.entries(domainIconMap)) {
    if (url.includes(domain)) {
      return icon
    }
  }

  // 4. 根据标签获取图标
  if (item.tags) {
    const tags = item.tags.map(t => t.toLowerCase())
    if (tags.some(t => ['vue', 'vuejs'].includes(t))) return 'logos:vue'
    if (tags.some(t => ['react'].includes(t))) return 'logos:react'
    if (tags.some(t => ['angular'].includes(t))) return 'logos:angular-icon'
    if (tags.some(t => ['svelte'].includes(t))) return 'logos:svelte-icon'
    if (tags.some(t => ['node', 'nodejs'].includes(t))) return 'logos:nodejs-icon'
    if (tags.some(t => ['python'].includes(t))) return 'logos:python'
    if (tags.some(t => ['typescript', 'ts'].includes(t))) return 'logos:typescript-icon'
    if (tags.some(t => ['javascript', 'js'].includes(t))) return 'logos:javascript'
    if (tags.some(t => ['rust'].includes(t))) return 'logos:rust'
    if (tags.some(t => ['go', 'golang'].includes(t))) return 'logos:go'
    if (tags.some(t => ['docker'].includes(t))) return 'logos:docker-icon'
    if (tags.some(t => ['kubernetes', 'k8s'].includes(t))) return 'logos:kubernetes'
    if (tags.some(t => ['aws'].includes(t))) return 'logos:aws'
    if (tags.some(t => ['web3', 'blockchain'].includes(t))) return 'logos:ethereum'
    if (tags.some(t => ['ai', 'gpt', 'llm'].includes(t))) return 'fluent-emoji:robot'
  }

  // 5. 默认图标
  return 'fluent-emoji:globe-with-meridians'
}
</script>
