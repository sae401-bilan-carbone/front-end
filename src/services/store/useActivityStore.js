import { defineStore } from "pinia";
import { ref } from "vue";
import ActivityApi from "../api/ActivityApi";

export const useActivityStore = defineStore('activity', () => {
  const activity = ref(null)
  const type = ref(null)
  const data = ref({
    journey: { vehicule: null, distance: null, energy: null },
    food: { meals: [] },
    shopping: { items: [] }
  })
  const step = ref(1)
  const loading = ref(false)
  const error = ref(null)
  const deleteError = ref(null)

  const stats = ref(null)
  const activities = ref([])

  function setStep(newStep) { step.value = newStep }
  function setType(newType) { type.value = newType }

  function reset() {
    step.value = 1
    type.value = null
    error.value = null
    data.value = {
      journey: { vehicule: null, distance: null, energy: null },
      food: { meals: [] },
      shopping: { items: [] }
    }
  }

  async function submitActivity() {
    loading.value = true
    error.value = null
    try {
      const payload = data.value[type.value]
      const response = await ActivityApi.create(type.value, payload)
      activity.value = response
      await fetchDashboardData()
      return response
    } catch (e) {
      error.value = e.message || "Une erreur est survenue."
      throw e
    } finally {
      loading.value = false
    }
  }

  async function deleteActivity(id) {
    deleteError.value = null
    try {
      await ActivityApi.delete(id)
      activities.value = activities.value.filter(a => a.id !== id)
      if (stats.value) {
        await fetchDashboardData()
      }
    } catch (e) {
      deleteError.value = e.message || "Impossible de supprimer l'activité."
      throw e
    }
  }

  async function fetchDashboardData() {
    loading.value = true
    error.value = null
    try {
      const [statsData, activitiesData] = await Promise.all([
        ActivityApi.getStats(),
        ActivityApi.getAll()
      ])
      stats.value = statsData
      activities.value = activitiesData
    } catch (e) {
      error.value = e.message || "Impossible de charger les données."
    } finally {
      loading.value = false
    }
  }

  return {
    activity, type, data, step, loading, error, deleteError,
    stats, activities,
    setStep, setType, reset,
    submitActivity, deleteActivity, fetchDashboardData
  }
})