<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useActivityStore } from '@/services/store/useActivityStore'
import activityConfig from '../../../../config/activity'
import PreviousButton from '../ui/PreviousButton.vue'

const { t } = useI18n()
const activityStore = useActivityStore()

const counts = ref(Object.fromEntries(activityConfig.form.food.steps[0].meals.map(m => [m, 0])))

function increment(meal) { counts.value[meal]++ }
function decrement(meal) { if (counts.value[meal] > 0) counts.value[meal]-- }

function handleSubmit() {
  activityStore.data.food.meals = Object.entries(counts.value)
    .filter(([, count]) => count > 0)
    .map(([type, count]) => ({ type, count }))
  activityStore.step++
}

function tMeal(m) { return t(`activity.meals.${m.replaceAll(" ", "_")}`) }
</script>

<template>
  <div v-if="activityStore.step === 2" class="form-card">
    <p class="step-label">
      {{ t('common.step', { current: activityStore.step, total: activityConfig.form.food.steps.length + 2 }) }}
    </p>
    <h4 class="form-title">{{ t('form.food.title') }}</h4>
    <div class="meal-list">
      <div v-for="meal in activityConfig.form.food.steps[0].meals" :key="meal" class="meal-row">
        <span class="meal-row__label">{{ tMeal(meal) }}</span>
        <div class="counter">
          <button type="button" class="counter__btn" @click="decrement(meal)">−</button>
          <span class="counter__value">{{ counts[meal] }}</span>
          <button type="button" class="counter__btn counter__btn--add" @click="increment(meal)">+</button>
        </div>
      </div>
    </div>
    <div class="form-nav">
      <PreviousButton />
      <button class="btn-next" @click="handleSubmit">{{ t('common.next') }}</button>
    </div>
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

.form-title {
  font-family: $font-family-title;
  font-size: $font-size-base;
  font-weight: $font-weight-bold;
  color: $gray-900;
  margin-bottom: $space-lg;
  text-align: center;
}

.meal-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: $gray-200;
  border-radius: $radius-lg;
  overflow: hidden;
  margin-bottom: $space-lg;
}

.meal-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $white;
  padding: $space-md;

  &__label {
    font-family: $font-family-base;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $gray-900;
  }
}

.counter {
  display: flex;
  align-items: center;
  gap: $space-md;

  &__btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1.5px solid $gray-200;
    background: $white;
    color: $gray-900;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    transition: border-color 0.15s, background 0.15s, color 0.15s;

    &:hover {
      border-color: $primary-color;
      color: $primary-color;
    }

    &--add {
      border-color: $primary-color;
      color: $primary-color;

      &:hover {
        background: $primary-color;
        color: $white;
      }
    }
  }

  &__value {
    font-family: $font-family-title;
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $primary-color;
    min-width: 20px;
    text-align: center;
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