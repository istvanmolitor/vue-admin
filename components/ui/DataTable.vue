<script setup lang="ts" generic="TData">
import { LucideChevronLeft, LucideChevronRight, LucideSearch, LucideArrowUpDown, LucideArrowUp, LucideArrowDown } from 'lucide-vue-next'
import { ref, watch } from 'vue'

export interface Column<TData = any> {
  key: keyof TData | string
  title?: string
  label?: string
  class?: string
  sortable?: boolean
  width?: string
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

const props = defineProps<{
  columns: Column[]
  data: TData[]
  loading?: boolean
  pagination?: PaginationMeta
  searchable?: boolean
  searchPlaceholder?: string
  defaultSort?: string
  defaultDirection?: 'asc' | 'desc'
}>()

const emit = defineEmits<{
  (e: 'fetch', params: { search?: string; sort?: string; direction?: 'asc' | 'desc'; page?: number }): void
}>()

const search = ref('')
const sort = ref(props.defaultSort || '')
const direction = ref<'asc' | 'desc'>(props.defaultDirection || 'asc')

const handleSearch = () => {
  emit('fetch', {
    search: search.value,
    sort: sort.value,
    direction: direction.value,
    page: 1
  })
}

const handleSort = (key: string) => {
  if (sort.value === key) {
    direction.value = direction.value === 'asc' ? 'desc' : 'asc'
  } else {
    sort.value = key
    direction.value = 'asc'
  }
  emit('fetch', {
    search: search.value,
    sort: sort.value,
    direction: direction.value,
    page: 1
  })
}

const handlePageChange = (page: number) => {
  emit('fetch', {
    search: search.value,
    sort: sort.value,
    direction: direction.value,
    page
  })
}

watch(() => search.value, (newValue) => {
  if (newValue === '') {
    handleSearch()
  }
})
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex items-center justify-between">
      <div v-if="searchable" class="relative w-72">
        <LucideSearch class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          v-model="search"
          type="search"
          :placeholder="searchPlaceholder || 'Keresés...'"
          class="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          @keyup.enter="handleSearch"
        />
      </div>
      <slot name="actions"></slot>
    </div>
    <div class="rounded-md border">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&_tr]:border-b">
          <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th
              v-for="column in columns"
              :key="String(column.key)"
              :class="['h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0', column.class]"
              :style="{ width: column.width }"
            >
              <div
                v-if="column.sortable"
                class="flex items-center space-x-2 cursor-pointer select-none"
                @click="handleSort(String(column.key))"
              >
                <span>{{ column.title || column.label }}</span>
                <LucideArrowUpDown v-if="sort !== column.key" class="h-4 w-4" />
                <LucideArrowUp v-else-if="direction === 'asc'" class="h-4 w-4" />
                <LucideArrowDown v-else class="h-4 w-4" />
              </div>
              <template v-else>
                {{ column.title || column.label }}
              </template>
            </th>
          </tr>
        </thead>
        <tbody class="[&_tr:last-child]:border-0">
          <template v-if="loading && data.length === 0">
            <tr>
              <td :colspan="columns.length + ($slots['row-actions'] ? 1 : 0)" class="h-24 text-center align-middle">
                Betöltés...
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="(row, index) in data"
              :key="index"
              class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <td
                v-for="column in columns"
                :key="String(column.key)"
                :class="['p-4 align-middle [&:has([role=checkbox])]:pr-0', column.class]"
              >
                <slot :name="String(column.key)" :row="row">
                  <slot :name="`cell-${String(column.key)}`" :row="row">
                    {{ (row as any)[column.key] }}
                  </slot>
                </slot>
              </td>
              <td v-if="$slots['row-actions']" class="p-4 align-middle text-right">
                <slot name="row-actions" :row="row"></slot>
              </td>
            </tr>
            <tr v-if="data.length === 0">
              <td :colspan="columns.length + ($slots['row-actions'] ? 1 : 0)" class="h-24 text-center align-middle">
                <slot name="empty">
                  Nincs találat.
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div v-if="pagination" class="flex items-center justify-between py-4">
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
  </div>
</template>
