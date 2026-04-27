<script setup>
  import { useI18n } from 'vue-i18n'
  import { useActivityStore } from '@/services/store/useActivityStore'
  import ActivityTypeChoice from '@/components/activity/form/ActivityTypeChoice.vue'
  import activityConfig from '../config/activity'
  import JourneyForm from '@/components/activity/form/journey/JourneyForm.vue'
  import Recap from '@/components/activity/form/Recap.vue'
  import { computed, onMounted } from 'vue'
  import FoodForm from '@/components/activity/form/food/FoodForm.vue'
  import ShoppingForm from '@/components/activity/form/shopping/ShoppingForm.vue'

  const { t } = useI18n()
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
  <div class="add-activity">
    <div class="add-activity__header">
      <h1 class="add-activity__title">{{ t('form.add_activity.title') }}</h1>
      <div class="progress-bar">
        <div
          class="progress-bar__fill"
          :style="{ width: `${(activityStore.step / recapStep) * 100}%` }"
        />
      </div>
    </div>
    <div class="add-activity__content">
      <ActivityTypeChoice v-if="activityStore.step === 1" />
      <JourneyForm  v-if="activityStore.type === 'journey'" />
      <FoodForm     v-if="activityStore.type === 'food'" />
      <ShoppingForm v-if="activityStore.type === 'shopping'" />
      <Recap        v-if="activityStore.step === recapStep" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;
.add-activity {
  min-height: 100vh; background-color: rgba($primary-color, 0.05);
  display: flex; flex-direction: column;
  &__header { padding: $space-lg $space-lg $space-md; background-color: $white; border-bottom: 1px solid $gray-200; }
  &__title { font-family: $font-family-title; font-size: $font-size-lg; font-weight: $font-weight-bold; color: $black; margin-bottom: $space-md; }
  &__content { flex: 1; padding: $space-xl $space-lg; display: flex; flex-direction: column; align-items: center; }
}
.progress-bar {
  width: 100%; height: 4px; background-color: $gray-200; border-radius: $radius-full; overflow: hidden;
  &__fill { height: 100%; background-color: $primary-color; border-radius: $radius-full; transition: width 0.35s ease; }
}
</style>