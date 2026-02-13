import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Visszaadja az alkalmazás alap URL-jét (SERVER_URL)
export function getBackandUrl(): string {
  return import.meta.env.BACKAND_URL || 'http://127.0.0.1';
}
