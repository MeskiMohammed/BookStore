'use client';

import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { DataTableToolbar, DeleteConfirmationDialog } from '@/components/ui-components';
import { Modal } from '@/components/ui-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Categories({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { flash } = usePage().props;

  useEffect(() => {
    setCategories(initialCategories);
    // Sort by name (nom) by default
    const sorted = [...initialCategories].sort((a, b) => a.nom.localeCompare(b.nom));
    setFilteredCategories(sorted);
  }, [initialCategories]);

  const handleSearch = (searchTerm) => {
    const filtered = categories.filter((category) => category.nom.toLowerCase().includes(searchTerm.toLowerCase()) || (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase())));
    setFilteredCategories(filtered.sort((a, b) => a.nom.localeCompare(b.nom)));
  };

  const handleAddNew = () => {
    setCurrentCategory(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    router.delete(`/admin/categories/${currentCategory.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setCategories((prevCategories) => prevCategories.filter((c) => c.id !== currentCategory.id));
        setIsDeleteDialogOpen(false);
      },
    });
  };

  const handleSaveCategory = (category) => {
    if (currentCategory) {
      // Edit existing category
      router.put(`/admin/categories/${currentCategory.id}`, category, {
        preserveScroll: true,
        onSuccess: (response) => {
          setCategories((prevCategories) => prevCategories.map((c) => (c.id === currentCategory.id ? { ...c, ...category } : c)));
          setIsEditDialogOpen(false);
        },
      });
    } else {
      // Add new category
      router.post('/admin/categories', category, {
        preserveScroll: true,
        onSuccess: () => {
          router.reload({ only: ['initialCategories'] });
          setIsAddDialogOpen(false);
        },
      });
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPage = (page) => setCurrentPage(page);

  return (
    <AdminLayout>
      <div className='bg-white p-4 rounded-lg shadow'>
        <h2 className='text-2xl font-bold mb-4'>Categories Management</h2>

        <DataTableToolbar searchPlaceholder='Search categories...' onSearch={handleSearch} onAddNew={handleAddNew} />

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-4'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Description
                </th>
                <th scope='col' className='px-6 py-3'>
                  Books
                </th>
                <th scope='col' className='px-6 py-3 text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr className='bg-white border-b'>
                  <td colSpan={3} className='px-6 py-4 text-center text-gray-500'>
                    No categories found
                  </td>
                </tr>
              ) : (
                paginatedCategories.map((category) => (
                  <tr key={category.id} className='bg-white border-b hover:bg-gray-50'>
                    <td className='px-6 py-4 font-medium text-gray-900'>{category.nom}</td>
                    <td className='px-6 py-4'>{category.description}</td>
                    <td className='px-6 py-4'>{category.livres_count ?? category.books_count ?? 0}</td>
                    <td className='px-6 py-4 text-right'>
                      <button onClick={() => handleEdit(category)} className='text-green-600 hover:text-green-800 mr-2' title='Edit'>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(category)} className='text-red-600 hover:text-red-800' title='Delete'>
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

        <CategoryDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSave={handleSaveCategory} title='Add New Category' />

        <CategoryDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} onSave={handleSaveCategory} title='Edit Category' defaultValues={currentCategory} />

        <DeleteConfirmationDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={confirmDelete} title='Delete Category' description={`Are you sure you want to delete the category "${currentCategory?.nom}"? This action cannot be undone.`} />
      </div>
    </AdminLayout>
  );
}

export function CategoryDialog({ isOpen, onClose, onSave, title, defaultValues }) {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
    } else {
      setFormData({ nom: '', description: '' });
    }
  }, [defaultValues, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const footer = (
    <>
      <button type='button' className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100' onClick={onClose}>
        Cancel
      </button>
      <button type='submit' form='categoryForm' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'>
        Save
      </button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size='lg' footer={footer}>
      <form id='categoryForm' onSubmit={handleSubmit}>
        <div className='grid gap-4 mb-4'>
          <div>
            <label htmlFor='nom' className='block mb-2 text-sm font-medium text-gray-900'>
              Name
            </label>
            <input type='text' id='nom' name='nom' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.nom} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor='description' className='block mb-2 text-sm font-medium text-gray-900'>
              Description
            </label>
            <textarea id='description' name='description' rows='3' className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' value={formData.description} onChange={handleChange}></textarea>
          </div>
        </div>
      </form>
    </Modal>
  );
}
