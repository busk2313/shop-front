import type { Product } from './product.ts'

export interface User {
  balance: number
  basket: {
    account_id: number
    id: number
    items: {
      product: Product
      quantity: number
    }[]
  }
  display_name: string
  email: string
  favorites: {
    id: number
    items: Product []
  }
  first_name: string
  id: number
  last_name: string
  mobile: string
  name: string
  role_id: number
  title: string
}
