<template>
  <div class="profile-view">
    <header class="header">
      <button @click="$router.back()" class="btn-back">
        <span class="material-symbols-outlined">arrow_back_ios</span>
      </button>
      <h2 class="header__title">Mon Profil</h2>
    </header>

    <main class="content">
      <section class="identity-card is-animated">
        <div class="avatar-container">
          <div class="avatar-wrapper">
            <img 
              :src="authStore.user?.profilePicture || '/images/placeholders/default-profile-picture.png'" 
              class="avatar-image"
              alt="Photo de profil"
            />
            <button class="edit-badge" aria-label="Modifier la photo">
              <span class="material-symbols-outlined">edit</span>
            </button>
          </div>
        </div>
        
        <div class="user-titles">
          <h1 class="user-name">
            {{ authStore.user?.firstName || 'Prénom' }}
            <span class="user-lastname">{{ authStore.user?.lastName || 'Nom' }}</span>
          </h1>
        </div>
      </section>

      <section class="info-box is-animated delay-1">
        <h3 class="info-box__title">Informations personnelles</h3>
        
        <div class="field-group">
          <div v-for="(field, index) in staticFields" :key="index" class="field-row">
            <div class="field-content">
              <span class="field-label">{{ field.label }} :</span>
              <span class="field-value">{{ field.value }}</span>
            </div>
            <button class="btn-icon-field">
              <span class="material-symbols-outlined">edit_note</span>
            </button>
          </div>

          <div class="field-row field-row--password">
            <div class="field-content">
              <span class="field-label">Mot de passe :</span>
              <span class="field-value">{{ isPasswordVisible ? 'Vesta#401' : '••••••••••••' }}</span>
            </div>
            <div class="field-actions">
              <button @click="isPasswordVisible = !isPasswordVisible" class="btn-icon-field">
                <span class="material-symbols-outlined">
                  {{ isPasswordVisible ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
              <button class="btn-icon-field">
                <span class="material-symbols-outlined">edit_note</span>
              </button>
            </div>
          </div>

          <div class="field-row">
            <div class="field-content">
              <span class="field-label">Date de naissance :</span>
              <span class="field-value">{{ authStore.user?.birthDate || 'xx / xx / xxxx' }}</span>
            </div>
            <button class="btn-icon-field">
              <span class="material-symbols-outlined">edit_note</span>
            </button>
          </div>
        </div>
      </section>

      <button @click="handleLogout" class="btn-logout-link is-animated delay-2">
         <span class="material-symbols-outlined">logout</span>
         Se déconnecter
      </button>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/services/store/useAuthStore'

const authStore = useAuthStore()
const router = useRouter()
const isPasswordVisible = ref(false)

// Champs de base (l'ordre respecte l'UI demandée)
const staticFields = computed(() => [
  { label: 'Prénom', value: authStore.user?.firstName || 'Prénom' },
  { label: 'Nom', value: authStore.user?.lastName || 'Nom' },
  { label: 'E-mail', value: authStore.user?.email || 'nom@domaine.com' },
])

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'landing' })
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

// --- CONFIG DES ANIMATIONS ---
$transition-speed: 0.4s;
$cubic-bezier: cubic-bezier(0.25, 0.46, 0.45, 0.94);

.profile-view {
  min-height: 100vh;
  background-color: rgba($primary-color, 0.1); // Ton fond teinté
  display: flex;
  flex-direction: column;
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.is-animated {
  opacity: 0;
  animation: slideInUp $transition-speed $cubic-bezier forwards;
  &.delay-1 { animation-delay: 0.1s; }
  &.delay-2 { animation-delay: 0.2s; }
}

// --- HEADER ---
.header {
  padding: $space-lg $space-lg 0;
  display: flex;
  align-items: center;
  gap: $space-md;

  .btn-back {
    background: none; border: none; cursor: pointer; padding: $space-sm;
    span { 
      font-size: 24px; color: $primary-dark; font-weight: bold;
      transition: transform 0.2s;
    }
    &:hover span { transform: translateX(-3px); }
  }

  &__title {
    font-family: $font-family-title;
    font-size: $font-size-base;
    color: $black;
    font-weight: $font-weight-medium;
  }
}

.content {
  padding: $space-lg $space-lg $space-xl;
  display: flex; flex-direction: column; gap: $space-lg;
}

// --- IDENTITY SECTION ---
.identity-card {
  display: flex; align-items: center; gap: $space-xl; padding: $space-md;
  
  .avatar-wrapper {
    position: relative; width: 100px; height: 100px;
    background: $white; border-radius: 50%; padding: 4px;
    box-shadow: 0 0 0 2px $primary-color, 0 4px 12px rgba(0,0,0,0.1);

    .avatar-image { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }

    .edit-badge {
      position: absolute; bottom: 0; right: 0;
      background: $primary-color; color: $white; border: 2px solid $white;
      border-radius: 50%; width: 30px; height: 30px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      span { font-size: 16px; }
    }
  }

  .user-titles {
    .user-name {
      margin: 0; font-family: $font-family-title; font-size: $font-size-2xl;
      color: $black; line-height: 1.1;
      .user-lastname { font-weight: $font-weight-bold; text-transform: uppercase; }
    }
  }
}

// --- INFO BOX ---
.info-box {
  background: $white;
  border: 1px solid rgba($primary-dark, 0.2);
  border-radius: 35px; // Bords très arrondis
  padding: $space-xl;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);

  &__title {
    text-align: center;
    font-family: $font-family-title;
    font-size: $font-size-lg;
    margin-bottom: $space-xl;
    color: $black;
  }
}

.field-group { display: flex; flex-direction: column; gap: $space-md; }

.field-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: $space-sm $space-xs;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  
  .field-content {
    display: flex; gap: 8px; font-family: $font-family-base;
    .field-label { color: $black; font-weight: $font-weight-medium; }
    .field-value { color: #555; }
  }

  .field-actions { display: flex; gap: $space-md; align-items: center; }

  .btn-icon-field {
    background: none; border: none; color: $primary-color;
    cursor: pointer; padding: 0;
    span { font-size: 20px; }
    &:hover { color: $primary-dark; }
  }

  &--password .field-value { font-family: monospace; color: $primary-dark; }
}

// --- LOGOUT ---
.btn-logout-link {
  margin-top: $space-xl;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  background: none; border: none;
  color: $primary-color;
  font-family: $font-family-base; font-weight: $font-weight-medium;
  text-decoration: underline; cursor: pointer;
  align-self: center; padding: $space-md;

  &:hover { color: $primary-dark; text-decoration: none; }
}
</style>