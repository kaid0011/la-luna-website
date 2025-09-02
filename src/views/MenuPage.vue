<template>
  <q-page class="q-pa-none">
    <!-- HERO / TITLE -->
    <section class="relative-position">
      <q-img :src="heroImg" class="hero-bg">
        <div class="absolute-full bg-black" style="opacity:.28"></div>
        <div class="absolute-center text-center text-white q-pa-xl container">
          <div class="text-overline">Our menu</div>
          <h1 class="text-h2 text-weight-bolder q-mt-xs">Brew, brunch, and bakes</h1>
          <div class="text-subtitle1 opacity-90 q-mt-sm">
            Small-batch coffee • baked daily • seasonal specials
          </div>
          <div class="q-mt-md">
            <q-btn outline color="white" no-caps label="Download Menu (PDF)" @click="downloadMenu" />
          </div>
        </div>
      </q-img>
    </section>

    <!-- CONTROLS -->
    <section class="q-py-md bg-grey-1" style="position: sticky; top: 0; z-index: 10;">
      <div class="container row items-center q-col-gutter-md">
        <div class="col-12 col-md">
          <q-tabs
            v-model="cat"
            dense
            class="text-primary"
            active-color="primary"
            indicator-color="primary"
            align="left"
            outside-arrows
            mobile-arrows
          >
            <q-tab v-for="c in categories" :key="c.value" :name="c.value" :label="c.label" />
          </q-tabs>
        </div>

        <div class="col-12 col-md-3">
          <q-input v-model="search" dense outlined placeholder="Search dishes or drinks…" clearable>
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="col-6 col-md-2">
          <q-select
            v-model="diet"
            :options="dietOptions"
            dense
            outlined
            label="Dietary"
            emit-value
            map-options
            clearable
          />
        </div>

        <div class="col-6 col-md-2">
          <q-select
            v-model="sortBy"
            :options="sortOptions"
            dense
            outlined
            label="Sort by"
            emit-value
            map-options
          />
        </div>

        <div class="col-12 col-md-3">
          <div class="text-caption text-grey-7 q-mb-xs">Price range</div>
          <q-range v-model="priceRange" :min="priceMin" :max="priceMax" dense label color="primary" />
        </div>

        <div class="col-6 col-md-auto">
          <q-toggle v-model="onlyAvailable" dense label="In stock only" color="primary" />
        </div>
        <div class="col-6 col-md-auto">
          <q-toggle v-model="onlyPopular" dense label="Popular" color="amber" />
        </div>
      </div>
    </section>

    <!-- GRID -->
    <section class="q-py-xl container">
      <div class="text-caption text-grey-7 q-mb-sm">Showing {{ filtered.length }} items</div>

      <div class="row q-col-gutter-lg">
        <div
          v-for="it in filtered"
          :key="it.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <q-card flat bordered class="menu-card">
            <q-img :src="it.img" ratio="1" :alt="it.name" loading="lazy">
              <div class="absolute-top q-pa-sm row q-gutter-xs">
                <q-badge v-if="it.tags?.includes('NEW')" color="primary" text-color="white">New</q-badge>
                <q-badge v-if="it.tags?.includes('BEST')" color="amber-8" text-color="black">Bestseller</q-badge>
                <q-badge v-for="d in dietBadges(it)" :key="d" color="grey-2" text-color="grey-9">{{ d }}</q-badge>
                <q-badge v-if="it.soldOut" color="red-5" text-color="white">Sold out</q-badge>
              </div>
            </q-img>

            <q-card-section>
              <div class="row items-start justify-between">
                <div class="text-weight-bold">{{ it.name }}</div>
                <div class="text-weight-bold">₱{{ it.price }}</div>
              </div>
              <div class="text-caption text-grey-7 q-mt-xs">{{ it.desc }}</div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="between">
              <div class="text-caption text-grey-6">{{ labelCategory(it.category) }}</div>
              <q-btn
                :disable="it.soldOut"
                color="primary"
                flat
                no-caps
                :label="it.soldOut ? 'Unavailable' : 'Add to order'"
                @click="addToOrder(it)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <div v-if="filtered.length === 0" class="q-mt-xl text-center text-grey-7">
        No items match your filters.
      </div>
    </section>

    <!-- LEGEND / NOTES -->
    <section class="q-pb-xl container">
      <q-banner class="bg-grey-2">
        <div class="text-caption">
          <b>Legend:</b> V = Vegetarian • GF = Gluten-free • DF = Dairy-free • *Prices include VAT. Last order: 20:30.
        </div>
      </q-banner>
    </section>

    <q-page-sticky expand position="bottom-right" :offset="[18,18]">
      <q-btn round color="primary" icon="arrow_upward" @click="scrollTop" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const heroImg =
  'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1600&auto=format&fit=crop'

const categories = [
  { label: 'Coffee', value: 'coffee' },
  { label: 'Tea', value: 'tea' },
  { label: 'Pastries', value: 'pastries' },
  { label: 'Brunch', value: 'brunch' },
  { label: 'Bottled', value: 'bottled' }
]

const sortOptions = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price (low → high)', value: 'price_asc' },
  { label: 'Price (high → low)', value: 'price_desc' },
  { label: 'Name (A → Z)', value: 'name' }
]

const dietOptions = [
  { label: 'Vegetarian (V)', value: 'V' },
  { label: 'Gluten-free (GF)', value: 'GF' },
  { label: 'Dairy-free (DF)', value: 'DF' }
]

const cat = ref('coffee')
const search = ref('')
const diet = ref(null)
const sortBy = ref('popular')
const onlyAvailable = ref(true)
const onlyPopular = ref(false)

