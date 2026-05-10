import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ProcessingMethod } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

export function formatPriceFromDollars(dollars: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(dollars)
}

export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100)
}

export function processingLabel(method: ProcessingMethod): string {
  const labels: Record<ProcessingMethod, string> = {
    washed: 'Washed',
    natural: 'Natural',
    honey: 'Honey Process',
    'wet-hulled': 'Wet-Hulled',
  }
  return labels[method]
}

export function processingColor(method: ProcessingMethod): string {
  const colors: Record<ProcessingMethod, string> = {
    washed: 'bg-blue-100 text-blue-800',
    natural: 'bg-red-100 text-red-800',
    honey: 'bg-amber-100 text-amber-800',
    'wet-hulled': 'bg-purple-100 text-purple-800',
  }
  return colors[method]
}

export function scoreColor(score: number): string {
  if (score >= 90) return 'text-green-600'
  if (score >= 87) return 'text-forest-600'
  if (score >= 84) return 'text-himalaya-600'
  return 'text-charcoal-600'
}

export function scoreLabel(score: number): string {
  if (score >= 90) return 'Outstanding'
  if (score >= 87) return 'Excellent'
  if (score >= 84) return 'Very Good'
  return 'Good'
}

export function altitudeLabel(meters: number): string {
  if (meters >= 2000) return 'Ultra-High Altitude'
  if (meters >= 1700) return 'High Altitude'
  if (meters >= 1400) return 'Mid-High Altitude'
  return 'Mid Altitude'
}
