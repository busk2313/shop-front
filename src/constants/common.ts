import type { FilterSortType } from '@/interfaces/common.ts'

export const SCREEN_SIZES: { [key: string]: number } = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
}

export const SORT_TYPES: { label: string; value: FilterSortType }[] = [
  {
    label: 'Популярное',
    value: 'popular',
  },
  {
    label: 'Новое',
    value: 'new',
  },
  {
    label: 'По убыванию цены',
    value: 'price_desc',
  },
  {
    label: 'По возрастанию цены',
    value: 'price_asc',
  },
]

export const MODAL_CLOSE_NAVIGATIONS = {
  CLOSE: 'close',
  BACK: 'back',
}
