# AGENTS.md - 基米导航

> 本项目是 **Nuxt 4 + TypeScript + Element Plus + Tailwind CSS** 的纯静态导航站（SSG）。
> 数据源使用 Markdown 格式管理，构建时自动生成 JSON，无需数据库。

---

## 项目概览

| 属性 | 值 |
|------|-----|
| 名称 | 基米导航 |
| 技术栈 | Nuxt 4 · Vue 3 · TypeScript · Element Plus · Tailwind CSS |
| 构建模式 | SSG（Static Site Generation）纯静态 |
| 数据源 | `data/nav-data.md` → `data/nav-data.generated.json` |
| 部署 | 任何静态托管（Vercel / Netlify / GitHub Pages / Gitee Pages） |

---

## 目录结构

```
├── assets/css/           # 全局样式（critical.css · main.css）
├── components/           # Vue 组件
│   ├── common/           # 通用组件（Icon · ThemeToggle · InViewRender）
│   ├── layout/           # 布局组件（AppHeader · AppFooter · Sidebar）
│   └── nav/              # 导航组件（NavCard · NavGrid · SearchBar · FriendshipLinks）
├── composables/          # 组合式函数
├── config/               # 站点配置（site.zh.ts）
├── data/                 # ⭐ 导航数据源
│   ├── nav-data.md       # Markdown 数据源（人工维护）
│   └── nav-data.generated.json  # 构建自动生成（勿手动修改）
├── layouts/              # Nuxt 布局
├── pages/                # 页面路由
├── plugins/              # Nuxt 插件
├── public/               # 静态资源（favicon · PWA 图标）
├── scripts/              # 构建脚本
│   └── build-nav-data.mjs    # MD → JSON 解析器
├── types/                # TypeScript 类型定义
├── utils/                # 工具函数
├── app.vue               # 根组件（加载动画 · 暗色模式同步）
└── nuxt.config.ts        # Nuxt 配置（PWA · Element Plus · 构建钩子）
```

---

## 快速命令

```bash
# 开发
npm run dev              # http://localhost:3000

# 构建（自动执行 MD → JSON）
npm run generate         # 输出到 .output/public/

# 预览构建结果
npm run preview

# 代码检查
npm run lint             # ESLint
npm run lint:fix         # ESLint 自动修复
npm run format           # Prettier 格式化
npm run typecheck        # TypeScript 类型检查

# 清理
npm run clean            # 删除 .nuxt .output dist
```

---

## 关键文件说明

| 文件 | 作用 | 修改频率 |
|------|------|----------|
| `data/nav-data.md` | 导航数据源 | 高（增删网站） |
| `scripts/build-nav-data.mjs` | MD 解析器 | 低（结构变更时） |
| `nuxt.config.ts` | 全局配置 | 低 |
| `app.vue` | 根布局 + 加载逻辑 | 低 |
| `config/site.zh.ts` | 站点元信息 | 低 |

---

## 数据流

```
data/nav-data.md
    ↓  node scripts/build-nav-data.mjs
    ↓  （nuxt.config.ts build:before hook 自动调用）
data/nav-data.generated.json
    ↓  Nuxt SSG 渲染
.output/public/  ← 纯静态 HTML/CSS/JS
```

---

## 添加导航资源

1. 编辑 `data/nav-data.md`
2. 运行 `node scripts/build-nav-data.mjs` 验证
3. 运行 `npm run generate` 构建
4. 部署 `.output/public/`

格式规范见 README.md「如何添加新的资源」章节。

---

## 迭代记录

| 版本 | 时间 | 变更 |
|------|------|------|
| v1.0 | 2024-12 | 项目初始化，Nuxt 4 + Element Plus + Tailwind CSS |
| v1.1 | 2025-01 | 添加 PWA 支持（`@vite-pwa/nuxt`） |
| v1.2 | 2025-03 | 添加暗色模式（`@nuxtjs/color-mode`） |
| v1.3 | 2025-05 | 添加搜索快捷键（⌘K / Ctrl+K） |
| v1.4 | 2025-06 | 添加 AI 项目文档（AGENTS.md · RULES.md · MEMORY.md） |

---

## 技术约束

- **Node.js >= 22.13.0**
- **SSG 模式**：无服务端运行时，所有数据必须在构建时确定
- **PWA**：使用 `@vite-pwa/nuxt`，SSG 策略为 `generateSW`
- **图标**：Iconify（`@iconify/vue`），支持 `logos:` `fluent-emoji:` `mdi:` 等前缀
- **样式**：Tailwind CSS + Element Plus CSS 变量，暗色模式通过 `@nuxtjs/color-mode`
