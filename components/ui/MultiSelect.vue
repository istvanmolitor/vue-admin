<script setup lang="ts">
import { ref, computed } from 'vue'

interface Item {
  id: number | string
  [key: string]: any
}

const props = defineProps<{
  modelValue: (number | string)[]
  items: Item[]
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  labelField?: string
  valueField?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: (number | string)[]): void
}>()

const search = ref('')
const isOpen = ref(false)

const labelKey = computed(() => props.labelField || 'label')
const valueKey = computed(() => props.valueField || 'id')

const filteredItems = computed(() => {
  if (!search.value) return props.items
  const q = search.value.toLowerCase()
  return props.items.filter(item =>
    String(item[labelKey.value] ?? '').toLowerCase().includes(q)
  )
})

const selectedLabels = computed(() => {
  return props.items
    .filter(item => props.modelValue.includes(item[valueKey.value] as number | string))
    .map(item => item[labelKey.value])
    .join(', ')
})

const isSelected = (item: Item) => props.modelValue.includes(item[valueKey.value] as number | string)

const toggle = (item: Item) => {
  const val = item[valueKey.value] as number | string
  const current = [...props.modelValue]
  const idx = current.indexOf(val)
  if (idx === -1) {
    current.push(val)
  } else {
    current.splice(idx, 1)
  }
  emit('update:modelValue', current)
}
</script>

<template>
  <div class="relative">
    <div v-if="label" class="text-sm font-medium mb-1">{{ label }}</div>
    <button
      type="button"
      class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      @click="isOpen = !isOpen"
    >
      <span v-if="modelValue.length > 0" class="truncate">{{ selectedLabels }}</span>
      <span v-else class="text-muted-foreground">{{ placeholder || 'Válassz...' }}</span>
      <svg class="h-4 w-4 opacity-50 ml-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md"
    >
      <div class="p-2">
        <input
          v-model="search"
          type="text"
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          :placeholder="searchPlaceholder || 'Keresés...'"
        />
      </div>
      <div class="max-h-48 overflow-auto p-1">
        <div v-if="filteredItems.length === 0" class="py-2 px-3 text-sm text-muted-foreground">
          {{ emptyMessage || 'Nincs találat.' }}
        </div>
        <button
          v-for="item in filteredItems"
          :key="item[valueKey]"
          type="button"
          class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
          @click="toggle(item)"
        >
          <svg v-if="isSelected(item)" class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span v-else class="h-4 w-4 shrink-0" />
          {{ item[labelKey] }}
        </button>
      </div>
    </div>

    <div v-if="isOpen" class="fixed inset-0 z-40" @click="isOpen = false" />
  </div>
</template>

