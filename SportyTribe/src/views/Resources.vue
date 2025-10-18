<template>
  <main class="container py-5" role="main">
    <h1 class="mb-4">Resources</h1>
    <p class="text-muted mb-4">
      Explore useful guides and information for your active lifestyle.
    </p>

    <div
      v-for="resource in resourcesList"
      :key="resource.id"
      class="card mb-4 shadow-sm p-3"
    >
      <h3>{{ resource.title }}</h3>
      <p>{{ resource.summary }}</p>
      <router-link :to="`/resources/${resource.id}`" class="btn btn-primary">
        Read More
      </router-link>
    </div>

    <p class="text-muted mt-5 mb-3">
      Browse helpful materials, and chat with our AI assistant for tips!
    </p>

   
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
  transition: transform 0.2s ease;
}
.card:hover {
  transform: scale(1.02);
}

.btn {
  background: #5085be;
  border: none;
}
.btn:hover {
  background: #92c7ff;
}

.sportybot-section {
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  padding-top: 2rem;
}


</style>