<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from './Button.vue'
import Icon from './Icon.vue'

interface ConfirmDialogProps {
  open?: boolean
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'destructive'
}

const props = withDefaults(defineProps<ConfirmDialogProps>(), {
  open: false,
  title: 'Biztosan törölni szeretné?',
  description: 'Ez a művelet nem vonható vissza.',
  confirmLabel: 'Törlés',
  cancelLabel: 'Mégse',
  variant: 'destructive'
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
  cancel: []
}>()

const isOpen = ref(props.open)

watch(() => props.open, (newValue) => {
  isOpen.value = newValue
})

const close = () => {
  isOpen.value = false
  emit('update:open', false)
}

const handleConfirm = () => {
  emit('confirm')
  close()
}

const handleCancel = () => {
  emit('cancel')
  close()
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    handleCancel()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            class="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            @click.stop
          >
            <div class="flex items-start gap-4">
              <div
                class="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                :class="variant === 'destructive' ? 'bg-red-100' : 'bg-blue-100'"
              >
                <Icon
                  name="trash"
                  :size="24"
                  :class="variant === 'destructive' ? 'text-red-600' : 'text-blue-600'"
                />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  {{ title }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ description }}
                </p>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 mt-6">
              <Button
                variant="outline"
                @click="handleCancel"
              >
                {{ cancelLabel }}
              </Button>
              <Button
                :variant="variant"
                @click="handleConfirm"
              >
                <Icon name="trash" :size="16" class="mr-2" />
                {{ confirmLabel }}
              </Button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>


