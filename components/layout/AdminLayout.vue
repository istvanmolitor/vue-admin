<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

</script>

<template>
  <div class="flex h-screen min-h-screen bg-background">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <Header />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-4">
          <slot />
      </main>
    </div>
  </div>
</template>
