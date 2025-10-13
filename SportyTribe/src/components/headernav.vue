<template>
  <header class="sporty-navbar shadow sticky-top">
    <div class="container-fluid" >
      <nav class="navbar navbar-expand-md navbar-dark" aria-label="Main Navigation">
        <div class="d-flex align-items-center">
          <img src="@/assets/runningIcon.jpg" alt="SportyTribe Logo" class="brand-icon me-2" />
          <router-link class="navbar-brand fw-bold fs-3" to="/home">SportyTribe</router-link>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false"
          aria-label="Toggle navigation" >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto my-2 my-md-0">
          <li class="nav-item">
          <router-link to="/home" class="nav-link px-3" active-class="active">Home</router-link>
        </li>
        <li v-if="userRole === 'user'" class="nav-item">        
          <router-link to="/program" class="nav-link px-3" active-class="active">Program</router-link>
        </li>
        <li v-if="userRole === 'user'" class="nav-item"> 
          <router-link to="/resources" class="nav-link px-3" active-class="active">Resources</router-link>
        </li>
        <li v-if="userRole === 'user'" class="nav-item">    
          <router-link to="/calendar" class="nav-link px-3" active-class="active">Calendar</router-link>
        </li>
        <li v-if="userRole === 'user'" class="nav-item">   
          <router-link to="/nearbyevents" class="nav-link px-3" active-class="active">Nearby Events</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/aboutus" class="nav-link px-3" active-class="active">About Us</router-link>
        </li>
        
          <li v-if="!isLoggedIn" class="nav-item">
          <router-link class="btn btn-primary ms-2" to="/Firelogin" active-class="active">Login</router-link>
          </li>

          <li v-else class="nav-item">
            <button class="btn btn-danger ms-2" @click="logout">Logout</button>
          </li>



           <li v-if="userRole === 'user'" class="nav-item">
          <router-link to="/contact" class="nav-link px-3" active-class="active">Contact Us</router-link>
        </li>

        



        <li v-if="userRole === 'admin'" class="nav-item">
              <router-link to="/admin-dashboard" class="nav-link px-3 text-warning fw-bold">Admin Dashboard</router-link>
            </li>
             <li v-if="userRole === 'admin'" class="nav-item">
              <router-link to="/adminusereventslist" class="nav-link px-3 text-warning fw-bold">Participant List</router-link>
            </li>


            <li v-if="userRole === 'admin'" class="nav-item">
              <router-link to="/admin-dashboard" class="nav-link px-3 text-warning fw-bold">Admin Profile</router-link>
            </li>
      </ul>
        </div>
      </nav>
    </div>
  </header>
</template>
<script setup>
import { ref, onMounted } from "vue"
import { auth, db } from "@/firebase/init"
import { doc, getDoc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { useRouter } from "vue-router"

const isLoggedIn = ref(false)
const userRole = ref(null)
const router = useRouter()

// Login state
onMounted(() => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      isLoggedIn.value = true
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        userRole.value = docSnap.data().role
      }
    } else {
      isLoggedIn.value = false
      userRole.value = null
    }
  })
})


// Logout function
const logout = async () => {
  try {
    await signOut(auth)
    isLoggedIn.value = false
    userRole.value = null
    router.push("/Firelogin") 
  } catch (error) {
    console.error("Logout failed:", error)
  }
}
</script>
<style scoped>

.sporty-navbar {
  background: linear-gradient(90deg, #004d40, #009e80);
}
.brand-icon {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}
.nav-link:focus,
.btn:focus {
  outline: 3px solid #ffeb3b;
  outline-offset: 3px;
}
.nav-link {
  color: #fff;
  font-weight: 500;
  transition: 0.3s;
  border-radius: 8px;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.navbar-brand {
  color: #fff;
}

.btn-accent,
.btn-primary{
    background: #ff5722;
  color: #fff;
  border: none;
  border-radius: 8px;
}
.btn-primary:hover,
.btn-primary:focus {
  background: #e64a19;
}
.btn-danger:focus {
  outline: 3px solid #ffeb3b;
  outline-offset: 3px;
}
</style>
