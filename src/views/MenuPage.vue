<template>
  <!-- HERO / TITLE (unchanged) -->
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
        <div class="text-subtitle1 opacity-90">Moon-inspired drinks &amp; bites, all day.</div>
      </div>
    </div>

    <svg class="hero-curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
    </svg>
  </section>

  <!-- FLIPBOOK -->
  <section class="q-py-xl container">
    <div class="row items-center justify-between q-mb-sm">
      <div class="text-caption text-grey-7">
        Showing {{ pages.length }} pages
      </div>
      <div class="row q-gutter-sm">
        <q-btn flat icon="menu_book" label="Cover" @click="goToCover" />
        <q-btn round dense icon="chevron_left" @click="prev" />
        <q-btn round dense icon="chevron_right" @click="next" />
      </div>
    </div>

    <!-- PageFlip renders directly into this container -->
    <div class="flipbook-container" ref="containerRef"></div>

    <div v-if="pages.length === 0" class="q-mt-xl text-center text-grey-7">
      No pages found.
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { PageFlip } from 'page-flip'

/* --- HERO BG (kept non-dimming for toolbar/tabs) --- */
const heroImg = new URL('@/assets/images/home-hero.jpg', import.meta.url).href
const heroBgStyle = computed(() => ({
  backgroundImage: `linear-gradient(rgba(52,17,0,.55), rgba(52,17,0,.25)), url('${heroImg}')`
}))

/* --- STATE --- */
const containerRef = ref(null)
const flip = ref(null)

const pages = ref([]) // all pages from JSON

/* --- LOAD PAGES (images) --- */
async function loadPages () {
  try {
    const res = await fetch('/menu-pages.json', { cache: 'no-store' })
    if (!res.ok) throw new Error('menu-pages.json not found')
    const data = await res.json()
    // normalize
    pages.value = (Array.isArray(data) ? data : []).map((p, idx) => ({
      id: p.id ?? idx + 1,
      src: p.src,
      title: p.title || '',
      tags: String(p.tags || '')
    }))
  } catch (e) {
    console.error('Failed to load menu-pages.json', e)
    pages.value = []
  }
}
onMounted(loadPages)

/* --- UTIL: preload images --- */
function preloadImages(srcs) {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve(src)
          img.onerror = () => reject(new Error('Failed to load ' + src))
          img.src = src
        })
    )
  )
}

/* --- PAGEFLIP INIT / RE-INIT (images mode) --- */
async function initFlip () {
  if (!containerRef.value) return

  // destroy previous
  if (flip.value) {
    try { flip.value.destroy() } catch {}
    flip.value = null
  }

  const imgList = pages.value.map(p => p.src)
  if (!imgList.length) return

  // 1) ensure images are loaded (avoid blank textures)
  await preloadImages(imgList)

  // 2) ensure layout is ready (avoid zero-width init)
  await nextTick()
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))

  // compute single-page size
  const cw = containerRef.value.clientWidth || 800
  const pageWidth  = Math.min(520, Math.max(320, Math.floor(cw / 2)))
  const pageHeight = Math.round(pageWidth * 1.30)

  // create book
  flip.value = new PageFlip(containerRef.value, {
    width: pageWidth,
    height: pageHeight,
    size: 'stretch',
    minWidth: 280,
    minHeight: 300,
    maxWidth: 1100,
    maxHeight: 1600,
    showCover: true,
    mobileScrollSupport: true,
    useMouseEvents: true,
    autoSize: true,
    disableFlipByClick: false
  })

  // 3) render from IMAGES (one image per page)
  flip.value.loadFromImages(imgList)
}

/* Controls */
function prev(){ flip.value?.flipPrev() }
function next(){ flip.value?.flipNext() }
function goToCover(){ flip.value?.flip(0) }

/* Re-init on data change and resize */
function onResize(){ initFlip() }

onMounted(() => {
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  if (flip.value) flip.value.destroy()
})

watch(pages, () => { initFlip() })
</script>
