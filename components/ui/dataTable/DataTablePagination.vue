<script setup lang="ts">
import { LucideChevronLeft, LucideChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'

export interface PaginationMeta {
  current_page: number | number[]
  last_page: number | number[]
  per_page: number
  total: number | number[]
}

const props = defineProps<{
  pagination: PaginationMeta
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const currentPage = computed(() => {
  if (Array.isArray(props.pagination.current_page)) {
    return props.pagination.current_page[0] || 1
  }
  return props.pagination.current_page
})

const lastPage = computed(() => {
  if (Array.isArray(props.pagination.last_page)) {
    return props.pagination.last_page[0] || 1
  }
  return props.pagination.last_page
})

const handlePageChange = (page: number) => {
  emit('change', page)
}

const totalCount = computed(() => {
  if (Array.isArray(props.pagination.total)) {
    return props.pagination.total[0] || 0
  }
  return props.pagination.total
})
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <div class="text-sm text-muted-foreground">
      Összesen {{ totalCount }} találat
    </div>
    <div class="flex items-center space-x-2">
      <button
        class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3"
        :disabled="currentPage === 1 || loading"
        @click="handlePageChange(currentPage - 1)"
      >
        <LucideChevronLeft class="h-4 w-4" />
      </button>
      <div class="text-sm font-medium">
        {{ currentPage }} / {{ lastPage }}
      </div>
      <button
        class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3"
        :disabled="currentPage === lastPage || loading"
        @click="handlePageChange(currentPage + 1)"
      >
        <LucideChevronRight class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
