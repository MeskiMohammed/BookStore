"use client"

import { useState, useEffect } from "react"
import { DataTableToolbar, DeleteConfirmationDialog } from "@/components/ui-components"
import { CategoryDialog } from "@/components/categories/category-dialog"

// Mock data
const initialCategories = [
  { id: 1, nom: "Fiction", description: "Fictional stories and novels" },
  { id: 2, nom: "Non-Fiction", description: "Educational and informative books" },
  { id: 3, nom: "Science Fiction", description: "Futuristic and sci-fi themed books" },
]

export function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [filteredCategories, setFilteredCategories] = useState(categories)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)

  useEffect(() => {
    setFilteredCategories(categories)
  }, [categories])

  const handleSearch = (searchTerm) => {
    const filtered = categories.filter(
      (category) =>
        category.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCategories(filtered)
  }

  const handleAddNew = () => {
    setCurrentCategory(null)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (category) => {
    setCurrentCategory(category)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (category) => {
    setCurrentCategory(category)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (currentCategory) {
      setCategories(categories.filter((c) => c.id !== currentCategory.id))
      setIsDeleteDialogOpen(false)
    }
  }

  const handleSaveCategory = (category) => {
    if (currentCategory) {
      // Edit existing category
      setCategories(categories.map((c) => (c.id === currentCategory.id ? { ...c, ...category } : c)))
      setIsEditDialogOpen(false)
    } else {
      // Add new category
      const newId = Math.max(0, ...categories.map((c) => c.id)) + 1
      setCategories([...categories, { id: newId, ...category }])
      setIsAddDialogOpen(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Categories Management</h2>

      <DataTableToolbar searchPlaceholder="Search categories..." onSearch={handleSearch} onAddNew={handleAddNew} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr className="bg-white border-b">
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{category.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{category.nom}</td>
                  <td className="px-6 py-4">{category.description}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(category)}
                      className="font-medium text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(category)} className="font-medium text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CategoryDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleSaveCategory}
        title="Add New Category"
      />

      <CategoryDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveCategory}
        title="Edit Category"
        defaultValues={currentCategory}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        description={`Are you sure you want to delete the category "${currentCategory?.nom}"? This action cannot be undone.`}
      />
    </div>
  )
}

