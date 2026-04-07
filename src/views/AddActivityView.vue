<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import ActivityStep1 from '@/components/activity/form/ActivityStep1.vue'
  import activityConfig from '../config/activity'

  const activityStore = useActivityStore()
</script>

<template>
  <h1>Nouvelle activité</h1>

  <p>Etape {{ activityStore.step }} sur {{ activityConfig.totalSteps }}.</p>

  <ActivityStep1
    v-if="activityStore.step === 1"
  />
</template>