'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { router, usePage } from '@inertiajs/react';
import { DataTableToolbar, DeleteConfirmationDialog, Pagination } from '@/components/ui-components';
import { Modal } from '@/components/ui-components';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCreditCard, faEnvelope, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

export default function OrdersPage({ initialOrders, users }) {
  console.log(initialOrders);
  const [orders, setOrders] = useState(initialOrders || []);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const { flash } = usePage().props;
  const [orderDetails, setOrderDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Add debug logging for users prop
  useEffect(() => {
    console.log('Users data:', users);
  }, [users]);

  // Debug log for flash messages
  useEffect(() => {
    console.log('Flash data:', flash);
  }, [flash]);

  // Handle real-time updates when a new order is added
  useEffect(() => {
    if (flash?.newOrder) {
      setOrders((currentOrders) => [...currentOrders, flash.newOrder]);
    }
  }, [flash?.newOrder]);

  // Handle real-time updates when an order is updated
  useEffect(() => {
    if (flash?.updatedOrder) {
      setOrders((currentOrders) => currentOrders.map((order) => (order.id === flash.updatedOrder.id ? flash.updatedOrder : order)));
    }
  }, [flash?.updatedOrder]);

  // Handle real-time updates when an order is deleted
  useEffect(() => {
    if (flash?.deletedOrderId) {
      setOrders((currentOrders) => currentOrders.filter((order) => order.id !== parseInt(flash.deletedOrderId)));
    }
  }, [flash?.deletedOrderId]);

  useEffect(() => {
    // Sort by client_name by default
    const sorted = [...orders].sort((a, b) => (a.client_name || '').localeCompare(b.client_name || ''));
    setFilteredOrders(sorted);
  }, [orders]);

  const handleSearch = (searchTerm) => {
    const filtered = orders.filter((order) => {
      const user = users.find((u) => u.id === order.user_id);
      const userName = user ? `${user.prenom} ${user.nom}` : '';
      return userName.toLowerCase().includes(searchTerm.toLowerCase()) || order.statut.toLowerCase().includes(searchTerm.toLowerCase()) || order.method_paiment.toLowerCase().includes(searchTerm.toLowerCase()) || (order.client_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredOrders(filtered.sort((a, b) => (a.client_name || '').localeCompare(b.client_name || '')));
  };

  const handleAddNew = () => {
    setCurrentOrder(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (order) => {
    setCurrentOrder(order);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (order) => {
    setCurrentOrder(order);
    setIsDeleteDialogOpen(true);
  };

  const handleViewDetails = (order) => {
    console.log('Opening details for order:', {
      id: order.id,
      client_name: order.client_name,
      details_commandes: order.details_commandes,
      hasDetails: !!order.details_commandes,
      detailsLength: order.details_commandes?.length,
      allKeys: Object.keys(order)
    });
    setCurrentOrder(order);
    setIsDetailsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!currentOrder) return;

    router.delete(`/admin/orders/${currentOrder.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  };

  const handleSaveOrder = (formData) => {
    if (currentOrder) {
      // Edit existing order
      router.put(`/admin/orders/${currentOrder.id}`, formData, {
        preserveScroll: true,
        onSuccess: () => {
          setIsEditDialogOpen(false);
        },
      });
    } else {
      // Add new order
      router.post('/admin/orders', formData, {
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
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.prenom} ${user.nom}` : 'Unknown User';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'en_attente':
        return <span className='bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>En attente</span>;
      case 'en_cours':
        return <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>En cours</span>;
      case 'livree':
        return <span className='bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Livrée</span>;
      case 'annulee':
        return <span className='bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Annulée</span>;
      default:
        return <span className='bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>{status}</span>;
    }
  };

  const formatPaymentMethod = (method) => {
    return method
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPage = (page) => setCurrentPage(page);

  return (
    <AdminLayout>
      <div className='bg-white p-4 rounded-lg shadow'>
        <h2 className='text-2xl font-bold mb-4'>Orders Management</h2>

        <DataTableToolbar
          searchPlaceholder='Search orders...'
          onSearch={handleSearch}
          showAddButton={false}
        />

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-4'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Client Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Client Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Customer
                </th>
                <th scope='col' className='px-6 py-3'>
                  Total Amount
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Payment Method
                </th>
                <th scope='col' className='px-6 py-3 text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr className='bg-white border-b'>
                  <td colSpan={7} className='px-6 py-4 text-center text-gray-500'>
                    No orders found
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className='bg-white border-b hover:bg-gray-50'>
                    <td className='px-6 py-4'>{order.client_name}</td>
                    <td className='px-6 py-4'>{order.client_email}</td>
                    <td className='px-6 py-4'>{getUserName(order.user_id)}</td>
                    <td className='px-6 py-4'>${order.montant_totale.toFixed(2)}</td>
                    <td className='px-6 py-4'>{getStatusBadge(order.statut)}</td>
                    <td className='px-6 py-4'>{formatPaymentMethod(order.methode_paiement)}</td>
                    <td className='px-6 py-4 text-right space-x-2'>
                      <button onClick={() => handleViewDetails(order)} className='text-blue-600 hover:text-blue-800' title='View'>
                        <FaEye />
                      </button>
                      <button onClick={() => handleEdit(order)} className='text-green-600 hover:text-green-800' title='Edit'>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(order)} className='text-red-600 hover:text-red-800' title='Delete'>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
          )}
        </div>

        <OrderDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSave={handleSaveOrder} title='Add New Order' defaultValues={currentOrder} />

        <OrderDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} onSave={handleSaveOrder} title='Edit Order' defaultValues={currentOrder} />

        <OrderDetailsModal isOpen={isDetailsDialogOpen} onClose={() => setIsDetailsDialogOpen(false)} order={currentOrder} orderDetails={orderDetails} userName={currentOrder ? getUserName(currentOrder.user_id) : ''} />

        <DeleteConfirmationDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={confirmDelete} title='Delete Order' description={`Are you sure you want to delete order #${currentOrder?.id}? This action cannot be undone.`} />
      </div>
    </AdminLayout>
  );
}

export function OrderDialog({ isOpen, onClose, onSave, title, defaultValues }) {
  const [formData, setFormData] = useState({
    montant_totale: '',
    statut: 'en_attente',
    methode_paiement: 'credit_card',
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        montant_totale: defaultValues.montant_totale,
        statut: defaultValues.statut,
        methode_paiement: defaultValues.methode_paiement,
      });
    }
  }, [defaultValues, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const footer = (
    <>
      <button type='button' className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100' onClick={onClose}>
        Cancel
      </button>
      <button type='submit' form='orderForm' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'>
        Save
      </button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <form id='orderForm' onSubmit={handleSubmit}>
        <div className='grid gap-4 mb-4'>
          <div>
            <label htmlFor='montant_totale' className='block mb-2 text-sm font-medium text-gray-900'>
              Total Amount
            </label>
            <input type='number' id='montant_totale' name='montant_totale' step='0.01' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.montant_totale} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor='statut' className='block mb-2 text-sm font-medium text-gray-900'>
              Status
            </label>
            <select id='statut' name='statut' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.statut} onChange={handleChange}>
              <option value='en_attente'>En attente</option>
              <option value='en_cours'>En cours</option>
              <option value='livree'>Livrée</option>
              <option value='annulee'>Annulée</option>
            </select>
          </div>

          <div>
            <label htmlFor='methode_paiement' className='block mb-2 text-sm font-medium text-gray-900'>
              Payment Method
            </label>
            <select id='methode_paiement' name='methode_paiement' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.methode_paiement} onChange={handleChange}>
              <option value='credit_card'>Credit Card</option>
              <option value='paypal'>PayPal</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export function OrderDetailsModal({ isOpen, onClose, order }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(order?.statut || '');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_cours':
        return 'bg-blue-100 text-blue-800';
      case 'livree':
        return 'bg-green-100 text-green-800';
      case 'annulee':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPaymentMethod = (method) => {
    return method
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  useEffect(() => {
    if (order) {
      setStatus(order.statut);
    }
  }, [order]);

  const handleStatusChange = async (newStatus) => {
    if (!order) return;

    setIsUpdating(true);
    try {
      await router.put(`/admin/orders/${order.id}/status`, {
        statut: newStatus
      }, {
        preserveScroll: true,
        onSuccess: () => {
          setStatus(newStatus);
          order.statut = newStatus; // Update the local order status
          setIsUpdating(false);
        },
        onError: () => {
          setIsUpdating(false);
        }
      });
    } catch (error) {
      console.error('Error updating status:', error);
      setIsUpdating(false);
    }
  };

  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="w-[90vw]">
      <div className="flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto pr-2">
          {/* Order Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Commande #{order.id}
              </h2>
              <p className="text-sm text-gray-500">
                {formatDate(order.created_at)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={isUpdating}
                className={`rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${getStatusColor(status)}`}
              >
                <option value="en_attente">En attente</option>
                <option value="en_cours">En cours</option>
                <option value="livree">Livrée</option>
                <option value="annulee">Annulée</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informations client</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nom</p>
                  <p className="text-sm font-medium text-gray-900">{order.client_name || `${order.user?.prenom} ${order.user?.nom}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{order.client_email || order.user?.email}</p>
                </div>
                {order.client_phone && (
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="text-sm font-medium text-gray-900">{order.client_phone}</p>
                  </div>
                )}
                {order.client_address && (
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="text-sm font-medium text-gray-900">{order.client_address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Résumé de la commande</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Méthode de paiement</p>
                  <p className="text-sm font-medium text-gray-900">{formatPaymentMethod(order.methode_paiement)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(order.montant_totale)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Articles commandés</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                      Livre
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Quantité
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Prix unitaire
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Sous-total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.details_commandes?.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.livre?.titre}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.livre?.auteur}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantite}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatPrice(item.prix_unitaire)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatPrice(item.sous_total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
