<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import ActivityTypeChoice from '@/components/activity/form/ActivityTypeChoice.vue'
  import activityConfig from '../config/activity'
  import JourneyForm from '@/components/activity/form/journey/JourneyForm.vue'
  import Recap from '@/components/activity/form/Recap.vue'
  import { computed, onMounted } from 'vue'

  const activityStore = useActivityStore()

  const recapStep = computed(() => {
    const type = activityStore.type || 'food'
    return activityConfig.form[type].steps.length + 2
  })

  onMounted(() => {
    activityStore.step = 1
    activityStore.type = null
  })
</script>

<template>
  <h1>Nouvelle activité</h1>

  <ActivityTypeChoice
    v-if="activityStore.step === 1"
  />

  <JourneyForm
    v-if="activityStore.type === 'journey'"
  />

  <Recap
    v-if="activityStore.step === recapStep"
  />
</template>