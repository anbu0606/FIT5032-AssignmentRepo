import { createRouter, createWebHistory } from 'vue-router'
import Program from '../views/Program.vue'
import Home from '@/views/Home.vue'
import FirebaseSigninView from "@/views/FirebaseSigninView.vue"
import FirebaseRegisterView from "@/views/FirebaseRegisterView.vue"
import AdminLogin from '@/views/AdminLogin.vue'
import AdminReg from '@/views/AdminReg.vue'


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
  },
  {
    path: '/adminlogin',
    name: 'AdminLogin',
    component: AdminLogin  
  },
  {
    path: '/adminreg',
    name: 'AdminReg',
    component: AdminReg  
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
