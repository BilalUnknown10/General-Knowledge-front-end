import React from "react";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className="bg-green-600 text-white">
      <div className=" md:p-8 md:flex gap-40">
      <div className="md:w-1/2 p-4">
        <h1 className="md:text-3xl text-xl border-b font-bold tracking-widest mt-5">
          General Knowledge
        </h1>
        <p className="md:text-xl leading-loose mt-5">
          We’re committed to delivering value, innovation, and customer satisfaction. Follow us for updates, resources, and support.
          Sharing insights, ideas, and inspiration. Thanks for visiting — see you again soon!
        </p>
        <button className="mt-5 md:text-xl w-[150px] py-2  rounded-md tracking-wider text-white cursor-pointer bg-green-700 hover:bg-green-700 transition-all duration-500 ease-in-out hover:w-full">
          Get In Touch
        </button>
      </div>
      <div className="md:w-1/2 p-4">
          <h1 className="md:text-3xl border-b  text-xl font-bold tracking-widest mt-5">
          Contact Us
        </h1>
          <div className="md:text-xl w-1/2 flex items-center gap-3 mt-5">
          <MarkEmailReadIcon/> ourweb.pk@gmail.com
        </div>
        <div className="md:text-xl flex items-center gap-3 mt-5">
          <PhoneAndroidIcon/> 0340XXXXXXX
        </div>
        <div className="md:text-xl flex items-center gap-3 mt-5">
          <LinkedInIcon/> Muhammad Bilal
        </div>
      </div>
    </div>
    <div className="py-4 border-t text-center text-white">
      <p>© 2025 General Knowledge MCQs. All rights reserved.</p>
    </div>
    </div>
  );
}

export default Footer;
