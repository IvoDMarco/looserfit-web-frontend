import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  title: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
  stock: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, newQuantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          
          if (existingItem) {
            // Check stock limits
            const newQuantity = Math.min(existingItem.quantity + item.quantity, item.stock)
            return {
              items: state.items.map((i) => 
                i.id === item.id ? { ...i, quantity: newQuantity } : i
              )
            }
          }
          
          return { items: [...state.items, item] }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id)
        }))
      },

      updateQuantity: (id, newQuantity) => {
        set((state) => ({
          items: state.items.map((i) => {
            if (i.id === id) {
              const validQuantity = Math.max(1, Math.min(newQuantity, i.stock))
              return { ...i, quantity: validQuantity }
            }
            return i
          })
        }))
      },

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'looserfit-cart-storage'
    }
  )
)
