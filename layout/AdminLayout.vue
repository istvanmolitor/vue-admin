<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import { RouterView } from 'vue-router'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-background">
    <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
    />

    <!-- Main -->
    <div class="flex flex-col md:pl-64">
      <AppHeader :sidebar-open="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="flex-1 p-4 md:p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

