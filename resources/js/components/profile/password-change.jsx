"use client"

import React, { useState } from "react"

export default function PasswordChange() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = () => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
    setSuccess(false)
  }

  const handleSubmit = () => {
    e.preventDefault()

    setError("")
    setSuccess(false)

    if (formData.newPassword.length < 8) {
      setError("Le nouveau mot de passe doit comporter au moins 8 caractères")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas")
      return
    }

    // Here you would typically call an API to change the password
    // For this example, we'll just simulate success
    setSuccess(true)
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Changer le mot de passe</h2>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          Votre mot de passe a été mis à jour avec succès.
        </div>
      )}

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe actuel
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Nouveau mot de passe
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Le mot de passe doit comporter au moins 8 caractères.</p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Mettre à jour le mot de passe
        </button>
      </form>
    </div>
  )
}
