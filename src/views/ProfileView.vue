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
  <h1>Profil</h1>

  <div v-if="authStore.loading">
    <p>Chargement...</p>
  </div>
  
  <div v-else>
    <div><b>Nom : </b>{{ authStore.user?.name }}</div>

    <div>
      <RouterLink :to="{ name: 'edit-profile' }">Modifier</RouterLink><br>
      <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink><br>
    </div>

    <button @click="handleDisconnect">
      Déconnexion
    </button>
  </div>
</template>

<style lang="scss" scoped>
</style>