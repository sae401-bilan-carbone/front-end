<script setup>
import { Pie, Bar, Line } from 'vue-chartjs'
import stats from '@/assets/json-simulation-api/stats.json'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

// Camembert
const pieData = {
  labels: ['Shopping', 'Food', 'Transport'],
  datasets: [
    {
      data: [
        stats.by_category.shopping,
        stats.by_category.food,
        stats.by_category.journey
      ],
      backgroundColor: ['#74b36b', '#1b7a2a', '#0b5d1e']
    }
  ]
}

//  Barres
const barData = {
  labels: stats.by_week.map(w => w.week),
  datasets: [
    {
      data: stats.by_week.map(w => w.total_co2),
      backgroundColor: '#4CAF50'
    }
  ]
}
//Graphiques en trait
const lineData = {
  labels: stats.by_week.map(w => w.week),
  datasets: [
    {
      label: 'CO2 par semaine',
      data: stats.by_week.map(w => w.total_co2),
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      fill: true,
      tension: 0.4, // lissage
      cubicInterpolationMode: 'monotone'
    }
  ]
}
</script>

<template>
  <div class="page">

    <div class="chart-card">
      <Pie :data="pieData" />
    </div>

    <div class="chart-card">
      <Bar :data="barData" />
    </div>

    <div class="chart-card">
      <Line :data="lineData" />
    </div>

  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
}

.chart-card {
  width: 320px;
  background: #e0e0e0;
  padding: 20px;
  border-radius: 20px;
}
</style>