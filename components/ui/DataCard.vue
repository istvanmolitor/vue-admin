<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  noPadding?: boolean
}>()
</script>

<template>
  <div class="rounded-xl border border-border bg-card shadow-sm">
    <div v-if="title || description" class="border-b border-border px-6 py-4">
      <h3 v-if="title" class="text-base font-semibold text-foreground">{{ title }}</h3>
      <p v-if="description" class="text-sm text-muted-foreground mt-0.5">{{ description }}</p>
    </div>
    <div :class="noPadding ? '' : 'p-6'">
      <slot />
    </div>
  </div>
</template>

