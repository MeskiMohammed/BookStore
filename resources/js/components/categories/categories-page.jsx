"use client"

import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { DataTableToolbar, DeleteConfirmationDialog } from "@/components/ui-components"
import { CategoryDialog } from "@/components/categories/category-dialog"

export function CategoriesPage({ initialCategories }) {
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
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
    router.delete(`/admin/categories/${currentCategory.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setCategories((prevCategories) => prevCategories.filter((c) => c.id !== currentCategory.id))
      setIsDeleteDialogOpen(false)
      },
    })
  }

  const handleSaveCategory = (category) => {
    if (currentCategory) {
      // Edit existing category
      router.put(`/admin/categories/${currentCategory.id}`, category, {
        preserveScroll: true,
        onSuccess: (response) => {
          setCategories(prevCategories => 
            prevCategories.map(c => 
              c.id === currentCategory.id ? { ...c, ...category } : c
            )
          )
      setIsEditDialogOpen(false)
        },
      })
    } else {
      // Add new category
      router.post('/admin/categories', category, {
        preserveScroll: true,
        onSuccess: (response) => {
          // Get the newly created category from the response
          const newCategory = response.props.flash.newCategory
          if (newCategory) {
            setCategories(prevCategories => [...prevCategories, newCategory])
          }
      setIsAddDialogOpen(false)
        },
      })
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
                      className="font-medium text-blue-600 hover:underline mr-2"
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

