<template>
  <!-- Footer is NOT sticky now -->
  <q-layout view="hHh lpr fff">
    <!-- Header mounts ONLY after threshold; no space is reserved when hidden -->
    <transition name="header-fade-slide">
      <q-header v-if="showHeader" class="header">
    <div class="hero-toolbar container scroll-toolbar" role="navigation" aria-label="Primary">
      <q-toolbar class="q-px-none">
        <q-toolbar-title>
          <RouterLink to="/" class="brand row items-center no-wrap" aria-label="La Luna Moon Cafe Home">
            <img src="@/assets/images/l-logo-light.png" width="42" height="42" alt="La Luna Moon Cafe logo" />
            <span class="q-ml-sm text-weight-bold brand-title">La Luna Moon Cafe</span>
          </RouterLink>
        </q-toolbar-title>

        <q-tabs class="menu-items" shrink indicator-color="secondary" active-color="secondary">
          <q-route-tab to="/" label="Home" no-caps class="text-white tab-link" aria-label="Home" />
          <q-route-tab to="/menu" label="Menu" no-caps class="text-white tab-link" aria-label="Menu" />
          <q-route-tab to="/about" label="About" no-caps class="text-white tab-link" aria-label="About" />
          <q-route-tab to="/contact-us" label="Contact Us" no-caps class="text-white tab-link" aria-label="Contact Us" />
        </q-tabs>
      </q-toolbar>
    </div>
      </q-header>
    </transition>

    <q-page-container class="body">
      <!-- Observe window scroll to toggle header -->
      <q-page>
        <q-scroll-observer scroll-target="window" @scroll="onScroll" />
        <router-view />
            <q-page-sticky expand position="bottom-right" :offset="[18, 18]">
    <q-btn round color="primary" icon="arrow_upward" @click="scrollTop" />
  </q-page-sticky>
      </q-page>
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
              <q-btn
                flat
                no-caps
                dense
                align="left"
                href="#catering"
                label="Catering"
              />
              <q-btn
                flat
                no-caps
                dense
                align="left"
                to="/about"
                label="About"
              />
              <q-btn
                flat
                no-caps
                dense
                align="left"
                to="/contact-us"
                label="Contact"
              />
              <q-btn flat no-caps dense align="left" label="Privacy" />
            </div>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";

const brandName = "CafeName";

// Header visibility based on scroll position
const showHeader = ref(false);
const THRESHOLD = 80; // px from top before header appears

function onScroll({ position }) {
  showHeader.value = position.top > THRESHOLD;
}

onMounted(() => {
  // Initialize state correctly on reload
  showHeader.value = window.pageYOffset > THRESHOLD;
});

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>