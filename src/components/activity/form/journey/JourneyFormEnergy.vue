<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import activityConfig from '../../../../config/activity'
import PreviousButton from '../ui/PreviousButton.vue'

  const activityStore = useActivityStore()

  function radioHandle(energy) {
    activityStore.data.journey.energy = energy
    activityStore.step++
  }
</script>

<template>
  <h4>Energie utilisée</h4>

  <div v-for="(energy, energyIndex) in activityConfig.form.journey.steps[2].energy">
    <label :for="energy">{{ energy }}</label>
    <input
      type="radio"
      name="vehicule-energy"
      :id="energy"
      :value="energy"
      @change="radioHandle(energy)"
    >
  </div>

  <div>
    <PreviousButton />
  </div>
</template>