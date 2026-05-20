/**
 * 图标映射 - 分类图标和域名图标的统一常量
 * 在 NavCard.vue 和 detail/[id].vue 中共用
 */

export const categoryIconMap: Record<string, string> = {
  'ai': 'mdi:robot',
  'ai-nav': 'mdi:compass',
  'ai-writing': 'mdi:pen',
  'ai-framework': 'mdi:file-code',
  'ai-local': 'mdi:desktop-classic',
  'ai-visual': 'mdi:palette',
  'ai-content': 'mdi:palette-swatch',
  'ai-agent': 'mdi:robot',
  'web3': 'mdi:ethereum',
  'web3-info': 'mdi:information',
  'web3-ui': 'mdi:metamask',
  'web3-lib': 'mdi:wallet',
  'web3-framework': 'mdi:file-code',
  'web3-lang': 'mdi:language-solidity',
  'frontend': 'mdi:language-javascript',
  'frontend-react': 'mdi:react',
  'frontend-vue': 'mdi:vuejs',
  'frontend-other': 'mdi:svelte',
  'frontend-ui-lib': 'mdi:storybook',
  'frontend-css': 'mdi:tailwind',
  'frontend-build': 'mdi:vite',
  'frontend-webgl': 'mdi:cube',
  'frontend-ai': 'mdi:robot',
  'frontend-webgis': 'mdi:map-marker',
  'nodejs': 'mdi:nodejs',
  'nodejs-web': 'mdi:web',
  'nodejs-threads': 'mdi:threads',
  'nodejs-database': 'mdi:database',
  'go-ecosystem': 'mdi:language-go',
  'mobile': 'mdi:cellphone',
  'desktop': 'mdi:laptop',
  'bun-ecosystem': 'mdi:bun',
  'tools': 'mdi:toolbox',
  'resources': 'mdi:map',
  'game-engines': 'mdi:gamepad-variant',
  '3d-modeling': 'mdi:cube-outline',
  'games': 'mdi:gamepad',
  'community': 'mdi:account-group',
  'learning': 'mdi:book-open-variant',
}

export const domainIconMap: Record<string, string> = {
  'github': 'mdi:github',
  'gitlab': 'mdi:gitlab',
  'gitee': 'mdi:git',
  'bilibili': 'mdi:bilibili',
  'youtube': 'mdi:youtube',
  'twitter': 'mdi:twitter',
  'x.com': 'mdi:twitter',
  'juejin': 'mdi:emoticon-outline',
  'zhihu': 'mdi:zhihu',
  'google': 'mdi:google',
  'stackoverflow': 'mdi:stackoverflow',
  'discord': 'mdi:discord',
  'telegram': 'mdi:telegram',
  'reddit': 'mdi:reddit',
  'medium': 'mdi:medium',
  'dev.to': 'mdi:dev-to',
}

export const tagIconRules: Array<{ tags: string[]; icon: string }> = [
  { tags: ['vue', 'vuejs'], icon: 'mdi:vuejs' },
  { tags: ['react'], icon: 'mdi:react' },
  { tags: ['angular'], icon: 'mdi:angular' },
  { tags: ['svelte'], icon: 'mdi:svelte' },
  { tags: ['node', 'nodejs'], icon: 'mdi:nodejs' },
  { tags: ['python'], icon: 'mdi:language-python' },
  { tags: ['typescript', 'ts'], icon: 'mdi:language-typescript' },
  { tags: ['javascript', 'js'], icon: 'mdi:language-javascript' },
  { tags: ['rust'], icon: 'mdi:language-rust' },
  { tags: ['go', 'golang'], icon: 'mdi:language-go' },
  { tags: ['docker'], icon: 'mdi:docker' },
  { tags: ['ai', 'gpt', 'llm'], icon: 'mdi:robot' },
]

/**
 * 根据分类、域名、标签获取兜底图标
 */
export function getFallbackIcon(category?: string, url?: string, tags?: string[]): string {
  if (category && categoryIconMap[category]) return categoryIconMap[category]
  if (url) {
    const lower = url.toLowerCase()
    for (const [domain, icon] of Object.entries(domainIconMap)) {
      if (lower.includes(domain)) return icon
    }
  }
  if (tags) {
    const lower = tags.map(t => t.toLowerCase())
    for (const rule of tagIconRules) {
      if (lower.some(t => rule.tags.includes(t))) return rule.icon
    }
  }
  return 'mdi:globe'
}
