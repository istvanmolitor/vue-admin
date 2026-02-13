<script setup lang="ts">
import { ref } from 'vue'
import EditButton from './EditButton.vue'
import DeleteButton from './DeleteButton.vue'
import ConfirmDialog from './ConfirmDialog.vue'

interface RowActionsProps {
  showEdit?: boolean
  showDelete?: boolean
  editLabel?: string
  deleteLabel?: string
  editIconName?: string
  deleteIconName?: string
  showEditIcon?: boolean
  showDeleteIcon?: boolean
  deleteConfirmTitle?: string
  deleteConfirmDescription?: string
  deleteConfirmLabel?: string
}

const props = withDefaults(defineProps<RowActionsProps>(), {
  showEdit: true,
  showDelete: true,
  editLabel: 'Szerkesztés',
  deleteLabel: 'Törkés',
  editIconName: 'pen-line',
  deleteIconName: 'trash',
  showEditIcon: true,
  showDeleteIcon: true,
  deleteConfirmTitle: 'Biztosan törölni szeretné?',
  deleteConfirmDescription: 'Ez a művelet nem vonható vissza.',
  deleteConfirmLabel: 'Törlés'
})

const emit = defineEmits<{
  edit: []
  delete: []
}>()

const showConfirmDialog = ref(false)

const handleDeleteClick = () => {
  showConfirmDialog.value = true
}

const handleDeleteConfirm = () => {
  emit('delete')
}
</script>

<template>
  <div class="flex items-center justify-end gap-2">
    <EditButton
      v-if="showEdit"
      :label="editLabel"
      :icon-name="editIconName"
      :show-icon="showEditIcon"
      @click="$emit('edit')"
    />
    <DeleteButton
      v-if="showDelete"
      :label="deleteLabel"
      :icon-name="deleteIconName"
      :show-icon="showDeleteIcon"
      @click="handleDeleteClick"
    />
  </div>

  <ConfirmDialog
    v-model:open="showConfirmDialog"
    :title="deleteConfirmTitle"
    :description="deleteConfirmDescription"
    :confirm-label="deleteConfirmLabel"
    @confirm="handleDeleteConfirm"
  />
</template>

