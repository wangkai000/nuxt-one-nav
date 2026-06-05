// Nuxt 4 配置文件
// 文档: https://nuxt.com.cn/docs/configuration/configuration-reference

export default defineNuxtConfig({
  // 兼容日期，用于确保 Nuxt 版本兼容性
  compatibilityDate: '2024-11-01',

  // Nuxt 4 兼容模式
  future: {
    compatibilityVersion: 4
  },

  // 关闭 Nuxt DevTools（生产环境建议关闭）
  devtools: { enabled: false },

  // ========== 样式配置 ==========
  css: [
    // 关键 CSS - 优先加载，防止 FOUC
    '~/assets/css/critical.css',
    // 全局 CSS 文件
    '~/assets/css/main.css'
    // Element Plus 样式由 @element-plus/nuxt 模块自动处理
  ],

  // ========== Nuxt 模块 ==========
  // 模块会自动导入并配置第三方库
  modules: [
    '@element-plus/nuxt',      // Element Plus Vue 3 组件库
    '@nuxtjs/color-mode',      // 暗色模式支持
    '@vite-pwa/nuxt'          // PWA 支持
  ],

  // ========== PWA 配置 ==========
  pwa: {
    // SSG 静态站点用 generateSW 策略
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    manifest: {
      name: '基米导航',
      short_name: '基米导航',
      description: '基米导航，精选高质量网站导航，开发工具、AI 服务、云平台一站直达',
      theme_color: '#3b82f6',
      background_color: '#f5f5f7',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/favicon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/favicon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      // SSG 模式：导航全部回落到 index.html
      navigateFallback: '/',
      // 静态资源走缓存优先策略（CDN/静态托管友好）
      runtimeCaching: [
        {
          // JS/CSS 走 StaleWhileRevalidate（缓存可用时即时响应，同时后台更新）
          urlPattern: /^https?:\/\/.*\.(js|css)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-js-css',
            expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }
          }
        },
        {
          // 图片走 CacheFirst（图片不常变，充分利用缓存）
          urlPattern: /^https?:\/\/.*\.(png|jpg|jpeg|gif|svg|webp|ico)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-images',
            expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }
          }
        },
        {
          // 字体走 CacheFirst
          urlPattern: /^https?:\/\/.*\.(woff|woff2|ttf|otf|eot)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-fonts',
            expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 }
          }
        },
        {
          // 外部 API/数据走 NetworkFirst（确保拿到最新内容）
          urlPattern: /^https?:\/\/api\//,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 10,
            expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 }
          }
        }
      ]
    },
    // 开发环境关闭 PWA（避免干扰开发体验）
    devOptions: {
      enabled: false,
      type: 'module'
    },
    // 客户端行为配置
    client: {
      installPrompt: true
    }
  },

  // ========== Element Plus 配置 ==========
  elementPlus: {
    // 使用 CSS 导入方式（替代 SCSS）
    importStyle: 'css'
  },

  // ========== 构建配置 ==========
  build: {
    // 需要在客户端转译的依赖（避免 SSR 问题）
    transpile: ['@iconify/vue'],
    // 提取 CSS 到单独文件，确保优先加载
    extractCSS: true
  },

  // ========== 组件自动导入 ==========
  // 配置 components 目录下的组件自动导入
  components: [
    {
      path: '~/components',
      // true: 组件名为 LayoutSidebar（带路径前缀）
      // false: 组件名为 Sidebar（不带路径前缀）
      pathPrefix: false
    }
  ],

  // ========== 暗色模式配置 ==========
  colorMode: {
    // 暗色 class 后缀（空字符串表示直接使用 'dark'）
    classSuffix: '',
    // 默认颜色模式: 'system' | 'light' | 'dark'
    preference: 'system',
    // 系统不支持时的备用模式
    fallback: 'light'
  },

  // ========== PostCSS 配置 ==========
  postcss: {
    plugins: {
      tailwindcss: {},    // Tailwind CSS
      autoprefixer: {}   // 自动添加浏览器前缀
    }
  },

  // ========== 应用全局配置 ==========
  app: {
    head: {
      // HTML 标题
      title: '基米导航 - Go 前后端 跨平台 Web3 AI 开发者资源导航',

      // HTML 标签属性（动态语言由 i18n 处理）
      htmlAttrs: {},

      // Meta 标签（SEO 和社交分享）
      meta: [
        // 基础 SEO
        { name: 'description', content: '基米导航，精选开发者技术栈导航。Go、Node.js、Bun、Rust 后端生态，React、Vue、Angular 前端框架，uni-app、React Native、Flutter 跨平台开发，OpenAI、Stable Diffusion AI 平台，Web3 区块链、以太坊、Solana 开发工具，Docker、Kubernetes 云原生部署一站直达。' },
        { name: 'keywords', content: '基米导航,开发者导航,Go,Node.js,Bun,Rust,React,Vue,Angular,uni-app,React Native,Flutter,AI导航,OpenAI,Web3,区块链,Solana,以太坊,TypeScript,全栈开发,跨平台开发,云原生,Docker,Kubernetes,开发工具,资源导航,天渺studio' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: '天渺studio' },
        { name: 'robots', content: 'index, follow' },
        { name: 'revisit-after', content: '7 days' },

        // Open Graph（Facebook/微信等社交平台分享）
        { property: 'og:title', content: '基米导航 - Go 前后端 跨平台 Web3 AI 开发者资源导航' },
        { property: 'og:description', content: '精选 Go、Node.js、Bun、Rust 后端生态，React、Vue 前端框架，uni-app、React Native、Flutter 跨平台，OpenAI、DeepSeek AI 服务，Web3 区块链开发工具，Docker 云原生部署一站直达。' },
        { property: 'og:url', content: 'https://tianmiao.site' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://s21.ax1x.com/2024/12/22/pAXtJat.jpg' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:site_name', content: '基米导航' },

        // Twitter Card（Twitter 分享）
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '基米导航 - Go 前后端 跨平台 Web3 AI 开发者资源导航' },
        { name: 'twitter:description', content: '精选 Go、Node.js、Bun、Rust 后端生态，React、Vue 前端框架，uni-app、React Native、Flutter 跨平台，Web3 区块链，AI 服务，云原生部署一站式导航。' },
        { name: 'twitter:image', content: 'https://s21.ax1x.com/2024/12/22/pAXtJat.jpg' }
      ],

      // Link 标签（引入外部资源）
      link: [
        // 网站 Favicon
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        // { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon-192x192.png' },
        // RSS 订阅
        { rel: 'alternate', type: 'application/rss+xml', title: '基米导航 RSS', href: 'https://blog.tianmiao.site/feed.xml' },
        // 作者链接
        { rel: 'author', href: 'https://tianmiao.site' },
        // 规范 URL（避免重复内容）
        { rel: 'canonical', href: 'https://tianmiao.site' },
        // Sitemap
        { rel: 'sitemap', type: 'application/xml', title: 'Sitemap', href: '/sitemap.xml' }
      ],

      // 关键 CSS 内联 - 防止 FOUC
      style: [
        {
          children: `
            /* 关键 CSS - 防止页面闪烁 */
            html { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
            body { margin: 0; background-color: #f5f5f7; }
            .dark body { background-color: #1a1a2e; }
            /* 隐藏未渲染内容 */
            [v-cloak] { display: none !important; }
          `,
          type: 'text/css'
        }
      ],

      // JSON-LD 结构化数据（搜索引擎富摘要）
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: '基米导航',
            url: 'https://tianmiao.site',
            description: '精选开发者技术栈导航，Go、Node.js、Bun、Rust 后端生态，React、Vue、Angular、Svelte 前端框架，uni-app、React Native、Flutter 跨平台开发，AI 服务、Web3 区块链、云原生部署一站式资源汇聚。',
            author: {
              '@type': 'Person',
              name: '天渺studio'
            },
            inLanguage: 'zh-CN',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://tianmiao.site/search?q={search_term_string}'
              },
              'query-input': 'required name=search_term_string'
            }
          })
        }
      ]
    }
  },

  // ========== SSR 配置 ==========
  // true:  启用 SSR（用于 SSG 静态生成 nuxt generate）
  // false: CSR 模式（仅客户端渲染 nuxt build）
  // 注意: nuxt generate 必须启用 SSR 才能预渲染页面
  ssr: true,

  // ========== TypeScript 配置 ==========
  typescript: {
    // 启用严格类型检查
    strict: true
  },

  // ========== 构建钩子：MD → JSON ==========
  hooks: {
    'build:before'() {
      const { execSync } = require('child_process')
      const { resolve } = require('path')
      const script = resolve(__dirname, 'scripts/build-nav-data.mjs')
      execSync(`node "${script}"`, { stdio: 'inherit' })
    }
  },

  // ========== Nitro 服务器配置 ==========
  // 仅在 SSR/SSG 模式下生效
  nitro: {
    prerender: {
      // 预渲染失败时不中断构建（可能有一些 SSR 警告但仍生成静态文件）
      failOnError: false
    }
  },


})
