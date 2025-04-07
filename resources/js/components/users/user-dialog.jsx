"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui-components"

export function UserDialog({ isOpen, onClose, onSave, title, defaultValues }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    email: "",
    password: "",
  })

  const [isNewUser, setIsNewUser] = useState(true)

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        ...defaultValues,
        password: "", // Clear password for security
      })
      setIsNewUser(false)
    } else {
      setFormData({
        nom: "",
        prenom: "",
        adresse: "",
        email: "",
        password: "",
      })
      setIsNewUser(true)
    }
  }, [defaultValues, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // If editing and password is empty, use the original password
    if (!isNewUser && !formData.password && defaultValues) {
      onSave({
        ...formData,
        password: defaultValues.password,
      })
    } else {
      onSave(formData)
    }
  }

  const footer = (
    <>
      <button
        type="button"
        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
        onClick={onClose}
      >
        Cancel
      </button>
      <button
        type="submit"
        form="userForm"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Save
      </button>
    </>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <form id="userForm" onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="adresse" className="block mb-2 text-sm font-medium text-gray-900">
              Address
            </label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.adresse}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              {isNewUser ? "Password" : "New Password (leave empty to keep current)"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.password}
              onChange={handleChange}
              required={isNewUser}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

