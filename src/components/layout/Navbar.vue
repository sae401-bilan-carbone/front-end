<script setup>
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/services/store/useAuthStore'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isMenuOpen = ref(false)
const isSignUpPage = computed(() => route.name === 'signup')

function switchLocale() {
  const next = locale.value === 'fr' ? 'en' : 'fr'
  const currentPath = route.fullPath
  const newPath = currentPath.replace(/^\/(fr|en)/, `/${next}`)
  router.push(newPath)
}

async function handleDisconnect() {
  isMenuOpen.value = false
  await authStore.logout()
  router.push({ name: 'landing' })
}
</script>

<template>
  <header class="header">
    <div class="header__container">
      <button class="header__burger" @click="isMenuOpen = true" aria-label="Open menu">
        <span class="burger-bar"></span>
        <span class="burger-bar"></span>
        <span class="burger-bar"></span>
      </button>

      <div class="header__logo">
        <router-link to="/">VESTA</router-link>
      </div>

      <div class="header__right">
        <button class="lang-switch" @click="switchLocale"
          :title="locale === 'fr' ? 'Switch to English' : 'Passer en français'">
          {{ locale === 'fr' ? 'FR 🇫🇷' : 'EN 🇬🇧' }}
        </button>

        <div v-if="authStore.user" class="header__user-section">
          <router-link :to="{ name: 'add-activity' }" class="icon-link">
            <span class="material-symbols-outlined">add</span>
          </router-link>
          <router-link :to="{ name: 'profile' }" class="profile-link">
            <img :src="authStore.user?.profilePicture ?? '/images/placeholders/default-profile-picture.png'"
              :alt="`${authStore.user.name}_profile_picture`">
          </router-link>
        </div>

        <div v-else>
          <router-link v-if="isSignUpPage" :to="{ name: 'signin' }" class="btn-primary">
            {{ t('nav.signin_btn') }}
          </router-link>
          <router-link v-else :to="{ name: 'signup' }" class="btn-primary">
            {{ t('nav.signup_btn') }}
          </router-link>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isMenuOpen" class="nav-mobile__overlay" @click="isMenuOpen = false"></div>
    </Transition>

    <Transition name="slide">
      <div v-if="isMenuOpen" class="nav-mobile">
        <div class="nav-mobile__content">
          <button class="nav-mobile__close" @click="isMenuOpen = false">
            <span class="close-icon">×</span>
          </button>

          <nav class="nav-mobile__links">
            <router-link to="/" @click="isMenuOpen = false">{{ t('nav.home') }}</router-link>
            <router-link :to="{ name: 'profile' }" @click="isMenuOpen = false">{{ t('nav.profile') }}</router-link>
            <router-link to="profile/edit" @click="isMenuOpen = false">{{ t('nav.settings') }}</router-link>

            <hr class="nav-mobile__divider" />

            <router-link to="#" class="small-link" @click="isMenuOpen = false">{{ t('nav.assistance') }}</router-link>
            <router-link to="#" class="small-link" @click="isMenuOpen = false">{{ t('nav.legal') }}</router-link>

            <button class="lang-switch-menu" @click="switchLocale">
              {{ locale === 'fr' ? '🇫🇷 Français' : '🇬🇧 English' }}
            </button>

            <button v-if="authStore.user" class="btn-logout" @click="handleDisconnect">{{ t('nav.logout') }}</button>
            <router-link v-else :to="{ name: 'signin' }" class="small-link" @click="isMenuOpen = false">{{
              t('nav.login') }}</router-link>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

.header {
  height: 60px;
  background: #e9f0e8;
  border-bottom: 1px solid $gray-200;
  position: sticky;
  top: 0;
  z-index: $z-sticky;

  &__container {
    height: 100%;
    padding: 0 $space-md;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__burger {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: $space-sm;
    margin-left: -$space-sm;

    .burger-bar {
      width: 22px;
      height: 2px;
      background-color: $black;
    }
  }

  &__logo {
    font-family: $font-family-title;
    font-weight: $font-weight-bold;
    font-size: $font-size-xl;
    color: $primary-light;
    flex-grow: 1;
    margin-left: $space-sm;

    a {
      color: inherit;
      letter-spacing: 1px;
      text-decoration: none;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: $space-sm;
  }

  &__user-section {
    display: flex;
    align-items: center;
    gap: $space-md;

    .icon-link {
      color: $black;
      display: flex;
      align-items: center;
    }

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid $gray-200;
    }
  }
}

.lang-switch {
  background: none;
  border: 1px solid $gray-200;
  border-radius: $radius-full;
  padding: 3px 8px;
  font-size: $font-size-xs;
  font-weight: $font-weight-bold;
  color: $gray-500;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: $primary-color;
    color: $primary-color;
  }
}

.btn-primary {
  background-color: rgba($primary-color, 0.8);
  color: $white;
  padding: 8px 16px;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

.nav-mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: $gray-100;
  z-index: $z-modal + 1;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: $z-modal;
  }

  &__content {
    padding: $space-xl $space-lg;
    display: flex;
    flex-direction: column;
  }

  &__close {
    background: none;
    border: none;
    font-size: 2.5rem;
    align-self: flex-start;
    margin-bottom: $space-xl;
    cursor: pointer;
    line-height: 1;
    color: $black;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: $space-lg;

    a {
      font-size: $font-size-md;
      color: $black;
      text-decoration: none;
      font-family: $font-family-base;
    }
  }

  &__divider {
    border: none;
    border-top: 1.5px solid $black;
    margin: $space-sm 0;
    width: 150px;
  }

  .small-link {
    font-size: $font-size-sm;
    color: $gray-500;
  }

  .btn-logout {
    background: none;
    border: none;
    color: $danger;
    text-align: left;
    padding: 0;
    font-size: $font-size-md;
    cursor: pointer;
  }
}

.lang-switch-menu {
  background: none;
  border: 1px solid $gray-200;
  border-radius: $radius-full;
  padding: 6px 14px;
  font-size: $font-size-sm;
  color: $gray-900;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: $primary-color;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>