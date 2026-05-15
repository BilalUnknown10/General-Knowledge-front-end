import React from "react";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white">

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

        {/* Left Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide border-b border-white/30 pb-2">
            General Knowledge
          </h1>

          <p className="mt-6 text-white/90 leading-relaxed">
            Learn, practice, and improve your knowledge through interactive MCQs.
            We aim to provide a simple and effective learning experience for everyone.
          </p>

          <button className="mt-6 px-6 py-3 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-100 transition">
            Get In Touch
          </button>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold border-b border-white/30 pb-2">
            Contact Us
          </h2>

          <div className="mt-6 space-y-4 text-white/90">

            <div className="flex items-center gap-3 hover:text-white transition">
              <MarkEmailReadIcon />
              <span>ourweb.pk@gmail.com</span>
            </div>

            <div className="flex items-center gap-3 hover:text-white transition">
              <PhoneAndroidIcon />
              <span>0340XXXXXXX</span>
            </div>

            <div className="flex items-center gap-3 hover:text-white transition">
              <LinkedInIcon />
              <span>Muhammad Bilal</span>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-white/80">
        © 2025 General Knowledge MCQs. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;