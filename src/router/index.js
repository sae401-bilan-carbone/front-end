import HomeView from '@/views/HomeView.vue'
import Error404View from '../views/errors/Error404View.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: () => {
        const locale = localStorage.getItem('locale') || 'fr'
        return `/${locale}`
      }
    },
    {
      path: '/:locale(fr|en)?',
      name: 'base',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
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
        const locale = localStorage.getItem('locale') || 'fr'
        return `/${locale}/404`
      }
    }
  ]
})

router.beforeEach((to) => {
  let locale = to.params.locale

  if (!locale) {
    locale = localStorage.getItem('locale') || 'fr'
    return `/${locale}${to.path}`
  }

  if (!['fr', 'en'].includes(locale)) {
    return '/fr'
  }

  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
})

export default router