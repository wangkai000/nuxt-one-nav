# MyNuxtNav 导航站

[中文](./README.md) | [English](./README_en.md)

基于 **Nuxt 4 + TypeScript + Element Plus + Tailwind CSS** 的纯静态导航站。数据源使用 Markdown 格式管理，构建时自动生成离线 JSON，无需数据库。

## ✨ 特性

- 🎨 **精美 UI** — Element Plus 组件 + Tailwind CSS 样式
- 🌓 **深色模式** — 自动/手动切换，完整适配
- 🔍 **实时搜索** — 顶部栏搜索框，支持 ⌘K / Ctrl+K 快捷键
- 📱 **响应式** — 完美适配桌面与移动端
- ⚡ **纯静态 SSG** — 构建后无需服务端，部署简单，访问飞快
- 🧭 **侧边栏菜单** — 支持二级子分类，清晰层级结构
- 🎯 **快捷键** — ⌘K 快速聚焦搜索，Esc 清空
- 💎 **细节打磨** — hover 动画、渐变背景、徽章标记
- 🎨 **彩色图标** — Iconify 彩色图标 + 技术栈智能匹配
- 📝 **Markdown 数据源** — 用 Markdown 管理导航数据，Git 友好
- 🔗 **网站详情页** — 点击卡片查看详细信息，新标签页打开

## 🚀 快速开始

**Node.js >= 22.13.0**

```bash
# 1. 安装依赖
npm install

# 2. 开发模式
npm run dev          # http://localhost:3000

# 3. 生成静态文件（自动执行 MD → JSON 解析）
npm run generate

# 4. 预览构建结果
npm run preview
```

## 📦 SSG 静态打包

本项目是 **纯静态 SSG（Static Site Generation）** 项目，构建后生成纯 HTML/CSS/JS 文件，无需 Node.js 服务端。

### 打包命令

```bash
# 完整构建流程：
# 1. 解析 data/nav-data.md → data/nav-data.generated.json
# 2. 生成静态页面到 .output/public/
npm run generate
```

构建完成后，`.output/public/` 目录包含所有静态文件，可直接部署到：
- **Vercel** / **Netlify**（推荐，自动部署）
- **GitHub Pages** / **Cloudflare Pages** / **Gitee Pages**
- **Nginx** / Apache
- 任何静态托管服务

## 📝 如何添加新的资源

所有导航数据统一在 `data/nav-data.md` 中维护，使用 Markdown 语法：

### 添加网站

```markdown
- [网站名称](https://example.com) - 网站描述 | icon: https://favicon.ico | tags: react, typescript
```

### 添加一级分类

```markdown
# 分类名称
> id: category-id | icon: fluent-emoji:rocket

- [网站](https://example.com) - 描述
```

### 添加二级子分类

