<script setup lang="ts">
interface Option {
  value: string | number
  label: string
}

defineProps<{
  modelValue?: string | number | null
  options: Option[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  // Convert to number if it's a numeric string
  const numValue = Number(value)
  emit('update:modelValue', isNaN(numValue) ? value : numValue)
}
</script>

<template>
  <select
    :value="modelValue"
    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    @change="handleChange"
  >
    <option v-if="placeholder" value="" disabled :selected="!modelValue">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

