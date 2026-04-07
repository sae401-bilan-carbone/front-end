<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import JourneyFormVehiculeType from './JourneyFormVehiculeType.vue'
  import JourneyFormKm from './JourneyFormKm.vue'
  import JourneyFormEnergy from './JourneyFormEnergy.vue'

  const activityStore = useActivityStore()
</script>

<template>
  <JourneyFormVehiculeType 
    v-if="activityStore.step === 2"
  />

  <JourneyFormKm 
    v-if="activityStore.step === 3"
  />

  <JourneyFormEnergy 
    v-if="activityStore.step === 4"
  />
</template>