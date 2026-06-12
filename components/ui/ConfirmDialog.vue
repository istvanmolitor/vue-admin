<script setup lang="ts">
import Button from './button/Button.vue'
import CancelButton from './button/CancelButton.vue'
import Icon from './Icon.vue'
import Modal from './Modal.vue'

withDefaults(defineProps<{
  show: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
}>(), {
  title: 'Megerősítés',
  message: 'Biztosan végrehajtod ezt a műveletet?',
  confirmText: 'Rendben',
  cancelText: 'Mégse',
  variant: 'default',
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const close = (): void => {
  emit('close')
}

const confirm = (): void => {
  emit('confirm')
}
</script>

<template>
  <Modal :show="show" :title="title" @close="close">
    <div class="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/40 p-5">
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-80"
        :class="variant === 'destructive'
          ? 'bg-gradient-to-r from-red-500/10 via-orange-500/10 to-transparent'
          : 'bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-transparent'"
      />

      <div class="relative flex flex-col items-start gap-4 sm:flex-row">
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
          :class="variant === 'destructive'
            ? 'border-red-200 bg-red-50 text-red-600'
            : 'border-sky-200 bg-sky-50 text-sky-600'"
        >
          <Icon :name="variant === 'destructive' ? 'AlertTriangle' : 'ShieldCheck'" class="h-5 w-5" />
        </div>

        <div class="min-w-0 flex-1 space-y-2">
          <p class="max-h-[45vh] overflow-y-auto whitespace-pre-wrap break-words text-sm leading-6 text-foreground [overflow-wrap:anywhere] pr-1">
            {{ message }}
          </p>
          <p
            class="break-words text-xs font-medium uppercase tracking-[0.18em] [overflow-wrap:anywhere]"
            :class="variant === 'destructive' ? 'text-red-500' : 'text-sky-600'"
          >
            {{ variant === 'destructive' ? 'Végleges művelet' : 'Megerősítés szükséges' }}
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <Button :variant="variant === 'destructive' ? 'destructive' : 'default'" @click="confirm">
        {{ confirmText }}
      </Button>
      <CancelButton @click="close">
        {{ cancelText }}
      </CancelButton>
    </template>
  </Modal>
</template>