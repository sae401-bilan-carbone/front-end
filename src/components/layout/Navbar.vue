<script setup>
  import { useAuthStore } from '@/services/store/useAuthStore'
  import { useRouter, useRoute } from 'vue-router'
  import { ref, computed } from 'vue'

  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()
  
  const isMenuOpen = ref(false)
  const isActivitiesOpen = ref(false)

  // Logique dynamique pour le bouton du Header
  // On vérifie si le nom de la route actuelle est 'signup'
  const isSignUpPage = computed(() => route.name === 'signup')

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

      <div v-if="authStore.user" class="header__user-section">
        <router-link :to="{ name: 'add-activity' }" class="icon-link">
          <span class="material-symbols-outlined">add</span>
        </router-link>
        <router-link :to="{ name: 'profile' }" class="profile-link">
          <img 
            :src="authStore.user?.profilePicture ?? '/images/placeholders/default-profile-picture.png'" 
            :alt="`${authStore.user.name}_profile_picture`"
          >
        </router-link>
      </div>

      <div v-else>
        <router-link 
          v-if="isSignUpPage" 
          :to="{ name: 'signin' }" 
          class="btn-primary"
        >
          Se connecter
        </router-link>
        <router-link 
          v-else 
          :to="{ name: 'signup' }" 
          class="btn-primary"
        >
          S'inscrire
        </router-link>
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
            <router-link to="/" @click="isMenuOpen = false">Accueil</router-link>
            
            <div class="nav-mobile__dropdown">
              <button @click="isActivitiesOpen = !isActivitiesOpen" class="dropdown-trigger">
                Activités
                <span class="arrow" :class="{ 'arrow--open': isActivitiesOpen }">▼</span>
              </button>
              
              <Transition name="expand">
                <div v-if="isActivitiesOpen" class="dropdown-content">
                  <router-link to="/activites/transport" @click="isMenuOpen = false">Transport</router-link>
                  <router-link to="/activites/nourriture" @click="isMenuOpen = false">Nourriture</router-link>
                  <router-link to="/activites/shoppingq" @click="isMenuOpen = false">Shopping</router-link>
                </div>
              </Transition>
            </div>

            <router-link to="/profil" @click="isMenuOpen = false">Profil</router-link>
            <router-link to="/parametres" @click="isMenuOpen = false">Paramètres</router-link>
            
            <hr class="nav-mobile__divider" />

            <router-link to="/assistance" class="small-link" @click="isMenuOpen = false">Assistance</router-link>
            <router-link to="/mentions-legales" class="small-link" @click="isMenuOpen = false">Mentions légales</router-link>

            <button v-if="authStore.user" class="btn-logout" @click="handleDisconnect">Déconnexion</button>
            <router-link v-else :to="{ name: 'signin' }" class="small-link" @click="isMenuOpen = false">Connexion</router-link>
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
  background: $gray-100;
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

// Mobile Menu
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

    a, .dropdown-trigger {
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

// Dropdown
.dropdown-trigger {
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  .arrow {
    font-size: 0.7rem;
    transition: transform 0.3s;
    &--open { transform: rotate(180deg); }
  }
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  padding-left: $space-md;
  gap: $space-md;
  margin-top: $space-md;
}

// Transitions
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.expand-enter-active, .expand-leave-active { transition: all 0.3s ease; max-height: 150px; overflow: hidden; }
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; }
</style>