# My Nuxt Nav 导航站点
[English](./README_en.md)

一个基于 **Nuxt 3 + TypeScript + Element Plus +Tailwind CSS** 的静态导航站点，高保真（尽量😂）复刻 One Nav 模板（老版本）的 UI 风格。

## ✨ 特性

- 🎨 **精美 UI** - Element Plus 组件 + Tailwind CSS 样式
- 🌓 **深色模式** - 自动/手动切换，完整适配
- 🔍 **实时搜索** - 顶部栏搜索框，支持 ⌘K/Ctrl+K 快捷键
- 📱 **响应式** - Element Plus 断点系统，完美适配多端
- ⚡ **SSG** - 静态生成，部署简单，访问飞快
- 🧭 **侧边栏菜单** - Element Plus Menu 组件，支持二级分类
- 🎯 **快捷键** - ⌘K 快速聚焦搜索，Esc 清空
- 💎 **细节打磨** - hover 动画、渐变边框、徽章标记
- 🎨 **彩色图标** - Iconify 彩色图标，视觉更丰富
- 🚀 **返回顶部** - 滚动后显示返回顶部按钮
- ⏳ **加载动画** - Nuxt 加载指示器 + Element Plus 加载状态
- 🔗 **外链支持** - GitHub、Gitee 快速访问

## 技术栈

