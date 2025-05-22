'use client';

import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { router, Head, usePage } from '@inertiajs/react';
import { DataTableToolbar, DeleteConfirmationDialog } from '@/components/ui-components';
import { Modal } from '@/components/ui-components';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

export default function BooksPage({ initialBooks, categories }) {
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
      setBooks((currentBooks) => [...currentBooks, flash.newBook]);
    }
  }, [flash?.newBook]);

  // Handle real-time updates when a book is updated
  useEffect(() => {
    if (flash?.updatedBook) {
      console.log('Updated book received:', flash.updatedBook);
      setBooks((currentBooks) => currentBooks.map((book) => (book.id === flash.updatedBook.id ? flash.updatedBook : book)));
    }
  }, [flash?.updatedBook]);

  // Handle real-time updates when a book is deleted
  useEffect(() => {
    if (flash?.deletedBookId) {
      console.log('Book deleted:', flash.deletedBookId);
      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== parseInt(flash.deletedBookId)));
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

  const handleSaveBook = (formData, setFormErrors) => {
    if (currentBook) {
      router.post(
        `/admin/books/${currentBook.id}`,
        {
          _method: 'PUT',
          ...formData,
        },
        {
          forceFormData: true,
          preserveScroll: true,
          onSuccess: () => {
            setIsEditDialogOpen(false);
          },
          onError: (errors) => {
            setFormErrors && setFormErrors(errors);
          },
        }
      );
    } else {
      router.post('/admin/books', formData, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          router.reload({ only: ['initialBooks'] });
          setIsAddDialogOpen(false);
        },
        onError: (errors) => {
          setFormErrors && setFormErrors(errors);
        },
      });
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.nom : 'Unknown';
  };

  return (
    <AdminLayout>
      <Head title='Books Management' />
      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900'>
              <h1 className='text-2xl font-semibold mb-6'>Books Management</h1>
              <BookList books={books} categories={categories} onEdit={handleEdit} onDelete={handleDelete} onViewDetails={handleViewDetails} onAddNew={handleAddNew} />
            </div>
          </div>
        </div>
      </div>

      <BookDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSave={handleSaveBook} title='Add New Book' categories={categories} />

      <BookDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} onSave={handleSaveBook} title='Edit Book' defaultValues={currentBook} categories={categories} />

      <BookDetailsDialog isOpen={isDetailsDialogOpen} onClose={() => setIsDetailsDialogOpen(false)} book={currentBook} categoryName={currentBook ? getCategoryName(currentBook.categorie_id) : ''} />

      <DeleteConfirmationDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={confirmDelete} title='Delete Book' description={`Are you sure you want to delete the book "${currentBook?.libelle}"? This action cannot be undone.`} />
    </AdminLayout>
  );
}

