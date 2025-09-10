import { createRouter, createWebHistory } from 'vue-router'
import Form from '../views/Form.vue'
import Program from '../views/Program.vue'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import FirebaseSigninView from "@/views/FirebaseSigninView.vue"
import FirebaseRegisterView from "@/views/FirebaseRegisterView.vue"


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
  },
   {
    path: '/firelogin',
    name: 'FireLogin',
    component: FirebaseSigninView  
  },
  {
    path: '/fireregister',
    name: 'FireRegister',
    component: FirebaseRegisterView  
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
