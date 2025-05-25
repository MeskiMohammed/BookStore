'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { router, usePage } from '@inertiajs/react';
import { DataTableToolbar, DeleteConfirmationDialog, Modal } from '@/components/ui-components';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

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

  const handleViewDetails = async (order) => {
    try {
      const response = await fetch(`/admin/orders/${order.id}`);
      const data = await response.json();
      setOrderDetails(data);
      setCurrentOrder(order);
      setIsDetailsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
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
      case 'completed':
        return <span className='bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Completed</span>;
      case 'processing':
        return <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Processing</span>;
      case 'pending':
        return <span className='bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Pending</span>;
      case 'cancelled':
        return <span className='bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Cancelled</span>;
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

        <DataTableToolbar searchPlaceholder='Search orders...' onSearch={handleSearch} />

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

        <OrderDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSave={handleSaveOrder} title='Add New Order' users={users} />

        <OrderDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} onSave={handleSaveOrder} title='Edit Order' defaultValues={currentOrder} users={users} />

        <OrderDetailsDialog isOpen={isDetailsDialogOpen} onClose={() => setIsDetailsDialogOpen(false)} order={currentOrder} orderDetails={orderDetails} userName={currentOrder ? getUserName(currentOrder.user_id) : ''} />

        <DeleteConfirmationDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={confirmDelete} title='Delete Order' description={`Are you sure you want to delete order #${currentOrder?.id}? This action cannot be undone.`} />
      </div>
    </AdminLayout>
  );
}

export function OrderDialog({ isOpen, onClose, onSave, title, users = [], defaultValues }) {
  const [formData, setFormData] = useState({
    user_id: '',
    montant_totale: 0,
    statut: 'pending',
    method_paiment: 'credit_card',
  });

  // Initialize form data when the dialog opens or when defaultValues change
  useEffect(() => {
    if (!isOpen) return;

    if (defaultValues) {
      setFormData(defaultValues);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        user_id: users?.[0]?.id || '',
        montant_totale: 0,
        statut: 'pending',
        method_paiment: 'credit_card',
      }));
    }
  }, [isOpen, defaultValues]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      user_id: Number.parseInt(formData.user_id),
      montant_totale: Number.parseFloat(formData.montant_totale),
    });
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
            <label htmlFor='user_id' className='block mb-2 text-sm font-medium text-gray-900'>
              Customer
            </label>
            <select id='user_id' name='user_id' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.user_id} onChange={handleChange} required>
              <option value=''>Select a customer</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.prenom} {user.nom}
                </option>
              ))}
            </select>
          </div>

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
              <option value='pending'>Pending</option>
              <option value='processing'>Processing</option>
              <option value='completed'>Completed</option>
              <option value='cancelled'>Cancelled</option>
            </select>
          </div>

          <div>
            <label htmlFor='method_paiment' className='block mb-2 text-sm font-medium text-gray-900'>
              Payment Method
            </label>
            <select id='method_paiment' name='method_paiment' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.method_paiment} onChange={handleChange}>
              <option value='credit_card'>Credit Card</option>
              <option value='paypal'>PayPal</option>
              <option value='bank_transfer'>Bank Transfer</option>
              <option value='cash'>Cash</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export function OrderDetailsDialog({ isOpen, onClose, order, orderDetails, userName }) {
  if (!order || !orderDetails) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className='bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Completed</span>;
      case 'processing':
        return <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Processing</span>;
      case 'pending':
        return <span className='bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Pending</span>;
      case 'cancelled':
        return <span className='bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Cancelled</span>;
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

  const footer = (
    <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none' onClick={onClose}>
      Close
    </button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Order Details' footer={footer}>
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <h3 className='text-lg font-semibold text-gray-900'>Order #{order.id}</h3>
          {getStatusBadge(order.statut)}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-gray-500'>Customer</p>
            <p className='font-medium text-gray-900'>{userName}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Total Amount</p>
            <p className='font-medium text-gray-900'>${order.montant_totale.toFixed(2)}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Payment Method</p>
            <p className='font-medium text-gray-900'>{formatPaymentMethod(order.method_paiment)}</p>
          </div>
        </div>

        <div className='border-t pt-4'>
          <p className='text-sm text-gray-500 mb-2'>Order Items</p>
          {orderDetails.order_details && orderDetails.order_details.length > 0 ? (
            <table className='w-full text-sm text-left text-gray-500'>
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.order_details.map((item) => (
                  <tr key={item.id}>
                    <td>{item.livre?.libelle || 'Unknown'}</td>
                    <td>{item.quantite}</td>
                    <td>${item.prix.toFixed(2)}</td>
                    <td>${(item.prix * item.quantite).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='text-center text-gray-500'>No items found for this order.</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
