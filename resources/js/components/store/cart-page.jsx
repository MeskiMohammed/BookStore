'use client';

import { Link } from '@inertiajs/react';
import { useCart } from '@/components/store/cart-context';

// Helper to get book image or placeholder
function getBookImage(image) {
  if (!image || typeof image !== 'string' || image.trim() === '' || image === 'null' || image === 'undefined') {
    return '/images/books/placeholder.svg';
  }
  return image;
}

export default function CartPage() {
  const { cartItems, updateCartItemQuantity, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Your Cart</h1>
          <p className='mt-4 text-gray-500'>Your cart is empty.</p>
          <Link href='/catalogue' className='mt-6 inline-block rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500'>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Your Cart</h1>

        <div className='mt-12'>
          <div className='flow-root'>
            <ul role='list' className='-my-6 divide-y divide-gray-200'>
              {cartItems.map((item) => (
                <li key={item.id} className='flex py-6'>
                  <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                    <img src={getBookImage(item.image)} alt={item.libelle} className='h-full w-full object-cover object-center' />
                  </div>

                  <div className='ml-4 flex flex-1 flex-col'>
                    <div>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <h3>
                          <Link href={`/catalogue/${item.id}`}>{item.libelle}</Link>
                        </h3>
                        <p className='ml-4'>€{(item.prix * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className='mt-1 text-sm text-gray-500'>{item.auteur}</p>
                    </div>
                    <div className='flex flex-1 items-end justify-between text-sm'>
                      <div className='flex items-center'>
                        <label htmlFor={`quantity-${item.id}`} className='mr-2 text-gray-500'>
                          Qty
                        </label>
                        <div className='flex items-center'>
                          <button
                            type='button'
                            className='rounded-l-md border border-gray-300 px-2 py-1 text-gray-900 hover:bg-gray-50'
                            onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </button>
                          <input
                            type='number'
                            id={`quantity-${item.id}`}
                            name={`quantity-${item.id}`}
                            min='1'
                            className='w-12 border-y border-gray-300 py-1 text-center text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
                            value={item.quantity}
                            onChange={(e) => {
                              const value = Math.max(1, Number.parseInt(e.target.value) || 1);
                              updateCartItemQuantity(item.id, value);
                            }}
                          />
                          <button
                            type='button'
                            className='rounded-r-md border border-gray-300 px-2 py-1 text-gray-900 hover:bg-gray-50'
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className='flex'>
                        <button
                          type='button'
                          className='font-medium text-red-600 hover:text-red-500'
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-10 border-t border-gray-200 pt-6'>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <p>Subtotal</p>
            <p>${getCartTotal().toFixed(2)}</p>
          </div>
          <p className='mt-0.5 text-sm text-gray-500'>Shipping and taxes calculated at checkout.</p>
          <div className='mt-6'>
            <Link href='/checkout' className='flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700'>
              Checkout
            </Link>
          </div>
          <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
            <p>
              or{' '}
              <Link href='/catalogue' className='font-medium text-blue-600 hover:text-blue-500'>
                Continue Shopping
                <span aria-hidden='true'> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
