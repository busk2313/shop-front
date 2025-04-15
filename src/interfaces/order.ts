import type { Product } from '@/interfaces/product.ts'

export interface Order {
  created_at: string
  id: number
  items: {
    product: Product
    quantity: number
  }[]
  location_id: number
  status: string
  sum: number
}

export interface OrderCreateForm {
  location_id: number
  products: {
    product_id: number
    quantity: number
  }[]
  sum: number
}

export interface OrderStatus {
  created_at: string
  id: number
  status: string
  sum: number
}
