<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const route = useRoute()
const shouldHavePadding = computed(() => !route.meta?.noPadding)
</script>

<template>
  <div class="flex h-screen bg-background">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <Header />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto" :class="{ 'p-8': shouldHavePadding }">
        <slot />
      </main>
    </div>
  </div>
</template>
