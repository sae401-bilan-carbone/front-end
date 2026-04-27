<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/services/store/useAuthStore'
import { useActivityStore } from '@/services/store/useActivityStore'
import { Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  LineElement, PointElement, CategoryScale, LinearScale,
  ArcElement, Filler
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Filler)

const { t, locale } = useI18n()
const authStore = useAuthStore()
const activityStore = useActivityStore()

const deletingId = ref(null)

async function handleDelete(id) {
  deletingId.value = id
  try { await activityStore.deleteActivity(id) } catch { } finally { deletingId.value = null }
}

const currentMonth = ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1))

const monthLabel = computed(() => {
  const intlLocale = locale.value === 'fr' ? 'fr-FR' : 'en-US'
  return new Intl.DateTimeFormat(intlLocale, { month: 'long', year: 'numeric' }).format(currentMonth.value)
})

function prevMonth() { const d = new Date(currentMonth.value); d.setMonth(d.getMonth() - 1); currentMonth.value = d }
function nextMonth() { const d = new Date(currentMonth.value); d.setMonth(d.getMonth() + 1); currentMonth.value = d }

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const totalDays = new Date(year, month + 1, 0).getDate()
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7

  const activityDays = new Set(
    activityStore.activities
      .filter(a => { const d = new Date(a.createdAt); return d.getFullYear() === year && d.getMonth() === month })
      .map(a => new Date(a.createdAt).getDate())
  )

  const today = new Date()
  const days = []
  for (let i = 0; i < firstWeekday; i++) days.push(null)
  for (let d = 1; d <= totalDays; d++) {
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d
    days.push({ day: d, hasActivity: activityDays.has(d), isToday })
  }
  return days
})

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

const totalCO2 = computed(() => activityStore.stats?.total_emitted ?? 0)
const avgTotal = computed(() => activityStore.stats?.average_total_emitted ?? 0)

const vsAvgPct = computed(() => {
  if (!avgTotal.value) return null
  return Math.round(((totalCO2.value - avgTotal.value) / avgTotal.value) * 100)
})

const weeklyAvg = computed(() => {
  const weeks = activityStore.stats?.by_week ?? []
  if (!weeks.length) return 0
  return (weeks.reduce((s, w) => s + w.total_co2, 0) / weeks.length).toFixed(1)
})

const bestWeek = computed(() => {
  const weeks = activityStore.stats?.by_week ?? []
  if (!weeks.length) return null
  return weeks.reduce((min, w) => w.total_co2 < min.total_co2 ? w : min)
})

function formatCO2(val) {
  if (val >= 1000) return `${(val / 1000).toFixed(2)} ${t('common.units.tons')}`
  return `${Number(val).toFixed(1)} ${t('common.units.kg')}`
}

function formatWeekLabel(str) {
  return str?.replace(/\d{4}-W/, t('common.week_prefix')) ?? ''
}

function formatDate(str) {
  const intlLocale = locale.value === 'fr' ? 'fr-FR' : 'en-US'
  return new Intl.DateTimeFormat(intlLocale, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(str))
}

const lineData = computed(() => {
  const weeks = activityStore.stats?.by_week ?? []
  return {
    labels: weeks.map(w => formatWeekLabel(w.week)),
    datasets: [
      {
        label: t('dashboard.your_emissions'),
        data: weeks.map(w => w.total_co2),
        borderColor: '#2E7D32', backgroundColor: 'rgba(46,125,50,0.07)',
        fill: true, tension: 0.42, pointBackgroundColor: '#2E7D32', pointRadius: 5, pointHoverRadius: 7, borderWidth: 2.5
      },
      {
        label: t('dashboard.users_average'),
        data: weeks.map(w => w.average_co2 ?? null),
        borderColor: '#F57C00', backgroundColor: 'rgba(245,124,0,0.05)',
        fill: false, tension: 0.42, pointBackgroundColor: '#F57C00', pointRadius: 4, pointHoverRadius: 6, borderWidth: 2, borderDash: [6, 4]
      }
    ]
  }
})

const lineOptions = computed(() => ({
  responsive: true, maintainAspectRatio: true,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 20, padding: 14, color: '#263238', usePointStyle: true, pointStyle: 'line' } },
    label: ctx => ` ${Number(ctx.parsed.y).toFixed(1)} ${t('common.units.kg_co2')}`
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#6b7280' } },
    y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#6b7280', callback: v => `${Number(v).toFixed(1)} ${t('common.units.kg')}` } }
  }
}))

