import type { Ref } from 'vue'
import { ref, computed } from 'vue'

/**
 * 主题切换 composable
 * 使用 Nuxt Color Mode 模块
 */
export const useTheme = () => {
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.value === 'dark')

  const toggle = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  const setDark = () => {
    colorMode.preference = 'dark'
  }

  const setLight = () => {
    colorMode.preference = 'light'
  }

  const setSystem = () => {
    colorMode.preference = 'system'
  }

  return {
    isDark,
    toggle,
    setDark,
    setLight,
    setSystem,
    colorMode
  }
}
