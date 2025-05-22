'use client';

import AdminLayout from '@/Layouts/AdminLayout';
import { Link, usePage } from '@inertiajs/react';

export default function App(props) {
  // Get stats and recentData from props (inertia provides these from the controller)
  const { stats = {}, recentData = {} } = props;
  const { totalBooks = 0, totalUsers = 0, totalOrders = 0, totalCategories = 0 } = stats;
  // For latest books, use recentData.recentBooks or fallback to []
  const latestBooks = (recentData.recentBooks || []).slice(0, 5);
  const recentOrders = (recentData.recentOrders || []).slice(0, 5);

  return (
    <AdminLayout>
      <div className='p-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
          <div className='flex items-center h-24 rounded bg-white border border-gray-200 shadow p-4'>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mr-4'>
              <svg className='w-6 h-6 text-blue-600' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z' clipRule='evenodd'></path>
              </svg>
            </div>
            <div>
              <div className='text-sm font-medium text-gray-500'>Total Books</div>
              <div className='text-2xl font-semibold text-gray-900'>{totalBooks}</div>
            </div>
          </div>
          <div className='flex items-center h-24 rounded bg-white border border-gray-200 shadow p-4'>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-green-100 mr-4'>
              <svg className='w-6 h-6 text-green-600' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd'></path>
              </svg>
            </div>
            <div>
              <div className='text-sm font-medium text-gray-500'>Total Users</div>
              <div className='text-2xl font-semibold text-gray-900'>{totalUsers}</div>
            </div>
          </div>
          <div className='flex items-center h-24 rounded bg-white border border-gray-200 shadow p-4'>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 mr-4'>
              <svg className='w-6 h-6 text-yellow-600' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd'></path>
              </svg>
            </div>
            <div>
              <div className='text-sm font-medium text-gray-500'>Total Orders</div>
              <div className='text-2xl font-semibold text-gray-900'>{totalOrders}</div>
            </div>
          </div>
          <div className='flex items-center h-24 rounded bg-white border border-gray-200 shadow p-4'>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 mr-4'>
              <svg className='w-6 h-6 text-purple-600' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z' clipRule='evenodd'></path>
              </svg>
            </div>
            <div>
              <div className='text-sm font-medium text-gray-500'>Total Categories</div>
              <div className='text-2xl font-semibold text-gray-900'>{totalCategories}</div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
          <div className='p-4 bg-white border border-gray-200 rounded-lg shadow'>
            <div className='flex items-center justify-between mb-4'>
              <h5 className='text-xl font-bold leading-none text-gray-900'>Latest Books</h5>
              <Link href='/admin/books' className='text-sm font-medium text-blue-600 hover:underline'>
                View all
              </Link>
            </div>
            <div className='flow-root'>
              <ul role='list' className='divide-y divide-gray-200 h-64 overflow-hidden'>
                {latestBooks.length === 0 ? (
                  <>
                    <li className='py-3 sm:py-4 text-gray-500'>No books found.</li>
                    {Array(4).fill(null).map((_, idx) => (
                      <li key={"empty-book-" + idx} className='py-3 sm:py-4 opacity-0 select-none'>
                        <div className='flex items-center space-x-4'>
                          <div className='flex-shrink-0 w-8 h-12'></div>
                          <div className='flex-1 min-w-0'></div>
                          <div className='inline-flex items-center text-base font-semibold'></div>
                        </div>
                      </li>
                    ))}
                  </>
                ) : (
                  [...latestBooks, ...Array(5 - latestBooks.length).fill(null)].map((book, idx) => (
                    book ? (
                      <li key={book.id} className='py-3 sm:py-4'>
                        <div className='flex items-center space-x-4'>
                          <div className='flex-shrink-0'>
                            <img className='w-8 h-12 object-cover' src={book.image || '/placeholder.svg?height=100&width=70'} alt='Book cover' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-900 truncate'>{book.libelle}</p>
                            <p className='text-sm text-gray-500 truncate'>{book.auteur}</p>
                          </div>
                          <div className='inline-flex items-center text-base font-semibold text-gray-900'>${book.prix?.toFixed(2) ?? '0.00'}</div>
                        </div>
                      </li>
                    ) : (
                      <li key={"empty-" + idx} className='py-3 sm:py-4 opacity-0 select-none'>
                        <div className='flex items-center space-x-4'>
                          <div className='flex-shrink-0 w-8 h-12'></div>
                          <div className='flex-1 min-w-0'></div>
                          <div className='inline-flex items-center text-base font-semibold'></div>
                        </div>
                      </li>
                    )
                  ))
                )}
              </ul>
            </div>
          </div>
          <div className='p-4 bg-white border border-gray-200 rounded-lg shadow'>
            <div className='flex items-center justify-between mb-4'>
              <h5 className='text-xl font-bold leading-none text-gray-900'>Recent Orders</h5>
              <Link href='/admin/orders' className='text-sm font-medium text-blue-600 hover:underline'>
                View all
              </Link>
            </div>
            <div className='flow-root'>
              <ul role='list' className='divide-y divide-gray-200 h-64 overflow-hidden'>
                {recentOrders.length === 0 ? (
                  <>
                    <li className='py-3 sm:py-4 text-gray-500'>No orders found.</li>
                    {Array(4).fill(null).map((_, idx) => (
                      <li key={"empty-order-" + idx} className='py-3 sm:py-4 opacity-0 select-none'>
                        <div className='flex items-center space-x-4'>
                          <div className='flex-shrink-0 w-8 h-8'></div>
                          <div className='flex-1 min-w-0'></div>
                          <div className='inline-flex items-center text-base font-semibold'></div>
                        </div>
                      </li>
                    ))}
                  </>
                ) : (
                  [...recentOrders, ...Array(5 - recentOrders.length).fill(null)].map((order, idx) => (
                    order ? (
                      <li key={order.id} className='py-3 sm:py-4'>
                        <div className='flex items-center space-x-4'>
                          <div className='flex-shrink-0'>
                            <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center'>
                              <span className='text-blue-600 font-medium text-sm'>{order.user?.name ? order.user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}</span>
                            </div>
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-900 truncate'>Order #{order.id}</p>
                            <p className='text-sm text-gray-500 truncate'>{order.user?.name || 'Unknown'}</p>
                          </div>
                          <div className='inline-flex items-center text-base font-semibold text-gray-900'>${order.montant_totale?.toFixed(2) ?? '0.00'}</div>
                        </div>
                      </li>
                    ) : (
                      <li key={"empty-order-" + idx} className='py-3 sm:py-4 opacity-0 select-none'>
                        <div className='flex items-center space-x-4'>
                          <div className='flex-shrink-0 w-8 h-8'></div>
                          <div className='flex-1 min-w-0'></div>
                          <div className='inline-flex items-center text-base font-semibold'></div>
                        </div>
                      </li>
                    )
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
