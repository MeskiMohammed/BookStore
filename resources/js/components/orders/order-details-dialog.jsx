"use client"

import { Modal } from "@/components/ui-components"

export function OrderDetailsDialog({ isOpen, onClose, order, userName }) {
  if (!order) return null

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
    <Modal isOpen={isOpen} onClose={onClose} title="Order Details" footer={footer}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
          {getStatusBadge(order.statut)}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium text-gray-900">{userName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-medium text-gray-900">${order.montant_totale.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="font-medium text-gray-900">{formatPaymentMethod(order.method_paiment)}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-500 mb-2">Order Items</p>
          <p className="text-center text-gray-500">
            This is a demo. In a real application, order items would be displayed here.
          </p>
        </div>
      </div>
    </Modal>
  )
}

