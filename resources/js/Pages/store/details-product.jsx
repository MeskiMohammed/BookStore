import React, { useState } from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import BookSlider from '@/components/book-slider';
import { Link } from '@inertiajs/react';
import { useCart } from '@/components/store/cart-context';

export default function DetailsProduct({ book, relatedBooks }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!book) {
    return (
      <StoreLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </StoreLayout>
    );
  }

  // Calculate average rating safely
  const averageRating = book.average_rating || 0;
  const inStock = book.in_stock ?? (book.stock > 0);
  const reviewsCount = book.avis?.length || 0;

  const handleAddToCart = () => {
    if (book) {
      addToCart({
        id: book.id,
        libelle: book.libelle,
        prix: book.prix,
        image: book.image,
        auteur: book.auteur,
        quantity: quantity
      });
      // Reset quantity to 1 after adding to cart
      setQuantity(1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= book.stock) {
      setQuantity(value);
    }
  };

  return (
    <StoreLayout>
      <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
        <section className='py-8 bg-white md:py-16 antialiased'>
          <div className='max-w-screen-xl px-4 mx-auto 2xl:px-0'>
            <div className='lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16'>
              <div className='shrink-0 max-w-md lg:max-w-lg mx-auto'>
                <img className='w-full' src={book.image} alt={book.libelle} />
              </div>

              <div className='mt-6 sm:mt-8 lg:mt-0'>
                <span className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded-md ${inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {inStock ? 'En stock' : 'Rupture de stock'}
                </span>
                <h1 className='text-xl font-semibold text-gray-900 mt-3 sm:text-2xl'>{book.libelle} by {book.auteur}</h1>
                <div className='flex flex-col items-start mt-4 sm:gap-4 sm:flex'>
                  <div className='flex items-center gap-2 mt-2 sm:mt-0'>
                    <div className='flex items-center gap-1'>
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${index < Math.round(averageRating) ? 'text-yellow-300' : 'text-gray-300'}`}
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                        </svg>
                      ))}
                    </div>
                    <p className='text-sm font-medium leading-none text-gray-500'>({averageRating})</p>
                    <Link href='#reviews' className='text-sm font-medium leading-none text-gray-900 underline hover:no-underline'>
                      {reviewsCount} Avis
                    </Link>
                  </div>
                </div>

                <div className='mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8'>
                  <Link href='/' className='flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100'>
                    Retour à l'accueil
                  </Link>

                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className={`text-white mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                    </svg>
                    Ajouter au panier
                  </button>

                  <div className='flex gap-2 sm:justify-between items-center'>
                    <label htmlFor='Quantity' className='text-sm font-medium text-gray-700'>
                      Quantité:{' '}
                    </label>
                    <input
                      type='number'
                      id='Quantity'
                      name='Quantity'
                      value={quantity}
                      onChange={handleQuantityChange}
                      min='1'
                      max={book.stock}
                      className='w-20 h-10 p-2 text-sm text-gray-900 rounded-lg border sm:mt-0 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                </div>

                <hr className='my-6 md:my-8 border-gray-200' />

                <div className='mb-6'>
                  <p className='text-lg font-semibold mb-2'>Détails du livre:</p>
                  <p className='text-sm text-gray-600 mb-2'>ISBN: {book.isbn}</p>
                  <p className='text-sm text-gray-600 mb-2'>Éditeur: {book.editeur}</p>
                  <p className='text-sm text-gray-600 mb-2'>Date de publication: {new Date(book.date_publication).toLocaleDateString()}</p>
                  <p className='text-sm text-gray-600 mb-2'>Catégorie: {book.categorie?.nom}</p>
                  <p className='text-sm text-gray-600 mb-2'>Prix: {book.prix.toFixed(2)}€</p>
                </div>

                <p className='text-gray-500'>{book.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Review Section */}
        <section id='reviews' className='bg-white py-8 antialiased md:py-16'>
          <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
            <div className='flex items-center gap-2'>
              <h2 className='text-2xl font-semibold text-gray-900'>Avis</h2>
              <div className='mt-2 flex items-center gap-2 sm:mt-0'>
                <div className='flex items-center gap-0.5'>
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${index < Math.round(averageRating) ? 'text-yellow-300' : 'text-gray-300'}`}
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                    </svg>
                  ))}
                </div>
                <p className='text-sm font-medium leading-none text-gray-500'>({averageRating})</p>
                <p className='text-sm font-medium leading-none text-gray-900'>
                  {reviewsCount} Avis
                </p>
              </div>
            </div>

            {/* Reviews list */}
            <div className='mt-6 divide-y divide-gray-200'>
              {book.avis?.map((review) => (
                <div key={review.id} className='py-6'>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1'>
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${index < review.note ? 'text-yellow-300' : 'text-gray-300'}`}
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                        </svg>
                      ))}
                    </div>
                    <div className='space-y-0.5'>
                      <p className='text-base font-semibold text-gray-900'>{review.user?.name || 'Anonymous'}</p>
                      <p className='text-sm font-normal text-gray-500'>
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className='mt-4 min-w-0 flex-1 space-y-4 sm:mt-0'>
                    <p className='text-base font-normal text-gray-500'>{review.commentaire}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {relatedBooks?.length > 0 && (
          <BookSlider title='Livres similaires' books={relatedBooks} />
        )}
      </div>
    </StoreLayout>
  );
}
