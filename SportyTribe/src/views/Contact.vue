<template>
  <div class="container mt-5">
    <h1>Contact Us</h1>
    <form @submit.prevent="sendEmail" class="p-4 shadow rounded bg-white">
      <div class="mb-3">
        <label>Email <span class="text-danger">*</span></label>
        <input type="email" v-model="email" required class="form-control" />
      </div>

      <div class="mb-3">
        <label>Subject <span class="text-danger">*</span></label>
        <input type="text" v-model="subject" required class="form-control" />
      </div>

      <div class="mb-3">
        <label>Message <span class="text-danger">*</span></label>
        <textarea v-model="message" required class="form-control"></textarea>
      </div>

      <div class="mb-3">
        <label>Attach a file (optional)</label>
        <input type="file" @change="onFileChange" class="form-control" />
      </div>

      <button class="btn btn-success" type="submit" :disabled="loading">
        {{ loading ? "Sending..." : "Send Email" }}
      </button>

      <p v-if="statusMessage" class="mt-3" :class="statusClass">{{ statusMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"

const email = ref("")
const subject = ref("")
const message = ref("")
const file = ref(null)
const loading = ref(false)
const statusMessage = ref("")
const statusClass = ref("")
//  your deployed Cloud Run URL (from deploy log)
const functionURL = "https://sendemail-c5melirmcq-uc.a.run.app"

const onFileChange = (e) => {
  const selected = e.target.files[0]
  if (selected) file.value = selected
}

const sendEmail = async () => {
  loading.value = true
  statusMessage.value = ""
  try {
    let attachmentData = null

    if (file.value) {
      const base64 = await toBase64(file.value)
      attachmentData = {
        content: base64.split(",")[1],
        filename: file.value.name,
        type: file.value.type,
      }
    }

    const res = await fetch(functionURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email.value,
        subject: subject.value,
        text: message.value,
        attachment: attachmentData,
      }),
    })

    const data = await res.json()
    if (res.ok) {
      statusMessage.value = " " + data.message
      statusClass.value = "text-success"
    } else {
      statusMessage.value = " Failed: " + data.message
      statusClass.value = "text-danger"
    }
  } catch (err) {
    console.error("Email send failed:", err)
    statusMessage.value = " Error sending email."
    statusClass.value = "text-danger"
  } finally {
    loading.value = false
  }
}


const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
</script>


<style scoped>
form {
  max-width: 600px;
  margin: auto;
}
.text-danger {
  color: red;
}
.text-success {
  color: green;
}
</style>