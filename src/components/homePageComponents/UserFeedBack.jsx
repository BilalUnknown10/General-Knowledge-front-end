import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { UserFeedBacks } from './json.js';
import GiveYourFeedback from './GiveYourFeedback.jsx';
import axios from 'axios';
import UserContext from '../../Store/UserContext.js';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function UserFeedBack() {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const {User_Api} = useContext(UserContext);

  const getAllFeedbacks = async () => {
    try {
      const response = await axios.get(`${User_Api}/getAllFeedbacks`);
      if(response.status === 200){
        setAllFeedbacks(response.data.allFeedbacks);
      }
    } catch (error) {
      console.log("error in get all feedbacks : ", error);
    }
  }

  useEffect(() => {
    getAllFeedbacks();
  },[]);
  return (
     <>
      <GiveYourFeedback/>
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

        {allFeedbacks.map((feedBack, index) => (
          <SwiperSlide key={index} >
            <div className='border border-green-500 bg-green-300 p-5 rounded-md h-full'>
              <div className='flex items-center gap-5'>
                {feedBack.image ? <img className='w-20 h-20 border-2 border-white rounded-full' src={`${feedBack.image}`} alt="userImage" /> :
                <AccountCircleIcon className={`!text-7xl bg-white rounded-full`}/>
                }
                <h1 className='font-bold md:text-2xl'>{feedBack.name}</h1>
              </div>
              <div className='mt-3'>
                <p>{feedBack.feedback}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
     </>
  );
}

export default UserFeedBack;
