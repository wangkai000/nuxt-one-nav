# One Nav SSG - 快速上手

## 🎉 项目已完成

我已经创建了一个完整的 Nuxt 3 静态导航站点，高保真复刻 One Nav 付费模板的 UI 设计。

## 📁 项目文件列表

```
one-nav-ssg/
├── package.json
├── nuxt.config.ts
├── tailwind.config.js
├── tsconfig.json
├── app.vue
├── assets/css/main.css
├── components/
│   ├── common/
│   │   ├── Icon.vue
│   │   └── ThemeToggle.vue
│   ├── layout/
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   └── Sidebar.vue
│   └── nav/
│       ├── NavCard.vue
│       ├── NavGrid.vue
│       └── SearchBar.vue
├── composables/
│   ├── useSearch.ts
│   └── useTheme.ts
├── data/
│   └── nav-data.ts
├── layouts/
│   └── default.vue
├── pages/
│   └── index.vue
├── plugins/
│   ├── global.ts
│   └── iconify.ts
├── types/
│   ├── nav.ts
│   ├── color-mode.d.ts
│   └── iconify.d.ts
├── public/
│   └── favicon.svg
├── README.md
├── PROJECT.md
├── DESIGN.md
├── FAQ.md
├── DEV.md
└── DEPLOY.md
```

## 🎨 UI 设计亮点

1. **精致卡片** - 毛玻璃背景、渐变边框、hover 上浮效果
2. **渐变主题** - 标题、Logo 使用蓝-紫渐变
3. **深色模式** - 完整的颜色适配，所有组件支持
4. **吸顶导航** - 毛玻璃效果，搜索框居中
5. **侧边分类** - 固定定位，选中态渐变背景 + 指示条
6. **响应式** - 移动端横向滚动分类，桌面端固定侧栏
7. **微交互** - hover 阴影变化、按钮动画、搜索框快捷键

## 🚀 下一步

1. **安装 Node.js** (18+)
2. `cd one-nav-ssg`
3. `npm install`
4. `npm run dev`
5. 访问 http://localhost:3000

## 📝 自定义数据

打开 `data/nav-data.ts`，添加或修改网站卡片：

```typescript
{
  id: 'example',
  title: '示例',
  description: '示例描述',
  url: 'https://example.com',
  icon: 'https://example.com/favicon.ico',
  iconName: 'mdi:icon-name',
  tags: ['标签1', '标签2'],
  category: 'dev',
  order: 1,
  isHot: true
}
```

添加分类：

```typescript
export const categories = [
  { id: 'all', name: '全部', icon: 'mdi:apps' },
  { id: 'dev', name: '开发', icon: 'mdi:code-tags' },
  // 添加更多...
]
```

## 💡 技术特点

- ✅ Nuxt 3 App Router (pages 目录)
- ✅ TypeScript 严格模式
- ✅ Tailwind CSS (JIT + 自定义配置)
- ✅ Iconify 图标 (数千图标可选)
- ✅ 状态管理 (useState)
- ✅ SSG 静态生成 (`npm run generate`)
- ✅ 深色模式 (auto + manual)
- ✅ 键盘快捷键 (⌘K 搜索, Esc 清空)
- ✅ 完全响应式 (Grid 自适应)

---

祝你部署顺利！有问题查阅 README.md 或 FAQ.md。
