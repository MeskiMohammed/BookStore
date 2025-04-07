"use client"

import { useState, useEffect } from "react"
import { Link } from "@inertiajs/react"
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

export default function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [categories, setCategories] = useState([])
//   const { addToCart } = useCart()

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setFeaturedBooks(initialBooks)
    setCategories(initialCategories)
  }, [])

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="mt-24 text-4xl font-bold tracking-tight text-white sm:mt-10 sm:text-6xl">
                Discover Your Next Favorite Book
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Browse our collection of bestsellers, new releases, and timeless classics. Find the perfect book for
                your next adventure.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/products"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Browse Books
                </Link>
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img
              className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80"
              alt="Book collection"
            />
          </div>
        </div>
      </div>

      {/* Featured books section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Books</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredBooks.map((book) => (
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
          ))}
        </div>
      </div>

      {/* Categories section */}
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Browse by Category</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {categories.map((category) => (
              <div key={category.id} className="group relative">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link to={`/products?category=${category.id}`}>
                        <span className="absolute inset-0" />
                        {category.nom}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Explore our collection of {category.nom.toLowerCase()} books
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

