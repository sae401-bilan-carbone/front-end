<script setup>
  import { useI18n } from 'vue-i18n'
  import { useActivityStore } from '@/services/store/useActivityStore'
  import { useRouter } from 'vue-router'

  const { t } = useI18n()
  const activityStore = useActivityStore()
  const router = useRouter()

  function previousHandle() { activityStore.step-- }
  function resetHandle() { activityStore.reset() }

  async function handleValidate() {
    try {
      await activityStore.submitActivity()
      activityStore.reset()
      router.push({ name: 'dashboard' })
    } catch {}
  }

  function tVehicle(v) { return v ? t(`activity.vehicles.${v}`) : '—' }
  function tEnergy(e) { return e ? t(`activity.energy.${e.replaceAll(' ', '_')}`) : '—' }
  function tMeal(m) { return t(`activity.meals.${m.replaceAll(' ', '_')}`) }
  function tCat(c) { return t(`activity.shopping_cats.${c}`) }
</script>

<template>
  <div class="recap-container">
    <div class="recap-header">
      <h2 class="header-title">{{ t('form.recap.title') }}</h2>
    </div>

    <div class="recap-card">
      <div v-if="activityStore.type === 'journey'" class="recap-list">
        <div class="recap-item">
          <span class="label">{{ t('form.recap.vehicle') }} :</span>
          <span class="value">{{ tVehicle(activityStore.data.journey.vehicule) }}</span>
        </div>
        <div class="recap-item">
          <span class="label">{{ t('form.recap.distance') }} :</span>
          <span class="value">{{ activityStore.data.journey.distance }} {{ t('common.units.km') }}</span>
        </div>
        <div class="recap-item">
          <span class="label">{{ t('form.recap.energy') }} :</span>
          <span class="value">{{ tEnergy(activityStore.data.journey.energy) }}</span>
        </div>
      </div>

      <div v-else-if="activityStore.type === 'food'" class="recap-list">
        <div v-for="(meal, i) in activityStore.data.food.meals" :key="i" class="recap-item">
          <span class="label">{{ tMeal(meal.type) }} :</span>
          <span class="value">× {{ meal.count }}</span>
        </div>
        <div v-if="!activityStore.data.food.meals.length" class="recap-fallback">{{ t('form.recap.no_meals') }}</div>
      </div>

      <div v-else-if="activityStore.type === 'shopping'" class="recap-list">
        <div v-for="(item, i) in activityStore.data.shopping.items" :key="i" class="recap-item">
          <span class="label">{{ tCat(item.category) }} :</span>
          <span class="value">{{ item.amount }} {{ t('common.units.euro') }}</span>
        </div>
        <div v-if="!activityStore.data.shopping.items.length" class="recap-fallback">{{ t('form.recap.no_items') }}</div>
      </div>

      <div v-else class="recap-fallback">{{ t('form.recap.ready') }}</div>
    </div>

    <p v-if="activityStore.error" class="error-msg">{{ activityStore.error }}</p>

    <div class="recap-footer">
      <div class="secondary-actions">
        <button class="btn-gray" :disabled="activityStore.loading" @click="resetHandle">{{ t('common.cancel') }}</button>
        <button class="btn-gray" :disabled="activityStore.loading" @click="previousHandle">{{ t('common.modify') }}</button>
      </div>
      <button class="btn-validate" :disabled="activityStore.loading" @click="handleValidate">
        {{ activityStore.loading ? t('form.recap.submitting') : t('common.validate') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;
.recap-container { display: flex; flex-direction: column; align-items: center; padding: $space-lg $space-lg $space-xl; min-height: 70vh; }
.recap-header { margin-bottom: $space-xl; text-align: center; width: 100%;
  .header-title { font-family: $font-family-title; font-size: $font-size-lg; color: $black; font-weight: $font-weight-medium; margin: 0; }
}
.recap-card { width: 100%; max-width: 350px; border: 1.5px solid $primary-dark; border-radius: 25px; padding: $space-xl; background-color: $white; margin-bottom: auto;
  .recap-list { display: flex; flex-direction: column; gap: $space-md; }
  .recap-item { display: flex; justify-content: space-between; font-family: $font-family-base; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 4px;
    .label { font-weight: $font-weight-medium; color: $black; }
    .value { color: #666; }
  }
  .recap-fallback { text-align: center; color: #999; font-family: $font-family-base; }
}
.error-msg { margin-top: $space-md; color: $danger; font-size: $font-size-sm; font-family: $font-family-base; text-align: center; }
.recap-footer { width: 100%; max-width: 350px; display: flex; flex-direction: column; gap: $space-sm; margin-top: $space-xl;
  .secondary-actions { display: grid; grid-template-columns: 1fr 1fr; gap: $space-sm; }
  button { height: 40px; border-radius: $radius-full; border: none; font-family: $font-family-base; font-weight: $font-weight-medium; cursor: pointer; font-size: $font-size-sm; transition: background-color 0.2s; &:disabled { opacity: 0.6; cursor: not-allowed; } &:not(:disabled):hover { opacity: 0.9; } }
  .btn-gray { background-color: #BDBDBD; color: $white; }
  .btn-validate { background-color: rgba($primary-color, 0.8); color: $white; width: 100%; }
}
</style>