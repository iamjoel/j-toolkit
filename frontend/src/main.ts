import { createApp } from 'vue'
// router
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

import App from './App.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)

// store
import { createPinia } from 'pinia'
app.use(createPinia())

app.mount('#app')
