<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'

  const activityStore = useActivityStore()

  function previousHandle() {
    activityStore.step--
  }
</script>

<template>
  <button
    @click="previousHandle"
  >
    Retour
  </button>
</template>