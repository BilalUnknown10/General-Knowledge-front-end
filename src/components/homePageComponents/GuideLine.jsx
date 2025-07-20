import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GuideLineDetails } from "./json.js";

function GuideLine() {
  const [isOpen, setIsOpen] = useState(null);

  const MoreDetails = (index) => {
    console.log("clicked");
    // setIsOpen(!isOpen);
    setIsOpen(prevIndex => (prevIndex === index ? null : index));
  }
  return (
    <div>
      <div>
        <h1 className="font-bold md:text-3xl text-xl tracking-wider text-center">
          Guidelines for complete registration
        </h1>
      </div>
      <div >
        <ul className="list-decimal p-4">
          {GuideLineDetails.map((guide, index) => {
            const openIndex = isOpen === index;
            return <div key={index} className={` border-gray-400 border-b-1 py-4 px-10  flex justify-between rounded-md overflow-y-hidden transition-all duration-500 ease-in-out ${openIndex ? "max-h-[500px]" : "max-h-[50px]"} `}>
              <div>
                <li className="font-bold md:text-2xl">{guide.title}</li>
                <ul className={`list-disc  p-4 transition-all duration-500 ease-in-out ${openIndex ? "opacity-100" : "opacity-0"}`}>
                  {guide.guideLine.map((guide,i) => {
                      return <li key={i} className="md:text-2xl">{guide}</li>
                    })}
                    </ul>
              </div>
              <div>
                <ExpandMoreIcon className={` cursor-pointer ${openIndex ? "rotate-180" : "rotate-0"}`} onClick = {() => MoreDetails(index)} />
              </div>
            </div>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default GuideLine;
