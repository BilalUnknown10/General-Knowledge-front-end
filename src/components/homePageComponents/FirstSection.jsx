import React from "react";
import { Link } from "react-router-dom";

function FirstSection() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 py-16 px-6 md:px-20">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-300 opacity-30 blur-3xl rounded-full"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">

        {/* TEXT */}
        <div className="md:w-1/2 text-center md:text-left">

          <div className="inline-block px-4 py-2 mb-4 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            🎯 Boost Your General Knowledge
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Learn. Practice. <br />
            <span className="text-green-600">Master MCQs</span>
          </h1>

          <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
            Challenge yourself with carefully designed quizzes covering history,
            science, geography, and current affairs. Improve your thinking speed,
            accuracy, and confidence — all in one place.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            <Link to="/mcqs">
              <button className="px-8 py-4 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                🚀 Start Quiz
              </button>
            </Link>

            <button className="px-8 py-4 rounded-xl font-semibold border border-green-600 text-green-700 hover:bg-green-50 transition-all">
              Learn More
            </button>

          </div>
        </div>

        {/* IMAGE */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative group">

            {/* Floating card effect */}
            <div className="absolute -inset-4 bg-green-200 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition"></div>

            <img
              src="/general-knowledge.jpg"
              alt="Quiz"
              className="relative rounded-3xl shadow-2xl w-full max-w-md md:max-w-lg object-cover transform group-hover:scale-105 transition duration-500"
            />

          </div>
        </div>

      </div>
    </div>
  );
}

export default FirstSection;