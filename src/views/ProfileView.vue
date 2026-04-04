<script setup>
  import { useAuthStore } from '@/services/store/useAuthStore'
  import { useRouter } from 'vue-router'

  const authStore = useAuthStore()
  const router = useRouter()

  async function handleDisconnect() {
    await authStore.logout()
    router.push('landing')
  }
</script>

<template>
  <div v-if="authStore.loading">
    <p>Chargement...</p>
  </div>
  
  <div v-else>
    <h1>Profil de {{ authStore.user?.email }}</h1>

    <RouterLink to="dashboard">Dashboard</RouterLink><br>

    <button @click="handleDisconnect">
      Déconnexion
    </button>
  </div>
</template>

<style lang="scss" scoped>
</style>