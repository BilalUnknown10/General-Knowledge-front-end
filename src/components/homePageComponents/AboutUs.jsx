import React from "react";

function AboutUs() {
  return (
    <div className=" mt-20">
      <div>
        <h1 className=" text-2xl md:text-3xl font-bold text-center tracking-widest">
          About Us
        </h1>
      </div>

      <div className="tracking-wide md:text-2xl mt-5 md:flex justify-between gap-10 md:items-stretch space-y-10 md:space-y-0">
  {/* Column 1 */}
  <div className="border border-green-500 md:w-1/3 w-full p-4 rounded-xl bg-green-300 shadow-md flex flex-col cursor-pointer hover:shadow-2xl">
    <h2 className="font-semibold mb-2">🧠 Who We Are</h2>
    <p>
      At General Knowledge MCQs, we believe learning
      should be easy, fun, and helpful for everyone.
    </p>
    <h2 className="font-semibold mt-4 mb-2">📚 What We Offer</h2>
    <p>
      We give you multiple-choice questions on many topics like History,
      Science, Geography, Current Affairs, and more!
    </p>
  </div>

  {/* Column 2 */}
  <div className="border border-green-500 md:w-1/3 w-full p-4 rounded-xl shadow-md bg-green-300 flex flex-col cursor-pointer hover:shadow-2xl">
    <h2 className="font-semibold mb-2">🎯 Who It's For</h2>
    <p>
      Our website is perfect for students preparing for exams and anyone
      who loves learning new things.
    </p>
    <h2 className="font-semibold mt-4 mb-2">💡 Why Use Our Site</h2>
    <p>
      We help you improve your knowledge, think smarter, and stay sharp
      and active.
    </p>
  </div>

  {/* Column 3 */}
  <div className="border border-green-500 md:w-1/3 w-full p-4 rounded-xl shadow-md bg-green-300 flex flex-col cursor-pointer hover:shadow-2xl">
    <h2 className="font-semibold mb-2">🔄 Always Updated</h2>
    <p>
      We regularly add new questions and keep everything fresh. Our
      website is also easy to use, even on mobile.
    </p>
  </div>
</div>

    </div>
  );
}

export default AboutUs;
