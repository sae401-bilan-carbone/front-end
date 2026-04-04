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
    password: ''
  })

  const errors = ref({
    email: null,
    password: null
  })

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

    loading.value = false

    try {
      await authStore.signin(email.value, password.value)
      router.push('dashboard')
    
    } catch (e) {
      errors.value.email = "Email ou mot de passe invalide"
      errors.value.password = "Email ou mot de passe invalide"
    
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <h1>Connexion</h1>

  <div v-if="globalError" class="error">
    <p>{{ globalError }}</p>
  </div>
  
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="email">Email</label>
      <input 
        type="email"
        id="email"
        v-model="form.email"
        :disabled="loading"
      >
      <p class="error">{{ errors.email }}</p>
    </div>

    <div>
      <label for="password">Mot de passe</label>
      <input 
        type="password"
        id="password"
        v-model="form.password"
        :disabled="loading"
      >
      <p class="error">{{ errors.password }}</p>
    </div>

    <button type="submit">
      {{ 
        loading 
          ? "Connexion en cours"
          : "Se connecter"
      }}
    </button>

    <div>
      <p>
        Pas encore de compte ? 
        <RouterLink to="signup">Inscrivez-vous</RouterLink>
      </p>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .error {
    color: red;
  }
</style>