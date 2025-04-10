import React, { useState } from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import UserInfo from "@/components/profile/user-info"
import PasswordChange from "@/components/profile/password-change"
import PurchaseHistory from "@/components/profile/purchase-history"
import BooksBG from '@/../images/BooksBG.jpg';

function profile() {

    const [activeTab, setActiveTab] = useState("info");

  return (
    <StoreLayout>
      <section className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto py-8 px-4'>
        {/* Breadcrumb */}
        <div className='h-80 rounded text-center flex items-center justify-center' style={{ backgroundImage: `url(${BooksBG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h1 className='text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl'>Profile</h1>
        </div>
        {/* End Breadcrumb */}
          <div className='bg-white rounded-lg shadow-md overflow-hidden mt-10'>
            {/* Tabs */}
            <div className='flex border-b'>
              <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'info' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('info')}>
                Personal Information
              </button>
              <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'password' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('password')}>
                Change Password
              </button>
              <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('history')}>
                Purchase History
              </button>
            </div>

            {/* Tab Content */}
            <div className='p-6'>
              {activeTab === 'info' && <UserInfo />}
              {activeTab === 'password' && <PasswordChange />}
              {activeTab === 'history' && <PurchaseHistory />}
            </div>
          </div>
        </div>
      </section>
    </StoreLayout>
  );
}

export default profile;
