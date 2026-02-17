<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from './Button.vue'

interface DevErrorModalProps {
  open?: boolean
  error?: any
}

const props = withDefaults(defineProps<DevErrorModalProps>(), {
  open: false,
  error: null
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isOpen = ref(props.open)
const errorDetails = ref<string>('')

watch(() => props.open, (newValue) => {
  isOpen.value = newValue
})

watch(() => props.error, (newError) => {
  if (newError) {
    errorDetails.value = formatError(newError)
  }
})

const formatError = (error: any): string => {
  if (!error) return 'Unknown error'

  let details = ''

  // Axios error response
  if (error.response) {
    details += `Status: ${error.response.status}\n`
    details += `URL: ${error.config?.url || 'N/A'}\n`
    details += `Method: ${error.config?.method?.toUpperCase() || 'N/A'}\n\n`

    if (error.response.data) {
      if (typeof error.response.data === 'string') {
        details += `Response:\n${error.response.data}`
      } else {
        details += `Response:\n${JSON.stringify(error.response.data, null, 2)}`
      }
    }

    // Add request payload if exists
    if (error.config?.data) {
      try {
        const requestData = typeof error.config.data === 'string'
          ? JSON.parse(error.config.data)
          : error.config.data
        details += `\n\nRequest Payload:\n${JSON.stringify(requestData, null, 2)}`
      } catch {
        details += `\n\nRequest Payload:\n${error.config.data}`
      }
    }
  } else if (error.message) {
    details = error.message
  } else if (typeof error === 'string') {
    details = error
  } else {
    details = JSON.stringify(error, null, 2)
  }

  return details
}

const close = () => {
  isOpen.value = false
  emit('update:open', false)
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    close()
  }
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(errorDetails.value)
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
        class="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
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
            class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-red-200 bg-red-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-red-900">
                    🚨 Development Error
                  </h3>
                  <p class="text-sm text-red-700">
                    Server-side error detected
                  </p>
                </div>
              </div>
              <button
                @click="close"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Error Content -->
            <div class="flex-1 overflow-auto p-6">
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-auto font-mono whitespace-pre-wrap break-words">{{ errorDetails }}</pre>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between gap-3 p-6 border-t bg-gray-50">
              <div class="text-xs text-gray-500">
                This modal only appears in development mode
              </div>
              <div class="flex gap-3">
                <Button
                  variant="outline"
                  @click="copyToClipboard"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </Button>
                <Button
                  variant="default"
                  @click="close"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

