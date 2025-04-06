"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useCart } from "@/components/store/cart-context"

// Mock data
const initialBooks = [
  {
    id: 1,
    libelle: "The Great Gatsby",
    description:
      "A novel by F. Scott Fitzgerald about the decadence and excess of the Jazz Age, as told through the eyes of Nick Carraway and his enigmatic neighbor, Jay Gatsby.",
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
    description:
      "A novel by Harper Lee that explores racial injustice and moral growth in the American South through the eyes of a young girl named Scout Finch.",
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
    description:
      "A landmark book by Stephen Hawking that explores complex concepts in cosmology, including the Big Bang, black holes, and the nature of time, in a way that is accessible to non-scientists.",
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

export default function ProductDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [category, setCategory] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
//   const { addToCart } = useCart()

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const bookId = Number.parseInt(id)
    const foundBook = initialBooks.find((b) => b.id === bookId)

    if (foundBook) {
      setBook(foundBook)
      const foundCategory = initialCategories.find((c) => c.id === foundBook.categorie_id)
      setCategory(foundCategory)
    }

    setLoading(false)
  }, [id])

  const handleAddToCart = () => {
    if (book) {
      addToCart(book, quantity)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Book not found</h2>
          <p className="mt-4 text-gray-500">The book you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Back to Books
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product image */}
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
            <img
              src={book.image || "/placeholder.svg"}
              alt={book.libelle}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Product details */}
          <div className="mt-10 lg:mt-0 lg:pl-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{book.libelle}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">${book.prix.toFixed(2)}</p>
            </div>

            <div className="mt-3">
              <h3 className="sr-only">Author</h3>
              <p className="text-lg text-gray-600">by {book.auteur}</p>
            </div>

            {category && (
              <div className="mt-3">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {category.nom}
                </span>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <div className="mt-2 space-y-6">
                <p className="text-base text-gray-500">{book.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-900">Publisher:</h3>
                <p className="ml-2 text-sm text-gray-500">{book.editeur}</p>
              </div>
              <div className="flex items-center mt-2">
                <h3 className="text-sm font-medium text-gray-900">Publication Date:</h3>
                <p className="ml-2 text-sm text-gray-500">{new Date(book.date_publication).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center mt-2">
                <h3 className="text-sm font-medium text-gray-900">ISBN:</h3>
                <p className="ml-2 text-sm text-gray-500">{book.isbn}</p>
              </div>
              <div className="flex items-center mt-2">
                <h3 className="text-sm font-medium text-gray-900">Stock:</h3>
                <p className="ml-2 text-sm text-gray-500">{book.stock} available</p>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-center">
                <label htmlFor="quantity" className="mr-3 text-sm font-medium text-gray-900">
                  Quantity:
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="rounded-l-md border border-gray-300 px-3 py-1 text-gray-900 hover:bg-gray-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max={book.stock}
                    className="w-16 border-y border-gray-300 py-1 text-center text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.min(book.stock, Math.max(1, Number.parseInt(e.target.value) || 1)))
                    }
                  />
                  <button
                    type="button"
                    className="rounded-r-md border border-gray-300 px-3 py-1 text-gray-900 hover:bg-gray-50"
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

