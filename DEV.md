# One Nav SSG 开发指南

## 快速开始

1. 安装依赖
2. 运行开发服务器
3. 访问 http://localhost:3000

## 添加新网站

编辑 `data/nav-data.ts`，在 `navData` 数组中添加：

```typescript
{
  id: 'unique-id',
  title: '网站名称',
  description: '网站描述',
  url: 'https://example.com',
  icon: 'https://example.com/favicon.ico', // 可选
  iconName: 'mdi:icon-name', // 可选，如果没有 icon
  tags: ['标签1', '标签2'],
  category: 'category-id',
  order: 100,
  isHot: false, // 可选
  isNew: false  // 可选
}
```

## 添加新分类

编辑 `data/nav-data.ts`，在 `categories` 数组中添加：

```typescript
{
  id: 'new-category',
  name: '新分类',
  icon: 'mdi:icon-name'
}
```

## 自定义样式

- 主色调：修改 `tailwind.config.js` 中的颜色配置
- 背景渐变：修改 `assets/css/main.css` 中的 `.bg-gradient-main`
- 卡片样式：编辑 `components/nav/NavCard.vue`

## 构建部署

```bash
npm run generate
```

生成的 `dist/` 目录可直接部署到任何静态托管服务。

## 项目结构

```
one-nav-ssg/
├── components/     # Vue 组件
│   ├── common/    # 通用组件 (Icon, ThemeToggle)
│   ├── layout/    # 布局组件 (Header, Footer, Sidebar)
│   └── nav/       # 导航相关 (NavCard, NavGrid, SearchBar)
├── composables/   # 组合式函数 (useSearch, useTheme)
├── data/          # 数据文件 (nav-data.ts)
├── layouts/       # 页面布局
├── pages/         # 页面路由
├── plugins/       # Nuxt 插件
├── public/        # 静态资源
├── types/         # TypeScript 类型定义
└── assets/        # 样式和资源
```

## 技术要点

- **Nuxt 3 App Router**: 使用 `pages/` 目录，自动路由
- **TypeScript**: 严格模式，完整类型推导
- **Tailwind CSS**: 原子化样式，深色模式支持
- **Iconify**: 丰富的图标库
- **SSG**: 静态生成，无需服务器

## 性能优化建议

1. 图片使用 WebP 格式
2. 懒加载图标 (使用 Nuxt 的 `lazy` 组件)
3. 添加 sitemap 和 robots.txt
4. 启用 Gzip/Brotli 压缩
5. 使用 CDN 托管静态资源

## License

MIT
