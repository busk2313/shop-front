import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface DialogStoreState {
  product: boolean
  favorite: boolean
  cart: boolean
  orderList: boolean
  orderItem: boolean
}

export const useDialogStore = defineStore('dialog', () => {
  const state = reactive<DialogStoreState>({
    product: false,
    favorite: false,
    cart: false,
    orderList: false,
    orderItem: false,
  })

  function toggleProduct() {
    closeAll()
    state.product = !state.product
  }

  function toggleFavorite() {
    closeAll()
    state.favorite = !state.favorite
  }

  function toggleCart() {
    closeAll()
    state.cart = !state.cart
  }

  function toggleOrderList() {
    closeAll()
    state.orderList = !state.orderList
  }

  function toggleOrderItem() {
    closeAll()
    state.orderItem = !state.orderItem
  }

  function closeAll() {
    state.cart = false
    state.product = false
    state.orderItem = false
    state.orderList = false
    state.favorite = false
  }

  return {
    state,
    toggleProduct,
    toggleFavorite,
    toggleCart,
    toggleOrderList,
    toggleOrderItem,
    closeAll,
  }
})
