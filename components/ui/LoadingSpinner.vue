<script setup lang="ts">
import Icon from './Icon.vue'

withDefaults(
  defineProps<{
    fullscreen?: boolean
    overlay?: boolean
    label?: string
    size?: number
  }>(),
  {
    fullscreen: false,
    overlay: false,
    label: 'Betoltes...',
    size: 36,
  },
)
</script>

<template>
  <div
    :class="[
      fullscreen ? 'fixed inset-0 z-100 flex items-center justify-center' : 'inline-flex items-center justify-center',
      overlay ? 'bg-background/80 backdrop-blur-sm' : '',
    ]"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <div class="flex flex-col items-center gap-3">
      <Icon name="loading" class="animate-spin text-primary" :size="size" />
      <span v-if="label" class="text-sm text-muted-foreground">{{ label }}</span>
    </div>
  </div>
</template>
