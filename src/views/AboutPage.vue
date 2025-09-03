<!-- File: src/pages/AboutPage.vue -->
<template>
  <!-- HERO (nav kept inside this first section) -->
  <section id="hero" class="relative-position hero-header">
    <div class="hero-header-bg" :style="heroBgStyle" role="img" aria-label="Cafe interior hero image"></div>

    <div class="hero-toolbar container" role="navigation" aria-label="Primary">
      <q-toolbar class="q-px-none">
        <q-toolbar-title>
          <RouterLink to="/" class="brand row items-center no-wrap" aria-label="La Luna Moon Cafe Home">
            <img src="@/assets/images/l-logo-light.png" width="42" height="42" alt="La Luna Moon Cafe logo" />
            <span class="q-ml-sm text-weight-bold brand-title">La Luna Moon Cafe</span>
          </RouterLink>
        </q-toolbar-title>
        <q-tabs class="menu-items" shrink indicator-color="secondary" active-color="secondary">
          <q-route-tab to="/" label="Home" no-caps class="text-white tab-link" />
          <q-route-tab to="/menu" label="Menu" no-caps class="text-white tab-link" />
          <q-route-tab to="/about" label="About" no-caps class="text-white tab-link" />
          <q-route-tab to="/contact-us" label="Contact Us" no-caps class="text-white tab-link" />
        </q-tabs>
      </q-toolbar>
    </div>

    <div class="absolute-full flex flex-center">
      <div class="hero-header-content text-center text-white">
        <h1 class="text-h2 text-weight-bolder q-mb-xs q-mt-none leading-tight">About La Luna</h1>
        <div class="text-subtitle1 opacity-90">Know more about the cafe.</div>
      </div>
    </div>

    <svg class="hero-curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
    </svg>
  </section>

  <!-- MISSION / VALUES -->
  <section class="q-py-xl container">
    <div class="row q-col-gutter-xl items-start">
      <div class="col-12 col-md-7">
        <div class="text-overline">Purpose</div>
        <h2 class="text-h4 q-mb-sm">Our mission</h2>
        <p class="text-body1 text-grey-8">
          La Luna Moon Cafe is a moon-inspired sanctuary in Novaliches, QC—created so people can pause, breathe, and savor good coffee in a calm, heartwarming space.
        </p>

        <div class="row q-col-gutter-md q-mt-md">
          <div v-for="v in values" :key="v.title" class="col-12 col-sm-6">
            <q-card flat bordered class="q-pa-md value-card hover-lift">
              <q-avatar class="value-icon q-mb-sm" size="44px"><q-icon :name="v.icon" size="md" /></q-avatar>
              <div class="text-subtitle1 text-weight-bold">{{ v.title }}</div>
              <div class="text-body2 text-grey-7 q-mt-xs">{{ v.desc }}</div>
            </q-card>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-5">
        <q-card flat bordered class="q-pa-lg hover-lift">
          <div class="text-subtitle1 text-weight-bold">At a glance</div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-6" v-for="s in stats" :key="s.label">
              <div class="row no-wrap items-center q-gutter-sm">
                <q-avatar size="30px" class="stat-icon"><q-icon :name="s.icon" size="18px" /></q-avatar>
                <div>
                  <div class="text-h5 text-weight-bolder">{{ s.value }}</div>
                  <div class="text-caption text-grey-7">{{ s.label }}</div>
                </div>
              </div>
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="text-caption text-grey-7">* Opened July 14, 2025 • Moon-inspired design • Warm hospitality</div>
        </q-card>
      </div>
    </div>
  </section>

  <!-- QUOTE BLOCK -->
  <section class="q-py-md">
    <div class="container">
      <q-card flat bordered class="q-my-md">
        <q-card-section class="text-subtitle1 text-italic text-grey-8">
          “Under the moonlight, we brew more than coffee — we brew moments.”
        </q-card-section>
      </q-card>
    </div>
  </section>

  <!-- HOURS & LOCATION -->
  <section class="bg-grey-1 q-py-xl">
    <div class="container">
      <div class="text-center q-mb-lg">
        <div class="text-overline">Visit</div>
        <h2 class="text-h4">Hours & Location</h2>
        <div class="q-mt-sm">
          <q-badge :color="openNow ? 'green-6' : 'red-6'" text-color="white" class="q-px-md q-py-xs">
            {{ statusBadgeText }}
          </q-badge>
        </div>
      </div>

      <div class="row q-col-gutter-xl items-start">
        <div class="col-12 col-md-7">
          <q-markup-table flat bordered class="bg-white rounded-borders">
            <thead>
              <tr>
                <th class="text-left">Day</th>
                <th class="text-left">Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(h, idx) in weekRows" :key="idx" :class="{ 'bg-grey-2': idx === today }">
                <td class="text-weight-medium">
                  {{ dayLabels[idx] }}
                  <q-badge v-if="idx === today" color="primary" class="q-ml-xs">Today</q-badge>
                </td>
                <td class="text-left">
                  {{ formatRangeForDay(idx) }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <div class="col-12 col-md-5">
          <q-card flat bordered class="q-pa-md hover-lift">
            <div class="text-subtitle1 text-weight-bold">Address</div>
            <div class="text-body2 text-grey-8">[Unit, Building, Street], Novaliches, Quezon City</div>
            <div class="row items-center q-gutter-sm q-mt-sm">
              <q-btn outline color="primary" icon="pin_drop" no-caps label="Directions" :href="gmaps" target="_blank" rel="noopener" />
              <q-btn outline color="primary" icon="star" no-caps label="Leave a review" :href="greview" target="_blank" rel="noopener" />
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </section>

  <!-- STORY TIMELINE -->
  <section class="bg-grey-1 q-py-xl">
    <div class="container">
      <div class="text-center q-mb-lg">
        <div class="text-overline">Journey</div>
        <h2 class="text-h4">Our story</h2>
      </div>
      <q-timeline color="primary" layout="comfortable" side="right">
        <q-timeline-entry v-for="(e,i) in timeline" :key="i" :title="e.title" :subtitle="e.date" :icon="e.icon">
          <div class="text-body2 text-grey-8">{{ e.body }}</div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </section>

  <!-- ROASTING / PROCESS -->
  <section class="q-py-xl container">
    <div class="text-center q-mb-lg">
      <div class="text-overline">Craft</div>
      <h2 class="text-h4">How we roast</h2>
    </div>
    <div class="row q-col-gutter-lg process-grid">
      <div class="col-12 col-md-3" v-for="(p,i) in process" :key="i">
        <q-card flat bordered class="q-pa-md h-100 hover-lift process-card" :data-step="i + 1">
          <div class="step-badge">{{ i + 1 }}</div>
          <q-img :src="p.img" ratio="16/9" class="rounded-borders" :alt="p.title" loading="lazy" />
          <div class="text-subtitle1 text-weight-bold q-mt-sm">{{ p.title }}</div>
          <div class="text-body2 text-grey-7 q-mt-xs">{{ p.desc }}</div>
        </q-card>
      </div>
    </div>
  </section>

  <!-- TEAM GRID -->
  <section class="bg-grey-1 q-py-xl">
    <div class="container">
      <div class="text-center q-mb-lg">
        <div class="text-overline">People</div>
        <h2 class="text-h4">Meet the team</h2>
      </div>
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-sm-6 col-md-3" v-for="t in team" :key="t.name">
          <q-card flat bordered class="text-center q-pt-md hover-lift">
            <q-avatar size="88px" class="q-mx-auto q-mb-sm"><img :src="t.avatar" :alt="`${t.name} avatar`" loading="lazy" /></q-avatar>
            <div class="text-subtitle1 text-weight-bold">{{ t.name }}</div>
            <div class="text-caption text-grey-7">{{ t.role }}</div>
            <q-card-section class="text-body2 text-grey-8">{{ t.blurb }}</q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="bg-grey-1 q-py-xl">
    <div class="container">
      <div class="text-center q-mb-lg">
        <div class="text-overline">Good to know</div>
        <h2 class="text-h4">FAQ</h2>
      </div>
      <q-list bordered separator class="rounded-borders bg-white">
        <q-expansion-item v-for="(f,i) in faqs" :key="i" expand-separator :label="f.q" icon="help_outline">
          <q-card>
            <q-card-section class="text-body2 text-grey-8">{{ f.a }}</q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </section>

  <!-- CTA STRIP -->
  <section class="q-py-xl cta bg-dark text-white">
    <div class="container row items-center justify-between">
      <div>
        <div class="text-h5 q-mb-xs">Come say hello ☕</div>
        <div class="text-subtitle2 opacity-80">[Unit, Building, Street], [District, City] • Weekdays 11:00 AM – 10:00 PM • Fri–Sun 10:00 AM – 12:00 MN</div>
      </div>
      <div class="row q-gutter-sm">
        <q-btn color="primary" unelevated no-caps label="Order Now" icon="shopping_cart" />
        <q-btn outline color="white" no-caps label="Directions" icon="pin_drop" />
      </div>
    </div>
    <div class="cta-decor" aria-hidden="true"></div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useMeta } from 'quasar'

