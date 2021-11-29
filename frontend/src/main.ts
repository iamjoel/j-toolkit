import { createApp } from 'vue'
// router
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

import App from './App.vue'

// store
import { createPinia } from 'pinia'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(createPinia())

app.mount('#app')
