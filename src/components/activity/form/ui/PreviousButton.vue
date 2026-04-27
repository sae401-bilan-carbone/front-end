<script setup>
import { useI18n } from 'vue-i18n'
import { useActivityStore } from '@/services/store/useActivityStore'

const { t } = useI18n()
const activityStore = useActivityStore()

function previousHandle() { activityStore.step-- }
</script>

<template>
  <button class="btn-prev" @click="previousHandle">
    <span class="material-symbols-outlined">arrow_back_ios</span>
    {{ t('common.back') }}
  </button>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

.btn-prev {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  color: $gray-500;
  font-family: $font-family-base;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;

  span {
    font-size: 16px;
  }

  &:hover {
    color: $gray-900;
  }
}
</style>