<!-- File: src/pages/HomePage.vue -->
<template>
  <!-- HERO (nav kept inside this first section) -->
  <section id="hero" class="relative-position hero-header-plus">
    <div
      class="hero-header-bg"
      :style="heroBgStyle"
      role="img"
      aria-label="Cafe interior hero image"
    ></div>

    <!-- Toolbar inside hero -->
    <div class="hero-toolbar container" role="navigation" aria-label="Primary">
      <q-toolbar class="q-px-none">
        <q-toolbar-title>
          <RouterLink
            to="/"
            class="brand row items-center no-wrap"
            aria-label="La Luna Moon Cafe Home"
          >
            <img
              src="@/assets/images/l-logo-light.png"
              width="42"
              height="42"
              alt="La Luna Moon Cafe logo"
            />
            <span class="q-ml-sm text-weight-bold brand-title"
              >La Luna Moon Cafe</span
            >
          </RouterLink>
        </q-toolbar-title>
        <q-tabs
          class="menu-items"
          shrink
          indicator-color="secondary"
          active-color="secondary"
        >
          <q-route-tab
            to="/"
            label="Home"
            no-caps
            class="text-white tab-link"
          />
          <q-route-tab
            to="/menu"
            label="Menu"
            no-caps
            class="text-white tab-link"
          />
          <q-route-tab
            to="/about"
            label="About"
            no-caps
            class="text-white tab-link"
          />
          <q-route-tab
            to="/contact-us"
            label="Contact Us"
            no-caps
            class="text-white tab-link"
          />
        </q-tabs>
      </q-toolbar>
    </div>

    <!-- Hero copy -->
    <div class="absolute-full flex flex-center">
      <div class="hero-header-content text-center text-white">
        <div class="text-overline opacity-90 q-mb-sm">Specialty Coffee</div>
        <h1 class="text-h2 text-weight-bolder q-mb-xs q-mt-none leading-tight">
          A better coffee day
        </h1>
        <div class="text-subtitle1 opacity-90">
          Small-batch roasts, baked daily.
        </div>
        <!-- <div class="q-gutter-sm q-mt-lg">
          <q-btn color="primary" unelevated no-caps label="Order Now" icon="shopping_cart" />
          <q-btn outline text-color="white" no-caps label="Reserve a Table" icon="event" />
        </div> -->
        <div class="q-mt-lg">
<q-badge color="green-6" text-color="white" class="q-pa-sm" aria-label="Today hours">
  Hours today: {{ todayHoursText }}
</q-badge>
        </div>
      </div>
    </div>

    <svg
      class="hero-curve"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
      />
    </svg>
  </section>

<!-- FEATURES ROW -->
<section class="q-py-xl container">
  <!-- add items-stretch -->
  <div class="row q-col-gutter-lg items-stretch">
    <div v-for="(f, i) in features" :key="i" class="col-12 col-sm-6 col-md-3">
      <!-- add full-height -->
      <q-card flat bordered class="q-pa-lg feature-card hover-lift full-height">
        <q-avatar class="feature-icon q-mb-sm" size="48px"><q-icon :name="f.icon" size="24px" /></q-avatar>
        <div class="text-subtitle1 text-weight-bold q-mb-xs">{{ f.title }}</div>
        <div class="text-body2 feature-desc text-grey-7">{{ f.desc }}</div>
      </q-card>
    </div>
  </div>
</section>


  <!-- ABOUT SPLIT -->
  <section class="q-py-xl bg-grey-1">
    <div class="container row items-center q-col-gutter-xl">
      <div class="col-12 col-md-6">
    <q-img
      :src="aboutImg"
      :ratio="4/3"
      spinner-color="secondary"
      :img-style="{ objectFit: 'cover' }"
      alt="Cozy café table setup for working and studying"
    />
      </div>
      <div class="col-12 col-md-6">
        <div class="text-overline">Our story</div>
        <h2 class="text-h3 q-mt-xs q-mb-sm">From bean to cup</h2>
        <p class="text-body1 text-grey-8">
          We roast in small batches and serve a cozy, sun-lit brunch all week.
          From velvety flat whites to crowd-favorite chicken & waffles,
          everything’s made with care—so your everyday coffee feels a little
          special.
        </p>
        <div class="q-gutter-sm q-mt-md">
          <q-btn
            color="primary"
            unelevated
            no-caps
            label="See Full Menu"
            to="/menu"
          />
          <q-btn flat color="primary" no-caps label="Learn More" to="/about" />
        </div>
      </div>
    </div>
  </section>

  <!-- MENU GRID (highlights) -->
  <section class="q-py-xl container">
    <div class="text-center q-mb-lg">
      <div class="text-overline">Menu highlights</div>
      <h2 class="text-h3">Signature drinks & bites</h2>
    </div>
    <div class="row q-col-gutter-lg">
      <div v-for="item in menu" :key="item.id" class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="menu-card hover-lift">
          <div class="img-wrap">
            <q-img :src="item.img" ratio="1" :alt="item.name" loading="lazy" />
          </div>
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="text-weight-bold">{{ item.name }}</div>
              <div class="text-weight-bold">₱{{ item.price }}</div>
            </div>
            <div class="text-caption text-grey-7 q-mt-xs">{{ item.desc }}</div>
            <div class="q-mt-sm row q-gutter-xs">
              <q-badge
                v-for="(t, idx) in item.tags"
                :key="idx"
                color="grey-3"
                text-color="grey-8"
                class="q-px-sm"
                >{{ t }}</q-badge
              >
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>

