<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { cn } from '@admin/lib/utils'
import Icon from '../ui/Icon.vue'
import { useMenu } from '@menu'
import type { MenuItemConfig } from '@menu'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const route = useRoute()
const { menu: adminMenuRaw } = useMenu('admin')
const adminMenu = computed(() => adminMenuRaw.value || { children: [] })

const expandedItems = ref<Set<string>>(new Set())

const toggleItem = (id: string | undefined) => {
  if (!id) return
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id)
  } else {
    expandedItems.value.add(id)
  }
}

const isExpanded = (id: string | undefined) => id ? expandedItems.value.has(id) : false

const isActive = (to: string | undefined): boolean => {
  if (!to) return false
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(to + '/')
}

const isChildActive = (item: MenuItemConfig): boolean => {
  if (isActive(item.path)) return true
  if (item.children && item.children.length > 0) {
    return item.children.some(child => isChildActive(child))
  }
  return false
}

// Auto-expand if child is active
watch(() => route.path, () => {
  adminMenu.value.children?.forEach(item => {
    if (item.id && item.children && item.children.length > 0) {
      if (isChildActive(item)) {
        expandedItems.value.add(item.id)
      }
    }
  })
}, { immediate: true })
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
      <template v-for="item in adminMenu.children" :key="item.id">
        <!-- Parent with children -->
        <div v-if="item.children && item.children.length > 0" class="space-y-1">
          <button
            @click="toggleItem(item.id)"
            :class="[
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors group',
              isChildActive(item)
                ? 'bg-sidebar-accent/50 text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            ]"
          >
            <Icon v-if="item.icon" :name="item.icon" class="h-5 w-5 shrink-0" />
            <span class="flex-1 text-left">{{ item.title }}</span>
            <Icon
              name="ChevronRight"
              :class="cn(
                'h-4 w-4 transition-transform duration-200',
                isExpanded(item.id) ? 'rotate-90' : ''
              )"
            />
          </button>

          <div v-if="isExpanded(item.id)" class="ml-4 space-y-1 border-l border-sidebar-border pl-2">
            <RouterLink
              v-for="child in item.children"
              :key="child.id"
              :to="child.path || '#'"
              @click="$emit('close')"
              :class="[
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors group',
                isActive(child.path)
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              ]"
            >
              <Icon v-if="child.icon" :name="child.icon" class="h-4 w-4 shrink-0" />
              <span class="flex-1">{{ child.title }}</span>
            </RouterLink>
          </div>
        </div>

        <!-- Single item -->
        <RouterLink
          v-else
          :to="item.path || '#'"
          @click="$emit('close')"
          :class="[
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors group',
            isActive(item.path)
              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          ]"
        >
          <Icon v-if="item.icon" :name="item.icon" class="h-5 w-5 shrink-0" />
          <span class="flex-1">{{ item.title }}</span>
        </RouterLink>
      </template>
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
        <Icon name="LogOut" class="h-4 w-4" />
        <span>Kijelentkezés</span>
      </button>
    </div>
  </aside>
</template>


