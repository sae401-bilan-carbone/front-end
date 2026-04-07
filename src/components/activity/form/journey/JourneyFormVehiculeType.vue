<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import activityConfig from '../../../../config/activity'
import PreviousButton from '../ui/PreviousButton.vue'

  const activityStore = useActivityStore()

  function radioHandle(type) {
    activityStore.data.journey.vehicule = type
    activityStore.step++
  }
</script>

<template>
  <h4>Type de véhicule</h4>

  <div v-for="(type, typeIndex) in activityConfig.form.journey.steps[0].types">
    <label :for="type">{{ type }}</label>
    <input
      type="radio"
      name="vehicule-type"
      :id="type"
      :value="type"
      @change="radioHandle(type)"
    >
  </div>

  <div>
    <PreviousButton />
  </div>
</template>