<!-- PARALLAX — Why guests love us -->
<q-parallax :height="300" :src="parallaxImg">
  <!-- Make the overlay fill & center -->
  <div class="absolute-full flex items-center text-white">
    <!-- Keep your soft tint via .parallax-overlay, and constrain width with .container -->
    <div class="container parallax-overlay q-pa-lg rounded-borders">
      <div class="text-h5 text-weight-bolder text-center q-mb-md">
        Why customers love us
      </div>

      <div class="row q-col-gutter-lg justify-around text-center">
        <div class="col-12 col-md-4">
          <q-icon name="fa-solid fa-moon" size="lg" class="q-mb-xs" />
          <div class="text-subtitle1 text-weight-bold">Moon-lit vibe</div>
          <div class="opacity-90">Soft light, cozy corners.</div>
        </div>

        <div class="col-12 col-md-4">
          <q-icon name="fa-solid fa-mug-saucer" size="lg" class="q-mb-xs" />
          <div class="text-subtitle1 text-weight-bold">Comfort flavors</div>
          <div class="opacity-90">Small-batch roasts & bakes.</div>
        </div>

        <div class="col-12 col-md-4">
          <q-icon name="fa-solid fa-wifi" size="lg" class="q-mb-xs" />
          <div class="text-subtitle1 text-weight-bold">Work-friendly</div>
          <div class="opacity-90">Fast Wi-Fi, outlets, quiet hours.</div>
        </div>
      </div>
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
        <div v-for="(t, i) in testimonials" :key="i" class="col-12 col-md-4">
          <q-card flat bordered class="hover-lift">
            <q-card-section>
              <q-rating
                :model-value="5"
                :max="5"
                size="18px"
                color="amber"
                readonly
              />
              <div class="q-mt-sm text-body1">“{{ t.quote }}”</div>
            </q-card-section>
            <q-separator />
            <q-card-section class="row items-center">
              <q-avatar size="42px" class="q-mr-md"
                ><img :src="t.avatar" :alt="`${t.name} avatar`"
              /></q-avatar>
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

  <!-- WORK & STUDY WELCOME -->
  <section id="workstudy" class="q-py-xl container">
    <div class="row items-center q-col-gutter-xl">
      <!-- Copy + amenities -->
      <div class="col-12 col-md-7">
        <h2 class="text-h4 q-mb-sm">Work & study welcome</h2>
        <p class="text-body1 text-grey-8">
          Bring your laptop, your notes, or your team — we’ve got fast Wi-Fi,
          power outlets, and cozy corners. You can even
          <b>arrange a schedule</b> for group study or focused work.
        </p>

        <div class="row q-col-gutter-sm q-mt-sm">
          <q-chip icon="wifi" color="white" text-color="primary" class="ws-chip"
            >Fast Wi-Fi</q-chip
          >
          <q-chip icon="bolt" color="white" text-color="primary" class="ws-chip"
            >Power outlets</q-chip
          >
          <q-chip
            icon="volume_down"
            color="white"
            text-color="primary"
            class="ws-chip"
            >Quiet hours</q-chip
          >
          <q-chip
            icon="free_breakfast"
            color="white"
            text-color="primary"
            class="ws-chip"
            >All-day coffee</q-chip
          >
        </div>

        <div class="row items-center q-gutter-sm q-mt-sm">
          <q-icon name="schedule" size="md" class="text-primary" />
          <div class="text-body2">Hours today: {{ todayHoursText }}</div>
        </div>

        <!-- Buttons (replace the two old buttons) -->
        <div class="row q-gutter-sm q-mt-md">
          <q-btn
            color="primary"
            unelevated
            no-caps
            icon="fa-brands fa-facebook-messenger"
            :href="messengerUrl"
            target="_blank"
            rel="noopener"
            label="Arrange via Facebook"
            aria-label="Arrange a work or study schedule via Facebook Messenger"
          />
          <q-btn
            outline
            color="primary"
            no-caps
            icon="fa-brands fa-facebook"
            :href="socials.fb"
            target="_blank"
            rel="noopener"
            label="Visit our Facebook Page"
            aria-label="Open La Luna Moon Cafe Facebook Page"
          />
          <q-btn
            outline
            color="primary"
            no-caps
            icon="policy"
            label="House rules"
            @click="showRules = true"
          />
        </div>
      </div>

      <!-- RIGHT COLUMN — Stock image (with fallback + spinner) -->
