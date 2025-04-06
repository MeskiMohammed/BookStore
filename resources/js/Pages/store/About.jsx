import React from 'react';
import App from '../../Layout/store/app';
import BooksBG from '../../../images/BooksBG.jpg';
import about_1 from '../../../images/about_1.jpg';
import about_2 from '../../../images/about_2.jpg';

function About() {
  return (
    <App>
      <main class='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Breadcrumb */}
        <div className='h-80 rounded text-center flex items-center justify-center' style={{ backgroundImage: `url(${BooksBG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h1 className='text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl'>Contact</h1>
        </div>
        {/* End Breadcrumb */}
        <section class='py-14 lg:py-24 relative'>
          <div class='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative '>
            <div class='grid grid-cols-1 lg:grid-cols-2 gap-9'>
              <div class='img-box'>
                <img src={about_1} alt='About Us tailwind page' class='rounded-lg max-lg:mx-auto object-cover' />
              </div>
              <div class='lg:pl-[100px] flex items-center'>
                <div class='data w-full'>
                  <h2 class='font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative'>À propos de nous</h2>
                  <p class='font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto'>Bienvenue chez BookStore, votre librairie en ligne dédiée aux passionnés de lecture. Nous croyons que chaque livre est une porte ouverte vers de nouvelles idées, de nouvelles aventures et de nouveaux savoirs. Notre mission est de rendre la lecture accessible à tous, en proposant un large choix de livres, des classiques intemporels aux dernières nouveautés, avec une expérience d’achat simple et agréable.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class='py-14 lg:py-24 relative'>
          <div class='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative '>
            <div class='grid grid-cols-1 lg:grid-cols-2 lg:gap-9 '>
              <div class='lg:pr-24 flex items-center'>
                <div class='data w-full'>
                  <img src={about_2} alt='About Us tailwind page' class='rounded-lg block lg:hidden mb-9 mx-auto object-cover' />
                  <h2 class='font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center'>Notre Histoire</h2>
                  <p class='font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto'>Tout a commencé en 2020, en pleine pandémie de Covid-19. Alors que les librairies physiques étaient fermées, nous avons eu l'idée de livrer des livres via les réseaux sociaux, permettant aux lecteurs de continuer à s’évader et apprendre malgré le confinement. Face au succès grandissant, nous avons décidé d’aller encore plus loin. En 2025, nous avons lancé notre site web pour offrir un catalogue plus large, un processus de commande plus simple et une expérience de lecture encore plus fluide. Aujourd’hui, BookStore continue de grandir, porté par une communauté de passionnés qui partagent notre amour des livres.</p>
                </div>
              </div>
              <div class='img-box '>
                <img src={about_2} alt='About Us tailwind page' class='rounded-lg hidden lg:block object-cover' />
              </div>
            </div>
          </div>
        </section>
        {/* Features */}
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Title */}
        <div className="max-w-2xl w-3/4 m-auto lg:w-1/2 mb-6 sm:mb-10 md:mb-16 text-center ">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-black font-semibold">
      Nos résultats en chiffres
      </h2>
    </div>
    {/* End Title */}
  {/* Grid */}
  <div className="grid items-center lg:grid-cols-12 gap-6 lg:gap-12">
    <div className="lg:col-span-4">
      {/* Stats */}
      <div className="lg:pe-6 xl:pe-12">
        <p className="text-6xl font-bold leading-10 text-blue-600">
          95%
          <span className="ms-1 inline-flex items-center gap-x-1 bg-gray-200 font-medium text-gray-800 text-xs leading-4 rounded-full py-0.5 px-2 blue blue">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
            </svg>
            +8% this month
          </span>
        </p>
        <p className="mt-2 sm:mt-3 text-gray-500 blue">
          of our customers love our fast book deliveries and collection.
        </p>
      </div>
      {/* End Stats */}
    </div>
    {/* End Col */}

    <div className="lg:col-span-8 relative lg:before:absolute lg:before:top-0 lg:before:-start-12 lg:before:w-px lg:before:h-full lg:before:bg-gray-200 lg:blue">
      <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-3 sm:gap-8">
        {/* Stats */}
        <div>
          <p className="text-3xl font-semibold text-blue-600">99.9%</p>
          <p className="mt-1 text-gray-500 blue">successful order deliveries</p>
        </div>
        {/* End Stats */}

        {/* Stats */}
        <div>
          <p className="text-3xl font-semibold text-blue-600">5,000+</p>
          <p className="mt-1 text-gray-500 blue">books available in our collection</p>
        </div>
        {/* End Stats */}

        {/* Stats */}
        <div>
          <p className="text-3xl font-semibold text-blue-600">10,000+</p>
          <p className="mt-1 text-gray-500 blue">happy readers and counting</p>
        </div>
        {/* End Stats */}
      </div>
    </div>
    {/* End Col */}
  </div>
  {/* End Grid */}
</div>
{/* End Features */}
{/* Témoignages */}
<div className="py-10">
  {/* Titre */}
  <div className="max-w-2xl w-3/4 m-auto lg:w-1/2 mb-6 sm:mb-10 md:mb-16 text-center">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl text-black font-semibold">
      Apprécié par les amateurs de lecture à travers le monde
    </h2>
  </div>
  {/* Fin Titre */}

  {/* Grille */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Carte */}
    <div className="flex h-auto">
      <div className="flex flex-col bg-white rounded-xl">
        <div className="flex-auto p-4 md:p-6">
          <p className="text-base italic md:text-lg text-gray-800">
            " J'adore cette librairie en ligne ! J'ai trouvé des éditions rares que je cherchais depuis des années. Livraison rapide et service client au top ! "
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-b-xl md:px-7">
          <div className="flex items-center gap-x-3">
            <div className="shrink-0">
              <img className="size-8 sm:size-11.5 rounded-full" src="https://randomuser.me/api/portraits/women/45.jpg" alt="Avatar" />
            </div>
            <div className="grow">
              <p className="text-sm sm:text-base font-semibold text-gray-800">
                Sophie Martin
              </p>
              <p className="text-xs text-gray-500">
                Passionnée de littérature
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Fin Carte */}

    {/* Carte */}
    <div className="flex h-auto">
      <div className="flex flex-col bg-white rounded-xl">
        <div className="flex-auto p-4 md:p-6">
          <p className="text-base italic md:text-lg text-gray-800">
            " Une superbe collection de livres et des recommandations qui m'ont permis de découvrir de nouveaux auteurs. Une expérience incroyable pour les amoureux des livres ! "
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-b-xl md:px-7">
          <div className="flex items-center gap-x-3">
            <div className="shrink-0">
              <img className="size-8 sm:size-11.5 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar" />
            </div>
            <div className="grow">
              <p className="text-sm sm:text-base font-semibold text-gray-800">
                Pierre Dupont
              </p>
              <p className="text-xs text-gray-500">
                Écrivain et lecteur assidu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Fin Carte */}

    {/* Carte */}
    <div className="flex h-auto">
      <div className="flex flex-col bg-white rounded-xl">
        <div className="flex-auto p-4 md:p-6">
          <p className="text-base italic md:text-lg text-gray-800">
            " Une interface intuitive, des prix abordables et un catalogue impressionnant ! Je recommande vivement cette librairie en ligne. "
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-b-xl md:px-7">
          <div className="flex items-center gap-x-3">
            <div className="shrink-0">
              <img className="size-8 sm:size-11.5 rounded-full" src="https://randomuser.me/api/portraits/women/50.jpg" alt="Avatar" />
            </div>
            <div className="grow">
              <p className="text-sm sm:text-base font-semibold text-gray-800">
                Clara Lemaitre
              </p>
              <p className="text-xs text-gray-500">
                Étudiante en littérature
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Fin Carte */}
  </div>
  {/* Fin Grille */}
</div>

      </main>
    </App>
  );
}

export default About;
