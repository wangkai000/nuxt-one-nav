# My Nuxt Nav

[中文](./README.md)

A static navigation site based on **Nuxt 3 + TypeScript + Element Plus + Tailwind CSS**, faithfully replicating the One Nav template's UI style.

## ✨ Features

- 🎨 **Beautiful UI** - Element Plus components + Tailwind CSS styling
- 🌓 **Dark Mode** - Auto/manual toggle with full adaptation
- 🔍 **Real-time Search** - Top bar search box with ⌘K/Ctrl+K shortcuts
- 📱 **Responsive** - Element Plus breakpoint system for perfect multi-device support
- ⚡ **SSG** - Static generation, easy deployment, blazing fast access
- 🧭 **Sidebar Menu** - Element Plus Menu component with two-level categories
- 🎯 **Keyboard Shortcuts** - ⌘K to focus search, Esc to clear
- 💎 **Fine Details** - Hover animations, gradient borders, badge markers
- 🎨 **Colorful Icons** - Iconify colored icons for richer visuals
- 🚀 **Back to Top** - Shows back-to-top button after scrolling
- ⏳ **Loading Animation** - Nuxt loading indicator + Element Plus loading states
- 🔗 **External Links** - Quick access to GitHub and Gitee

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [Nuxt 3](https://nuxt.com) | Full-stack framework (App Router + SSG) | ^3.x |
| [Vue 3](https://vuejs.org) | Progressive JavaScript framework | ^3.x |
| [TypeScript](https://www.typescriptlang.org) | Type safety | ^5.x |
| [Tailwind CSS](https://tailwindcss.com) | Atomic CSS framework | ^3.x |
| [Element Plus](https://element-plus.org) | Vue 3 component library | ^2.x |
| [Iconify](https://iconify.design) | Unified icon framework | ^1.x |
| [@iconify/vue](https://iconify.design/docs/icon-components/vue) | Vue icon component | ^4.x |
| [@nuxtjs/color-mode](https://color-mode.nuxtjs.org) | Dark mode support | ^3.x |
| [Vite](https://vitejs.dev) | Build tool | ^5.x |

## Quick Start

### 1. Install Dependencies

```bash
cd one-nav-ssg
npm install
```

### 2. Development Mode

```bash
npm run dev
```

Visit http://localhost:3000

### 3. Build and Preview

```bash
# Build production version
npm run build

# Generate static files
npm run generate

# Preview generated result
npm run preview
```

## Project Structure

```
one-nav-ssg/
├── components/              # Components
│   ├── common/             # Common components
│   ├── layout/             # Layout components
│   │   ├── AppHeader.vue   # Top navigation bar
│   │   ├── AppFooter.vue   # Footer
│   │   └── Sidebar.vue     # Sidebar menu
│   ├── nav/                # Navigation components
│   │   ├── NavCard.vue     # Website card
│   │   ├── NavGrid.vue     # Grid layout
│   │   └── SearchBar.vue    # Search bar
│   ├── BackToTop.vue       # Back to top button
│   └── LoadingIndicator.vue # Loading indicator
├── composables/            # Composables
│   ├── useSearch.ts       # Search logic
│   └── useTheme.ts        # Theme logic
├── data/                  # Data
│   └── nav-data.ts        # Navigation data (200+ website resources)
├── layouts/               # Page layouts
│   └── default.vue        # Default layout (with mobile drawer)
├── pages/                 # Page routes
│   └── index.vue          # Home page
├── plugins/               # Plugins
├── public/                # Static assets
├── types/                 # TypeScript types
│   └── nav.ts             # Navigation type definitions
├── assets/                # Style assets
│   └── css/
│       └── main.css       # Global styles
├── app.vue                # App entry
├── nuxt.config.ts         # Nuxt config
├── tailwind.config.js     # Tailwind config
└── tsconfig.json          # TS config
```

## Data Categories

Currently featuring **200+** quality website resources, categorized as follows:

| Category | Count | Description |
|----------|-------|-------------|
| 🤖 AI Tools | 11 | ChatGPT, Claude, Midjourney, etc. |
| ⬡ Web3.0 | 20 | Blockchain, DeFi, NFT related |
| 🦊 Web3 UI Libraries | 13 | RainbowKit, Web3Modal, Ant Design Web3, etc. |
| ⬡ Smart Contract Frameworks | 7 | Hardhat, Foundry, Truffle, etc. |
| 📄 Smart Contract Languages | 8 | Solidity, Vyper, Rust(Solana), etc. |
| 📜 Frontend Frameworks | 24 | React/Vue/other frameworks (two-level menu) |
| 🟩 Node.js Frameworks | 14 | Express, Koa, NestJS, etc. |
| 🥯 Bun Ecosystem | 8 | Bun runtime and related tools |
| 🌊 CSS Frameworks | 8 | Tailwind CSS, Bootstrap, etc. |
| ⚡ Build Tools | 7 | Vite, Webpack, Rollup, etc. |
| 📚 UI Component Libraries | 9 | Element Plus, Ant Design, etc. |
| 🎮 Game Engines | 9 | Unity, Unreal, Godot, etc. |
| 🧰 Utilities | 5 | Development efficiency tools |
| 🗺️ Resource Navigation | 23 | Design resources, image libraries, icons |
| 🎮 Gaming Communities | 7 | Gaming related communities |
| 👨‍💻 Developer Communities | 6 | Tech communities, forums |
| 📖 Learning | 1 | Learning resources |

## Customization

### Adding a Website

Edit `data/nav-data.ts`:

```typescript
{
  id: 'unique-id',
  title: 'Website Name',
  description: 'Website description',
  url: 'https://example.com',
  icon: 'https://example.com/favicon.ico', // Optional
  tags: ['tag1', 'tag2'],
  category: 'category-id',
  order: 1,
}
```

### Adding a Category

Edit the `categories` array in `data/nav-data.ts`:

```typescript
{
  id: 'new-category',
  name: 'New Category',
  icon: 'fluent-emoji:icon-name'  // Use Iconify colored icons
}
```

### Two-Level Categories

Two-level menu structure is supported:

```typescript
{
  id: 'parent-category',
  name: 'Parent Category',
  icon: 'fluent-emoji:icon',
  children: [
    { id: 'child-1', name: 'Child 1', icon: 'fluent-emoji:icon1' },
    { id: 'child-2', name: 'Child 2', icon: 'fluent-emoji:icon2' }
  ]
}
```

## Element Plus Components

This project extensively uses Element Plus components:

| Component | Purpose | Location |
|-----------|---------|----------|
| `el-container` | Page layout container | `layouts/default.vue` |
| `el-header` | Top bar | `layouts/default.vue` |
| `el-aside` | Sidebar | `components/layout/Sidebar.vue` |
| `el-main` | Main content area | `layouts/default.vue` |
| `el-menu` | Navigation menu | `components/layout/Sidebar.vue` |
| `el-sub-menu` | Two-level menu | `components/layout/Sidebar.vue` |
| `el-menu-item` | Menu item | `components/layout/Sidebar.vue` |
| `el-drawer` | Mobile drawer menu | `layouts/default.vue` |
| `el-button` | Button | `components/layout/AppHeader.vue` |
| `el-input` | Search input | Top bar search |
| `el-scrollbar` | Scrollbar | `components/layout/Sidebar.vue` |

### Theme Customization

Element Plus theme is configured via `nuxt.config.ts`:

```typescript
elementPlus: {
  themes: ['dark'],
  defaultLocale: 'zh-cn'
}
```

Dark mode is automatically switched via `@nuxtjs/color-mode`.

## Deployment

After generating static files, the `dist/` directory can be directly deployed to:

- **Vercel** / Netlify (Recommended)
- **GitHub Pages**
- **Cloudflare Pages**
- **Gitee Pages**
- **Nginx** / Apache
- **Any static hosting service**

### Gitee Deployment

```bash
# Push to Gitee repository
git push origin main

# Enable Gitee Pages in repository settings
```

### Vercel Deployment Example

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

Or simply push code to GitHub and connect Vercel for automatic deployment.

## Performance Optimization

- ✅ Static Generation (SSG) - No server required
- ✅ Lazy icon loading - Performance optimization
- ✅ Code splitting
- ✅ Tailwind JIT on-demand generation
- ✅ Gzip/Brotli compression
- ✅ Real-time loading indicator

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT

## Acknowledgments

- [Nuxt 3](https://nuxt.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Element Plus](https://element-plus.org)
- [Iconify](https://iconify.design)
- [One Nav](https://www.iotheme.cn)

---

**Note**: Please ensure Node.js 18+ is installed before running for the first time.

**Feel free to bookmark**: MyNuxtNav | Ctrl (⌘) + D
