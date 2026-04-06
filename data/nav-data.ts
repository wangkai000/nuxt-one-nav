import type { NavItem, Category } from '~/types/nav'

// 带层级结构的分类
export const categories: Category[] = [
  { id: 'all', name: '全部', icon: 'mdi:apps', defaultOpened: true },
  {
    id: 'ai',
    name: 'AI 工具',
    icon: 'mdi:robot-happy-outline',
    defaultOpened: true,
    children: [
      { id: 'ai-chat', name: 'AI 对话', icon: 'mdi:chat-processing-outline' },
      { id: 'ai-image', name: 'AI 图像', icon: 'mdi:image-outline' },
      { id: 'ai-search', name: 'AI 搜索', icon: 'mdi:magnify' },
    ]
  },
  {
    id: 'dev',
    name: '开发',
    icon: 'mdi:code-braces',
    defaultOpened: true,
    children: [
      { id: 'dev-code', name: '代码管理', icon: 'mdi:git' },
      { id: 'dev-deploy', name: '部署平台', icon: 'mdi:cloud-upload-outline' },
      { id: 'dev-tool', name: '开发工具', icon: 'mdi:tools' },
    ]
  },
  {
    id: 'design',
    name: '设计',
    icon: 'mdi:palette-outline',
    children: [
      { id: 'design-ui', name: 'UI 设计', icon: 'mdi:pencil-outline' },
      { id: 'design-resource', name: '设计资源', icon: 'mdi:folder-image' },
    ]
  },
  {
    id: 'productivity',
    name: '效率',
    icon: 'mdi:rocket-launch-outline',
    children: [
      { id: 'productivity-doc', name: '文档笔记', icon: 'mdi:file-document-outline' },
      { id: 'productivity-task', name: '任务管理', icon: 'mdi:checkbox-marked-outline' },
    ]
  },
  {
    id: 'tools',
    name: '工具',
    icon: 'mdi:wrench-outline',
    children: [
      { id: 'tools-common', name: '常用工具', icon: 'mdi:toolbox-outline' },
      { id: 'tools-dev', name: '开发者工具', icon: 'mdi:code-tags' },
    ]
  },
  {
    id: 'learning',
    name: '学习',
    icon: 'mdi:book-open-page-variant-outline',
    children: [
      { id: 'learning-doc', name: '技术文档', icon: 'mdi:book-outline' },
      { id: 'learning-video', name: '视频学习', icon: 'mdi:play-circle-outline' },
    ]
  },
  {
    id: 'media',
    name: '影音',
    icon: 'mdi:play-circle-outline',
    children: [
      { id: 'media-video', name: '视频平台', icon: 'mdi:youtube' },
      { id: 'media-music', name: '音乐播放', icon: 'mdi:music-note' },
    ]
  },
  {
    id: 'other',
    name: '其他',
    icon: 'mdi:folder-outline',
  },
]

