export interface Product {
  attributes: any
  description: string
  id: number
  images: {
    file_name: string
    id: string
    original_name: string
  }[]
  name: string
  price: number
}