const doughnutData = computed(() => ({
  labels: [t('dashboard.categories.shopping'), t('dashboard.categories.food'), t('dashboard.categories.journey')],
  datasets: [{
    data: [activityStore.stats?.by_category.shopping ?? 0, activityStore.stats?.by_category.food ?? 0, activityStore.stats?.by_category.journey ?? 0],
    backgroundColor: ['#1565C0', '#E65100', '#2E7D32'], borderWidth: 0, hoverOffset: 6
  }]
}))

const doughnutOptions = computed(() => ({
  responsive: true, cutout: '68%',
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 18, color: '#263238' } },
    tooltip: { callbacks: { label: ctx => ` ${Number(ctx.parsed).toFixed(1)} ${t('common.units.kg_co2')}` } }
  }
}))

const categoryDetails = computed(() => {
  const cat = activityStore.stats?.by_category
  if (!cat) return []
  const total = totalCO2.value || 1
  return [
    { label: t('dashboard.categories.shopping'), key: 'shopping', color: '#1565C0', icon: '🛍️', value: cat.shopping },
    { label: t('dashboard.categories.food'), key: 'food', color: '#E65100', icon: '🍽️', value: cat.food },
    { label: t('dashboard.categories.journey'), key: 'journey', color: '#2E7D32', icon: '🚗', value: cat.journey },
  ].map(c => ({ ...c, pct: Math.round((c.value / total) * 100) }))
})

const recentActivities = computed(() =>
  [...activityStore.activities]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 30)
)

const typeConfig = computed(() => ({
  journey: { icon: '🚗', label: t('dashboard.type_labels.journey') },
  food: { icon: '🍽️', label: t('dashboard.type_labels.food') },
  shopping: { icon: '🛍️', label: t('dashboard.type_labels.shopping') },
}))

function describeActivity(a) {
  if (a.type === 'journey') {
    const v = a.data.vehicule ? t(`activity.vehicles.${a.data.vehicule}`) : a.data.vehicule
    const e = a.data.energy ? t(`activity.energy.${a.data.energy.replaceAll(' ', '_')}`) : a.data.energy
    return `${v} · ${a.data.distance} ${t('common.units.km')} · ${e}`
  }
  if (a.type === 'food') return a.data.meals?.map(m => `${m.count}× ${t(`activity.meals.${m.type.replaceAll(' ', '_')}`)}`).join(', ') ?? ''
  if (a.type === 'shopping') return a.data.items?.map(i => `${t(`activity.shopping_cats.${i.category}`)} (${i.amount}${t('common.units.euro')})`).join(', ') ?? ''
  return ''
}

const weekdays = computed(() =>
  locale.value === 'fr'
    ? ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    : ['M', 'T', 'W', 'T', 'F', 'S', 'S']
)

const firstName = computed(() => {
  const name = authStore.user?.name || authStore.user?.firstName || ''
  return name.split(' ')[0]
})
</script>

