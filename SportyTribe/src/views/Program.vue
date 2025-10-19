<script setup>
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase/init'
import Button from "primevue/button"

const events = ref([])
const filters = ref({ global: { value: null } })
const liveMessage = ref("")
const loading = ref(true)

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "programdetails"))
    events.value = querySnapshot.docs.map(d => ({
      docId: d.id,
      ...d.data(),
    }))
  } catch (err) {
    console.error("Error loading Firestore data:", err)
  } finally {
    loading.value = false
  }
})

const formatDate = (dateString) => format(new Date(dateString), "dd/MM/yyyy")

const ratingUpdation = async (event, addRating) => {
  if (!event.ratings) event.ratings = []
  event.ratings.push(addRating)

  liveMessage.value = `Rating added for ${event.name}. Average rating now ${getAverage(event)}.`

  try {
    await updateDoc(doc(db, "programdetails", event.docId), { ratings: event.ratings })
  } catch (error) {
    console.error("Error updating rating:", error)
  }
}

const getAverage = (event) => {
  if (!event.ratings || event.ratings.length === 0) return "No reviews"
  const totalRating = event.ratings.reduce((a, b) => a + b, 0)
  return (totalRating / event.ratings.length).toFixed(1)
}

const customerReview = async (event) => {
  const newReview = (event.tempReview || "").trim()

  if (newReview.length < 3) {
    liveMessage.value = "Review must contain at least three characters."
    return
  }

  if (!event.reviews) event.reviews = []
  event.reviews.push(newReview)
  liveMessage.value = `New review added for ${event.name}.`
  event.tempReview = "" 

  try {
    await updateDoc(doc(db, "programdetails", event.docId), { reviews: event.reviews })
  } catch (error) {
    console.error("Error updating review:", error)
  }
}

</script>

<template>
  <main class="container py-5" role="main">
    <p class="text-muted">Browse upcoming sporting community activities!</p>

    <div v-if="loading" class="alert alert-info mt-3" role="status">
      Loading program details...
    </div>

    <div v-else>
      <div class="mb-3">
        <label for="searchEvents" class="form-label visually-hidden">Search events</label>
        <InputText
          id="searchEvents"
          v-model="filters.global.value"
          placeholder="Search events..."
          aria-label="Search events"
          class="p-input"
        />
      </div>

      <DataTable
        :value="events"
        :filters="filters"
        paginator
        :rows="3"
        :rowsPerPageOptions="[3, 5, 10, 20, 50]"
        tableStyle="min-width: 50rem"
        sortMode="multiple"
        filterDisplay="menu"
        responsiveLayout="scroll"
        aria-describedby="programHeading"
      >
        <Column field="name" header="Event" sortable filter filterPlaceholder="Search by name" style="width: 25%"></Column>

        <Column field="date" header="Date" sortable style="width: 25%">
          <template #body="{ data }">{{ formatDate(data.date) }}</template>
        </Column>

        <Column field="location" header="Location" sortable filter filterPlaceholder="Search by location" style="width: 25%"></Column>

        <Column header="Rating" style="width: 30%">
          <template #body="{ data }">
            <div class="d-flex flex-column align-items-start">
              <label :for="'rating-' + data.name" class="visually-hidden">Rate {{ data.name }}</label>
              <Rating
                :id="'rating-' + data.name"
                v-model="data.userRating"
                :cancel="false"
                @update:modelValue="ratingUpdation(data, $event)"
                aria-label="Rating stars for {{ data.name }}"
              />
              <small class="text-muted mt-1">Average: {{ getAverage(data) }}</small>
            </div>
          </template>
        </Column>

        <Column header="Reviews" style="width: 40%">
          <template #body="{ data }">
            <div class="review-sec">
              <ul v-if="data.reviews && data.reviews.length" class="list-unstyled">
                <li v-for="(review, i) in data.reviews" :key="i">{{ review }}</li>
              </ul>
              <div class="d-flex mt-2">
                <label :for="'review-' + data.name" class="visually-hidden">Write a review for {{ data.name }}</label>
                <InputText
                  :id="'review-' + data.name"
                  v-model= "data.tempReview"
                  placeholder="Add a review"
                  aria-label="Add a review for {{ data.name }}"
                  class="me-2"
                />
                <Button label="Post" size="small" @click="customerReview(data)" aria-label="Post review" />
              </div>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <p aria-live="polite" class="visually-hidden">{{ liveMessage }}</p>
  </main>
</template>

<style scoped>
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
