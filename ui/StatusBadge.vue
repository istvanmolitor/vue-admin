<script setup lang="ts">
type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled'

defineProps<{ status: Status }>()

const statusConfig: Record<Status, { label: string; classes: string }> = {
  active:    { label: 'Aktív',       classes: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' },
  inactive:  { label: 'Inaktív',     classes: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
  pending:   { label: 'Függőben',    classes: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400' },
  completed: { label: 'Teljesített', classes: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400' },
  cancelled: { label: 'Törölve',     classes: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400' },
}
</script>

<template>
  <span :class="['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', statusConfig[status].classes]">
    {{ statusConfig[status].label }}
  </span>
</template>

