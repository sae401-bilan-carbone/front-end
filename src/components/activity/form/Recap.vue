<script setup>
  import { useActivityStore } from '@/services/store/useActivityStore'
  import { useRouter } from 'vue-router'

  const activityStore = useActivityStore()
  const router = useRouter()

  function previousHandle() {
    activityStore.step--
  }

  function resetHandle() {
    activityStore.step = 1
    activityStore.type = null
  }

  function handleValidate() {
    router.push({ name: 'dashboard' })

    activityStore.type = null
    activityStore.step = 1
  }
</script>

<template>
  <div class="recap-container">
    <div class="recap-header">
      <h2 class="header-title">Récapitulatif</h2>
    </div>

    <div class="recap-card">
      <div v-if="activityStore.type === 'journey'" class="recap-list">
        <div class="recap-item">
          <span class="label">Véhicule :</span>
          <span class="value">{{ activityStore.data.journey.vehicule }}</span>
        </div>
        <div class="recap-item">
          <span class="label">Distance :</span>
          <span class="value">{{ activityStore.data.journey.distance }} km</span>
        </div>
        <div class="recap-item">
          <span class="label">Energie :</span>
          <span class="value">{{ activityStore.data.journey.energy }}</span>
        </div>
      </div>
      
      <div v-else class="recap-fallback">
        Données prêtes pour validation.
      </div>
    </div>

    <div class="recap-footer">
      <div class="secondary-actions">
        <button class="btn-gray" @click="resetHandle">
          Annuler
        </button>
        <button class="btn-gray" @click="previousHandle">
          Modifier
        </button>
      </div>
      
      <button class="btn-validate" @click="handleValidate">
        Valider
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

.recap-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $space-lg $space-lg $space-xl; // Réduit le padding en haut
  min-height: 70vh;
}

.recap-header {
  margin-bottom: $space-xl;
  text-align: center;
  width: 100%;

  .header-title {
    font-family: $font-family-title;
    font-size: $font-size-lg;
    color: $black;
    font-weight: $font-weight-medium;
    margin: 0; // Enlève les marges par défaut
  }
}

.recap-card {
  width: 100%;
  max-width: 350px;
  border: 1.5px solid $primary-dark;
  border-radius: 25px;
  padding: $space-xl;
  background-color: $white;
  margin-bottom: auto;

  .recap-list {
    display: flex;
    flex-direction: column;
    gap: $space-md;
  }

  .recap-item {
    display: flex;
    justify-content: space-between;
    font-family: $font-family-base;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 4px;

    .label {
      font-weight: $font-weight-medium;
      color: $black;
    }

    .value {
      color: #666666;
    }
  }

  .recap-fallback {
    text-align: center;
    color: #999999;
    font-family: $font-family-base;
  }
}

.recap-footer {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: $space-sm; // Réduit l'espace entre les boutons
  margin-top: $space-xl;

  .secondary-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-sm; // Réduit l'espace entre Annuler et Modifier
  }

  button {
    height: 40px; // Taille ajustée pour être plus compact
    border-radius: $radius-full;
    border: none;
    font-family: $font-family-base;
    font-weight: $font-weight-medium;
    cursor: pointer;
    font-size: $font-size-sm; // Légèrement plus petit
    transition: background-color 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }

  .btn-gray {
    background-color: #BDBDBD;
    color: $white;
  }

  .btn-validate {
    background-color: rgba($primary-color, 0.8);
    color: $white;
    width: 100%;
  }
}
</style>