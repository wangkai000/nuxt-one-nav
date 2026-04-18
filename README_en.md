# MyNuxtNav
[中文](./README.md) | [English](./README_en.md)

A static navigation site built with **Nuxt 3 + TypeScript + Element Plus + Tailwind CSS**, faithfully replicating the One Nav UI style. Navigation data is managed in Markdown and auto-generated to JSON at build time.

## ✨ Features

- 🎨 **Beautiful UI** — Element Plus components + Tailwind CSS styling
- 🌓 **Dark Mode** — Auto/manual toggle with full adaptation
- 🔍 **Real-time Search** — Top bar search with ⌘K / Ctrl+K shortcuts
- 📱 **Responsive** — Desktop & mobile with drawer menu on small screens
- ⚡ **SSG** — Static generation, easy deployment, blazing fast
- 🧭 **Sidebar Menu** — Two-level category support
- 🎯 **Keyboard Shortcuts** — ⌘K to focus search, Esc to clear
- 💎 **Fine Details** — Hover animations, gradient borders, badge markers
- 🎨 **Colorful Icons** — Iconify icons + smart tech-stack icon matching
- 🚀 **Back to Top** — Scroll-triggered back-to-top button
- ⏳ **Loading Animation** — Nuxt + Element Plus loading states
- 📝 **Markdown Data Source** — Manage nav data in MD, auto-parsed at build
- 🔗 **External Links** — Quick access to GitHub & Gitee

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [Nuxt 3](https://nuxt.com) | Full-stack framework (App Router + SSG) | ^3.14 |
| [Vue 3](https://vuejs.org) | Progressive JavaScript framework | ^3.5 |
| [TypeScript](https://www.typescriptlang.org) | Type safety | ^5.x |
| [Element Plus](https://element-plus.org) | Vue 3 component library | ^2.9 |
| [Tailwind CSS](https://tailwindcss.com) | Atomic CSS framework | ^3.x |
| [Iconify](https://iconify.design) | Unified icon framework | ^4.1 |
| [@nuxtjs/color-mode](https://color-mode.nuxtjs.org) | Dark mode support | ^3.5 |
| [Vite](https://vitejs.dev) | Build tool | ^6.x |

## Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
npm run generate     # SSG with auto MD → JSON parsing
npm run preview      # Preview build output
```

## Project Structure

```
one-nav-ssg/
├── components/
│   ├── common/              # Common components
│   ├── layout/
│   │   ├── AppHeader.vue    # Top navigation bar
│   │   ├── AppFooter.vue    # Footer
│   │   └── Sidebar.vue      # Sidebar menu (two-level categories)
│   ├── nav/
│   │   ├── NavCard.vue      # Website card (smart icon matching)
│   │   ├── NavGrid.vue      # Grid layout + filtering
│   │   └── SearchBar.vue    # Search bar
│   ├── BackToTop.vue
│   └── LoadingIndicator.vue
├── composables/
│   ├── useSearch.ts         # Search logic
│   └── useTheme.ts          # Theme logic
├── data/
│   ├── nav-data.md          # ⭐ Data source (Markdown, single source of truth)
│   ├── nav-data.ts          # Data reader (imports from generated JSON)
│   └── nav-data.generated.json  # Build artifact, do not edit
├── scripts/
│   └── build-nav-data.mjs   # Build-time MD → JSON parser
├── server/api/
│   └── nav.get.ts           # Nav data API (search, category filter)
├── types/
│   └── nav.ts               # TypeScript type definitions
├── pages/
│   ├── index.vue            # Home (Hero + NavGrid)
│   └── about.vue            # About page
├── layouts/
│   └── default.vue          # Default layout (mobile drawer)
├── nuxt.config.ts           # Nuxt config (with build:before hook)
├── app.vue                  # App entry
└── package.json
```

## Data Categories

Featuring **276** websites across **20** categories:

| Category | Count | Description |
|----------|-------|-------------|
| Featured | 1 | Editor's picks |
| AI Tools | 11 | ChatGPT, Claude, Midjourney, etc. |
| Web3.0 | 20 | Blockchain, DeFi, NFT related |
| Web3 Libraries | 13 | Ethers.js, Web3.js, etc. |
| Web3 Contract Frameworks | 7 | Hardhat, Foundry, Truffle, etc. |
| Web3 Contract Languages | 8 | Solidity, Vyper, Rust(Solana), etc. |
| Frontend Frameworks | 75 | React/Vue/Angular/Svelte (7 sub-categories) |
| Node.js Frameworks | 12 | Express, Koa, NestJS (2 sub-categories) |
| Go Ecosystem | 12 | Gin, Echo, Fiber, etc. |
| Mobile Development | 8 | Flutter, React Native, etc. |
| Desktop Apps | 6 | Electron, Tauri, etc. |
| Bun Ecosystem | 5 | Bun runtime & related tools |
| CSS Frameworks | 8 | Tailwind CSS, Bootstrap, etc. |
| Build Tools | 28 | Vite, Webpack, Rollup, esbuild, etc. |
| UI Component Libraries | 60 | Element Plus, Ant Design, shadcn, etc. |
| Game Engines | 9 | Unity, Unreal, Godot, etc. |
| Utilities | 5 | Developer efficiency tools |
| Resources | 23 | Design resources, image libraries, icons |
| Gaming Communities | 7 | Gaming related communities |
| Developer & Designer Communities | 6 | Tech communities, forums |

## Managing Navigation Data

All data lives in `data/nav-data.md` using Markdown syntax.

### Adding a Website

```markdown
- [Website Name](https://example.com) - Description | icon: https://favicon.ico | tags: react, typescript
```

### Adding a Category

```markdown
# New Category
> id: new-category | icon: fluent-emoji:rocket
```

### Sub-Categories

```markdown
# Parent Category
> id: parent

## Sub Category
> id: child-1 | icon: fluent-emoji:star

- [Website](https://example.com) - Description
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Website title |
| `url` | ✅ | Website URL |
| `description` | ❌ | Website description |
| `icon` | ❌ | Icon URL (auto-matched from tags if omitted) |
| `tags` | ❌ | Comma-separated tags for search & icon matching |
| `hot` | ❌ | Mark as trending |
| `new` | ❌ | Mark as new |

## Build Pipeline

```
nav-data.md ──(build:before hook)──> scripts/build-nav-data.mjs ──> nav-data.generated.json ──> SSG output
```

1. Edit `data/nav-data.md`
2. Run `npm run generate` (auto-triggers parser)
3. Parser generates `data/nav-data.generated.json`
4. Nuxt reads JSON and produces SSG build

## Deployment

After `npm run generate`, deploy `.output/public/` to:

- **Vercel** / **Netlify** (recommended, auto-deploy)
- **GitHub Pages** / **Cloudflare Pages** / **Gitee Pages**
- **Nginx** / Apache / any static hosting

## Browser Support

Chrome 90+ / Firefox 88+ / Safari 14+ / Edge 90+

## License

MIT

## Acknowledgments

- [Nuxt 3](https://nuxt.com) · [Tailwind CSS](https://tailwindcss.com) · [Element Plus](https://element-plus.org) · [Iconify](https://iconify.design) · [One Nav](https://www.iotheme.cn)

---

**Requires**: Node.js 18+
