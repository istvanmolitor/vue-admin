<script setup lang="ts">
import { Bell, Moon, Sun } from 'lucide-vue-next'
import { ref } from 'vue'
import Button from '../ui/Button.vue'
import ProfileMenu from './ProfileMenu.vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <header class="h-14 bg-background border-b border-border px-6 flex items-center justify-end">
    <!-- Actions -->
    <div class="flex items-center gap-1">
      <Button variant="ghost" size="icon" @click="toggleTheme">
        <Sun v-if="isDark" :size="18" />
        <Moon v-else :size="18" />
      </Button>

      <Button variant="ghost" size="icon" class="relative">
        <Bell :size="18" />
        <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full"></span>
      </Button>

      <ProfileMenu />
    </div>
  </header>
</template>
