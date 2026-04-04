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
  <h1>Welcome {{ authStore.user?.email }}</h1>

  <button @click="handleDisconnect">
    Déconnexion
  </button>
</template>

<style lang="scss" scoped>
</style>