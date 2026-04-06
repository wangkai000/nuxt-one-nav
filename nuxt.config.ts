export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  css: [
    '~/assets/css/main.css',
    'element-plus/theme-chalk/dark/css-vars.css'
  ],

  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/color-mode'
  ],

  // Element Plus 配置
  elementPlus: {
    importStyle: 'css'
  },

  // transpile 依赖
  build: {
    transpile: ['@iconify/vue']
  },

  // 组件自动导入配置
  components: [
    {
      path: '~/components',
      pathPrefix: false,  // 不使用路径前缀，如 Sidebar 而不是 LayoutSidebar
    }
  ],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  app: {
    head: {
      title: 'MyNuxtNav - 发现精彩网站',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { name: 'description', content: '精心挑选的高质量网站导航，助你高效工作与生活' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  // 修复：CSR 模式不需要 prerender
  ssr: false,

  typescript: {
    strict: true
  }
})
