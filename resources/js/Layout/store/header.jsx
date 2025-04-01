import Logo from '../../../images/Logo.png';

export default function Header() {
  return (
    <header className='flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-7'>
      <nav className='relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center mx-auto'>
        <div className='lg:col-span-3 flex items-center'>
          {/* Logo */}
          <a className='flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80' href='../templates/creative-agency/index.html' aria-label='Preline'>
            <img src={Logo} width={250} height={100} alt='' />
          </a>
          {/* End Logo */}

          <div className='ms-1 sm:ms-2'></div>
        </div>

        {/* Button Group */}
        <div className='flex items-center gap-x-1 lg:gap-x-2 ms-auto py-1 lg:ps-6 lg:order-3 lg:col-span-3'>
          <a href='/register' className='cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none            '>
            Inscrivez-vous
          </a>
          <a href='/login' className='cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border border-transparent bg-primary-400 text-black hover:bg-primary-500 focus:outline-hidden focus:bg-primary-500 transition disabled:opacity-50 disabled:pointer-events-none'>
            Login
          </a>

          <div className='lg:hidden'>
            <button type='button' className='hs-collapse-toggle size-9.5 flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none        ' id='hs-navbar-hcail-collapse' aria-expanded='false' aria-controls='hs-navbar-hcail' aria-label='Toggle navigation' data-hs-collapse='#hs-navbar-hcail'>
              <svg className='hs-collapse-open:hidden shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokewidth='2' strokelinecap='round' strokelinejoin='round'>
                <line x1='3' x2='21' y1='6' y2='6'></line>
                <line x1='3' x2='21' y1='12' y2='12'></line>
                <line x1='3' x2='21' y1='18' y2='18'></line>
              </svg>
              <svg className='hs-collapse-open:block hidden shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokewidth='2' strokelinecap='round' strokelinejoin='round'>
                <path d='M18 6 6 18'></path>
                <path d='m6 6 12 12'></path>
              </svg>
            </button>
          </div>
        </div>
        {/* End Button Group */}

        {/* Collapse */}
        <div id='hs-navbar-hcail' className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow lg:block lg:w-auto lg:basis-auto lg:order-2 lg:col-span-6' aria-labelledby='hs-navbar-hcail-collapse'>
          <div className='flex flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 lg:mt-0'>
            <div>
              <a className='relative inline-block text-blue-950 focus:outline-hidden before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-primary-400  ' href='#' aria-current='page'>
                Accueil
              </a>
            </div>
            <div>
              <a className='inline-block text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600 ' href='/catalogue'>
                Catalogue
              </a>
            </div>
            <div>
              <a className='inline-block text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600' href='#'>
                À propos
              </a>
            </div>
            <div>
              <a className='inline-block text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600' href='#'>
                Contact
              </a>
            </div>
          </div>
        </div>
        {/* End Collapse */}
      </nav>
    </header>
  );
}
