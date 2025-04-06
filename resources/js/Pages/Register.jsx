import React from 'react';
import Logo from '../../images/Logo.png';

function Register() {
  return (
    <section className='bg-gray-50  '>
      <div class='grid grid-cols-1 lg:grid-cols-2'>
        <div class='flex flex-col items-center justify-center px-2 py-8 md:h-screen lg:py-0 order-none lg:order-last w-full bg-white md:mt-0 xl:p-0'>
          <a href='#' class='flex items-center mb-6 text-2xl font-semibold text-gray-900  '>
            <img class='' src={Logo} alt='logo' />
          </a>
          <div class=''>
            <div class='p-6 space-y-4 md:space-y-6 sm:p-8 '>
              <h1 class='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  '> Créer un compte</h1>
              <form class='space-y-4 md:space-y-6' action='# '>
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label
                      for='first_name'
                      class='block mb-2 text-sm font-medium text-gray
                    900  '>
                      Prénom
                    </label>
                    <input type='text' id='first_name' name='first_name' placeholder='Prenom' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none' />
                  </div>
                  <div>
                    <label
                      for='last_name'
                      class='block mb-2 text-sm font-medium text-gray
                    900  '>
                      Nom
                    </label>
                    <input type='text' id='last_name' name='last_name' placeholder='Nom' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none' />
                  </div>
                </div>
                <div>
                  <label for='email' class='block mb-2 text-sm font-medium text-gray-900  '>
                    Votre Email
                  </label>
                  <input type='email' name='email' id='email' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none' placeholder='Nom@company.com' required='' />
                </div>
                <div>
                  <label
                    for='ville'
                    class='block mb-2 text-sm font-medium text-gray-
                  900  '>
                    Ville
                  </label>
                  <input
                    type='text'
                    name='ville'
                    id='ville'
                    class='bg-gray-
                  50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary
                  -600 focus:border-primary-600 block w-full p-2.5 outline-none'
                    placeholder='ex. Casablanca'
                    required=''
                  />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label for='password' class='block mb-2 text-sm font-medium text-gray-900  '>
                      Password
                    </label>
                    <input type='password' name='password' id='password' placeholder='••••••••' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none' required='' />
                  </div>
                  <div>
                    <label for='confirm-password' class='block mb-2 text-sm font-medium text-gray-900  '>
                      Confirm password
                    </label>
                    <input type='confirm-password' name='confirm-password' id='confirm-password' placeholder='••••••••' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none' required='' />
                  </div>
                </div>
                <div class='flex items-start '>
                  <div class='flex items-center h-5 '>
                    <input id='terms' aria-describedby='terms' type='checkbox' class='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 outline-none' required='' />
                  </div>
                  <div class='ml-3 text-sm '>
                    <label for='terms' class='font-light text-gray-500  '>
                      I accept the{' '}
                      <a class='font-medium text-primary-600 hover:underline  ' href='# '>
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button type='submit' class='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center    '>
                  Create an account
                </button>
                <p class='text-sm font-light text-gray-500  '>
                  Already have an account?{' '}
                  <a href='/login' class='font-medium text-primary-600 hover:underline  '>
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className='hidden lg:flex flex-col items-start justify-center px-6 py-8 md:h-screen lg:py-0 bg-gray-50'>
          <div class='space-y-6 sm:space-y-8'>
            {/* <!-- Title --> */}
            <div class='space-y-2 md:space-y-4'>
              <h2 class='font-bold text-3xl lg:text-4xl text-gray-800 '>Rejoignez notre communauté de passionnés de lecture</h2>
              <p class='text-gray-500 '>Créez un compte pour découvrir, acheter et organiser vos livres préférés. Suivez votre progression de lecture et explorez de nouveaux horizons littéraires.</p>
            </div>
            {/* <!-- End Title --> */}

            {/* <!-- List --> */}
            <ul class='space-y-2 sm:space-y-4'>
              <li class='flex gap-x-3'>
                <span class='mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600'>
                  <svg class='shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
                    <polyline points='20 6 9 17 4 12' />
                  </svg>
                </span>
                <div class='grow'>
                  <span class='text-sm sm:text-base text-gray-500 '>
                    <span class='font-bold'>Accès illimité</span> à une vaste collection de livres
                  </span>
                </div>
              </li>

              <li class='flex gap-x-3'>
                <span class='mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600'>
                  <svg class='shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
                    <polyline points='20 6 9 17 4 12' />
                  </svg>
                </span>
                <div class='grow'>
                  <span class='text-sm sm:text-base text-gray-500 '>Suivi et organisation de votre bibliothèque personnelle</span>
                </div>
              </li>

              <li class='flex gap-x-3'>
                <span class='mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600'>
                  <svg class='shrink-0 size-3.5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
                    <polyline points='20 6 9 17 4 12' />
                  </svg>
                </span>
                <div class='grow'>
                  <span class='text-sm sm:text-base text-gray-500 '>
                    Profitez de <span class='font-bold'>réductions exclusives</span> et d'offres spéciales
                  </span>
                </div>
              </li>
            </ul>
            {/* <!-- End List --> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
