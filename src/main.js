import { createApp } from 'vue'
import { i18n } from './i18n'
import { useAuthStore } from './services/store/useAuthStore'
import App from './App.vue'
import router from './router'

import './assets/styles/main.scss'
import { createPinia } from 'pinia'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const authStore = useAuthStore()

app.use(router)
app.use(i18n)

authStore.initAuth().then(() => {
  app.mount('#app')
})