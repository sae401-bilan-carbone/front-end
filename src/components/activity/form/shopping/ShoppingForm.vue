<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useActivityStore } from '@/services/store/useActivityStore'
import activityConfig from '../../../../config/activity'
import PreviousButton from '../ui/PreviousButton.vue'

const { t } = useI18n()
const activityStore = useActivityStore()

const selectedCategory = ref(null)
const amount = ref(0)
const items = ref([])
const amountError = ref(false)

function selectCategory(cat) { selectedCategory.value = cat; amountError.value = false }

function addItem() {
  if (!selectedCategory.value || amount.value <= 0) { amountError.value = true; return }
  items.value.push({ category: selectedCategory.value, amount: Number(amount.value) })
  selectedCategory.value = null; amount.value = 0; amountError.value = false
}

function removeItem(index) { items.value.splice(index, 1) }

function handleSubmit() {
  activityStore.data.shopping.items = [...items.value]
  activityStore.step++
}

function tCat(c) { return t(`activity.shopping_cats.${c}`) }
</script>

<template>
  <div v-if="activityStore.step === 2" class="form-card">
    <p class="step-label">
      {{ t('common.step', { current: activityStore.step, total: activityConfig.form.shopping.steps.length + 2 }) }}
    </p>
    <h4 class="form-title">{{ t('form.shopping.title') }}</h4>
    <div class="choice-list">
      <div v-for="cat in activityConfig.form.shopping.steps[0].items" :key="cat">
        <input type="radio" name="shopping-category" :id="`cat-${cat}`" :value="cat" :checked="selectedCategory === cat"
          @change="selectCategory(cat)" />
        <label :for="`cat-${cat}`" class="choice-btn">{{ tCat(cat) }}</label>
      </div>
    </div>
    <div class="amount-block">
      <div class="amount-display">
        <span class="amount-display__value">{{ amount }}</span>
        <span class="amount-display__unit">{{ t('common.units.euro') }}</span>
      </div>
      <input type="range" min="0" max="1000" step="5" v-model="amount" class="slider" />
      <p v-if="amountError" class="amount-error">{{ t('form.shopping.amount_error') }}</p>
    </div>
    <button class="btn-add" @click="addItem">
      <span class="material-symbols-outlined">add</span>
      {{ t('form.shopping.add_item') }}
    </button>
    <div v-if="items.length" class="items-list">
      <div v-for="(item, i) in items" :key="i" class="item-tag">
        <span class="item-tag__text">{{ tCat(item.category) }} — {{ item.amount }} {{ t('common.units.euro') }}</span>
        <button class="item-tag__remove" @click="removeItem(i)"><span
            class="material-symbols-outlined">close</span></button>
      </div>
    </div>
    <div class="form-nav">
      <PreviousButton />
      <button class="btn-next" :disabled="!items.length" @click="handleSubmit">{{ t('common.next') }}</button>
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
  margin-bottom: $space-md;
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

.amount-block {
  margin-bottom: $space-md;
}

.amount-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: $space-xs;
  margin-bottom: $space-md;

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

.amount-error {
  font-size: $font-size-xs;
  color: $danger;
  text-align: center;
  margin-top: $space-xs;
}

.btn-add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-xs;
  width: 100%;
  padding: 11px;
  background: none;
  border: 1.5px dashed $primary-color;
  border-radius: $radius-full;
  color: $primary-color;
  font-family: $font-family-base;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  cursor: pointer;
  margin-bottom: $space-md;
  transition: background 0.15s;

  span {
    font-size: 18px;
  }

  &:hover {
    background: rgba($primary-color, 0.06);
  }
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: $space-xs;
  margin-bottom: $space-md;
}

.item-tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba($primary-color, 0.08);
  border-radius: $radius-full;
  padding: $space-xs $space-md;

  &__text {
    font-size: $font-size-sm;
    color: $primary-dark;
    font-weight: $font-weight-medium;
  }

  &__remove {
    background: none;
    border: none;
    color: $gray-500;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    transition: color 0.15s;

    span {
      font-size: 16px;
    }

    &:hover {
      color: $danger;
    }
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
  transition: background 0.2s, opacity 0.2s;

  &:hover:not(:disabled) {
    background: $primary-dark;
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}
</style>