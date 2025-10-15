<template>
  <main class="container py-5" role="main">
    <div v-if="resource">
      <h1>{{ resource.title }}</h1>
      <p class="lead">{{ resource.content }}</p>

      <div class="mt-4">
        <button @click="exportPDF" class="btn btn-success me-2">Export as PDF</button>
        <button @click="exportCSV" class="btn btn-secondary">Export as CSV</button>
      </div>
    </div>
    <div v-else>
      <p>Resource not found.</p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import resources from "../assets/json/resources.json"
import jsPDF from "jspdf"
import "jspdf-autotable"

const route = useRoute()
const resource = ref(null)

onMounted(() => {
  const id = parseInt(route.params.id)
  resource.value = resources.find((r) => r.id === id)
})

const exportPDF = () => {
  if (!resource.value) return
  const doc = new jsPDF()
  doc.text(resource.value.title, 10, 10)
  doc.text(resource.value.content, 10, 20)
  doc.save(`${resource.value.title}.pdf`)
}

const exportCSV = () => {
  if (!resource.value) return
  const csvContent = `"Title","Content"\n"${resource.value.title}","${resource.value.content.replace(/"/g, '""')}"`
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `${resource.value.title}.csv`
  link.click()
}
</script>

<style scoped>
.btn {
  padding: 0.9em 5em;
  border-radius: 10px;
}
</style>