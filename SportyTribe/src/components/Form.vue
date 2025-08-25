<template>
  <div class="container mt-5">
    <h2>Register for SportyTribe!</h2>
    <form @submit.prevent="handleSubmit" novalidate>
      
      <!-- Name -->
      <div class="mb-3">
        <label class="form-label">Full Name</label>
        <input type="text" v-model="form.name" class="form-control" required />
        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" v-model="form.email" class="form-control" required />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>

      <!-- Password -->
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" v-model="form.password" class="form-control" minlength="6" required />
        <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
      </div>

      <button class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { name: '', email: '', password: '' },
      errors: {}
    }
  },
  methods: {
    handleSubmit() {
      this.errors = {};
      // Name required
      if (!this.form.name) this.errors.name = "Name is required";
      // Email format
      const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
      if (!this.form.email) this.errors.email = "Email is required";
      else if (!emailPattern.test(this.form.email)) this.errors.email = "Invalid email format";
      // Password min length
      if (!this.form.password) this.errors.password = "Password is required";
      else if (this.form.password.length < 6) this.errors.password = "Password must be at least 6 characters";

      if (Object.keys(this.errors).length === 0) {
        alert("Form submitted successfully!");
      }
    }
  }
}
</script>




