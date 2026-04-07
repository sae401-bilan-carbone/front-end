<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import activityConfig from '../../../../config/activity'
import PreviousButton from '../ui/PreviousButton.vue';

  const activityStore = useActivityStore()
</script>

<template>
  <div>
    <p>Etape {{ activityStore.step }} sur {{ activityConfig.form.shopping.steps.length+2 }}</p>
  </div>

  <h4>Shopping form - structure in coming</h4>
</template>