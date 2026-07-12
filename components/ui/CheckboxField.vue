<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import Checkbox from './Checkbox.vue'
import Label from './Label.vue'
import FieldError from './FieldError.vue'

const props = withDefaults(defineProps<{
  id: string
  label: string
  modelValue?: boolean
  disabled?: boolean
  errors?: string | string[] | null
}>(), {
  disabled: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, { passive: true })
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center space-x-2">
      <Checkbox :id="id" v-model="modelValue" :disabled="disabled" />
      <Label :for="id" variant="checkbox">{{ label }}</Label>
    </div>
    <FieldError :errors="errors" />
  </div>
</template>
