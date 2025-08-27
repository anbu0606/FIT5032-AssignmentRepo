import { createRouter, createWebHistory } from 'vue-router'
import Form from '../views/Form.vue'
import Program from '../views/Program.vue'

const routes = [
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
