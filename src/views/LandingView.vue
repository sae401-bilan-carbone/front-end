<script setup>
import { useI18n } from 'vue-i18n'
import { Leaf, BarChart2, ShoppingBag, Utensils, Car } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
  <main class="landing">
    <section class="hero">
      <img src="@/assets/hero-rocks.jpg" alt="Vesta" class="hero__bg" />
      <div class="hero__overlay" />
      <div class="hero__content">
        <div class="hero__badge">
          <Leaf :size="14" /> {{ t('landing.badge') }}
        </div>
        <h1 class="hero__title" style="white-space: pre-line">{{ t('landing.title') }}</h1>
        <p class="hero__sub">{{ t('landing.subtitle') }}</p>
        <router-link :to="{ name: 'signup' }" class="hero__cta">{{ t('landing.cta') }}</router-link>
        <router-link :to="{ name: 'signin' }" class="hero__signin">
          {{ t('landing.signin_text') }} <strong>{{ t('landing.signin_link') }}</strong>
        </router-link>
      </div>
    </section>

    <section class="stats-strip">
      <div class="stat"><span class="stat__value">3</span><span class="stat__label">{{ t('landing.stats.categories')
          }}</span></div>
      <div class="stat-divider" />
      <div class="stat"><span class="stat__value">100%</span><span class="stat__label">{{ t('landing.stats.free')
          }}</span></div>
      <div class="stat-divider" />
      <div class="stat"><span class="stat__value">CO₂</span><span class="stat__label">{{ t('landing.stats.realtime')
          }}</span></div>
    </section>

    <section class="about">
      <div class="about__tag">{{ t('landing.about.tag') }}</div>
      <h2 class="about__title">{{ t('landing.about.title') }}</h2>
      <p class="about__text">{{ t('landing.about.text') }}</p>
    </section>

    <section class="categories">
      <div class="category-card">
        <div class="category-card__icon" style="background: rgba(46,125,50,0.1); color: #2E7D32">
          <Car :size="24" :stroke-width="1.5" />
        </div>
        <div>
          <h3 class="category-card__title">{{ t('landing.categories.journey.title') }}</h3>
          <p class="category-card__text">{{ t('landing.categories.journey.text') }}</p>
        </div>
      </div>
      <div class="category-card">
        <div class="category-card__icon" style="background: rgba(230,81,0,0.1); color: #E65100">
          <Utensils :size="24" :stroke-width="1.5" />
        </div>
        <div>
          <h3 class="category-card__title">{{ t('landing.categories.food.title') }}</h3>
          <p class="category-card__text">{{ t('landing.categories.food.text') }}</p>
        </div>
      </div>
      <div class="category-card">
        <div class="category-card__icon" style="background: rgba(21,101,192,0.1); color: #1565C0">
          <ShoppingBag :size="24" :stroke-width="1.5" />
        </div>
        <div>
          <h3 class="category-card__title">{{ t('landing.categories.shopping.title') }}</h3>
          <p class="category-card__text">{{ t('landing.categories.shopping.text') }}</p>
        </div>
      </div>
    </section>

    <section class="feature">
      <div class="feature__icon">
        <BarChart2 :size="28" :stroke-width="1.5" />
      </div>
      <div class="feature__body">
        <h3 class="feature__title">{{ t('landing.features.track.title') }}</h3>
        <p class="feature__text">{{ t('landing.features.track.text') }}</p>
      </div>
    </section>

    <section class="feature feature--alt">
      <div class="feature__icon feature__icon--green">
        <Leaf :size="28" :stroke-width="1.5" />
      </div>
      <div class="feature__body">
        <h3 class="feature__title">{{ t('landing.features.habits.title') }}</h3>
        <p class="feature__text">{{ t('landing.features.habits.text') }}</p>
      </div>
    </section>

    <section class="cta-block">
      <h2 class="cta-block__title">{{ t('landing.cta_block.title') }}</h2>
      <p class="cta-block__sub">{{ t('landing.cta_block.subtitle') }}</p>
      <router-link :to="{ name: 'signup' }" class="cta-block__btn">{{ t('landing.cta_block.btn') }}</router-link>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

.landing {
  background-color: $gray-100;
}

