// router/index.js
import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import MenuPage from '@/views/MenuPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/contact-us', component: ContactPage },
  { path: '/menu', component: MenuPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 1) Back/forward: restore previous position
    if (savedPosition) return savedPosition

    // 2) Anchor links like /about#story
    if (to.hash) {
      return {
        el: to.hash,
        top: 0,
        // set behavior to 'smooth' if you want a smooth scroll
        // behavior: 'smooth'
      }
    }

    // 3) Default: top of page
    return { left: 0, top: 0 }
  }
})

export default router
