import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import config from '@config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Visszaadja az alkalmazás alap URL-jét (SERVER_URL)
export function getBaseUrl(): string {
  return config.SERVER_URL
}
