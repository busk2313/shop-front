import api from '@/api'
import type { Cart } from '@/interfaces/cart.ts'

export default class CartRepository {
  static async add({ productId, quantity }: { productId: number, quantity: number }) {
    const response = await api.post('/api/basket/add_product', {
      product_id: productId,
      quantity,
    })

    return response.data
  }

  static async get(): Promise<Cart> {
    const response = await api.get(`/api/basket/get_by_account`)

    return response.data
  }

  static async remove(productId: number) {
    const response = await api.post('/api/basket/remove_product', {
      product_id: productId,
    })

    return response.data
  }

  static async update({ productId, quantity }: { productId: number, quantity: number }) {
    const response = await api.post('/api/basket/update_quantity', {
      product_id: productId,
      quantity,
    })

    return response.data
  }
}
