import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/navigation';

// Helper to get book image or placeholder
function getBookImage(image) {
  if (!image || typeof image !== 'string' || image.trim() === '' || image === 'null' || image === 'undefined') {
    return '/images/books/placeholder.svg';
  }
  return image;
}

export default function BookSlider({ title, books }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const formatRating = (rating) => {
    const numRating = Number(rating);
    return !isNaN(numRating) ? numRating.toFixed(1) : '0.0';
  };

  return (
    <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl text-gray-800 font-bold capitalize'>{title}</h2>
        <div className='flex gap-2'>
          <button ref={prevRef} className='bg-white px-3 py-2 rounded border border-gray-300 hover:bg-gray-100'>
            &lt;
          </button>
          <button ref={nextRef} className='bg-white px-3 py-2 rounded border border-gray-300 hover:bg-gray-100'>
            &gt;
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        loop={true}
        speed={500}>
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <Link href={`/books/${book.id}`} className='block'>
              <div className='bg-white rounded-lg hover:shadow-lg transition-shadow h-full'>
                <div className='relative pt-[150%]'> {/* 2:3 aspect ratio container */}
                  <img
                    src={getBookImage(book.image)}
                    alt={book.libelle}
                    className='absolute top-0 left-0 w-full h-full object-cover rounded-t-lg'
                  />
                </div>
                <div className="p-4">
                  <h3 className='font-semibold text-gray-800 text-lg truncate'>{book.libelle}</h3>
                  <p className='text-gray-600'>{book.auteur}</p>
                  <p className='text-sm text-gray-500'>{book.categorie}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(Number(book.rating) || 0)
                              ? 'text-yellow-300'
                              : 'text-gray-300'
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-500">
                        {formatRating(book.rating)}
                      </span>
                    </div>
                  </div>
                  <p className='font-bold text-blue-600 mt-2'>{book.prix} €</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
