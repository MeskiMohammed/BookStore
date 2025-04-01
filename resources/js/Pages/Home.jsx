import React from 'react';
import App from '../Layout/store/app.jsx';
import BookSlider from '../HomeComponent/book-slider.jsx';
import books from '../TempData/books.json';
import HeroImage from '../../images/HeroImage.jpg';
import FreaturesImage from '../../images/FreaturesImage.png';
import ReductionImage from '../../images/ReductionImage.png';
import NiDiagramSuccessor from '../../icons/NiDiagramSuccessor.png';
function Home() {
  const bookGenres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Horror', 'Thriller', 'Historical Fiction', 'Nonfiction'];

  return (
    <App>
      {/* Hero */}
      <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Grid */}
        <div className='grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center'>
          <div>
            <h1 className='block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight  '>
              Commencez votre voyage avec <span className='text-blue-600'>Book Store</span>
            </h1>
            <p className='mt-3 text-lg text-gray-800  '>Découvrez une sélection soigneusement choisie de livres pour tous les passionnés de lecture.</p>

            {/* Buttons */}
            <div className='mt-7 grid gap-3 w-full sm:inline-flex'>
              <a className='py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none' href='#'>
                Explorer la librairie
                <svg className='shrink-0 size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='m9 18 6-6-6-6' />
                </svg>
              </a>
              <a className='py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none' href='#'>
                Contactez-nous
              </a>
            </div>
            {/* End Buttons */}
          </div>
          {/* End Col */}

          <div className='relative ms-4'>
            <img className='w-full rounded-md' src={HeroImage} alt='Hero Image' />
            <div class='absolute inset-0 -z-10 bg-gradient-to-tr from-blue-200 via-white/0 to-white/0 w-full h-full rounded-md mt-4 -mb-4 mr-4 -ml-4 lg:mt-6 lg:-mb-6 lg:mr-6 lg:-ml-6 transition-all duration-500 ease-in-out hover:from-gray-700 hover:via-white/0 hover:to-white/0'></div>
            {/* SVG*/}
            <div className='absolute bottom-0 start-0'>
              <svg className='w-2/3 ms-auto h-auto text-white  ' width='630' height='451' viewBox='0 0 630 451' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect x='531' y='352' width='99' height='99' fill='currentColor' />
                <rect x='140' y='352' width='106' height='99' fill='currentColor' />
                <rect x='482' y='402' width='64' height='49' fill='currentColor' />
                <rect x='433' y='402' width='63' height='49' fill='currentColor' />
                <rect x='384' y='352' width='49' height='50' fill='currentColor' />
                <rect x='531' y='328' width='50' height='50' fill='currentColor' />
                <rect x='99' y='303' width='49' height='58' fill='currentColor' />
                <rect x='99' y='352' width='49' height='50' fill='currentColor' />
                <rect x='99' y='392' width='49' height='59' fill='currentColor' />
                <rect x='44' y='402' width='66' height='49' fill='currentColor' />
                <rect x='234' y='402' width='62' height='49' fill='currentColor' />
                <rect x='334' y='303' width='50' height='49' fill='currentColor' />
                <rect x='581' width='49' height='49' fill='currentColor' />
                <rect x='581' width='49' height='64' fill='currentColor' />
                <rect x='482' y='123' width='49' height='49' fill='currentColor' />
                <rect x='507' y='124' width='49' height='24' fill='currentColor' />
                <rect x='531' y='49' width='99' height='99' fill='currentColor' />
              </svg>
            </div>
            {/* End SVG*/}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Hero */}

      {/* Icon Blocks */}
      <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pb-10 lg:pt-32 mx-auto'>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12'>
          {/* Icon Block */}
          <div>
        <svg class="shrink-0 size-9" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
            <div className='bg-linear-to-r from-blue-500 via-blue-50 to-transparent h-0.5 mt-6'>
              <div className='bg-blue-400 w-9 h-0.5'></div>
            </div>
            <div className='mt-5'>
              <h3 className='text-lg font-semibold text-gray-800 '>Accessible partout</h3>
              <p className='mt-1 text-gray-600 '>Accédez à votre librairie en ligne depuis n'importe quel appareil, où que vous soyez.</p>
            </div>
          </div>
          {/* End Icon Block */}

          {/* Icon Block */}
          <div>
            <svg className='shrink-0 size-9 text-gray-800 ' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M20 7h-9' />
              <path d='M14 17H5' />
              <circle cx='17' cy='17' r='3' />
              <circle cx='7' cy='7' r='3' />
            </svg>
            <div className='bg-linear-to-r from-blue-200 via-blue-50 to-transparent h-0.5 mt-6'>
              <div className='bg-blue-400 w-9 h-0.5'></div>
            </div>
            <div className='mt-5'>
              <h3 className='text-lg font-semibold text-gray-800 '>Personnalisable</h3>
              <p className='mt-1 text-gray-600 '>Créez votre bibliothèque personnelle et recevez des recommandations adaptées à vos goûts.</p>
            </div>
          </div>
          {/* End Icon Block */}

          {/* Icon Block */}
          <div>
            <svg className='shrink-0 size-9 text-gray-800 ' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
              <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
            </svg>
            <div className='bg-linear-to-r from-blue-200 via-blue-50 to-transparent h-0.5 mt-6'>
              <div className='bg-blue-400 w-9 h-0.5'></div>
            </div>
            <div className='mt-5'>
              <h3 className='text-lg font-semibold text-gray-800 '>Large sélection de livres</h3>
              <p className='mt-1 text-gray-600 '>Des milliers de titres disponibles : romans, essais, bandes dessinées et bien plus encore.</p>
            </div>
          </div>
          {/* End Icon Block */}

          {/* Icon Block */}
          <div>
            <svg className='shrink-0 size-9 text-gray-800 ' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z' />
              <path d='M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1' />
            </svg>
            <div className='bg-linear-to-r from-blue-200 via-blue-50 to-transparent h-0.5 mt-6'>
              <div className='bg-blue-400 w-9 h-0.5'></div>
            </div>
            <div className='mt-5'>
              <h3 className='text-lg font-semibold text-gray-800 '>Support 24/7</h3>
              <p className='mt-1 text-gray-600 '>Une équipe à votre écoute 24h/24, 7j/7 pour répondre à toutes vos questions.</p>
            </div>
          </div>
          {/* End Icon Block */}
        </div>
      </div>
      {/* End Icon Blocks */}

      <BookSlider title='Meilleures Ventes' books={books.bestSellers} />
      <BookSlider title='Sélection du Libraire' books={books.popular} />

      {/* Features */}
      <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        <div className='relative p-6 md:p-16'>
          {/* Grid */}
          <div className='relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center'>
            <div className='mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2'>
              <h2 className='text-2xl text-gray-800 font-bold sm:text-3xl  '>Des fonctionnalités pensées pour les passionnés de lecture</h2>

              {/* Tab Navs */}
              <nav className='grid gap-4 mt-5 md:mt-10' aria-label='Tabs' role='tablist' aria-orientation='vertical'>
                <button type='button' className='hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 p-4 md:p-5 rounded-xl       active' id='tabs-with-card-item-1' aria-selected='true' data-hs-tab='#tabs-with-card-1' aria-controls='tabs-with-card-1' role='tab'>
                  <span className='flex gap-x-6'>
                    <svg className='shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-gray-800    ' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z' />
                      <path d='M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z' />
                      <path d='M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z' />
                      <path d='M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z' />
                      <path d='M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z' />
                    </svg>
                    <span className='grow'>
                      <span className='block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800    '>Catalogue riche et varié</span>
                      <span className='block mt-1 text-gray-800'>Découvrez un large choix de livres, des classiques intemporels aux dernières nouveautés.</span>
                    </span>
                  </span>
                </button>

                <button type='button' className='hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 p-4 md:p-5 rounded-xl      ' id='tabs-with-card-item-2' aria-selected='false' data-hs-tab='#tabs-with-card-2' aria-controls='tabs-with-card-2' role='tab'>
                  <span className='flex gap-x-6'>
                    <svg className='shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-gray-800    ' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='m12 14 4-4' />
                      <path d='M3.34 19a10 10 0 1 1 17.32 0' />
                    </svg>
                    <span className='grow'>
                      <span className='block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800    '>Recherche et filtres avancés</span>
                      <span className='block mt-1 text-gray-800'>Trouvez facilement votre prochain livre grâce à nos filtres par genre, auteur et prix.</span>
                    </span>
                  </span>
                </button>

                <button type='button' className='hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 p-4 md:p-5 rounded-xl      ' id='tabs-with-card-item-3' aria-selected='false' data-hs-tab='#tabs-with-card-3' aria-controls='tabs-with-card-3' role='tab'>
                  <span className='flex gap-x-6'>
                    <svg className='shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-gray-800    ' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' />
                      <path d='M5 3v4' />
                      <path d='M19 17v4' />
                      <path d='M3 5h4' />
                      <path d='M17 19h4' />
                    </svg>
                    <span className='grow'>
                      <span className='block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800    '>Gestion simplifiée du panier</span>
                      <span className='block mt-1 text-gray-800'>Ajoutez vos livres préférés en un clic et passez commande rapidement.</span>
                    </span>
                  </span>
                </button>
              </nav>
              {/* End Tab Navs */}
            </div>
            {/* End Col */}

            <div className='lg:col-span-6'>
              <div className='relative'>
                {/* Tab Content */}
                <div>
                  <div id='tabs-with-card-1' role='tabpanel' aria-labelledby='tabs-with-card-item-1'>
                    <img className='shadow-xl shadow-gray-200 rounded-xl  ' src={FreaturesImage} alt='Features Image' />
                  </div>

                  <div id='tabs-with-card-2' className='hidden' role='tabpanel' aria-labelledby='tabs-with-card-item-2'>
                    <img className='shadow-xl shadow-gray-200 rounded-xl  ' src='https://images.unsplash.com/photo-1665686306574-1ace09918530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&h=720&q=80' alt='Features Image' />
                  </div>

                  <div id='tabs-with-card-3' className='hidden' role='tabpanel' aria-labelledby='tabs-with-card-item-3'>
                    <img className='shadow-xl shadow-gray-200 rounded-xl  ' src='https://images.unsplash.com/photo-1598929213452-52d72f63e307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&h=720&q=80' alt='Features Image' />
                  </div>
                </div>
                {/* End Tab Content */}

                {/* SVG Element */}
                <div className='hidden absolute top-0 end-0 translate-x-20 md:block lg:translate-x-20'>
                  <svg className='w-16 h-auto text-orange-500' width='121' height='135' viewBox='0 0 121 135' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164' stroke='currentColor' strokeWidth='10' strokeLinecap='round' />
                    <path d='M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5' stroke='currentColor' strokeWidth='10' strokeLinecap='round' />
                    <path d='M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874' stroke='currentColor' strokeWidth='10' strokeLinecap='round' />
                  </svg>
                </div>
                {/* End SVG Element */}
              </div>
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}

          {/* Background Color */}
          <div className='absolute inset-0 grid grid-cols-12 size-full'>
            <div className='col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full  '></div>
          </div>
          {/* End Background Color */}
        </div>
      </div>
      {/* End Features */}

      <BookSlider title='Our Best Fiction Books' books={books.scienceFiction} />

      <section class='bg-gray-50 py-8 antialiased  md:py-16'>
        <div class='mx-auto max-w-screen-xl px-4 2xl:px-0'>
          <div class='mb-4 flex items-center justify-between gap-4 md:mb-8'>
            <h2 class='text-xl font-semibold text-gray-900  sm:text-2xl'>Shop by category</h2>

            <a href='#' title='' class='flex items-center text-base font-medium text-primary-700 hover:underline '>
              See more categories
              <svg class='ms-1 h-5 w-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 12H5m14 0-4 4m4-4-4-4' />
              </svg>
            </a>
          </div>

          <div class='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {bookGenres.map((book) => {
              return (
                <a href='#' class='flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50   '>
                  <svg class='me-2 h-4 w-4 shrink-0 text-gray-900 ' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                    <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z'></path>
                  </svg>
                  <span class='text-sm font-medium text-gray-900 '>{book}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className='bg-white px-4 py-8 antialiased  md:py-16'>
        <div className='mx-auto grid max-w-screen-xl rounded-lg bg-gray-50 p-4  md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16'>
          <div className='lg:col-span-5 lg:mt-0'>
            <a href='#'>
              <img className='mb-4 h-56 w-56  sm:h-96 sm:w-96 md:h-full md:w-full rounded-md' src={ReductionImage} alt='peripherals' />
              {/* <img className='mb-4 hidden  md:h-full' src='https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components-dark.svg' alt='peripherals' /> */}
            </a>
          </div>
          <div className='me-auto place-self-center lg:col-span-7'>
            <h1 className='mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900  md:text-4xl'>
              Offre Spéciale
              <br />
              <br />
              <span className='text-primary-600'>-10%</span> sur votre première commande.
            </h1>
            <br />

            <p className='mb-6 text-gray-500 '>Inscrivez-vous à notre newsletter pour recevoir un bon de réduction !</p>
            <br />

            <a href='#' className='inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 '>
              {' Précommandez '}
            </a>
          </div>
        </div>
      </section>
    </App>
  );
}

export default Home;
