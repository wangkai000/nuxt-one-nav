# RULES.md - 基米导航

> 本文件定义 AI 助手在修改本项目时必须遵守的约束和规范。
> 违反这些规则可能导致构建失败或数据损坏。

---

## 🔴 绝对禁止（红线）

### 1. 不要手动修改生成的文件
- ❌ `data/nav-data.generated.json` — 由 `scripts/build-nav-data.mjs` 自动生成
- ❌ `.output/` 目录 — 由 `npm run generate` 生成
- ❌ `dist/` 目录 — 构建产物
- ❌ `.nuxt/` 目录 — Nuxt 缓存

> 如果修改了 `nav-data.md`，必须运行构建脚本重新生成 JSON。

### 2. 不要破坏 nav-data.md 的格式

格式必须严格遵循：

```markdown
# 一级分类
> id: category-id | icon: fluent-emoji:icon-name

## 二级子分类
> id: child-id | icon: fluent-emoji:icon-name

- [网站名称](https://example.com) - 网站描述 | icon: https://favicon.ico | tags: tag1, tag2
```

- ❌ 不要省略 `> id:` 元数据行
- ❌ 不要使用三级标题 `###`
- ❌ 不要在网站条目前加空行（可能导致解析失败）
- ❌ 不要在描述中使用 `|` 字符（会与元数据分隔符冲突）

### 3. 不要修改已锁定的技术栈
- ❌ 不要添加新的 UI 组件库（已用 Element Plus）
- ❌ 不要替换 Tailwind CSS
- ❌ 不要从 Vue 3 迁移到其他框架
- ❌ 不要添加服务端依赖（本项目是纯静态 SSG）

---

## 🟡 修改前必须做的事

### 1. 修改 nav-data.md 后必须重新构建
```bash
# 验证解析
node scripts/build-nav-data.mjs

# 完整构建
npm run generate
```

### 2. 新增页面必须在 app.vue 或 layouts 中注册
- 所有页面放在 `pages/` 目录
- Nuxt 自动路由，但布局需在 `layouts/` 中定义

### 3. 新增组件必须遵循命名规范
- 组件名使用 PascalCase
- 文件路径：`components/{category}/ComponentName.vue`
- 自动导入，无需手动 import

---

## 🟢 编码规范

### Vue / TypeScript
- 使用 **Composition API**，禁止使用 Options API
- 类型必须显式声明，禁止 `any`
- 使用 `~/` 别名引用项目文件
- Props 必须定义类型和默认值

### 样式
- 优先使用 Tailwind CSS 工具类
- 自定义 CSS 放在 `assets/css/` 中
- 暗色模式使用 `html.dark` 选择器
- 禁止内联 `style` 属性（特殊情况除外）

### 图标
- 优先使用 Iconify：`icon="fluent-emoji:robot"`
- 技术栈 Logo 用 `logos:` 前缀
- 自定义图标用 URL：`icon: https://example.com/favicon.ico`

---

## 📋 提交规范

```
feat: 添加 AI Coding 分类
docs: 更新 README
fix: 修复搜索框焦点丢失
style: 调整卡片间距
chore: 更新依赖
```

---

## 🔄 迭代规范

### 新增功能
1. 在 AGENTS.md「迭代记录」中添加一行
2. 在 MEMORY.md 中记录决策背景（如需要）
3. 如果涉及 nav-data.md 格式变更，同步更新 RULES.md

### 修改现有功能
1. 检查 RULES.md 是否有相关约束
2. 更新 AGENTS.md「迭代记录」的版本说明
3. 在 MEMORY.md 中记录变更原因（如非显而易见）

### 废弃功能
1. 在 AGENTS.md「迭代记录」中标记 `[已废弃]`
2. 在 MEMORY.md「技术债务」中记录清理计划

---

## ⚠️ 常见陷阱

| 陷阱 | 后果 | 避免方法 |
|------|------|----------|
| 忘记运行 build-nav-data.mjs | 页面显示旧数据 | 修改 nav-data.md 后立即运行 |
| 在 nav-data.md 使用 `\|` 字符 | 解析错误 | 描述中避免使用 `\|` |
| 删除 `> id:` 行 | 分类 ID 为空 | 保留元数据行 |
| 修改 nuxt.config.ts hooks | 构建失败 | 谨慎修改构建钩子 |
| 添加服务端 API | SSG 不兼容 | 本项目无服务端 |
