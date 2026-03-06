import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the backend URL from environment or default to current origin
 */
export function getBackandUrl(): string {
  return import.meta.env.VITE_BACKEND_URL || window.location.origin
}

/**
 * Development error handler composable
 */
export function useDevError() {
  const showDevError = (error: any) => {
    if (import.meta.env.DEV) {
      console.error('Development Error:', error)
      if (error.response) {
        console.error('Response data:', error.response.data)
        console.error('Response status:', error.response.status)
        console.error('Response headers:', error.response.headers)
      }
    }
  }

  return {
    showDevError
  }
}

