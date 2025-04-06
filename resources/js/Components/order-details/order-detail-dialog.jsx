"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui-components"

export function OrderDetailDialog({ isOpen, onClose, onSave, title, orders, books, defaultValues }) {
  const [formData, setFormData] = useState({
    commande_id: orders?.[0]?.id || 1,
    livre_id: books?.[0]?.id || 1,
    quantite: 1,
    prix: 0,
  })

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    } else {
      setFormData({
        commande_id: orders?.[0]?.id || 1,
        livre_id: books?.[0]?.id || 1,
        quantite: 1,
        prix: 0,
      })
    }
  }, [defaultValues, orders, books, isOpen])

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
      commande_id: Number.parseInt(formData.commande_id),
      livre_id: Number.parseInt(formData.livre_id),
      quantite: Number.parseInt(formData.quantite),
      prix: Number.parseFloat(formData.prix),
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
        form="orderDetailForm"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Save
      </button>
    </>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <form id="orderDetailForm" onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4">
          <div>
            <label htmlFor="commande_id" className="block mb-2 text-sm font-medium text-gray-900">
              Order
            </label>
            <select
              id="commande_id"
              name="commande_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.commande_id}
              onChange={handleChange}
            >
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  Order #{order.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="livre_id" className="block mb-2 text-sm font-medium text-gray-900">
              Book
            </label>
            <select
              id="livre_id"
              name="livre_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.livre_id}
              onChange={handleChange}
            >
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.libelle}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quantite" className="block mb-2 text-sm font-medium text-gray-900">
              Quantity
            </label>
            <input
              type="number"
              id="quantite"
              name="quantite"
              min="1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.quantite}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="prix" className="block mb-2 text-sm font-medium text-gray-900">
              Price
            </label>
            <input
              type="number"
              id="prix"
              name="prix"
              step="0.01"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.prix}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

