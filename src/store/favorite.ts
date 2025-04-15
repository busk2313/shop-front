import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { Product } from '@/interfaces/product.ts'
import HttpHandler from '@/api/http.ts'
import FavoriteRepository from '@/modules/favorite/favorite.repository.ts'

interface FavoriteStoreState {
  list: Product[]
}

export const useFavoriteStore = defineStore('favorite', () => {
  const state = reactive<FavoriteStoreState>({
    list: [],
  })

  const favoriteCount = computed(() => state.list?.length)
  const favoriteList = computed(() => state.list)

  function getList() {
    HttpHandler.use({
      request: () => FavoriteRepository.get(),
      onSuccess: (data) => {
        state.list = data.items
      },
      onError: (e) => {
        console.error(e)
      },
    })
  }

  return {
    state,
    favoriteCount,
    favoriteList,
    getList,
  }
})
