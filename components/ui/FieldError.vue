<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  errors?: string | string[]
}

const props = defineProps<Props>()

const errorMessages = computed(() => {
  if (!props.errors) return []
  return Array.isArray(props.errors) ? props.errors : [props.errors]
})
</script>

<template>
  <div v-if="errorMessages.length > 0" class="space-y-1">
    <div
      v-for="(error, index) in errorMessages"
      :key="index"
      class="text-sm font-medium text-red-600"
    >
      {{ error }}
    </div>
  </div>
</template>