export const navData: NavItem[] = [
  // ─── AI 工具 ────────────────────────────
  {
    id: 'chatgpt',
    title: 'ChatGPT',
    description: 'OpenAI 旗舰对话模型，写作、编程、分析全能助手',
    url: 'https://chat.openai.com',
    icon: 'https://cdn.oaistatic.com/assets/favicon-o20jt1lnth8n.svg',
    tags: ['AI', '对话', '写作'],
    category: 'ai',
    order: 1,
    isHot: true,
  },
  {
    id: 'claude',
    title: 'Claude',
    description: 'Anthropic 推出的 AI 助手，擅长长文本分析与编程',
    url: 'https://claude.ai',
    iconName: 'simple-icons:anthropic',
    tags: ['AI', '对话', '分析'],
    category: 'ai',
    order: 2,
    isHot: true,
  },
  {
    id: 'midjourney',
    title: 'Midjourney',
    description: 'AI 图像生成领域标杆，输入文字即可创造惊艳画作',
    url: 'https://midjourney.com',
    iconName: 'simple-icons:midjourney',
    tags: ['AI', '图像生成', '创意'],
    category: 'ai',
    order: 3,
    isNew: true,
  },
  {
    id: 'perplexity',
    title: 'Perplexity',
    description: 'AI 驱动的搜索引擎，实时联网，给出带来源的回答',
    url: 'https://perplexity.ai',
    iconName: 'mdi:brain',
    tags: ['AI', '搜索', '问答'],
    category: 'ai',
    order: 4,
    isNew: true,
  },
  {
    id: 'huggingface',
    title: 'Hugging Face',
    description: '全球最大的开源 AI 模型社区，模型、数据集一站式平台',
    url: 'https://huggingface.co',
    iconName: 'mdi:robot-love-outline',
    tags: ['AI', '开源', '模型'],
    category: 'ai',
    order: 5,
  },
  {
    id: 'poe',
    title: 'Poe',
    description: 'Quora 推出的 AI 聊天平台，一站体验多种 AI 模型',
    url: 'https://poe.com',
    iconName: 'mdi:lightning-bolt',
    tags: ['AI', '聚合', '对话'],
    category: 'ai',
    order: 6,
  },

  // ─── 开发 ──────────────────────────────
  {
    id: 'github',
    title: 'GitHub',
    description: '全球最大的代码托管平台，开发者社区和协作中心',
    url: 'https://github.com',
    icon: 'https://github.githubassets.com/favicons/favicon-dark.svg',
    tags: ['代码', 'Git', '协作'],
    category: 'dev',
    order: 1,
    isHot: true,
  },
  {
    id: 'vercel',
    title: 'Vercel',
    description: '前端部署平台，零配置部署 Next.js / Nuxt 等框架',
    url: 'https://vercel.com',
    iconName: 'simple-icons:vercel',
    tags: ['部署', '前端', 'Serverless'],
    category: 'dev',
    order: 2,
    isHot: true,
  },
  {
    id: 'vscode',
    title: 'VS Code',
    description: '微软出品的代码编辑器，插件生态极其丰富',
    url: 'https://code.visualstudio.com',
    iconName: 'simple-icons:visualstudiocode',
    tags: ['编辑器', 'IDE', '工具'],
    category: 'dev',
    order: 3,
  },
  {
    id: 'stackoverflow',
    title: 'Stack Overflow',
    description: '全球最大的程序员问答社区，编程问题的百科全书',
    url: 'https://stackoverflow.com',
    iconName: 'simple-icons:stackoverflow',
    tags: ['问答', '社区', '编程'],
    category: 'dev',
    order: 4,
  },
  {
    id: 'docker',
    title: 'Docker',
    description: '容器化技术标准，简化应用打包与部署',
    url: 'https://docker.com',
    iconName: 'simple-icons:docker',
    tags: ['容器', 'DevOps', '部署'],
    category: 'dev',
    order: 5,
  },
  {
    id: 'npm',
    title: 'npm',
    description: 'Node.js 包管理器，JavaScript 生态的基石',
    url: 'https://www.npmjs.com',
    iconName: 'simple-icons:npm',
    tags: ['包管理', 'Node.js', '前端'],
    category: 'dev',
    order: 6,
  },

  // ─── 设计 ──────────────────────────────
  {
    id: 'figma',
    title: 'Figma',
    description: '协作式 UI 设计工具，设计师与产品团队的首选',
    url: 'https://figma.com',
    iconName: 'simple-icons:figma',
    tags: ['设计', 'UI/UX', '协作'],
    category: 'design',
    order: 1,
    isHot: true,
  },
  {
    id: 'dribbble',
    title: 'Dribbble',
    description: '设计师作品展示社区，获取灵感与设计趋势',
    url: 'https://dribbble.com',
    iconName: 'simple-icons:dribbble',
    tags: ['灵感', '社区', 'UI'],
    category: 'design',
    order: 2,
  },
  {
    id: 'unsplash',
    title: 'Unsplash',
    description: '免费高质量图片素材库，可商用',
    url: 'https://unsplash.com',
    iconName: 'simple-icons:unsplash',
    tags: ['图片', '素材', '免费'],
    category: 'design',
    order: 3,
  },
  {
    id: 'coolors',
    title: 'Coolors',
    description: '快速配色方案生成器，一键生成和谐的调色板',
    url: 'https://coolors.co',
    iconName: 'mdi:palette-swatch-outline',
    tags: ['配色', '设计', '工具'],
    category: 'design',
    order: 4,
  },

  // ─── 效率 ──────────────────────────────
  {
    id: 'notion',
    title: 'Notion',
    description: '一体化工作空间，笔记、文档、数据库、项目管理',
    url: 'https://notion.so',
    iconName: 'simple-icons:notion',
    tags: ['笔记', '协作', '管理'],
    category: 'productivity',
    order: 1,
    isHot: true,
  },
  {
    id: 'obsidian',
    title: 'Obsidian',
    description: '本地优先的 Markdown 笔记工具，强大的双链知识图谱',
    url: 'https://obsidian.md',
    iconName: 'simple-icons:obsidian',
    tags: ['笔记', '知识管理', 'Markdown'],
    category: 'productivity',
    order: 2,
  },
  {
    id: 'linear',
    title: 'Linear',
    description: '新一代 Issue 跟踪工具，极致流畅的项目管理体验',
    url: 'https://linear.app',
    iconName: 'simple-icons:linear',
    tags: ['项目管理', '团队', '工具'],
    category: 'productivity',
    order: 3,
    isNew: true,
  },
  {
    id: 'todoist',
    title: 'Todoist',
    description: '简洁高效的待办事项管理工具，GTD 实践利器',
    url: 'https://todoist.com',
    iconName: 'simple-icons:todoist',
    tags: ['待办', 'GTD', '效率'],
    category: 'productivity',
    order: 4,
  },

  // ─── 工具 ──────────────────────────────
  {
    id: 'raycast',
    title: 'Raycast',
    description: 'Mac 上的效率启动器，快捷键控制一切',
    url: 'https://raycast.com',
    iconName: 'mdi:flash-outline',
    tags: ['启动器', 'Mac', '效率'],
    category: 'tools',
    order: 1,
    isHot: true,
  },
  {
    id: 'excalidraw',
    title: 'Excalidraw',
    description: '在线手绘风格白板工具，适合头脑风暴和技术图',
    url: 'https://excalidraw.com',
    iconName: 'mdi:pencil-ruler',
    tags: ['白板', '画图', '协作'],
    category: 'tools',
    order: 2,
  },
  {
    id: 'tinypng',
    title: 'TinyPNG',
    description: '在线图片压缩工具，大幅减小体积且保持画质',
    url: 'https://tinypng.com',
    iconName: 'mdi:image-size-select-small',
    tags: ['图片', '压缩', '工具'],
    category: 'tools',
    order: 3,
  },
  {
    id: 'regex101',
    title: 'Regex101',
    description: '在线正则表达式测试与调试工具',
    url: 'https://regex101.com',
    iconName: 'mdi:regex',
    tags: ['正则', '开发', '工具'],
    category: 'tools',
    order: 4,
  },

  // ─── 学习 ──────────────────────────────
  {
    id: 'mdn',
    title: 'MDN Web Docs',
    description: 'Mozilla 维护的权威 Web 技术文档，前端开发必备',
    url: 'https://developer.mozilla.org',
    iconName: 'simple-icons:mdnwebdocs',
    tags: ['文档', 'Web', 'API'],
    category: 'learning',
    order: 1,
    isHot: true,
  },
  {
    id: 'freecodecamp',
    title: 'freeCodeCamp',
    description: '免费的编程学习平台，从零到全栈工程师',
    url: 'https://www.freecodecamp.org',
    iconName: 'simple-icons:freecodecamp',
    tags: ['学习', '编程', '免费'],
    category: 'learning',
    order: 2,
  },
  {
    id: 'hackernews',
    title: 'Hacker News',
    description: 'Y Combinator 旗下的科技新闻聚合站，开发者必读',
    url: 'https://news.ycombinator.com',
    iconName: 'simple-icons:ycombinator',
    tags: ['新闻', '科技', '社区'],
    category: 'learning',
    order: 3,
  },
  {
    id: 'devto',
    title: 'DEV Community',
    description: '开发者博客社区，分享技术文章和经验',
    url: 'https://dev.to',
    iconName: 'simple-icons:devdotto',
    tags: ['博客', '社区', '技术'],
    category: 'learning',
    order: 4,
  },

  // ─── 影音 ──────────────────────────────
  {
    id: 'youtube',
    title: 'YouTube',
    description: '全球最大视频平台，学习、娱乐、资讯应有尽有',
    url: 'https://youtube.com',
    iconName: 'simple-icons:youtube',
    tags: ['视频', '学习', '娱乐'],
    category: 'media',
    order: 1,
    isHot: true,
  },
  {
    id: 'spotify',
    title: 'Spotify',
    description: '全球领先的音乐流媒体服务，千万级曲库',
    url: 'https://spotify.com',
    iconName: 'simple-icons:spotify',
    tags: ['音乐', '流媒体', '播客'],
    category: 'media',
    order: 2,
  },
  {
    id: 'bilibili',
    title: '哔哩哔哩',
    description: '国内领先的视频弹幕网站，学习与二次元文化聚集地',
    url: 'https://bilibili.com',
    iconName: 'simple-icons:bilibili',
    tags: ['视频', '弹幕', '学习'],
    category: 'media',
    order: 3,
    isHot: true,
  },
  {
    id: 'podcasts-apple',
    title: 'Apple Podcasts',
    description: 'Apple 官方播客平台，发现优质音频内容',
    url: 'https://podcasts.apple.com',
    iconName: 'simple-icons:applepodcasts',
    tags: ['播客', '音频', '知识'],
    category: 'media',
    order: 4,
  },
  // ─── 其他 ────────────────────────────
  {
    id: 'github',
    title: 'GitHub',
    description: '全球最大的代码托管平台，开源社区核心',
    url: 'https://github.com',
    iconName: 'simple-icons:github',
    tags: ['代码托管', '开源', '协作'],
    category: 'other',
    order: 1,
    isHot: true,
  },
  {
    id: 'gitlab',
    title: 'GitLab',
    description: '完整的 DevOps 平台，支持代码托管和 CI/CD',
    url: 'https://gitlab.com',
    iconName: 'simple-icons:gitlab',
    tags: ['代码托管', 'DevOps', 'CI/CD'],
    category: 'other',
    order: 2,
  },
]

