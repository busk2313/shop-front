import type { Product } from '@/interfaces/product.ts'

export interface Cart {
  account_id: number
  id: number
  items: {
    product: Product
    quantity: number
  }[]
}
