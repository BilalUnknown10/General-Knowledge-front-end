// import React, { } from 'react';
// import FirstSection from '../components/homePageComponents/FirstSection';
// import AboutUs from '../components/homePageComponents/AboutUs';
// import GuideLine from '../components/homePageComponents/GuideLine';
// import UserFeedBack from '../components/homePageComponents/UserFeedBack';

// function Home() {
  
  
//   return (
//    <div className={`p-5 md:p-10 bg-green-100 flex flex-col md:space-y-20`}>
//     <FirstSection/>
//     <AboutUs/>
//     <GuideLine/>
//     <UserFeedBack/>
//    </div>
//   )
// }

// export default Home

import React from "react";
import FirstSection from "../components/homePageComponents/FirstSection";
import AboutUs from "../components/homePageComponents/AboutUs";
import GuideLine from "../components/homePageComponents/GuideLine";
import UserFeedBack from "../components/homePageComponents/UserFeedBack";

function Home() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">

      {/* Hero Section */}
      <section className="px-4 sm:px-10 py-10 sm:py-16">
        <FirstSection />
      </section>

      {/* About */}
      <section className="px-4 sm:px-10 py-10 sm:py-16 bg-white">
        <AboutUs />
      </section>

      {/* Guidelines */}
      <section className="px-4 sm:px-10 py-10 sm:py-16">
        <GuideLine />
      </section>

      {/* Feedback */}
      <section className="px-4 sm:px-10 py-10 sm:py-16 bg-white">
        <UserFeedBack />
      </section>

    </div>
  );
}

export default Home;
