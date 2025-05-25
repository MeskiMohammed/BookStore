import React, { useState } from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import BookSlider from '@/components/book-slider';
import { Link } from '@inertiajs/react';
import { useCart } from '@/components/store/cart-context';

// Helper to get book image or placeholder
function getBookImage(image) {
  if (!image || typeof image !== 'string' || image.trim() === '' || image === 'null' || image === 'undefined') {
    return '/images/books/placeholder.svg';
  }
  return image;
}

export default function DetailsProduct({ book, relatedBooks, user }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  const [reviewForm, setReviewForm] = useState({ note: 5, commentaire: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!book) {
    return (
      <StoreLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </StoreLayout>
    );
  }

  const calculateAverageRating = () => {
    if (!book.avis || book.avis.length === 0) return 0;
    const sum = book.avis.reduce((acc, review) => acc + review.note, 0);
    return sum / book.avis.length;
  };

  const averageRating = calculateAverageRating();
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
      setQuantity(1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= book.stock) {
      setQuantity(value);
    }
  };

  const handleReviewChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleStarClick = (star) => {
    setReviewForm({ ...reviewForm, note: star });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await window.Inertia.post('/avis', {
        livre_id: book.id,
        note: reviewForm.note,
        commentaire: reviewForm.commentaire,
      }, {
        onSuccess: () => {
          setReviewForm({ note: 5, commentaire: '' });
        },
        onError: (err) => setError(err.commentaire || 'Erreur lors de l\'envoi de l\'avis.'),
        onFinish: () => setSubmitting(false),
      });
    } catch (err) {
      setError('Erreur lors de l\'envoi de l\'avis.');
      setSubmitting(false);
    }
  };

  return (
    <StoreLayout>
      <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Breadcrumb */}
        <div className='flex items-center space-x-2 text-sm text-gray-500 mb-6'>
          <Link href='/' className='flex items-center hover:text-primary-600'>
            <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
            </svg>
            Accueil
          </Link>
          <span className='text-gray-400'>/</span>
          <Link href='/catalogue' className='hover:text-primary-600'>Catalogue</Link>
          <span className='text-gray-400'>/</span>
          <span className='text-gray-900'>{book.libelle}</span>
        </div>

        <section className='py-8 bg-white md:py-16 antialiased'>
          <div className='max-w-screen-xl px-4 mx-auto 2xl:px-0'>
            <div className='lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16'>
              {/* Book Image */}
              <div className='shrink-0 max-w-md lg:max-w-lg mx-auto'>
                <div className="relative group">
                  <img className='w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105' src={getBookImage(book.image)} alt={book.libelle} />
                  {!inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <span className="text-white text-xl font-bold">Rupture de stock</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Book Details */}
              <div className='mt-6 sm:mt-8 lg:mt-0'>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium px-2.5 py-0.5 rounded-md ${inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {inStock ? 'En stock' : 'Rupture de stock'}
                  </span>
                  <span className="text-sm font-medium px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    {book.categorie?.nom}
                  </span>
                </div>

                <h1 className='text-2xl font-bold text-gray-900 mt-3 sm:text-3xl'>{book.libelle}</h1>
                <p className='text-lg text-gray-600 mt-2'>par {book.auteur}</p>

                {/* Rating */}
                <div className='flex items-center gap-2 mt-4'>
                  <div className='flex items-center gap-1'>
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${index < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                      </svg>
                    ))}
                  </div>
                  <p className='text-sm font-medium text-gray-600'>({averageRating.toFixed(1)})</p>
                  <span className='text-sm font-medium text-blue-600 hover:text-blue-800'>
                    {reviewsCount} Avis
                  </span>
                </div>

                {/* Price */}
                <div className="mt-6">
                  <p className="text-3xl font-bold text-gray-900">{book.prix.toFixed(2)}€</p>
                </div>

                {/* Add to Cart Section */}
                <div className='mt-8 space-y-4'>
                  <div className='flex items-center gap-4'>
                    <label htmlFor='quantity' className='text-sm font-medium text-gray-700'>
                      Quantité:
                    </label>
                    <div className='flex items-center border rounded-lg'>
                      <button
                        type='button'
                        className='px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg'
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={!inStock}
                      >
                        -
                      </button>
                      <input
                        type='number'
                        id='quantity'
                        name='quantity'
                        value={quantity}
                        onChange={handleQuantityChange}
                        min='1'
                        max={book.stock}
                        className='w-16 text-center border-x py-2 text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
                        disabled={!inStock}
                      />
                      <button
                        type='button'
                        className='px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg'
                        onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                        disabled={!inStock}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-lg transition-colors
                      ${inStock
                        ? 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
                        : 'bg-gray-400 cursor-not-allowed'}`}
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                    </svg>
                    {inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                  </button>
                </div>

                {/* Book Details Tabs */}
                <div className="mt-8">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                      <button
                        onClick={() => setActiveTab('description')}
                        className={`${
                          activeTab === 'description'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        Description
                      </button>
                      <button
                        onClick={() => setActiveTab('details')}
                        className={`${
                          activeTab === 'details'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        Détails
                      </button>
                      <button
                        onClick={() => setActiveTab('reviews')}
                        className={`${
                          activeTab === 'reviews'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        Avis ({reviewsCount})
                      </button>
                    </nav>
                  </div>

                  <div className="mt-6">
                    {activeTab === 'description' && (
                      <div className="prose max-w-none">
                        <p className="text-gray-600">{book.description}</p>
                      </div>
                    )}

                    {activeTab === 'details' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">ISBN</p>
                          <p className="mt-1 text-sm text-gray-900">{book.isbn}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Éditeur</p>
                          <p className="mt-1 text-sm text-gray-900">{book.editeur}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Date de publication</p>
                          <p className="mt-1 text-sm text-gray-900">{new Date(book.date_publication).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Catégorie</p>
                          <p className="mt-1 text-sm text-gray-900">{book.categorie?.nom}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Stock disponible</p>
                          <p className="mt-1 text-sm text-gray-900">{book.stock} exemplaires</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'reviews' && (
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Avis des lecteurs</h3>
                        {/* Review Form for Authenticated Users */}
                        {user ? (
                          <form onSubmit={handleReviewSubmit} className="mb-4 p-4 bg-white rounded-md border shadow-sm">
                            <div className="flex items-center mb-2">
                              <span className="mr-2 text-sm font-medium">Votre note :</span>
                              {[1,2,3,4,5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => handleStarClick(star)}
                                  className={star <= reviewForm.note ? 'text-yellow-400' : 'text-gray-300'}
                                  aria-label={`Donner ${star} étoile${star > 1 ? 's' : ''}`}
                                >
                                  ★
                                </button>
                              ))}
                            </div>
                            <textarea
                              name="commentaire"
                              value={reviewForm.commentaire}
                              onChange={handleReviewChange}
                              className="w-full border rounded-md p-2 mb-2"
                              rows={3}
                              placeholder="Écrivez votre avis..."
                              required
                            />
                            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                            <button
                              type="submit"
                              disabled={submitting}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md disabled:opacity-50"
                            >
                              {submitting ? 'Envoi...' : 'Envoyer mon avis'}
                            </button>
                          </form>
                        ) : (
                          <div className="mb-4 p-4 bg-white rounded-md border text-center">
                            <span className="text-gray-600">Connectez-vous pour laisser un avis.</span>
                            <Link href="/login" className="ml-2 text-blue-600 hover:underline">Se connecter</Link>
                          </div>
                        )}
                        <div className="max-h-64 overflow-y-auto space-y-4 border rounded-md p-4 bg-gray-50">
                          {book.avis && book.avis.length > 0 ? (
                            book.avis.map((review, idx) => (
                              <div key={review.id || idx} className="border-b pb-2 last:border-b-0">
                                <div className="flex items-center mb-1">
                                  <span className="font-semibold text-sm text-gray-800">
                                    {review.user && (review.user.prenom || review.user.nom)
                                      ? `${review.user.prenom ?? ''} ${review.user.nom ?? ''}`.trim()
                                      : 'Utilisateur inconnu'}
                                  </span>
                                  <span className="ml-2 text-yellow-500">
                                    {'★'.repeat(review.note)}{'☆'.repeat(5 - review.note)}
                                  </span>
                                  <span className="ml-2 text-xs text-gray-500">{review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{review.commentaire}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500">Aucun avis pour ce livre.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Books Section */}
        {relatedBooks && relatedBooks.length > 0 && (
          <section className="py-8 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Livres similaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedBooks.map((relatedBook) => (
                  <div key={relatedBook.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <Link href={`/catalogue/${relatedBook.id}`}>
                      <img
                        src={getBookImage(relatedBook.image)}
                        alt={relatedBook.libelle}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900">{relatedBook.libelle}</h3>
                        <p className="text-sm text-gray-500">{relatedBook.auteur}</p>
                        <p className="mt-2 font-medium text-blue-600">{relatedBook.prix.toFixed(2)}€</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </StoreLayout>
  );
}
