<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '../ui/Icon.vue'
import { useMenu } from '@menu'
import { useAuth } from '@user/composables/useAuth'

defineProps<{ sidebarOpen: boolean; pageTitle: string }>()
defineEmits<{ 'toggle-sidebar': [] }>()

const router = useRouter()
const { menuItems } = useMenu('user')
const { user, logout } = useAuth()
const dropdownOpen = ref(false)

const userInitials = () => {
  if (!user.value) return '?'
  const name = user.value.name || user.value.email || ''
  return name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || '?'
}

const handleMenuItemClick = async (item: { path?: string; meta?: Record<string, any> }) => {
  dropdownOpen.value = false
  if (item.meta?.action === 'logout') {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  } else if (item.path) {
    router.push(item.path)
  }
}
</script>

<template>
  <header class="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 md:px-6">
    <!-- Mobile menu toggle -->
    <button
      @click="$emit('toggle-sidebar')"
      class="md:hidden rounded-lg p-2 hover:bg-muted transition-colors"
    >
      <Icon name="Menu" class="h-5 w-5" />
    </button>

    <!-- Page title -->
    <h1 class="text-xl font-semibold text-foreground">{{ pageTitle }}</h1>

    <div class="flex flex-1 items-center justify-end gap-3">
      <!-- Search -->
      <div class="relative hidden sm:block">
        <Icon name="Search" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Keresés..."
          class="h-9 w-56 rounded-lg border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <!-- Notifications -->
      <button class="relative rounded-lg p-2 hover:bg-muted transition-colors">
        <Icon name="Bell" class="h-5 w-5 text-muted-foreground" />
        <span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive"></span>
      </button>

      <!-- Avatar -->
      <div class="relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          {{ userInitials() }}
        </button>

        <!-- Dropdown -->
        <div
          v-if="dropdownOpen"
          class="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card shadow-lg py-1 z-50"
        >
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="handleMenuItemClick(item)"
            class="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <component :is="item.icon" v-if="item.icon" class="h-4 w-4 text-muted-foreground" />
            {{ item.title }}
          </button>
        </div>

        <!-- Backdrop -->
        <div
          v-if="dropdownOpen"
          class="fixed inset-0 z-40"
          @click="dropdownOpen = false"
        />
      </div>
    </div>
  </header>
</template>
