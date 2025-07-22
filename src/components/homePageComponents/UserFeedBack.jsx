import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { UserFeedBacks } from './json.js';
import GiveYourFeedback from './GiveYourFeedback.jsx';

function UserFeedBack() {
  return (
    <div className='mt-20'>
      <div className='md:text-3xl text-2xl font-bold text-center mb-8'>
        <h1 className='tracking-wider'>Our Users Feedback</h1>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        >

        {UserFeedBacks.map((feedBack, index) => (
          <SwiperSlide key={index} >
            <div className='border border-green-500 bg-green-300 p-5 rounded-md h-full'>
              <div className='flex items-center gap-5'>
                <img className='w-20 h-20 rounded-full' src={feedBack.image} alt="userImage" />
                <h1 className='font-bold md:text-2xl'>{feedBack.userName}</h1>
              </div>
              <div className='mt-3'>
                <p>{feedBack.feedBack}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <GiveYourFeedback/>
    </div>
  );
}

export default UserFeedBack;
