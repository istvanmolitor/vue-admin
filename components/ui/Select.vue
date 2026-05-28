<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  value: string | number
  label: string
}

const props = withDefaults(defineProps<{
  modelValue?: string | number | null
  options?: Array<Option | Record<string, unknown>>
  placeholder?: string
  labelField?: string
  valueField?: string
  clearable?: boolean
}>(), {
  options: () => [],
  labelField: 'label',
  valueField: 'value',
  clearable: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

const normalizedOptions = computed<Option[]>(() => {
  return props.options
    .map((option) => {
      if ('value' in option && 'label' in option) {
        const resolvedValue = option.value
        const resolvedLabel = option.label

        if ((typeof resolvedValue !== 'string' && typeof resolvedValue !== 'number') || typeof resolvedLabel !== 'string') {
          return null
        }

        return {
          value: resolvedValue,
          label: resolvedLabel,
        }
      }

      const resolvedValue = option[props.valueField]
      const resolvedLabel = option[props.labelField]

      if ((typeof resolvedValue !== 'string' && typeof resolvedValue !== 'number') || typeof resolvedLabel !== 'string') {
        return null
      }

      return {
        value: resolvedValue,
        label: resolvedLabel,
      }
    })
    .filter((option): option is Option => option !== null)
})

const handleChange = (event: Event): void => {
  const target = event.target as HTMLSelectElement
  const value = target.value

  if (value === '' && props.clearable) {
    emit('update:modelValue', null)
    return
  }

  const selectedOption = normalizedOptions.value.find((option) => String(option.value) === value)
  emit('update:modelValue', selectedOption?.value ?? value)
}
</script>

<template>
  <select
    :value="modelValue"
    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    @change="handleChange"
  >
    <option
      v-if="placeholder"
      value=""
      :disabled="!props.clearable"
    >
      {{ placeholder }}
    </option>
    <option v-for="option in normalizedOptions" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
    <slot />
  </select>
</template>

