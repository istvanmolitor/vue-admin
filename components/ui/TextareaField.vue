<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import Textarea from './Textarea.vue'
import FieldWrapper from './FieldWrapper.vue'

const props = withDefaults(defineProps<{
  id: string
  label: string
  modelValue?: string | number
  placeholder?: string
  rows?: number
  required?: boolean
  errors?: string | string[] | null
}>(), {
  required: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, { passive: true })
</script>

<template>
  <FieldWrapper :id="id" :label="label" :required="required" :errors="errors">
    <Textarea :id="id" v-model="modelValue" :placeholder="placeholder" :rows="rows" />
  </FieldWrapper>
</template>
