<script setup lang="ts">
import EditButton from './button/EditButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import IconButton from './button/IconButton.vue'

withDefaults(defineProps<{
  showShow?: boolean
  showEdit?: boolean
  showDelete?: boolean
}>(), {
  showShow: false,
  showEdit: true,
  showDelete: true,
})

const emit = defineEmits<{
  (e: 'show'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()
</script>

<template>
  <div class="flex items-center justify-end gap-1">
    <IconButton
      v-if="showShow"
      icon="Eye"
      title="Megtekintés"
      @click="emit('show')"
    />
    <EditButton
      v-if="showEdit"
      @click="emit('edit')"
    />
    <DeleteButton
      v-if="showDelete"
      @confirm="emit('delete')"
    />
  </div>
</template>

