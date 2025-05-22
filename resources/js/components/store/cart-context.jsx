"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useToast } from "../ToastContext"
import axios from "axios"

// Create a CartContext
const CartContext = createContext()

// CartProvider component to manage the cart state
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const { showToast } = useToast()

  // Load cart from session on initial render
  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await axios.get('/cart')
        setCartItems(Object.values(response.data.cart))
        if (response.data.flash) {
          showToast(response.data.flash.message, response.data.flash.type)
        }
      } catch (error) {
        console.error('Error loading cart:', error)
        setCartItems([])
      }
    }
    loadCart()
  }, [showToast])

  // Add item to the cart or update quantity if already exists
  const addToCart = useCallback(async (product) => {
    try {
      const response = await axios.post('/cart/add', product)
      setCartItems(Object.values(response.data.cart))
      if (response.data.flash) {
        showToast(response.data.flash.message, response.data.flash.type)
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      showToast('Erreur lors de l\'ajout au panier', 'error')
    }
  }, [showToast])

  // Update quantity of an item in the cart
  const updateCartItemQuantity = useCallback(async (productId, quantity) => {
    try {
      const response = await axios.put(`/cart/update/${productId}`, { quantity })
      setCartItems(Object.values(response.data.cart))
      if (response.data.flash) {
        showToast(response.data.flash.message, response.data.flash.type)
      }
    } catch (error) {
      console.error('Error updating cart:', error)
      showToast('Erreur lors de la mise à jour du panier', 'error')
    }
  }, [showToast])

  // Remove item from the cart
  const removeFromCart = useCallback(async (productId) => {
    try {
      const response = await axios.delete(`/cart/remove/${productId}`)
      setCartItems(Object.values(response.data.cart))
      if (response.data.flash) {
        showToast(response.data.flash.message, response.data.flash.type)
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
      showToast('Erreur lors de la suppression du produit', 'error')
    }
  }, [showToast])

  // Clear the entire cart
  const clearCart = useCallback(async () => {
    try {
      const response = await axios.delete('/cart/clear')
      setCartItems([])
      if (response.data.flash) {
        showToast(response.data.flash.message, response.data.flash.type)
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
      showToast('Erreur lors du vidage du panier', 'error')
    }
  }, [showToast])

  // Calculate total price of the items in the cart
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.prix * item.quantity, 0)
  }, [cartItems])

  const value = {
    cartItems,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to access the CartContext
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

