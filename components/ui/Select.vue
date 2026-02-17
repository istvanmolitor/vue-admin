<script setup lang="ts">
import { computed } from 'vue'

interface SelectOption {
  value: string | number
  label: string
}

interface Props {
  modelValue?: string | number
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Válassz...',
  disabled: false
})

const emit = defineEmits<Emits>()

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value!)
})
</script>

<template>
  <select
    v-model="selectedValue"
    :disabled="disabled"
    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <option v-if="placeholder" value="">{{ placeholder }}</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

