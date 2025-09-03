<template>
  <!-- HERO / TITLE (menu kept inside hero) -->
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
        <h1 class="text-h2 text-weight-bolder q-mb-xs q-mt-none leading-tight">Our Menu</h1>
        <div class="text-subtitle1 opacity-90">Moon-inspired drinks & bites, all day.</div>
      </div>
    </div>

    <svg class="hero-curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
    </svg>
  </section>

  <!-- CONTROLS (Category + Search ONLY) -->
  <section class="filter-bar bg-grey-1">
    <div class="container row items-center q-col-gutter-md">
      <div class="col-12 col-lg">
        <q-tabs v-model="cat" dense class="text-primary" active-color="primary" indicator-color="primary" align="left" outside-arrows mobile-arrows>
          <q-tab v-for="c in categoriesWithCounts" :key="c.value" :name="c.value" :label="`${c.label} (${c.count})`" />
        </q-tabs>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-input v-model="search" dense outlined placeholder="Search dishes or drinks…" clearable>
          <template #prepend><q-icon name="search" /></template>
        </q-input>
      </div>

      <div class="col-12">
        <div class="row q-col-gutter-sm items-center">
          <q-badge v-if="search" class="filter-chip" color="white" text-color="grey-9">
            Search: “{{ search }}”
            <q-btn dense flat round icon="close" @click="search = ''"/>
          </q-badge>
          <q-btn v-if="hasAnyFilter" flat dense no-caps icon="clear_all" label="Clear search" @click="clearAllFilters"/>
        </div>
      </div>
    </div>
  </section>

  <!-- GRID -->
  <section class="q-py-xl container">
    <div class="row items-center justify-between q-mb-sm">
      <div class="text-caption text-grey-7">Showing {{ filtered.length }} of {{ currentCategoryCount }} items</div>
    </div>

    <div class="row q-col-gutter-lg items-stretch">
      <div v-for="it in filtered" :key="it.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card flat bordered :class="['menu-card','hover-lift','full-height',{ soldout: it.soldOut }]">
          <div class="img-wrap">
            <q-img :src="it.img || fallbackImg" ratio="1" :alt="it.name" loading="lazy" />
            <div class="absolute-top q-pa-sm">
              <q-badge v-if="it.soldOut" color="red-5" text-color="white">Not available</q-badge>
            </div>
          </div>

          <q-card-section>
            <div class="row items-start justify-between">
              <div class="text-weight-bold">{{ it.name }}</div>
              <div class="text-weight-bold">{{ peso(it.price) }}</div>
            </div>
            <div class="text-caption text-grey-7 q-mt-xs menu-desc">{{ it.desc }}</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="between" class="menu-actions">
            <div class="text-caption text-grey-6">{{ labelCategory(it.category) }}</div>
            <q-btn :disable="it.soldOut" color="primary" flat no-caps
                   :label="it.soldOut ? 'Not available' : 'Add to order'"
                   icon="add_shopping_cart" @click="addToOrder(it)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="q-mt-xl text-center text-grey-7">No items match your search.</div>
  </section>

  <!-- LEGEND / NOTES -->
  <!-- <section class="q-pb-xl container">
    <q-banner class="bg-grey-2 legend">
      <div class="text-caption">
        <b>Notes:</b> *Prices include VAT. Last order: 20:30.
      </div>
    </q-banner>
  </section> -->
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

/* --- HERO BG --- */
const heroImg = new URL('@/assets/images/home-hero.jpg', import.meta.url).href
const heroBgStyle = computed(() => ({ backgroundImage: `linear-gradient(rgba(52,17,0,.55), rgba(52,17,0,.25)), url('${heroImg}')` }))

/* --- DATA SOURCE (external JSON) --- */
const items = ref([])
const fallbackImg = new URL('@/assets/images/menu-placeholder.jpg', import.meta.url).href

async function loadMenu () {
  try {
    const res = await fetch('/menu.json', { cache: 'no-store' })
    if (!res.ok) throw new Error('menu.json not found')
    const data = await res.json()
    items.value = (Array.isArray(data) ? data : []).map((it, idx) => ({
      id: it.id ?? idx + 1,
      category: String(it.category || '').toLowerCase(),
      name: it.name || 'Item',
      desc: it.desc || '',
      price: Number(it.price || 0),
      soldOut: !!it.soldOut,
      img: it.img || fallbackImg
    }))
    if (items.value.length && !cat.value) {
      cat.value = items.value[0].category
    }
  } catch (e) {
    console.error('Failed to load menu.json', e)
    items.value = []
  }
}
onMounted(loadMenu)

/* --- CATEGORY LABELS (auto from data) --- */
function labelCategory (v) {
  return v ? v.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : ''
}
const categories = computed(() => {
  const uniq = [...new Set(items.value.map(i => i.category))].filter(Boolean)
  return uniq.map(v => ({ label: labelCategory(v), value: v }))
})
const categoryCounts = computed(() => {
  const t = {}; for (const i of items.value) t[i.category] = (t[i.category] || 0) + 1; return t
})
const categoriesWithCounts = computed(() =>
  categories.value.map(c => ({ ...c, count: categoryCounts.value[c.value] || 0 }))
)

/* --- UI STATE --- */
const cat = ref('')
const search = ref('')

/* --- FILTERED VIEW (keep original order; no sort/price/availability filters) --- */
const filtered = computed(() => {
  return items.value
    .filter(i => !cat.value || i.category === cat.value)
    .filter(i => !search.value || (i.name + ' ' + i.desc).toLowerCase().includes(search.value.toLowerCase()))
})

const currentCategoryCount = computed(() => items.value.filter(i => i.category === cat.value).length)
const hasAnyFilter = computed(() => !!search.value)

/* --- ACTIONS / HELPERS --- */
function clearAllFilters(){ search.value = '' }
function addToOrder(item){ console.log('Add to order', item) }

function peso(n) {
  const num = Number(n || 0);
  return '₱' + num.toLocaleString('en-PH', { maximumFractionDigits: 0 });
}
</script>