const items = ref([
  // Coffee
  {
    id: 1,
    category: 'coffee',
    name: 'Espresso',
    price: 120,
    desc: 'Double ristretto',
    tags: ['BEST'],
    popular: 95,
    img: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    category: 'coffee',
    name: 'Flat White',
    price: 170,
    desc: 'Velvety double shot',
    tags: ['BEST'],
    popular: 98,
    img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    category: 'coffee',
    name: 'Cappuccino',
    price: 160,
    desc: 'Classic comfort',
    tags: [],
    popular: 88,
    img: 'https://images.unsplash.com/photo-1521017432531-fbd92d1cfb72?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4,
    category: 'coffee',
    name: 'Mocha',
    price: 180,
    desc: 'Chocolate + espresso',
    tags: [],
    popular: 82,
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 5,
    category: 'coffee',
    name: 'Cold Brew',
    price: 190,
    desc: '12-hr steep',
    tags: ['DF'],
    popular: 91,
    img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 6,
    category: 'coffee',
    name: 'Ube Latte (Seasonal)',
    price: 200,
    desc: 'Limited-time special',
    tags: ['NEW'],
    popular: 90,
    img: 'https://images.unsplash.com/photo-1554126807-6a2b0246fb1a?q=80&w=1200&auto=format&fit=crop',
    soldOut: false
  },

  // Tea
  {
    id: 11,
    category: 'tea',
    name: 'Matcha Latte',
    price: 180,
    desc: 'Ceremonial blend',
    tags: ['V'],
    popular: 87,
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 12,
    category: 'tea',
    name: 'Earl Grey',
    price: 120,
    desc: 'Bergamot black tea',
    tags: ['V', 'DF'],
    popular: 70,
    img: 'https://images.unsplash.com/photo-1513639725746-c5d3e861f32a?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 13,
    category: 'tea',
    name: 'Peppermint',
    price: 120,
    desc: 'Herbal, caffeine-free',
    tags: ['V', 'GF', 'DF'],
    popular: 66,
    img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop'
  },

  // Pastries
  {
    id: 21,
    category: 'pastries',
    name: 'Butter Croissant',
    price: 120,
    desc: 'Flaky, buttery layers',
    tags: ['BEST'],
    popular: 94,
    img: 'https://images.unsplash.com/photo-1543251697-4c01a6d3f81b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 22,
    category: 'pastries',
    name: 'Chocolate Chip Cookie',
    price: 90,
    desc: 'Crisp edges, soft center',
    tags: ['V'],
    popular: 89,
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 23,
    category: 'pastries',
    name: 'Basque Burnt Cheesecake',
    price: 220,
    desc: 'Caramelized top',
    tags: [],
    popular: 85,
    img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=1200&auto=format&fit=crop',
    soldOut: false
  },

  // Brunch
  {
    id: 31,
    category: 'brunch',
    name: 'Avocado Sourdough',
    price: 320,
    desc: 'Lemon zest, chili',
    tags: ['V'],
    popular: 92,
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 32,
    category: 'brunch',
    name: 'Chicken & Waffles',
    price: 420,
    desc: 'Honey butter',
    tags: [],
    popular: 96,
    img: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 33,
    category: 'brunch',
    name: 'Mushroom Truffle Pasta',
    price: 380,
    desc: 'Creamy, earthy',
    tags: ['V'],
    popular: 84,
    img: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop'
  },

  // Bottled
  {
    id: 41,
    category: 'bottled',
    name: 'Bottled Cold Brew',
    price: 210,
    desc: 'Ready to go',
    tags: ['DF'],
    popular: 73,
    img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 42,
    category: 'bottled',
    name: 'House Lemonade',
    price: 150,
    desc: 'Zesty & refreshing',
    tags: ['DF', 'GF'],
    popular: 68,
    img: 'https://images.unsplash.com/photo-1507281640040-c0d3a4df87d5?q=80&w=1200&auto=format&fit=crop'
  }
])

const priceMin = computed(() => Math.min(...items.value.map(i => i.price)))
const priceMax = computed(() => Math.max(...items.value.map(i => i.price)))
const priceRange = ref({ min: priceMin.value, max: priceMax.value })

function dietBadges (it) {
  return (it.tags || []).filter(t => ['V', 'GF', 'DF'].includes(t))
}
function labelCategory (value) {
  return categories.find(c => c.value === value)?.label || value
}

const filtered = computed(() => {
  let arr = items.value
    .filter(i => i.category === cat.value)
    .filter(i => !search.value || (i.name + ' ' + i.desc).toLowerCase().includes(search.value.toLowerCase()))
    .filter(i => !diet.value || (i.tags && i.tags.includes(diet.value)))
    .filter(i => i.price >= priceRange.value.min && i.price <= priceRange.value.max)
    .filter(i => !onlyAvailable.value || !i.soldOut)
    .filter(i => !onlyPopular.value || (i.popular && i.popular >= 90))

  switch (sortBy.value) {
    case 'price_asc': arr = arr.sort((a, b) => a.price - b.price); break
    case 'price_desc': arr = arr.sort((a, b) => b.price - a.price); break
    case 'name': arr = arr.sort((a, b) => a.name.localeCompare(b.name)); break
    default: arr = arr.sort((a, b) => (b.popular || 0) - (a.popular || 0))
  }
  return arr
})

function addToOrder (item) {
  // Hook this to your cart store later
  console.log('Add to order', item)
}

function downloadMenu () {
  // Replace with actual PDF link or generated file
  console.log('Download menu PDF')
}

function scrollTop () {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
.hero-bg { height: 48vh; }
.opacity-90 { opacity: .9; }
.menu-card { transition: transform .16s ease, box-shadow .16s ease; }
.menu-card:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(0,0,0,.08); }
.bg-grey-1 { background: #f6f6f6; }
</style>
