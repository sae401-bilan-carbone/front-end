<script setup>
import { useI18n } from 'vue-i18n'
import { useActivityStore } from '@/services/store/useActivityStore'
import activityConfig from '../../../../config/activity'
import PreviousButton from '../ui/PreviousButton.vue'

const { t } = useI18n()
const activityStore = useActivityStore()

function radioHandle(type) {
  activityStore.data.journey.vehicule = type
  activityStore.step++
}
</script>

<template>
  <h4 class="form-title">{{ t('form.journey.vehicle_type') }}</h4>
  <div class="choice-list">
    <div v-for="type in activityConfig.form.journey.steps[0].types" :key="type">
      <input type="radio" name="vehicule-type" :id="`vt-${type}`" :value="type" @change="radioHandle(type)" />
      <label :for="`vt-${type}`" class="choice-btn">{{ t(`activity.vehicles.${type}`) }}</label>
    </div>
  </div>
  <div class="form-nav">
    <PreviousButton />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

.form-title {
  font-family: $font-family-title;
  font-size: $font-size-base;
  font-weight: $font-weight-bold;
  color: $gray-900;
  margin-bottom: $space-lg;
  text-align: center;
}

.choice-list {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  margin-bottom: $space-lg;
}

input[type="radio"] {
  display: none;
}

.choice-btn {
  display: block;
  width: 100%;
  padding: 13px $space-md;
  border-radius: $radius-full;
  border: 1.5px solid $gray-200;
  background: $white;
  font-family: $font-family-base;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $gray-900;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.15s, background 0.15s, color 0.15s;

  &:hover {
    border-color: $primary-color;
    color: $primary-color;
  }
}

input[type="radio"]:checked+.choice-btn {
  background: $primary-color;
  border-color: $primary-color;
  color: $white;
}

.form-nav {
  display: flex;
  justify-content: flex-start;
}
</style>