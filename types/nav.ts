export interface NavItem {
  id: string
  title: string
  description: string
  url: string
  /** favicon URL */
  icon?: string
  /** Iconify 图标名称，icon 不存在或加载失败时使用 */
  iconName?: string
  tags?: string[]
  category: string
  order: number
  isHot?: boolean
  isNew?: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  order?: number
  count?: number
  bookmarks?: Bookmark[]
  children?: Category[]  // 二级子分类
  /** 是否默认展开（仅一级分类有效） */
  defaultOpened?: boolean
}

export interface Bookmark {
  id: string
  name: string
  url: string
  icon?: string
  desc?: string
  tags?: string[]
  categoryId?: string
}

export interface NavConfig {
  siteName: string
  siteDesc: string
  logo: string
  icp: string
  footer: string
  engines: SearchEngine[]
}

export interface SearchEngine {
  id: string
  name: string
  url: string
}
