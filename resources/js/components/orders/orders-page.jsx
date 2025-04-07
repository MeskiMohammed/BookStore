"use client"

import { useState, useEffect } from "react"
import { DataTableToolbar, DeleteConfirmationDialog } from "@/components/ui-components"
import { OrderDialog } from "@/components/orders/order-dialog"
import { OrderDetailsDialog } from "@/components/orders/order-details-dialog"

// Mock data
const initialOrders = [
  {
    id: 1,
    user_id: 1,
    montant_totale: 42.97,
    statut: "completed",
    method_paiment: "credit_card",
  },
  {
    id: 2,
    user_id: 2,
    montant_totale: 29.99,
    statut: "processing",
    method_paiment: "paypal",
  },
  {
    id: 3,
    user_id: 3,
    montant_totale: 54.5,
    statut: "pending",
    method_paiment: "bank_transfer",
  },
]

const initialUsers = [
  { id: 1, nom: "Doe", prenom: "John" },
  { id: 2, nom: "Smith", prenom: "Jane" },
  { id: 3, nom: "Johnson", prenom: "Robert" },
]

export function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [filteredOrders, setFilteredOrders] = useState(orders)
  const [users] = useState(initialUsers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)

  useEffect(() => {
    setFilteredOrders(orders)
  }, [orders])

  const handleSearch = (searchTerm) => {
    const filtered = orders.filter((order) => {
      const user = users.find((u) => u.id === order.user_id)
      const userName = user ? `${user.prenom} ${user.nom}` : ""

      return (
        userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.statut.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.method_paiment.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    setFilteredOrders(filtered)
  }

  const handleAddNew = () => {
    setCurrentOrder(null)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (order) => {
    setCurrentOrder(order)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (order) => {
    setCurrentOrder(order)
    setIsDeleteDialogOpen(true)
  }

  const handleViewDetails = (order) => {
    setCurrentOrder(order)
    setIsDetailsDialogOpen(true)
  }

  const confirmDelete = () => {
    if (currentOrder) {
      setOrders(orders.filter((o) => o.id !== currentOrder.id))
      setIsDeleteDialogOpen(false)
    }
  }

  const handleSaveOrder = (order) => {
    if (currentOrder) {
      // Edit existing order
      setOrders(orders.map((o) => (o.id === currentOrder.id ? { ...o, ...order } : o)))
      setIsEditDialogOpen(false)
    } else {
      // Add new order
      const newId = Math.max(0, ...orders.map((o) => o.id)) + 1
      setOrders([...orders, { id: newId, ...order }])
      setIsAddDialogOpen(false)
    }
  }

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId)
    return user ? `${user.prenom} ${user.nom}` : "Unknown User"
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Completed</span>
        )
      case "processing":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Processing</span>
        )
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Pending</span>
        )
      case "cancelled":
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Cancelled</span>
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{status}</span>
        )
    }
  }

  const formatPaymentMethod = (method) => {
    return method
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Orders Management</h2>

      <DataTableToolbar searchPlaceholder="Search orders..." onSearch={handleSearch} onAddNew={handleAddNew} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr className="bg-white border-b">
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{getUserName(order.user_id)}</td>
                  <td className="px-6 py-4">${order.montant_totale.toFixed(2)}</td>
                  <td className="px-6 py-4">{getStatusBadge(order.statut)}</td>
                  <td className="px-6 py-4">{formatPaymentMethod(order.method_paiment)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="font-medium text-blue-600 hover:underline mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(order)}
                      className="font-medium text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(order)} className="font-medium text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <OrderDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleSaveOrder}
        title="Add New Order"
        users={users}
      />

      <OrderDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveOrder}
        title="Edit Order"
        defaultValues={currentOrder}
        users={users}
      />

      <OrderDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        order={currentOrder}
        userName={currentOrder ? getUserName(currentOrder.user_id) : ""}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Order"
        description={`Are you sure you want to delete order #${currentOrder?.id}? This action cannot be undone.`}
      />
    </div>
  )
}

