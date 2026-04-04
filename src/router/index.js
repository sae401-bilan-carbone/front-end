import LandingView from '@/views/LandingView.vue'
import Error404View from '../views/errors/Error404View.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n'
import DashboardView from '../views/DashboardView.vue'
import SignUpView from '@/views/SignUpView.vue'
import HttpClient from '@/services/api/HttpClient'
import SignInView from '@/views/SignInView.vue'
import ProfileView from '@/views/ProfileView.vue'

const supportedLocales = ['fr', 'en']
const defaultLocale = 'fr'
const baseUrl = `/:locale(fr|en)`

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const locale = localStorage.getItem('locale') || defaultLocale
        return `/${locale}`
      }
    },
    {
      path: baseUrl,
      name: 'base',
      component: () => Promise.resolve(
        HttpClient.getToken()
          ? DashboardView 
          : LandingView
      )
    },
    {
      path: `${baseUrl}/dashboard`,
      name: 'dashboard2',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: `${baseUrl}/profile`,
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: `${baseUrl}/landing`,
      name: 'landing',
      component: LandingView
    },
    {
      path: `${baseUrl}/signup`,
      name: 'signup',
      component: SignUpView
    },
    {
      path: `${baseUrl}/signin`,
      name: 'signin',
      component: SignInView
    },
    {
      path: `${baseUrl}/not-found`,
      name: 'not-found',
      component: Error404View
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        const locale = localStorage.getItem('locale') || defaultLocale
        return `/${locale}/404`
      }
    }
  ]
})

router.beforeEach((to, from) => {
  // Locale

  let locale = to.params.locale

  if (!locale || !supportedLocales.includes(locale)) {
    locale = localStorage.getItem('locale') || defaultLocale
    return `/${locale}${to.path.replace(/^\/[a-z]{2}/, '')}`
  }

  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)

  // Auth

  const isProtected = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = HttpClient.getToken()

  if (isProtected && !isAuthenticated) {
    return { 
      name: 'landing', 
      params: { locale },
    }
  }
})

export default router