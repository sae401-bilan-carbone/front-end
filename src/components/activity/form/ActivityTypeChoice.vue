<script setup>
import { useI18n } from 'vue-i18n'
import { useActivityStore } from '@/services/store/useActivityStore'
import activityConfig from '../../../config/activity'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const activityStore = useActivityStore()
const router = useRouter()

const categoryIcons = { journey: '🚗', food: '🍽️', shopping: '🛍️' }

function radioHandle(type) {
  activityStore.setType(type)
  activityStore.setStep(activityStore.step + 1)
}

function previousHandle() { router.push({ name: 'dashboard' }) }
</script>

<template>
  <div class="type-choice">
    <p class="type-choice__hint">{{ t('activity.question') }}</p>

    <div class="type-list">
      <button v-for="type in activityConfig.categories" :key="type" class="type-item" @click="radioHandle(type)">
        <span class="type-item__icon">{{ categoryIcons[type] }}</span>
        <div class="type-item__body">
          <span class="type-item__label">{{ t(`activity.types.${type}.label`) }}</span>
          <span class="type-item__desc">{{ t(`activity.types.${type}.desc`) }}</span>
        </div>
        <span class="material-symbols-outlined type-item__arrow">chevron_right</span>
      </button>
    </div>

    <button class="btn-back" @click="previousHandle">
      <span class="material-symbols-outlined">arrow_back_ios</span>
      {{ t('activity.back_dashboard') }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

.type-choice {
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: $space-lg;
}

.type-choice__hint {
  font-family: $font-family-base;
  font-size: $font-size-sm;
  color: $gray-500;
  text-align: center;
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: $gray-200;
  border-radius: 20px;
  overflow: hidden;
}

.type-item {
  display: flex;
  align-items: center;
  gap: $space-md;
  background: $white;
  border: none;
  padding: $space-md $space-lg;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
  width: 100%;

  &:hover {
    background: rgba($primary-color, 0.04);
  }

  &__icon {
    font-size: 1.75rem;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__label {
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $gray-900;
  }

  &__desc {
    font-size: $font-size-xs;
    color: $gray-500;
  }

  &__arrow {
    font-size: 20px;
    color: $gray-500;
    flex-shrink: 0;
  }
}

.btn-back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-xs;
  background: none;
  border: none;
  color: $gray-500;
  font-family: $font-family-base;
  font-size: $font-size-sm;
  cursor: pointer;
  padding: $space-sm;
  transition: color 0.2s;

  span {
    font-size: 16px;
  }

  &:hover {
    color: $gray-900;
  }
}
</style>