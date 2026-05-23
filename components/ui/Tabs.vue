<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@admin/lib/utils'

interface TabsItem {
  key: string
  label: string
  disabled?: boolean
}

const props = defineProps<{
  class?: HTMLAttributes['class']
  modelValue: string
  items: TabsItem[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const activeTabKey = computed(() => {
  const tabExists = props.items.some((item) => item.key === props.modelValue && item.disabled !== true)

  if (tabExists) {
    return props.modelValue
  }

  return props.items.find((item) => item.disabled !== true)?.key ?? ''
})

const selectTab = (key: string): void => {
  if (props.items.some((item) => item.key === key && item.disabled !== true)) {
    emit('update:modelValue', key)
  }
}
</script>

<template>
  <div :class="cn('space-y-4', props.class)">
    <div class="border-b">
      <div class="-mb-px flex flex-wrap items-center gap-2">
        <button
          v-for="item in props.items"
          :key="item.key"
          type="button"
          :disabled="item.disabled"
          class="inline-flex items-center border-b-2 px-2 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          :class="[
            activeTabKey === item.key
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground',
          ]"
          @click="selectTab(item.key)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <slot :active-key="activeTabKey" />
  </div>
</template>

