"use client"

import { Modal } from "@/components/ui-components"

export function BookDetailsDialog({ isOpen, onClose, book, categoryName }) {
  if (!book) return null

  const footer = (
    <button
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
      onClick={onClose}
    >
      Close
    </button>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Details" size="lg" footer={footer}>
      <div className="grid md:grid-cols-[200px_1fr] gap-6">
        <div>
          <img
            src={book.image || "/placeholder.svg"}
            alt={book.libelle}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{book.libelle}</h3>
            <p className="text-gray-500">by {book.auteur}</p>
          </div>

          <div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${book.actif ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
            >
              {book.actif ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-gray-900">{book.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ISBN</p>
              <p className="text-gray-900">{book.isbn}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Publisher</p>
              <p className="text-gray-900">{book.editeur}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-gray-900">${book.prix.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Stock</p>
              <p className="text-gray-900">{book.stock} units</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="text-gray-900">{categoryName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Publication Date</p>
              <p className="text-gray-900">{new Date(book.date_publication).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