<template>
  <div class="dashboard">
    <div class="hero">
      <div class="hero__top">
        <p class="hero__greeting">{{ t('dashboard.greeting', { name: firstName }) }}</p>
        <router-link :to="{ name: 'add-activity' }" class="hero__add-btn">
          <span class="material-symbols-outlined">add</span>
        </router-link>
      </div>

      <div class="hero__co2-block">
        <span class="hero__co2-label">{{ t('dashboard.total_emitted') }}</span>
        <span class="hero__co2-value">{{ formatCO2(totalCO2) }}</span>
        <span class="hero__co2-sub">{{ t('dashboard.co2_equivalent') }}</span>
        <div v-if="vsAvgPct !== null" class="hero__vs-avg"
          :class="vsAvgPct > 0 ? 'hero__vs-avg--above' : 'hero__vs-avg--below'">
          <span v-if="vsAvgPct > 0">{{ t('dashboard.above_average', { pct: vsAvgPct }) }}</span>
          <span v-else-if="vsAvgPct < 0">{{ t('dashboard.below_average', { pct: Math.abs(vsAvgPct) }) }}</span>
          <span v-else>{{ t('dashboard.at_average') }}</span>
        </div>
      </div>

      <div class="hero__chips">
        <div class="chip">
          <span class="chip__label">{{ t('dashboard.weekly_avg') }}</span>
          <span class="chip__value">{{ weeklyAvg }} {{ t('common.units.kg') }}</span>
        </div>
        <div class="chip chip--orange">
          <span class="chip__label">{{ t('dashboard.users_avg') }}</span>
          <span class="chip__value">{{ formatCO2(avgTotal) }}</span>
        </div>
        <div class="chip" v-if="bestWeek">
          <span class="chip__label">{{ t('dashboard.best_week') }}</span>
          <span class="chip__value">{{ formatWeekLabel(bestWeek.week) }} · {{ Math.round(bestWeek.total_co2) }} {{
            t('common.units.kg') }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <div class="card__header">
          <h2 class="card__title">{{ t('dashboard.month_activity') }}</h2>
          <div v-if="streak > 0" class="streak-badge">🔥 {{ streak }} {{ t('dashboard.streak', streak) }}</div>
        </div>
        <div class="calendar-nav">
          <button class="cal-nav-btn" @click="prevMonth">‹</button>
          <span class="cal-month">{{ monthLabel }}</span>
          <button class="cal-nav-btn" @click="nextMonth">›</button>
        </div>
        <div class="calendar">
          <div v-for="wd in weekdays" :key="wd" class="calendar__wd">{{ wd }}</div>
          <template v-for="(day, i) in calendarDays" :key="i">
            <div v-if="day === null" class="calendar__empty" />
            <div v-else class="calendar__day"
              :class="{ 'calendar__day--active': day.hasActivity, 'calendar__day--today': day.isToday }">
              {{ day.day }}
            </div>
          </template>
        </div>
      </div>

      <div class="card">
        <h2 class="card__title">{{ t('dashboard.co2_by_week') }}</h2>
        <div class="chart-wrap">
          <Line :data="lineData" :options="lineOptions" />
        </div>
      </div>

      <div class="card">
        <h2 class="card__title">{{ t('dashboard.by_category') }}</h2>
        <div class="chart-wrap chart-wrap--doughnut">
          <Doughnut :data="doughnutData" :options="doughnutOptions" />
        </div>
        <div class="cat-list">
          <div v-for="cat in categoryDetails" :key="cat.key" class="cat-row">
            <div class="cat-row__left">
              <span class="cat-row__icon">{{ cat.icon }}</span>
              <span class="cat-row__label">{{ cat.label }}</span>
            </div>
            <div class="cat-row__right">
              <div class="cat-row__bar-track">
                <div class="cat-row__bar-fill" :style="{ width: cat.pct + '%', background: cat.color }" />
              </div>
              <span class="cat-row__val">{{ formatCO2(cat.value) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="card__title">{{ t('dashboard.recent_activities') }}</h2>
        <div v-if="activityStore.loading" class="feed-empty">{{ t('common.loading') }}</div>
        <div v-else-if="!recentActivities.length" class="feed-empty">{{ t('dashboard.no_activities') }}</div>
        <div v-else class="feed">
          <div v-for="a in recentActivities" :key="a.id" class="feed-item"
            :class="{ 'feed-item--deleting': deletingId === a.id }">
            <div class="feed-item__icon">{{ typeConfig[a.type]?.icon }}</div>
            <div class="feed-item__body">
              <p class="feed-item__type">{{ typeConfig[a.type]?.label }}</p>
              <p class="feed-item__desc">{{ describeActivity(a) }}</p>
              <p class="feed-item__date">{{ formatDate(a.createdAt) }}</p>
            </div>
            <div class="feed-item__right">
              <div class="feed-item__co2" :class="a.co2 > 50 ? 'feed-item__co2--high' : ''">{{ formatCO2(a.co2) }}</div>
              <button class="feed-item__delete" :disabled="deletingId === a.id" @click="handleDelete(a.id)"
                :aria-label="t('common.delete')">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

.dashboard {
  min-height: 100vh;
  background-color: $gray-100;
  padding-bottom: $space-xl;
}

.hero {
  background: linear-gradient(155deg, $primary-dark 0%, $primary-color 60%, $primary-light 100%);
  padding: $space-xl $space-lg $space-xl;
  color: $white;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $space-xl;
  }

  &__greeting {
    font-family: $font-family-base;
    font-size: $font-size-md;
    opacity: 0.92;
  }

  &__add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba($white, 0.2);
    color: $white;
    text-decoration: none;
    backdrop-filter: blur(4px);
    transition: background 0.2s;

    &:hover {
      background: rgba($white, 0.32);
      color: $white;
    }
  }

  &__co2-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: $space-xl;
    text-align: center;
  }

  &__co2-label {
    font-size: $font-size-sm;
    opacity: 0.75;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: $space-xs;
  }

  &__co2-value {
    font-family: $font-family-title;
    font-size: 3rem;
    font-weight: $font-weight-bold;
    line-height: 1;
    margin-bottom: $space-xs;
  }

  &__co2-sub {
    font-size: $font-size-sm;
    opacity: 0.65;
    margin-bottom: $space-sm;
  }

  &__vs-avg {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    padding: 3px 12px;
    border-radius: $radius-full;

    &--above {
      background: rgba(#E53935, 0.25);
      color: #FFCDD2;
    }

    &--below {
      background: rgba($white, 0.2);
      color: #C8E6C9;
    }
  }

  &__chips {
    display: flex;
    gap: $space-sm;
    flex-wrap: wrap;
    margin-top: $space-sm;
  }
}

.chip {
  background: rgba($white, 0.15);
  backdrop-filter: blur(4px);
  border-radius: $radius-full;
  padding: $space-xs $space-md;
  display: flex;
  flex-direction: column;

  &__label {
    font-size: $font-size-xs;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &__value {
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
  }

  &--orange {
    background: rgba(#F57C00, 0.3);
    border: 1px solid rgba(#F57C00, 0.5);
  }
}

.section {
  display: flex;
  flex-direction: column;
  gap: $space-lg;
  padding: $space-lg;
}

.card {
  background: $white;
  border-radius: 20px;
  padding: $space-lg;
  box-shadow: $shadow-md;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $space-md;
  }

  &__title {
    font-family: $font-family-title;
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
    color: $gray-900;
    margin: 0 0 $space-md;
  }
}

.streak-badge {
  background: linear-gradient(135deg, #ff6f00, #ffa000);
  color: $white;
  border-radius: $radius-full;
  padding: 2px 12px;
  font-size: $font-size-xs;
  font-weight: $font-weight-bold;
}

.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $space-md;
}

.cal-month {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $gray-900;
  text-transform: capitalize;
}

.cal-nav-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: $primary-color;
  cursor: pointer;
  padding: 0 $space-sm;
  line-height: 1;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  text-align: center;

  &__wd {
    font-size: $font-size-xs;
    color: $gray-500;
    font-weight: $font-weight-medium;
    padding-bottom: $space-xs;
  }

  &__day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: $font-size-xs;
    color: $gray-500;
    position: relative;

    &--active {
      background: rgba($primary-color, 0.15);
      color: $primary-dark;
      font-weight: $font-weight-bold;

      &::after {
        content: '';
        position: absolute;
        bottom: 3px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: $primary-color;
      }
    }

    &--today {
      border: 2px solid $primary-color;
      color: $primary-color;
      font-weight: $font-weight-bold;
    }

    &--active#{&}--today {
      background: $primary-color;
      color: $white;

      &::after {
        background: $white;
      }
    }
  }
}

