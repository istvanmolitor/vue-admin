<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, type HTMLAttributes } from 'vue'
import Checkbox from './Checkbox.vue'
import Label from './Label.vue'

const props = defineProps<{
  modelValue?: (string | number)[]
  options?: { label: string; value: string | number }[]
  items?: { id: string | number; name: string; [key: string]: any }[]
  label?: string
  emptyMessage?: string
  idPrefix?: string
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
  if (props.options) {
    return props.options
  }

  if (props.items) {
    return props.items.map(item => ({
      label: item.name,
      value: item.id
    }))
  }

  return []
})

const checkboxId = (value: string | number) => `${props.idPrefix ?? 'checkbox'}-${value}`

const updateValue = (value: string | number, checked: boolean) => {
  const current = [...(modelValue.value || [])]
  const index = current.indexOf(value)

  if (checked && index === -1) {
    current.push(value)
  }

  if (!checked && index > -1) {
    current.splice(index, 1)
  }

  modelValue.value = current
}
</script>

<template>
  <div :class="props.class" class="flex flex-col gap-2">
    <Label v-if="props.label" class="mb-1">{{ props.label }}</Label>

    <div v-if="computedOptions.length === 0" class="text-sm text-muted-foreground">
      {{ props.emptyMessage ?? 'Nincsenek elérhető elemek.' }}
    </div>

    <div v-for="option in computedOptions" :key="option.value" class="flex items-center space-x-2">
      <Checkbox
        :id="checkboxId(option.value)"
        :model-value="(modelValue || []).includes(option.value)"
        @update:model-value="updateValue(option.value, $event)"
      />
      <Label :for="checkboxId(option.value)" variant="checkbox">{{ option.label }}</Label>
    </div>
  </div>
</template>