<div class="col-12 col-md-5">
  <q-card flat bordered class="hover-lift ws-card q-pa-none">
    <q-img
      :src="workStudySrc"
      :ratio="4/3"
      spinner-color="secondary"
      :img-style="{ objectFit: 'cover' }"
      @error="workStudySrc = aboutImg"
      alt="Cozy café table setup for working and studying"
    />
  </q-card>
</div>

    </div>

    <!-- House rules modal -->
    <q-dialog v-model="showRules">
      <q-card style="max-width: 640px">
        <q-card-section class="text-h6 text-weight-bold"
          >House rules (Work & Study)</q-card-section
        >
        <q-separator />
        <q-card-section class="text-body2">
          <ul class="q-pl-md q-mt-none q-mb-none">
            <li>Keep voices low; take long calls outdoors when possible.</li>
            <li>One order per person every 2 hours during peak times.</li>
            <li>Sockets are first-come; please bring your own adapter.</li>
            <li>Please be mindful of shared seating during busy hours.</li>
          </ul>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
          <q-img
            :src="g"
            ratio="1"
            class="rounded-borders shadow-1"
            loading="lazy"
            :alt="'Cafe gallery photo'"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- SOCIALS / PROMOS -->
  <section class="q-py-xl social-section text-white">
    <div class="container text-center">
      <h2 class="text-h4">Follow us for promos & drops</h2>
      <div class="text-subtitle2 opacity-80 q-mt-xs">
        New beans, seasonal bakes, and event nights — we post here first.
      </div>

      <div class="row justify-center q-gutter-md q-mt-lg">
        <q-btn
          round
          size="lg"
          class="social-btn fb"
          :href="socials.fb"
          target="_blank"
          icon="fa-brands fa-facebook"
        />
        <q-btn
          round
          size="lg"
          class="social-btn ig"
          :href="socials.ig"
          target="_blank"
          icon="fa-brands fa-instagram"
        />
        <q-btn
          round
          size="lg"
          class="social-btn tt"
          :href="socials.tt"
          target="_blank"
          icon="fa-brands fa-tiktok"
        />
        <q-btn
          round
          size="lg"
          class="social-btn gm"
          :href="socials.gmaps"
          target="_blank"
          icon="fa-solid fa-location-dot"
        />
      </div>

      <div class="q-mt-lg">
        <q-btn
          outline
          color="white"
          no-caps
          icon="star"
          label="Leave us a Google review"
          :href="socials.greview"
          target="_blank"
        />
      </div>
    </div>
  </section>

  <!-- CONTACT STRIP -->
  <section id="contact" class="q-py-lg">
    <div class="container row items-center justify-between">
      <div>
        <div class="text-h6 text-weight-bold">Say hello</div>
        <div class="text-body1">
          Call (02) 1234-5678 · WhatsApp +63 900 123 4567
        </div>
      </div>
      <div class="row q-gutter-sm">
        <q-btn outline color="primary" icon="call" no-caps label="Call" />
        <q-btn
          outline
          color="primary"
          icon="whatsapp"
          no-caps
          label="WhatsApp"
        />
        <q-btn
          color="primary"
          unelevated
          no-caps
          label="Directions"
          icon="pin_drop"
        />
      </div>
    </div>
  </section>
  <q-dialog v-model="showRules" transition-show="jump-down" transition-hide="jump-up">
  <q-card style="max-width:640px" class="q-pa-none" aria-label="House rules dialog">
    <q-card-section class="text-h6 text-weight-bold">House rules (Work & Study)</q-card-section>
    <q-separator />
    <q-card-section class="text-body2">
      <ul class="q-pl-md q-mt-none q-mb-none">
        <li>Keep voices low; take long calls outdoors when possible.</li>
        <li>One order per person every 2 hours during peak times.</li>
        <li>Sockets are first-come; please bring your own adapter.</li>
        <li>Please be mindful of shared seating during busy hours.</li>
      </ul>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Close" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</q-dialog>

