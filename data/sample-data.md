# One Nav SSG 导航站点 - 示例数据

本文件包含用于测试和演示的示例数据。

## 如何使用

在 `data/nav-data.ts` 中添加以下字段即可使用示例数据：

```typescript
import { sampleNavItems, sampleCategories } from '~/data/sample-data'
```

## 数据说明

示例数据包含常见的开发、设计、AI、工具等类别网站，每个网站包含：
- 图标（优先使用 favicon，失败则使用 Iconify 图标）
- 标题和描述
- 标签
- 分类
- 热门/新标记
