# One Nav SSG 设计规范文档

## 设计系统

### 色彩系统

#### 浅色模式

```css
背景主色: #f8fafc → #eff6ff → #eef2ff (渐变)
卡片背景: rgba(255, 255, 255, 0.8) + backdrop-blur
边框颜色: rgba(203, 213, 225, 0.6)
文字主色: #1e293b (slate-800)
文字次要: #475569 (slate-600)

主色调: from-blue-500 to-indigo-600
强调色: 渐变 from-blue-600 to-purple-600

阴影: 
  - hover: 0 25px 50px -12px rgba(59, 130, 246, 0.15)
  - 默认: 0 1px 3px rgba(0,0,0,0.1)
```

#### 深色模式

```css
背景主色: #0f172a → #1e293b → #312e81
卡片背景: rgba(30, 41, 59, 0.7) + backdrop-blur-md
边框颜色: rgba(51, 65, 85, 0.5)
文字主色: #f1f5f9 (slate-100)
文字次要: #94a3b8 (slate-400)

主色调: from-blue-400 to-indigo-500
强调色: 渐变 from-cyan-400 to-purple-400
```

### 间距系统

```
基础单位: 4px
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

### 圆角系统

```
sm: 0.375rem (6px)
md: 0.5rem (8px)
lg: 0.75rem (12px)
xl: 1rem (16px)
2xl: 1.5rem (24px) - 卡片使用
```

### 阴影系统

```css
默认: shadow-sm (1px 1px 2px)
卡片: shadow-md (4px 6px 7px)
悬停: shadow-xl (20px 25px 50px -12px)
发光: shadow-glow (自定义)
```

## 组件规范

### NavCard 组件

```vue
尺寸: 
  最小高度: 180px
  内边距: p-5 (20px)

图标容器:
  尺寸: w-12 h-12 (48px)
  圆角: rounded-xl (16px)
  背景: from-blue-100 to-indigo-100 (浅色模式)

标题:
  字号: text-base (16px)
  字重: font-bold
  行高: leading-tight

描述:
  字号: text-sm (14px)
  颜色: text-slate-600 (浅色)
  最大行数: 2 (line-clamp-2)

标签:
  字号: text-xs (12px)
  圆角: rounded-full
  内边距: px-2 py-0.5
```

### SearchBar 组件

```vue
高度: h-10 (40px) + py-2.5 → 42px
圆角: rounded-xl (16px)
背景: bg-slate-100/80
边框: border-slate-200/50
焦点: ring-2 ring-blue-500/50
图标大小: w-5 h-5 (20px)
快捷键提示: ⌘K
```

### AppHeader 组件

```vue
高度: h-16 (64px)
背景: bg-white/70 + backdrop-blur-xl
边框: border-b border-slate-200/50
Logo 尺寸: w-10 h-10 (40px)
Logo 圆角: rounded-xl (16px)
```

### Sidebar 组件

```vue
宽度: w-64 (256px)
固定定位: fixed left-0 top-16
背景: bg-white/50 + backdrop-blur-sm
分类项:
  高度: py-2.5 (10px)
  圆角: rounded-xl
  内边距: px-3 py-2.5
  字体: text-sm
```

## 交互动效

### 过渡时长

```
快速: 150ms (颜色变化)
标准: 300ms (大多数 hover)
慢速: 500ms (页面加载)
```

### Easing 函数

```
ease-out: 淡出效果
ease-in-out: 往返运动
ease: 默认
```

### 悬停效果 (NavCard)

```css
transform: 
  scale(1.02)  // 放大 2%
  translateY(-4px)  // 上浮

transition:
  transform 300ms ease-out
  box-shadow 300ms ease-out
  border-color 200ms ease

box-shadow:
  hover: 0 25px 50px -12px rgba(59, 130, 246, 0.15)

border:
  渐变边框 (伪元素, opacity 0 → 1)
  颜色: via-blue-400/30
```

### 页面加载动画

```css
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out
}
```

## 深色模式适配

所有组件必须同时支持浅色和深色模式，使用 `dark:` 前缀。

示例:

```css
/* 浅色 */
bg-white/80 text-slate-800 border-slate-200

/* 深色 */
dark:bg-slate-800/70 dark:text-slate-100 dark:border-slate-700
```

## 响应式断点

```
sm: 640px   - 手机横屏/小平板
md: 768px   - 平板
lg: 1024px  - 小笔记本
xl: 1280px  - 桌面 (侧边栏显示)
2xl: 1536px - 大屏
```

布局策略:

- **移动** (< 640px): 单列，横向滚动分类标签
- **平板** (640-1024px): 双列或三列
- **桌面** (> 1024px): 四列，左侧固定侧栏

## 可访问性

- 所有交互元素必须有焦点样式
- 颜色对比度符合 WCAG AA 标准
- 支持键盘导航 (Tab, Enter, Esc)
- 图标有文字替代 (aria-label 或 hidden text)

## 性能建议

1. 使用 SVG 图标 (Iconify 自动优化)
2. 图片使用 WebP 格式
3. 懒加载非首屏内容
4. 避免过多的 box-shadow (影响性能)
5. 使用 `will-change` 优化动画

## 未来增强

- [ ] 添加收藏功能 (localStorage)
- [ ] 搜索历史
- [ ] 快捷键导航 (↑↓ 选择卡片)
- [ ] 无限滚动/分页
- [ ] 导入/导出数据
- [ ] 多语言支持
- [ ] RSS 订阅源
- [ ] PWA 支持

---

最后更新: 2024-04-05
