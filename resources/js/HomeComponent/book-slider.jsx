import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// const books = [
//     {
//       id: 1,
//       title: "The Midnight Library",
//       author: "Matt Haig",
//       price: "$16.99",
//       coverImage: "https://covers.openlibrary.org/b/id/12878782-L.jpg",
//     },
//     {
//       id: 2,
//       title: "Klara and the Sun",
//       author: "Kazuo Ishiguro",
//       price: "$18.99",
//       coverImage: "https://covers.openlibrary.org/b/id/12911354-L.jpg",
//     },
//     {
//       id: 3,
//       title: "Project Hail Mary",
//       author: "Andy Weir",
//       price: "$19.99",
//       coverImage: "https://covers.openlibrary.org/b/id/13032562-L.jpg",
//     },
//     {
//       id: 4,
//       title: "The Invisible Life of Addie LaRue",
//       author: "V.E. Schwab",
//       price: "$17.99",
//       coverImage: "https://covers.openlibrary.org/b/id/12680953-L.jpg",
//     },
//     {
//       id: 5,
//       title: "The Four Winds",
//       author: "Kristin Hannah",
//       price: "$15.99",
//       coverImage: "https://covers.openlibrary.org/b/id/12880880-L.jpg",
//     },
//     {
//       id: 6,
//       title: "Dune",
//       author: "Frank Herbert",
//       price: "$14.99",
//       coverImage: "https://covers.openlibrary.org/b/id/12694418-L.jpg",
//     },
//     {
//       id: 7,
//       title: "The Silent Patient",
//       author: "Alex Michaelides",
//       price: "$15.99",
//       coverImage: "https://covers.openlibrary.org/b/id/12680952-L.jpg",
//     },
//     {
//       id: 8,
//       title: "Where the Crawdads Sing",
//       author: "Delia Owens",
//       price: "$16.99",
//       coverImage: "https://covers.openlibrary.org/b/id/12680951-L.jpg",
//     },
//     {
//       id: 9,
//       title: "Atomic Habits",
//       author: "James Clear",
//       price: "$14.99",
//       coverImage: "https://covers.openlibrary.org/b/id/12842437-L.jpg",
//     },
//     {
//       id: 10,
//       title: "Educated",
//       author: "Tara Westover",
//       price: "$17.99",
//       coverImage: "https://covers.openlibrary.org/b/id/12680950-L.jpg",
//     }
// ]

export default function BookSlider({ title, books }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold capitalize'>{title}</h2>
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
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        loop={true}
        speed={500}>
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <div className='bg-white rounded-lg hover:shadow-lg transition-shadow h-full'>
              <div className=''>
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className='w-full h-60 object-cover rounded mb-3'
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/350x500?text=No+Cover';
                  }}
                />
              </div>
              <h3 className='font-semibold text-lg truncate'>{book.title}</h3>
              <p className='text-gray-600'>{book.author}</p>
              <p className='font-bold text-blue-600 mt-2'>{book.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
