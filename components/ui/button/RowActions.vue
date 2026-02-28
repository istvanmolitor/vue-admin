<script setup lang="ts">
import { LucidePencil } from 'lucide-vue-next'
import DeleteButton from './DeleteButton.vue'

const props = defineProps<{
  editUrl?: string
}>()

const emits = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <RouterLink
      v-if="editUrl"
      :to="editUrl"
      class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8"
    >
      <LucidePencil class="h-4 w-4" />
    </RouterLink>
    <button
      v-else
      @click="emits('edit')"
      class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8"
    >
      <LucidePencil class="h-4 w-4" />
    </button>
    <DeleteButton
      @confirm="emits('delete')"
    />
  </div>
</template>
