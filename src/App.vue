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
    <div class="row q-col-gutter-lg items-start">
      <!-- Brand / blurb -->
      <div class="col-12 col-md-4">
        <div class="text-h6 text-weight-bold q-mb-sm">{{ brandName }}</div>
        <div>Small-batch roastery & all-day brunch. Making everyday coffee a little special.</div>

        <!-- Socials -->
        <div class="row q-gutter-sm q-mt-md" aria-label="Social links">
          <q-btn round size="sm" class="bg-white text-primary" :href="socials.fb" target="_blank" rel="noopener" icon="fa-brands fa-facebook" aria-label="Facebook" />
          <q-btn round size="sm" class="bg-white text-primary" :href="socials.ig" target="_blank" rel="noopener" icon="fa-brands fa-instagram" aria-label="Instagram" />
          <q-btn round size="sm" class="bg-white text-primary" :href="socials.tt" target="_blank" rel="noopener" icon="fa-brands fa-tiktok" aria-label="TikTok" />
          <q-btn round size="sm" class="bg-white text-primary" :href="socials.gmaps" target="_blank" rel="noopener" icon="fa-solid fa-location-dot" aria-label="Google Maps" />
        </div>

        <div class="q-mt-md">
          © {{ new Date().getFullYear() }} {{ brandName }} — All rights reserved.
        </div>
      </div>

      <!-- Visit / hours -->
      <div class="col-6 col-md-4">
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Visit</div>
        <div>Millionaire's Village, 223 C Gold,</div>
        <div>Novaliches, Quezon City</div>

        <div class="q-mt-sm">
          <q-badge :color="openNow ? 'green-6' : 'red-6'" text-color="white" class="q-px-sm q-py-xs">
            {{ openNow ? `Open now — until ${todayCloseLabel}` : `Closed — opens ${nextOpen}` }}
          </q-badge>
        </div>
        <div class="q-mt-xs">Hours today: {{ todayHoursText }}</div>

        <div class="row q-gutter-sm q-mt-sm">
          <q-btn outline color="white" no-caps icon="pin_drop" label="Directions" :href="socials.gmaps" target="_blank" rel="noopener" />
          <q-btn outline color="white" no-caps icon="star" label="Reviews" :href="socials.greview" target="_blank" rel="noopener" />
        </div>
      </div>

      <!-- Quick links -->
      <div class="col-6 col-md-4">
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Links</div>
        <div class="column">
          <q-btn flat no-caps dense align="left" to="/menu" label="Menu" />
          <q-btn flat no-caps dense align="left" to="/about" label="About" />
          <q-btn flat no-caps dense align="left" to="/contact-us" label="Contact" />
          <q-btn flat no-caps dense align="left" :to="{ path: '/', hash: '#workstudy' }" label="Work & Study (House rules)" />
          <q-separator dark class="q-my-sm" />
          <q-btn flat no-caps dense align="left" to="/privacy" label="Privacy" />
          <q-btn flat no-caps dense align="left" to="/terms" label="Terms" />
        </div>
      </div>
    </div>

    <q-separator dark class="q-my-md" />

    <div class="row items-center justify-between">
      <div class="text-caption">Made with ☕ & 🌙 vibes</div>
      <div class="row q-gutter-xs">
        <q-icon name="wifi" size="xs" /> <div class="text-caption q-ml-xs">Fast Wi-Fi</div>
        <q-icon name="bolt" size="xs" class="q-ml-md" /> <div class="text-caption q-ml-xs">Power outlets</div>
      </div>
    </div>
  </div>
</q-footer>

  </q-layout>
</template>
<script setup>
import { ref, onMounted, computed } from "vue"; // ✅ add computed

const brandName = "La Luna Moon Cafe"; // ✅ update name

// Footer socials (replace with real links)
const socials = {
  fb: "https://facebook.com/LaLunaMoonCafe",
  ig: "https://instagram.com/lalunamooncafe",
  tt: "https://tiktok.com/@lalunamooncafe",
  gmaps: "https://maps.app.goo.gl/ChIJ-ymm_oCxlzMR8KM3wOzIkUA",
  greview: "https://search.google.com/local/writereview?placeid=ChIJ-ymm_oCxlzMR8KM3wOzIkUA",
};

// ===== Hours logic (Weekdays 11–22, Fri–Sun 10–24) =====
const isWeekend = (d) => d === 0 || d === 5 || d === 6; // Sun, Fri, Sat
const schedule = {
  0: ["10:00", "24:00"], // Sun 10:00–24:00 (12 MN)
  1: ["11:00", "22:00"], // Mon 11:00–22:00
  2: ["11:00", "22:00"], // Tue
  3: ["11:00", "22:00"], // Wed
  4: ["11:00", "22:00"], // Thu
  5: ["10:00", "24:00"], // Fri 10:00–24:00
  6: ["10:00", "24:00"], // Sat
};

function toDateTime(hhmm, baseDate = new Date()) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(baseDate);
  if (h === 24) { d.setDate(d.getDate() + 1); d.setHours(0, 0, 0, 0); }
  else { d.setHours(h, m, 0, 0); }
  return d;
}

function nextOpenTime() {
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const day = (now.getDay() + i) % 7;
    const hours = schedule[day];
    if (hours) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      const [h, m] = hours[0].split(":").map(Number);
      d.setHours(h, m, 0, 0);
      return d;
    }
  }
  return null;
}

function todayBounds() {
  const now = new Date();
  const d = now.getDay();
  const hours = schedule[d];
  if (!hours) return { open: false, openAt: nextOpenTime() };
  const [openH, closeH] = hours;
  const openDate = toDateTime(openH, now);
  const closeDate = toDateTime(closeH, now); // handles 24:00 → next day 00:00
  const open = now >= openDate && now <= closeDate;
  return { open, openAt: openDate, closeAt: closeDate };
}

const bounds = computed(() => todayBounds());
const openNow = computed(() => bounds.value.open);
const nextOpen = computed(() =>
  bounds.value.openAt
    ? bounds.value.openAt.toLocaleString([], { weekday: "short", hour: "2-digit", minute: "2-digit" })
    : "soon"
);
const todayCloseLabel = computed(() => (isWeekend(new Date().getDay()) ? "12:00 MN" : "10:00 PM"));
// Human-friendly line you can reuse anywhere in the app:
const todayHoursText = computed(() => (isWeekend(new Date().getDay()) ? "10:00 AM – 12:00 MN" : "11:00 AM – 10:00 PM"));

// ===== existing header logic (unchanged) =====
const showHeader = ref(false);
const THRESHOLD = 80;
function onScroll({ position }) { showHeader.value = position.top > THRESHOLD; }
onMounted(() => { showHeader.value = window.pageYOffset > THRESHOLD; });
function scrollTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }
</script>
