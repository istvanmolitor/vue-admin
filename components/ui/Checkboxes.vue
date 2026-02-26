<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, type HTMLAttributes } from 'vue'
import Checkbox from './Checkbox.vue'
import Label from './Label.vue'

const props = defineProps<{
  modelValue?: (string | number)[]
  options?: { label: string; value: string | number }[]
  items?: { id: string | number; name: string; [key: string]: any }[]
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: (string | number)[]): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: [],
})

const computedOptions = computed(() => {
  if (props.options) return props.options
  if (props.items) {
    return props.items.map(item => ({
      label: item.name,
      value: item.id
    }))
  }
  return []
})

const toggle = (value: string | number) => {
  const current = [...(modelValue.value || [])]
  const index = current.indexOf(value)
  if (index > -1) {
    current.splice(index, 1)
  } else {
    current.push(value)
  }
  modelValue.value = current
}
</script>

<template>
  <div :class="props.class" class="flex flex-col gap-2">
    <div v-for="option in computedOptions" :key="option.value" class="flex items-center space-x-2">
      <Checkbox
        :model-value="(modelValue || []).includes(option.value)"
        @update:model-value="toggle(option.value)"
      />
      <Label @click="toggle(option.value)" class="cursor-pointer">{{ option.label }}</Label>
    </div>
  </div>
</template>
