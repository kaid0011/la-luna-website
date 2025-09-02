<template>
  <q-page class="q-pa-none">
    <!-- HERO -->
    <section class="relative-position">
      <q-img :src="heroImg" class="hero-bg">
        <div class="absolute-full bg-black" style="opacity:.35"></div>
        <div class="absolute-center text-center text-white q-pa-xl container">
          <div class="text-overline">Contact</div>
          <h1 class="text-h2 text-weight-bolder q-mt-xs">We'd love to hear from you</h1>
          <div class="text-subtitle1 opacity-90 q-mt-sm">Questions, catering, feedback, or just saying hi.</div>
        </div>
      </q-img>
    </section>

    <!-- CONTENT -->
    <section class="q-py-xl container">
      <div class="row q-col-gutter-xl">
        <!-- FORM -->
        <div class="col-12 col-md-7">
          <q-card flat bordered class="q-pa-lg">
            <div class="text-h6 text-weight-bold q-mb-md">Send us a message</div>
            <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-md">
              <q-input v-model="form.name" label="Full name" outlined dense class="col-12 col-sm-6" :rules="[req]" />
              <q-input v-model="form.email" label="Email" type="email" outlined dense class="col-12 col-sm-6" :rules="[req, emailRule]" />
              <q-input v-model="form.phone" label="Phone (optional)" type="tel" outlined dense class="col-12 col-sm-6" />
              <q-select v-model="form.topic" :options="topics" label="Topic" outlined dense emit-value map-options class="col-12 col-sm-6" :rules="[req]" />
              <q-input v-model="form.message" label="Message" type="textarea" outlined :autogrow="true" class="col-12" :rules="[req, msgLen]" />
              <div class="col-12 row items-center">
                <q-checkbox v-model="form.consent" :rules="[v=>v||'Please accept.']" />
                <div class="q-ml-sm text-caption">I agree to the <a href="#" class="text-primary">privacy policy</a>.</div>
              </div>
              
              <!-- Optional: add reCAPTCHA here -->
              
              <div class="col-12 row q-gutter-sm q-mt-sm">
                <q-btn type="submit" color="primary" unelevated no-caps label="Send" :loading="sending" />
                <q-btn type="reset" flat color="primary" no-caps label="Reset" />
              </div>
            </q-form>
          </q-card>

          <q-banner v-if="sent" class="q-mt-md bg-positive text-white">
            Thanks! We've received your message and will reply within 24 hours.
          </q-banner>
        </div>

        <!-- DETAILS / MAP -->
        <div class="col-12 col-md-5">
          <q-card flat bordered class="q-pa-lg q-mb-lg">
            <div class="text-subtitle1 text-weight-bold">Get in touch</div>
            <div class="q-mt-sm">
              <div class="text-body1">Call: <a :href="`tel:${active.phone}`">{{ active.phone }}</a></div>
              <div class="text-body1">WhatsApp: <a :href="waHref" target="_blank">{{ active.whatsApp }}</a></div>
              <div class="text-body1">Email: <a :href="`mailto:${active.email}`">{{ active.email }}</a></div>
            </div>
            <div class="row q-gutter-sm q-mt-md">
              <q-btn outline color="primary" icon="call" no-caps :href="`tel:${active.phone}`" label="Call" />
              <q-btn outline color="primary" icon="whatsapp" no-caps :href="waHref" target="_blank" label="WhatsApp" />
              <q-btn color="primary" unelevated no-caps icon="near_me" :href="active.maps" target="_blank" label="Directions" />
            </div>
          </q-card>

          <q-card flat bordered class="q-pa-lg">
            <div class="row items-center justify-between">
              <div class="text-subtitle1 text-weight-bold">Visit us</div>
              <q-select v-model="locKey" :options="locationOptions" dense outlined style="min-width: 180px"/>
            </div>
            <div class="q-mt-sm">
              <div class="text-body1 text-weight-bold">{{ active.name }}</div>
              <div class="text-body2 text-grey-8">{{ active.address }}</div>
              <div class="text-caption q-mt-xs">Hours: {{ active.hours }}</div>
            </div>
            <div class="q-mt-md rounded-borders overflow-hidden">
              <iframe
                :src="active.mapEmbed"
                width="100%"
                height="260"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
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
          <q-expansion-item v-for="(f,i) in faqs" :key="i" expand-separator :label="f.q">
            <q-card><q-card-section class="text-body2 text-grey-8">{{ f.a }}</q-card-section></q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const heroImg = 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1600&auto=format&fit=crop'

