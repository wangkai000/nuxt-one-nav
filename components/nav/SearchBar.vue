<template>
  <div class="relative">
    <Icon
      name="mdi:magnify"
      class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10"
    />
    <input
      ref="inputRef"
      v-model="localQuery"
      type="text"
      placeholder="搜索导航..."
      class="w-48 h-9 pl-10 pr-4 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
      @input="onInput"
    />
    <button
      v-if="localQuery"
      @click="clearSearch"
      class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <Icon name="mdi:close" class="w-3.5 h-3.5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { setQuery } = useSearch()
const inputRef = ref<HTMLInputElement | null>(null)
const localQuery = ref('')

const onInput = () => setQuery(localQuery.value)
const clearSearch = () => {
  localQuery.value = ''
  setQuery('')
  inputRef.value?.focus()
}

onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      inputRef.value?.focus()
    }
    if (e.key === 'Escape' && document.activeElement === inputRef.value) {
      clearSearch()
      inputRef.value?.blur()
    }
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>
