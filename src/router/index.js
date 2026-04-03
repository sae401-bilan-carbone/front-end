import LandingView from '@/views/LandingView.vue'
import Error404View from '../views/errors/Error404View.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n'
import DashboardView from '../views/DashboardView.vue'
import SignUpView from '@/views/SignUpView.vue'

const supportedLocales = ['fr', 'en']
const defaultLocale = 'fr'

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
      path: '/:locale(fr|en)?',
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
          meta: { requiresAuth: true }
        },
        {
          path: 'dashboard',
          name: 'dashboard2',
          component: DashboardView,
          meta: { requiresAuth: true }
        },
        {
          path: 'landing',
          name: 'landing',
          component: LandingView
        },
        {
          path: 'signup',
          name: 'signup',
          component: SignUpView
        },
        {
          path: '404',
          name: 'not-found',
          component: Error404View
        }
      ]
    },
    {
      path: '/:locale(fr|en)/404',
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

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = localStorage.getItem('token')

  if (requiresAuth && !token) {
    return { 
      name: 'landing', 
      params: { locale },
    }
  }
})

export default router