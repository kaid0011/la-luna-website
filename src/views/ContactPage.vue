<template>
  <!-- HERO -->
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
        <h1 class="text-h2 text-weight-bolder q-mb-xs q-mt-none leading-tight">Contact Us</h1>
        <div class="text-subtitle1 opacity-90">{{ valueProp }}</div>
      </div>
    </div>

    <svg class="hero-curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
    </svg>
  </section>

  <!-- CONTENT -->
  <section class="q-py-xl container">
    <div class="row q-col-gutter-xl">
      <!-- LEFT: Quick Actions, Socials, Proof -->
      <div class="col-12 col-md-7">
        <!-- Quick Actions -->
        <q-card flat bordered class="q-pa-lg hover-lift contact-card">
          <div class="row items-center justify-between q-mb-sm">
            <div class="text-h6 text-weight-bold">Get in touch</div>
            <q-badge :color="isOpen ? 'positive' : 'negative'">{{ isOpen ? 'Open now' : 'Closed' }}</q-badge>
          </div>

          <!-- Actions -->
          <div class="row q-col-gutter-sm q-mt-sm">
            <div class="col-12 col-sm-6" v-for="(p,idx) in phones" :key="idx">
              <q-btn outline no-caps class="full-width contact-pill" :href="`tel:${p}`" icon="call" :label="`Call ${formatPhone(p)}`" />
            </div>
            <div class="col-12 col-sm-6">
              <q-btn outline no-caps class="full-width contact-pill" :href="`mailto:${email}`" icon="mail" label="Email us" />
            </div>
            <div class="col-12 col-sm-6">
              <q-btn color="primary" unelevated no-caps class="full-width" icon="near_me" :href="maps" target="_blank" label="Get directions" />
            </div>
          </div>

          <!-- Address -->
          <q-separator class="q-my-md" />
          <div class="row items-center text-weight-bold">
            <q-icon name="place" class="q-mr-xs" size="sm"/><div>Location</div>
          </div>
            <div class="text-body2 text-grey-8 q-mt-sm q-ml-md">{{ address }}</div>
            <div class="text-body2 text-grey-8 q-ml-md">Landmark: {{ landmark }}</div>

          <!-- Socials -->
          <q-separator class="q-my-md" />
          <div class="row q-gutter-sm">
            <q-btn flat icon="mdi-facebook" no-caps label="Facebook" :href="facebook.url" target="_blank" />
            <q-btn flat icon="mdi-instagram" no-caps label="Instagram" :href="instagram.url" target="_blank" />
            <q-btn flat icon="mdi-tiktok" no-caps label="TikTok" :href="tiktok.url" target="_blank" />
          </div>

          <!-- Proof & Assets -->
          <div class="row q-gutter-sm q-mt-md">
            <q-btn outline icon="collections" no-caps label="Menu Photos" :href="links.menuPhotos" target="_blank" />
            <q-btn outline icon="storefront" no-caps label="Ambience Photos" :href="links.ambiencePhotos" target="_blank" />
            <q-btn outline icon="reviews" no-caps label="Reviews Proof" :href="links.reviewsProof" target="_blank" />
          </div>
        </q-card>

        <!-- Reviews (selected quotes) -->
        <q-card flat bordered class="q-pa-lg q-mt-lg hover-lift">
          <div class="text-subtitle1 text-weight-bold q-mb-xs">What guests say</div>
          <div class="text-caption text-grey-7 q-mb-md">From Facebook, Instagram, and TikTok</div>
          <q-list separator class="rounded-borders bg-white">
            <q-item v-for="(r,i) in reviews" :key="i">
              <q-item-section avatar><q-icon name="format_quote" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-body2">“{{ r.text }}”</q-item-label>
                <q-item-label caption class="q-mt-xs">— {{ r.source }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- RIGHT: Hours & Map -->
      <div class="col-12 col-md-5">
        <q-card flat bordered class="q-pa-lg hover-lift">
          <div class="row items-center justify-between q-mb-sm">
            <div class="text-subtitle1 text-weight-bold">Opening hours</div>
            <q-chip class="text-body2 bg-green-2">{{ todayLabel }} • {{ todayHours }}</q-chip>
          </div>

          <q-markup-table dense flat bordered class="rounded-borders">
            <tbody>
              <tr v-for="d in weekOrder" :key="d">
                <td class="text-weight-medium" style="width:120px">{{ d }}</td>
                <td>{{ hoursWeekly[d] || 'Closed' }}</td>
              </tr>
            </tbody>
          </q-markup-table>

          <div class="q-mt-md rounded-borders overflow-hidden map-wrap">
            <iframe
              :src="mapEmbed" width="100%" height="260" style="border:0"
              allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map"
            ></iframe>
          </div>
        </q-card>
      </div>
    </div>
  </section>

</template>

<script setup>
import { computed } from 'vue'

/** ===== HERO ===== */
const heroImg = new URL('@/assets/images/home-hero.jpg', import.meta.url).href
const heroBgStyle = computed(() => ({
  backgroundImage: `linear-gradient(rgba(52,17,0,.55), rgba(52,17,0,.25)), url('${heroImg}')`
}))

/** ===== CLIENT DATA ===== */
const valueProp = 'A moonlit retreat, where coffee and comfort always meet.'
const address = '223 C Gold, Millionaires Village, Novaliches, Quezon City, 1124'
const landmark = 'Near Savemore, Beside BPI'
const phones = ['09322422969', '09757919153']
const email = 'lalunamooncafe@gmail.com'

const facebook = {
  handle: '@La Luna Moon Cafe',
  url: 'https://www.facebook.com/profile.php?id=61577042127849'
}
const instagram = {
  handle: '@lalunamooncafe',
  url: 'https://www.instagram.com/lalunamooncafe/'
}
const tiktok = {
  handle: '@lalunamoon.cafe',
  url: 'https://www.tiktok.com/@lalunamoon.cafe?lang=en'
}

const links = {
  menuPhotos: 'https://drive.google.com/drive/folders/1FuTwSsujsfnCShXnBa_LlUstaWzXTc7Y?usp=drive_link',
  ambiencePhotos: 'https://drive.google.com/drive/folders/1FuTwSsujsfnCShXnBa_LlUstaWzXTc7Y?usp=drive_link',
  reviewsProof: 'https://drive.google.com/drive/folders/1SsEUY_YGKw4M4m3QfTtR3o-EXAMPLE' // replace exact link
}

/** ===== REVIEWS ===== */
const reviews = [
  { text: 'The cozy atmosphere, free Wi-Fi, and friendly staff.', source: 'Camille T. (Facebook)' },
  { text: 'Ambience is ideal for both work and relaxation.', source: 'Kathlyn M. (Instagram)' },
  { text: 'Drinks are refreshing, food is always delicious.', source: 'Carla C. (TikTok)' }
]

/** ===== HOURS ===== */
const hoursWeekly = {
  Mon: '11:00 AM – 10:00 PM',
  Tue: '11:00 AM – 10:00 PM',
  Wed: '11:00 AM – 10:00 PM',
  Thu: '11:00 AM – 10:00 PM',
  Fri: '10:00 AM – 12:00 AM',
  Sat: '10:00 AM – 12:00 AM',
  Sun: '10:00 AM – 12:00 AM'
}
const weekOrder = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

/** ===== MAP ===== */
const maps = 'https://maps.google.com/?q=223%20C%20Gold,%20Millionaires%20Village,%20Novaliches,%20Quezon%20City'
const mapEmbed =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.827128047782!2d121.03408310948221!3d14.722363685719275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b180fea629fb%3A0x4091c8ecc037a3f0!2sLa%20Luna%20Moon%20Cafe!5e0!3m2!1sen!2sph!4v1756787238122!5m2!1sen!2sph'

/** ===== COMPUTEDS ===== */
const todayLabel = (() => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()])()
const todayHours = computed(() => hoursWeekly[todayLabel] || 'Closed')

const isOpen = computed(() => {
  const raw = hoursWeekly[todayLabel]
  if (!raw || raw.toLowerCase() === 'closed') return false
  const [open, close] = raw.split('–').map(s => s.trim())
  const toMin = (t) => {
    const [time, mer] = t.split(' ')
    let [h, m] = time.split(':').map(Number)
    if (mer === 'PM' && h !== 12) h += 12
    if (mer === 'AM' && h === 12) h = 0
    return h * 60 + m
  }
  const openMin = toMin(open)
  let closeMin = toMin(close)
  const now = new Date()
  const nowMin = now.getHours() * 60 + now.getMinutes()
  if (close.includes('12:00 AM') || closeMin <= openMin) closeMin += 24 * 60
  return nowMin >= openMin && nowMin <= closeMin
})

/** ===== HELPERS ===== */
function formatPhone(p) {
  return p.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')
}
</script>


<style scoped>
.hover-lift { transition: transform .2s ease, box-shadow .2s ease; }
.hover-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.08); }
.contact-pill { border-color: var(--coffee-sand); }
.brand-title { letter-spacing: .5px; }
.map-wrap { background: #f6f6f6; min-height: 260px; }
.tab-link { opacity: .95; }
</style>
