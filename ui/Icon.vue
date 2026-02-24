<script setup lang="ts">
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps<{
  name: string
  class?: string
}>()

const icon = computed(() => {
  return (LucideIcons as Record<string, unknown>)[props.name] ?? LucideIcons.HelpCircle
})
</script>

<template>
  <component :is="icon" :class="props.class" />
</template>

