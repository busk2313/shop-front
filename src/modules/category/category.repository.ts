import api from '@/api'
import type { Category } from '@/interfaces/common.ts'

export default class CategoryRepository {
  static async getList(): Promise<Category[]> {
    const response = await api.get('/api/category/get')

    return response.data
  }
}
