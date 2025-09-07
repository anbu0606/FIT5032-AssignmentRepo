<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <h1 class="text-center">SportyTribe Login</h1>

        <form @submit.prevent="loginUser" class="p-4 shadow rounded bg-white">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              required
              v-model="formData.username"
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              required
              v-model="formData.password"
            />
          </div>

          <div v-if="error" class="text-danger small mb-2">
            {{ error }}
          </div>

          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Login</button>
            <router-link to="/register" class="btn btn-secondary">Register</router-link>
          </div>
        </form>

        <div v-if="isLoggedIn" class="alert alert-success text-center p-4 shadow rounded mt-3">
          Welcome back, {{ loggedInUser.username }}  <br />
          <router-link to="/home" class="btn btn-success mt-3">Go to Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const formData = ref({
  username: "",
  password: ""
})

const error = ref(null)
const isLoggedIn = ref(false)
const loggedInUser = ref(null)

// Login user with stored credentials
const loginUser = () => {
  const users = JSON.parse(localStorage.getItem("users")) || []

  const user = users.find(
    (u) =>
      u.username === formData.value.username &&
      u.password === formData.value.password
  )

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user))
    loggedInUser.value = user
    isLoggedIn.value = true
    error.value = null

    // Optionally redirect automatically:
    // router.push("/home")
  } else {
    error.value = "Invalid username or password"
    isLoggedIn.value = false
  }
}
</script>