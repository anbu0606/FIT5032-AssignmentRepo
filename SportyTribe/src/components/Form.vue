<!------------html---->
<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <h1 class="text-center">SportyTribe Login</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input type="text"
                class="form-control"
                id="username"
                required v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-12 col-sm-6 mt-3 mt-sm-0">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                required minlength="4" maxlength="10" v-model="formData.password"
              />
            </div>
          </div>

          <div class="col-12 col-sm-6 mt-3 mt-sm-0">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @change="validateGender(true)"
              >
                <option value="">-- Select Gender --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>
            

        
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>



    <div class="row mt-5" v-if="submittedCards.length">
      <h3 class="text-center mb-3">Submitted Users</h3>
      <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
        <Column field="username" header="Username"></Column>

        <Column field="password" header="Password"></Column>
                <Column field="gender" header="Gender"></Column>

      </DataTable>
    </div>

</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])
const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})


const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = "Please select your gender."
  } else {
    errors.value.gender = null
  }
}
const submitForm = () => {

  validateGender(true)

  if (!errors.value.username && !errors.value.password && !errors.value.resident && !errors.value.gender && !errors.value.reason) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }
}


</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>