<template>
  <div class="profile-view">
    <header class="header">
      <button @click="$router.back()" class="btn-back">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
    </header>

    <div class="avatar-section">
      <div class="avatar-container">
        <div class="avatar-outline">
          <img 
            :src="authStore.user?.profilePicture || '/images/placeholders/default-profile-picture.png'" 
            class="avatar-image"
          />
        </div>
        <button class="edit-badge">
          <span class="material-symbols-outlined">edit</span>
        </button>
      </div>
      <div class="user-main-info">
        <h1>{{ authStore.user?.firstName || 'Prénom' }}</h1>
        <h1>{{ authStore.user?.lastName || 'Nom' }}</h1>
      </div>
    </div>

    <main class="content">
      <div class="info-card">
        <h3 class="card-title">Informations personnelles</h3>
        
        <div class="field-list">
          <div class="field-item">
            <p class="field-text">Prénom : {{ authStore.user?.firstName || 'X' }}</p>
            <span class="material-symbols-outlined edit-field-icon">edit</span>
          </div>
          
          <div class="field-item">
            <p class="field-text">Nom : {{ authStore.user?.lastName || 'X' }}</p>
            <span class="material-symbols-outlined edit-field-icon">edit</span>
          </div>
          
          <div class="field-item">
            <p class="field-text">E-mail : {{ authStore.user?.email || 'nom@domaine.com' }}</p>
            <span class="material-symbols-outlined edit-field-icon">edit</span>
          </div>
          
          <div class="field-item">
            <p class="field-text">Mot de passe : *****</p>
            <span class="material-symbols-outlined edit-field-icon">edit</span>
          </div>
          
          <div class="field-item">
            <p class="field-text">Date de naissance : {{ authStore.user?.birthDate || 'xx/xx/xxxx' }}</p>
            <span class="material-symbols-outlined edit-field-icon">edit</span>
          </div>
        </div>
      </div>

      <button @click="authStore.logout()" class="btn-logout">Se déconnecter</button>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/services/store/useAuthStore'

// Utilisation du store authentification pour récupérer les données
const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
/* Importation des variables globales pour la cohérence */
@use "@/assets/styles/variables" as *;

.profile-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $white;
}

.header {
  padding: $space-lg $space-md 0;
  
  .btn-back {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    
    span {
      font-size: 32px;
      color: $black; // Ou une couleur foncée par défaut
      font-weight: bold;
    }
  }
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: $space-lg;
  padding: $space-lg $space-xl;

  .avatar-container {
    position: relative;
    width: 110px; // Légèrement plus grand pour la maquette
    height: 110px;

    .avatar-outline {
      width: 100%;
      height: 100%;
      border: 3px solid $primary-color; // Contour vert dynamique
      border-radius: 50%;
      padding: 5px; // Espace entre le contour et l'image
      display: flex;
      justify-content: center;
      align-items: center;
      
      .avatar-image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        // Image d'espace réservé grise par défaut via le backend/store
      }
    }

    .edit-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: none;
      border: none;
      color: $primary-color; // Vert dynamique
      cursor: pointer;
      padding: 0;
      transform: translate(25%, -25%); // Décale légèrement vers le haut/droite
      
      span {
        font-size: 20px;
        font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
    }
  }

  .user-main-info {
    flex: 1;
    
    h1 {
      font-family: $font-family-title;
      font-weight: $font-weight-bold;
      font-size: $font-size-2xl; // Taille adaptée pour le titre principal
      color: $black;
      margin: 0;
      line-height: 1.2;
    }
  }
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: $space-lg $space-xl;
  padding-bottom: 80px; // Espace pour la Navbar mobile si nécessaire
}

.info-card {
  border: 1.5px solid $primary-dark; // Bordure foncée de la carte
  border-radius: $radius-lg * 2; // Coins arrondis comme la maquette
  background-color: $white;
  padding: $space-lg $space-xl;
  margin-bottom: $space-xl;

  .card-title {
    font-family: $font-family-title;
    font-weight: $font-weight-medium;
    font-size: $font-size-lg;
    color: $black;
    text-align: center;
    margin-bottom: $space-xl; // Espace sous le titre de la carte
  }

  .field-list {
    display: flex;
    flex-direction: column;
    gap: $space-md; // Espace régulier entre les champs

    .field-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .field-text {
        font-family: $font-family-base;
        font-size: $font-size-base;
        color: $black;
        margin: 0;
      }

      .edit-field-icon {
        color: $primary-color; // Icônes d'édition vertes
        font-size: 18px;
        cursor: pointer;
        // Rempli (FILL) comme indiqué dans les symboles globaux
      }
    }
  }
}

.btn-logout {
  display: block;
  width: 100%;
  text-align: center;
  background: none;
  border: none;
  color: $primary-color; // Vert dynamique
  font-family: $font-family-base;
  font-size: $font-size-md;
  text-decoration: underline; // Comme dans la maquette
  cursor: pointer;
  margin-top: auto; // Pousse le bouton vers le bas
  padding: $space-sm;

  &:hover {
    color: $primary-dark;
  }
}
</style>