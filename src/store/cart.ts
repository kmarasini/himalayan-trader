'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, CartItemSize } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (lotId: string, size: CartItemSize) => void
  updateQuantity: (lotId: string, size: CartItemSize, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  totalItems: () => number
  subtotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.lotId === newItem.lotId && i.size === newItem.size,
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.lotId === newItem.lotId && i.size === newItem.size
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i,
              ),
            }
          }
          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (lotId, size) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.lotId === lotId && i.size === size),
          ),
        }))
      },

      updateQuantity: (lotId, size, quantity) => {
        if (quantity < 1) {
          get().removeItem(lotId, size)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.lotId === lotId && i.size === size ? { ...i, quantity } : i,
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'himalayan-trader-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
