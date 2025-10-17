<template>
  <div class="min-h-screen flex items-center justify-center px-6 bg-zinc-950 text-zinc-100">
    <div class="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h2 class="text-2xl font-semibold mb-4">Staff Login</h2>
      <p class="text-sm text-zinc-400 mb-6">Temporary access for staff. Use username <code>admin</code> and password <code>root</code>.</p>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm text-zinc-300 mb-1">Username</label>
          <input v-model="username" class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded" />
        </div>
        <div>
          <label class="block text-sm text-zinc-300 mb-1">Password</label>
          <input v-model="password" type="password" class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded" />
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-zinc-100 text-zinc-950 px-4 py-2 rounded font-medium">Sign in</button>
          <button type="button" @click="$emit('cancel')" class="text-sm text-zinc-400 hover:text-zinc-200">Cancel</button>
        </div>
        <div v-if="error" class="text-sm text-rose-400">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const error = ref('')

const submit = () => {
  error.value = ''
  if (username.value === 'admin' && password.value === 'root') {
    // simple temporary auth flag
    localStorage.setItem('isAdmin', '1')
    // notify parent
    const ev = new CustomEvent('login-success')
    window.dispatchEvent(ev)
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>

<style scoped>
/* small scoped adjustments if needed */
</style>