.hero {
  position: relative;
  width: 100%;
  min-height: 80svh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 0;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(to top, rgba($primary-dark, 0.92) 0%, rgba($primary-dark, 0.55) 45%, rgba(0, 0, 0, 0.1) 100%);
  }

  &__content {
    position: relative;
    z-index: 2;
    padding: $space-xl $space-lg;
    padding-bottom: calc($space-xl + env(safe-area-inset-bottom, 0px));
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $space-md;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba($white, 0.15);
    backdrop-filter: blur(8px);
    color: $white;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    font-family: $font-family-base;
    padding: 5px 12px;
    border-radius: $radius-full;
    border: 1px solid rgba($white, 0.25);
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  &__title {
    font-family: $font-family-title;
    font-size: 2.6rem;
    font-weight: $font-weight-bold;
    color: $white;
    line-height: 1.1;
    margin: 0;
  }

  &__sub {
    font-family: $font-family-base;
    font-size: $font-size-base;
    color: rgba($white, 0.8);
    line-height: 1.55;
    margin: 0;
    max-width: 340px;
  }

  &__cta {
    display: inline-block;
    margin-top: $space-sm;
    background: $white;
    color: $primary-dark;
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
    padding: 14px $space-xl;
    border-radius: $radius-full;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;

    &:hover {
      opacity: 0.92;
      transform: translateY(-1px);
      color: $primary-dark;
    }
  }

  &__signin {
    font-family: $font-family-base;
    font-size: $font-size-sm;
    color: rgba($white, 0.65);
    text-decoration: none;
    transition: color 0.2s;

    strong {
      color: $white;
      font-weight: $font-weight-medium;
    }

    &:hover {
      color: $white;
    }
  }
}

.stats-strip {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: $space-lg $space-md;
  background: $white;
  border-bottom: 1px solid $gray-200;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  &__value {
    font-family: $font-family-title;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $primary-color;
  }

  &__label {
    font-size: $font-size-xs;
    color: $gray-500;
    text-align: center;
  }
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: $gray-200;
}

.about {
  padding: $space-xl $space-lg;
  text-align: center;

  &__tag {
    display: inline-block;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    color: $primary-color;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: $space-sm;
  }

  &__title {
    font-family: $font-family-title;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $gray-900;
    margin-bottom: $space-md;
  }

  &__text {
    font-family: $font-family-base;
    font-size: $font-size-base;
    line-height: 1.65;
    color: $gray-500;
    max-width: 340px;
    margin: 0 auto;
  }
}

.categories {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  padding: 0 $space-lg $space-xl;
}

.category-card {
  background: $white;
  border-radius: 16px;
  padding: $space-lg;
  display: flex;
  align-items: flex-start;
  gap: $space-md;
  box-shadow: $shadow-sm;

  &__icon {
    width: 48px;
    height: 48px;
    border-radius: $radius-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__title {
    font-family: $font-family-title;
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
    color: $gray-900;
    margin-bottom: 4px;
  }

  &__text {
    font-family: $font-family-base;
    font-size: $font-size-sm;
    color: $gray-500;
    line-height: 1.5;
    margin: 0;
  }
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: $space-lg;
  padding: $space-xl $space-lg;
  background: $white;
  border-top: 1px solid $gray-200;

  &--alt {
    background: rgba($primary-color, 0.04);
  }

  &__icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba($gray-900, 0.06);
    color: $gray-900;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &--green {
      background: rgba($primary-color, 0.12);
      color: $primary-color;
    }
  }

  &__body {
    flex: 1;
  }

  &__title {
    font-family: $font-family-title;
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $gray-900;
    margin-bottom: $space-xs;
  }

  &__text {
    font-family: $font-family-base;
    font-size: $font-size-sm;
    color: $gray-500;
    line-height: 1.6;
    margin: 0;
  }
}

.cta-block {
  padding: $space-xl $space-lg;
  text-align: center;
  background: linear-gradient(155deg, $primary-dark 0%, $primary-color 60%, $primary-light 100%);
  color: $white;

  &__title {
    font-family: $font-family-title;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    margin-bottom: $space-sm;
    color: $white;
  }

  &__sub {
    font-family: $font-family-base;
    font-size: $font-size-sm;
    opacity: 0.8;
    margin-bottom: $space-xl;
  }

  &__btn {
    display: inline-block;
    background: $white;
    color: $primary-dark;
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
    padding: 14px $space-xl;
    border-radius: $radius-full;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;

    &:hover {
      opacity: 0.92;
      transform: translateY(-1px);
      color: $primary-dark;
    }
  }
}
</style>