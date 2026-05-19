<template>
  <footer class="mt-16 py-6 px-6 border-t border-gray-200 dark:border-gray-800">
    <p class="text-xs text-gray-400 dark:text-gray-600 text-center">
      © {{ new Date().getFullYear() }} {{ $t('footer.copyright') }} · {{ $t('footer.built') }} Nuxt 4
    </p>
  </footer>
</template>
