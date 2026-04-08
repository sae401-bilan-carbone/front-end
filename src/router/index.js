import LandingView from '@/views/LandingView.vue'
import Error404View from '../views/errors/Error404View.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n'
import DashboardView from '../views/DashboardView.vue'
import SignUpView from '@/views/SignUpView.vue'
import HttpClient from '@/services/api/HttpClient'
import SignInView from '@/views/SignInView.vue'
import ProfileView from '@/views/ProfileView.vue'
import EditProfileView from '@/views/profile/EditProfileView.vue'
import AddActivityView from '@/views/AddActivityView.vue'
import StatsView from '@/views/StatsView.vue'

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
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: `${baseUrl}/activities/add`,
      name: 'add-activity',
      component: AddActivityView,
      meta: { requiresAuth: true }
    },
    {
      path: `${baseUrl}/profile`,
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: `${baseUrl}/profile/edit`,
      name: 'edit-profile',
      component: EditProfileView,
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
    },
    {
      path: `${baseUrl}/stats`,
      name: 'stats',
      component: StatsView,
      meta: { requiresAuth: true }
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