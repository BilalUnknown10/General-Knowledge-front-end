import React from "react";
import { Link } from "react-router-dom";

function GiveYourFeedback() {
  return (
    <div className="relative mt-24 py-20 px-6 md:px-16 bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-300 opacity-30 blur-3xl rounded-full"></div>

      <div className="relative max-w-5xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-block px-4 py-2 mb-6 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          💬 We Value Your Opinion
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          Give Your <span className="text-green-600">Feedback</span>
        </h1>

        {/* Description Card */}
        <div className="mt-10 bg-white/80 backdrop-blur-md border border-green-100 shadow-xl rounded-2xl p-6 md:p-10 text-left md:text-center">

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            💬 We’d Love Your Feedback!
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Your opinion matters to us. Whether you enjoyed the quiz, faced any issue,
            or have ideas to improve the platform — we want to hear from you.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4 text-gray-700 text-sm md:text-base">
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              ✅ Tell us what you liked
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              🛠️ Suggest improvements
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              🚀 Help us grow better
            </div>
          </div>

          {/* Button */}
          <div className="mt-10">
            <Link to="/feedback">
              <button className="px-10 py-4 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                ✍️ Give Feedback
              </button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default GiveYourFeedback;