import { createApp, h } from 'vue'
import Notification from '@/components/Notification.vue'

export function useToast() {
  function show(text: string, type = 'success') {
    const root = document.createElement('div')
    document.body.appendChild(root)

    const app = createApp({
      render() {
        return h(Notification, {
          text,
          type,
          onVnodeMounted() {
            setTimeout(() => {
              app.unmount()
            }, 2000)
          },
        })
      },
    })

    app.mount(root)
  }

  return {
    show,
  }
}