| 技术 | 用途 | 版本 |
|------|------|------|
| [Nuxt 3](https://nuxt.com) | 全栈框架 (App Router + SSG) | ^3.x |
| [Vue 3](https://vuejs.org) | 渐进式 JavaScript 框架 | ^3.x |
| [TypeScript](https://www.typescriptlang.org) | 类型安全 | ^5.x |
| [Tailwind CSS](https://tailwindcss.com) | 原子化 CSS 框架 | ^3.x |
| [Element Plus](https://element-plus.org) | Vue 3 组件库 | ^2.x |
| [Iconify](https://iconify.design) | 统一图标框架 | ^1.x |
| [@iconify/vue](https://iconify.design/docs/icon-components/vue) | Vue 图标组件 | ^4.x |
| [@nuxtjs/color-mode](https://color-mode.nuxtjs.org) | 深色模式支持 | ^3.x |
| [Vite](https://vitejs.dev) | 构建工具 | ^5.x |

## 快速开始

### 1. 安装依赖

```bash
cd one-nav-ssg
npm install
```

### 2. 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 3. 构建与预览

```bash
# 构建生产版本
npm run build

# 生成静态文件
npm run generate

# 预览生成结果
npm run preview
```

## 项目结构

```
one-nav-ssg/
├── components/              # 组件
│   ├── common/             # 通用组件
│   ├── layout/             # 布局组件
│   │   ├── AppHeader.vue   # 顶部导航栏
│   │   ├── AppFooter.vue   # 底部页脚
│   │   └── Sidebar.vue     # 侧边栏菜单
│   ├── nav/                # 导航组件
│   │   ├── NavCard.vue     # 网站卡片
│   │   ├── NavGrid.vue     # 网格布局
│   │   └── SearchBar.vue   # 搜索栏
│   ├── BackToTop.vue       # 返回顶部按钮
│   └── LoadingIndicator.vue # 加载指示器
├── composables/            # 组合式函数
│   ├── useSearch.ts       # 搜索逻辑
│   └── useTheme.ts        # 主题逻辑
├── data/                  # 数据
│   └── nav-data.ts        # 导航数据 (200+ 网站资源)
├── layouts/               # 页面布局
│   └── default.vue        # 默认布局 (含移动端抽屉)
├── pages/                 # 页面路由
│   └── index.vue          # 首页
├── plugins/               # 插件
├── public/                # 静态资源
├── types/                 # TypeScript 类型
│   └── nav.ts             # 导航类型定义
├── assets/                # 样式资源
│   └── css/
│       └── main.css       # 全局样式
├── app.vue                # 应用入口
├── nuxt.config.ts         # Nuxt 配置
├── tailwind.config.js     # Tailwind 配置
└── tsconfig.json          # TS 配置
```

## 数据分类

当前收录 **200+** 优质网站资源，分类如下：

| 分类 | 数量 | 说明 |
|------|------|------|
| 🤖 AI 工具 | 11 | ChatGPT、Claude、Midjourney 等 |
| ⬡ Web3.0 | 20 | 区块链、DeFi、NFT 相关 |
| 🦊 Web3 UI库 | 13 | RainbowKit、Web3Modal、Ant Design Web3 等 |
| ⬡ 智能合约框架 | 7 | Hardhat、Foundry、Truffle 等 |
| 📄 智能合约语言 | 8 | Solidity、Vyper、Rust(Solana) 等 |
| 📜 前端框架 | 24 | React/Vue/其他框架（二级菜单） |
| 🟩 Node.js框架 | 14 | Express、Koa、NestJS 等 |
| 🥯 Bun生态 | 8 | Bun 运行时及相关工具 |
| 🌊 CSS框架 | 8 | Tailwind CSS、Bootstrap 等 |
| ⚡ 构建工具 | 7 | Vite、Webpack、Rollup 等 |
| 📚 UI组件库 | 9 | Element Plus、Ant Design 等 |
| 🎮 游戏引擎 | 9 | Unity、Unreal、Godot 等 |
| 🧰 实用工具 | 5 | 开发效率工具 |
| 🗺️ 资源导航 | 23 | 设计资源、图库、图标 |
| 🎮 游戏社区 | 7 | 游戏相关社区 |
| 👨‍💻 开发者社区 | 6 | 技术社区、论坛 |
| 📖 学习 | 1 | 学习资源 |

## 自定义配置

### 添加网站

编辑 `data/nav-data.ts`：

```typescript
{
  id: 'unique-id',
  title: '网站名称',
  description: '网站描述',
  url: 'https://example.com',
  icon: 'https://example.com/favicon.ico', // 可选
  tags: ['标签1', '标签2'],
  category: 'category-id',
  order: 1,
}
```

### 添加分类

编辑 `data/nav-data.ts` 中的 `categories` 数组：

```typescript
{
  id: 'new-category',
  name: '新分类',
  icon: 'fluent-emoji:icon-name'  // 使用 Iconify 彩色图标
}
```

### 二级分类

支持二级菜单结构：

```typescript
{
  id: 'parent-category',
  name: '父分类',
  icon: 'fluent-emoji:icon',
  children: [
    { id: 'child-1', name: '子分类1', icon: 'fluent-emoji:icon1' },
    { id: 'child-2', name: '子分类2', icon: 'fluent-emoji:icon2' }
  ]
}
```

## Element Plus 组件使用

本项目大量使用 Element Plus 组件：

| 组件 | 用途 | 位置 |
|------|------|------|
| `el-container` | 页面布局容器 | `layouts/default.vue` |
| `el-header` | 顶部栏 | `layouts/default.vue` |
| `el-aside` | 侧边栏 | `components/layout/Sidebar.vue` |
| `el-main` | 主内容区 | `layouts/default.vue` |
| `el-menu` | 导航菜单 | `components/layout/Sidebar.vue` |
| `el-sub-menu` | 二级菜单 | `components/layout/Sidebar.vue` |
| `el-menu-item` | 菜单项 | `components/layout/Sidebar.vue` |
| `el-drawer` | 移动端抽屉菜单 | `layouts/default.vue` |
| `el-button` | 按钮 | `components/layout/AppHeader.vue` |
| `el-input` | 搜索输入框 | 顶部栏搜索 |
| `el-scrollbar` | 滚动条 | `components/layout/Sidebar.vue` |

### 主题定制

Element Plus 主题通过 `nuxt.config.ts` 配置：

```typescript
elementPlus: {
  themes: ['dark'],
  defaultLocale: 'zh-cn'
}
```

暗色模式通过 `@nuxtjs/color-mode` 自动切换。

## 部署

生成静态文件后，`dist/` 目录可直接部署到：

- **Vercel** / Netlify (推荐)
- **GitHub Pages**
- **Cloudflare Pages**
- **Gitee Pages**
- **Nginx** / Apache
- **任何静态托管服务**

### Gitee 部署

```bash
# 推送到 Gitee 仓库
git push origin main

# 在 Gitee 仓库设置中开启 Gitee Pages
```

### Vercel 部署示例

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel --prod
```

或者直接推送代码到 GitHub，连接 Vercel 自动部署。

## 性能优化

- ✅ 静态生成 (SSG) - 无需服务器
- ✅ 图标懒加载 - 性能优化
- ✅ 代码分割
- ✅ Tailwind JIT 按需生成
- ✅ Gzip/Brotli 压缩
- ✅ 实时加载指示器

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 开源协议

MIT

## 致谢

- [Nuxt 3](https://nuxt.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Element Plus](https://element-plus.org)
- [Iconify](https://iconify.design)
- [One Nav](https://www.iotheme.cn)

---

**提示**: 首次运行前请确保已安装 Node.js 18+。

**欢迎收藏**: MyNuxtNav导航网 | Ctrl (⌘) + D
