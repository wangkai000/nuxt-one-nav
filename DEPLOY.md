# 部署清单

## ✅ 开发完成

- [x] Nuxt 3 项目初始化
- [x] Tailwind CSS 配置
- [x] 深色模式 (color-mode)
- [x] 所有组件 (Header, Sidebar, Footer, Card, Grid, Search)
- [x] 搜索功能 (实时过滤 + ⌘K 快捷键)
- [x] 数据层 (18 个示例网站，8 个分类)
- [x] 响应式布局 (移动/平板/桌面)
- [x] 高保真 UI 设计 (渐变、毛玻璃、阴影)
- [x] 类型定义 (TypeScript)
- [x] 图标集成 (Iconify)
- [x] favicon

## 📦 待安装依赖 (npm install)

```bash
cd one-nav-ssg
npm install
```

## 🧪 测试步骤

1. `npm run dev` - 开发服务器
2. 访问 http://localhost:3000
3. 测试：
   - 搜索功能 (输入 "git")
   - 分类切换
   - 深色模式切换
   - 移动端响应式 (缩小浏览器)
   - ⌘K 快捷键聚焦搜索
   - Esc 清空搜索

## 🚀 部署

```bash
npm run generate
```

输出目录: `dist/`

将 `dist/` 上传到：
- Vercel / Netlify (推荐)
- GitHub Pages
- Cloudflare Pages
- Nginx / Apache

## 📝 自定义

### 修改数据

编辑 `data/nav-data.ts`

### 修改主题色

编辑 `tailwind.config.js`

### 修改背景

编辑 `assets/css/main.css`

## 🔧 可能遇到的问题

1. **图标不显示** - 使用 `iconName` 或确保 `icon` URL 可访问
2. **深色模式不工作** - 检查 `@nuxtjs/color-mode` 是否安装
3. **搜索不响应** - 确保 `useSearch` composable 正确导入

---

所有代码已完成，只需安装依赖即可运行！
