"use client"

import { useState, useEffect } from "react"
import { DataTableToolbar, DeleteConfirmationDialog } from "@/components/ui-components"
import { UserDialog } from "@/components/users/user-dialog"

// Mock data
const initialUsers = [
  {
    id: 1,
    nom: "Doe",
    prenom: "John",
    adresse: "123 Main St, City",
    email: "john.doe@example.com",
    password: "********",
  },
  {
    id: 2,
    nom: "Smith",
    prenom: "Jane",
    adresse: "456 Oak Ave, Town",
    email: "jane.smith@example.com",
    password: "********",
  },
  {
    id: 3,
    nom: "Johnson",
    prenom: "Robert",
    adresse: "789 Pine Rd, Village",
    email: "robert.johnson@example.com",
    password: "********",
  },
]

export function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

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
    if (currentUser) {
      setUsers(users.filter((u) => u.id !== currentUser.id))
      setIsDeleteDialogOpen(false)
    }
  }

  const handleSaveUser = (user) => {
    if (currentUser) {
      // Edit existing user
      setUsers(users.map((u) => (u.id === currentUser.id ? { ...u, ...user } : u)))
      setIsEditDialogOpen(false)
    } else {
      // Add new user
      const newId = Math.max(0, ...users.map((u) => u.id)) + 1
      setUsers([...users, { id: newId, ...user }])
      setIsAddDialogOpen(false)
    }
  }

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

