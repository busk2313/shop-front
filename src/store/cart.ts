import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { Cart } from '@/interfaces/cart.ts'
import HttpHandler from '@/api/http.ts'
import CartRepository from '@/modules/cart/cart.repository.ts'

interface CartStoreState {
  cart: Cart
}

export const useCartStore = defineStore('cart', () => {
  const state = reactive<CartStoreState>({
    cart: {} as Cart,
  })

  const cartItems = computed(() => state.cart?.items || [])
  const cartItemsAmount = computed(() => cartItems.value.length)

  function getList() {
    HttpHandler.use({
      request: () => CartRepository.get(),
      onSuccess: (data) => {
        state.cart = data
      },
      onError: (e) => {
        console.error(e)
      },
    })
  }

  return {
    state,
    cartItems,
    cartItemsAmount,
    getList,
  }
})
