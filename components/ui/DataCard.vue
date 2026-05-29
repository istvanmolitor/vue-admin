<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  noPadding?: boolean
  label?: string
  value?: string | number | null
}>()
</script>

<template>
  <div class="rounded-xl border border-border bg-card shadow-sm">
    <div v-if="title || description" class="border-b border-border px-6 py-4">
      <h3 v-if="title" class="text-base font-semibold text-foreground">{{ title }}</h3>
      <p v-if="description" class="text-sm text-muted-foreground mt-0.5">{{ description }}</p>
    </div>
    <div v-if="label !== undefined" class="px-6 py-4">
      <p class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{{ label }}</p>
      <slot>
        <p class="text-sm font-medium text-foreground">{{ value ?? '-' }}</p>
      </slot>
    </div>
    <div v-else :class="noPadding ? '' : 'p-6'">
      <slot />
    </div>
  </div>
</template>
