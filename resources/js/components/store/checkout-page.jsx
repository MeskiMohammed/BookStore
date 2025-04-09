"use client"

import { useState } from "react"
import { Link, router } from "@inertiajs/react"
import { useCart } from "@/components/store/cart-context"

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "credit_card",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real app, you would submit the order to your backend
      alert("Order placed successfully!")
      clearCart()
      router.visit("/")
    }
  }

  if (!cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>
          <p className="mt-4 text-gray-500">Your cart is empty.</p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.firstName ? "border-red-500" : ""}`}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.lastName ? "border-red-500" : ""}`}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.address ? "border-red-500" : ""}`}
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.city ? "border-red-500" : ""}`}
                        />
                        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                        Postal code
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.postalCode ? "border-red-500" : ""}`}
                        />
                        {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.country ? "border-red-500" : ""}`}
                        />
                        {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="credit_card"
                        name="paymentMethod"
                        type="radio"
                        value="credit_card"
                        checked={formData.paymentMethod === "credit_card"}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="credit_card" className="ml-3 block text-sm font-medium text-gray-700">
                        Credit Card
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                        PayPal
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="bank_transfer"
                        name="paymentMethod"
                        type="radio"
                        value="bank_transfer"
                        checked={formData.paymentMethod === "bank_transfer"}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="bank_transfer" className="ml-3 block text-sm font-medium text-gray-700">
                        Bank Transfer
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

              <div className="mt-6 flow-root">
                <ul role="list" className="-my-4 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center space-x-4 py-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.libelle}
                          className="h-16 w-16 rounded-md object-cover object-center"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.libelle}</p>
                        <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                      </div>
                      <div className="flex-shrink-0 text-sm font-medium text-gray-900">
                        ${(item.prix * item.quantity).toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${getCartTotal().toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <dt className="text-sm text-gray-600">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <dt className="text-sm text-gray-600">Tax</dt>
                  <dd className="text-sm font-medium text-gray-900">${(getCartTotal() * 0.1).toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${(getCartTotal() + 5 + getCartTotal() * 0.1).toFixed(2)}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

