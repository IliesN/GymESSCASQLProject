<script setup>
import { ref, onMounted } from 'vue'
import Landing from './components/Landing.vue'
import Login from './components/Login.vue'
import AdminDashboard from './components/AdminDashboard.vue'

const view = ref('landing') // 'landing' | 'login' | 'admin'

const openLogin = () => { view.value = 'login' }
const openLanding = () => { view.value = 'landing' }

onMounted(() => {
  // if admin flag present, go directly to admin
  if (localStorage.getItem('isAdmin') === '1') view.value = 'admin'

  window.addEventListener('login-success', () => { view.value = 'admin' })
  window.addEventListener('logout', () => { view.value = 'landing' })
})
</script>

<template>
  <component
    :is="view === 'landing' ? Landing : view === 'login' ? Login : AdminDashboard"
    v-on:cancel="openLanding"
    v-on:open-login="openLogin"
  />
</template>

<style scoped></style>
