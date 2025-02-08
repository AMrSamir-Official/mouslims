// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';
import VideoCard from './VideoCard';

export default function Virtualslides() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >

        <SwiperSlide><VideoCard /></SwiperSlide>
        <SwiperSlide><VideoCard /></SwiperSlide>
        <SwiperSlide><VideoCard /></SwiperSlide>
        <SwiperSlide><VideoCard /></SwiperSlide>
        <SwiperSlide><VideoCard /></SwiperSlide>
        <SwiperSlide><VideoCard /></SwiperSlide>
        <SwiperSlide><VideoCard /></SwiperSlide>
        <SwiperSlide><VideoCard /></SwiperSlide>
      </Swiper>

      <style jsx>{`
        .mySwiper {
          width: 100%;
          height: 300px; /* Set a specific height for the Swiper */
        }
        
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          color: white; /* Change text color */
          background: #0070f3; /* Background color for the slides */
          border-radius: 10px; /* Rounded corners for the slides */
        }

        @media (min-width: 768px) {
          .mySwiper {
            height: 400px; /* Increase height on larger screens */
          }
        }

        @media (min-width: 1024px) {
          .mySwiper {
            height: 500px; /* Further increase height on larger screens */
          }
        }
      `}</style>
    </>
  );
}
