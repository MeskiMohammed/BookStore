"use client"

import { useState, useEffect } from "react"
import { DataTableToolbar, DeleteConfirmationDialog } from "@/components/ui-components"
import { BookDialog } from "@/components/books/book-dialog"
import { BookDetailsDialog } from "@/components/books/book-details-dialog"

// Mock data
const initialCategories = [
  { id: 1, nom: "Fiction" },
  { id: 2, nom: "Non-Fiction" },
  { id: 3, nom: "Science Fiction" },
]

const initialBooks = [
  {
    id: 1,
    libelle: "The Great Gatsby",
    description: "A novel by F. Scott Fitzgerald",
    auteur: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    prix: 12.99,
    stock: 25,
    categorie_id: 1,
    editeur: "Scribner",
    date_publication: "2004-09-30",
    image: "/placeholder.svg?height=100&width=70",
    actif: true,
  },
  {
    id: 2,
    libelle: "To Kill a Mockingbird",
    description: "A novel by Harper Lee",
    auteur: "Harper Lee",
    isbn: "9780061120084",
    prix: 14.99,
    stock: 18,
    categorie_id: 1,
    editeur: "HarperCollins",
    date_publication: "2006-05-23",
    image: "/placeholder.svg?height=100&width=70",
    actif: true,
  },
  {
    id: 3,
    libelle: "A Brief History of Time",
    description: "A book about cosmology by Stephen Hawking",
    auteur: "Stephen Hawking",
    isbn: "9780553380163",
    prix: 18.99,
    stock: 12,
    categorie_id: 2,
    editeur: "Bantam",
    date_publication: "1998-09-01",
    image: "/placeholder.svg?height=100&width=70",
    actif: false,
  },
]

export function BooksPage() {
  const [books, setBooks] = useState(initialBooks)
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [categories] = useState(initialCategories)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [currentBook, setCurrentBook] = useState(null)

  useEffect(() => {
    setFilteredBooks(books)
  }, [books])

  const handleSearch = (searchTerm) => {
    const filtered = books.filter(
      (book) =>
        book.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.auteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm),
    )
    setFilteredBooks(filtered)
  }

  const handleAddNew = () => {
    setCurrentBook(null)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (book) => {
    setCurrentBook(book)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (book) => {
    setCurrentBook(book)
    setIsDeleteDialogOpen(true)
  }

  const handleViewDetails = (book) => {
    setCurrentBook(book)
    setIsDetailsDialogOpen(true)
  }

  const confirmDelete = () => {
    if (currentBook) {
      setBooks(books.filter((b) => b.id !== currentBook.id))
      setIsDeleteDialogOpen(false)
    }
  }

  const handleSaveBook = (book) => {
    if (currentBook) {
      // Edit existing book
      setBooks(books.map((b) => (b.id === currentBook.id ? { ...b, ...book } : b)))
      setIsEditDialogOpen(false)
    } else {
      // Add new book
      const newId = Math.max(0, ...books.map((b) => b.id)) + 1
      setBooks([...books, { id: newId, ...book }])
      setIsAddDialogOpen(false)
    }
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.nom : "Unknown"
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Books Management</h2>

      <DataTableToolbar searchPlaceholder="Search books..." onSearch={handleSearch} onAddNew={handleAddNew} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr className="bg-white border-b">
                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                  No books found
                </td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr key={book.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{book.id}</td>
                  <td className="px-6 py-4">
                    <img src={book.image || "/placeholder.svg"} alt={book.libelle} className="w-10 h-14 object-cover" />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{book.libelle}</td>
                  <td className="px-6 py-4">{book.auteur}</td>
                  <td className="px-6 py-4">${book.prix.toFixed(2)}</td>
                  <td className="px-6 py-4">{book.stock}</td>
                  <td className="px-6 py-4">{getCategoryName(book.categorie_id)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${book.actif ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {book.actif ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleViewDetails(book)}
                      className="font-medium text-blue-600 hover:underline mr-2"
                    >
                      View
                    </button>
                    <button onClick={() => handleEdit(book)} className="font-medium text-blue-600 hover:underline mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(book)} className="font-medium text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <BookDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleSaveBook}
        title="Add New Book"
        categories={categories}
      />

      <BookDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveBook}
        title="Edit Book"
        defaultValues={currentBook}
        categories={categories}
      />

      <BookDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        book={currentBook}
        categoryName={currentBook ? getCategoryName(currentBook.categorie_id) : ""}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Book"
        description={`Are you sure you want to delete the book "${currentBook?.libelle}"? This action cannot be undone.`}
      />
    </div>
  )
}

