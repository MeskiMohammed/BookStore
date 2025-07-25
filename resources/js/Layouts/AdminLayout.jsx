'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { url, auth } = usePage().props;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navbar */}
      <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button onClick={toggleSidebar} type='button' className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'>
                <span className='sr-only'>Open sidebar</span>
                <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path clipRule='evenodd' fillRule='evenodd' d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'></path>
                </svg>
              </button>
              <Link href='/admin' className='flex ml-2 md:mr-24'>
                <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap'>Bookstore Admin</span>
              </Link>
            </div>
            <div className='flex items-center'>
              <Link href='/' className='text-sm text-blue-600 hover:underline mr-4'>
                View Store
              </Link>
              <div className='flex items-center ml-3 relative' ref={dropdownRef}>
                <button type='button' onClick={() => setOpen(!open)} className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300' aria-expanded={open}>
                  <span className='sr-only'>Open user menu</span>
                  <img className='w-8 h-8 rounded-full' src='https://flowbite.com/docs/images/people/profile-picture-5.jpg' alt='user' />
                </button>

                {open && (
                  <div className='absolute right-0 top-full mt-2 w-48 z-50 bg-gray-50 border border-black divide-y divide-gray-100 rounded-lg shadow-sm'>
                    <div className='px-4 py-3'>
                      <p className='text-sm text-gray-900'>{auth.user.prenom} {auth.user.nom}</p>
                      <p className='text-sm font-medium text-gray-900 truncate'>{auth.user.email}</p>
                    </div>
                    <ul className='py-1'>
                      <li>
                        <Link to={route('dashboard')} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to='/profile' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <span
                          onClick={() => {
                            router.post('/logout');
                          }}
                          className='bloc cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                          Sign out
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 md:translate-x-0`}>
        <div className='h-full px-3 pb-4 overflow-y-auto bg-white'>
          <ul className='space-y-2 font-medium'>
            <li>
              <Link href={route('dashboard')} className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${url === '/admin' ? 'bg-gray-100' : ''}`}>
                <svg className={`w-5 h-5  transition duration-75  ${url === '/admin' ? 'group:text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 22 21'>
                  <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                  <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                </svg>
                <span className='ml-3'>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href={route('books.index')} className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${url === '/admin/books' ? 'bg-gray-100' : ''}`}>
                <svg className={`w-5 h-5  transition duration-75  ${url === '/admin/books' ? 'group:text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 18 20'>
                  <path d='M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z' />
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Books</span>
              </Link>
            </li>
            <li>
              <Link href={route('categories.index')} className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${url === '/admin/categories' ? 'bg-gray-100' : ''}`}>
                <svg className={`w-5 h-5  transition duration-75  ${url === '/admin/categories' ? 'group:text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z' />
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Categories</span>
              </Link>
            </li>
            <li>
              <Link href={route('reviews.index')} className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${url === '/admin/reviews' ? 'bg-gray-100' : ''}`}>
                <svg className={`w-5 h-5  transition duration-75  ${url === '/admin/reviews' ? 'group:text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 18'>
                  <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Reviews</span>
              </Link>
            </li>
            <li>
              <Link href={route('users.index')} className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${url === '/admin/users' ? 'bg-gray-100' : ''}`}>
                <svg className={`w-5 h-5  transition duration-75  ${url === '/admin/users' ? 'group:text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 18'>
                  <path d='M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z' />
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Users</span>
              </Link>
            </li>
            <li>
              <Link href={route('orders.index')} className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${url === '/admin/orders' ? 'bg-gray-100' : ''}`}>
                <svg className={`w-5 h-5  transition duration-75  ${url === '/admin/orders' ? 'group:text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 18 20'>
                  <path d='M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z' />
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Orders</span>
              </Link>
            </li>
            <li>
              <Link href={route('contacts.index') || '/admin/contacts'} className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${url === '/admin/contacts' ? 'bg-gray-100' : ''}`}>
                <svg className='w-5 h-5 transition duration-75 text-gray-500 group-hover:text-gray-900' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M21 10.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l2.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6A8.38 8.38 0 0112 3.5a8.5 8.5 0 018.5 8.5z' />
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className={`p-4 md:ml-64 mt-14`}>{children}</div>
    </div>
  );
}
