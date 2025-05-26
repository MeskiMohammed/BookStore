"use client"

import { useState, useEffect } from "react"
import { Link, router, usePage } from "@inertiajs/react"
import { useCart } from "@/components/store/cart-context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faPaypal
} from '@fortawesome/free-brands-svg-icons'

// Helper to get book image or placeholder
function getBookImage(image) {
  if (!image || typeof image !== 'string' || image.trim() === '' || image === 'null' || image === 'undefined') {
    return '/images/books/placeholder.svg';
  }
  return image;
}

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { auth } = usePage().props

  const [formData, setFormData] = useState({
    firstName: auth.user?.prenom || "",
    lastName: auth.user?.nom || "",
    email: auth.user?.email || "",
    address: auth.user?.adresse || "",
    paymentMethod: "credit_card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    paypalEmail: "",
  })

  const [errors, setErrors] = useState({})

  // Pre-fill form data if user is logged in
  useEffect(() => {
    if (auth.user) {
      setFormData(prev => ({
        ...prev,
        firstName: auth.user.prenom || "",
        lastName: auth.user.nom || "",
        email: auth.user.email || "",
        address: auth.user.adresse || "",
      }))
    }
  }, [auth.user])

  const handleChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()
    } else if (name === "cardExpiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .substring(0, 5)
    } else if (name === "cardCvc") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName) newErrors.firstName = "Le prénom est requis"
    if (!formData.lastName) newErrors.lastName = "Le nom est requis"
    if (!formData.email) newErrors.email = "L'email est requis"
    if (!formData.address) newErrors.address = "L'adresse est requise"
    if (!formData.paymentMethod) newErrors.paymentMethod = "La méthode de paiement est requise"

    if (formData.paymentMethod === "credit_card") {
      if (!formData.cardNumber) newErrors.cardNumber = "Le numéro de carte est requis"
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Le numéro de carte doit contenir 16 chiffres"
      }

      if (!formData.cardName) newErrors.cardName = "Le nom sur la carte est requis"

      if (!formData.cardExpiry) newErrors.cardExpiry = "La date d'expiration est requise"
      else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = "Format invalide (MM/AA)"
      }

      if (!formData.cardCvc) newErrors.cardCvc = "Le code CVC est requis"
      else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
        newErrors.cardCvc = "Le code CVC doit contenir 3 ou 4 chiffres"
      }
    } else if (formData.paymentMethod === "paypal") {
      if (!formData.paypalEmail) newErrors.paypalEmail = "L'email PayPal est requis"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.paypalEmail)) {
        newErrors.paypalEmail = "L'email PayPal n'est pas valide"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    console.log('Cart items:', cartItems)

    if (validateForm()) {
      const submitData = {
        ...formData,
        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        cartItems: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          prix: item.prix
        }))
      }

      console.log('Submitting data:', submitData)

      // Add loading state
      const submitButton = document.querySelector('button[type="submit"]')
      if (submitButton) {
        submitButton.disabled = true
        submitButton.textContent = 'Traitement en cours...'
      }

      router.post(route('checkout.store'), submitData, {
        onSuccess: (response) => {
          console.log('Checkout successful:', response)
          clearCart()
          // The redirect will be handled by the backend
        },
        onError: (errors) => {
          console.error('Error response:', errors)
          if (errors.error) {
            setErrors({ general: errors.error })
          } else {
            setErrors(errors)
          }
          // Reset button state
          if (submitButton) {
            submitButton.disabled = false
            submitButton.textContent = 'Passer la commande'
          }
          // Scroll to the top to show errors
          window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        onFinish: () => {
          // Reset button state
          if (submitButton) {
            submitButton.disabled = false
            submitButton.textContent = 'Passer la commande'
          }
        },
        preserveScroll: true,
        preserveState: true
      })
    } else {
      console.log('Form validation failed:', errors)
      // Scroll to the first error
      const firstError = document.querySelector('.border-red-500')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Paiement</h1>
          <p className="mt-4 text-gray-500">Votre panier est vide.</p>
          <Link
            href="/catalogue"
            className="mt-6 inline-block rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Continuer vos achats
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Paiement</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            {errors.general && (
              <div className="mb-6 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Une erreur est survenue
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{errors.general}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Informations de contact</h2>
                {auth.user && (
                  <p className="mt-1 text-sm text-gray-500">
                    Vos informations ont été pré-remplies. Vous pouvez les modifier si nécessaire.
                  </p>
                )}

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      Prénom
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                          errors.firstName ? "border-red-500" : ""
                        } px-4 py-2.5 bg-white border focus:outline-none transition-colors duration-200`}
                        placeholder="Entrez votre prénom"
                      />
                      {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                          errors.lastName ? "border-red-500" : ""
                        } px-4 py-2.5 bg-white border focus:outline-none transition-colors duration-200`}
                        placeholder="Entrez votre nom"
                      />
                      {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Adresse email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                          errors.email ? "border-red-500" : ""
                        } px-4 py-2.5 bg-white border focus:outline-none transition-colors duration-200`}
                        placeholder="Entrez votre adresse email"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900">Adresse de livraison</h2>
                {auth.user && (
                  <p className="mt-1 text-sm text-gray-500">
                    Vous pouvez modifier votre adresse de livraison pour cette commande.
                  </p>
                )}

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Adresse
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                          errors.address ? "border-red-500" : ""
                        } px-4 py-2.5 bg-white border focus:outline-none transition-colors duration-200`}
                        placeholder="Entrez votre adresse complète"
                      />
                      {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900">Méthode de paiement</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Choisissez votre méthode de paiement préférée.
                </p>

                <div className="mt-6 space-y-4">
                  <label className="relative flex items-center p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors duration-200">
                    <input
                      id="credit_card"
                      name="paymentMethod"
                      type="radio"
                      value="credit_card"
                      checked={formData.paymentMethod === "credit_card"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3 flex-1">
                      <span className="block text-sm font-medium text-gray-700">
                        Carte de crédit
                      </span>
                      <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                    </div>
                    <div className="flex space-x-3 text-2xl">
                      <FontAwesomeIcon icon={faCcVisa} className="text-blue-600" />
                      <FontAwesomeIcon icon={faCcMastercard} className="text-red-600" />
                      <FontAwesomeIcon icon={faCcAmex} className="text-blue-800" />
                    </div>
                  </label>

                  {formData.paymentMethod === "credit_card" && (
                    <div className="mt-6 space-y-4 pl-8">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                          Numéro de carte
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                              errors.cardNumber ? "border-red-500" : ""
                            } px-4 py-2.5 bg-white border focus:outline-none transition-colors duration-200`}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                          />
                          {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                          Nom sur la carte
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                              errors.cardName ? "border-red-500" : ""
                            } px-4 py-2.5 bg-white border focus:outline-none transition-colors duration-200`}
                            placeholder="JEAN DUPONT"
                          />
                          {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                            Date d'expiration
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                errors.cardExpiry ? "border-red-500" : ""
                              } px-4 py-2.5 bg-white border focus:outline-none transition-colors duration-200`}
                              placeholder="MM/AA"
                              maxLength="5"
                            />
                            {errors.cardExpiry && <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
                            Code CVC
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="cardCvc"
                              name="cardCvc"
                              value={formData.cardCvc}
                              onChange={handleChange}
                              className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                errors.cardCvc ? "border-red-500" : ""
                              } px-4 py-2.5 bg-white border focus:outline-none transition-colors duration-200`}
                              placeholder="123"
                              maxLength="4"
                            />
                            {errors.cardCvc && <p className="mt-1 text-sm text-red-600">{errors.cardCvc}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <label className="relative flex items-center p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors duration-200">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3 flex-1">
                      <span className="block text-sm font-medium text-gray-700">
                        PayPal
                      </span>
                      <p className="text-sm text-gray-500">Paiement sécurisé via PayPal</p>
                    </div>
                    <FontAwesomeIcon icon={faPaypal} className="text-2xl text-blue-600" />
                  </label>

                  {formData.paymentMethod === "paypal" && (
                    <div className="mt-6 space-y-4 pl-8">
                      <div>
                        <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700">
                          Email PayPal
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            id="paypalEmail"
                            name="paypalEmail"
                            value={formData.paypalEmail}
                            onChange={handleChange}
                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                              errors.paypalEmail ? "border-red-500" : ""
                            } px-4 py-2.5 bg-white border focus:outline-none transition-colors duration-200`}
                            placeholder="votre@email.com"
                          />
                          {errors.paypalEmail && <p className="mt-1 text-sm text-red-600">{errors.paypalEmail}</p>}
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-md">
                        <p className="text-sm text-blue-700">
                          Après avoir cliqué sur "Passer la commande", vous serez redirigé vers PayPal pour finaliser votre paiement.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Passer la commande
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Récapitulatif de la commande</h2>
              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={getBookImage(item.image)} alt={item.libelle} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{item.libelle}</h3>
                        <p className="mt-1 text-sm text-gray-500">Quantité: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">€{(item.prix * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Sous-total</dt>
                  <dd className="text-base font-medium text-gray-900">€{getCartTotal().toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Frais de livraison</dt>
                  <dd className="text-sm font-medium text-gray-900">€5.99</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">TVA (20%)</dt>
                  <dd className="text-sm font-medium text-gray-900">€{(getCartTotal() * 0.20).toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    €{(getCartTotal() + 5.99 + (getCartTotal() * 0.20)).toFixed(2)}
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

