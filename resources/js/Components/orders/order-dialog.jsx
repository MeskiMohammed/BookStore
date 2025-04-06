"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui-components"

export function OrderDialog({ isOpen, onClose, onSave, title, users, defaultValues }) {
  const [formData, setFormData] = useState({
    user_id: users?.[0]?.id || 1,
    montant_totale: 0,
    statut: "pending",
    method_paiment: "credit_card",
  })

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    } else {
      setFormData({
        user_id: users?.[0]?.id || 1,
        montant_totale: 0,
        statut: "pending",
        method_paiment: "credit_card",
      })
    }
  }, [defaultValues, users, isOpen])

  const handleChange = (e) => {
    const { name, value, type } = e.target

    if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      user_id: Number.parseInt(formData.user_id),
      montant_totale: Number.parseFloat(formData.montant_totale),
    })
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
        form="orderForm"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Save
      </button>
    </>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <form id="orderForm" onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4">
          <div>
            <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-900">
              Customer
            </label>
            <select
              id="user_id"
              name="user_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.user_id}
              onChange={handleChange}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.prenom} {user.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="montant_totale" className="block mb-2 text-sm font-medium text-gray-900">
              Total Amount
            </label>
            <input
              type="number"
              id="montant_totale"
              name="montant_totale"
              step="0.01"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.montant_totale}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="statut" className="block mb-2 text-sm font-medium text-gray-900">
              Status
            </label>
            <select
              id="statut"
              name="statut"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.statut}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label htmlFor="method_paiment" className="block mb-2 text-sm font-medium text-gray-900">
              Payment Method
            </label>
            <select
              id="method_paiment"
              name="method_paiment"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.method_paiment}
              onChange={handleChange}
            >
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  )
}

