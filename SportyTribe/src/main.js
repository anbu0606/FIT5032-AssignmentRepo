import './assets/main.css'
import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'

import Aura from '@primeuix/themes/aura'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import router from './router'


const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
})
app.use(router)
app.use(PrimeVue)
app.component('InputText', InputText)
app.component('DataTable', DataTable)
app.component('Column', Column)

app.mount('#app')



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuzc75tks7BQ2nDp2JfBmjEYF9yVDuC2k",
  authDomain: "sportytribe-45a76.firebaseapp.com",
  projectId: "sportytribe-45a76",
  storageBucket: "sportytribe-45a76.firebasestorage.app",
  messagingSenderId: "143596988256",
  appId: "1:143596988256:web:51f007929fd67ac51b2005"
};

// Initialize Firebase
initializeApp(firebaseConfig);