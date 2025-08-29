import { createRouter, createWebHistory } from 'vue-router'
import Form from '../views/Form.vue'
import Program from '../views/Program.vue'
import Home from '@/views/Home.vue'

const routes = [
   {
    path: '/',        // <-- default route
    name: 'Home',
    component: Home
  },
   {
    path: '/home',
    redirect: '/'  
  },
  {
    path: '/form',   
    name: 'Form',
    component: Form
  },
  {
    path: '/program',   
    name: 'Program',
    component: Program
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
