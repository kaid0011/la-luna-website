<template>
  <q-page class="q-pa-xl flex flex-center bg-grey-1">
    <div class="container text-center">
      <q-icon name="sentiment_dissatisfied" size="72px" class="text-grey-7 q-mb-md" />
      <div class="text-h3 text-weight-bolder q-mb-xs">404 — Page not found</div>
      <div class="text-subtitle1 text-grey-7 q-mb-lg">The page you’re looking for doesn’t exist or has moved.</div>

      <div class="row justify-center q-gutter-sm q-mb-md">
        <q-btn color="primary" no-caps unelevated label="Go Home" to="/" />
        <q-btn outline color="primary" no-caps label="Menu" to="/menu" />
        <q-btn flat color="primary" no-caps label="Contact Us" to="/contact-us" />
      </div>

      <q-input v-model="query" outlined dense placeholder="Try searching a page or dish (e.g., 'flat white')" class="q-mx-auto" style="max-width:480px">
        <template #append>
          <q-btn flat round icon="search" @click="doSearch" aria-label="Search"/>
        </template>
      </q-input>

      <div class="q-mt-xl text-caption text-grey-6">Error code: 404</div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const query = ref('')
const router = useRouter()
function doSearch () {
  const q = (query.value || '').trim()
  if (!q) return
  router.push({ path: '/', query: { q } })
}
</script>

<style scoped>
.container { max-width: 720px; }
</style>