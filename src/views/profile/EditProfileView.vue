<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/services/store/useAuthStore'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const form = ref({ name: authStore.user?.name || '' })
const errors = ref({ name: null })
const globalError = ref(null)
const loading = ref(false)
const success = ref(false)

function validate() {
  errors.value = { name: null }
  if (!form.value.name?.trim()) { errors.value.name = t('edit_profile.errors.name_required'); return false }
  if (form.value.name.trim().length < 2) { errors.value.name = t('edit_profile.errors.name_short'); return false }
  return true
}

async function handleSubmit() {
  globalError.value = null
  success.value = false
  if (!validate()) return
  loading.value = true
  try {
    await authStore.editProfile(form.value.name.trim())
    success.value = true
    setTimeout(() => router.push({ name: 'profile' }), 800)
  } catch {
    globalError.value = t('edit_profile.error_msg')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="edit-view">
    <div class="edit-header">
      <button class="edit-header__back" @click="$router.back()">
        <span class="material-symbols-outlined">arrow_back_ios</span>
      </button>
      <h1 class="edit-header__title">{{ t('edit_profile.title') }}</h1>
    </div>

    <div class="edit-body">
      <div class="avatar-preview">
        <img :src="authStore.user?.profilePicture || '/images/placeholders/default-profile-picture.png'"
          alt="Photo de profil" class="avatar-preview__img" />
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <div v-if="globalError" class="alert alert--error">{{ globalError }}</div>
        <div v-if="success" class="alert alert--success">{{ t('edit_profile.success_msg') }}</div>

        <div class="form-group">
          <label class="form-group__label">{{ t('edit_profile.display_name') }}</label>
          <input v-model="form.name" type="text" class="form-group__input"
            :class="{ 'form-group__input--error': errors.name }" :placeholder="t('edit_profile.name_ph')"
            :disabled="loading" autocomplete="name" />
          <span v-if="errors.name" class="form-group__error">{{ errors.name }}</span>
        </div>

        <div class="form-group form-group--locked">
          <label class="form-group__label">
            {{ t('edit_profile.email') }}
            <span class="form-group__locked-badge">
              <span class="material-symbols-outlined">lock</span> {{ t('edit_profile.not_editable') }}
            </span>
          </label>
          <input type="email" class="form-group__input form-group__input--disabled" :value="authStore.user?.email"
            disabled />
        </div>

        <div class="form-group form-group--locked">
          <label class="form-group__label">
            {{ t('edit_profile.password') }}
            <span class="form-group__locked-badge">
              <span class="material-symbols-outlined">lock</span> {{ t('edit_profile.not_editable') }}
            </span>
          </label>
          <input type="password" class="form-group__input form-group__input--disabled" value="••••••••••" disabled />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit" :disabled="loading || success">
            <span v-if="loading" class="material-symbols-outlined spin">sync</span>
            <span v-else-if="success" class="material-symbols-outlined">check_circle</span>
            {{ loading ? t('edit_profile.saving') : success ? t('edit_profile.saved') : t('edit_profile.save_btn') }}
          </button>
          <router-link :to="{ name: 'profile' }" class="btn-cancel">{{ t('edit_profile.cancel_btn') }}</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

.edit-view {
  min-height: 100vh;
  background-color: $gray-100;
  padding-bottom: $space-xl;
}

.edit-header {
  background: linear-gradient(155deg, $primary-dark 0%, $primary-color 60%, $primary-light 100%);
  padding: $space-lg $space-lg $space-xl;
  display: flex;
  align-items: center;
  gap: $space-md;

  &__back {
    background: rgba($white, 0.15);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: $white;
    flex-shrink: 0;
    backdrop-filter: blur(4px);
    transition: background 0.2s;

    span {
      font-size: 18px;
    }

    &:hover {
      background: rgba($white, 0.28);
    }
  }

  &__title {
    font-family: $font-family-title;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $white;
    margin: 0;
  }
}

.edit-body {
  padding: $space-lg;
  display: flex;
  flex-direction: column;
  gap: $space-lg;
}

.avatar-preview {
  display: flex;
  justify-content: center;

  &__img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid $white;
    box-shadow: 0 0 0 2px $primary-color, $shadow-md;
  }
}

.form {
  background: $white;
  border-radius: 20px;
  padding: $space-lg;
  box-shadow: $shadow-md;
  display: flex;
  flex-direction: column;
  gap: $space-md;
}

.alert {
  padding: $space-sm $space-md;
  border-radius: $radius-md;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  text-align: center;

  &--error {
    background: rgba($danger, 0.08);
    color: $danger;
    border: 1px solid rgba($danger, 0.2);
  }

  &--success {
    background: rgba($primary-color, 0.08);
    color: $primary-dark;
    border: 1px solid rgba($primary-color, 0.2);
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: $space-xs;

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $gray-900;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__locked-badge {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: $font-size-xs;
    color: $gray-500;
    font-weight: $font-weight-normal;

    span {
      font-size: 13px;
    }
  }

  &__input {
    padding: 13px $space-md;
    border: 1.5px solid $gray-200;
    border-radius: $radius-md;
    font-family: $font-family-base;
    font-size: $font-size-base;
    color: $gray-900;
    background: $white;
    transition: border-color 0.2s;
    outline: none;

    &:focus {
      border-color: $primary-color;
    }

    &--error {
      border-color: $danger;
    }

    &--disabled {
      background: $gray-100;
      color: $gray-500;
      cursor: not-allowed;
    }
  }

  &__error {
    font-size: $font-size-xs;
    color: $danger;
  }

  &--locked .form-group__label {
    color: $gray-500;
  }
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  margin-top: $space-sm;
}

.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-sm;
  width: 100%;
  padding: 14px;
  background: $primary-color;
  color: $white;
  border: none;
  border-radius: $radius-full;
  font-family: $font-family-base;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;

  span {
    font-size: 20px;
  }

  &:hover:not(:disabled) {
    background: $primary-dark;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.btn-cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 13px;
  background: none;
  border: 1.5px solid $gray-200;
  border-radius: $radius-full;
  font-family: $font-family-base;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $gray-500;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: $gray-500;
    color: $gray-900;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 0.8s linear infinite;
  display: inline-block;
}
</style>