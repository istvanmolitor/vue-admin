<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { Check } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'
import { cn } from '@admin/lib/utils'

const props = defineProps<{
  modelValue?: boolean
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
})
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="modelValue"
    :class="
      cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        props.class,
      )
    "
    @click="modelValue = !modelValue"
  >
    <span v-if="modelValue" class="flex items-center justify-center text-current">
      <Check class="h-4 w-4" />
    </span>
  </button>
</template>
