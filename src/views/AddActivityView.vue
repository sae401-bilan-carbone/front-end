<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import ActivityTypeChoice from '@/components/activity/form/ActivityTypeChoice.vue'
  import activityConfig from '../config/activity'
import JourneyForm from '@/components/activity/form/journey/JourneyForm.vue';
import Recap from '@/components/activity/form/Recap.vue';

  const activityStore = useActivityStore()
</script>

<template>
  <h1>Nouvelle activité</h1>

  <p>Etape {{ activityStore.step }} sur {{ activityConfig.totalSteps }}.</p>

  <ActivityTypeChoice
    v-if="activityStore.step === 1"
  />

  <JourneyForm
    v-if="activityStore.type === 'journey'"
  />

  <Recap
    v-if="activityStore.step === 5"
  />
</template>