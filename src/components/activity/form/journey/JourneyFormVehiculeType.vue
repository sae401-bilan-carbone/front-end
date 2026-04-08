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

  <div v-for="type in activityConfig.form.journey.steps[0].types">

    <!-- input AVANT -->
    <input
      type="radio"
      name="vehicule-type"
      :id="type"
      :value="type"
      @change="radioHandle(type)"
    />

    <!-- label APRÈS + class -->
    <label :for="type" class="choice-btn">
      {{ type }}
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

/* cache les radios */
input[type="radio"] {
  display: none;
}

/* bouton */
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

/* sélection */
input[type="radio"]:checked + .choice-btn {
  background: #4CAF50;
  color: white;
}

/* navigation */
.actions {
  margin-top: 20px;
}
</style>