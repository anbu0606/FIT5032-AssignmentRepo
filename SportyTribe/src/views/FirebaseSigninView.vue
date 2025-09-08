<template>
  <h1>Sign in</h1>
  <p>
    <input type="text" placeholder="Email" v-model="email" />
  </p>
  <p>
    <input type="password" placeholder="Password" v-model="password" />
  </p>
  <p>
    <button @click="signin">Sign in via Firebase</button>
  </p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Sign-in Successful!", data)
      console.log("Current User:", auth.currentUser) // To check signed-in user
      router.push("/") // Redirect to homepage after login
    })
    .catch((error) => {
      console.log("Error:", error.code, error.message)
    })
}
</script>