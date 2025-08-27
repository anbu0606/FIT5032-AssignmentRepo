<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <h1 class="text-center">SportyTribe Login</h1>

        <form @submit.prevent="submitForm">
          <!-- Username (HTML validation only) -->
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                required
                v-model="formData.username"
              />
            </div>

            <!-- Password (Vue validation) -->
            <div class="col-12 col-sm-6 mt-3 mt-sm-0">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
                
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <!-- Gender (Vue validation) -->
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

          <!-- Buttons -->
          <div class="text-center mt-3">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Submitted Users Table -->
    <div class="row mt-5" v-if="submittedCards.length">
      <h3 class="text-center mb-3">Submitted Users</h3>
      <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
        <Column field="username" header="Username"></Column>
        <Column field="password" header="Password"></Column>
        <Column field="gender" header="Gender"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const formData = ref({
  username: "",
  password: "",
  gender: ""
})

const submittedCards = ref([])
const errors = ref({
  password: null,
  gender: null
})

//  Password validation using vue 
const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = "Password must contain at least one uppercase letter."
  } else if (!hasLowercase) {
    if (blur) errors.value.password = "Password must contain at least one lowercase letter."
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number."
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = "Password must contain at least one special character."
  } else {
    errors.value.password = null
  }
}


//  Gender validation using vue
const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = "Please select your gender."
  } else {
    errors.value.gender = null
  }
}

const submitForm = () => {
  validatePassword()
  validateGender(true)

  if (!errors.value.password && !errors.value.gender) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: "",
    password: "",
    gender: ""
  }
  errors.value.password = null
  errors.value.gender = null
}
</script>