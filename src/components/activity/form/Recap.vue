<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import { useRouter } from 'vue-router'

  const activityStore = useActivityStore()
  const router = useRouter()

  function previousHandle() {
    activityStore.step--
  }

  function resetHandle() {
    activityStore.step = 1
    activityStore.type = null
  }

  function handleValidate() {
    router.push({ name: 'dashboard' })
    
    activityStore.type = null
    activityStore.step = 1
  }
</script>

<template>
  <h4>Recap</h4>

  <div v-if="activityStore.type === 'journey'">
    <p><b>Véhicule : </b>{{ activityStore.data.journey.vehicule }}</p>
    <p><b>Distance : </b>{{ activityStore.data.journey.distance }} km</p>
    <p><b>Energie : </b>{{ activityStore.data.journey.energy }}</p>
  </div>

  <div>
    <button
      @click="previousHandle"
    >
      Retour
    </button>

    <button
      @click="resetHandle"
    >
      Recommencer
    </button>

    <button
      @click="handleValidate"
    >
      Valider
    </button>
  </div>
</template>