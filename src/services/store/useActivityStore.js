import { defineStore } from "pinia";
import { ref } from "vue";

export const useActivityStore = defineStore('activity', () => {
  const activity = ref(null)
  const type = ref(null)
  const data = ref({
    journey: {
      vehicule: null,
      distance: null,
      energy: null
    },
    food: {
      meals: []
    },
    shopping: {
      items: []
    }
  })
  const step = ref(1)
  const loading = ref(false)
  const error = ref(null)

  function setStep(newStep) {
    step.value = newStep
  }

  function setType(newType) {
    type.value = newType
  }

  return {
    activity,
    type,
    data,
    step,
    loading,
    error,
    setStep,
    setType
  }
})