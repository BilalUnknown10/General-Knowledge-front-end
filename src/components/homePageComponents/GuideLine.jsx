import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GuideLineDetails } from "./json.js";

function GuideLine() {
  const [isOpen, setIsOpen] = useState(null);

  const toggle = (index) => {
    setIsOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative mt-24 px-6 md:px-16 py-16 bg-gradient-to-b from-white to-green-50 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 blur-3xl opacity-30 rounded-full"></div>

      {/* Heading */}
      <div className="relative text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          Registration <span className="text-green-600">Guidelines</span>
        </h1>
        <p className="mt-3 text-gray-600">
          Follow these simple steps to complete your registration smoothly.
        </p>
      </div>

      {/* Accordion */}
      <div className="relative max-w-4xl mx-auto space-y-4">

        {GuideLineDetails.map((guide, index) => {
          const open = isOpen === index;

          return (
            <div
              key={index}
              className={`bg-white border border-green-100 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl`}
            >

              {/* Header */}
              <div
                onClick={() => toggle(index)}
                className="flex justify-between items-center cursor-pointer p-5 md:p-6"
              >
                <h2 className="font-semibold text-lg md:text-xl text-gray-800">
                  {index + 1}. {guide.title}
                </h2>

                <ExpandMoreIcon
                  className={`transition-transform duration-300 ${
                    open ? "rotate-180 text-green-600" : "text-gray-500"
                  }`}
                />
              </div>

              {/* Content */}
              <div
                className={`px-6 md:px-8 pb-5 transition-all duration-300 overflow-hidden ${
                  open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {guide.guideLine.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GuideLine;