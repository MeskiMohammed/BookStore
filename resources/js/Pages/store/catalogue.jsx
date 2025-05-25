import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';
import BooksBG from '@/../images/BooksBG.jpg';
import { useCart } from '@/components/store/cart-context';

// Helper to get book image or placeholder
function getBookImage(image) {
  if (!image || typeof image !== 'string' || image.trim() === '' || image === 'null' || image === 'undefined') {
    return '/images/books/placeholder.svg';
  }
  return image;
}

function Catalogue({ livres = { data: [], links: [] }, categories = [], filters = {} }) {
  const { addToCart } = useCart();
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(filters?.categorie ? [filters.categorie] : []);
  const [priceRange, setPriceRange] = useState({
    min: filters?.prix_min || 0,
    max: filters?.prix_max || 7000
  });
  const [searchQuery, setSearchQuery] = useState(filters?.search || '');

  const handleAddToCart = (book) => {
    addToCart({
      id: book.id,
      libelle: book.libelle,
      prix: book.prix,
      image: book.image,
      auteur: book.auteur,
      quantity: 1
    });
  };

  const handleFilter = () => {
    const filterData = {
      categorie: selectedCategories.length > 0 ? selectedCategories.join(',') : '',
      prix_min: priceRange.min || 0,
      prix_max: priceRange.max || 7000,
      sort: filters.sort || '',
      direction: filters.direction || '',
      search: searchQuery || ''
    };

    router.visit('/catalogue', {
      method: 'get',
      data: filterData,
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
    setShowFilters(false);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 7000 });
    setSearchQuery('');
    router.visit('/catalogue', {
      method: 'get',
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
    setShowFilters(false);
  };

  const handleSort = (sort, direction) => {
    router.visit('/catalogue', {
      method: 'get',
      data: {
        ...filters,
        sort,
        direction
      },
      preserveState: true,
      preserveScroll: true
    });
    setShowSort(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.visit('/catalogue', {
      method: 'get',
      data: {
        ...filters,
        search: searchQuery
      },
      preserveState: true,
      preserveScroll: true
    });
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategories(prev => {
      const newSelection = prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];
      return newSelection;
    });
  };

  // Add useEffect to sync with URL parameters
  useEffect(() => {
    if (filters?.categorie) {
      setSelectedCategories(filters.categorie.split(',').map(Number));
    }
    if (filters?.prix_min) {
      setPriceRange(prev => ({ ...prev, min: Number(filters.prix_min) }));
    }
    if (filters?.prix_max) {
      setPriceRange(prev => ({ ...prev, max: Number(filters.prix_max) }));
    }
    if (filters?.search) {
      setSearchQuery(filters.search);
    }
  }, [filters]);

  return (
    <StoreLayout>
      <section className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Breadcrumb */}
        <div className='h-80 rounded text-center flex items-center justify-center relative' style={{ backgroundImage: `url(${BooksBG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <h1 className='text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl relative z-10'>Catalogue</h1>
        </div>

        {/* Search Bar */}
        <div className="mt-8 mb-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Rechercher un livre..."
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Filters and Sort */}
        <div className='mb-4 py-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8'>
          <div>
            <h2 className='mt-3 text-xl font-semibold text-gray-900 sm:text-2xl'>
              {livres.data.length} livres trouvés
            </h2>
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
              Filtres
              {selectedCategories.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                  {selectedCategories.length}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                type='button'
                className='flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto'
              >
                <svg className='-ms-0.5 me-2 h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4' />
                </svg>
                Trier
                {filters.sort && (
                  <span className="ml-2 text-xs text-gray-500">
                    ({filters.sort === 'prix' ? 'Prix' : 'Titre'} {filters.direction === 'asc' ? '↑' : '↓'})
                  </span>
                )}
              </button>

              {showSort && (
                <div className='absolute right-0 z-50 mt-2 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                  <ul className='p-2 text-left text-sm font-medium text-gray-500'>
                    <li>
                      <button
                        onClick={() => handleSort('libelle', 'asc')}
                        className={`group inline-flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                          filters.sort === 'libelle' && filters.direction === 'asc' ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        Titre A-Z
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleSort('libelle', 'desc')}
                        className={`group inline-flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                          filters.sort === 'libelle' && filters.direction === 'desc' ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        Titre Z-A
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleSort('prix', 'asc')}
                        className={`group inline-flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                          filters.sort === 'prix' && filters.direction === 'asc' ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        Prix croissant
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleSort('prix', 'desc')}
                        className={`group inline-flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                          filters.sort === 'prix' && filters.direction === 'desc' ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        Prix décroissant
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className='mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-4 xl:grid-cols-5'>
          {livres.data.map((book) => (
            <div key={book.id} className='group rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow'>
              <Link href={`/catalogue/${book.id}`} className='block'>
                <div className='h-56 w-full'>
                  <img className='mx-auto h-full object-contain transition-transform group-hover:scale-105' src={getBookImage(book.image)} alt={book.libelle} />
                </div>
                <div className='pt-6'>
                  <h3 className='text-base font-semibold leading-tight text-gray-900 hover:text-blue-600 transition-colors'>
                    {book.libelle}
                  </h3>
                  <p className='text-sm text-gray-700 mt-2'>Écrit par: {book.auteur}</p>
                  <div className='mt-4 flex justify-between'>
                    <div>
                      {/* Rating */}
                      <div className='flex items-center gap-1 mt-2'>
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${index < Math.round(book.average_rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                          </svg>
                        ))}
                        <span className='text-xs text-gray-500'>({book.avis?.length || 0})</span>
                      </div>
                    </div>
                    <p className='text-sm font-medium text-gray-900'>{book.prix.toFixed(2)}€</p>
                  </div>
                </div>
              </Link>
              <div className='mt-4 flex items-center justify-between gap-4'>
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
          ))}
        </div>

        {/* Pagination */}
        {livres.links.length > 3 && livres.data.length > 0 && (
          <nav className="flex justify-between items-center gap-x-1 mt-8" aria-label="Pagination">
            <div className="flex items-center gap-x-1">
              {livres.links.map((link, i) => {
                if (link.label === '&laquo; Previous') {
                  return (
                    <Link
                      key={i}
                      href={link.url || '#'}
                      preserveScroll
                      className={`min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${
                        !link.url ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-disabled={!link.url}
                    >
                      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                      <span aria-hidden="true" className="hidden sm:block">Précédent</span>
                    </Link>
                  );
                }
                if (link.label === 'Next &raquo;') {
                  return (
                    <Link
                      key={i}
                      href={link.url || '#'}
                      preserveScroll
                      className={`min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${
                        !link.url ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-disabled={!link.url}
                    >
                      <span aria-hidden="true" className="hidden sm:block">Suivant</span>
                      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </Link>
                  );
                }
                // Only show page numbers that are not ellipsis and are within a reasonable range
                if (link.label !== '...' && !isNaN(parseInt(link.label))) {
                  const pageNum = parseInt(link.label);
                  const totalPages = Math.ceil(livres.total / 10);
                  // Only show pages that are close to the current page or are first/last
                  if (pageNum === 1 || pageNum === totalPages ||
                      (pageNum >= parseInt(link.active ? link.label : '1') - 1 &&
                       pageNum <= parseInt(link.active ? link.label : '1') + 1)) {
                    return (
                      <Link
                        key={i}
                        href={link.url || '#'}
                        preserveScroll
                        className={`min-h-8 min-w-8 flex justify-center items-center border border-gray-200 text-gray-800 py-1 px-3 text-sm rounded-full focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none ${
                          link.active ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  }
                }
                return null;
              })}
            </div>
          </nav>
        )}

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

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Catégories</h4>
                <div className="h-48 overflow-y-auto pr-2">
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategorySelect(category.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 truncate">{category.nom}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Prix</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-700 mb-1">Min</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-700 mb-1">Max</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={handleFilter}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Appliquer les filtres
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
