<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/services/store/useAuthStore'
import IconGoogle from '@/components/icons/IconGoogle.vue'
import IconApple from '@/components/icons/IconApple.vue'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const globalError = ref(null)
const form = ref({ email: '', password: '', name: '', acceptPrivacy: false })
const errors = ref({ email: null, password: null, name: null, acceptPrivacy: null })

function validateForm() {
  errors.value = { email: null, password: null, name: null, acceptPrivacy: null }
  let isValid = true
  const e = errors.value
  if (!form.value.email?.trim()) { e.email = t('auth.signup.errors.email_required'); isValid = false }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) { e.email = t('auth.signup.errors.email_invalid'); isValid = false }
  if (!form.value.password?.trim()) { e.password = t('auth.signup.errors.password_required'); isValid = false }
  else if (form.value.password.length < 4) { e.password = t('auth.signup.errors.password_short'); isValid = false }
  if (!form.value.name?.trim()) { e.name = t('auth.signup.errors.name_required'); isValid = false }
  if (!form.value.acceptPrivacy) { e.acceptPrivacy = t('auth.signup.errors.privacy_required'); isValid = false }
  return isValid
}

async function handleSubmit() {
  globalError.value = null
  if (!validateForm()) return
  loading.value = true
  try {
    await authStore.signup(form.value.email, form.value.password, form.value.name)
    router.push('/dashboard')
  } catch (err) {
    if (err.data?.emailError) errors.value.email = t('auth.signup.errors.email_taken')
    else globalError.value = t('auth.signup.errors.internal_error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="title">{{ t('auth.signup.title') }}</h1>
      <p class="description">{{ t('auth.signup.description') }}</p>

      <div class="social-grid">
        <button type="button" class="btn-social">
          <IconGoogle :size="20" /> {{ t('auth.signup.google') }}
        </button>
        <button type="button" class="btn-social">
          <IconApple :size="20" /> {{ t('auth.signup.apple') }}
        </button>
      </div>

      <div class="separator"><span>{{ t('auth.signup.separator') }}</span></div>

      <form @submit.prevent="handleSubmit" class="signup-form">
        <div v-if="globalError" class="alert-error">{{ globalError }}</div>

        <div class="form-group">
          <input v-model="form.name" type="text" :placeholder="t('auth.signup.name_ph')" :disabled="loading"
            :class="{ 'input-error': errors.name }" />
          <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <input v-model="form.email" type="email" :placeholder="t('auth.signup.email_ph')" :disabled="loading"
            :class="{ 'input-error': errors.email }" />
          <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <input v-model="form.password" type="password" :placeholder="t('auth.signup.password_ph')" :disabled="loading"
            :class="{ 'input-error': errors.password }" />
          <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
        </div>
        <div class="form-group form-group--checkbox">
          <label class="checkbox-label">
            <input v-model="form.acceptPrivacy" type="checkbox" :disabled="loading" />
            {{ t('auth.signup.accept') }}
            <RouterLink to="/privacy">{{ t('auth.signup.privacy_link') }}</RouterLink>
          </label>
          <span v-if="errors.acceptPrivacy" class="error-msg">{{ errors.acceptPrivacy }}</span>
        </div>
        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? t('auth.signup.submitting') : t('auth.signup.submit') }}
        </button>
      </form>

      <p class="terms">
        {{ t('auth.signup.terms') }}
        <RouterLink to="/terms">{{ t('auth.signup.terms_link') }}</RouterLink>
        {{ t('auth.signup.and') }}
        <RouterLink to="/privacy">{{ t('auth.signup.privacy_link2') }}</RouterLink>
      </p>
      <p class="signin-link">
        {{ t('auth.signup.has_account') }}
        <RouterLink :to="{ name: 'signin' }">{{ t('auth.signup.login_link') }}</RouterLink>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $space-lg;
  background-color: rgba($primary-color, 0.1);
}

.auth-card {
  max-width: 420px;
  width: 100%;
}

.title {
  font-family: $font-family-title;
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  margin-bottom: $space-lg;
}

.description {
  font-family: $font-family-base;
  font-size: 0.95rem;
  line-height: 1.5;
  color: $black;
  margin-bottom: $space-xl;
}

.social-grid {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  margin-bottom: $space-xl;

  .btn-social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-md;
    padding: 12px;
    border: 1.5px solid $black;
    background: $gray-100;
    border-radius: $radius-md;
    font-family: $font-family-base;
    font-weight: $font-weight-medium;
    cursor: pointer;
  }
}

.separator {
  display: flex;
  align-items: center;
  margin-bottom: $space-xl;
  font-size: 0.85rem;
  color: $black;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: $black;
  }

  span {
    padding: 0 $space-md;
  }
}

.signup-form {
  .form-group {
    margin-bottom: $space-md;

    input[type='text'],
    input[type='email'],
    input[type='password'] {
      width: 100%;
      padding: 14px;
      border: 1.5px solid $black;
      border-radius: $radius-md;
      font-size: $font-size-base;
      font-family: $font-family-base;

      &.input-error {
        border-color: $danger;
      }

      &:focus {
        outline: 1px solid $primary-color;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .error-msg {
      color: $danger;
      font-size: $font-size-xs;
      margin-top: 4px;
      display: block;
    }

    &--checkbox .checkbox-label {
      display: flex;
      align-items: center;
      gap: $space-sm;
      font-size: $font-size-sm;
      cursor: pointer;

      input[type='checkbox'] {
        accent-color: $primary-color;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
      }

      a {
        color: inherit;
        border-bottom: 1px solid $black;
      }
    }
  }

  .btn-submit {
    width: 100%;
    padding: 14px;
    background-color: $primary-light;
    color: $white;
    border: none;
    border-radius: $radius-md;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

.terms {
  margin-top: $space-lg;
  font-size: 0.8rem;
  line-height: 1.4;
  color: $black;

  a {
    text-decoration: none;
    color: inherit;
    border-bottom: 1px solid $black;
  }
}

.alert-error {
  background-color: rgba($danger, 0.1);
  color: $danger;
  padding: $space-sm;
  border-radius: $radius-sm;
  margin-bottom: $space-md;
  text-align: center;
}

.signin-link {
  margin-top: $space-md;
  font-size: $font-size-sm;
  text-align: center;
  color: $black;

  a {
    color: $primary-color;
    font-weight: $font-weight-medium;
  }
}
</style>