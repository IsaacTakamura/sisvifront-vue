import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FichaTecnicaView from '../views/FichaTecnicaView.vue'
import AboutView from '../views/AboutView.vue'
import HistorialMantenimientoView from '../views/HistorialMantenimientoView.vue'
import RepuestoIngresoView from '../views/RepuestoIngresoView.vue'
import RepuestoView from '../views/RepuestoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ficha',
    name: 'ficha',
    component: FichaTecnicaView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/historial',
    name: 'historial',
    component: HistorialMantenimientoView
  },
  {
    path: '/repuesto',
    name: 'repuesto',

    component: RepuestoIngresoView

  },
  {
    path: '/gestion',
    name: 'gestion',
    component: RepuestoView
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
