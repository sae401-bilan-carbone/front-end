<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import activityConfig from '../../../config/activity'
  import { useRouter } from 'vue-router'

  const activityStore = useActivityStore()
  const router = useRouter()

  function radioHandle(type) {
    activityStore.setType(type)
    activityStore.setStep(activityStore.step + 1)
  }

  function previousHandle() {
    router.push({ name: 'dashboard' })
  }
</script>

<template>
  <h4>Quel type d'activité souhaitez-vous ajouter ?</h4>

  <div v-for="(type, typeIndex) in activityConfig.categories" :key="typeIndex">
    <label :for="type">{{ type }}</label>
    <input 
      type="radio"
      :id="type"
      :value="type"
      :checked="activityStore.type === type"
      @change="radioHandle(type)"
    >
  </div>

  <button
    @click="previousHandle"
  >
    Retour
  </button>
</template>