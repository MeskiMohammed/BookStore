import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const books = [
  {
    id: 11,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: "$16.99",
    coverImage: "https://covers.openlibrary.org/b/id/12911355-L.jpg",
  },
  {
    id: 12,
    title: "It Ends With Us",
    author: "Colleen Hoover",
    price: "$15.99",
    coverImage: "https://covers.openlibrary.org/b/id/12878783-L.jpg",
  },
  {
    id: 13,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: "$17.99",
    coverImage: "https://covers.openlibrary.org/b/id/12680954-L.jpg",
  },
  {
    id: 14,
    title: "Normal People",
    author: "Sally Rooney",
    price: "$16.99",
    coverImage: "https://covers.openlibrary.org/b/id/12680955-L.jpg",
  },
  {
    id: 15,
    title: "The Vanishing Half",
    author: "Brit Bennett",
    price: "$18.99",
    coverImage: "https://covers.openlibrary.org/b/id/12878784-L.jpg",
  },
  {
    id: 16,
    title: "Circe",
    author: "Madeline Miller",
    price: "$19.99",
    coverImage: "https://covers.openlibrary.org/b/id/12680956-L.jpg",
  },
  {
    id: 17,
    title: "Beach Read",
    author: "Emily Henry",
    price: "$15.99",
    coverImage: "https://covers.openlibrary.org/b/id/12878785-L.jpg",
  },
  {
    id: 18,
    title: "The Guest List",
    author: "Lucy Foley",
    price: "$16.99",
    coverImage: "https://covers.openlibrary.org/b/id/12680957-L.jpg",
  },
  {
    id: 19,
    title: "Malibu Rising",
    author: "Taylor Jenkins Reid",
    price: "$17.99",
    coverImage: "https://covers.openlibrary.org/b/id/12911356-L.jpg",
  },
  {
    id: 20,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: "$16.99",
    coverImage: "https://covers.openlibrary.org/b/id/12878782-L.jpg",
  }
];

export default function Popular() {
    const prevRef = useRef(null)
    const nextRef = useRef(null)
  
    return (
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular</h2>
          <div className="flex gap-2">
            <button 
              ref={prevRef}
              className="bg-white px-3 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              &lt;
            </button>
            <button 
              ref={nextRef}
              className="bg-white px-3 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              &gt;
            </button>
          </div>
        </div>
  
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 7 }
          }}
          autoplay={{ 
            delay: 3000,
            disableOnInteraction: false 
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
          }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
          loop={true}
          speed={500}
        >
          {books.map(book => (
            <SwiperSlide key={book.id}>
              <div className="bg-white rounded-lg hover:shadow-lg transition-shadow h-full">
                <div className="">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-60 object-cover rounded mb-3"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/350x500?text=No+Cover"
                    }}
                  />
                </div>
                <h3 className="font-semibold text-lg truncate">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="font-bold text-blue-600 mt-2">{book.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }