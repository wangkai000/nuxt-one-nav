# MEMORY.md - 基米导航

> 项目关键决策、历史上下文和踩坑记录。
> 供 AI 助手理解「为什么这样设计」。

---

## 架构决策

### 为什么用 Markdown 作为数据源？

**决策时间**：2024-12
**背景**：需要一种 Git 友好、人工可维护、无需数据库的导航数据方案。

| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| JSON 直接维护 | 解析简单 | 人工编辑困难，易出错 | ❌ |
| 数据库（SQLite/MySQL） | 结构化查询 | 需要服务端，部署复杂 | ❌ |
| **Markdown** | Git 友好、人工可读、diff 清晰 | 需要解析器 | ✅ |
| YAML | 结构清晰 | 缩进敏感，容易格式错误 | ❌ |

**结果**：自定义 `scripts/build-nav-data.mjs` 解析器，构建时 MD → JSON。

---

### 为什么选 Nuxt 4 SSG？

**决策时间**：2024-12
**背景**：需要纯静态部署，无服务端成本。

- 纯静态 HTML/CSS/JS，可部署到任何 CDN
- Nuxt 4 的 SSG 支持完善，自动路由
- Vue 3 + TypeScript 生态成熟
- Element Plus 组件库开箱即用

---

### 为什么用 Iconify 而不是本地图标？

**决策时间**：2024-12

- 200,000+ 图标，覆盖所有技术栈和品牌
- 按需加载，不影响性能
- 支持彩色图标（`fluent-emoji:` `logos:`）
- 自动匹配：根据 tags 自动选择最佳图标

---

## 踩坑记录

### 2025-01：AIGC 元数据头导致解析错误

**问题**：`nav-data.md` 顶部的 AIGC 元数据块（YAML front matter）被解析器误读。

```yaml
---
AIGC:
    Label: "1"
    ...
---
```

**解决**：解析器跳过 `---` 包裹的 YAML 块，从 `# 基米导航 导航数据` 开始解析。

**教训**：如果修改 nav-data.md 的头部格式，必须同步更新 `build-nav-data.mjs` 的解析逻辑。

---

### 2025-03：SSG 构建时 nav-data.generated.json 不存在

**问题**：`nuxt generate` 时 `data/nav-data.generated.json` 尚未生成，导致构建失败。

**解决**：在 `nuxt.config.ts` 中添加 `build:before` hook：

```typescript
hooks: {
  'build:before'() {
    if (process.env.NODE_ENV !== 'production') return
    const { execSync } = require('child_process')
    execSync('node scripts/build-nav-data.mjs', { stdio: 'inherit' })
  }
}
```

---

### 2025-05：PWA 缓存导致更新不生效

**问题**：用户访问旧版本，新添加的导航不显示。

**解决**：`nuxt.config.ts` 中配置 `registerType: 'autoUpdate'`，并设置合理的缓存策略：
- JS/CSS：StaleWhileRevalidate（30天）
- 图片：CacheFirst（30天）
- API：NetworkFirst（5分钟）

---

## 已知问题

| 问题 | 状态 | 备注 |
|------|------|------|
| `app.vue` 缺少 `import { useNavData }` | 待修复 | SSR 500 错误，不影响 SSG 构建 |
| i18n 国际化暂停 | 暂停 | 原计划多语言，现仅中文 |
| SEO 中文硬编码 | 已知 | 未做国际化 SEO |

---

## 技术债务

- `scripts/build-nav-data.mjs` 是自定义解析器，无单元测试
- `nav-data.md` 格式无 Schema 验证，人工编辑容易出错
- 无自动化 CI/CD，构建和部署需手动执行

---

## 外部依赖

| 依赖 | 用途 | 版本锁定 |
|------|------|----------|
| Nuxt | 框架 | `^4.4.2` |
| Element Plus | UI 组件 | `^2.9.0` |
| Tailwind CSS | 样式 | `^3.4.17` |
| Iconify Vue | 图标 | `^4.1.2` |
| @vite-pwa/nuxt | PWA | `^0.10.0` |