.chart-wrap {
  width: 100%;

  &--doughnut {
    max-width: 240px;
    margin: 0 auto $space-lg;
  }
}

.cat-list {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
}

.cat-row {
  display: flex;
  align-items: center;
  gap: $space-sm;

  &__left {
    display: flex;
    align-items: center;
    gap: $space-xs;
    min-width: 120px;
  }

  &__icon {
    font-size: 1rem;
  }

  &__label {
    font-size: $font-size-sm;
    color: $gray-900;
    font-weight: $font-weight-medium;
  }

  &__right {
    flex: 1;
    display: flex;
    align-items: center;
    gap: $space-sm;
  }

  &__bar-track {
    flex: 1;
    height: 6px;
    background: $gray-200;
    border-radius: $radius-full;
    overflow: hidden;
  }

  &__bar-fill {
    height: 100%;
    border-radius: $radius-full;
    transition: width 0.6s ease;
  }

  &__val {
    font-size: $font-size-xs;
    color: $gray-500;
    min-width: 50px;
    text-align: right;
  }
}

.feed-empty {
  text-align: center;
  color: $gray-500;
  font-size: $font-size-sm;
  padding: $space-xl 0;
}

.feed {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: $gray-200;
  border-radius: $radius-lg;
  overflow: hidden;
}

.feed-item {
  display: flex;
  align-items: center;
  gap: $space-md;
  background: $white;
  padding: $space-md;

  &__icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__type {
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    color: $primary-color;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 2px;
  }

  &__desc {
    font-size: $font-size-sm;
    color: $gray-900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
  }

  &__date {
    font-size: $font-size-xs;
    color: $gray-500;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: $space-sm;
    flex-shrink: 0;
  }

  &__co2 {
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    color: $primary-dark;

    &--high {
      color: #E65100;
    }
  }

  &__delete {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: $gray-500;
    display: flex;
    align-items: center;
    border-radius: $radius-md;
    transition: color 0.15s, background 0.15s;

    span {
      font-size: 18px;
    }

    &:hover {
      color: $danger;
      background: rgba($danger, 0.08);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &--deleting {
    opacity: 0.45;
    pointer-events: none;
    transition: opacity 0.2s;
  }
}
</style>