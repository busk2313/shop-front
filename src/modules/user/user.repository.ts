import api from '@/api'
import type { User } from '@/interfaces/user.ts'

export default class UserRepository {
  static async get(): Promise<User> {
    const response = await api.get('/api/user/get_info')

    return response.data
  }
}
