<script setup lang="ts" generic="TData">
import { ref, computed, withDefaults, onMounted, watch } from 'vue'
import { createApiClient } from '@user/services/apiClient'
import LoadingSpinner from '@admin/components/ui/LoadingSpinner.vue'
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
  current_page: number | number[]
  last_page: number | number[]
  per_page: number
  total: number | number[]
}

const props = withDefaults(defineProps<{
  url?: string
  extraParams?: Record<string, any>
  columns?: Column[]
  data?: TData[]
  loading?: boolean
  pagination?: PaginationMeta
  searchable?: boolean
  searchPlaceholder?: string
}>(), {
  columns: () => [],
  searchable: true,
  searchPlaceholder: 'Keresés...',
})

const emit = defineEmits<{
  (e: 'fetch', params: { search?: string; sort?: string; direction?: 'asc' | 'desc'; page?: number }): void
}>()

const api = createApiClient()

const internalData = ref<TData[]>([])
const internalColumns = ref<Column[]>([])
const internalPagination = ref<PaginationMeta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 })
const internalLoading = ref(false)
const serverSearchable = ref<boolean | null>(null)
const serverSearchPlaceholder = ref<string | null>(null)

const resolvedData = computed(() => props.url ? internalData.value as TData[] : (props.data ?? []))
const resolvedColumns = computed(() => props.url ? internalColumns.value : props.columns ?? [])
const resolvedLoading = computed(() => props.url ? internalLoading.value : (props.loading ?? false))
const resolvedPagination = computed(() => props.url ? internalPagination.value : props.pagination)
const resolvedSearchable = computed(() => serverSearchable.value !== null ? serverSearchable.value : props.searchable)
const resolvedSearchPlaceholder = computed(() => serverSearchPlaceholder.value ?? props.searchPlaceholder)

const search = ref('')
const sort = ref('')
const direction = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)

const fetchData = async (params: { search?: string; sort?: string; direction?: 'asc' | 'desc'; page?: number } = {}) => {
  if (!props.url) return
  try {
    internalLoading.value = true
    const response = await api.get(props.url, { params: { ...props.extraParams, ...params } })
    const raw = response.data.data
    internalData.value = Array.isArray(raw) ? raw : (raw?.data ?? [])
    if (response.data.meta) {
      internalPagination.value = response.data.meta
    }
    internalColumns.value = (response.data.columns ?? []) as Column[]
    if (response.data.filters) {
      sort.value = response.data.filters.sort ?? sort.value
      direction.value = response.data.filters.direction ?? direction.value
    }
    if (response.data.config) {
      serverSearchable.value = response.data.config.searchable ?? null
      serverSearchPlaceholder.value = response.data.config.search_placeholder ?? null
    }
    if (params.page !== undefined) {
      currentPage.value = params.page
    }
  } finally {
    internalLoading.value = false
  }
}

watch(
  () => props.extraParams,
  () => {
    fetchData({ search: search.value, sort: sort.value, direction: direction.value, page: 1 })
  },
  { deep: true }
)

onMounted(() => {
  if (props.url) {
    fetchData({ sort: sort.value, direction: direction.value, page: 1 })
  }
})

const refresh = () => {
  fetchData({ search: search.value, sort: sort.value, direction: direction.value, page: currentPage.value })
}

defineExpose({ refresh })

const handleSearch = () => {
  if (props.url) {
    currentPage.value = 1
    fetchData({ search: search.value, sort: sort.value, direction: direction.value, page: 1 })
  } else {
    emit('fetch', { search: search.value, sort: sort.value, direction: direction.value, page: 1 })
  }
}

const handleSort = (key: string) => {
  if (sort.value === key) {
    direction.value = direction.value === 'asc' ? 'desc' : 'asc'
  } else {
    sort.value = key
    direction.value = 'asc'
  }
  if (props.url) {
    fetchData({ search: search.value, sort: sort.value, direction: direction.value, page: 1 })
  } else {
    emit('fetch', { search: search.value, sort: sort.value, direction: direction.value, page: 1 })
  }
}

const handlePageChange = (page: number) => {
  if (props.url) {
    currentPage.value = page
    fetchData({ search: search.value, sort: sort.value, direction: direction.value, page })
  } else {
    emit('fetch', { search: search.value, sort: sort.value, direction: direction.value, page })
  }
}
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex items-center justify-between">
      <DataTableSearch
        v-if="resolvedSearchable"
        v-model="search"
        :placeholder="resolvedSearchPlaceholder"
        @search="handleSearch"
      />
      <slot name="actions"></slot>
    </div>
    <div class="rounded-md border">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&_tr]:border-b">
          <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th
              v-for="column in resolvedColumns"
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
            <th v-if="$slots['row-actions']" class="h-12 px-4 text-right align-middle font-medium text-muted-foreground"></th>
          </tr>
        </thead>
        <tbody class="[&_tr:last-child]:border-0">
          <template v-if="resolvedLoading && resolvedData.length === 0">
            <tr>
              <td :colspan="resolvedColumns.length + ($slots['row-actions'] ? 1 : 0)" class="h-24 text-center align-middle">
                <LoadingSpinner label="Betöltés..." />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="(row, index) in resolvedData"
              :key="index"
              class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <td
                v-for="column in resolvedColumns"
                :key="String(column.key)"
                :class="['p-4 align-middle [&:has([role=checkbox])]:pr-0', column.class]"
              >
                <slot :name="String(column.key)" :row="row">
                  <slot :name="`cell-${String(column.key)}`" :row="row">
                    {{ (row as any)[column.key] }}
                  </slot>
                </slot>
              </td>
              <td v-if="$slots['row-actions']" class="p-4 align-middle">
                <div class="flex items-center justify-end gap-2">
                  <slot name="row-actions" :row="row"></slot>
                </div>
              </td>
            </tr>
            <tr v-if="resolvedData.length === 0">
              <td :colspan="resolvedColumns.length + ($slots['row-actions'] ? 1 : 0)" class="h-24 text-center align-middle">
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
      v-if="resolvedPagination"
      :pagination="resolvedPagination"
      :loading="resolvedLoading"
      @change="handlePageChange"
    />
  </div>
</template>
