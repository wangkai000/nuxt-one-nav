/**
 * Favicon URL 工具 — NavCard.vue 和 detail/[id].vue 共用
 */
import type { NavItem } from '~/types/nav'

// 判断是否为 iconify 图标名（不以协议/路径开头的 prefixed 格式）
const ICONIFY_PREFIXES = ['simple-icons:', 'mdi:', 'fluent-emoji:', 'logos:', 'vscode-icons:']

export function isIconifyIcon(icon: string): boolean {
  return ICONIFY_PREFIXES.some(p => icon.startsWith(p))
}

export function getFaviconFromUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return `${urlObj.origin}/favicon.ico`
  } catch {
    return `${url.replace(/\/$/, '')}/favicon.ico`
  }
}

/**
 * 获取图标的可用 URL：优先用 item.icon，否则从 URL 生成 favicon
 */
export function getIconUrl(item: NavItem): string {
  if (item.icon && !isIconifyIcon(item.icon)) {
    return item.icon
  }
  return getFaviconFromUrl(item.url)
}
