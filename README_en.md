# MyNuxtNav Navigation Site

[中文](./README.md) | [English](./README_en.md)

A pure static navigation site built with **Nuxt 4 + TypeScript + Element Plus + Tailwind CSS**. Data is managed in Markdown format and automatically generates offline JSON during build - no database required.

## ✨ Features

- 🎨 **Beautiful UI** — Element Plus components + Tailwind CSS styling
- 🌓 **Dark Mode** — Auto/manual toggle with full adaptation
- 🔍 **Real-time Search** — Top bar search with ⌘K / Ctrl+K shortcut
- 📱 **Responsive** — Perfectly adapted for desktop and mobile
- ⚡ **Pure SSG** — No server-side required after build, easy deployment, lightning fast
- 🧭 **Sidebar Menu** — Supports second-level subcategories with clear hierarchy
- 🎯 **Keyboard Shortcuts** — ⌘K to focus search, Esc to clear
- 💎 **Polished Details** — Hover animations, gradient backgrounds, badge markers
- 🎨 **Colorful Icons** — Iconify colorful icons + smart tech stack matching
- 📝 **Markdown Data Source** — Manage navigation data in Markdown, Git-friendly
- 🔗 **Site Detail Page** — Click card to view details in new tab

## 🚀 Quick Start

**Node.js >= 22.13.0**

```bash
# 1. Install dependencies
npm install

# 2. Development mode
npm run dev          # http://localhost:3000

# 3. Generate static files (auto executes MD → JSON parsing)
npm run generate

# 4. Preview build result
npm run preview
```

## 📦 SSG Static Build

This project is a **pure SSG (Static Site Generation)** project. After build, it generates pure HTML/CSS/JS files without requiring a Node.js server.

### Build Command

```bash
# Complete build process:
# 1. Parse data/nav-data.md → data/nav-data.generated.json
# 2. Generate static pages to .output/public/
npm run generate
```

After build, the `.output/public/` directory contains all static files and can be deployed to:
- **Vercel** / **Netlify** (recommended, auto deploy)
- **GitHub Pages** / **Cloudflare Pages** / **Gitee Pages**
- **Nginx** / Apache
- Any static hosting service

## 📝 How to Add New Resources

All navigation data is maintained in `data/nav-data.md` using Markdown syntax:

### Add Website

```markdown
- [Website Name](https://example.com) - Website description | icon: https://favicon.ico | tags: react, typescript
```

### Add Primary Category

```markdown
# Category Name
> id: category-id | icon: fluent-emoji:rocket

- [Website](https://example.com) - Description
```

### Add Secondary Subcategory

```markdown
# Parent Category
> id: parent-id | icon: fluent-emoji:folder

## Subcategory Name
> id: child-id | icon: fluent-emoji:star

- [Website](https://example.com) - Description
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| Title | ✅ | `[Website Name](url)` |
| URL | ✅ | Website link |
| Description | ✅ | Text after `-` |
| icon | ❌ | Icon URL or Iconify icon name (auto-matched if empty) |
| tags | ❌ | Tags (comma-separated), used for search and icon matching |

## 🎨 How to Switch Icons

### Method 1: Use Iconify Icons (Recommended)

```markdown
- [Vue.js](https://vuejs.org/) - Progressive JavaScript Framework | icon: logos:vue | tags: vue, framework
```

### Method 2: Use Website Favicon

```markdown
- [GitHub](https://github.com/) - Code hosting platform | icon: https://github.com/favicon.ico | tags: git, hosting
```

### Method 3: Auto-match (Leave Empty)

```markdown
- [React](https://react.dev/) - Declarative UI library | tags: react, javascript
```

The system will automatically match the corresponding tech stack icon based on `tags`.

## 🌟 Why Use Iconify Icon Library

This project uses [Iconify](https://iconify.design) as the icon solution with the following advantages:

| Feature | Description |
|---------|-------------|
| 🎨 **Colorful Icons** | Supports `logos:`, `fluent-emoji:` and other colorful icon sets, more beautiful than monochrome |
| 📦 **Massive Icons** | 200,000+ icons covering all mainstream tech stacks and brand logos |
| ⚡ **On-demand Loading** | Only loads used icons, no performance impact |
| 🔍 **Easy to Find** | [Icônes](https://icones.js.org) provides visual icon search |
| 💡 **Smart Matching** | Auto-matches best icon based on URL and tags |

### Common Icon Sets

| Icon Set | Prefix | Examples |
|----------|--------|----------|
| Tech Logos | `logos:` | `logos:vue`, `logos:react`, `logos:typescript` |
| Colorful Emoji | `fluent-emoji:` | `fluent-emoji:rocket`, `fluent-emoji:robot` |
| Material Design | `mdi:` | `mdi:home`, `mdi:github` |
| Simple Icons | `simple-icons:` | `simple-icons:github`, `simple-icons:nuxt` |

### Finding Icons

Visit [Icônes](https://icones.js.org) to search for icons, then copy the icon name to use.

## 📊 Project Data

Currently featuring **250+** website resources across **14** main categories:

| Category | Description |
|----------|-------------|
| AI Tools | AI Navigation, Writing, Dev Frameworks, Local Runtime, API, Coding Assistants, Visual Platforms |
| Web3.0 | Blockchain, DeFi, NFT, Smart Contracts |
| Frontend Ecosystem | React/Vue/Angular/Svelte, Build Tools, WebGL 3D, AI Dev Libraries, WebGIS Maps |
| Node.js Frameworks | Web Frameworks, Multithreading/Concurrency, Database ORM |
| Go Ecosystem | Gin, Echo, Fiber and other mainstream frameworks |
| Mobile Development | Flutter, React Native, uni-app, etc. |
| Desktop Apps | Electron, Tauri |
| More... | Game Engines, Utilities, Resources, Developer Communities |

## 🛠 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [Nuxt 4](https://nuxt.com) | Full-stack Framework (SSG) | ^3.14 |
| [Vue 3](https://vuejs.org) | Progressive JavaScript Framework | ^3.5 |
| [TypeScript](https://www.typescriptlang.org) | Type Safety | ^5.x |
| [Element Plus](https://element-plus.org) | Vue 3 Component Library | ^2.9 |
| [Tailwind CSS](https://tailwindcss.com) | Atomic CSS Framework | ^3.x |
| [Iconify](https://iconify.design) | Unified Icon Framework | ^4.1 |

## 📁 Project Structure

```
one-nav-ssg/
├── data/
│   ├── nav-data.md              # ⭐ Navigation data source (single source of truth)
│   ├── nav-data.ts              # Data reading layer
│   └── nav-data.generated.json  # Build artifact (do not edit manually)
├── scripts/
│   └── build-nav-data.mjs       # Build-time MD → JSON parser
├── pages/
│   ├── index.vue                # Home page
│   ├── about.vue                # About page
│   └── detail/[id].vue          # Site detail page
├── components/
│   ├── layout/                  # Layout components
│   ├── nav/                     # Navigation components
│   └── common/                  # Common components
├── nuxt.config.ts               # Nuxt configuration
└── app.vue                      # App entry
```

## 🌐 Browser Support

Chrome 90+ / Firefox 88+ / Safari 14+ / Edge 90+

## 📄 License

MIT

## 🙏 Acknowledgments

- [Nuxt 4](https://nuxt.com) · [Tailwind CSS](https://tailwindcss.com) · [Element Plus](https://element-plus.org) · [Iconify](https://iconify.design) · [One Nav](https://www.iotheme.cn)

---

**Requirements**: Node.js 18+
