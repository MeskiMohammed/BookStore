"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui-components"

export function BookDialog({ isOpen, onClose, onSave, title, categories, defaultValues }) {
  const [formData, setFormData] = useState({
    libelle: "",
    description: "",
    auteur: "",
    isbn: "",
    prix: 0,
    stock: 0,
    categorie_id: categories?.[0]?.id || 1,
    editeur: "",
    date_publication: new Date().toISOString().split("T")[0],
    image: "/placeholder.svg?height=100&width=70",
    actif: true,
  })

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    } else {
      setFormData({
        libelle: "",
        description: "",
        auteur: "",
        isbn: "",
        prix: 0,
        stock: 0,
        categorie_id: categories?.[0]?.id || 1,
        editeur: "",
        date_publication: new Date().toISOString().split("T")[0],
        image: "/placeholder.svg?height=100&width=70",
        actif: true,
      })
    }
  }, [defaultValues, categories, isOpen])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
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
        form="bookForm"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Save
      </button>
    </>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="xl" footer={footer}>
      <form id="bookForm" onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label htmlFor="libelle" className="block mb-2 text-sm font-medium text-gray-900">
              Title
            </label>
            <input
              type="text"
              id="libelle"
              name="libelle"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.libelle}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="auteur" className="block mb-2 text-sm font-medium text-gray-900">
              Author
            </label>
            <input
              type="text"
              id="auteur"
              name="auteur"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.auteur}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="isbn" className="block mb-2 text-sm font-medium text-gray-900">
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="editeur" className="block mb-2 text-sm font-medium text-gray-900">
              Publisher
            </label>
            <input
              type="text"
              id="editeur"
              name="editeur"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.editeur}
              onChange={handleChange}
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
          <div>
            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="categorie_id" className="block mb-2 text-sm font-medium text-gray-900">
              Category
            </label>
            <select
              id="categorie_id"
              name="categorie_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.categorie_id}
              onChange={(e) => setFormData((prev) => ({ ...prev, categorie_id: Number.parseInt(e.target.value) }))}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date_publication" className="block mb-2 text-sm font-medium text-gray-900">
              Publication Date
            </label>
            <input
              type="date"
              id="date_publication"
              name="date_publication"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.date_publication}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <input
              id="actif"
              name="actif"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              checked={formData.actif}
              onChange={handleChange}
            />
            <label htmlFor="actif" className="ms-2 text-sm font-medium text-gray-900">
              Active
            </label>
          </div>
        </div>
      </form>
    </Modal>
  )
}

