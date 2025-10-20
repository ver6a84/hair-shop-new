'use client'

import { createContext, useContext } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems, isReady] = useLocalStorage('cart', [])

  const addToCart = (productData) => {
    const { product_id, variantId, name, price, image, article, quantity = 1, color} = productData
    const cartItemId = `${product_id}-${variantId}`

    const existingItemIndex = cartItems.findIndex(item => item.id === cartItemId)

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems]
      updatedItems[existingItemIndex].quantity += quantity
      setCartItems(updatedItems)
    } else {
      const newItem = {
        id: cartItemId,
        product_id,
        variantId,
        name,
        price,
        image,
        article,
        quantity,
        color
      }
      setCartItems([...cartItems, newItem])
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const value = {
    cartItems,
    total,
    itemCount,
    isReady,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
