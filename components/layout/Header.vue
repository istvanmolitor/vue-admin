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
  <header class="bg-[--color-card]/80 backdrop-blur-xl border-b border-[--color-border]/50 px-6 py-4 shadow-lg relative overflow-visible">
    <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
    <div class="flex items-center justify-end relative z-10">
      <!-- Actions -->
      <div class="flex items-center gap-2">
        <Button variant="ghost" size="icon" @click="toggleTheme" class="hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:scale-110 transition-all duration-200">
          <Sun v-if="isDark" :size="20" class="text-yellow-500" />
          <Moon v-else :size="20" class="text-blue-500" />
        </Button>

        <Button variant="ghost" size="icon" class="relative hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:scale-110 transition-all duration-200 group">
          <Bell :size="20" class="group-hover:animate-pulse" />
          <span class="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></span>
        </Button>

        <ProfileMenu />
      </div>
    </div>
  </header>
</template>
