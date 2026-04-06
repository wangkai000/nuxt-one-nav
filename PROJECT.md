# One Nav SSG 项目

## 🎯 项目概述

基于 **Nuxt 3 + TypeScript + Tailwind CSS** 构建的静态导航站点，复刻 One Nav 付费模板的精致 UI。

**技术亮点：**
- ✨ 现代化渐变美学 + 毛玻璃效果
- 🌓 完整的深色模式支持
- 🔍 实时搜索过滤 + ⌘K 快捷键
- 📱 响应式布局 (移动/平板/桌面)
- ⚡ SSG 静态生成，极致性能
- 🎨 高保真复刻付费模板质感

## 📁 项目结构

```
one-nav-ssg/
├── components/         # 组件库
│   ├── common/        # 通用组件
│   │   ├── Icon.vue        - Iconify 图标封装
│   │   └── ThemeToggle.vue - 主题切换按钮
│   ├── layout/        # 布局组件
│   │   ├── AppHeader.vue   - 顶部导航栏
│   │   ├── Sidebar.vue     - 侧边分类栏
│   │   └── AppFooter.vue   - 页脚
│   └── nav/           # 导航组件
│       ├── NavCard.vue     - 网站卡片 (核心)
│       ├── NavGrid.vue     - 网格容器
│       └── SearchBar.vue   - 搜索框
├── composables/       # 组合式函数
│   ├── useSearch.ts  - 搜索状态管理
│   └── useTheme.ts   - 主题状态管理
├── data/             # 数据层
│   └── nav-data.ts   - 导航数据 (编辑这里!)
├── layouts/          # 页面布局
│   └── default.vue   - 默认布局
├── pages/            # 页面路由
│   └── index.vue     - 首页
├── plugins/          # 插件
├── types/            # 类型定义
│   └── nav.ts        - NavItem, Category 接口
├── assets/           # 静态资源
│   └── css/
│       └── main.css  - 全局样式 + 自定义动画
├── public/           # 公共文件
├── nuxt.config.ts    # Nuxt 配置
├── tailwind.config.js # Tailwind 配置
├── tsconfig.json     # TS 配置
└── package.json      # 依赖配置
```

## 🚀 快速开始

### 安装依赖

```bash
cd one-nav-ssg
npm install
```

### 开发模式

```bash
npm run dev
```

浏览器打开 http://localhost:3000

### 生产构建

```bash
# 生成静态文件
npm run generate

# 预览
npm run preview
```

生成的 `dist/` 目录可直接部署。

## 🎨 UI 设计亮点

### 卡片设计 (NavCard)

```vue
- 圆角: rounded-2xl (16px)
- 背景: bg-white/80 + backdrop-blur (毛玻璃)
- 边框: border-slate-200/60 (半透明)
- 阴影: hover:shadow-xl hover:shadow-blue-500/10
- 悬停: scale(1.02) + translateY(-4px)
- 渐变边框: 伪元素渐变 + hover 显示
- 渐变遮罩: hover 时从透明渐变到蓝色
```

### 顶部导航 (AppHeader)

```vue
- 吸附: sticky top-0
- 毛玻璃: backdrop-blur-xl backdrop-saturate-150
- 半透明: bg-white/70 dark:bg-slate-900/70
- 渐变 Logo: bg-gradient-to-br from-blue-500 to-indigo-600
- 搜索框: rounded-xl + focus:ring-2
```

### 侧边栏 (Sidebar)

```vue
- 固定: fixed left-0 top-16
- 半透明背景 + 毛玻璃
- 选中态: 渐变背景 + 蓝色文字 + 边框
- 未选中: hover 变蓝
- 计数徽章: bg-white/60 半透明
```

### 主题切换 (ThemeToggle)

```vue
- 渐变背景: from-slate-100 to-slate-200
- 图标切换: 太阳 ☀️ / 月亮 🌙
- 过渡: fade 动画 200ms
```

## 🔧 自定义指南

### 修改导航数据

编辑 `data/nav-data.ts`:

```typescript
export const navData: NavItem[] = [
  {
    id: '1',
    title: '网站名称',
    description: '网站描述',
    url: 'https://example.com',
    icon: 'https://example.com/favicon.ico', // 可选
    iconName: 'mdi:icon-name', // 或使用 Iconify
    tags: ['标签1', '标签2'],
    category: 'category-id',
    order: 1,
    isHot: true,   // 热门标记 (可选)
    isNew: true    // 新标记 (可选)
  }
]
```

### 添加新分类

编辑 `data/nav-data.ts` 中的 `categories`:

```typescript
export const categories: Category[] = [
  { id: 'all', name: '全部', icon: 'mdi:grid' },
  { id: 'dev', name: '开发', icon: 'mdi:code-tags' },
  // ... 添加新的
  { id: 'new', name: '新分类', icon: 'mdi:star' }
]
```

### 调整主题色

编辑 `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3b82f6', // 蓝色
        600: '#4f46e5'  // 靛蓝
      }
    }
  }
}
```

### 修改背景渐变

编辑 `assets/css/main.css`:

```css
.bg-gradient-main {
  background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%);
}

.dark .bg-gradient-main {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%);
}
```

## 📦 依赖说明

| 包 | 版本 | 用途 |
|----|------|------|
| nuxt | ^3.14.0 | 框架 |
| @nuxtjs/tailwindcss | ^6.12.0 | Tailwind 集成 |
| @nuxtjs/color-mode | ^3.5.0 | 主题切换 |
| @iconify/vue | ^4.1.2 | 图标库 |
| typescript | ^5.7.0 | 类型系统 |

## 🌐 部署

### Vercel (推荐)

1. Push 代码到 GitHub
2. 在 Vercel 导入项目
3. 构建命令: `npm run generate`
4. 输出目录: `dist`

### GitHub Pages

```bash
npm run generate
cd dist
git init
git add .
git commit -m "deploy"
git push -f git@github.com:username/repo.git main:gh-pages
```

### Netlify

- 构建命令: `npm run generate`
- 发布目录: `dist`

### 手动部署

直接将 `dist/` 目录上传到任何 Web 服务器 (Nginx/Apache)。

## ⚡ 性能指标

- **首屏加载**: < 1s (SSG + 静态资源)
- **Bundle 大小**: ~100KB (gzipped)
- ** Lighthouse 评分**: 90+

## 🎯 后续功能 (可选)

- [ ] 用户收藏 (localStorage)
- [ ] 搜索历史
- [ ] 键盘导航 (↑↓ 选择)
- [ ] 无限滚动
- [ ] 导入/导出 (JSON)
- [ ] 多语言 (i18n)
- [ ] RSS 订阅
- [ ] PWA 支持
- [ ] 自定义背景
- [ ] 网站评分/评论

## 📝 License

MIT

## 🙏 致谢

- [Nuxt 3](https://nuxt.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Iconify](https://iconify.design)
- [One Nav](https://onenav.top)

---

**提示**: 编辑 `data/nav-data.ts` 即可自定义导航内容！
