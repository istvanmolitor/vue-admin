<script setup lang="ts">
import { toastStore } from '../../lib/toastService'
import Icon from './Icon.vue'

const getIconName = (type: string) => {
  switch (type) {
    case 'success': return 'CheckCircle2'
    case 'error': return 'AlertCircle'
    case 'warning': return 'AlertTriangle'
    case 'info': return 'Info'
    default: return 'Bell'
  }
}

const getClasses = (type: string) => {
  switch (type) {
    case 'success': return 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
    case 'error': return 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
    case 'warning': return 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
    case 'info': return 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
    default: return 'bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800'
  }
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
    <TransitionGroup
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-[-20px] opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform translate-x-10 opacity-0"
    >
      <div
        v-for="toast in toastStore.toasts.value"
        :key="toast.id"
        class="pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-lg"
        :class="getClasses(toast.type)"
      >
        <Icon :name="getIconName(toast.type)" class="shrink-0 mt-0.5" :size="20" />
        <div class="flex-1 text-sm font-medium">
          {{ toast.message }}
        </div>
        <button
          @click="toastStore.remove(toast.id)"
          class="shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <Icon name="close" :size="16" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
