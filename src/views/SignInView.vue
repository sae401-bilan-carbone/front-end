<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/services/store/useAuthStore'
import IconGoogle from '../components/icons/IconGoogle.vue'
import IconApple from '../components/icons/IconApple.vue'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const globalError = ref(null)
const form = ref({ email: '', password: '', rememberMe: false })
const errors = ref({ email: null, password: null })

function validateForm() {
  errors.value = { email: null, password: null }
  let isValid = true
  if (!form.value.email?.trim()) {
    errors.value.email = 'Requis'
    isValid = false 
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = "Invalide"
    isValid = false
  }
  if (!form.value.password?.trim()) {
    errors.value.password = 'Requis'
    isValid = false
  }
  return isValid
}

async function handleSubmit() {
  globalError.value = null
  if (!validateForm()) return
  loading.value = true
  try {
    await authStore.signin(form.value.email, form.value.password)
    router.push('/dashboard')
  } catch (e) {
    globalError.value = "Email ou mot de passe invalide"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="title">Se connecter</h1>
      <div class="social-grid">
        <button type="button" class="btn-social">
          <IconGoogle :size="20" /> Se connecter avec Google
        </button>
        <button type="button" class="btn-social apple-border">
          <IconApple :size="20" /> Se connecter avec Apple
        </button>
      </div>
      <div class="separator">
        <span>Ou bien se connecter avec une adresse e-mail</span>
      </div>
      <form @submit.prevent="handleSubmit" class="signin-form">
        <div v-if="globalError" class="alert-error">{{ globalError }}</div>
        <div class="form-group">
          <input v-model="form.email" type="email" placeholder="Saisir une adresse e-mail" :class="{ 'input-error': errors.email }" :disabled="loading" />
          <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <input v-model="form.password" type="password" placeholder="Mot de passe" :class="{ 'input-error': errors.password }" :disabled="loading" />
          <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
        </div>
        <div class="form-group form-group--checkbox">
          <label class="checkbox-label">
            <input v-model="form.rememberMe" type="checkbox" :disabled="loading" />
            Mémoriser mes informations
          </label>
        </div>
        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? "Connexion..." : "Se connecter" }}
        </button>
      </form>
      <p class="terms">
        En continuant, vous acceptez nos <RouterLink to="/terms">conditions de service</RouterLink> et notre <RouterLink to="/privacy">politique de confidentialité</RouterLink>
      </p>
      <p class="signin-link">
        Vous n'avez pas de compte ? <RouterLink :to="{ name: 'signup' }">Créez-en un !</RouterLink>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $space-lg;
  background-color: rgba($primary-color, 0.1);
}
.auth-card { max-width: 420px; width: 100%; }
.title { font-family: $font-family-title; font-size: $font-size-2xl; font-weight: $font-weight-bold; margin-bottom: $space-lg; }
.social-grid { display: flex; flex-direction: column; gap: $space-sm; margin-bottom: $space-xl;
  .btn-social { display: flex; align-items: center; justify-content: center; gap: $space-md; padding: 12px; border: 1.5px solid $black; background: $gray-100; border-radius: $radius-md; font-family: $font-family-base; font-weight: $font-weight-medium; cursor: pointer;
}
}
.separator { display: flex; align-items: center; margin-bottom: $space-xl; font-size: 0.85rem;
  &::before, &::after { content: ""; flex: 1; height: 1px; background-color: $black; }
  span { padding: 0 $space-md; }
}
.signin-form {
  .form-group { margin-bottom: $space-md;
    input { width: 100%; padding: 14px; border: 1.5px solid $black; border-radius: $radius-md; font-family: $font-family-base; &.input-error { border-color: $danger; } }
    .error-msg { color: $danger; font-size: $font-size-xs; margin-top: 4px; display: block; }
    &--checkbox { .checkbox-label { display: flex; align-items: center; gap: $space-sm; font-size: $font-size-sm; cursor: pointer;
        input[type='checkbox'] { accent-color: $primary-color; width: 16px; height: 16px; flex-shrink: 0; }
    } }
  }
  .btn-submit { width: 100%; padding: 14px; background-color: $primary-light; color: $white; border: none; border-radius: $radius-md; font-size: $font-size-lg; font-weight: $font-weight-medium; cursor: pointer; margin-bottom: $space-xl; }
}
.terms { font-size: 0.8rem; line-height: 1.4; text-align: left; a { text-decoration: underline; color: inherit; } }
.alert-error { color: $danger; margin-bottom: $space-md; text-align: center; font-weight: bold; }
.signin-link { margin-top: $space-md; font-size: $font-size-sm; text-align: center; color: $black; a { color: $primary-color; font-weight: $font-weight-medium; } }
</style>