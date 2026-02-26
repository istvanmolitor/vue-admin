<script setup lang="ts">
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps<{
  name: string | any
  class?: string
}>()

const icon = computed(() => {
  if (typeof props.name !== 'string') return props.name
  return (LucideIcons as Record<string, any>)[props.name] ?? LucideIcons.HelpCircle
})
</script>

<template>
  <component :is="icon" :class="props.class" />
</template>

