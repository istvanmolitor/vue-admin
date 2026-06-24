<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import Input from './Input.vue'
import FieldWrapper from './FieldWrapper.vue'

const props = withDefaults(defineProps<{
  id: string
  label: string
  modelValue?: string | number
  placeholder?: string
  type?: string
  required?: boolean
  errors?: string | string[] | null
}>(), {
  type: 'text',
  required: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, { passive: true })
</script>

<template>
  <FieldWrapper :id="id" :label="label" :required="required" :errors="errors">
    <Input :id="id" v-model="modelValue" :type="type" :placeholder="placeholder" />
  </FieldWrapper>
</template>
