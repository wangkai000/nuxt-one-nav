# ARCHITECTURE.md - 基米导航

> 本文件定义基米导航的技术架构。
> 适用于需要理解系统结构、排查问题或扩展功能的 AI 助手。

---

## 架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                        构建时                                │
│  data/nav-data.md  →  build-nav-data.mjs  →  nav-data.json  │
│                        (Node.js)                             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        运行时                                │
│  Nuxt SSG  →  .output/public/  →  静态托管                  │
│  (Vue 3 + Vite)                                              │
└─────────────────────────────────────────────────────────────┘
```

**核心原则**：纯静态 SSG，无服务端运行时，所有数据在构建时确定。

---

## 模块依赖图

```
app.vue
├── layouts/default.vue
│   ├── components/layout/AppHeader.vue
│   │   └── components/nav/SearchBar.vue
│   ├── components/layout/Sidebar.vue
│   └── components/layout/AppFooter.vue
└── pages/index.vue
    └── components/nav/NavGrid.vue
        ├── components/nav/NavCard.vue
        └── components/nav/FriendshipLinks.vue
```

**数据流**：
```
nav-data.generated.json
    ↓  useNavData() composable
    ↓  reactive state
NavGrid → NavCard (props)
```

---

## 构建流程

### 1. 数据准备阶段

```bash
node scripts/build-nav-data.mjs
```

- **输入**：`data/nav-data.md`
- **解析器**：自定义 Markdown 解析器（非 gray-matter）
- **输出**：`data/nav-data.generated.json`
- **触发时机**：
  - 手动运行
  - `npm run generate` 前自动执行（nuxt.config.ts `build:before` hook）

### 2. SSG 渲染阶段

```bash
npx nuxt generate
```

- **输入**：Vue 组件 + `nav-data.generated.json`
- **输出**：`.output/public/`（纯静态 HTML/CSS/JS）
- **关键配置**：
  - `ssr: true`（预渲染 HTML）
  - `nitro.prerender.routes`：预渲染所有分类页面

### 3. 部署阶段

- **产物**：`.output/public/`
- **托管**：任何静态托管服务（Vercel / Netlify / GitHub Pages / Gitee Pages）
- **无服务端依赖**：不需要 Node.js 运行时

---

## 核心模块说明

### 数据层

| 文件 | 职责 | 关键函数 |
|------|------|----------|
| `scripts/build-nav-data.mjs` | MD → JSON 解析 | `parseMarkdown()`, `extractMetadata()` |
| `composables/useNavData.ts` | 数据读取与响应式 | `loadNavData()`, `currentCategory` |
| `types/nav.ts` | TypeScript 类型定义 | `NavItem`, `Category`, `NavConfig` |

### 视图层

| 组件 | 职责 | 关键 Props |
|------|------|------------|
| `NavGrid` | 分类网格布局 | `category: Category` |
| `NavCard` | 单个网站卡片 | `item: NavItem` |
| `SearchBar` | 全局搜索 | `items: NavItem[]` |
| `Sidebar` | 分类导航 | `categories: Category[]` |

### 配置层

| 文件 | 职责 |
|------|------|
| `nuxt.config.ts` | Nuxt 配置、PWA、构建钩子 |
| `config/site.zh.ts` | 站点元信息（标题、描述、作者） |
| `app.vue` | 根布局、加载状态、暗色模式同步 |

---

## 状态管理

**无 Pinia/Vuex**，使用 Vue 3 Composition API 的响应式系统：

```typescript
// composables/useNavData.ts
const navData = ref<NavConfig | null>(null)
const currentCategory = ref<string>('all')
const searchQuery = ref<string>('')
```

**持久化状态**（localStorage）：
- 暗色模式偏好
- 搜索历史（最近 10 条）
- 侧边栏展开/折叠状态

---

## 性能策略

| 策略 | 实现 | 效果 |
|------|------|------|
| SSG 预渲染 | `nuxt generate` | 首屏 < 1s |
| 图片懒加载 | `loading="lazy"` | 减少初始请求 |
| 组件懒加载 | `defineAsyncComponent` | 按需加载搜索框 |
| PWA 缓存 | `generateSW` | 二次访问离线可用 |
| 图标按需 | Iconify 动态加载 | 只加载可见图标 |

---

## 扩展点

### 添加新页面

1. 在 `pages/` 创建 `.vue` 文件
2. Nuxt 自动路由，无需注册
3. 如需新布局，在 `layouts/` 创建

### 添加新数据源

1. 修改 `scripts/build-nav-data.mjs` 解析器
2. 更新 `types/nav.ts` 类型定义
3. 同步更新 `data/nav-data.md` 格式规范

### 添加新功能

1. 优先使用 `composables/` 封装逻辑
2. 组件放在 `components/{category}/`
3. 全局样式放在 `assets/css/`

---

## 技术债务

| 问题 | 影响 | 计划 |
|------|------|------|
| app.vue SSR 500 | 服务端渲染报错 | 修复 `useNavData` import |
| i18n 国际化暂停 | 仅中文 | 等待需求确认 |
| nav-data.md 格式脆弱 | 解析失败风险 | 考虑 YAML frontmatter |

---

## 相关文档

- `AGENTS.md` — 项目概览与快速入门
- `RULES.md` — 编码规范与约束
- `DESIGN.md` — 视觉设计系统
- `MEMORY.md` — 历史决策与踩坑记录
