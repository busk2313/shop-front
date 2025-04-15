import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import routes from './routes.ts'

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
})

export function setupRouter(app: App) {
  app.use(router)
}
