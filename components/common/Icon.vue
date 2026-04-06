<template>
  <ClientOnly>
    <IconifyIcon :icon="name" v-bind="$attrs" />
    <template #fallback>
      <span class="inline-block w-[1em] h-[1em]" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'

defineOptions({ inheritAttrs: false })

defineProps<{
  name: string
}>()
</script>
