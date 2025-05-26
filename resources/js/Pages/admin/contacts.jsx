'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { router, usePage } from '@inertiajs/react';
import { DataTableToolbar, DeleteConfirmationDialog, Modal } from '@/components/ui-components';
import { FaTrash, FaEye } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faUser, faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function ContactsPage({ initialContacts }) {
  const [contacts, setContacts] = useState(initialContacts || []);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const { flash } = usePage().props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debug log for flash messages
  useEffect(() => {
    console.log('Flash data:', flash);
  }, [flash]);

  // Handle real-time updates when a contact is updated
  useEffect(() => {
    if (flash?.updatedContact) {
      setContacts((currentContacts) => currentContacts.map((contact) => (contact.id === flash.updatedContact.id ? flash.updatedContact : contact)));
    }
  }, [flash?.updatedContact]);

  // Handle real-time updates when a contact is deleted
  useEffect(() => {
    if (flash?.deletedContactId) {
      setContacts((currentContacts) => currentContacts.filter((contact) => contact.id !== parseInt(flash.deletedContactId)));
    }
  }, [flash?.deletedContactId]);

  useEffect(() => {
    // Sort by name by default
    const sorted = [...contacts].sort((a, b) => (a.nom || '').localeCompare(b.nom || ''));
    setFilteredContacts(sorted);
  }, [contacts]);

  const handleSearch = (searchTerm) => {
    const filtered = contacts.filter((contact) => {
      return contact.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredContacts(filtered.sort((a, b) => (a.nom || '').localeCompare(b.nom || '')));
  };

  const handleView = (contact) => {
    setCurrentContact(contact);
    setIsViewModalOpen(true);
  };

  const handleDelete = (contact) => {
    setCurrentContact(contact);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!currentContact) return;

    router.delete(`/admin/contacts/${currentContact.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      },
    });
  };

  const handleStatusChange = (contactId, newStatus) => {
    router.put(route('contacts.update-status', contactId), {
      status: newStatus
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsUpdating(false);
      },
      onError: () => {
        setIsUpdating(false);
      }
    });
  };

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      'pending': 'En attente',
      'in_progress': 'En cours',
      'completed': 'Traité',
      'cancelled': 'Annulé'
    };
    return texts[status] || status;
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginatedContacts = filteredContacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPage = (page) => setCurrentPage(page);

  return (
    <AdminLayout>
      <div className='bg-white p-4 rounded-lg shadow'>
        <h2 className='text-2xl font-bold mb-4'>Gestion des contacts</h2>

        <DataTableToolbar
          searchPlaceholder='Rechercher un contact...'
          onSearch={handleSearch}
          showAddButton={false}
        />

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-4'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Contact
                </th>
                <th scope='col' className='px-6 py-3'>
                  Message
                </th>
                <th scope='col' className='px-6 py-3'>
                  Date
                </th>
                <th scope='col' className='px-6 py-3'>
                  Statut
                </th>
                <th scope='col' className='px-6 py-3 text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedContacts.length === 0 ? (
                <tr className='bg-white border-b'>
                  <td colSpan={5} className='px-6 py-4 text-center text-gray-500'>
                    Aucun contact trouvé
                  </td>
                </tr>
              ) : (
                paginatedContacts.map((contact) => (
                  <tr key={contact.id} className='bg-white border-b hover:bg-gray-50'>
                    <td className='px-6 py-4'>
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {contact.prenom} {contact.nom}
                          </div>
                          <div className="text-sm text-gray-500">
                            {contact.email}
                          </div>
                          {contact.telephone && (
                            <div className="text-sm text-gray-500">
                              {contact.telephone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {contact.message}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className="text-sm text-gray-500">
                        {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                        disabled={isUpdating}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contact.status)} border-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer`}
                      >
                        <option value="pending">En attente</option>
                        <option value="in_progress">En cours</option>
                        <option value="completed">Traité</option>
                        <option value="cancelled">Annulé</option>
                      </select>
                    </td>
                    <td className='px-6 py-4 text-right space-x-2'>
                      <button onClick={() => handleView(contact)} className='text-blue-600 hover:text-blue-800' title='Voir'>
                        <FaEye />
                      </button>
                      <button onClick={() => handleDelete(contact)} className='text-red-600 hover:text-red-800' title='Supprimer'>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center items-center mt-4 space-x-2'>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => goToPage(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Modal */}
        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} size="2xl">
          {currentContact && (
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {currentContact.prenom} {currentContact.nom}
                    </p>
                    <p className="text-sm text-gray-500">
                      {currentContact.email}
                    </p>
                  </div>
                </div>
                {currentContact.telephone && (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-gray-400 mr-3" />
                    <p className="text-sm text-gray-900">{currentContact.telephone}</p>
                  </div>
                )}
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 text-gray-400 mr-3" />
                  <p className="text-sm text-gray-900">
                    {new Date(currentContact.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {currentContact.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal>

        <DeleteConfirmationDialog
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title='Supprimer le message'
          description={`Êtes-vous sûr de vouloir supprimer ce message de contact ? Cette action est irréversible.`}
        />
      </div>
    </AdminLayout>
  );
}