export function BookDialog({ isOpen, onClose, onSave, title, categories, defaultValues }) {
  const [formData, setFormData] = useState({
    libelle: '',
    description: '',
    auteur: '',
    isbn: '',
    prix: 0,
    stock: 0,
    categorie_id: categories?.[0]?.id || 1,
    editeur: '',
    date_publication: new Date().toISOString().split('T')[0],
    image: null,
    actif: true,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (defaultValues) {
      setFormData({ ...defaultValues, image: defaultValues.image || null });
    } else {
      setFormData({
        libelle: '',
        description: '',
        auteur: '',
        isbn: '',
        prix: 0,
        stock: 0,
        categorie_id: categories?.[0]?.id || 1,
        editeur: '',
        date_publication: new Date().toISOString().split('T')[0],
        image: null,
        actif: true,
      });
    }
  }, [defaultValues, categories, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});
    const formDataToSend = new FormData();

    // Append all form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (key === 'image' && formData[key] instanceof File) {
        formDataToSend.append('image', formData[key]);
      } else if (key === 'actif') {
        formDataToSend.append(key, formData[key] ? '1' : '0');
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    onSave(formDataToSend, setFormErrors);
  };

  const footer = (
    <>
      <button type='button' className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100' onClick={onClose}>
        Cancel
      </button>
      <button type='submit' form='bookForm' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'>
        Save
      </button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size='xl' footer={footer}>
      <form id='bookForm' onSubmit={handleSubmit}>
        {/* Show form errors if any */}
        {Object.keys(formErrors).length > 0 && (
          <div className='mb-4 text-red-600'>
            <ul>
              {Object.entries(formErrors).map(([field, error]) => (
                <li key={field}>{field}: {error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className='grid gap-4 mb-4 grid-cols-1 md:grid-cols-2'>
          <div>
            <label htmlFor='libelle' className='block mb-2 text-sm font-medium text-gray-900'>
              Title
            </label>
            <input type='text' id='libelle' name='libelle' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.libelle} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor='auteur' className='block mb-2 text-sm font-medium text-gray-900'>
              Author
            </label>
            <input type='text' id='auteur' name='auteur' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.auteur} onChange={handleChange} required />
          </div>
          <div className='md:col-span-2'>
            <label htmlFor='description' className='block mb-2 text-sm font-medium text-gray-900'>
              Description
            </label>
            <textarea id='description' name='description' rows='3' className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div>
            <label htmlFor='isbn' className='block mb-2 text-sm font-medium text-gray-900'>
              ISBN
            </label>
            <input type='text' id='isbn' name='isbn' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.isbn} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor='editeur' className='block mb-2 text-sm font-medium text-gray-900'>
              Publisher
            </label>
            <input type='text' id='editeur' name='editeur' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.editeur} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='prix' className='block mb-2 text-sm font-medium text-gray-900'>
              Price
            </label>
            <input type='number' id='prix' name='prix' step='0.01' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.prix} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor='stock' className='block mb-2 text-sm font-medium text-gray-900'>
              Stock
            </label>
            <input type='number' id='stock' name='stock' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.stock} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor='categorie_id' className='block mb-2 text-sm font-medium text-gray-900'>
              Category
            </label>
            <select id='categorie_id' name='categorie_id' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.categorie_id} onChange={(e) => setFormData((prev) => ({ ...prev, categorie_id: Number.parseInt(e.target.value) }))}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='date_publication' className='block mb-2 text-sm font-medium text-gray-900'>
              Publication Date
            </label>
            <input type='date' id='date_publication' name='date_publication' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.date_publication} onChange={handleChange} />
          </div>
          <div className='md:col-span-2'>
            <label htmlFor='image' className='block mb-2 text-sm font-medium text-gray-900'>
              Book Cover Image
            </label>
            <input type='file' id='image' name='image' accept='image/*' className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none' onChange={handleChange} />
            {formData.image && typeof formData.image === 'string' && <img src={formData.image} alt='Book cover preview' className='mt-2 w-32 h-48 object-cover rounded' />}
          </div>
          <div className='flex items-center'>
            <input id='actif' name='actif' type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2' checked={formData.actif} onChange={handleChange} />
            <label htmlFor='actif' className='ms-2 text-sm font-medium text-gray-900'>
              Active
            </label>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export function BookDetailsDialog({ isOpen, onClose, book, categoryName }) {
  if (!book) return null;

  const footer = (
    <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none' onClick={onClose}>
      Close
    </button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Book Details' size='lg' footer={footer}>
      <div className='grid md:grid-cols-[200px_1fr] gap-6'>
        <div>
          <img src={book.image || '/placeholder.svg'} alt={book.libelle} className='w-full h-auto object-cover rounded-md' />
        </div>
        <div className='space-y-4'>
          <div>
            <h3 className='text-2xl font-bold text-gray-900'>{book.libelle}</h3>
            <p className='text-gray-500'>by {book.auteur}</p>
          </div>

          <div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${book.actif ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{book.actif ? 'Active' : 'Inactive'}</span>
          </div>

          <div className='space-y-2'>
            <p className='text-sm text-gray-500'>Description</p>
            <p className='text-gray-900'>{book.description}</p>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-sm text-gray-500'>ISBN</p>
              <p className='text-gray-900'>{book.isbn}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Publisher</p>
              <p className='text-gray-900'>{book.editeur}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Price</p>
              <p className='text-gray-900'>${book.prix.toFixed(2)}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Stock</p>
              <p className='text-gray-900'>{book.stock} units</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Category</p>
              <p className='text-gray-900'>{categoryName}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Publication Date</p>
              <p className='text-gray-900'>{new Date(book.date_publication).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function BookList({ books, categories, onEdit, onDelete, onViewDetails, onAddNew }) {
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Sort by title (libelle) by default
    const sorted = [...books].sort((a, b) => a.libelle.localeCompare(b.libelle));
    setFilteredBooks(sorted);
  }, [books]);

  const handleSearch = (searchTerm) => {
    const filtered = books.filter((book) => book.libelle.toLowerCase().includes(searchTerm.toLowerCase()) || book.auteur.toLowerCase().includes(searchTerm.toLowerCase()) || book.isbn.includes(searchTerm));
    setFilteredBooks(filtered.sort((a, b) => a.libelle.localeCompare(b.libelle)));
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.nom : 'Unknown';
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPage = (page) => setCurrentPage(page);

  return (
    <div className='bg-white rounded-lg'>
      <DataTableToolbar searchPlaceholder='Search books...' onSearch={handleSearch} onAddNew={onAddNew} />

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-4'>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ISBN
              </th>
              <th scope='col' className='px-6 py-3'>
                Image
              </th>
              <th scope='col' className='px-6 py-3'>
                Title
              </th>
              <th scope='col' className='px-6 py-3'>
                Author
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Stock
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Status
              </th>
              <th scope='col' className='px-6 py-3 text-right'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedBooks.length === 0 ? (
              <tr className='bg-white border-b'>
                <td colSpan={9} className='px-6 py-4 text-center text-gray-500'>
                  No books found
                </td>
              </tr>
            ) : (
              paginatedBooks.map((book) => (
                <tr key={book.isbn} className='bg-white border-b hover:bg-gray-50'>
                  <td className='px-6 py-4'>{book.isbn}</td>
                  <td className='px-6 py-4'>
                    <img src={book.image || '/placeholder.svg'} alt={book.libelle} className='w-10 h-14 object-cover' />
                  </td>
                  <td className='px-6 py-4 font-medium text-gray-900'>{book.libelle}</td>
                  <td className='px-6 py-4'>{book.auteur}</td>
                  <td className='px-6 py-4'>${book.prix.toFixed(2)}</td>
                  <td className='px-6 py-4'>{book.stock}</td>
                  <td className='px-6 py-4'>{getCategoryName(book.categorie_id)}</td>
                  <td className='px-6 py-4'>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${book.actif ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{book.actif ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className='px-6 py-4 text-right space-x-2'>
                    <button onClick={() => onViewDetails(book)} className='text-blue-600 hover:text-blue-800' title='View'>
                      <FaEye />
                    </button>
                    <button onClick={() => onEdit(book)} className='text-green-600 hover:text-green-800' title='Edit'>
                      <FaEdit />
                    </button>
                    <button onClick={() => onDelete(book)} className='text-red-600 hover:text-red-800' title='Delete'>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
      </div>
    </div>
  );
}
