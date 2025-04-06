"use client"

import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useCart } from "@/components/store/cart-context"

// Mock data
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
    actif: true,
  },
]

const initialCategories = [
  { id: 1, nom: "Fiction" },
  { id: 2, nom: "Non-Fiction" },
  { id: 3, nom: "Science Fiction" },
]

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get("category") ? Number.parseInt(searchParams.get("category")) : null

  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryId)
//   const { addToCart } = useCart()

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setBooks(initialBooks)
    setCategories(initialCategories)
  }, [])

  useEffect(() => {
    let filtered = books

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.auteur.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((book) => book.categorie_id === selectedCategory)
    }

    setFilteredBooks(filtered)
  }, [books, searchTerm, selectedCategory])

  const handleCategoryChange = (e) => {
    const value = e.target.value ? Number.parseInt(e.target.value) : null
    setSelectedCategory(value)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Books</h1>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Search books..."
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full sm:w-1/3">
            <label htmlFor="category" className="sr-only">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={selectedCategory || ""}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredBooks.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No books found matching your criteria.</p>
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div key={book.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.libelle}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/products/${book.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {book.libelle}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{book.auteur}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${book.prix.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => addToCart(book)}
                  className="mt-4 w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

