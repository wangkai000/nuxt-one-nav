<template>
  <footer class="mt-16 py-6 px-6 border-t border-gray-200 dark:border-gray-800">
    <p class="text-xs text-gray-400 dark:text-gray-600 text-center">
      © {{ new Date().getFullYear() }} {{ config.footer.copyright }} · 基于 Nuxt 4
    </p>
  </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig().public.siteConfig
</script>
