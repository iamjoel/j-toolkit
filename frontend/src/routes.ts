import Info from '@/views/info/index.vue'
import Proxy from '@/views/proxy/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/info'
  },
  {
    path: '/info',
    component: Info
  },
  {
    path: '/proxy',
    component: Proxy
  }
]

export default routes
