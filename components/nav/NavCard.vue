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
        <Icon :icon="getFallbackIcon(item)" class="w-8 h-8" />
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
  if (item.icon && !item.icon.startsWith('simple-icons:') && !item.icon.startsWith('mdi:') && !item.icon.startsWith('fluent-emoji:') && !item.icon.startsWith('logos:')) {
    return item.icon
  }
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
  if (item.iconName) return item.iconName
  if (item.category && categoryIconMap[item.category]) {
    return categoryIconMap[item.category]
  }
  const url = item.url.toLowerCase()
  for (const [domain, icon] of Object.entries(domainIconMap)) {
    if (url.includes(domain)) {
      return icon
    }
  }
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
  return 'fluent-emoji:globe-with-meridians'
}
</script>

<style scoped>
/* 仅在 hover 期间临时启用 GPU 合成层，用完即释放 */
.group:hover {
  will-change: transform;
}
</style>