<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import Icon from './Icon.vue'

const props = defineProps<{
  show: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const sizeStyle = computed(() => ({
  'sm':  '24rem',
  'md':  '28rem',
  'lg':  '32rem',
  'xl':  '36rem',
  '2xl': '95vw',
}[props.size ?? 'lg']))

const close = () => {
  emit('close')
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 transition-opacity" @click="close"></div>

        <!-- Modal Content -->
        <div
          class="relative w-full transform rounded-lg bg-background shadow-xl transition-all sm:my-8 flex flex-col max-h-[90vh]"
          :style="{ maxWidth: sizeStyle }"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 pb-4 shrink-0">
            <h3 v-if="title" class="text-lg font-semibold leading-6 text-foreground">
              {{ title }}
            </h3>
            <button
              type="button"
              class="rounded-md bg-background text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              @click="close"
            >
              <span class="sr-only">Bezárás</span>
              <Icon name="X" class="h-5 w-5" />
            </button>
          </div>

          <!-- Scrollable body -->
          <div class="overflow-y-auto px-6 py-2 flex-1">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-6 py-4 shrink-0 flex flex-row-reverse gap-2">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
