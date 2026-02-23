<script setup lang="ts">
import { type Component } from 'vue'

defineProps<{
  title: string
  value: string | number
  description?: string
  icon: Component
  trend?: number
  color?: 'blue' | 'green' | 'orange' | 'purple'
}>()

const colorMap = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  green: 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
}
</script>

<template>
  <div class="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-muted-foreground">{{ title }}</p>
        <p class="mt-2 text-3xl font-bold text-foreground">{{ value }}</p>
        <p v-if="description" class="mt-1 text-xs text-muted-foreground">{{ description }}</p>
      </div>
      <div :class="['flex h-12 w-12 items-center justify-center rounded-lg', color ? colorMap[color] : colorMap.blue]">
        <component :is="icon" class="h-6 w-6" />
      </div>
    </div>

    <div v-if="trend !== undefined" class="mt-4 flex items-center gap-1 text-sm">
      <span :class="trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-destructive'">
        {{ trend >= 0 ? '▲' : '▼' }} {{ Math.abs(trend) }}%
      </span>
      <span class="text-muted-foreground">az előző hónaphoz képest</span>
    </div>
  </div>
</template>

