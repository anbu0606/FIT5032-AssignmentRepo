<script setup>
import { ref } from "vue"
import adminUserEvents from "../assets/json/adminUserEvents.json"
import { format } from "date-fns"


const userEvents = ref(adminUserEvents)
const filters = ref({ global: { value: null } })


const formatDate = (dateString) => {
  return format(new Date(dateString), "dd/MM/yyyy")
}


const getStatusClass = (status) => {
  switch (status) {
    case "Registered":
      return "bg-success text-white"
    case "Pending":
      return "bg-warning text-dark"
    case "Cancelled":
      return "bg-danger text-white"
    case "Confirmed":
      return "bg-info text-white"
    default:
      return "bg-secondary text-white"
  }
}
</script>

<template>
  <div class="container py-5">
    <h1>Registered Users & Their Events</h1>
    <p class="text-muted mb-4">
      View, sort, and search user event registrations below.
    </p>

    <div class="mb-3">
      <span class="p-input">
        <InputText
          v-model="filters.global.value"
          placeholder="Search users or events..."
        />
      </span>
    </div>

    <DataTable
      :value="userEvents"
      :filters="filters"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
      sortMode="multiple"
      filterDisplay="menu"
      responsiveLayout="scroll"
      stripedRows
      tableStyle="min-width: 60rem"
    >
      <Column
        field="name"
        header="User Name"
        sortable
        filter
        filterPlaceholder="Search by name"
        style="width: 20%"
      ></Column>

      <Column
        field="email"
        header="Email"
        sortable
        filter
        filterPlaceholder="Search by email"
        style="width: 25%"
      ></Column>

      <Column
        field="Event"
        header="Registered Event"
        sortable
        filter
        filterPlaceholder="Search by event"
        style="width: 20%"
      ></Column>

      <Column field="date" header="Event Date" sortable style="width: 15%">
        <template #body="{ data }">
          {{ formatDate(data.date) }}
        </template>
      </Column>

      <Column
        field="Location"
        header="Location"
        sortable
        filter
        filterPlaceholder="Search by location"
        style="width: 15%"
      ></Column>

      <Column
        field="Status"
        header="Status"
        sortable
        filter
        filterPlaceholder="Search by status"
        style="width: 10%"
      >
        <template #body="{ data }">
          <span :class="['badge', getStatusClass(data.Status)]">
            {{ data.Status }}
          </span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.p-input {
  width: 100%;
  max-width: 300px;
  display: inline-block;
}

.badge {
  padding: 0.4em 0.7em;
  border-radius: 0.5em;
  font-size: 0.85em;
}
</style>