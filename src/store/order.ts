import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { Order } from '@/interfaces/order.ts'
import HttpHandler from '@/api/http.ts'
import OrderRepository from '@/modules/order/order.repository.ts'

interface OrderStoreState {
  list: Order[]
}

export const useOrderStore = defineStore('order', () => {
  const state = reactive<OrderStoreState>({
    list: [],
  })

  const ordersAmount = computed(() => state.list.length)

  async function getList() {
    await HttpHandler.use({
      request: () => OrderRepository.getList(),
      onSuccess: (data) => {
        state.list = data
      },
      onError: (e) => {
        console.error(e)
      },
    })
  }

  return {
    state,
    ordersAmount,
    getList,
  }
})
