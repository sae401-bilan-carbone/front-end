<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
import PreviousButton from '../ui/PreviousButton.vue';

  const activityStore = useActivityStore()

  function handleSubmit() {
    activityStore.step++
  }
</script>

<template>
  <h4>Distance en km</h4>

  <form @submit.prevent="handleSubmit">
    <div>
      <label for="km">Distance</label>
      <input
        id="km"
        type="number"
        v-model="activityStore.data.journey.distance"
      >
    </div>

    <div>
      <PreviousButton />
      
      <button
        type="submit"
      >
        Suivant
      </button>
    </div>
  </form>
</template>