"use client"

import { useState, useEffect } from "react"
import { DataTableToolbar, DeleteConfirmationDialog } from "@/components/ui-components"
import { OrderDetailDialog } from "@/components/order-details/order-detail-dialog"

// Mock data
const initialOrderDetails = [
  {
    id: 1,
    commande_id: 1,
    livre_id: 1,
    quantite: 2,
    prix: 12.99,
  },
  {
    id: 2,
    commande_id: 1,
    livre_id: 2,
    quantite: 1,
    prix: 14.99,
  },
  {
    id: 3,
    commande_id: 2,
    livre_id: 3,
    quantite: 1,
    prix: 18.99,
  },
]

const initialOrders = [
  { id: 1, user_id: 1 },
  { id: 2, user_id: 2 },
  { id: 3, user_id: 3 },
]

const initialBooks = [
  { id: 1, libelle: "The Great Gatsby" },
  { id: 2, libelle: "To Kill a Mockingbird" },
  { id: 3, libelle: "A Brief History of Time" },
]

export function OrderDetailsPage() {
  const [orderDetails, setOrderDetails] = useState(initialOrderDetails)
  const [filteredOrderDetails, setFilteredOrderDetails] = useState(orderDetails)
  const [orders] = useState(initialOrders)
  const [books] = useState(initialBooks)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentOrderDetail, setCurrentOrderDetail] = useState(null)

  useEffect(() => {
    setFilteredOrderDetails(orderDetails)
  }, [orderDetails])

  const handleSearch = (searchTerm) => {
    const filtered = orderDetails.filter((detail) => {
      const book = books.find((b) => b.id === detail.livre_id)
      const bookTitle = book ? book.libelle : ""
      const orderId = detail.commande_id.toString()

      return bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) || orderId.includes(searchTerm)
    })
    setFilteredOrderDetails(filtered)
  }

  const handleAddNew = () => {
    setCurrentOrderDetail(null)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (orderDetail) => {
    setCurrentOrderDetail(orderDetail)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (orderDetail) => {
    setCurrentOrderDetail(orderDetail)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (currentOrderDetail) {
      setOrderDetails(orderDetails.filter((od) => od.id !== currentOrderDetail.id))
      setIsDeleteDialogOpen(false)
    }
  }

  const handleSaveOrderDetail = (orderDetail) => {
    if (currentOrderDetail) {
      // Edit existing order detail
      setOrderDetails(orderDetails.map((od) => (od.id === currentOrderDetail.id ? { ...od, ...orderDetail } : od)))
      setIsEditDialogOpen(false)
    } else {
      // Add new order detail
      const newId = Math.max(0, ...orderDetails.map((od) => od.id)) + 1
      setOrderDetails([...orderDetails, { id: newId, ...orderDetail }])
      setIsAddDialogOpen(false)
    }
  }

  const getBookTitle = (bookId) => {
    const book = books.find((b) => b.id === bookId)
    return book ? book.libelle : "Unknown Book"
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Order Details Management</h2>

      <DataTableToolbar searchPlaceholder="Search order details..." onSearch={handleSearch} onAddNew={handleAddNew} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Book
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Subtotal
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrderDetails.length === 0 ? (
              <tr className="bg-white border-b">
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No order details found
                </td>
              </tr>
            ) : (
              filteredOrderDetails.map((orderDetail) => (
                <tr key={orderDetail.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{orderDetail.id}</td>
                  <td className="px-6 py-4">{orderDetail.commande_id}</td>
                  <td className="px-6 py-4">{getBookTitle(orderDetail.livre_id)}</td>
                  <td className="px-6 py-4">{orderDetail.quantite}</td>
                  <td className="px-6 py-4">${orderDetail.prix.toFixed(2)}</td>
                  <td className="px-6 py-4">${(orderDetail.prix * orderDetail.quantite).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(orderDetail)}
                      className="font-medium text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(orderDetail)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <OrderDetailDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleSaveOrderDetail}
        title="Add New Order Detail"
        orders={orders}
        books={books}
      />

      <OrderDetailDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveOrderDetail}
        title="Edit Order Detail"
        defaultValues={currentOrderDetail}
        orders={orders}
        books={books}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Order Detail"
        description={`Are you sure you want to delete this order detail? This action cannot be undone.`}
      />
    </div>
  )
}

