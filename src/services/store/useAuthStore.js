import { defineStore } from "pinia"
import { ref } from "vue"
import AuthApi from "../api/AuthApi"

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function initAuth() {
    loading.value = true

    try {
      const data = await AuthApi.getMe()
      user.value = data

    } catch (e) {
      AuthApi.logout()
      user.value = null

    } finally {
      loading.value = false
    }
  }

  async function logout() {
    AuthApi.logout()
    user.value = null
  }

  const isAuthenticated = () => !!user.value

  return { 
    user, 
    loading, 
    error, 
    initAuth, 
    logout, 
    isAuthenticated 
  }
})