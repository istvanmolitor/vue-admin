<script setup lang="ts">
import { Menu, Bell, Search } from 'lucide-vue-next'

defineProps<{ sidebarOpen: boolean; pageTitle: string }>()
defineEmits<{ 'toggle-sidebar': [] }>()
</script>

<template>
  <header class="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 md:px-6">
    <!-- Mobile menu toggle -->
    <button
      @click="$emit('toggle-sidebar')"
      class="md:hidden rounded-lg p-2 hover:bg-muted transition-colors"
    >
      <Menu class="h-5 w-5" />
    </button>

    <!-- Page title -->
    <h1 class="text-xl font-semibold text-foreground">{{ pageTitle }}</h1>

    <div class="flex flex-1 items-center justify-end gap-3">
      <!-- Search -->
      <div class="relative hidden sm:block">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Keresés..."
          class="h-9 w-56 rounded-lg border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <!-- Notifications -->
      <button class="relative rounded-lg p-2 hover:bg-muted transition-colors">
        <Bell class="h-5 w-5 text-muted-foreground" />
        <span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive"></span>
      </button>

      <!-- Avatar -->
      <button class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
        JD
      </button>
    </div>
  </header>
</template>

