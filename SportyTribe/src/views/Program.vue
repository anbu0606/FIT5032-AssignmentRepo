<script setup>
import { ref } from 'vue'
import programdata from '../assets/json/programdetails.json'
import { format } from "date-fns"

const events = ref(programdata)
const pastReviews1 = ref("")
const filters = ref({ global: { value: null } })
const liveMessage = ref("")

const formatDate = (dateString) => {
  return format(new Date(dateString), "dd/MM/yyyy") // Australian date format
}
const ratingUpdation = (event, addRating) => {
   if (!event.ratings) event.ratings = []
  event.ratings.push(addRating)
    liveMessage.value = `Rating added for ${event.name}. Average rating now ${getAverage(event)}.`

}

const getAverage = (event) => {
  if (!event.ratings || event.ratings.length === 0) return "No reviews"
  const totalRating = event.ratings.reduce((a, b) => a + b, 0)
  return (totalRating / event.ratings.length).toFixed(1)
}

const customerReview = (event) => {
  if (!event.reviews) event.reviews = []
  const newReviews = pastReviews1.value.trim()

   if (newReviews.length < 3) {
       liveMessage.value = "Review must contain at least three characters."
    return
  }



  event.reviews.push(newReviews)
  liveMessage.value = `New review added for ${event.name}.`
  pastReviews1.value = ""

}

</script>

<template>
  <main class="container py-5" role="main">
    <h1 id="programHeading"> Upcoming Programs & Events</h1>
    <p class="text-muted">Browse upcoming sporting community activities!</p>

    <div class="mb-3">
            <label for="searchEvents" class="form-label visually-hidden">Search events</label>
        <InputText id="searchEvents" v-model="filters.global.value" placeholder="Search events..." aria-label="Search events"
        class="p-input" />
      
    </div>

    <DataTable :value="events" :filters="filters" paginator :rows="3" :rowsPerPageOptions="[3,5, 10, 20, 50]" tableStyle="min-width: 50rem" sortMode="multiple" filterDisplay="menu" responsiveLayout="scroll" aria-describedby="programHeading" >
      <Column field="name" header="Event" sortable filter filterPlaceholder="Search by name" style="width: 25%"></Column>
      <Column field="date" header="Date" sortable style="width: 25%">
      <template #body="{ data }"> {{ formatDate(data.date) }}
      </template>
      </Column>
      <Column field="location" header="Location" sortable filter filterPlaceholder="Search by location" style="width: 25%"></Column>
      <Column header="Rating" style="width: 30%">
        <template #body="{ data }">
          <div class="d-flex flex-column align-items-start">
            <label :for="'rating-' + data.name" class="visually-hidden">Rate {{ data.name }}</label>
            <Rating :id="'rating-' + data.name" v-model="data.userRating" :cancel="false" @update:modelValue="ratingUpdation(data, $event)"  aria-label="Rating stars for {{ data.name }}" />
            <small class="text-muted mt-1"> Average: {{ getAverage(data) }} </small>
          </div>
        </template>
      </Column>
        <Column header="Reviews" style="width: 40%">
        <template #body="{ data }">
          <div class="review-sec">
            <ul v-if="data.reviews && data.reviews.length" class="list-unstyled">
              <li v-for="(review, i) in data.reviews" :key="i"> {{ review }}</li>
            </ul>
            <div class="d-flex mt-2">
               <label :for="'review-' + data.name" class="visually-hidden">Write a review for {{ data.name }}</label>
              <InputText  :id="'review-' + data.name" v-model="pastReviews1" placeholder="Add a review" aria-label="Add a review for {{ data.name }}" class="me-2" />
              <Button label="Post" size="small" @click="customerReview(data)" aria-label="Post review" />
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
    <p aria-live="polite" class="visually-hidden">{{ liveMessage }}</p>
  </main>
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
.visually-hidden {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
input:focus,
button:focus,
.p-button:focus,
.p-inputtext:focus,
select:focus {
  outline: 3px solid #fbc02d;
  outline-offset: 3px;
}
</style>
