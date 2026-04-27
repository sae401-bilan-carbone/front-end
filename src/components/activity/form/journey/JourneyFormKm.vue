<script setup>
import { useI18n } from 'vue-i18n'
import { useActivityStore } from '@/services/store/useActivityStore'
import PreviousButton from '../ui/PreviousButton.vue'

const { t } = useI18n()
const activityStore = useActivityStore()

function handleSubmit() { activityStore.step++ }
</script>

<template>
  <h4 class="form-title">{{ t('form.journey.distance') }}</h4>
  <div class="km-display">
    <span class="km-display__value">{{ activityStore.data.journey.distance ?? 0 }}</span>
    <span class="km-display__unit">{{ t('common.units.km') }}</span>
  </div>
  <input type="range" min="0" max="500" step="1" v-model="activityStore.data.journey.distance" class="slider" />
  <div class="form-nav">
    <PreviousButton />
    <button class="btn-next" @click="handleSubmit">{{ t('common.next') }}</button>
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

.km-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: $space-xs;
  margin-bottom: $space-lg;

  &__value {
    font-family: $font-family-title;
    font-size: 2.5rem;
    font-weight: $font-weight-bold;
    color: $primary-color;
    line-height: 1;
  }

  &__unit {
    font-size: $font-size-md;
    color: $gray-500;
    font-weight: $font-weight-medium;
  }
}

.slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: $radius-full;
  background: $gray-200;
  outline: none;
  margin-bottom: $space-xl;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: $primary-color;
    cursor: pointer;
    border: 3px solid $white;
    box-shadow: 0 0 0 1.5px $primary-color, $shadow-sm;
  }

  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: $primary-color;
    cursor: pointer;
    border: 3px solid $white;
  }
}

.form-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-next {
  background: $primary-color;
  color: $white;
  border: none;
  border-radius: $radius-full;
  padding: 10px $space-lg;
  font-family: $font-family-base;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: $primary-dark;
  }
}
</style>