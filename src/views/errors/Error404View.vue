<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<template>
  <h1>{{ t('error.404.title') }}</h1>
</template>