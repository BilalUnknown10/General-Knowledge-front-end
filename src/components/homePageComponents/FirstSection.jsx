import React from "react";
import { Link } from "react-router-dom";

function FirstSection() {
  return (
    <div className="w-full bg-gradient-to-r from-white to-green-50 py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">

        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Test Your Knowledge with Engaging <span className="text-[var(--primary)]">MCQs</span>
          </h1>

          <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed">
            Sharpen your mind with curated multiple-choice questions covering
            General Knowledge — history, science, current affairs, geography, and more.
            Whether you're preparing for exams or learning for fun, our quizzes
            are designed to challenge and grow your brainpower.
          </p>

          <Link to="/mcqs">
            <button className="mt-8 w-full md:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-[var(--primary)] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              🚀 Start Quiz
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src="/general-knowledge.jpg"
              alt="General Knowledge Quiz"
              className="rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg object-cover transform hover:scale-105 transition duration-500"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-70"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FirstSection;