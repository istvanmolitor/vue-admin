<script setup lang="ts" generic="T extends { id: number; [key: string]: any }">
import { ref, computed, watch } from 'vue'
import Input from './Input.vue'
import Label from './Label.vue'
import Button from './button/Button.vue'
import Icon from './Icon.vue'

interface Props {
  items: T[]
  modelValue?: number[]
  label?: string
  placeholder?: string
  emptyMessage?: string
  searchPlaceholder?: string
  labelField?: keyof T
  maxDisplayedItems?: number
}

interface Emits {
  (e: 'update:modelValue', value: number[]): void
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'Válassz elemeket...',
  emptyMessage: 'Nincsenek elérhető elemek.',
  searchPlaceholder: 'Keresés...',
  modelValue: () => [],
  labelField: 'name' as any,
  maxDisplayedItems: 3
})

const emit = defineEmits<Emits>()

const searchQuery = ref('')
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// Kiválasztott elemek
const selectedItems = computed(() => {
  return props.items.filter(item => props.modelValue?.includes(item.id))
})

// Szűrt elemek a keresés alapján
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return props.items

  return props.items.filter(item => {
    const label = String(item[props.labelField as keyof T]).toLowerCase()
    return label.includes(query)
  })
})

// Még nem kiválasztott elemek
const availableItems = computed(() => {
  return filteredItems.value.filter(item => !props.modelValue?.includes(item.id))
})

// Megjelenítendő kiválasztott elemek címkéi
const displayedSelectedLabels = computed(() => {
  const labels = selectedItems.value.map(item => String(item[props.labelField as keyof T]))
  if (labels.length <= props.maxDisplayedItems) {
    return labels.join(', ')
  }
  const displayed = labels.slice(0, props.maxDisplayedItems).join(', ')
  const remaining = labels.length - props.maxDisplayedItems
  return `${displayed} +${remaining} további`
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
  }
}

const selectItem = (itemId: number) => {
  const newValue = [...(props.modelValue || [])]
  if (!newValue.includes(itemId)) {
    newValue.push(itemId)
    emit('update:modelValue', newValue)
  }
  searchQuery.value = ''
}

const removeItem = (itemId: number) => {
  const newValue = (props.modelValue || []).filter(id => id !== itemId)
  emit('update:modelValue', newValue)
}

const clearAll = () => {
  emit('update:modelValue', [])
}

const getItemLabel = (item: T): string => {
  return String(item[props.labelField as keyof T])
}

// Click outside to close
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<template>
  <div class="space-y-2">
    <Label v-if="label" class="text-sm font-medium">{{ label }}</Label>

    <div ref="dropdownRef" class="relative">
      <!-- Trigger button -->
      <button
        type="button"
        @click="toggleDropdown"
        class="w-full flex items-center justify-between px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors min-h-10 text-gray-900 dark:text-gray-100"
        :class="{ 'ring-2 ring-blue-500 dark:ring-blue-400': isOpen }"
      >
        <span v-if="selectedItems.length === 0" class="text-gray-500 dark:text-gray-400">
          {{ placeholder }}
        </span>
        <span v-else class="text-left truncate">
          {{ displayedSelectedLabels }}
        </span>
        <Icon :name="isOpen ? 'chevron-up' : 'chevron-down'" class="w-4 h-4 ml-2 shrink-0" />
      </button>

      <!-- Dropdown -->
      <div
        v-if="isOpen"
        class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-xl max-h-80 overflow-hidden flex flex-col"
      >
        <!-- Search input -->
        <div class="p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <Input
            v-model="searchQuery"
            :placeholder="searchPlaceholder"
            class="w-full"
            @click.stop
          />
        </div>

        <!-- Selected items -->
        <div v-if="selectedItems.length > 0" class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div class="p-2 text-xs font-medium text-gray-600 dark:text-gray-400">
            Kiválasztva ({{ selectedItems.length }})
          </div>
          <div class="max-h-32 overflow-y-auto bg-white dark:bg-gray-800">
            <div
              v-for="item in selectedItems"
              :key="item.id"
              class="flex items-center justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors bg-white dark:bg-gray-800"
              @click.stop="removeItem(item.id)"
            >
              <span class="text-sm text-gray-900 dark:text-gray-100">{{ getItemLabel(item) }}</span>
              <Icon name="x" class="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <!-- Available items -->
        <div class="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
          <div v-if="availableItems.length === 0" class="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            {{ searchQuery ? 'Nincs találat' : emptyMessage }}
          </div>
          <div
            v-for="item in availableItems"
            :key="item.id"
            class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm transition-colors text-gray-900 dark:text-gray-100"
            @click.stop="selectItem(item.id)"
          >
            {{ getItemLabel(item) }}
          </div>
        </div>

        <!-- Footer with actions -->
        <div v-if="selectedItems.length > 0" class="border-t border-gray-200 dark:border-gray-700 p-2 flex justify-end bg-gray-50 dark:bg-gray-900">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            @click.stop="clearAll"
          >
            Összes törlése
          </Button>
        </div>
      </div>
    </div>

    <!-- Selected items badges (visible when closed) -->
    <div v-if="selectedItems.length > 0 && !isOpen" class="flex flex-wrap gap-2">
      <div
        v-for="item in selectedItems"
        :key="item.id"
        class="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border border-blue-200 dark:border-blue-700"
      >
        <span>{{ getItemLabel(item) }}</span>
        <button
          type="button"
          @click.stop="removeItem(item.id)"
          class="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-sm p-0.5 transition-colors"
        >
          <Icon name="x" class="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
</template>










