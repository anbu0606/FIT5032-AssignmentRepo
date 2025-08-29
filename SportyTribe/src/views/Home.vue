<template>
  <div class="home-page bg-light">
    <section class="S1 text-center text-white d-flex align-items-center">
      <div class="container">
        <h1 class="display-4 fw-bold">Join the Movement. Stay Active. Stay Connected.</h1>
        <p class="lead">Discover programs, events, and a community built for you.</p>
        <div class="mt-4">
          <router-link to="/program" class="btn btn-primary btn-lg me-3">Explore Programs</router-link>
          <router-link to="/form" class="btn btn-outline-light btn-lg">Login / Sign Up</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.S1 {
  min-height: 80vh;
  background: linear-gradient(90deg, #3eb3e6, #4ed0a2);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>