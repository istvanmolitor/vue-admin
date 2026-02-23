<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-vue-next'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const route = useRoute()

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    to: '/',
  },
  {
    label: 'Felhasználók',
    icon: Users,
    to: '/users',
  },
  {
    label: 'Rendelések',
    icon: ShoppingCart,
    to: '/orders',
  },
  {
    label: 'Analitika',
    icon: BarChart3,
    to: '/analytics',
  },
  {
    label: 'Tartalom',
    icon: FileText,
    to: '/content',
  },
  {
    label: 'Beállítások',
    icon: Settings,
    to: '/settings',
  },
]

const isActive = (to: string) => {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>

<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out',
      open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]"
  >
    <!-- Brand -->
    <div class="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
        <span class="text-sm font-bold text-sidebar-primary-foreground">A</span>
      </div>
      <span class="text-lg font-bold">AdminPanel</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        @click="$emit('close')"
        :class="[
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors group',
          isActive(item.to)
            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        ]"
      >
        <component :is="item.icon" class="h-5 w-5 shrink-0" />
        <span class="flex-1">{{ item.label }}</span>
        <ChevronRight
          :class="[
            'h-4 w-4 transition-opacity',
            isActive(item.to) ? 'opacity-70' : 'opacity-0 group-hover:opacity-50'
          ]"
        />
      </RouterLink>
    </nav>

    <!-- Footer -->
    <div class="border-t border-sidebar-border p-3 space-y-1">
      <div class="flex items-center gap-3 px-3 py-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground font-semibold text-sm">
          JD
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">John Doe</p>
          <p class="text-xs text-sidebar-foreground/60 truncate">admin@example.com</p>
        </div>
      </div>
      <button class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
        <LogOut class="h-4 w-4" />
        <span>Kijelentkezés</span>
      </button>
    </div>
  </aside>
</template>


