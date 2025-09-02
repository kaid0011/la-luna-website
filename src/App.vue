<template>
  <!-- Footer is NOT sticky now -->
  <q-layout view="hHh lpr fff" class="bg-white">
    <!-- Header starts hidden at top; appears after you scroll past THRESHOLD -->
    <q-header
      :elevated="showHeader"
      class="bg-primary text-white header"
      :class="showHeader ? 'header--visible' : 'header--hidden'"
      height-hint="98"
    >
      <q-toolbar>
        <q-toolbar-title>
          <img src="@/assets/images/l-logo.png" width="100" />
          La Luna Moon Cafe
        </q-toolbar-title>
        <q-tabs>
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/menu" label="Menu" />
          <q-route-tab to="/about" label="About" />
          <q-route-tab to="/contact-us" label="Contact Us" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container class="body">
      <!-- Observe window scroll to toggle header -->
      <q-scroll-observer scroll-target="window" @scroll="onScroll" />
      <router-view />
    </q-page-container>

    <!-- Plain footer (no reveal) that appears AFTER page content -->
    <q-footer class="bg-primary text-white">
      <div class="container q-py-xl">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4">
            <div class="text-h6 text-weight-bold q-mb-sm">{{ brandName }}</div>
            <div>
              Small-batch roastery & all-day brunch. Making everyday coffee a
              little special.
            </div>
            <div class="q-mt-md">
              © {{ new Date().getFullYear() }} {{ brandName }} — All rights
              reserved.
            </div>
          </div>
          <div class="col-6 col-md-4">
            <div class="text-subtitle1 text-weight-bold q-mb-sm">Visit</div>
            <div>[Unit, Building, Street]</div>
            <div>[District, City]</div>
            <div class="q-mt-sm">Mon–Thu 7:00–21:00 • Fri–Sun 7:00–22:00</div>
          </div>
          <div class="col-6 col-md-4">
            <div class="text-subtitle1 text-weight-bold q-mb-sm">Links</div>
            <div class="column">
              <q-btn flat no-caps dense align="left" to="/menu" label="Menu" />
              <q-btn flat no-caps dense align="left" href="#catering" label="Catering" />
              <q-btn flat no-caps dense align="left" to="/about" label="About" />
              <!-- fixed path to match your router -->
              <q-btn flat no-caps dense align="left" to="/contact-us" label="Contact" />
              <q-btn flat no-caps dense align="left" label="Privacy" />
            </div>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const brandName = 'CafeName'

// Header visibility based on scroll position
const showHeader = ref(false)
const THRESHOLD = 80 // px from top before header appears

function onScroll ({ position }) {
  // position.top is window.scrollY
  showHeader.value = position.top > THRESHOLD
}

onMounted(() => {
  // Initialize state correctly on reload
  showHeader.value = window.pageYOffset > THRESHOLD
})
</script>

<style scoped>
/* Layout helpers */
.container { max-width: 1200px; margin: 0 auto; width: 100%; }

/* Header hide/show behavior */
.header {
  transition: transform .25s ease, opacity .25s ease, box-shadow .25s ease;
  will-change: transform, opacity;
}
.header--hidden {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}
.header--visible {
  transform: translateY(0);
  opacity: 1;
}
</style>
