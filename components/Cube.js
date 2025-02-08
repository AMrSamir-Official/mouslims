"use client"; // تأكد من وضع هذا السطر في أعلى الملف

import 'swiper/css';
import 'swiper/css/effect-cube'; // استيراد تأثير المكعب
import 'swiper/css/pagination'; // استيراد الترقيم
import { EffectCube, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Cube() {
  return (
    <>
      <Swiper
        effect={'cube'} // تحديد تأثير المكعب
        grabCursor={true} // تفعيل سحب المؤشر
        cubeEffect={{
          shadow: true, // تفعيل الظل
          slideShadows: true, // تفعيل الظلال للشريحة
          shadowOffset: 20, // تحديد إزاحة الظل
          shadowScale: 0.94, // تحديد مقياس الظل
        }}
        pagination={{ clickable: true }} // تفعيل الترقيم
        modules={[EffectCube, Pagination]} // إضافة الوحدات المطلوبة
        className="mySwiper max-w-[200px]" // تعيين فئة CSS للمكون
      >
        <SwiperSlide className="flex items-center justify-center ">
          <img className=" object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-t4NvF6hkspHPbYS5SEOirXzZzTeT7WLwGQ&s" alt="Nature 1" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center ">
          <img className=" object-cover" src="https://cdn-bhemb.nitrocdn.com/fwHRWjpOqBjnidmoGOQdWQIYsUkSWlWU/assets/images/optimized/rev-62f0e09/zakirnaik.com/wp-content/themes/zakir/assets/images/homepage/Public_Lectures/2.jpg" alt="Nature 2" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center ">
          <img className=" object-cover" src="https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo400/39485112/39485112-1717978806773-58e5361a3339.jpg" alt="Nature 3" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center ">
          <img className=" object-cover" src="https://i1.sndcdn.com/avatars-C0BL4CBMBlfytBJj-Y8Yp9w-t500x500.jpg" alt="Nature 4" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center  justify-center ">
          <img className=" object-cover w-full h-[230px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhz18kTLyynJlN2mPnyuJ4o8cp7mraSAKrOg&s" alt="Nature 4" />
        </SwiperSlide>
      </Swiper>

      <style jsx>{`
        .mySwiper {
          height: 100px;  
          width: 100px; 
        }
      `}</style>
    </>
  );
}
