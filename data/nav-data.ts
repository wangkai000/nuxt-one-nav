import type { NavItem, Category } from '~/types/nav'

// 从 resources.ts 转换的数据
export const navData: NavItem[] = [
  {
    id: 'faxianai',
    title: '发现AI',
    description: '覆盖自然语言处理、图像识别、数据分析等全领域，提供行业趋势报告+使用教程，界面简洁且支持精准搜索。',
    url: 'https://www.faxianai.com/',
    icon: 'https://www.faxianai.com/favicon.ico',
    tags: ['AI', '导航'],
    category: 'ai',
    order: 1,
  },
  {
    id: 'toolify',
    title: 'Toolify.ai',
    description: '全球最大AI工具库（超1.8万款工具），支持智能推荐和用户评分，自动化更新系统确保时效性。',
    url: 'https://www.toolify.ai/',
    icon: 'https://www.toolify.ai/favicon.ico',
    tags: ['AI', '导航'],
    category: 'ai',
    order: 2,
  },
  {
    id: 'ai-bot',
    title: 'AI工具集',
    description: '一个不错的AI工具收集网站',
    url: 'https://ai-bot.cn/',
    icon: 'https://ai-bot.cn/wp-content/uploads/2023/03/ai-bot-square-logo.png',
    tags: ['AI', '导航'],
    category: 'ai',
    order: 3,
  },
  {
    id: 'aigc',
    title: 'AIGC工具导航',
    description: 'AIGC导航，一个全网分类最全，收录最全的生成式人工智能工具导航平台，分类包括AI写作、AI绘画、AI视频、AI办公、AI数字人、AI设计、AI语音、AI音乐、AI论文、AI简历、AI智能体、文本转语音等AI工具。',
    url: 'https://www.aigc.cn/',
    icon: 'https://www.aigc.cn/wp-content/uploads/2025/06/aigc-icon.png',
    tags: ['AI', '导航'],
    category: 'ai',
    order: 4,
  },
  {
    id: 'coderutil',
    title: '智能工具导航',
    description: '智能工具导航，国内外热门ai工具集导航。智能工具导航,国内外热门ai工具集导航,ai工具,ai导航,智能对话,文生图,文生视频,AIGC,AiAgent,智能bot。',
    url: 'https://www.coderutil.com',
    icon: 'https://www.coderutil.com/favicon.ico',
    tags: ['AI', '导航'],
    category: 'ai',
    order: 5,
  },
  // Web3.0
  {
    id: 'panews',
    title: 'PANews数据导航',
    description: 'PANews 数据导航是区块链和 Web3.0 领域的重要工具，为用户提供了丰富的链上数据及各类相关资源，助力其在区块链领域的探索与投资决策。',
    url: 'https://www.panewslab.com',
    icon: 'https://image.panewslab.com/images/favicon.ico',
    tags: ['Web3.0'],
    category: 'web3',
    order: 1,
  },
  {
    id: 'web3-nav',
    title: 'Web3导航',
    description: '一个不错的Web3资源收集平台',
    url: 'https://www.d1dns.com/',
    icon: 'https://www.d1dns.com/assets/images/favicon.png',
    tags: ['Web3.0', '导航'],
    category: 'web3',
    order: 2,
  },
  {
    id: 'openbuild',
    title: 'OpenBuild',
    description: 'OpenBuild 是一个专注于 Web3 开发者生态的开源社区，致力于连接 Web2 与 Web3 技术领域，帮助开发者过渡到去中心化网络，并提供工具、资源及商业机会',
    url: 'https://openbuild.xyz/',
    icon: 'https://openbuild.xyz/favicon.ico',
    tags: ['Web3.0'],
    category: 'web3',
    order: 3,
  },
  {
    id: 'techflow',
    title: '深潮techflow',
    description: '深潮 TechFlow 是华语世界最具特色的区块链与加密货币深度媒体平台，以前沿洞察、内容质量与行业连接力著称。',
    url: 'https://www.techflowpost.com/',
    icon: 'https://upload.techflowpost.com/upload/images/20230331/2023033111502613443948.png',
    tags: ['Web3.0'],
    category: 'web3',
    order: 4,
  },
  {
    id: 'dejob',
    title: 'Dejob',
    description: 'Dejob构建您Web3职业生涯的最有力方式。',
    url: 'https://dejob.top/',
    icon: 'https://dejob.top/logo.svg',
    tags: ['Web3.0'],
    category: 'web3',
    order: 5,
  },
  {
    id: 'web3-career',
    title: 'Web3 Career',
    description: 'Web3 Career',
    url: 'https://web3.career/',
    icon: 'https://web3.career/favicon.ico',
    tags: ['Web3.0'],
    category: 'web3',
    order: 6,
  },
  // UI组件库
  {
    id: 'uiverse',
    title: 'Uiverse UI',
    description: 'uiverse.io是一个开源UI组件库平台，由社区驱动，提供大量可直接复用的UI组件，包括按钮、卡片、加载动画、表单控件等',
    url: 'https://uiverse.io/',
    icon: 'https://uiverse.io/android-chrome-512x512.png',
    tags: ['UI组件库'],
    category: 'ui-lib',
    order: 1,
  },
  {
    id: 'inspira',
    title: 'Inspira UI',
    description: 'Inspira UI 是 Vue3 生态中兼具「设计美学」与「技术深度」的革新者。其动态交互能力与模块化架构，特别适合追求视觉创新且需高效开发的团队。',
    url: 'https://inspira-ui.com/',
    icon: 'https://uiverse.io/android-chrome-512x512.png',
    tags: ['UI组件库'],
    category: 'ui-lib',
    order: 2,
  },
  {
    id: 'pixel-ui',
    title: 'Pixel-ui',
    description: '一个使用Css特性实现的Vue3像素风格UI库。',
    url: 'https://maomentai817.github.io/pixel-ui',
    icon: 'https://maomentai817.github.io/pixel-ui/images/homelogo.png',
    tags: ['UI组件库'],
    category: 'ui-lib',
    order: 3,
  },
  {
    id: 'headlessui',
    title: 'Headless UI',
    description: 'Headless UI 代表了现代UI开发的新范式，将交互逻辑与视觉表现分离，让开发者既能获得完整的组件功能，又能保持100%的设计控制权。',
    url: 'https://headlessui.com/',
    icon: 'https://headlessui.com/favicon.ico',
    tags: ['UI组件库'],
    category: 'ui-lib',
    order: 4,
  },
  {
    id: 'reactbits',
    title: 'ReactBits',
    description: '一个React动画UI组件库。',
    url: 'https://reactbits.dev/',
    icon: 'https://reactbits.dev/favicon.ico',
    tags: ['UI组件库'],
    category: 'ui-lib',
    order: 5,
  },
  {
    id: '21st',
    title: '21st.dev',
    description: 'Discover, share, and craft UI components 一个为提供高质量 UI 组件与设计资源的平台，很多代码完全也可以直接复制使用。',
    url: 'https://21st.dev',
    icon: 'https://21st.dev/favicon.ico',
    tags: ['UI组件库'],
    category: 'ui-lib',
    order: 6,
  },
  // 游戏开发引擎
  {
    id: 'cocos',
    title: 'cocos游戏引擎',
    description: 'Cocos 凭借开源免费策略、极致轻量化（尤其适合移动端及 IoT）和中国开发者生态，成为全球化通用引擎标杆。',
    url: 'https://www.cocos.com/',
    icon: 'https://www.cocos.com/favicon.ico',
    tags: ['游戏开发引擎'],
    category: 'game-engine',
    order: 1,
  },
  {
    id: 'lpengine',
    title: 'LP平台',
    description: '有意思的文字游戏平台，只为依然热爱文字游戏的你。',
    url: 'https://www.lpengine.cn',
    icon: 'https://www.lpengine.cn/images/favicon.ico',
    tags: ['游戏开发引擎'],
    category: 'game-engine',
    order: 2,
  },
  {
    id: 'advjs',
    title: 'ADV.js',
    description: '面向未来与前端的 ADV 文字冒险游戏引擎。',
    url: 'https://advjs.org/',
    icon: 'https://advjs.org/favicon.svg',
    tags: ['游戏开发引擎'],
    category: 'game-engine',
    order: 3,
  },
  {
    id: 'renpy',
    title: 'Ren\'Py',
    description: 'Ren\'Py 凭借 低门槛脚本+Python可扩展性 的双层设计，成为视觉小说开发的首选引擎。',
    url: 'https://www.renpy.org/',
    icon: 'https://www.renpy.org/static/favicon.ico',
    tags: ['游戏开发引擎'],
    category: 'game-engine',
    order: 4,
  },
  {
    id: 'gamemaker',
    title: 'GameMaker',
    description: 'GameMaker 凭借 "低门槛 + 高性能 2D 开发" 成为独立游戏黄金标准，尤其适合混合类型 2D 游戏。',
    url: 'https://gamemaker.io',
    icon: 'https://gamemaker.io/next/images/icons/favicon-32x32.png',
    tags: ['游戏开发引擎'],
    category: 'game-engine',
    order: 5,
  },
  {
    id: 'rpgmaker',
    title: 'RPG Maker',
    description: 'RPG Maker既是工具，更是创作者生态的基石——从提供免费试用到技术资源整合，从插件开发到作品分发，它降低了RPG开发的门槛。',
    url: 'https://www.rpgmakerweb.com/',
    icon: 'https://src.onlinedown.net/d/file/p/2019-01-18/bfa8537ccd4e24a88c58b02dfe4cf6b0.jpg',
    tags: ['游戏开发引擎'],
    category: 'game-engine',
    order: 6,
  },
  // 工具
  {
    id: 'docsmall',
    title: '在线压缩图片（工具整合）',
    description: 'docsmall.com 是由 INTERVAL 设计开发的在线文档处理工具。',
    url: 'https://docsmall.com/image-compress',
    icon: 'https://docsmall.com/_nuxt/icon-convert-to-jpg.Dca2FYe2.png',
    tags: ['Tool', '图片'],
    category: 'tools',
    order: 1,
  },
  {
    id: 'photopea',
    title: 'Photopea',
    description: '这个在线PS是捷克程序员Ivan Kutskir在2013年开发，至今已经发展了十多年了。',
    url: 'https://www.photopea.com/',
    icon: 'https://www.photopea.com/promo/icon512.png',
    tags: ['Tool'],
    category: 'tools',
    order: 2,
  },
  {
    id: 'drawio',
    title: 'Draw.io',
    description: '一款开源免费的在线图表绘制工具，适合绘制流程图、组织结构图、网络拓扑图等多种图表。',
    url: 'https://www.drawio.com/',
    icon: 'https://www.drawio.com/favicon.ico',
    tags: ['Tool'],
    category: 'tools',
    order: 3,
  },
  {
    id: 'mnggiflab',
    title: 'Mnggiflab',
    description: 'MNGGIFLAB-在线gif制作,视频转gif,gif编辑,gif合成,gif压缩,录屏gif',
    url: 'https://www.mnggiflab.com/',
    icon: 'https://mnggiflab.com/img/logo/logo-icon.png',
    tags: ['Tool', '图片'],
    category: 'tools',
    order: 4,
  },
  // 资源
  {
    id: 'ossnav',
    title: '开源精选',
    description: '开源精选是一款专注于收录优质开源工具的导航网站，开源精选只收集每个软件工具类目中完全免费且超好用的开源软件。',
    url: 'https://www.ossnav.com',
    icon: 'https://www.ossnav.com/wp-content/uploads/2024/11/1732557264-open-64.png',
    tags: ['开源', '导航'],
    category: 'resources',
    order: 1,
  },
  {
    id: 'tbox',
    title: 'Tbox导航',
    description: 'Tbox导航是一个集合大量优质在线工具的导航网站,包括实用工具、影音工具、图片工具、编程工具、网络资源等几十种分类。',
    url: 'https://www.tboxn.com/',
    icon: 'https://tboxn.com/wp-content/uploads/2022/03/cropped-tboxlogo512.png',
    tags: ['Tool', '导航'],
    category: 'resources',
    order: 2,
  },
  {
    id: 'awwwards',
    title: 'Awwwards',
    description: 'Awwwards 是一个专注于评选和展示全球顶尖网页设计的国际平台，被誉为"网页设计界的奥斯卡"',
    url: 'https://www.awwwards.com/',
    icon: 'https://assets.awwwards.com/assets/images/favicon-safari.svg',
    tags: ['资源'],
    category: 'resources',
    order: 3,
  },
  {
    id: 'dribbble',
    title: 'Dribbble',
    description: 'Dribbble 是一个以篮球元素为特色，采用邀请制，专注于 UI/UX 设计等领域，鼓励设计师展示作品、分享创意并进行互动交流的全球性设计社区',
    url: 'https://dribbble.com/',
    icon: 'https://cdn.dribbble.com/assets/dribbble-vector-ball-c75e531ccee3110d0ee5ae951fd1d0a65d2ff25d3c0577757ea7e8d8e3e75db4.svg',
    tags: ['资源', '社区', '设计'],
    category: 'resources',
    order: 4,
  },
  {
    id: 'template0',
    title: 'Template0',
    description: '一个很出名的网站模板网站。',
    url: 'https://template0.com/',
    icon: 'https://template0.com/favicon.ico',
    tags: ['资源'],
    category: 'resources',
    order: 5,
  },
  {
    id: 'htmlrev',
    title: 'HtmlRev',
    description: '另一个很出名的网站模板网站。',
    url: 'https://htmlrev.com/',
    icon: 'https://htmlrev.com/images/favicon.png',
    tags: ['资源'],
    category: 'resources',
    order: 6,
  },
  {
    id: 'cssloaders',
    title: 'CssLoaders',
    description: 'CssLoaders过渡动画集合网站',
    url: 'https://css-loaders.com/',
    icon: 'https://css-loaders.com/fav.png',
    tags: ['资源'],
    category: 'resources',
    order: 7,
  },
  {
    id: 'navnav',
    title: 'Navnav',
    description: '一个收集了大量导航栏特效的网站。',
    url: 'https://thuvien.org/navnav',
    icon: 'https://thuvien.org/favicon.png',
    tags: ['资源', '导航'],
    category: 'resources',
    order: 8,
  },
  {
    id: 'atemplate',
    title: 'A template',
    description: 'Free WebSite Templates with A Template。',
    url: 'https://atemplate.com/',
    icon: 'https://atemplate.com/favicon.ico',
    tags: ['资源'],
    category: 'resources',
    order: 9,
  },
  {
    id: 'freeapi',
    title: '免费API',
    description: '免费接口,免费API,免费服务的资源收集网站。',
    url: 'https://api.aa1.cn/',
    icon: 'https://api.aa1.cn/favicon.ico',
    tags: ['资源'],
    category: 'resources',
    order: 10,
  },
  {
    id: 'topindie',
    title: 'TopIndie.dev',
    description: 'TopIndie.dev 是独立开发者发现、展示和探索创新项目（从应用程序到开源工具）的中心。',
    url: 'https://topindie.dev/',
    icon: 'https://topindie.dev/assets/image/favicon.ico',
    tags: ['资源', '独立开发'],
    category: 'resources',
    order: 11,
  },
  {
    id: 'ideaharbor',
    title: 'Idea haber',
    description: '一个不错的英文产品灵感的集合平台，很适合独立开发者发掘灵感。',
    url: 'https://ideaharbor.xyz',
    icon: 'https://ideaharbor.xyz/favicon.ico',
    tags: ['资源', '社区'],
    category: 'resources',
    order: 12,
  },
  {
    id: 'uisdc',
    title: '优设网',
    description: '国内专业的设计师平台，汇聚大量设计教程、行业资讯和作品展示。',
    url: 'https://www.uisdc.com/',
    icon: 'https://www.uisdc.com/favicon.ico',
    tags: ['资源', '社区', '设计'],
    category: 'resources',
    order: 13,
  },
  {
    id: 'bgrdh',
    title: '办公人导航',
    description: '办公人导航是一个实用的办公生活导航网站,致力于分享优质的网站网址及软件资源等内容。',
    url: 'https://www.bgrdh.com/',
    icon: 'https://www.bgrdh.com/wp-content/uploads/2022/11/20221119185003612150.png',
    tags: ['导航', '资源'],
    category: 'resources',
    order: 14,
  },
  {
    id: 'fuun',
    title: 'fuun.fun',
    description: '奇趣网站收藏家',
    url: 'https://fuun.fun/',
    icon: 'https://fuun.fun/favicon.ico',
    tags: ['资源', '娱乐'],
    category: 'resources',
    order: 15,
  },
  // 游戏/社区
  {
    id: 'itch',
    title: 'Itch.io',
    description: '创立于2013年，由程序员兼游戏爱好者 Leaf Corcoran 创建，旨在打破传统平台（如Steam）的高门槛限制，为独立开发者提供无审核上架、自由定价和页面设计的开放空间。',
    url: 'https://itch.io/',
    icon: 'https://static.itch.io/images/logo-black-new.svg',
    tags: ['独立开发', '社区', '游戏'],
    category: 'games',
    order: 1,
  },
  {
    id: 'indienova',
    title: '独立精神 | indienova 独立游戏',
    description: 'Indienova 以 技术赋能+文化沉淀 的双轨模式，成为中国独立游戏领域的"生态基石"。',
    url: 'https://indienova.com/',
    icon: 'https://static.indienova.com/assets/images/logos/indienova_new@2x.png',
    tags: ['社区', '游戏'],
    category: 'games',
    order: 2,
  },
  {
    id: 'jundagame',
    title: '游戏开发资源整合集',
    description: '军大君的游戏开发资源整合集',
    url: 'https://jundagame.top/',
    icon: 'https://jundagame.top/logo/jundajun.png',
    tags: ['游戏', '导航'],
    category: 'games',
    order: 3,
  },
  // 社区
  {
    id: 'producthunt',
    title: 'Product hunt',
    description: 'Product Hunt 是一个全球领先的产品发现平台,于2013年由Ryan Howard创立,旨在帮助用户发现和分享最新的科技产品、创业公司和创新项目。',
    url: 'https://www.producthunt.com/',
    icon: 'https://www.producthunt.com/favicon.ico',
    tags: ['社区', '独立开发'],
    category: 'community',
    order: 1,
  },
  {
    id: 'nodejs',
    title: 'Nodejs中文网',
    description: '翻译整理的还不错',
    url: 'https://dev.nodejs.cn/',
    icon: 'https://dev.nodejs.cn/favicon.ico',
    tags: ['社区', '文档'],
    category: 'community',
    order: 2,
  },
  // 学习
  {
    id: 'julebu',
    title: '句乐部',
    description: '阿崔老师的项目，让你上瘾的英语学习工具。',
    url: 'https://julebu.co',
    icon: 'https://julebu.co/favicon.ico',
    tags: ['学习'],
    category: 'learning',
    order: 1,
  },
]