// --- Form state ---
const form = reactive({
  name: '',
  email: '',
  phone: '',
  topic: 'general',
  message: '',
  consent: false
})
const topics = [
  { label: 'General inquiry', value: 'general' },
  { label: 'Catering', value: 'catering' },
  { label: 'Reservation', value: 'reservation' },
  { label: 'Feedback', value: 'feedback' },
  { label: 'Careers', value: 'careers' }
]
const sending = ref(false)
const sent = ref(false)

function req (v) { return !!v || 'Required' }
function emailRule (v) { return (v && v.includes('@') && v.includes('.')) || 'Invalid email' }
function msgLen (v) { return (v && v.length >= 10) || 'Min 10 characters' }

async function onSubmit () {
  sending.value = true
  // TODO: integrate with your backend / Supabase / email service
  // Example payload
  const payload = { ...form, timestamp: new Date().toISOString() }
  console.log('Contact payload', payload)
  await new Promise(r => setTimeout(r, 800))
  sent.value = true
  sending.value = false
}

function onReset () {
  Object.assign(form, { name: '', email: '', phone: '', topic: 'general', message: '', consent: false })
  sent.value = false
}

// --- Locations ---
const locations = {
  main: {
    key: 'main',
    name: 'Main Cafe — Downtown',
    phone: '(02) 1234 5678',
    whatsApp: '+63 900 123 4567',
    email: 'hello@cafename.com',
    address: 'Unit 1, Building, Street, District, City',
    hours: 'Mon–Thu 7:00–21:00 • Fri–Sun 7:00–22:00',
    maps: 'https://maps.google.com/?q=Downtown',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.827128047782!2d121.03408310948221!3d14.722363685719275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b180fea629fb%3A0x4091c8ecc037a3f0!2sLa%20Luna%20Moon%20Cafe!5e0!3m2!1sen!2sph!4v1756787238122!5m2!1sen!2sph'
  },
  branch: {
    key: 'branch',
    name: 'Branch — Riverside',
    phone: '(02) 2233 4455',
    whatsApp: '+63 900 765 4321',
    email: 'riverside@cafename.com',
    address: 'Unit 8, Riverside Plaza, City',
    hours: 'Daily 8:00–20:00',
    maps: 'https://maps.google.com/?q=Riverside',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509428!2d144.95373531531652!3d-37.81627974202173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAwLjYiUyAxNDTCsDU3JzE0LjQiRQ!5e0!3m2!1sen!2sph!4v1680000000001'
  }
}

const locKey = ref('main')
const locationOptions = [ { label: 'Main Cafe — Downtown', value: 'main' }, { label: 'Branch — Riverside', value: 'branch' } ]
const active = computed(() => locations[locKey.value])
const waHref = computed(() => {
  const digits = active.value.whatsApp.split('').filter(c => c >= '0' && c <= '9').join('')
  const msg = encodeURIComponent('Hi! I have a question about ' + form.topic)
  return `https://wa.me/${digits}?text=${msg}`
})

// FAQ
const faqs = [
  { q: 'Do you take reservations?', a: 'Weekdays only, until 6 PM. Weekends are walk-in; join the waitlist on arrival.' },
  { q: 'Delivery area?', a: 'Within 3 km via GrabFood / Foodpanda; pickup available from 7 AM.' },
  { q: 'Allergens & dietary options?', a: 'Ask our team; nut-free and vegan options are labeled on the menu.' },
  { q: 'Pet-friendly?', a: 'Yes, outdoor seating only. Water bowls available.' }
]
</script>

<style scoped>
.container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
.hero-bg { height: 48vh; }
.rounded-borders { border-radius: 12px; }
.opacity-90 { opacity: .9; }
</style>
