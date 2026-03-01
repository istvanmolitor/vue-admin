<script setup lang="ts">
import { cn } from '@admin/lib/utils'

defineProps<{
  message?: string | string[]
  class?: string
}>()
</script>

<template>
  <div v-if="message" :class="cn('text-sm font-medium text-destructive mt-1', $props.class)">
    <template v-if="Array.isArray(message)">
      <p v-for="(msg, index) in message" :key="index">{{ msg }}</p>
    </template>
    <p v-else>{{ message }}</p>
  </div>
</template>
