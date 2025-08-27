<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top">
  <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">SportyTribe</router-link>

     <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">

    <ul class="navbar-nav ms-auto">
        <li class="nav-item">
        
          <router-link to="/home" class="nav-link" active-class="active">Home</router-link>
        </li>

        <li class="nav-item">
        
          <router-link to="/program" class="nav-link" active-class="active">Program</router-link>
        </li>


        <li class="nav-item">
        
          <router-link to="/resources" class="nav-link" active-class="active">Resources</router-link>
        </li>


        <li class="nav-item">
        
          <router-link to="/calendar" class="nav-link" active-class="active">Calendar</router-link>
        </li>

        <li class="nav-item">
        
          <router-link to="/nearbyevents" class="nav-link" active-class="active">Nearby Events</router-link>
        </li>

        <li class="nav-item">
        
          <router-link to="/aboutus" class="nav-link" active-class="active">About Us</router-link>
        </li>

        <li class="nav-item">
        
          <router-link to="/contactus" class="nav-link" active-class="active">Contact Us</router-link>
        </li>


        <li class="nav-item">
        
          <router-link class="btn btn-primary ms-2" to="/form" active-class="active">Profile</router-link>
        </li>
      </ul>
      </div>
      </div>
    </nav>
</template>
