'use client'

import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { DataTableToolbar, DeleteConfirmationDialog } from '@/components/ui-components';
import { Modal } from "@/components/ui-components"
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

export default function UsersPage({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const { flash } = usePage().props;

  // Debug log for flash messages
  useEffect(() => {
    console.log('Flash data:', flash);
  }, [flash]);

  // Handle real-time updates when a new user is added
  useEffect(() => {
    if (flash?.newUser) {
      setUsers((currentUsers) => [...currentUsers, flash.newUser]);
    }
  }, [flash?.newUser]);

  // Handle real-time updates when a user is updated
  useEffect(() => {
    if (flash?.updatedUser) {
      setUsers((currentUsers) => currentUsers.map((user) => (user.id === flash.updatedUser.id ? flash.updatedUser : user)));
    }
  }, [flash?.updatedUser]);

  // Handle real-time updates when a user is deleted
  useEffect(() => {
    if (flash?.deletedUserId) {
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== parseInt(flash.deletedUserId)));
    }
  }, [flash?.deletedUserId]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (searchTerm) => {
    const filtered = users.filter((user) => user.nom.toLowerCase().includes(searchTerm.toLowerCase()) || user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered);
  };

  const handleAddNew = () => {
    setCurrentUser(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!currentUser) return;

    router.delete(`/admin/users/${currentUser.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  };

  const handleSaveUser = (formData) => {
    if (currentUser) {
      // Edit existing user
      router.put(`/admin/users/${currentUser.id}`, formData, {
        preserveScroll: true,
        onSuccess: () => {
          setIsEditDialogOpen(false);
        },
      });
    } else {
      // Add new user
      router.post('/admin/users', formData, {
        preserveScroll: true,
        onSuccess: () => {
          setIsAddDialogOpen(false);
        },
      });
    }
  };

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AdminLayout>
      <div className='bg-white p-4 rounded-lg shadow'>
        <h2 className='text-2xl font-bold mb-4'>Users Management</h2>

        <DataTableToolbar searchPlaceholder='Search users...' onSearch={handleSearch} onAddNew={handleAddNew} />

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-4'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  ID
                </th>
                <th scope='col' className='px-6 py-3'>
                  First Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Last Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Address
                </th>
                <th scope='col' className='px-6 py-3 text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr className='bg-white border-b'>
                  <td colSpan={6} className='px-6 py-4 text-center text-gray-500'>
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className='bg-white border-b hover:bg-gray-50'>
                    <td className='px-6 py-4'>{user.id}</td>
                    <td className='px-6 py-4'>{user.prenom}</td>
                    <td className='px-6 py-4'>{user.nom}</td>
                    <td className='px-6 py-4'>{user.email}</td>
                    <td className='px-6 py-4 max-w-xs truncate'>{user.adresse}</td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex justify-end space-x-2'>
                        <button onClick={() => handleEdit(user)} className='text-green-600 hover:text-green-800' title='Edit'>
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(user)} className='text-red-600 hover:text-red-800' title='Delete'>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <UserDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSave={handleSaveUser} title='Add New User' />

        <UserDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} onSave={handleSaveUser} title='Edit User' defaultValues={currentUser} />

        <DeleteConfirmationDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={confirmDelete} title='Delete User' description={`Are you sure you want to delete the user "${currentUser?.prenom} ${currentUser?.nom}"? This action cannot be undone.`} />
      </div>
    </AdminLayout>
  );
}

export function UserDialog({ isOpen, onClose, onSave, title, defaultValues }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    email: "",
    password: "",
  })

  const [isNewUser, setIsNewUser] = useState(true)

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        ...defaultValues,
        password: "", // Clear password for security
      })
      setIsNewUser(false)
    } else {
      setFormData({
        nom: "",
        prenom: "",
        adresse: "",
        email: "",
        password: "",
      })
      setIsNewUser(true)
    }
  }, [defaultValues, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // If editing and password is empty, use the original password
    if (!isNewUser && !formData.password && defaultValues) {
      onSave({
        ...formData,
        password: defaultValues.password,
      })
    } else {
      onSave(formData)
    }
  }

  const footer = (
    <>
      <button
        type="button"
        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
        onClick={onClose}
      >
        Cancel
      </button>
      <button
        type="submit"
        form="userForm"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Save
      </button>
    </>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <form id="userForm" onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="adresse" className="block mb-2 text-sm font-medium text-gray-900">
              Address
            </label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.adresse}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              {isNewUser ? "Password" : "New Password (leave empty to keep current)"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.password}
              onChange={handleChange}
              required={isNewUser}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}
