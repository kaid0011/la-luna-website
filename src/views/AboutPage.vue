<template>
  <q-page class="q-pa-none">
    <!-- HERO -->
    <section class="relative-position">
      <q-img :src="heroImg" class="hero-bg">
        <div class="absolute-full bg-black" style="opacity:.35"></div>
        <div class="absolute-center text-center text-white q-pa-xl container">
          <div class="text-overline">About us</div>
          <h1 class="text-h2 text-weight-bolder q-mt-xs">From bean to cup</h1>
          <div class="text-subtitle1 opacity-90 q-mt-sm">
            We roast in small batches, bake daily, and serve a cozy brunch all week.
          </div>
        </div>
      </q-img>
    </section>

    <!-- MISSION / VALUES -->
    <section class="q-py-xl container">
      <div class="row q-col-gutter-xl items-start">
        <div class="col-12 col-md-7">
          <h2 class="text-h4 q-mb-sm">Our mission</h2>
          <p class="text-body1 text-grey-8">
            Make everyday coffee feel a little special. That means shine-a-light sourcing,
            roasting with intention, and a warm space where neighbors feel at home.
          </p>
          <div class="row q-col-gutter-md q-mt-md">
            <div v-for="v in values" :key="v.title" class="col-12 col-sm-6">
              <q-card flat bordered class="q-pa-md value-card">
                <q-icon :name="v.icon" size="md" class="q-mb-sm" />
                <div class="text-subtitle1 text-weight-bold">{{ v.title }}</div>
                <div class="text-body2 text-grey-7 q-mt-xs">{{ v.desc }}</div>
              </q-card>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5">
          <q-card flat bordered class="q-pa-lg">
            <div class="text-subtitle1 text-weight-bold">At a glance</div>
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-6" v-for="s in stats" :key="s.label">
                <div class="text-h5 text-weight-bolder">{{ s.value }}</div>
                <div class="text-caption text-grey-7">{{ s.label }}</div>
              </div>
            </div>
            <q-separator class="q-my-md" />
            <div class="text-caption text-grey-7">* Since 2018 • Specialty grade beans • Direct-trade partners</div>
          </q-card>
        </div>
      </div>
    </section>

    <!-- STORY TIMELINE -->
    <section class="bg-grey-1 q-py-xl">
      <div class="container">
        <h2 class="text-h4 q-mb-lg text-center">Our story</h2>
        <q-timeline color="primary" layout="dense" side="right">
          <q-timeline-entry
            v-for="(e,i) in timeline"
            :key="i"
            :title="e.title"
            :subtitle="e.date"
            :icon="e.icon"
          >
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
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-3" v-for="(p,i) in process" :key="i">
          <q-card flat bordered class="q-pa-md h-100">
            <q-img :src="p.img" ratio="16/9" class="rounded-borders"/>
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
            <q-card flat bordered class="text-center q-pt-md">
              <q-avatar size="88px" class="q-mx-auto q-mb-sm"><img :src="t.avatar" alt=""/></q-avatar>
              <div class="text-subtitle1 text-weight-bold">{{ t.name }}</div>
              <div class="text-caption text-grey-7">{{ t.role }}</div>
              <q-card-section class="text-body2 text-grey-8">{{ t.blurb }}</q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- AWARDS / PRESS -->
    <section class="q-py-xl container">
      <div class="row items-center justify-between q-col-gutter-lg">
        <div class="col-12 col-md-5">
          <h2 class="text-h5 q-mb-sm">Recognition</h2>
          <ul class="text-body2 text-grey-8 q-pl-md">
            <li v-for="a in awards" :key="a">{{ a }}</li>
          </ul>
        </div>
        <div class="col-12 col-md-6">
          <div class="row q-col-gutter-md items-center">
            <q-badge v-for="p in press" :key="p" color="grey-3" text-color="grey-8" class="q-pa-sm">{{ p }}</q-badge>
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
          <q-expansion-item
            v-for="(f,i) in faqs"
            :key="i"
            expand-separator
            :label="f.q"
          >
            <q-card>
              <q-card-section class="text-body2 text-grey-8">{{ f.a }}</q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </section>

    <!-- CTA STRIP -->
    <section class="q-py-xl bg-dark text-white">
      <div class="container row items-center justify-between">
        <div>
          <h2 class="text-h5 q-mb-xs">Come say hello ☕</h2>
          <div class="text-subtitle2 opacity-80">[Unit, Building, Street], [District, City] • Mon–Thu 7:00–21:00 • Fri–Sun 7:00–22:00</div>
        </div>
        <div class="row q-gutter-sm">
          <q-btn color="primary" unelevated no-caps label="Order Now" />
          <q-btn outline color="white" no-caps label="Directions" />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const heroImg = 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1600&auto=format&fit=crop'

const values = [
  { icon: 'local_florist', title: 'Sustainable sourcing', desc: 'Traceable lots, fair partnerships, and lower-mileage logistics.' },
  { icon: 'whatshot', title: 'Craft roasting', desc: 'Small batches tuned for sweetness, clarity, and balance.' },
  { icon: 'diversity_3', title: 'Community', desc: 'A friendly, inclusive space for neighbors and creatives.' },
  { icon: 'health_and_safety', title: 'Quality & safety', desc: 'Hygiene certifications and consistent barista training.' }
]

const stats = [
  { value: '10k+', label: 'Cups served' },
  { value: '4.7★', label: 'Avg rating' },
  { value: '12', label: 'Partner farms' },
  { value: '2018', label: 'Since' }
]

const timeline = [
  { date: '2016', title: 'First origin trip', icon: 'flight_takeoff', body: 'Met smallholder farmers and fell in love with the craft at origin.' },
  { date: '2018', title: 'Doors open', icon: 'storefront', body: 'Opened our first cafe with a tiny 1kg roaster and huge dreams.' },
  { date: '2021', title: 'Bakeshop extension', icon: 'bakery_dining', body: 'We started baking daily to pair with our coffees.' },
  { date: '2024', title: 'Direct-trade program', icon: 'handshake', body: 'Launched partnerships with family-run farms for traceable lots.' }
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

const press = [
  'City Eats', 'Daily Brew', 'Local Tribune', 'Neighborhood Mag'
]

const faqs = [
  { q: 'Do you take reservations?', a: 'Weekdays only, until 6 PM. Weekends are walk-in; join the waitlist on arrival.' },
  { q: 'Are you pet-friendly?', a: 'Yes, outdoor seats only. Water bowls available.' },
  { q: 'Do you have Wi‑Fi and sockets?', a: 'Wi‑Fi is available; sockets are limited. On weekends we set a 2‑hour limit.' },
  { q: 'Allergens & dietary options?', a: 'Ask our team; nut-free and vegan options are labeled on the menu.' }
]
</script>

<style scoped>
.container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
.hero-bg { height: 56vh; }
.value-card { transition: transform .2s ease, box-shadow .2s ease; }
.value-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.08); }
.h-100 { height: 100%; }
.bg-dark { background: #111; }
.opacity-80 { opacity: .8; }
</style>