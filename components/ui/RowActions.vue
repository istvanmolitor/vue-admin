<script setup lang="ts">
import { ref } from 'vue'
import ShowButton from './button/ShowButton.vue'
import EditButton from './button/EditButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import ConfirmDialog from './ConfirmDialog.vue'

interface RowActionsProps {
  showShow?: boolean
  showEdit?: boolean
  showDelete?: boolean
  showLabel?: string
  editLabel?: string
  deleteLabel?: string
  showIconName?: string
  editIconName?: string
  deleteIconName?: string
  showShowIcon?: boolean
  showEditIcon?: boolean
  showDeleteIcon?: boolean
  deleteConfirmTitle?: string
  deleteConfirmDescription?: string
  deleteConfirmLabel?: string
}

const props = withDefaults(defineProps<RowActionsProps>(), {
  showShow: true,
  showEdit: true,
  showDelete: true,
  showLabel: 'Megtekintés',
  editLabel: 'Szerkesztés',
  deleteLabel: 'Törkés',
  showIconName: 'eye',
  editIconName: 'pen-line',
  deleteIconName: 'trash',
  showShowIcon: true,
  showEditIcon: true,
  showDeleteIcon: true,
  deleteConfirmTitle: 'Biztosan törölni szeretné?',
  deleteConfirmDescription: 'Ez a művelet nem vonható vissza.',
  deleteConfirmLabel: 'Törlés'
})

const emit = defineEmits<{
  show: []
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
    <ShowButton
      v-if="showShow"
      :label="showLabel"
      :icon-name="showIconName"
      :show-icon="showShowIcon"
      @click="$emit('show')"
    />
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

