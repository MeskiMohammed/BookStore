"use client"
// import { a } from "react-router-dom"

export default function AdminDashboard() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center h-24 rounded bg-white border border-gray-200 shadow p-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mr-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Total Books</div>
            <div className="text-2xl font-semibold text-gray-900">3</div>
          </div>
        </div>
        <div className="flex items-center h-24 rounded bg-white border border-gray-200 shadow p-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 mr-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Total Users</div>
            <div className="text-2xl font-semibold text-gray-900">3</div>
          </div>
        </div>
        <div className="flex items-center h-24 rounded bg-white border border-gray-200 shadow p-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 mr-4">
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Total Orders</div>
            <div className="text-2xl font-semibold text-gray-900">3</div>
          </div>
        </div>
        <div className="flex items-center h-24 rounded bg-white border border-gray-200 shadow p-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 mr-4">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Total Categories</div>
            <div className="text-2xl font-semibold text-gray-900">3</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900">Latest Books</h5>
            <a to="/admin/books" className="text-sm font-medium text-blue-600 hover:underline">
              View all
            </a>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-12 object-cover"
                      src="/placeholder.svg?height=100&width=70"
                      alt="Book cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">The Great Gatsby</p>
                    <p className="text-sm text-gray-500 truncate">F. Scott Fitzgerald</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">$12.99</div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-12 object-cover"
                      src="/placeholder.svg?height=100&width=70"
                      alt="Book cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">To Kill a Mockingbird</p>
                    <p className="text-sm text-gray-500 truncate">Harper Lee</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">$14.99</div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-12 object-cover"
                      src="/placeholder.svg?height=100&width=70"
                      alt="Book cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">A Brief History of Time</p>
                    <p className="text-sm text-gray-500 truncate">Stephen Hawking</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">$18.99</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900">Recent Orders</h5>
            <a to="/admin/orders" className="text-sm font-medium text-blue-600 hover:underline">
              View all
            </a>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">JD</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Order #1</p>
                    <p className="text-sm text-gray-500 truncate">John Doe</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">$42.97</div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-medium text-sm">JS</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Order #2</p>
                    <p className="text-sm text-gray-500 truncate">Jane Smith</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">$29.99</div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-medium text-sm">RJ</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Order #3</p>
                    <p className="text-sm text-gray-500 truncate">Robert Johnson</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">$54.50</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

