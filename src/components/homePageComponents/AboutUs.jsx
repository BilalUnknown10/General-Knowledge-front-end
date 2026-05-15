import React from "react";

function AboutUs() {
  return (
    <div className="relative mt-24 px-6 md:px-16 py-16 bg-gradient-to-b from-white to-green-50">

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 blur-3xl opacity-30 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-200 blur-3xl opacity-30 rounded-full"></div>

      {/* Heading */}
      <div className="relative text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          About <span className="text-green-600">Us</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We make learning simple, engaging, and fun through interactive MCQs designed
          for students and knowledge seekers.
        </p>
      </div>

      {/* Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
          <div className="text-3xl mb-3">🧠</div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            At General Knowledge MCQs, we believe learning should be simple,
            enjoyable, and accessible for everyone.
          </p>

          <h2 className="font-bold text-lg text-gray-800 mt-5 mb-2">📚 What We Offer</h2>
          <p className="text-gray-600">
            MCQs across History, Science, Geography, Current Affairs, and more.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
          <div className="text-3xl mb-3">🎯</div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">Who It's For</h2>
          <p className="text-gray-600 leading-relaxed">
            Perfect for students, exam preparation, and curious learners who love
            improving their knowledge.
          </p>

          <h2 className="font-bold text-lg text-gray-800 mt-5 mb-2">💡 Why Use Us</h2>
          <p className="text-gray-600">
            Improve thinking speed, accuracy, and overall general knowledge.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
          <div className="text-3xl mb-3">🔄</div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">Always Updated</h2>
          <p className="text-gray-600 leading-relaxed">
            We continuously add new questions and improve the platform for better learning experience.
          </p>

          <h2 className="font-bold text-lg text-gray-800 mt-5 mb-2">📱 Easy Access</h2>
          <p className="text-gray-600">
            Fully responsive design that works smoothly on mobile, tablet, and desktop.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;