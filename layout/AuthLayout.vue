<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('min-h-screen flex items-center justify-center bg-muted/40 p-4', props.class)">
    <div class="w-full max-w-md">
      <slot />
    </div>
  </div>
</template>
