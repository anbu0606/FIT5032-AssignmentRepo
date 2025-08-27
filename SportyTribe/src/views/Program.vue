<!-- <script setup>
import { ref, onMounted } from 'vue'

const events = ref([])

onMounted(() => {
  // Check LocalStorage first
  const stored = localStorage.getItem("sportytribe_events")
  if (stored) {
    events.value = JSON.parse(stored)
  } else {
    // Mock dataset (could later be fetched from JSON API)
    events.value = [
      { id: 1, name: "Community Football Match", date: "2025-09-10", location: "Melbourne Park" },
      { id: 2, name: "Netball Workshop", date: "2025-09-15", location: "Dandenong Stadium" },
      { id: 3, name: "Ihhhnclusive Cricket Meetup", date: "2025-09-20", location: "Carlton Oval" },
      { id: 4, name: "dddc Cricket Meetup", date: "2025-09-20", location: "Carlton Oval" },
      { id: 5, name: "Inclvbvvusive Cricket Meetup", date: "2025-09-20", location: "Carlton Oval" },
      { id: 6, name: "Inclu   sive Cricket Meetup", date: "2025-09-20", location: "Carlton Oval" },
      { id: 7, name: "Inclussssive Cricket Meetup", date: "2025-09-20", location: "Carlton Oval" },
      { id: 8, name: "Includddsive Cricket Meetup", date: "2025-09-20", location: "Carlton Oval" }
    ]
    localStorage.setItem("sportytribe_events", JSON.stringify(events.value))
  }
})
</script>

<template>
  <div class="container py-5">
    <h1>Programs & Events</h1>
    <p class="text-muted">Explore upcoming sporting activities near you.</p>

    <DataTable
      :value="events"
      paginator
      rows="3"
      responsiveLayout="scroll"
    >
      <Column field="name" header="Event"></Column>
      <Column field="date" header="Date"></Column>
      <Column field="location" header="Location"></Column>
    </DataTable>
  </div>
</template> -->



<script setup>
import { ref, onMounted } from 'vue'

const events = ref([])
const filters = ref({ global: { value: null } })

onMounted(() => {
  // Load from localStorage first
  const stored = localStorage.getItem("sportytribe_events")
  if (stored) {
    events.value = JSON.parse(stored)
  } else {
    // Mock dataset (later replace with API or JSON fetch)
    events.value = [
      { id: 1, name: "Community Football Match", date: "2025-09-10", location: "Melbourne Park" },
      { id: 2, name: "Netball Workshop", date: "2025-09-15", location: "Dandenong Stadium" },
      { id: 3, name: "Inclusive Cricket Meetup", date: "2025-09-20", location: "Carlton Oval" },
      { id: 4, name: "Youth Basketball Camp", date: "2025-09-25", location: "Richmond Rec Centre" },
      { id: 5, name: "Women's Health Run", date: "2025-09-30", location: "Albert Park Lake" }
    ]
    localStorage.setItem("sportytribe_events", JSON.stringify(events.value))
  }
})
</script>

<template>
  <div class="container py-5">
    <h1>Programs & Events</h1>
    <p class="text-muted">Browse upcoming sporting activities that promote community health.</p>

    <!-- Global Search -->
    <div class="mb-3">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="filters.global.value" placeholder="Search events..." />
      </span>
    </div>

    <!-- PrimeVue DataTable -->
    <DataTable
      :value="events"
      :filters="filters"
      paginator
      rows="5"
      sortMode="multiple"
      filterDisplay="menu"
      responsiveLayout="scroll"
    >
      <Column field="name" header="Event" sortable filter filterPlaceholder="Search by name"></Column>
      <Column field="date" header="Date" sortable></Column>
      <Column field="location" header="Location" sortable filter filterPlaceholder="Search by location"></Column>
    </DataTable>
  </div>
</template>

<style>
/* Optional: tweak PrimeVue's default */
.p-input-icon-left {
  width: 100%;
  max-width: 300px;
  display: inline-block;
}
</style>
