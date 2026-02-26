<script setup lang="ts" generic="TData">
import { LucideChevronLeft, LucideChevronRight } from 'lucide-vue-next'

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
}>()
</script>

<template>
  <div class="w-full">
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
              {{ column.title || column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="[&_tr:last-child]:border-0">
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
          </tr>
          <tr v-if="data.length === 0 && !loading">
            <td :colspan="columns.length" class="h-24 text-center align-middle">
              <slot name="empty">
                Nincs találat.
              </slot>
            </td>
          </tr>
          <tr v-if="loading">
            <td :colspan="columns.length" class="h-24 text-center align-middle">
              Betöltés...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-end space-x-2 py-4">
      <button
        class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3"
        disabled
      >
        <LucideChevronLeft class="h-4 w-4" />
      </button>
      <button
        class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3"
        disabled
      >
        <LucideChevronRight class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
