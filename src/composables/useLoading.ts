import { computed, ref } from 'vue'

export function useLoading() {
  const loadingCount = ref(0)
  const isLoading = computed(() => loadingCount.value > 0)

  function startLoading() {
    loadingCount.value += 1
  }

  function stopLoading() {
    setTimeout(() => {
      if (loadingCount.value > 0)
        loadingCount.value -= 1
    })
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
  }
}