// 根据新数据调整分类
export const categories: Category[] = [
  { id: 'all', name: '全部', icon: 'mdi:apps', defaultOpened: true },
  {
    id: 'ai',
    name: 'AI 工具',
    icon: 'mdi:robot-happy-outline',
    defaultOpened: true,
    children: [
      { id: 'ai-nav', name: 'AI导航', icon: 'mdi:compass-outline' },
    ]
  },
  {
    id: 'web3',
    name: 'Web3.0',
    icon: 'mdi:cube-outline',
    defaultOpened: true,
  },
  {
    id: 'ui-lib',
    name: 'UI组件库',
    icon: 'mdi:puzzle-outline',
    children: [
      { id: 'ui-lib-vue', name: 'Vue组件', icon: 'mdi:vuejs' },
      { id: 'ui-lib-react', name: 'React组件', icon: 'mdi:react' },
    ]
  },
  {
    id: 'game-engine',
    name: '游戏引擎',
    icon: 'mdi:gamepad-variant-outline',
  },
  {
    id: 'tools',
    name: '实用工具',
    icon: 'mdi:tools',
  },
  {
    id: 'resources',
    name: '资源导航',
    icon: 'mdi:folder-open-outline',
  },
  {
    id: 'games',
    name: '游戏社区',
    icon: 'mdi:gamepad-square-outline',
  },
  {
    id: 'community',
    name: '开发者社区',
    icon: 'mdi:account-group-outline',
  },
  {
    id: 'learning',
    name: '学习',
    icon: 'mdi:school-outline',
  },
]

/** 为每个分类计算网站数量（支持层级） */
export function getCategoriesWithCount(items: NavItem[] = navData): Category[] {
  return categories.map(cat => {
    let count = 0
    if (cat.id === 'all') {
      count = items.length
    } else {
      count = items.filter(i => i.category === cat.id).length
    }

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

/** 获取所有叶子节点分类 */
export function getLeafCategories(): Category[] {
  const result: Category[] = []

  for (const cat of categories) {
    if (cat.children && cat.children.length > 0) {
      result.push(...cat.children.map(child => ({
        ...child,
        parentId: cat.id,
        parentName: cat.name
      })))
    } else {
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