// images first
const heroImg = new URL('@/assets/images/home-hero.jpg', import.meta.url).href

// soft overlay + vignette for readability
const heroBgStyle = computed(() => ({
  backgroundImage: `linear-gradient(rgba(52,17,0,.55), rgba(52,17,0,.25)), url('${heroImg}')`
}))

// SEO meta
useMeta(() => ({
  title: 'About La Luna Moon Cafe — Moon-Inspired Coffee in Novaliches, QC',
  meta: {
    description: { name: 'description', content: 'La Luna Moon Cafe is a moon-inspired sanctuary in Novaliches, QC. Opened July 14, 2025 to offer calm coffee, warm light, and unhurried moments.' },
    ogTitle: { property: 'og:title', content: 'About La Luna Moon Cafe' },
    ogDescription: { property: 'og:description', content: 'A moon-lit haven for calm coffee and warm company in Novaliches, QC.' },
    ogType: { property: 'og:type', content: 'website' },
    ogImage: { property: 'og:image', content: '/og/la-luna-about.jpg' }
  }
}))

// ====== HOURS / SCHEDULE (Weekend vs Weekday) ======
const dayLabels = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const isWeekend = (d) => d === 0 || d === 5 || d === 6 // Sun, Fri, Sat

// 24h values for accurate computation; display uses formatRangeForDay()
const schedule = {
  0: ['10:00','24:00'], // Sun: 10:00 AM – 12:00 MN
  1: ['11:00','22:00'], // Mon: 11:00 AM – 10:00 PM
  2: ['11:00','22:00'], // Tue
  3: ['11:00','22:00'], // Wed
  4: ['11:00','22:00'], // Thu
  5: ['10:00','24:00'], // Fri
  6: ['10:00','24:00']  // Sat
}

