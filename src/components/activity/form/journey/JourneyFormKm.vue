<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'

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

    <button
      type="submit"
    >
      Suivant
    </button>
  </form>
</template>