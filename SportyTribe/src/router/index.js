import { createRouter, createWebHistory } from 'vue-router'
import Form from '../views/Form.vue'
import Program from '../views/Program.vue'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'

const routes = [
   {
    path: '/',    
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
    path: '/register',   
    name: 'Register',
    component: Register
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
