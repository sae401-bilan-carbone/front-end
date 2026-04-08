<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import activityConfig from '../../../../config/activity'
  import JourneyFormVehiculeType from './JourneyFormVehiculeType.vue'
  import JourneyFormKm from './JourneyFormKm.vue'
  import JourneyFormEnergy from './JourneyFormEnergy.vue'

  const activityStore = useActivityStore()
</script>

<template>
  <div class="form-wrapper">
    <div class="form-card">

      <p class="step">
        Etape {{ activityStore.step }} sur {{ activityConfig.form.journey.steps.length + 2 }}
      </p>

      <JourneyFormVehiculeType v-if="activityStore.step === 2" />

      <JourneyFormKm v-if="activityStore.step === 3" />

      <JourneyFormEnergy v-if="activityStore.step === 4" />

    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  background: #ddd;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

button:hover {
  background: #ccc;
}

.form-card {
  background: white;
  padding: 20px;
  border-radius: 20px;
  width: 300px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  text-align: center;
}

.step {
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
}
</style>