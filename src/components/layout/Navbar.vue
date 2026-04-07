<script setup>
  import { useAuthStore } from '@/services/store/useAuthStore'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'

  const router = useRouter()
  const authStore = useAuthStore()
  const isMenuOpen = ref(false)
  const isActivitiesOpen = ref(false)

  async function handleDisconnect() {
    await authStore.logout()
    router.push('landing')
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

      <router-link v-if="authStore.user" :to="{ name: 'profile' }">
        <router-link :to="{ name: 'add-activity' }"><span class="material-symbols-outlined">add</span></router-link>
        <img :src="authStore.user?.profilePicture ?? '/images/placeholders/default-profile-picture.png'" :alt="`${authStore.user.name}_profile_picture`">
      </router-link>

      <router-link v-else :to="{ name: 'signup' }" class="btn-primary">S'inscrire</router-link>
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
                  <router-link to="/activites/cours" @click="isMenuOpen = false">Cours</router-link>
                  <router-link to="/activites/ateliers" @click="isMenuOpen = false">Ateliers</router-link>
                </div>
              </Transition>
            </div>

            <router-link to="/profil" @click="isMenuOpen = false">Profil</router-link>
            <router-link to="/parametres" @click="isMenuOpen = false">Paramètres</router-link>
            
            <hr class="nav-mobile__divider" />

            <router-link to="/assistance" class="small-link" @click="isMenuOpen = false">Assistance</router-link>
            <router-link to="/mentions-legales" class="small-link" @click="isMenuOpen = false">Mentions légales</router-link>

            <button v-if="authStore.user" @click="handleDisconnect">Déconnexion</button>
            <router-link v-else :to="{ name: 'signin' }" class="small-link" @click="isMenuOpen = false">Connexion</router-link>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
img {
  width: 30px; 
  border-radius: 999px;
}

.header {
  height: 60px;
  background: $white;
  border-bottom: 1px solid $gray-200;
  position: sticky;
  top: 0;
  z-index: $z-sticky;

  &__container {
    height: 100%;
    padding: 0 $space-md;
    display: flex;
    align-items: center;
  }

  &__burger {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: $space-sm;
    margin-left: -$space-sm; // Aligne visuellement le burger au bord gauche
    
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
    margin-left: $space-sm; // Ajustement pour être proche du burger
    flex-grow: 1; // Prend tout l'espace pour pousser le bouton S'inscrire à droite
    
    a {
      color: inherit;
      letter-spacing: 1px;
    }
  }
}

// Bouton S'inscrire du Header
.btn-primary {
  background-color: rgba($primary-color, 0.6); 
  color: $white;
  padding: 6px 16px;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  white-space: nowrap;
}

// Menu Mobile & Overlay
.nav-mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 75%; // 3/4 de l'écran
  height: 100vh;
  background: $white;
  z-index: $z-modal + 1;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: $z-modal;
  }

  &__content {
    padding: $space-lg;
    display: flex;
    flex-direction: column;
  }

  &__close {
    background: none;
    border: none;
    font-size: 2.2rem;
    align-self: flex-start;
    margin-bottom: $space-lg;
    cursor: pointer;
    line-height: 1;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: $space-lg;

    a, .dropdown-trigger {
      font-size: $font-size-md;
      color: $black;
      text-align: left;
      font-family: inherit;
      text-decoration: none;
    }
  }

  &__divider {
    border: none;
    border-top: 1px solid rgba($black, 0.8);
    margin: $space-xs 0;
    width: 60%; // Ligne courte comme sur ton modèle
  }

  .small-link {
    font-size: $font-size-sm;
    color: $gray-900;
  }
}

// Dropdown & Flèche
.dropdown-trigger {
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 6px; // Flèche "collée" au texte
  cursor: pointer;

  .arrow {
    font-size: 0.6rem;
    transition: transform 0.3s ease;
    margin-top: 2px;
    
    &--open {
      transform: rotate(180deg);
    }
  }
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  padding-left: $space-md;
  gap: $space-md;
  margin-top: $space-md;
}

// Animations (Vue Transitions)
.slide-enter-active, .slide-leave-active { transition: transform 0.35s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.expand-enter-active, .expand-leave-active { 
  transition: all 0.3s ease; 
  max-height: 200px; 
  overflow: hidden; 
}
.expand-enter-from, .expand-leave-to { 
  max-height: 0; 
  opacity: 0; 
}
</style>