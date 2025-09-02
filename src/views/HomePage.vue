<!-- <template>
    <div class="hero-header">
        <q-img
        src="@/assets/home-hero.jpg"
        style="max-width: 100vw; height: 90vh;"
        fit="cover"
      />
    </div>
    <div>

    </div>
</template> -->

<template>
    <section id="hero" class="relative-position">
      <q-img :src="heroImg" class="hero-bg">
        <div class="absolute-full bg-black" style="opacity:.35"></div>
        <div class="absolute-center text-center text-white q-pa-xl hero-content container">
          <div class="text-overline q-mb-sm">Specialty Coffee</div>
          <h1 class="text-h2 text-weight-bolder q-mb-sm">A better coffee day</h1>
          <div class="text-subtitle1 opacity-90">Small-batch roasts, baked daily.</div>
          <div class="q-gutter-sm q-mt-lg">
            <q-btn color="primary" unelevated no-caps label="Order Now" />
            <q-btn outline text-color="white" no-caps label="Reserve a Table" />
          </div>
          <div class="q-mt-lg">
            <q-badge color="green-6" text-color="white" class="q-pa-sm">
              {{ openNow ? `Open now • until ${todayClose}` : `Closed • opens ${nextOpen}` }}
            </q-badge>
          </div>
        </div>
      </q-img>
    </section>

    <!-- FEATURES ROW -->
    <section class="q-py-xl container">
      <div class="row q-col-gutter-lg">
        <div v-for="(f,i) in features" :key="i" class="col-12 col-sm-6 col-md-3">
          <q-card flat bordered class="q-pa-lg feature-card">
            <q-icon :name="f.icon" size="lg" class="q-mb-sm" />
            <div class="text-subtitle1 text-weight-bold q-mb-xs">{{ f.title }}</div>
            <div class="text-body2 text-grey-7">{{ f.desc }}</div>
          </q-card>
        </div>
      </div>
    </section>

    <!-- ABOUT SPLIT -->
    <section class="q-py-xl bg-grey-1">
      <div class="container row items-center q-col-gutter-xl">
        <div class="col-12 col-md-6">
          <q-img :src="aboutImg" ratio="4/3" class="rounded-borders shadow-2" />
        </div>
        <div class="col-12 col-md-6">
          <div class="text-overline">Our story</div>
          <h2 class="text-h3 q-mt-xs q-mb-sm">From bean to cup</h2>
          <p class="text-body1 text-grey-8">We roast in small batches and serve a cozy, sun-lit brunch all week. From velvety flat whites to crowd-favorite chicken & waffles, everything’s made with care—so your everyday coffee feels a little special.</p>
          <div class="q-gutter-sm q-mt-md">
            <q-btn color="primary" unelevated no-caps label="See Full Menu" />
            <q-btn flat color="primary" no-caps label="Learn More" />
          </div>
        </div>
      </div>
    </section>

    <!-- MENU GRID -->
    <section class="q-py-xl container">
      <div class="text-center q-mb-lg">
        <div class="text-overline">Menu highlights</div>
        <h2 class="text-h3">Signature drinks & bites</h2>
      </div>
      <div class="row q-col-gutter-lg">
        <div v-for="item in menu" :key="item.id" class="col-12 col-sm-6 col-md-3">
          <q-card flat bordered class="menu-card">
            <q-img :src="item.img" ratio="1" />
            <q-card-section>
              <div class="row items-center justify-between">
                <div class="text-weight-bold">{{ item.name }}</div>
                <div class="text-weight-bold">₱{{ item.price }}</div>
              </div>
              <div class="text-caption text-grey-7 q-mt-xs">{{ item.desc }}</div>
              <div class="q-mt-sm row q-gutter-xs">
                <q-badge v-for="(t,idx) in item.tags" :key="idx" color="grey-3" text-color="grey-8" class="q-px-sm">{{ t }}</q-badge>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="text-center q-mt-lg">
        <q-btn outline color="primary" no-caps label="Download Menu (PDF)" />
      </div>
    </section>

    <!-- PARALLAX STATS -->
    <q-parallax :height="360" :src="parallaxImg">
      <div class="absolute-full flex items-center justify-around text-white container">
        <div class="text-center" v-for="(s, i) in stats" :key="i">
          <div class="text-h3 text-weight-bolder">{{ s.value }}</div>
          <div class="text-subtitle2">{{ s.label }}</div>
        </div>
      </div>
    </q-parallax>

    <!-- TESTIMONIALS -->
    <section class="q-py-xl bg-grey-1">
      <div class="container">
        <div class="text-center q-mb-lg">
          <div class="text-overline">Reviews</div>
          <h2 class="text-h3">What guests say</h2>
        </div>
        <div class="row q-col-gutter-lg">
          <div v-for="(t,i) in testimonials" :key="i" class="col-12 col-md-4">
            <q-card flat bordered>
              <q-card-section>
                <q-rating :model-value="5" :max="5" size="18px" color="amber" readonly />
                <div class="q-mt-sm text-body1">“{{ t.quote }}”</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="row items-center">
                <q-avatar size="42px" class="q-mr-md"><img :src="t.avatar" alt="" /></q-avatar>
                <div>
                  <div class="text-subtitle2">{{ t.name }}</div>
                  <div class="text-caption text-grey">Local Guide</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- CATERING / B2B CALL-OUT -->
    <section id="catering" class="q-py-xl container">
      <div class="row items-center q-col-gutter-xl">
        <div class="col-12 col-md-7">
          <h2 class="text-h4 q-mb-sm">We cater meetings & parties</h2>
          <p class="text-body1 text-grey-8">Hot coffee urns, pastry trays, and brunch boxes for 10–120 pax. Tell us your headcount and time—we’ll handle the rest.</p>
        </div>
        <div class="col-12 col-md-5 text-right">
          <q-btn color="primary" unelevated no-caps label="Get Catering Quote" />
        </div>
      </div>
    </section>

    <!-- GALLERY / IG GRID -->
    <section id="gallery" class="q-py-xl bg-grey-1">
      <div class="container">
        <div class="text-center q-mb-lg">
          <div class="text-overline">Gallery</div>
          <h2 class="text-h3">Inside the cafe</h2>
        </div>
        <div class="row q-col-gutter-lg">
          <div v-for="g in gallery" :key="g" class="col-6 col-md-3">
            <q-img :src="g" ratio="1" class="rounded-borders shadow-1" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER / OFFER -->
    <section class="q-py-xl bg-dark text-white">
      <div class="container text-center">
        <h2 class="text-h4">Get 10% off your first order</h2>
        <div class="text-subtitle2 opacity-80 q-mt-xs">Two emails a month. New beans & seasonal bakes.</div>
        <q-form @submit="onSubscribe" class="row justify-center q-gutter-sm q-mt-md">
          <q-input v-model="email" outlined bg-color="white" color="primary" label="Your email" type="email" class="col-12 col-md-4" :rules="[v => !!v || 'Email is required']" />
          <q-btn type="submit" color="primary" unelevated no-caps label="Subscribe" class="col-12 col-md-auto" />
        </q-form>
        <div class="text-positive q-mt-sm" v-if="subscribed">Thanks! Check your inbox to confirm.</div>
      </div>
    </section>

    <!-- CONTACT STRIP -->
    <section id="contact" class="q-py-lg">
      <div class="container row items-center justify-between">
        <div>
          <div class="text-h6 text-weight-bold">Say hello</div>
          <div class="text-body1">Call (02) 1234-5678 · WhatsApp +63 900 123 4567</div>
        </div>
        <div class="row q-gutter-sm">
          <q-btn outline color="primary" icon="call" no-caps label="Call" />
          <q-btn outline color="primary" icon="whatsapp" no-caps label="WhatsApp" />
          <q-btn color="primary" unelevated no-caps label="Directions" />
        </div>
      </div>
    </section>
