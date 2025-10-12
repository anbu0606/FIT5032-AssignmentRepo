<template>
  <main class="container py-4" role="main">
    <h1 id="eventsHeading">Nearby Events</h1>
    <p class="text-muted">Explore events happening near your location.</p>

    <div class="controls mb-3">
      <label for="radiusSelect" class="me-2"><strong>Show events within:</strong></label>
      <select id="radiusSelect" v-model="radius" class="form-select d-inline-block w-auto" aria-describedby="radiusHelp">
        <option :value="25">25 km</option>
        <option :value="50">50 km</option>
        <option :value="100">100 km</option>
        <option :value="200">200 km</option>
        <option :value="0">All</option>
      </select>
       <small id="radiusHelp" class="text-muted ms-2">Select a distance range</small>
    </div>
     <p aria-live="polite" class="visually-hidden">
      {{ accessibleMessage }}
    </p>

    <div id="map" class="map" role="application" aria-label="Interactive map showing nearby sporting events. Use tab and arrow keys to navigate."></div>
   <noscript>
      <p>Map not available. Please enable JavaScript to view nearby events.</p>
    </noscript>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import L from "leaflet"
import eventsData from "../assets/json/programdetails.json"

const map = ref(null)
const userLatLng = ref(null)
const userMarker = ref(null)
const routeLayer = ref(null)
const eventMarkers = ref([])
const radius = ref(50)

onMounted(() => {
  // init map
  map.value = L.map("map").setView([-25.2744, 133.7751], 5)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    
  }).addTo(map.value)

  // get user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userLatLng.value = [pos.coords.latitude, pos.coords.longitude]
        userMarker.value = L.marker(userLatLng.value, {
          title: "You are here",
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
            iconSize: [40, 40],
          }),
        })
          .addTo(map.value)
          .bindPopup("📍 You are here")
          .openPopup()
        map.value.setView(userLatLng.value, 8)
        updateMarkers()
      },
      () => updateMarkers() // if denied, just show all events
    )
  } else updateMarkers()
})

// watch radius change
watch(radius, () => updateMarkers())

function updateMarkers() {
  // clear existing markers
  eventMarkers.value.forEach(m => map.value.removeLayer(m))
  eventMarkers.value = []

  eventsData.forEach((event) => {
    const eventLatLng = [event.lat, event.lng]
    let withinRadius = true

    if (userLatLng.value && radius.value > 0) {
      const d = getDistance(userLatLng.value, eventLatLng)
      withinRadius = d <= radius.value
    }

    if (withinRadius) {
      const marker = L.marker(eventLatLng, {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [35, 35],
        }),
      })
        .addTo(map.value)
        .bindPopup(
          `<b>${event.name}</b><br>${event.location}<br>${event.date}<br><button id="route-${event.id}" class="route-btn">Get Directions</button>`
        )

      marker.on("popupopen", () => {
        const btn = document.getElementById(`route-${event.id}`)
        if (btn && userLatLng.value) btn.addEventListener("click", () => showRoute(userLatLng.value, eventLatLng))
        else if (!userLatLng.value) alert("Enable location access to view directions.")
      })

      eventMarkers.value.push(marker)
    }
  })
}

function showRoute(start, end) {
  if (routeLayer.value) map.value.removeLayer(routeLayer.value)
  routeLayer.value = L.polyline([start, end], { color: "blue", weight: 4 }).addTo(map.value)
  map.value.fitBounds([start, end], { padding: [50, 50] })
}

// simple haversine distance (km)
function getDistance([lat1, lon1], [lat2, lon2]) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}
</script>

<style scoped>
.map {
  height: 500px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.legend {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
}
.route-btn:focus,
select:focus {
  outline: 3px solid #ffeb3b;
  outline-offset: 3px;
}
.route-btn {
  margin-top: 6px;
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
}
.route-btn:hover {
  background: #0056b3;
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
</style>