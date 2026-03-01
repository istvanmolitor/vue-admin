<script setup lang="ts" generic="TData">
import { ref } from 'vue'
import Icon from '../Icon.vue'
import DataTablePagination from './DataTablePagination.vue'
import DataTableSearch from './DataTableSearch.vue'

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
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex items-center justify-between">
      <DataTableSearch
        v-if="searchable"
        v-model="search"
        :placeholder="searchPlaceholder"
        @search="handleSearch"
      />
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
                <Icon v-if="sort !== String(column.key)" name="ArrowUpDown" class="h-4 w-4" />
                <Icon v-else-if="direction === 'asc'" name="ArrowUp" class="h-4 w-4" />
                <Icon v-else name="ArrowDown" class="h-4 w-4" />
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
    <DataTablePagination
      v-if="pagination"
      :pagination="pagination"
      :loading="loading"
      @change="handlePageChange"
    />
  </div>
</template>
