export type FilterSortType = 'popular' | 'new' | 'price_desc' | 'price_asc'

export interface FilterParams {
  priceLimit: boolean
  sortType: FilterSortType
}

export interface DefaultListItem {
  label: string
  value: string
}

export interface Category {
  id: number
  name: string
  title: string
}
