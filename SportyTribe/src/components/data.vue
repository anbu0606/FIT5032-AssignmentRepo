<template>
  <div class="container mt-5">
    <h2>Upcoming Community Events</h2>
    <ul class="list-group">
      <li class="list-group-item" v-for="event in events" :key="event.id">
        <strong>{{ event.name }}</strong> - {{ event.date }} ({{ event.location }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: []
    }
  },
  mounted() {
    
    // Check if events exist in localStorage
    const stored = localStorage.getItem("events");
    if (stored) {
      this.events = JSON.parse(stored);
    } else {
      // Mock JSON data
      this.events = [
        { id: 1, name: "Community Football Match", date: "2025-09-10", location: "Melbourne Park" },
        { id: 2, name: "Netball Workshop", date: "2025-09-15", location: "Dandenong Stadium" },
        { id: 3, name: "Inclusive Cricket Meetup", date: "2025-09-20", location: "Carlton Oval" }
      ];
      localStorage.setItem("events", JSON.stringify(this.events));
    }
  }
}
</script>
