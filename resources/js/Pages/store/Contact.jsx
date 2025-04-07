import React from 'react';
import BooksBG from '../../../images/BooksBG.jpg';
import App from '@/Layout/store/app';

function Contact() {
  return (
    <App>
      {/* Contact */}
      <section class='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Breadcrumb */}
        <div className='h-80 rounded text-center flex items-center justify-center' style={{ backgroundImage: `url(${BooksBG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h1 className='text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl'>Contact</h1>
        </div>
        {/* End Breadcrumb */}
        <div class='mb-4 mx-auto py-40 items-end justify-center space-y-4 sm:flex sm:space-y-0 md:mb-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-6 md:gap-8 lg:gap-12'>
            {/* Card */}
            <div className='flex flex-col border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 blue'>
              <h2 className='mb-8 text-xl font-semibold text-gray-800 blue'>Remplissez le formulaire</h2>

              <form>
                <div className='grid gap-4'>
                  {/* Grid */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label htmlFor='hs-firstname-contacts-1' className='sr-only'>
                        Prenom
                      </label>
                      <input type='text' name='hs-firstname-contacts-1' id='hs-firstname-contacts-1' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none' placeholder='First Name' />
                    </div>

                    <div>
                      <label htmlFor='hs-lastname-contacts-1' className='sr-only'>
                        Nom
                      </label>
                      <input type='text' name='hs-lastname-contacts-1' id='hs-lastname-contacts-1' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none' placeholder='Last Name' />
                    </div>
                  </div>
                  {/* End Grid */}

                  <div>
                    <label htmlFor='hs-email-contacts-1' className='sr-only'>
                      Email
                    </label>
                    <input type='email' name='hs-email-contacts-1' id='hs-email-contacts-1' autocomplete='email' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none' placeholder='Email' />
                  </div>

                  <div>
                    <label htmlFor='hs-phone-number-1' className='sr-only'>
                      Telephome
                    </label>
                    <input type='text' name='hs-phone-number-1' id='hs-phone-number-1' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none' placeholder='Phone Number' />
                  </div>

                  <div>
                    <label htmlFor='hs-about-contacts-1' className='sr-only'>
                      Détails
                    </label>
                    <textarea id='hs-about-contacts-1' name='hs-about-contacts-1' rows='4' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none' placeholder='Details'></textarea>
                  </div>
                </div>
                {/* End Grid */}

                <div className='mt-4 grid'>
                  <button type='submit' className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'>
                    Envoyer une demande
                  </button>
                </div>

                <div className='mt-3 text-center'>
                  <p className='text-sm text-gray-500 blue'>Nous vous répondrons dans 1 à 2 jours ouvrables.</p>
                </div>
              </form>
            </div>
            {/* End Card */}
            {/* End Col */}

            <div className='space-y-8 lg:space-y-16'>
              <div>
                <h3 className='mb-5 font-semibold text-black '>Notre adresse</h3>

                {/* Grid */}
                <div className='grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12'>
                  <div className='flex gap-4'>
                    <svg className='shrink-0 size-5 text-gray-500 ' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'></path>
                      <circle cx='12' cy='10' r='3'></circle>
                    </svg>

                    <div className='grow'>
                      <p className='text-sm text-gray-600 '>Morocco</p>
                      <address className='mt-1 text-black not-italic '>
                        Fès-Boulemane
                        <br />
                        21, rue Sebta, z.i. Doukkarat
                      </address>
                    </div>
                  </div>
                </div>
                {/* End Grid */}
              </div>

              <div>
                <h3 className='mb-5 font-semibold text-black '>Nos contacts</h3>

                {/* Grid */}
                <div className='grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12'>
                  <div className='flex gap-4'>
                    <svg className='shrink-0 size-5 text-gray-500 ' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z'></path>
                      <path d='m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10'></path>
                    </svg>

                    <div className='grow'>
                      <p className='text-sm text-gray-600 '>Envoyez-nous un e-mail</p>
                      <p>
                        <a className='relative inline-block font-medium text-black before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-blue-400 hover:before:bg-black focus:outline-hidden focus:before:bg-black   ' href='mailto:example@site.so'>
                          BookStore@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <svg className='shrink-0 size-5 text-gray-500 ' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                    </svg>

                    <div className='grow'>
                      <p className='text-sm text-gray-600 '>Appelez-nous</p>
                      <p>
                        <a className='relative inline-block font-medium text-black before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-blue-400 hover:before:bg-black focus:outline-hidden focus:before:bg-black   ' href='mailto:example@site.so'>
                          +212 66 00 00 66
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Grid */}
              </div>
            </div>
            {/* End Col */}
          </div>
        </div>
      </section>
      {/* End Contact */}
    </App>
  );
}

export default Contact;
