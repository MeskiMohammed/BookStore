import React from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import books from '@/TempData/books.json';
import BookSlider from '@/components/book-slider';
import {Link} from '@inertiajs/react';

function DetailsProduct() {
  return (
    <StoreLayout>
      <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
        <section className='py-8 bg-white md:py-16 antialiased'>
          <div className='max-w-screen-xl px-4 mx-auto 2xl:px-0'>
            <div className='lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16'>
              <div className='shrink-0 max-w-md lg:max-w-lg mx-auto'>
                <img className='w-full' src='https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg' alt='Atomic Habits by James Clear' />
              </div>

              <div className='mt-6 sm:mt-8 lg:mt-0'>
                <span className='bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-md'>In Stock</span>
                <h1 className='text-xl font-semibold text-gray-900 mt-3 sm:text-2xl'>Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear</h1>
                <div className='flex flex-col items-start mt-4  sm:gap-4 sm:flex'>
                  <p className='text-2xl font-extrabold text-gray-900 sm:text-3xl '>$16.99</p>
                  <div className='flex items-center gap-2 mt-2 sm:mt-0'>
                    <div className='flex items-center gap-1'>
                      <svg className='w-4 h-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                      </svg>
                      <svg className='w-4 h-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                      </svg>
                      <svg className='w-4 h-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                      </svg>
                      <svg className='w-4 h-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                      </svg>
                      <svg className='w-4 h-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                      </svg>
                    </div>
                    <p className='text-sm font-medium leading-none text-gray-500 '>(5.0)</p>
                    <Link href='#' className='text-sm font-medium leading-none text-gray-900 underline hover:no-underline '>
                      345 Reviews
                    </Link>
                  </div>
                </div>

                <div className='mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8'>
                  <Link href='#' className='flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100'>
                    Return Home
                  </Link>

                  <Link href='#' className='text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center'>
                    Add to cart
                  </Link>

                  <div className='flex gap-2 sm:justify-between items-center'>
                    <label id='Quantity' className=''>
                      Quantity:{' '}
                    </label>
                    <input type='number' id='Quantity' name='Quantity' value='1' min='1' max='10' className='w-20 h-10 p-2 text-sm text-gray-900 rounded-lg border sm:mt-0 outline-none' />
                  </div>
                </div>

                <hr className='my-6 md:my-8 border-gray-200' />

                <p className='mb-6 text-gray-500'>No matter your goals, *Atomic Habits* offers a proven framework htmlFor improving—every day. James Clear, one of the world’s leading experts on habit htmlFormation, reveals practical strategies that will teach you exactly how to htmlForm good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.</p>

                <p className='text-gray-500'>Learn how to: make time htmlFor new habits, overcome a lack of motivation and willpower, design your environment to make success easier, and get back on track when you fall off course.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Review Section */}
        <section className='bg-white py-8 antialiased  md:py-16'>
          <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
            <div className='flex items-center gap-2'>
              <h2 className='text-2xl font-semibold text-gray-900 '>Reviews</h2>

              <div className='mt-2 flex items-center gap-2 sm:mt-0'>
                <div className='flex items-center gap-0.5'>
                  <svg className='h-4 w-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                  </svg>
                  <svg className='h-4 w-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                  </svg>
                  <svg className='h-4 w-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                  </svg>
                  <svg className='h-4 w-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                  </svg>
                  <svg className='h-4 w-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                  </svg>
                </div>
                <p className='text-sm font-medium leading-none text-gray-500 '>(4.6)</p>
                <Link href='#' className='text-sm font-medium leading-none text-gray-900 underline hover:no-underline '>
                  {' '}
                  645 Reviews{' '}
                </Link>
              </div>
            </div>

            <div className='my-6 gap-8 sm:flex sm:items-start md:my-8'>
              <div className='shrink-0 space-y-4'>
                <p className='text-2xl font-semibold leading-none text-gray-900 '>4.65 out of 5</p>
                <button type='button' data-modal-target='review-modal' data-modal-toggle='review-modal' className='mb-2 me-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300   '>
                  Write a review
                </button>
              </div>

              <div className='mt-6 min-w-0 flex-1 space-y-3 sm:mt-0'>
                <div className='flex items-center gap-2'>
                  <p className='w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 '>5</p>
                  <svg className='h-4 w-4 shrink-0 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                  </svg>
                  <div className='h-1.5 w-80 rounded-full bg-gray-200 '>
                    <div className='h-1.5 rounded-full bg-yellow-300' style={{ width: '20%' }}></div>
                  </div>
                  <Link href='#' className='w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline  sm:w-auto sm:text-left'>
                    239 <span className='hidden sm:inline'>reviews</span>
                  </Link>
                </div>

                <div className='flex items-center gap-2'>
                  <p className='w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 '>4</p>
                  <svg className='h-4 w-4 shrink-0 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                  </svg>
                  <div className='h-1.5 w-80 rounded-full bg-gray-200 '>
                    <div className='h-1.5 rounded-full bg-yellow-300' style={{ width: '60%' }}></div>
                  </div>
                  <Link href='#' className='w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline  sm:w-auto sm:text-left'>
                    432 <span className='hidden sm:inline'>reviews</span>
                  </Link>
                </div>

                <div className='flex items-center gap-2'>
                  <p className='w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 '>3</p>
                  <svg className='h-4 w-4 shrink-0 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                  </svg>
                  <div className='h-1.5 w-80 rounded-full bg-gray-200 '>
                    <div className='h-1.5 rounded-full bg-yellow-300' style={{ width: '15%' }}></div>
                  </div>
                  <Link href='#' className='w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline  sm:w-auto sm:text-left'>
                    53 <span className='hidden sm:inline'>reviews</span>
                  </Link>
                </div>

                <div className='flex items-center gap-2'>
                  <p className='w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 '>2</p>
                  <svg className='h-4 w-4 shrink-0 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                  </svg>
                  <div className='h-1.5 w-80 rounded-full bg-gray-200 '>
                    <div className='h-1.5 rounded-full bg-yellow-300' style={{ width: '5%' }}></div>
                  </div>
                  <Link href='#' className='w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline  sm:w-auto sm:text-left'>
                    32 <span className='hidden sm:inline'>reviews</span>
                  </Link>
                </div>

                <div className='flex items-center gap-2'>
                  <p className='w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 '>1</p>
                  <svg className='h-4 w-4 shrink-0 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                  </svg>
                  <div className='h-1.5 w-80 rounded-full bg-gray-200 '>
                    <div className='h-1.5 rounded-full bg-yellow-300' style={{ width: '0%' }}></div>
                  </div>
                  <Link href='#' className='w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline  sm:w-auto sm:text-left'>
                    13 <span className='hidden sm:inline'>reviews</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className='mt-6 divide-y divide-gray-200 '>
              <div className='gap-3 pb-6 sm:flex sm:items-start'>
                <div className='shrink-0 space-y-2 sm:w-48 md:w-72'>
                  <div className='flex items-center gap-0.5'>
                    <svg className='h-4 w-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                    </svg>

                    <svg className='h-4 w-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                    </svg>

                    <svg className='h-4 w-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                    </svg>

                    <svg className='h-4 w-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                    </svg>

                    <svg className='h-4 w-4 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z'></path>
                    </svg>
                  </div>

                  <div className='space-y-0.5'>
                    <p className='text-base font-semibold text-gray-900 '>Micheal Gough</p>
                    <p className='text-sm font-normal text-gray-500 '>November 18 2023 at 15:35</p>
                  </div>
                </div>

                <div className='mt-4 min-w-0 flex-1 space-y-4 sm:mt-0'>
                  <p className='text-base font-normal text-gray-500 '>My old IMAC was from 2013. This replacement was well needed. Very fast, and the colour matches my office set up perfectly. The display is out of this world and I’m very happy with this purchase.</p>
                </div>
              </div>
            </div>

            <div className='mt-6 text-center'>
              <button type='button' className='mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100      '>
                View more reviews
              </button>
            </div>
          </div>
        </section>
        {/* End of Reviews Section */}

        {/* Add Review Modal Section */}
        <div id='review-modal' tabIndex='-1' aria-hidden='true' className='fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 antialiased'>
          <div className='relative max-h-full w-full max-w-2xl p-4'>
            {/* <!-- Modal content --> */}
            <div className='relative rounded-lg bg-white shadow '>
              {/* <!-- Modal header --> */}
              <div className='flex items-center justify-between rounded-t border-b border-gray-200 p-4  md:p-5'>
                <div>
                  <h3 className='mb-1 text-lg font-semibold text-gray-900 '>Add a review for:</h3>
                  <Link href='#' className='font-medium text-primary-700 hover:underline '>
                    Apple iMac 24" All-In-One Computer, Apple M1, 8GB RAM, 256GB SSD
                  </Link>
                </div>
                <button type='button' className='absolute right-5 top-5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900  ' data-modal-toggle='review-modal'>
                  <svg className='h-3 w-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'></path>
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <form className='p-4 md:p-5'>
                <div className='mb-4 grid grid-cols-2 gap-4'>
                  <div className='col-span-2'>
                    <div className='flex items-center'>
                      <svg className='h-6 w-6 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 22 20'>
                        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z'></path>
                      </svg>
                      <svg className='ms-2 h-6 w-6 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 22 20'>
                        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z'></path>
                      </svg>
                      <svg className='ms-2 h-6 w-6 text-yellow-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 22 20'>
                        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z'></path>
                      </svg>
                      <svg className='ms-2 h-6 w-6 text-gray-300 ' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 22 20'>
                        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z'></path>
                      </svg>
                      <svg className='ms-2 h-6 w-6 text-gray-300 ' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 22 20'>
                        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z'></path>
                      </svg>
                      <span className='ms-2 text-lg font-bold text-gray-900 '>3.0 out of 5</span>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 '>
                      Review description
                    </label>
                    <textarea id='description' rows='6' className='mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500      ' required=''></textarea>
                    {/* <p className="ms-auto text-xs text-gray-500 ">Problems with the product or delivery? <Link href="#" className="text-primary-600 hover:underline ">Send a report</Link>.</p> */}
                  </div>
                </div>
                <div className='border-t border-gray-200 pt-4  md:pt-5'>
                  <button type='submit' className='me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300   '>
                    Add review
                  </button>
                  <button type='button' data-modal-toggle='review-modal' className='me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100      '>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End Review Modal Section */}

        <BookSlider title='Meilleures Ventes' books={books.bestSellers} />
      </div>
    </StoreLayout>
  );
}

export default DetailsProduct;
