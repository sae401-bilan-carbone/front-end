<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import activityConfig from '../../../../config/activity'
  import JourneyFormVehiculeType from './JourneyFormVehiculeType.vue'
  import JourneyFormKm from './JourneyFormKm.vue'
  import JourneyFormEnergy from './JourneyFormEnergy.vue'

  const activityStore = useActivityStore()
</script>

<template>
  <div>
    <p>Etape {{ activityStore.step }} sur {{ activityConfig.form.journey.steps.length+2 }}</p>
  </div>

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