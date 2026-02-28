<script setup lang="ts">

import DeleteButton from './DeleteButton.vue'
import EditButton from './EditButton.vue'

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
    <EditButton
      :to="editUrl"
      @click="emits('edit')"
    />
    <DeleteButton
      @confirm="emits('delete')"
    />
  </div>
</template>
