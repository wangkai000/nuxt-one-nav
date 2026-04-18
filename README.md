# MyNuxtNav 导航站
[中文](./README.md) | [English](./README_en.md)

基于 **Nuxt 3 + TypeScript + Element Plus + Tailwind CSS** 的静态导航站，高保真复刻 One Nav 的 UI 风格。数据源使用 Markdown 格式管理，构建时自动生成离线 JSON。

## ✨ 特性

- 🎨 **精美 UI** — Element Plus 组件 + Tailwind CSS 样式
- 🌓 **深色模式** — 自动/手动切换，完整适配
- 🔍 **实时搜索** — 顶部栏搜索框，支持 ⌘K / Ctrl+K 快捷键
- 📱 **响应式** — 完美适配桌面与移动端，移动端抽屉菜单
- ⚡ **SSG** — 静态生成，部署简单，访问飞快
- 🧭 **侧边栏菜单** — 支持二级分类，清晰展示层级结构
- 🎯 **快捷键** — ⌘K 快速聚焦搜索，Esc 清空
- 💎 **细节打磨** — hover 动画、渐变边框、徽章标记
- 🎨 **彩色图标** — Iconify 彩色图标 + 技术栈智能匹配
- 🚀 **返回顶部** — 滚动后显示返回顶部按钮
- ⏳ **加载动画** — Nuxt 加载指示器 + Element Plus 加载状态
- 📝 **Markdown 数据源** — 用 Markdown 管理导航数据，构建时自动解析
- 🔗 **外链支持** — GitHub、Gitee 快速访问

## 技术栈

