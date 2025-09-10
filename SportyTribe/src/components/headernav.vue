<template>
  <header class="sporty-navbar shadow sticky-top">
    <div class="container-fluid" >
      <nav class="navbar navbar-expand-md navbar-dark">
        <div class="d-flex align-items-center">
          <img src="@/assets/runningIcon.jpg" alt="SportyTribe Logo" class="brand-icon me-2" />
          <router-link class="navbar-brand fw-bold fs-3" to="/home">SportyTribe</router-link>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto my-2 my-md-0">
          <li class="nav-item">
          <router-link to="/home" class="nav-link px-3" active-class="active">Home</router-link>
        </li>
        <li class="nav-item">        
          <router-link to="/program" class="nav-link px-3" active-class="active">Program</router-link>
        </li>
        <li class="nav-item"> 
          <router-link to="/resources" class="nav-link px-3" active-class="active">Resources</router-link>
        </li>
        <li class="nav-item">    
          <router-link to="/calendar" class="nav-link px-3" active-class="active">Calendar</router-link>
        </li>
        <li class="nav-item">   
          <router-link to="/nearbyevents" class="nav-link px-3" active-class="active">Nearby Events</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/aboutus" class="nav-link px-3" active-class="active">About Us</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contactus" class="nav-link px-3" active-class="active">Contact Us</router-link>
        </li>
        <li class="nav-item">
          <router-link class="btn btn-primary ms-2" to="/form" active-class="active">Login</router-link>
          </li>
          <li class="nav-item">
          <router-link class="btn btn-primary ms-2" to="/Firelogin" active-class="active">Firebase Login</router-link>
          </li>
          <li class="nav-item">
          <router-link class="btn btn-primary ms-2" to="/FireRegister" active-class="active">Firebase Register</router-link>
          </li>
      </ul>
        </div>
      </nav>
    </div>
  </header>
</template>
<script setup>
</script>
<style scoped>

.sporty-navbar {
  background: linear-gradient(90deg, #0acae3, #00c896);
}
.brand-icon {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}
.nav-link {
  color: white;
  font-weight: 500;
  transition: 0.3s;
  border-radius: 8px;
}
.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.navbar-brand {
  color: white;
  transition: 0.3s;
}

.btn-accent,
.btn-primary{
  background: #ff6b6b;
  color: white;
  border: none;
  transition: 0.3s;
  border-radius: 8px;
}
.btn-accent:hover,
.btn-primary:hover {
  background: #e63946;
}
</style>
