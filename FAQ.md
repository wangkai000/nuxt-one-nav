# One Nav SSG - 常见问题

## 1. 如何添加新网站？

编辑 `data/nav-data.ts` 文件，在 `navData` 数组中添加新对象。

## 2. 图标不显示怎么办？

每个网站卡片支持两种图标方式：
- `icon`: 直接 URL (优先使用网站的 favicon)
- `iconName`: Iconify 图标名称 (如 `mdi:github`)

如果 favicon 加载失败，会自动显示 `iconName` 对应的图标。

## 3. 如何修改主题颜色？

编辑 `tailwind.config.js`，在 `theme.extend.colors` 中添加或修改颜色。

## 4. 如何添加新分类？

编辑 `data/nav-data.ts`，在 `categories` 数组中添加新分类对象。

## 5. 深色模式不工作？

确保 `nuxt.config.ts` 中已配置 `@nuxtjs/color-mode` 模块，并且 `colorMode.preference` 设置为 `'system'`、`'dark'` 或 `'light'`。

## 6. 如何部署到 Vercel？

1. Push 代码到 GitHub
2. 在 Vercel 导入仓库
3. 构建命令: `npm run generate`
4. 输出目录: `dist`

## 7. 搜索框快捷键无效？

`⌘K` (Mac) 或 `Ctrl+K` (Windows/Linux) 会自动聚焦搜索框，这是浏览器默认行为，无需额外代码。

## 8. 如何修改首页标题和描述？

编辑 `pages/index.vue` 中的 `<h1>` 和 `<p>` 标签内容，或修改 `nuxt.config.ts` 中的 `app.head.meta`。

## 9. 卡片悬停效果不明显？

调整 `components/nav/NavCard.vue` 中的 `hover:scale-[1.02]` 和 `hover:shadow-xl` 等类名。

## 10. 如何添加自定义 CSS？

在 `assets/css/main.css` 中添加，Nuxt 会自动引入。

## 11. 如何优化图片加载？

使用 WebP 格式的 favicon，或使用 Iconify 图标代替图片。

## 12. 支持哪些图标库？

Iconify 支持所有 Iconify 图标集，如 `mdi` (Material Design Icons)、`carbon`、`heroicons` 等。

## 13. 如何修改布局？

- 侧边栏宽度: 修改 `Sidebar.vue` 中的 `w-64`
- 顶部高度: 修改 `AppHeader.vue` 中的 `h-16`
- 网格列数: 修改 `NavGrid.vue` 中的 `grid-cols-*`

## 14. 如何添加新页面？

在 `pages/` 目录创建新的 `.vue` 文件，Nuxt 会自动生成路由。

## 15. 如何禁用深色模式？

在 `nuxt.config.ts` 中设置:

```typescript
colorMode: {
  preference: 'light',
  fallback: 'light'
}
```

---

更多问题请查阅：
- [Nuxt 3 文档](https://nuxt.com/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Iconify 文档](https://iconify.design/docs/)
