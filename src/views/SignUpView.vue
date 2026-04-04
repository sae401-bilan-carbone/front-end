<!--
  Revoir : 
  - Règles de validation
-->

<script setup>
  import { useAuthStore } from '@/services/store/useAuthStore'
import { ref } from 'vue' 
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const loading = ref(false)
  const globalError = ref(null)
  const authStore = useAuthStore()

  const form = ref({
    email: '',
    password: '',
    name: '',
    acceptPrivacy: false
  })

  const errors = ref({
    email: null,
    password: null,
    name: null,
    acceptPrivacy: null
  })

  function validateForm() {
    errors.value = { email: null, password: null, acceptPrivacy: null }
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
    } else if (form.value.password.length < 4) {
      errors.value.password = 'Au moins 4 caractères'
      isValid = false
    }

    if (!form.value.name?.trim()) {
      errors.value.name = 'Requis'
      isValid = false
    } else if (form.value.name.length < 4) {
      errors.value.name = 'Au moins 4 caractères'
      isValid = false
    }

    if (!form.value.acceptPrivacy) {
      errors.value.acceptPrivacy = 'Requis'
      isValid = false
    }

    return isValid
  }

  async function handleSubmit() {
    globalError.value = null

    if (!validateForm()) return

    loading.value = true

    try {
      await authStore.signup(form.value.email, form.value.password, form.value.name)
      router.push('dashboard')
    } catch (e) {
      if (e.data.emailError) errors.value.email = "Email déjà utilisé"
      else globalError.value = "Erreur interne. Veuillez réessayer."
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <h1>Inscription</h1>

  <div v-if="globalError" class="error">
    <p>{{ globalError }}</p>
  </div>

  <form @submit.prevent="handleSubmit">
    <div>
      <label for="email">Email</label>
      <input 
        v-model="form.email" 
        type="email" 
        id="email"
        :disabled="loading"
      >
      <p class="error">{{ errors.email }}</p>
    </div>

    <div>
      <label for="password">Mot de passe</label>
      <input 
        v-model="form.password" 
        type="password" 
        id="password"
        :disabled="loading"
      >
      <p class="error">{{ errors.password }}</p>
    </div>

    <div>
      <label for="password">Name</label>
      <input 
        v-model="form.name" 
        type="text" 
        id="name"
        :disabled="loading"
      >
      <p class="error">{{ errors.name }}</p>
    </div>

    <div>
      <label for="privacy">J'accepte la <RouterLink to="privacy">politique de confidentialité des données</RouterLink></label>
      <input 
        v-model="form.acceptPrivacy" 
        type="checkbox" 
        id="privacy"
        :disabled="loading"
      >
      <p class="error">{{ errors.acceptPrivacy }}</p>
    </div>

    <button type="submit">
      {{
        loading
          ? "Inscription en cours..."
          : "S'inscrire"
      }}
    </button>

    <div>
      <p>
        Vous avez déjà un compte ? 
        <RouterLink to="signin">Connectez-vous</RouterLink>
      </p>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .error {
    color: red;
  }
</style>