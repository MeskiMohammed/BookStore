import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';
import BooksBG from '@/../images/BooksBG.jpg';
import { useCart } from '@/components/store/cart-context';

function Catalogue({ livres = { data: [], links: [] }, categories = [], filters = {} }) {
  const { addToCart } = useCart();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(filters?.categorie ? [filters.categorie] : []);
  const [priceRange, setPriceRange] = useState({
    min: filters?.prix_min || 0,
    max: filters?.prix_max || 7000
  });

  const handleAddToCart = (book) => {
    addToCart({
      id: book.id,
      titre: book.libelle,
      prix: book.prix,
      image: book.image,
      quantity: 1
    });
  };

  const handleFilter = () => {
    router.get(route('catalogue.index'), {
      categorie: selectedCategories.length > 0 ? selectedCategories[0] : null,
      prix_min: priceRange.min,
      prix_max: priceRange.max,
      sort: filters.sort,
      direction: filters.direction
    }, {
      preserveState: true,
      preserveScroll: true
    });
    setShowFilters(false);
  };

  const handleSort = (sort, direction) => {
    router.get(route('catalogue.index'), {
      ...filters,
      sort,
      direction
    }, {
      preserveState: true,
      preserveScroll: true
    });
  };

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
            <h2 className='mt-3 text-xl font-semibold text-gray-900 sm:text-2xl'>Livres</h2>
          </div>
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => setShowFilters(true)}
              type='button'
              className='flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto'
            >
              <svg className='-ms-0.5 me-2 h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                <path stroke='currentColor' strokeLinecap='round' strokeWidth='2' d='M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z' />
              </svg>
              Filters
              <svg className='-me-0.5 ms-2 h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 9-7 7-7-7' />
              </svg>
            </button>
            <div className="relative">
              <button
                type='button'
                className='flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto'
              >
                <svg className='-ms-0.5 me-2 h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4' />
                </svg>
                Sort
                <svg className='-me-0.5 ms-2 h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 9-7 7-7-7' />
                </svg>
              </button>
              <div className='absolute right-0 z-50 mt-2 w-40 divide-y divide-gray-100 rounded-lg bg-white shadow'>
                <ul className='p-2 text-left text-sm font-medium text-gray-500'>
                  <li>
                    <button
                      onClick={() => handleSort('libelle', 'asc')}
                      className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    >
                      Titre A-Z
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSort('prix', 'asc')}
                      className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    >
                      Prix croissant
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSort('prix', 'desc')}
                      className='group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    >
                      Prix décroissant
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-4 xl:grid-cols-5'>
          {livres.data.map((book) => (
            <div key={book.id} className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
              <div className='h-56 w-full'>
                <Link href={route('catalogue.show', book.id)}>
                  <img className='mx-auto h-full object-contain' src={book.image} alt={book.libelle} />
                </Link>
              </div>
              <div className='pt-6'>
                <Link href={route('catalogue.show', book.id)} className='text-base font-semibold leading-tight text-gray-900 hover:underline'>
                  {book.libelle}
                </Link>
                <p className='text-sm font-medium text-gray-500 mt-2'>{book.auteur}</p>
                <div className='mt-4 flex items-center justify-between gap-4'>
                  <p className='text-lg font-bold leading-tight text-blue-600'>{book.prix}€</p>
                  <button
                    onClick={() => handleAddToCart(book)}
                    type='button'
                    className='inline-flex items-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors'
                  >
                    <svg className='-ms-0 h-5 w-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav className="flex justify-between items-center gap-x-1" aria-label="Pagination">
          {livres.links.map((link, i) => (
            <div key={i} className="flex items-center gap-x-1">
              {link.label === '&laquo; Previous' ? (
                <Link
                  href={link.url}
                  className={`min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!link.url}
                >
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                  <span aria-hidden="true" className="hidden sm:block">Previous</span>
                </Link>
              ) : link.label === 'Next &raquo;' ? (
                <Link
                  href={link.url}
                  className={`min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!link.url}
                >
                  <span aria-hidden="true" className="hidden sm:block">Next</span>
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </Link>
              ) : (
                <Link
                  href={link.url}
                  className={`min-h-8 min-w-8 flex justify-center items-center border border-gray-200 text-gray-800 py-1 px-3 text-sm rounded-full focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none ${link.active ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Filter Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filtres</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Catégories</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([category.id]);
                            } else {
                              setSelectedCategories([]);
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-900">
                          {category.nom}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Prix</h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="min-price" className="block text-sm text-gray-700">
                        Prix minimum: {priceRange.min}€
                      </label>
                      <input
                        type="range"
                        id="min-price"
                        min="0"
                        max="7000"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label htmlFor="max-price" className="block text-sm text-gray-700">
                        Prix maximum: {priceRange.max}€
                      </label>
                      <input
                        type="range"
                        id="max-price"
                        min="0"
                        max="7000"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleFilter}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </StoreLayout>
  );
}

export default Catalogue;
