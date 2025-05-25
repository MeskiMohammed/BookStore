import { useState } from 'react';
import { Link, usePage,router } from '@inertiajs/react';
import Logo from '@/../images/Logo.png';
import { CartProvider, useCart } from '@/components/store/cart-context';

// Helper to get book image or placeholder
function getBookImage(image) {
  if (!image || typeof image !== 'string' || image.trim() === '' || image === 'null' || image === 'undefined') {
    return '/images/books/placeholder.svg';
  }
  return image;
}

function CartDropdown({ isOpen, onClose }) {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Panier</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Votre panier est vide</p>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-2 border-b border-gray-100">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src={getBookImage(item.image)} alt={item.libelle} className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.titre}</h4>
                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                    <p className="text-sm font-medium">{item.prix} €</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">{getCartTotal().toFixed(2)} €</span>
              </div>
              <Link
                href="/checkout"
                className="w-full block text-center py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Commander
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Header() {
  const { url } = usePage();
  const { auth } = usePage().props;
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className='flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full pb-7'>
      <nav className='relative w-full flex flex-wrap basis-full items-center max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex w-full justify-between items-center'>
          {/* Logo */}
          <Link className='flex-none rounded-xl text-xl inline-block font-semibold' href='/' aria-label='Logo'>
            <img src={Logo} width={250} height={100} alt='' />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:block w-full lg:w-auto mt-4 lg:mt-0'>
            <div className='flex flex-col lg:flex-row lg:justify-center lg:items-center gap-y-4 lg:gap-y-0 lg:gap-x-7'>
              <div>
                <Link
                  className={`relative inline-block transition-colors duration-200 before:absolute before:-bottom-1 before:left-0 before:right-0 before:h-1 before:rounded-full before:transition-transform before:duration-300 before:origin-center before:bg-blue-500
                    ${url === '/' ? 'text-blue-950 before:scale-x-100' : 'text-black hover:text-gray-600 before:scale-x-0 hover:before:scale-x-100'}`}
                  href='/'
                  aria-current='page'>
                  Accueil
                </Link>
              </div>
              <div>
                <Link
                  className={`relative inline-block transition-colors duration-200 before:absolute before:-bottom-1 before:left-0 before:right-0 before:h-1 before:rounded-full before:transition-transform before:duration-300 before:origin-center before:bg-blue-500
                    ${url.startsWith('/catalogue') ? 'text-blue-950 before:scale-x-100' : 'text-black hover:text-gray-600 before:scale-x-0 hover:before:scale-x-100'}`}
                  href='/catalogue'>
                  Catalogue
                </Link>
              </div>
              <div>
                <Link
                  className={`relative inline-block transition-colors duration-200 before:absolute before:-bottom-1 before:left-0 before:right-0 before:h-1 before:rounded-full before:transition-transform before:duration-300 before:origin-center before:bg-blue-500
                    ${url === '/propos' ? 'text-blue-950 before:scale-x-100' : 'text-black hover:text-gray-600 before:scale-x-0 hover:before:scale-x-100'}`}
                  href='/propos'>
                  À propos
                </Link>
              </div>
              <div>
                <Link
                  className={`relative inline-block transition-colors duration-200 before:absolute before:-bottom-1 before:left-0 before:right-0 before:h-1 before:rounded-full before:transition-transform before:duration-300 before:origin-center before:bg-blue-500
                    ${url === '/contact' ? 'text-blue-950 before:scale-x-100' : 'text-black hover:text-gray-600 before:scale-x-0 hover:before:scale-x-100'}`}
                  href='/contact'>
                  Contact
                </Link>
              </div>

              {auth.user?.is_admin && (
                <div>
                  <Link
                    className={`relative inline-block transition-colors duration-200 before:absolute before:-bottom-1 before:left-0 before:right-0 before:h-1 before:rounded-full before:transition-transform before:duration-300 before:origin-center before:bg-blue-500
                      ${url === '/admin' ? 'text-blue-950 before:scale-x-100' : 'text-black hover:text-gray-600 before:scale-x-0 hover:before:scale-x-100'}`}
                    href={route('dashboard')}>
                    Admin Panel
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* Button Group */}
          <div className='flex items-center gap-x-1 lg:gap-x-2'>
            {/* Cart Button */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>

            {!auth.user ? (
              <>
                <Link href='/register' className='hidden lg:inline-flex cursor-pointer py-2 px-3 items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none '>
                  Inscrivez-vous
                </Link>
                <Link href='/login' className='hidden lg:inline-flex  cursor-pointer py-2 px-3 items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none '>
                  Login
                </Link>
              </>
            ) : (
              <span
                onClick={() => {
                  router.post('/logout');
                }}
                className='bloc cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                Sign out
              </span>
            )}
            {/* Mobile menu toggle */}
            <button type='button' className='lg:hidden size-10 flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100' onClick={toggleMenu} aria-expanded={isMenuOpen} aria-label='Toggle navigation'>
              {isMenuOpen ? (
                <svg className='shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M18 6 6 18'></path>
                  <path d='m6 6 12 12'></path>
                </svg>
              ) : (
                <svg className='shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <line x1='3' x2='21' y1='6' y2='6'></line>
                  <line x1='3' x2='21' y1='12' y2='12'></line>
                  <line x1='3' x2='21' y1='18' y2='18'></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='lg:hidden w-full mt-4'>
            <div className='flex flex-col gap-y-4'>
              <Link className='relative inline-block text-blue-950' href='/' aria-current='page'>
                Accueil
              </Link>
              <Link className='inline-block text-black hover:text-gray-600' href='/catalogue'>
                Catalogue
              </Link>
              <Link className='inline-block text-black hover:text-gray-600' href='/propos'>
                À propos
              </Link>
              <Link className='inline-block text-black hover:text-gray-600' href='/contact'>
                Contact
              </Link>
              <div className='flex gap-x-2 mt-2'>
                <Link href='/register' className='flex-1 text-center cursor-pointer py-2 px-3 text-sm font-medium rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100'>
                  Inscrivez-vous
                </Link>
                <Link href='/login' className='flex-1 text-center cursor-pointer py-2 px-3 text-sm font-medium rounded-xl border border-transparent bg-blue-500 text-black hover:bg-blue-600'>
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className='bg-white rounded-lg shadow-sm  m-4'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <Link href='/' className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'>
            <img src={Logo} width={250} height={100} alt='' />
          </Link>
          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 '>
            <li>
              <Link href='#' className='hover:underline me-4 md:me-6'>
                About
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:underline me-4 md:me-6'>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:underline me-4 md:me-6'>
                Licensing
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:underline'>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto  lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center '>
          © 2025{' '}
          <Link href='/' className='hover:underline'>
            BookStore™
          </Link>
          . Tous droits réservés.
        </span>
      </div>
    </footer>
  );
}

export default function StoreLayout({ children }) {
  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
