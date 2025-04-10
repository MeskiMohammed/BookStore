import { useState } from "react"

const mockPurchases = [
  {
    id: "ORD-12345",
    date: "2023-04-15",
    total: 42.99,
    status: "Delivered",
    items: [
      { title: "The Great Gatsby", price: 12.99, quantity: 1 },
      { title: "To Kill a Mockingbird", price: 15.0, quantity: 2 },
    ],
  },
  {
    id: "ORD-12346",
    date: "2023-03-22",
    total: 29.95,
    status: "Delivered",
    items: [
      { title: "1984", price: 9.99, quantity: 1 },
      { title: "Animal Farm", price: 7.99, quantity: 1 },
      { title: "The Hobbit", price: 11.97, quantity: 1 },
    ],
  },
  {
    id: "ORD-12347",
    date: "2023-02-10",
    total: 18.99,
    status: "Delivered",
    items: [
      { title: "Pride and Prejudice", price: 8.99, quantity: 1 },
      { title: "Jane Eyre", price: 10.0, quantity: 1 },
    ],
  },
]

export default function PurchaseHistory() {
  const [expandedOrder, setExpandedOrder] = useState(null)

  const toggleOrderDetails = () => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Historique des achats</h2>

      {mockPurchases.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Vous n'avez pas encore effectué d'achats.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockPurchases.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{order.status}</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedOrder === order.id ? "transform rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <h3 className="font-medium mb-2">Commande articles.</h3>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <p>{item.title}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
