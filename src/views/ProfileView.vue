<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/services/store/useAuthStore'
import { useActivityStore } from '@/services/store/useActivityStore'

const { t, locale } = useI18n()
const authStore = useAuthStore()
const activityStore = useActivityStore()
const router = useRouter()

const streak = computed(() => {
  if (!activityStore.activities.length) return 0
  const key = d => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
  const activityKeys = new Set(activityStore.activities.map(a => key(new Date(a.createdAt))))
  let count = 0
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  if (!activityKeys.has(key(cursor))) cursor.setDate(cursor.getDate() - 1)
  while (activityKeys.has(key(cursor))) { count++; cursor.setDate(cursor.getDate() - 1) }
  return count
})

const totalCO2 = computed(() => {
  const v = activityStore.stats?.total_emitted ?? 0
  if (v >= 1000) return `${(v / 1000).toFixed(2)} ${t('common.units.tons')}`
  return `${Number(v).toFixed(1)} ${t('common.units.kg')}`
})

const activityCount = computed(() => activityStore.activities.length)

const topCategory = computed(() => {
  const cat = activityStore.stats?.by_category
  if (!cat) return null
  const top = Object.entries(cat).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])
  return top[1] > 0 ? t(`profile.categories.${top[0]}`) : null
})

const memberSince = computed(() => {
  if (!authStore.user?.createdAt) return null
  const intlLocale = locale.value === 'fr' ? 'fr-FR' : 'en-US'
  return new Intl.DateTimeFormat(intlLocale, { month: 'long', year: 'numeric' })
    .format(new Date(authStore.user.createdAt))
})

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'landing' })
}
</script>

<template>
  <div class="profile-view">
    <div class="hero">
      <button class="hero__back" @click="$router.back()">
        <span class="material-symbols-outlined">arrow_back_ios</span>
      </button>
      <div class="hero__avatar-wrap">
        <img :src="authStore.user?.profilePicture || '/images/placeholders/default-profile-picture.png'"
          class="hero__avatar" alt="Photo de profil" />
      </div>
      <h1 class="hero__name">{{ authStore.user?.name || 'Utilisateur' }}</h1>
      <p v-if="memberSince" class="hero__since">{{ t('profile.member_since', { date: memberSince }) }}</p>
    </div>

    <div class="section">
      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-card__value">{{ totalCO2 }}</span>
          <span class="stat-card__label">{{ t('profile.co2_total') }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card__value">{{ activityCount }}</span>
          <span class="stat-card__label">{{ t('profile.activities') }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card__value">{{ streak > 0 ? streak : '—' }}</span>
          <span class="stat-card__label">{{ streak > 0 ? `🔥 ${t('dashboard.streak', streak)}` :
            t('profile.streak_label') }}</span>
        </div>
      </div>

      <div class="card">
        <h2 class="card__title">{{ t('profile.info_title') }}</h2>
        <div class="info-list">
          <div class="info-row">
            <div class="info-row__left">
              <span class="material-symbols-outlined info-row__icon">person</span>
              <span class="info-row__label">{{ t('profile.name') }}</span>
            </div>
            <span class="info-row__value">{{ authStore.user?.name || '—' }}</span>
          </div>
          <div class="info-row">
            <div class="info-row__left">
              <span class="material-symbols-outlined info-row__icon">mail</span>
              <span class="info-row__label">{{ t('profile.email') }}</span>
            </div>
            <span class="info-row__value">{{ authStore.user?.email || '—' }}</span>
          </div>
          <div class="info-row" v-if="topCategory">
            <div class="info-row__left">
              <span class="material-symbols-outlined info-row__icon">bar_chart</span>
              <span class="info-row__label">{{ t('profile.top_category') }}</span>
            </div>
            <span class="info-row__value">{{ topCategory }}</span>
          </div>
        </div>
        <router-link :to="{ name: 'edit-profile' }" class="btn-edit">
          <span class="material-symbols-outlined">edit</span>
          {{ t('profile.edit_btn') }}
        </router-link>
      </div>

      <button class="btn-logout" @click="handleLogout">
        <span class="material-symbols-outlined">logout</span>
        {{ t('profile.logout_btn') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

.profile-view {
  min-height: 100vh;
  background-color: $gray-100;
  padding-bottom: $space-xl;
}

.hero {
  background: linear-gradient(155deg, $primary-dark 0%, $primary-color 60%, $primary-light 100%);
  padding: $space-lg $space-lg $space-xl;
  color: $white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &__back {
    position: absolute;
    top: $space-lg;
    left: $space-md;
    background: rgba($white, 0.15);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: $white;
    backdrop-filter: blur(4px);
    transition: background 0.2s;

    span {
      font-size: 18px;
    }

    &:hover {
      background: rgba($white, 0.28);
    }
  }

  &__avatar-wrap {
    margin-top: $space-xl;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    padding: 3px;
    background: rgba($white, 0.3);
    margin-bottom: $space-md;
  }

  &__avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid $white;
  }

  &__name {
    font-family: $font-family-title;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    margin: 0 0 $space-xs;
    color: $white;
  }

  &__since {
    font-size: $font-size-xs;
    opacity: 0.7;
    margin: 0;
  }
}

.section {
  display: flex;
  flex-direction: column;
  gap: $space-lg;
  padding: $space-lg;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-sm;
}

.stat-card {
  background: $white;
  border-radius: 16px;
  padding: $space-md $space-sm;
  text-align: center;
  box-shadow: $shadow-sm;
  display: flex;
  flex-direction: column;
  gap: 2px;

  &__value {
    font-family: $font-family-title;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $primary-color;
    line-height: 1.1;
  }

  &__label {
    font-size: $font-size-xs;
    color: $gray-500;
  }
}

.card {
  background: $white;
  border-radius: 20px;
  padding: $space-lg;
  box-shadow: $shadow-md;

  &__title {
    font-family: $font-family-title;
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
    color: $gray-900;
    margin: 0 0 $space-lg;
  }
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: $space-lg;
  background: $gray-200;
  border-radius: $radius-lg;
  overflow: hidden;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $white;
  padding: $space-md;
  gap: $space-md;

  &__left {
    display: flex;
    align-items: center;
    gap: $space-sm;
  }

  &__icon {
    font-size: 18px;
    color: $primary-color;
  }

  &__label {
    font-size: $font-size-sm;
    color: $gray-500;
    font-weight: $font-weight-medium;
  }

  &__value {
    font-size: $font-size-sm;
    color: $gray-900;
    font-weight: $font-weight-medium;
    text-align: right;
    max-width: 55%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.btn-edit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-sm;
  width: 100%;
  padding: 13px;
  background: $primary-color;
  color: $white;
  border: none;
  border-radius: $radius-full;
  font-family: $font-family-base;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s;

  span {
    font-size: 18px;
  }

  &:hover {
    background: $primary-dark;
    color: $white;
  }
}

.btn-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-sm;
  background: none;
  border: 1.5px solid rgba($danger, 0.3);
  border-radius: $radius-full;
  padding: 13px;
  color: $danger;
  font-family: $font-family-base;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  width: 100%;

  span {
    font-size: 18px;
  }

  &:hover {
    background: rgba($danger, 0.05);
    border-color: $danger;
  }
}
</style>