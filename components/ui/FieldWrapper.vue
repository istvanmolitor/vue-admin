<script setup lang="ts">
import Label from './Label.vue'
import FieldError from './FieldError.vue'

defineProps<{
  id: string
  label: string
  required?: boolean
  errors?: string | string[] | null
}>()
</script>

<template>
  <div class="space-y-2">
    <Label :for="id">
      {{ label }}<span v-if="required" class="text-destructive"> *</span>
    </Label>
    <slot />
    <FieldError :errors="errors" />
  </div>
</template>
