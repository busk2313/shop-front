import type { Product } from '@/interfaces/product.ts'
import api from '@/api'

export default class ProductRepository {
  static async getList(): Promise<Product[]> {
    const response = await api.get('/api/product/get')

    return response.data
  }

  static async getById(id: number): Promise<Product> {
    const response = await api.get(`/api/product/get/${id}`)

    return response.data
  }

  static async getByCategory(categoryId: number): Promise<Product[]> {
    const response = await api.get(`/api/product/get_by_category_id/${categoryId}`)

    return response.data
  }
}
