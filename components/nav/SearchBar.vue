<template>
  <div class="relative">
    <Icon
      name="mdi:magnify"
      class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10"
    />
    <input
      ref="inputRef"
      v-model="localQuery"
      type="search"
      :placeholder="config.nav.searchPlaceholder"
      class="w-48 h-9 pl-10 pr-4 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
      @input="onInput"
      @search="onSearchClear"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useDebounceFn } from '@vueuse/core'

const config = useRuntimeConfig().public.siteConfig

const { setQuery } = useSearch()
const inputRef = ref<HTMLInputElement | null>(null)
const localQuery = ref('')

const debouncedSearch = useDebounceFn((val: string) => setQuery(val), 300)
const onInput = () => debouncedSearch(localQuery.value)

// 浏览器原生 search input 的清除事件
const onSearchClear = (e: Event) => {
  localQuery.value = ''
  setQuery('')
}

onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      inputRef.value?.focus()
    }
    if (e.key === 'Escape' && document.activeElement === inputRef.value) {
      localQuery.value = ''
      setQuery('')
      inputRef.value?.blur()
    }
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>
