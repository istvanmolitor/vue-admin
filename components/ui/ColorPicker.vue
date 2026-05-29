<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'
import Input from '@admin/components/ui/Input.vue'
import { cn } from '@admin/lib/utils'

const props = withDefaults(defineProps<{
  modelValue?: string | null
  defaultValue?: string | null
  id?: string
  placeholder?: string
  class?: HTMLAttributes['class']
}>(), {
  placeholder: '#22c55e',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | null): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const isValidHexColor = (value: string): boolean => /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value)

const colorInputValue = computed<string>(() => {
  const currentValue = modelValue.value ?? ''

  return isValidHexColor(currentValue) ? currentValue : '#000000'
})

const handleColorInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  modelValue.value = target.value
}

const handleTextInput = (value: string | number): void => {
  modelValue.value = String(value)
}
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <input
      :id="props.id"
      :value="colorInputValue"
      type="color"
      class="h-9 w-12 cursor-pointer rounded-md border border-input bg-transparent p-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      @input="handleColorInput"
    />
    <Input
      :model-value="modelValue"
      :placeholder="props.placeholder"
      class="font-mono uppercase"
      @update:model-value="handleTextInput"
    />
  </div>
</template>


