import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastMessage {
  id: number
  type: ToastType
  message: string
}

const DEFAULT_DURATION = 4000
const toasts = ref<ToastMessage[]>([])
let toastId = 0

const remove = (id: number): void => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

const pushToast = (type: ToastType, message: string, duration = DEFAULT_DURATION): number => {
  toastId += 1
  const id = toastId

  toasts.value.push({ id, type, message })

  if (duration > 0) {
    setTimeout(() => {
      remove(id)
    }, duration)
  }

  return id
}

export const toastStore = {
  toasts,
  remove,
  clear: (): void => {
    toasts.value = []
  },
}

export const toastService = {
  success: (message: string, duration?: number): number => pushToast('success', message, duration),
  error: (message: string, duration?: number): number => pushToast('error', message, duration),
  info: (message: string, duration?: number): number => pushToast('info', message, duration),
  warning: (message: string, duration?: number): number => pushToast('warning', message, duration),
}