/** 为每个分类计算网站数量（支持层级） */
export function getCategoriesWithCount(items: NavItem[] = navData): Category[] {
  return categories.map(cat => {
    // 计算当前分类的网站数量
    let count = 0
    if (cat.id === 'all') {
      count = items.length
    } else if (cat.children && cat.children.length > 0) {
      // 有子分类：统计所有子分类的网站总数
      const childIds = cat.children.map(child => child.id)
      count = items.filter(i => childIds.includes(i.category)).length
    } else {
      count = items.filter(i => i.category === cat.id).length
    }

    // 递归处理子分类
    const childrenWithCount = cat.children?.map(child => ({
      ...child,
      count: items.filter(i => i.category === child.id).length
    }))

    return {
      ...cat,
      count,
      children: childrenWithCount
    }
  })
}

/** 获取所有叶子节点分类（一级或二级，取决于哪一级有子分类） */
export function getLeafCategories(): Category[] {
  const result: Category[] = []

  for (const cat of categories) {
    if (cat.children && cat.children.length > 0) {
      // 该分类有子分类，只返回子分类
      result.push(...cat.children.map(child => ({
        ...child,
        parentId: cat.id,
        parentName: cat.name
      })))
    } else {
      // 没有子分类，返回自己
      result.push(cat)
    }
  }

  return result
}

/** 根据分类 ID 获取分类信息 */
export function getCategoryById(id: string): Category | undefined {
  for (const cat of categories) {
    if (cat.id === id) return cat
    if (cat.children) {
      const child = cat.children.find(c => c.id === id)
      if (child) return { ...child, parentId: cat.id, parentName: cat.name }
    }
  }
  return undefined
}
