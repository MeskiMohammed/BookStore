"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui-components"

export function ReviewDialog({ isOpen, onClose, onSave, title, users, books, defaultValues }) {
  const [formData, setFormData] = useState({
    user_id: users?.[0]?.id || 1,
    livre_id: books?.[0]?.id || 1,
    note: 5,
    commentaire: "",
  })

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    } else {
      setFormData({
        user_id: users?.[0]?.id || 1,
        livre_id: books?.[0]?.id || 1,
        note: 5,
        commentaire: "",
      })
    }
  }, [defaultValues, users, books, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, note: rating }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      user_id: Number.parseInt(formData.user_id),
      livre_id: Number.parseInt(formData.livre_id),
      note: Number.parseFloat(formData.note),
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
        form="reviewForm"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Save
      </button>
    </>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <form id="reviewForm" onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4">
          <div>
            <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-900">
              User
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
            <label className="block mb-2 text-sm font-medium text-gray-900">Rating: {formData.note}</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingChange(rating)}
                  className="focus:outline-none"
                >
                  <svg
                    className={`w-8 h-8 ${rating <= formData.note ? "text-yellow-300" : "text-gray-300"}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="commentaire" className="block mb-2 text-sm font-medium text-gray-900">
              Comment
            </label>
            <textarea
              id="commentaire"
              name="commentaire"
              rows="3"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={formData.commentaire}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </form>
    </Modal>
  )
}

