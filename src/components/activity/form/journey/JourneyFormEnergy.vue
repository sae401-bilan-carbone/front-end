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

  <div v-for="energy in activityConfig.form.journey.steps[2].energy">

    <!-- input AVANT -->
    <input
      type="radio"
      name="vehicule-energy"
      :id="energy"
      :value="energy"
      @change="radioHandle(energy)"
    />

    <!-- label APRÈS -->
    <label :for="energy" class="choice-btn">
      {{ energy }}
    </label>

  </div>

  <div class="actions">
    <PreviousButton />
  </div>
</template>

<style scoped>
h4 {
  font-size: 14px;
  margin-bottom: 15px;
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

input[type="radio"] {
  display: none;
}

.choice-btn {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 6px 0;

  border-radius: 25px;
  border: 1px solid #4CAF50;
  background: white;

  cursor: pointer;
  transition: all 0.2s;
}

input[type="radio"]:checked + .choice-btn {
  background: #4CAF50;
  color: white;
}

.actions {
  margin-top: 20px;
}
</style>