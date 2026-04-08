<template>
  <main class="landing">
    <section class="hero">
      <div class="hero__image-container">
        <img src="@/assets/hero-rocks.jpg" alt="Vesta Hero - Roches" class="hero__bg" />
        
        <button class="hero__cta">Rejoins-nous maintenant</button>
      </div>
    </section>

    <section class="about section-padding">
      <h2 class="section-title">Qui sommes-nous ?</h2>
      <p class="section-text">
        Si vous souhaitez mieux comprendre votre impact sur la planète. 
        Notre application web transforme chaque geste du quotidien en une donnée claire, 
        visible et mesurable. Elle vous aide à prendre conscience de votre empreinte carbone, 
        et à faire des choix responsables.
      </p>

      <div class="carousel">
        <div class="carousel__box">
          <div class="carousel__image-placeholder"></div>
        </div>
        <div class="carousel__dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </section>

    <section class="activity section-padding">
      <h3 class="activity__title">Suivez votre activité</h3>
      <p class="activity__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      
      <hr class="separator" />
      <router-link to="/register" class="link-cta">
        <ChevronRight :size="18" /> Rejoins-nous maintenant
      </router-link>
      <hr class="separator" />
    </section>

    <section class="features section-padding">
      <h2 class="section-title">Découvrez toutes nos fonctionnalités</h2>

      <div class="feature-item">
        <div class="feature-item__icon">
          <Target :size="28" :stroke-width="1.5" />
        </div>
        <h3 class="feature-item__title">Suivez votre empreinte carbone</h3>
        <p class="feature-item__text">
          Apprenez à enregistrer votre trajet sur Vesta et découvrez de nombreuses façons d'analyser vos performances.
        </p>
      </div>

      <div class="feature-item">
        <div class="feature-item__icon">
          <Leaf :size="28" :stroke-width="1.5" />
        </div>
        <h3 class="feature-item__title">Réduire votre empreinte carbone</h3>
        <p class="feature-item__text">
          Définissez votre prochain objectif grâce aux données.
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ChevronRight, Target, Leaf } from 'lucide-vue-next';
</script>

<style lang="scss" scoped>
// Conteneur principal
.landing {
  background-color: rgba($primary-color, 0.1);
}

// Utilitaires de section
.section-padding {
  padding: $space-xl $space-lg;
  text-align: center;
}

.section-title {
  font-family: $font-family-title;
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  margin-bottom: $space-md;
  color: $black;
}

.section-text {
  font-size: $font-size-base;
  line-height: 1.6;
  color: $gray-900;
  max-width: 90%;
  margin: 0 auto $space-xl;
}

// --- HERO SECTION ---
.hero {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 18; 
  overflow: hidden;

  &__image-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__cta {
    position: absolute;
    bottom: $space-xl;
    left: 50%;
    transform: translateX(-50%);
    
    background-color: rgba($primary-color, 0.8);
    color: $white;
    padding: 8px 16px;
    border-radius: $radius-sm;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    text-decoration: none;
    white-space: nowrap;
    transition: opacity 0.2s;
    
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    
    transition: background-color 0.2s, transform 0.2s;

    &:hover {
      background-color: rgba($primary-color, 0.9);
      transform: translateX(-50%) scale(1.05);
    }
  }
}

// --- CAROUSEL ---
.carousel {
  &__box {
    margin: 0 auto $space-lg;
    max-width: 250px;
    aspect-ratio: 1 / 1;
  }

  &__image-placeholder {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    border: 1px dashed $gray-200;
  }

  &__dots {
    display: flex;
    justify-content: center;
    gap: $space-sm;

    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: $gray-500;

      &.active {
        background-color: $primary-light;
      }
    }
  }
}

// --- ACTIVITY ---
.activity {
  &__title {
    font-family: $font-family-title;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    margin-bottom: $space-md;
    color: $black;
  }

  &__description {
    font-size: $font-size-base;
    line-height: 1.6;
    color: $gray-900;
    max-width: 90%;
    margin: 0 auto $space-xl;
  }

  .separator {
    border: none;
    border-top: 1px solid rgba($black, 0.7);
    width: 75%;
    margin: 0 auto;
  }

  .link-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-xs;
    color: $primary-light;
    font-weight: $font-weight-medium;
    padding: $space-md 0;
    text-decoration: none;
  }
}

// --- FEATURES ---
.feature-item {
  margin-bottom: $space-xl;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__icon {
    margin-bottom: $space-sm;
    color: $primary-color;
  }

  &__title {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    margin-bottom: $space-xs;
  }

  &__text {
    font-size: $font-size-sm;
    color: $gray-900;
    max-width: 85%;
    margin: 0 auto;
  }
}
</style>