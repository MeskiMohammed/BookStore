import React from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import BooksBG from '@/../images/BooksBG.jpg';
import books from '@/TempData/books.json';

function Catalogue() {
  return (
    <StoreLayout>
      <section className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Breadcrumb */}
          <div className='h-80 rounded text-center flex items-center justify-center' style={{ backgroundImage: `url(${BooksBG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className='text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl'>Catalogue</h1>
          </div>
          {/* End Breadcrumb */}
          {/* <!-- Heading & Filters --> */}
          <div className='mb-4 py-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8'>
            <div>
              <h2 className='mt-3 text-xl font-semibold text-gray-900  sm:text-2xl'>Livres</h2>
            </div>
            <div className='flex items-center space-x-4'>
              <button data-modal-toggle='filterModal' data-modal-target='filterModal' type='button' className='flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100       sm:w-auto'>
                <svg className='-ms-0.5 me-2 h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                  <path stroke='currentColor' strokeLinecap='round' strokeWidth='2' d='M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z' />
                </svg>
                Filters
                <svg className='-me-0.5 ms-2 h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 9-7 7-7-7' />
                </svg>
              </button>
              <button id='sortDropdownButton1' data-dropdown-toggle='dropdownSort1' type='button' className='flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100       sm:w-auto'>
                <svg className='-ms-0.5 me-2 h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4' />
                </svg>
                Sort
                <svg className='-me-0.5 ms-2 h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 9-7 7-7-7' />
                </svg>
              </button>
              <div id='dropdownSort1' className='z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow ' data-popper-placement='bottom'>
                <ul className='p-2 text-left text-sm font-medium text-gray-500 ' aria-labelledby='sortDropdownButton'>
                  <li>
                    <a href='#' className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900   '>
                      {' '}
                      Les plus populair{' '}
                    </a>
                  </li>
                  <li>
                    <a href='#' className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900   '>
                      {' '}
                      Recents{' '}
                    </a>
                  </li>
                  <li>
                    <a href='#' className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900   '>
                      {' '}
                      Prix ​​croissant {' '}
                    </a>
                  </li>
                  <li>
                    <a href='#' className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900   '>
                      {' '}
                      Prix ​​décroissant{' '}
                    </a>
                  </li>
                  <li>
                    <a href='#' className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900   '>
                      {' '}
                      No. avis{' '}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-4 xl:grid-cols-5'>
            {/* produits list */}
            {books.bestSellers.map((book) => (

            <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm  '>
              <div className='h-56 w-full'>
                <a href='#'>
                  <img className='mx-auto h-full ' src={book.coverImage} alt='' />
                </a>
              </div>
              <div className='pt-6'>
                <a href='#' className=' text-base font-semibold leading-tight text-gray-900 hover:underline '>
                  {book.title}
                </a>
                <p className='text-sm font-medium text-gray-500 mt-2'>{book.author}</p>
                <div className='mt-2 flex items-center gap-2'>
                  <div className='flex items-center'>
                    <svg className='h-4 w-4 text-yellow-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z' />
                    </svg>

                    <svg className='h-4 w-4 text-yellow-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z' />
                    </svg>

                    <svg className='h-4 w-4 text-yellow-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z' />
                    </svg>

                    <svg className='h-4 w-4 text-yellow-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z' />
                    </svg>

                    <svg className='h-4 w-4 text-yellow-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z' />
                    </svg>
                  </div>

                  <p className='text-sm font-medium text-gray-900 '>5.0</p>
                </div>
                <div className='mt-4 flex items-center justify-between gap-4'>
                  <p className='text-lg font-bold leading-tight text-blue-600 '>{book.price}</p>
                  <button type='button' className='inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300   '>
                    <svg className='-ms-0 h-5 w-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            ))}
            {/* end produits list */}
          </div>
      {/* <!-- Pagination --> */}
      <nav className="flex justify-between items-center gap-x-1" aria-label="Pagination">
        <button type="button" className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none    " aria-label="Previous">
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
            </svg>
            <span aria-hidden="true" className="hidden sm:block">Previous</span>
        </button>
        <div className="flex items-center gap-x-1">
            <span className="min-h-8 min-w-8 flex justify-center items-center border border-gray-200 text-gray-800 py-1 px-3 text-sm rounded-full focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   ">1</span>
            <span className="min-h-8 flex justify-center items-center text-gray-500 py-1.5 px-1.5 text-sm ">of</span>
            <span className="min-h-8 flex justify-center items-center text-gray-500 py-1.5 px-1.5 text-sm ">3</span>
        </div>
        <button type="button" className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none    ">
            <span aria-hidden="true" className="hidden sm:block">Next</span>
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"></path>
            </svg>
        </button>
        </nav>
    {/* <!-- End Pagination --> */}

        {/* <!-- Filter modal --> */}
        <form action='#' method='get' id='filterModal' tabIndex='-1' aria-hidden='true' className='fixed left-0 right-0 top-0 z-50 hidden h-modal w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full'>
          <div className='relative h-full w-full max-w-xl md:h-auto'>
            {/* <!-- Modal content --> */}
            <div className='relative rounded-lg bg-white shadow '>
              {/* <!-- Modal header --> */}
              <div className='flex items-start justify-between rounded-t p-4 md:p-5'>
                <h3 className='text-lg font-normal text-gray-500 '>Filters</h3>
                <button type='button' className='ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900  ' data-modal-toggle='filterModal'>
                  <svg className='h-5 w-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18 17.94 6M18 18 6.06 6' />
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
              </div>
            {/* <!-- Modal body --> */}
            <div className='px-4 md:px-5'>
            <div className='mb-4 border-b border-gray-200'>
            <ul className='flex flex-wrap -mb-px text-sm font-medium text-center' id='myTab' data-tabs-toggle='#myTabContent' role='tablist'>
            <li className='mr-2' role='presentation'>
                <button className='inline-block p-4 border-b-2 rounded-t-lg' id='author-tab' data-tabs-target='#author' type='button' role='tab' aria-controls='author' aria-selected='false'>
                Auteurs
                </button>
            </li>
            <li className='mr-2' role='presentation'>
                <button className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300' id='genre-tab' data-tabs-target='#genre' type='button' role='tab' aria-controls='genre' aria-selected='false'>
                Genres
                </button>
            </li>
            <li className='mr-2' role='presentation'>
                <button className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300' id='advanced-filters-tab' data-tabs-target='#advanced-filters' type='button' role='tab' aria-controls='advanced-filters' aria-selected='false'>
                Filtres avancés
                </button>
            </li>
            </ul>
        </div>

            <div id='myTabContent'>
                {/* <!-- Brand Tab Content --> */}
                <div className='block p-4 rounded-lg bg-gray-50' id='author' role='tabpanel' aria-labelledby='author-tab'>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-2'>
                    {books.bestSellers.map((book, index) => (
                    <div key={index} className='flex items-center'>
                        <input id={`author-${index}`} type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500' />
                        <label htmlFor={`author-${index}`} className='ml-2 text-sm font-medium text-gray-900'>
                        {book.author}
                        </label>
                    </div>
                    ))}
                </div>
                </div>

                {/* <!-- Genre Tab Content --> */}
                <div className='hidden p-4 rounded-lg bg-gray-50' id='genre' role='tabpanel' aria-labelledby='genre-tab'>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-2'>
                    {/* <!-- Genre content would go here --> */}
                    {books.bestSellers.map((book, index) => (
                    <div key={index} className='flex items-center'>
                        <input id={`author-${index}`} type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500' />
                        <label htmlFor={`author-${index}`} className='ml-2 text-sm font-medium text-gray-900'>
                        {book.genre}
                        </label>
                    </div>
                    ))}
                </div>
                </div>

                {/* <!-- Advanced Filters Tab Content --> */}
                <div className='hidden p-4 rounded-lg bg-gray-50' id='advanced-filters' role='tabpanel' aria-labelledby='advanced-filters-tab'>
                <div className='space-y-4'>
                    <div className='grid grid-cols-2 gap-3'>
                    <div>
                        <label htmlFor='min-price' className='block text-sm font-medium text-gray-900'>
                        Min prix
                        </label>
                        <input id='min-price' type='range' min='0' max='7000' value='300' step='1' className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200' />
                    </div>

                    <div>
                        <label htmlFor='max-price' className='block text-sm font-medium text-gray-900'>
                        Max prix
                        </label>
                        <input id='max-price' type='range' min='0' max='7000' value='3500' step='1' className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200' />
                    </div>

                    <div className='col-span-2 flex items-center justify-between space-x-2'>
                        <input type='number' id='min-price-input' value='300' min='0' max='7000' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500' required />

                        <div className='shrink-0 text-sm font-medium'>à</div>

                        <input type='number' id='max-price-input' value='3500' min='0' max='7000' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500' required />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

              {/* <!-- Modal footer --> */}
              <div className='flex items-center space-x-4 rounded-b p-4  md:p-5'>
                <button type='submit' className='rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300   '>
                  Afficher les résultats
                </button>
                <button type='reset' className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200      '>
                  Effacer
                </button>
              </div>
            </div>
          </div>

        </form>

      </section>

    </StoreLayout>
  );
}

export default Catalogue;
