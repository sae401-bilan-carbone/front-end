<script setup>
  import { useAuthStore } from '@/services/store/useAuthStore'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const authStore = useAuthStore()
  const loading = ref(false)
  const globalError = ref(null)
  const router = useRouter()

  const form = ref({
    name: authStore.user.name
  })

  const errors = ref({
    name: null
  })

  function validateForm() {
    errors.value = { name: null }
    let isValid = true

    if (!form.value.name?.trim()) {
      errors.value.name = 'Requis'
      isValid = false
    } else if (form.value.name.length < 4) {
      errors.value.name = 'Au moins 4 caractères'
      isValid = false
    }

    return isValid
  }

  async function handleSubmit() {
    globalError.value = null

    if (!validateForm()) return

    loading.value = true
    
    try {
      await authStore.editProfile(form.value.name)
      router.push({ name: 'profile' })
    } catch (e) {
      globalError.value = `Erreur interne. Veuillez réessayer.`
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <h1>Modifier votre profil</h1>

  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Nom</label>
      <input
        type="text"
        v-model="form.name"
        id="name"
        :disabled="loading"
      >
      <p class="error">{{ errors.name }}</p>
    </div>

    <button type="submit">
      {{ 
        loading 
          ? "Chargement..."
          : "Valider"
      }}
    </button>
  </form>
</template>

<style scoed>
  .error {
    color: red;
  }
</style>