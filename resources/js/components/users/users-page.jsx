"use client"

import { useState, useEffect } from "react"
import { router, usePage } from "@inertiajs/react"
import { DataTableToolbar, DeleteConfirmationDialog } from "@/components/ui-components"
import { UserDialog } from "@/components/users/user-dialog"

export function UsersPage({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || [])
  const [filteredUsers, setFilteredUsers] = useState(users)
  const { flash } = usePage().props

  // Debug log for flash messages
  useEffect(() => {
    console.log('Flash data:', flash)
  }, [flash])

  // Handle real-time updates when a new user is added
  useEffect(() => {
    if (flash?.newUser) {
      setUsers(currentUsers => [...currentUsers, flash.newUser])
    }
  }, [flash?.newUser])

  // Handle real-time updates when a user is updated
  useEffect(() => {
    if (flash?.updatedUser) {
      setUsers(currentUsers => 
        currentUsers.map(user => 
          user.id === flash.updatedUser.id ? flash.updatedUser : user
        )
      )
    }
  }, [flash?.updatedUser])

  // Handle real-time updates when a user is deleted
  useEffect(() => {
    if (flash?.deletedUserId) {
      setUsers(currentUsers => 
        currentUsers.filter(user => user.id !== parseInt(flash.deletedUserId))
      )
    }
  }, [flash?.deletedUserId])

  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  const handleSearch = (searchTerm) => {
    const filtered = users.filter(
      (user) =>
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }

  const handleAddNew = () => {
    setCurrentUser(null)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (user) => {
    setCurrentUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (user) => {
    setCurrentUser(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!currentUser) return
    
    router.delete(`/admin/users/${currentUser.id}`, {
      preserveScroll: true,
      onSuccess: () => {
      setIsDeleteDialogOpen(false)
      },
    })
  }

  const handleSaveUser = (formData) => {
    if (currentUser) {
      // Edit existing user
      router.put(`/admin/users/${currentUser.id}`, formData, {
        preserveScroll: true,
        onSuccess: () => {
      setIsEditDialogOpen(false)
        },
      })
    } else {
      // Add new user
      router.post('/admin/users', formData, {
        preserveScroll: true,
        onSuccess: () => {
      setIsAddDialogOpen(false)
        },
      })
    }
  }

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>

      <DataTableToolbar searchPlaceholder="Search users..." onSearch={handleSearch} onAddNew={handleAddNew} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr className="bg-white border-b">
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.prenom}</td>
                  <td className="px-6 py-4">{user.nom}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{user.adresse}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(user)} className="font-medium text-blue-600 hover:underline mr-3">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user)} className="font-medium text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UserDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleSaveUser}
        title="Add New User"
      />

      <UserDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveUser}
        title="Edit User"
        defaultValues={currentUser}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete the user "${currentUser?.prenom} ${currentUser?.nom}"? This action cannot be undone.`}
      />
    </div>
  )
}

