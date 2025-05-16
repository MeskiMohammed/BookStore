"use client"

import { useState, useEffect } from "react"
import { router, usePage } from "@inertiajs/react"
import { DataTableToolbar, DeleteConfirmationDialog } from "@/components/ui-components"
import { ReviewDialog } from "@/components/reviews/review-dialog"

export function ReviewsPage({ initialReviews, users, books }) {
  const [reviews, setReviews] = useState(initialReviews || [])
  const [filteredReviews, setFilteredReviews] = useState(reviews)
  const { flash } = usePage().props

  // Debug log for flash messages
  useEffect(() => {
    console.log('Flash data:', flash)
  }, [flash])

  // Handle real-time updates when a new review is added
  useEffect(() => {
    if (flash?.newReview) {
      setReviews(currentReviews => [...currentReviews, flash.newReview])
    }
  }, [flash?.newReview])

  // Handle real-time updates when a review is updated
  useEffect(() => {
    if (flash?.updatedReview) {
      setReviews(currentReviews => 
        currentReviews.map(review => 
          review.id === flash.updatedReview.id ? flash.updatedReview : review
        )
      )
    }
  }, [flash?.updatedReview])

  // Handle real-time updates when a review is deleted
  useEffect(() => {
    if (flash?.deletedReviewId) {
      setReviews(currentReviews => 
        currentReviews.filter(review => review.id !== parseInt(flash.deletedReviewId))
      )
    }
  }, [flash?.deletedReviewId])

  useEffect(() => {
    setFilteredReviews(reviews)
  }, [reviews])

  const handleSearch = (searchTerm) => {
    const filtered = reviews.filter((review) => {
      const user = users.find((u) => u.id === review.user_id)
      const book = books.find((b) => b.id === review.livre_id)
      const userName = user ? `${user.prenom} ${user.nom}` : ""
      const bookTitle = book ? book.libelle : ""

      return (
        userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.commentaire.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    setFilteredReviews(filtered)
  }

  const handleAddNew = () => {
    setCurrentReview(null)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (review) => {
    setCurrentReview(review)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (review) => {
    setCurrentReview(review)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!currentReview) return
    
    router.delete(`/admin/reviews/${currentReview.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setIsDeleteDialogOpen(false)
      },
    })
  }

  const handleSaveReview = (formData) => {
    if (currentReview) {
      // Edit existing review
      router.put(`/admin/reviews/${currentReview.id}`, formData, {
        preserveScroll: true,
        onSuccess: () => {
          setIsEditDialogOpen(false)
        },
      })
    } else {
      // Add new review
      router.post('/admin/reviews', formData, {
        preserveScroll: true,
        onSuccess: () => {
          setIsAddDialogOpen(false)
        },
      })
    }
  }

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentReview, setCurrentReview] = useState(null)

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId)
    return user ? `${user.prenom} ${user.nom}` : "Unknown User"
  }

  const getBookTitle = (bookId) => {
    const book = books.find((b) => b.id === bookId)
    return book ? book.libelle : "Unknown Book"
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.floor(rating) ? "text-yellow-300" : "text-gray-300"}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
        <span className="ml-2 text-gray-900">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Reviews Management</h2>

      <DataTableToolbar searchPlaceholder="Search reviews..." onSearch={handleSearch} onAddNew={handleAddNew} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Book
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Comment
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length === 0 ? (
              <tr className="bg-white border-b">
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No reviews found
                </td>
              </tr>
            ) : (
              filteredReviews.map((review) => (
                <tr key={review.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{review.id}</td>
                  <td className="px-6 py-4">{getUserName(review.user_id)}</td>
                  <td className="px-6 py-4">{getBookTitle(review.livre_id)}</td>
                  <td className="px-6 py-4">{renderStars(review.note)}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{review.commentaire}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(review)}
                      className="font-medium text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(review)} 
                      className="font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ReviewDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleSaveReview}
        title="Add New Review"
        users={users}
        books={books}
      />

      <ReviewDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveReview}
        title="Edit Review"
        defaultValues={currentReview}
        users={users}
        books={books}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Review"
        description="Are you sure you want to delete this review? This action cannot be undone."
      />
    </div>
  )
}

