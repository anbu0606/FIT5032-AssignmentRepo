<script setup>
import Headernav from './components/headernav.vue';
</script>
<template>
      <div class = "main-container bg-light min-vh-00">
  <headernav/>
  <main class ="main-container py-4">
    <router-view/>
  </main>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #ffffff, #ffffff);
}

nav.navbar {
  margin: 0;
  padding: 0;
  
}

main {
  flex: 1;
  padding-top: 2rem;
}

</style>
