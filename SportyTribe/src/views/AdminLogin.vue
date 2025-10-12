<template>
  <main class="container-fluid mt-5" role="main">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <h1 class="text-center"> Admin Login</h1>
        <form @submit.prevent="signin" class="p-4 shadow rounded bg-white">
          <p class="text-muted small">Fields marked with <span class="required">*</span> are mandatory.</p>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              required
              aria-required="true"
              v-model="email"
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password <span class="required">*</span></label>
            <input
              type="password"
              class="form-control"
              id="password"
              required
              aria-required="true"
              v-model="password"
            />
          </div>

          <div v-if="error" class="text-danger small mb-2" aria-live="assertive">
            {{ error }}
          </div>

          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Login</button>
            <router-link to="/adminreg" class="btn btn-secondary">Register</router-link>
          </div>
        </form>

        <div v-if="isLoggedIn" class="alert alert-success text-center p-4 shadow rounded mt-3" role="status"
     aria-live="polite">
          Welcome back, {{ loggedInUser?.email }} <br />
          <router-link to="/home" class="btn btn-success mt-3" aria-label="Continue to homepage">Continue!</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { auth } from "@/firebase/init"
import { signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"

const router = useRouter()
const db = getFirestore()

const email = ref("")
const password = ref("")

const error = ref(null)
const isLoggedIn = ref(false)
const loggedInUser = ref(null)

const signin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    const docrerference = doc(db, "users", user.uid)
    const documentSnap = await getDoc(docrerference)

    if (documentSnap.exists()) {
      loggedInUser.value = documentSnap.data()
      isLoggedIn.value = true
      error.value = null

  
      console.log("User profile:", loggedInUser.value)
    } else {
      error.value = "User profile not found in database."
    }
  } catch (err) {
    error.value = "Invalid email or password."
    isLoggedIn.value = false
    console.error("Login error:", err.code, err.message)
  }
}
</script>

<style>
.form-control + .text-danger {
  min-height: 20px;
  display: block;
}

.required {
  color: #b30000; 
  margin-left: 2px;
}

button:focus, input:focus, .btn:focus, a:focus {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}

</style>