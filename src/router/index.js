import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FichaTecnicaView from '../views/FichaTecnicaView.vue'
import RegistroDiarioView from '../views/RegistroDiarioView.vue'
import AboutView from '../views/AboutView.vue'
import HistorialMantenimientoView from '../views/HistorialMantenimientoView.vue'
import RepuestoView from '../views/RepuestoView.vue'
import Registroview from '../views/Registroview.vue'
import UbicacionVehiculoView from '../views/UbicacionVehiculoView.vue'
import RegistrarActivosView from '../views/RegistrarActivos.vue'
import ChoferesVehiculosView from '../views/ChoferesVehiculosView.vue'
import GestionFaltasView from '../views/GestionFaltasView.vue'
import FallosVehicularesView from '../views/FallosVehicularesView.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/registraractivos',
    name: 'registraractivos',
    component: RegistrarActivosView
  },
  {
    path: '/ficha',
    name: 'ficha',
    component: FichaTecnicaView
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegistroDiarioView
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
    path: '/gestion',
    name: 'gestion',
    component: RepuestoView
  },

  {
    path: '/registrou',
    name: 'registrou',
    component: Registroview
  },

  {
    path: '/ubicacionv',
    name: 'ubicacionv',
    component: UbicacionVehiculoView
  },

  {
    path: '/gestionfaltas',
    name: 'gestionfaltas',
    component: GestionFaltasView
  },

  {
    path: '/fallovehicular',
    name: 'fallovehicular',
    component: FallosVehicularesView
  },

  
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/choferesVehiculos',
    name: 'choferesVehiculos',
    component: ChoferesVehiculosView
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
