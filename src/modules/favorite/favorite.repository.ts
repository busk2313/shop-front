import api from '@/api'
import type { Favorite } from '@/interfaces/favorite.ts'

export default class FavoriteRepository {
  static async add(productId: number) {
    const response = await api.post('/api/favorites/add_product', {
      product_id: productId,
    })

    return response.data
  }

  static async get(): Promise<Favorite> {
    const response = await api.get(`/api/favorites/get_by_account`)

    return response.data
  }

  static async remove(productId: number) {
    const response = await api.post('/api/favorites/remove_product', {
      product_id: productId,
    })

    return response.data
  }
}
