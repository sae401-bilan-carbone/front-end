<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<template>
  <p>{{ t('test') }}</p>
</template>

<style lang="scss" scoped>
// Ton code SCSS spécifique au composant ici
.layout-container {
  display: flex;
  background-color: $primary-color; // Si tu as configuré l'auto-import
}
</style>