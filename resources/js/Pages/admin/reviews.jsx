'use client';

import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui-components';
import { router, usePage } from '@inertiajs/react';
import { DataTableToolbar, DeleteConfirmationDialog } from '@/components/ui-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function ReviewsPage({ initialReviews, users, books }) {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const { flash } = usePage().props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debug log for flash messages
  useEffect(() => {
    console.log('Flash data:', flash);
  }, [flash]);

  // Handle real-time updates when a new review is added
  useEffect(() => {
    if (flash?.newReview) {
      setReviews((currentReviews) => [...currentReviews, flash.newReview]);
    }
  }, [flash?.newReview]);

  // Handle real-time updates when a review is updated
  useEffect(() => {
    if (flash?.updatedReview) {
      setReviews((currentReviews) => currentReviews.map((review) => (review.id === flash.updatedReview.id ? flash.updatedReview : review)));
    }
  }, [flash?.updatedReview]);

  // Handle real-time updates when a review is deleted
  useEffect(() => {
    if (flash?.deletedReviewId) {
      setReviews((currentReviews) => currentReviews.filter((review) => review.id !== parseInt(flash.deletedReviewId)));
    }
  }, [flash?.deletedReviewId]);

  useEffect(() => {
    // Sort by user name by default
    const sorted = [...reviews].sort((a, b) => getUserName(a.user_id).localeCompare(getUserName(b.user_id)));
    setFilteredReviews(sorted);
  }, [reviews]);

  const handleSearch = (searchTerm) => {
    const filtered = reviews.filter((review) => {
      const user = users.find((u) => u.id === review.user_id);
      const book = books.find((b) => b.id === review.livre_id);
      const userName = user ? `${user.prenom} ${user.nom}` : '';
      const bookTitle = book ? book.libelle : '';

      return userName.toLowerCase().includes(searchTerm.toLowerCase()) || bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) || review.commentaire.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredReviews(filtered.sort((a, b) => getUserName(a.user_id).localeCompare(getUserName(b.user_id))));
  };

  const handleAddNew = () => {
    setCurrentReview(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (review) => {
    setCurrentReview(review);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (review) => {
    setCurrentReview(review);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!currentReview) return;

    router.delete(`/admin/reviews/${currentReview.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  };

  const handleSaveReview = (formData) => {
    if (currentReview) {
      // Edit existing review
      router.put(`/admin/reviews/${currentReview.id}`, formData, {
        preserveScroll: true,
        onSuccess: () => {
          setIsEditDialogOpen(false);
        },
      });
    } else {
      // Add new review
      router.post('/admin/reviews', formData, {
        preserveScroll: true,
        onSuccess: () => {
          setIsAddDialogOpen(false);
        },
      });
    }
  };

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.prenom} ${user.nom}` : 'Unknown User';
  };

  const getBookTitle = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    return book ? book.libelle : 'Unknown Book';
  };

  const renderStars = (rating) => {
    return (
      <div className='flex items-center'>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 22 20'>
            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
          </svg>
        ))}
        <span className='ml-2 text-gray-900'>{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPage = (page) => setCurrentPage(page);

  return (
    <AdminLayout>
      <div className='bg-white p-4 rounded-lg shadow'>
        <h2 className='text-2xl font-bold mb-4'>Reviews Management</h2>

        <DataTableToolbar searchPlaceholder='Search reviews...' onSearch={handleSearch} />

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-4'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  User
                </th>
                <th scope='col' className='px-6 py-3'>
                  Book
                </th>
                <th scope='col' className='px-6 py-3'>
                  Rating
                </th>
                <th scope='col' className='px-6 py-3'>
                  Comment
                </th>
                <th scope='col' className='px-6 py-3 text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.length === 0 ? (
                <tr className='bg-white border-b'>
                  <td colSpan={5} className='px-6 py-4 text-center text-gray-500'>
                    No reviews found
                  </td>
                </tr>
              ) : (
                paginatedReviews.map((review) => (
                  <tr key={review.id} className='bg-white border-b hover:bg-gray-50'>
                    <td className='px-6 py-4'>{getUserName(review.user_id)}</td>
                    <td className='px-6 py-4'>{getBookTitle(review.livre_id)}</td>
                    <td className='px-6 py-4'>{renderStars(review.note)}</td>
                    <td className='px-6 py-4 max-w-xs truncate'>{review.commentaire}</td>
                    <td className='px-6 py-4 text-right'>
                      <button onClick={() => handleEdit(review)} className='text-green-600 hover:text-green-800 mr-2' title='Edit'>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(review)} className='text-red-600 hover:text-red-800' title='Delete'>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center mt-4 space-x-2'>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <ReviewDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} onSave={handleSaveReview} title='Edit Review' defaultValues={currentReview} users={users} books={books} />

        <DeleteConfirmationDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={confirmDelete} title='Delete Review' description='Are you sure you want to delete this review? This action cannot be undone.' />
      </div>
    </AdminLayout>
  );
}

export function ReviewDialog({ isOpen, onClose, onSave, title, users, books, defaultValues }) {
  const [formData, setFormData] = useState({
    user_id: users?.[0]?.id || 1,
    livre_id: books?.[0]?.id || 1,
    note: 5,
    commentaire: '',
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
    } else {
      setFormData({
        user_id: users?.[0]?.id || 1,
        livre_id: books?.[0]?.id || 1,
        note: 5,
        commentaire: '',
      });
    }
  }, [defaultValues, users, books, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, note: rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      user_id: Number.parseInt(formData.user_id),
      livre_id: Number.parseInt(formData.livre_id),
      note: Number.parseFloat(formData.note),
    });
  };

  const footer = (
    <>
      <button type='button' className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100' onClick={onClose}>
        Cancel
      </button>
      <button type='submit' form='reviewForm' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'>
        Save
      </button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <form id='reviewForm' onSubmit={handleSubmit}>
        <div className='grid gap-4 mb-4'>
          {/* User Selection */}
          <div>
            <label htmlFor='user_id' className='block mb-2 text-sm font-medium text-gray-900'>
              User
            </label>
            <select id='user_id' name='user_id' value={formData.user_id} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.prenom} {user.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Book Selection */}
          <div>
            <label htmlFor='livre_id' className='block mb-2 text-sm font-medium text-gray-900'>
              Book
            </label>
            <select id='livre_id' name='livre_id' value={formData.livre_id} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.libelle}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Input */}
          <div>
            <label htmlFor='note' className='block mb-2 text-sm font-medium text-gray-900'>
              Rating
            </label>
            <input type='number' name='note' id='note' min='0' max='5' value={formData.note} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
          </div>

          {/* Comment Input */}
          <div>
            <label htmlFor='commentaire' className='block mb-2 text-sm font-medium text-gray-900'>
              Comment
            </label>
            <textarea id='commentaire' name='commentaire' rows='4' value={formData.commentaire} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' required />
          </div>
        </div>
      </form>
    </Modal>
  );
}
