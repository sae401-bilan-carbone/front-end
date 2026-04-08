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

    <!--  Card -->
    <div class="km-card">

      <!-- Valeur -->
      <div class="km-value">
        {{ activityStore.data.journey.distance }} km
      </div>

      <!-- Slider -->
      <input
        type="range"
        min="0"
        max="500"
        step="1"
        v-model="activityStore.data.journey.distance"
        class="slider"
      />

    </div>

    <div class="actions">
      <PreviousButton />

      <button type="submit">
        Suivant
      </button>
    </div>

  </form>
</template>
<style scoped>
h4 {
  font-size: 14px;
  margin-bottom: 15px;
}

/* 🟩 Card */
.km-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  margin-bottom: 20px;
}

/* 🔢 Valeur KM */
.km-value {
  font-size: 28px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 15px;
}

/* 🎚️ Slider */
.slider {
  width: 100%;
  -webkit-appearance: none;
  height: 6px;
  border-radius: 10px;
  background: #ddd;
  outline: none;
}

/* curseur */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}

/* Firefox */
.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}

/* boutons */
.actions {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
}

button[type="submit"] {
  background: #4CAF50;
  color: white;
}
</style>