<script setup lang="ts">
import { LucideSearch } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
}>()

const internalValue = ref(props.modelValue)
let timeout: any = null

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue
})

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)

  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    emit('search')
  }, 300)
})

const handleEnter = () => {
  if (timeout) clearTimeout(timeout)
  emit('search')
}
</script>

<template>
  <div class="relative w-72">
    <LucideSearch class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    <input
      v-model="internalValue"
      type="search"
      :placeholder="placeholder || 'Keresés...'"
      class="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      @keyup.enter="handleEnter"
    />
  </div>
</template>