const weekRows = [schedule[0], schedule[1], schedule[2], schedule[3], schedule[4], schedule[5], schedule[6]]
const today = new Date().getDay()

// Display string per day row
function formatRangeForDay(idx) {
  return isWeekend(idx) ? '10:00 AM – 12:00 MN' : '11:00 AM – 10:00 PM'
}

// Parse "HH:mm", handling 24:00 → next day 00:00
function toDateTime(hhmm, baseDate = new Date()) {
  const [h, m] = hhmm.split(':').map(Number)
  const d = new Date(baseDate)
  if (h === 24) { d.setDate(d.getDate() + 1); d.setHours(0, 0, 0, 0) }
  else { d.setHours(h, m, 0, 0) }
  return d
}

function nextOpenTime() {
  const now = new Date()
  for (let i = 0; i < 7; i++) {
    const day = (now.getDay() + i) % 7
    const hours = schedule[day]
    if (hours) {
      const d = new Date()
      d.setDate(now.getDate() + i)
      const [h, m] = hours[0].split(':').map(Number)
      d.setHours(h, m, 0, 0)
      return d
    }
  }
  return null
}

function todayBounds() {
  const now = new Date()
  const d = now.getDay()
  const hours = schedule[d]
  if (!hours) return { open: false, openAt: nextOpenTime() }
  const [openH, closeH] = hours
  const openDate = toDateTime(openH, now)
  const closeDate = toDateTime(closeH, now) // handles 24:00 → next day 00:00
  const open = now >= openDate && now <= closeDate
  return { open, openAt: openDate, closeAt: closeDate }
}