| 技术 | 用途 | 版本 |
|------|------|------|
| [Nuxt 3](https://nuxt.com) | 全栈框架 (App Router + SSG) | ^3.14 |
| [Vue 3](https://vuejs.org) | 渐进式 JavaScript 框架 | ^3.5 |
| [TypeScript](https://www.typescriptlang.org) | 类型安全 | ^5.x |
| [Element Plus](https://element-plus.org) | Vue 3 组件库 | ^2.9 |
| [Tailwind CSS](https://tailwindcss.com) | 原子化 CSS 框架 | ^3.x |
| [Iconify](https://iconify.design) | 统一图标框架 | ^4.1 |
| [@nuxtjs/color-mode](https://color-mode.nuxtjs.org) | 深色模式支持 | ^3.5 |
| [Vite](https://vitejs.dev) | 构建工具 | ^6.x |

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev          # http://localhost:3000

# 生成静态文件（自动执行 MD → JSON 解析）
npm run generate

# 预览构建结果
npm run preview
```

## 项目结构

```
one-nav-ssg/
├── components/
│   ├── common/              # 通用组件
│   ├── layout/
│   │   ├── AppHeader.vue    # 顶部导航栏（搜索、外链）
│   │   ├── AppFooter.vue    # 底部页脚
│   │   └── Sidebar.vue      # 侧边栏菜单（二级分类）
│   ├── nav/
│   │   ├── NavCard.vue      # 网站卡片（图标智能匹配）
│   │   ├── NavGrid.vue      # 网格布局 + 筛选
│   │   └── SearchBar.vue    # 搜索栏
│   ├── BackToTop.vue
│   └── LoadingIndicator.vue
├── composables/
│   ├── useSearch.ts         # 搜索逻辑
│   └── useTheme.ts          # 主题逻辑
├── data/
│   ├── nav-data.md          # ⭐ 导航数据源（Markdown 格式，唯一维护入口）
│   ├── nav-data.ts          # 数据读取层（从 generated.json 导入）
│   └── nav-data.generated.json  # 构建产物，勿手动编辑
├── scripts/
│   └── build-nav-data.mjs   # 构建期 MD → JSON 解析器
├── server/api/
│   └── nav.get.ts           # 导航数据 API（搜索、分类筛选）
├── types/
│   └── nav.ts               # TypeScript 类型定义
├── pages/
│   ├── index.vue            # 首页（Hero + NavGrid）
│   └── about.vue            # 关于页
├── layouts/
│   └── default.vue          # 默认布局（移动端抽屉）
├── nuxt.config.ts           # Nuxt 配置（含 build:before 钩子）
├── app.vue                  # 应用入口
└── package.json
```

## 数据分类

当前收录 **276** 个网站资源，20 个分类：

| 分类 | 数量 | 说明 |
|------|------|------|
| 站长推荐 | 1 | 精选推荐 |
| AI 工具 | 11 | ChatGPT、Claude、Midjourney 等 |
| Web3.0 | 20 | 区块链、DeFi、NFT 相关 |
| Web3 库 | 13 | Ethers.js、Web3.js 等 |
| Web3 合约框架 | 7 | Hardhat、Foundry、Truffle 等 |
| Web3 合约语言 | 8 | Solidity、Vyper、Rust(Solana) 等 |
| 前端框架 | 75 | React/Vue/Angular/Svelte 等（含 7 个子分类） |
| Node.js 框架 | 12 | Express、Koa、NestJS 等（含 2 个子分类） |
| Go 生态 | 12 | Gin、Echo、Fiber 等 |
| 移动开发 | 8 | Flutter、React Native 等 |
| 桌面应用 | 6 | Electron、Tauri 等 |
| Bun 生态 | 5 | Bun 运行时及相关工具 |
| CSS 框架 | 8 | Tailwind CSS、Bootstrap 等 |
| 构建工具 | 28 | Vite、Webpack、Rollup、esbuild 等 |
| UI 组件库 | 60 | Element Plus、Ant Design、shadcn 等 |
| 游戏引擎 | 9 | Unity、Unreal、Godot 等 |
| 实用工具 | 5 | 开发效率工具 |
| 资源导航 | 23 | 设计资源、图库、图标 |
| 游戏社区 | 7 | 游戏相关社区 |
| 开发者 & 设计师社区 | 6 | 技术社区、论坛 |

## 管理导航数据

导航数据统一在 `data/nav-data.md` 中维护，使用 Markdown 语法：

### 添加网站

```markdown
- [网站名称](https://example.com) - 网站描述 | icon: https://favicon.ico | tags: react, typescript
```

### 添加分类

```markdown
# 新分类名
> id: new-category | icon: fluent-emoji:rocket
```

### 二级子分类

```markdown
# 父分类
> id: parent

## 子分类
> id: child-1 | icon: fluent-emoji:star

- [网站](https://example.com) - 描述
```

### 完整字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 网站标题 |
| `url` | ✅ | 网站链接 |
| `description` | ❌ | 网站描述 |
| `icon` | ❌ | 图标 URL（留空则根据 tags 自动匹配技术栈图标） |
| `tags` | ❌ | 标签（逗号分隔），用于搜索和图标匹配 |
| `hot` | ❌ | 标记为热门 |
| `new` | ❌ | 标记为新增 |

## 构建流程

```
nav-data.md ──(build:before hook)──> scripts/build-nav-data.mjs ──> nav-data.generated.json ──> SSG 产物
```

1. 编辑 `data/nav-data.md`
2. 执行 `npm run generate`（自动触发解析器）
3. 解析器生成 `data/nav-data.generated.json`
4. Nuxt 读取 JSON 完成 SSG 构建

## 部署

`npm run generate` 后，`.output/public/` 可直接部署到：

- **Vercel** / **Netlify**（推荐，自动部署）
- **GitHub Pages** / **Cloudflare Pages** / **Gitee Pages**
- **Nginx** / Apache
- 任何静态托管服务

## 浏览器支持

Chrome 90+ / Firefox 88+ / Safari 14+ / Edge 90+

## 开源协议

MIT

## 致谢

- [Nuxt 3](https://nuxt.com) · [Tailwind CSS](https://tailwindcss.com) · [Element Plus](https://element-plus.org) · [Iconify](https://iconify.design) · [One Nav](https://www.iotheme.cn)

---

**环境要求**: Node.js 18+
