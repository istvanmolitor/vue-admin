<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'
import MenuItem from './MenuItem.vue'
import { getMenu } from '@menu/index'
import type { MenuItemConfig } from '@menu/index'

const route = useRoute()
const isCollapsed = ref(false)
const menuItems = ref<MenuItemConfig[]>([])
const expandedItems = ref<Set<string>>(new Set())

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleSubmenu = (itemId: string) => {
  if (expandedItems.value.has(itemId)) {
    expandedItems.value.delete(itemId)
  } else {
    expandedItems.value.add(itemId)
  }
}

// Find and expand parent items for active route
const expandActiveParents = () => {
  const currentPath = route.path

  const findAndExpandParents = (items: MenuItemConfig[], parentIds: string[] = []): boolean => {
    for (const item of items) {
      if (!item.id) continue

      // Non-null assertion - we've already checked item.id exists
      const newParentIds: string[] = [...parentIds, item.id!]

      // Check if this item's path matches current route
      if (item.path === currentPath) {
        // Expand all parent items
        parentIds.forEach(parentId => {
          expandedItems.value.add(parentId)
        })
        return true
      }

      // Check children recursively
      if (item.children && item.children.length > 0) {
        if (findAndExpandParents(item.children, newParentIds)) {
          return true
        }
      }
    }
    return false
  }

  findAndExpandParents(menuItems.value)
}

const loadMenuItems = () => {
  // Get the admin menu
  const adminMenu = getMenu('admin')
  if (adminMenu && adminMenu.children) {
    menuItems.value = adminMenu.children
    // Expand parents for initial route
    expandActiveParents()
  }
}

onMounted(() => {
  loadMenuItems()
})

// Watch route changes to keep menu expanded
watch(() => route.path, () => {
  expandActiveParents()
})
</script>

<template>
  <aside
    :class="[
      'h-full min-h-full border-r transition-all duration-200 flex flex-col sidebar-blue sidebar-border',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- Sidebar Header -->
    <div class="h-14 px-4 border-b flex items-center justify-between sidebar-border">
      <h2 v-if="!isCollapsed" class="text-sm font-semibold tracking-tight">Dashboard</h2>
      <button
        @click="toggleSidebar"
        class="p-1.5 rounded-md transition-colors sidebar-toggle-btn"
        :class="{ 'mx-auto': isCollapsed }"
      >
        <ChevronLeft v-if="!isCollapsed" :size="16" class="text-muted-foreground" />
        <ChevronRight v-if="isCollapsed" :size="16" class="text-muted-foreground" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-3 overflow-y-auto">
      <ul class="space-y-1">
        <MenuItem
          v-for="item in menuItems"
          :key="item.id"
          :item="item"
          :level="0"
          :is-collapsed="isCollapsed"
          :expanded-items="expandedItems"
          @toggle="toggleSubmenu"
        />
      </ul>
    </nav>

    <!-- User Section -->
    <div class="p-3 border-t sidebar-border">
      <div class="flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer sidebar-user-item">
        <div class="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
          A
        </div>
        <div v-if="!isCollapsed" class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">Admin User</p>
          <p class="text-xs text-muted-foreground truncate">admin@example.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-toggle-btn:hover {
  background-color: hsl(var(--color-sidebar-hover));
}

.sidebar-user-item:hover {
  background-color: hsl(var(--color-sidebar-hover));
}
</style>