```markdown
# 父分类
> id: parent-id | icon: fluent-emoji:folder

## 子分类名称
> id: child-id | icon: fluent-emoji:star

- [网站](https://example.com) - 描述
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| 标题 | ✅ | `[网站名称](url)` |
| URL | ✅ | 网站链接 |
| 描述 | ✅ | `-` 后面的描述文字 |
| icon | ❌ | 图标 URL 或 Iconify 图标名（留空自动匹配） |
| tags | ❌ | 标签（逗号分隔），用于搜索和图标匹配 |

## 🎨 如何切换图标

### 方式一：使用 Iconify 图标（推荐）

```markdown
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架 | icon: logos:vue | tags: vue, framework
```

### 方式二：使用网站 Favicon

```markdown
- [GitHub](https://github.com/) - 代码托管平台 | icon: https://github.com/favicon.ico | tags: git, hosting
```

### 方式三：留空自动匹配

```markdown
- [React](https://react.dev/) - 声明式 UI 库 | tags: react, javascript
```

系统会根据 `tags` 自动匹配对应的技术栈图标。

## 🌟 为什么使用 Iconify 图标库

本项目使用 [Iconify](https://iconify.design) 作为图标解决方案，优势如下：

| 特性 | 说明 |
|------|------|
| 🎨 **彩色图标** | 支持 `logos:`、`fluent-emoji:` 等彩色图标集，比单色图标更美观 |
| 📦 **海量图标** | 200,000+ 图标，涵盖所有主流技术栈、品牌 Logo |
| ⚡ **按需加载** | 仅加载使用的图标，不影响性能 |
| 🔍 **易于查找** | [Icônes](https://icones.js.org) 可视化搜索图标 |
| 💡 **智能匹配** | 根据网站 URL、tags 自动匹配最佳图标 |

### 常用图标集

| 图标集 | 前缀 | 示例 |
|--------|------|------|
| 技术栈 Logo | `logos:` | `logos:vue`, `logos:react`, `logos:typescript` |
| 彩色 Emoji | `fluent-emoji:` | `fluent-emoji:rocket`, `fluent-emoji:robot` |
| Material Design | `mdi:` | `mdi:home`, `mdi:github` |
| Simple Icons | `simple-icons:` | `simple-icons:github`, `simple-icons:nuxt` |

### 图标查找

访问 [Icônes](https://icones.js.org) 搜索图标，复制图标名称即可使用。

## 📊 项目数据

当前收录 **250+** 个网站资源，**14** 个主分类：

| 分类 | 说明 |
|------|------|
| AI 工具 | AI 导航、写作、开发框架、本地运行、API、编程助手、可视化平台 |
| Web3.0 | 区块链、DeFi、NFT、智能合约 |
| 前端生态 | React/Vue/Angular/Svelte、构建工具、WebGL 3D、AI 开发库、WebGIS 地图 |
| Node.js 框架 | Web 框架、多线程/并发、数据库 ORM |
| Go 生态 | Gin、Echo、Fiber 等主流框架 |
| 移动开发 | Flutter、React Native、uni-app 等 |
| 桌面应用 | Electron、Tauri |
| 更多... | 游戏引擎、实用工具、资源导航、开发者社区 |

## 🛠 技术栈

| 技术 | 用途 | 版本 |
|------|------|------|
| [Nuxt 4](https://nuxt.com) | 全栈框架 (SSG) | ^3.14 |
| [Vue 3](https://vuejs.org) | 渐进式 JavaScript 框架 | ^3.5 |
| [TypeScript](https://www.typescriptlang.org) | 类型安全 | ^5.x |
| [Element Plus](https://element-plus.org) | Vue 3 组件库 | ^2.9 |
| [Tailwind CSS](https://tailwindcss.com) | 原子化 CSS 框架 | ^3.x |
| [Iconify](https://iconify.design) | 统一图标框架 | ^4.1 |

## 📁 项目结构

```
one-nav-ssg/
├── data/
│   ├── nav-data.md              # ⭐ 导航数据源（唯一维护入口）
│   ├── nav-data.ts              # 数据读取层
│   └── nav-data.generated.json  # 构建产物（勿手动编辑）
├── scripts/
│   └── build-nav-data.mjs       # 构建期 MD → JSON 解析器
├── pages/
│   ├── index.vue                # 首页
│   ├── about.vue                # 关于页
│   └── detail/[id].vue          # 网站详情页
├── components/
│   ├── layout/                  # 布局组件
│   ├── nav/                     # 导航组件
│   └── common/                  # 通用组件
├── nuxt.config.ts               # Nuxt 配置
└── app.vue                      # 应用入口
```

## 🌐 浏览器支持

Chrome 90+ / Firefox 88+ / Safari 14+ / Edge 90+

## 📄 开源协议

MIT

## 🙏 致谢

- [Nuxt 4](https://nuxt.com) · [Tailwind CSS](https://tailwindcss.com) · [Element Plus](https://element-plus.org) · [Iconify](https://iconify.design) · [One Nav](https://www.iotheme.cn)

---

**环境要求**: Node.js 18+
