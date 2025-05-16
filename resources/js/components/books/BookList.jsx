import { useState, useEffect } from 'react';
import { DataTableToolbar } from '@/components/ui-components';

export default function BookList({ 
    books, 
    categories,
    onEdit,
    onDelete,
    onViewDetails,
    onAddNew
}) {
    const [filteredBooks, setFilteredBooks] = useState(books);

    useEffect(() => {
        setFilteredBooks(books);
    }, [books]);

    const handleSearch = (searchTerm) => {
        const filtered = books.filter((book) => 
            book.libelle.toLowerCase().includes(searchTerm.toLowerCase()) || 
            book.auteur.toLowerCase().includes(searchTerm.toLowerCase()) || 
            book.isbn.includes(searchTerm)
        );
        setFilteredBooks(filtered);
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        return category ? category.nom : 'Unknown';
    };

    return (
        <div className='bg-white rounded-lg'>
            <DataTableToolbar 
                searchPlaceholder='Search books...' 
                onSearch={handleSearch}
                onAddNew={onAddNew}
            />

            <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-4'>
                <table className='w-full text-sm text-left text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>ID</th>
                            <th scope='col' className='px-6 py-3'>Image</th>
                            <th scope='col' className='px-6 py-3'>Title</th>
                            <th scope='col' className='px-6 py-3'>Author</th>
                            <th scope='col' className='px-6 py-3'>Price</th>
                            <th scope='col' className='px-6 py-3'>Stock</th>
                            <th scope='col' className='px-6 py-3'>Category</th>
                            <th scope='col' className='px-6 py-3'>Status</th>
                            <th scope='col' className='px-6 py-3 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.length === 0 ? (
                            <tr className='bg-white border-b'>
                                <td colSpan={9} className='px-6 py-4 text-center text-gray-500'>
                                    No books found
                                </td>
                            </tr>
                        ) : (
                            filteredBooks.map((book) => (
                                <tr key={book.id} className='bg-white border-b hover:bg-gray-50'>
                                    <td className='px-6 py-4'>{book.id}</td>
                                    <td className='px-6 py-4'>
                                        <img 
                                            src={book.image || '/placeholder.svg'} 
                                            alt={book.libelle} 
                                            className='w-10 h-14 object-cover'
                                        />
                                    </td>
                                    <td className='px-6 py-4 font-medium text-gray-900'>
                                        {book.libelle}
                                    </td>
                                    <td className='px-6 py-4'>{book.auteur}</td>
                                    <td className='px-6 py-4'>${book.prix.toFixed(2)}</td>
                                    <td className='px-6 py-4'>{book.stock}</td>
                                    <td className='px-6 py-4'>
                                        {getCategoryName(book.categorie_id)}
                                    </td>
                                    <td className='px-6 py-4'>
                                        <span 
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                book.actif 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {book.actif ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 text-right space-x-2'>
                                        <button 
                                            onClick={() => onViewDetails(book)} 
                                            className='font-medium text-blue-600 hover:underline'
                                        >
                                            View
                                        </button>
                                        <button 
                                            onClick={() => onEdit(book)} 
                                            className='font-medium text-blue-600 hover:underline'
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete(book)} 
                                            className='font-medium text-red-600 hover:underline'
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
        </div>
    );
} 