<script setup lang="ts">
import { LucideChevronLeft, LucideChevronRight } from 'lucide-vue-next'

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

defineProps<{
  pagination: PaginationMeta
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const handlePageChange = (page: number) => {
  emit('change', page)
}
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <div class="text-sm text-muted-foreground">
      Összesen {{ pagination.total }} találat
    </div>
    <div class="flex items-center space-x-2">
      <button
        class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3"
        :disabled="pagination.current_page === 1 || loading"
        @click="handlePageChange(pagination.current_page - 1)"
      >
        <LucideChevronLeft class="h-4 w-4" />
      </button>
      <div class="text-sm font-medium">
        {{ pagination.current_page }} / {{ pagination.last_page }}
      </div>
      <button
        class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3"
        :disabled="pagination.current_page === pagination.last_page || loading"
        @click="handlePageChange(pagination.current_page + 1)"
      >
        <LucideChevronRight class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
