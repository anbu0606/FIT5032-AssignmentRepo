<script setup>
import Headernav from './components/headernav.vue';
</script>

<template>
      <div class = "main-container">


  <headernav/>

  <main class ="pt-4">
    <router-view/>
  </main>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
