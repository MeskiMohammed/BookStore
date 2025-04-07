"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create a CartContext
const CartContext = createContext()

// CartProvider component to manage the cart state
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Add item to the cart or update quantity if already exists
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }
        return updatedItems
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  // Update quantity of an item in the cart
  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return prevItems.filter((item) => item.id !== productId)
      }

      // Update quantity
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    })
  }

  // Remove item from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([])
  }

  // Calculate total price of the items in the cart
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.prix * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to access the CartContext
export function useCart() {
  return useContext(CartContext)
}

