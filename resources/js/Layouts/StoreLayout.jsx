import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Logo from '@/../images/Logo.png';
import { CartProvider } from '@/components/store/cart-context';

function Header() {
  const { url } = usePage();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

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
                    ${url === '/catalogue' ? 'text-blue-950 before:scale-x-100' : 'text-black hover:text-gray-600 before:scale-x-0 hover:before:scale-x-100'}`}
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
            </div>
          </div>
          {/* Button Group */}
          <div className='flex items-center gap-x-1 lg:gap-x-2'>
            <Link href='/register' className='hidden lg:inline-flex cursor-pointer py-2 px-3 items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none '>
              Inscrivez-vous
            </Link>
            <Link href='/login' className='hidden lg:inline-flex  cursor-pointer py-2 px-3 items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none '>
              Login
            </Link>

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

export default function App({ children }) {
  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
