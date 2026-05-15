import React from "react";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-300 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            General Knowledge <span className="text-green-200">MCQs</span>
          </h1>

          <p className="mt-6 text-white/80 leading-relaxed text-base md:text-lg">
            Learn, practice, and improve your knowledge through interactive MCQs.
            We aim to make learning simple, fun, and effective for everyone.
          </p>

          <button className="mt-8 px-6 py-3 rounded-xl bg-white text-green-800 font-semibold hover:bg-green-100 hover:scale-105 transition-all duration-300 shadow-lg">
            Get In Touch
          </button>
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold border-b border-white/20 pb-3">
            Contact Us
          </h2>

          <div className="mt-8 space-y-5 text-white/80">

            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition">
              <MarkEmailReadIcon className="text-green-200" />
              <span>ourweb.pk@gmail.com</span>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition">
              <PhoneAndroidIcon className="text-green-200" />
              <span>0340XXXXXXX</span>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition">
              <LinkedInIcon className="text-green-200" />
              <span>Muhammad Bilal</span>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="relative border-t border-white/10 py-5 text-center text-sm text-white/60">
        © 2025 General Knowledge MCQs. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;