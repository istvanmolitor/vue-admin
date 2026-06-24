<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@admin/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: 'default' | 'checkbox'
}>()
</script>

<template>
  <label
    :class="
      cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.variant === 'checkbox' && 'cursor-pointer',
        props.class,
      )
    "
  >
    <slot />
  </label>
</template>
