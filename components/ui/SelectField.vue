<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import Select from './Select.vue'
import FieldWrapper from './FieldWrapper.vue'

interface Option {
  value: string | number
  label: string
}

const props = withDefaults(defineProps<{
  id: string
  label: string
  modelValue?: string | number | null
  options?: Array<Option | Record<string, unknown>>
  labelField?: string
  valueField?: string
  placeholder?: string
  clearable?: boolean
  required?: boolean
  disabled?: boolean
  errors?: string | string[] | null
}>(), {
  options: () => [],
  labelField: 'label',
  valueField: 'value',
  clearable: false,
  required: false,
  disabled: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number | null): void
}>()

defineOptions({ inheritAttrs: false })

const modelValue = useVModel(props, 'modelValue', emits, { passive: true })
</script>

<template>
  <FieldWrapper :id="id" :label="label" :required="required" :errors="errors">
    <Select
      :id="id"
      v-model="modelValue"
      :options="options"
      :label-field="labelField"
      :value-field="valueField"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      v-bind="$attrs"
    >
      <slot />
    </Select>
  </FieldWrapper>
</template>
