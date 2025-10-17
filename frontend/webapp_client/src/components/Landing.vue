<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="text-2xl font-bold">APEX</div>
        <div class="hidden md:flex gap-8 text-sm">
          <a href="#features" class="hover:text-zinc-400 transition">Features</a>
          <a href="#pricing" class="hover:text-zinc-400 transition">Pricing</a>
          <a href="#contact" class="hover:text-zinc-400 transition">Contact</a>
        </div>
        <div class="flex items-center gap-3">
          <button @click="$emit('open-login')" class="text-sm text-zinc-200 hover:text-zinc-100">Staff Dashboard</button>
          <button class="bg-zinc-100 text-zinc-950 px-6 py-2 text-sm font-medium hover:bg-zinc-300 transition">
            Join Now
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="max-w-3xl">
          <h1 class="text-6xl md:text-7xl font-bold mb-6 leading-tight text-balance">
            Transform Your Body. Elevate Your Mind.
          </h1>
          <p class="text-xl text-zinc-400 mb-8 leading-relaxed">
            State-of-the-art facilities, expert trainers, and a community dedicated to your success.
          </p>
          <div class="flex flex-wrap gap-4">
            <button class="bg-zinc-100 text-zinc-950 px-8 py-4 font-medium hover:bg-zinc-300 transition">
              Start Free Trial
            </button>
            <button class="border border-zinc-700 px-8 py-4 font-medium hover:bg-zinc-900 transition">
              View Plans
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-6 bg-zinc-900/50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold mb-16 text-center">Why Choose APEX</h2>
        <div class="grid md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Dumbbell :size="32" class="text-zinc-100" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Premium Equipment</h3>
            <p class="text-zinc-400 leading-relaxed">
              Top-tier machines and free weights for every workout style
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users :size="32" class="text-zinc-100" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Expert Trainers</h3>
            <p class="text-zinc-400 leading-relaxed">
              Certified professionals to guide your fitness journey
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock :size="32" class="text-zinc-100" />
            </div>
            <h3 class="text-xl font-semibold mb-3">24/7 Access</h3>
            <p class="text-zinc-400 leading-relaxed">
              Train on your schedule, any time of day or night
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold mb-16 text-center">Simple Pricing</h2>
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="border border-zinc-800 p-8 hover:border-zinc-700 transition">
            <h3 class="text-2xl font-bold mb-2">Monthly</h3>
            <div class="text-5xl font-bold mb-6">$49<span class="text-xl text-zinc-400">/mo</span></div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <Check :size="20" class="text-zinc-100" />
                <span class="text-zinc-300">Unlimited gym access</span>
              </li>
              <li class="flex items-center gap-3">
                <Check :size="20" class="text-zinc-100" />
                <span class="text-zinc-300">Group classes included</span>
              </li>
              <li class="flex items-center gap-3">
                <Check :size="20" class="text-zinc-100" />
                <span class="text-zinc-300">Locker & shower facilities</span>
              </li>
            </ul>
            <button class="w-full border border-zinc-700 py-3 font-medium hover:bg-zinc-900 transition">
              Get Started
            </button>
          </div>
          <div class="border border-zinc-100 p-8 relative">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-100 text-zinc-950 px-4 py-1 text-sm font-medium">
              POPULAR
            </div>
            <h3 class="text-2xl font-bold mb-2">Annual</h3>
            <div class="text-5xl font-bold mb-6">$39<span class="text-xl text-zinc-400">/mo</span></div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <Check :size="20" class="text-zinc-100" />
                <span class="text-zinc-300">Everything in Monthly</span>
              </li>
              <li class="flex items-center gap-3">
                <Check :size="20" class="text-zinc-100" />
                <span class="text-zinc-300">Personal training sessions</span>
              </li>
              <li class="flex items-center gap-3">
                <Check :size="20" class="text-zinc-100" />
                <span class="text-zinc-300">Nutrition consultation</span>
              </li>
            </ul>
            <button class="w-full bg-zinc-100 text-zinc-950 py-3 font-medium hover:bg-zinc-300 transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="contact" class="py-20 px-6 bg-zinc-900/50">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Ready to Start Your Journey?
        </h2>
        <p class="text-xl text-zinc-400 mb-8 leading-relaxed">
          Join hundreds of members transforming their lives at APEX
        </p>
        <button class="bg-zinc-100 text-zinc-950 px-8 py-4 font-medium hover:bg-zinc-300 transition">
          Claim Your Free Week
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-zinc-800 py-8 px-6">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-2xl font-bold">APEX</div>
        <div class="text-sm text-zinc-400">
          © 2025 APEX Gym. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Dumbbell, Users, Clock, Check } from 'lucide-vue-next'
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
