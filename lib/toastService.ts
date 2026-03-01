export const toastService = {
  success: (message: string) => {
    console.log('Toast SUCCESS:', message)
    // You could integrate with a toast library here in the future
  },
  error: (message: string) => {
    console.error('Toast ERROR:', message)
  },
  info: (message: string) => {
    console.info('Toast INFO:', message)
  },
  warning: (message: string) => {
    console.warn('Toast WARNING:', message)
  }
}
