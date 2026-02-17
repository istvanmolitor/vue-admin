import { ref } from 'vue'

interface DevErrorState {
  isOpen: boolean
  error: any
}

const state = ref<DevErrorState>({
  isOpen: false,
  error: null
})

export function useDevError() {
  const showDevError = (error: any) => {
    // Only show in development mode
    if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
      console.error('🚨 Dev Error:', error)
      state.value = {
        isOpen: true,
        error
      }
    } else {
      // In production, just log to console
      console.error('Error:', error)
    }
  }

  const closeDevError = () => {
    state.value = {
      isOpen: false,
      error: null
    }
  }

  return {
    devErrorState: state,
    showDevError,
    closeDevError
  }
}