const bounds = computed(() => todayBounds())
const openNow = computed(() => bounds.value.open)
const nextOpen = computed(() =>
  bounds.value.openAt
    ? bounds.value.openAt.toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })
    : 'soon'
)
const todayCloseLabel = computed(() => (isWeekend(today) ? '12:00 MN' : '10:00 PM'))
const statusBadgeText = computed(() =>
  openNow.value ? `Open now — until ${todayCloseLabel.value}` : `Closed — opens ${nextOpen.value}`
)

// Values (moon-inspired)
const values = [
  { icon: 'nightlight_round', title: 'Calm & cozy', desc: 'Soft light, slow coffee, unhurried moments.' },
  { icon: 'local_cafe', title: 'Crafted with care', desc: 'Small-batch roasts and comforting flavors.' },
  { icon: 'diversity_3', title: 'Safe space', desc: 'Welcoming to dreamers, lovers, friends & families.' },
  { icon: 'auto_awesome', title: 'A touch of magic', desc: 'Starry accents and little delights in every visit.' }
]

// Stats (reflect 2025 opening)
const stats = [
  { value: '2025', label: 'Since', icon: 'calendar_month' },
  { value: 'Novaliches', label: 'Quezon City', icon: 'place' }
]

// Timeline (client story)
const timeline = [
  { date: 'Jan 2025', title: 'Dream under the stars', icon: 'nightlight', body: 'The idea forms: a moon-inspired sanctuary for calm coffee.' },
  { date: 'Mar 2025', title: 'Found our spot — Novaliches, QC', icon: 'place', body: 'A vacant space becomes the canvas for soft light and starry accents.' },
  { date: 'Apr–Jun 2025', title: 'Build, taste, refine', icon: 'construction', body: 'Endless taste tests and thoughtful design shape the moonlit haven.' },
  { date: 'Jul 14, 2025', title: 'Doors open', icon: 'storefront', body: 'La Luna Moon Cafe officially welcomes its first guests.' },
  { date: 'Aug 2025 →', title: 'A safe space for many', icon: 'diversity_3', body: 'Dreamers, freelancers, friends, and families make La Luna their own.' }
]

const process = [
  { title: 'Source', desc: 'Relationship coffees from trusted farms and importers.', img: 'https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Roast', desc: 'Small batches for sweetness, monitored by profile logs.', img: 'https://images.unsplash.com/photo-1503481766315-7a586b20f66b?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Brew', desc: 'Dialed-in espresso and hand brews for clarity and balance.', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Serve', desc: 'Welcoming space, thoughtful hospitality, and real smiles.', img: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop' }
]

const team = [
  { name: 'Alex Reyes', role: 'Head Roaster', avatar: 'https://i.pravatar.cc/160?img=11', blurb: 'Hunts for sweetness and balance in every roast curve.' },
  { name: 'Mika Tan', role: 'Pastry Lead', avatar: 'https://i.pravatar.cc/160?img=32', blurb: 'Bakes daily—flaky, buttery, and just-sweet-enough.' },
  { name: 'Ken Lim', role: 'Cafe Manager', avatar: 'https://i.pravatar.cc/160?img=22', blurb: 'Keeps the vibe warm and the service quick.' },
  { name: 'Jo Cruz', role: 'Barista Trainer', avatar: 'https://i.pravatar.cc/160?img=45', blurb: 'Dial-ins, latte art, and guest education.' }
]

const awards = [
  'Top 10 Cafés in [City] — 2023',
  'Food Hygiene: Grade A — 2024',
  'Local Business Community Award — 2022'
]

const press = ['City Eats', 'Daily Brew', 'Local Tribune', 'Neighborhood Mag']

const faqs = [
  { q: 'Do you take reservations?', a: 'Weekdays only, until 6 PM. Weekends are walk-in; join the waitlist on arrival.' },
  { q: 'Are you pet-friendly?', a: 'Yes, outdoor seats only. Water bowls available.' },
  { q: 'Do you have Wi-Fi and sockets?', a: 'Wi-Fi is available; sockets are limited. On weekends we set a 2-hour limit.' },
  { q: 'Allergens & dietary options?', a: 'Ask our team; nut-free and vegan options are labeled on the menu.' }
]

// Links (replace with real IDs)
const gmaps = 'https://maps.app.goo.gl/ChIJ-ymm_oCxlzMR8KM3wOzIkUA'
const greview = 'https://search.google.com/local/writereview?placeid=ChIJ-ymm_oCxlzMR8KM3wOzIkUA'
</script>
