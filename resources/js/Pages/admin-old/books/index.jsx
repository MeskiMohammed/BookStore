import App from '../../../Layout/admin/app.jsx';

export default function BooksIndex() {
  return (
    <App>
      <div className='p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5  '>
        <div className='w-full mb-1'>
          <div className='mb-4 flex justify-between'>
            <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl '>All products</h1>
            <button id='createProductButton' className='text-white self-end bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5   focus:outline-none ' type='button' data-drawer-target='drawer-create-product-default' data-drawer-show='drawer-create-product-default' aria-controls='drawer-create-product-default' data-drawer-placement='right'>
              Add new product
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden shadow'>
              <table className='min-w-full divide-y divide-gray-200 table-fixed '>
                <thead className='bg-gray-100 '>
                  <tr>
                    <th scope='col' className='p-4 text-xs font-medium text-left text-gray-500 uppercase '>
                      Product Name
                    </th>
                    <th scope='col' className='p-4 text-xs font-medium text-left text-gray-500 uppercase '>
                      Technology
                    </th>
                    <th scope='col' className='p-4 text-xs font-medium text-left text-gray-500 uppercase '>
                      Description
                    </th>
                    <th scope='col' className='p-4 text-xs font-medium text-left text-gray-500 uppercase '>
                      ID
                    </th>
                    <th scope='col' className='p-4 text-xs font-medium text-left text-gray-500 uppercase '>
                      Price
                    </th>
                    <th scope='col' className='p-4 text-xs font-medium text-left text-gray-500 uppercase '>
                      Discount
                    </th>
                    <th scope='col' className='p-4 text-xs font-medium text-left text-gray-500 uppercase '>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200  '>
                  <tr className='hover:bg-gray-100 '>
                    <td className='p-4 text-sm font-normal text-gray-500 whitespace-nowrap '>
                      <div className='text-base font-semibold text-gray-900 '>React UI Kit</div>
                      <div className='text-sm font-normal text-gray-500 '>Html templates</div>
                    </td>
                    <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap '>React JS</td>
                    <td className='max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs '>Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classNamees from Tailwind CSS and designed in Figma.</td>
                    <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap '>#633293</td>
                    <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap '>$129</td>
                    <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap '>No</td>

                    <td className='p-4 space-x-2 whitespace-nowrap'>
                      <button type='button' id='updateProductButton' data-drawer-target='drawer-update-product-default' data-drawer-show='drawer-update-product-default' aria-controls='drawer-update-product-default' data-drawer-placement='right' className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300   '>
                        <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z'></path>
                          <path fill-rule='evenodd' d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z' clip-rule='evenodd'></path>
                        </svg>
                        Update
                      </button>
                      <button type='button' id='deleteProductButton' data-drawer-target='drawer-delete-product-default' data-drawer-show='drawer-delete-product-default' aria-controls='drawer-delete-product-default' data-drawer-placement='right' className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 '>
                        <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                          <path fill-rule='evenodd' d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z' clip-rule='evenodd'></path>
                        </svg>
                        Delete item
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}
