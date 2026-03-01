<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../Icon.vue'
import Modal from '../Modal.vue'
import Button from './Button.vue'
import CancelButton from './CancelButton.vue'

defineProps<{
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleConfirm = () => {
  emit('confirm')
  closeModal()
}
</script>

<template>
  <div class="inline-block">
    <Button
      type="button"
      :variant="variant || 'destructive'"
      :size="size || 'icon-sm'"
      @click="openModal"
    >
      <slot>
        <Icon name="delete" class="h-4 w-4" />
      </slot>
    </Button>

    <Modal
      :show="showModal"
      :title="title || 'Törlés megerősítése'"
      @close="closeModal"
    >
      <p class="text-sm text-muted-foreground">
        {{ message || 'Biztosan törölni szeretné ezt az elemet? Ez a művelet nem vonható vissza.' }}
      </p>

      <template #footer>
        <Button
          variant="destructive"
          @click="handleConfirm"
        >
          {{ confirmText || 'Törlés' }}
        </Button>
        <CancelButton @click="closeModal">
          {{ cancelText || 'Mégse' }}
        </CancelButton>
      </template>
    </Modal>
  </div>
</template>
