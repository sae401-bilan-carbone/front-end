<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import activityConfig from '../../../../config/activity'

  const activityStore = useActivityStore()
</script>

<template>
  <div>
    <p>Etape {{ activityStore.step }} sur {{ activityConfig.form.food.steps.length+2 }}</p>
  </div>

  <h4>Food form - structure in coming</h4>
</template>