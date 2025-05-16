'use client';

import { useState, useEffect } from 'react';
import { router, Head, usePage } from '@inertiajs/react';
import { DataTableToolbar, DeleteConfirmationDialog } from '@/components/ui-components';
import { BookDialog } from '@/components/books/book-dialog';
import { BookDetailsDialog } from '@/components/books/book-details-dialog';
import BookList from './BookList';

export function BooksPage({ initialBooks, categories }) {
  console.log('BooksPage props:', { initialBooks, categories });
  
  const [books, setBooks] = useState(initialBooks || []);
  const { flash } = usePage().props;

  // Debug log for flash messages
  useEffect(() => {
    console.log('Flash data:', flash);
  }, [flash]);

  // Debug log for books state
  useEffect(() => {
    console.log('Books state updated:', books);
  }, [books]);

  // Handle real-time updates when a new book is added
  useEffect(() => {
    if (flash?.newBook) {
      console.log('New book received:', flash.newBook);
      setBooks(currentBooks => [...currentBooks, flash.newBook]);
    }
  }, [flash?.newBook]);

  // Handle real-time updates when a book is updated
  useEffect(() => {
    if (flash?.updatedBook) {
      console.log('Updated book received:', flash.updatedBook);
      setBooks(currentBooks => 
        currentBooks.map(book => book.id === flash.updatedBook.id ? flash.updatedBook : book)
      );
    }
  }, [flash?.updatedBook]);

  // Handle real-time updates when a book is deleted
  useEffect(() => {
    if (flash?.deletedBookId) {
      console.log('Book deleted:', flash.deletedBookId);
      setBooks(currentBooks => 
        currentBooks.filter(book => book.id !== parseInt(flash.deletedBookId))
      );
    }
  }, [flash?.deletedBookId]);

  const handleAddNew = () => {
    setCurrentBook(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (book) => {
    setCurrentBook(book);
    setIsDeleteDialogOpen(true);
  };

  const handleViewDetails = (book) => {
    setCurrentBook(book);
    setIsDetailsDialogOpen(true);
  };

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const confirmDelete = () => {
    if (!currentBook) return;
    
    router.delete(`/admin/books/${currentBook.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  };

  const handleSaveBook = (formData) => {
    if (currentBook) {
      // Edit existing book
      router.post(`/admin/books/${currentBook.id}`, {
        _method: 'PUT',
        ...formData
      }, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: (response) => {
          console.log('Book updated successfully:', response);
          setIsEditDialogOpen(false);
        },
        onError: (errors) => {
          console.error('Error updating book:', errors);
        }
      });
    } else {
      // Add new book
      router.post('/admin/books', formData, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: (response) => {
          console.log('Book added successfully:', response);
          setIsAddDialogOpen(false);
        },
        onError: (errors) => {
          console.error('Error adding book:', errors);
        }
      });
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.nom : 'Unknown';
  };

  return (
    <>
      <Head title="Books Management" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h1 className="text-2xl font-semibold mb-6">Books Management</h1>
              <BookList 
                books={books}
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetails={handleViewDetails}
                onAddNew={handleAddNew}
              />
            </div>
          </div>
        </div>
      </div>

      <BookDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
        onSave={handleSaveBook} 
        title='Add New Book' 
        categories={categories} 
      />

      <BookDialog 
        isOpen={isEditDialogOpen} 
        onClose={() => setIsEditDialogOpen(false)} 
        onSave={handleSaveBook} 
        title='Edit Book' 
        defaultValues={currentBook} 
        categories={categories} 
      />

      <BookDetailsDialog 
        isOpen={isDetailsDialogOpen} 
        onClose={() => setIsDetailsDialogOpen(false)} 
        book={currentBook} 
        categoryName={currentBook ? getCategoryName(currentBook.categorie_id) : ''} 
      />

      <DeleteConfirmationDialog 
        isOpen={isDeleteDialogOpen} 
        onClose={() => setIsDeleteDialogOpen(false)} 
        onConfirm={confirmDelete} 
        title='Delete Book' 
        description={`Are you sure you want to delete the book "${currentBook?.libelle}"? This action cannot be undone.`} 
      />
    </>
  );
}
