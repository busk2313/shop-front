import api from '@/api'
import type { Order, OrderCreateForm, OrderStatus } from '@/interfaces/order.ts'

export default class OrderRepository {
  static async getList(): Promise<Order[]> {
    const response = await api.get(`/api/order/get_by_account`)

    return response.data
  }

  static async create(data: OrderCreateForm) {
    const response = await api.post('/api/order/create', data)

    return response.data
  }

  static async getById(id: number): Promise<Order> {
    const response = await api.get(`/api/order/get/${id}`)

    return response.data
  }

  static async getStatus(id: number): Promise<OrderStatus> {
    const response = await api.get(`/api/order/status/${id}`)

    return response.data
  }
}
