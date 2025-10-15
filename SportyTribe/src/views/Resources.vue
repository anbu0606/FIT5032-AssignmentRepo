<template>
  <main class="container py-5" role="main">
    <h1 class="mb-4">Resources</h1>
    <p class="text-muted mb-4">Explore useful guides and information for your active lifestyle.</p>

    <div v-for="resource in resources" :key="resource.id" class="card mb-4 shadow-sm p-3">
      <h3>{{ resource.title }}</h3>
      <p>{{ resource.summary }}</p>
      <router-link :to="`/resources/${resource.id}`" class="btn btn-primary">
        Read More
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue"
import resources from "../assets/json/resources.json"

const resourcesList = ref(resources)
</script>

<style scoped>
.card {
  border-radius: 20px;
}
.btn {
  background: #5085be;
  border: none;
}
.btn:hover {
  background: #92c7ff;
}
</style>