import type { Product } from '@/interfaces/product.ts'

export interface Favorite {
  id: number
  items: Product[]
}
