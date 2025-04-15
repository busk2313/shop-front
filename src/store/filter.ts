import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { Category, FilterSortType } from '@/interfaces/common.ts'

interface FilterStoreState {
  sort: FilterSortType
  category: Category | null
  search: string
  limit: boolean
}

export const useFilterStore = defineStore('filter', () => {
  const state = reactive<FilterStoreState>({
    sort: 'new',
    category: null,
    search: '',
    limit: false,
  })

  const category = computed(() => state.category)

  function changeSort(val: FilterSortType) {
    state.sort = val
  }

  function changeLimit(val: boolean) {
    state.limit = val
  }

  function changeCategory(val: Category) {
    state.category = val
  }

  function clearCategory() {
    state.category = null
  }

  return {
    state,
    category,
    changeSort,
    changeLimit,
    changeCategory,
    clearCategory,
  }
})
