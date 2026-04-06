declare module '@nuxtjs/color-mode' {
  interface ColorModeOptions {
    classSuffix: string
    preference: 'system' | 'light' | 'dark'
    fallback: 'light' | 'dark'
  }

  interface ColorModeUserConfig {
    classSuffix?: string
    preference?: 'system' | 'light' | 'dark'
    fallback?: 'light' | 'dark'
  }

  interface ColorModeInstance {
    value: 'system' | 'light' | 'dark'
    preference: 'system' | 'light' | 'dark'
    unknown: boolean
    setPreference(preference: 'system' | 'light' | 'dark'): void
    toggle(): void
    initialized: boolean
  }
}
