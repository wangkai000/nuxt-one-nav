# One Nav SSG 导航站点

一个基于 **Nuxt 3 + TypeScript + Tailwind CSS** 的静态导航站点，高保真复刻 One Nav 付费模板的 UI 风格。

## ✨ 特性

- 🎨 **精美 UI** - 渐变背景、毛玻璃效果、精致阴影
- 🌓 **深色模式** - 自动/手动切换，完整适配
- 🔍 **实时搜索** - 按名称、描述、标签过滤
- 📱 **响应式** - 完美适配桌面端和移动端
- ⚡ **SSG** - 静态生成，部署简单，访问飞快
- 🎯 **快捷键** - ⌘K 快速聚焦搜索
- 💎 **细节打磨** - hover 动画、渐变边框、徽章标记

## 技术栈

| 技术 | 用途 |
|------|------|
| Nuxt 3 | 框架 (App Router + SSG) |
| TypeScript | 类型安全 |
| Tailwind CSS | 样式系统 |
| Iconify | 图标库 |
| @nuxtjs/color-mode | 主题切换 |

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
├── components/          # 组件
│   ├── common/         # 通用 (Icon, ThemeToggle)
│   ├── layout/         # 布局 (Header, Footer, Sidebar)
│   └── nav/           # 导航 (NavCard, NavGrid, SearchBar)
├── composables/        # 组合式函数
│   ├── useSearch.ts   # 搜索逻辑
│   └── useTheme.ts    # 主题逻辑
├── data/              # 数据
│   └── nav-data.ts    # 导航数据 (编辑这里!)
├── layouts/           # 页面布局
├── pages/             # 页面路由
├── plugins/           # 插件
├── public/            # 静态资源
├── types/             # TypeScript 类型
├── assets/            # 样式资源
├── nuxt.config.ts     # Nuxt 配置
├── tailwind.config.js # Tailwind 配置
└── tsconfig.json      # TS 配置
```

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
  iconName: 'mdi:icon-name', // 或使用 Iconify 图标
  tags: ['标签1', '标签2'],
  category: 'dev',
  order: 1,
  isHot: true,   // 热门标记
  isNew: true    // 新标记
}
```

### 添加分类

编辑 `data/nav-data.ts` 中的 `categories` 数组：

```typescript
{
  id: 'new-category',
  name: '新分类',
  icon: 'mdi:icon-name'
}
```

### 修改主题色

编辑 `tailwind.config.js` 中的 `theme.extend` 部分，自定义颜色。

### 修改背景渐变

编辑 `assets/css/main.css` 中的 `.bg-gradient-main` 类。

## 部署

生成静态文件后，`dist/` 目录可直接部署到：

- **Vercel** / Netlify (推荐)
- **GitHub Pages**
- **Cloudflare Pages**
- **Nginx** / Apache
- **任何静态托管服务**

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
- ✅ 图片懒加载 (待实现)
- ✅ 代码分割
- ✅ Tailwind JIT 按需生成
- ✅ Gzip/Brotli 压缩

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT

## 致谢

- [Nuxt 3](https://nuxt.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Iconify](https://iconify.design)
- [One Nav](https://onenav.top)

---

**提示**: 首次运行前请确保已安装 Node.js 18+。