</template>
<script setup>
import { ref, computed } from 'vue'

const heroImg = 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop'
const aboutImg = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600&auto=format&fit=crop'
const parallaxImg = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop'

const features = [
  { icon: 'local_fire_department', title: 'Freshly roasted', desc: 'Small batches for peak flavor.' },
  { icon: 'bakery_dining', title: 'Baked daily', desc: 'Croissants, loaves & treats.' },
  { icon: 'local_shipping', title: 'Pickup & delivery', desc: 'Order ahead or get it to you.' },
  { icon: 'eco', title: 'Sustainably sourced', desc: 'Traceable beans, fair partnerships.' }
]

const menu = [
  { id: 1, name: 'Flat White', price: 170, desc: 'Velvety double shot', tags: ['Bestseller'], img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, name: 'Cold Brew', price: 190, desc: '12‑hr steep', tags: ['Iced'], img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, name: 'Avocado Sourdough', price: 320, desc: 'Lemon zest, chili', tags: ['V'], img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, name: 'Chicken & Waffles', price: 420, desc: 'Honey butter', tags: [], img: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=1200&auto=format&fit=crop' },
  { id: 5, name: 'Mushroom Truffle Pasta', price: 380, desc: 'Creamy, earthy', tags: ['V'], img: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, name: 'Basque Cheesecake', price: 220, desc: 'Caramelized top', tags: ['New'], img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=1200&auto=format&fit=crop' },
  { id: 7, name: 'Cappuccino', price: 160, desc: 'Classic comfort', tags: [], img: 'https://images.unsplash.com/photo-1521017432531-fbd92d1cfb72?q=80&w=1200&auto=format&fit=crop' },
  { id: 8, name: 'Ube Latte', price: 200, desc: 'Limited-time special', tags: ['Seasonal'], img: 'https://images.unsplash.com/photo-1554126807-6a2b0246fb1a?q=80&w=1200&auto=format&fit=crop' }
]

const stats = [
  { value: '10k+', label: 'Cups served' },
  { value: '4.7★', label: 'Avg rating' },
  { value: '2018', label: 'Since' }
]

const testimonials = [
  { name: 'J. Santos', quote: 'Best flat white in the city.', avatar: 'https://i.pravatar.cc/80?img=5' },
  { name: 'A. Lee', quote: 'Weekend brunch worth lining up for.', avatar: 'https://i.pravatar.cc/80?img=15' },
  { name: 'M. Cruz', quote: 'Cozy space and friendly baristas.', avatar: 'https://i.pravatar.cc/80?img=25' }
]

const gallery = [
  'https://images.unsplash.com/photo-1521017432531-fbd92d1cfb72?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518131678677-a9b1e8e91bb0?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop'
]

// Opening hours helper (Mon=1..Sun=0)
const schedule = {
  0: null, // Sunday closed example; set to array to open
  1: ['07:00', '21:00'],
  2: ['07:00', '21:00'],
  3: ['07:00', '21:00'],
  4: ['07:00', '21:00'],
  5: ['07:00', '22:00'],
  6: ['07:00', '22:00']
}

function todayBounds () {
  const now = new Date()
  const d = now.getDay()
  const hours = schedule[d]
  if (!hours) return { open: false, openAt: nextOpenTime() }
  const [openH, closeH] = hours
  const openDate = toDateTime(openH)
  const closeDate = toDateTime(closeH)
  const open = now >= openDate && now <= closeDate
  return { open, openAt: openDate, closeAt: closeDate }
}

function toDateTime (hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d
}

function nextOpenTime () {
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

const bounds = computed(() => todayBounds())
const openNow = computed(() => bounds.value.open)
const todayClose = computed(() => bounds.value.closeAt ? bounds.value.closeAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')
const nextOpen = computed(() => bounds.value.openAt ? bounds.value.openAt.toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' }) : 'soon')

const email = ref('')
const subscribed = ref(false)
function onSubscribe () {
  subscribed.value = true
}
</script>