import { onMounted, onUnmounted, reactive } from 'vue'
import { SCREEN_SIZES } from '@/constants/common.ts'

export function useScreen() {
  const screen = reactive({
    'sm': false,
    'md': false,
    'lg': false,
    'xl': false,
    '2xl': false,
  })

  function update() {
    const width = window.innerWidth

    screen.sm = false
    screen.md = false
    screen.lg = false
    screen.xl = false
    screen['2xl'] = false

    if (width >= SCREEN_SIZES['2xl'])
      screen['2xl'] = true
    else if (width < SCREEN_SIZES['2xl'] && width >= SCREEN_SIZES.xl)
      screen.xl = true
    else if (width < SCREEN_SIZES.xl && width >= SCREEN_SIZES.lg)
      screen.lg = true
    else if (width < SCREEN_SIZES.lg && width >= SCREEN_SIZES.md)
      screen.md = true
    else
      screen.sm = true
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })
  onUnmounted(() => window.removeEventListener('resize', update))

  return { screen }
}
