<script setup>
import { ref } from 'vue'
import eventsData from '../assets/json/programdetails.json'

const events = ref(eventsData)

const filters = ref({ global: { value: null } })
</script>

<template>
  <div class="container py-5">
    <h1> Upcoming Programs & Events</h1>
    <p class="text-muted">Browse upcoming sporting community activities!</p>

    <div class="mb-3">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="filters.global.value" placeholder="Search events..." />
      </span>
    </div>

    <DataTable :value="events" :filters="filters" paginator :rows="3" :rowsPerPageOptions="[3,5, 10, 20, 50]" tableStyle="min-width: 50rem" sortMode="multiple" filterDisplay="menu" responsiveLayout="scroll" >
      <Column field="name" header="Event" sortable filter filterPlaceholder="Search by name" style="width: 25%"></Column>
      <Column field="date" header="Date" sortable style="width: 25%"></Column>
      <Column field="location" header="Location" sortable filter filterPlaceholder="Search by location" style="width: 25%"></Column>
    </DataTable>
  </div>
</template>

<style>
.p-input-icon-left {
  width: 100%;
  max-width: 300px;
  display: inline-block;
}
</style>
