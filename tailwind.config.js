/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#10083F',
        'neutral-active': '#E2E1E8',
        'label': '#706B8C',
        'label-disabled': '#B8B5C6',
        'label-secondary': '#858295',
        'label-informative': '#0E5AED',
        'surface': '#F3F3F5',
        'accent': '#FFDD33',
        'accent-surface': '#FFF8D9',
        'danger': '#ED6A5A',
        'decorative-violet': '#7C4EFF',
        'decorative-red': '#FF482B',
        'decorative-green': '#43A800',
        'border': '#DBDAE2',
        'dialog-bg': 'rgba(0, 0, 0, 0.2)',
        'dialog-bg-mobile': 'rgba(0, 0, 0, 0.8)',
        'surface-inverse': '#2C2C2C',
      },
      gridTemplateColumns: {
        'auto-1': 'auto, 1fr',
      },
      flex: {
        fixed: '1 0 auto',
      },
    },
  },
  plugins: [],
}
