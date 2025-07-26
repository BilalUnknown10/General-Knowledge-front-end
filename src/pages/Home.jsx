import React, { } from 'react';
import FirstSection from '../components/homePageComponents/firstSection';
import AboutUs from '../components/homePageComponents/AboutUs';
import GuideLine from '../components/homePageComponents/GuideLine';
import UserFeedBack from '../components/homePageComponents/UserFeedBack';

function Home() {
  
  
  return (
   <div className={`p-5 md:p-10 bg-green-100 flex flex-col md:space-y-20`}>
    <FirstSection/>
    <AboutUs/>
    <GuideLine/>
    <UserFeedBack/>
   </div>
  )
}

export default Home
