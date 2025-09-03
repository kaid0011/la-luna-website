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
        <q-tabs class="menu-items" shrink indicator-color="secondary" active-color="primary">
          <q-route-tab to="/" label="Home" no-caps class="text-white tab-link" />
          <q-route-tab to="/menu" label="Menu" no-caps class="text-white tab-link" />
          <q-route-tab to="/about" label="About" no-caps class="text-white tab-link" />
          <q-route-tab to="/contact-us" label="Contact Us" no-caps class="text-white tab-link" />
        </q-tabs>
      </q-toolbar>
    </div>

    <div class="absolute-full flex flex-center">
      <div class="hero-header-content text-center text-white">
        <h1 class="text-h2 text-weight-bolder q-mb-xs q-mt-none leading-tight">Contact Us</h1>
        <div class="text-subtitle1 opacity-90">Questions, bookings, or feedback.</div>
      </div>
    </div>

    <svg class="hero-curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
    </svg>
  </section>

  <!-- CONTENT -->
  <section class="q-py-xl container">
    <div class="row q-col-gutter-xl">
      <!-- FORM -->
      <div class="col-12 col-md-7">
        <q-card flat bordered class="q-pa-lg hover-lift contact-card">
          <div class="text-h6 text-weight-bold q-mb-md">Send us a message</div>
          <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-md">
            <q-input v-model="form.name" label="Full name" outlined dense class="col-12 col-sm-6" :rules="[req]">
              <template #prepend><q-icon name="person" /></template>
            </q-input>
            <q-input v-model="form.email" label="Email" type="email" outlined dense class="col-12 col-sm-6" :rules="[req, emailRule]">
              <template #prepend><q-icon name="mail" /></template>
            </q-input>
            <q-input v-model="form.phone" label="Phone (optional)" type="tel" outlined dense class="col-12 col-sm-6">
              <template #prepend><q-icon name="call" /></template>
            </q-input>
            <q-select v-model="form.topic" :options="topics" label="Topic" outlined dense emit-value map-options class="col-12 col-sm-6" :rules="[req]">
              <template #prepend><q-icon name="chat_bubble_outline" /></template>
            </q-select>
            <q-input v-model="form.message" label="Message" type="textarea" outlined :autogrow="true" class="col-12" :rules="[req, msgLen]">
              <template #prepend><q-icon name="edit" /></template>
            </q-input>

            <div class="col-12 row items-center">
              <q-checkbox v-model="form.consent" :rules="[v=>v||'Please accept.']" color="secondary" />
              <div class="q-ml-sm text-caption">I agree to the <RouterLink to="/privacy" class="text-secondary">privacy policy</RouterLink>.</div>
            </div>

            <div class="col-12 row q-gutter-sm q-mt-sm">
              <q-btn type="submit" color="primary" unelevated no-caps label="Send" :loading="sending" icon="send" />
              <q-btn type="reset" flat color="primary" no-caps label="Reset" />
            </div>
          </q-form>
        </q-card>

        <q-banner v-if="sent" class="q-mt-md bg-positive text-white rounded-borders">
          Thanks! We've received your message and will reply within 24 hours.
        </q-banner>
      </div>

      <!-- DETAILS / MAP -->
      <div class="col-12 col-md-5">
        <q-card flat bordered class="q-pa-lg q-mb-lg hover-lift">
          <div class="text-subtitle1 text-weight-bold">Get in touch</div>
          <q-list class="contact-list q-mt-sm">
            <q-item clickable tag="a" :href="`tel:${active.phone}`">
              <q-item-section avatar><q-icon name="call" /></q-item-section>
              <q-item-section>
                <q-item-label>Call</q-item-label>
                <q-item-label caption>{{ active.phone }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" :href="waHref" target="_blank">
              <q-item-section avatar><q-icon name="whatsapp" /></q-item-section>
              <q-item-section>
                <q-item-label>WhatsApp</q-item-label>
                <q-item-label caption>{{ active.whatsApp }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" :href="`mailto:${active.email}`">
              <q-item-section avatar><q-icon name="mail" /></q-item-section>
              <q-item-section>
                <q-item-label>Email</q-item-label>
                <q-item-label caption>{{ active.email }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div class="row q-gutter-sm q-mt-md">
            <q-btn outline color="primary" icon="call" no-caps :href="`tel:${active.phone}`" label="Call" />
            <q-btn outline color="primary" icon="whatsapp" no-caps :href="waHref" target="_blank" label="WhatsApp" />
            <q-btn color="primary" unelevated no-caps icon="near_me" :href="active.maps" target="_blank" label="Directions" />
          </div>
        </q-card>

        <q-card flat bordered class="q-pa-lg hover-lift">
          <div class="row items-center justify-between">
            <div class="text-subtitle1 text-weight-bold">Visit us</div>
            <q-select v-model="locKey" :options="locationOptions" dense outlined style="min-width: 200px"/>
          </div>
          <div class="q-mt-sm">
            <div class="text-body1 text-weight-bold">{{ active.name }}</div>
            <div class="text-body2 text-grey-8">{{ active.address }}</div>
            <div class="text-caption q-mt-xs">Hours: {{ active.hours }}</div>
          </div>
          <div class="q-mt-md rounded-borders overflow-hidden map-wrap">
            <iframe
              :src="active.mapEmbed"
              width="100%"
              height="260"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Map"
            ></iframe>
          </div>
        </q-card>
      </div>
    </div>
  </section>

  <!-- FAQ STRIP -->
  <section class="bg-grey-1 q-py-xl">
    <div class="container">
      <div class="text-center q-mb-lg">
        <div class="text-overline">Good to know</div>
        <h2 class="text-h4">Quick answers</h2>
      </div>
      <q-list bordered separator class="rounded-borders bg-white">
        <q-expansion-item v-for="(f,i) in faqs" :key="i" expand-separator :label="f.q" icon="help_outline">
          <q-card><q-card-section class="text-body2 text-grey-8">{{ f.a }}</q-card-section></q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const heroImg = new URL('@/assets/images/home-hero.jpg', import.meta.url).href
const heroBgStyle = computed(() => ({ backgroundImage: `linear-gradient(rgba(52,17,0,.55), rgba(52,17,0,.25)), url('${heroImg}')` }))

// --- Form state ---
const form = reactive({ name: '', email: '', phone: '', topic: 'general', message: '', consent: false })
const topics = [
  { label: 'General inquiry', value: 'general' },
  { label: 'Catering', value: 'catering' },
  { label: 'Reservation', value: 'reservation' },
  { label: 'Feedback', value: 'feedback' },
  { label: 'Careers', value: 'careers' }
]
const sending = ref(false)
const sent = ref(false)
function req (v){ return !!v || 'Required' }
function emailRule (v){ return (v && v.includes('@') && v.includes('.')) || 'Invalid email' }
function msgLen (v){ return (v && v.length >= 10) || 'Min 10 characters' }
async function onSubmit(){ sending.value = true; const payload = { ...form, timestamp: new Date().toISOString() }; console.log('Contact payload', payload); await new Promise(r => setTimeout(r, 800)); sent.value = true; sending.value = false }
function onReset(){ Object.assign(form, { name: '', email: '', phone: '', topic: 'general', message: '', consent: false }); sent.value = false }

// --- Locations (Novaliches primary) ---
const locations = {
  main: {
    key: 'main',
    name: 'Main Cafe — Novaliches',
    phone: '(02) 1234 5678',
    whatsApp: '+63 900 123 4567',
    email: 'lalunamooncafe@gmail.com',
    address: '223 C Gold, Quezon City, Philippines, 1124',
    hours: 'Mon–Thu 7:00–21:00 • Fri–Sun 7:00–22:00',
    maps: 'https://maps.google.com/?q=Novaliches,QC',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.827128047782!2d121.03408310948221!3d14.722363685719275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b180fea629fb%3A0x4091c8ecc037a3f0!2sLa%20Luna%20Moon%20Cafe!5e0!3m2!1sen!2sph!4v1756787238122!5m2!1sen!2sph'
  },
  branch: {
    key: 'branch',
    name: 'Branch — Novaliches',
    phone: '(02) 1234 5678',
    whatsApp: '+63 900 123 4567',
    email: 'lalunamooncafe@gmail.com',
    address: '223 C Gold, Quezon City, Philippines, 1124',
    hours: 'Mon–Thu 7:00–21:00 • Fri–Sun 7:00–22:00',
    maps: 'https://maps.google.com/?q=Novaliches,QC',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.827128047782!2d121.03408310948221!3d14.722363685719275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b180fea629fb%3A0x4091c8ecc037a3f0!2sLa%20Luna%20Moon%20Cafe!5e0!3m2!1sen!2sph!4v1756787238122!5m2!1sen!2sph'
  }
}

const locKey = ref('main')
const locationOptions = [
  { label: 'Main Cafe — Novaliches', value: 'main' },
  { label: 'Branch — Novaliches', value: 'branch' }
]
const active = computed(() => locations[locKey.value])
const waHref = computed(() => { const digits = active.value.whatsApp.split('').filter(c => c >= '0' && c <= '9').join(''); const msg = encodeURIComponent('Hi! I have a question about ' + form.topic); return `https://wa.me/${digits}?text=${msg}` })

const faqs = [
  { q: 'Do you take reservations?', a: 'Weekdays only, until 6 PM. Weekends are walk-in; join the waitlist on arrival.' },
  { q: 'Delivery area?', a: 'Within 3 km via GrabFood / Foodpanda; pickup available from 7 AM.' },
  { q: 'Allergens & dietary options?', a: 'Ask our team; nut-free and vegan options are labeled on the menu.' },
  { q: 'Pet-friendly?', a: 'Yes, outdoor seating only. Water bowls available.' }
]
</script>
