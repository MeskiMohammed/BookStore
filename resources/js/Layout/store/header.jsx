import Logo from '../../../images/Logo.png';
import { useState } from 'react';

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full pb-7'>
      <nav className='relative w-full flex flex-wrap basis-full items-center max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex w-full justify-between items-center'>
          {/* Logo */}
          <a className='flex-none rounded-xl text-xl inline-block font-semibold' href='/' aria-label='Logo'>
            <img src={Logo} width={250} height={100} alt='' />
          </a>

                  {/* Desktop Navigation */}
        <div className='hidden lg:block w-full lg:w-auto mt-4 lg:mt-0'>
          <div className='flex flex-col lg:flex-row lg:justify-center lg:items-center gap-y-4 lg:gap-y-0 lg:gap-x-7'>
            <div>
              <a className='relative inline-block text-blue-950 before:absolute before:bottom-0.5 before:start-0 before:w-full before:h-1 before:bg-primary-400' href='/' aria-current='page'>
                Accueil
              </a>
            </div>
            <div>
              <a className='inline-block text-black hover:text-gray-600' href='/catalogue'>
                Catalogue
              </a>
            </div>
            <div>
              <a className='inline-block text-black hover:text-gray-600' href='/propos'>
                À propos
              </a>
            </div>
            <div>
              <a className='inline-block text-black hover:text-gray-600' href='/contact'>
                Contact
              </a>
            </div>
          </div>
        </div>
          {/* Button Group */}
          <div className='flex items-center gap-x-1 lg:gap-x-2'>
            <a href='/register' className='hidden lg:inline-flex cursor-pointer py-2 px-3 items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none '>
              Inscrivez-vous
            </a>
            <a href='/login' className='hidden lg:inline-flex  cursor-pointer py-2 px-3 items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border border-transparent bg-primary-400 text-black hover:bg-primary-500 disabled:opacity-50 disabled:pointer-events-none '>
              Login
            </a>

            {/* Mobile menu toggle */}
            <button 
              type='button' 
              className='lg:hidden size-10 flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100'
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label='Toggle navigation'
            >
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
              <a className='relative inline-block text-blue-950' href='/' aria-current='page'>
                Accueil
              </a>
              <a className='inline-block text-black hover:text-gray-600' href='/catalogue'>
                Catalogue
              </a>
              <a className='inline-block text-black hover:text-gray-600' href='#'>
                À propos
              </a>
              <a className='inline-block text-black hover:text-gray-600' href='#'>
                Contact
              </a>
              <div className='flex gap-x-2 mt-2'>
                <a href='/register' className='flex-1 text-center cursor-pointer py-2 px-3 text-sm font-medium rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100'>
                  Inscrivez-vous
                </a>
                <a href='/login' className='flex-1 text-center cursor-pointer py-2 px-3 text-sm font-medium rounded-xl border border-transparent bg-primary-400 text-black hover:bg-primary-500'>
                  Login
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
