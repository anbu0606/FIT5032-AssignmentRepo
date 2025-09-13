<script setup>
import { ref } from 'vue'
import programdata from '../assets/json/programdetails.json'
import { format } from "date-fns"

const events = ref(programdata)
const pastReviews1 = ref("")
const filters = ref({ global: { value: null } })

const formatDate = (dateString) => {
  return format(new Date(dateString), "dd/MM/yyyy") // Australia format
}
const ratingUpdation = (event, addRating) => {
   if (!event.ratings) event.ratings = []
  event.ratings.push(addRating)
}

const getAverage = (event) => {
  if (!event.ratings || event.ratings.length === 0) return "No reviews"
  const totalRating = event.ratings.reduce((a, b) => a + b, 0)
  return (totalRating / event.ratings.length).toFixed(1)
}

const customerReview = (event) => {
  if (!event.reviews) event.reviews = []
  const pastReviews = pastReviews1.value.trim()

   if (pastReviews.length < 3) {
    alert("Review must be at least 3 characters.")
    return
  }

  event.pastReviews.push(pastReviews)
  pastReviews1.value = ""

}

</script>

<template>
  <div class="container py-5">
    <h1> Upcoming Programs & Events</h1>
    <p class="text-muted">Browse upcoming sporting community activities!</p>

    <div class="mb-3">
      <span class="p-input">
        <InputText v-model="filters.global.value" placeholder="Search events..." />
      </span>
    </div>

    <DataTable :value="events" :filters="filters" paginator :rows="3" :rowsPerPageOptions="[3,5, 10, 20, 50]" tableStyle="min-width: 50rem" sortMode="multiple" filterDisplay="menu" responsiveLayout="scroll" >
      <Column field="name" header="Event" sortable filter filterPlaceholder="Search by name" style="width: 25%"></Column>
      <Column field="date" header="Date" sortable style="width: 25%">
      <template #body="{ data }">
        {{ formatDate(data.date) }}
      </template>
      </Column>
      <Column field="location" header="Location" sortable filter filterPlaceholder="Search by location" style="width: 25%"></Column>
      <Column header="Rating" style="width: 50%">
        <template #body="{ data }">
          <div class="d-flex flex-column align-items-start">
            <Rating v-model="data.userRating" :cancel="false" @update:modelValue="ratingUpdation(data, $event)" />
            <small class="text-muted mt-1"> Average: {{ getAverage(data) }} </small>
          </div>
        </template>
      </Column>
        <Column header="Reviews" style="width: 35%">
        <template #body="{ data }">
          <div class="review-sec">
            <ul v-if="data.reviews && data.reviews.length" class="list-unstyled">
              <li v-for="(review, i) in data.reviews" :key="i"> {{ review }}</li>
            </ul>
            <div class="d-flex mt-2">
              <InputText v-model="pastReviews" placeholder="Add a review" class="me-2" />
              <Button label="Post" size="small" @click="customerReview(data)" />
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style>
.p-input {

  width: 100%;
  max-width: 300px;
  display: inline-block;
}
.review-sec {
  max-height: 120px;
  overflow-y: auto;
}
</style>