</template>

<script setup>
import { ref, computed } from "vue";
const showRules = ref(false);
const messengerUrl = "https://m.me/LaLunaMoonCafe";
// images first
const heroImg = new URL("@/assets/images/home-hero.jpg", import.meta.url).href;
const aboutImg =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600&auto=format&fit=crop";
const parallaxImg =
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop";
const workStudySrc = ref(
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80'
);

// coffee overlay for readability
const heroBgStyle = computed(() => ({
  backgroundImage: `linear-gradient(rgba(52,17,0,.55), rgba(52,17,0,.1)), url('${heroImg}')`,
}));

const features = [
  {
    icon: "local_fire_department",
    title: "Freshly roasted",
    desc: "Small batches for peak flavor.",
  },
  {
    icon: "bakery_dining",
    title: "Baked daily",
    desc: "Croissants, loaves & treats.",
  },
  {
    icon: "local_shipping",
    title: "Pickup & delivery",
    desc: "Order ahead or get it to you.",
  },
  {
    icon: "eco",
    title: "Sustainably sourced",
    desc: "Traceable beans, fair partnerships.",
  },
];

const menu = [
  {
    id: 1,
    name: "Flat White",
    price: 170,
    desc: "Velvety double shot",
    tags: ["Bestseller"],
    img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Cold Brew",
    price: 190,
    desc: "12‑hr steep",
    tags: ["Iced"],
    img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Avocado Sourdough",
    price: 320,
    desc: "Lemon zest, chili",
    tags: ["V"],
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Chicken & Waffles",
    price: 420,
    desc: "Honey butter",
    tags: [],
    img: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Mushroom Truffle Pasta",
    price: 380,
    desc: "Creamy, earthy",
    tags: ["V"],
    img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Basque Cheesecake",
    price: 220,
    desc: "Caramelized top",
    tags: ["New"],
    img: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Cappuccino",
    price: 160,
    desc: "Classic comfort",
    tags: [],
    img: "https://images.unsplash.com/photo-1521017432531-fbd92d1cfb72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Ube Latte",
    price: 200,
    desc: "Limited-time special",
    tags: ["Seasonal"],
    img: "https://images.unsplash.com/photo-1554126807-6a2b0246fb1a?q=80&w=1200&auto=format&fit=crop",
  },
];

const stats = [
  { value: "10k+", label: "Cups served" },
  { value: "4.7★", label: "Avg rating" },
  { value: "2018", label: "Since" },
];

const testimonials = [
  {
    name: "J. Santos",
    quote: "Best flat white in the city.",
    avatar: "https://i.pravatar.cc/80?img=5",
  },
  {
    name: "A. Lee",
    quote: "Weekend brunch worth lining up for.",
    avatar: "https://i.pravatar.cc/80?img=15",
  },
  {
    name: "M. Cruz",
    quote: "Cozy space and friendly baristas.",
    avatar: "https://i.pravatar.cc/80?img=25",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1521017432531-fbd92d1cfb72?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518131678677-a9b1e8e91bb0?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop",
];

// Opening hours helper (Mon=1..Sun=0)
const schedule = {
  0: null,
  1: ["07:00", "21:00"],
  2: ["07:00", "21:00"],
  3: ["07:00", "21:00"],
  4: ["07:00", "21:00"],
  5: ["07:00", "22:00"],
  6: ["07:00", "22:00"],
};

function toDateTime(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
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
  const openDate = toDateTime(openH);
  const closeDate = toDateTime(closeH);
  const open = now >= openDate && now <= closeDate;
  return { open, openAt: openDate, closeAt: closeDate };
}

const bounds = computed(() => todayBounds());
const openNow = computed(() => bounds.value.open);
const todayClose = computed(() =>
  bounds.value.closeAt
    ? bounds.value.closeAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""
);
const nextOpen = computed(() =>
  bounds.value.openAt
    ? bounds.value.openAt.toLocaleString([], {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "soon"
);

const socials = {
  fb: "https://facebook.com/profile.php?id=61577042127849", // TODO: replace with real handle
  ig: "https://instagram.com/lalunamooncafe", // TODO
  tt: "https://tiktok.com/@lalunamooncafe", // TODO
  gmaps: "https://maps.app.goo.gl/YOUR_PLACE_ID", // TODO
  greview: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID", // TODO
};

const todayHoursText = computed(() => {
  const d = new Date().getDay(); // 0=Sun..6=Sat
  const isWeekend = d === 5 || d === 6 || d === 0; // Fri, Sat, Sun
  return isWeekend ? "10:00 AM – 12:00 MN" : "11:00 AM – 10:00 PM";
});
</script>
