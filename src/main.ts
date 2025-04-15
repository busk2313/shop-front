import { createApp } from 'vue'
import 'beeline-design-system-vue3/dist/beeline-design-system-vue3.css'
import App from '@/App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupKeycloak } from '@/libs/keycloak.ts'
import '@/styles/index.scss'

const app = createApp(App)

function initApp() {
  setupStore(app)
  setupRouter(app)
  app.mount('#app')
}

setupKeycloak(initApp)
