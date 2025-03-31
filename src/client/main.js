import 'reset-css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import setupStore from './stores/index.js'

async function setupApp() {
  const app = createApp(App)
  app.use(ElementPlus)
  app.use(createPinia())
  await setupStore()
  app.use(router)
  app.mount('#app')
  console.log(import.meta.env)
}

setupApp()
