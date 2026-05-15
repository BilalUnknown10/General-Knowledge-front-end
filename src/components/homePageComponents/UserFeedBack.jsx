import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import axios from "axios";
import UserContext from "../../Store/UserContext.js";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GiveYourFeedback from "./GiveYourFeedback.jsx";

function UserFeedBack() {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const { User_Api } = useContext(UserContext);

  const getAllFeedbacks = async () => {
    try {
      const response = await axios.get(`${User_Api}/getAllFeedbacks`);
      if (response.status === 200) {
        setAllFeedbacks(response.data.allFeedbacks);
      }
    } catch (error) {
      console.log("error in get all feedbacks : ", error);
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  return (
    <>
      <GiveYourFeedback />

      <div className="relative mt-24 py-20 px-6 md:px-16 bg-gradient-to-b from-white to-green-50 overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 blur-3xl opacity-30 rounded-full"></div>

        {/* Heading */}
        <div className="relative text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
            What Our <span className="text-green-600">Users Say</span>
          </h1>
          <p className="mt-3 text-gray-600">
            Real feedback from learners using our platform daily.
          </p>
        </div>

        {/* Swiper */}
        <div className="relative max-w-6xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {allFeedbacks?.map((feedBack, index) => (
              <SwiperSlide key={index}>
                <div className="group bg-white border border-green-100 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">

                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-4">
                    {feedBack.image ? (
                      <img
                        className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
                        src={feedBack.image}
                        alt="user"
                      />
                    ) : (
                      <AccountCircleIcon className="!text-6xl text-green-500" />
                    )}

                    <div>
                      <h2 className="font-bold text-gray-800 text-lg">
                        {feedBack.name}
                      </h2>
                      <p className="text-sm text-gray-500">Verified User</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="text-green-600 text-4xl leading-none">“</div>

                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {feedBack.feedback}
                  </p>

                  {/* Bottom Accent */}
                  <div className="mt-6 w-12 h-1 bg-green-500 rounded-full group-hover:w-20 transition-all duration-300"></div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default UserFeedBack;