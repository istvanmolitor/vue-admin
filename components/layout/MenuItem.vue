<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { RouterLink } from 'vue-router'
import {
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
  Circle
} from 'lucide-vue-next'
import type { MenuItemConfig } from '@menu/index'

interface Props {
  item: MenuItemConfig
  level: number
  isCollapsed: boolean
  expandedItems: Set<string>
}

const props = defineProps<Props>()
const emit = defineEmits<{
  toggle: [id: string]
}>()

const subItems = computed(() => {
  return props.item.children || []
})

const hasSubItems = computed(() => {
  return subItems.value.length > 0
})

const isExpanded = computed(() => {
  return props.item.id ? props.expandedItems.has(props.item.id) : false
})

const iconComponent = computed((): Component => {
  // If icon is already a Component, use it directly
  if (props.item.icon) {
    return props.item.icon as Component
  }

  // Default icon based on level
  return props.level === 0 ? LayoutDashboard : Circle
})

const handleToggle = () => {
  if (props.item.id) {
    emit('toggle', props.item.id)
  }
}

const iconSize = computed(() => {
  return props.level === 0 ? 18 : 16
})

const paddingClass = computed(() => {
  return props.level === 0 ? 'px-3 py-2' : 'px-3 py-1.5'
})

const marginClass = computed(() => {
  return props.level > 0 ? 'ml-4 pl-3 border-l border-border' : ''
})
</script>

<template>
  <li>
    <!-- Menu item with subitems -->
    <div v-if="hasSubItems">
      <button
        @click="handleToggle"
        :class="[
          'w-full flex items-center gap-2 rounded-lg text-sm font-medium transition-colors menu-item-btn',
          paddingClass,
          'text-muted-foreground hover:text-foreground'
        ]"
      >
        <component :is="iconComponent" :size="iconSize" class="shrink-0" />
        <span v-if="!isCollapsed" class="flex-1 text-left">{{ item.title }}</span>
        <component
          v-if="!isCollapsed"
          :is="isExpanded ? ChevronUp : ChevronDown"
          :size="14"
          class="shrink-0"
        />
      </button>

      <!-- Recursive submenu -->
      <ul
        v-if="isExpanded && !isCollapsed"
        :class="['mt-1 space-y-1', marginClass]"
      >
        <MenuItem
          v-for="subItem in subItems"
          :key="subItem.id"
          :item="subItem"
          :level="level + 1"
          :is-collapsed="isCollapsed"
          :expanded-items="expandedItems"
          @toggle="(id) => emit('toggle', id)"
        />
      </ul>
    </div>

    <!-- Regular menu item without subitems -->
    <RouterLink
      v-else
      :to="item.path || '#'"
      custom
      v-slot="{ href, navigate, isActive }"
    >
      <a
        :href="href"
        @click="navigate"
        :class="[
          'flex items-center gap-2 rounded-lg text-sm font-medium transition-colors menu-item-link',
          paddingClass,
          isActive
            ? 'text-foreground menu-item-active'
            : 'text-muted-foreground hover:text-foreground'
        ]"
      >
        <component :is="iconComponent" :size="iconSize" class="shrink-0" />
        <span v-if="!isCollapsed">{{ item.title }}</span>
      </a>
    </RouterLink>
  </li>
</template>

<style scoped>
.menu-item-btn:hover,
.menu-item-link:hover {
  background-color: hsl(var(--color-sidebar-hover));
}

.menu-item-active {
  background-color: hsl(var(--color-sidebar-hover));
}
</style>

