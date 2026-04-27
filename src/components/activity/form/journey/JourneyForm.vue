<script setup>
import { useI18n } from 'vue-i18n'
import { useActivityStore } from '@/services/store/useActivityStore'
import activityConfig from '../../../../config/activity'
import JourneyFormVehiculeType from './JourneyFormVehiculeType.vue'
import JourneyFormKm from './JourneyFormKm.vue'
import JourneyFormEnergy from './JourneyFormEnergy.vue'

const { t } = useI18n()
const activityStore = useActivityStore()
</script>

<template>
  <div class="form-card">
    <p class="step-label">
      {{ t('common.step', { current: activityStore.step, total: activityConfig.form.journey.steps.length + 2 }) }}
    </p>
    <JourneyFormVehiculeType v-if="activityStore.step === 2" />
    <JourneyFormKm v-if="activityStore.step === 3" />
    <JourneyFormEnergy v-if="activityStore.step === 4" />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

.form-card {
  width: 100%;
  max-width: 360px;
  background: $white;
  border-radius: 20px;
  padding: $space-lg;
  box-shadow: $shadow-md;
}

.step-label {
  font-size: $font-size-xs;
  color: $gray-500;
  font-family: $font-family-base;
  margin-bottom: $space-lg;
  text-align: center;
}
</style>