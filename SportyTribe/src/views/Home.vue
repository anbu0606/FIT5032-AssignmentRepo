<template>
  <main class="home-page bg-light" role="main">
    <section class="S1 text-center text-white d-flex align-items-center" aria-labelledby="homeHeading">
      <div class="container">
        <h1 id="homeHeading" class="display-4 fw-bold">Join the Movement. Stay Active. Stay Connected.</h1>
        <p class="lead">Discover programs, events, and a community built for you.</p>
        <div class="mt-4">
          <router-link to="/program" class="btn btn-primary btn-lg me-3" aria-label="Explore available fitness and sports programs">Explore Programs</router-link>
          <router-link to="/form" class="btn btn-outline-light btn-lg" aria-label="Login or Sign up to your SportyTribe account">Login / Sign Up</router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
</script>

<style scoped>
.S1 {
  min-height: 80vh;
  background: linear-gradient(90deg, #2d9fd9, #3ac98b);
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); 
}
a:focus,
button:focus {
  outline: 3px solid #fbc02d;
  outline-offset: 3px;
}
</style>